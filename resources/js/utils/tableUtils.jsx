// resources/js/utils/tableUtils.jsx
import ActionsDropdown from '@/components/ActionsDropdown.jsx';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { Link, router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

/**
 * Create a sortable column configuration with standardized behavior
 *
 * @param {string} key - The accessorKey for the column
 * @param {string|Function} header - The column header text or render function
 * @param {Function} cellRenderer - Optional custom cell renderer
 * @param {boolean} canSort - Whether this column can be sorted
 * @param {Object} additionalProps - Any additional column props
 * @returns {Object} Column configuration object
 */
export function createColumn(key, header, cellRenderer = null, canSort = true, additionalProps = {}) {
    return {
        accessorKey: key,
        header: ({ column }) => {
            if (typeof header === 'function') {
                return header({ column });
            }

            if (canSort) {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className="p-0 hover:bg-transparent dark:hover:bg-transparent"
                    >
                        {header}
                    </Button>
                );
            }

            return header;
        },
        cell: cellRenderer ? ({ row }) => cellRenderer(row) : undefined,
        enableSorting: canSort,
        ...additionalProps,
    };
}

/**
 * Create an actions column with a dropdown menu
 *
 * @param {Function} actionsRenderer - Function that returns the actions for a row
 * @param {string} header - Optional header text (defaults to "Actions")
 * @returns {Object} Column configuration object
 */
export function createActionsColumn(actionsRenderer, header = 'Actions') {
    return {
        id: 'actions',
        header,
        cell: ({ row }) => actionsRenderer(row),
        enableSorting: false,
    };
}

/**
 * Create a date column with proper formatting
 *
 * @param {string} key - The accessorKey for the column
 * @param {string} header - The column header text
 * @param {string} dateFormat - Format string for date-fns (default: 'MMM d, yyyy')
 * @returns {Object} Column configuration object
 */
export function createDateColumn(key, header, dateFormat = 'MMM d, yyyy') {
    return createColumn(
        key,
        header,
        (row) => {
            const dateValue = row.original[key];
            if (!dateValue) return <span className="dark:text-gray-400">-</span>;
            try {
                return <span className="dark:text-gray-200">{format(new Date(dateValue), dateFormat)}</span>;
            } catch (e) {
                return <span className="dark:text-gray-200">{dateValue}</span>;
            }
        },
        true,
    );
}

/**
 * Create a status/badge column
 *
 * @param {string} key - The accessorKey for the column
 * @param {string} header - The column header text
 * @param {Object} statusConfig - Configuration for status colors keyed by status value
 * @returns {Object} Column configuration object
 */
export function createStatusColumn(key, header, statusConfig = {}) {
    return createColumn(
        key,
        header,
        (row) => {
            const status = row.original[key];
            const config = statusConfig[status] || { color: 'gray', label: status };

            return (
                <Badge
                    variant="outline"
                    className={`bg-${config.color}-50 text-${config.color}-700 border-${config.color}-200 dark:bg-${config.color}-900 dark:text-${config.color}-200 dark:border-${config.color}-700`}
                >
                    {config.label || status}
                </Badge>
            );
        },
        true,
    );
}

/**
 * Create a tags column
 *
 * @param {string} key - The accessorKey for the column
 * @param {string} header - The column header text
 * @returns {Object} Column configuration object
 */
export function createTagsColumn(key, header) {
    return createColumn(
        key,
        header,
        (row) => {
            const tags = row.original[key] || [];
            return (
                <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => (
                        <Badge key={tag.id} variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                            {tag.name}
                        </Badge>
                    ))}
                    {tags.length === 0 && <span className="text-sm text-gray-400 dark:text-gray-500">No {header.toLowerCase()}</span>}
                </div>
            );
        },
        false,
    );
}

/**
 * Create a boolean column with Yes/No or custom renderer
 *
 * @param {string} key - The accessorKey for the column
 * @param {string} header - The column header text
 * @param {Function} booleanRenderer - Optional custom renderer for boolean values
 * @returns {Object} Column configuration object
 */
export function createBooleanColumn(key, header, booleanRenderer = null) {
    return createColumn(
        key,
        header,
        (row) => {
            const value = row.original[key];

            if (booleanRenderer) {
                return booleanRenderer(value, row);
            }

            return <span className="dark:text-gray-200">{value ? 'Yes' : 'No'}</span>;
        },
        true,
    );
}

