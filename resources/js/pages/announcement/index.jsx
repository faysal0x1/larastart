// resources/js/Pages/announcement/index.jsx
import ActionsDropdown from '@/components/ActionsDropdown';
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';

export default function Announcement() {
    const { announcements, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Announcement',
            href: '/announcement',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('title', 'Title', (item) => <div className="font-medium">{item.title}</div>),
        column('status', 'Status', (item) => <div className="font-medium">{item.status}</div>),

        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('announcement.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('announcement.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('announcement.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Announcement"
            data={announcements}
            filters={filters}
            currentUser={auth.user}
            resourceName="announcement"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Announcement"
        />
    );
}
