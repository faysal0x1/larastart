import DataTable from '@/components/DataTable';
import DataTableExtraButtons from '@/components/DataTables/DataTableExtraButtons.jsx';
import Can from '@/components/permissions/Can.jsx';
import ToastManager from '@/components/ToastManager.jsx';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function ListingPage({
    title,
    data,
    filters = {},
    currentUser,
    resourceName,
    resourceRoute,
    breadcrumbs,
    columns = [],
    createButtonText = 'New',
    createPermission,
    dataTableExtraFeatures = {},
    extraHeaderActions = null,
    customFilters = null,
    tabs = null,
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
    const [selectedRows, setSelectedRows] = useState([]);
    const isInitialMount = useRef(true);

    // Sync local state with filters prop when it changes from server
    useEffect(() => {
        if (isInitialMount.current) {
            return;
        }

        // Only update if there's an actual change from server
        const serverSearch = filters.search || '';
        const serverPageSize = parseInt(filters.per_page || 10);
        const serverSortColumn = filters.sort_column || 'created_at';
        const serverSortDirection = filters.sort_direction || 'desc';

        if (debouncedSearchTerm !== serverSearch) {
            setSearchTerm(serverSearch);
            setDebouncedSearchTerm(serverSearch);
        }
        if (pageSize !== serverPageSize) {
            setPageSize(serverPageSize);
        }
        if (sortColumn !== serverSortColumn) {
            setSortColumn(serverSortColumn);
        }
        if (sortDirection !== serverSortDirection) {
            setSortDirection(serverSortDirection);
        }
    }, [filters.search, filters.per_page, filters.sort_column, filters.sort_direction]);

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
        // Skip navigation on initial mount
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Normalize filter values for comparison
        const normalizedFilters = {
            search: filters.search || '',
            per_page: parseInt(filters.per_page || 10),
            sort_column: filters.sort_column || 'created_at',
            sort_direction: filters.sort_direction || 'desc',
        };

        // Only navigate if state differs from current filters (user-initiated change)
        const hasChanges =
            debouncedSearchTerm !== normalizedFilters.search ||
            pageSize !== normalizedFilters.per_page ||
            sortColumn !== normalizedFilters.sort_column ||
            sortDirection !== normalizedFilters.sort_direction;

        if (hasChanges) {
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
        // Define your defaults
        const defaults = {
            page: 1,
            per_page: 10,
            search: '',
            sort_column: 'created_at',
            sort_direction: 'desc',
        };

        // Remove empty or default values
        const cleanedFilters = Object.fromEntries(Object.entries(updatedFilters).filter(([key, value]) => value !== '' && value !== defaults[key]));

        router.visit(route(`${routeBase}.index`), {
            data: cleanedFilters,
            method: 'get',
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
        setSortColumn(column);
        setSortDirection(direction);
    };

    // Handle page size change
    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
    };

    // Handle search - FIXED
    const handleSearch = (term) => {
        setSearchTerm(term);
    };
    const handleExportSelected = (rows) => {
        const selectedIds = rows.map((row) => row.id);
        router.post(route(dataTableExtraFeatures['export-selected'].routeName), {
            ids: selectedIds,
        });
    };
    const handleDeleteSelected = (rows) => {
        const selectedIds = rows.map((row) => row.id);
        router.delete(route(dataTableExtraFeatures['delete-selected'].routeName), {
            data: { ids: selectedIds },
            onSuccess: () => {
                setSelectedRows([]);
            },
        });
    };
    // Create actions for the DataTable header
    const CreateButton = ({ createPermission, routeBase, createButtonText, singularResourceName }) => {
        console.log('Route Base');
        console.log(routeBase);
        return (
            <Can permission={createPermission}>
                <Link href={route(`${routeBase}.create`)}>
                    <Button className="flex items-center gap-1 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                        <Plus className="h-4 w-4" /> {createButtonText || `New ${singularResourceName}`}
                    </Button>
                </Link>
            </Can>
        );
    };
    const tableActions = currentUser && (
        <div className="flex items-center gap-2">
            <CreateButton
                createPermission={createPermission}
                routeBase={routeBase}
                createButtonText={createButtonText}
                singularResourceName={singularResourceName}
            />
            {extraHeaderActions}
        </div>
    );

    // DataTable extra features
    const extraButtons = (
        <DataTableExtraButtons
            dataTableExtraFeatures={dataTableExtraFeatures}
            selectedRows={selectedRows}
            onExportSelected={handleExportSelected}
            onDeleteSelected={handleDeleteSelected}
        />
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
                    currentPage={data.current_page - 1}
                    onSearch={handleSearch}
                    searchValue={searchTerm}
                    onPageSizeChange={handlePageSizeChange}
                    onSortChange={handleSortChange}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    actions={tableActions}
                    className="dark:bg-slate-900 dark:text-white"
                    columnVisibility={columnVisibility}
                    onColumnVisibilityChange={setColumnVisibility}
                    dataTableExtraFeatures={extraButtons}
                    customFilters={customFilters}
                    tabs={tabs}
                />
            </div>

            <ToastManager />
        </AppLayout>
    );
}
