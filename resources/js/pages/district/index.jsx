// resources/js/Pages/district/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function District() {
    const { districts, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'District',
            href: '/district',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('division_id', 'Division Id', (item) => <div className="font-medium">{item.division_id}</div>),
        column('district_name', 'District Name', (item) => <div className="font-medium">{item.district_name}</div>),

        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('district.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('district.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('district.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="District"
            data={districts}
            filters={filters}
            currentUser={auth.user}
            resourceName="district"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New District"
        />
    );
}
