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
    "name": "sub_title",
    "label": "Sub Title",
    "type": "text",
    "required": true
},
        {
    "name": "url",
    "label": "Url",
    "type": "text",
    "required": true
},
        {
    "name": "image",
    "label": "Image",
    "type": "file",
    "required": false
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
            title: 'Create Banner',
            href: '/banner'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Banner" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New Banner"
                        description="Add a new banner"
                        initialData={{
            title: '',
            sub_title: '',
            url: '',
            image: '',
            status: ''
                        }}
                        fields={fields}
                        submitUrl="banner"
                        submitLabel="Create New Banner"
                        successMessage="Banner created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}