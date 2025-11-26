import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from '../../components/frontend/Footer/Footer';
import Header from '../../components/frontend/Header/Header';

export default function Checkout() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [processingOrder, setProcessingOrder] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const [formData, setFormData] = useState({
        // Shipping Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',

        // Payment Information
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',

        // Options
        sameAsShipping: true,
        saveInfo: false,
        newsletter: false,
    });

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get('/api/cart');
            setCart(Object.values(response.data.cart));
            setTotal(response.data.total);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessingOrder(true);

        // Simulate payment processing
        setTimeout(async () => {
            try {
                // Clear the cart after successful order
                await axios.delete('/api/cart/clear');
                setOrderComplete(true);
                setProcessingOrder(false);
            } catch (error) {
                console.error('Error processing order:', error);
                setProcessingOrder(false);
                alert('Error processing order. Please try again.');
            }
        }, 3000);
    };

    if (orderComplete) {
        return (
            <>
                <Head title="Order Complete" />
                <Header />
                <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg sm:p-8">
                        <div className="mb-6">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 sm:h-16 sm:w-16">
                                <svg className="h-6 w-6 text-green-600 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">Order Complete!</h2>
                            <p className="mb-6 text-sm text-gray-600 sm:text-base">
                                Thank you for your purchase. Your order has been successfully processed.
                            </p>
                            <div className="space-y-3">
                                <a
                                    href="/products"
                                    className="block w-full rounded-md bg-blue-600 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:text-base"
                                >
                                    Continue Shopping
                                </a>
                                <a
                                    href="/"
                                    className="block w-full rounded-md bg-gray-100 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 sm:text-base"
                                >
                                    Back to Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <>
                <Head title="Checkout" />
                <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow sm:p-8">
                        <div className="mb-4">
                            <svg className="mx-auto h-12 w-12 text-gray-400 sm:h-16 sm:w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"
                                ></path>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-gray-900 sm:text-xl">Your cart is empty</h3>
                        <p className="mb-6 text-sm text-gray-500 sm:text-base">Add some products before checkout</p>
                        <a
                            href="/cart"
                            className="inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:text-base"
                        >
                            Browse Products
                        </a>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Checkout" />

            <div className="min-h-screen bg-gray-50">
                <Header />

                {/* Simple Header */}
                <div className="border-b bg-white shadow-sm">
                    <div className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                <a href="/cart" className="flex items-center space-x-2 text-gray-600 transition-colors hover:text-blue-600">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span className="text-sm sm:text-base">Back to Cart</span>
                                </a>
                                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Checkout</h1>
                            </div>
                            <div className="hidden items-center space-x-2 text-sm text-green-600 sm:flex">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>Secure Checkout</span>
                            </div>
                        </div>

                        {/* Simple Progress Steps */}
                        <div className="mt-4 flex items-center justify-center space-x-4 sm:mt-6 sm:space-x-8">
                            <div className="flex items-center space-x-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-medium text-white sm:h-8 sm:w-8 sm:text-sm">
                                    ✓
                                </div>
                                <span className="text-xs font-medium text-green-600 sm:text-sm">Cart</span>
                            </div>
                            <div className="h-0.5 w-8 bg-green-300 sm:w-16"></div>
                            <div className="flex items-center space-x-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white sm:h-8 sm:w-8 sm:text-sm">
                                    2
                                </div>
                                <span className="text-xs font-medium text-blue-600 sm:text-sm">Checkout</span>
                            </div>
                            <div className="h-0.5 w-8 bg-gray-300 sm:w-16"></div>
                            <div className="flex items-center space-x-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-xs font-medium text-white sm:h-8 sm:w-8 sm:text-sm">
                                    3
                                </div>
                                <span className="text-xs font-medium text-gray-500 sm:text-sm">Complete</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                        {/* Simple Checkout Form */}
                        <div className="lg:col-span-8">
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                {/* Shipping Information */}
                                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                    <h3 className="mb-4 text-base font-semibold text-gray-900 sm:text-lg">Shipping Information</h3>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                required
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                required
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                placeholder="Doe"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                placeholder="(555) 123-4567"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Address *</label>
                                            <input
                                                type="text"
                                                name="address"
                                                required
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                placeholder="123 Main Street"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">City *</label>
                                            <input
                                                type="text"
                                                name="city"
                                                required
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                placeholder="New York"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">State *</label>
                                            <select
                                                name="state"
                                                required
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select State</option>
                                                <option value="NY">New York</option>
                                                <option value="CA">California</option>
                                                <option value="TX">Texas</option>
                                                <option value="FL">Florida</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">ZIP Code *</label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                required
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                placeholder="10001"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Information */}
                                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                    <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                        <h3 className="text-base font-semibold text-gray-900 sm:text-lg">Payment Information</h3>
                                        <div className="flex space-x-2">
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png"
                                                alt="Visa"
                                                className="h-5 sm:h-6"
                                            />
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png"
                                                alt="Mastercard"
                                                className="h-5 sm:h-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Card Number *</label>
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                required
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                placeholder="1234 5678 9012 3456"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">Expiry Date *</label>
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    required
                                                    value={formData.expiryDate}
                                                    onChange={handleInputChange}
                                                    className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                    placeholder="MM/YY"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">CVV *</label>
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    required
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                    placeholder="123"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Cardholder Name *</label>
                                            <input
                                                type="text"
                                                name="cardName"
                                                required
                                                value={formData.cardName}
                                                onChange={handleInputChange}
                                                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={processingOrder}
                                    className="w-full rounded-md bg-blue-600 px-4 py-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:text-base"
                                >
                                    {processingOrder ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="mr-3 -ml-1 h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Processing Order...
                                        </div>
                                    ) : (
                                        `Complete Order - $${(total * 1.08).toFixed(2)}`
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Simple Order Summary */}
                        <div className="order-first lg:order-last lg:col-span-4">
                            <div className="sticky top-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:top-6 sm:p-6">
                                <h3 className="mb-4 text-base font-semibold text-gray-900 sm:text-lg">Order Summary</h3>

                                {/* Cart Items */}
                                <div className="mb-6 max-h-64 space-y-3 overflow-y-auto sm:max-h-80 sm:space-y-4">
                                    {cart.map((item) => (
                                        <div key={item.product_id} className="flex items-center space-x-3">
                                            <img
                                                src={item.image || '/images/placeholder.jpg'}
                                                alt={item.name}
                                                className="h-10 w-10 flex-shrink-0 rounded border object-cover sm:h-12 sm:w-12"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <h4 className="truncate text-sm font-medium text-gray-900">{item.name}</h4>
                                                <p className="text-xs text-gray-500 sm:text-sm">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="flex-shrink-0 text-sm font-medium text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Summary */}
                                <div className="space-y-2 border-t pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium text-green-600">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tax (8%)</span>
                                        <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
                                    </div>
                                    <div className="border-t pt-2">
                                        <div className="flex justify-between">
                                            <span className="text-base font-medium text-gray-900">Total</span>
                                            <span className="text-lg font-bold text-gray-900">${(total * 1.08).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Badge */}
                                <div className="mt-6 flex items-center justify-center text-xs text-gray-500 sm:text-sm">
                                    <svg className="mr-2 h-4 w-4 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m5.586-.586a2 2 0 00-2.828-2.828l-.793.793-2.828-2.828a2 2 0 10-2.828 2.828l.793.793a2 2 0 002.828 2.828l.793-.793 2.828 2.828a2 2 0 102.828-2.828l-.793-.793a2 2 0 00-2.828-2.828l.793-.793z"
                                        />
                                    </svg>
                                    <span className="text-center">Secure 256-bit SSL encryption</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
