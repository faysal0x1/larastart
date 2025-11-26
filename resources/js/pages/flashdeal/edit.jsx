import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { flashdeal, permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "title",
    "label": "Title",
    "type": "text",
    "required": true
},
        {
    "name": "slug",
    "label": "Slug",
    "type": "text",
    "required": true
},
        {
    "name": "start_date",
    "label": "Start Date",
    "type": "date",
    "required": true
},
        {
    "name": "end_date",
    "label": "End Date",
    "type": "date",
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
            title: 'Edit FlashDeal',
            href: '/flashdeal',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit FlashDeal" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit FlashDeal"
                        description="Update flashdeal information"
                        initialData={flashdeal}
                        fields={fields}
                        submitUrl={`flashdeal/${flashdeal.id}`}
                        submitLabel="Update FlashDeal"
                        successMessage="FlashDeal updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
