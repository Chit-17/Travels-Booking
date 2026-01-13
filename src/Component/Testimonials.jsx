import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';


// --- COMPONENT 1: TESTIMONIALS SLIDER ---
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = useMemo(() => ([
    {
      id: 1,
      name: "Rohan Mehta",
      role: "Regular Commuter",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop",
      text: "TravelEase made my daily commute from Pune to Mumbai so smooth. The live tracking feature is a lifesaver!",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Family Traveler",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
      text: "We rented a Force Urbania for our family trip to Mahabaleshwar. The vehicle was clean, and the driver was very professional.",
      rating: 5
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Business Traveler",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
      text: "Booking bus tickets is super fast. No hidden charges, and the customer support is actually helpful.",
      rating: 4
    }
  ]), []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  }, [reviews.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  }, [reviews.length]);

  // Auto-scroll
  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  }, [nextSlide]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-3" style={{ color: '#161E54' }}>
            What Our Users Say
          </h2>
          <div className="h-1 w-20 mx-auto rounded-full" style={{ backgroundColor: '#F16D34' }}></div>
        </div>

        {/* Carousel Content */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-2 rounded-full bg-white shadow-lg text-gray-400 hover:text-[#F16D34] z-10 hidden md:block"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-2 rounded-full bg-white shadow-lg text-gray-400 hover:text-[#F16D34] z-10 hidden md:block"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden transition-all duration-500">
            {/* Large Decorative Quote Icon */}
            <Quote
              className="absolute top-6 left-8 w-24 h-24 opacity-10 transform rotate-180"
              style={{ color: '#161E54' }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              {/* User Image */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img
                    src={reviews[activeIndex].image}
                    alt={reviews[activeIndex].name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {/* Accent Circle */}
                <div className="absolute top-0 right-0 w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: '#F16D34' }}></div>
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => {
                    const isFilled = i < reviews[activeIndex].rating;

                    return (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${isFilled ? 'text-[#F16D34] fill-current' : 'text-gray-300'}`}
                      />
                    );
                  })}
                </div>

                <p className="text-xl md:text-2xl font-medium text-gray-700 italic mb-6">
                  "{reviews[activeIndex].text}"
                </p>

                <div>
                  <h4 className="text-lg font-bold" style={{ color: '#161E54' }}>
                    {reviews[activeIndex].name}
                  </h4>
                  <p className="text-sm text-gray-500">{reviews[activeIndex].role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((review, index) => (
              <button
                type="button"
                key={review.id}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-8' : 'w-2.5 bg-gray-300'
                }`}
                style={{ backgroundColor: index === activeIndex ? '#161E54' : undefined }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
