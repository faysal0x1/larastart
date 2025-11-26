import React, { useMemo, useState } from 'react';
import ProductCard from '@/components/frontend/productCard/PrimaryProductCard';
import FilterSidebar from '@/components/frontend/filter/FilterSidebar';
import { usePage } from '@inertiajs/react';



function Toolbar() {
    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-sm">
                <span>Page</span>
                <strong>1/20</strong>
                <div className="ml-2 inline-flex rounded border border-gray-300 overflow-hidden">
                    <button className="px-3 py-1 hover:bg-gray-50" title="Prev">&lt;</button>
                    <button className="px-3 py-1 hover:bg-gray-50" title="Next">&gt;</button>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <label className="text-sm">Sort By:</label>
                <select className="rounded border border-gray-300 bg-white px-2 py-1 text-sm">
                    <option>Featured Items</option>
                    <option>Lowest Price</option>
                    <option>Highest Price</option>
                    <option>Best Rating</option>
                </select>
                <label className="text-sm">View:</label>
                <select className="rounded border border-gray-300 bg-white px-2 py-1 text-sm">
                    <option>36</option>
                    <option>60</option>
                    <option>96</option>
                </select>
            </div>
        </div>
    );
}

// Normalize backend product for PrimaryProductCard without changing design
const getProductImage = (p) => {
    if (Array.isArray(p?.media) && p.media[0]?.original_url) return p.media[0].original_url;
    if (Array.isArray(p?.multi_images) && p.multi_images[0]?.photo) return p.multi_images[0].photo;
    if (Array.isArray(p?.multiImages) && p.multiImages[0]?.photo) return p.multiImages[0].photo;
    if (p?.image_url) return p.image_url;
    if (p?.product_thumbnail) return p.product_thumbnail;
    return 'https://via.placeholder.com/400x300?text=Product';
};

const mapBackendToCard = (p) => ({
    id: p.id,
    title: p.name || p.title || p.slug || 'Product',
    price: Number(p.final_price ?? p.unit_price ?? p.price ?? 0),
    was: p.discount_price ? Number(p.unit_price ?? p.final_price ?? 0) : null,
    img: getProductImage(p),
    tag: 'Free Shipping',
    brandName: p.brand?.name || '',
    brandImg: p.brand?.image_url || (Array.isArray(p.brand?.media) && p.brand.media[0]?.original_url) || '',
    rating: Number(p.average_rating ?? 0),
    ratingCount: Array.isArray(p.product_reviews || p.productReviews) ? (p.product_reviews || p.productReviews).length : 0,
});

export default function AllProducts() {
    const { products: backendProducts } = usePage().props;
    const [activeFilters, setActiveFilters] = useState({});
    const products = useMemo(() => {
        const list = Array.isArray(backendProducts) ? backendProducts : [];
        return list.map(mapBackendToCard);
    }, [backendProducts]);
    const handleFiltersChange = (next) => setActiveFilters(next);
    return (
        <div className="min-h-screen bg-white">
            <div className="border-b border-gray-200 bg-white/80 backdrop-blur">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 py-3 text-sm text-blue-700 font-semibold">
                        <a href="#" className="hover:underline">Components &amp; Storage</a>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-bold">Desktop Memory</span>
                    </nav>
                    <div className="flex items-center justify-between py-3">
                        <h1 className="text-2xl font-bold text-gray-900">Desktop Memory</h1>
                        <div className="hidden md:flex gap-4 text-blue-700 font-semibold">
                            <a href="#" className="hover:underline">Best Sellers</a>
                            <a href="#" className="hover:underline">Lowest Price</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-2">
                    <FilterSidebar onFiltersChange={handleFiltersChange} />
                </div>
                <div className="col-span-12 lg:col-span-9 space-y-6">
                    <div className="relative overflow-hidden rounded-md">
                        <img
                            src="https://promotions.newegg.com/corsair/25-0744/1920x360.png"
                            alt="Banner"
                            className="h-48 w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                    </div>

                    <Toolbar />

                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 ">
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>

                    <Toolbar />
                </div>
            </div>
        </div>
    );
}