export const withOriginal = (callback) => {
    return (row) => callback(row.original);
};

export const column = (accessor, headerOrRenderFn = null, renderFn = null) => {
    // Handle the case where the second parameter is the render function
    if (typeof headerOrRenderFn === 'function') {
        renderFn = headerOrRenderFn;
        headerOrRenderFn = null;
    }

    // If no header is provided, capitalize the accessor
    const header = headerOrRenderFn || capitalize(accessor);

    // Create and return the column configuration
    const columnConfig = {
        accessorKey: accessor,
        header: header,
    };

    if (typeof renderFn === 'function') {
        columnConfig.cell = ({ row }) => renderFn(row.original);
    }

    return columnConfig;
};

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Create a serial number column
 * @param {string} header - Column header text (default: '#')
 * @param {Object} options - Optional pagination parameters (for backward compatibility)
 * @param {number} options.currentPage - Current page number (1-based) - will be auto-detected if not provided
 * @param {number} options.perPage - Number of items per page - will be auto-detected if not provided
 * @returns {Object} Column configuration object
 */
export function createSerialColumn(header = '#', options = {}) {
    const { currentPage, perPage } = options;

    return {
        id: 'serial',
        header: header,
        cell: ({ row, table }) => {
            // Try to extract pagination from table context first (preferred method)
            const paginationState = table?.getState?.()?.pagination;
            let pageIndex = paginationState?.pageIndex ?? 0;
            let pageSize = paginationState?.pageSize ?? 10;

            // Override with provided options if they exist (for backward compatibility)
            if (currentPage !== undefined) {
                pageIndex = currentPage - 1; // Convert 1-based to 0-based
            }
            if (perPage !== undefined) {
                pageSize = perPage;
            }

            // Calculate serial number: (pageIndex) * pageSize + row.index + 1
            // pageIndex is 0-based, so we add 1 to convert to 1-based for display
            const serialNumber = pageIndex * pageSize + row.index + 1;
            return <span className="dark:text-gray-200">{serialNumber}</span>;
        },
        enableSorting: false,
    };
}

export const linkColumn = (accessor, header, routeName, idAccessor = 'id', options = {}) => {
    const { className = 'hover:underline', linkWrapper = 'font-medium', textAccessor = accessor, urlParams = (item) => item[idAccessor] } = options;

    return {
        accessorKey: accessor,
        header: header,
        cell: ({ row }) => {
            const item = row.original;
            const linkText = typeof textAccessor === 'function' ? textAccessor(item) : item[textAccessor];

            const params = typeof urlParams === 'function' ? urlParams(item) : urlParams;

            return (
                <div className={linkWrapper}>
                    <Link href={route(routeName, params)} className={className}>
                        {linkText}
                    </Link>
                </div>
            );
        },
    };
};

/**
 * Create a generic toggle column that works with any model using Inertia
 *
 * @param {string} key - The field name to toggle
 * @param {string} header - The column header text
 * @param {string} routeName - The route name for the update action
 * @param {Object} options - Additional configuration options
 * @returns {Object} Column configuration object
 */
export function createToggleColumn(key, header, routeName, options = {}) {
    const {
        confirmMessage = `Are you sure you want to change this ${key.replace('_', ' ')}?`,
        successMessage = `${key.replace('_', ' ')} updated successfully`,
        errorMessage = `Failed to update ${key.replace('_', ' ')}`,
        idAccessor = 'id',
        modelType = '',
        disabledFn = null,
        size = 'default',
        onToggleSuccess = null,
        preserveScroll = true,
        preserveState = true,
        customPayloadFn = null,
    } = options;

    return {
        accessorKey: key,
        header: header,
        cell: ({ row }) => {
            const value = row.original[key];
            const isDisabled = disabledFn ? disabledFn(row.original) : false;
            const handleToggle = async (newValue) => {
                try {
                    const itemId = row.original[idAccessor];
                    // Create the payload
                    const payload = customPayloadFn ? customPayloadFn(newValue, row.original) : { [key]: newValue };

                    // Use Inertia to update with both model and id parameters
                    router.patch(route(routeName, { model: modelType, id: itemId }), payload, {
                        preserveScroll,
                        preserveState,
                        onSuccess: (page) => {
                            // Call success callback if provided
                            if (onToggleSuccess) {
                                onToggleSuccess(page.props, row.original);
                            }
                        },
                        onError: (errors) => {
                            console.error('Toggle update failed:', errors);
                        },
                    });
                } catch (error) {
                    console.error('Toggle update failed:', error);

                    toast.error('Error', {
                        description: errorMessage,
                    });
                }
            };

            return (
                <ToggleSwitch
                    checked={value}
                    onChange={handleToggle}
                    disabled={isDisabled}
                    confirmationMessage={confirmMessage}
                    successMessage={successMessage}
                    errorMessage={errorMessage}
                    size={size}
                />
            );
        },
        enableSorting: true,
        meta: {
            className: 'w-28',
        },
    };
}

