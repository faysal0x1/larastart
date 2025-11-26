// components/Hero.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Hero = () => {
    const slides = [
        {
            id: 1,
            title: "Summer Sale Collections",
            subtitle: "SALE! UP TO 50% OFF!",
            buttonText: "SHOP NOW",
            image: "https://anvogue.vercel.app/_next/image?url=%2Fimages%2Fslider%2Fbg1-1.png&w=750&q=75",
            bgColor: "#f8f3ed"
        },
        {
            id: 2,
            title: "New Arrivals",
            subtitle: "FRESH STYLES",
            buttonText: "EXPLORE NOW",
            image: "https://anvogue.vercel.app/_next/image?url=%2Fimages%2Fslider%2Fbg1-1.png&w=750&q=75",
            bgColor: "#f0f7f4"
        },
        {
            id: 3,
            title: "Winter Collection",
            subtitle: "COMING SOON",
            buttonText: "GET NOTIFIED",
            image: "https://anvogue.vercel.app/_next/image?url=%2Fimages%2Fslider%2Fbg1-1.png&w=750&q=75",
            bgColor: "#f8f1e9"
        }
    ];

    return (
        <div className="w-full">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="relative py-16 md:py-24 overflow-hidden"
                            style={{ backgroundColor: slide.bgColor }}
                        >
                            <div className="container mx-auto px-4">
                                <div className="flex flex-col md:flex-row items-center">
                                    {/* Text Content */}
                                    <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10 z-10">
                                        <div className="inline-block bg-[#e53e29] text-white text-sm font-bold px-3 py-1 mb-4 rounded-md">
                                            {slide.subtitle}
                                        </div>
                                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                                            {slide.title}
                                        </h1>
                                        <button className="inline-block bg-gray-900 text-white px-8 py-3 font-medium rounded-md hover:bg-black transition duration-300">
                                            {slide.buttonText}
                                        </button>
                                    </div>

                                    {/* Image */}
                                    <div className="md:w-1/2 relative z-10">
                                        <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="w-full h-full object-contain object-center"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f0e9e1] transform skew-x-12 -translate-x-20"></div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Hero;