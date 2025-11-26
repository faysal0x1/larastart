import { ChevronLeft, ChevronRight, Grid3X3, List, Search, TrendingUp } from 'lucide-react';

export default function ProductToolbar({
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
    showPageSizeSelector = false
}) {
    const canPrev = page > 1;
    const canNext = page < totalPages;

    return (
        <div className="mb-4 w-full min-w-0 rounded-xl border border-gray-100 bg-white p-2.5 shadow-sm sm:mb-6 sm:p-4 lg:mb-8 lg:p-6">
            <div className="flex w-full min-w-0 flex-col gap-2.5 sm:gap-3 md:gap-4">
                {/* Top Row: Search and View Controls */}
                <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                    {/* Search - Full width on mobile */}
                    <div className="w-full min-w-0 sm:max-w-xs">
                        <div className="group relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full min-w-0 rounded-lg border border-gray-200 bg-white py-2 pr-3 pl-9 text-xs text-gray-700 transition-all duration-200 placeholder:text-gray-400 hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:pl-10 sm:text-sm"
                                value={searchQuery}
                                onChange={(e) => onChangeSearchQuery(e.target.value)}
                            />
                            <Search className="absolute top-2.5 left-2.5 h-3.5 w-3.5 text-gray-400 transition-colors group-focus-within:text-blue-500 sm:left-3 sm:h-4 sm:w-4" />
                        </div>
                    </div>

                    {/* View Mode - Right side on mobile */}
                    <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
                        <span className="text-xs font-medium text-gray-700 sm:text-sm">View:</span>
                        <div className="flex overflow-hidden rounded-lg border border-gray-200">
                            <button
                                onClick={() => onChangeViewMode('grid')}
                                className={`flex min-h-[36px] items-center justify-center gap-1 px-2.5 py-1.5 transition-all duration-200 sm:min-h-0 sm:gap-2 sm:px-3 sm:py-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                title="Grid View"
                            >
                                <Grid3X3 size={14} className="sm:w-4 sm:h-4" />
                                <span className="text-xs font-medium sm:text-sm">Grid</span>
                            </button>
                            <button
                                onClick={() => onChangeViewMode('list')}
                                className={`flex min-h-[36px] items-center justify-center gap-1 border-l border-gray-200 px-2.5 py-1.5 transition-all duration-200 sm:min-h-0 sm:gap-2 sm:px-3 sm:py-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                title="List View"
                            >
                                <List size={14} className="sm:w-4 sm:h-4" />
                                <span className="text-xs font-medium sm:text-sm">List</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Pagination, Sort, and Page Size */}
                <div className="flex flex-col gap-2.5 border-t border-gray-100 pt-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:border-t-0 sm:pt-0">
                    {/* Pagination */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 sm:gap-2 sm:text-sm">
                            <span className="hidden xs:inline sm:inline">Page</span>
                            <span className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-0.5 text-[10px] font-bold text-white sm:px-3 sm:py-1 sm:text-xs">
                                {Math.min(page, totalPages)} / {totalPages}
                            </span>
                        </div>
                        <div className="flex overflow-hidden rounded-lg border border-gray-200">
                            <button
                                onClick={onPrev}
                                disabled={!canPrev}
                                className={`flex min-h-[36px] items-center justify-center gap-1 px-3 py-1.5 transition-colors duration-200 sm:min-h-0 sm:px-4 sm:py-2 ${canPrev ? 'text-gray-600 hover:bg-blue-50 hover:text-blue-600' : 'cursor-not-allowed text-gray-300'}`}
                                title="Previous"
                            >
                                <ChevronLeft size={16} className="sm:w-4 sm:h-4" />
                            </button>
                            <button
                                onClick={onNext}
                                disabled={!canNext}
                                className={`flex min-h-[36px] items-center justify-center gap-1 border-l border-gray-200 px-3 py-1.5 transition-colors duration-200 sm:min-h-0 sm:px-4 sm:py-2 ${canNext ? 'text-gray-600 hover:bg-blue-50 hover:text-blue-600' : 'cursor-not-allowed text-gray-300'}`}
                                title="Next"
                            >
                                <ChevronRight size={16} className="sm:w-4 sm:h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Sort and Page Size - Stack on mobile, row on larger screens */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                        {/* Sort */}
                        <div className="flex w-full min-w-0 flex-col gap-1.5 sm:w-auto sm:flex-row sm:items-center sm:gap-2 md:gap-3">
                            <label className="hidden items-center gap-2 text-xs font-medium text-gray-700 sm:flex sm:text-sm">
                                <TrendingUp size={14} className="sm:w-4 sm:h-4" />
                                Sort:
                            </label>
                            <select className="w-full min-w-0 rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs font-medium text-gray-700 transition-all duration-200 hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:w-auto sm:px-3 sm:py-2 sm:text-sm">
                                <option>Featured</option>
                                <option>Lowest Price</option>
                                <option>Highest Price</option>
                                <option>Best Rating</option>
                            </select>
                        </div>

                        {/* View Count / Page Size Selector */}
                        {showPageSizeSelector ? (
                            <div className="flex w-full min-w-0 flex-col gap-1.5 sm:w-auto sm:flex-row sm:items-center sm:gap-2 md:gap-3">
                                <label className="text-xs font-medium text-gray-700 sm:text-sm">Show:</label>
                                <select
                                    value={pageSize}
                                    onChange={(e) => onChangePageSize(Number(e.target.value))}
                                    className="w-full min-w-0 rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs font-medium text-gray-700 transition-all duration-200 hover:border-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:w-auto sm:px-3 sm:py-2 sm:text-sm"
                                >
                                    <option value={12}>12</option>
                                    <option value={24}>24</option>
                                    <option value={36}>36</option>
                                    <option value={60}>60</option>
                                    <option value={96}>96</option>
                                </select>
                            </div>
                        ) : (
                            <div className="flex w-full items-center sm:w-auto">
                                <span className="text-xs font-medium text-gray-700 sm:text-sm">
                                    <span className="hidden sm:inline">Showing: </span>{pageSize} <span className="hidden sm:inline">per page</span>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

