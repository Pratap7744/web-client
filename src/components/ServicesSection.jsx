import React from 'react';

const ServicesSection = ({ services }) => {
  return (
    <section id="services" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative animate-fade-in">
          <span className="relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-pink-400 after:bottom-0 after:left-1/4 after:animate-width-expand">
            Services
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-4xl mb-4 animate-bounce-subtle">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-pink-500 transition-colors duration-300">{service.title}</h3>
              <h3 className="text-base font-semibold text-gray-800 mt-2 flex items-center">
                <span className="animate-pulse-subtle mr-1">🌟</span> What's Included?
              </h3>
              <ul className="text-gray-600 mb-4 list-disc pl-5">
                {service.description.map((point, index) => (
                  <li
                    key={index}
                    className="hover:text-pink-600 transition-colors duration-300"
                    style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;