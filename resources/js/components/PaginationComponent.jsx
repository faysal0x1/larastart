import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { router, usePage } from '@inertiajs/react';

export const PaginationComponent = ({ pageIndex, totalCount, startIndex, endIndex, showPagination, getPageCount }) => {
    const { url } = usePage();
    const pageCount = getPageCount();

    const handlePageChange = (newPageIndex) => {
        if (newPageIndex < 0 || newPageIndex >= pageCount) return;

        // Important: Use only the base URL without query string
        router.post(
            url,
            {
                page: newPageIndex + 1,
                _method: 'GET', // This makes it a GET request despite using POST
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onBefore: () => true,
                onSuccess: () => { },
            },
        );
    };

    const getDisplayedPageNumbers = () => {
        const maxButtons = 5;
        const start = Math.max(0, Math.min(pageCount - maxButtons, pageIndex - 2));
        const length = Math.min(maxButtons, pageCount);
        return Array.from({ length }, (_, i) => i + start);
    };

    return (
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-gray-500">
                {showPagination ? `Showing ${startIndex} to ${endIndex} of ${totalCount} items` : 'No items to display'}
            </div>

            {showPagination && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePageChange(pageIndex - 1)}
                                disabled={pageIndex === 0}
                                className={pageIndex === 0 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>

                        {getDisplayedPageNumbers().map((displayPageIndex) => (
                            <PaginationItem key={displayPageIndex}>
                                <PaginationLink onClick={() => handlePageChange(displayPageIndex)} isActive={displayPageIndex === pageIndex}>
                                    {displayPageIndex + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {pageCount > 5 && pageIndex < pageCount - 3 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {pageCount > 5 && (
                            <PaginationItem>
                                <PaginationLink onClick={() => handlePageChange(pageCount - 1)} isActive={pageIndex === pageCount - 1}>
                                    {pageCount}
                                </PaginationLink>
                            </PaginationItem>
                        )}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handlePageChange(pageIndex + 1)}
                                disabled={pageIndex === pageCount - 1}
                                className={pageIndex === pageCount - 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default PaginationComponent;
