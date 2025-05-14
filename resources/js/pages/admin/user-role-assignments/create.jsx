import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function Create() {
    const { users, roles, auth } = usePage().props;

    const userOptions = users.map((user) => ({
        label: `${user.name} (${user.email})`,
        value: user.id,
    }));

    const roleOptions = roles.map((role) => ({
        label: role.name,
        value: role.id,
    }));

    const fields = [
        {
            name: 'user_id',
            label: 'User',
            type: 'select',
            options: userOptions,
            required: true,
        },
        {
            name: 'role_ids',
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
            title: 'Assign Roles',
            href: '/user-role-assignments/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Assign Roles to User" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Assign Roles to User"
                        description="Select a user and assign one or more roles"
                        initialData={{
                            user_id: '',
                            role_ids: [],
                        }}
                        fields={fields}
                        submitUrl="/user-role-assignments"
                        submitLabel="Assign Roles"
                        successMessage="Roles assigned successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}