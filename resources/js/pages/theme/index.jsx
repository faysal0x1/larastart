// resources/js/Pages/theme/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function Theme() {
    const { themes, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Theme',
            href: '/theme',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('name', 'Name', (item) => <div className="font-medium">{item.name}</div>),
        column('slug', 'Slug', (item) => <div className="font-medium">{item.slug}</div>),
        column('description', 'Description', (item) => <div className="font-medium">{item.description}</div>),
        column('settings', 'Settings', (item) => <div className="font-medium">{item.settings}</div>),
        column('is_active', 'Is Active', (item) => <div className="font-medium">{item.is_active}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('theme.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('theme.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('theme.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Theme"
            data={themes}
            filters={filters}
            currentUser={auth.user}
            resourceName="theme"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Theme"
        />
    );
}
