// resources/js/Pages/slider/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function Slider() {
    const { sliders, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Slider',
            href: '/slider',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('title', 'Title', (item) => <div className="font-medium">{item.title}</div>),
        column('short_title', 'Short Title', (item) => <div className="font-medium">{item.short_title}</div>),
        column('image', 'Image', (item) => <div className="font-medium">{item.image}</div>),
        column('status', 'Status', (item) => <div className="font-medium">{item.status}</div>),
        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('slider.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('slider.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('slider.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="Slider"
            data={sliders}
            filters={filters}
            currentUser={auth.user}
            resourceName="slider"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New Slider"
        />
    );
}
