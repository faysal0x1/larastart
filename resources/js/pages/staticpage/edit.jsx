import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';
import { getStaticPageFields } from './fields';

export default function StaticPageEdit({ page }) {
    const { pageOptions = [] } = usePage().props;
    const breadcrumbs = [
        { title: 'Static Pages', href: '/static-page' },
        { title: 'Edit', href: `/static-page/${page.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${page.title}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title={`Edit ${page.title}`}
                        description="Update the content or status of this page."
                        initialData={{
                            title: page.title,
                            slug: page.slug,
                            summary: page.summary,
                            content: page.content,
                            is_active: page.is_active,
                        }}
                        fields={getStaticPageFields(pageOptions, page.slug)}
                        submitUrl={route('static-page.update', page.id)}
                        method="post"
                        submitLabel="Update Page"
                        cancelUrl={route('static-page.index')}
                        successMessage="Static page updated successfully."
                    />
                </div>
            </div>
        </AppLayout>
    );
}

