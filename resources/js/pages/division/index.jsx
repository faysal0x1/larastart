// resources/js/Pages/division/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function Division() {
    const { divisions, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Division',
            href: '/division',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('name', 'Name', (item) => <div className="font-medium">{item.name}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('division.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('division.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('division.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Division"
            data={divisions}
            filters={filters}
            currentUser={auth.user}
            resourceName="division"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Division"
        />
    );
}
