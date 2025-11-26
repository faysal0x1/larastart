import ActionsDropdown from '@/components/ActionsDropdown';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn, createCheckboxColumn } from '@/utils/tableUtils';
import { usePage, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Product() {
    const { products, filters = {}, auth, currentLocale, availableLocales } = usePage().props;
    const [selectedRows, setSelectedRows] = useState([]);

    const breadcrumbs = [
        {
            title: 'Product',
            href: '/product',
        },
    ];

    function excerpt(text, words = 20) {
        if (!text) return '';
        const parts = text.split(/\s+/);
        return parts.length > words
            ? parts.slice(0, words).join(' ') + '…'
            : text;
    }

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

        if (confirm(`Are you sure you want to delete ${selectedIds.length} selected products?`)) {
            console.log('Proceeding with batch delete...');
            router.delete(route('product.batch-delete'), {
                data: { ids: selectedIds },
                onSuccess: () => {
                    console.log('Batch delete successful');
                    toast.success(`${selectedIds.length} products deleted successfully`);
                    setSelectedRows([]); // Clear selection after successful delete
                },
                onError: (errors) => {
                    console.error('Batch delete error:', errors);
                    toast.error('Failed to delete selected products');
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
        column('brand_id', 'Brand Id', (item) => <div className="font-medium">{item.brand?.name || item.brand_id}</div>),
        column('category_id', 'Category Id', (item) => <div className="font-medium">{item.category?.name || item.category_id}</div>),
        column('subcategory_id', 'Subcategory Id', (item) => <div className="font-medium">{item.subcategory?.name || item.subcategory_id}</div>),
        column('name', 'Name', (item) => (
            <div className="font-medium">
                <Link href={route('product.show', item.id)} className="hover:underline">
                    {item.name}
                </Link>
            </div>
        )),
        column('slug', 'Slug', (item) => <div className="font-medium">{item.slug}</div>),
        column('type', 'Type', (item) => <div className="font-medium">{item.type}</div>),
        column('sku', 'Sku', (item) => <div className="font-medium">{item.sku}</div>),
        column('qty', 'Qty', (item) => <div className="font-medium">{item.qty}</div>),

        column('tags', 'Tags', (item) => (
            <div className="font-medium">
                {excerpt(item.tags, 6)}
            </div>
        )),

        column('size', 'Size', (item) => <div className="font-medium">{item.size}</div>),
        column('stock', 'Stock', (item) => <div className="font-medium">{item.stock}</div>),
        column('unit_price', 'Unit Price', (item) => <div className="font-medium">{item.unit_price}</div>),
        column('discount_type', 'Discount Type', (item) => <div className="font-medium">{item.discount_type}</div>),
        column('discount_price', 'Discount Price', (item) => <div className="font-medium">{item.discount_price}</div>),
        column('product_tax', 'Product Tax', (item) => <div className="font-medium">{item.product_tax}</div>),
        column('tax_calculation', 'Tax Calculation', (item) => <div className="font-medium">{item.tax_calculation}</div>),
        column('final_price', 'Final Price', (item) => <div className="font-medium">{item.final_price}</div>),
        column('short_descp', 'Short Description', (item) => (
            <div className="font-medium">
                {excerpt(item.short_descp, 6)}
            </div>
        )),
        column('long_descp', 'Long Description', (item) => (
            <div className="font-medium">
                {excerpt(item.long_descp, 6)}
            </div>
        )),
        column('product_thumbnail', 'Product Thumbnail', (item) => (
            <div className="font-medium">
                {item.image_url || item.product_thumbnail ? (
                    <img src={item.image_url || item.product_thumbnail} alt={item.name} className="h-10 w-10 rounded object-cover" />
                ) : (
                    <span className="text-gray-400">N/A</span>
                )}
            </div>
        )),
        column('hot_deals', 'Hot Deals', (item) => <div className="font-medium">{item.hot_deals}</div>),
        column('featured', 'Featured', (item) => <div className="font-medium">{item.featured}</div>),
        column('special_offer', 'Special Offer', (item) => <div className="font-medium">{item.special_offer}</div>),
        column('special_deals', 'Special Deals', (item) => <div className="font-medium">{item.special_deals}</div>),
        column('status', 'Status', (item) => <div className="font-medium">{item.status}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('product.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('product.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('product.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <div>
            <ListingPage
                title="Product"
                data={products}
                filters={filters}
                currentUser={auth.user}
                resourceName="product"
                breadcrumbs={breadcrumbs}
                columns={columns}
                createButtonText="New Product"
                selectedRows={selectedRows}
                onSelectionChange={setSelectedRows}
                dataTableExtraFeatures={{
                    'delete-selected': {
                        routeName: 'product.batch-delete',
                        label: 'Delete Selected',
                        onDelete: handleBatchDelete,
                        confirmMessage: 'Are you sure you want to delete the selected products?',
                        successMessage: 'Selected products deleted successfully',
                        errorMessage: 'Failed to delete selected products'
                    }
                }}
            />
        </div>
    );
}
