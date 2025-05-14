import ActionsDropdown from '@/components/ActionsDropdown';
import ListingPage from '@/components/ListingPage';
import { createActionsColumn, createColumn, createDateColumn, createTagsColumn } from '@/utils/tableUtils';
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
        createActionsColumn((row) => (
            <ActionsDropdown
                item={row.original}
                routes={{
                    view: (id) => route('permissions.show', id),
                    edit: (id) => route('permissions.edit', id),
                    delete: (id) => route('permissions.destroy', id),
                }}
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
