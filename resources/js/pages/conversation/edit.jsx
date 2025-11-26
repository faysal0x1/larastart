import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { conversation, permissions, auth } = usePage().props;

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
            title: 'Edit Conversation',
            href: '/conversation',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Conversation" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit Conversation"
                        description="Update conversation information"
                        initialData={conversation}
                        fields={fields}
                        submitUrl={`conversation/${conversation.id}`}
                        submitLabel="Update Conversation"
                        successMessage="Conversation updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
