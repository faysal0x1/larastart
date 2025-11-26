import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Hero = ({banners}) => {
    // const slides = [
    //     {
    //         id: 1,
    //         title: 'Summer Sale Collections',
    //         subtitle: 'SALE! UP TO 50% OFF!',
    //         buttonText: 'SHOP NOW',
    //         image: 'https://anvogue.vercel.app/_next/image?url=%2Fimages%2Fslider%2Fbg1-1.png&w=750&q=75',
    //         bgColor: '#f8f3ed',
    //     },
    //     {
    //         id: 2,
    //         title: 'New Arrivals',
    //         subtitle: 'FRESH STYLES',
    //         buttonText: 'EXPLORE NOW',
    //         image: 'https://anvogue.vercel.app/_next/image?url=%2Fimages%2Fslider%2Fbg1-1.png&w=750&q=75',
    //         bgColor: '#f0f7f4',
    //     },
    //     {
    //         id: 3,
    //         title: 'Winter Collection',
    //         subtitle: 'COMING SOON',
    //         buttonText: 'GET NOTIFIED',
    //         image: 'https://anvogue.vercel.app/_next/image?url=%2Fimages%2Fslider%2Fbg1-1.png&w=750&q=75',
    //         bgColor: '#f8f1e9',
    //     },
    // ];

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
                {banners.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        {/*<div className="relative overflow-hidden py-16 md:py-24" style={{ backgroundColor: slide.bgColor }}>*/}
                        <div className="relative overflow-hidden py-16 md:py-24">
                            <div className="container mx-auto px-4">
                                <div className="flex flex-col items-center md:flex-row">
                                    {/* Text Content */}
                                    <div className="z-10 mb-10 md:mb-0 md:w-1/2 md:pr-10">
                                        <div className="mb-4 inline-block rounded-md bg-[#e53e29] px-3 py-1 text-sm font-bold text-white">
                                            {slide.subtitle}
                                        </div>
                                        <h1 className="mb-4 text-4xl leading-tight font-bold text-gray-900 md:text-5xl lg:text-6xl">{slide.title}</h1>
                                        <button className="inline-block rounded-md bg-gray-900 px-8 py-3 font-medium text-white transition duration-300 hover:bg-black">
                                            {slide.buttonText || 'SHOP NOW'}
                                        </button>
                                    </div>

                                    {/* Image */}
                                    <div className="relative z-10 md:w-1/2">
                                        <div className="relative h-64 w-full md:h-96 lg:h-[500px]">
                                            <img
                                                src={slide.image_url}
                                                alt={slide.title}
                                                className="h-full w-full object-contain object-center"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute top-0 left-0 z-0 h-full w-full overflow-hidden">
                                <div className="absolute top-0 right-0 h-full w-1/3 -translate-x-20 skew-x-12 transform bg-[#f0e9e1]"></div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Hero;
