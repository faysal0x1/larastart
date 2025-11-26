import BulkGeneral from '@/components/admin/products/bulk/BulkGeneral.jsx';
import BulkPricing from '@/components/admin/products/bulk/BulkPricing.jsx';
import BulkCallForPrice from '@/components/admin/products/bulk/BulkCallForPrice.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import AppLayout from '@/layouts/app-layout.jsx';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { Search, X, Loader2, AlertCircle, CheckSquare, Package, ChevronDown, ChevronLeft, ChevronRight, CheckCircle, Check } from 'lucide-react';

export default function ProductBulkEdit() {
    const { flash, errors: pageErrors } = usePage().props;
    const { brands = [], categories = [] } = usePage().props;
    const [products, setProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [loadError, setLoadError] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const dropdownRef = useRef(null);

    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [selectedProductsInfo, setSelectedProductsInfo] = useState({}); // Store product info for selected items
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [totalProducts, setTotalProducts] = useState(0);
    const [expandedProducts, setExpandedProducts] = useState({});
    const searchTimeoutRef = useRef(null);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [brandOpen, setBrandOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const popoverContentRef = useRef(null);

    // Per-product form state keyed by product id
    const { data, setData, post, processing, errors, reset } = useForm({
        updates: {},
    });

    const ensureProductState = useCallback((id) => {
        const p = products.find((x) => x.id === id);
        if (!p) return;

        setData('updates', (prev) => ({
            ...prev,
            [id]: prev[id] ?? {
                brand_id: p.brand_id || undefined,
                category_id: p.category_id || undefined,
                subcategory_id: p.subcategory_id || undefined,
                child_category_id: p.child_category_id || undefined,
                unit_price: p.unit_price || '',
                qty: p.qty || '',
                discount_type: p.discount_type || 'flat',
                discount_price: p.discount_price || '',
                call_for_price: p.call_for_price ?? false,
            },
        }));
    }, [products, setData]);

    const toggleProduct = useCallback((id) => {
        setSelectedProductIds((prev) => {
            const isSelected = prev.includes(id);
            if (isSelected) {
                // Remove from selection
                setSelectedProductsInfo((info) => {
                    const newInfo = { ...info };
                    delete newInfo[id];
                    return newInfo;
                });
                return prev.filter((pid) => pid !== id);
            }
            // Add to selection - store product info
            const product = products.find((p) => p.id === id);
            if (product) {
                setSelectedProductsInfo((info) => ({
                    ...info,
                    [id]: product,
                }));
            }
            ensureProductState(id);
            return [...prev, id];
        });
    }, [ensureProductState, products]);

    const toggleExpanded = useCallback((id) => {
        setExpandedProducts((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    }, []);

    // Debounce search query
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1); // Reset to first page on new search
        }, 300);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery]);

    const filteredProducts = useMemo(() => products, [products]);

    const allFilteredSelected = useMemo(() => {
        if (filteredProducts.length === 0) return false;
        return filteredProducts.every((p) => selectedProductIds.includes(p.id));
    }, [selectedProductIds, filteredProducts]);

    const toggleAll = useCallback(() => {
        if (filteredProducts.length === 0) return;

        if (allFilteredSelected) {
            // Deselect all filtered products
            setSelectedProductIds((prev) => {
                const toRemove = prev.filter((id) => filteredProducts.some((p) => p.id === id));
                setSelectedProductsInfo((info) => {
                    const newInfo = { ...info };
                    toRemove.forEach(id => delete newInfo[id]);
                    return newInfo;
                });
                return prev.filter((id) => !filteredProducts.some((p) => p.id === id));
            });
        } else {
            // Select all filtered products
            const idsToAdd = filteredProducts
                .filter((p) => !selectedProductIds.includes(p.id));

            idsToAdd.forEach((product) => {
                ensureProductState(product.id);
                setSelectedProductsInfo((info) => ({
                    ...info,
                    [product.id]: product,
                }));
            });
            setSelectedProductIds((prev) => [...prev, ...idsToAdd.map(p => p.id)]);
        }
    }, [filteredProducts, allFilteredSelected, selectedProductIds, ensureProductState]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedProductIds.length === 0) {
            return;
        }

        // Build updates array from selected ids only
        const updates = selectedProductIds.map((id) => {
            const prodData = data.updates?.[id] || {};
            const updateData = {
                product_id: id,
            };

            // Only include fields that have been modified
            if (prodData.brand_id !== undefined) updateData.brand_id = prodData.brand_id;
            if (prodData.category_id !== undefined) updateData.category_id = prodData.category_id;
            if (prodData.subcategory_id !== undefined) updateData.subcategory_id = prodData.subcategory_id;
            if (prodData.child_category_id !== undefined) updateData.child_category_id = prodData.child_category_id;
            if (prodData.unit_price !== '' && prodData.unit_price !== undefined) updateData.unit_price = prodData.unit_price;
            if (prodData.qty !== '' && prodData.qty !== undefined) updateData.qty = prodData.qty;
            if (prodData.discount_type !== undefined) updateData.discount_type = prodData.discount_type;
            if (prodData.discount_price !== '' && prodData.discount_price !== undefined) updateData.discount_price = prodData.discount_price;
            if (prodData.call_for_price !== undefined) updateData.call_for_price = prodData.call_for_price;

            return updateData;
        });

        router.post(route('product.bulk.update'), { updates }, {
            preserveScroll: true,
            onSuccess: () => {
                // State will be reset by the page reload
                setSelectedProductIds([]);
                setSelectedProductsInfo({});
                setExpandedProducts({});
                reset();
            },
            onError: (errors) => {
                console.error('Bulk update errors:', errors);
            },
        });
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    const removeProduct = useCallback((id) => {
        setSelectedProductIds((prev) => prev.filter((pid) => pid !== id));
        setSelectedProductsInfo((info) => {
            const newInfo = { ...info };
            delete newInfo[id];
            return newInfo;
        });
    }, []);

    // Load products with pagination and search
    const loadProductsAsync = useCallback(async (page = 1, append = false) => {
        if (isLoadingProducts) return;

        let isMounted = true;

        try {
            setIsLoadingProducts(true);
            setLoadError(null);

            const params = new URLSearchParams({
                page: page.toString(),
                limit: '100', // Load 100 at a time
                search: debouncedSearch || '',
            });

            // Add filter parameters
            if (selectedBrand) {
                params.append('brand_id', selectedBrand);
            }
            if (selectedCategory) {
                params.append('category_id', selectedCategory);
            }

            const response = await fetch(`/admin/product/all?${params}`);

            if (!response.ok) {
                throw new Error(`Failed to load products: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();

            if (isMounted) {
                if (result.data && Array.isArray(result.data)) {
                    setProducts(prev => append ? [...prev, ...result.data] : result.data);
                    setTotalProducts(result.total || 0);
                    setHasMore(result.has_more || false);
                    setCurrentPage(page);
                } else {
                    throw new Error('Invalid response format');
                }
            }
        } catch (error) {
            console.error('Failed to load products:', error);
            if (isMounted) {
                setProducts([]);
                setLoadError(error.message);
            }
        } finally {
            if (isMounted) {
                setIsLoadingProducts(false);
            }
        }
    }, [debouncedSearch, isLoadingProducts, selectedBrand, selectedCategory]);

    // Load products when search or filters change
    useEffect(() => {
        if (isDropdownOpen) {
            loadProductsAsync(1, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch, isDropdownOpen, selectedBrand, selectedCategory]);

    // Reset to first page when filters change
    useEffect(() => {
        if (isDropdownOpen) {
            setCurrentPage(1);
        }
    }, [selectedBrand, selectedCategory, isDropdownOpen]);

    // Open dropdown and load products if needed
    const handleDropdownToggle = useCallback(() => {
        if (!isDropdownOpen) {
            setIsDropdownOpen(true);
            loadProductsAsync(1, false);
        } else {
            setIsDropdownOpen(false);
        }
    }, [isDropdownOpen, loadProductsAsync]);

    const loadMoreProducts = useCallback(() => {
        if (!isLoadingProducts && hasMore) {
            loadProductsAsync(currentPage + 1, true);
        }
    }, [currentPage, hasMore, isLoadingProducts, loadProductsAsync]);

    // Close dropdown when clicking outside (but not when popovers are open)
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Don't close if a popover is open
            if (brandOpen || categoryOpen) {
                return;
            }

            // Check if click is outside the dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Also check if click is on popover content
                const popoverContent = document.querySelector('[role="dialog"]');
                if (!popoverContent || !popoverContent.contains(event.target)) {
                    setIsDropdownOpen(false);
                }
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen, brandOpen, categoryOpen]);

    return (
        <AppLayout>
            <Head title="Bulk Edit Products" />
            <div className="container mx-auto space-y-6 px-4 py-6 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Bulk Edit Products</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Select and update multiple products at once
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit(route('product.index'))}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            form="bulk-edit-form"
                            disabled={processing || selectedProductIds.length === 0}
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <CheckSquare className="mr-2 h-4 w-4" />
                                    Update {selectedProductIds.length} product{selectedProductIds.length !== 1 ? 's' : ''}
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Success Message */}
                {flash?.success && (
                    <Alert variant="default" className="border-green-500 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                            {flash.success}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Error Message */}
                {(flash?.error || loadError) && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{flash?.error || loadError}</AlertDescription>
                    </Alert>
                )}

                {/* Form Errors */}
                {(Object.keys(errors).length > 0 || Object.keys(pageErrors).length > 0) && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            <div className="space-y-1">
                                <p className="font-semibold">Please fix the errors before submitting:</p>
                                <ul className="list-disc list-inside ml-2 space-y-1">
                                    {Object.entries(pageErrors).map(([key, value]) => (
                                        <li key={key}>{key}: {Array.isArray(value) ? value.join(', ') : value}</li>
                                    ))}
                                    {Object.entries(errors).map(([key, value]) => (
                                        <li key={key}>{key}: {Array.isArray(value) ? value.join(', ') : value}</li>
                                    ))}
                                </ul>
                            </div>
                        </AlertDescription>
                    </Alert>
                )}

                <form id="bulk-edit-form" className="space-y-6" onSubmit={handleSubmit}>
                    {/* Product Selection Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                Select Products
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="relative" ref={dropdownRef}>
                                {/* Selected Products Display */}
                                {selectedProductIds.length > 0 && (
                                    <div className="mb-3 flex flex-wrap gap-2 p-3 border rounded-lg bg-muted/30">
                                        {selectedProductIds.map((id) => {
                                            const product = selectedProductsInfo[id];
                                            if (!product) return null;
                                            return (
                                                <div
                                                    key={id}
                                                    className="flex items-center gap-2 bg-background border rounded-md px-3 py-1.5 text-sm"
                                                >
                                                    {product.thumbnail_url && (
                                                        <img
                                                            src={product.thumbnail_url}
                                                            alt={product.name}
                                                            className="h-5 w-5 rounded object-cover"
                                                        />
                                                    )}
                                                    <span className="font-medium">{product.name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeProduct(id);
                                                        }}
                                                        className="ml-1 hover:text-destructive"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Select2-style Trigger Button */}
                                <div
                                    className="relative"
                                    onClick={handleDropdownToggle}
                                >
                                    <button
                                        type="button"
                                        className="w-full px-4 py-3 border rounded-lg text-left flex items-center justify-between bg-background hover:bg-muted/50 transition-colors"
                                    >
                                        <span className="text-muted-foreground">
                                            {selectedProductIds.length > 0
                                                ? `${selectedProductIds.length} product${selectedProductIds.length !== 1 ? 's' : ''} selected`
                                                : 'Click to select products...'}
                                        </span>
                                        <ChevronDown
                                            className={`h-4 w-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {/* Dropdown Panel */}
                                    {isDropdownOpen && (
                                        <div className="absolute z-50 w-full mt-2 bg-background border rounded-lg shadow-lg">
                                            {/* Filters */}
                                            <div className="p-3 border-b bg-muted/20">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs font-semibold text-muted-foreground uppercase">Filters</span>
                                                    {(selectedBrand || selectedCategory) && (
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedBrand('');
                                                                setSelectedCategory('');
                                                            }}
                                                            className="text-xs text-primary hover:underline"
                                                        >
                                                            Clear Filters
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {/* Brand Filter - Searchable */}
                                                    <div onClick={(e) => e.stopPropagation()}>
                                                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Brand</label>
                                                        <Popover open={brandOpen} onOpenChange={setBrandOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    aria-expanded={brandOpen}
                                                                    className="w-full justify-between h-9 text-sm"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    onMouseDown={(e) => e.stopPropagation()}
                                                                >
                                                                    {selectedBrand
                                                                        ? brands.find((brand) => brand.id == selectedBrand)?.name || 'Select brand...'
                                                                        : 'All Brands'}
                                                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-[200px] p-0" align="start" side="bottom" onOpenAutoFocus={(e) => e.preventDefault()}>
                                                                <Command>
                                                                    <CommandInput placeholder="Search brand..." />
                                                                    <CommandList>
                                                                        <CommandEmpty>No brand found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            <CommandItem
                                                                                key="all"
                                                                                value=""
                                                                                onSelect={() => {
                                                                                    setSelectedBrand('');
                                                                                    setBrandOpen(false);
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={`mr-2 h-4 w-4 ${!selectedBrand ? 'opacity-100' : 'opacity-0'}`}
                                                                                />
                                                                                All Brands
                                                                            </CommandItem>
                                                                            {brands.map((brand) => (
                                                                                <CommandItem
                                                                                    key={brand.id}
                                                                                    value={brand.name}
                                                                                    onSelect={() => {
                                                                                        setSelectedBrand(String(brand.id));
                                                                                        setBrandOpen(false);
                                                                                    }}
                                                                                >
                                                                                    <Check
                                                                                        className={`mr-2 h-4 w-4 ${selectedBrand == brand.id ? 'opacity-100' : 'opacity-0'}`}
                                                                                    />
                                                                                    {brand.name}
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </CommandList>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                    {/* Category Filter - Searchable */}
                                                    <div onClick={(e) => e.stopPropagation()}>
                                                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
                                                        <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    aria-expanded={categoryOpen}
                                                                    className="w-full justify-between h-9 text-sm"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    onMouseDown={(e) => e.stopPropagation()}
                                                                >
                                                                    {selectedCategory
                                                                        ? categories.find((category) => category.id == selectedCategory)?.name || 'Select category...'
                                                                        : 'All Categories'}
                                                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-[200px] p-0" align="start" side="bottom" onOpenAutoFocus={(e) => e.preventDefault()}>
                                                                <Command>
                                                                    <CommandInput placeholder="Search category..." />
                                                                    <CommandList>
                                                                        <CommandEmpty>No category found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            <CommandItem
                                                                                key="all"
                                                                                value=""
                                                                                onSelect={() => {
                                                                                    setSelectedCategory('');
                                                                                    setCategoryOpen(false);
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={`mr-2 h-4 w-4 ${!selectedCategory ? 'opacity-100' : 'opacity-0'}`}
                                                                                />
                                                                                All Categories
                                                                            </CommandItem>
                                                                            {categories.map((category) => (
                                                                                <CommandItem
                                                                                    key={category.id}
                                                                                    value={category.name}
                                                                                    onSelect={() => {
                                                                                        setSelectedCategory(String(category.id));
                                                                                        setCategoryOpen(false);
                                                                                    }}
                                                                                >
                                                                                    <Check
                                                                                        className={`mr-2 h-4 w-4 ${selectedCategory == category.id ? 'opacity-100' : 'opacity-0'}`}
                                                                                    />
                                                                                    {category.name}
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </CommandList>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Search in Dropdown */}
                                            <div className="p-3 border-b sticky top-0 bg-background">
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        type="text"
                                                        placeholder="Search products by name or SKU..."
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        className="pl-10 pr-10"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    {searchQuery && (
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                clearSearch();
                                                            }}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Product List in Dropdown */}
                                            <div className="max-h-96 overflow-y-auto">
                                                {isLoadingProducts ? (
                                                    <div className="flex flex-col items-center justify-center py-12">
                                                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
                                                        <div className="text-sm text-muted-foreground">Loading products...</div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {/* Select All Header */}
                                                        <div className="sticky top-0 bg-muted/50 px-4 py-3 border-b flex items-center gap-3 z-10">
                                                            <input
                                                                type="checkbox"
                                                                checked={allFilteredSelected && filteredProducts.length > 0}
                                                                onChange={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleAll();
                                                                }}
                                                                disabled={filteredProducts.length === 0}
                                                                className="rounded h-4 w-4 cursor-pointer"
                                                            />
                                                            <label
                                                                className="text-sm font-medium cursor-pointer flex-1"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleAll();
                                                                }}
                                                            >
                                                                {allFilteredSelected && filteredProducts.length > 0 ? 'Deselect All' : 'Select All'}
                                                                {searchQuery && (
                                                                    <span className="text-muted-foreground ml-1">
                                                                        ({filteredProducts.length} filtered)
                                                                    </span>
                                                                )}
                                                            </label>
                                                            <span className="text-xs font-medium text-muted-foreground">
                                                                {selectedProductIds.length} selected
                                                            </span>
                                                        </div>

                                                        {/* Product Items */}
                                                        {filteredProducts.length > 0 ? (
                                                            <>
                                                                <div className="divide-y max-h-96 overflow-y-auto">
                                                                    {filteredProducts.map((product) => (
                                                                        <div
                                                                            key={product.id}
                                                                            className={`flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors ${selectedProductIds.includes(product.id) ? 'bg-muted/30' : ''
                                                                                }`}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                toggleProduct(product.id);
                                                                            }}
                                                                        >
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={selectedProductIds.includes(product.id)}
                                                                                onChange={(e) => {
                                                                                    e.stopPropagation();
                                                                                    toggleProduct(product.id);
                                                                                }}
                                                                                onClick={(e) => e.stopPropagation()}
                                                                                className="rounded h-4 w-4 cursor-pointer"
                                                                            />
                                                                            {product.thumbnail_url ? (
                                                                                <img
                                                                                    src={product.thumbnail_url}
                                                                                    alt={product.name}
                                                                                    className="h-10 w-10 rounded object-cover flex-shrink-0 border"
                                                                                />
                                                                            ) : (
                                                                                <div className="h-10 w-10 rounded bg-muted flex items-center justify-center flex-shrink-0 border">
                                                                                    <Package className="h-5 w-5 text-muted-foreground" />
                                                                                </div>
                                                                            )}
                                                                            <div className="flex-1 min-w-0">
                                                                                <div className="text-sm font-medium truncate">{product.name}</div>
                                                                                {product.sku && (
                                                                                    <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                {hasMore && (
                                                                    <div className="p-3 border-t bg-background">
                                                                        <Button
                                                                            type="button"
                                                                            variant="outline"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                loadMoreProducts();
                                                                            }}
                                                                            disabled={isLoadingProducts}
                                                                            className="w-full"
                                                                        >
                                                                            {isLoadingProducts ? (
                                                                                <>
                                                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                                    Loading more...
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <ChevronDown className="mr-2 h-4 w-4" />
                                                                                    Load More Products
                                                                                </>
                                                                            )}
                                                                        </Button>
                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center py-12">
                                                                <Package className="h-12 w-12 text-muted-foreground mb-2" />
                                                                <div className="text-sm font-medium text-muted-foreground">
                                                                    {searchQuery ? 'No products found' : 'No products available'}
                                                                </div>
                                                                {searchQuery && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            clearSearch();
                                                                        }}
                                                                        className="text-xs text-primary hover:underline mt-1"
                                                                    >
                                                                        Clear search
                                                                    </button>
                                                                )}
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Edit Selected Products */}
                    {selectedProductIds.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>Edit Selected Products ({selectedProductIds.length})</span>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                const newExpanded = {};
                                                selectedProductIds.forEach(id => {
                                                    newExpanded[id] = true;
                                                });
                                                setExpandedProducts(newExpanded);
                                            }}
                                        >
                                            Expand All
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setExpandedProducts({})}
                                        >
                                            Collapse All
                                        </Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {selectedProductIds.map((id) => {
                                    const product = selectedProductsInfo[id];
                                    if (!product) return null;

                                    const prodData = data.updates?.[id] || {};
                                    const isExpanded = expandedProducts[id] || false;

                                    const setProdData = (key, value) => {
                                        setData('updates', {
                                            ...data.updates,
                                            [id]: {
                                                ...(data.updates?.[id] || {}),
                                                [key]: value,
                                            },
                                        });
                                    };

                                    const setProdDataMultiple = (updates) => {
                                        setData('updates', {
                                            ...data.updates,
                                            [id]: {
                                                ...(data.updates?.[id] || {}),
                                                ...updates,
                                            },
                                        });
                                    };

                                    return (
                                        <div key={id} className="rounded-lg border bg-card">
                                            <div className="flex items-start justify-between p-4 border-b bg-muted/30">
                                                <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onClick={() => toggleExpanded(id)}>
                                                    <ChevronDown
                                                        className={`h-4 w-4 text-muted-foreground transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                                                    />
                                                    {product.thumbnail_url ? (
                                                        <img
                                                            src={product.thumbnail_url}
                                                            alt={product.name}
                                                            className="h-12 w-12 rounded object-cover flex-shrink-0 border"
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-12 rounded bg-muted flex items-center justify-center flex-shrink-0 border">
                                                            <Package className="h-6 w-6 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold truncate">{product.name}</div>
                                                        {product.sku && (
                                                            <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeProduct(id);
                                                    }}
                                                    className="flex-shrink-0"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            {isExpanded && (
                                                <div className="p-4 space-y-6">
                                                    <div>
                                                        <h4 className="text-sm font-medium mb-3">General Information</h4>
                                                        <BulkGeneral
                                                            key={`general-${id}`}
                                                            data={{
                                                                brand_id: prodData.brand_id || undefined,
                                                                category_id: prodData.category_id || undefined,
                                                                subcategory_id: prodData.subcategory_id || undefined,
                                                                child_category_id: prodData.child_category_id || undefined,
                                                            }}
                                                            setData={(key, value) => {
                                                                // Normalize empty strings to undefined for Select components
                                                                const normalizedValue = value === '' ? undefined : value;

                                                                // Clear dependent fields when parent changes
                                                                if (key === 'category_id') {
                                                                    setProdDataMultiple({
                                                                        category_id: normalizedValue,
                                                                        subcategory_id: undefined,
                                                                        child_category_id: undefined
                                                                    });
                                                                } else if (key === 'subcategory_id') {
                                                                    setProdDataMultiple({
                                                                        subcategory_id: normalizedValue,
                                                                        child_category_id: undefined
                                                                    });
                                                                } else {
                                                                    setProdData(key, normalizedValue);
                                                                }
                                                            }}
                                                            categories={categories}
                                                            brands={brands}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium mb-3">Pricing & Stock</h4>
                                                        <BulkPricing
                                                            key={`pricing-${id}`}
                                                            data={{
                                                                unit_price: prodData.unit_price || '',
                                                                qty: prodData.qty || '',
                                                                discount_type: prodData.discount_type || 'flat',
                                                                discount_price: prodData.discount_price || '',
                                                            }}
                                                            setData={setProdData}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium mb-3">Call for Price</h4>
                                                        <BulkCallForPrice
                                                            key={`call-for-price-${id}`}
                                                            data={{
                                                                call_for_price: prodData.call_for_price || false,
                                                            }}
                                                            setData={setProdData}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    )}
                </form>
            </div>
        </AppLayout>
    );
}
