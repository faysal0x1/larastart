import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function Edit() {
    const { user, roles, auth } = usePage().props;

    // Create role options array
    const roleOptions = roles.map((role) => ({
        label: role.name,
        value: role.name, // Using name as value to match your permission example
    }));

    // Get currently assigned roles
    const selectedRoles = Array.isArray(user.roles) ? user.roles.map((role) => role.name) : [];

    const fields = [
        {
            name: 'role_names', // Changed from role_ids to role_names to match value type
            label: 'Roles',
            type: 'multiselect',
            options: roleOptions,
            required: true,
        },
    ];

    const breadcrumbs = [
        {
            title: 'User Role Assignments',
            href: '/user-role-assignments',
        },
        {
            title: `Edit Roles for ${user.name}`,
            href: `/user-role-assignments/${user.id}/edit`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Roles for ${user.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title={`Edit Roles for ${user.name}`}
                        description="Update roles assigned to this user"
                        initialData={{
                            role_names: selectedRoles,
                        }}
                        fields={fields}
                        submitUrl={`/user-role-assignments/${user.id}`}
                        method="put"
                        submitLabel="Update Roles"
                        cancelUrl="/user-role-assignments"
                        successMessage="Roles updated successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}