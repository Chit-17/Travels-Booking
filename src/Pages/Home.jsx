import React from 'react'
import Navbar from '../Component/Navbar.jsx'
import HeroSection from '../Component/HeroSection.jsx'
import WhyChooseUs from '../Component/WhyChooseUs.jsx'
import FeaturedRentals from '../Component/FeaturedRentals.jsx'
import PopularRoutes from '../Component/PopularRoutes.jsx'
import FleetOwnerCTA from '../Component/FleetOwnerCTA.jsx'
import Testimonials from '../Component/Testimonials.jsx'
import AppDownload from '../Component/AppDownload.jsx'
import Footer from '../Component/Footer.jsx'

function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <FeaturedRentals />
      <PopularRoutes />
      <FleetOwnerCTA />
      <Testimonials />
      <AppDownload />
      <Footer />
    </div>
  )
}

export default Home
