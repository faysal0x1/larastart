import ActionsDropdown from '@/components/ActionsDropdown';
import ListingPage from '@/components/ListingPage';
import { column, createImageColumn, createSelectColumn, createSerialColumn, createCheckboxColumn } from '@/utils/tableUtils';
import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Category() {
    const { categorys, filters = {}, auth } = usePage().props;
    const [selectedRows, setSelectedRows] = useState([]);

    const breadcrumbs = [
        {
            title: 'Category',
            href: '/category',
        },
    ];

    // Handle individual row selection
    const toggleRowSelection = (row) => {
        setSelectedRows(prev => {
            const isSelected = prev.some(selectedRow => selectedRow.id === row.id);
            if (isSelected) {
                const newSelection = prev.filter(selectedRow => selectedRow.id !== row.id);
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
        return selectedRows.some(selectedRow => selectedRow.id === row.id);
    };

    // Handle batch delete
    const handleBatchDelete = (rows) => {
        const selectedIds = selectedRows.map(row => row.id);
        console.log('Batch delete called with selectedRows:', selectedRows);
        console.log('Selected IDs:', selectedIds);

        if (selectedIds.length === 0) {
            toast.error('Please select at least one item to delete.');
            return;
        }

        if (confirm(`Are you sure you want to delete ${selectedIds.length} selected categories?`)) {
            console.log('Proceeding with batch delete...');
            router.delete(route('category.batch-delete'), {
                data: { ids: selectedIds },
                onSuccess: () => {
                    console.log('Batch delete successful');
                    toast.success(`${selectedIds.length} categories deleted successfully`);
                    setSelectedRows([]); // Clear selection after successful delete
                },
                onError: (errors) => {
                    console.error('Batch delete error:', errors);
                    toast.error('Failed to delete selected categories');
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
                allRows.forEach(row => {
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

        column('name', 'Name', (item) => <div className="font-medium">{item.name}</div>),
        column('slug', 'Slug', (item) => <div className="font-medium">{item.slug}</div>),
        column('sub_categories_count', 'Sub Categories', (item) => (
            <div className="font-medium">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {item.sub_categories_count || 0}
                </span>
            </div>
        )),
        column('child_categories_count', 'Child Categories', (item) => (
            <div className="font-medium">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                    {item.child_categories_count || 0}
                </span>
            </div>
        )),
        column('priority', 'Priority', (item) => <div className="font-medium">{item.priority}</div>),
        column('status', 'Status', (item) => <div className="font-medium">{item.status}</div>),
        createImageColumn('image_url', 'Image', {
            width: 100,
            height: 100,
            className: 'border border-gray-200',
            defaultImage: '/images/default-product.png',
        }),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('category.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('category.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('category.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Category"
            data={categorys}
            filters={filters}
            currentUser={auth.user}
            resourceName="category"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Category"
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
            dataTableExtraFeatures={{
                'delete-selected': {
                    routeName: 'category.batch-delete',
                    label: 'Delete Selected',
                    onDelete: handleBatchDelete,
                    confirmMessage: 'Are you sure you want to delete the selected categories?',
                    successMessage: 'Selected categories deleted successfully',
                    errorMessage: 'Failed to delete selected categories'
                }
            }}
        />
    );
}
