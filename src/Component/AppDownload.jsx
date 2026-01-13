import React from 'react';
import {Smartphone, Apple } from 'lucide-react';

const AppDownload = () => {
  return (
    <section 
      className="py-16 relative overflow-hidden"
      style={{ backgroundColor: '#161E54' }} // Deep Navy Background
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Text Content */}
          <div className="text-center md:text-left max-w-xl z-10">
            <span 
              className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#BBE0EF' }}
            >
              Coming Soon
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Get the <span style={{ color: '#F16D34' }}>TravelEase</span> App
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Book tickets, track your bus, and manage rentals on the go. Exclusive app-only discounts waiting for you!
            </p>
            
            {/* Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="flex items-center gap-3 bg-white text-gray-900 px-5 py-3 rounded-xl hover:bg-[#BBE0EF] transition-colors font-semibold">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                  <span className="font-bold text-lg">G</span>
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wide">Get it on</div>
                  <div className="text-sm font-bold leading-none">Google Play</div>
                </div>
              </button>
              
              <button className="flex items-center gap-3 bg-transparent border border-gray-500 text-white px-5 py-3 rounded-xl hover:border-white transition-colors font-semibold">
                <Apple className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wide">Download on the</div>
                  <div className="text-sm font-bold leading-none">App Store</div>
                </div>
              </button>
            </div>
          </div>

          {/* Phone Mockup Illustration */}
          <div className="relative z-10 mt-8 md:mt-0">
             {/* Abstract Glow behind phone */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: '#F16D34' }}
            ></div>
            
            <div className="relative bg-gray-900 border-8 border-gray-800 rounded-[3rem] w-64 h-[500px] shadow-2xl overflow-hidden flex flex-col mx-auto transform rotate-[-5deg] md:rotate-[-10deg] hover:rotate-0 transition-transform duration-500">
               {/* Mockup Screen Content */}
               <div className="bg-white flex-1 relative">
                  {/* Mockup Header */}
                  <div className="bg-[#161E54] h-32 p-4 pt-12 text-white">
                    <div className="w-8 h-1 bg-white/20 rounded mb-4"></div>
                    <div className="font-bold text-xl">Hello, Rohan 👋</div>
                    <div className="text-sm text-[#BBE0EF]">Where to next?</div>
                  </div>
                  {/* Mockup Body */}
                  <div className="p-4 space-y-3">
                     <div className="h-24 bg-gray-100 rounded-xl animate-pulse"></div>
                     <div className="h-24 bg-gray-100 rounded-xl animate-pulse delay-75"></div>
                     <div className="h-24 bg-gray-100 rounded-xl animate-pulse delay-150"></div>
                  </div>
                  {/* Mockup Floating Button */}
                  <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center" style={{ backgroundColor: '#F16D34' }}>
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AppDownload ;