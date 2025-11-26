import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from '../../components/frontend/Footer/Footer';
import Header from '../../components/frontend/Header/Header';

export default function ShopCart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [promoCode, setPromoCode] = useState('');

    // Sample suggested products (similar to the Newegg example)
    const suggestedProducts = [
        {
            id: 'monitor-1',
            name: 'KTC 24 Inch 1080P/165HZ Gaming Monitor, FHD PC Computer Monitor',
            price: 82.99,
            image: 'https://c1.neweggimages.com/productimage/nb300/BPMFS2505280DS5OR13.jpg',
            originalPrice: 99.99,
            rating: 4.5,
        },
        {
            id: 'headset-1',
            name: 'HyperX Cloud Stinger 2 - Gaming Headset, DTS Headphone:X Spatial Audio',
            price: 39.99,
            image: 'https://c1.neweggimages.com/productimage/nb300/BPMFS2505280DS5OR13.jpg',
            rating: 4.3,
        },
        {
            id: 'keyboard-1',
            name: 'MSI Vigor GK30 Gaming Keyboard & GM11 Gaming Mouse Combo',
            price: 77.99,
            image: 'https://c1.neweggimages.com/productimage/nb300/BPMFS2505280DS5OR13.jpg',
            rating: 4.4,
        },
        {
            id: 'speakers-1',
            name: 'Redragon GS510 Waltz RGB Desktop Speakers, 2.0 Channel Computer Gaming',
            price: 27.99,
            image: 'https://c1.neweggimages.com/productimage/nb300/BPMFS2505280DS5OR13.jpg',
            rating: 4.2,
        },
    ];

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

    const updateQuantity = async (productId, newQuantity) => {
        try {
            const response = await axios.put('/api/cart/update', {
                product_id: productId,
                quantity: newQuantity,
            });
            setCart(Object.values(response.data.cart));
            setTotal(response.data.total);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const removeItem = async (productId) => {
        try {
            const response = await axios.delete('/api/cart/remove', {
                data: { product_id: productId },
            });
            setCart(Object.values(response.data.cart));
            setTotal(response.data.total);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const addSuggestedProduct = async (product) => {
        try {
            await axios.post('/api/cart/add', {
                product_id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
            });
            fetchCart();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const moveToWishlist = async (productId) => {
        // This would typically save to wishlist and remove from cart
        await removeItem(productId);
        alert('Item moved to wish list!');
    };

    const saveForLater = async (productId) => {
        // This would typically save to a "saved for later" list
        await removeItem(productId);
        alert('Item saved for later!');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Shopping Cart - TBZ.com</title>
                <meta name="description" content="Review your shopping cart items, update quantities, and proceed to checkout at TBZ.com." />
                <link rel="canonical" href="https://tbz.com.bd/cart" />
                {/* Open Graph Tags */}
                <meta property="og:title" content="Shopping Cart - TBZ.com" />
                <meta property="og:description" content="Review your shopping cart items, update quantities, and proceed to checkout at TBZ.com." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tbz.com.bd/cart" />
                <meta property="og:image" content="https://tbz.com.bd/images/og-cart.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="TBZ" />
                <meta property="og:locale" content="en_US" />
                {/* Twitter Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@tbz" />
                <meta name="twitter:creator" content="@tbz" />
                <meta name="twitter:title" content="Shopping Cart - TBZ.com" />
                <meta name="twitter:description" content="Review your shopping cart items, update quantities, and proceed to checkout at TBZ.com." />
                <meta name="twitter:image" content="https://tbz.com.bd/images/twitter-cart.jpg" />
                {/* Additional Meta Tags */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="TBZ" />
                <meta name="theme-color" content="#2563eb" />
                {/* Structured Data */}
                <script type="application/ld+json">

                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'TBZ',
                        url: 'https://tbz.com.bd/',
                        logo: 'https://tbz.com.bd/images/logo.png',
                        description: 'Review your shopping cart items, update quantities, and proceed to checkout at TBZ.com.',
                        applicationCategory: 'BusinessApplication',
                    })}
                </script>
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Header */}

                <Header />
                <div className="border-b bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                            <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Shopping Cart</h1>
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                    {cart.length} Item{cart.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                                <button className="flex items-center justify-center space-x-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                    <span className="hidden sm:inline">MOVE ALL TO WISH LIST</span>
                                    <span className="sm:hidden">WISH LIST</span>
                                </button>
                                <button className="flex items-center justify-center space-x-2 rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:outline-none">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                    <span className="hidden sm:inline">REMOVE ALL</span>
                                    <span className="sm:hidden">CLEAR CART</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}

                <div className="max-w-8xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-8">
                            {cart.length === 0 ? (
                                <div className="rounded-lg bg-white p-8 text-center shadow">
                                    <h3 className="mb-2 text-xl font-medium text-gray-900">Your cart is empty</h3>
                                    <p className="mb-4 text-gray-500">Add some products to get started!</p>
                                    <a href="/" className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
                                        Continue Shopping
                                    </a>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item, index) => (
                                        <div
                                            key={item.product_id}
                                            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                                        >
                                            <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-6">
                                                {/* Product Image */}
                                                <div className="flex-shrink-0 self-center sm:self-start">
                                                    <div className="relative">
                                                        <img
                                                            src={item.image || 'public/images/product.jpg'}
                                                            alt={item.name}
                                                            className="h-32 w-32 cursor-pointer rounded-lg border border-gray-200 object-cover transition-colors hover:border-blue-300 sm:h-24 sm:w-24 lg:h-32 lg:w-32"
                                                        />
                                                        <div className="absolute -top-2 -right-2 rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">
                                                            #{item.product_id.slice(-4).toUpperCase()}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-grow">
                                                    <div className="mb-3">
                                                        <h3 className="line-clamp-2 cursor-pointer text-lg font-semibold text-gray-900 hover:text-blue-600 sm:text-xl">
                                                            {item.name}
                                                        </h3>
                                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                                                #1 BEST SELLER
                                                            </span>
                                                            <span className="text-xs text-gray-500 sm:text-sm">in Gaming Desktop PC</span>
                                                        </div>
                                                    </div>

                                                    <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
                                                        <div className="flex items-center space-x-2">
                                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                            <span className="font-medium text-green-600">Get it fast</span>
                                                        </div>
                                                        <span className="cursor-pointer text-blue-600 hover:underline">🚚 Ship to you</span>
                                                        <span className="hidden text-gray-300 sm:inline">|</span>
                                                        <span className="cursor-pointer text-blue-600 hover:underline">🏪 Pickup at store</span>
                                                    </div>

                                                    {/* Mobile Price Section - Show at top on mobile */}
                                                    <div className="mb-4 block text-center sm:hidden">
                                                        <div className="mb-1">
                                                            <span className="text-sm text-gray-500 line-through">$1,799.99</span>
                                                            <span className="ml-2 rounded bg-red-100 px-2 py-1 text-xs font-bold text-red-800">
                                                                Save: $920.99 (51%)
                                                            </span>
                                                        </div>
                                                        <div className="text-2xl font-bold text-gray-900">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </div>
                                                        <div className="mt-1 text-sm text-green-600">200+ people have this item in their cart.</div>
                                                    </div>

                                                    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                                        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
                                                            {/* Quantity Controls */}
                                                            <div className="flex items-center justify-center sm:justify-start">
                                                                <span className="mr-3 text-sm font-medium text-gray-700">Qty:</span>
                                                                <div className="flex items-center rounded-md border border-gray-300">
                                                                    <button
                                                                        onClick={() =>
                                                                            updateQuantity(item.product_id, Math.max(0, item.quantity - 1))
                                                                        }
                                                                        className="flex h-10 w-10 items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                    >
                                                                        −
                                                                    </button>
                                                                    <div className="flex h-10 w-16 items-center justify-center border-x border-gray-300 bg-gray-50 text-center font-semibold">
                                                                        {item.quantity}
                                                                    </div>
                                                                    <button
                                                                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                                        className="flex h-10 w-10 items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* Action Buttons */}
                                                            <div className="grid grid-cols-1 gap-2 text-sm sm:flex sm:space-x-4">
                                                                <button
                                                                    onClick={() => moveToWishlist(item.product_id)}
                                                                    className="flex items-center justify-center space-x-1 rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                >
                                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                                        />
                                                                    </svg>
                                                                    <span className="hidden sm:inline">MOVE TO WISH LIST</span>
                                                                    <span className="sm:hidden">WISH LIST</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => saveForLater(item.product_id)}
                                                                    className="flex items-center justify-center space-x-1 rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                                >
                                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                                                        />
                                                                    </svg>
                                                                    <span className="hidden sm:inline">SAVE FOR LATER</span>
                                                                    <span className="sm:hidden">SAVE</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => removeItem(item.product_id)}
                                                                    className="flex items-center justify-center space-x-1 rounded-md border border-red-300 px-3 py-2 text-red-700 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                                                >
                                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                        />
                                                                    </svg>
                                                                    <span>REMOVE</span>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Desktop Price Section - Hidden on mobile */}
                                                        <div className="hidden text-right sm:block">
                                                            <div className="mb-1">
                                                                <span className="text-sm text-gray-500 line-through">$1,799.99</span>
                                                                <span className="ml-2 rounded bg-red-100 px-2 py-1 text-xs font-bold text-red-800">
                                                                    Save: $920.99 (51%)
                                                                </span>
                                                            </div>
                                                            <div className="text-2xl font-bold text-gray-900 lg:text-3xl">
                                                                ${(item.price * item.quantity).toFixed(2)}
                                                            </div>
                                                            <div className="mt-1 text-sm text-green-600">
                                                                200+ people have this item in their cart.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Suggested Products */}
                            <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white sm:p-6">
                                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                        <h3 className="text-lg font-bold sm:text-xl">PRODUCTS RELATED TO THIS ITEM</h3>
                                        <span className="bg-opacity-20 self-start rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-900 sm:self-center">
                                            Recommended for you
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                                        {suggestedProducts.map((product) => (
                                            <div
                                                key={product.id}
                                                className="group rounded-lg border border-gray-200 p-2 transition-all hover:border-blue-300 hover:shadow-lg sm:p-4"
                                            >
                                                <div className="relative mb-3">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="h-24 w-full rounded-lg object-cover transition-transform group-hover:scale-105 sm:h-36"
                                                    />
                                                    <div className="absolute top-1 left-1 rounded-full bg-orange-500 px-1.5 py-0.5 text-xs font-bold text-white sm:top-2 sm:left-2 sm:px-2 sm:py-1">
                                                        NEW
                                                    </div>
                                                    {product.originalPrice && (
                                                        <div className="absolute top-1 right-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white sm:top-2 sm:right-2 sm:px-2 sm:py-1">
                                                            SALE
                                                        </div>
                                                    )}
                                                </div>
                                                <h4 className="mb-2 line-clamp-2 text-xs font-semibold text-gray-900 group-hover:text-blue-600 sm:mb-3 sm:text-sm">
                                                    {product.name}
                                                </h4>
                                                <div className="mb-2 flex flex-col items-start justify-between space-y-1 sm:mb-3 sm:flex-row sm:items-center sm:space-y-0">
                                                    <div className="flex items-center space-x-1">
                                                        <div className="flex text-xs text-yellow-400 sm:text-sm">
                                                            {'★'.repeat(Math.floor(product.rating))}
                                                            {'☆'.repeat(5 - Math.floor(product.rating))}
                                                        </div>
                                                        <span className="text-xs text-gray-500 sm:text-sm">({product.rating})</span>
                                                    </div>
                                                    <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800 sm:px-2 sm:py-1">
                                                        Free Ship
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
                                                    <div className="flex flex-col text-center sm:text-left">
                                                        <div className="flex items-center justify-center space-x-1 sm:justify-start sm:space-x-2">
                                                            <span className="text-sm font-bold text-gray-900 sm:text-lg">${product.price}</span>
                                                            {product.originalPrice && (
                                                                <span className="text-xs text-gray-500 line-through sm:text-sm">
                                                                    ${product.originalPrice}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {product.originalPrice && (
                                                            <span className="text-xs text-green-600">
                                                                Save ${(product.originalPrice - product.price).toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => addSuggestedProduct(product)}
                                                        className="w-full rounded-lg bg-blue-600 px-2 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
                                                    >
                                                        <span className="sm:hidden">Add</span>
                                                        <span className="hidden sm:inline">Add to Cart</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="mt-8 lg:col-span-4 lg:mt-0">
                            <div className="sticky top-4 space-y-4">
                                {/* Summary Card */}
                                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                    <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">Summary</h3>
                                        <span className="self-start rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 sm:self-center">
                                            {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                                        </span>
                                    </div>

                                    <div className="mb-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span className="text-lg font-semibold">${total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Shipping:</span>
                                            <div className="text-right">
                                                <span className="font-semibold text-green-600">FREE</span>
                                                <div className="text-xs text-gray-500">Orders over $49</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Tax (estimated):</span>
                                            <span className="font-semibold">${(total * 0.08).toFixed(2)}</span>
                                        </div>
                                        <div className="border-t pt-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-bold text-gray-900 sm:text-xl">Est. Total:</span>
                                                <span className="text-xl font-bold text-gray-900 sm:text-2xl">${(total * 1.08).toFixed(2)}</span>
                                            </div>
                                            <div className="mt-1 text-right text-sm text-green-600">You saved $920.99 today!</div>
                                        </div>
                                    </div>

                                    {/* Promo Code */}
                                    <div className="mb-6 rounded-lg border border-dashed text-black border-gray-300 p-4">
                                        <div className="mb-2 flex items-center space-x-2">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                                />
                                            </svg>
                                            <span className="text-sm font-medium text-gray-700">Have a promo code?</span>
                                        </div>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                placeholder="Enter promo code"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                className="flex-1 rounded-l-lg border  border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                            />
                                            <button className="rounded-r-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none">
                                                Apply
                                            </button>
                                        </div>
                                    </div>

                                    {/* Checkout Buttons */}
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => (window.location.href = '/checkout')}
                                            disabled={cart.length === 0}
                                            className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 py-3 font-bold text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-xl disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300 disabled:shadow-none sm:py-4"
                                        >
                                            <div className="flex items-center justify-center space-x-2">
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                    />
                                                </svg>
                                                <span className="text-sm sm:text-base">SECURE CHECKOUT</span>
                                            </div>
                                        </button>

                                        <div className="relative flex items-center justify-center">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300"></div>
                                            </div>
                                            <div className="relative bg-white px-4">
                                                <span className="text-sm text-gray-500">OR</span>
                                            </div>
                                        </div>

                                        <button
                                            disabled={cart.length === 0}
                                            className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 sm:py-4"
                                        >
                                            <div className="flex items-center justify-center space-x-2">
                                                <span className="text-sm sm:text-base">PayPal</span>
                                                <span className="text-blue-200">|</span>
                                                <span className="text-sm sm:text-base">Pay in 4</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Security Badge */}
                                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <svg
                                                className="h-6 w-6 text-green-600 sm:h-8 sm:w-8"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-green-800">Secure Shopping</div>
                                            <div className="text-xs text-green-600 sm:text-sm">SSL encrypted checkout & 30-day return policy</div>
                                        </div>
                                    </div>
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
