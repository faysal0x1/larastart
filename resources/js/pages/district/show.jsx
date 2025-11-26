import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function show() {
    const { district } = usePage().props;

    return (
        <AppLayout>
            <Head title="District Details" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Add your show page content here */}
                </div>
            </div>
        </AppLayout>
    );
}