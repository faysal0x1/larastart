// resources/js/Pages/dealoftheday/index.jsx
import ActionsDropdown from '@/components/ActionsDropdown';
import ListingPage from '@/components/ListingPage';
import { column, createImageColumn, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';

export default function DealOfTheDay() {
    const { dealofthedays, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'DealOfTheDay',
            href: '/dealoftheday',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('title', 'Title', (item) => <div className="font-medium">{item.title}</div>),
        column('slug', 'Slug', (item) => <div className="font-medium">{item.slug}</div>),
        column('start_date', 'Start Date', (item) => <div className="font-medium">{item.start_date}</div>),
        column('end_date', 'End Date', (item) => <div className="font-medium">{item.end_date}</div>),
        createImageColumn('image_url', 'Image', {
            width: 100,
            height: 100,
            className: 'border border-gray-200',
            defaultImage: '/images/default-product.png',
        }),
        column('discount_type', 'Discount Type', (item) => <div className="font-medium">{item.discount_type}</div>),
        column('discount', 'Discount', (item) => <div className="font-medium">{item.discount}</div>),
        column('status', 'Status', (item) => <div className="font-medium">{item.status}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('deal-of-the-day.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'Add_Product',
                        label: 'Add Product',
                        route: (id) => route('deal-of-the-day.add-product', id),
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('deal-of-the-day.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('deal-of-the-day.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="DealOfTheDay"
            data={dealofthedays}
            filters={filters}
            currentUser={auth.user}
            resourceName="deal-of-the-day"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New DealOfTheDay"
        />
    );
}
