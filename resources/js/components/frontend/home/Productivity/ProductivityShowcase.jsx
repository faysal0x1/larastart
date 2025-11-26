import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/frontend/productCard/PrimaryProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Custom Prev/Next Button Components
const CustomPrevButton = ({ className }) => (
    <button
        className={`swiper-button-prev-custom absolute top-1/2 left-4 z-10 hidden sm:flex h-10 w-10 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white disabled:opacity-50 ${className}`}
        aria-label="Previous products"
    >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
    </button>
);

const CustomNextButton = ({ className }) => (
    <button
        className={`swiper-button-next-custom absolute top-1/2 right-4 z-10 hidden sm:flex h-10 w-10 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white disabled:opacity-50 ${className}`}
        aria-label="Next products"
    >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
    </button>
);

const ProductivityShowcase = ({
    bannerSrc = 'https://promotions.newegg.com/msi/25-0748/940x390.jpg',
    bannerHref = '#',
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [transformedProducts, setTransformedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        async function load() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch('/web/productivity-products?limit=12', {
                    signal: controller.signal,
                    headers: { 'Accept': 'application/json' }
                });
                if (!res.ok) throw new Error(`Request failed: ${res.status}`);
                const json = await res.json();
                const list = Array.isArray(json?.data) ? json.data : [];
                const mapped = list.slice(0, 8).map(product => ({
                    id: product.id,
                    img: product.image_url,
                    title: product.name || 'Unnamed Product',
                    brandImg: null,
                    brandName: product.brand?.name || 'Unknown Brand',
                    rating: 0,
                    ratingCount: 0,
                    price: parseFloat(product.final_price || product.unit_price || 0),
                    call_for_price: product.call_for_price || false,
                    call_for_price_number: product.call_for_price_number || '8801713991638',
                    was: product.discount_price ? parseFloat(product.unit_price || product.final_price || 0) : null,
                    tag: product.tags || 'Product',
                    slug: product.slug,
                    video: null
                }));
                setTransformedProducts(mapped);
            } catch (e) {
                if (e.name !== 'AbortError') setError(e.message || 'Failed to load products');
            } finally {
                setLoading(false);
            }
        }
        load();
        return () => controller.abort();
    }, []);

    return (
        <section className="w-full bg-gradient-to-br from-gray-50 to-white">
            <div className="mx-auto max-w-[1680px] px-4 py-6 sm:py-8 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
                    {/* Carousel Section with Swiper */}
                    <div className='lg:col-span-2'>
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-slate-900">
                                    Elevate Your Productivity
                                </h2>
                                <p className="text-slate-600">
                                    Discover premium laptops that power your success
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <a
                                    href={bannerHref}
                                    className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                                >
                                    See More →
                                </a>
                            </div>
                        </div>

                        {/* Swiper Carousel */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            {error ? (
                                <div className="flex items-center justify-center h-64">{error}</div>
                            ) : loading ? (
                                <div className="flex items-center justify-center h-64">Loading…</div>
                            ) : transformedProducts.length > 0 ? (
                                <>
                                    <Swiper
                                        modules={[Navigation, Pagination]}
                                        spaceBetween={8}
                                        slidesPerView={1}
                                        navigation={{
                                            prevEl: '.swiper-button-prev-custom',
                                            nextEl: '.swiper-button-next-custom',
                                        }}
                                        pagination={{
                                            clickable: true,
                                            el: '.swiper-custom-pagination',
                                            bulletClass: 'inline-block h-2 w-2 rounded-full bg-gray-300 transition-all duration-300 mx-1 cursor-pointer hover:bg-gray-400',
                                            bulletActiveClass: '!w-8 !bg-blue-600',
                                        }}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 2,
                                            },
                                            1024: {
                                                slidesPerView: 3,
                                            },
                                        }}
                                        className="pb-12"
                                    >
                                        {transformedProducts.map((product, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="px-1 h-full">
                                                    <div className="transform transition-all duration-300 hover:scale-105 h-full">
                                                        <ProductCard product={product} className="h-full" />
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Custom Navigation Buttons */}
                                    <CustomPrevButton />
                                    <CustomNextButton />

                                    {/* Custom Pagination */}
                                    <div className="swiper-custom-pagination flex justify-center gap-2 mt-6" />
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                                    <p className="text-gray-500">No products available</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Banner Section */}
                    <div className='flex items-center justify-content-center'>
                        <div className="group relative overflow-hidden h-1/2 w-full">
                            <a href={bannerHref} className="block h-full">
                                <img
                                    src={bannerSrc}
                                    alt="Elevate Your Productivity"
                                    className="h-full w-full object-fit transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductivityShowcase;
