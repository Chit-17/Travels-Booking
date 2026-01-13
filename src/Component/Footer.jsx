import React from 'react';
import { Bus, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="pt-16 pb-8 text-white relative"
      style={{ backgroundColor: '#161E54' }} // Deep Navy Background
    >
      {/* Optional Top Border Accent */}
      <div 
        className="absolute top-0 left-0 w-full h-1" 
        style={{ 
          background: 'linear-gradient(to right, #F16D34, #FF986A, #BBE0EF)' 
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* COLUMN 1: Brand & Social */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: '#F16D34' }}>
                 <Bus className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-wide">
                TravelEase
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for affordable bus tickets and premium vehicle rentals across Maharashtra. Journey with comfort and safety.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-600 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <FooterLink label="Home" />
              <FooterLink label="Book Bus Tickets" />
              <FooterLink label="Rent a Vehicle" />
              <FooterLink label="About Us" />
              <FooterLink label="Contact Support" />
            </ul>
          </div>

          {/* COLUMN 3: Legal */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-600 pb-2 inline-block">
              Legal
            </h3>
            <ul className="space-y-3">
              <FooterLink label="Privacy Policy" />
              <FooterLink label="Terms of Service" />
              <FooterLink label="Refund Policy" />
              <FooterLink label="Cookie Policy" />
              <FooterLink label="Fleet Owner Terms" />
            </ul>
          </div>

          {/* COLUMN 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-600 pb-2 inline-block">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-[#F16D34] shrink-0" />
                <span className="text-gray-300 text-sm">
                  101, Tech Plaza, Station Road,<br />
                  Virar West, Palghar,<br />
                  Mumbai, Maharashtra - 401303
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#F16D34] shrink-0" />
                <span className="text-gray-300 text-sm hover:text-white cursor-pointer">
                  +91 98765 43210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#F16D34] shrink-0" />
                <span className="text-gray-300 text-sm hover:text-white cursor-pointer">
                  support@travelease.com
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {currentYear} TravelEase. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#BBE0EF] cursor-pointer transition-colors">Sitemap</span>
            <span className="hover:text-[#BBE0EF] cursor-pointer transition-colors">Partner with Us</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const SocialIcon = ({ icon }) => (
  <a 
    href="#" 
    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F16D34] hover:text-white transition-all duration-300 text-gray-300"
  >
    {icon}
  </a>
);

const FooterLink = ({ label }) => (
  <li>
    <a 
      href="#" 
      className="flex items-center gap-2 text-gray-300 hover:text-[#BBE0EF] hover:translate-x-1 transition-all duration-200 text-sm group"
    >
      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#F16D34]" />
      {label}
    </a>
  </li>
);

export default Footer;
