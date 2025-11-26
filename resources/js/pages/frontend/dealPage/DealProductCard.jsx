import { Star, Clock, ShoppingCart, ChevronRight } from "lucide-react"
import React from "react"

export default function DealProductCard({ product }) {
    // Extract data from the nested product structure
    const {
        name: title,
        media,
        tags,
        discount_price: currentPrice,
        unit_price: originalPrice,
        discount,
        brand_id,
        // These properties might need to be fetched from other API endpoints
        rating = 4.5, // Default value since not in API
        reviewCount = 128, // Default value since not in API
        brand = "Logitech", // Default value since not in API
        brandLogo = "/placeholder.svg", // Default value since not in API
        promoCode = "SUMMER25", // Default value since not in API
        promoDiscount = "$5", // Default value since not in API
        saleEndsIn = "2 days", // Default value since not in API
        freeShipping = true, // Default value since not in API
        shippingFrom = "Dhaka", // Default value since not in API
        inCart = false // Default value since not in API
    } = product.product || product

    // Parse tags from string to array
    const tagArray = tags ? tags.split(",").map(tag => tag.trim()) : []

    // Get the first image as the main product image
    const image = media && media.length > 0 ? media[0].original_url : "/placeholder.svg"

    // Calculate discount percentage if not provided
    const discountPercentage = discount
        ? parseFloat(discount)
        : originalPrice && currentPrice
            ? Math.round(((parseFloat(originalPrice) - parseFloat(currentPrice)) / parseFloat(originalPrice)) * 100)
            : 0

    // Tag colors array for different tags
    const tagColors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500"]

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0
        const stars = []

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)
        }

        if (hasHalfStar) {
            stars.push(<Star key="half" className="h-3 w-3 fill-yellow-400 text-yellow-400 opacity-50" />)
        }

        const remainingStars = 5 - Math.ceil(rating)
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="h-3 w-3 text-gray-300" />)
        }

        return stars
    }

    const [isLoading, setIsLoading] = React.useState(false)
    const [isAdded, setIsAdded] = React.useState(false)

    const readCookie = (name) => {
        if (typeof document === 'undefined') return null
        const nameEQ = name + '='
        const ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === ' ') c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length))
        }
        return null
    }

    const ensureCsrfHeaders = async () => {
        const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        const metaToken = typeof document !== 'undefined' ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') : null
        if (metaToken) {
            headers['X-CSRF-TOKEN'] = metaToken
            return headers
        }
        try {
            await fetch('/sanctum/csrf-cookie', { credentials: 'include' })
            const xsrf = readCookie('XSRF-TOKEN')
            if (xsrf) headers['X-XSRF-TOKEN'] = xsrf
        } catch (_) { /* ignore */ }
        return headers
    }

    const handleAddToCart = async () => {
        try {
            setIsLoading(true)
            const pid = (product?.product?.id ?? product?.id)
            if (!pid) throw new Error('Product not available')
            const headers = await ensureCsrfHeaders()
            const res = await fetch('/api/cart/add', {
                method: 'POST',
                headers,
                credentials: 'include',
                body: JSON.stringify({ product_id: pid, quantity: 1 })
            })
            if (!res.ok) throw new Error('Failed to add to cart')
            setIsAdded(true)
            setTimeout(() => setIsAdded(false), 2000)
        } catch (_) {
            // optionally surface error toast
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            {/* Product Image */}
            <div className="relative">
                <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />

                {/* Tags */}
                {/* {tagArray.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {tagArray.slice(0, 2).map((tag, index) => (
              <div
                key={index}
                className={`${tagColors[index] || "bg-blue-500"} text-white text-xs px-2 py-1 rounded transform -skew-x-12`}
              >
                <span className="transform skew-x-12 block">{tag}</span>
              </div>
            ))}
          </div>
        )} */}
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Brand and Rating */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                        {renderStars(rating)}
                        <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <img src={brandLogo || "/placeholder.svg"} alt={brand} className="h-4" />
                        <ChevronRight className="h-3 w-3 text-gray-400" />
                    </div>
                </div>

                {/* Product Title */}
                <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-3 leading-tight">{title}</h3>

                {/* Promo Code */}
                {/* {promoCode && (
          <div className="mb-2">
            <div className="flex items-center gap-1 text-xs text-orange-600">
              <span className="bg-orange-100 px-1 rounded">+{promoDiscount}</span>
              <span>off w/ promo code {promoCode}, limited offer</span>
            </div>
          </div>
        )} */}

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                    <div className="mb-3">
                        <div className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded transform -skew-x-12">
                            <span className="transform skew-x-12 block">Save: {discountPercentage}%</span>
                        </div>
                    </div>
                )}

                {/* Price */}
                <div className="mb-3">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                            ${Math.floor(currentPrice)}
                            <sup className="text-sm">.{(currentPrice % 1).toFixed(2).slice(2)}</sup>
                        </span>
                        {originalPrice && originalPrice > currentPrice && (
                            <span className="text-sm text-gray-500 line-through">${parseFloat(originalPrice).toFixed(2)}</span>
                        )}
                    </div>

                    {/* Sale Timer */}
                    {saleEndsIn && (
                        <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                            <Clock className="h-3 w-3" />
                            <span>Sale Ends in {saleEndsIn}</span>
                        </div>
                    )}
                </div>

                {/* Shipping Info */}
                {freeShipping && (
                    <div className="mb-4">
                        <div className="text-sm">
                            <span className="text-green-600 font-medium">FREE SHIPPING</span>
                            <span className="text-gray-500"> from {shippingFrom}</span>
                        </div>
                    </div>
                )}

                {/* Stock Status */}
                <div className="mb-4">
                    {product.product && parseInt(product.product.qty) > 0 ? (
                        <span className="text-sm text-green-600">In Stock ({product.product.qty} available)</span>
                    ) : (
                        <span className="text-sm text-red-600">Out of Stock</span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 ${inCart || (product.product && parseInt(product.product.qty) === 0)
                        ? "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 cursor-not-allowed"
                        : isLoading
                            ? "bg-orange-400 text-white cursor-wait"
                            : "bg-orange-500 text-white hover:bg-orange-600"
                        }`}
                    disabled={isLoading || inCart || (product.product && parseInt(product.product.qty) === 0)}
                >
                    {!inCart && <ShoppingCart className="h-4 w-4" />}
                    <span>
                        {inCart
                            ? "IN CART"
                            : (product.product && parseInt(product.product.qty) === 0)
                                ? "OUT OF STOCK"
                                : isLoading
                                    ? "ADDING..."
                                    : isAdded
                                        ? "ADDED"
                                        : "ADD TO CART"}
                    </span>
                </button>
            </div>
        </div>
    )
}
