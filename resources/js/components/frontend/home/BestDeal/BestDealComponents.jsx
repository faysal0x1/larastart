import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DealCard from './BestDeal.jsx';

export default function BestDealComponents({ onAddToCart, hideIfEmpty = false }) {
    const [beastDeals, setBeastDeals] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        async function load() {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch('/web/best-deals', {
                    signal: controller.signal,
                    headers: { 'Accept': 'application/json' }
                })
                if (!res.ok) throw new Error(`Request failed: ${res.status}`)
                const json = await res.json()

                // Reshape to flat list of {dealInfo, dealProduct}
                const flattened = (json?.data || []).flatMap(deal => {
                    const products = Array.isArray(deal.products) ? deal.products : []
                    return products.map(dp => ({
                        dealInfo: {
                            id: deal.id,
                            discount: deal.discount
                        },
                        dealProduct: dp
                    }))
                })
                setBeastDeals(flattened)
            } catch (e) {
                if (e.name !== 'AbortError') {
                    setError(e.message || 'Failed to load deals')
                }
            } finally {
                setLoading(false)
            }
        }
        load()
        return () => controller.abort()
    }, [])

    if (!loading && !error && hideIfEmpty && beastDeals.length === 0) {
        return null
    }

    return (
        <div className="max-w-[1680px] mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Today's Best Deals</h1>

            {error ? (
                <div className="text-center py-12 text-red-600">{error}</div>
            ) : loading ? (
                <div className="text-center py-12">Loading deals…</div>
            ) : beastDeals.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                        {beastDeals.map((item, index) => (
                            <DealCard
                                key={`deal-${item.dealInfo.id}-product-${item.dealProduct.id}-${index}`}
                                beastDeal={item}
                                onAddToCart={onAddToCart}
                            />
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Link
                            href={route('deal.page')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                        >
                            See all deals →
                        </Link>
                    </div>
                </>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No deals available at the moment.</p>
                </div>
            )}
        </div>
    )
}
