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
    "name": "product_id",
    "label": "Product Id",
    "type": "select",
    "required": false
}
    ];

    const breadcrumbs = [
        {
            title: 'Create Compare',
            href: '/compare'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Compare" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New Compare"
                        description="Add a new compare"
                        initialData={{
            user_id: '',
            product_id: ''
                        }}
                        fields={fields}
                        submitUrl="compare"
                        submitLabel="Create New Compare"
                        successMessage="Compare created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}