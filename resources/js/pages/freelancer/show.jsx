import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];

export default function FreelancerShows() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <h1>Hello</h1>
        </AppLayout>
    );
}
