import ActionsDropdown from '@/components/ActionsDropdown';
import ListingPage from '@/components/ListingPage';
import { column, createActionsColumn, createColumn, createDateColumn, createTagsColumn } from '@/utils/tableUtils';
import { Link, usePage } from '@inertiajs/react';

export default function PermissionsIndex() {
    const { data, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'permissions',
            href: '/permissions',
        },
    ];

    // Define custom actions renderer

    const columns = [
        createColumn('name', 'Name', (row) => (
            <div className="font-medium">
                <Link href={route('permissions.show', row.original.id)} className="hover:underline">
                    {row.original.name}
                </Link>
            </div>
        )),

        createDateColumn('created_at', 'Created'),


        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('permissions.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('permissions.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('permissions.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Permissions"
            data={data}
            filters={filters}
            currentUser={auth.user}
            resourceName="permissions"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Permissions"
        />
    );
}
