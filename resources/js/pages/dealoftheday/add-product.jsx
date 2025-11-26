import AppLayout from '@/layouts/app-layout.jsx';
import { Calendar, DollarSign, Package, Plus, Search, Tag, X, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';

const AddProductToDeal = ({ dealoftheday, products, addedProducts }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [productDetails, setProductDetails] = useState({});
    const [editingProduct, setEditingProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        product_ids: [],
        quantities: {},
        prices: {},
        discount_types: {},
        discounts: {},
    });

    const { data: editData, setData: setEditData, put: updateProduct, processing: updateProcessing, errors: editErrors, reset: resetEdit } = useForm({
        quantity: 1,
        price: 0,
        discount_type: 'percentage',
        discount: 0,
    });

    const handleProductSelect = (product) => {
        setSelectedProducts((prev) => {
            const isSelected = prev.some((p) => p.id === product.id);
            if (isSelected) {
                // Remove product
                const newSelected = prev.filter((p) => p.id !== product.id);
                const newProductIds = newSelected.map(p => p.id);
                const newQuantities = { ...data.quantities };
                const newPrices = { ...data.prices };
                const newDiscountTypes = { ...data.discount_types };
                const newDiscounts = { ...data.discounts };

                delete newQuantities[product.id];
                delete newPrices[product.id];
                delete newDiscountTypes[product.id];
                delete newDiscounts[product.id];

                setData({
                    ...data,
                    product_ids: newProductIds,
                    quantities: newQuantities,
                    prices: newPrices,
                    discount_types: newDiscountTypes,
                    discounts: newDiscounts,
                });

                return newSelected;
            } else {
                // Add product with default values
                const newSelected = [...prev, product];
                const newProductIds = newSelected.map(p => p.id);

                setData({
                    ...data,
                    product_ids: newProductIds,
                    quantities: {
                        ...data.quantities,
                        [product.id]: 1
                    },
                    prices: {
                        ...data.prices,
                        [product.id]: product.unit_price || 0
                    },
                    discount_types: {
                        ...data.discount_types,
                        [product.id]: 'percentage'
                    },
                    discounts: {
                        ...data.discounts,
                        [product.id]: 0
                    }
                });

                return newSelected;
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedProducts.length === 0) {
            alert('Please select at least one product');
            return;
        }

        // Convert form data to arrays for backend
        const formData = {
            product_ids: data.product_ids,
            quantities: data.product_ids.map(id => data.quantities[id] || 1),
            prices: data.product_ids.map(id => data.prices[id] || 0),
            discount_types: data.product_ids.map(id => data.discount_types[id] || 'percentage'),
            discounts: data.product_ids.map(id => data.discounts[id] || 0),
        };

        setData(formData);

        post(route('deal-of-the-day.store-products', dealoftheday.id), {
            onSuccess: () => {
                setSelectedProducts([]);
                reset();
            },
            onError: (errors) => {
                console.error('Form errors:', errors);
            }
        });
    };

    const updateProductDetail = (productId, field, value) => {
        setData({
            ...data,
            [field]: {
                ...data[field],
                [productId]: value
            }
        });
    };

    const handleEditProduct = (addedProduct) => {
        setEditingProduct(addedProduct);
        setEditData({
            quantity: addedProduct.quantity,
            price: addedProduct.price,
            discount_type: addedProduct.discount_type,
            discount: addedProduct.discount,
        });
        setShowEditModal(true);
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        updateProduct(route('deal-of-the-day.update-product', [dealoftheday.id, editingProduct.product_id]), {
            onSuccess: () => {
                setShowEditModal(false);
                setEditingProduct(null);
                resetEdit();
            }
        });
    };

    const handleRemoveProduct = (productId) => {
        if (confirm('Are you sure you want to remove this product from the deal?')) {
            router.delete(route('deal-of-the-day.remove-product', [dealoftheday.id, productId]));
        }
    };

    // Get IDs of already added products
    const addedProductIds = addedProducts.map(ap => ap.product_id);

    const filteredProducts = products.filter(
        (product) => {
            // Filter out already added products
            if (addedProductIds.includes(product.id)) {
                return false;
            }

            // Apply search filter
            return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand?.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
    );

    return (
        <AppLayout>
            <div className="mx-auto min-h-screen max-w-7xl bg-gray-50 p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">Add Products to Deal</h1>
                    <p className="text-gray-600">Select products to add to your deal of the day campaign</p>
                </div>

                {/* Added Products Section */}
                {addedProducts.length > 0 && (
                    <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Currently Added Products</h3>
                        <div className="space-y-4">
                            {addedProducts.map((addedProduct) => {
                                const product = addedProduct.product;
                                const discountedPrice = addedProduct.discount_type === 'fixed'
                                    ? addedProduct.price - addedProduct.discount
                                    : addedProduct.price - (addedProduct.price * addedProduct.discount / 100);

                                return (
                                    <div key={addedProduct.id} className="flex items-center gap-4 rounded-lg border border-gray-200 p-4">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                            <img
                                                src={product.media?.[0]?.original_url || product.image_url || '/placeholder-image.jpg'}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                                            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                                            <div className="mt-1 flex items-center gap-4 text-sm">
                                                <span className="text-gray-500">Qty: {addedProduct.quantity}</span>
                                                <span className="text-gray-500">Original: ${addedProduct.price}</span>
                                                <span className="font-medium text-green-600">
                                                    Final: ${discountedPrice.toFixed(2)}
                                                </span>
                                                <span className="text-gray-500">
                                                    Discount: {addedProduct.discount}{addedProduct.discount_type === 'percentage' ? '%' : '$'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditProduct(addedProduct)}
                                                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                                title="Edit Product"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleRemoveProduct(addedProduct.product_id)}
                                                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                                title="Remove Product"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Error Messages */}
                {Object.keys(errors).length > 0 && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Please fix the following errors:</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <ul className="list-disc list-inside space-y-1">
                                        {Object.entries(errors).map(([key, value]) => (
                                            <li key={key}>{value}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Deal Information Card */}
                <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                    <div className="flex items-start gap-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            <img src={dealoftheday.image_url || dealoftheday.media?.[0]?.original_url} alt={dealoftheday.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">{dealoftheday.title}</h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="h-5 w-5 text-blue-500" />
                                    <div>
                                        <p className="text-sm font-medium">Start Date</p>
                                        <p className="text-sm">{new Date(dealoftheday.start_date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="h-5 w-5 text-red-500" />
                                    <div>
                                        <p className="text-sm font-medium">End Date</p>
                                        <p className="text-sm">{new Date(dealoftheday.end_date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Tag className="h-5 w-5 text-green-500" />
                                    <div>
                                        <p className="text-sm font-medium">Discount</p>
                                        <p className="text-sm font-bold text-green-600">{dealoftheday.discount}% OFF</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Selected Products Summary */}
                {selectedProducts.length > 0 && (
                    <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-blue-600" />
                                <span className="font-medium text-blue-900">{selectedProducts.length} product(s) selected</span>
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? (
                                    <>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4" />
                                        Add to Deal
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Selected Products Details */}
                {selectedProducts.length > 0 && (
                    <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Selected Products Configuration</h3>
                        <div className="space-y-4">
                            {selectedProducts.map((product) => {
                                const quantity = data.quantities[product.id] || 1;
                                const price = data.prices[product.id] || product.unit_price || 0;
                                const discountType = data.discount_types[product.id] || 'percentage';
                                const discount = data.discounts[product.id] || 0;

                                const discountedPrice = discountType === 'fixed'
                                    ? price - discount
                                    : price - (price * discount / 100);

                                return (
                                    <div key={product.id} className="flex items-center gap-4 rounded-lg border border-gray-200 p-4">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                            <img
                                                src={product.media?.[0]?.original_url || product.image_url || '/placeholder-image.jpg'}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                                            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                                            <div className="mt-1 flex items-center gap-2">
                                                <span className="text-sm text-gray-500">Original: ${price}</span>
                                                <span className="text-sm font-medium text-green-600">
                                                    Final: ${discountedPrice.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={quantity}
                                                    onChange={(e) => updateProductDetail(product.id, 'quantities', parseInt(e.target.value))}
                                                    className="mt-1 w-20 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={price}
                                                    onChange={(e) => updateProductDetail(product.id, 'prices', parseFloat(e.target.value))}
                                                    className="mt-1 w-24 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Discount Type</label>
                                                <select
                                                    value={discountType}
                                                    onChange={(e) => updateProductDetail(product.id, 'discount_types', e.target.value)}
                                                    className="mt-1 w-24 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                >
                                                    <option value="percentage">%</option>
                                                    <option value="fixed">$</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Discount</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={discount}
                                                    onChange={(e) => updateProductDetail(product.id, 'discounts', parseFloat(e.target.value))}
                                                    className="mt-1 w-20 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleProductSelect(product)}
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products by name, SKU, or brand..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => {
                        const isSelected = selectedProducts.some((p) => p.id === product.id);

                        return (
                            <div
                                key={product.id}
                                className={`cursor-pointer rounded-xl border-2 bg-white shadow-md transition-all duration-200 hover:shadow-lg ${isSelected ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => handleProductSelect(product)}
                            >
                                {/* Product Image */}
                                <div className="relative">
                                    <div className="h-48 w-full overflow-hidden rounded-t-xl bg-gray-100">
                                        <img
                                            src={product.media?.[0]?.original_url || product.image_url || '/placeholder-image.jpg'}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    {isSelected && (
                                        <div className="absolute top-2 right-2 rounded-full bg-blue-600 p-1 text-white">
                                            <Plus className="h-4 w-4" />
                                        </div>
                                    )}
                                </div>

                                {/* Product Details */}
                                <div className="p-4">
                                    <h3 className="mb-2 truncate font-bold text-gray-900">{product.name}</h3>
                                    <p className="mb-2 line-clamp-2 text-sm text-gray-600">{product.short_descp}</p>

                                    <div className="mb-3 space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">SKU:</span>
                                            <span className="rounded bg-gray-100 px-2 py-1 font-mono text-xs">{product.sku}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Brand:</span>
                                            <span className="font-medium">{product.brand?.name || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Category:</span>
                                            <span>
                                                {product.category?.name || 'N/A'} / {product.sub_category?.name || 'N/A'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price and Stock */}
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="h-4 w-4 text-green-600" />
                                            <span className="text-lg font-bold text-green-600">${product.unit_price || 0}</span>
                                        </div>
                                        <div className="text-sm text-gray-500">Stock: {product.qty || 0}</div>
                                    </div>

                                    {/* Tags */}
                                    {product.tag && product.tag.length > 0 && (
                                        <div className="mb-3 flex flex-wrap gap-1">
                                            {product.tag.slice(0, 3).map((tag, index) => (
                                                <span key={index} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                                    {tag.name}
                                                </span>
                                            ))}
                                            {product.tag.length > 3 && (
                                                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                                    +{product.tag.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Selection Button */}
                                    <button
                                        className={`w-full rounded-lg px-4 py-2 font-medium transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleProductSelect(product);
                                        }}
                                    >
                                        {isSelected ? 'Selected' : 'Select Product'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-12 text-center">
                        <Package className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                        <h3 className="mb-2 text-xl font-medium text-gray-500">
                            {searchTerm ? 'No products found' : 'No products available'}
                        </h3>
                        <p className="text-gray-400">
                            {searchTerm ? 'Try adjusting your search criteria' : 'There are no products to add to this deal'}
                        </p>
                    </div>
                )}

                {/* Edit Product Modal */}
                {showEditModal && editingProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Edit Product Details</h3>

                            <form onSubmit={handleUpdateProduct} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={editData.quantity}
                                        onChange={(e) => setEditData('quantity', parseInt(e.target.value))}
                                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        required
                                    />
                                    {editErrors.quantity && <p className="mt-1 text-sm text-red-600">{editErrors.quantity}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={editData.price}
                                        onChange={(e) => setEditData('price', parseFloat(e.target.value))}
                                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        required
                                    />
                                    {editErrors.price && <p className="mt-1 text-sm text-red-600">{editErrors.price}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Discount Type</label>
                                    <select
                                        value={editData.discount_type}
                                        onChange={(e) => setEditData('discount_type', e.target.value)}
                                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed Amount ($)</option>
                                    </select>
                                    {editErrors.discount_type && <p className="mt-1 text-sm text-red-600">{editErrors.discount_type}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Discount</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={editData.discount}
                                        onChange={(e) => setEditData('discount', parseFloat(e.target.value))}
                                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        required
                                    />
                                    {editErrors.discount && <p className="mt-1 text-sm text-red-600">{editErrors.discount}</p>}
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowEditModal(false);
                                            setEditingProduct(null);
                                            resetEdit();
                                        }}
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={updateProcessing}
                                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {updateProcessing ? (
                                            <>
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                                Updating...
                                            </>
                                        ) : (
                                            'Update Product'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default AddProductToDeal;
