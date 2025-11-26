import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { useraddress, permissions, auth } = usePage().props;

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
            title: 'Edit UserAddress',
            href: '/useraddress',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit UserAddress" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit UserAddress"
                        description="Update useraddress information"
                        initialData={useraddress}
                        fields={fields}
                        submitUrl={`useraddress/${useraddress.id}`}
                        submitLabel="Update UserAddress"
                        successMessage="UserAddress updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
