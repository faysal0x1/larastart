import React from 'react';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Custom CSS for Swiper components
const styles = `
  .swiper-pagination-bullet {
    background-color: #9CA3AF;
    opacity: 1;
    width: 10px;
    height: 10px;
  }
  .swiper-pagination-bullet-active {
    background-color: #4F46E5;
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: #4F46E5;
    background-color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 18px;
    font-weight: bold;
  }
`;

export default function TestimonialSlider() {
  const testimonials = [
    {
      name: "Harsh P.",
      role: "Product Designer",
      rating: 5,
      comment: "I've been using pagedone for a year now and it's made managing my finances easier."
    },
    {
      name: "Naina H.",
      role: "Sales Manager",
      rating: 5,
      comment: "Our revenue grew to 144% more after just one month of use."
    },
    {
      name: "Alex M.",
      role: "Marketing Director",
      rating: 5,
      comment: "The analytics dashboard helped us optimize our campaigns effectively."
    },
    {
      name: "Sarah K.",
      role: "Small Business Owner",
      rating: 4,
      comment: "Simple to use with great customer support when I needed help."
    },
    {
      name: "David L.",
      role: "Freelancer",
      rating: 5,
      comment: "Saved me hours of work each week with automated invoicing."
    },
    {
      name: "Priya S.",
      role: "UX Researcher",
      rating: 5,
      comment: "The user-friendly interface makes it easy to onboard new team members."
    }
  ];

  return (
    <>
      <style>{styles}</style>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">What our happy users say!</h2>
          
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            className="pb-16 relative"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gray-50 p-8 rounded-xl shadow-sm h-full flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                  
                  <div className="flex mb-6 text-amber-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 flex-grow">{testimonial.comment}</p>
                  
                  <div className="mt-auto">
                    <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 30C4.477 30 0 25.523 0 20V10C0 4.477 4.477 0 10 0H15V10H10V20H15V30H10ZM30 30C24.477 30 20 25.523 20 20V10C20 4.477 24.477 0 30 0H35V10H30V20H35V30H30Z" fill="#E5E7EB" fillOpacity="0.5"/>
                    </svg>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            
            <div className="flex justify-center mt-12 space-x-4">
              <div className="swiper-button-prev bg-white shadow-md rounded-full p-2 cursor-pointer"></div>
              <div className="swiper-button-next bg-white shadow-md rounded-full p-2 cursor-pointer"></div>
            </div>
          </Swiper>
        </div>
      </section>
    </>
  );
}