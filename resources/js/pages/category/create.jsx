import GlobalForm from '@/components/GlobalForm';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, usePage, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import RichTextEditor from '@/components/ui/RichTextEditor.jsx';

export default function create() {
    const { permissions, auth, parentCategories } = usePage().props;
    const [parentSearch, setParentSearch] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
        image: null,
        banner: null,
        meta_title: '',
        meta_description: '',
        bottom_description: '',
        meta_image: null,
        parent_id: null,
        status: true,
    });

    // Filter parent categories based on search
    const filteredParentCategories = parentCategories.filter(category =>
        category.name.toLowerCase().includes(parentSearch.toLowerCase())
    );

    const handleInputChange = (field, value) => {
        setData(field, value);

        // Auto-generate slug from name
        if (field === 'name') {
            const slug = value.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim('-');
            setData('slug', slug);
        }
    };

    const handleFileChange = (field, file) => {
        setData(field, file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('category.store'));
    };

    const breadcrumbs = [
        {
            title: 'Create Category',
            href: '/category',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Category</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Add a new category to the system. You can create root categories or subcategories.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                                {/* General Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">General Information</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Category Name *</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                placeholder="Enter category name"
                                                required
                                            />
                                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                        </div>

                                        {/*<div className="space-y-2">*/}
                                        {/*    <Label htmlFor="slug">Slug</Label>*/}
                                        {/*    <Input*/}
                                        {/*        id="slug"*/}
                                        {/*        name="slug"*/}
                                        {/*        value={data.slug}*/}
                                        {/*        onChange={(e) => handleInputChange('slug', e.target.value)}*/}
                                        {/*        placeholder="category-slug"*/}
                                        {/*    />*/}
                                        {/*    {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}*/}
                                        {/*</div>*/}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>

                                        <RichTextEditor
                                            id="description"
                                            value={data.description}
                                            onChange={(value) => handleInputChange('description', value)}
                                            placeholder="Enter category description"
                                            rows={3}
                                            height={300}
                                        />


                                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bottom_description">Bottom Description</Label>

                                        <RichTextEditor
                                            id="bottom_description"
                                            value={data.bottom_description}
                                            onChange={(value) => handleInputChange('bottom_description', value)}
                                            placeholder="Enter category bottom description"
                                            rows={3}
                                            height={300}
                                        />
                                        {errors.bottom_description && <p className="text-sm text-red-500">{errors.bottom_description}</p>}
                                    </div>
                                </div>

                                {/* Hierarchy */}
                                {/*<div className="space-y-4">*/}
                                {/*    <h3 className="text-lg font-medium">Category Hierarchy</h3>*/}

                                {/*    <div className="space-y-2">*/}
                                {/*        <Label>Parent Category</Label>*/}
                                {/*        <Select*/}
                                {/*            value={data.parent_id ? data.parent_id.toString() : '0'}*/}
                                {/*            onValueChange={(value) => handleInputChange('parent_id', value === '0' ? null : parseInt(value))}*/}
                                {/*        >*/}
                                {/*            <SelectTrigger>*/}
                                {/*                <SelectValue placeholder="Select parent category (optional)" />*/}
                                {/*            </SelectTrigger>*/}
                                {/*            <SelectContent>*/}
                                {/*                <div className="p-2 border-b">*/}
                                {/*                    <div className="relative">*/}
                                {/*                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />*/}
                                {/*                        <Input*/}
                                {/*                            placeholder="Search parent categories..."*/}
                                {/*                            value={parentSearch}*/}
                                {/*                            onChange={(e) => setParentSearch(e.target.value)}*/}
                                {/*                            className="pl-8"*/}
                                {/*                        />*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*                <div className="max-h-60 overflow-y-auto">*/}
                                {/*                    <SelectItem value="0">*/}
                                {/*                        <span className="text-muted-foreground">Root Category (No Parent)</span>*/}
                                {/*                    </SelectItem>*/}
                                {/*                    {filteredParentCategories.map((category) => (*/}
                                {/*                        <SelectItem key={category.id} value={category.id.toString()}>*/}
                                {/*                            <div className="flex flex-col">*/}
                                {/*                                <span>{category.name}</span>*/}
                                {/*                                {category.children && category.children.length > 0 && (*/}
                                {/*                                    <span className="text-xs text-muted-foreground">*/}
                                {/*                                        {category.children.length} subcategories*/}
                                {/*                                    </span>*/}
                                {/*                                )}*/}
                                {/*                            </div>*/}
                                {/*                        </SelectItem>*/}
                                {/*                    ))}*/}
                                {/*                </div>*/}
                                {/*            </SelectContent>*/}
                                {/*        </Select>*/}
                                {/*        {errors.parent_id && <p className="text-sm text-red-500">{errors.parent_id}</p>}*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/* SEO Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">SEO Information</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="meta_title">Meta Title</Label>
                                            <Input
                                                id="meta_title"
                                                name="meta_title"
                                                value={data.meta_title}
                                                onChange={(e) => handleInputChange('meta_title', e.target.value)}
                                                placeholder="Enter meta title"
                                            />
                                            {errors.meta_title && <p className="text-sm text-red-500">{errors.meta_title}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="meta_image">Meta Image</Label>
                                            <Input
                                                id="meta_image"
                                                name="meta_image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange('meta_image', e.target.files[0])}
                                            />
                                            {data.meta_image && (
                                                <p className="text-sm text-green-600">
                                                    Selected: {data.meta_image.name}
                                                </p>
                                            )}
                                            {errors.meta_image && <p className="text-sm text-red-500">{errors.meta_image}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="meta_description">Meta Description</Label>
                                        <Textarea
                                            id="meta_description"
                                            name="meta_description"
                                            value={data.meta_description}
                                            onChange={(e) => handleInputChange('meta_description', e.target.value)}
                                            placeholder="Enter meta description"
                                            rows={3}
                                        />
                                        {errors.meta_description && <p className="text-sm text-red-500">{errors.meta_description}</p>}
                                    </div>
                                </div>

                                {/* Media */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Media</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="image">Category Image</Label>
                                            <Input
                                                id="image"
                                                name="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileChange('image', e.target.files[0])}
                                            />
                                            {data.image && (
                                                <p className="text-sm text-green-600">
                                                    Selected: {data.image.name}
                                                </p>
                                            )}
                                            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                        </div>

                                        {/*<div className="space-y-2">*/}
                                        {/*    <Label htmlFor="banner">Banner Image</Label>*/}
                                        {/*    <Input*/}
                                        {/*        id="banner"*/}
                                        {/*        name="banner"*/}
                                        {/*        type="file"*/}
                                        {/*        accept="image/*"*/}
                                        {/*        onChange={(e) => handleFileChange('banner', e.target.files[0])}*/}
                                        {/*    />*/}
                                        {/*    {data.banner && (*/}
                                        {/*        <p className="text-sm text-green-600">*/}
                                        {/*            Selected: {data.banner.name}*/}
                                        {/*        </p>*/}
                                        {/*    )}*/}
                                        {/*    {errors.banner && <p className="text-sm text-red-500">{errors.banner}</p>}*/}
                                        {/*</div>*/}
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Status</h3>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="status"
                                            checked={data.status}
                                            onCheckedChange={(checked) => handleInputChange('status', checked)}
                                        />
                                        <Label htmlFor="status">Active</Label>
                                    </div>
                                    {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                                </div>

                                {/* Error Messages */}
                                {errors.general && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                                        <p className="text-sm text-red-600">{errors.general}</p>
                                    </div>
                                )}

                                {/* Submit Buttons */}
                                <div className="flex justify-end space-x-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing ? 'Creating...' : 'Create Category'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
