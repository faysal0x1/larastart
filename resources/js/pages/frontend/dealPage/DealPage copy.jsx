import { Search, ChevronDown } from "lucide-react"
import ProductCard from "./DealProductCard"

export default function DealsPage({ products }) {
    // const products = [
    //     {
    //         id: 1,
    //         image: "/gaming-pc-computer-tower-with-rgb-lighting.jpg",
    //         title:
    //             "ABS Cyclone Ruby Gaming PC - Windows 11 - AMD Ryzen 7 9700X - GeForce RTX 5060 Ti - DLSS 4 - AI-Powered Performance - 32GB DDR5 6000 - 1TB M.2 NVMe SSD",
    //         brand: "ABS",
    //         brandLogo: "/abs-brand-logo.jpg",
    //         rating: 4.6,
    //         reviewCount: 120,
    //         currentPrice: 1499.99,
    //         originalPrice: 1699.99,
    //         discount: 11,
    //         promoCode: "SSEE89",
    //         promoDiscount: "$170",
    //         saleEndsIn: "14 Hours",
    //         freeShipping: true,
    //         shippingFrom: "United States",
    //         inCart: true,
    //         tags: ["AI Ready", "Lowest price in 30 Days"],
    //         tagColors: ["bg-blue-500", "bg-green-500"],
    //     },
    //     {
    //         id: 2,
    //         image: "/rgb-ram-memory-modules-ddr5.jpg",
    //         title:
    //             "CORSAIR Vengeance RGB 32GB (2 x 16GB) 288-Pin PC RAM DDR5 6000 (PC5 48000) Desktop Memory Model CMH32GX5M2E6000C36",
    //         brand: "CORSAIR",
    //         brandLogo: "/corsair-brand-logo.jpg",
    //         rating: 4.3,
    //         reviewCount: 129,
    //         currentPrice: 109.99,
    //         originalPrice: 114.99,
    //         discount: 4,
    //         saleEndsIn: "14 Hours",
    //         freeShipping: true,
    //         shippingFrom: "United States",
    //         inCart: false,
    //         tags: [],
    //         tagColors: [],
    //     },
    //     {
    //         id: 3,
    //         image: "/intel-processor-cpu-chip.jpg",
    //         title: "Intel Core Ultra 7 265KF, Arrow Lake 20-Core (8P+12E), LGA 1851, 125W Desktop Processor - BX80768265KF",
    //         brand: "Intel",
    //         brandLogo: "/intel-brand-logo.jpg",
    //         rating: 4.7,
    //         reviewCount: 139,
    //         currentPrice: 283.4,
    //         originalPrice: 399.99,
    //         discount: 29,
    //         promoCode: "SSE278",
    //         promoDiscount: "$110",
    //         saleEndsIn: "14 Hours",
    //         freeShipping: true,
    //         shippingFrom: "United States",
    //         inCart: false,
    //         tags: ["Newegg Select"],
    //         tagColors: ["bg-blue-600"],
    //     },
    //     {
    //         id: 4,
    //         image: "/oled-gaming-monitor-display-screen.jpg",
    //         title: 'MSI 27" (26.5" Viewable) 240 Hz OLED WQHD Gaming Monitor Adaptive Sync MAG 271QP QD-OLED X24',
    //         brand: "MSI",
    //         brandLogo: "/msi-brand-logo.jpg",
    //         rating: 4.0,
    //         reviewCount: 9,
    //         currentPrice: 499.99,
    //         originalPrice: 679.99,
    //         discount: 26,
    //         saleEndsIn: "14 Hours",
    //         freeShipping: true,
    //         shippingFrom: "United States",
    //         inCart: false,
    //         tags: ["Newegg Select"],
    //         tagColors: ["bg-blue-600"],
    //     },
    // ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Today's Best Deals</h1>

                    {/* Filter Bar */}
                    <div className="bg-white rounded-lg border p-4 mb-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            {/* Search */}
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search Within"
                                        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            {/* Sort By */}
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 text-sm">Sort By</span>
                                <div className="relative">
                                    <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option>Best Deals</option>
                                        <option>Best Sellers</option>
                                        <option>Best Rating</option>
                                        <option>Lowest Price</option>
                                        <option>Highest Price</option>
                                        <option>Most Reviews</option>
                                        <option>Biggest Discount</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Items Count and View */}
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{products.length} Items</span>
                                <div className="w-px h-4 bg-gray-300"></div>
                                <span>View</span>
                                <div className="relative">
                                    <select className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 pr-6 text-sm">
                                        <option>60</option>
                                        <option>96</option>
                                        <option>120</option>
                                    </select>
                                    <ChevronDown className="absolute right-1 top-1 h-3 w-3 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products[0]?.deal_of_the_day_product?.map((item, index) => (
                        <ProductCard key={index} product={item} />
                    ))}
                </div>

                {/* Countdown Banner */}
                <div className="mt-12 bg-white rounded-lg border p-8 text-center">
                    <div className="text-2xl font-bold text-gray-900">
                        <span className="text-black font-extrabold">15 hours</span>
                        <span className="text-blue-600 uppercase ml-2">UNTIL NEW DEALS ARE UNLOCKED...</span>
                    </div>
                </div>

                {/* See All Deals Button */}
                <div className="mt-8 text-center">
                    <button className="bg-white border border-gray-300 text-gray-700 px-12 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        See All Deals
                    </button>
                </div>
            </div>
        </div>
    )
}
