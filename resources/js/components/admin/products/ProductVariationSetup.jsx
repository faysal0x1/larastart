import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GlobalSelect } from '@/components/GlobalSelect.jsx';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function ProductVariationSetup({ data, setData, colorAttributes }) {
    const [availableAttributes, setAvailableAttributes] = useState([]);
    const [attributeSuggestions, setAttributeSuggestions] = useState({}); // { [attrName]: [values] }

    // Initialize colors handling from existing implementation
    useEffect(() => {
        if (data.colors_active && !Array.isArray(data.colors)) {
            setData('colors', []);
        }
    }, [data.colors_active]);

    // Initialize size array
    useEffect(() => {
        if (!Array.isArray(data.size)) {
            setData('size', []);
        }
    }, []);

    const toggleColor = (code) => {
        const currentColors = Array.isArray(data.colors) ? [...data.colors] : [];

        if (currentColors.includes(code)) {
            setData(
                'colors',
                currentColors.filter((color) => color !== code),
            );
        } else {
            setData('colors', [...currentColors, code]);
        }
    };

    // State for selected attributes
    const [selectedAttributes, setSelectedAttributes] = useState([]);

    // State for attribute values
    const [attributeValues, setAttributeValues] = useState({});

    // State for variations
    const [variations, setVariations] = useState([]);


    // Base SKU for the product
    const [baseSku, setBaseSku] = useState(data.sku || 'PROD-');

    // Prepare attribute options for GlobalSelect
    const attributeOptions = useMemo(() => {
        return availableAttributes.map((attr) => ({
            value: attr.name,
            label: attr.name,
        }));
    }, [availableAttributes]);

    // Fetch available attributes based on scope
    useEffect(() => {
        const params = new URLSearchParams();
        if (data.category_id) params.append('category_id', data.category_id);
        if (data.sub_category_id) params.append('sub_category_id', data.sub_category_id);
        if (data.brand_id) params.append('brand_id', data.brand_id);

        fetch(`/admin/variation-types?${params.toString()}`)
            .then((res) => res.json())
            .then((types) => {
                const uniqueNames = Array.from(new Set(types.map((t) => t.name)));
                setAvailableAttributes(uniqueNames.map((name, i) => ({ id: i + 1, name })));
            })
            .catch(() => setAvailableAttributes([]));
    }, [data.brand_id, data.category_id, data.sub_category_id]);

    // Handler for creating a new attribute
    const handleCreateAttribute = async (attributeName, tempId) => {
        try {
            // Optimistically add to available list to avoid selection race
            setAvailableAttributes((prev) => {
                const exists = prev.some((p) => p.name === attributeName);
                return exists ? prev : [...prev, { id: Date.now(), name: attributeName }];
            });

            const params = new URLSearchParams();
            params.append('name', attributeName);
            if (data.category_id) params.append('category_id', data.category_id);
            if (data.sub_category_id) params.append('sub_category_id', data.sub_category_id);
            if (data.brand_id) params.append('brand_id', data.brand_id);

            const res = await fetch(`/admin/variation-types/store?${params.toString()}`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
                credentials: 'same-origin',
            });

            const json = await res.json();

            // Ensure availability reflects server response id/name (dedup by name)
            setAvailableAttributes((prev) => {
                const mapped = prev.map((p) => (p.name === attributeName ? { id: json.id || p.id, name: json.name || attributeName } : p));
                // also ensure only one with that name
                const seen = new Set();
                return mapped.filter((p) => {
                    if (seen.has(p.name)) return false;
                    seen.add(p.name);
                    return true;
                });
            });
        } catch (error) {
            console.error('Failed to create attribute:', error);
        }
    };

    // Handler for attribute selection using GlobalSelect
    const handleAttributeSelect = (selectedValues) => {
        // Get the actual selected attribute objects from both available and new attributes
        const newSelectedAttributes = availableAttributes
            .filter((attr) => selectedValues.includes(attr.name))
            .map((attr) => ({ id: attr.id, name: attr.name }));

        // Deduplicate by name
        const uniqueByName = [];
        const seen = new Set();
        for (const a of newSelectedAttributes) {
            if (!seen.has(a.name)) {
                seen.add(a.name);
                uniqueByName.push(a);
            }
        }
        setSelectedAttributes(uniqueByName);

        // Update attribute values to only include selected attributes
        const newAttributeValues = { ...attributeValues };

        // Remove values for deselected attributes
        Object.keys(newAttributeValues).forEach(attrName => {
            if (!newSelectedAttributes.some(attr => attr.name === attrName)) {
                delete newAttributeValues[attrName];
            }
        });

        // Initialize values for newly selected attributes
        newSelectedAttributes.forEach(attr => {
            if (!newAttributeValues[attr.name]) {
                newAttributeValues[attr.name] = [];
            }
        });

        setAttributeValues(newAttributeValues);

        // For each newly selected attribute, fetch suggestions if not loaded yet
        uniqueByName.forEach((attr) => {
            if (!attributeSuggestions[attr.name]) {
                const params = new URLSearchParams();
                params.append('name', attr.name);
                if (data.category_id) params.append('category_id', data.category_id);
                if (data.sub_category_id) params.append('sub_category_id', data.sub_category_id);
                if (data.brand_id) params.append('brand_id', data.brand_id);

                fetch(`/admin/variation-type-values?${params.toString()}`)
                    .then((res) => res.json())
                    .then((values) => {
                        setAttributeSuggestions((prev) => ({ ...prev, [attr.name]: Array.isArray(values) ? values : [] }));
                    })
                    .catch(() => {
                        setAttributeSuggestions((prev) => ({ ...prev, [attr.name]: [] }));
                    });
            }
        });
    };

    // Handler for adding attribute value
    const handleAddAttributeValue = (attributeName, value) => {
        if (!value.trim()) return;

        // Add value if not already added
        if (!attributeValues[attributeName].includes(value)) {
            setAttributeValues({
                ...attributeValues,
                [attributeName]: [...attributeValues[attributeName], value],
            });
        }

        // Persist the value in DB under the scoped attribute type
        const params = new URLSearchParams();
        params.append('name', attributeName);
        params.append('value', value);
        if (data.category_id) params.append('category_id', data.category_id);
        if (data.sub_category_id) params.append('sub_category_id', data.sub_category_id);
        if (data.brand_id) params.append('brand_id', data.brand_id);

        fetch(`/admin/variation-type-values/store?${params.toString()}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            credentials: 'same-origin',
        }).catch(() => { });
    };

    // Handler for removing attribute value
    const handleRemoveAttributeValue = (attributeName, value) => {
        setAttributeValues({
            ...attributeValues,
            [attributeName]: attributeValues[attributeName].filter((val) => val !== value),
        });
    };

    // Generate all possible variations
    useEffect(() => {
        if (selectedAttributes.length === 0) {
            setVariations([]);
            return;
        }

        // Check if all selected attributes have values
        const hasEmptyAttributes = selectedAttributes.some((attr) => !attributeValues[attr.name] || attributeValues[attr.name].length === 0);

        if (hasEmptyAttributes) {
            setVariations([]);
            return;
        }

        // Generate cartesian product of attribute values
        const generateVariations = (attributes, currentIndex = 0, currentCombination = {}) => {
            if (currentIndex === attributes.length) {
                return [currentCombination];
            }

            const currentAttr = attributes[currentIndex];
            const values = attributeValues[currentAttr.name];

            let results = [];

            for (const value of values) {
                const newCombination = {
                    ...currentCombination,
                    [currentAttr.name]: value,
                };

                results = [...results, ...generateVariations(attributes, currentIndex + 1, newCombination)];
            }

            return results;
        };

        const newVariations = generateVariations(selectedAttributes);

        // Format variations and add price, sku, stock fields
        const formattedVariations = newVariations.map((variation, index) => {
            // Create variation name (e.g., "Large-Red-Cotton")
            const variationName = selectedAttributes.map((attr) => variation[attr.name]).join('-');

            // Create SKU
            const sku = `${baseSku}${variationName}`;

            return {
                id: index + 1,
                attributes: variation,
                name: variationName,
                sku,
                price: 0,
                stock: 1,
            };
        });

        setVariations(formattedVariations);

        // Update main form data
        setData('variations', formattedVariations);

        const totalStock = formattedVariations.reduce((sum, variation) => {
            return sum + (variation.stock || 0);
        }, 0);

        // Update the main quantity field
        setData('qty', totalStock);
    }, [selectedAttributes, attributeValues, baseSku]);

    // Handle change in variation data
    const handleVariationChange = (index, field, value) => {
        const updatedVariations = [...variations];
        updatedVariations[index][field] = value;
        setVariations(updatedVariations);

        // Update main form data with variations
        setData('variations', updatedVariations);

        // Recalculate total stock whenever stock changes
        if (field === 'stock') {
            const totalStock = updatedVariations.reduce((sum, variation) => {
                return sum + (variation.stock || 0);
            }, 0);
            setData('qty', totalStock);
        }
    };

    // Handle base SKU change
    const handleBaseSkuChange = (newBaseSku) => {
        setBaseSku(newBaseSku);

        // Update all variation SKUs
        const updatedVariations = variations.map((variation) => ({
            ...variation,
            sku: `${newBaseSku}${variation.name}`,
        }));

        setVariations(updatedVariations);
        setData('variations', updatedVariations);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Variation Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Color Selection - Keep the existing implementation */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="product-color-switcher">Select Colors</Label>
                        <Switch
                            checked={data.colors_active}
                            onCheckedChange={(checked) => {
                                setData('colors_active', checked);
                                if (!checked) {
                                    setData('colors', []);
                                }
                            }}
                            id="product-color-switcher"
                        />
                    </div>

                    {data.colors_active && (
                        <div className="space-y-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" className="w-full justify-between">
                                        {data.colors?.length > 0
                                            ? `${data.colors.length} color${data.colors.length > 1 ? 's' : ''} selected`
                                            : 'Select colors'}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search colors..." />
                                        <CommandEmpty>No color found.</CommandEmpty>
                                        <CommandGroup>
                                            {colorAttributes.map((color) => (
                                                <CommandItem key={color.code} value={color.code} onSelect={() => toggleColor(color.code)}>
                                                    <Check
                                                        className={cn(
                                                            'mr-2 h-4 w-4',
                                                            data.colors?.includes(color.code) ? 'opacity-100' : 'opacity-0',
                                                        )}
                                                    />
                                                    {color.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            {data.colors?.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {data.colors.map((colorCode) => {
                                        const colorName = colorAttributes.find((c) => c.code === colorCode)?.name || colorCode;
                                        return (
                                            <Badge key={colorCode} variant="secondary" className="py-1">
                                                {colorName}
                                            </Badge>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-gray-200"></div>

                {/* Base SKU Input */}
                <div className="space-y-2">
                    <Label htmlFor="base-sku">Base SKU</Label>
                    <Input
                        id="base-sku"
                        value={baseSku}
                        onChange={(e) => handleBaseSkuChange(e.target.value)}
                        placeholder="Enter base SKU (e.g. PROD-)"
                    />
                </div>

                {/* Attribute Selection using GlobalSelect */}
                <div className="space-y-2">
                    <Label>Select Attributes</Label>
                    <GlobalSelect
                        isMulti={true}
                        options={attributeOptions}
                        value={selectedAttributes.map(attr => attr.name)}
                        onChange={handleAttributeSelect}
                        onCreateNew={handleCreateAttribute}
                        placeholder="Select or create attributes..."
                    />

                    {/* Display selected attributes */}
                    {selectedAttributes.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {selectedAttributes.map((attribute) => (
                                <Badge key={attribute.id} variant="secondary" className="py-1">
                                    {attribute.name}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                {/* Attribute Values */}
                {selectedAttributes.length > 0 && (
                    <div className="space-y-4">
                        {selectedAttributes.map((attribute) => (
                            <div key={attribute.id} className="space-y-2">
                                <Label>{attribute.name} Values</Label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder={`Enter ${attribute.name} value and press Enter`}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddAttributeValue(attribute.name, e.target.value);
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        onClick={(e) => {
                                            const input = e.target.previousElementSibling;
                                            handleAddAttributeValue(attribute.name, input.value);
                                            input.value = '';
                                        }}
                                    >
                                        Add
                                    </Button>
                                </div>

                                {/* Suggestions from DB */}
                                {Array.isArray(attributeSuggestions[attribute.name]) && attributeSuggestions[attribute.name].length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {attributeSuggestions[attribute.name].map((value, idx) => (
                                            <Badge key={idx} variant="outline" className="cursor-pointer" onClick={() => handleAddAttributeValue(attribute.name, value)}>
                                                {value}
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                {/* Display attribute values */}
                                {attributeValues[attribute.name]?.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {attributeValues[attribute.name].map((value, index) => (
                                            <Badge key={index} variant="outline" className="flex items-center gap-1">
                                                {value}
                                                <X
                                                    className="h-3 w-3 cursor-pointer"
                                                    onClick={() => handleRemoveAttributeValue(attribute.name, value)}
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Variations Table */}
                {variations.length > 0 && (
                    <div className="space-y-4">
                        <Label>Variation Combinations</Label>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>SL</TableHead>
                                        <TableHead>Attribute Variation</TableHead>
                                        <TableHead>Variation Price ($)</TableHead>
                                        <TableHead>SKU</TableHead>
                                        <TableHead>Stock</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {variations.map((variation, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{variation.id}</TableCell>
                                            <TableCell>
                                                <Label>{variation.name}</Label>
                                                <input type="hidden" name={`type[]`} value={variation.name} />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={variation.price}
                                                    onChange={(e) => handleVariationChange(index, 'price', parseFloat(e.target.value))}
                                                    placeholder="Ex: 100"
                                                    name={`price_${variation.name}`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    value={variation.sku}
                                                    onChange={(e) => handleVariationChange(index, 'sku', e.target.value)}
                                                    placeholder="Ex: PROD-001"
                                                    name={`sku_${variation.name}`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    step="1"
                                                    value={variation.stock}
                                                    onChange={(e) => handleVariationChange(index, 'stock', parseInt(e.target.value))}
                                                    placeholder="Ex: 5"
                                                    name={`qty_${variation.name}`}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
