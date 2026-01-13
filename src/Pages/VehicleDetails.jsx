import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { useAuth } from '../context/AuthContext';

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch(`/api/vehicles/${id}`);
        if (!res.ok) {
          throw new Error('Vehicle not found');
        }
        const data = await res.json();
        setVehicle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleBookNow = () => {
      if (!user) {
          navigate('/auth');
          return;
      }
      // Navigate to booking page or open modal
      alert("Booking functionality coming soon!");
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!vehicle) return <div className="text-center py-20">Vehicle not found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Image Gallery Placeholder */}
            <div className="h-96 bg-gray-200 w-full relative">
                 {vehicle.photos && vehicle.photos.length > 0 ? (
                       <img src={vehicle.photos[0]} alt={vehicle.model} className="w-full h-full object-cover" />
                   ) : (
                       <div className="flex items-center justify-center h-full text-gray-400 text-2xl">No Image Available</div>
                   )}
            </div>

            <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{vehicle.make} {vehicle.model}</h1>
                        <p className="text-gray-500 text-lg">{vehicle.year} • {vehicle.type.toUpperCase()}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <p className="text-3xl font-bold text-[#F16D34]">₹{vehicle.pricePerKm}<span className="text-sm text-gray-500 font-normal">/km</span></p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${vehicle.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Specifications</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex justify-between"><span>Seating Capacity:</span> <span className="font-medium">{vehicle.seatingCapacity} Persons</span></li>
                            {/* Add more specs here if available */}
                        </ul>
                    </div>
                    <div>
                         <h3 className="text-xl font-semibold mb-4 border-b pb-2">Amenities</h3>
                         <div className="flex flex-wrap gap-3">
                             {vehicle.amenities && vehicle.amenities.map((item, idx) => (
                                 <span key={idx} className="bg-gray-100 px-4 py-2 rounded-lg text-gray-700">
                                     {item}
                                 </span>
                             ))}
                             {(!vehicle.amenities || vehicle.amenities.length === 0) && <span className="text-gray-500">No specific amenities listed.</span>}
                         </div>
                    </div>
                </div>

                <div className="border-t pt-8 flex justify-end">
                    <button 
                        onClick={handleBookNow}
                        className="bg-[#161E54] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#F16D34] transition-colors shadow-lg"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VehicleDetails;
