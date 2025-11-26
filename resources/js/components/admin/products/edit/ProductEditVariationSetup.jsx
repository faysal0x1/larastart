import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ProductEditVariationSetup({ data, setData, colorAttributes }) {
    // Track if component has initialized
    const [initialized, setInitialized] = useState(false);

    // Available attribute types (excluding color as it's handled separately)
    const [availableAttributes, setAvailableAttributes] = useState([]);
    const [attributeSuggestions, setAttributeSuggestions] = useState({}); // { [attrName]: [values] }

    // Local state to capture the attribute search text for creation in the popover
    const [attributeSearch, setAttributeSearch] = useState("");

    // State for selected attributes
    const [selectedAttributes, setSelectedAttributes] = useState([]);

    // State for attribute values
    const [attributeValues, setAttributeValues] = useState({});

    // State for variations
    const [variations, setVariations] = useState([]);

    // Base SKU for the product
    const [baseSku, setBaseSku] = useState(data.sku || 'PROD-');

    // Initialize component state from product data and ensure attributes available
    useEffect(() => {
        if (!initialized) {
            // Handle color initialization
            // If product has color_images, set colors_active to true and extract colors
            if (Array.isArray(data.color_images) && data.color_images.length > 0) {
                // Extract color codes from product's color_images
                const initialColors = data.color_images.map(item => item.color_attribute.code);

                // Set colors_active to true since we have colors
                if (!data.colors_active) {
                    setData('colors_active', true);
                }

                // Initialize colors array with existing color codes
                setData('colors', initialColors);
            }

            // Handle size initialization
            if (!Array.isArray(data.size)) {
                // If size is a comma-separated string (like "S,M,L,XL"), convert it to array
                if (typeof data.size === 'string' && data.size.trim() !== '') {
                    const sizeArray = data.size.split(',').map(size => size.trim());
                    setData('size', sizeArray);
                } else {
                    setData('size', []);
                }
            }

            // Initialize attributes and variations from existing data
            if (Array.isArray(data.variations) && data.variations.length > 0) {
                // Parse attributes from the first variation
                const firstVariation = data.variations[0];
                try {
                    const parsedAttributes = typeof firstVariation.attributes === 'string'
                        ? JSON.parse(firstVariation.attributes)
                        : firstVariation.attributes || {};

                    // Determine which attributes are being used
                    const usedAttributeNames = Object.keys(parsedAttributes);

                    // Ensure availableAttributes includes used names
                    setAvailableAttributes(prev => {
                        const names = new Set(prev.map(p => p.name));
                        const toAdd = usedAttributeNames
                            .filter(n => !names.has(n))
                            .map((n, i) => ({ id: Date.now() + i, name: n }));
                        return [...prev, ...toAdd];
                    });

                    // Preselect attributes
                    const usedAttributes = usedAttributeNames.map((n, i) => ({ id: Date.now() + i, name: n }));
                    setSelectedAttributes(usedAttributes);

                    // Extract attribute values from all variations
                    const valuesMap = {};
                    data.variations.forEach(variation => {
                        try {
                            const attrs = typeof variation.attributes === 'string'
                                ? JSON.parse(variation.attributes)
                                : variation.attributes || {};
                            Object.keys(attrs).forEach(attrName => {
                                if (!valuesMap[attrName]) {
                                    valuesMap[attrName] = new Set();
                                }
                                valuesMap[attrName].add(attrs[attrName]);
                            });
                        } catch (e) {
                            console.error("Error parsing variation attributes", e);
                        }
                    });

                    // Convert Sets to arrays
                    const attributeValuesObj = {};
                    Object.keys(valuesMap).forEach(attrName => {
                        attributeValuesObj[attrName] = Array.from(valuesMap[attrName]);
                    });

                    setAttributeValues(attributeValuesObj);

                    // Initialize variations
                    const formattedVariations = data.variations.map((variation, index) => ({
                        id: variation.id || index + 1,
                        name: variation.name,
                        sku: variation.sku,
                        price: parseFloat(variation.price) || 0,
                        stock: parseInt(variation.stock) || 0,
                        attributes: typeof variation.attributes === 'string'
                            ? JSON.parse(variation.attributes)
                            : variation.attributes || {}
                    }));

                    setVariations(formattedVariations);

                    // Set base SKU by removing the variation name from the first SKU
                    if (data.variations[0].sku) {
                        const firstSku = data.variations[0].sku;
                        const firstName = data.variations[0].name;
                        if (firstSku.endsWith(firstName)) {
                            setBaseSku(firstSku.slice(0, -firstName.length));
                        }
                    }
                } catch (e) {
                    console.error("Error parsing variation data", e);
                }
            }

            setInitialized(true);
        }
    }, [data.color_images, data.variations, initialized]);

    // Fetch available attribute types by scope and merge with any existing ones
    useEffect(() => {
        if (!initialized) return;
        const params = new URLSearchParams();
        if (data.category_id) params.append('category_id', data.category_id);
        if (data.subcategory_id) params.append('sub_category_id', data.subcategory_id);
        if (data.brand_id) params.append('brand_id', data.brand_id);

        fetch(`/admin/variation-types?${params.toString()}`)
            .then((res) => res.json())
            .then((types) => {
                const incoming = Array.from(new Set(types.map(t => t.name))).map((name, i) => ({ id: Date.now() + i, name }));
                setAvailableAttributes(prev => {
                    const names = new Set(prev.map(p => p.name));
                    const merged = [...prev];
                    incoming.forEach(item => { if (!names.has(item.name)) merged.push(item); });
                    // Dedup
                    const seen = new Set();
                    return merged.filter(p => { if (seen.has(p.name)) return false; seen.add(p.name); return true; });
                });
            })
            .catch(() => { });
    }, [initialized, data.brand_id, data.category_id, data.subcategory_id]);

    // Ensure suggestions are loaded for preselected attributes when scope changes
    useEffect(() => {
        if (!initialized || selectedAttributes.length === 0) return;
        selectedAttributes.forEach(attr => {
            const params = new URLSearchParams();
            params.append('name', attr.name);
            if (data.category_id) params.append('category_id', data.category_id);
            if (data.subcategory_id) params.append('sub_category_id', data.subcategory_id);
            if (data.brand_id) params.append('brand_id', data.brand_id);

            fetch(`/admin/variation-type-values?${params.toString()}`)
                .then((res) => res.json())
                .then((values) => {
                    setAttributeSuggestions((prev) => ({ ...prev, [attr.name]: Array.isArray(values) ? values : [] }));
                })
                .catch(() => {
                    setAttributeSuggestions((prev) => ({ ...prev, [attr.name]: [] }));
                });
        });
    }, [initialized, data.brand_id, data.category_id, data.subcategory_id]);

    // Toggle a color in the selection
    const toggleColor = (code) => {
        const currentColors = Array.isArray(data.colors) ? [...data.colors] : [];

        if (currentColors.includes(code)) {
            setData('colors', currentColors.filter(color => color !== code));
        } else {
            setData('colors', [...currentColors, code]);
        }
    };

    // Handler for attribute selection
    const handleAttributeSelect = (attributeName) => {
        const attribute = availableAttributes.find(attr => attr.name === attributeName);
        if (!attribute) return;

        // Toggle selection
        const isSelected = selectedAttributes.some(attr => attr.name === attribute.name);
        if (isSelected) {
            const nextSelected = selectedAttributes.filter(attr => attr.name !== attribute.name);
            setSelectedAttributes(nextSelected);
            const nextValues = { ...attributeValues };
            delete nextValues[attribute.name];
            setAttributeValues(nextValues);
        } else {
            const nextSelected = [...selectedAttributes, attribute];
            // Dedup by name
            const seen = new Set();
            const unique = [];
            for (const a of nextSelected) {
                if (!seen.has(a.name)) {
                    seen.add(a.name);
                    unique.push(a);
                }
            }
            setSelectedAttributes(unique);

            if (!attributeValues[attribute.name]) {
                setAttributeValues({
                    ...attributeValues,
                    [attribute.name]: []
                });
            }

            // Fetch suggestions for this attribute if not loaded
            if (!attributeSuggestions[attribute.name]) {
                const params = new URLSearchParams();
                params.append('name', attribute.name);
                if (data.category_id) params.append('category_id', data.category_id);
                if (data.subcategory_id) params.append('sub_category_id', data.subcategory_id);
                if (data.brand_id) params.append('brand_id', data.brand_id);

                fetch(`/admin/variation-type-values?${params.toString()}`)
                    .then((res) => res.json())
                    .then((values) => {
                        setAttributeSuggestions((prev) => ({ ...prev, [attribute.name]: Array.isArray(values) ? values : [] }));
                    })
                    .catch(() => {
                        setAttributeSuggestions((prev) => ({ ...prev, [attribute.name]: [] }));
                    });
            }
        }
    };

    // Create attribute on the fly
    const handleCreateAttribute = async (attributeName) => {
        try {
            // Optimistically add
            setAvailableAttributes((prev) => {
                if (prev.some(p => p.name === attributeName)) return prev;
                return [...prev, { id: Date.now(), name: attributeName }];
            });

            const params = new URLSearchParams();
            params.append('name', attributeName);
            if (data.category_id) params.append('category_id', data.category_id);
            if (data.subcategory_id) params.append('sub_category_id', data.subcategory_id);
            if (data.brand_id) params.append('brand_id', data.brand_id);

            const res = await fetch(`/admin/variation-types/store?${params.toString()}`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
                credentials: 'same-origin',
            });
            const json = await res.json();

            // Normalize id/name and dedupe
            setAvailableAttributes((prev) => {
                const mapped = prev.map(p => p.name === attributeName ? { id: json.id || p.id, name: json.name || attributeName } : p);
                const seen = new Set();
                return mapped.filter(p => {
                    if (seen.has(p.name)) return false;
                    seen.add(p.name);
                    return true;
                });
            });

            // Auto-select the newly created attribute
            handleAttributeSelect(attributeName);
        } catch (e) {
            console.error('Failed to create attribute', e);
        }
    };

    // Handler for adding attribute value
    const handleAddAttributeValue = (attributeName, value) => {
        if (!value.trim()) return;

        // Add value if not already added
        if (!attributeValues[attributeName] || !attributeValues[attributeName].includes(value)) {
            setAttributeValues({
                ...attributeValues,
                [attributeName]: [...(attributeValues[attributeName] || []), value]
            });
        }

        // Persist to DB
        const params = new URLSearchParams();
        params.append('name', attributeName);
        params.append('value', value);
        if (data.category_id) params.append('category_id', data.category_id);
        if (data.subcategory_id) params.append('sub_category_id', data.subcategory_id);
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
            [attributeName]: attributeValues[attributeName].filter(val => val !== value)
        });
    };

    // Generate all possible variations
    useEffect(() => {
        if (!initialized) return;

        if (selectedAttributes.length === 0) {
            setVariations([]);
            setData('variations', []);
            return;
        }

        // Check if all selected attributes have values
        const hasEmptyAttributes = selectedAttributes.some(attr =>
            !attributeValues[attr.name] || attributeValues[attr.name].length === 0
        );

        if (hasEmptyAttributes) {
            setVariations([]);
            setData('variations', []);
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
                    [currentAttr.name]: value
                };

                results = [
                    ...results,
                    ...generateVariations(attributes, currentIndex + 1, newCombination)
                ];
            }

            return results;
        };

        const newVariations = generateVariations(selectedAttributes);

        // Format variations and add price, sku, stock fields
        const formattedVariations = newVariations.map((variation, index) => {
            // Create variation name (e.g., "Large-Red-Cotton")
            const variationName = selectedAttributes
                .map(attr => variation[attr.name])
                .join('-');

            // Create SKU
            const sku = `${baseSku}${variationName}`;

            // Check if this variation already exists in the original data
            const existingVariation = data.variations?.find(v => {
                if (v.name === variationName) return true;
                try {
                    const parsed = typeof v.attributes === 'string' ? JSON.parse(v.attributes) : v.attributes;
                    return JSON.stringify(parsed) === JSON.stringify(variation);
                } catch (_) { return false; }
            });

            return {
                id: existingVariation?.id || index + 1,
                attributes: variation,
                name: variationName,
                sku: existingVariation?.sku || sku,
                price: existingVariation?.price ? parseFloat(existingVariation.price) : 0,
                stock: existingVariation?.stock ? parseInt(existingVariation.stock) : 1,
            };
        });

        setVariations(formattedVariations);

        // Update main form data with variations
        const variationsForSubmit = formattedVariations.map(v => ({
            ...v,
            attributes: JSON.stringify(v.attributes)
        }));
        setData('variations', variationsForSubmit);

        const totalStock = formattedVariations.reduce((sum, variation) => {
            return sum + (variation.stock || 0);
        }, 0);

        // Update the main quantity field
        setData('qty', totalStock);
    }, [selectedAttributes, attributeValues, baseSku, initialized]);

    // Handle change in variation data
    const handleVariationChange = (index, field, value) => {
        const updatedVariations = [...variations];
        updatedVariations[index][field] = value;
        setVariations(updatedVariations);

        // Update main form data with variations
        const variationsForSubmit = updatedVariations.map(v => ({
            ...v,
            attributes: JSON.stringify(v.attributes)
        }));
        setData('variations', variationsForSubmit);

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
        const updatedVariations = variations.map(variation => ({
            ...variation,
            sku: `${newBaseSku}${variation.name}`
        }));

        setVariations(updatedVariations);

        // Update main form data with variations
        const variationsForSubmit = updatedVariations.map(v => ({
            ...v,
            attributes: JSON.stringify(v.attributes)
        }));
        setData('variations', variationsForSubmit);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Variation Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Color Selection */}
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
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className="w-full justify-between"
                                    >
                                        {Array.isArray(data.colors) && data.colors.length > 0
                                            ? `${data.colors.length} color${data.colors.length > 1 ? 's' : ''} selected`
                                            : "Select colors"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search colors..." />
                                        <CommandEmpty>No color found.</CommandEmpty>
                                        <CommandGroup>
                                            {colorAttributes.map((color) => (
                                                <CommandItem
                                                    key={color.code}
                                                    value={color.code}
                                                    onSelect={() => toggleColor(color.code)}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            Array.isArray(data.colors) && data.colors.includes(color.code) ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="h-4 w-4 rounded-full"
                                                            style={{ backgroundColor: color.code }}
                                                        ></div>
                                                        {color.name}
                                                    </div>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            {Array.isArray(data.colors) && data.colors.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {data.colors.map(colorCode => {
                                        const colorAttribute = colorAttributes.find(c => c.code === colorCode);
                                        return (
                                            <Badge key={colorCode} variant="secondary" className="py-1 flex items-center gap-1">
                                                <div
                                                    className="h-3 w-3 rounded-full"
                                                    style={{ backgroundColor: colorCode }}
                                                ></div>
                                                {colorAttribute?.name || colorCode}
                                            </Badge>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>

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

                {/* Attribute Selection */}
                <div className="space-y-2">
                    <Label>Select Attributes</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between"
                            >
                                {selectedAttributes.length > 0
                                    ? `${selectedAttributes.length} attribute${selectedAttributes.length > 1 ? 's' : ''} selected`
                                    : "Select attributes"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput
                                    placeholder="Search or create attributes..."
                                    value={attributeSearch}
                                    onValueChange={setAttributeSearch}
                                />
                                <CommandEmpty>
                                    <div className="p-2">
                                        <Button
                                            size="sm"
                                            onClick={() => handleCreateAttribute(attributeSearch.trim())}
                                            disabled={!attributeSearch.trim()}
                                        >
                                            Create attribute "{attributeSearch.trim()}"
                                        </Button>
                                    </div>
                                </CommandEmpty>
                                <CommandGroup>
                                    {availableAttributes.map((attribute) => (
                                        <CommandItem
                                            key={attribute.name}
                                            value={attribute.name}
                                            onSelect={() => handleAttributeSelect(attribute.name)}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedAttributes.some(attr => attr.name === attribute.name)
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {attribute.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    {/* Display selected attributes */}
                    {selectedAttributes.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {selectedAttributes.map(attribute => (
                                <Badge key={attribute.name} variant="secondary" className="py-1">
                                    {attribute.name}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                {/* Attribute Values */}
                {selectedAttributes.length > 0 && (
                    <div className="space-y-4">
                        {selectedAttributes.map(attribute => (
                            <div key={attribute.name} className="space-y-2">
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
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {attributeSuggestions[attribute.name].map((value, idx) => (
                                            <Badge key={idx} variant="outline" className="cursor-pointer" onClick={() => handleAddAttributeValue(attribute.name, value)}>
                                                {value}
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                {/* Display attribute values */}
                                {attributeValues[attribute.name]?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {attributeValues[attribute.name].map((value, index) => (
                                            <Badge
                                                key={index}
                                                variant="outline"
                                                className="flex items-center gap-1"
                                            >
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
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
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
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={variation.price}
                                                    onChange={(e) => handleVariationChange(index, 'price', parseFloat(e.target.value))}
                                                    placeholder="Ex: 100"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    value={variation.sku}
                                                    onChange={(e) => handleVariationChange(index, 'sku', e.target.value)}
                                                    placeholder="Ex: PROD-001"
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
