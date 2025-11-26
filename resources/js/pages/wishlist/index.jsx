// resources/js/Pages/wishlist/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function Wishlist() {
    const { wishlists, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Wishlist',
            href: '/wishlist',
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
        column('cartTotal', 'Carttotal', (item) => <div className="font-medium">{item.cartTotal}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('wishlist.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('wishlist.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('wishlist.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Wishlist"
            data={wishlists}
            filters={filters}
            currentUser={auth.user}
            resourceName="wishlist"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Wishlist"
        />
    );
}
