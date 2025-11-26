import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { productvariation, permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "product_id",
    "label": "Product Id",
    "type": "select",
    "required": false
},
        {
    "name": "name",
    "label": "Name",
    "type": "text",
    "required": true
},
        {
    "name": "sku",
    "label": "Sku",
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
    "name": "stock",
    "label": "Stock",
    "type": "text",
    "required": true
},
        {
    "name": "attributes",
    "label": "Attributes",
    "type": "text",
    "required": true
}
    ];

    const breadcrumbs = [
        {
            title: 'Edit ProductVariation',
            href: '/productvariation',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit ProductVariation" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit ProductVariation"
                        description="Update productvariation information"
                        initialData={productvariation}
                        fields={fields}
                        submitUrl={`productvariation/${productvariation.id}`}
                        submitLabel="Update ProductVariation"
                        successMessage="ProductVariation updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