/**
 * Create a toggle switch column for integer/enum values
 *
 * @param {string} key - The accessorKey for the column
 * @param {string} header - The column header text
 * @param {string} routeName - The route name for the update action
 * @param {number} activeValue - Value representing active/on state
 * @param {number} inactiveValue - Value representing inactive/off state
 * @param {Object} options - Configuration options
 * @returns {Object} Column configuration object
 */
export function createStatusToggleColumn(key, header, routeName, activeValue = 1, inactiveValue = 0, options = {}) {
    return createToggleColumn(key, header, routeName, {
        ...options,
        customPayloadFn: (newValue, item) => ({
            [key]: newValue ? activeValue : inactiveValue,
        }),
    });
}

export function createPermissionActionsColumn(actions = [], header = 'Actions') {
    return {
        id: 'actions',
        header,
        cell: ({ row }) => {
            const { auth, roles, permissions } = usePage().props;
            const item = row.original;

            console.log('item');
            console.log(item);

            console.log('role');

            console.log(roles);

            console.log('Auth Role');
            console.log(roles);

            console.log('Permissions');
            console.log(permissions);
            // Filter actions based on permissions
            const filteredActions = actions.filter((action) => {
                // Show if no permission/role required
                if (!action.permission && !action.role) return true;

                // Check permission if specified
                if (action.permission && !auth.permissions?.includes(action.permission)) {
                    return false;
                }

                // Check role if specified
                if (action.role && !auth.roles?.includes(action.role)) {
                    return false;
                }

                return true;
            });

            // Don't show dropdown if no actions available
            if (filteredActions.length === 0) return null;

            return (
                <div className="text-center">
                    <ActionsDropdown item={item}>
                        {filteredActions.map((action) => (
                            <ActionsDropdown.Item
                                key={action.key}
                                href={action.href ? action.href(item) : undefined}
                                onClick={action.onClick ? () => action.onClick(item) : undefined}
                                className={action.className}
                            >
                                {action.label}
                                {action.icon && <action.icon className="ml-2 h-4 w-4" />}
                            </ActionsDropdown.Item>
                        ))}
                    </ActionsDropdown>
                </div>
            );
        },
        enableSorting: false,
    };
}
/**
 * Create an image column with thumbnail display
 *
 * @param {string} key - The accessorKey for the column
 * @param {string} header - The column header text
 * @param {Object} options - Configuration options
 * @returns {Object} Column configuration object
 */
export function createImageColumn(key, header, options = {}) {
    const {
        width = 50,
        height = 50,
        className = '',
        defaultImage = '', // URL or path to default/fallback image
        altTextFn = (item) => item.name || item.title || 'Image', // Function to generate alt text
        imageUrlFn = null, // Optional function to transform the image URL
    } = options;

    return createColumn(
        key,
        header,
        (row) => {
            const item = row.original;
            let imageUrl = item[key];

            // Apply transformation function if provided
            if (imageUrlFn && typeof imageUrlFn === 'function') {
                imageUrl = imageUrlFn(item);
            }

            // Use default image if no image URL is provided
            if (!imageUrl && defaultImage) {
                imageUrl = defaultImage;
            }

            // Don't render anything if no image is available
            if (!imageUrl) {
                return <span className="text-gray-400 dark:text-gray-500">-</span>;
            }

            return (
                <div className="flex items-center">
                    <img
                        src={imageUrl}
                        alt={altTextFn(item)}
                        width={width}
                        height={height}
                        className={`object-cover rounded ${className}`}
                        onError={(e) => {
                            if (defaultImage) {
                                e.target.src = defaultImage;
                            } else {
                                e.target.style.display = 'none';
                            }
                        }}
                    />
                </div>
            );
        },
        false,
        {
            meta: {
                className: 'w-[60px]', // Default width for the column
            },
        }
    );
}

