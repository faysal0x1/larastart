import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { division, permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "name",
    "label": "Name",
    "type": "text",
    "required": true
}
    ];

    const breadcrumbs = [
        {
            title: 'Edit Division',
            href: '/division',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Division" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit Division"
                        description="Update division information"
                        initialData={division}
                        fields={fields}
                        submitUrl={`division/${division.id}`}
                        submitLabel="Update Division"
                        successMessage="Division updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
