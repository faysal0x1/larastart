import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;

    const fields = [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
        },
        {
            name: 'start_date',
            label: 'Start Date',
            type: 'date',
            required: true,
        },
        {
            name: 'end_date',
            label: 'End Date',
            type: 'date',
            required: true,
        },
        {
            name: 'image',
            label: 'Image',
            type: 'image',
            required: false,
        },
    ];

    const breadcrumbs = [
        {
            title: 'Create FlashDeal',
            href: '/flashdeal',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create FlashDeal" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New FlashDeal"
                        description="Add a new flashdeal"
                        initialData={{
                            title: '',
                            slug: '',
                            start_date: '',
                            end_date: '',
                            image: '',
                            status: '',
                        }}
                        fields={fields}
                        submitUrl={route('flash-deal.store')}
                        submitLabel="Create New FlashDeal"
                        successMessage="FlashDeal created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
