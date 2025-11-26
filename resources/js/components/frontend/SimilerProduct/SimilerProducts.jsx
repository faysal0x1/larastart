import PrimaryProductCard from '@/components/frontend/productCard/PrimaryProductCard';
import { usePage } from '@inertiajs/react';
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { useRecommendations, getSessionId } from '@/hooks/useRecommendations';
import { useEffect, useState } from 'react';

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "../../../../css/swiperCustom.css"



const SimilerProduct = ({
    products = [],
    productId = null,
    // settings: swiperSettings = {}
}) => {
    const { props } = usePage();
    const user = props?.user;

    // Fetch similar products using upsell algorithm
    const { recommendations, loading } = useRecommendations({
        context: 'product_page',
        productId: productId || props?.products?.id,
        userId: user?.id || null,
        sessionId: getSessionId(),
        algorithm: 'upsell_v1', // Use upsell for similar products
        limit: 10,
    });

    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [isUsingDefault, setIsUsingDefault] = useState(false);

    // Fetch product details for recommended product IDs
    useEffect(() => {
        if (recommendations.length > 0) {
            setIsUsingDefault(false);
            const productIds = recommendations.map(rec => rec.product_id).join(',');

            fetch(`/web/products/bulk?ids=${productIds}`, {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data) && data.length > 0) {
                        setRecommendedProducts(data);
                    } else {
                        // If API returns empty, use default products
                        setIsUsingDefault(true);
                        console.log('🔵 [Similar Products] No recommendations found, using default products');
                        setRecommendedProducts(products);
                    }
                })
                .catch(err => {
                    console.error('Error fetching recommended products:', err);
                    // Fallback to original products if API fails
                    setIsUsingDefault(true);
                    console.log('🔵 [Similar Products] API error, using default products');
                    setRecommendedProducts(products);
                });
        } else if (!loading) {
            // Fallback to original products if no recommendations
            setIsUsingDefault(true);
            console.log('🔵 [Similar Products] No recommendations found, using default products');
            setRecommendedProducts(products);
        }
    }, [recommendations, loading, products]);

    // Transform database products to the format expected by PrimaryProductCard
    const transformedProducts = (recommendedProducts.length > 0 ? recommendedProducts : products).map(product => {
        // Get first image from media collection (supports both 'url' and 'photo' properties)
        const firstImage = product.multi_images?.[0]?.url || product.multi_images?.[0]?.photo;

        return {
            id: product.id,
            slug: product.slug, // Add slug for navigation
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

    // Use transformed products
    const displayProducts = transformedProducts;

    return (
        <div className="my-3 relative w-full overflow-hidden">
            {isUsingDefault && (
                <div className="">
                </div>
            )}
            <Swiper {...customSwiperSettings} className="!overflow-visible">
                {displayProducts.map(product => (
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

export default SimilerProduct;
