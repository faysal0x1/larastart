// resources/js/Pages/useraddress/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function UserAddress() {
    const { useraddresss, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'UserAddress',
            href: '/useraddress',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('user_id', 'User Id', (item) => <div className="font-medium">{item.user_id}</div>),
        column('first_name', 'First Name', (item) => <div className="font-medium">{item.first_name}</div>),
        column('last_name', 'Last Name', (item) => <div className="font-medium">{item.last_name}</div>),
        column('post_code', 'Post Code', (item) => <div className="font-medium">{item.post_code}</div>),
        column('division_id', 'Division Id', (item) => <div className="font-medium">{item.division_id}</div>),
        column('district_id', 'District Id', (item) => <div className="font-medium">{item.district_id}</div>),
        column('upazilla_id', 'Upazilla Id', (item) => <div className="font-medium">{item.upazilla_id}</div>),
        column('address', 'Address', (item) => <div className="font-medium">{item.address}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('user-address.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('user-address.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('user-address.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="UserAddress"
            data={useraddresss}
            filters={filters}
            currentUser={auth.user}
            resourceName="user-address"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New UserAddress"
        />
    );
}
