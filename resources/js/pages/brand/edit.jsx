import GlobalForm from '@/components/GlobalForm';
import ImageUpdateComponent from '@/components/ImageUpdateComponent.jsx';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage } from '@inertiajs/react';

export default function edit() {
    const { brand, auth } = usePage().props;

    const fields = [
        {
            name: 'name',
            label: 'Enter Brand Name',
            type: 'text',
            placeholder: 'Enter Brand name',
            required: true,
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
    ];

    const breadcrumbs = [
        {
            title: 'Edit Brand',
            href: '/brand',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Brand" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <ImageUpdateComponent
                            title="Update Brand Image"
                            fieldName="image"
                            initialImage={brand.image_url ? brand.image : null}
                            submitUrl={route('admin.generic.image.update', { model: 'brand', id: brand.id })}
                        />
                    </div>

                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <GlobalForm
                            title="Edit Brand"
                            description="Update brand information"
                            initialData={brand}
                            fields={fields}
                            submitUrl={route('brand.update', brand.id)}
                            submitLabel="Update Brand"
                            successMessage="Brand updated successfully!"
                            method="PUT"
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
