import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { compare, permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "user_id",
    "label": "User Id",
    "type": "select",
    "required": false
},
        {
    "name": "product_id",
    "label": "Product Id",
    "type": "select",
    "required": false
}
    ];

    const breadcrumbs = [
        {
            title: 'Edit Compare',
            href: '/compare',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Compare" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit Compare"
                        description="Update compare information"
                        initialData={compare}
                        fields={fields}
                        submitUrl={`compare/${compare.id}`}
                        submitLabel="Update Compare"
                        successMessage="Compare updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
