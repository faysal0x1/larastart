import { Star, Clock, ShoppingCart, ChevronRight } from "lucide-react"

export default function DealProductCard({ product }) {
 

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

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Product Image */}
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {tags.map((tag, index) => (
              <div
                key={index}
                className={`${tagColors[index] || "bg-blue-500"} text-white text-xs px-2 py-1 rounded transform -skew-x-12`}
              >
                <span className="transform skew-x-12 block">{tag}</span>
              </div>
            ))}
          </div>
        )}
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
        {promoCode && (
          <div className="mb-2">
            <div className="flex items-center gap-1 text-xs text-orange-600">
              <span className="bg-orange-100 px-1 rounded">+{promoDiscount}</span>
              <span>off w/ promo code {promoCode}, limited offer</span>
            </div>
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="mb-3">
            <div className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded transform -skew-x-12">
              <span className="transform skew-x-12 block">Save: {discount}%</span>
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
              <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
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

        {/* Add to Cart Button */}
        <button
          className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
            inCart
              ? "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {!inCart && <ShoppingCart className="h-4 w-4" />}
          <span>{inCart ? "IN CART" : "ADD TO CART"}</span>
        </button>
      </div>
    </div>
  )
}
