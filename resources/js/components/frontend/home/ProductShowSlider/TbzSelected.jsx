import "swiper/css"
import "swiper/css/navigation"
import "../../../../../css/swiperCustom.css"
import { swiperSettings } from "../../../../lib/swiperSettings"
import PrimaryProductCard from '@/components/frontend/productCard/PrimaryProductCard'

import { usePage, Link } from "@inertiajs/react";
import { useEffect, useState } from 'react'
// **IMPORT SWIPER COMPONENTS**
import { Swiper, SwiperSlide } from "swiper/react"


export default function TbzSelected({ onAddToCart }) {
    const { allProducts } = usePage().props
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // const swiperSettings = {
    //     dots: false,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 6,
    //     slidesToScroll: 6,
    //     arrows: true,
    //     prevArrow: <button className="slick-prev">Previous</button>,
    //     nextArrow: <button className="slick-next">Next</button>,
    //     responsive: [
    //         // 👇 Ultra-wide and large desktop monitors
    //         {
    //             breakpoint: 1920,
    //             settings: {
    //                 slidesToShow: 6,
    //                 slidesToScroll: 6,
    //                 infinite: false,
    //                 arrows: true,
    //             },
    //         },
    //         // 👇 Normal desktops and laptops
    //         {
    //             breakpoint: 1440,
    //             settings: {
    //                 slidesToShow: 5,
    //                 slidesToScroll: 5,
    //                 infinite: false,
    //                 arrows: true,
    //             },
    //         },
    //         // 👇 Medium desktops / large tablets in landscape
    //         {
    //             breakpoint: 1280,
    //             settings: {
    //                 slidesToShow: 4,
    //                 slidesToScroll: 4,
    //                 infinite: true,
    //                 arrows: true,
    //             },
    //         },
    //         // 👇 Tablets (landscape)
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 3.5,
    //                 slidesToScroll: 3,
    //                 arrows: true,
    //             },
    //         },
    //         // 👇 Tablets (portrait) and small laptops
    //         {
    //             breakpoint: 900,
    //             settings: {
    //                 slidesToShow: 3,
    //                 slidesToScroll: 3,
    //                 infinite: true,
    //                 arrows: true,
    //             },
    //         },
    //         // 👇 Mobile devices (landscape)
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 slidesToShow: 2.5,
    //                 slidesToScroll: 2,
    //                 infinite: true,
    //                 arrows: true,
    //             },
    //         },
    //         // 👇 Mobile devices (portrait)
    //         {
    //             breakpoint: 640,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 2,
    //                 infinite: true,
    //                 arrows: false,
    //             },
    //         },
    //         // 👇 Small mobile devices
    //         {
    //             breakpoint: 480,
    //             settings: {
    //                 slidesToShow: 1.5,
    //                 slidesToScroll: 1,
    //                 infinite: true,
    //                 arrows: false,
    //             },
    //         },
    //     ],
    // };

    useEffect(() => {
        const controller = new AbortController()
        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/web/tbz-selected-products?limit=24', {
                    signal: controller.signal,
                    headers: { 'Accept': 'application/json' }
                })
                if (!res.ok) throw new Error(`Request failed: ${res.status}`)
                const json = await res.json()
                setProducts(Array.isArray(json?.data) ? json.data : [])
            } catch (e) {
                if (e.name !== 'AbortError') setError(e.message || 'Failed to load products')
            } finally {
                setLoading(false)
            }
        }
        load()
        return () => controller.abort()
    }, [])

    return (
        <div className="max-w-[1680px] mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">TBZ Selected</h1>
                <Link href={route('products.index')} className="text-blue-600 hover:text-blue-700 font-medium">See More →</Link>
            </div>

            <div className=" my-3 relative">


                {error ? (
                    <div className="text-red-600">{error}</div>
                ) : loading ? (
                    <div>Loading...</div>
                ) : (
                    <Swiper {...swiperSettings}>
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <PrimaryProductCard product={product} />
                                </SwiperSlide>
                            ))
                        ) : (
                            <div>No products available</div>
                        )}
                    </Swiper>
                )}
            </div>
        </div>
    );
}
