export default function ProductCard({
  badge,
  rating,
  reviewCount,
  title,
  subtitle,
  price,
  originalPrice,
  discount,
  image,
  promotionalText,
  savePercent,
  downloadable,
}) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ))
  }

  return (
    <div className="relative">
      {/* Newegg Select Badge */}
      {badge && (
        <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium mb-3 inline-block">{badge}</div>
      )}

      {/* Product Image */}
      <div className="flex justify-center mb-4 h-40">
        <img src={image || "/placeholder.svg"} alt={title} className="max-h-full max-w-full object-contain" />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        <div className="flex">{renderStars(rating)}</div>
        <span className="text-gray-500 text-sm">({reviewCount})</span>
      </div>

      {/* Title */}
      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem] text-sm">{title}</h3>

      {/* Promotional Text */}
      {promotionalText && <p className="text-red-600 text-sm mb-2 font-medium">{promotionalText}</p>}

      {/* Downloadable Note */}
      {downloadable && <p className="text-blue-600 text-sm mb-2">{downloadable}</p>}

      {/* Save Percentage */}
      {savePercent && (
        <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold mb-2 inline-block">
          Save {savePercent}
        </div>
      )}

      {/* Pricing */}
      <div className="flex flex-col">
        {originalPrice && <span className="text-gray-400 text-sm line-through">{originalPrice}</span>}
        <span className="text-xl font-bold text-gray-900">{price}</span>
      </div>
    </div>
  )
}
