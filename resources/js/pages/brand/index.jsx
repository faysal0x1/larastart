// resources/js/Pages/brand/index.jsx
import ActionsDropdown from '@/components/ActionsDropdown';
import ListingPage from '@/components/ListingPage';
import { column, createCheckboxColumn, createImageColumn, createSerialColumn, createToggleColumn } from '@/utils/tableUtils';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Brand() {
    const { brands, filters = {}, auth } = usePage().props;
    const [selectedRows, setSelectedRows] = useState([]);

    const breadcrumbs = [
        {
            title: 'Brand',
            href: '/brands',
        },
    ];

    // Handle individual row selection
    const toggleRowSelection = (row) => {
        setSelectedRows((prev) => {
            const isSelected = prev.some((selectedRow) => selectedRow.id === row.id);
            if (isSelected) {
                const newSelection = prev.filter((selectedRow) => selectedRow.id !== row.id);
                console.log('Row deselected:', row.name, 'New selection:', newSelection.length);
                return newSelection;
            } else {
                const newSelection = [...prev, row];
                console.log('Row selected:', row.name, 'New selection:', newSelection.length);
                return newSelection;
            }
        });
    };

    // Check if a row is selected
    const isRowSelected = (row) => {
        return selectedRows.some((selectedRow) => selectedRow.id === row.id);
    };

    // Handle batch delete
    const handleBatchDelete = (rows) => {
        const selectedIds = selectedRows.map((row) => row.id);
        console.log('Batch delete called with selectedRows:', selectedRows);
        console.log('Selected IDs:', selectedIds);

        if (selectedIds.length === 0) {
            toast.error('Please select at least one item to delete.');
            return;
        }

        if (confirm(`Are you sure you want to delete ${selectedIds.length} selected brands?`)) {
            console.log('Proceeding with batch delete...');
            router.delete(route('brand.batch-delete'), {
                data: { ids: selectedIds },
                onSuccess: () => {
                    console.log('Batch delete successful');
                    toast.success(`${selectedIds.length} brands deleted successfully`);
                    setSelectedRows([]); // Clear selection after successful delete
                },
                onError: (errors) => {
                    console.error('Batch delete error:', errors);
                    toast.error('Failed to delete selected brands');
                },
            });
        }
    };

    const columns = [
        createCheckboxColumn({
            onRowToggle: (row, checked) => {
                toggleRowSelection(row);
            },
            onSelectAll: (allRows, checked) => {
                allRows.forEach((row) => {
                    const isCurrentlySelected = isRowSelected(row);
                    if (checked && !isCurrentlySelected) {
                        toggleRowSelection(row);
                    } else if (!checked && isCurrentlySelected) {
                        toggleRowSelection(row);
                    }
                });
            },
            selectedRows: selectedRows,
        }),
        createSerialColumn('Serial'),
        column('name', 'Enter Brand Name', (item) => <div className="font-medium">{item.name}</div>),
        column('totalProducts', 'Total Products', (item) => <div className="font-medium">{item.totalProducts}</div>),
        createImageColumn('image_url', 'Image', {
            width: 100,
            height: 100,
            className: 'border border-gray-200',
            defaultImage: '/images/default-product.png',
        }),
        createToggleColumn('status', 'Status', 'status.update', {
            confirmMessage: 'Are you sure you want to change the status for this user?',
            successMessage: 'status updated successfully',
            errorMessage: 'Failed to update user ban status',
            modelType: 'brand',
        }),

        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('brand.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('brand.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('brand.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Brand"
            data={brands}
            filters={filters}
            currentUser={auth.user}
            resourceName="brand"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Brand"
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
            dataTableExtraFeatures={{
                'delete-selected': {
                    routeName: 'brand.batch-delete',
                    label: 'Delete Selected',
                    onDelete: handleBatchDelete,
                    confirmMessage: 'Are you sure you want to delete the selected brands?',
                    successMessage: 'Selected brands deleted successfully',
                    errorMessage: 'Failed to delete selected brands',
                },
            }}
        />
    );
}
