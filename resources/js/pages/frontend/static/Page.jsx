import React from 'react';
import WebLayout from '@/layouts/web/WebLayout.jsx';

export default function StaticPage({ page }) {
    if (!page) {
        return (
            <WebLayout>
                <div className="max-w-4xl mx-auto py-16 px-4">
                    <h1 className="text-3xl font-bold text-center">Page not found</h1>
                </div>
            </WebLayout>
        );
    }

    return (
        <WebLayout>
            <div className="bg-white">
                <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                    <div className="mb-8">
                        <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Policy</p>
                        <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            {page.title}
                        </h1>
                        {page.summary && (
                            <p className="mt-4 text-lg text-gray-500">
                                {page.summary}
                            </p>
                        )}
                    </div>
                    <article className="prose prose-lg max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: page.content || '' }} />
                    </article>
                </div>
            </div>
        </WebLayout>
    );
}

