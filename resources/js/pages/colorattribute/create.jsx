import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "name",
    "label": "Name",
    "type": "text",
    "required": true
},
        {
    "name": "code",
    "label": "Code",
    "type": "text",
    "required": true
}
    ];

    const breadcrumbs = [
        {
            title: 'Create ColorAttribute',
            href: '/colorattribute'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create ColorAttribute" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New ColorAttribute"
                        description="Add a new colorattribute"
                        initialData={{
            name: '',
            code: ''
                        }}
                        fields={fields}
                        submitUrl="colorattribute"
                        submitLabel="Create New ColorAttribute"
                        successMessage="ColorAttribute created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}