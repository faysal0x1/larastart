import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, Link, usePage } from '@inertiajs/react';

export default function ShowUser() {
    const { user, assignedRoles = [] } = usePage().props;

    if (!user) {
        return null;
    }

    const breadcrumbs = [
        { title: 'Users', href: '/users' },
        { title: user.name, href: `/users/${user.id}` },
    ];

    const details = [
        { label: 'Username', value: user.username },
        { label: 'Email', value: user.email },
        { label: 'Phone', value: user.phone || '—' },
        { label: 'Role', value: user.role },
        { label: 'Verified', value: user.is_verified ? 'Yes' : 'No' },
        { label: 'Banned', value: user.is_banned ? 'Yes' : 'No' },
        {
            label: 'Created at',
            value: user.created_at ? new Date(user.created_at).toLocaleString() : '—',
        },
        {
            label: 'Last updated',
            value: user.updated_at ? new Date(user.updated_at).toLocaleString() : '—',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User • ${user.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-5xl space-y-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-500">User profile</p>
                            <h1 className="text-2xl font-semibold text-gray-900">{user.name}</h1>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Link href={route('users.edit', user.id)}>
                                <Button variant="default">Edit</Button>
                            </Link>
                            <Link href={route('users.index')}>
                                <Button variant="outline">Back to list</Button>
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account details</h2>
                        <div className="mt-6 grid gap-6 sm:grid-cols-2">
                            {details.map((detail) => (
                                <div key={detail.label}>
                                    <p className="text-sm font-medium text-gray-500">{detail.label}</p>
                                    <p className="mt-1 text-base text-gray-900 dark:text-white">{detail.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <p className="text-sm font-medium text-gray-500">Assigned roles</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {assignedRoles.length > 0 ? (
                                    assignedRoles.map((role) => (
                                        <Badge key={role} variant="secondary">
                                            {role}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-500">No roles assigned</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

