// Shared price formatting function
export const formatPrice = (value) => {
    try {
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    } catch (_) {
        return value;
    }
};


export const getProductImage = (product) => {
    if (!product) return 'https://via.placeholder.com/400x300?text=Product';

    if (product.image_url) return product.image_url;
    if (Array.isArray(product.media) && product.media.length && product.media[0]?.original_url)
        return product.media[0].original_url;
    if (product.product_thumbnail) return product.product_thumbnail;

    return 'https://via.placeholder.com/400x300?text=Product';
};
