import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { slider, permissions, auth } = usePage().props;

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
            title: 'Edit Slider',
            href: '/slider',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Slider" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit Slider"
                        description="Update slider information"
                        initialData={slider}
                        fields={fields}
                        submitUrl={`slider/${slider.id}`}
                        submitLabel="Update Slider"
                        successMessage="Slider updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
