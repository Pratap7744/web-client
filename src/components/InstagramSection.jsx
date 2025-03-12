import React from 'react';
import { FaInstagram } from 'react-icons/fa';

const InstagramSection = () => {
  return (
    <section id="join-insta-family" className="py-16 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Join Our Insta Family
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Follow us on Instagram for daily makeup inspiration, tips, and behind-the-scenes magic! 🎨✨
        </p>
        <a
          href="https://www.instagram.com/madhu_k.makeupartist.karad/?igsh=MTNhY3VoNzBmMWphYg%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-pink-600 py-3 px-6 rounded-full text-lg font-semibold transition-transform duration-300 transform hover:scale-110 flex items-center justify-center gap-2 w-max mx-auto shadow-lg"
        >
          <FaInstagram className="text-2xl" /> madhu_k.makeupartist.karad
        </a>
      </div>
    </section>
  );
};

export default InstagramSection;