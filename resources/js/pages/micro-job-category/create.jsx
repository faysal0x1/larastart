import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head } from '@inertiajs/react';

export default function create() {
    const fields = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Enter category name',
            required: true,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Provide a description',
            rows: 3,
            required: true,
        },

        {
            name: "icon",
            label: "Icon",
            type: "iconPicker",
            required: true,
        },
        {
            name: 'display_order',
            label: 'Display Order',
            type: 'number',
            min: 0,
            default: 0,
        },
        {
            name: 'status',
            label: 'Active',
            type: 'switch',
            default: true,
        },
    ];
    const breadcrumbs = [
        {
            title: 'Appearance settings',
            href: '/settings/appearance',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create Micro Task Category"
                        description="Add a new category for micro tasks"
                        initialData={{
                            name: '',
                            description: '',
                            icon: '',
                            display_order: 0,
                            status: true,
                        }}
                        fields={fields}
                        submitUrl="/micro-task-categories"
                        submitLabel="Create Category"
                        successMessage="Category created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
