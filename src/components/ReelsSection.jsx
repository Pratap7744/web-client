import React, { useRef, useState, useEffect, useCallback } from 'react';

const ReelsSection = ({ reels }) => {
  const [currentReel, setCurrentReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState({});
  const videoRefs = useRef([]);
  
  // Memoized functions to reduce re-renders
  const pauseAllVideos = useCallback(() => {
    videoRefs.current.forEach(video => {
      if (video && !video.paused) {
        video.pause();
      }
    });
    setIsPlaying(false);
  }, []);

  const handleVideoToggle = useCallback((index) => {
    const video = videoRefs.current[index];
    if (!video) return;
    
    if (video.paused) {
      pauseAllVideos();
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
        // Only update if value changed significantly (reduces state updates)
        if (Math.abs((prev[currentReel] || 0) - progress) > 1) {
          return { ...prev, [currentReel]: progress };
        }
        return prev;
      });
    }
  }, [currentReel]);

  // Navigation functions
  const handlePrevReel = useCallback(() => {
    pauseAllVideos();
    setCurrentReel(prev => (prev === 0 ? reels.length - 1 : prev - 1));
  }, [pauseAllVideos, reels.length]);

  const handleNextReel = useCallback(() => {
    pauseAllVideos();
    setCurrentReel(prev => (prev === reels.length - 1 ? 0 : prev + 1));
  }, [pauseAllVideos, reels.length]);

  // Video ended handler
  const handleVideoEnd = useCallback((index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, []);

  // Setup event listeners
  useEffect(() => {
    const video = videoRefs.current[currentReel];
    if (!video) return;
    
    // Optimize by using a throttled version of updateVideoProgress
    const throttledUpdate = () => {
      if (!video.throttleTimer) {
        video.throttleTimer = setTimeout(() => {
          updateVideoProgress();
          video.throttleTimer = null;
        }, 250); // Update progress at most every 250ms
      }
    };
    
    video.addEventListener('timeupdate', throttledUpdate);
    
    // Preload current video
    if (video.readyState < 3) {
      video.load();
    }
    
    // Cleanup function
    return () => {
      video.removeEventListener('timeupdate', throttledUpdate);
      clearTimeout(video.throttleTimer);
    };
  }, [currentReel, updateVideoProgress]);

  // Preload next/previous videos with low priority
  useEffect(() => {
    const nextIndex = (currentReel + 1) % reels.length;
    const nextVideo = videoRefs.current[nextIndex];
    
    if (nextVideo && nextVideo.readyState < 1) {
      nextVideo.preload = "metadata";
      // Delayed full preload to not compete with current video resources
      const timer = setTimeout(() => {
        nextVideo.preload = "auto";
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [currentReel, reels.length]);

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
                  <video
                    ref={el => videoRefs.current[index] = el}
                    src={reel.video}
                    poster={reel.thumbnail}
                    className="w-full h-[90vh] rounded-lg shadow-lg object-cover"
                    playsInline
                    preload={index === currentReel ? "auto" : "none"}
                    loop
                    onEnded={() => handleVideoEnd(index)}
                    onClick={() => handleVideoToggle(index)}
                  />
                  
                  <button
                    onClick={() => handleVideoToggle(index)}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    aria-label={isPlaying && currentReel === index ? "Pause video" : "Play video"}
                  >
                    {isPlaying && currentReel === index ? (
                      <div className="bg-white/80 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                        </svg>
                      </div>
                    ) : (
                      <div className="bg-white/80 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    )}
                  </button>
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
          <button
            onClick={handlePrevReel}
            className="absolute inset-y-1/2 left-2 sm:left-4 bg-pink-500 hover:bg-pink-600 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous reel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNextReel}
            className="absolute inset-y-1/2 right-2 sm:right-4 bg-pink-500 hover:bg-pink-600 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next reel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-4">
            {reels.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  pauseAllVideos();
                  setCurrentReel(index);
                }}
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
