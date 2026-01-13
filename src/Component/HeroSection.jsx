import React, { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Car, MapPin, Calendar, Search, CheckCircle2 } from 'lucide-react';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('bus'); // 'bus' or 'rental'
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${keyword}`);
  };

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">

      {/* 1. Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"
          alt="Scenic Bus Travel"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {/* Dark Navy Overlay from Palette */}
        <div
          className="absolute inset-0 opacity-90"
          style={{ backgroundColor: '#161E54' }} // Deep Navy
          aria-hidden="true"
        ></div>
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center pt-20">

        {/* Headlines */}
        <div className="text-center mb-10 space-y-4 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Your Journey, Your Way. <br />
            <span style={{ color: '#F16D34' }}>Book Seats</span> or <span style={{ color: '#BBE0EF' }}>Rent Fleets.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light">
            Affordable bus tickets and premium vehicle rentals across Maharashtra.
          </p>
        </div>

        {/* 3. The Search Widget */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01]">

          {/* Tabs (Toggle) */}
          <div className="flex w-full border-b border-gray-100">
            <button
              type="button"
              onClick={() => setActiveTab('bus')}
              className={`relative flex-1 py-5 flex items-center justify-center gap-3 text-lg font-semibold transition-all duration-300 ${
                activeTab === 'bus'
                  ? 'bg-white text-[#161E54]'
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
              }`}
            >
              <Bus className={`w-6 h-6 ${activeTab === 'bus' ? 'text-[#F16D34]' : ''}`} />
              Book Bus Tickets
              {/* Active Indicator Line */}
              {activeTab === 'bus' && (
                <div className="pointer-events-none absolute top-0 left-0 h-1 w-full bg-[#F16D34]"></div>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('rental')}
              className={`relative flex-1 py-5 flex items-center justify-center gap-3 text-lg font-semibold transition-all duration-300 ${
                activeTab === 'rental'
                  ? 'bg-white text-[#161E54]'
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
              }`}
            >
              <Car className={`w-6 h-6 ${activeTab === 'rental' ? 'text-[#F16D34]' : ''}`} />
              Rent a Vehicle
              {/* (Optional) indicator can be added here too, keeping structure same */}
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="p-6 md:p-8">

            {/* TAB 1: BUS TICKETS */}
            {activeTab === 'bus' && (
              <form className="flex flex-col gap-6" onSubmit={handleSearch}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  {/* From Input */}
                  <InputGroup 
                    icon={<MapPin className="text-[#F16D34]" />} 
                    label="From" 
                    placeholder="Mumbai" 
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />

                  {/* To Input */}
                  <InputGroup icon={<MapPin className="text-[#BBE0EF]" />} label="To" placeholder="Pune" />

                  {/* Date Input */}
                  <InputGroup icon={<Calendar className="text-gray-400" />} label="Date" type="date" />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full md:w-auto md:self-center px-10 py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95"
                  style={{ backgroundColor: '#F16D34' }}
                >
                  <Search className="w-5 h-5" />
                  Search Buses
                </button>
              </form>
            )}

            {/* TAB 2: RENT VEHICLE */}
            {activeTab === 'rental' && (
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                  {/* Pickup City */}
                  <div className="md:col-span-1">
                    <InputGroup icon={<MapPin className="text-[#F16D34]" />} label="Pickup City" placeholder="Virar" />
                  </div>

                  {/* Vehicle Type */}
                  <div className="md:col-span-1 relative">
                    <label
                      htmlFor="vehicleType"
                      className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider"
                    >
                      Vehicle Type
                    </label>
                    <div className="relative flex items-center">
                      <Car className="absolute left-3 w-5 h-5 text-gray-400" />
                      <select
                        id="vehicleType"
                        name="vehicleType"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F16D34] focus:border-transparent appearance-none text-gray-700 font-medium cursor-pointer"
                        defaultValue="All Types"
                      >
                        <option>All Types</option>
                        <option>Sedan (4 Seater)</option>
                        <option>SUV (7 Seater)</option>
                        <option>Mini Bus (20 Seater)</option>
                        <option>Luxury Bus (45 Seater)</option>
                      </select>
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="md:col-span-1">
                    <InputGroup icon={<Calendar className="text-gray-400" />} label="Start Date" type="date" />
                  </div>

                  {/* End Date */}
                  <div className="md:col-span-1">
                    <InputGroup icon={<Calendar className="text-gray-400" />} label="End Date" type="date" />
                  </div>
                </div>

                {/* Driver Checkbox & Button */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2">

                  {/* Checkbox */}
                  <label className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="relative flex items-center">
                      <input type="checkbox" defaultChecked className="peer sr-only" />
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-md peer-checked:bg-[#161E54] peer-checked:border-[#161E54] transition-all"></div>
                      <CheckCircle2 className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 top-1 left-1 transition-opacity" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-[#161E54]">Need a Driver?</span>
                  </label>

                  {/* Find Button */}
                  <button
                    type="submit"
                    className="w-full md:w-auto px-10 py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95"
                    style={{ backgroundColor: '#161E54' }}
                  >
                    <Search className="w-5 h-5" />
                    Find Vehicles
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Input Component for consistency
const InputGroup = ({ icon, label, type = "text", placeholder, value, onChange }) => {
  const id = useId();
  const inputId = `${label?.toLowerCase().replace(/\s+/g, '-') || 'input'}-${id}`;

  return (
    <div className="relative group">
      <label
        htmlFor={inputId}
        className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider transition-colors group-focus-within:text-[#F16D34]"
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <div className="absolute left-3 w-5 h-5 flex items-center justify-center">
          {icon}
        </div>
        <input
          id={inputId}
          name={label?.toLowerCase().replace(/\s+/g, '-') || 'input'}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F16D34] focus:border-transparent text-gray-700 font-medium placeholder-gray-400 transition-all"
        />
      </div>
    </div>
  );
};

export default HeroSection;
