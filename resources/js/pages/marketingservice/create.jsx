import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "name",
    "label": "Name",
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
    "name": "description",
    "label": "Description",
    "type": "text",
    "required": true
},
        {
    "name": "is_active",
    "label": "Is Active",
    "type": "text",
    "required": true
}
    ];

    const breadcrumbs = [
        {
            title: 'Create MarketingService',
            href: '/marketingservice'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create MarketingService" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New MarketingService"
                        description="Add a new marketingservice"
                        initialData={{
            name: '',
            slug: '',
            description: '',
            is_active: ''
                        }}
                        fields={fields}
                        submitUrl="marketingservice"
                        submitLabel="Create New MarketingService"
                        successMessage="MarketingService created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}