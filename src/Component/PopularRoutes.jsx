import React from 'react';
import { ArrowRight, BusFront, Clock } from 'lucide-react';

const PopularRoutes = () => {
  // Mock data for popular routes
  const routes = [
    { id: 1, from: "Mumbai", to: "Pune", price: "₹350", freq: "45 Buses" },
    { id: 2, from: "Pune", to: "Bangalore", price: "₹1200", freq: "12 Buses" },
    { id: 3, from: "Mumbai", to: "Goa", price: "₹850", freq: "20 Buses" },
    { id: 4, from: "Nashik", to: "Pune", price: "₹450", freq: "18 Buses" },
    { id: 5, from: "Aurangabad", to: "Mumbai", price: "₹600", freq: "15 Buses" },
    { id: 6, from: "Mumbai", to: "Surat", price: "₹550", freq: "25 Buses" },
    { id: 7, from: "Nagpur", to: "Pune", price: "₹1100", freq: "10 Buses" },
    { id: 8, from: "Mumbai", to: "Mahabaleshwar", price: "₹400", freq: "8 Buses" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 
              className="text-3xl font-extrabold mb-2"
              style={{ color: '#161E54' }}
            >
              Popular Bus Routes
            </h2>
            <p className="text-gray-500">Frequently booked destinations at the best prices.</p>
          </div>
          
          <button className="text-sm font-semibold hover:underline flex items-center gap-1" style={{ color: '#F16D34' }}>
            View All Routes <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>

      </div>
    </section>
  );
};

// Interactive Route Card Component
const RouteCard = ({ route }) => (
  <button 
    className="group flex flex-col items-start p-5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-[#BBE0EF] hover:shadow-lg transition-all duration-300 text-left w-full relative overflow-hidden"
    onClick={() => console.log(`Pre-filling search: ${route.from} to ${route.to}`)}
  >
    {/* Decorative Background Icon (Faded) */}
    <BusFront className="absolute -bottom-4 -right-4 w-24 h-24 text-gray-100 group-hover:text-[#BBE0EF]/20 transition-colors duration-300 transform -rotate-12" />

    {/* Route Cities */}
    <div className="flex items-center gap-2 mb-3 w-full">
      <span className="font-bold text-gray-800 text-lg">{route.from}</span>
      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#F16D34] group-hover:translate-x-1 transition-all" />
      <span className="font-bold text-gray-800 text-lg">{route.to}</span>
    </div>

    {/* Price and Frequency */}
    <div className="mt-auto z-10">
      <div className="flex items-baseline gap-1">
        <span className="text-xs text-gray-500">From</span>
        <span 
          className="text-xl font-extrabold"
          style={{ color: '#F16D34' }}
        >
          {route.price}
        </span>
      </div>
      
      <div className="flex items-center gap-1.5 mt-1 text-gray-500 group-hover:text-[#161E54] transition-colors">
        <Clock className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">{route.freq} daily</span>
      </div>
    </div>
  </button>
);

export default PopularRoutes;
