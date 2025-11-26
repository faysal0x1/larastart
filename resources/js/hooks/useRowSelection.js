import { useState, useCallback } from 'react';

/**
 * Custom hook for managing row selection in data tables
 *
 * @param {Object} options - Configuration options
 * @param {string} options.idAccessor - Field name to use as unique identifier (default: 'id')
 * @param {Array} options.initialSelection - Initial selected rows (default: [])
 * @param {Function} options.onSelectionChange - Callback when selection changes
 * @returns {Object} Selection state and handlers
 */
export const useRowSelection = (options = {}) => {
    const {
        idAccessor = 'id',
        initialSelection = [],
        onSelectionChange = null
    } = options;

    const [selectedRows, setSelectedRows] = useState(initialSelection);

    // Handle individual row selection
    const toggleRowSelection = useCallback((row) => {
        setSelectedRows(prevSelection => {
            const isSelected = prevSelection.some(
                selectedRow => selectedRow[idAccessor] === row[idAccessor]
            );

            let newSelection;
            if (isSelected) {
                // Remove from selection
                newSelection = prevSelection.filter(
                    selectedRow => selectedRow[idAccessor] !== row[idAccessor]
                );
            } else {
                // Add to selection
                newSelection = [...prevSelection, row];
            }

            // Call external callback if provided
            if (onSelectionChange) {
                onSelectionChange(newSelection);
            }

            return newSelection;
        });
    }, [idAccessor, onSelectionChange]);

    // Handle select all rows
    const toggleAllRowsSelection = useCallback((rows, isSelected) => {
        setSelectedRows(prevSelection => {
            let newSelection;
            if (isSelected) {
                // Add all rows to selection
                const newRows = rows.filter(
                    row => !prevSelection.some(
                        selectedRow => selectedRow[idAccessor] === row[idAccessor]
                    )
                );
                newSelection = [...prevSelection, ...newRows];
            } else {
                // Remove all rows from selection
                const rowIds = rows.map(row => row[idAccessor]);
                newSelection = prevSelection.filter(
                    selectedRow => !rowIds.includes(selectedRow[idAccessor])
                );
            }

            // Call external callback if provided
            if (onSelectionChange) {
                onSelectionChange(newSelection);
            }

            return newSelection;
        });
    }, [idAccessor, onSelectionChange]);

    // Clear all selections
    const clearSelection = useCallback(() => {
        setSelectedRows([]);
        if (onSelectionChange) {
            onSelectionChange([]);
        }
    }, [onSelectionChange]);

    // Check if a row is selected
    const isRowSelected = useCallback((row) => {
        return selectedRows.some(
            selectedRow => selectedRow[idAccessor] === row[idAccessor]
        );
    }, [selectedRows, idAccessor]);

    // Check if all rows are selected
    const areAllRowsSelected = useCallback((rows) => {
        if (rows.length === 0) return false;
        return rows.every(row => isRowSelected(row));
    }, [isRowSelected]);

    // Get selected row IDs
    const getSelectedIds = useCallback(() => {
        return selectedRows.map(row => row[idAccessor]);
    }, [selectedRows, idAccessor]);

    return {
        selectedRows,
        setSelectedRows,
        toggleRowSelection,
        toggleAllRowsSelection,
        clearSelection,
        isRowSelected,
        areAllRowsSelected,
        getSelectedIds,
        selectedCount: selectedRows.length
    };
};

export default useRowSelection;
