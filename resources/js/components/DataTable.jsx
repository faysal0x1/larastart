import ExportDropdown from '@/components/ExportDropdown.jsx';
import PaginationComponent from '@/components/PaginationComponent.jsx';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DataTable({
    data,
    columns,
    totalItems,
    searchPlaceholder = 'Search...',
    initialPageSize = 10,
    pageSizeOptions = [5, 10, 25, 50, 100],
    onPageChange,
    currentPage = 0,
    onSearch,
    searchValue = '',
    onPageSizeChange,
    onSortChange,
    sortColumn = 'created_at',
    sortDirection = 'desc',
    onExport,
    showColumnToggle = true,
    title,
    actions,
    dataTableExtraFeatures,
    columnVisibility = {},
    onColumnVisibilityChange,
    customFilters = null,
    tabs = null,
}) {
    const [globalFilter, setGlobalFilter] = useState(searchValue);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [sorting, setSorting] = useState([{ id: sortColumn, desc: sortDirection === 'desc' }]);
    const [localColumnVisibility, setLocalColumnVisibility] = useState(columnVisibility);

    useEffect(() => {
        if (searchValue !== globalFilter) {
            setGlobalFilter(searchValue);
        }
    }, [searchValue]);

    useEffect(() => {
        setPageSize(initialPageSize);
    }, [initialPageSize]);

    useEffect(() => {
        setSorting([{ id: sortColumn, desc: sortDirection === 'desc' }]);
    }, [sortColumn, sortDirection]);

    useEffect(() => {
        setLocalColumnVisibility(columnVisibility);
    }, [columnVisibility]);

    const isServerSide = !!onPageChange;

    const handleSortingChange = (updatedSorting) => {
        const newSorting =
            updatedSorting.length > 0
                ? updatedSorting
                : [
                    {
                        id: sortColumn,
                        desc: sortDirection === 'desc',
                    },
                ];
        setSorting(newSorting);

        if (isServerSide && onSortChange) {
            const { id, desc } = newSorting[0];
            onSortChange(id, desc ? 'desc' : 'asc');
        }
    };

    const handleColumnVisibilityChange = (updatedVisibility) => {
        setLocalColumnVisibility(updatedVisibility);
        if (onColumnVisibilityChange) {
            onColumnVisibilityChange(updatedVisibility);
        }
    };

    const table = useReactTable({
        data: data || [],
        columns,
        state: {
            globalFilter: isServerSide ? undefined : globalFilter,
            pagination: {
                pageSize,
                pageIndex: isServerSide ? currentPage : 0,
            },
            sorting,
            columnVisibility: localColumnVisibility,
        },
        enableColumnResizing: true,
        enableMultiSort: false,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: isServerSide ? undefined : getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: isServerSide ? undefined : getPaginationRowModel(),
        manualPagination: isServerSide,
        manualSorting: isServerSide,
        manualFiltering: isServerSide,
        pageCount: isServerSide ? Math.ceil(totalItems / pageSize) : undefined,
        onSortingChange: handleSortingChange,
        onColumnVisibilityChange: handleColumnVisibilityChange,
    });

    const pageIndex = table.getState().pagination.pageIndex || 0;
    const currentPageSize = table.getState().pagination.pageSize || pageSize;
    const totalCount = typeof totalItems === 'number' ? totalItems : data?.length || 0;

    const startIndex = pageIndex * currentPageSize + (totalCount > 0 ? 1 : 0);
    const endIndex = Math.min((pageIndex + 1) * currentPageSize, totalCount);

    const showPagination = totalCount > 0;

    const handlePageChange = (newPage) => {
        if (isServerSide) {
            onPageChange(newPage);
        } else {
            table.setPageIndex(newPage);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setGlobalFilter(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const handlePageSizeChange = (value) => {
        const newSize = Number(value);
        setPageSize(newSize);
        table.setPageSize(newSize);

        if (onPageSizeChange) {
            onPageSizeChange(newSize);

            // Reset to page 1 when changing page size for server-side
            if (isServerSide) {
                handlePageChange(0); // This will use onPageChange to navigate to first page
            }
        }
    };

    return (
        <div className="space-y-4">
            {/* Table Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 items-center gap-2">
                    {title && <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>}

                    <div className="relative max-w-md flex-1">
                        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            placeholder={searchPlaceholder}
                            value={globalFilter ?? ''}
                            onChange={handleSearchChange}
                            className="border-gray-300 bg-white pl-8 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {dataTableExtraFeatures}
                    {actions}

                    <ExportDropdown onExport={onExport} data={data} allData={null} />

                    {showColumnToggle && columns.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    <SlidersHorizontal className="h-4 w-4" />
                                    Columns
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="text-gray-700 capitalize hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            >
                                                {column.id === 'actions'
                                                    ? 'Actions'
                                                    : typeof column.columnDef.header === 'string'
                                                        ? column.columnDef.header
                                                        : column.id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>

            {/* Custom Filters */}
            {customFilters}

            {/* Page Size Selector and Tabs */}
            <div className={`flex items-center ${tabs ? 'justify-between' : 'justify-end'}`}>
                {/* Tabs on the left */}
                {tabs && (
                    <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
                        {tabs.tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => tabs.onTabChange(tab.id)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${tabs.activeTab === tab.id
                                    ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100'
                                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                                    }`}
                            >
                                {tab.label}
                                {tab.count !== undefined && (
                                    <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${tabs.activeTab === tab.id
                                        ? 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                                        : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                                        }`}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* Page size selector on the right */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Show</span>
                    <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
                        <SelectTrigger className="w-[80px] border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
                            <SelectValue placeholder={pageSize} />
                        </SelectTrigger>
                        <SelectContent className="border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800">
                            {pageSizeOptions.map((size) => (
                                <SelectItem
                                    key={size}
                                    value={String(size)}
                                    className="text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
                                >
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <span className="text-sm text-gray-500 dark:text-gray-400">per page</span>
                </div>
            </div>

            {/* Main Table */}
            <div className="rounded-md border border-gray-300 dark:border-gray-600">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-gray-900 dark:text-gray-100">
                                        {header.isPlaceholder ? null : (
                                            <div className="flex items-center">
                                                {header.column.getCanSort() ? (
                                                    <div
                                                        onClick={() => {
                                                            // Get current sort state
                                                            const currentSort = header.column.getIsSorted();

                                                            // If this is the only sorted column and we're clicking it again,
                                                            // toggle between asc/desc instead of clearing
                                                            if (sorting.length === 1 && sorting[0].id === header.column.id) {
                                                                header.column.toggleSorting(currentSort === 'asc');
                                                            } else {
                                                                // Clear all other sorts and set this one
                                                                table.setSorting([
                                                                    {
                                                                        id: header.column.id,
                                                                        desc: currentSort === 'asc',
                                                                    },
                                                                ]);
                                                            }

                                                            // If server-side sorting is enabled, call the parent handler
                                                            if (onSortChange) {
                                                                const newDirection = currentSort === 'asc' ? 'desc' : 'asc';
                                                                onSortChange(header.column.id, newDirection);
                                                            }
                                                        }}
                                                        className="flex cursor-pointer items-center hover:text-gray-700 dark:hover:text-gray-300"
                                                    >
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        <ChevronDown
                                                            className={`ml-1 h-4 w-4 transition-transform ${header.column.getIsSorted() === 'desc'
                                                                ? 'rotate-180'
                                                                : header.column.getIsSorted() === 'asc'
                                                                    ? ''
                                                                    : 'rotate-0 opacity-0'
                                                                }`}
                                                        />
                                                    </div>
                                                ) : (
                                                    flexRender(header.column.columnDef.header, header.getContext())
                                                )}
                                            </div>
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-gray-900 dark:text-gray-100">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-900 dark:text-gray-100">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <PaginationComponent
                pageIndex={pageIndex}
                totalCount={totalItems || table.getFilteredRowModel().rows.length}
                startIndex={startIndex}
                endIndex={endIndex}
                showPagination={showPagination}
                handlePageChange={handlePageChange}
                getPageCount={() => table.getPageCount()}
            />
        </div>
    );
}
