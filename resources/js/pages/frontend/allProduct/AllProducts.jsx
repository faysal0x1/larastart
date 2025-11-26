import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from '@/components/frontend/productCard/PrimaryProductCard';
import FilterSidebar from '@/components/frontend/filter/FilterSidebar';
import { Link, usePage } from '@inertiajs/react';
import CustomPagination from '@/components/CustomPagination';
import { ChevronLeft, ChevronRight, Grid3X3, List, Star, TrendingUp, Search } from 'lucide-react';
// import LazyImage from '@/components/LazyImage';

function Toolbar({
    page,
    totalPages,
    onPrev,
    onNext,
    pageSize,
    onChangePageSize,
    viewMode,
    onChangeViewMode,
    searchQuery,
    onChangeSearchQuery,
}) {
    const canPrev = page > 1;
    const canNext = page < totalPages;
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Pagination */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <span>Page</span>
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold text-xs">
                            {Math.min(page, totalPages)} of {totalPages}
                        </span>
                    </div>
                    <div className="flex rounded-lg overflow-hidden border border-gray-200">
                        <button
                            onClick={onPrev}
                            disabled={!canPrev}
                            className={`px-4 py-2 transition-colors duration-200 flex items-center gap-1 ${canPrev ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' : 'text-gray-300 cursor-not-allowed'}`}
                            title="Previous"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={onNext}
                            disabled={!canNext}
                            className={`px-4 py-2 border-l border-gray-200 transition-colors duration-200 flex items-center gap-1 ${canNext ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' : 'text-gray-300 cursor-not-allowed'}`}
                            title="Next"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6">
                    {/* Search */}
                    <div className="w-full max-w-xs">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder:text-gray-400 hover:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                                value={searchQuery}
                                onChange={(e) => onChangeSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                    </div>
                    {/* Sort (placeholder) */}
                    <div className="flex items-center gap-3">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <TrendingUp size={16} />
                            Sort By:
                        </label>
                        <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200">
                            <option>Featured Items</option>
                            <option>Lowest Price</option>
                            <option>Highest Price</option>
                            <option>Best Rating</option>
                        </select>
                    </div>

                    {/* View Count */}
                    <div className="flex items-center gap-3">
                        <label className="text-sm font-medium text-gray-700">Show:</label>
                        <select
                            value={pageSize}
                            onChange={(e) => onChangePageSize(Number(e.target.value))}
                            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                        >
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                            <option value={36}>36</option>
                            <option value={60}>60</option>
                            <option value={96}>96</option>
                        </select>
                    </div>

                    {/* View Mode */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">View:</span>
                        <div className="flex rounded-lg overflow-hidden border border-gray-200">
                            <button
                                onClick={() => onChangeViewMode('grid')}
                                className={`px-3 py-2 transition-all duration-200 flex items-center gap-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                                title="Grid View"
                            >
                                <Grid3X3 size={16} />
                                <span className="text-xs font-medium">Grid</span>
                            </button>
                            <button
                                onClick={() => onChangeViewMode('list')}
                                className={`px-3 py-2 border-l border-gray-200 transition-all duration-200 flex items-center gap-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                                title="List View"
                            >
                                <List size={16} />
                                <span className="text-xs font-medium">List</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ListProductCard({ product }) {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow hover:shadow-md transition-shadow duration-200 p-4">
            <div className="flex gap-4">
                <div className="flex-shrink-0 w-32 h-24 overflow-hidden rounded-lg border border-gray-100">
                    {/* <LazyImage src={product.img} alt={product.title} className="w-full h-full object-cover" /> */}
                    <img src={product.img} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <Link
                                href={route('web.slug', product.slug)}
                                className="text-base font-semibold text-gray-900 truncate hover:underline"
                            >
                                {product.title}
                            </Link>

                            {product.brandName ? (
                                <p className="text-sm text-gray-500 mt-0.5">{product.brandName}</p>
                            ) : null}
                            <div className="flex items-center gap-1 mt-1 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} />
                                ))}
                                <span className="text-xs text-gray-500 ml-1">({product.ratingCount})</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">৳{product.price?.toLocaleString()}</div>
                            {product.was ? (
                                <div className="text-xs text-gray-400 line-through">৳{product.was?.toLocaleString()}</div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper function to get product image
const getProductImage = (product) => {
    if (product?.image_url) return product.image_url;
    if (Array.isArray(product?.media) && product.media[0]?.original_url) return product.media[0].original_url;
    if (product?.product_thumbnail) return product.product_thumbnail;
    return 'https://via.placeholder.com/400x300?text=Product';
};

export default function AllProducts() {
    const { products } = usePage().props;
    const { url } = usePage();
    const [activeFilters, setActiveFilters] = useState({});
    const [viewMode, setViewMode] = useState('grid');
    const [pageSize, setPageSize] = useState(12);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const mappedProducts = useMemo(() => {
        const productList = Array.isArray(products) ? products : [];
        return productList.map(product => ({
            id: product.id,
            title: product.name || product.slug || 'Product',
            price: Number(product.final_price ?? product.unit_price ?? 0),
            was: product.discount_price ? Number(product.unit_price ?? product.final_price ?? 0) : null,
            img: getProductImage(product),
            tag: 'Free Shipping',
            brandName: product.brand?.name || '',
            brandImg: product.brand?.image_url || '',
            rating: Number(product.average_rating ?? 0),
            ratingCount: Array.isArray(product.product_reviews) ? product.product_reviews.length : 0,
            slug: product.slug,
        }));
    }, [products]);

    const filteredProducts = useMemo(() => {
        const searchTerm = searchQuery.trim().toLowerCase();
        if (!searchTerm) return mappedProducts;
        return mappedProducts.filter((product) => {
            const productTitle = (product.title || '').toLowerCase();
            const productBrand = (product.brandName || '').toLowerCase();
            return productTitle.includes(searchTerm) || productBrand.includes(searchTerm);
        });
    }, [mappedProducts, searchQuery]);

    const totalPages = useMemo(() => {
        const productCount = filteredProducts.length;
        return Math.max(1, Math.ceil(productCount / pageSize));
    }, [filteredProducts.length, pageSize]);

    const currentPageProducts = useMemo(() => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredProducts.slice(startIndex, endIndex);
    }, [filteredProducts, page, pageSize]);

    // Derived values for shared PaginationComponent (expects 0-based pageIndex)
    const paginationStartIndex = filteredProducts.length ? (page - 1) * pageSize + 1 : 0;
    const paginationEndIndex = filteredProducts.length ? Math.min(filteredProducts.length, page * pageSize) : 0;
    const showPagination = filteredProducts.length > 0;
    const getPageCount = () => totalPages;

    const goPrev = () => setPage((currentPage) => Math.max(1, currentPage - 1));
    const goNext = () => setPage((currentPage) => Math.min(totalPages, currentPage + 1));
    const changePageSize = (newPageSize) => {
        setPageSize(newPageSize);
        setPage(1);
    };
    const changeViewMode = (newViewMode) => setViewMode(newViewMode);

    const handleFiltersChange = (newFilters) => setActiveFilters(newFilters);

    // Sync local page with query string (?page=) so PaginationComponent navigation works
    useEffect(() => {
        try {
            const currentUrl = new URL(url, window.location.origin);
            const queryPage = Number(currentUrl.searchParams.get('page') || '1');
            const safePage = Number.isFinite(queryPage) && queryPage > 0 ? queryPage : 1;
            setPage((previousPage) => (previousPage !== safePage ? Math.min(totalPages, safePage) : previousPage));
        } catch (parseError) {
            // ignore parse errors
        }
    }, [url, totalPages]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
            {/* Header */}
            <div className="bg-white/90 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-40">
                <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 py-4 text-sm">
                        <Link href='#' className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline">
                            Components & Storage
                        </Link>
                        <ChevronRight size={16} className="text-gray-400" />
                        <span className="text-gray-900 font-semibold">Desktop Memory</span>
                    </nav>

                    {/* Title Section */}
                    <div className="flex items-center justify-between py-6">
                        <div className="flex items-center gap-4">
                            <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    Desktop Memory
                                </h1>
                                <p className="text-gray-600 mt-1">High-performance memory modules for your system</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="col-span-12 lg:col-span-2">
                        <div className="sticky top-32">

                            <FilterSidebar onFiltersChange={handleFiltersChange} />

                        </div>
                    </div>

                    {/* Products Area */}
                    <div className="col-span-12 lg:col-span-10 space-y-8">
                        {/* Featured Banner */}
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                            <img
                                src="https://promotions.newegg.com/corsair/25-0744/1920x360.png"
                                alt="Banner"
                                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-blue-900/30"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                            {/* Banner Content */}
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-xl font-bold mb-2">Featured Products</h3>
                                <p className="text-white/90 text-sm">Discover the latest in high-performance memory</p>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"></div>
                            <div className="absolute bottom-4 right-16 w-8 h-8 bg-blue-400/20 rounded-full backdrop-blur-sm"></div>
                        </div>

                        {/* Toolbar */}
                        <Toolbar
                            page={page}
                            totalPages={totalPages}
                            onPrev={goPrev}
                            onNext={goNext}
                            pageSize={pageSize}
                            onChangePageSize={changePageSize}
                            viewMode={viewMode}
                            onChangeViewMode={changeViewMode}
                            searchQuery={searchQuery}
                            onChangeSearchQuery={setSearchQuery}
                        />

                        {/* Products Area */}
                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                                    {currentPageProducts.map((product) => (
                                        <div key={product.id} className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                                            <ProductCard
                                                product={product}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {currentPageProducts.map((product) => (
                                        <ListProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            )}

                            {/* No products message */}
                            {currentPageProducts.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-gray-500 text-lg font-medium mb-2">No products found</div>
                                    <p className="text-gray-400">Try adjusting your search or filters</p>
                                </div>
                            )}
                        </div>

                        {/* Custom Pagination Component */}
                        {showPagination && (
                            <CustomPagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                                totalItems={filteredProducts.length}
                                itemsPerPage={pageSize}
                                startIndex={paginationStartIndex}
                                endIndex={paginationEndIndex}
                            />
                        )}


                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}
