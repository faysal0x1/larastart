import PrimaryProductCard from '@/components/frontend/productCard/PrimaryProductCard';
import { usePage } from '@inertiajs/react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { getSessionId } from '@/hooks/useRecommendations';
import { useEffect, useState, useCallback } from 'react';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../../css/swiperCustom.css";

const RecommendedProducts = ({ productId = null }) => {
    const { props } = usePage();
    const user = props?.user;

    const algorithm = user?.id ? 'previously_viewed_v1' : 'most_viewed_v1';

    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [isUsingDefault, setIsUsingDefault] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchPopularProducts = useCallback(() => {
        console.log('🟡 [Recommended Products] Fetching popular products as last resort');
        fetch('/web/products?per_page=10&page=1', {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
                    setRecommendedProducts(data.data);
                }
            })
            .catch(err => {
                console.error('Error fetching popular products:', err);
            });
    }, []);

    const fetchRecommendationsWithProducts = useCallback(async (algorithmToUse, userIdToUse, sessionIdToUse, isDefault = false) => {
        try {
            setLoading(true);
            if (isDefault) {
                setIsUsingDefault(true);
                console.log('🟡 [Recommended Products] Using default recommendations (most_viewed_v1)');
            } else {
                setIsUsingDefault(false);
            }

            const params = new URLSearchParams();
            params.set('context', 'product_page');
            if (productId || props?.products?.id) {
                params.set('product_id', productId || props?.products?.id);
            }
            if (userIdToUse) params.set('user_id', userIdToUse);
            if (sessionIdToUse) params.set('session_id', sessionIdToUse);
            if (algorithmToUse) params.set('algorithm', algorithmToUse);
            params.set('limit', '10');

            const response = await fetch(`/api/recommendations/products?${params.toString()}`, {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recommendations');
            }

            const data = await response.json();
            if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
                setRecommendedProducts(data.data);
            } else {
                throw new Error('No products returned');
            }
        } catch (err) {
            console.error('Error fetching recommendations with products:', err);
            if (!isDefault) {
                // Try default recommendations
                await fetchRecommendationsWithProducts('most_viewed_v1', null, null, true);
            } else {
                // Last resort: fetch popular products
                fetchPopularProducts();
            }
        } finally {
            setLoading(false);
        }
    }, [productId, props?.products?.id, fetchPopularProducts]);

    // Fetch recommendations with product details on mount
    useEffect(() => {
        const sessionId = getSessionId();
        fetchRecommendationsWithProducts(algorithm, user?.id || null, sessionId, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [algorithm, user?.id]);

    // Ensure we always have products - fetch popular if empty
    useEffect(() => {
        if (recommendedProducts.length === 0 && !loading) {
            fetchPopularProducts();
        }
    }, [recommendedProducts.length, loading, fetchPopularProducts]);

    // Transform database products to the format expected by PrimaryProductCard
    const transformedProducts = recommendedProducts.map(product => {
        const firstImage = product.multi_images?.[0]?.url || product.multi_images?.[0]?.photo;

        return {
            id: product.id,
            slug: product.slug,
            img: product.image_url || product.product_thumbnail || firstImage || "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=400&h=300&fit=crop",
            title: product.name || "Product Title",
            brandName: product.brand?.name || "Brand",
            rating: 0, // Hide rating
            ratingCount: 0, // Hide rating
            price: parseFloat(product.final_price || product.unit_price || 0),
            was: product.unit_price && product.final_price && parseFloat(product.unit_price) > parseFloat(product.final_price)
                ? parseFloat(product.unit_price)
                : null,
            call_for_price: product.call_for_price || false,
            call_for_price_number: product.call_for_price_number || '8801713991638',
        };
    });

    // Custom swiper settings - show 4 products at a time
    const customSwiperSettings = {
        modules: [Navigation, Pagination, Autoplay],
        spaceBetween: 20,
        navigation: true,
        pagination: { clickable: true, dynamicBullets: true },
        autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
        loop: transformedProducts.length > 4,
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 12 },
            480: { slidesPerView: 1.5, spaceBetween: 14 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 2.5, spaceBetween: 18 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 20 },
            1536: { slidesPerView: 4, spaceBetween: 24 },
            1920: { slidesPerView: 4, spaceBetween: 24 },
        },
    };

    if (loading) {
        return (
            <div className="my-3 relative">
                <div className="flex items-center justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    <span className="ml-3 text-gray-600">Loading recommendations...</span>
                </div>
            </div>
        );
    }

    // Show loading for default recommendations if still empty
    if (transformedProducts.length === 0 && !loading) {
        return (
            <div className="my-3 relative">
                <div className="flex items-center justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    <span className="ml-3 text-gray-600">Loading default recommendations...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="my-3 relative w-full overflow-hidden">
            {isUsingDefault && (
                <div className="">
                </div>
            )}
            <Swiper {...customSwiperSettings} className="!overflow-visible">
                {transformedProducts.map(product => (
                    <SwiperSlide key={product.id} className="!h-auto">
                        <div className="h-full flex justify-center">
                            <PrimaryProductCard product={product} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default RecommendedProducts;

