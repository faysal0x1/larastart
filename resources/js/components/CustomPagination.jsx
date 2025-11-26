import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CustomPagination = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
    startIndex,
    endIndex
}) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage <= 3) {
                // Show first 5 pages
                for (let i = 2; i <= Math.min(5, totalPages); i++) {
                    pages.push(i);
                }
                if (totalPages > 5) {
                    pages.push('...');
                }
            } else if (currentPage >= totalPages - 2) {
                // Show last 5 pages
                if (totalPages > 5) {
                    pages.push('...');
                }
                for (let i = Math.max(totalPages - 4, 2); i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Show current page in middle
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
            }

            // Always show last page if not already included
            if (!pages.includes(totalPages)) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg border border-gray-200 px-3 py-3 sm:px-6 sm:py-4 shadow-sm">
            {/* Left side - Item count */}
            <div className="text-xs sm:text-sm text-gray-700">
                Showing {startIndex} to {endIndex} of {totalItems} items
            </div>

            {/* Right side - Pagination controls */}
            <div className="flex items-center justify-between sm:justify-end gap-2">
                {/* Previous button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                >
                    <ChevronLeft className="w-4 h-4 mr-1 hidden sm:inline" />
                    Previous
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap px-1">
                    {pageNumbers.map((page, index) => (
                        <React.Fragment key={index}>
                            {page === '...' ? (
                                <span className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-500">...</span>
                            ) : (
                                <button
                                    onClick={() => onPageChange(page)}
                                    className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${page === currentPage
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Next button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1 hidden sm:inline" />
                </button>
            </div>
        </div>
    );
};

export default CustomPagination;
