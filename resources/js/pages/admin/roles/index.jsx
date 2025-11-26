import ActionsDropdown from '@/components/ActionsDropdown';
import ListingPage from '@/components/ListingPage';
import { column, createActionsColumn, createColumn, createDateColumn, createTagsColumn } from '@/utils/tableUtils';
import { Link, usePage } from '@inertiajs/react';

export default function RolesIndex() {
    const { data, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'roles',
            href: '/roles',
        },
    ];

    // Define custom actions renderer

    const columns = [
        createColumn('name', 'Name', (row) => (
            <div className="font-medium">
                <Link href={route('roles.show', row.original.id)} className="hover:underline">
                    {row.original.name}
                </Link>
            </div>
        )),

        createTagsColumn('permissions', 'Permissions'),


        createDateColumn('created_at', 'Created'),

        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('roles.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('roles.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('roles.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Roles"
            data={data}
            filters={filters}
            currentUser={auth.user}
            resourceName="roles"
            breadcrumbs={breadcrumbs}
            columns={columns} // Pass columns as a prop
            createButtonText="New Role"
        />
    );
}
