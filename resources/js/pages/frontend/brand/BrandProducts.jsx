import React, { useMemo, useState } from 'react';
import ProductCard from '@/components/frontend/productCard/PrimaryProductCard';
import ListProductCard from '@/components/frontend/productCard/ListProductCard';
import BrandFilterSidebar from '@/components/frontend/filter/BrandFilterSidebar';
import ProductToolbar from '@/components/frontend/ProductToolbar';
import { Link, router, usePage } from '@inertiajs/react';
import CustomPagination from '@/components/CustomPagination';
import RenderedContent from '@/components/RenderedContent';
import { ChevronLeft, ChevronRight, Award, Filter, X } from 'lucide-react';
import { getProductImage } from '@/lib/ecomHelper.js';

export default function BrandProducts() {
    const { products, brand } = usePage().props;
    const [activeFilters, setActiveFilters] = useState({});
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // Extract paginated data
    const productList = products?.data || [];
    const currentPage = products?.current_page || 1;
    const lastPage = products?.last_page || 1;
    const perPage = products?.per_page || 12;
    const total = products?.total || 0;

    const mappedProducts = useMemo(() => {
        return productList.map(product => ({
            id: product.id,
            title: product.name || product.slug || 'Product',
            price: Number(product.final_price ?? product.unit_price ?? 0),
            call_for_price: product.call_for_price,
            call_for_price_number: product.call_for_price_number,
            was: product.discount_price ? Number(product.unit_price ?? product.final_price ?? 0) : null,
            img: getProductImage(product),
            tag: 'Free Shipping',
            brandName: product.brand?.name || '',
            brandImg: product.brand?.image_url || '',
            rating: Number(product.average_rating ?? 0),
            ratingCount: Array.isArray(product.product_reviews) ? product.product_reviews.length : 0,
            slug: product.slug,
            stock: product.stock || 0,
            isNew: product.is_new || false,
        }));
    }, [productList]);

    // Client-side filtering (search and filters)
    const filteredProducts = useMemo(() => {
        let filtered = mappedProducts;

        // Apply search filter
        const searchTerm = searchQuery.trim().toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter((product) => {
                const productTitle = (product.title || '').toLowerCase();
                const productBrand = (product.brandName || '').toLowerCase();
                return productTitle.includes(searchTerm) || productBrand.includes(searchTerm);
            });
        }

        // Apply active filters (similar to CategoryProducts)
        if (Object.keys(activeFilters).length > 0) {
            filtered = filtered.filter((product) => {
                // In Stock filter
                if (activeFilters.inStock && (!product.stock || product.stock <= 0)) {
                    return false;
                }

                // On Sale filter
                if (activeFilters.onSale && !product.was) {
                    return false;
                }

                // Free Shipping filter
                if (activeFilters.freeShipping && product.tag !== 'Free Shipping') {
                    return false;
                }

                // New filter
                if (activeFilters.isNew && !product.isNew) {
                    return false;
                }

                // Brand filter
                if (activeFilters.brands && activeFilters.brands.length > 0) {
                    const productBrand = (product.brandName || '').toLowerCase();
                    const hasMatchingBrand = activeFilters.brands.some((brand) => productBrand.includes(brand.toLowerCase()));
                    if (!hasMatchingBrand) return false;
                }

                // Rating filter
                if (activeFilters.rating && activeFilters.rating.length > 0) {
                    const hasMatchingRating = activeFilters.rating.some((rating) => product.rating >= parseFloat(rating));
                    if (!hasMatchingRating) return false;
                }

                // Price filters
                const hasMin = activeFilters.priceMin !== undefined && activeFilters.priceMin !== '';
                const hasMax = activeFilters.priceMax !== undefined && activeFilters.priceMax !== '';
                if (hasMin && product.price < Number(activeFilters.priceMin)) return false;
                if (hasMax && product.price > Number(activeFilters.priceMax)) return false;

                // Price range filter (predefined ranges)
                if (!hasMin && !hasMax && activeFilters.priceRange && activeFilters.priceRange.length > 0) {
                    const inAnyRange = activeFilters.priceRange.some((rangeStr) => {
                        if (typeof rangeStr !== 'string') return false;
                        if (rangeStr.endsWith('+')) {
                            const min = Number(rangeStr.replace('+', ''));
                            return product.price >= min;
                        }
                        const parts = rangeStr.split('-');
                        if (parts.length !== 2) return false;
                        const min = Number(parts[0]);
                        const max = Number(parts[1]);
                        if (Number.isNaN(min) || Number.isNaN(max)) return false;
                        return product.price >= min && product.price <= max;
                    });
                    if (!inAnyRange) return false;
                }

                return true;
            });
        }

        return filtered;
    }, [mappedProducts, searchQuery, activeFilters]);

    // Pagination handlers
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > lastPage) return;

        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('page', newPage.toString());

        router.get(currentUrl.pathname + currentUrl.search, {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handlePageSizeChange = (newPageSize) => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('per_page', newPageSize.toString());
        currentUrl.searchParams.set('page', '1'); // Reset to first page

        router.get(currentUrl.pathname + currentUrl.search, {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const changeViewMode = (newViewMode) => setViewMode(newViewMode);

    const handleFiltersChange = (newFilters) => {
        setActiveFilters(newFilters);
        // Reset to first page when filters change
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('page', '1');
        router.get(currentUrl.pathname + currentUrl.search, {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const clearAllFilters = () => {
        setActiveFilters({});
        setSearchQuery('');
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('page', '1');
        router.get(currentUrl.pathname + currentUrl.search, {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    // Calculate pagination display values
    const paginationStartIndex = total > 0 ? (currentPage - 1) * perPage + 1 : 0;
    const paginationEndIndex = total > 0 ? Math.min(total, currentPage * perPage) : 0;
    const showPagination = total > 0;

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
            {/* Header */}
            <div className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/90 shadow-sm backdrop-blur-md">
                <div className="mx-auto w-full max-w-[1680px] px-2.5 sm:px-4 md:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex flex-wrap items-center gap-1 py-2.5 text-[10px] sm:gap-1.5 sm:py-3 sm:text-xs md:gap-2 md:py-4 md:text-sm" aria-label="Breadcrumb">
                        <Link
                            href={route('home')}
                            className="whitespace-nowrap font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline"
                        >
                            Home
                        </Link>
                        <ChevronRight size={12} className="flex-shrink-0 text-gray-400 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                        <Link
                            href={route('products.index')}
                            className="whitespace-nowrap font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline"
                        >
                            Products
                        </Link>
                        <ChevronRight size={12} className="flex-shrink-0 text-gray-400 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                        <span className="truncate font-semibold text-gray-900" aria-current="page">{brand?.name || 'Brand'}</span>
                    </nav>

                    {/* Title Section */}
                    <div className="flex flex-col gap-2.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-4 md:py-5 lg:py-6">
                        <div className="flex min-w-0 flex-1 items-start gap-2 sm:items-center sm:gap-3 md:gap-4">
                            <div className="hidden h-6 w-0.5 rounded-full bg-gradient-to-b from-blue-500 to-purple-600 sm:block sm:h-8 md:h-10 lg:h-12"></div>
                            <div className="min-w-0 flex-1 overflow-hidden">
                                <h1 className="flex flex-wrap items-center gap-1.5 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-lg font-bold text-transparent sm:gap-2 sm:text-xl md:gap-3 md:text-2xl lg:text-3xl">
                                    <Award className="h-4 w-4 flex-shrink-0 text-blue-500 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
                                    <span className="break-words">{brand?.name || 'Brand Products'}</span>
                                </h1>
                                <p className="mt-1 flex flex-wrap items-center gap-1 text-[10px] text-gray-600 sm:gap-1.5 sm:text-xs md:text-sm">
                                    <span className="break-words">
                                        {total} products from {brand?.name || 'this brand'}
                                    </span>
                                    {Object.keys(activeFilters).length > 0 && (
                                        <span className="flex-shrink-0 rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] text-blue-800 sm:px-2 sm:py-1 sm:text-xs">
                                            {Object.keys(activeFilters).length} filter{Object.keys(activeFilters).length !== 1 ? 's' : ''} applied
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setMobileFilterOpen(true)}
                            className="flex min-h-[40px] flex-shrink-0 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 sm:min-h-0 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm lg:hidden"
                        >
                            <Filter size={16} className="sm:w-[18px] sm:h-[18px]" />
                            <span className="hidden xs:inline sm:inline">Filters</span>
                            {Object.keys(activeFilters).length > 0 && (
                                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white sm:h-5 sm:w-5 sm:text-xs">
                                    {Object.keys(activeFilters).length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto w-full max-w-[1680px] px-2.5 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
                <div className="grid w-full grid-cols-12 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                    {/* Sidebar - Hidden on mobile, shown in drawer */}
                    <div className="hidden md:block md:col-span-3 lg:col-span-2">
                        <div className="sticky top-24 md:top-28 lg:top-32">
                            <BrandFilterSidebar
                                onFiltersChange={handleFiltersChange}
                                activeFilters={activeFilters}
                                onClearFilters={clearAllFilters}
                            />
                        </div>
                    </div>

                    {/* Products Area */}
                    <div className="col-span-12 w-full min-w-0 space-y-3 sm:col-span-12 sm:space-y-4 md:col-span-9 md:space-y-6 lg:col-span-10 lg:space-y-8">
                        {/* Brand Banner */}
                        <div className="group relative w-full overflow-hidden rounded-lg shadow-lg sm:rounded-xl md:rounded-2xl">
                            {/* Header Area */}
                            <div className="flex h-24 w-full items-center justify-center bg-gradient-to-r from-purple-500 to-pink-600 sm:h-28 md:h-32 lg:h-36">
                                <div className="text-center text-white">
                                    <Award className="mx-auto mb-1 h-5 w-5 sm:mb-1.5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
                                    <h3 className="mb-0.5 text-sm font-semibold sm:text-base md:text-lg">
                                        {brand?.name || 'Brand'}
                                    </h3>
                                    <p className="text-[10px] text-white/80 sm:text-xs">
                                        Discover trusted products
                                    </p>
                                </div>
                            </div>

                            {/* Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-purple-900/20"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                            {/* Subtle Decorative Elements */}
                            <div className="absolute top-1 right-1 h-4 w-4 rounded-full bg-white/10 backdrop-blur-sm sm:h-5 sm:w-5 md:h-6 md:w-6"></div>
                            <div className="absolute right-3 bottom-1 h-2.5 w-2.5 rounded-full bg-purple-400/20 backdrop-blur-sm sm:h-3 sm:w-3 md:h-4 md:w-4"></div>
                        </div>


                        {/* Brand Description (Top) */}
                        {brand?.description && (
                            <div className="w-full min-w-0 overflow-x-hidden rounded-lg border border-white/50 bg-white/80 p-3 shadow-lg backdrop-blur-sm sm:rounded-xl sm:p-4 md:rounded-2xl md:p-6">
                                <RenderedContent
                                    html={brand.description}
                                    className="prose prose-xs max-w-none text-[10px] text-gray-700 prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 sm:text-xs md:prose-sm md:text-sm"
                                />
                            </div>
                        )}

                        {/* Toolbar */}
                        <ProductToolbar
                            page={currentPage}
                            totalPages={lastPage}
                            onPrev={() => handlePageChange(currentPage - 1)}
                            onNext={() => handlePageChange(currentPage + 1)}
                            pageSize={perPage}
                            onChangePageSize={handlePageSizeChange}
                            viewMode={viewMode}
                            onChangeViewMode={changeViewMode}
                            searchQuery={searchQuery}
                            onChangeSearchQuery={setSearchQuery}
                            showPageSizeSelector={true}
                        />

                        {/* Products Area */}
                        <div className="w-full min-w-0 rounded-lg border border-white/50 bg-white/50 p-2.5 shadow-lg backdrop-blur-sm sm:rounded-xl sm:p-3 md:rounded-2xl md:p-4 lg:p-6 xl:p-8">
                            {viewMode === 'grid' ? (
                                <div className="grid w-full max-w-full grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-y-3 md:grid-cols-2 md:gap-y-4 lg:grid-cols-3 lg:gap-y-4 xl:grid-cols-4 xl:gap-y-5 2xl:grid-cols-4 2xl:gap-y-6">
                                    {filteredProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="w-full min-w-0 max-w-full transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                                        >
                                            <ProductCard product={product} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex w-full min-w-0 flex-col gap-2.5 sm:gap-3 md:gap-4">
                                    {filteredProducts.map((product) => (
                                        <ListProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            )}

                            {/* No products message */}
                            {filteredProducts.length === 0 && (
                                <div className="py-6 text-center sm:py-8 md:py-12">
                                    <div className="mb-1.5 text-sm font-medium text-gray-500 sm:mb-2 sm:text-base md:text-lg">No products found</div>
                                    <p className="text-xs text-gray-400 sm:text-sm md:text-base">Try adjusting your search or filters</p>
                                </div>
                            )}
                        </div>

                        {/* Brand Bottom Description */}
                        {brand?.bottom_description && (
                            <div className="w-full min-w-0 overflow-x-hidden rounded-lg border border-white/50 bg-white/80 p-3 shadow-lg backdrop-blur-sm sm:rounded-xl sm:p-4 md:rounded-2xl md:p-6">
                                <RenderedContent
                                    html={brand.bottom_description}
                                    className="prose prose-xs max-w-none text-[10px] text-gray-700 prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 sm:text-xs md:prose-sm md:text-sm"
                                />
                            </div>
                        )}

                        {/* Custom Pagination Component */}
                        {showPagination && (
                            <CustomPagination
                                currentPage={currentPage}
                                totalPages={lastPage}
                                onPageChange={handlePageChange}
                                totalItems={total}
                                itemsPerPage={perPage}
                                startIndex={paginationStartIndex}
                                endIndex={paginationEndIndex}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            {mobileFilterOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
                        onClick={() => setMobileFilterOpen(false)}
                    ></div>
                    {/* Drawer */}
                    <div className="fixed inset-y-0 left-0 z-50 w-full max-w-[85vw] overflow-y-auto overflow-x-hidden bg-white shadow-2xl transition-transform duration-300 sm:max-w-[320px] lg:hidden">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-3 sm:p-4">
                            <h2 className="text-base font-semibold text-gray-900 sm:text-lg">Filters</h2>
                            <button
                                onClick={() => setMobileFilterOpen(false)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 sm:h-8 sm:w-8"
                                aria-label="Close filters"
                            >
                                <X size={18} className="sm:w-5 sm:h-5" />
                            </button>
                        </div>
                        <div className="w-full">
                            <div className="w-full [&>div]:w-full [&>div]:border-r-0 [&>div]:h-auto">
                                <BrandFilterSidebar
                                    onFiltersChange={handleFiltersChange}
                                    activeFilters={activeFilters}
                                    onClearFilters={clearAllFilters}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Background Decoration */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-200/20 to-pink-200/20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-blue-200/20 to-purple-200/20 blur-3xl"></div>
            </div>
        </div>
    );
}
