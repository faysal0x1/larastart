import React from 'react';
import BaseProductCard from '@/components/frontend/productCard/BaseProductCard';

export default function ProductCard({ product = {}, onAddToCart }) {
    // Derive badge and promotionalText
    const badge = product.hot_deals || product.special_offer ? 'TBz Select' : null;
    const promotionalText = product.hot_deals || product.special_offer ? 'Special Offer' : null;

    return (
        <BaseProductCard
            product={product}
            variant="compact"
            useLazyImage={true}
            showBadge={true}
            badge={badge}
            promotionalText={promotionalText}
            onAddToCart={onAddToCart}
        />
    );
}
