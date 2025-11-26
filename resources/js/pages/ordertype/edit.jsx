import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { ordertype, permissions, auth } = usePage().props;

    const fields = [

    ];

    const breadcrumbs = [
        {
            title: 'Edit OrderType',
            href: '/ordertype',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit OrderType" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit OrderType"
                        description="Update ordertype information"
                        initialData={ordertype}
                        fields={fields}
                        submitUrl={`ordertype/${ordertype.id}`}
                        submitLabel="Update OrderType"
                        successMessage="OrderType updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
