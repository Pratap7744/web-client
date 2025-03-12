import React, { useState, useEffect } from 'react';

const Navigation = ({ activeSection, isMenuOpen, toggleMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'reels', label: 'Reels' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
    
  ];
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="text-white font-bold text-xl md:text-2xl">
          <span className="text-pink-400">Beauty</span>Studio
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`text-white hover:text-pink-400 transition-colors duration-300 ${
                activeSection === link.id ? 'border-b-2 border-pink-400' : ''
              }`}
            >
              {link.label}
            </a>
          ))}
          
          {/* CTA Button */}
          <a
            href="#contact"
            className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Book Now
          </a>
        </nav>
        
        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-2">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`block py-3 text-white hover:text-pink-400 transition-colors duration-300 ${
                activeSection === link.id ? 'text-pink-400' : ''
              }`}
              onClick={toggleMenu}
            >
              {link.label}
            </a>
          ))}
          
          <a
            href="#contact"
            className="block py-3 mt-2 text-center bg-pink-500 hover:bg-pink-600 text-white rounded-full text-sm font-semibold transition-all duration-300"
            onClick={toggleMenu}
          >
            Book Now
          </a>
        </div>
      </div>
      
      {/* Progress indicator for mobile */}
      <div className="md:hidden h-1 bg-gray-800 absolute bottom-0 left-0 w-full">
        <div
          className="h-full bg-gradient-to-r from-pink-400 to-purple-500"
          style={{
            width: `${
              activeSection === 'home' ? 20 :
              activeSection === 'services' ? 40 :
              activeSection === 'portfolio' ? 60 :
              activeSection === 'reels' ? 80 :
              activeSection === 'about' || activeSection === 'contact' ? 100 : 0
            }%`,
            
            transition: 'width 0.3s ease-in-out'
          }}
        />
      </div>
    </header>
  );
};

export default Navigation;