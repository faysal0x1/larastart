import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, X, Search } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

export default function ProductEditGeneralSetup({ data, setData, categories, brands, initialSubCategories = [], initialChildCategories = [] }) {
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    const [subCategoryOptions, setSubCategoryOptions] = useState(initialSubCategories);
    const [childCategoryOptions, setChildCategoryOptions] = useState(initialChildCategories);
    const [categorySearch, setCategorySearch] = useState('');
    const [subCategorySearch, setSubCategorySearch] = useState('');
    const [childCategorySearch, setChildCategorySearch] = useState('');
    const [brandSearch, setBrandSearch] = useState('');

    // Initialize tags from data
    useEffect(() => {
        if (typeof data.tags === 'string') {
            setTags(data.tags.split(',').map(tag => tag.trim()).filter(tag => tag));
        } else if (Array.isArray(data.tags)) {
            setTags(data.tags);
        } else {
            setTags([]);
        }
    }, [data.tags]);

    // Fetch subcategories when category changes
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

    // Fetch child categories when subcategory changes
    useEffect(() => {
        if (data.subcategory_id) {
            fetch(`/admin/child-category/ajax/${data.subcategory_id}`)
                .then((res) => res.json())
                .then((data) => {
                    setChildCategoryOptions(data);
                });
        } else {
            setChildCategoryOptions([]);
        }
    }, [data.subcategory_id]);

    const handleAddTag = (e) => {
        e.preventDefault();
        const newTag = tagInput.trim();
        if (newTag && !tags.includes(newTag)) {
            const updatedTags = [...tags, newTag];
            setTags(updatedTags);
            setData('tags', updatedTags.join(',')); // Save as comma-separated string
            setTagInput('');
        }
    };

    const handleTagInputKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            handleAddTag(e);
        }
    };

    const removeTag = (tagToRemove) => {
        const updatedTags = tags.filter(tag => tag !== tagToRemove);
        setTags(updatedTags);
        setData('tags', updatedTags.join(',')); // Save as comma-separated string
    };

    // Handle category change
    const handleCategoryChange = (value) => {
        setData('category_id', value);
        // Clear subcategory and child category when category changes
        setData('subcategory_id', '');
        setData('child_category_id', '');
    };

    // Handle subcategory change
    const handleSubCategoryChange = (value) => {
        setData('subcategory_id', value);
        // Clear child category when subcategory changes
        setData('child_category_id', '');
    };

    // Handle child category change
    const handleChildCategoryChange = (value) => {
        setData('child_category_id', value);
    };

    // Filter categories based on search
    const filteredCategories = useMemo(() => {
        if (!categorySearch) return categories;
        return categories.filter(category =>
            category.name.toLowerCase().includes(categorySearch.toLowerCase())
        );
    }, [categories, categorySearch]);

    // Filter subcategories based on search
    const filteredSubCategories = useMemo(() => {
        if (!subCategorySearch) return subCategoryOptions;
        return subCategoryOptions.filter(subcat =>
            subcat.name.toLowerCase().includes(subCategorySearch.toLowerCase())
        );
    }, [subCategoryOptions, subCategorySearch]);

    // Filter child categories based on search
    const filteredChildCategories = useMemo(() => {
        if (!childCategorySearch) return childCategoryOptions;
        return childCategoryOptions.filter(childcat =>
            childcat.name.toLowerCase().includes(childCategorySearch.toLowerCase())
        );
    }, [childCategoryOptions, childCategorySearch]);

    // Filter brands based on search
    const filteredBrands = useMemo(() => {
        if (!brandSearch) return brands;
        return brands.filter(brand =>
            brand.name.toLowerCase().includes(brandSearch.toLowerCase())
        );
    }, [brands, brandSearch]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>General Setup</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">

                <div className="space-y-2">
                    <Label>Brands</Label>
                    <Select
                        value={data.brand_id ? data.brand_id.toString() : ""}
                        onValueChange={(value) => setData('brand_id', value)}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                            <div className="p-2 border-b">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search brands..."
                                        value={brandSearch}
                                        onChange={(e) => setBrandSearch(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                                {filteredBrands.map((brand) => (
                                    <SelectItem key={brand.id} value={brand.id.toString()}>
                                        {brand.name}
                                    </SelectItem>
                                ))}
                            </div>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                        value={data.category_id ? data.category_id.toString() : ""}
                        onValueChange={handleCategoryChange}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <div className="p-2 border-b">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
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
                                    <SelectItem key={item.id} value={item.id.toString()}>
                                        <div className="flex flex-col">
                                            <span>{item.name}</span>
                                            {item.children && item.children.length > 0 && (
                                                <span className="text-xs text-muted-foreground">
                                                    {item.children.length} subcategories
                                                </span>
                                            )}
                                        </div>
                                    </SelectItem>
                                ))}
                            </div>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Sub Category</Label>
                    <Select
                        value={data.subcategory_id ? data.subcategory_id.toString() : ""}
                        onValueChange={handleSubCategoryChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={data.category_id ? "Select Sub Category" : "Select a category first"} />
                        </SelectTrigger>
                        <SelectContent>
                            <div className="p-2 border-b">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
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
                                    <SelectItem key={subcat.id} value={subcat.id.toString()}>
                                        <div className="flex flex-col">
                                            <span>{subcat.name}</span>
                                            {subcat.children && subcat.children.length > 0 && (
                                                <span className="text-xs text-muted-foreground">
                                                    {subcat.children.length} child categories
                                                </span>
                                            )}
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
                        value={data.child_category_id ? data.child_category_id.toString() : ""}
                        onValueChange={handleChildCategoryChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={data.subcategory_id ? "Select Child Category" : "Select a sub category first"} />
                        </SelectTrigger>
                        <SelectContent>
                            <div className="p-2 border-b">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
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
                                    <SelectItem key={childcat.id} value={childcat.id.toString()}>
                                        {childcat.name}
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
                    <Input
                        placeholder="Leave it empty"
                        value={data.sku || ""}
                        onChange={(e) => setData('sku', e.target.value)}
                        disabled
                    />
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
                        <div className="flex gap-2">
                            <Input
                                placeholder="Type tag and press Enter"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagInputKeyDown}
                            />
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                onClick={handleAddTag}
                            >
                                Add
                            </button>
                        </div>

                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map((tag, index) => (
                                    <div key={index} className="flex items-center gap-1 bg-gray-100 rounded-full py-1 px-3">
                                        <span>{tag}</span>
                                        <button
                                            type="button"
                                            className="text-gray-500 hover:text-red-500"
                                            onClick={() => removeTag(tag)}
                                        >
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
