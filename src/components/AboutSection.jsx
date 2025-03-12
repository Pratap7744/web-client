import React from 'react';
import logo from '../assets/pic.jpg';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 relative">
          <span className="relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-pink-400 after:bottom-0 after:left-0">
            About Me
          </span>
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 relative">
            <img
              src={logo}
              alt="About the artist"
              className="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-400 rounded-full flex items-center justify-center text-white text-lg font-bold text-center leading-tight">
              3+ Years Experience
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-gray-700 mb-4">
              With over 3+ years of experience in the beauty industry, I, Madhuri Katare, specialize in creating stunning makeup looks that enhance your natural beauty while reflecting your personal style.
            </p>
            <p className="text-gray-700 mb-4">
              Trained at the prestigious Academy of Makeup Arts, I've worked with brides and editorial clients to create memorable looks for every occasion.
            </p>
            <p className="text-gray-700 mb-6">
              My approach is client-centered, ensuring that each look is tailored to your unique features, preferences, and needs.
            </p>
            <a href="#contact">
              <button className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Contact Me
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;