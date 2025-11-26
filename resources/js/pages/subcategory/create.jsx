import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { categories, auth } = usePage().props;

    const categoryOptions = categories.map((category) => ({
        label: category.name,
        value: category.id,
    }));

    const fields = [
        {
            name: 'category_id',
            label: 'Select Categories',
            type: 'select',
            options: categoryOptions,
            placeholder: 'Select categories',
            searchable: true,
            required: true,
        },
        {
            name: 'name',
            label: 'Enter Sub Category Name',
            type: 'text',
            placeholder: 'Enter SubCategory name',
            required: true,
        },
        {
            name: 'slug',
            label: 'Enter Slug',
            type: 'text',
            placeholder: 'Enter slug (auto-generated if empty)',
            required: false,
        },
        {
            name: 'priority',
            label: 'Enter Priority',
            type: 'number',
            placeholder: 'Enter SubCategory priority',
            required: false,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'richtext',
            placeholder: 'Enter description',
            required: false,
        },
        {
            name: 'bottom_description',
            label: 'Bottom Description',
            type: 'richtext',
            placeholder: 'Enter bottom description',
            required: false,
        },
        {
            name: 'meta_title',
            label: 'Meta Title',
            type: 'text',
            placeholder: 'Enter meta title for SEO',
            required: false,
        },
        {
            name: 'meta_description',
            label: 'Meta Description',
            type: 'textarea',
            placeholder: 'Enter meta description for SEO',
            required: false,
        },
        {
            name: 'is_featured',
            label: 'Featured',
            type: 'checkbox',
            required: false,
        },
        {
            name: 'is_active',
            label: 'Active',
            type: 'checkbox',
            required: false,
        },
    ];

    const breadcrumbs = [
        {
            title: 'Create SubCategory',
            href: '/subCategory',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create SubCategory" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New SubCategory"
                        description="Add a new subCategory and attach it to multiple categories"
                        initialData={{
                            category_id: "",
                            name: '',
                            slug: '',
                            priority: 0,
                            description: '',
                            bottom_description: '',
                            meta_title: '',
                            meta_description: '',
                            is_featured: false,
                            is_active: true,
                        }}
                        fields={fields}
                        submitUrl={route('sub-category.store')}
                        submitLabel="Create New SubCategory"
                        successMessage="SubCategory created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
