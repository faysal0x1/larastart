// resources/js/Pages/Posts/Index.jsx
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
// Import directly from the correct path
import { createActionsColumn, createColumn, createDateColumn, createTagsColumn } from '../../utils/tableUtils';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Index() {
    // Get data from the page props
    const { posts, filters = {}, auth } = usePage().props;

    // Local state for search and pagination
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(filters.search || '');
    const [pageSize, setPageSize] = useState(filters.per_page || 10);
    const [sortColumn, setSortColumn] = useState(filters.sort_column || 'created_at');
    const [sortDirection, setSortDirection] = useState(filters.sort_direction || 'desc');

    // Handle search debounce
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Navigate when filters change
    useEffect(() => {
        if (
            debouncedSearchTerm !== filters.search ||
            pageSize !== filters.per_page ||
            sortColumn !== filters.sort_column ||
            sortDirection !== filters.sort_direction
        ) {
            navigateWithFilters({
                search: debouncedSearchTerm,
                per_page: pageSize,
                sort_column: sortColumn,
                sort_direction: sortDirection,
                page: 1, // Reset to first page when filters change
            });
        }
    }, [debouncedSearchTerm, pageSize, sortColumn, sortDirection]);

    // Utility function to navigate with filters
    const navigateWithFilters = (updatedFilters) => {
        router.get(route('posts.index'), updatedFilters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    // Handle page change
    const handlePageChange = (pageIndex) => {
        navigateWithFilters({
            page: pageIndex + 1,
            per_page: pageSize,
            search: debouncedSearchTerm,
            sort_column: sortColumn,
            sort_direction: sortDirection,
        });
    };

    // Handle sorting
    const handleSortChange = (column, direction) => {
        setSortColumn(column);
        setSortDirection(direction);
    };

    // Actions dropdown for each row
    const renderActions = (row) => {
        const post = row.original;
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={route('posts.show', post.id)} className="w-full cursor-pointer">
                            View
                        </Link>
                    </DropdownMenuItem>
                    {auth.user && auth.user.id === post.user_id && (
                        <>
                            <DropdownMenuItem asChild>
                                <Link href={route('posts.edit', post.id)} className="w-full cursor-pointer">
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 focus:text-red-600" asChild>
                                <Link
                                    href={route('posts.destroy', post.id)}
                                    method="delete"
                                    as="button"
                                    className="w-full cursor-pointer text-left"
                                    data={{ _method: 'delete' }}
                                >
                                    Delete
                                </Link>
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    // Define columns using utility functions
    const columns = useMemo(
        () => [
            createColumn('title', 'Title', (row) => <div className="font-medium">{row.original.title}</div>),
            createTagsColumn('tags', 'Tags'),
            createDateColumn('created_at', 'Created'),
            createActionsColumn(renderActions),
        ],
        [auth.user],
    );

    // Create actions for the DataTable header
    const tableActions = auth.user && (
        <Link href={route('posts.create')}>
            <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> New Post
            </Button>
        </Link>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="mx-6 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <DataTable
                    title="Posts"
                    data={posts.data}
                    columns={columns}
                    totalItems={posts.total}
                    searchPlaceholder="Search posts..."
                    initialPageSize={pageSize}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    onPageChange={handlePageChange}
                    currentPage={posts.current_page - 1} // Convert 1-based to 0-based indexing
                    onSearch={setSearchTerm}
                    searchValue={searchTerm}
                    onPageSizeChange={setPageSize}
                    onSortChange={handleSortChange}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    actions={tableActions}
                />
            </div>
        </AppLayout>
    );
}
