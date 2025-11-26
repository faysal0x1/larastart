import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth, products } = usePage().props;

    const productOptions = products.map((product) => ({
        label: product.name,
        value: product.id
    }));

    const fields = [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true
        },
        {
            name: 'start_date',
            label: 'Start Date',
            type: 'date',
            required: true
        },
        {
            name: 'end_date',
            label: 'End Date',
            type: 'date',
            required: true
        },
        {
            name: 'image',
            label: 'Image',
            type: 'image',
            required: false
        },
        {
            name: 'discount_type',
            label: 'Discount Type',
            type: 'select',
            options: [
                { value: 'fixed', label: 'Fixed' },
                { value: 'percentage', label: 'Percentage' }
            ],
            required: true
        },
        {
            name: 'discount',
            label: 'Discount',
            type: 'number',
            required: true
        }
    ];

    const breadcrumbs = [
        {
            title: 'Create DealOfTheDay',
            href: '/dealoftheday'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create DealOfTheDay" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New DealOfTheDay"
                        description="Add a new dealoftheday"
                        initialData={{
                            title: '',
                            slug: '',
                            product_id: '',
                            start_date: '',
                            end_date: '',
                            image: '',
                            discount_type: '',
                            discount: '',
                            status: ''
                        }}
                        fields={fields}
                        submitUrl={route('deal-of-the-day.store')}
                        submitLabel="Create New DealOfTheDay"
                        successMessage="DealOfTheDay created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
