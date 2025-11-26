import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth, divisions } = usePage().props;

    const divisionOptions = divisions.map((division) => ({
        label: division.division_name,
        value: division.id,
    }));

    const fields = [
        {
            name: 'division_id',
            label: 'Division Id',
            options: divisionOptions,
            type: 'select',
            required: false,
        },
        {
            name: 'district_name',
            label: 'District Name',
            type: 'text',
            required: true,
        },
    ];

    const breadcrumbs = [
        {
            title: 'Create District',
            href: '/district',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create District" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New District"
                        description="Add a new district"
                        initialData={{
                            division_id: '',
                            district_name: '',
                        }}
                        fields={fields}
                        submitUrl={route('district.store')}
                        submitLabel="Create New District"
                        successMessage="District created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
