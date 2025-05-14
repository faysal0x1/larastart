import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;
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
            title: 'Create Blog',
            href: '/blog'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Blog" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New Blog"
                        description="Add a new blog"
                        initialData={{
                            title: ''
                        }}
                        fields={fields}
                        submitUrl="blogs"
                        submitLabel="Create New Blog"
                        successMessage="Blog created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}