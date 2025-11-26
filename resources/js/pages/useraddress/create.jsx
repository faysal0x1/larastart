import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "user_id",
    "label": "User Id",
    "type": "select",
    "required": false
},
        {
    "name": "first_name",
    "label": "First Name",
    "type": "text",
    "required": true
},
        {
    "name": "last_name",
    "label": "Last Name",
    "type": "text",
    "required": true
},
        {
    "name": "post_code",
    "label": "Post Code",
    "type": "text",
    "required": true
},
        {
    "name": "division_id",
    "label": "Division Id",
    "type": "select",
    "required": false
},
        {
    "name": "district_id",
    "label": "District Id",
    "type": "select",
    "required": false
},
        {
    "name": "upazilla_id",
    "label": "Upazilla Id",
    "type": "select",
    "required": false
},
        {
    "name": "address",
    "label": "Address",
    "type": "textarea",
    "required": true
}
    ];

    const breadcrumbs = [
        {
            title: 'Create UserAddress',
            href: '/useraddress'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create UserAddress" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New UserAddress"
                        description="Add a new useraddress"
                        initialData={{
            user_id: '',
            first_name: '',
            last_name: '',
            post_code: '',
            division_id: '',
            district_id: '',
            upazilla_id: '',
            address: ''
                        }}
                        fields={fields}
                        submitUrl="useraddress"
                        submitLabel="Create New UserAddress"
                        successMessage="UserAddress created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}