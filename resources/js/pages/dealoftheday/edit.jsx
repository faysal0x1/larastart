import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { dealoftheday, permissions, auth } = usePage().props;

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
    "name": "product_id",
    "label": "Product Id",
    "type": "select",
    "required": false
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
    "name": "discount_type",
    "label": "Discount Type",
    "type": "text",
    "required": true
},
        {
    "name": "discount",
    "label": "Discount",
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
            title: 'Edit DealOfTheDay',
            href: '/dealoftheday',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit DealOfTheDay" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit DealOfTheDay"
                        description="Update dealoftheday information"
                        initialData={dealoftheday}
                        fields={fields}
                        submitUrl={`dealoftheday/${dealoftheday.id}`}
                        submitLabel="Update DealOfTheDay"
                        successMessage="DealOfTheDay updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