export function createSelectColumn(key, header, routeName, options = {}) {
    const {
        confirmMessage = `Are you sure you want to change this ${key.replace('_', ' ')}?`,
        successMessage = `${key.replace('_', ' ')} updated successfully`,
        errorMessage = `Failed to update ${key.replace('_', ' ')}`,
        idAccessor = 'id',
        modelType = '',
        disabledFn = null,
        onUpdateSuccess = null,
        preserveScroll = true,
        preserveState = true,
        customPayloadFn = null,
        selectOptions = [], // Array of {value, label} objects
        placeholder = 'Select...',
        showConfirmation = true,
    } = options;

    return {
        accessorKey: key,
        header: header,
        cell: ({ row }) => {
            const currentValue = row.original[key];
            const isDisabled = disabledFn ? disabledFn(row.original) : false;

            const handleUpdate = async (newValue) => {
                if (newValue === currentValue) return; // No change

                try {
                    const itemId = row.original[idAccessor];
                    // Create the payload
                    const payload = customPayloadFn ? customPayloadFn(newValue, row.original) : { [key]: newValue };

                    // Use Inertia to update with both model and id parameters
                    router.patch(route(routeName, { model: modelType, id: itemId }), payload, {
                        preserveScroll,
                        preserveState,
                        onSuccess: (page) => {
                            // Show success message with SweetAlert
                            Swal.fire({
                                title: 'Success!',
                                text: successMessage,
                                icon: 'success',
                                timer: 2000,
                                showConfirmButton: false
                            });

                            // Call success callback if provided
                            if (onUpdateSuccess) {
                                onUpdateSuccess(page.props, row.original);
                            }
                        },
                        onError: (errors) => {
                            console.error('Select update failed:', errors);
                            Swal.fire({
                                title: 'Error!',
                                text: errorMessage,
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        },
                    });
                } catch (error) {
                    console.error('Select update failed:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: errorMessage,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            };

            const handleSelectChange = async (newValue) => {
                if (showConfirmation) {
                    // Show SweetAlert confirmation dialog
                    const result = await Swal.fire({
                        title: 'Are you sure?',
                        text: confirmMessage,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, update it!',
                        cancelButtonText: 'Cancel'
                    });

                    if (result.isConfirmed) {
                        await handleUpdate(newValue);
                    }
                } else {
                    await handleUpdate(newValue);
                }
            };

            return (
                <StatusSelect
                    value={currentValue}
                    onChange={handleSelectChange}
                    disabled={isDisabled}
                    options={selectOptions}
                    placeholder={placeholder}
                />
            );
        },
        enableSorting: true,
        meta: {
            className: 'w-36',
        },
    };
}

/**
 * Create a checkbox column for row selection
 *
 * @param {Object} options - Configuration options
 * @returns {Object} Column configuration object
 */
export function createCheckboxColumn(options = {}) {
    const {
        header = '',
        idAccessor = 'id',
        onRowToggle = null,
        onSelectAll = null,
        selectedRows = [],
        disabledFn = null,
    } = options;

    return {
        id: 'select',
        header: ({ table }) => {
            const allRows = table.getRowModel().rows.map(row => row.original);
            const allSelected = allRows.length > 0 && allRows.every(row =>
                selectedRows.some(selectedRow => selectedRow[idAccessor] === row[idAccessor])
            );
            const someSelected = selectedRows.length > 0;

            return (
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={allSelected}
                        ref={(el) => {
                            if (el) el.indeterminate = someSelected && !allSelected;
                        }}
                        onChange={(e) => {
                            if (onSelectAll) {
                                onSelectAll(allRows, e.target.checked);
                            }
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                </div>
            );
        },
        cell: ({ row }) => {
            const isDisabled = disabledFn ? disabledFn(row.original) : false;
            const isSelected = selectedRows.some(selectedRow => selectedRow[idAccessor] === row.original[idAccessor]);

            const handleSelectionChange = (checked) => {
                if (onRowToggle) {
                    onRowToggle(row.original, checked);
                }
            };

            return (
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleSelectionChange(e.target.checked)}
                        disabled={isDisabled}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
        meta: {
            className: 'w-12',
        },
    };
}

function StatusSelect({ value, onChange, disabled, options, placeholder }) {
    return (
        <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
