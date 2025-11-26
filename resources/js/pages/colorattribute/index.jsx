// resources/js/Pages/colorattribute/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function ColorAttribute() {
    const { colorattributes, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'ColorAttribute',
            href: '/colorattribute',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('name', 'Name', (item) => <div className="font-medium">{item.name}</div>),
        column('code', 'Code', (item) => <div className="font-medium">{item.code}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('color-attribute.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('color-attribute.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('color-attribute.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="ColorAttribute"
            data={colorattributes}
            filters={filters}
            currentUser={auth.user}
            resourceName="color-attribute"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New ColorAttribute"
        />
    );
}
