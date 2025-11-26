import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { upazilla, permissions, auth } = usePage().props;

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
            title: 'Edit Upazilla',
            href: '/upazilla',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Upazilla" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit Upazilla"
                        description="Update upazilla information"
                        initialData={upazilla}
                        fields={fields}
                        submitUrl={`upazilla/${upazilla.id}`}
                        submitLabel="Update Upazilla"
                        successMessage="Upazilla updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
