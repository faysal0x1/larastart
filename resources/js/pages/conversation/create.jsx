import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "title",
    "label": "Title",
    "type": "text",
    "required": true
},
        {
    "name": "is_group",
    "label": "Is Group",
    "type": "text",
    "required": true
},
        {
    "name": "creator_id",
    "label": "Creator Id",
    "type": "select",
    "required": false
}
    ];

    const breadcrumbs = [
        {
            title: 'Create Conversation',
            href: '/conversation'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Conversation" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New Conversation"
                        description="Add a new conversation"
                        initialData={{
            title: '',
            is_group: '',
            creator_id: ''
                        }}
                        fields={fields}
                        submitUrl="conversation"
                        submitLabel="Create New Conversation"
                        successMessage="Conversation created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}