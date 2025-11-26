import ProductBasicInfo from '@/components/admin/products/ProductBasicInfo.jsx';
import ProductGeneralSetup from '@/components/admin/products/ProductGeneralSetup.jsx';
import ProductImagesUpload from '@/components/admin/products/ProductImagesUpload.jsx';
import ProductPricing from '@/components/admin/products/ProductPricing.jsx';
import ProductSeo from '@/components/admin/products/ProductSeo.jsx';
import ProductVariationSetup from '@/components/admin/products/ProductVariationSetup.jsx';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ProductSpecs from './ProductSpecs.jsx';

export default function ProductCreate() {
    const { categories, colorAttributes, brands, tags } = usePage().props;
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [childCategoryOptions, setChildCategoryOptions] = useState([]);
    const [colorImages, setColorImages] = useState({});
    // specs state handled inside ProductSpecs via data.specs

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        short_descp: '',
        long_descp: '',
        key_features: '',
        product_specs_data: '',
        category_id: '',
        sub_category_id: '',
        child_category_id: '',
        brand_id: '',
        sku: '',
        tags: [],
        colors_active: false,
        colors: [],
        size: [],
        attributes: [],
        product_thumbnail: null,
        colorImages: [],
        images: [],
        unit_price: 0,
        qty: 0,
        discount_type: 'flat',
        discount_price: 0,
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        meta_tags: '',
        call_for_price: false,
        hot_deals: false,
        featured: false,
        special_offer: false,
        special_deals: false,
        variations: [], // Add variations array to the form data
        specs: {},
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Add all regular fields
        Object.keys(data).forEach((key) => {
            if (key === 'images') {
                data.images.forEach((image, index) => {
                    if (image) formData.append(`images[${index}]`, image);
                });
            } else if (key === 'color_images') {
                data.color_images?.forEach((colorImage, index) => {
                    if (colorImage?.file) {
                        const colorId = colorImage.colorId || colorImage.colorCode;
                        const isNumericId = typeof colorId === 'number' || (typeof colorId === 'string' && /^\d+$/.test(colorId));
                        if (isNumericId) {
                            formData.append(`color_images[${index}][color_attribute_id]`, colorId);
                        } else {
                            formData.append(`color_images[${index}][colorCode]`, colorId);
                        }
                        formData.append(`color_images[${index}][file]`, colorImage.file);
                    }
                });
            } else if (key === 'variations') {
                // Special handling for variations
                data.variations.forEach((variation, index) => {
                    // Add basic variation data
                    formData.append(`variations[${index}][name]`, variation.name);
                    formData.append(`variations[${index}][sku]`, variation.sku);
                    formData.append(`variations[${index}][price]`, variation.price);
                    formData.append(`variations[${index}][stock]`, variation.stock);

                    // Add attribute data
                    Object.entries(variation.attributes).forEach(([attrName, attrValue]) => {
                        formData.append(`variations[${index}][attributes][${attrName}]`, attrValue);
                    });
                });
            } else if (Array.isArray(data[key])) {
                data[key].forEach((item) => formData.append(`${key}[]`, item));
            } else if (key === 'specs' && data[key] !== null && typeof data[key] === 'object') {
                Object.entries(data[key]).forEach(([group, attrs]) => {
                    Object.entries(attrs).forEach(([attr, val]) => {
                        formData.append(`specs[${group}][${attr}]`, val ?? '');
                    });
                });
            } else if (data[key] !== null) {
                formData.append(key, data[key]);
            }
        });

        post(route('product.store'), {
            data: formData,
            forceFormData: true,
        });
    };

    useEffect(() => {
        if (data.category_id) {
            fetch(`/admin/subcategory/ajax/${data.category_id}`)
                .then((res) => res.json())
                .then((data) => {
                    setSubCategoryOptions(data);
                });
        } else {
            setSubCategoryOptions([]);
        }
    }, [data.category_id]);

    useEffect(() => {
        if (data.sub_category_id) {
            fetch(`/admin/child-category/ajax/${data.sub_category_id}`)
                .then((res) => res.json())
                .then((data) => {
                    setChildCategoryOptions(data);
                });
        } else {
            setChildCategoryOptions([]);
        }
    }, [data.sub_category_id]);

    // moved specs fetching and UI to ProductSpecs component

    return (
        <AppLayout>
            <Head title="Add Products" />

            <div className="container space-y-6 px-4 py-6">
                <div className="flex items-center gap-4">
                    <h2 className="flex items-center gap-2 text-3xl font-bold">Add New Product</h2>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                    <ProductBasicInfo data={data} setData={setData} errors={errors} />

                    <ProductGeneralSetup
                        data={data}
                        setData={setData}
                        categories={categories}
                        subCategoryOptions={subCategoryOptions}
                        brands={brands}
                        tags={tags}
                        childCategories={childCategoryOptions}
                    />

                    <ProductVariationSetup data={data} setData={setData} colorAttributes={colorAttributes} />

                    <ProductImagesUpload data={data} setData={setData} colorImages={colorImages} setColorImages={setColorImages} />

                    <ProductPricing data={data} setData={setData} />

                    <ProductSeo data={data} setData={setData} />

                    <ProductSpecs data={data} setData={setData} />

                    <div className="flex justify-end gap-3">
                        <Button type="reset" variant="outline">
                            Reset
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Processing...' : 'Submit'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
