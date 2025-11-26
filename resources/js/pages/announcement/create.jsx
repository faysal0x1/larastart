import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "title",
    "label": "Title",
    "type": "text",
    "required": true
},
        {
    "name": "status",
    "label": "Status",
    "type": "select",
    "required": false
}
    ];

    const breadcrumbs = [
        {
            title: 'Create Announcement',
            href: '/announcement'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Announcement" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New Announcement"
                        description="Add a new announcement"
                        initialData={{
            title: '',
            status: ''
                        }}
                        fields={fields}
                        submitUrl="announcement"
                        submitLabel="Create New Announcement"
                        successMessage="Announcement created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}