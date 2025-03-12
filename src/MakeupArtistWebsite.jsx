import React, { useState, useEffect, useRef } from 'react';
import './Artist.css';

// Import components
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import ReelsSection from './components/ReelsSection';
import AboutSection from './components/AboutSection';
import InstagramSection from './components/InstagramSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import FloatingContactButton from './components/FloatingContactButton';

// Assets imports
import a from './assets/a.jpg';
import b from './assets/b.jpg';
import c from './assets/c.jpg';
import d from './assets/d.jpg';
import e from './assets/e.jpg';
import f from './assets/f.jpg';
import g from './assets/g.jpg';
import h from './assets/h.jpg';
import i from './assets/i.jpg';
import j from './assets/j.jpg';
import k from './assets/k.jpg';
import l from './assets/l.jpg';
import m from './assets/m.jpg';
import n from './assets/n.jpg';
import o from './assets/o.jpg';
import p from './assets/p.jpg';
import q from './assets/q.jpg';
import r from './assets/r.jpg';
import s from './assets/s.jpg';
import t from './assets/t.jpg';
import u from './assets/u.jpg';
import v from './assets/v.jpg';
import w from './assets/w.jpg';
import x from './assets/x.jpg';
import y from './assets/y.jpg';
import z from './assets/z.jpg';
import aa from './assets/aa.jpg';
import bb from './assets/bb.jpg';
import cc from './assets/cc.jpg';
import dd from './assets/dd.jpg';
import ee from './assets/ee.jpg';
import ff from './assets/ff.jpg';
import gg from './assets/gg.jpg';
import hh from './assets/hh.jpg';
import ii from './assets/ii.jpg';
import jj from './assets/jj.jpg';
import kk from './assets/kk.jpg';
import ll from './assets/ll.jpg';
import mm from './assets/mm.jpg';
import nn from './assets/nn.jpg';
import oo from './assets/oo.jpg';
import pp from './assets/pp.jpg';
import qq from './assets/qq.jpg';
import rr from './assets/rr.jpg';
import ss from './assets/ss.jpg';
import tt from './assets/tt.jpg';
import uu from './assets/uu.jpg';
import vv from './assets/vv.jpg';
import ww from './assets/ww.jpg';
import xx from './assets/xx.jpg';
import yy from './assets/yy.jpg';
import zz from './assets/zz.jpg';
import aaa from './assets/aaa.jpg';
import bbb from './assets/bbb.jpg';

import vid1 from './assets/vid1.mp4';
import vid2 from './assets/vid2.mp4';
import vid3 from './assets/vid3.mp4';
import vid4 from './assets/vid4.mp4';
import vid5 from './assets/vid5.mp4';
import vid6 from './assets/vid6.mp4';
import vid7 from './assets/vid7.mp4';
import vid8 from './assets/vid8.mp4';
import vid9 from './assets/vid9.mp4';
import vid10 from './assets/vid10.mp4';
import vid11 from './assets/vid11.mp4';
import vid12 from './assets/vid12.mp4';
import vid13 from './assets/vid13.mp4';
import vid14 from './assets/vid14.mp4';
import vid15 from './assets/vid15.mp4';
import vid16 from './assets/vid16.mp4';
import vid17 from './assets/vid17.mp4';

