import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function AddProducts() {
    const { flashdeal, products } = usePage().props;

    // Map products to options format for multiselect field
    const productOptions = products.map((product) => ({
        label: product.name,
        value: product.id.toString() // Convert to string to ensure compatibility with GlobalForm
    }));

    // Get the currently selected product IDs from the flashdeal relation
    const selectedProductIds = flashdeal.flash_deal_products
        ? flashdeal.flash_deal_products.map(fdp => fdp.product_id.toString())
        : [];

    // Form fields configuration
    const fields = [
        {
            name: "product_ids",
            label: "Select Products",
            type: "multiselect",
            placeholder: "Select Products",
            options: productOptions,
            required: true,
            helpText: "Choose products to include in this flash deal"
        }
    ];

    const breadcrumbs = [
        {
            title: 'Flash Deals',
            href: '/admin/flashdeals'
        },
        {
            title: `Add Products to ${flashdeal.title}`,
            href: `/admin/flashdeals/${flashdeal.id}/products`
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Add Products to ${flashdeal.title}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title={`Add Products to Flash Deal: ${flashdeal.title}`}
                        description="Select products to include in this flash deal"
                        initialData={{ product_ids: selectedProductIds }}
                        fields={fields}
                        submitUrl={`/admin/flashdeals/${flashdeal.id}/products`}
                        submitLabel="Save Products"
                        cancelUrl="/admin/flashdeals"
                        successMessage="Products added to flash deal successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}