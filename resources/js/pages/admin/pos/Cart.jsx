import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown, Clock, CreditCard, DollarSign, FileText, List, Minus, Plus, Printer, Search, ShoppingCart, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

// Component for Top Navigation
const TopNavigation = ({ selectedStore, setSelectedStore, saleType, setSaleType, searchInvoice, setSearchInvoice }) => {
    return (
        <div className="animate-fadeIn mx-16 flex w-2/3 items-center space-x-2 rounded-md bg-white p-4 shadow">
            <div className="flex flex-1 space-x-2">
                <div className="relative w-32">
                    <select
                        className="w-full appearance-none rounded-md border bg-white p-2 transition-colors focus:ring-2 focus:ring-blue-300"
                        value={selectedStore}
                        onChange={(e) => setSelectedStore(e.target.value)}
                    >
                        <option>MyStore</option>
                        <option>Store 2</option>
                        <option>Store 3</option>
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute top-3 right-2 text-gray-500" />
                </div>

                <div className="relative w-32">
                    <select
                        className="w-full appearance-none rounded-md border bg-white p-2 transition-colors focus:ring-2 focus:ring-blue-300"
                        value={saleType}
                        onChange={(e) => setSaleType(e.target.value)}
                    >
                        <option>Sale</option>
                        <option>Return</option>
                        <option>Estimate</option>
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute top-3 right-2 text-gray-500" />
                </div>

                <div className="flex flex-1 items-center overflow-hidden rounded-md border transition-all focus-within:ring-2 focus-within:ring-blue-300">
                    <input
                        type="text"
                        placeholder="Search Invoice #"
                        className="flex-1 p-2 outline-none"
                        value={searchInvoice}
                        onChange={(e) => setSearchInvoice(e.target.value)}
                    />
                    <button className="flex items-center bg-gray-500 p-2 text-white transition-colors hover:bg-gray-600">
                        <Search size={18} />
                        <span className="ml-1">Search</span>
                    </button>
                </div>
            </div>

            <button className="flex items-center rounded-md bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600">
                <Clock size={18} />
                <span className="ml-1">Recent</span>
            </button>

            <button className="flex items-center rounded-md bg-yellow-500 p-2 text-white transition-colors hover:bg-yellow-600">
                <List size={18} />
                <span className="ml-1">Hold List</span>
            </button>
        </div>
    );
};

// Component for cart header
const CartHeader = ({ customer, setCustomer, barcodeInput, setBarcodeInput, clearCart }) => {
    return (
        <div className="mb-4 flex items-center">
            <ShoppingCart size={24} className="mr-2" />
            <h2 className="text-xl font-bold">Cart</h2>

            <div className="relative ml-4 w-64">
                <select
                    className="w-full appearance-none rounded-md border bg-white p-2 transition-colors focus:ring-2 focus:ring-blue-300"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                >
                    <option>Walk In Customer</option>
                    <option>John Doe</option>
                    <option>Jane Smith</option>
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute top-3 right-2 text-gray-500" />
            </div>

            <div className="ml-4 flex flex-1">
                <input
                    type="text"
                    placeholder="Enter barcode"
                    className="flex-1 rounded-l-md border p-2 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                />
                <button className="rounded-r-md bg-red-500 p-2 text-white transition-colors hover:bg-red-600">Scan</button>
            </div>

            <button className="ml-4 flex items-center rounded-md bg-red-500 p-2 text-white transition-colors hover:bg-red-600" onClick={clearCart}>
                <Trash2 size={18} />
                <span className="ml-1">Clear Cart</span>
            </button>
        </div>
    );
};

