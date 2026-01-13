import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Users, Snowflake, UserCheck, Fuel } from 'lucide-react';

const FeaturedRentals = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const vehicles = [
    {
      id: 1,
      name: "Toyota Innova Crysta",
      type: "Premium SUV",
      image: "https://www.indiacarnews.com/wp-content/uploads/2020/11/2021-Toyota-Innova-Crysta-Facelift.jpg",
      seats: "7 Seater",
      features: ["AC", "Music System"],
      driver: "Driver Included",
      price: "₹18/km",
      rateType: "or ₹3500/day"
    },
    {
      id: 2,
      name: "Volvo 9600 Multi-Axle",
      type: "Luxury Bus",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop",
      seats: "45 Seater",
      features: ["AC", "Sleeper", "WiFi"],
      driver: "Driver & Helper",
      price: "₹65/km",
      rateType: "Intercity Special"
    },
    {
      id: 3,
      name: "Force Urbania",
      type: "Mini Van",
      image: "https://www.cmv360.com/_next/image?url=https%3A%2F%2Fd1odgbsvvxl2qd.cloudfront.net%2Fsmall_Urbania_7e09e7a775.webp&w=3840&q=100", // Placeholder resembling modern van
      seats: "17 Seater",
      features: ["AC", "Push-back Seats"],
      driver: "Driver Included",
      price: "₹28/km",
      rateType: "Great for Groups"
    },
    {
      id: 4,
      name: "Swift Dzire",
      type: "Sedan",
      image: "https://www.ecorentacar.com/wp-content/uploads/2025/06/01-4.jpg",
      seats: "4 Seater",
      features: ["AC", "Compact"],
      driver: "Self or Driver",
      price: "₹14/km",
      rateType: "or ₹2200/day"
    },
    {
      id: 5,
      name: "Tata Magna Coach",
      type: "Luxury sleeper berths Bus",
      image: "https://images.91trucks.com/buses/models/80/3009/tata-magna-coach-1043348066.jpg",
      seats: "sleeper berths 36",
      features: ["AC", "Compact"],
      driver: "Self or Driver",
      price: "₹48/km",
      rateType: "Great for Groups"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 
              className="text-3xl font-extrabold mb-2"
              style={{ color: '#161E54' }}
            >
              Top Rated Rentals for You
            </h2>
            <p className="text-gray-500">Handpicked vehicles for your next comfortable journey.</p>
          </div>
          
          {/* Scroll Buttons */}
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all border border-gray-100 group"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-[#F16D34]" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all border border-gray-100 group"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-[#F16D34]" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollBehavior: 'smooth' }}
        >
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Individual Card Component
const VehicleCard = ({ vehicle }) => (
  <div className="min-w-[300px] md:min-w-[350px] bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden snap-center group flex flex-col">
    
    {/* Image Section */}
    <div className="relative h-48 overflow-hidden">
      <img 
        src={vehicle.image} 
        alt={vehicle.name} 
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
      {/* Tag Badge */}
      <div 
        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm"
        style={{ backgroundColor: '#BBE0EF', color: '#161E54' }}
      >
        {vehicle.type}
      </div>
    </div>

    {/* Content Section */}
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{vehicle.name}</h3>
      </div>

      {/* Feature Icons Grid */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 mt-2">
        <div className="flex items-center gap-1.5" title="Passengers">
          <Users className="w-4 h-4 text-[#F16D34]" />
          <span>{vehicle.seats}</span>
        </div>
        <div className="flex items-center gap-1.5" title="Features">
          <Snowflake className="w-4 h-4 text-[#F16D34]" />
          <span>{vehicle.features[0]}</span>
        </div>
        <div className="flex items-center gap-1.5" title="Driver Status">
          <UserCheck className="w-4 h-4 text-[#F16D34]" />
          <span className="truncate max-w-[80px]">{vehicle.driver}</span>
        </div>
      </div>

      {/* Price & Action - Pushed to bottom */}
      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span 
            className="block text-xl font-extrabold"
            style={{ color: '#F16D34' }}
          >
            {vehicle.price}
          </span>
          <span className="text-xs text-gray-400 font-medium">{vehicle.rateType}</span>
        </div>
        
        <button 
          className="px-6 py-2.5 rounded-lg text-white font-semibold text-sm transition-transform active:scale-95 hover:brightness-110"
          style={{ backgroundColor: '#161E54' }}
        >
          View Details
        </button>
      </div>
    </div>
  </div>
);

export default FeaturedRentals;
