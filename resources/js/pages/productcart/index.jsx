// resources/js/Pages/productcart/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function ProductCart() {
    const { productcarts, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'ProductCart',
            href: '/productcart',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('user_id', 'User Id', (item) => <div className="font-medium">{item.user_id}</div>),
        column('product_id', 'Product Id', (item) => <div className="font-medium">{item.product_id}</div>),
        column('qty', 'Qty', (item) => <div className="font-medium">{item.qty}</div>),
        column('price', 'Price', (item) => <div className="font-medium">{item.price}</div>),
        column('color', 'Color', (item) => <div className="font-medium">{item.color}</div>),
        column('size', 'Size', (item) => <div className="font-medium">{item.size}</div>),
        column('variation', 'Variation', (item) => <div className="font-medium">{item.variation}</div>),
        column('cartTotal', 'Carttotal', (item) => <div className="font-medium">{item.cartTotal}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('product-cart.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('product-cart.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('product-cart.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="ProductCart"
            data={productcarts}
            filters={filters}
            currentUser={auth.user}
            resourceName="product-cart"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New ProductCart"
        />
    );
}
