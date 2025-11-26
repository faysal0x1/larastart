import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;

    const fields = [
        {
            name: 'user_id',
            label: 'User Id',
            type: 'select',
            required: false,
        },
        {
            name: 'product_id',
            label: 'Product Id',
            type: 'select',
            required: false,
        },
        {
            name: 'qty',
            label: 'Qty',
            type: 'text',
            required: true,
        },
        {
            name: 'price',
            label: 'Price',
            type: 'text',
            required: true,
        },
        {
            name: 'color',
            label: 'Color',
            type: 'text',
            required: true,
        },
        {
            name: 'size',
            label: 'Size',
            type: 'text',
            required: true,
        },
        {
            name: 'cartTotal',
            label: 'Carttotal',
            type: 'text',
            required: true,
        },
    ];

    const breadcrumbs = [
        {
            title: 'Create Wishlist',
            href: '/wishlist',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Wishlist" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New Wishlist"
                        description="Add a new wishlist"
                        initialData={{
                            user_id: '',
                            product_id: '',
                            qty: '',
                            price: '',
                            color: '',
                            size: '',
                            cartTotal: '',
                        }}
                        fields={fields}
                        submitUrl="wishlist"
                        submitLabel="Create New Wishlist"
                        successMessage="Wishlist created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
