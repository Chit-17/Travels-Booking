import React, { useState, useEffect } from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch(`/api/vehicles?keyword=${keyword}`);
        if (!res.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await res.json();
        setVehicles(data.vehicles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [keyword]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Available Vehicles</h1>
        
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-10">{error}</div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No vehicles found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gray-200 relative">
                   {vehicle.photos && vehicle.photos.length > 0 ? (
                       <img src={vehicle.photos[0]} alt={vehicle.model} className="w-full h-full object-cover" />
                   ) : (
                       <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                   )}
                   <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                       {vehicle.type}
                   </span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">{vehicle.make} {vehicle.model}</h2>
                    <span className="text-orange-500 font-bold">₹{vehicle.pricePerKm}/km</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Year: {vehicle.year} • Seats: {vehicle.seatingCapacity}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                      {vehicle.amenities && vehicle.amenities.map((amenity, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              {amenity}
                          </span>
                      ))}
                  </div>

                  <a 
                    href={`/vehicle/${vehicle._id}`} 
                    className="block w-full text-center bg-[#161E54] text-white py-2 rounded hover:bg-[#F16D34] transition-colors"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
