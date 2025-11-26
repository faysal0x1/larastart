import { GlobalSelect } from '@/components/GlobalSelect.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function ProductGeneralSetup({ data, setData, categories, subCategoryOptions, brands, tags, childCategories }) {
    const [tagInput, setTagInput] = useState('');
    const [newCategories, setNewCategories] = useState([]);
    const [newSubCategories, setNewSubCategories] = useState([]);
    const [newChildCategories, setNewChildCategories] = useState([]);
    const [newBrands, setNewBrands] = useState([]);
    const [categorySearch, setCategorySearch] = useState('');
    const [subCategorySearch, setSubCategorySearch] = useState('');
    const [childCategorySearch, setChildCategorySearch] = useState('');

    const handleAddTag = (e) => {
        e.preventDefault();
        const newTag = tagInput.trim();

        if (newTag && (!Array.isArray(data.tags) || !data.tags.includes(newTag))) {
            const updatedTags = Array.isArray(data.tags) ? [...data.tags, newTag] : [newTag];
            setData('tags', updatedTags);
            setTagInput('');
        }
    };

    const handleCreateBrand = async (brandName, tempId) => {
        try {
            console.log('Creating brand:', brandName);

            // Simulate API call
            setTimeout(() => {
                const newBrand = {
                    id: brandName,
                    name: brandName,
                    value: brandName,
                    label: brandName,
                };

                // Update the newBrands state
                setNewBrands((prev) => prev.map((b) => (b.value === tempId ? { ...newBrand, value: newBrand.id } : b)));

                // Update the form data with the real ID
                setData('brand_id', newBrand.id);
            }, 10);
        } catch (error) {
            console.error('Failed to create brand:', error);
        }
    };

    // Build brand options
    const brandOptions = useMemo(() => {
        const originalBrands = (brands || []).map((b) => ({
            value: b.id,
            label: b.name,
        }));

        return [...originalBrands, ...newBrands];
    }, [brands, newBrands]);

    // Build category options
    const categoryOptions = useMemo(() => {
        const originalCategories = (categories || []).map((c) => ({
            value: c.id,
            label: c.name,
        }));

        return [...originalCategories, ...newCategories];
    }, [categories, newCategories]);

    // Filter categories based on search
    const filteredCategories = useMemo(() => {
        if (!categorySearch) return categoryOptions;
        return categoryOptions.filter((category) => category.label.toLowerCase().includes(categorySearch.toLowerCase()));
    }, [categoryOptions, categorySearch]);

    // Build sub category options
    const subCategoryOptionsFiltered = useMemo(() => {
        if (!data.category_id) return [];

        // Get subcategories from props (already filtered by parent_id in the API)
        const categorySubCategories = (subCategoryOptions || []).map((sc) => ({
            value: sc.id,
            label: sc.name,
        }));

        // Add newly created subcategories for this category
        const newlyCreated = newSubCategories
            .filter((sc) => sc.parent_id === data.category_id)
            .map((sc) => ({
                value: sc.id || sc.name,
                label: sc.name,
            }));

        return [...categorySubCategories, ...newlyCreated];
    }, [subCategoryOptions, data.category_id, newSubCategories]);

    // Filter subcategories based on search
    const filteredSubCategories = useMemo(() => {
        if (!subCategorySearch) return subCategoryOptionsFiltered;
        return subCategoryOptionsFiltered.filter((subcat) => subcat.label.toLowerCase().includes(subCategorySearch.toLowerCase()));
    }, [subCategoryOptionsFiltered, subCategorySearch]);

    // Build child category options
    const childCategoryOptionsFiltered = useMemo(() => {
        if (!data.sub_category_id) return [];

        // Get child categories from props (already filtered by parent_id in the API)
        const subCategoryChildCategories = (childCategories || []).map((cc) => ({
            value: cc.id,
            label: cc.name,
        }));

        // Add newly created child categories for this sub-category
        const newlyCreated = newChildCategories
            .filter((cc) => cc.parent_id === data.sub_category_id)
            .map((cc) => ({
                value: cc.id || cc.name,
                label: cc.name,
            }));

        return [...subCategoryChildCategories, ...newlyCreated];
    }, [childCategories, data.sub_category_id, newChildCategories]);

    // Filter child categories based on search
    const filteredChildCategories = useMemo(() => {
        if (!childCategorySearch) return childCategoryOptionsFiltered;
        return childCategoryOptionsFiltered.filter((childcat) => childcat.label.toLowerCase().includes(childCategorySearch.toLowerCase()));
    }, [childCategoryOptionsFiltered, childCategorySearch]);

    const tagOptions = useMemo(
        () =>
            tags.map((tag) => ({
                label: tag.name,
                value: tag.slug,
            })),
        [tags],
    );

    // Handle brand change
    const handleBrandChange = (value) => {
        setData('brand_id', value);
    };

    // Handle category change
    const handleCategoryChange = (value) => {
        setData('category_id', value);
        // Clear subcategory and child category when category changes
        setData('sub_category_id', '');
        setData('child_category_id', '');
    };

    // Handle subcategory change
    const handleSubCategoryChange = (value) => {
        setData('sub_category_id', value);
        // Clear child category when subcategory changes
        setData('child_category_id', '');
    };

    // Handle child category change
    const handleChildCategoryChange = (value) => {
        setData('child_category_id', value);
    };

    const handleTagInputKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            handleAddTag(e);
        }
    };

    const removeTag = (tagToRemove) => {
        const updatedTags = Array.isArray(data.tags) ? data.tags.filter((tag) => tag !== tagToRemove) : [];
        setData('tags', updatedTags);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>General Setup</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div className="space-y-2">
                    <GlobalSelect
                        label="Brands"
                        isMulti={false}
                        options={brandOptions}
                        value={data.brand_id}
                        onChange={handleBrandChange}
                        onCreateNew={handleCreateBrand}
                        placeholder="Select or create brand..."
                    />
                </div>

                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={data.category_id ? data.category_id.toString() : ''} onValueChange={handleCategoryChange} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <div className="border-b p-2">
                                <div className="relative">
                                    <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                                    <Input
                                        placeholder="Search categories..."
                                        value={categorySearch}
                                        onChange={(e) => setCategorySearch(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                                {filteredCategories.map((item) => (
                                    <SelectItem key={item.value} value={item.value.toString()}>
                                        <div className="flex flex-col">
                                            <span>{item.label}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </div>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Sub Category</Label>
                    <Select value={data.sub_category_id ? data.sub_category_id.toString() : ''} onValueChange={handleSubCategoryChange}>
                        <SelectTrigger>
                            <SelectValue placeholder={data.category_id ? 'Select Sub Category' : 'Select a category first'} />
                        </SelectTrigger>
                        <SelectContent>
                            <div className="border-b p-2">
                                <div className="relative">
                                    <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                                    <Input
                                        placeholder="Search subcategories..."
                                        value={subCategorySearch}
                                        onChange={(e) => setSubCategorySearch(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                                {filteredSubCategories.map((subcat) => (
                                    <SelectItem key={subcat.value} value={subcat.value.toString()}>
                                        <div className="flex flex-col">
                                            <span>{subcat.label}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </div>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Child Category</Label>
                    <Select
                        value={data.child_category_id ? data.child_category_id.toString() : ''}
                        onValueChange={handleChildCategoryChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={data.sub_category_id ? 'Select Child Category' : 'Select a sub category first'} />
                        </SelectTrigger>
                        <SelectContent>
                            <div className="border-b p-2">
                                <div className="relative">
                                    <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                                    <Input
                                        placeholder="Search child categories..."
                                        value={childCategorySearch}
                                        onChange={(e) => setChildCategorySearch(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                                {filteredChildCategories.map((childcat) => (
                                    <SelectItem key={childcat.value} value={childcat.value.toString()}>
                                        {childcat.label}
                                    </SelectItem>
                                ))}
                            </div>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label>Product SKU</Label>
                        <Tooltip>
                            <TooltipTrigger>
                                <Info className="h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Leave it empty. System will generate</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Input placeholder="Leave it empty" value={data.sku || ''} onChange={(e) => setData('sku', e.target.value)} disabled />
                </div>

                <div className="space-y-2 md:col-span-5">
                    <div className="flex items-center gap-2">
                        <Label>Search tags</Label>
                        <Tooltip>
                            <TooltipTrigger>
                                <Info className="h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add the product search tag for this product that customers can use to search quickly</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    <div className="flex flex-col gap-2">
                        {/*<div className="flex gap-2">*/}
                        <GlobalSelect
                            label="Product Tags"
                            isMulti={true}
                            options={tagOptions}
                            value={data.tags}
                            onChange={(val) => setData({ ...data, tags: val })}
                            placeholder="Select or create tags..."
                        />
                        {/*</div>*/}

                        {Array.isArray(data.tags) && data.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {data.tags.map((tag, index) => (
                                    <div key={index} className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1">
                                        <span>{tag}</span>
                                        <button type="button" className="text-gray-500 hover:text-red-500" onClick={() => removeTag(tag)}>
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
