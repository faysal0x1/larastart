// resources/js/Pages/posts/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { Link, usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown.jsx';

export default function Users() {
    const { users, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Users',
            href: '/users',
        },
    ];

    // Define custom actions renderer
    const columns = [
        createSerialColumn('Serial'),
        column('name', 'Name', (item) => (
            <div className="font-medium">
                <Link href={route('posts.show', item.id)} className="hover:underline">
                    {item.name}
                </Link>
            </div>
        )),

        column('username', 'Username', (item) => <div className="font-medium">{item.username}</div>),

        column('email', 'Email'),
        column('role', 'Role'),

        column('created_at', 'Created', (item) => <span>{new Date(item.created_at).toLocaleDateString()}</span>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                routes={{
                    view: (id) => route('users.show', id),
                    edit: (id) => route('users.edit', id),
                    delete: (id) => route('users.destroy', id),
                }}
                permissions={{
                    view: 'view users',
                    edit: 'edit_users',
                    delete: 'delete users',
                }}
            />
        )),
    ];

    return (
        <ListingPage
            title="Users"
            data={users}
            filters={filters}
            currentUser={auth.user}
            resourceName="users"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Users"
            createPermission="create_users"
        />
    );
}
