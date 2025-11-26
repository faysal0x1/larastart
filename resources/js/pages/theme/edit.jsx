import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { theme, permissions, auth } = usePage().props;

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
    "name": "settings",
    "label": "Settings",
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
            title: 'Edit Theme',
            href: '/theme',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Theme" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit Theme"
                        description="Update theme information"
                        initialData={theme}
                        fields={fields}
                        submitUrl={`theme/${theme.id}`}
                        submitLabel="Update Theme"
                        successMessage="Theme updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
