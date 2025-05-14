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
            label: 'Name',
            type: 'text',
            placeholder: 'Enter Permission name',
            required: true,
        },
    ];
    const breadcrumbs = [
        {
            title: 'Create Permission',
            href: '/permissions',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New Permissions"
                        description="Add a new Permissions"
                        initialData={{
                            name: '',
                            description: '',
                            icon: '',
                            display_order: 0,
                            status: true,
                        }}
                        fields={fields}
                        submitUrl="/permissions"
                        submitLabel="Create New Permissions"
                        successMessage="Permissions created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
