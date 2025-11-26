// resources/js/Pages/siteseo/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function SiteSeo() {
    const { siteseos, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'SiteSeo',
            href: '/siteseo',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('meta_title', 'Meta Title', (item) => <div className="font-medium">{item.meta_title}</div>),
        column('meta_author', 'Meta Author', (item) => <div className="font-medium">{item.meta_author}</div>),
        column('meta_keyword', 'Meta Keyword', (item) => <div className="font-medium">{item.meta_keyword}</div>),
        column('meta_description', 'Meta Description', (item) => <div className="font-medium">{item.meta_description}</div>),
        column('google_analytics', 'Google Analytics', (item) => <div className="font-medium">{item.google_analytics}</div>),
        column('fb_pixel_id', 'Facebook Pixel ID', (item) => <div className="font-medium">{item.fb_pixel_id || 'N/A'}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('site-seo.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('site-seo.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('site-seo.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="SiteSeo"
            data={siteseos}
            filters={filters}
            currentUser={auth.user}
            resourceName="site-seo"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New SiteSeo"
        />
    );
}
