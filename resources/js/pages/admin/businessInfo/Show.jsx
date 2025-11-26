import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';

// Import TinyMCE locally to avoid CDN usage
import 'tinymce/tinymce'; // core
import 'tinymce/icons/default'; // icons
import 'tinymce/themes/silver'; // theme
import 'tinymce/models/dom'; // model

// Import plugins (only the ones you use)
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';
import AppLayout from '@/layouts/app-layout';
import TextLink from '@/components/text-link.jsx';

const BusinessInfoShow = () => {
    const { content, pageTitle, type } = usePage().props;
    const [activeTab, setActiveTab] = useState(type);

    const { data, setData, post, processing, errors } = useForm({
        content: content || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(route('admin.business-info.update', { type }), data);
    };

    const tabs = [
        'terms_and_conditions',
        'privacy_policy',
        'refund_policy',
        'return_policy',
        'cancellation_policy',
        'about_us',
        'faq',
        'company_reliability',
    ];

    return (
        <AppLayout>
            <Head title={pageTitle} />

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-2 mb-6">
                    <img
                        src="/images/Pages.png"
                        alt="Pages"
                        className="w-5 h-5"
                    />
                    <h1 className="text-2xl font-bold">Pages</h1>
                </div>

                <div className="mb-8 overflow-x-auto">
                    <nav className="flex space-x-4">
                        {tabs.map((tab) => (

                            <TextLink
                                key={tab}
                                href={route('admin.business-info.show', { type: tab })}
                                className={`px-4 py-2 text-sm font-medium rounded-md ${
                                    activeTab === tab
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                                }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </TextLink>
                        ))}
                    </nav>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">
                            {pageTitle}
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="mb-6">
                            <Editor
                                // apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                                value={data.content}
                                onEditorChange={(content) => setData('content', content)}
                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                                }}
                            />
                            {errors.content && (
                                <p className="mt-2 text-sm text-red-600">{errors.content}</p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                disabled={processing}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default BusinessInfoShow;
