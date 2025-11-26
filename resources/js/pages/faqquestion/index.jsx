// resources/js/Pages/faqquestion/index.jsx
import ListingPage from '@/components/ListingPage';
import { column, createSerialColumn } from '@/utils/tableUtils';
import { usePage } from '@inertiajs/react';
import ActionsDropdown from '@/components/ActionsDropdown';

export default function FaqQuestion() {
    const { faqquestions, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'FaqQuestion',
            href: '/faqquestion',
        },
    ];

    const columns = [
        createSerialColumn('Serial'),
        column('question', 'Question', (item) => <div className="font-medium">{item.question}</div>),
        column('answer', 'Answer', (item) => <div className="font-medium">{item.answer}</div>),
        column('status', 'Status', (item) => <div className="font-medium">{item.status}</div>),
        column('ranking', 'Ranking', (item) => <div className="font-medium">{item.ranking}</div>),

        column('actions', 'Actions', (item) => (
            <ActionsDropdown
                item={item}
                actions={[
                    {
                        type: 'view',
                        label: 'View',
                        route: (id) => route('faq-question.show', id),
                        // permission: 'quiz.view'
                    },
                    {
                        type: 'edit',
                        label: 'Edit',
                        route: (id) => route('faq-question.edit', id),
                        // permission: 'quiz.edit'
                    },
                    {
                        type: 'delete',
                        label: 'Delete',
                        route: (id) => route('faq-question.destroy', id),
                        method: 'delete',
                        // permission: 'quiz.delete'
                    },
                ]}
            />
        )),
    ];

    return (
        <ListingPage
            title="FaqQuestion"
            data={faqquestions}
            filters={filters}
            currentUser={auth.user}
            resourceName="faqquestion"
            breadcrumbs={breadcrumbs}
            columns={columns}
            createButtonText="New FaqQuestion"
        />
    );
}
