import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactSection = ({ contactMethods, visibleItems, setVisibleItems }) => {
  return (
    <section id="contact" className="py-16 px-4 bg-white text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative">
          <span className="relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-pink-400 after:bottom-0 after:left-1/4 text-black">
            Contact Us
          </span>
        </h2>
        <div className="space-y-4 max-w-md mx-auto">
          {contactMethods.map((method) => (
            <div
              key={method.id}
              className={`transition-all duration-700 transform overflow-hidden rounded-lg shadow-lg ${
                visibleItems.includes(method.id)
                  ? 'opacity-100 translate-y-0 max-h-32'
                  : 'opacity-0 translate-y-16 max-h-0'
              }`}
            >
              <div className={`bg-gradient-to-r ${method.color} p-4 flex items-center`}>
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  {method.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{method.title}</h3>
                  <p className="text-white/90">{method.value}</p>
                </div>
                <div className="relative">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                  <div className="absolute inset-0 animate-ping bg-white/60 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;