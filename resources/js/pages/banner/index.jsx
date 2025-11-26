// resources/js/Pages/banner/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function Banner() {
    const { banners, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Banner',
            href: '/banner',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('title', 'Title', (item) => <div className="font-medium">{item.title}</div>),
        column('sub_title', 'Sub Title', (item) => <div className="font-medium">{item.sub_title}</div>),
        column('url', 'Url', (item) => <div className="font-medium">{item.url}</div>),
        column('image', 'Image', (item) => <div className="font-medium">{item.image}</div>),
        column('status', 'Status', (item) => <div className="font-medium">{item.status}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                routes={{
                    view: (id) => route('banner.show', id),
                    edit: (id) => route('banner.edit', id),
                    delete: (id) => route('banner.destroy', id),
                }}
            />
        )),
    ];

    return (
        <ListingPage
            title="Banner"
            data={banners}
            filters={filters}
            currentUser={auth.user}
            resourceName="banner"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Banner"
        />
    );
}