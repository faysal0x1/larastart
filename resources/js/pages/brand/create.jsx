import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { auth } = usePage().props;
    const permissionOptions = auth.permissions.map((permission) => ({
        label: permission.name,
        value: permission.name,
    }));

    const fields = [
        {
            name: 'name',
            label: 'Enter Brand Name',
            type: 'text',
            placeholder: 'Enter Brand name',
            required: true,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'richtext',
            placeholder: 'Enter description',
            required: false,
        },
        {
            name: 'bottom_description',
            label: 'Bottom Description',
            type: 'richtext',
            placeholder: 'Enter bottom description',
            required: false,
        },
        {
            name: 'image',
            label: 'Enter Brand Image',
            type: 'image',
            placeholder: 'Enter Brand image',
            required: false,
        },
    ];

    const breadcrumbs = [
        {
            title: 'Create Brand',
            href: '/brand',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Brand" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New Brand"
                        description="Add a new brand"
                        initialData={{
                            name: '',
                            image: '',
                        }}
                        fields={fields}
                        submitUrl="/admin/brand"
                        submitLabel="Create New Brand"
                        successMessage="Brand created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
