import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { coupon, permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "type",
    "label": "Type",
    "type": "text",
    "required": true
},
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
    "name": "code",
    "label": "Code",
    "type": "text",
    "required": true
},
        {
    "name": "coupon_for",
    "label": "Coupon For",
    "type": "text",
    "required": true
},
        {
    "name": "limit",
    "label": "Limit",
    "type": "text",
    "required": true
},
        {
    "name": "user_limit",
    "label": "User Limit",
    "type": "text",
    "required": true
},
        {
    "name": "coupon_used",
    "label": "Coupon Used",
    "type": "text",
    "required": true
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
    "name": "max_discount",
    "label": "Max Discount",
    "type": "text",
    "required": true
},
        {
    "name": "minimum_purchase",
    "label": "Minimum Purchase",
    "type": "text",
    "required": true
},
        {
    "name": "start_at",
    "label": "Start At",
    "type": "text",
    "required": true
},
        {
    "name": "end_at",
    "label": "End At",
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
            title: 'Edit Coupon',
            href: '/coupon',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Coupon" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit Coupon"
                        description="Update coupon information"
                        initialData={coupon}
                        fields={fields}
                        submitUrl={`coupon/${coupon.id}`}
                        submitLabel="Update Coupon"
                        successMessage="Coupon updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
