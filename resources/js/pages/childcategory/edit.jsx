import GlobalForm from '@/components/GlobalForm';
import ImageUpdateComponent from '@/components/ImageUpdateComponent.jsx';
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
            name: 'sub_category_id',
            label: 'Select Sub Category',
            type: 'select',
            options: subCategoryOptions,
            placeholder: 'Select a sub category',
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
            label: 'Enter Sub Category Slug',
            type: 'text',
            placeholder: 'Enter SubCategory name',
            required: true,
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
            title: 'Child Categories',
            href: '/child-category',
        },
        {
            title: 'Edit',
            href: '#',
        },
    ];

    // Prepare initial data with sub_category_id
    const initialData = {
        sub_category_id: childCategory.sub_categories?.[0]?.id || childCategory.parent_id || '',
        name: childCategory.name || '',
        slug: childCategory.slug || '',
        priority: childCategory.priority || 0,
        description: childCategory.description || '',
        bottom_description: childCategory.bottom_description || '',
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
                    <div className="mb-8">
                        <ImageUpdateComponent
                            title="Update Child Category Image"
                            fieldName="image"
                            initialImage={childCategory.image_url ? childCategory.image : null}
                            submitUrl={route('admin.generic.image.update', { model: 'category', id: childCategory.id })}
                        />
                    </div>

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
