import { useState, useEffect, useCallback } from "react"
import { Head } from "@inertiajs/react"
import axios from "axios"

export default function BrandsPage() {
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedLetter, setSelectedLetter] = useState("ALL")
    const [sortBy, setSortBy] = useState("name")
    const [viewMode, setViewMode] = useState("grid") // grid or list
    const [groupedBrands, setGroupedBrands] = useState({})

    // Generate alphabet array
    const alphabet = ["ALL", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))]

    // Fetch all brands at once
    const fetchBrands = useCallback(async (search = "", letter = "ALL", sort = "name") => {
        try {
            setLoading(true)

            const params = new URLSearchParams({
                sort: sort,
            })

            if (search) {
                params.append("search", search)
            }

            let endpoint = "/brands/all"
            if (letter !== "ALL") {
                endpoint = "/brands/by-letter"
                params.append("letter", letter)
            }

            // Get all brands by setting a high per_page limit
            params.append("per_page", "1000")

            const response = await axios.get(`${endpoint}?${params}`)
            const allBrands = response.data.data || []

            setBrands(allBrands)
            setError(null)
        } catch (err) {
            console.error("Error fetching brands:", err)
            setError("Failed to load brands")
        } finally {
            setLoading(false)
        }
    }, [])

    // Group brands by first letter
    const groupBrandsByLetter = useCallback((brandsList) => {
        const grouped = {}
        brandsList.forEach(brand => {
            const firstLetter = brand.name.charAt(0).toUpperCase()
            if (!grouped[firstLetter]) {
                grouped[firstLetter] = []
            }
            grouped[firstLetter].push(brand)
        })
        return grouped
    }, [])

    // Initial load
    useEffect(() => {
        fetchBrands(searchTerm, selectedLetter, sortBy)
    }, [])

    // Group brands when they change
    useEffect(() => {
        if (selectedLetter === "ALL") {
            setGroupedBrands(groupBrandsByLetter(brands))
        }
    }, [brands, selectedLetter, groupBrandsByLetter])

    // Search handler with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchBrands(searchTerm, selectedLetter, sortBy)
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [searchTerm, selectedLetter, sortBy])

    // Handle search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    // Handle letter filter
    const handleLetterFilter = (letter) => {
        setSelectedLetter(letter)
    }

    // Handle sort change
    const handleSortChange = (sort) => {
        setSortBy(sort)
    }

    // Handle view mode toggle
    const toggleViewMode = () => {
        setViewMode(prev => prev === "grid" ? "list" : "grid")
    }

    const getBrandFallbackImage = (name) =>
        `https://placehold.co/200x64?text=${encodeURIComponent(name || "Brand")}`

    // Render brand card
    const renderBrandCard = (brand) => (
        <div
            key={brand.id}
            className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group ${viewMode === "list" ? "flex items-center p-4" : "p-6"
                }`}
        >
            <a href={route('web.slug', { slug: brand.slug })} className="block w-full">
                <div className={`${viewMode === "list" ? "flex items-center space-x-4" : "text-center"}`}>
                    <div className={`${viewMode === "list" ? "w-16 h-16" : "w-full h-32"} flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200`}>
                        <img
                            src={brand.image || getBrandFallbackImage(brand.name)}
                            alt={brand.name}
                            className={`max-w-full max-h-full object-contain ${viewMode === "list" ? "" : "group-hover:scale-105 transition-transform duration-300"
                                }`}
                            onError={(e) => {
                                if (e.currentTarget.dataset.fallbackApplied) {
                                    return
                                }
                                e.currentTarget.dataset.fallbackApplied = "true"
                                e.currentTarget.src = getBrandFallbackImage(brand.name)
                            }}
                        />
                    </div>
                    <div className={`${viewMode === "list" ? "flex-1" : "mt-4"}`}>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {brand.name}
                        </h3>
                        {viewMode === "list" && (
                            <p className="text-sm text-gray-500 mt-1">View products</p>
                        )}
                    </div>
                </div>
            </a>
        </div>
    )

    // Render loading skeleton
    const renderLoadingSkeleton = () => (
        <div className="animate-pulse">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <>
            <Head title="All Brands" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">All Brands</h1>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Discover products from your favorite brands. Browse through our extensive collection of brands and find exactly what you're looking for.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Search and Filters */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            {/* Search Bar */}
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search brands..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Sort and View Controls */}
                            <div className="flex items-center space-x-4">
                                <select
                                    value={sortBy}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="name">Sort by Name</option>
                                    <option value="id">Sort by ID</option>
                                    <option value="created_at">Sort by Date</option>
                                </select>

                                <button
                                    onClick={toggleViewMode}
                                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    title={`Switch to ${viewMode === "grid" ? "list" : "grid"} view`}
                                >
                                    {viewMode === "grid" ? (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Alphabet Filter */}
                        <div className="mt-6">
                            <div className="flex flex-wrap gap-2">
                                {alphabet.map((letter) => (
                                    <button
                                        key={letter}
                                        onClick={() => handleLetterFilter(letter)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedLetter === letter
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        {letter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {selectedLetter === "ALL" ? "All Brands" : `Brands starting with "${selectedLetter}"`}
                                {brands.length > 0 && (
                                    <span className="text-gray-500 font-normal ml-2">
                                        ({brands.length} {brands.length === 1 ? "brand" : "brands"})
                                    </span>
                                )}
                            </h2>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && renderLoadingSkeleton()}

                    {/* Error State */}
                    {error && (
                        <div className="text-center py-12">
                            <div className="text-red-600 mb-4">
                                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading brands</h3>
                            <p className="text-gray-500 mb-4">{error}</p>
                            <button
                                onClick={() => fetchBrands(1, searchTerm, selectedLetter, sortBy)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {/* Brand Count */}
                    {!loading && !error && brands.length > 0 && (
                        <div className="mb-6 text-center">
                            <p className="text-gray-600">
                                Showing {brands.length} brand{brands.length !== 1 ? 's' : ''}
                                {searchTerm && ` for "${searchTerm}"`}
                                {selectedLetter !== "ALL" && ` starting with "${selectedLetter}"`}
                            </p>
                        </div>
                    )}

                    {/* Brands Grid/List */}
                    {!loading && !error && (
                        <>
                            {selectedLetter === "ALL" ? (
                                // Grouped view for all brands
                                <div className="space-y-12">
                                    {Object.keys(groupedBrands)
                                        .sort()
                                        .map((letter) => (
                                            <div key={letter}>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                                                    {letter}
                                                </h3>
                                                <div className={`${viewMode === "grid"
                                                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                                                    : "space-y-4"
                                                    }`}>
                                                    {groupedBrands[letter].map(renderBrandCard)}
                                                </div>
                                            </div>
                                        ))}

                                </div>
                            ) : (
                                // Regular view for filtered brands
                                <div className={`${viewMode === "grid"
                                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                                    : "space-y-4"
                                    }`}>
                                    {brands.map(renderBrandCard)}
                                </div>
                            )}


                            {/* No brands found */}
                            {!loading && brands.length === 0 && !error && (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
                                    <p className="text-gray-500">
                                        {searchTerm ? `No brands found matching "${searchTerm}"` : "No brands available at the moment"}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
