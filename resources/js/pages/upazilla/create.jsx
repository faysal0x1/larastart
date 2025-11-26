import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "ship_district_id",
    "label": "Ship District Id",
    "type": "select",
    "required": false
},
        {
    "name": "upazilla_name",
    "label": "Upazilla Name",
    "type": "text",
    "required": true
}
    ];

    const breadcrumbs = [
        {
            title: 'Create Upazilla',
            href: '/upazilla'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Upazilla" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New Upazilla"
                        description="Add a new upazilla"
                        initialData={{
            ship_district_id: '',
            upazilla_name: ''
                        }}
                        fields={fields}
                        submitUrl="upazilla"
                        submitLabel="Create New Upazilla"
                        successMessage="Upazilla created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}