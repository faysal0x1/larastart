// resources/js/utils/tableUtils.js
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

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
                    {tags.length === 0 && <span className="text-sm text-gray-400 dark:text-gray-500">No tags</span>}
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