// Component for cart items table
const CartItemsTable = ({ cart, updateQuantity, removeFromCart, formatCurrency }) => {
    return (
        <div className="flex-1 overflow-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="p-2 text-left">Product</th>
                        <th className="p-2 text-center">Quantity</th>
                        <th className="p-2 text-right">Unit Price</th>
                        <th className="p-2 text-right">Subtotal</th>
                        <th className="p-2 text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="py-4 text-center">
                                No items in cart
                            </td>
                        </tr>
                    ) : (
                        cart.map((item) => (
                            <tr
                                key={item.variationId ? `${item.id}-${item.variationId}` : item.id}
                                className="border-b transition-colors hover:bg-gray-50"
                            >
                                <td className="p-2">
                                    {item.name}
                                    {item.variationName && <div className="text-sm text-gray-500">{item.variationName}</div>}
                                    {item.variationAttributes && (
                                        <div className="text-xs text-gray-400">
                                            {Object.entries(item.variationAttributes).map(([key, value]) => (
                                                <span key={key} className="mr-2">
                                                    {key}: {value}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {item.selectedColors && (
                                        <div className="text-xs text-gray-400">
                                            {Object.entries(item.selectedColors).map(([key, value]) => (
                                                <span key={key} className="mr-2">
                                                    {key}: {value}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </td>
                                <td className="p-2 text-center">
                                    <div className="flex items-center justify-center">
                                        <button
                                            className="rounded-l border bg-gray-100 p-1 transition-colors hover:bg-gray-200"
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.variationId)}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10), item.variationId)}
                                            className="w-12 border-t border-b p-1 text-center outline-none"
                                        />
                                        <button
                                            className="rounded-r border bg-gray-100 p-1 transition-colors hover:bg-gray-200"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.variationId)}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </td>
                                <td className="p-2 text-right">{formatCurrency(item.variationPrice || item.unit_price)}</td>
                                <td className="p-2 text-right">{formatCurrency((item.variationPrice || item.unit_price) * item.quantity)}</td>
                                <td className="p-2 text-right">
                                    <button
                                        className="rounded-full p-1 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
                                        onClick={() => removeFromCart(item.id, item.variationId)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

// Component for products section
const ProductsSection = ({ products, addToCart, searchProducts, setSearchProducts, formatCurrency }) => {
    // Get unique categories from products
    const getUniqueCategories = () => {
        const categories = new Set();
        products.forEach((p) => {
            if (p.category?.name) {
                categories.add(p.category.name);
            }
        });
        return Array.from(categories);
    };

    // Get unique subcategories from products
    const getUniqueSubcategories = () => {
        const subcategories = new Set();
        products.forEach((p) => {
            if (p.sub_category?.name) {
                subcategories.add(p.sub_category.name);
            }
        });
        return Array.from(subcategories);
    };

    return (
        <div className="animate-fadeIn m-2 w-1/3 rounded-md bg-white p-4 shadow">
            <h2 className="mb-4 text-xl font-bold">Products</h2>

            <div className="mb-4 flex">
                <input
                    type="text"
                    placeholder="Search Products..."
                    className="flex-1 rounded-l border p-2 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
                    value={searchProducts}
                    onChange={(e) => setSearchProducts(e.target.value)}
                />
                <div className="relative">
                    <select className="h-full appearance-none border-t border-r border-b p-2 pr-8 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300">
                        <option>All Categories</option>
                        {getUniqueCategories().map((category) => (
                            <option key={category}>{category}</option>
                        ))}
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute top-3 right-2 text-gray-500" />
                </div>
            </div>

            <div className="mb-4 flex">
                <div className="relative flex-1">
                    <select className="w-full appearance-none rounded-l border p-2 pr-8 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300">
                        <option>Brands</option>
                        {/* Brands would come from API if available */}
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute top-3 right-2 text-gray-500" />
                </div>
                <div className="relative flex-1">
                    <select className="w-full appearance-none rounded-r border-t border-r border-b p-2 pr-8 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300">
                        <option>Sub Categories</option>
                        {getUniqueSubcategories().map((subcategory) => (
                            <option key={subcategory}>{subcategory}</option>
                        ))}
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute top-3 right-2 text-gray-500" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="transform overflow-hidden rounded-md border bg-white transition-all hover:scale-[1.02] hover:shadow-lg"
                    >
                        <div className="relative h-32 bg-gray-200">
                            <img src={`https://laracomus.test/storage/${p.product_thumbnail}`} alt={p.name} className="h-full w-full object-cover" />
                            {p.qty <= 5 && (
                                <div className="absolute top-2 right-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">Low Stock: {p.qty}</div>
                            )}
                        </div>
                        <div className="p-2">
                            <h3 className="font-medium">{p.name}</h3>
                            <div className="text-sm text-gray-500">Stock: {p.qty}</div>
                            <div className="mb-2 font-bold">{formatCurrency(p.unit_price)}</div>
                            <button
                                className="flex w-full items-center justify-center rounded bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
                                onClick={() => addToCart(p)}
                            >
                                <ShoppingCart size={16} />
                                <span className="ml-1">Add to Cart</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Variation Selection Modal Component
const VariationModal = ({
    showModal,
    closeModal,
    selectedProduct,
    selectedVariation,
    setSelectedVariation,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    getUniqueColors,
    getUniqueSizes,
    getFilteredVariations,
    quantity,
    setQuantity,
    addVariationToCart,
    formatCurrency,
}) => {
    if (!showModal || !selectedProduct) return null;

    return (
        <div className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-opacity-75 absolute inset-0 bg-gray-800 backdrop-blur-sm" onClick={closeModal}></div>
            <div className="animate-scaleIn relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between border-b pb-3">
                    <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
                    <button onClick={closeModal} className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                {/* Color Selection */}
                {selectedProduct.color_images && selectedProduct.color_images.length > 0 && (
                    <div className="animate-fadeIn mb-4">
                        <h4 className="mb-2 font-medium text-gray-700">Select Color</h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedProduct.color_images.map((color) => (
                                <button
                                    key={color.id}
                                    className={`rounded border p-2 transition-all ${
                                        selectedColor === color.color_attribute_id
                                            ? 'scale-110 border-blue-500 ring-2 ring-blue-200'
                                            : 'hover:border-blue-300'
                                    }`}
                                    onClick={() => setSelectedColor(color.color_attribute_id)}
                                >
                                    <div className="relative">
                                        <img
                                            src={`https://laracomus.test/storage/${color.image}`}
                                            alt={`Color ${color.color_attribute_id}`}
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                        <div className="rounded text-xs text-gray-500">{color.color_attribute.name}</div>
                                        {selectedColor === color.color_attribute_id && (
                                            <div className="absolute inset-0 rounded border-2 border-blue-500"></div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Size Selection */}
                {getUniqueSizes().length > 0 && (
                    <div className="animate-fadeIn mb-4" style={{ animationDelay: '0.1s' }}>
                        <h4 className="mb-2 font-medium text-gray-700">Select Size</h4>
                        <div className="flex flex-wrap gap-2">
                            {getUniqueSizes().map((size) => (
                                <button
                                    key={size}
                                    className={`transform rounded border p-2 transition-all ${
                                        selectedSize === size ? 'scale-110 bg-blue-500 text-white' : 'hover:bg-blue-50'
                                    }`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Variation Selection */}
                <div className="animate-fadeIn mb-4" style={{ animationDelay: '0.2s' }}>
                    <h4 className="mb-2 font-medium text-gray-700">Available Variations</h4>
                    <div className="max-h-40 space-y-2 overflow-y-auto">
                        {getFilteredVariations().length > 0 ? (
                            getFilteredVariations().map((variation) => (
                                <div
                                    key={variation.id}
                                    className={`cursor-pointer rounded border p-3 transition-all ${
                                        selectedVariation?.id === variation.id
                                            ? 'scale-[1.02] transform border-blue-500 bg-blue-50'
                                            : 'hover:border-blue-300 hover:bg-blue-50'
                                    }`}
                                    onClick={() => setSelectedVariation(variation)}
                                >
                                    <div className="flex justify-between">
                                        <span>{variation.name}</span>
                                        <span className="font-bold">{formatCurrency(variation.price)}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">Stock: {variation.stock}</div>
                                </div>
                            ))
                        ) : (
                            <div className="rounded border p-3 text-center text-gray-500">No variations match the selected criteria</div>
                        )}
                    </div>
                </div>

                {/* Quantity Selection */}
                <div className="animate-fadeIn mb-6" style={{ animationDelay: '0.3s' }}>
                    <h4 className="mb-2 font-medium text-gray-700">Quantity</h4>
                    <div className="flex items-center">
                        <button
                            className="rounded-l border bg-gray-100 p-2 transition-colors hover:bg-gray-200"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                            <Minus size={16} />
                        </button>
                        <input
                            type="number"
                            min="1"
                            max={selectedVariation?.stock || 1}
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                            className="w-16 border-t border-b p-2 text-center outline-none"
                        />
                        <button
                            className="rounded-r border bg-gray-100 p-2 transition-colors hover:bg-gray-200"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            <Plus size={16} />
                        </button>
                        <span className="ml-2 text-gray-500">{selectedVariation ? `(Max: ${selectedVariation.stock})` : ''}</span>
                    </div>
                </div>

                <button
                    className="animate-fadeIn flex w-full transform items-center justify-center rounded bg-red-500 p-3 text-white transition-all hover:scale-[1.02] hover:bg-red-600 active:scale-[0.98] disabled:opacity-50"
                    style={{ animationDelay: '0.4s' }}
                    disabled={!selectedVariation}
                    onClick={addVariationToCart}
                >
                    <ShoppingCart size={18} />
                    <span className="ml-2">Add to Cart</span>
                </button>
            </div>
        </div>
    );
};

const CardPaymentModal = ({ open, onOpenChange, totalAmount, processCardPayment, formatCurrency }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = () => {
        processCardPayment({
            cardNumber,
            cardHolder,
            note,
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Card Payment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label>Total Amount</Label>
                        <Input value={formatCurrency(totalAmount)} disabled className="font-bold" />
                    </div>
                    <div>
                        <Label>Card Number</Label>
                        <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Enter card number" />
                    </div>
                    <div>
                        <Label>Card Holder Name</Label>
                        <Input value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} placeholder="Enter card holder name" />
                    </div>
                    <div>
                        <Label>Note (Optional)</Label>
                        <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Any additional notes" />
                    </div>
                    <Button className="mt-4 w-full" onClick={handleSubmit}>
                        Process Card Payment
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Multiple Payment Modal Component
const MultiplePaymentModal = ({ open, onOpenChange, totalAmount, processMultiplePayment, formatCurrency }) => {
    const [payments, setPayments] = useState([{ method: 'cash', amount: '', note: '' }]);
    const [remainingAmount, setRemainingAmount] = useState(totalAmount);

    useEffect(() => {
        const paidAmount = payments.reduce((sum, payment) => {
            return sum + (parseFloat(payment.amount) || 0);
        }, 0);
        setRemainingAmount(totalAmount - paidAmount);
    }, [payments, totalAmount]);

    const addPaymentMethod = () => {
        setPayments([...payments, { method: 'cash', amount: '', note: '' }]);
    };

    const removePaymentMethod = (index) => {
        if (payments.length <= 1) return;
        const newPayments = [...payments];
        newPayments.splice(index, 1);
        setPayments(newPayments);
    };

    const updatePaymentMethod = (index, field, value) => {
        const newPayments = [...payments];
        newPayments[index][field] = value;
        setPayments(newPayments);
    };

    const handleSubmit = () => {
        // Validate all payments have amounts
        if (payments.some((p) => !p.amount || parseFloat(p.amount) <= 0)) {
            alert('Please enter valid amounts for all payment methods');
            return;
        }

        // Validate total equals the amount due
        const totalPaid = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
        if (Math.abs(totalPaid - totalAmount) > 0.01) {
            alert(`Total payments must equal ${formatCurrency(totalAmount)}`);
            return;
        }

        processMultiplePayment(payments);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Multiple Payment Methods</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="mb-4">
                        <Label>Total Amount: {formatCurrency(totalAmount)}</Label>
                        <div className={`text-lg font-bold ${remainingAmount > 0.01 ? 'text-red-500' : 'text-green-500'}`}>
                            Remaining: {formatCurrency(remainingAmount)}
                        </div>
                    </div>

                    {payments.map((payment, index) => (
                        <div key={index} className="grid grid-cols-12 items-end gap-2">
                            <div className="col-span-4">
                                <Label>Method</Label>
                                <select
                                    className="w-full rounded border p-2"
                                    value={payment.method}
                                    onChange={(e) => updatePaymentMethod(index, 'method', e.target.value)}
                                >
                                    <option value="cash">Cash</option>
                                    <option value="card">Card</option>
                                    <option value="cheque">Cheque</option>
                                    <option value="bank">Bank Transfer</option>
                                    <option value="mfs">Mobile Financial Service</option>
                                </select>
                            </div>
                            <div className="col-span-4">
                                <Label>Amount</Label>
                                <Input
                                    type="number"
                                    value={payment.amount}
                                    onChange={(e) => updatePaymentMethod(index, 'amount', e.target.value)}
                                    placeholder="Enter amount"
                                />
                            </div>
                            <div className="col-span-3">
                                <Label>Note (Optional)</Label>
                                <Input value={payment.note} onChange={(e) => updatePaymentMethod(index, 'note', e.target.value)} placeholder="Note" />
                            </div>
                            <div className="col-span-1">
                                <Button variant="outline" size="sm" onClick={() => removePaymentMethod(index)} disabled={payments.length <= 1}>
                                    <X size={16} />
                                </Button>
                            </div>
                        </div>
                    ))}

                    <Button variant="outline" className="w-full" onClick={addPaymentMethod}>
                        Add Another Payment Method
                    </Button>

                    <Button className="mt-4 w-full" onClick={handleSubmit}>
                        Process Payment
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Invoice Modal Component
const InvoiceModal = ({ open, onOpenChange, invoiceData, formatCurrency }) => {
    if (!invoiceData) return null;

    const printInvoice = () => {
        window.print();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>Invoice #{invoiceData.invoice_number}</span>
                        <Button variant="outline" onClick={printInvoice}>
                            <Printer className="mr-2 h-4 w-4" />
                            Print
                        </Button>
                    </DialogTitle>
                </DialogHeader>

                <div className="invoice-container rounded-lg bg-white p-6">
                    {/* Invoice Header */}
                    <div className="mb-6 flex justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">{invoiceData.store.name}</h2>
                            <p>{invoiceData.store.address}</p>
                            <p>Phone: {invoiceData.store.phone}</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-xl font-bold">INVOICE</h3>
                            <p>Date: {new Date(invoiceData.created_at).toLocaleDateString()}</p>
                            <p>Invoice #: {invoiceData.invoice_number}</p>
                            <p>Customer: {invoiceData.customer}</p>
                        </div>
                    </div>

                    {/* Invoice Items */}
                    <table className="mb-6 w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2 text-left">Item</th>
                                <th className="p-2 text-center">Qty</th>
                                <th className="p-2 text-right">Price</th>
                                <th className="p-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData.items.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-2">
                                        {item.name}
                                        {item.variation_name && <div className="text-sm text-gray-500">{item.variation_name}</div>}
                                        {/*// Color*/}
                                     <div className="text-xs text-gray-400">Color: {item.color}</div>
                                        {/*// Size*/}
                                        {item.size && <div className="text-xs text-gray-400">Size: {item.size}</div>}
                                        {/*// Attributes*/}
                                        {item.attributes && (
                                            <div className="text-xs text-gray-400">
                                                {Object.entries(item.attributes).map(([key, value]) => (
                                                    <span key={key} className="mr-2">
                                                        {key}: {value}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-2 text-center">{item.quantity}</td>
                                    <td className="p-2 text-right">{formatCurrency(item.unit_price)}</td>
                                    <td className="p-2 text-right">{formatCurrency(item.total)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Invoice Summary */}
                    <div className="flex justify-end">
                        <div className="w-64">
                            <div className="mb-2 flex justify-between">
                                <span>Subtotal:</span>
                                <span>{formatCurrency(invoiceData.subtotal)}</span>
                            </div>
                            {invoiceData.discount > 0 && (
                                <div className="mb-2 flex justify-between">
                                    <span>Discount:</span>
                                    <span>-{formatCurrency(invoiceData.discount)}</span>
                                </div>
                            )}
                            {invoiceData.tax > 0 && (
                                <div className="mb-2 flex justify-between">
                                    <span>Tax:</span>
                                    <span>{formatCurrency(invoiceData.tax)}</span>
                                </div>
                            )}
                            {invoiceData.shipping > 0 && (
                                <div className="mb-2 flex justify-between">
                                    <span>Shipping:</span>
                                    <span>{formatCurrency(invoiceData.shipping)}</span>
                                </div>
                            )}
                            <div className="mt-2 flex justify-between border-t pt-2 text-lg font-bold">
                                <span>Total:</span>
                                <span>{formatCurrency(invoiceData.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="mt-6 border-t pt-4">
                        <h4 className="mb-2 font-bold">Payment Information</h4>
                        {invoiceData.payments.map((payment, index) => (
                            <div key={index} className="mb-1 flex justify-between">
                                <span>{payment.method}:</span>
                                <span>{formatCurrency(payment.amount)}</span>
                            </div>
                        ))}
                        <div className="mt-2 flex justify-between font-bold">
                            <span>Change:</span>
                            <span>{formatCurrency(invoiceData.change)}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-sm">
                        <p>Thank you for your business!</p>
                        <p className="text-gray-500">Terms & Conditions apply</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Update CartSummary component to include payment handlers
const CartSummary = ({
    calculateSubtotal,
    formatCurrency,
    shippingCost,
    setShippingCost,
    processCashPayment,
    processCardPayment,
    processMultiplePayment,
    totalAmount,
}) => {
    const [cardModalOpen, setCardModalOpen] = useState(false);
    const [multipleModalOpen, setMultipleModalOpen] = useState(false);

    return (
        <div className="mt-4 border-t pt-4">
            <div className="mb-4">
                <div className="mb-2 flex justify-between">
                    <span>Invoice No:</span>
                    <span>INV-20250521-1897</span>
                </div>

                <div className="mb-2 flex">
                    <div className="w-1/2 pr-2">
                        <label className="mb-1 block">Shipping Address</label>
                        <textarea
                            className="w-full resize-none rounded border p-2 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="w-1/2 pl-2">
                        <label className="mb-1 block">Notes</label>
                        <textarea
                            className="w-full resize-none rounded border p-2 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
                            rows="3"
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="rounded bg-gray-50 p-4 shadow-inner">
                <div className="mb-2 flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                </div>

                <div className="mb-2 flex justify-between">
                    <span>Service Charge</span>
                    <div className="w-64">
                        <select className="w-full rounded border p-1 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300">
                            <option>No Service Charge</option>
                            <option>5%</option>
                            <option>10%</option>
                        </select>
                    </div>
                </div>

                <div className="mb-2 flex justify-between">
                    <span>Discount</span>
                    <div className="w-64">
                        <select className="w-full rounded border p-1 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300">
                            <option>No Discount</option>
                            <option>5%</option>
                            <option>10%</option>
                            <option>15%</option>
                        </select>
                    </div>
                </div>

                <div className="mb-2 flex justify-between">
                    <span>Shipping Cost</span>
                    <div className="w-64">
                        <input
                            type="text"
                            className="w-full rounded border p-1 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
                            value={shippingCost}
                            onChange={(e) => setShippingCost(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-4 flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                </div>

                <div className="mb-4 grid grid-cols-4 gap-2">
                    <button
                        className="flex items-center justify-center rounded bg-green-600 p-2 text-white transition-colors hover:bg-green-700"
                        onClick={processCashPayment}
                    >
                        <DollarSign size={18} />
                        <span className="ml-1">Cash</span>
                    </button>
                    <button
                        className="flex items-center justify-center rounded bg-blue-400 p-2 text-white transition-colors hover:bg-blue-500"
                        onClick={() => setCardModalOpen(true)}
                    >
                        <CreditCard size={18} />
                        <span className="ml-1">Card</span>
                    </button>
                    <button
                        className="flex items-center justify-center rounded bg-yellow-500 p-2 text-white transition-colors hover:bg-yellow-600"
                        onClick={() => setMultipleModalOpen(true)}
                    >
                        <FileText size={18} />
                        <span className="ml-1">Multiple</span>
                    </button>
                    <button className="flex items-center justify-center rounded bg-gray-500 p-2 text-white transition-colors hover:bg-gray-600">
                        <List size={18} />
                        <span className="ml-1">Hold</span>
                    </button>
                </div>

                <button className="flex w-full transform items-center justify-center rounded-lg bg-red-600 p-4 font-semibold text-white shadow-lg transition-colors hover:scale-[1.01] hover:bg-red-700 active:scale-[0.99]">
                    <ShoppingCart size={20} className="mr-2" />
                    Process Payment
                </button>
            </div>

            {/* Payment Modals */}
            <CardPaymentModal
                open={cardModalOpen}
                onOpenChange={setCardModalOpen}
                totalAmount={totalAmount}
                processCardPayment={processCardPayment}
                formatCurrency={formatCurrency}
            />

            <MultiplePaymentModal
                open={multipleModalOpen}
                onOpenChange={setMultipleModalOpen}
                totalAmount={totalAmount}
                processMultiplePayment={processMultiplePayment}
                formatCurrency={formatCurrency}
            />
        </div>
    );
};

// Main Component
const POSSystemCart = ({ product }) => {
    // State declarations
    const [cart, setCart] = useState([]);
    const [customer, setCustomer] = useState('Walk In Customer');
    const [searchInvoice, setSearchInvoice] = useState('');
    const [searchProducts, setSearchProducts] = useState('');
    const [barcodeInput, setBarcodeInput] = useState('');
    const [selectedStore, setSelectedStore] = useState('MyStore');
    const [saleType, setSaleType] = useState('Sale');
    const [shippingCost, setShippingCost] = useState('0');

    // Variation selection modal state
    const [showVariationModal, setShowVariationModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const calculateSubtotal = () => {
        return cart.reduce((sum, item) => {
            const price = item.variationPrice || item.unit_price;
            return sum + price * item.quantity;
        }, 0);
    };

    const totalAmount = calculateSubtotal();

    // Reset variation selections when the modal is closed
    useEffect(() => {
        if (!showVariationModal) {
            setSelectedColor(null);
            setSelectedSize(null);
            setSelectedVariation(null);
            setQuantity(1);
        }
    }, [showVariationModal]);

    // Update variations when color or size changes
    useEffect(() => {
        // If there's only one variation that matches selected color/size, auto-select it
        const filteredVariations = getFilteredVariations();
        if (filteredVariations.length === 1) {
            setSelectedVariation(filteredVariations[0]);
        } else if (filteredVariations.length === 0) {
            setSelectedVariation(null);
        } else if (selectedVariation) {
            // Check if current selection is still valid
            const stillValid = filteredVariations.some((v) => v.id === selectedVariation.id);
            if (!stillValid) {
                setSelectedVariation(null);
            }
        }
    }, [selectedColor, selectedSize]);

    const addToCart = (product) => {
        // Check if product has variations
        if (product.variations && product.variations.length > 0) {
            setSelectedProduct(product);
            setShowVariationModal(true);
        } else {
            // Add simple product to cart
            const existingItem = cart.find((item) => item.id === product.id && !item.variationId);

            if (existingItem) {
                setCart(
                    cart.map((item) =>
                        item.id === product.id && !item.variationId
                            ? {
                                  ...item,
                                  quantity: item.quantity + 1,
                              }
                            : item,
                    ),
                );
            } else {
                setCart([
                    ...cart,
                    {
                        ...product,
                        quantity: 1,
                        variationId: null,
                        variationName: null,
                        variationPrice: product.unit_price,
                    },
                ]);
            }
        }
    };

    const addVariationToCart = () => {
        if (!selectedVariation) return;

        const existingItem = cart.find((item) => item.id === selectedProduct.id && item.variationId === selectedVariation.id);

        if (existingItem) {
            setCart(
                cart.map((item) =>
                    item.id === selectedProduct.id && item.variationId === selectedVariation.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                ),
            );
        } else {
            const variationAttributes = JSON.parse(selectedVariation.attributes);
            setCart([
                ...cart,
                {
                    ...selectedProduct,
                    quantity: quantity,
                    variationId: selectedVariation.id,
                    variationName: selectedVariation.name,
                    variationPrice: parseFloat(selectedVariation.price),
                    variationAttributes: variationAttributes,
                    selectedColors: {
                        color: selectedProduct.color_images.find((color) => color.color_attribute_id === selectedColor)?.color_attribute.name,
                    },
                },
            ]);
        }

        closeVariationModal();
    };

    const removeFromCart = (productId, variationId = null) => {
        setCart(cart.filter((item) => !(item.id === productId && (variationId ? item.variationId === variationId : !item.variationId))));
    };

    const updateQuantity = (productId, quantity, variationId = null) => {
        if (quantity < 1) return;

        setCart(
            cart.map((item) =>
                item.id === productId && (variationId ? item.variationId === variationId : !item.variationId)
                    ? {
                          ...item,
                          quantity,
                      }
                    : item,
            ),
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const formatCurrency = (amount) => {
        return `£${parseFloat(amount).toFixed(2)}`;
    };

    const getUniqueSizes = () => {
        if (!selectedProduct || !selectedProduct.variations) return [];
        const sizes = new Set();
        selectedProduct.variations.forEach((v) => {
            try {
                const attrs = JSON.parse(v.attributes);
                if (attrs.size) {
                    sizes.add(attrs.size);
                }
            } catch (error) {
                console.error('Error parsing attributes:', error);
            }
        });
        return Array.from(sizes);
    };

    const getUniqueColors = () => {
        if (!selectedProduct) return [];
        return selectedProduct.color_images || [];
    };

    const getFilteredVariations = () => {
        if (!selectedProduct || !selectedProduct.variations) return [];
        return selectedProduct.variations.filter((v) => {
            try {
                const attrs = JSON.parse(v.attributes);
                return !selectedSize || attrs.size === selectedSize;
            } catch (error) {
                console.error('Error parsing attributes:', error);
                return false;
            }
        });
    };

    const closeVariationModal = () => {
        setShowVariationModal(false);
    };

    // Filter products based on search term
    const filteredProducts = product.filter((p) => p.name.toLowerCase().includes(searchProducts.toLowerCase()));

    // For Sale

    const processCashPayment = async () => {
        setIsProcessing(true);
        try {
            // Prepare payment data
            const paymentData = {
                store_id: selectedStore,
                customer,
                sale_type: saleType,
                items: cart.map((item) => ({
                    product_id: item.id,
                    variation_id: item.variationId,
                    quantity: item.quantity,
                    price: item.variationPrice || item.unit_price,
                    color: item.selectedColors?.color,
                })),
                payments: [
                    {
                        method: 'cash',
                        amount: totalAmount,
                        note: '',
                    },
                ],
                shipping: parseFloat(shippingCost) || 0,
                discount: 0, // You can add discount calculation
                tax: 0, // You can add tax calculation
            };

            // Simulate API call
            const response = await simulateApiCall(paymentData);

            // Handle response
            setInvoiceData(response);
            setInvoiceModalOpen(true);
            setCart([]); // Clear cart after successful payment
        } catch (error) {
            console.error('Payment processing failed:', error);
            alert('Payment processing failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Process card payment
    const processCardPayment = async (cardDetails) => {
        setIsProcessing(true);
        try {
            const paymentData = {
                store_id: selectedStore,
                customer,
                sale_type: saleType,
                items: cart.map((item) => ({
                    product_id: item.id,
                    variation_id: item.variationId,
                    quantity: item.quantity,
                    price: item.variationPrice || item.unit_price,
                })),
                payments: [
                    {
                        method: 'card',
                        amount: totalAmount,
                        note: cardDetails.note,
                        card_number: cardDetails.cardNumber,
                        card_holder: cardDetails.cardHolder,
                    },
                ],
                shipping: parseFloat(shippingCost) || 0,
                discount: 0,
                tax: 0,
            };

            const response = await simulateApiCall(paymentData);
            setInvoiceData(response);
            setInvoiceModalOpen(true);
            setCart([]);
        } catch (error) {
            console.error('Card payment failed:', error);
            alert('Card payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Process multiple payments
    const processMultiplePayment = async (payments) => {
        setIsProcessing(true);
        try {
            const paymentData = {
                store_id: selectedStore,
                customer,
                sale_type: saleType,
                items: cart.map((item) => ({
                    product_id: item.id,
                    variation_id: item.variationId,
                    quantity: item.quantity,
                    price: item.variationPrice || item.unit_price,
                })),
                payments: payments.map((payment) => ({
                    method: payment.method,
                    amount: parseFloat(payment.amount),
                    note: payment.note,
                })),
                shipping: parseFloat(shippingCost) || 0,
                discount: 0,
                tax: 0,
            };

            const response = await simulateApiCall(paymentData);
            setInvoiceData(response);
            setInvoiceModalOpen(true);
            setCart([]);
        } catch (error) {
            console.error('Payment processing failed:', error);
            alert('Payment processing failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Simulate API call (replace with actual API call)
    const simulateApiCall = async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    invoice_number: `INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
                    created_at: new Date().toISOString(),
                    store: {
                        name: 'MyStore',
                        address: '123 Main St, City, Country',
                        phone: '+1234567890',
                    },
                    customer: data.customer,
                    items: data.items.map((item) => ({
                        name: product.find((p) => p.id === item.product_id)?.name || 'Product',
                        variation_name: item.variation_id ? item.variation_id : null,
                        quantity: item.quantity,
                        unit_price: item.price,
                        total: item.price * item.quantity,
                    })),
                    subtotal: data.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
                    discount: data.discount,
                    tax: data.tax,
                    shipping: data.shipping,
                    total: data.items.reduce((sum, item) => sum + item.price * item.quantity, 0) + data.shipping + data.tax - data.discount,
                    payments: data.payments,
                    change:
                        data.payments.reduce((sum, p) => sum + p.amount, 0) -
                        (data.items.reduce((sum, item) => sum + item.price * item.quantity, 0) + data.shipping + data.tax - data.discount),
                });
            }, 1000);
        });
    };

    return (
        <div className="flex h-screen flex-col bg-gray-100 pt-3">
            {/* Top navigation */}
            <TopNavigation
                selectedStore={selectedStore}
                setSelectedStore={setSelectedStore}
                saleType={saleType}
                setSaleType={setSaleType}
                searchInvoice={searchInvoice}
                setSearchInvoice={setSearchInvoice}
            />

            <div className="mx-14 flex flex-1">
                {/* Left panel - Cart */}
                <div className="animate-fadeIn m-2 flex w-8/12 flex-col rounded-md bg-white p-4 shadow">
                    <CartHeader
                        customer={customer}
                        setCustomer={setCustomer}
                        barcodeInput={barcodeInput}
                        setBarcodeInput={setBarcodeInput}
                        clearCart={clearCart}
                    />

                    <CartItemsTable cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} formatCurrency={formatCurrency} />

                    <CartSummary
                        calculateSubtotal={calculateSubtotal}
                        formatCurrency={formatCurrency}
                        shippingCost={shippingCost}
                        setShippingCost={setShippingCost}
                        processCashPayment={processCashPayment}
                        processCardPayment={processCardPayment}
                        processMultiplePayment={processMultiplePayment}
                        totalAmount={totalAmount}
                    />

                </div>

                {/* Right panel - Products */}
                <ProductsSection
                    products={filteredProducts}
                    addToCart={addToCart}
                    searchProducts={searchProducts}
                    setSearchProducts={setSearchProducts}
                    formatCurrency={formatCurrency}
                />
            </div>



            {/* Invoice Modal */}
            <InvoiceModal open={invoiceModalOpen} onOpenChange={setInvoiceModalOpen} invoiceData={invoiceData} formatCurrency={formatCurrency} />

            {/* Variation Selection Modal */}
            <VariationModal
                showModal={showVariationModal}
                closeModal={closeVariationModal}
                selectedProduct={selectedProduct}
                selectedVariation={selectedVariation}
                setSelectedVariation={setSelectedVariation}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                getUniqueColors={getUniqueColors}
                getUniqueSizes={getUniqueSizes}
                getFilteredVariations={getFilteredVariations}
                quantity={quantity}
                setQuantity={setQuantity}
                addVariationToCart={addVariationToCart}
                formatCurrency={formatCurrency}
            />
        </div>
    );
};

export default POSSystemCart;
