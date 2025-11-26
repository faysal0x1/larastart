import { useEffect, useState } from 'react'
import PrimaryProductCard from '@/components/frontend/productCard/PrimaryProductCard'

export default function AllProductsGrid({ onAddToCart }) {
    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [perPage] = useState(12)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [hasMore, setHasMore] = useState(true)

    const load = async (nextPage = 1) => {
        try {
            setLoading(true)
            setError(null)
            const res = await fetch(`/web/products?per_page=${perPage}&page=${nextPage}`, {
                headers: { 'Accept': 'application/json' },
                credentials: 'include'
            })
            if (!res.ok) throw new Error(`Request failed: ${res.status}`)
            const json = await res.json()
            const data = Array.isArray(json?.data) ? json.data : []
            setItems(prev => nextPage === 1 ? data : [...prev, ...data])
            setHasMore((json?.meta?.current_page || 1) < (json?.meta?.last_page || 1))
            setPage(nextPage)
        } catch (e) {
            setError(e.message || 'Failed to load products')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        load(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            load(page + 1)
        }
    }

    return (
        <div className="max-w-[1680px] mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">All Products</h2>
            </div>

            {error ? (
                <div className="text-red-600">{error}</div>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {items.map(p => (
                            <PrimaryProductCard key={p.id} product={p} />
                        ))}
                    </div>

                    <div className="mt-6 flex justify-center">
                        {hasMore ? (
                            <button
                                type="button"
                                onClick={handleLoadMore}
                                disabled={loading}
                                className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Loading…' : 'Load more'}
                            </button>
                        ) : (
                            <span className="text-gray-500">No more products</span>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}


