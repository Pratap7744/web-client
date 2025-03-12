import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play } from 'lucide-react';
const ReelsSection = ({ reels }) => {
  const [currentReel, setCurrentReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState({});
  const [showThumbnails, setShowThumbnails] = useState({});
  const videoRefs = useRef([]);
  
  // Initialize thumbnail visibility for all videos, with mobile detection
  useEffect(() => {
    const initialThumbnailState = {};
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    reels.forEach((_, index) => {
      initialThumbnailState[index] = !isMobile;
    });
    setShowThumbnails(initialThumbnailState);
  }, [reels]);
  
  // Memoized functions to reduce re-renders
  const pauseAllVideos = useCallback(() => {
    videoRefs.current.forEach(video => {
      if (video && !video.paused) {
        video.pause();
      }
    });
    setIsPlaying(false);
  }, []);

  const handleVideoToggle = useCallback((index, e) => {
    if (e) e.stopPropagation();
    
    const video = videoRefs.current[index];
    if (!video) return;
    
    if (video.paused) {
      pauseAllVideos();
      setShowThumbnails(prev => ({...prev, [index]: false}));
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [pauseAllVideos]);

  const updateVideoProgress = useCallback(() => {
    const video = videoRefs.current[currentReel];
    if (video) {
      const progress = (video.currentTime / video.duration) * 100;
      setVideoProgress(prev => {
        if (Math.abs((prev[currentReel] || 0) - progress) > 1) {
          return { ...prev, [currentReel]: progress };
        }
        return prev;
      });
    }
  }, [currentReel]);

  // Navigation functions
  const handlePrevReel = useCallback((e) => {
    if (e) e.stopPropagation();
    
    pauseAllVideos();
    const prevIndex = currentReel === 0 ? reels.length - 1 : currentReel - 1;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      setShowThumbnails(prev => ({...prev, [prevIndex]: true}));
    }
    setCurrentReel(prevIndex);
  }, [pauseAllVideos, reels.length, currentReel]);

  const handleNextReel = useCallback((e) => {
    if (e) e.stopPropagation();
    
    pauseAllVideos();
    const nextIndex = currentReel === reels.length - 1 ? 0 : currentReel + 1;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      setShowThumbnails(prev => ({...prev, [nextIndex]: true}));
    }
    setCurrentReel(nextIndex);
  }, [pauseAllVideos, reels.length, currentReel]);

  // Video ended handler
  const handleVideoEnd = useCallback((index) => {
    const video = videoRefs.current[index];
    if (video) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (!isMobile) {
        setShowThumbnails(prev => ({...prev, [index]: true}));
      }
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, []);

  // Handle canplay event
  const handleCanPlay = useCallback((index) => {
    if (index === currentReel && isPlaying) {
      setShowThumbnails(prev => ({...prev, [index]: false}));
    }
  }, [currentReel, isPlaying]);

  // Setup event listeners
  useEffect(() => {
    const video = videoRefs.current[currentReel];
    if (!video) return;
    
    const throttledUpdate = () => {
      if (!video.throttleTimer) {
        video.throttleTimer = setTimeout(() => {
          updateVideoProgress();
          video.throttleTimer = null;
        }, 250);
      }
    };
    
    const canPlayHandler = () => handleCanPlay(currentReel);
    
    video.addEventListener('timeupdate', throttledUpdate);
    video.addEventListener('canplay', canPlayHandler);
    
    if (video.readyState < 3) {
      video.load();
    }
    
    return () => {
      video.removeEventListener('timeupdate', throttledUpdate);
      video.removeEventListener('canplay', canPlayHandler);
      clearTimeout(video.throttleTimer);
    };
  }, [currentReel, updateVideoProgress, handleCanPlay]);

  // Function to navigate to a specific reel
  const goToReel = useCallback((index, e) => {
    if (e) e.stopPropagation();
    
    pauseAllVideos();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      setShowThumbnails(prev => ({...prev, [index]: true}));
    }
    setCurrentReel(index);
  }, [pauseAllVideos]);

  return (
    <section id="reels" className="py-16 px-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative">
          <span className="relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-pink-400 after:bottom-0 after:left-1/4">
            Makeup Reels
          </span>
        </h2>
        <div className="relative max-w-md mx-auto">
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className={index === currentReel ? 'block' : 'hidden'}
            >
              <div className="relative pb-4">
                <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                  {/* Custom thumbnail solution */}
                  {showThumbnails[index] && (
                    <div className="absolute inset-0 z-10 bg-gray-800">
                      <img 
                        src={reel.thumbnail} 
                        alt={`Thumbnail for reel ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <video
                    ref={el => videoRefs.current[index] = el}
                    src={reel.video}
                    className="w-full h-[90vh] rounded-lg shadow-lg object-cover"
                    playsInline
                    preload={index === currentReel ? "auto" : "metadata"}
                    loop
                    muted={false}
                    onEnded={() => handleVideoEnd(index)}
                    onClick={(e) => handleVideoToggle(index, e)}
                  />
                  
                  {/* Play Indicator (shown when paused) */}
                  {(!isPlaying || currentReel !== index) && (
                    <div 
                    onClick={(e) => handleVideoToggle(index, e)}
                    className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                  >
                    <div className="bg-black/40 rounded-full p-5 shadow-lg transform transition-transform hover:scale-105 flex flex-col items-center justify-center">
                      <Play className="h-12 w-12 text-white" />
                      <div className="text-white text-center mt-2 font-medium text-sm">Tap to play</div>
                    </div>
                  </div>
                  )}
                  
                  {/* Pause Indicator (only shown briefly when playing) */}
                  {isPlaying && currentReel === index && (
                    <div 
                      onClick={(e) => handleVideoToggle(index, e)}
                      className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="bg-black/40 rounded-full p-5 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  <div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
                    <div
                      className="bg-pink-500 h-full"
                      style={{ width: `${videoProgress[index] || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation controls */}
          <div 
            onClick={(e) => handlePrevReel(e)}
            className="absolute inset-y-1/2 left-2 sm:left-4 bg-pink-500 hover:bg-pink-600 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-30 cursor-pointer"
            aria-label="Previous reel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div
            onClick={(e) => handleNextReel(e)}
            className="absolute inset-y-1/2 right-2 sm:right-4 bg-pink-500 hover:bg-pink-600 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-30 cursor-pointer"
            aria-label="Next reel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-4 z-30 relative">
            {reels.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToReel(index, e)}
                className={`w-3 h-3 rounded-full ${
                  index === currentReel ? 'bg-pink-500 scale-125' : 'bg-white/50'
                }`}
                aria-label={`Go to reel ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReelsSection;
