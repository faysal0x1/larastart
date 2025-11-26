// resources/js/Pages/subcategory/index.jsx
import ActionsDropdown from '@/components/ActionsDropdown';
import ListingPage from '@/components/ListingPage';
import { column, createCheckboxColumn, createSerialColumn } from '@/utils/tableUtils';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SubCategory() {
    const { subcategorys, filters = {}, auth } = usePage().props;
    const [selectedRows, setSelectedRows] = useState([]);

    const breadcrumbs = [
        {
            title: 'SubCategory',
            href: '/subcategory',
        },
    ];

    // Handle individual row selection
    const toggleRowSelection = (row) => {
        setSelectedRows((prev) => {
            const isSelected = prev.some((selectedRow) => selectedRow.id === row.id);
            if (isSelected) {
                const newSelection = prev.filter((selectedRow) => selectedRow.id !== row.id);
                return newSelection;
            } else {
                const newSelection = [...prev, row];
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

        if (confirm(`Are you sure you want to delete ${selectedIds.length} selected subcategories?`)) {
            console.log('Proceeding with batch delete...');
            router.delete(route('sub-category.batch-delete'), {
                data: { ids: selectedIds },
                onSuccess: () => {
                    console.log('Batch delete successful');
                    toast.success(`${selectedIds.length} subcategories deleted successfully`);
                    setSelectedRows([]); // Clear selection after successful delete
                },
                onError: (errors) => {
                    console.error('Batch delete error:', errors);
                    toast.error('Failed to delete selected subcategories');
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
        column('categories', 'Category', (item) => (
            <div className="font-medium">
                <div className="flex flex-wrap gap-1">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        {item.parent.name}
                    </span>
                </div>
            </div>
        )),
        column('name', 'Name', (item) => <div className="font-medium">{item.name}</div>),
        column('slug', 'Slug', (item) => <div className="font-medium">{item.slug}</div>),
        column('priority', 'Priority', (item) => <div className="font-medium">{item.priority || 0}</div>),
        column('is_active', 'Status', (item) => (
            <div className="font-medium">
                <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                >
                    {item.is_active ? 'Active' : 'Inactive'}
                </span>
            </div>
        )),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('sub-category.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('sub-category.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('sub-category.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="SubCategory"
            data={subcategorys}
            filters={filters}
            currentUser={auth.user}
            resourceName="sub-category"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New SubCategory"
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
            dataTableExtraFeatures={{
                'delete-selected': {
                    routeName: 'sub-category.batch-delete',
                    label: 'Delete Selected',
                    onDelete: handleBatchDelete,
                    confirmMessage: 'Are you sure you want to delete the selected subcategories?',
                    successMessage: 'Selected subcategories deleted successfully',
                    errorMessage: 'Failed to delete selected subcategories',
                },
            }}
        />
    );
}
