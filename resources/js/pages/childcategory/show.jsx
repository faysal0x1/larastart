import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';

export default function show() {
    const { childCategory } = usePage().props;

    if (!childCategory) {
        return (
            <AppLayout>
                <Head title="Child Category Not Found" />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900">Child Category Not Found</h1>
                            <p className="mt-2 text-gray-600">The requested child category could not be found.</p>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title={`${childCategory.name} - Child Category Details`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/admin/child-category"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Child Categories
                                </Link>
                                <h1 className="text-3xl font-bold text-gray-900">{childCategory.name}</h1>
                            </div>
                            <div className="flex space-x-3">
                                <Link
                                    href={`/admin/child-category/${childCategory.id}/edit`}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Basic Information */}
                            <div className="bg-white shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{childCategory.name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Slug</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{childCategory.slug}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Priority</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{childCategory.priority || 'Not set'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                                            <dd className="mt-1">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${childCategory.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {childCategory.status || 'inactive'}
                                                </span>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Level</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{childCategory.level || 0}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Path</dt>
                                            <dd className="mt-1 text-sm text-gray-900 font-mono">{childCategory.path || 'N/A'}</dd>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {childCategory.description || 'No description provided'}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            {/* Parent Category */}
                            {childCategory.parent && (
                                <div className="mt-8 bg-white shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Parent Category</h3>
                                        <div className="flex items-center space-x-4">
                                            {childCategory.parent.image_url && (
                                                <img
                                                    className="w-16 h-16 rounded-lg object-cover"
                                                    src={childCategory.parent.image_url}
                                                    alt={childCategory.parent.name}
                                                />
                                            )}
                                            <div>
                                                <h4 className="text-lg font-medium text-gray-900">{childCategory.parent.name}</h4>
                                                <p className="text-sm text-gray-500">{childCategory.parent.slug}</p>
                                                <p className="text-sm text-gray-600">{childCategory.parent.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Child Categories */}
                            {childCategory.children && childCategory.children.length > 0 && (
                                <div className="mt-8 bg-white shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                                            Child Categories ({childCategory.children.length})
                                        </h3>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            {childCategory.children.map((child) => (
                                                <div key={child.id} className="border rounded-lg p-4 hover:bg-gray-50">
                                                    <div className="flex items-center space-x-3">
                                                        {child.image_url && (
                                                            <img
                                                                className="w-12 h-12 rounded-lg object-cover"
                                                                src={child.image_url}
                                                                alt={child.name}
                                                            />
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-medium text-gray-900 truncate">
                                                                {child.name}
                                                            </h4>
                                                            <p className="text-xs text-gray-500">{child.slug}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Products */}
                            {childCategory.products && childCategory.products.length > 0 && (
                                <div className="mt-8 bg-white shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                                            Products ({childCategory.products.length})
                                        </h3>
                                        <div className="overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Name
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            SKU
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Price
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {childCategory.products.slice(0, 10).map((product) => (
                                                        <tr key={product.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {product.name}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {product.sku || 'N/A'}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                ${product.price || '0.00'}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.status === 'active'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-red-100 text-red-800'
                                                                    }`}>
                                                                    {product.status || 'inactive'}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {childCategory.products.length > 10 && (
                                                <div className="px-6 py-3 text-sm text-gray-500 text-center">
                                                    And {childCategory.products.length - 10} more products...
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Image */}
                            {childCategory.image_url && (
                                <div className="bg-white shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Image</h3>
                                        <img
                                            className="w-full h-48 object-cover rounded-lg"
                                            src={childCategory.image_url}
                                            alt={childCategory.name}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Meta Information */}
                            <div className="bg-white shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Meta Information</h3>
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Created At</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(childCategory.created_at).toLocaleDateString()}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Updated At</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(childCategory.updated_at).toLocaleDateString()}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Featured</dt>
                                            <dd className="mt-1">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${childCategory.is_featured
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {childCategory.is_featured ? 'Yes' : 'No'}
                                                </span>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Active</dt>
                                            <dd className="mt-1">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${childCategory.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {childCategory.is_active ? 'Yes' : 'No'}
                                                </span>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            {/* SEO Information */}
                            {(childCategory.meta_title || childCategory.meta_description) && (
                                <div className="bg-white shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Information</h3>
                                        <dl className="space-y-4">
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
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
