import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Discovery from '@/components/frontend/home/Discovery.jsx';

const Categories = () => {
    return (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                        SHOP BY CATEGORIES
                    </h2>

                    {/* Navigation Arrows */}
                    <div className="flex space-x-2">
                        <button className="nav-prev-slider w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="nav-next-slider w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-2">
                    <div className="w-full lg:w-9/12 px-2">
                        <Swiper
                            spaceBetween={15}
                            slidesPerView={3}
                            loop={true}
                            navigation={{
                                nextEl: ".nav-next-slider",
                                prevEl: ".nav-prev-slider",
                            }}
                            modules={[Navigation]}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2
                                },
                                1024: {
                                    slidesPerView: 3
                                }
                            }}
                        >
                            {[
                                { title: "Clothing", image: "images/collections/collection-17.jpg" },
                                { title: "Sunglasses", image: "images/collections/collection-14.jpg" },
                                { title: "Bags", image: "images/collections/collection-18.jpg" }
                            ].map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <a href="shop-default.html" className="block">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                                <a
                                                    href="shop-default.html"
                                                    className="text-white font-medium flex items-center hover:text-gray-300 transition-colors"
                                                >
                                                    {item.title}
                                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </a>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="w-full lg:w-3/12 px-2 mt-6 lg:mt-0">
                        <Discovery />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;