import React from 'react';

const FooterSection = ({ footerRef, currentYear }) => {
  return (
    <footer ref={footerRef} className="relative w-full bg-rose-50 overflow-hidden py-16">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute -inset-[10%] w-[120%] h-[120%] bg-gradient-to-br from-pink-100/40 via-rose-50/20 to-orange-50/30 blur-3xl opacity-60 animate-slow-drift"></div>
      </div>
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-start justify-center">
        <h2 className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-700 delay-100 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-rose-800 break-words w-full overflow-hidden text-ellipsis">
          madhu_k.makeupartist.karad
        </h2>
        <p className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-700 delay-300 mt-4 text-base sm:text-lg md:text-xl text-rose-600 font-light italic tracking-wide w-full overflow-hidden text-ellipsis">
          Crafting timeless elegance, one radiant look at a time.
        </p>
        <div className="animate-on-scroll opacity-0 scale-x-0 transition-all duration-1000 delay-500 w-24 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent my-6 md:my-8"></div>
        <p className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-700 delay-700 text-xs sm:text-sm text-rose-400 w-full overflow-hidden text-ellipsis">
          © {currentYear} madhu_k.makeupartist.karad. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
