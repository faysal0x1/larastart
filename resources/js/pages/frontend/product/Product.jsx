"use client"

import { useState } from "react"

const ProductPage = () => {
    const [quantity, setQuantity] = useState(1)
    const [selectedColor, setSelectedColor] = useState("Pulse Red")
    const [activeTab, setActiveTab] = useState("Overview")

    const colorOptions = [
        { name: "Velocity Green", image: "https://c1.neweggimages.com/ProductImageCompressAll35/3B3-005D-00018-01.jpg" },
        { name: "Pulse Red", image: "https://c1.neweggimages.com/ProductImageCompressAll35/74-103-701-S01.jpg" },
        { name: "Electric Volt", image: "https://c1.neweggimages.com/ProductImageCompressAll35/74-103-708-12.jpg" },
        { name: "Deep Pink", image: "https://c1.neweggimages.com/ProductImageCompressAll35/74-103-738-01.jpg" },
        { name: "Shock Blue", image: "https://c1.neweggimages.com/ProductImageCompressAll35/74-103-742-07.png" },
        { name: "Carbon Black", image: "https://c1.neweggimages.com/ProductImageCompressAll35/74-103-743-01.jpg" },
        { name: "Robot White", image: "https://c1.neweggimages.com/ProductImageCompressAll35/74-103-750-08.jpg" },
    ]

    const productImages = [
        "https://c1.neweggimages.com/productimage/nb640/74-103-701-S01.jpg",
        "https://c1.neweggimages.com/productimage/nb640/74-103-701-01.png",
        "https://c1.neweggimages.com/productimage/nb640/74-103-701-S03.jpg",
        "https://c1.neweggimages.com/productimage/nb640/74-103-701-S02.jpg",
        "https://c1.neweggimages.com/productimage/nb640/74-103-701-S04.jpg",
        "https://c1.neweggimages.com/productimage/nb640/74-103-701-S06.jpg",
    ]

    const sellers = [
        {
            name: "antonline",
            rating: 4.5,
            totalRatings: 17935,
            price: 55.99,
            isTopRated: true,
            freeShipping: true,
        },
        {
            name: "Evo",
            rating: 4.3,
            totalRatings: 3,
            price: 55.58,
            isTopRated: false,
            freeShipping: true,
        },
        {
            name: "Electronic Express",
            rating: 4.4,
            totalRatings: 2699,
            price: 64.99,
            isTopRated: true,
            freeShipping: true,
        },
    ]

    return (
        <div className="bg-gray-50 text-gray-900 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Product Gallery */}
                            <div className="space-y-4">
                                {/* Brand Link */}
                                <div className="flex items-center space-x-2 mb-4">
                                    <img src="https://c1.neweggimages.com/brandimage/Brand1149.gif" alt="Microsoft" className="h-6" />
                                    <span className="text-blue-600 hover:underline cursor-pointer">Microsoft</span>
                                </div>

                                {/* Main Image */}
                                <div className="relative bg-white border rounded-lg p-4">
                                    <button className="absolute top-2 right-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                            />
                                        </svg>
                                    </button>
                                    <img
                                        src={productImages[0] || "/placeholder.svg"}
                                        alt="Xbox Wireless Controller - Pulse Red"
                                        className="w-full h-auto"
                                    />
                                </div>

                                {/* Thumbnail Images */}
                                <div className="grid grid-cols-6 gap-2">
                                    {productImages.map((image, index) => (
                                        <div key={index} className="border rounded cursor-pointer hover:border-blue-500 p-1">
                                            <img src={image || "/placeholder.svg"} alt={`View ${index + 1}`} className="w-full h-auto" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="space-y-6">
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-orange-500 text-white px-3 py-1 text-sm font-medium transform -skew-x-12">
                                        Shell Shocker
                                    </span>
                                    <span className="bg-blue-600 text-white px-3 py-1 text-sm font-medium transform -skew-x-12">
                                        Newegg Select
                                    </span>
                                </div>

                                {/* Brand Store Link */}
                                <a href="#" className="text-blue-600 hover:underline font-medium">
                                    Shop All Microsoft Products
                                </a>

                                {/* Product Title */}
                                <h1 className="text-2xl font-bold text-gray-900">Xbox Wireless Controller - Pulse Red</h1>

                                {/* Promo */}
                                <div className="flex items-center space-x-2 text-red-600">
                                    <svg className="w-6 h-6" viewBox="0 0 29 20" fill="currentColor">
                                        <path d="M5.24 11.09L5.24 13.95L8.07 13.95L8.07 15.55L5.24 15.55L5.24 18.37L3.63 18.37L3.63 15.55L0.80 15.55L0.80 13.95L3.63 13.95L3.63 11.09L5.24 11.09Z" />
                                    </svg>
                                    <span className="text-sm">$25 off w/ promo code SSEWA224, limited offer</span>
                                </div>

                                {/* Reviews */}
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="ml-2 text-sm text-gray-600">(76)</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        (1)
                                    </div>
                                    <a href="#" className="text-blue-600 hover:underline text-sm flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                        Write a Review
                                    </a>
                                </div>

                                {/* Price Tags */}
                                <div className="flex space-x-2">
                                    <span className="bg-green-500 text-white px-3 py-1 text-sm font-medium transform -skew-x-12">
                                        Lowest Price
                                    </span>
                                    <span className="bg-gray-300 text-gray-700 px-3 py-1 text-sm font-medium transform -skew-x-12">
                                        in 30 Days
                                    </span>
                                </div>

                                {/* Color Options */}
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium">Color:</span>
                                        <span className="font-bold">{selectedColor}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {colorOptions.map((color) => (
                                            <button
                                                key={color.name}
                                                onClick={() => setSelectedColor(color.name)}
                                                className={`border-2 rounded p-1 ${selectedColor === color.name ? "border-blue-500" : "border-gray-300"
                                                    }`}
                                            >
                                                <img
                                                    src={color.image || "/placeholder.svg"}
                                                    alt={color.name}
                                                    title={color.name}
                                                    className="w-8 h-8 object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Product Features */}
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li>• Experience the modernized design of the Xbox Wireless Controller in Pulse Red</li>
                                    <li>• Stay on target with textured grip on the triggers, bumpers, and back case</li>
                                    <li>• Make the controller your own by customizing button mapping with the Xbox Accessories app</li>
                                    <li>• Plug in any compatible headset with the 3.5mm audio headset jack</li>
                                    <li>• Includes Xbox Wireless and Bluetooth technology for wireless gaming</li>
                                </ul>

                                {/* Warranty Notice */}
                                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                                    <div className="flex">
                                        <div className="ml-3">
                                            <p className="text-sm text-blue-700">
                                                This item is covered under the{" "}
                                                <a href="#" className="underline">
                                                    Manufacturer Only Return Policy
                                                </a>
                                                .
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Tabs */}
                        <div className="mt-12">
                            <div className="border-b border-gray-200">
                                <nav className="flex space-x-8">
                                    {["Overview", "Specs", "Reviews"].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                                                ? "border-blue-500 text-blue-600"
                                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                                }`}
                                        >
                                            {tab}
                                            {tab === "Reviews" && <span className="text-gray-400 ml-1">(76)</span>}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="mt-6">
                                {activeTab === "Overview" && (
                                    <div className="prose max-w-none">
                                        <p>Product overview content would go here...</p>
                                    </div>
                                )}
                                {activeTab === "Specs" && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-medium">Learn more about the Microsoft QAU-00011</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-medium mb-2">General</h4>
                                                <dl className="space-y-1 text-sm">
                                                    <div className="flex">
                                                        <dt className="w-20 text-gray-600">Brand:</dt>
                                                        <dd>Microsoft</dd>
                                                    </div>
                                                    <div className="flex">
                                                        <dt className="w-20 text-gray-600">Model:</dt>
                                                        <dd>QAU-00011</dd>
                                                    </div>
                                                    <div className="flex">
                                                        <dt className="w-20 text-gray-600">Color:</dt>
                                                        <dd>Pulse Red</dd>
                                                    </div>
                                                    <div className="flex">
                                                        <dt className="w-20 text-gray-600">Type:</dt>
                                                        <dd>Controller</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeTab === "Reviews" && (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 mb-4">There are no reviews yet.</p>
                                        <p className="text-gray-600 mb-4">Do you own this product?</p>
                                        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Write a Review</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Buy Box */}
                        <div className="bg-white border rounded-lg p-6 space-y-4">
                            {/* Price Guarantee */}
                            <div className="flex items-center space-x-2">
                                <img
                                    src="https://c1.neweggimages.com/WebResource/Themes/Nest/icons/icon-price-guarantee.png"
                                    alt="Price match guarantee"
                                    className="h-6"
                                />
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <div className="flex items-baseline space-x-2">
                                    <span className="text-3xl font-bold">$59</span>
                                    <span className="text-xl">.99</span>
                                </div>
                                <div className="text-sm text-gray-500 line-through">$69.99</div>
                                <div className="bg-orange-500 text-white px-3 py-1 text-sm font-medium transform -skew-x-12 inline-block">
                                    Save: $10.00 (14%)
                                </div>
                                <div className="text-sm text-red-600 font-medium">Sale Ends Soon</div>
                            </div>

                            {/* Quantity and Add to Cart */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center border rounded">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-100">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <input
                                            type="text"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                                            className="w-12 text-center border-0 focus:ring-0"
                                        />
                                        <button onClick={() => setQuantity(Math.min(3, quantity + 1))} className="p-2 hover:bg-gray-100">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center space-x-2">
                                        <span>Add to cart</span>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-sm text-red-600">Limit 3 per customer.</div>
                                <div className="text-center">
                                    <button className="text-blue-600 hover:underline text-sm">Make an offer</button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5V7a9.5 9.5 0 0119 0v10z"
                                        />
                                    </svg>
                                    <span>Price alert</span>
                                </button>
                                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                    <span>Add to wish list</span>
                                </button>
                            </div>

                            {/* Seller Info */}
                            <div className="border-t pt-4 space-y-2">
                                <div className="text-sm">
                                    Sold by <strong>Newegg</strong>
                                </div>
                                <div className="text-sm">
                                    Shipped by{" "}
                                    <a href="#" className="text-blue-600 hover:underline">
                                        <strong>Newegg</strong>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Best Sellers */}
                        <div className="bg-white border rounded-lg p-6">
                            <h2 className="text-lg font-medium mb-4">Best Sellers</h2>
                            <div className="space-y-4">
                                {sellers.map((seller, index) => (
                                    <div key={index} className="border-b pb-4 last:border-b-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <a href="#" className="font-medium text-blue-600 hover:underline">
                                                    {seller.name}
                                                </a>
                                                {seller.isTopRated && (
                                                    <div className="flex items-center space-x-1">
                                                        <img
                                                            src="https://c1.neweggimages.com/WebResource/Themes/Nest/icons/pdp_TopRated.png"
                                                            alt="Top Rated"
                                                            className="h-4"
                                                        />
                                                        <span className="text-xs text-gray-600">Top Rated</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                <strong>{seller.rating}</strong> ({seller.totalRatings.toLocaleString()} total ratings)
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-bold">${seller.price}</div>
                                                {seller.freeShipping && <div className="text-xs text-green-600">+ FREE SHIPPING</div>}
                                            </div>
                                            <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Business Banner */}
                        <div className="bg-white border rounded-lg overflow-hidden">
                            <a href="#" target="_blank" rel="noreferrer">
                                <img
                                    src="https://c1.neweggimages.com/webresource/themes/Nest/DotComProductPageBanner.png"
                                    alt="Shop it at NeweggBusiness"
                                    className="w-full"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
