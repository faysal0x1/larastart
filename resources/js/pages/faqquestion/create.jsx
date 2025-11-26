import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { permissions, auth } = usePage().props;

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
            title: 'Create FaqQuestion',
            href: '/faqquestion'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create FaqQuestion" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New FaqQuestion"
                        description="Add a new faqquestion"
                        initialData={{
            question: '',
            answer: '',
            status: '',
            ranking: ''
                        }}
                        fields={fields}
                        submitUrl="faqquestion"
                        submitLabel="Create New FaqQuestion"
                        successMessage="FaqQuestion created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}