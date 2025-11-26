// resources/js/Pages/childcategory/index.jsx
import ActionsDropdown from '@/components/ActionsDropdown';
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn, createCheckboxColumn } from '@/utils/tableUtils';
import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ChildCategory() {
    const { childCategories, filters = {}, auth } = usePage().props;
    const [selectedRows, setSelectedRows] = useState([]);

    const breadcrumbs = [
        {
            title: 'Child Category',
            href: '/childcategory',
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

        if (confirm(`Are you sure you want to delete ${selectedIds.length} selected child categories?`)) {
            console.log('Proceeding with batch delete...');
            router.delete(route('child-category.batch-delete'), {
                data: { ids: selectedIds },
                onSuccess: () => {
                    console.log('Batch delete successful');
                    toast.success(`${selectedIds.length} child categories deleted successfully`);
                    setSelectedRows([]); // Clear selection after successful delete
                },
                onError: (errors) => {
                    console.error('Batch delete error:', errors);
                    toast.error('Failed to delete selected child categories');
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
        column('sub_categories', 'Sub Categories', (item) => (
            <div className="font-medium">
                {item.sub_categories && item.sub_categories.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                        {item.sub_categories.map((subCategory, index) => (
                            <span
                                key={subCategory.id}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                            >
                                {subCategory.name}
                            </span>
                        ))}
                    </div>
                ) : (
                    <span className="text-gray-500 text-sm">No sub categories</span>
                )}
            </div>
        )),
        column('name', 'Name', (item) => <div className="font-medium">{item.name}</div>),
        column('slug', 'Slug', (item) => <div className="font-medium">{item.slug}</div>),
        column('priority', 'Priority', (item) => <div className="font-medium">{item.priority || 0}</div>),
        column('is_active', 'Status', (item) => (
            <div className="font-medium">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.is_active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
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
                        route: (id) => route('child-category.show', id),
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('child-category.edit', id),
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('child-category.destroy', id),
                        method: 'delete',
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Child Category"
            data={childCategories}
            filters={filters}
            currentUser={auth.user}
            resourceName="child-category"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Child Category"
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
            dataTableExtraFeatures={{
                'delete-selected': {
                    routeName: 'child-category.batch-delete',
                    label: 'Delete Selected',
                    onDelete: handleBatchDelete,
                    confirmMessage: 'Are you sure you want to delete the selected child categories?',
                    successMessage: 'Selected child categories deleted successfully',
                    errorMessage: 'Failed to delete selected child categories'
                }
            }}
        />
    );
}
