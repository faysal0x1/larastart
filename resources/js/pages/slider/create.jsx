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
    "name": "short_title",
    "label": "Short Title",
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
            title: 'Create Slider',
            href: '/slider'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Slider" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New Slider"
                        description="Add a new slider"
                        initialData={{
            title: '',
            short_title: '',
            image: '',
            status: ''
                        }}
                        fields={fields}
                        submitUrl="slider"
                        submitLabel="Create New Slider"
                        successMessage="Slider created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}