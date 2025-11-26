// resources/js/Pages/upazilla/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function Upazilla() {
    const { upazillas, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Upazilla',
            href: '/upazilla',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('ship_district_id', 'Ship District Id', (item) => <div className="font-medium">{item.ship_district_id}</div>),
        column('upazilla_name', 'Upazilla Name', (item) => <div className="font-medium">{item.upazilla_name}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('upazilla.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('upazilla.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('upazilla.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Upazilla"
            data={upazillas}
            filters={filters}
            currentUser={auth.user}
            resourceName="upazilla"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Upazilla"
        />
    );
}
