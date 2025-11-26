// resources/js/Pages/conversation/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function Conversation() {
    const { conversations, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Conversation',
            href: '/conversation',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('title', 'Title', (item) => <div className="font-medium">{item.title}</div>),
        column('is_group', 'Is Group', (item) => <div className="font-medium">{item.is_group}</div>),
        column('creator_id', 'Creator Id', (item) => <div className="font-medium">{item.creator_id}</div>),

        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('conversation.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('conversation.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('conversation.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Conversation"
            data={conversations}
            filters={filters}
            currentUser={auth.user}
            resourceName="conversation"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Conversation"
        />
    );
}
