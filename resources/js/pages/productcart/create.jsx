import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;

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
            title: 'Create ProductCart',
            href: '/productcart'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create ProductCart" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New ProductCart"
                        description="Add a new productcart"
                        initialData={{
            user_id: '',
            product_id: '',
            qty: '',
            price: '',
            color: '',
            size: '',
            variation: '',
            cartTotal: ''
                        }}
                        fields={fields}
                        submitUrl="productcart"
                        submitLabel="Create New ProductCart"
                        successMessage="ProductCart created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}