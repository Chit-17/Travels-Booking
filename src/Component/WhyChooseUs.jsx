import React from 'react';
import { ShieldCheck, MapPin, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Verified Fleet",
      description: "All vehicles are rigorously inspected for safety, cleanliness, and comfort before every trip.",
    },
    {
      id: 2,
      icon: <MapPin className="w-8 h-8" />,
      title: "Live Tracking",
      description: "Track your bus journey or rental vehicle location in real-time on our app for peace of mind.",
    },
    {
      id: 3,
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Rentals",
      description: "Hourly, daily, or weekly rentals available with professional, background-checked drivers.",
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: '#161E54' }} // Deep Navy
          >
            Why Choose <span style={{ color: '#F16D34' }}>TravelEase?</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            We prioritize safety, transparency, and comfort in every mile of your journey.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="group relative p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Decorative Top Border on Hover */}
              <div 
                className="absolute top-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl origin-left"
                style={{ backgroundColor: '#F16D34' }}
              ></div>

              {/* Icon Container */}
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0 transition-colors duration-300"
                style={{ 
                  backgroundColor: '#BBE0EF', // Pale Blue background
                  color: '#F16D34'            // Terracotta Icon
                }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <div className="text-center md:text-left space-y-3">
                <h3 
                  className="text-xl font-bold"
                  style={{ color: '#161E54' }} // Deep Navy
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
