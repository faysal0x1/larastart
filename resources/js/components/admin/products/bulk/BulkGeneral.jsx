import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function BulkGeneral({ data, setData, categories = [], brands = [] }) {
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [childCategoryOptions, setChildCategoryOptions] = useState([]);
    const [brandSearch, setBrandSearch] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    const [subCategorySearch, setSubCategorySearch] = useState('');
    const [childCategorySearch, setChildCategorySearch] = useState('');

    useEffect(() => {
        if (data.category_id) {
            fetch(`/admin/subcategory/ajax/${data.category_id}`)
                .then((res) => res.json())
                .then((rows) => setSubCategoryOptions(rows || []))
                .catch(() => setSubCategoryOptions([]));
        } else {
            setSubCategoryOptions([]);
        }
    }, [data.category_id]);

    useEffect(() => {
        if (data.subcategory_id) {
            fetch(`/admin/child-category/ajax/${data.subcategory_id}`)
                .then((res) => res.json())
                .then((rows) => setChildCategoryOptions(rows || []))
                .catch(() => setChildCategoryOptions([]));
        } else {
            setChildCategoryOptions([]);
        }
    }, [data.subcategory_id]);

    const filteredBrands = useMemo(() => {
        if (!brandSearch) return brands;
        return brands.filter((b) => b.name.toLowerCase().includes(brandSearch.toLowerCase()));
    }, [brands, brandSearch]);

    const filteredCategories = useMemo(() => {
        if (!categorySearch) return categories;
        return categories.filter((c) => c.name.toLowerCase().includes(categorySearch.toLowerCase()));
    }, [categories, categorySearch]);

    const filteredSubCategories = useMemo(() => {
        if (!subCategorySearch) return subCategoryOptions;
        return subCategoryOptions.filter((s) => s.name.toLowerCase().includes(subCategorySearch.toLowerCase()));
    }, [subCategoryOptions, subCategorySearch]);

    const filteredChildCategories = useMemo(() => {
        if (!childCategorySearch) return childCategoryOptions;
        return childCategoryOptions.filter((c) => c.name.toLowerCase().includes(childCategorySearch.toLowerCase()));
    }, [childCategoryOptions, childCategorySearch]);

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
                <Label>Brands</Label>
                <Select value={data.brand_id ? String(data.brand_id) : undefined} onValueChange={(v) => setData('brand_id', v)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                        <div className="border-b p-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-8" placeholder="Search brands..." value={brandSearch} onChange={(e) => setBrandSearch(e.target.value)} />
                            </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                            {filteredBrands.map((b) => (
                                <SelectItem key={b.id} value={String(b.id)}>
                                    {b.name}
                                </SelectItem>
                            ))}
                        </div>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Category</Label>
                <Select value={data.category_id ? String(data.category_id) : undefined} onValueChange={(v) => setData('category_id', v)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <div className="border-b p-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-8" placeholder="Search categories..." value={categorySearch} onChange={(e) => setCategorySearch(e.target.value)} />
                            </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                            {filteredCategories.map((c) => (
                                <SelectItem key={c.id} value={String(c.id)}>
                                    {c.name}
                                </SelectItem>
                            ))}
                        </div>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Sub Category</Label>
                <Select
                    value={data.subcategory_id ? String(data.subcategory_id) : undefined}
                    onValueChange={(v) => setData('subcategory_id', v)}
                    disabled={!data.category_id}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={data.category_id ? 'Select Sub Category' : 'Select a category first'} />
                    </SelectTrigger>
                    <SelectContent>
                        <div className="border-b p-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-8" placeholder="Search subcategories..." value={subCategorySearch} onChange={(e) => setSubCategorySearch(e.target.value)} />
                            </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                            {filteredSubCategories.map((s) => (
                                <SelectItem key={s.id} value={String(s.id)}>
                                    {s.name}
                                </SelectItem>
                            ))}
                        </div>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Child Category</Label>
                <Select
                    value={data.child_category_id ? String(data.child_category_id) : undefined}
                    onValueChange={(v) => setData('child_category_id', v)}
                    disabled={!data.subcategory_id}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={data.subcategory_id ? 'Select Child Category' : 'Select a sub category first'} />
                    </SelectTrigger>
                    <SelectContent>
                        <div className="border-b p-2">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-8" placeholder="Search child categories..." value={childCategorySearch} onChange={(e) => setChildCategorySearch(e.target.value)} />
                            </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                            {filteredChildCategories.map((c) => (
                                <SelectItem key={c.id} value={String(c.id)}>
                                    {c.name}
                                </SelectItem>
                            ))}
                        </div>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
