import { Swiper, SwiperSlide } from "swiper/react";
import bestSellerData from "../../../public/Data/bestSellerData";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BestSellerCard from "./BestSellerCard";

const BestSeller = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setProducts(bestSellerData);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="py-12 text-center text-gray-600 dark:text-gray-400">
                Loading best sellers...
            </div>
        );
    }

    return (
        <section className="py-12 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                {/* Header with navigation */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Best Seller
                    </h2>

                    <div className="flex space-x-3">
                        <button className="nav-prev-product w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary-500 dark:hover:bg-primary-600 transition-colors">
                            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="nav-next-product w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary-500 dark:hover:bg-primary-600 transition-colors">
                            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Swiper component */}
                <div className="relative">
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: ".nav-next-product",
                            prevEl: ".nav-prev-product",
                        }}
                        slidesPerView={4}
                        loop={true}
                        loopedSlides={6}
                        centeredSlides={false}
                        slideToClickedSlide={false}
                        speed={800}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 16
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 24
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 30
                            },
                        }}
                        className="px-2" // Add some padding so shadows aren't cut off
                    >
                        {products.map(product => (
                            <SwiperSlide key={product.id} className="pb-2"> {/* Add padding bottom for card shadows */}
                                <BestSellerCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default BestSeller;