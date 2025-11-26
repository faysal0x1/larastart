import ListingPage from '@/components/ListingPage';
import ActionsDropdown from '@/components/ActionsDropdown';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';

export default function StaticPageIndex() {
    const { pages, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Static Pages',
            href: '/static-page',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('title', 'Title', (item) => <div className="font-medium">{item.title}</div>),
        column('slug', 'Slug', (item) => <span className="text-muted-foreground">{item.slug}</span>),
        column('summary', 'Summary', (item) => (
            <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
        )),
        column('is_active', 'Status', (item) => (
            <span
                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                    }`}
            >
                {item.is_active ? 'Active' : 'Hidden'}
            </span>
        )),

        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('static-page.edit', id),
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('static-page.destroy', id),
                        method: 'delete',
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Static Pages"
            description="Manage policy and legal content displayed on the storefront."
            data={pages}
            filters={filters}
            currentUser={auth.user}
            resourceName="static-page"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Static Page"
        />
    );
}

