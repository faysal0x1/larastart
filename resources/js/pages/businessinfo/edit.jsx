import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { businessinfo, permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "content",
    "label": "Content",
    "type": "text",
    "required": true
},
        {
    "name": "type",
    "label": "Type",
    "type": "text",
    "required": true
}
    ];

    const breadcrumbs = [
        {
            title: 'Edit BusinessInfo',
            href: '/businessinfo',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit BusinessInfo" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit BusinessInfo"
                        description="Update businessinfo information"
                        initialData={businessinfo}
                        fields={fields}
                        submitUrl={`businessinfo/${businessinfo.id}`}
                        submitLabel="Update BusinessInfo"
                        successMessage="BusinessInfo updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
