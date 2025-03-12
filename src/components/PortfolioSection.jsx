import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';

const PortfolioSection = ({ portfolioItems }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let progress = 0;
    let animationId;

    const animate = () => {
      if (!isAnimationPaused && !selectedItem && carousel) {
        progress += 4.0;
        if (progress >= carousel.scrollWidth / 2) {
          progress = 0;
        }
        carousel.scrollLeft = progress;
      }
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => setIsAnimationPaused(true);
    const handleMouseLeave = () => setIsAnimationPaused(false);

    if (carousel) {
      carousel.addEventListener('mouseenter', handleMouseEnter);
      carousel.addEventListener('mouseleave', handleMouseLeave);
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationId);
      if (carousel) {
        carousel.removeEventListener('mouseenter', handleMouseEnter);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isAnimationPaused, selectedItem]);

  const handleImageClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <section id='portfolio' className="py-16 bg-gradient-to-b from-rose-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative text-rose-800">
          <span className="relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-rose-400 after:bottom-0 after:left-1/4">
            Our Portfolio
          </span>
        </h2>
        <p className="text-center text-rose-600 mb-8 italic text-sm">
          <span className="inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Click on any image to view in full size
          </span>
        </p>
        <div className="relative">
          <div ref={carouselRef} className="flex overflow-x-hidden cursor-grab">
            {[...portfolioItems, ...portfolioItems].map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex-shrink-0 px-4">
                <div
                  className="group relative w-72 md:w-72 lg:w-80 h-96 md:h-72 lg:h-80 overflow-hidden rounded-xl shadow-lg cursor-pointer"
                  onClick={() => handleImageClick(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                    <p className="text-white/80 mt-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 delay-75">View Project</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/50 transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-full flex flex-col items-center">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-w-full max-h-[80vh] object-contain rounded-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
