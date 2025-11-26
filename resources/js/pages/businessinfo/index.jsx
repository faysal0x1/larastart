// resources/js/Pages/businessinfo/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function BusinessInfo() {
    const { businessinfos, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'BusinessInfo',
            href: '/businessinfo',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('content', 'Content', (item) => <div className="font-medium">{item.content}</div>),
        column('type', 'Type', (item) => <div className="font-medium">{item.type}</div>),

        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('businessinfo.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('businessinfo.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('businessinfo.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="BusinessInfo"
            data={businessinfos}
            filters={filters}
            currentUser={auth.user}
            resourceName="businessinfo"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New BusinessInfo"
        />
    );
}
