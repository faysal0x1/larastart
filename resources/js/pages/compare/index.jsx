// resources/js/Pages/compare/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function Compare() {
    const { compares, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Compare',
            href: '/compare',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('user_id', 'User Id', (item) => <div className="font-medium">{item.user_id}</div>),
        column('product_id', 'Product Id', (item) => <div className="font-medium">{item.product_id}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('compare.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('compare.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('compare.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Compare"
            data={compares}
            filters={filters}
            currentUser={auth.user}
            resourceName="compare"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Compare"
        />
    );
}
