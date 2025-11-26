import GlobalForm from '@/components/GlobalForm';
import ImageUpdateComponent from '@/components/ImageUpdateComponent.jsx';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { subcategory, categories, auth } = usePage().props;

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
            placeholder: 'Select category',
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
            label: 'Enter Sub Category Slug',
            type: 'text',
            placeholder: 'Enter SubCategory name',
            required: true,
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
            title: 'Sub Categories',
            href: '/sub-category',
        },
        {
            title: 'Edit',
            href: '#',
        },
    ];

    // Prepare initial data with category_ids
    const initialData = {
        category_id: subcategory.parent_id || '',
        name: subcategory.name || '',
        slug: subcategory.slug || '',
        priority: subcategory.priority || 0,
        description: subcategory.description || '',
        bottom_description: subcategory.bottom_description || '',
        meta_title: subcategory.meta_title || '',
        meta_description: subcategory.meta_description || '',
        is_featured: subcategory.is_featured || false,
        is_active: subcategory.is_active !== undefined ? subcategory.is_active : true,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit SubCategory: ${subcategory.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <ImageUpdateComponent
                            title="Update SubCategory Image"
                            fieldName="image"
                            initialImage={subcategory.image_url ? subcategory.image : null}
                            submitUrl={route('admin.generic.image.update', { model: 'category', id: subcategory.id })}
                        />
                    </div>

                    <GlobalForm
                        title="Edit SubCategory"
                        description="Update subcategory and its category attachments"
                        initialData={initialData}
                        fields={fields}
                        submitUrl={route('sub-category.update', subcategory.id)}
                        submitLabel="Update SubCategory"
                        successMessage="SubCategory updated successfully!"
                        method="PUT"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
