import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, ChevronDown, LayoutDashboard, LogOut, Ticket, Bus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  // Handle sticky background shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
      style={{ backgroundColor: '#161E54' }} // Palette Dark Blue
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LEFT: Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            {/* Simple Logo Icon */}
            <div className="p-1.5 rounded-lg" style={{ backgroundColor: '#F16D34' }}>
               <Bus className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-wide">
              TravelEase
            </span>
          </div>

          {/* CENTER: Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink label="Home" active />
            <NavLink label="Bus Tickets" />
            <NavLink label="Rent Vehicle" />
            <NavLink label="About Us" />
          </div>

          {/* RIGHT: Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* List Your Vehicle Button (Highlighted/Outlined) */}
            <button 
              className="px-5 py-2 rounded-full font-medium transition-all duration-300 border-2 hover:text-white"
              style={{ 
                borderColor: '#F16D34', 
                color: '#F16D34' 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F16D34';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#F16D34';
              }}
            >
              List Your Vehicle
            </button>

            {/* Login / Profile Logic */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 text-white hover:text-[#BBE0EF] transition-colors focus:outline-none"
                >
                  <div className="h-10 w-10 rounded-full flex items-center justify-center border-2 border-[#BBE0EF] bg-[#161E54]">
                    <User className="h-5 w-5" />
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl py-2 animate-fadeIn border-t-4" style={{ borderColor: '#F16D34' }}>
                    <DropdownItem icon={<Ticket size={16}/>} label="My Bookings" />
                    <DropdownItem icon={<LayoutDashboard size={16}/>} label="Dashboard" />
                    <div className="h-px bg-gray-100 my-1"></div>
                    <DropdownItem icon={<LogOut size={16}/>} label="Logout" color="text-red-500" onClick={handleLogout} />
                  </div>
                )}
              </div>
            ) : (
              <Link 
                className="text-white font-medium hover:text-[#FF986A] transition-colors px-3 py-2"
                to="/auth"
              >
                Login / Sign Up
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[#BBE0EF] transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#161E54] border-t border-blue-900/30">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <MobileNavLink label="Home" />
            <MobileNavLink label="Bus Tickets" />
            <MobileNavLink label="Rent Vehicle" />
            <MobileNavLink label="About Us" />
            <div className="h-px bg-white/10 my-3"></div>
            <button className="w-full text-center py-3 rounded-lg font-bold text-white mb-2" style={{ backgroundColor: '#F16D34' }}>
              List Your Vehicle
            </button>
            <button className="w-full text-center py-3 text-[#BBE0EF] font-medium">
              {isLoggedIn ? 'Go to Dashboard' : 'Login / Sign Up'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// Helper Components for Cleaner Code
const NavLink = ({ label, active }) => (
  <a 
    href="#" 
    className={`relative font-medium text-sm transition-colors duration-200 hover:text-[#BBE0EF] ${
      active ? 'text-[#FF986A]' : 'text-white'
    }`}
  >
    {label}
    {/* Animated underline effect */}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F16D34] transition-all group-hover:w-full"></span>
  </a>
);

const MobileNavLink = ({ label }) => (
  <a href="#" className="block px-3 py-3 text-base font-medium text-white hover:bg-white/5 rounded-md hover:text-[#FF986A]">
    {label}
  </a>
);

const DropdownItem = ({ icon, label, color = "text-gray-700", onClick }) => (
  <a href="#" onClick={onClick} className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#BBE0EF]/20 ${color} transition-colors`}>
    {icon}
    <span>{label}</span>
  </a>
);

export default Navbar;
