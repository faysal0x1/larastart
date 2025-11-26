import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function EditUser() {
    const { user, roleOptions = [] } = usePage().props;

    const breadcrumbs = [
        { title: 'Users', href: '/users' },
        { title: user?.name || 'User', href: `/users/${user?.id}` },
        { title: 'Edit', href: `/users/${user?.id}/edit` },
    ];

    const fields = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Full name',
            required: true,
        },
        {
            name: 'username',
            label: 'Username',
            type: 'text',
            placeholder: 'Unique username',
            required: true,
        },
        {
            name: 'email',
            label: 'Email address',
            type: 'email',
            placeholder: 'user@example.com',
            required: true,
        },
        {
            name: 'phone',
            label: 'Phone',
            type: 'tel',
            placeholder: '+8801XXXXXXXXX',
        },
        {
            name: 'role',
            label: 'Role',
            type: 'select',
            options: roleOptions,
            required: true,
            searchable: true,
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            helpText: 'Leave blank to keep the current password',
        },
        {
            name: 'password_confirmation',
            label: 'Confirm password',
            type: 'password',
        },
        {
            name: 'is_verified',
            label: 'Email verified',
            type: 'switch',
        },
        {
            name: 'is_banned',
            label: 'Banned',
            type: 'switch',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${user?.name ?? 'User'}`} />
            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title={`Edit ${user?.name ?? 'User'}`}
                        description="Update user details"
                        layoutType="two-column"
                        method="put"
                        initialData={{
                            name: user?.name ?? '',
                            username: user?.username ?? '',
                            email: user?.email ?? '',
                            phone: user?.phone ?? '',
                            role: user?.role ?? 'user',
                            password: '',
                            password_confirmation: '',
                            is_verified: !!user?.is_verified,
                            is_banned: !!user?.is_banned,
                        }}
                        fields={fields}
                        submitUrl={`/users/${user?.id}`}
                        submitLabel="Save changes"
                        successMessage="User updated successfully!"
                        cancelUrl={`/users/${user?.id}`}
                    />
                </div>
            </div>
        </AppLayout>
    );
}

