import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';
import { getStaticPageFields } from './fields';

export default function StaticPageCreate() {
    const { pageOptions = [] } = usePage().props;
    const breadcrumbs = [
        { title: 'Static Pages', href: '/static-page' },
        { title: 'Create', href: '/static-page/create' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Static Page" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create Static Page"
                        description="Add a legal or informational page for the storefront."
                        initialData={{
                            title: '',
                            slug: '',
                            summary: '',
                            content: '',
                            is_active: true,
                        }}
                        fields={getStaticPageFields(pageOptions)}
                        submitUrl={route('static-page.store')}
                        submitLabel="Save Page"
                        cancelUrl={route('static-page.index')}
                        successMessage="Static page created successfully."
                    />
                </div>
            </div>
        </AppLayout>
    );
}

