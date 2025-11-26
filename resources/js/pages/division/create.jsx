import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;

    const fields = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
        },
    ];

    const breadcrumbs = [
        {
            title: 'Create Division',
            href: '/division',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Division" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New Division"
                        description="Add a new division"
                        initialData={{
                            name: '',
                        }}
                        fields={fields}
                        submitUrl={route('division.store')}
                        submitLabel="Create New Division"
                        successMessage="Division created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
