import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { district, permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "division_id",
    "label": "Division Id",
    "type": "select",
    "required": false
},
        {
    "name": "district_name",
    "label": "District Name",
    "type": "text",
    "required": true
}
    ];

    const breadcrumbs = [
        {
            title: 'Edit District',
            href: '/district',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit District" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit District"
                        description="Update district information"
                        initialData={district}
                        fields={fields}
                        submitUrl={`district/${district.id}`}
                        submitLabel="Update District"
                        successMessage="District updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
