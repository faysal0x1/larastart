import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import ProductCard from "./ProductCard"
import { usePage, Link } from "@inertiajs/react";
import { useEffect, useState } from 'react'



export default function NewSelected({ onAddToCart }) {
    const { allProducts } = usePage().props
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/web/new-selected-products?limit=24', {
                    signal: controller.signal,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                if (!res.ok) throw new Error(`Request failed: ${res.status}`)
                const json = await res.json()
                setProducts(Array.isArray(json?.data) ? json.data : [])
            } catch (e) {
                if (e.name !== 'AbortError') {
                    setError(e.message || 'Failed to load products')
                }
            } finally {
                setLoading(false)
            }
        }
        load()
        return () => controller.abort()
    }, [])


    // Custom arrow components that avoid forwarding unknown props to DOM
    const PrevArrow = ({ className, onClick }) => (
        <button
            type="button"
            aria-label="Previous"
            className={className ? `slick-prev ${className}` : 'slick-prev'}
            onClick={onClick}
        />
    )

    const NextArrow = ({ className, onClick }) => (
        <button
            type="button"
            aria-label="Next"
            className={className ? `slick-next ${className}` : 'slick-next'}
            onClick={onClick}
        />
    )

    const customSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            // 👇 Ultra-wide and large desktop monitors
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    infinite: false,
                    arrows: true,
                },
            },
            // 👇 Normal desktops and laptops
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: false,
                    arrows: true,
                },
            },
            // 👇 Medium desktops / large tablets in landscape
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    arrows: true,
                },
            },
            // 👇 Tablets (landscape)
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3.5,
                    slidesToScroll: 3,
                    arrows: true,
                },
            },
            // 👇 Tablets (portrait) and small laptops
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: true,
                },
            },
            // 👇 Large phones / phablets (landscape)
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 2,
                    arrows: true,
                },
            },
            // 👇 Regular phones (portrait)
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false,
                    dots: false,
                },
            },
            // 👇 Small phones (e.g. older iPhone SE)
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                },
            },
            // 👇 Extra small screens (very old / embedded displays)
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                },
            },
        ],
    };

    return (
        <div className="max-w-[1680px] mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Tbz Select</h1>
                <Link href={route('products.index')} className="text-blue-600 hover:text-blue-700 font-medium">See More →</Link>
            </div>


            <div className=" my-3 relative">

                <style>{`
                    /* --- Arrow Buttons --- */
                    .slick-prev,
                    .slick-next {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        z-index: 10;
                        width: 48px;
                        height: 48px;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.7);
                        backdrop-filter: blur(6px);
                        border: 1px solid rgba(255, 255, 255, 0.4);
                        display: flex !important;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    }

                    .slick-prev:hover,
                    .slick-next:hover {
                        background: rgba(255, 255, 255, 0.9);
                        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
                        transform: translateY(-50%) scale(1.08);
                    }

                    .slick-prev {
                        left: -25px;
                    }

                    .slick-next {
                        right: -25px;
                    }

                    /* Remove default pseudo arrows */
                    .slick-prev:before,
                    .slick-next:before {
                        content: '';
                        display: none;
                    }

                    /* --- Custom chevron icons using borders --- */
                    .slick-prev::after,
                    .slick-next::after {
                        content: '';
                        display: block;
                        width: 12px;
                        height: 12px;
                        border-top: 2px solid #374151;
                        border-right: 2px solid #374151;
                        transition: border-color 0.3s ease;
                    }

                    .slick-prev::after {
                        transform: rotate(-135deg);
                    }

                    .slick-next::after {
                        transform: rotate(45deg);
                    }

                    .slick-prev:hover::after,
                    .slick-next:hover::after {
                        border-color: #111827;
                    }

                    /* Hide arrows on small screens */
                    @media (max-width: 640px) {
                        .slick-prev,
                        .slick-next {
                            display: none !important;
                        }
                    }
                `}</style>


                {error ? (
                    <div className="text-red-600">{error}</div>
                ) : loading ? (
                    <div>Loading...</div>
                ) : (
                    <Slider {...customSettings}>
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={onAddToCart} />
                            ))
                        ) : (
                            <div>No products available</div>
                        )}
                    </Slider>
                )}
            </div>

        </div>
    )
}
