// resources/js/components/ListingPage.jsx
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ListingPage({
    title,
    data,
    filters = {},
    currentUser,
    resourceName,
    resourceRoute,
    breadcrumbs,
    columns = [],
    canCreate = true,
    createButtonText = 'New',
}) {
    const singularResourceName = resourceName.endsWith('s') ? resourceName.slice(0, -1) : resourceName;
    const routeBase = resourceRoute || resourceName;

    // Local state for search, pagination, and columns
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(filters.search || '');
    const [pageSize, setPageSize] = useState(parseInt(filters.per_page) || 10);
    const [sortColumn, setSortColumn] = useState(filters.sort_column || 'created_at');
    const [sortDirection, setSortDirection] = useState(filters.sort_direction || 'desc');
    const [columnVisibility, setColumnVisibility] = useState({});

    // Handle search debounce - FIXED
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Navigate when filters change - FIXED
    useEffect(() => {
        if (
            debouncedSearchTerm !== filters.search ||
            pageSize !== parseInt(filters.per_page || 10) ||
            sortColumn !== filters.sort_column ||
            sortDirection !== filters.sort_direction
        ) {
            navigateWithFilters({
                search: debouncedSearchTerm,
                per_page: pageSize,
                sort_column: sortColumn,
                sort_direction: sortDirection,
                page: 1, // Reset to page 1 when filters change
            });
        }
    }, [debouncedSearchTerm, pageSize, sortColumn, sortDirection]);

    // Navigate using the router - FIXED with error logging
    const navigateWithFilters = (updatedFilters) => {
        console.log('Navigating with filters:', updatedFilters);
        router.visit(route(`${routeBase}.index`), {
            data: updatedFilters,
            method: 'get', // Changed from post with _method: 'GET' to direct get
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onSuccess: () => {
                console.log('Navigation successful');
            },
            onError: (errors) => {
                console.error('Navigation error:', errors);
            },
        });
    };

    // Handle page change
    const handlePageChange = (pageIndex) => {
        navigateWithFilters({
            page: pageIndex + 1, // Convert 0-based to 1-based for Laravel
            per_page: pageSize,
            search: debouncedSearchTerm,
            sort_column: sortColumn,
            sort_direction: sortDirection,
        });
    };

    // Handle sorting
    const handleSortChange = (column, direction) => {
        console.log('Sort changed:', column, direction);
        setSortColumn(column);
        setSortDirection(direction);
    };

    // Handle page size change
    const handlePageSizeChange = (newSize) => {
        console.log('Page size changed:', newSize);
        setPageSize(newSize);
    };

    // Handle search - FIXED
    const handleSearch = (term) => {
        console.log('Search term changed:', term);
        setSearchTerm(term);
    };

    // Create actions for the DataTable header
    const tableActions = canCreate && currentUser && (
        <Link href={route(`${routeBase}.create`)}>
            <Button className="flex items-center gap-1 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                <Plus className="h-4 w-4" /> {createButtonText || `New ${singularResourceName}`}
            </Button>
        </Link>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="mx-6 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <DataTable
                    title={title}
                    data={data.data}
                    columns={columns}
                    totalItems={data.total}
                    searchPlaceholder={`Search ${resourceName.toLowerCase()}...`}
                    initialPageSize={pageSize}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    onPageChange={handlePageChange}
                    currentPage={data.current_page - 1} // Convert 1-based to 0-based indexing
                    onSearch={handleSearch}
                    searchValue={searchTerm} // Use searchTerm directly
                    onPageSizeChange={handlePageSizeChange}
                    onSortChange={handleSortChange}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    actions={tableActions}
                    className="dark:bg-slate-900 dark:text-white"
                    columnVisibility={columnVisibility}
                    onColumnVisibilityChange={setColumnVisibility}
                />
            </div>
        </AppLayout>
    );
}
