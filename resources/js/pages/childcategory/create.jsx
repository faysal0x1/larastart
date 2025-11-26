import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function create() {
    const { subCategories, auth } = usePage().props;

    const subCategoryOptions = subCategories.map((subCategory) => ({
        label: subCategory.name,
        value: subCategory.id,
    }));

    const fields = [
        {
            name: 'sub_category_id',
            label: 'Select Sub Categories',
            type: 'select',
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
            title: 'Create Child Category',
            href: '/childCategory',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Child Category" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GlobalForm
                        title="Create New Child Category"
                        description="Add a new child category and attach it to multiple sub categories"
                        initialData={{
                            sub_category_id: '',
                            name: '',
                            priority: 0,
                            description: '',
                            bottom_description: '',
                            meta_title: '',
                            meta_description: '',
                            is_featured: false,
                            is_active: true,
                        }}
                        fields={fields}
                        submitUrl={route('child-category.store')}
                        submitLabel="Create New Child Category"
                        successMessage="Child Category created successfully!"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
