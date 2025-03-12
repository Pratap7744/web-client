import React, { useState, useEffect } from 'react';

const HeroSection = ({ heroImages }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section id="home" className="relative h-[87vh] w-full bg-black overflow-hidden">
      <div className="relative h-full w-full">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Makeup showcase ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white z-10 transform transition-all duration-500 translate-y-0 hover:translate-y-2">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 animate-fadeIn">
            Makeup Artistry
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-md animate-slideUp">
            Transforming faces, enhancing beauty, creating confidence
          </p>
          <button className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 animate-pulse">
            <a href="#contact">Book Now</a>
          </button>
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
