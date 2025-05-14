// resources/js/Pages/blog/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function Blog() {
    const { blog, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Blog',
            href: '/blogs',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('title', 'Title', (item) => <div className="font-medium">{item.title}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                routes={{
                    view: (id) => route('blogs.show', id),
                    edit: (id) => route('blogs.edit', id),
                    delete: (id) => route('blogs.destroy', id),
                }}
            />
        )),
    ];

    return (
        <ListingPage
            title="Blog"
            data={blog}
            filters={filters}
            currentUser={auth.user}
            resourceName="blogs"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Blog"
        />
    );
}