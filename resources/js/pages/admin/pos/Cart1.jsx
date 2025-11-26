import React, { useState } from 'react';
import { Search, Trash2, Clock, List, ShoppingCart, CreditCard, DollarSign, FileText } from 'lucide-react';
import AppLayout from '@/layouts/app-layout.jsx';

export default function POSSystem() {
    const [cart, setCart] = useState([]);
    const [customer, setCustomer] = useState('Walk In Customer');
    const [searchInvoice, setSearchInvoice] = useState('');
    const [searchProducts, setSearchProducts] = useState('');
    const [barcodeInput, setBarcodeInput] = useState('');
    const [selectedStore, setSelectedStore] = useState('MyStore');
    const [saleType, setSaleType] = useState('Sale');
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [shippingCost, setShippingCost] = useState('0');

    // Sample products
    const products = [
        { id: 1, name: 'Stripe Polo T-Shirt', price: 1150.00, stock: 1194, image: '/api/placeholder/200/150' },
        { id: 2, name: 'Classic Jeans', price: 999.00, stock: 85, image: '/api/placeholder/200/150' },
        { id: 3, name: 'Leather Wallet', price: 450.00, stock: 210, image: '/api/placeholder/200/150' },
        { id: 4, name: 'Running Shoes', price: 1899.00, stock: 45, image: '/api/placeholder/200/150' },
        { id: 5, name: 'Wireless Earbuds', price: 2499.00, stock: 30, image: '/api/placeholder/200/150' },
        { id: 6, name: 'Smart Watch', price: 3999.00, stock: 20, image: '/api/placeholder/200/150' },
    ];

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id ? {...item, quantity: item.quantity + 1} : item
            ));
        } else {
            setCart([...cart, {...product, quantity: 1}]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;

        setCart(cart.map(item =>
            item.id === productId ? {...item, quantity} : item
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    const calculateSubtotal = () => {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const formatCurrency = (amount) => {
        return `£${amount.toFixed(2)}`;
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchProducts.toLowerCase())
    );

    return (
        <AppLayout>
            <div className="flex flex-col h-screen bg-gray-100 pt-3">
                {/* Top navigation */}
                <div className="bg-white p-4 shadow flex items-center space-x-2 mx-16 w-2/3">
                    <div className="flex-1 flex space-x-2">
                        <div className="relative w-32">
                            <select
                                className="w-full p-2 border rounded-md appearance-none bg-white"
                                value={selectedStore}
                                onChange={(e) => setSelectedStore(e.target.value)}
                            >
                                <option>MyStore</option>
                                <option>Store 2</option>
                                <option>Store 3</option>
                            </select>
                        </div>

                        <div className="relative w-32">
                            <select
                                className="w-full p-2 border rounded-md appearance-none bg-white"
                                value={saleType}
                                onChange={(e) => setSaleType(e.target.value)}
                            >
                                <option>Sale</option>
                                <option>Return</option>
                                <option>Estimate</option>
                            </select>
                        </div>

                        <div className="flex-1 flex items-center border rounded-md">
                            <input
                                type="text"
                                placeholder="Search Invoice #"
                                className="p-2 flex-1 outline-none"
                                value={searchInvoice}
                                onChange={(e) => setSearchInvoice(e.target.value)}
                            />
                            <button className="bg-gray-500 text-white p-2 rounded-r-md flex items-center">
                                <Search size={18} />
                                <span className="ml-1">Search</span>
                            </button>
                        </div>
                    </div>

                    <button className="bg-blue-500 text-white p-2 rounded-md flex items-center">
                        <Clock size={18} />
                        <span className="ml-1">Recent</span>
                    </button>

                    <button className="bg-yellow-500 text-white p-2 rounded-md flex items-center">
                        <List size={18} />
                        <span className="ml-1">Hold List</span>
                    </button>
                </div>

                <div className="flex flex-1 overflow-hidden mx-14">
                    {/* Left panel - Cart */}
                    <div className="w-8/12 p-4 flex flex-col bg-white m-2 rounded-md shadow">
                        <div className="flex items-center mb-4">
                            <ShoppingCart size={24} className="mr-2" />
                            <h2 className="text-xl font-bold">Cart</h2>

                            <div className="ml-4 relative w-64">
                                <select
                                    className="w-full p-2 border rounded-md appearance-none bg-white"
                                    value={customer}
                                    onChange={(e) => setCustomer(e.target.value)}
                                >
                                    <option>Walk In Customer</option>
                                    <option>John Doe</option>
                                    <option>Jane Smith</option>
                                </select>
                            </div>

                            <div className="flex-1 flex ml-4">
                                <input
                                    type="text"
                                    placeholder="Enter barcode"
                                    className="p-2 border rounded-l-md flex-1"
                                    value={barcodeInput}
                                    onChange={(e) => setBarcodeInput(e.target.value)}
                                />
                                <button className="bg-red-500 text-white p-2 rounded-r-md">
                                    Scan
                                </button>
                            </div>

                            <button
                                className="ml-4 bg-red-500 text-white p-2 rounded-md flex items-center"
                                onClick={clearCart}
                            >
                                <Trash2 size={18} />
                                <span className="ml-1">Clear Cart</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b">
                                    <th className="text-left p-2">Product</th>
                                    <th className="text-center p-2">Quantity</th>
                                    <th className="text-right p-2">Unit Price</th>
                                    <th className="text-right p-2">Subtotal</th>
                                    <th className="text-right p-2">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cart.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4">No items in cart</td>
                                    </tr>
                                ) : (
                                    cart.map(item => (
                                        <tr key={item.id} className="border-b">
                                            <td className="p-2">{item.name}</td>
                                            <td className="p-2 text-center">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                                                    className="border p-1 w-16 text-center"
                                                />
                                            </td>
                                            <td className="p-2 text-right">{formatCurrency(item.price)}</td>
                                            <td className="p-2 text-right">{formatCurrency(item.price * item.quantity)}</td>
                                            <td className="p-2 text-right">
                                                <button
                                                    className="text-red-500"
                                                    onClick={() => removeFromCart(item.id)}
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

                        <div className="mt-4 border-t pt-4">
                            <div className="mb-4">
                                <div className="flex justify-between mb-2">
                                    <span>Invoice No:</span>
                                    <span>INV-20250521-1897</span>
                                </div>

                                <div className="flex mb-2">
                                    <div className="w-1/2 pr-2">
                                        <label className="block mb-1">Shipping Address</label>
                                        <textarea
                                            className="w-full p-2 border rounded"
                                            rows="3"
                                        ></textarea>
                                    </div>
                                    <div className="w-1/2 pl-2">
                                        <label className="block mb-1">Notes</label>
                                        <textarea
                                            className="w-full p-2 border rounded"
                                            rows="3"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded">
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal:</span>
                                    <span>{formatCurrency(calculateSubtotal())}</span>
                                </div>

                                <div className="flex justify-between mb-2">
                                    <span>Service Charge</span>
                                    <div className="w-64">
                                        <select className="w-full p-1 border rounded">
                                            <option>No Service Charge</option>
                                            <option>5%</option>
                                            <option>10%</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-between mb-2">
                                    <span>Discount</span>
                                    <div className="w-64">
                                        <select className="w-full p-1 border rounded">
                                            <option>No Discount</option>
                                            <option>5%</option>
                                            <option>10%</option>
                                            <option>15%</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-between mb-2">
                                    <span>Shipping Cost</span>
                                    <div className="w-64">
                                        <input
                                            type="text"
                                            className="w-full p-1 border rounded"
                                            value={shippingCost}
                                            onChange={(e) => setShippingCost(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between mb-4 text-lg font-bold">
                                    <span>Total:</span>
                                    <span>{formatCurrency(calculateSubtotal())}</span>
                                </div>

                                <div className="grid grid-cols-4 gap-2 mb-4">
                                    <button className="bg-green-600 text-white p-2 rounded flex items-center justify-center">
                                        <DollarSign size={18} />
                                        <span className="ml-1">Cash</span>
                                    </button>
                                    <button className="bg-blue-400 text-white p-2 rounded flex items-center justify-center">
                                        <CreditCard size={18} />
                                        <span className="ml-1">Card</span>
                                    </button>
                                    <button className="bg-yellow-500 text-white p-2 rounded flex items-center justify-center">
                                        <FileText size={18} />
                                        <span className="ml-1">Multiple</span>
                                    </button>
                                    <button className="bg-gray-500 text-white p-2 rounded flex items-center justify-center">
                                        <List size={18} />
                                        <span className="ml-1">Hold</span>
                                    </button>
                                </div>

                                <button className="w-full bg-red-500 text-white p-3 rounded flex items-center justify-center">
                                    <ShoppingCart size={18} />
                                    <span className="ml-2">Process Cash Payment</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right panel - Products */}
                    <div className="w-1/3 p-4 bg-white m-2 rounded-md shadow">
                        <h2 className="text-xl font-bold mb-4">Products</h2>

                        <div className="flex mb-4">
                            <input
                                type="text"
                                placeholder="Search Products..."
                                className="p-2 border rounded-l flex-1"
                                value={searchProducts}
                                onChange={(e) => setSearchProducts(e.target.value)}
                            />
                            <select className="p-2 border-t border-b border-r">
                                <option>All Categories</option>
                                <option>Clothing</option>
                                <option>Electronics</option>
                                <option>Accessories</option>
                            </select>
                        </div>

                        <div className="flex mb-4">
                            <select className="p-2 border rounded-l flex-1">
                                <option>Brands</option>
                                <option>Brand 1</option>
                                <option>Brand 2</option>
                                <option>Brand 3</option>
                            </select>
                            <select className="p-2 border-t border-b border-r rounded-r flex-1">
                                <option>Sub Categories</option>
                                <option>Sub Category 1</option>
                                <option>Sub Category 2</option>
                                <option>Sub Category 3</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
                            {filteredProducts.map(product => (
                                <div key={product.id} className="border rounded-md overflow-hidden bg-white hover:shadow-lg">
                                    <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                                    <div className="p-2">
                                        <h3 className="font-medium">{product.name}</h3>
                                        <div className="text-sm text-gray-500">Stock: {product.stock}</div>
                                        <div className="font-bold mb-2">{formatCurrency(product.price)}</div>
                                        <button
                                            className="w-full bg-red-500 text-white p-2 rounded flex items-center justify-center"
                                            onClick={() => addToCart(product)}
                                        >
                                            <ShoppingCart size={16} />
                                            <span className="ml-1">Add to Cart</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}