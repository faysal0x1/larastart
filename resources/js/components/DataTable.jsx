// resources/js/components/DataTable.jsx
import ExportDropdown from '@/components/ExportDropdown.jsx';
import PaginationComponent from '@/components/PaginationComponent.jsx';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Enhanced DataTable component with advanced features
 *
 * @param {Array} data - The data to display in the table
 * @param {Array} columns - The columns configuration
 * @param {number} totalItems - Total number of items (for server-side pagination)
 * @param {string} searchPlaceholder - Placeholder text for the search input
 * @param {number} initialPageSize - Initial number of items per page
 * @param {Array} pageSizeOptions - Options for items per page
 * @param {Function} onPageChange - Callback when page changes (for server-side pagination)
 * @param {number} currentPage - Current page index (for server-side pagination, 0-based)
 * @param {Function} onSearch - Callback when search term changes (for server-side filtering)
 * @param {string} searchValue - Search value (for server-side filtering)
 * @param {Function} onPageSizeChange - Callback when page size changes
 * @param {Function} onSortChange - Callback when sorting changes
 * @param {string} sortColumn - Current sort column name
 * @param {string} sortDirection - Current sort direction ('asc' or 'desc')
 * @param {Function} onExport - Optional callback for exporting data
 * @param {boolean} showColumnToggle - Whether to show column visibility toggle
 * @param {string} title - Optional table title
 * @param {ReactNode} actions - Optional actions to display in the header
 */
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
}) {
    // State for search input and pagination
    const [globalFilter, setGlobalFilter] = useState(searchValue);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [sorting, setSorting] = useState([{ id: sortColumn, desc: sortDirection === 'desc' }]);

    // Update local state when props change
    useEffect(() => {
        setGlobalFilter(searchValue);
    }, [searchValue]);

    useEffect(() => {
        setPageSize(initialPageSize);
    }, [initialPageSize]);

    useEffect(() => {
        setSorting([{ id: sortColumn, desc: sortDirection === 'desc' }]);
    }, [sortColumn, sortDirection]);

    // Determine if we're using server-side processing
    const isServerSide = !!onPageChange;

    // Handle sort change
    const handleSortingChange = (updatedSorting) => {
        setSorting(updatedSorting);

        if (isServerSide && onSortChange && updatedSorting.length > 0) {
            const { id, desc } = updatedSorting[0];
            onSortChange(id, desc ? 'desc' : 'asc');
        }
    };

    // Initialize the table with TanStack React Table
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
            columnVisibility: {},
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
    });

    // Calculate visible range for items display
    const pageIndex = table.getState().pagination.pageIndex || 0;
    const currentPageSize = table.getState().pagination.pageSize || pageSize;
    const totalCount = typeof totalItems === 'number' ? totalItems : data?.length || 0;

    const startIndex = pageIndex * currentPageSize + (totalCount > 0 ? 1 : 0);
    const endIndex = Math.min((pageIndex + 1) * currentPageSize, totalCount);

    const showPagination = totalCount > 0;

    // Handle page change
    const handlePageChange = (newPage) => {
        if (isServerSide) {
            onPageChange(newPage);
        } else {
            table.setPageIndex(newPage);
        }
    };

    // Handle search change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setGlobalFilter(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    // Handle page size change
    const handlePageSizeChange = (value) => {
        const newSize = Number(value);
        setPageSize(newSize);
        table.setPageSize(newSize);

        if (onPageSizeChange) {
            onPageSizeChange(newSize);
        }
    };

    // Handle data export
    const handleExport = () => {
        if (onExport) {
            onExport(data);
        } else {
            // Default CSV export implementation
            const headers = columns
                .filter((col) => col.accessorKey && col.header)
                .map((col) => (typeof col.header === 'string' ? col.header : col.accessorKey));

            const csvContent = [
                headers.join(','),
                ...data.map((row) =>
                    columns
                        .filter((col) => col.accessorKey)
                        .map((col) => {
                            const value = row[col.accessorKey];
                            return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
                        })
                        .join(','),
                ),
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', `export-${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="space-y-4">
            {/* Table Header with Search, Actions, and Column Visibility */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 items-center gap-2">
                    {title && <h2 className="text-lg font-semibold">{title}</h2>}

                    {/* Search Input */}
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
                        <Input placeholder={searchPlaceholder} value={globalFilter ?? ''} onChange={handleSearchChange} className="pl-8" />
                    </div>
                </div>

                {/* Actions Area */}
                <div className="flex items-center gap-2">
                    {actions}

                    <ExportDropdown onExport={onExport} data={data} allData={totalItems > data.length ? null : data} />

                    {/*Column Visibility Toggle */}
                    {showColumnToggle && columns.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <SlidersHorizontal className="h-4 w-4" />
                                    Columns
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
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

            {/* Page Size Selector */}
            <div className="flex items-center justify-end gap-2">
                <span className="text-sm text-gray-500">Show</span>
                <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
                    <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder={pageSize} />
                    </SelectTrigger>
                    <SelectContent>
                        {pageSizeOptions.map((size) => (
                            <SelectItem key={size} value={String(size)}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <span className="text-sm text-gray-500">per page</span>
            </div>

            {/* Main Table */}
            <div className="rounded-md border">
                <Table>
                    {/* Table Header */}
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            <div className="flex items-center">
                                                {header.column.getCanSort() ? (
                                                    <div
                                                        onClick={() => {
                                                            header.column.toggleSorting(header.column.getIsSorted() === 'asc');
                                                        }}
                                                        className="flex cursor-pointer items-center hover:text-gray-700"
                                                    >
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        <ChevronDown
                                                            className={`ml-1 h-4 w-4 transition-transform ${
                                                                header.column.getIsSorted() === 'desc'
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

                    {/* Table Body */}
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="hover:bg-gray-50">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
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
