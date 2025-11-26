import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "content",
    "label": "Content",
    "type": "text",
    "required": true
},
        {
    "name": "type",
    "label": "Type",
    "type": "text",
    "required": true
}
    ];

    const breadcrumbs = [
        {
            title: 'Create BusinessInfo',
            href: '/businessinfo'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create BusinessInfo" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New BusinessInfo"
                        description="Add a new businessinfo"
                        initialData={{
            content: '',
            type: ''
                        }}
                        fields={fields}
                        submitUrl="businessinfo"
                        submitLabel="Create New BusinessInfo"
                        successMessage="BusinessInfo created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}