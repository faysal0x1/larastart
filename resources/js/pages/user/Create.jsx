import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function CreateUser() {
    const { roleOptions = [], defaultRole = 'user' } = usePage().props;

    const breadcrumbs = [
        { title: 'Users', href: '/users' },
        { title: 'Create', href: '/users/create' },
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
            required: true,
            placeholder: 'Minimum 8 characters',
        },
        {
            name: 'password_confirmation',
            label: 'Confirm password',
            type: 'password',
            required: true,
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
            <Head title="Create User" />
            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create User"
                        description="Add a new platform user"
                        layoutType="two-column"
                        initialData={{
                            name: '',
                            username: '',
                            email: '',
                            phone: '',
                            role: defaultRole,
                            password: '',
                            password_confirmation: '',
                            is_verified: false,
                            is_banned: false,
                        }}
                        fields={fields}
                        submitUrl="/users"
                        submitLabel="Create User"
                        successMessage="User created successfully!"
                        cancelUrl="/users"
                    />
                </div>
            </div>
        </AppLayout>
    );
}

