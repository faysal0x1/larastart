import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const Slider = () => {
    return (
        <div className="relative ">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                pagination={{
                    clickable: true,
                    el: '.sw-pagination-slider',
                    bulletClass: 'swiper-pagination-bullet dark:!bg-white/50',
                    bulletActiveClass: 'swiper-pagination-bullet-active dark:!bg-white'
                }}
                modules={[Pagination, Autoplay]}
            >
                <SwiperSlide>
                    <div className="relative w-full h-screen ">
                        <img
                            className="absolute inset-0 w-full h-full object-cover "
                            src="images/slider/fashion-slideshow-04.jpg"
                            alt="Summer style sensations"
                        />
                        <div className="absolute inset-0 flex items-center bg-black/20 dark:bg-black/40">
                            <div className="container mx-auto px-4">
                                <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in [animation-delay:0.2s] dark:text-gray-100">
                                    Summer Style<br />Sensations
                                </h1>
                                <p className="text-xl text-white mb-8 animate-fade-in [animation-delay:0.4s] dark:text-gray-200">
                                    Discover the hottest trends and must-have looks
                                </p>
                                <a
                                    href="shop-default.html"
                                    className="inline-flex items-center px-8 py-4 bg-black text-white text-lg rounded hover:bg-opacity-90 transition-all duration-300 animate-fade-in [animation-delay:0.6s] group dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                >
                                    <span>Shop collection</span>
                                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200 dark:text-black">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative w-full h-screen dark:brightness-90">
                        <img
                            className="absolute inset-0 w-full h-full object-cover dark:opacity-80"
                            src="images/slider/fashion-slideshow-05.jpg"
                            alt="Youthful summer style"
                        />
                        <div className="absolute inset-0 flex items-center bg-black/20 dark:bg-black/40">
                            <div className="container mx-auto px-4">
                                <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in [animation-delay:0.2s] dark:text-gray-100">
                                    Youthful<br />Summer style
                                </h1>
                                <p className="text-xl text-white mb-8 animate-fade-in [animation-delay:0.4s] dark:text-gray-200">
                                    Discover the hottest trends and must-have looks
                                </p>
                                <a
                                    href="shop-default.html"
                                    className="inline-flex items-center px-8 py-4 bg-black text-white text-lg rounded hover:bg-opacity-90 transition-all duration-300 animate-fade-in [animation-delay:0.6s] group dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                >
                                    <span>Shop collection</span>
                                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200 dark:text-black">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative w-full h-screen dark:brightness-90">
                        <img
                            className="absolute inset-0 w-full h-full object-cover dark:opacity-80"
                            src="images/slider/fashion-slideshow-06.jpg"
                            alt="Gentle summer style"
                        />
                        <div className="absolute inset-0 flex items-center bg-black/20 dark:bg-black/40">
                            <div className="container mx-auto px-4">
                                <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in [animation-delay:0.2s] dark:text-gray-100">
                                    Gentle<br />Summer style
                                </h1>
                                <p className="text-xl text-white mb-8 animate-fade-in [animation-delay:0.4s] dark:text-gray-200">
                                    Discover the hottest trends and must-have looks
                                </p>
                                <a
                                    href="shop-default.html"
                                    className="inline-flex items-center px-8 py-4 bg-black text-white text-lg rounded hover:bg-opacity-90 transition-all duration-300 animate-fade-in [animation-delay:0.6s] group dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                >
                                    <span>Shop collection</span>
                                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200 dark:text-black">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            <div className="absolute bottom-8 left-0 right-0 z-10">
                <div className="container mx-auto px-4">
                    <div className="sw-pagination-slider"></div>
                </div>
            </div>
        </div>
    );
};

export default Slider;