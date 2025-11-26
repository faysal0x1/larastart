import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { faqquestion, permissions, auth } = usePage().props;

    const fields = [
        {
    "name": "question",
    "label": "Question",
    "type": "text",
    "required": true
},
        {
    "name": "answer",
    "label": "Answer",
    "type": "textarea",
    "required": true
},
        {
    "name": "status",
    "label": "Status",
    "type": "select",
    "required": false
},
        {
    "name": "ranking",
    "label": "Ranking",
    "type": "text",
    "required": true
}
    ];

    const breadcrumbs = [
        {
            title: 'Edit FaqQuestion',
            href: '/faqquestion',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit FaqQuestion" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit FaqQuestion"
                        description="Update faqquestion information"
                        initialData={faqquestion}
                        fields={fields}
                        submitUrl={`faqquestion/${faqquestion.id}`}
                        submitLabel="Update FaqQuestion"
                        successMessage="FaqQuestion updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
