
import { useState, useEffect } from "react"
import LazyImage from '@/components/LazyImage';
import { Link } from "@inertiajs/react";

export default function FeaturedBrands() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [visibleSlides, setVisibleSlides] = useState(5)
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

    useEffect(() => {
        const controller = new AbortController()
        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/web/brands?per_page=24&page=1', { signal: controller.signal, headers: { 'Accept': 'application/json' } })
                if (!res.ok) throw new Error(`Request failed: ${res.status}`)
                const json = await res.json()
                const list = Array.isArray(json?.data) ? json.data : []
                const mapped = list.map(b => ({
                    id: b.id,
                    name: b.name || 'Brand',
                    image: b.image || '/placeholder.svg',
                    url: '#'
                }))
                setBrands(mapped)
            } catch (e) {
                if (e.name !== 'AbortError') setError(e.message || 'Failed to load brands')
            } finally {
                setLoading(false)
            }
        }
        load()
        return () => controller.abort()
    }, [])

    const nextSlide = () => {
        if (currentIndex < brands.length - visibleSlides) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const canGoNext = currentIndex < Math.max(0, brands.length - visibleSlides)
    const canGoPrev = currentIndex > 0

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
                                width: `${brands.length > 0 ? (brands.length / visibleSlides) * 100 : 100}%`,
                            }}
                        >
                            {error ? (
                                <div className="w-full py-8 text-center text-red-600">{error}</div>
                            ) : loading ? (
                                <div className="w-full py-8 text-center">Loading…</div>
                            ) : brands.map((brand) => (
                                <div key={brand.id} className="flex-shrink-0 px-2" style={{ width: `${brands.length > 0 ? 100 / brands.length : 100}%` }}>
                                    <a
                                        href={brand.url}
                                        className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                                        title={brand.name}
                                    >
                                        <LazyImage
                                            src={brand.image || "/placeholder.svg"}
                                            alt={brand.name}
                                            className="w-full h-16"
                                            objectFit="contain"
                                            fallback={
                                                <div className="w-full h-16 flex items-center justify-center bg-gray-100 rounded">
                                                    <span className="text-xs text-gray-500 font-medium">{brand.name}</span>
                                                </div>
                                            }
                                        />
                                    </a>
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
