// resources/js/Pages/tag/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function Tag() {
    const { tags, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Tag',
            href: '/tag',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('name', 'Name', (item) => <div className="font-medium">{item.name}</div>),
        column('slug', 'Slug', (item) => <div className="font-medium">{item.slug}</div>),
        column('status', 'Status', (item) => <div className="font-medium">{item.status}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('tag.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('tag.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('tag.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Tag"
            data={tags}
            filters={filters}
            currentUser={auth.user}
            resourceName="tag"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Tag"
        />
    );
}