import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const MakeupArtistWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReel, setCurrentReel] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState({});

  const videoRefs = useRef([]);
  const carouselRef = useRef(null);
  const footerRef = useRef(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Data arrays
  const heroImages = [a, b, c, d];

  const portfolioItems = [
    { id: 1, title: 'Modern Interior', image: a },
    { id: 2, title: 'Minimalist Design', image: b },
    { id: 3, title: 'Urban Architecture', image: c },
    { id: 4, title: 'Nature Inspired', image: d },
    { id: 5, title: 'Industrial Space', image: e },
    { id: 6, title: 'Luxury Living', image: f },
    { id: 7, title: 'Luxury Living', image: g },
    { id: 8, title: 'Luxury Living', image: h },
    { id: 9, title: 'Luxury Living', image: i },
    { id: 10, title: 'Luxury Living', image: j },
    { id: 11, title: 'Luxury Living', image: k },
    { id: 12, title: 'Luxury Living', image: l },
    { id: 13, title: 'Luxury Living', image: m },
    { id: 14, title: 'Luxury Living', image: n },
    { id: 15, title: 'Luxury Living', image: o },
    { id: 16, title: 'Luxury Living', image: p },
    { id: 17, title: 'Luxury Living', image: q },
    { id: 18, title: 'Luxury Living', image: r },
    { id: 19, title: 'Luxury Living', image: s },
    { id: 20, title: 'Luxury Living', image: t },
    { id: 21, title: 'Luxury Living', image: u },
    { id: 22, title: 'Luxury Living', image: v },
    { id: 23, title: 'Luxury Living', image: w },
    { id: 24, title: 'Luxury Living', image: x },
    { id: 25, title: 'Luxury Living', image: y },
    { id: 26, title: 'Luxury Living', image: z },
    { id: 27, title: 'Luxury Living', image: aa },
    { id: 28, title: 'Luxury Living', image: bb },
    { id: 29, title: 'Luxury Living', image: cc },
    { id: 30, title: 'Luxury Living', image: dd },
    { id: 31, title: 'Luxury Living', image: ee },
    { id: 32, title: 'Luxury Living', image: ff },
    { id: 33, title: 'Luxury Living', image: gg },
    { id: 34, title: 'Luxury Living', image: hh },
    { id: 35, title: 'Luxury Living', image: ii },
    { id: 36, title: 'Luxury Living', image: jj },
    { id: 37, title: 'Luxury Living', image: kk },
    { id: 38, title: 'Luxury Living', image: ll },
    { id: 39, title: 'Luxury Living', image: mm },
    { id: 40, title: 'Luxury Living', image: nn },
    { id: 41, title: 'Luxury Living', image: oo },
    { id: 42, title: 'Luxury Living', image: pp },
    { id: 43, title: 'Luxury Living', image: qq },
    { id: 44, title: 'Luxury Living', image: rr },
    { id: 45, title: 'Luxury Living', image: ss },
    { id: 46, title: 'Luxury Living', image: tt },
    { id: 47, title: 'Luxury Living', image: uu },
    { id: 48, title: 'Luxury Living', image: vv },
    { id: 49, title: 'Luxury Living', image: ww },
    { id: 50, title: 'Luxury Living', image: xx },
    { id: 51, title: 'Luxury Living', image: yy },
    { id: 52, title: 'Luxury Living', image: zz },
    { id: 53, title: 'Luxury Living', image: aaa },
    { id: 54, title: 'Luxury Living', image: bbb },
  ];

  const reels = [
    { id: 1, title: 'Bridal Transformation', video: vid1, thumbnail: '/api/placeholder/400/720' },
    { id: 2, title: 'Editorial Makeup Process', video: vid2, thumbnail: '/api/placeholder/400/720' },
    { id: 3, title: 'Halloween Makeup Tutorial', video: vid3, thumbnail: '/api/placeholder/400/720' },
    { id: 4, title: 'Natural Glow Routine', video: vid4, thumbnail: '/api/placeholder/400/720' },
    { id: 5, title: 'Natural Glow Routine', video: vid5, thumbnail: '/api/placeholder/400/720' },
    { id: 6, title: 'Natural Glow Routine', video: vid6, thumbnail: '/api/placeholder/400/720' },
    { id: 7, title: 'Natural Glow Routine', video: vid7, thumbnail: '/api/placeholder/400/720' },
    { id: 8, title: 'Natural Glow Routine', video: vid8, thumbnail: '/api/placeholder/400/720' },
    { id: 9, title: 'Natural Glow Routine', video: vid9, thumbnail: '/api/placeholder/400/720' },
    { id: 10, title: 'Natural Glow Routine', video: vid10, thumbnail: '/api/placeholder/400/720' },
    { id: 11, title: 'Natural Glow Routine', video: vid11, thumbnail: '/api/placeholder/400/720' },
    { id: 12, title: 'Natural Glow Routine', video: vid12, thumbnail: '/api/placeholder/400/720' },
    { id: 13, title: 'Natural Glow Routine', video: vid13, thumbnail: '/api/placeholder/400/720' },
    { id: 14, title: 'Natural Glow Routine', video: vid14, thumbnail: '/api/placeholder/400/720' },
    { id: 15, title: 'Natural Glow Routine', video: vid15, thumbnail: '/api/placeholder/400/720' },
    { id: 16, title: 'Natural Glow Routine', video: vid16, thumbnail: '/api/placeholder/400/720' },
    { id: 17, title: 'Natural Glow Routine', video: vid17, thumbnail: '/api/placeholder/400/720' },
  ];

  const services = [
    {
      id: 1,
      title: 'Bridal & Engagement',
      description: ['Includes: Bridal makeup, saree draping, engagement styling.', '👰 Elegant bridal & engagement makeup for a stunning look.'],
      icon: '👰',
    },
    {
      id: 2,
      title: 'Party & Special Occasions',
      description: ['Includes: Party makeup, soft glam for events.', '🎉 Glamorous looks for parties, baby showers & celebrations.'],
      icon: '🎉',
    },
    {
      id: 3,
      title: 'Editorial & Professional Shoots',
      description: ['Includes: HD makeup, themed & editorial looks.', '📸 Flawless makeup for photoshoots, fashion & creative projects.'],
      icon: '📸',
    },
    {
      id: 4,
      title: 'Hairstyling & Extras',
      description: ['Includes: Wedding & custom hairstyling.', '💇‍♀️ Professional hairstyling for weddings, shoots & events.'],
      icon: '💇‍♀️',
    },
    {
      id: 5,
      title: 'SFX & Creative Makeup',
      description: ['Includes: Special effects & fantasy makeup.', '🎭 Transform with SFX, prosthetics & creative looks.'],
      icon: '🎭',
    },
    {
      id: 6,
      title: 'Baby Shower & Maternity Glow',
      description: ['Includes: Soft glam, natural glow makeup.', '🤰 Radiant makeup for baby showers & maternity shoots.'],
      icon: '🤰',
    },
    {
      id: 7,
      title: 'Saree Draping',
      description: ['Includes: Traditional & modern draping styles.', '🌺 Perfect saree draping for weddings & special events.'],
      icon: '🌺',
    },
  ];

  const contactMethods = [
    { id: 1, icon: <Phone className="h-6 w-6" />, title: 'Call Us', value: '+91 950 317 8919', color: 'from-pink-500 to-rose-400' },
    { id: 2, icon: <Mail className="h-6 w-6" />, title: 'Email Us', value: 'dr.madhuriphysio19@gmail.com', color: 'from-purple-500 to-violet-400' },
    { id: 3, icon: <MapPin className="h-6 w-6" />, title: 'Find Us', value: 'Karad, Maharshtra', color: 'from-blue-500 to-indigo-400' },
    { id: 4, icon: <Clock className="h-6 w-6" />, title: 'Open Hours', value: '24/7 ', color: 'from-teal-500 to-cyan-400' },
  ];

  // Auto slide for hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Handle scroll for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Animation effects for portfolio
  useEffect(() => {
    const carousel = carouselRef.current;
    let progress = 0;
    let animationId;

    const animate = () => {
      if (!isAnimationPaused && !selectedItem && carousel) {
        progress += 0.5;
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

  // Contact animation
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      const animationSequence = contactMethods.map((item, index) => {
        return setTimeout(() => {
          setVisibleItems((prev) => [...prev, item.id]);
        }, index * 800);
      });
      return () => animationSequence.forEach((timeout) => clearTimeout(timeout));
    }, 500);
    return () => clearTimeout(initialDelay);
  }, []);

  // Footer animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const footerElement = footerRef.current;
    if (footerElement) {
      const elementsToAnimate = footerElement.querySelectorAll('.animate-on-scroll');
      elementsToAnimate.forEach((el) => observer.observe(el));
      return () => elementsToAnimate.forEach((el) => observer.unobserve(el));
    }
  }, []);

  // Video handling
  const pauseAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video && !video.paused) {
        video.pause();
      }
    });
    setIsPlaying(false);
  };

  const handleVideoToggle = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      pauseAllVideos();
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const updateVideoProgress = () => {
    const currentVideo = videoRefs.current[currentReel];
    if (currentVideo) {
      const progress = (currentVideo.currentTime / currentVideo.duration) * 100;
      setVideoProgress((prev) => ({ ...prev, [currentReel]: progress }));
    }
  };

  useEffect(() => {
    const video = videoRefs.current[currentReel];
    if (video) {
      video.addEventListener('timeupdate', updateVideoProgress);
      pauseAllVideos();
      return () => video.removeEventListener('timeupdate', updateVideoProgress);
    }
  }, [currentReel]);

  const handlePrevReel = () => {
    pauseAllVideos();
    setCurrentReel((prev) => (prev === 0 ? reels.length - 1 : prev - 1));
  };

  const handleNextReel = () => {
    pauseAllVideos();
    setCurrentReel((prev) => (prev === reels.length - 1 ? 0 : prev + 1));
  };

  const handleVideoEnd = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  };

  const handleImageClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      <Navigation activeSection={activeSection} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <HeroSection heroImages={heroImages} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      <ServicesSection services={services} />
      <PortfolioSection
        portfolioItems={portfolioItems}
        carouselRef={carouselRef}
        isAnimationPaused={isAnimationPaused}
        selectedItem={selectedItem}
        handleImageClick={handleImageClick}
        closeModal={closeModal}
      />
      <ReelsSection
        reels={reels}
        currentReel={currentReel}
        setCurrentReel={setCurrentReel}
        videoRefs={videoRefs}
        isPlaying={isPlaying}
        videoProgress={videoProgress}
        handleVideoToggle={handleVideoToggle}
        handlePrevReel={handlePrevReel}
        handleNextReel={handleNextReel}
        handleVideoEnd={handleVideoEnd}
        pauseAllVideos={pauseAllVideos}
      />
      <AboutSection />
      <InstagramSection />
      <ContactSection contactMethods={contactMethods} visibleItems={visibleItems} setVisibleItems={setVisibleItems} />
      <FooterSection footerRef={footerRef} currentYear={currentYear} />
      <FloatingContactButton isOpen={isOpen} togglePopup={togglePopup} />
    </div>
  );
};

export default MakeupArtistWebsite;