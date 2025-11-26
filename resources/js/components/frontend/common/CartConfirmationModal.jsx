import React from 'react'
import SlideInModal from './SlideInModal'

export default function CartConfirmationModal({
    isOpen,
    onClose,
    addedItem,
    cartSubtotal,
    cartItemCount,
    suggestedProducts = [],
    similarProducts = [],
    onAddSuggestedProduct,
    onViewCart,
    onProceedToCheckout
}) {
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span
                key={i}
                className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
            >
                ★
            </span>
        ))
    }

    const formatPrice = (price) => {
        if (typeof price === 'string') return price
        return `$${price.toFixed(2)}`
    }

    return (
        <SlideInModal
            isOpen={isOpen}
            onClose={onClose}
            title=""
            placement="center"
            size="lg"
        >
            <div className="max-h-[80vh] overflow-y-auto">
                {/* Success Message */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-green-800">
                                Item has been added to cart.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Added Item Details */}
                {addedItem && (
                    <div className="flex items-start gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        <img
                            src={addedItem.image || "/placeholder.svg"}
                            alt={addedItem.title}
                            className="w-20 h-20 object-contain bg-white border rounded"
                        />
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                                {addedItem.title}
                            </h3>
                            <p className="text-lg font-bold text-gray-900">
                                {formatPrice(addedItem.price)}
                            </p>
                        </div>
                    </div>
                )}

                {/* Cart Summary */}
                <div className="border-t border-b py-4 mb-6">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                            Cart Subtotal ({cartItemCount} Items):
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                            {formatPrice(cartSubtotal)}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-8">
                    <button
                        onClick={onViewCart}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        View cart
                    </button>
                    <button
                        onClick={onProceedToCheckout}
                        className="flex-1 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                    >
                        Proceed to checkout ({cartItemCount} items)
                    </button>
                </div>

                {/* May We Suggest Section */}
                {suggestedProducts.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">May We Suggest</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {suggestedProducts.slice(0, 3).map((product, index) => (
                                <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                                    <div className="relative mb-2">
                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.title}
                                            className="w-full h-32 object-contain bg-gray-50 rounded"
                                        />
                                        {product.badge && (
                                            <div className="absolute top-1 left-1 bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs font-semibold">
                                                {product.badge}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 mb-1">
                                        <div className="flex">{renderStars(product.rating || 4)}</div>
                                        <span className="text-gray-500 text-xs">({product.reviewCount || 0})</span>
                                    </div>
                                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                                        {product.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mb-2">
                                        {product.originalPrice && (
                                            <span className="text-gray-400 text-sm line-through">
                                                {formatPrice(product.originalPrice)}
                                            </span>
                                        )}
                                        <span className="text-base font-bold text-gray-900">
                                            {formatPrice(product.price)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => onAddSuggestedProduct?.(product)}
                                        className="w-full px-3 py-1.5 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors"
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Similar Products Section */}
                {similarProducts.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Products</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {similarProducts.slice(0, 3).map((product, index) => (
                                <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                                    <div className="relative mb-2">
                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.title}
                                            className="w-full h-32 object-contain bg-gray-50 rounded"
                                        />
                                    </div>
                                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                                        {product.title}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        {product.originalPrice && (
                                            <span className="text-gray-400 text-sm line-through">
                                                {formatPrice(product.originalPrice)}
                                            </span>
                                        )}
                                        <span className="text-base font-bold text-gray-900">
                                            {formatPrice(product.price)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </SlideInModal>
    )
}
