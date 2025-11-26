import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { childCategory, subCategories, auth } = usePage().props;

    const subCategoryOptions = subCategories.map((subCategory) => ({
        label: subCategory.name,
        value: subCategory.id,
    }));

    const fields = [
        {
            name: 'sub_category_ids',
            label: 'Select Sub Categories',
            type: 'multiselect',
            options: subCategoryOptions,
            placeholder: 'Select one or more sub categories',
            searchable: true,
            required: true,
        },
        {
            name: 'name',
            label: 'Enter Child Category Name',
            type: 'text',
            placeholder: 'Enter Child Category name',
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
            placeholder: 'Enter Child Category priority',
            required: false,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Enter description',
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
            title: 'Child Categories',
            href: '/child-category',
        },
        {
            title: 'Edit',
            href: '#',
        },
    ];

    // Prepare initial data with sub_category_ids
    const initialData = {
        sub_category_ids: childCategory.sub_categories?.map(sc => sc.id) || [],
        name: childCategory.name || '',
        slug: childCategory.slug || '',
        priority: childCategory.priority || 0,
        description: childCategory.description || '',
        meta_title: childCategory.meta_title || '',
        meta_description: childCategory.meta_description || '',
        is_featured: childCategory.is_featured || false,
        is_active: childCategory.is_active !== undefined ? childCategory.is_active : true,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Child Category: ${childCategory.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Edit Child Category"
                        description="Update child category and its sub category attachments"
                        initialData={initialData}
                        fields={fields}
                        submitUrl={route('child-category.update', childCategory.id)}
                        submitLabel="Update Child Category"
                        successMessage="Child Category updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
