import "swiper/css"
import "swiper/css/navigation"
import "../../../../../css/swiperCustom.css"
import { swiperSettings } from "../../../../lib/swiperSettings"

import PrimaryProductCard from '@/components/frontend/productCard/PrimaryProductCard'
import { usePage, Link } from "@inertiajs/react";
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"


export default function LaptopSection({ onAddToCart }) {
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
                const res = await fetch('/web/laptop-section-products?limit=24', {
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
                <h1 className="text-3xl font-bold text-gray-900">Laptop</h1>
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
    )
}
