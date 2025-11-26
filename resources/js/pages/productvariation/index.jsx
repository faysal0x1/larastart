
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function ProductVariation() {
    const { productvariations, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'ProductVariation',
            href: '/productvariation',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('product_id', 'Product Id', (item) => <div className="font-medium">{item.product_id}</div>),
        column('name', 'Name', (item) => <div className="font-medium">{item.name}</div>),
        column('sku', 'Sku', (item) => <div className="font-medium">{item.sku}</div>),
        column('price', 'Price', (item) => <div className="font-medium">{item.price}</div>),
        column('stock', 'Stock', (item) => <div className="font-medium">{item.stock}</div>),
        column('attributes', 'Attributes', (item) => <div className="font-medium">{item.attributes}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('product-variation.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('product-variation.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('product-variation.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="ProductVariation"
            data={productvariations}
            filters={filters}
            currentUser={auth.user}
            resourceName="product-variation"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New ProductVariation"
        />
    );
}
