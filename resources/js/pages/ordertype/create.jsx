import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;

    const fields = [

    ];

    const breadcrumbs = [
        {
            title: 'Create OrderType',
            href: '/ordertype'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create OrderType" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New OrderType"
                        description="Add a new ordertype"
                        initialData={{

                        }}
                        fields={fields}
                        submitUrl="ordertype"
                        submitLabel="Create New OrderType"
                        successMessage="OrderType created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}