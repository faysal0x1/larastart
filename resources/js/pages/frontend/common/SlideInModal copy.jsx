"use client"
import { X, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function AddToCartModal({ isOpen, onClose }) {
    const [suggestedSlideIndex, setSuggestedSlideIndex] = useState(0)
    const [similarSlideIndex, setSimilarSlideIndex] = useState(0)

    if (!isOpen) return null

    const suggestedProducts = [
        {
            id: 1,
            name: 'MSI MAG 27CQ6F 27" 180Hz VA QHD Gaming Monitor...',
            price: 159.99,
            originalPrice: 199.99,
            rating: 4.5,
            reviews: 65,
            image: "/gaming-monitor-setup.png",
        },
        {
            id: 2,
            name: "Redragon M913 Impact Elite Wireless Gaming Mouse,...",
            price: 46.99,
            rating: 4,
            reviews: 12,
            image: "/gaming-mouse.png",
        },
        {
            id: 3,
            name: "SteelSeries Arctis Nova 1 Gaming Headset Spatial...",
            price: 59.99,
            rating: 4.5,
            reviews: 8,
            image: "/gaming-headset.png",
        },
        {
            id: 4,
            name: "Corsair K95 RGB Platinum XT Mechanical Gaming Keyboard...",
            price: 199.99,
            originalPrice: 249.99,
            rating: 4.8,
            reviews: 142,
            image: "/gaming-keyboard.png",
        },
        {
            id: 5,
            name: "Logitech G Pro X Superlight Gaming Mouse...",
            price: 149.99,
            rating: 4.7,
            reviews: 89,
            image: "/white-gaming-mouse.jpg",
        },
        {
            id: 6,
            name: "ASUS TUF Gaming VG27AQ 27 inch Monitor...",
            price: 329.99,
            originalPrice: 399.99,
            rating: 4.6,
            reviews: 234,
            image: "/gaming-monitor-setup.png",
        },
    ]

    const similarProducts = [
        {
            id: 4,
            name: 'MSI Sword 16HX 16" 144Hz Gaming FHD+ NVIDIA...',
            price: 1299.0,
            image: "/msi-gaming-laptop.jpg",
        },
        {
            id: 5,
            name: 'Lenovo LOQ 15.6" FHD 144Hz Ryzen 7 RTX 4060 Gaming...',
            price: 1349.0,
            originalPrice: 1749.99,
            image: "/lenovo-gaming-laptop.jpg",
        },
        {
            id: 6,
            name: 'HP Victus Gaming Laptop, 15.6" 144Hz FHD LED Displa...',
            price: 899.0,
            originalPrice: 999.99,
            image: "/hp-victus-gaming-laptop.png",
        },
        {
            id: 7,
            name: 'ASUS ROG Strix G15 15.6" FHD 144Hz Gaming Laptop...',
            price: 1199.0,
            originalPrice: 1399.99,
            image: "/asus-rog-gaming-laptop.jpg",
        },
        {
            id: 8,
            name: "Acer Predator Helios 300 Gaming Laptop...",
            price: 1099.0,
            originalPrice: 1299.99,
            image: "/acer-predator-gaming-laptop.jpg",
        },
        {
            id: 9,
            name: 'Dell G15 Gaming Laptop 15.6" FHD 120Hz...',
            price: 799.0,
            originalPrice: 999.99,
            image: "/dell-gaming-laptop.png",
        },
    ]

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
            {/* Backdrop */}
            <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 z-40" onClick={onClose} />

            {/* Modal */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto border-l border-gray-200 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-green-50">
                    <div className="flex items-center gap-2 text-gray-900">
                        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center shadow">
                            <span className="text-white text-[10px] leading-none">✓</span>
                        </div>
                        <span className="font-semibold">Item has been added to cart.</span>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Added Item */}
                <div className="p-4 bg-white border border-gray-200 m-4 rounded">
                    <div className="flex gap-4">
                        <img
                            src="/hp-omen-gaming-laptop.jpg"
                            alt="HP Omen Gaming Laptop"
                            className="w-20 h-20 object-cover rounded border border-gray-200"
                        />
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-800 mb-2">
                                HP Omen Gaming 16.1" FHD 144Hz NVIDIA RTX 4060 G-SYNC Intel core i7-14650HX (Beats i9-13900HX) 32GB DDR5
                                RAM 1TB SSD RGB Backlit KB HDMI Webcam Thunderbolt 4 WiFi 6E Bluetooth 5.3...
                            </h3>
                            <div className="text-right text-gray-900">
                                <span className="text-2xl font-bold">$1,296</span>
                                <span className="text-sm text-gray-700">.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-800">
                            <span className="text-gray-700">Cart Subtotal (7 Items): </span>
                            <span className="font-semibold text-gray-900">$2,964.98</span>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-800 hover:bg-gray-50">
                                View cart
                            </button>
                            <button className="px-4 py-2 bg-orange-500 text-white rounded text-sm font-medium hover:bg-orange-600 shadow-sm">
                                Proceed to checkout (7 items)
                            </button>
                        </div>
                    </div>
                </div>

                {/* May We Suggest */}
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">May We Suggest</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={prevSuggested}
                                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                                disabled={suggestedProducts.length <= 3}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={nextSuggested}
                                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                                disabled={suggestedProducts.length <= 3}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out gap-4"
                            style={{ transform: `translateX(-${suggestedSlideIndex * (100 / 3)}%)` }}
                        >
                            {suggestedProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex-shrink-0 w-1/3 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-full h-32 object-cover rounded mb-3 bg-gray-50"
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
                                            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                                        )}
                                        <span className="text-lg font-bold text-gray-900">
                                            ${product.price}
                                            <span className="text-sm font-normal text-gray-700">.99</span>
                                        </span>
                                    </div>
                                    <button className="w-full bg-orange-500 text-white py-2 px-4 rounded text-sm font-medium hover:bg-orange-600">
                                        Add to cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                <div className="p-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Similar Products</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={prevSimilar}
                                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                                disabled={similarProducts.length <= 3}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={nextSimilar}
                                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                                disabled={similarProducts.length <= 3}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out gap-4"
                            style={{ transform: `translateX(-${similarSlideIndex * (100 / 3)}%)` }}
                        >
                            {similarProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex-shrink-0 w-1/3 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-full h-32 object-cover rounded mb-3 bg-gray-50"
                                    />
                                    <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                                    <div className="flex items-center gap-2 mb-3">
                                        {product.originalPrice && (
                                            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                                        )}
                                        <span className="text-lg font-bold text-gray-900">
                                            ${product.price}
                                            <span className="text-sm font-normal">.00</span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
