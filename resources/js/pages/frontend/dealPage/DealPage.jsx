import { Search, ChevronDown, Clock, Zap, Filter } from "lucide-react"
import ProductCard from "./DealProductCard"
import { usePage } from "@inertiajs/react"
import { useMemo, useState } from "react"

export default function DealsPage() {
    const { products } = usePage().props;

    // Local UI state for filters
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("best_deals")
    const [pageSize, setPageSize] = useState(60)

    // Normalize list from server
    const allProducts = useMemo(() => {
        return Array.isArray(products?.[0]?.deal_of_the_day_product)
            ? products[0].deal_of_the_day_product
            : []
    }, [products])

    // Helpers to compute fields used for sorting/filtering
    const getTitle = (item) => (item?.product?.name ?? item?.name ?? "")
    const getDiscountPrice = (item) => {
        const p = item?.product ?? item
        const val = parseFloat(p?.discount_price)
        return isNaN(val) ? 0 : val
    }
    const getUnitPrice = (item) => {
        const p = item?.product ?? item
        const val = parseFloat(p?.unit_price)
        return isNaN(val) ? 0 : val
    }
    const getDiscountPercent = (item) => {
        const p = item?.product ?? item
        const explicit = parseFloat(p?.discount)
        if (!isNaN(explicit)) return explicit
        const unit = getUnitPrice(item)
        const disc = getDiscountPrice(item)
        if (unit > 0 && disc >= 0 && disc <= unit) {
            return Math.round(((unit - disc) / unit) * 100)
        }
        return 0
    }

    // Filter by search
    const filteredProducts = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        if (!q) return allProducts
        return allProducts.filter((item) => {
            const title = getTitle(item).toLowerCase()
            const tags = (item?.product?.tags ?? item?.tags ?? "")
                .toString()
                .toLowerCase()
            return title.includes(q) || tags.includes(q)
        })
    }, [allProducts, searchQuery])

    // Sort according to selection
    const sortedProducts = useMemo(() => {
        const copy = [...filteredProducts]
        switch (sortBy) {
            case "lowest_price":
                copy.sort((a, b) => getDiscountPrice(a) - getDiscountPrice(b))
                break
            case "highest_price":
                copy.sort((a, b) => getDiscountPrice(b) - getDiscountPrice(a))
                break
            case "biggest_discount":
            case "best_deals":
                copy.sort((a, b) => getDiscountPercent(b) - getDiscountPercent(a))
                break
            // Placeholders where data may not exist; keep stable order
            case "best_sellers":
            case "best_rating":
            case "most_reviews":
            default:
                break
        }
        return copy
    }, [filteredProducts, sortBy])

    const visibleProducts = useMemo(() => {
        return sortedProducts.slice(0, Number(pageSize) || 60)
    }, [sortedProducts, pageSize])
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Hero Section with Countdown */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center text-white">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                            <Zap className="h-5 w-5 text-yellow-300" />
                            <span className="text-sm font-medium">Limited Time Offers</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                            DEAL OF THE DAY
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Discover incredible savings on top tech products. New deals unlock every 24 hours!
                        </p>

                        {/* Countdown Timer */}
                        <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
                            <Clock className="h-6 w-6 text-yellow-300" />
                            <div className="text-center">
                                <div className="text-3xl font-bold">15</div>
                                <div className="text-xs text-blue-100">HOURS</div>
                            </div>
                            <div className="text-2xl text-white/60">:</div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">24</div>
                                <div className="text-xs text-blue-100">MINUTES</div>
                            </div>
                            <div className="text-2xl text-white/60">:</div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">58</div>
                                <div className="text-xs text-blue-100">SECONDS</div>
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-blue-100">
                            Until new deals are unlocked...
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-purple-500/20 rounded-full blur-xl"></div>
            </div>

            {/* Filter Section */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search with enhanced styling */}
                        <div className="flex-1 max-w-md">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search amazing deals..."
                                    className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:bg-white"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                        </div>

                        {/* Enhanced Filter Controls */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-gray-500" />
                                <span className="text-gray-600 text-sm font-medium">Sort By</span>
                            </div>
                            <div className="relative">
                                <select
                                    className="appearance-none bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-2.5 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="best_deals">Best Deals</option>
                                    <option value="best_sellers">Best Sellers</option>
                                    <option value="best_rating">Best Rating</option>
                                    <option value="lowest_price">Lowest Price</option>
                                    <option value="highest_price">Highest Price</option>
                                    <option value="most_reviews">Most Reviews</option>
                                    <option value="biggest_discount">Biggest Discount</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>

                            {/* Results info */}
                            <div className="flex items-center gap-4 text-sm text-gray-600 bg-white/50 rounded-xl px-4 py-2">
                                <span className="font-medium">{filteredProducts.length} Items</span>
                                <div className="w-px h-4 bg-gray-300"></div>
                                <span>View</span>
                                <div className="relative">
                                    <select
                                        className="appearance-none bg-transparent border-none pr-6 text-sm font-medium focus:ring-0"
                                        value={pageSize}
                                        onChange={(e) => setPageSize(Number(e.target.value))}
                                    >
                                        <option value={60}>60</option>
                                        <option value={96}>96</option>
                                        <option value={120}>120</option>
                                    </select>
                                    <ChevronDown className="absolute right-1 top-1 h-3 w-3 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid Section */}
            <div className="max-w-[1680px] mx-auto px-4 py-12">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-4">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-800">Featured Deals</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Today's Hottest Offers</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Hand-picked deals with massive savings. Limited quantities available!
                    </p>
                </div>

                {/* Enhanced Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {visibleProducts.map((item, index) => (
                        <div key={index} className="group">
                            <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                <ProductCard product={item} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action Section */}
                {/* <div className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-1">
                        <div className="bg-white rounded-3xl p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Don't Miss Out on Tomorrow's Deals!
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                New incredible offers are coming in just hours. Be the first to grab them!
                            </p>
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
                                See All Deals
                            </button>
                        </div>
                    </div>
                </div> */}

                {/* Newsletter Signup */}
                {/* <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50">
                    <div className="text-center max-w-2xl mx-auto">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Never Miss a Deal Again
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Get notified the moment new deals go live. Join thousands of smart shoppers!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
                                Notify Me
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
