// resources/js/Pages/coupon/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function Coupon() {
    const { coupons, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Coupon',
            href: '/coupon',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('type', 'Type', (item) => <div className="font-medium">{item.type}</div>),
        column('title', 'Title', (item) => <div className="font-medium">{item.title}</div>),
        column('slug', 'Slug', (item) => <div className="font-medium">{item.slug}</div>),
        column('code', 'Code', (item) => <div className="font-medium">{item.code}</div>),
        column('coupon_for', 'Coupon For', (item) => <div className="font-medium">{item.coupon_for}</div>),
        column('limit', 'Limit', (item) => <div className="font-medium">{item.limit}</div>),
        column('user_limit', 'User Limit', (item) => <div className="font-medium">{item.user_limit}</div>),
        column('coupon_used', 'Coupon Used', (item) => <div className="font-medium">{item.coupon_used}</div>),
        column('discount_type', 'Discount Type', (item) => <div className="font-medium">{item.discount_type}</div>),
        column('discount', 'Discount', (item) => <div className="font-medium">{item.discount}</div>),
        column('max_discount', 'Max Discount', (item) => <div className="font-medium">{item.max_discount}</div>),
        column('minimum_purchase', 'Minimum Purchase', (item) => <div className="font-medium">{item.minimum_purchase}</div>),
        column('start_at', 'Start At', (item) => <div className="font-medium">{item.start_at}</div>),
        column('end_at', 'End At', (item) => <div className="font-medium">{item.end_at}</div>),
        column('status', 'Status', (item) => <div className="font-medium">{item.status}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('coupon.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('coupon.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('coupon.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Coupon"
            data={coupons}
            filters={filters}
            currentUser={auth.user}
            resourceName="coupon"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Coupon"
        />
    );
}
