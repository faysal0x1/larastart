import { useMemo } from 'react';
import PrimaryProductCard from '@/components/frontend/productCard/PrimaryProductCard';

export default function DealCard({ beastDeal, onAddToCart }) {
    // Extract the individual product and deal info from the new structure
    const dealProduct = beastDeal?.dealProduct;
    const productData = dealProduct?.product;
    const dealInfo = beastDeal?.dealInfo;

    // Guard clause - return early if no product data
    if (!productData) {
        return (
            <div className="bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-gray-500">Product data unavailable</p>
            </div>
        );
    }

    // Transform product data to match PrimaryProductCard format
    const transformedProduct = useMemo(() => {
        // Calculate final price
        const unitPrice = parseFloat(productData.unit_price || productData.final_price || 0);
        const discountPrice = parseFloat(productData.discount_price || 0);
        let calculatedFinalPrice = unitPrice;

        if (productData.discount_type === 'flat') {
            calculatedFinalPrice = unitPrice - discountPrice;
        } else if (productData.discount_type === 'percentage') {
            const discount = (unitPrice * discountPrice) / 100;
            calculatedFinalPrice = unitPrice - discount;
        }

        return {
            id: productData.id,
            title: productData.name || 'Product',
            name: productData.name || 'Product',
            slug: productData.slug || '',
            price: calculatedFinalPrice,
            final_price: calculatedFinalPrice,
            was: calculatedFinalPrice < unitPrice ? unitPrice : null,
            unit_price: unitPrice,
            img: productData.image_url || '',
            image_url: productData.image_url || '',
            brandName: productData.brand?.name || '',
            brand: productData.brand || null,
            rating: productData.average_rating || 0,
            average_rating: productData.average_rating || 0,
            ratingCount: Array.isArray(productData.product_reviews) ? productData.product_reviews.length : 0,
            product_reviews: productData.product_reviews || [],
            call_for_price: productData.call_for_price || false,
            call_for_price_number: productData.call_for_price_number || '',
            discount_type: productData.discount_type,
            discount_price: productData.discount_price,
            hot_deals: productData.hot_deals || false,
            special_offer: productData.special_offer || false,
            updated_at: productData.updated_at,
        };
    }, [productData, dealInfo]);

    return (
        <div className="relative w-full">
            {/* Discount Badge Overlay - positioned relative to the card */}
            {dealInfo?.discount && (
                <div className="absolute top-2 right-2 z-20 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                    <span className="text-lg font-bold">{parseFloat(dealInfo.discount)}</span>
                    <span className="text-[10px]">off</span>
                </div>
            )}
            <PrimaryProductCard product={transformedProduct} />
        </div>
    );
}
