import CustomPagination from '@/components/CustomPagination';
import CategoryFilterSidebar from '@/components/frontend/filter/CategoryFilterSidebar';
import ProductCard from '@/components/frontend/productCard/PrimaryProductCard';
import ListProductCard from '@/components/frontend/productCard/ListProductCard';
import ProductToolbar from '@/components/frontend/ProductToolbar';
import RenderedContent from '@/components/RenderedContent';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Tag, Filter, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { getProductImage } from '@/lib/ecomHelper.js';
import { Badge } from "@/components/ui/badge";
export default function CategoryProducts() {
    const { products, category, subCategories = [] } = usePage().props;
    const [activeFilters, setActiveFilters] = useState({});
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [clientPage, setClientPage] = useState(1);

    const MAX_PRODUCTS_PER_PAGE = 12;

    // Extract paginated data
    const productList = products?.data || [];
    const total = products?.total || 0;

    const mappedProducts = useMemo(() => {
        return productList.map((product) => ({
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
            color: product.color || '',
            size: product.size || '',
            material: product.material || '',
            condition: product.condition || 'new',
        }));
    }, [productList]);

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

        // Apply active filters
        if (Object.keys(activeFilters).length > 0) {
            filtered = filtered.filter((product) => {
                // In Stock filter
                if (activeFilters.inStock && product.stock <= 0) {
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
                if (activeFilters.isNew && product.isNew !== true) {
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

                // Color filter
                if (activeFilters.color && activeFilters.color.length > 0) {
                    const productColor = (product.color || '').toLowerCase();
                    const hasMatchingColor = activeFilters.color.some((color) => productColor.includes(color.toLowerCase()));
                    if (!hasMatchingColor) return false;
                }

                // Size filter
                if (activeFilters.size && activeFilters.size.length > 0) {
                    const productSize = (product.size || '').toLowerCase();
                    const hasMatchingSize = activeFilters.size.some((size) => productSize.includes(size.toLowerCase()));
                    if (!hasMatchingSize) return false;
                }

                // Material filter
                if (activeFilters.material && activeFilters.material.length > 0) {
                    const productMaterial = (product.material || '').toLowerCase();
                    const hasMatchingMaterial = activeFilters.material.some((material) => productMaterial.includes(material.toLowerCase()));
                    if (!hasMatchingMaterial) return false;
                }

                // Condition filter
                if (activeFilters.condition && activeFilters.condition.length > 0) {
                    const productCondition = (product.condition || 'new').toLowerCase();
                    const hasMatchingCondition = activeFilters.condition.some((condition) => productCondition.includes(condition.toLowerCase()));
                    if (!hasMatchingCondition) return false;
                }

                // Price filters (typed min/max inputs)
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

    // CLIENT-SIDE PAGINATION for filtered products
    const totalFiltered = filteredProducts.length;
    const totalFilteredPages = Math.ceil(totalFiltered / MAX_PRODUCTS_PER_PAGE);
    const startIdx = (clientPage - 1) * MAX_PRODUCTS_PER_PAGE;
    const endIdx = startIdx + MAX_PRODUCTS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

    // Pagination handlers
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalFilteredPages) return;
        setClientPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const changeViewMode = (newViewMode) => setViewMode(newViewMode);

    const handleFiltersChange = (newFilters) => {
        setActiveFilters(newFilters);
        setClientPage(1); // Reset to first page when filters change
    };

    const clearAllFilters = () => {
        setActiveFilters({});
        setSearchQuery('');
        setClientPage(1);
    };

    // Calculate pagination display values
    const paginationStartIndex = totalFiltered > 0 ? startIdx + 1 : 0;
    const paginationEndIndex = totalFiltered > 0 ? Math.min(totalFiltered, endIdx) : 0;
    const showPagination = totalFiltered > MAX_PRODUCTS_PER_PAGE;

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
            {/* Header */}
            <div className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/90 shadow-sm backdrop-blur-md">
                <div className="mx-auto w-full max-w-[1680px] px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex flex-wrap items-center gap-1 py-2 text-[10px] sm:gap-1.5 sm:py-2.5 sm:text-xs md:gap-2 md:py-3 md:text-sm">
                        <Link
                            href={route('home')}
                            prefetch
                            className="whitespace-nowrap font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline"
                        >
                            Home
                        </Link>
                        <ChevronRight size={10} className="flex-shrink-0 text-gray-400 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" />
                        <Link
                            href={route('products.index')}
                            prefetch
                            className="whitespace-nowrap font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline"
                        >
                            Products
                        </Link>
                        <ChevronRight size={10} className="flex-shrink-0 text-gray-400 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" />
                        <span className="truncate font-semibold text-gray-900">{category?.name || 'Category'}</span>
                    </nav>

                    {/* Title Section */}
                    <div className="flex flex-col gap-2 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2.5 sm:py-3 md:gap-3 md:py-4 lg:py-5">
                        <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-1.5 md:gap-2">
                            <div className="hidden h-4 w-0.5 rounded-full bg-gradient-to-b from-blue-500 to-purple-600 sm:block md:h-5"></div>

                            <div className="min-w-0 flex-1 overflow-hidden">
                                <h1 className="flex items-center gap-1 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-sm font-semibold text-transparent sm:text-base md:text-lg">
                                    <Tag className="h-3 w-3 flex-shrink-0 text-blue-500 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                                    <span className="truncate leading-tight">{category?.name || 'Category Products'}</span>
                                </h1>

                                <p className="mt-0.5 flex flex-wrap items-center gap-1 text-[10px] text-gray-600 sm:text-xs md:text-sm">
                                    <span className="truncate">
                                        {totalFiltered} products {searchQuery || Object.keys(activeFilters).length > 0
                                            ? 'found'
                                            : `in ${category?.name || 'this category'}`}
                                    </span>

                                    {Object.keys(activeFilters).length > 0 && (
                                        <span className="flex-shrink-0 rounded-full bg-blue-100 px-1 py-[1px] text-[9px] leading-tight text-blue-800 sm:px-1.5 sm:text-[10px]">
                                            {Object.keys(activeFilters).length} filter
                                            {Object.keys(activeFilters).length !== 1 ? 's' : ''} applied
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setMobileFilterOpen(true)}
                            className="flex min-h-[36px] flex-shrink-0 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-[10px] font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 sm:min-h-[38px] sm:gap-2 sm:px-3 sm:py-2 sm:text-xs md:min-h-0 md:text-sm lg:hidden"
                        >
                            <Filter size={14} className="sm:w-4 sm:h-4" />
                            <span className="hidden xs:inline sm:inline">Filters</span>
                            {Object.keys(activeFilters).length > 0 && (
                                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white sm:h-4 sm:w-4 sm:text-[10px] md:h-5 md:w-5 md:text-xs">
                                    {Object.keys(activeFilters).length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto w-full max-w-[1680px] px-2 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4 lg:px-6 lg:py-6 xl:px-8 xl:py-8">
                <div className="grid w-full min-w-0 max-w-full grid-cols-12 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
                    {/* Sidebar - Hidden on mobile, shown in drawer */}
                    <div className="hidden md:block md:col-span-3 lg:col-span-2">
                        <div className="sticky top-20 md:top-24 lg:top-28 xl:top-32 overflow-hidden">
                            <CategoryFilterSidebar onFiltersChange={handleFiltersChange} activeFilters={activeFilters} onClearFilters={clearAllFilters} />
                        </div>
                    </div>

                    {/* Products Area */}
                    <div className="col-span-12 w-full min-w-0 max-w-full overflow-hidden space-y-2 sm:col-span-12 sm:space-y-3 md:col-span-9 md:space-y-4 lg:col-span-10 lg:space-y-6 xl:space-y-8">
                        {/* Category Banner */}
                        <div className="group relative w-full min-w-0 max-w-full overflow-hidden rounded-lg shadow-md sm:rounded-lg">
                            <div className="flex h-20 w-full items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 sm:h-24 md:h-28 lg:h-32">
                                <div className="text-center text-white px-1.5">
                                    <Tag className="mx-auto mb-0.5 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                                    <h3 className="mb-0.5 text-xs font-semibold leading-tight sm:text-sm md:text-base">
                                        {category?.name || 'Category'}
                                    </h3>
                                    <p className="text-[9px] leading-tight text-white/90 sm:text-[10px] md:text-xs">
                                        Explore products in this category
                                    </p>
                                </div>
                            </div>

                            {/* Gradient overlays */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-blue-900/20"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                            {/* Decorative Elements */}
                            <div className="absolute top-1 right-1 h-4 w-4 rounded-full bg-white/10 backdrop-blur-sm sm:h-5 sm:w-5 md:h-6 md:w-6"></div>
                            <div className="absolute right-2 bottom-1 h-2 w-2 rounded-full bg-blue-400/20 backdrop-blur-sm sm:h-2.5 sm:w-2.5 md:h-3 md:w-3"></div>
                        </div>


                        {/* Subcategories Section */}
                        {subCategories && subCategories.length > 0 && (
                            <div className="w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-white/50 bg-white/80 p-2 shadow-md backdrop-blur-sm sm:rounded-xl sm:p-3 md:p-4">
                                <div className="flex w-full flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                                    {subCategories.map((subCategory) => (
                                        <Link
                                            key={subCategory.id}
                                            href={subCategory.url || `/${subCategory.slug}`}
                                            prefetch
                                        >
                                            <Badge
                                                variant="secondary"
                                                className="cursor-pointer rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors hover:bg-blue-100 hover:text-blue-700 sm:px-2.5 sm:text-xs md:px-3 md:text-sm"
                                            >
                                                {subCategory.name}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Category Description (Top) */}
                        {category?.description && (
                            <div className="w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-white/50 bg-white/80 p-2 shadow-lg backdrop-blur-sm sm:rounded-xl sm:p-3 md:rounded-2xl md:p-4 lg:p-6">
                                <RenderedContent
                                    html={category.description}
                                    className="prose prose-xs max-w-none text-[10px] leading-relaxed text-gray-700 prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 sm:text-xs md:prose-sm md:text-sm"
                                />
                            </div>
                        )}

                        {/* Toolbar */}
                        <ProductToolbar
                            page={clientPage}
                            totalPages={totalFilteredPages}
                            onPrev={() => handlePageChange(clientPage - 1)}
                            onNext={() => handlePageChange(clientPage + 1)}
                            pageSize={MAX_PRODUCTS_PER_PAGE}
                            onChangePageSize={() => { }} // No-op since page size is fixed
                            viewMode={viewMode}
                            onChangeViewMode={changeViewMode}
                            searchQuery={searchQuery}
                            onChangeSearchQuery={setSearchQuery}
                            showPageSizeSelector={false}
                        />

                        {/* Products Area */}
                        <div className="w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-white/50 bg-white/50 p-2 shadow-lg backdrop-blur-sm sm:rounded-xl sm:p-2.5 md:rounded-2xl md:p-3 lg:p-4 xl:p-6 2xl:p-8">
                            {viewMode === 'grid' ? (
                                <div className="grid w-full min-w-0 max-w-full grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-y-3 md:grid-cols-2 md:gap-y-4 lg:grid-cols-3 lg:gap-y-4 xl:grid-cols-4 xl:gap-y-5 2xl:grid-cols-4 2xl:gap-y-6">
                                    {paginatedProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="w-full min-w-0 transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                                        >
                                            <ProductCard product={product} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex w-full min-w-0 max-w-full flex-col gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
                                    {paginatedProducts.map((product) => (
                                        <ListProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            )}

                            {/* No products message */}
                            {paginatedProducts.length === 0 && (
                                <div className="py-4 text-center sm:py-6 md:py-8 lg:py-12">
                                    <div className="mb-1 text-xs font-medium text-gray-500 sm:mb-1.5 sm:text-sm md:mb-2 md:text-base lg:text-lg">No products found</div>
                                    <p className="text-[10px] text-gray-400 sm:text-xs md:text-sm lg:text-base">Try adjusting your search or filters</p>
                                </div>
                            )}
                        </div>


                        {/* Custom Pagination Component */}
                        {showPagination && (
                            <CustomPagination
                                currentPage={clientPage}
                                totalPages={totalFilteredPages}
                                onPageChange={handlePageChange}
                                totalItems={totalFiltered}
                                itemsPerPage={MAX_PRODUCTS_PER_PAGE}
                                startIndex={paginationStartIndex}
                                endIndex={paginationEndIndex}
                            />
                        )}

                        {/* Category Bottom Description */}
                        {category?.bottom_description && (
                            <div className="w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-white/50 bg-white/80 p-2 shadow-lg backdrop-blur-sm sm:rounded-xl sm:p-3 md:rounded-2xl md:p-4 lg:p-6">
                                <RenderedContent
                                    html={category.bottom_description}
                                    className="prose prose-xs max-w-none text-[10px] leading-relaxed text-gray-700 prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 sm:text-xs md:prose-sm md:text-sm"
                                />
                            </div>
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
                    <div className="fixed inset-y-0 left-0 z-50 w-full max-w-[90vw] overflow-y-auto overflow-x-hidden bg-white shadow-2xl transition-transform duration-300 sm:max-w-[320px] md:max-w-[360px] lg:hidden">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-2.5 sm:p-3 md:p-4">
                            <h2 className="text-sm font-semibold text-gray-900 sm:text-base md:text-lg">Filters</h2>
                            <button
                                onClick={() => setMobileFilterOpen(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 sm:h-9 sm:w-9 md:h-8 md:w-8"
                                aria-label="Close filters"
                            >
                                <X size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            </button>
                        </div>
                        <div className="w-full">
                            <div className="w-full [&>div]:w-full [&>div]:border-r-0 [&>div]:h-auto">
                                <CategoryFilterSidebar onFiltersChange={handleFiltersChange} activeFilters={activeFilters} onClearFilters={clearAllFilters} />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Background Decoration */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/20 to-purple-200/20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-green-200/20 to-blue-200/20 blur-3xl"></div>
            </div>
        </div>
    );
}
