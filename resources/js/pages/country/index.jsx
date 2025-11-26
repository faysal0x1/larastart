// resources/js/Pages/posts/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn, createToggleColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function Country() {
    const { country, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Country',
            href: '/country',
        },
    ];

    // Define custom actions renderer
    const columns = [
        createSerialColumn('Serial'),

        column('name', 'Name', (item) => <div className="font-medium">{item.name}</div>),
        column('code', 'Code', (item) => <div className="font-medium">{item.code}</div>),

        createToggleColumn('status', 'Status', 'status.update', {
            confirmMessage: 'Are you sure you want to change the status for this user?',
            successMessage: 'status updated successfully',
            errorMessage: 'Failed to update user ban status',
            modelType: 'country',
        }),

        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('country.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('country.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('country.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Country"
            data={country}
            filters={filters}
            currentUser={auth.user}
            resourceName="country"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Country"
        />
    );
}
