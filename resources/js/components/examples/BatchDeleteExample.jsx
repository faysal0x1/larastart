import React from 'react';
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn, createCheckboxColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import { useRowSelection } from '@/hooks/useRowSelection';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

/**
 * Example component showing how to use the reusable batch delete functionality
 * This can be copied and adapted for any listing page
 */
export default function BatchDeleteExample() {
    const { data, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Example',
            href: '/example',
        },
    ];

    // Use the row selection hook
    const {
        selectedRows,
        toggleRowSelection,
        clearSelection,
        isRowSelected,
        getSelectedIds
    } = useRowSelection({
        idAccessor: 'id', // Change this to match your data structure
        onSelectionChange: (newSelection) => {
            console.log('Selection changed:', newSelection);
        }
    });

    // Handle batch delete with custom logic
    const handleBatchDelete = (rows) => {
        const selectedIds = getSelectedIds();

        // Show confirmation
        if (confirm(`Are you sure you want to delete ${selectedIds.length} selected items?`)) {
            // Make the API call
            router.delete(route('example.batch-delete'), {
                data: { ids: selectedIds },
                onSuccess: () => {
                    toast.success(`${selectedIds.length} items deleted successfully`);
                    clearSelection(); // Clear selection after successful delete
                },
                onError: (errors) => {
                    console.error('Batch delete error:', errors);
                    toast.error('Failed to delete selected items');
                },
            });
        }
    };

    // Define columns
    const columns = [
        // Checkbox column for row selection
        createCheckboxColumn({
            onSelectionChange: (newSelection) => {
                // Update selection using the hook
                newSelection.forEach(row => {
                    if (!isRowSelected(row)) {
                        toggleRowSelection(row);
                    }
                });
                // Remove unselected rows
                selectedRows.forEach(row => {
                    if (!newSelection.some(selectedRow => selectedRow.id === row.id)) {
                        toggleRowSelection(row);
                    }
                });
            },
            selectedRows: selectedRows,
        }),

        // Serial number column
        createSerialColumn('Serial'),

        // Your data columns
        column('name', 'Name', (item) => <div className="font-medium">{item.name}</div>),
        column('email', 'Email', (item) => <div className="font-medium">{item.email}</div>),
        column('status', 'Status', (item) => (
            <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
                }`}>
                {item.status}
            </span>
        )),
    ];

    return (
        <ListingPage
            title="Example with Batch Delete"
            data={data}
            filters={filters}
            currentUser={auth.user}
            resourceName="example"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Item"
            dataTableExtraFeatures={{
                'delete-selected': {
                    routeName: 'example.batch-delete',
                    label: 'Delete Selected',
                    onDelete: handleBatchDelete, // Custom delete handler
                    confirmMessage: 'Are you sure you want to delete the selected items?',
                    successMessage: 'Selected items deleted successfully',
                    errorMessage: 'Failed to delete selected items',
                    permission: 'example.delete', // Optional permission check
                    idAccessor: 'id', // Optional: specify the ID field
                    additionalData: { // Optional: additional data to send
                        reason: 'batch_delete',
                        deleted_by: auth.user.id
                    }
                }
            }}
        />
    );
}

/**
 * USAGE INSTRUCTIONS:
 *
 * 1. Copy this component and adapt it for your specific use case
 * 2. Update the following:
 *    - Component name and title
 *    - Breadcrumbs
 *    - Column definitions to match your data
 *    - Route names (example.batch-delete)
 *    - Resource name
 *    - ID accessor if different from 'id'
 *
 * 3. Add the batch delete route to your Laravel routes:
 *    Route::delete('/example/batch-delete', [ExampleController::class, 'batchDelete'])->name('example.batch-delete');
 *
 * 4. Implement the batch delete method in your controller:
 *    public function batchDelete(Request $request)
 *    {
 *        $ids = $request->input('ids');
 *        // Your delete logic here
 *        return redirect()->back()->with('success', 'Items deleted successfully');
 *    }
 *
 * 5. The checkbox column will automatically handle:
 *    - Individual row selection
 *    - Select all functionality
 *    - Visual feedback for selected rows
 *
 * 6. The batch delete button will:
 *    - Show count of selected items
 *    - Be disabled when no items are selected
 *    - Show confirmation dialog
 *    - Handle success/error states
 *    - Clear selection after successful delete
 */
