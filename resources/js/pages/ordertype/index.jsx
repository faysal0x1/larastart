// resources/js/Pages/ordertype/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function OrderType() {
    const { ordertypes, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'OrderType',
            href: '/ordertype',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),

        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('order-type.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('order-type.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('order-type.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="OrderType"
            data={ordertypes}
            filters={filters}
            currentUser={auth.user}
            resourceName="ordertype"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New OrderType"
        />
    );
}
