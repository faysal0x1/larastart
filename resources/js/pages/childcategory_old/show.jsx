import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function show() {
    const { childCategory, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Child Categories',
            href: '/childCategory',
        },
        {
            title: childCategory.name,
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Child Category: ${childCategory.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {childCategory.name}
                                </h1>
                                <p className="text-gray-600">{childCategory.description}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                                    <dl className="space-y-3">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Slug</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{childCategory.slug}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Priority</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{childCategory.priority || 0}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                                            <dd className="mt-1">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${childCategory.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {childCategory.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Featured</dt>
                                            <dd className="mt-1">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${childCategory.is_featured
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {childCategory.is_featured ? 'Yes' : 'No'}
                                                </span>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Sub Categories</h3>
                                    {childCategory.sub_categories && childCategory.sub_categories.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {childCategory.sub_categories.map((subCategory) => (
                                                <span
                                                    key={subCategory.id}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                                                >
                                                    {subCategory.name}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-sm">No sub categories attached</p>
                                    )}
                                </div>
                            </div>

                            {(childCategory.meta_title || childCategory.meta_description) && (
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold mb-4">SEO Information</h3>
                                    <dl className="space-y-3">
                                        {childCategory.meta_title && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Meta Title</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{childCategory.meta_title}</dd>
                                            </div>
                                        )}
                                        {childCategory.meta_description && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Meta Description</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{childCategory.meta_description}</dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            )}

                            <div className="mt-8 flex space-x-4">
                                <a
                                    href={route('child-category.edit', childCategory.id)}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Edit
                                </a>
                                <a
                                    href={route('child-category.index')}
                                    className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Back to List
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
