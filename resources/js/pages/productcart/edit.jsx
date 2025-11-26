import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { productcart, permissions, auth } = usePage().props;

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
},
        {
    "name": "qty",
    "label": "Qty",
    "type": "text",
    "required": true
},
        {
    "name": "price",
    "label": "Price",
    "type": "text",
    "required": true
},
        {
    "name": "color",
    "label": "Color",
    "type": "text",
    "required": true
},
        {
    "name": "size",
    "label": "Size",
    "type": "text",
    "required": true
},
        {
    "name": "variation",
    "label": "Variation",
    "type": "text",
    "required": true
},
        {
    "name": "cartTotal",
    "label": "Carttotal",
    "type": "text",
    "required": true
}
    ];

    const breadcrumbs = [
        {
            title: 'Edit ProductCart',
            href: '/productcart',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit ProductCart" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit ProductCart"
                        description="Update productcart information"
                        initialData={productcart}
                        fields={fields}
                        submitUrl={`productcart/${productcart.id}`}
                        submitLabel="Update ProductCart"
                        successMessage="ProductCart updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
