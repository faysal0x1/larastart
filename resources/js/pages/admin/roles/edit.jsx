import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function Edit() {
    const { role, permissions, auth } = usePage().props;

    // Create permission options array
    const permissionOptions = permissions.map((permission) => ({
        label: permission.name,
        value: permission.name,
    }));

    const selectedPermissions = Array.isArray(role.permissions)
        ? role.permissions.map(permission => permission.name)
        : [];

    const fields = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Enter Role name',
            required: true,
        },
        {
            name: 'permissions',
            label: 'Permissions',
            type: 'multiselect',
            options: permissionOptions,
            required: true,
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
                        title="Edit Role"
                        description="Update role details"
                        initialData={{
                            name: role.name,
                            description: role.description || '',
                            permissions: selectedPermissions, // Pass the array of permission names
                            icon: role.icon || '',
                            display_order: role.display_order || 0,
                            status: role.status,
                        }}
                        fields={fields}
                        submitUrl={`/roles/${role.id}`}
                        method="put"
                        submitLabel="Update Role"
                        cancelUrl="/roles"
                        successMessage="Role updated successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}