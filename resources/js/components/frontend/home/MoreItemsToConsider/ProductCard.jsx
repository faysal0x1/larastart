import React, { useState } from 'react';
import SlideInModal from '../../common/SlideInModal';

const ProductCard = ({ product }) => {
    const {
        id,
        title,
        image,
        rating,
        reviewCount,
        currentPrice,
        originalPrice,
        promo,
        badge,
        hasVideo = false,
        freeShipping = true
    } = product;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsModalOpen(true);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group">
            {/* Product Image */}
            <div className="relative">
                <a href={`/product/${id}`} className="block">
                    <img
                        src={image}
                        alt={title}
                        title={title}
                        className="w-full h-48 object-contain bg-gray-50"
                    />
                    {/* Hover Add to Cart Button */}
                    <button
                        type="button"
                        aria-label="Add to cart"
                        onClick={handleAddToCart}
                        className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors"
                    >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white rounded-full p-2 shadow-lg">
                            {/* Cart icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M2.25 3a.75.75 0 000 1.5h1.258c.175 0 .332.114.384.281l.327 1.071 1.51 4.995A2.25 2.25 0 007.89 12h7.757a2.25 2.25 0 002.162-1.653l1.148-4.295A.75.75 0 0018.25 5.5H6.36l-.22-.72A1.875 1.875 0 003.509 3H2.25z" />
                                <path d="M8.25 20.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            </svg>
                        </span>
                    </button>
                    {hasVideo && (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded flex items-center text-xs">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 5v10l8-5-8-5z" />
                            </svg>
                            Watch video
                        </div>
                    )}
                </a>
                {badge && (
                    <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${badge.type === 'wifi' ? 'bg-blue-600 text-white' :
                            badge.type === 'newegg-select' ? 'bg-blue-500 text-white' :
                                'bg-orange-500 text-white'
                            }`}>
                            {badge.text}
                        </span>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Rating */}
                <div className="mb-2">
                    <a href={`/product/${id}#reviews`} className="flex items-center">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-1">({reviewCount})</span>
                    </a>
                </div>

                {/* Product Title */}
                <a href={`/product/${id}`} className="block mb-2">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600">
                        {title}
                    </h3>
                </a>

                {/* Promo Text */}
                {promo && (
                    <div className="mb-2">
                        <p className="text-sm text-orange-600">{promo}</p>
                    </div>
                )}

                {/* Price */}
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline">
                        <span className="text-lg font-bold text-gray-900">
                            ${currentPrice}
                        </span>
                        {originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                                ${originalPrice}
                            </span>
                        )}
                    </div>
                    {freeShipping && (
                        <span className="text-xs text-blue-600">Free Shipping</span>
                    )}
                </div>
            </div>
            {/* Slide-in Modal */}
            <SlideInModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Item added to cart"
            >
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="shrink-0 rounded-full bg-green-100 text-green-700 p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M10.5 14.561l6.22-6.22a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l2.47 2.47z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Item has been added to cart.</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <img src={image} alt={title} className="w-20 h-20 object-contain bg-gray-50 border rounded" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-900 line-clamp-2">{title}</p>
                            <p className="text-base font-semibold mt-1">${currentPrice}</p>
                        </div>
                    </div>

                    <div className="border-t pt-3 flex items-center justify-between text-sm">
                        <span className="text-gray-600">Cart Subtotal</span>
                        <span className="font-semibold">${currentPrice}</span>
                    </div>

                    <div className="flex gap-2">
                        <a href="/cart" className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">View Cart</a>
                        <a href="/checkout" className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Proceed to checkout</a>
                    </div>
                </div>
            </SlideInModal>
        </div>
    );
};

export default ProductCard;
