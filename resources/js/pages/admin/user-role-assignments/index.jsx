import ActionsDropdown from '@/components/ActionsDropdown';
import ListingPage from '@/components/ListingPage';
import { createActionsColumn, createColumn, createDateColumn, createTagsColumn } from '@/utils/tableUtils';
import { Link, usePage } from '@inertiajs/react';

export default function UserRoleAssignmentsIndex() {
    const { data, filters = {}, auth, roles } = usePage().props;

    const breadcrumbs = [
        {
            title: 'User Role Assignments',
            href: '/user-role-assignments',
        },
    ];

    const columns = [
        createColumn('name', 'Name', (row) => (
            <div className="font-medium">
                <Link href={route('users.show', row.original.id)} className="hover:underline">
                    {row.original.name}
                </Link>
            </div>
        )),
        createColumn('email', 'Email'),
        createTagsColumn('roles', 'Roles', null, {
            getOptions: () => roles.reduce((acc, role) => ({ ...acc, [role.id]: role.name }), {}),
        }),
        createDateColumn('created_at', 'Created'),
        createActionsColumn((row) => (
            <ActionsDropdown
                item={row.original}
                routes={{
                    edit: (id) => route('user-role-assignments.edit', id),
                    delete: (id) => route('user-role-assignments.destroy', id),
                }}
            />
        )),
    ];

    return (
        <ListingPage
            title="User Role Assignments"
            data={data}
            filters={filters}
            currentUser={auth.user}
            resourceName="user-role-assignments"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="Assign Roles"
        />
    );
}
