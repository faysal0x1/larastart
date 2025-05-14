import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { blog, permissions, auth } = usePage().props;
    const permissionOptions = permissions.map((permission) => ({
        label: permission.name,
        value: permission.name
    }));
    
    const fields = [
        {
                "name": "title",
                "label": "Title",
                "type": "text",
                "placeholder": "Enter Blog title",
                "required": true
        }
];
    
    const breadcrumbs = [
        {
            title: 'Edit Blog',
            href: '/blog',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Blog" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit Blog"
                        description="Update blog information"
                        initialData={blog}
                        fields={fields}
                        submitUrl={`blogs/${blog.id}`}
                        submitLabel="Update Blog"
                        successMessage="Blog updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}