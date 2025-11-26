import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth, products } = usePage().props;

    const productOptions = products.map((product) => ({
        label: product.name,
        value: product.id,
    }));

    const fields = [
        {
            name: 'product_id',
            label: 'Product Id',
            type: 'select',
            options: productOptions,
            required: false,
        },
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
        },
        {
            name: 'sku',
            label: 'Sku',
            type: 'text',
            required: true,
        },
        {
            name: 'price',
            label: 'Price',
            type: 'number',
            required: true,
        },
        {
            name: 'stock',
            label: 'Stock',
            type: 'number',
            required: true,
        },
        {
            name: 'attributes',
            label: 'Attributes',
            type: 'text',
            required: true,
        },
    ];

    const breadcrumbs = [
        {
            title: 'Create ProductVariation',
            href: '/productvariation',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create ProductVariation" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New ProductVariation"
                        description="Add a new productvariation"
                        initialData={{
                            product_id: '',
                            name: '',
                            sku: '',
                            price: '',
                            stock: '',
                            attributes: '',
                        }}
                        fields={fields}
                        submitUrl={route('product-variation.store')}
                        submitLabel="Create New ProductVariation"
                        successMessage="ProductVariation created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
