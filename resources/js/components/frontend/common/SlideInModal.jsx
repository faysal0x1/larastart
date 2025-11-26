import { X, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "@inertiajs/react"
import axios from "axios"

export default function AddToCartModal({ isOpen, onClose, product = null, cartSubtotal = 0, cartItemCount = 0 }) {
    const [suggestedSlideIndex, setSuggestedSlideIndex] = useState(0)
    const [similarSlideIndex, setSimilarSlideIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [suggestedProducts, setSuggestedProducts] = useState([])
    const [similarProducts, setSimilarProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchRandomProducts = async () => {
        try {
            setLoading(true)
            const excludeId = product?.id || null

            // Fetch suggested products (5 random products)
            const suggestedResponse = await axios.get('/web/random-products', {
                params: { limit: 5, exclude_id: excludeId }
            })
            setSuggestedProducts(suggestedResponse.data)

            // Fetch similar products (5 random products, excluding the same ones)
            const similarResponse = await axios.get('/web/random-products', {
                params: { limit: 5, exclude_id: excludeId }
            })
            setSimilarProducts(similarResponse.data)
        } catch (error) {
            console.error('Error fetching random products:', error)
            // Set empty arrays on error
            setSuggestedProducts([])
            setSimilarProducts([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
            // Small delay to ensure DOM render before animation starts
            setTimeout(() => setIsAnimating(true), 10)
            // Fetch random products when modal opens
            fetchRandomProducts()
        } else {
            setIsAnimating(false)
            // Delay hiding to allow close animation to complete
            const timer = setTimeout(() => setIsVisible(false), 300)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    if (!isVisible) return null



    const nextSuggested = () => {
        setSuggestedSlideIndex((prev) => (prev >= suggestedProducts.length - 3 ? 0 : prev + 1))
    }

    const prevSuggested = () => {
        setSuggestedSlideIndex((prev) => (prev <= 0 ? suggestedProducts.length - 3 : prev - 1))
    }

    const nextSimilar = () => {
        setSimilarSlideIndex((prev) => (prev >= similarProducts.length - 3 ? 0 : prev + 1))
    }

    const prevSimilar = () => {
        setSimilarSlideIndex((prev) => (prev <= 0 ? similarProducts.length - 3 : prev - 1))
    }

    return (
        <>
            {/* Backdrop with animation */}
            <div
                className={`fixed inset-0 backdrop-brightness-50 bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen && isAnimating ? "opacity-100" : "opacity-0"}`}
                onClick={onClose}
            />

            {/* Modal with animation */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-50 transition-transform duration-300 ease-in-out overflow-y-auto border-l-2 border-green-200 ${isAnimating ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b-2 border-green-200 bg-green-50">
                    <div className="flex items-center gap-2 text-green-800">
                        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center shadow">
                            <span className="text-white text-[10px] leading-none">✓</span>
                        </div>
                        <span className="font-semibold">Item has been added to cart.</span>
                    </div>
                    <button onClick={onClose} className="text-green-600 hover:text-green-800">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Added Item */}
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl m-4">
                    <div className="flex gap-4">
                        <img
                            src={product?.image || "/placeholder.svg"}
                            alt={product?.name || "Product"}
                            className="w-20 h-20 object-cover rounded-lg border-2 border-green-200"
                        />
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-800 mb-2">
                                {product?.name || "Product Name"}
                            </h3>
                            <div className="text-right text-green-900">
                                <span className="text-2xl font-bold">BDT {product?.price || 0}</span>
                                {product?.originalPrice && product.originalPrice > product.price && (
                                    <span className="text-sm text-green-700 line-through ml-2">BDT {product.originalPrice}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-green-200">
                        <div className="text-sm text-green-900">
                            <span className="text-green-700">Cart Subtotal ({cartItemCount || 0} Items): </span>
                            <span className="font-semibold text-green-900">BDT {(cartSubtotal || 0).toFixed(2)}</span>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href={route('shop.cart')}
                                className="px-4 py-2 border-2 border-green-300 rounded-lg text-sm font-medium text-green-800 hover:bg-green-100 transition-colors">
                                View cart
                            </Link>
                        </div>
                    </div>
                </div>

                {/* May We Suggest */}
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">May We Suggest</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={prevSuggested}
                                className="p-2 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                                disabled={suggestedProducts.length <= 3 || loading}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={nextSuggested}
                                className="p-2 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                                disabled={suggestedProducts.length <= 3 || loading}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        {loading ? (
                            <div className="flex justify-center items-center h-48">
                                <div className="text-gray-500">Loading suggested products...</div>
                            </div>
                        ) : suggestedProducts.length > 0 ? (
                            <div
                                className="flex transition-transform duration-300 ease-in-out gap-4"
                                style={{ transform: `translateX(-${suggestedSlideIndex * (100 / 3)}%)` }}
                            >
                                {suggestedProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex-shrink-0 w-1/3 border-2 border-gray-200 rounded-xl p-4 hover:shadow-md transition-all bg-white"
                                    >
                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            className="w-full h-32 object-cover rounded-lg mb-3 bg-gray-100"
                                        />
                                        <div className="flex items-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                                />
                                            ))}
                                            <span className="text-sm text-gray-500">({product.reviews})</span>
                                        </div>
                                        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                                        <div className="flex items-center gap-2 mb-3">
                                            {product.originalPrice && (
                                                <span className="text-sm text-gray-400 line-through">BDT {product.originalPrice}</span>
                                            )}
                                            <span className="text-lg font-bold text-gray-900">
                                                BDT {product.price}
                                                <span className="text-sm font-normal text-gray-700">.99</span>
                                            </span>
                                        </div>
                                        <Link
                                            href={route('web.slug', product.slug)}
                                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors block text-center"
                                        >
                                            View Product
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-48">
                                <div className="text-gray-500">No suggested products available</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Similar Products */}
                <div className="p-4 border-t-2 border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Similar Products</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={prevSimilar}
                                className="p-2 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                                disabled={similarProducts.length <= 3 || loading}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={nextSimilar}
                                className="p-2 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                                disabled={similarProducts.length <= 3 || loading}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        {loading ? (
                            <div className="flex justify-center items-center h-48">
                                <div className="text-gray-500">Loading similar products...</div>
                            </div>
                        ) : similarProducts.length > 0 ? (
                            <div
                                className="flex transition-transform duration-300 ease-in-out gap-4"
                                style={{ transform: `translateX(-${similarSlideIndex * (100 / 3)}%)` }}
                            >
                                {similarProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex-shrink-0 w-1/3 border-2 border-gray-200 rounded-xl p-4 hover:shadow-md transition-all bg-white"
                                    >
                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            className="w-full h-32 object-cover rounded-lg mb-3 bg-gray-100"
                                        />
                                        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                                        <div className="flex items-center gap-2 mb-3">
                                            {product.originalPrice && (
                                                <span className="text-sm text-gray-400 line-through">BDT {product.originalPrice}</span>
                                            )}
                                            <span className="text-lg font-bold text-gray-900">
                                                BDT {product.price}
                                                <span className="text-sm font-normal">.00</span>
                                            </span>
                                        </div>
                                        <Link
                                            href={route('web.slug', product.slug)}
                                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors block text-center"
                                        >
                                            View Product
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-48">
                                <div className="text-gray-500">No similar products available</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
