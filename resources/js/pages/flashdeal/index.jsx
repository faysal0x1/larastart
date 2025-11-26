// resources/js/Pages/flashdeal/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function FlashDeal() {
    const { flashdeals, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'FlashDeal',
            href: '/flashdeal'
        }
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('title', 'Title', (item) => <div className="font-medium">{item.title}</div>),
        column('slug', 'Slug', (item) => <div className="font-medium">{item.slug}</div>),
        column('start_date', 'Start Date', (item) => <div className="font-medium">{item.start_date}</div>),
        column('end_date', 'End Date', (item) => <div className="font-medium">{item.end_date}</div>),
        column('image', 'Image', (item) => <div className="font-medium">{item.image}</div>),
        column('status', 'Status', (item) => <div className="font-medium">{item.status}</div>),
        column('actions', 'Actions', (item) => (

            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('flash-deal.show', id)
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'custom',
                        label: 'Get Products',
                        route: (id) => route('flashdeals.getProductsForFlashDeal', id),
                        className: 'text-green-600 focus:text-green-600 dark:text-green-400',
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('flash-deal.edit', id)
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('flash-deal.destroy', id),
                        method: 'delete'
                        // permission: 'quiz.delete'
                    }
                ]}
            />
)),
]
    ;

    return (
        <ListingPage
            title="FlashDeal"
            data={flashdeals}
            filters={filters}
            currentUser={auth.user}
            resourceName="flash-deal"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New FlashDeal"
        />
    );
}
