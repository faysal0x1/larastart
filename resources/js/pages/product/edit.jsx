import ProductBasicInfo from '@/components/admin/products/edit/ProductEditBasicInfo.jsx';
import ProductGeneralSetup from '@/components/admin/products/edit/ProductEditGeneralSetup.jsx';
import ProductImagesUpload from '@/components/admin/products/edit/ProductEditImagesUpload.jsx';
import ProductPricing from '@/components/admin/products/edit/ProductEditPricing.jsx';
import ProductVariationSetup from '@/components/admin/products/edit/ProductEditVariationSetup.jsx';
import ProductSeo from '@/components/admin/products/ProductSeo.jsx';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout.jsx';
import ProductSpecs from '@/pages/product/ProductSpecs.jsx';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function ProductEdit() {
    const {
        product,
        categories,
        subCategories = [],
        childCategories = [],
        colorAttributes,
        brands,
        multi_images = [],
        color_images = [],
    } = usePage().props;
    const [colorImages, setColorImages] = useState({});

    const { data, setData, post, processing, errors } = useForm({
        name: product.name || '',
        slug: product.slug || '',
        short_descp: product.short_descp || '',
        long_descp: product.long_descp || '',
        category_id: product.category_id || '',
        subcategory_id: product.subcategory_id || '',
        child_category_id: product.child_category_id || '',
        key_features: product.key_features || '',
        product_specs_data: product.product_specs_data || '',
        brand_id: product.brand_id || '',
        sku: product.sku || '',
        tags: Array.isArray(product.tags) ? product.tags : (product.tags ? product.tags.split(',').map(tag => tag.trim()) : []),
        colors_active: (color_images && color_images.length > 0) || false,
        colors: product.colors || [],
        size: Array.isArray(product.size) ? product.size : (product.size ? product.size.split(',').map(size => size.trim()) : []),
        product_thumbnail: null,
        existing_thumbnail: product.image_url || null,
        color_images: color_images || [],
        existing_images: multi_images || [], // This comes from Spatie Media Library
        images: [],
        unit_price: product.unit_price || 0,
        qty: product.qty || 0,
        discount_type: product.discount_type || 'flat',
        discount_price: product.discount_price || 0,
        meta_title: product?.seo?.meta_title || '',
        meta_description: product?.seo?.meta_description || '',
        meta_keywords: product?.seo?.meta_keywords || '',
        meta_tags: product?.seo?.meta_tags || '',
        call_for_price: product.call_for_price || false,
        hot_deals: product.hot_deals || false,
        featured: product.featured || false,
        special_offer: product.special_offer || false,
        special_deals: product.special_deals || false,
        variations: product.variations || [],
        specs: usePage().props.productSpecs || {},
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Add all regular fields (excluding files and arrays)
        Object.keys(data).forEach((key) => {
            if (
                key !== 'images' &&
                key !== 'color_images' &&
                key !== 'existing_images' &&
                key !== 'existing_thumbnail' &&
                key !== 'product_thumbnail'
            ) {
                if (key === 'specs' && data[key] !== null && typeof data[key] === 'object') {
                    Object.entries(data[key]).forEach(([group, attrs]) => {
                        Object.entries(attrs).forEach(([attr, val]) => {
                            formData.append(`specs[${group}][${attr}]`, val ?? '');
                        });
                    });
                } else if (Array.isArray(data[key])) {
                    data[key].forEach((item) => formData.append(`${key}[]`, item));
                } else {
                    formData.append(key, data[key]);
                }
            }
        });

        // Handle thumbnail
        if (data.product_thumbnail) {
            formData.append('product_thumbnail', data.product_thumbnail);
        }

        // Handle multi images
        data.images.forEach((image, index) => {
            if (image) formData.append(`images[${index}]`, image);
        });

        // Handle new color images (uploaded in this session)
        data.new_color_images?.forEach((colorImage, index) => {
            if (colorImage?.file) {
                const id = colorImage.colorId;
                const isNumericId = typeof id === 'number' || (typeof id === 'string' && /^\d+$/.test(id));
                if (isNumericId) {
                    formData.append(`color_images[${index}][color_attribute_id]`, id);
                } else {
                    formData.append(`color_images[${index}][colorCode]`, id);
                }
                formData.append(`color_images[${index}][file]`, colorImage.file);
            }
        });

        // Add deleted images information
        deletedImages.forEach((id) => formData.append('deleted_images[]', id));
        deletedColorImages.forEach((colorCode) => formData.append('deleted_color_images[]', colorCode));

        // Debug: Log the form data
        console.log('Form data being sent:', data);
        console.log('Specs data:', data.specs);

        post(route('product.update', product.id), {
            data: formData,
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setDeletedImages([]);
                setDeletedColorImages([]);
            },
        });
    };

    const [deletedImages, setDeletedImages] = useState([]);
    const [deletedColorImages, setDeletedColorImages] = useState([]);

    const handleDeleteImage = (imageId) => {
        setDeletedImages([...deletedImages, imageId]);
        setData('existing_images', (data.existing_images || []).filter((img) => img.id !== imageId));
    };

    const handleDeleteColorImage = (colorImageId) => {
        setDeletedColorImages([...deletedColorImages, colorImageId]);
        setData(
            'color_images',
            (data.color_images || []).filter((img) => img.id !== colorImageId),
        );
    };

    // useEffect(() => {
    //     if (data.category_id) {
    //         fetch(`/admin/subcategory/ajax/${data.category_id}`)
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 setSubCategoryOptions(data);
    //             });
    //     }
    // }, [data.category_id]);
    //
    // useEffect(() => {
    //     if (data.subcategory_id) {
    //         // Filter child categories based on selected sub-category
    //         const filteredChildCategories = initialChildCategories.filter((cc) => cc.sub_categories?.some((sc) => sc.id == data.subcategory_id));
    //         setChildCategoryOptions(filteredChildCategories);
    //     } else {
    //         setChildCategoryOptions([]);
    //     }
    // }, [data.subcategory_id, initialChildCategories]);

    return (
        <AppLayout>
            <Head title="Edit Product" />

            <div className="container space-y-6 px-4 py-6">
                <div className="flex items-center gap-4">
                    <h2 className="flex items-center gap-2 text-3xl font-bold">Edit Product</h2>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                    <ProductBasicInfo data={data} setData={setData} errors={errors} />

                    <ProductGeneralSetup
                        data={data}
                        setData={setData}
                        categories={categories}
                        initialSubCategories={subCategories}
                        initialChildCategories={childCategories}
                        brands={brands}
                    />

                    <ProductVariationSetup data={data} setData={setData} colorAttributes={colorAttributes} existingVariations={product.variations} />

                    <ProductImagesUpload
                        data={data}
                        setData={setData}
                        colorImages={colorImages}
                        setColorImages={setColorImages}
                        onDeleteImage={handleDeleteImage}
                        onDeleteColorImage={handleDeleteColorImage}
                        productId={product.id}
                    />

                    <ProductPricing data={data} setData={setData} />

                    <ProductSeo data={data} setData={setData} />



                    <ProductSpecs data={data} setData={setData} defaultEnabled={Object.keys(usePage().props.productSpecs || {}).length > 0} />

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => router.visit(route('products.index'))}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
