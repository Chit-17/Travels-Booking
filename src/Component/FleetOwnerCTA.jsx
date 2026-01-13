import React from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, Wallet } from 'lucide-react';

const FleetOwnerCTA = () => {
  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: '#BBE0EF' }} // Pale Blue Background
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/30 skew-x-12 transform translate-x-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Text Content */}
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/50 text-[#161E54] font-bold text-sm tracking-wide uppercase">
                For Vehicle Owners
              </span>
              <h2 
                className="text-4xl md:text-5xl font-extrabold leading-tight"
                style={{ color: '#161E54' }}
              >
                Own a Bus or Car? <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#161E54] to-[#F16D34]">
                  Start Earning Today.
                </span>
              </h2>
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-xl mx-auto md:mx-0">
                Join our network of 500+ fleet owners. List your vehicle, set your price, and get guaranteed bookings with zero hassle.
              </p>
            </div>

            {/* Value Props List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-3 bg-white/40 p-3 rounded-lg">
                <Wallet className="w-6 h-6 text-[#F16D34]" />
                <span className="font-semibold text-[#161E54]">Daily Payouts</span>
              </div>
              <div className="flex items-center gap-3 bg-white/40 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-[#F16D34]" />
                <span className="font-semibold text-[#161E54]">Zero Commission*</span>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              style={{ backgroundColor: '#F16D34' }}
            >
              Become a Partner
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <p className="text-sm text-slate-600 font-medium">
              *First month commission-free for new partners.
            </p>
          </div>

          {/* Right: Image Illustration */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              {/* Main Image */}
              <img 
                src="https://www.electrive.com/media/2022/10/nova-bus-lfseplus-elektrobus-electric-bus-usa-2022-02-min-1400x700.png.webp" 
                alt="Happy Fleet Owner" 
                className="rounded-3xl shadow-2xl relative z-10 w-full object-cover transform rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white"
                style={{ maxHeight: '500px' }}
              />
              
              {/* Floating Badge 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg z-20 flex items-center gap-3 animate-bounce-slow">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Total Earnings</p>
                  <p className="text-lg font-extrabold text-[#161E54]">₹85,000</p>
                </div>
              </div>

               {/* Decorative Circles */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#F16D34]/20 blur-2xl"></div>
              <div className="absolute -bottom-10 left-10 w-40 h-40 rounded-full bg-white/40 blur-xl"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FleetOwnerCTA;
