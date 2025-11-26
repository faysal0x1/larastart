

import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from '@inertiajs/react'

export default function FeaturedBrands() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [visibleSlides, setVisibleSlides] = useState(5)
    const [brandsData, setBrandsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch brands data from API
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setLoading(true)
                const response = await axios.get('/brands/featured')
                setBrandsData(response.data.data || [])
                setError(null)
            } catch (err) {
                console.error('Error fetching brands:', err)
                setError('Failed to load brands')
                setBrandsData([])
            } finally {
                setLoading(false)
            }
        }

        fetchBrands()
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisibleSlides(2)
            } else if (window.innerWidth < 768) {
                setVisibleSlides(3)
            } else if (window.innerWidth < 1024) {
                setVisibleSlides(4)
            } else {
                setVisibleSlides(5)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const nextSlide = () => {
        if (currentIndex < brandsData.length - visibleSlides) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const canGoNext = currentIndex < brandsData.length - visibleSlides
    const canGoPrev = currentIndex > 0

    // Show loading state
    if (loading) {
        return (
            <div className="py-8 bg-white" id="homepage-featuredBrands">
                <div className="max-w-[1680px] mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-blue-600">Featured Brands</h2>
                    </div>
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600">Loading brands...</span>
                    </div>
                </div>
            </div>
        )
    }

    // Show error state
    if (error) {
        return (
            <div className="py-8 bg-white" id="homepage-featuredBrands">
                <div className="max-w-[1680px] mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-blue-600">Featured Brands</h2>
                    </div>
                    <div className="flex justify-center items-center py-12">
                        <div className="text-center">
                            <p className="text-red-600 mb-2">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="text-blue-600 hover:text-blue-800 underline"
                            >
                                Try again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Show empty state if no brands
    if (brandsData.length === 0) {
        return (
            <div className="py-8 bg-white" id="homepage-featuredBrands">
                <div className="max-w-[1680px] mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-blue-600">Featured Brands</h2>
                    </div>
                    <div className="flex justify-center items-center py-12">
                        <p className="text-gray-600">No featured brands available at the moment.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="py-8 bg-white" id="homepage-featuredBrands">
            <div className="max-w-[1680px] mx-auto px-4">
                {/* Section Title */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-blue-600">Featured Brands</h2>
                    <div className="flex items-center">
                        <Link
                            href={route('brands.page')}
                            className="text-gray-600 text-sm hover:text-blue-600 flex items-center gap-1"
                        >
                            <span>See More</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Slider Container */}
                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
                                width: `${(brandsData.length / visibleSlides) * 100}%`,
                            }}
                        >
                            {brandsData.map((brand) => (
                                <div key={brand.id} className="flex-shrink-0 px-2" style={{ width: `${100 / brandsData.length}%` }}>
                                    <Link
                                        href={brand.url || '#'}
                                        className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                                        title={brand.name}
                                    >
                                        <img
                                            src={brand.image || "/placeholder.svg"}
                                            alt={brand.name}
                                            className="w-full h-16 object-contain"
                                            onError={(e) => {
                                                e.target.src = `/placeholder.svg?height=64&width=200&text=${encodeURIComponent(brand.name)}`
                                            }}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        disabled={!canGoPrev}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${canGoPrev ? "hover:bg-gray-50 text-gray-700" : "text-gray-300 cursor-not-allowed"
                            }`}
                        aria-label="Previous slide"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        disabled={!canGoNext}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${canGoNext ? "hover:bg-gray-50 text-gray-700" : "text-gray-300 cursor-not-allowed"
                            }`}
                        aria-label="Next slide"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
