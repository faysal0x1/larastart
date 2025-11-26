import WebLayout from '@/layouts/web/WebLayout';
import { Link } from '@inertiajs/react';
import { Eye, Star } from 'lucide-react';
import { useState } from 'react';
import ProductTypeModal from '../common/ProductTypeModal';
import { Head } from '@inertiajs/react';

const Brand = () => {
    // State for modal management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Helper function to open modal with product data
    const openProductModal = (product) => {
        // Transform the product data to match ProductTypeModal expected format
        const transformedProduct = {
            id: product.id || Math.random(), // Add ID if not present
            name: product.name,
            brand: 'ABS', // All products are ABS brand
            price: parseFloat(product.price.replace('$', '').replace(',', '')),
            rating: product.rating,
            reviewCount: product.reviews,
            inStock: true, // Assuming all are in stock
            images: [product.image, product.image, product.image], // Using same image multiple times
            description: product.subtitle || 'High-performance gaming PC designed for enthusiasts.',
        };
        setSelectedProduct(transformedProduct);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    // Hero Section Component - ABS Store Style
    const HeroSection = () => (
        <div className="from-g-400 relative bg-gradient-to-br via-gray-600 to-sky-800 text-white">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
            <div className="max-w-8xl relative mx-auto px-4 py-12">
                <div className="shadow-7xl mb-8 rounded-xl bg-white/9 p-8 backdrop-blur-sm">
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="from-white-500 to-white-500 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br shadow-lg">
                                        <img
                                            src="https://c1.neweggimages.com/brandimage/Brand8484.gif"
                                            alt="ABS Logo"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h1 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl">Shop All ABS Products At TBZ Store</h1>
                                    <p className="text-[16px] leading-relaxed text-gray-700">
                                        We are the gaming label ADVANCED BATTLESTATIONS, a gaming system integrator with 30 years of history in the
                                        business. Whether it is your goal to win top Esports tournaments, entertain millions online, or build the
                                        ultimate PC setup, ABS is here to advance your gaming. We are...
                                    </p>
                                    <button className="mt-4 text-[15px] font-semibold text-gray-800 hover:text-gray-600">See More ›</button>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="grid grid-cols-2 gap-6 text-center">
                                <div>
                                    <div className="mb-1 text-3xl font-bold text-gray-900 lg:text-4xl">451 K+</div>
                                    <div className="text-[20px] font-medium text-gray-800">Orders</div>
                                </div>
                                <div>
                                    <div className="mb-1 text-4xl font-bold text-gray-900 lg:text-4xl">4.8</div>
                                    <div className="text-[20px] font-medium text-gray-800">Product Rating</div>
                                    <div className="mt-1 flex justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-current text-yellow-400' : 'text-gray-'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Bar */}
                <div className="rounded-xl bg-white/9 p-4 shadow-lg backdrop-blur-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Navigation Links */}
                        <div className="flex flex-wrap items-center gap-6">
                            <button className="border-b-2 border-gray-900 pb-1 text-[18px] font-semibold text-orange-500">Store Home</button>
                            <button className="text-[18px] font-medium text-gray-900 transition-colors hover:text-orange-500">Categories ▼</button>
                            <button className="text-[18px] font-medium text-gray-900 transition-colors hover:text-orange-500">
                                All Products (430)
                            </button>
                            <button className="text-[18px] font-medium text-gray-900 transition-colors hover:text-orange-500">About ABS</button>
                        </div>

                        {/* Search Bar */}
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search Store"
                                    className="w-64 rounded-lg border border-gray-200 bg-gray-600 px-4 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                />
                                <button className="absolute top-1/2 right-2 -translate-y-1/2 transform">
                                    <svg className="h-4 w-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Brand Banner Section - Windows 11 Gaming Style
    const BrandBanner = () => (
        <div className="relative min-h-screen overflow-hidden bg-black">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="https://promotions.newegg.com/FlagShip/ABS/images/hero.jpg"
                    alt="Gaming Setup Background"
                    className="h-full w-full object-cover opacity-70"
                />
                {/* Dark Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex min-h-screen items-center">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                        {/* Left Content */}
                        <div className="space-y-6 text-white">
                            {/* Main Heading */}
                            <h1 className="text-6xl leading-tight font-bold md:text-7xl">
                                <span className="text-white">Easier to</span>
                                <br />
                                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Play</span>
                            </h1>

                            {/* Subtitle */}
                            <div className="space-y-2 text-xl text-gray-200">
                                <p>More games. Better graphics. Higher performance.</p>
                                <p className="text-lg opacity-90">
                                    Wherever the limit is with gaming, you're closer to it with
                                    <span className="font-semibold text-orange-400"> Advanced Battlestations</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform text-white/60">
                <div className="flex flex-col items-center space-y-2">
                    <span className="text-sm">Scroll to explore</span>
                    <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30">
                        <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-white/60"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Product Showcase Section
    const ProductShowcase = () => (
        <div className="max-w-8xl mx-auto px-20 py-20">
            {/* EURUS Section */}
            <div className="mb-50% grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                <div>
                    <h2 className="mb-4 text-7xl font-bold text-orange-500">EURUS</h2>
                    <p className="mb-6 text-3xl text-black">Set your performance</p>
                    <p className="mb-6 text-2xl text-gray-600">
                        Designed to meet the needs of today's most demanding gamers, the EURUS series delivers exceptional performance with premium
                        components and advanced cooling solutions.
                    </p>
                    <div className="mb-8 grid">
                        <div className="h-100% w-100% items-center justify-center bg-gradient-to-br">
                            <img src="https://promotions.newegg.com/FlagShip/ABS/images/icons_.jpg" />
                        </div>
                    </div>
                    <button className="rounded bg-orange-500 px-6 py-2 text-white hover:bg-orange-600">DISCOVER</button>
                </div>
                <div className="relative">
                    <img
                        src="https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg"
                        alt="EURUS Gaming PC"
                        className="mx-auto w-full max-w-md rounded-lg shadow-lg"
                        style={{ minHeight: '600px', minWidth: '600px', objectFit: 'cover' }}
                    />
                </div>
            </div>

            {/* CYCLONE Section */}
            <div className="mb-16 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                <div className="lg:order-2">
                    <h2 className="mb-4 text-7xl font-bold text-orange-500">CYCLONE</h2>
                    <p className="mb-6 text-3xl text-black">Feel the storm of gaming</p>
                    <p className="mb-6 text-2xl text-gray-600">
                        Experience the power of the storm with CYCLONE series gaming PCs. Built for enthusiasts who demand the highest performance and
                        cutting-edge technology.
                    </p>
                    <div className="mb-8 grid">
                        <div className="h-100% w-100% items-center justify-center bg-gradient-to-br">
                            <img src="https://promotions.newegg.com/FlagShip/ABS/images/icons_.jpg" />
                        </div>
                    </div>
                    <button className="rounded bg-orange-500 px-6 py-2 text-white hover:bg-orange-600">DISCOVER</button>
                </div>
                <div className="relative lg:order-1">
                    <img
                        src="https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg"
                        alt="CYCLONE Gaming PC"
                        className="mx-auto w-full max-w-md rounded-lg shadow-lg"
                        style={{ minHeight: '600px', minWidth: '600px', objectFit: 'cover' }}
                    />
                </div>
            </div>

            {/* REDLAN Section */}
            <div className="mb-16 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                <div>
                    <h2 className="mb-4 text-7xl font-bold text-orange-500">REDLAN</h2>
                    <p className="mb-6 text-3xl text-black">Embrace the future of performance</p>
                    <p className="mb-6 text-2xl text-gray-600">
                        REDLAN gaming systems combine elegant design with powerful performance. Perfect for gamers who appreciate both style and
                        substance in their gaming setup.
                    </p>
                    <div className="mb-8 grid">
                        <div className="h-100% w-100% items-center justify-center bg-gradient-to-br">
                            <img src="https://promotions.newegg.com/FlagShip/ABS/images/icons_.jpg" />
                        </div>
                    </div>
                    <button className="rounded bg-orange-500 px-6 py-2 text-white hover:bg-orange-600">DISCOVER</button>
                </div>
                <div className="relative">
                    <img
                        src="https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg"
                        alt="REDLAN Gaming PC"
                        className="mx-auto w-full max-w-md rounded-lg shadow-lg"
                        style={{ minHeight: '600px', minWidth: '600px', objectFit: 'cover' }}
                    />
                </div>
            </div>

            {/* ZAURION Section */}
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                <div className="lg:order-2">
                    <h2 className="mb-4 text-7xl font-bold text-orange-500">ZAURION</h2>
                    <p className="mb-6 text-3xl text-black">Power beyond limits</p>
                    <p className="mb-6 text-2xl text-gray-600">
                        Unleash unlimited potential with ZAURION workstations. Engineered for professionals and enthusiasts who need maximum
                        computational power for their most demanding tasks.
                    </p>
                    <div className="mb-8 grid">
                        <div className="h-100% w-100% items-center justify-center bg-gradient-to-br">
                            <img src="https://promotions.newegg.com/FlagShip/ABS/images/icons_.jpg" />
                        </div>
                    </div>
                    <button className="rounded bg-orange-500 px-6 py-2 text-white hover:bg-orange-600">DISCOVER</button>
                </div>
                <div className="relative lg:order-1">
                    <img
                        src="https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg"
                        alt="ZAURION Workstation"
                        className="mx-auto w-full max-w-md rounded-lg shadow-lg"
                        style={{ minHeight: '600px', minWidth: '600px', objectFit: 'cover' }}
                    />
                </div>
            </div>
        </div>
    );

    // Promotions Section
    const PromotionsSection = () => (
        <div className="bg-gray-100 py-16">
            <div className="max-w-8xl mx-auto px-4">
                <h2 className="mb-8 text-center text-4xl font-bold text-black">Promotions & Deals</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            name: 'ABS Eurus Aqua Gaming PC',
                            price: '$1,969',
                            originalPrice: '$2,699',
                            discount: '27',
                            discountText: 'OFF',
                            saleEndTime: '16 Hours',
                            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                            bgColor: 'bg-red-500',
                            cardStyle: 'red',
                        },
                        {
                            name: 'ABS Cyclone Aqua Gaming PC',
                            price: '$1,219',
                            originalPrice: '$1,649',
                            discount: '12',
                            discountText: 'off',
                            saleEndTime: '16 Hours',
                            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                            bgColor: 'bg-orange-100',
                            cardStyle: 'beige',
                        },
                        {
                            name: 'ABS Eurus Ruby Gaming PC',
                            price: '$3,999',
                            originalPrice: '$5,499',
                            discount: '27',
                            discountText: 'off',
                            saleEndTime: '8 Hours',
                            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                            bgColor: 'bg-yellow-200',
                            cardStyle: 'yellow',
                        },
                        {
                            name: 'ABS Eurus Ruby Gaming PC',
                            price: '$2,199',
                            originalPrice: '$2,999',
                            discount: '12',
                            discountText: 'off',
                            saleEndTime: '24 Hours',
                            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                            bgColor: 'bg-red-500',
                            cardStyle: 'red',
                        },
                    ].map((product, index) => (
                        <div
                            key={index}
                            className={`relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${product.bgColor}`}
                        >
                            {/* Background Design Elements */}
                            <div className="absolute inset-0">
                                {product.cardStyle === 'red' && (
                                    <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-white/20"></div>
                                )}
                                {product.cardStyle === 'beige' && (
                                    <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-orange-200/30"></div>
                                )}
                                {product.cardStyle === 'yellow' && (
                                    <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-white/20"></div>
                                )}
                            </div>

                            <div className="relative p-6">
                                {/* Discount Badge */}
                                <div
                                    className={`absolute top-4 right-4 ${
                                        product.cardStyle === 'red' ? 'bg-white text-red-500' : 'bg-red-500 text-white'
                                    } flex h-16 w-16 flex-col items-center justify-center rounded-full text-center shadow-lg`}
                                >
                                    <span className="text-xl font-bold">{product.discount}</span>
                                    <span className="text-xs font-semibold">{product.discountText}</span>
                                </div>

                                {/* Product Info */}
                                <div className="mb-4">
                                    <h3 className={`mb-2 text-lg font-bold ${product.cardStyle === 'red' ? 'text-white' : 'text-gray-900'}`}>
                                        {product.name}
                                    </h3>
                                    <div className={`text-2xl font-bold ${product.cardStyle === 'red' ? 'text-white' : 'text-gray-900'}`}>
                                        {product.price}
                                        <span className="text-lg">.99</span>
                                    </div>
                                    <div className={`text-sm ${product.cardStyle === 'red' ? 'text-red-200' : 'text-gray-600'}`}>
                                        Sale Ends in {product.saleEndTime}
                                    </div>
                                </div>

                                {/* Product Image */}
                                <div className="flex justify-center">
                                    <div
                                        className={`relative ${
                                            product.cardStyle === 'beige'
                                                ? 'bg-orange-200/50'
                                                : product.cardStyle === 'yellow'
                                                  ? 'bg-yellow-300/30'
                                                  : 'bg-white/10'
                                        } rounded-2xl p-4`}
                                    >
                                        <img src={product.image} alt={product.name} className="h-32 w-32 rounded-lg object-cover" />
                                        {/* AMD/Intel Badge */}
                                        {(index === 1 || index === 3) && (
                                            <div className="absolute right-2 bottom-2 rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                                                Intel
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Best Sellers Section
    const BestSellersSection = () => (
        <div className="max-w-8xl mx-auto px-4 py-16">
            <h2 className="mb-8 text-center text-4xl font-bold text-black">Best Seller</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {[
                    {
                        id: 1,
                        name: 'ABS Cyclone Aqua Gaming PC',
                        subtitle: 'Windows 11 - Intel Core Ultra 7 265KF - GeForce RTX 5070',
                        price: '$1,699',
                        originalPrice: '$2,299',
                        discount: 'Save 26%',
                        rating: 4.8,
                        reviews: 122,
                        promoCode: 'TECE693',
                        promoDiscount: '10%',
                        saleEndTime: '16 Hours',
                        image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                        hasShipping: true,
                    },
                    {
                        id: 2,
                        name: 'ABS Tornado Elite Gaming PC',
                        subtitle: 'Windows 11 - AMD Ryzen 7 7700X - GeForce RTX 4080',
                        price: '$2,199',
                        originalPrice: '$2,799',
                        discount: 'Save 21%',
                        rating: 4.7,
                        reviews: 203,
                        promoCode: 'GAME2024',
                        promoDiscount: '8%',
                        saleEndTime: '8 Hours',
                        image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                        hasShipping: true,
                    },
                    {
                        id: 3,
                        name: 'ABS Vortex Pro Gaming PC',
                        subtitle: 'Windows 11 - Intel Core i7-13700F - GeForce RTX 4070 Super',
                        price: '$1,899',
                        originalPrice: '$2,299',
                        discount: 'Save 17%',
                        rating: 4.9,
                        reviews: 89,
                        promoCode: 'SUPER70',
                        promoDiscount: '12%',
                        saleEndTime: '12 Hours',
                        image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                        hasShipping: true,
                    },
                    {
                        id: 4,
                        name: 'ABS Nova Compact Gaming PC',
                        subtitle: 'Windows 11 - AMD Ryzen 5 7600X - GeForce RTX 4060',
                        price: '$1,299',
                        originalPrice: '$1,599',
                        discount: 'Save 19%',
                        rating: 4.6,
                        reviews: 127,
                        promoCode: 'COMPACT60',
                        promoDiscount: '5%',
                        saleEndTime: '24 Hours',
                        image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                        hasShipping: true,
                    },
                    {
                        id: 5,
                        name: 'ABS Creator Workstation Pro',
                        subtitle: 'Windows 11 - Intel Core i9-13900K - GeForce RTX 4090',
                        price: '$3,699',
                        originalPrice: '$4,199',
                        discount: 'Save 12%',
                        rating: 4.8,
                        reviews: 64,
                        promoCode: 'CREATE90',
                        promoDiscount: '7%',
                        saleEndTime: '6 Hours',
                        image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                        hasShipping: true,
                    },
                ].map((product, index) => (
                    <div
                        key={index}
                        className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Product Image with Hover Overlay */}
                        <div className="relative overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Intel Inside Badge */}
                            <div className="absolute right-2 bottom-2 rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white">Intel Inside</div>

                            {/* Quick View Button - appears on hover */}
                            <div className="bg-opacity-0 group-hover:bg-opacity-40 absolute inset-0 flex items-center justify-center transition-all duration-300">
                                <button
                                    onClick={() => openProductModal(product)}
                                    className="flex translate-y-4 transform items-center gap-2 rounded-full bg-white px-6 py-2 font-semibold text-gray-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-gray-100"
                                >
                                    <Eye className="h-4 w-4" />
                                    Quick View
                                </button>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-4">
                            {/* Rating */}
                            <div className="mb-2 flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                                <span className="ml-1 text-sm text-gray-600">({product.reviews})</span>
                            </div>

                            {/* Product Name */}
                            <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-900">
                                {product.name} - {product.subtitle}
                            </h3>

                            {/* Promo Code Offer */}
                            <div className="mb-2 text-xs text-red-600">
                                + {product.promoDiscount} off w/ promo code {product.promoCode}, limited offer
                            </div>

                            {/* Save Badge */}
                            <div className="mb-3 inline-block rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">{product.discount}</div>

                            {/* Price */}
                            <div className="mb-2">
                                <span className="text-xl font-bold text-gray-900">{product.price}</span>
                                <span className="ml-1 text-sm">.99</span>
                                <div className="text-sm text-gray-500 line-through">{product.originalPrice}.99</div>
                            </div>

                            {/* Sale End Time */}
                            <div className="mb-3 text-sm text-red-600">Sale Ends in {product.saleEndTime}</div>

                            {/* Free Shipping */}
                            {product.hasShipping && <div className="text-sm font-semibold text-blue-600 italic">FREE SHIPPING</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Best Rating Section
    const BestRatingSection = () => (
        <div className="bg-gray-50 py-16">
            <div className="max-w-8xl mx-auto px-4">
                <h2 className="mb-8 text-center text-4xl font-bold text-black">Best Rating</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {[
                        {
                            name: 'ABS Aquilon Aqua Gaming PC',
                            subtitle: 'Windows 11 Intel Core i5-14400F GeForce RTX 5060',
                            price: '$999',
                            originalPrice: '$1,099',
                            discount: 'Save 9%',
                            rating: 5.0,
                            reviews: 296,
                            bundleOffer: 'Intel game bundle w/ purchase, Limited Offer by ABS',
                            saleEndTime: '16 Hours',
                            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                            hasShipping: true,
                        },
                        {
                            name: 'ABS Tornado Elite Gaming PC',
                            subtitle: 'Windows 11 AMD Ryzen 7 7700X GeForce RTX 4080',
                            price: '$2,199',
                            originalPrice: '$2,499',
                            discount: 'Save 12%',
                            rating: 4.9,
                            reviews: 178,
                            bundleOffer: 'AMD game bundle w/ purchase, Limited Offer by ABS',
                            saleEndTime: '8 Hours',
                            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                            hasShipping: true,
                        },
                        {
                            name: 'ABS Vortex Pro Gaming PC',
                            subtitle: 'Windows 11 Intel Core i7-13700F GeForce RTX 4070',
                            price: '$1,799',
                            originalPrice: '$1,999',
                            discount: 'Save 10%',
                            rating: 4.9,
                            reviews: 156,
                            bundleOffer: 'Intel game bundle w/ purchase, Limited Offer by ABS',
                            saleEndTime: '12 Hours',
                            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                            hasShipping: true,
                        },
                        {
                            name: 'ABS Nova Compact Gaming PC',
                            subtitle: 'Windows 11 AMD Ryzen 5 7600X GeForce RTX 4060',
                            price: '$1,299',
                            originalPrice: '$1,449',
                            discount: 'Save 10%',
                            rating: 4.8,
                            reviews: 89,
                            bundleOffer: 'AMD game bundle w/ purchase, Limited Offer by ABS',
                            saleEndTime: '24 Hours',
                            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                            hasShipping: true,
                        },
                        {
                            name: 'ABS Creator Workstation Pro',
                            subtitle: 'Windows 11 Intel Core i9-13900K GeForce RTX 4090',
                            price: '$3,699',
                            originalPrice: '$3,999',
                            discount: 'Save 7%',
                            rating: 4.8,
                            reviews: 67,
                            bundleOffer: 'Intel game bundle w/ purchase, Limited Offer by ABS',
                            saleEndTime: '6 Hours',
                            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                            hasShipping: true,
                        },
                    ].map((product, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
                        >
                            {/* Product Image */}
                            <div className="relative">
                                <img src={product.image} alt={product.name} className="h-100% w-full object-cover" />
                                {/* Intel Inside Badge */}
                                <div className="absolute right-2 bottom-2 rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white">Intel Core</div>
                            </div>

                            {/* Card Content */}
                            <div className="p-4">
                                {/* Rating */}
                                <div className="mb-2 flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                    <span className="ml-1 text-sm text-gray-600">({product.reviews})</span>
                                </div>

                                {/* Product Name */}
                                <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-900">
                                    {product.name} - {product.subtitle}
                                </h3>

                                {/* Bundle Offer */}
                                <div className="mb-2 text-xs text-red-600">{product.bundleOffer}</div>

                                {/* Save Badge */}
                                <div className="mb-3 inline-block rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">{product.discount}</div>

                                {/* Price */}
                                <div className="mb-2">
                                    <span className="text-xl font-bold text-gray-900">{product.price}</span>
                                    <span className="ml-1 text-sm">.99</span>
                                    <div className="text-sm text-gray-500 line-through">{product.originalPrice}.99</div>
                                </div>

                                {/* Sale End Time */}
                                <div className="mb-3 text-sm text-red-600">Sale Ends in {product.saleEndTime}</div>

                                {/* Free Shipping */}
                                {product.hasShipping && <div className="text-sm font-semibold text-blue-600 italic">FREE SHIPPING</div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Product Reviews Section
    const ProductReviewsSection = () => (
        <div className="mx-auto max-w-7xl px-4 py-16">
            <h2 className="mb-8 text-center text-4xl font-bold text-black">Product Reviews</h2>

            {/* Rating Overview */}
            <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Overall Rating */}
                <div className="flex items-center justify-center rounded-lg bg-white p-8 shadow-lg">
                    <div className="text-center">
                        <div className="mb-4 text-6xl font-bold text-gray-900">4</div>
                        <div className="mb-4 flex justify-center">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-8 w-8 ${i < 4 ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <div className="text-lg font-semibold text-gray-700">Total score of all products</div>
                    </div>
                </div>

                {/* Rating Breakdown */}
                <div className="rounded-lg bg-white p-8 shadow-lg">
                    <div className="space-y-4">
                        {[
                            { stars: 5, count: 12131, percentage: 57 },
                            { stars: 4, count: 3661, percentage: 17 },
                            { stars: 3, count: 1583, percentage: 8 },
                            { stars: 2, count: 1248, percentage: 6 },
                            { stars: 1, count: 2428, percentage: 12 },
                        ].map((rating) => (
                            <div key={rating.stars} className="flex items-center gap-4">
                                <span className="w-12 text-sm text-gray-600">{rating.stars} star</span>
                                <div className="flex-1">
                                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                        <div className="h-full bg-orange-400" style={{ width: `${rating.percentage}%` }}></div>
                                    </div>
                                </div>
                                <span className="w-20 text-right text-sm font-medium text-gray-900">
                                    {rating.count.toLocaleString()} ({rating.percentage}%)
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Individual Reviews */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    {
                        user: 'Gaming Enthusiast',
                        rating: 5,
                        comment:
                            'Amazing performance, runs all my games at max settings! The RGB lighting is fantastic and the cooling system keeps everything running smoothly even during intense gaming sessions.',
                        image: '/image/C01CS2505130JKLSW06.webp',
                        date: '2 days ago',
                        verified: true,
                    },
                    {
                        user: 'Content Creator',
                        rating: 5,
                        comment:
                            'Perfect for streaming and video editing. Highly recommended! The processing power handles 4K video editing without any lag, and streaming is butter smooth.',
                        image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                        date: '1 week ago',
                        verified: true,
                    },
                    {
                        user: 'Pro Gamer',
                        rating: 4,
                        comment:
                            'Solid build quality and excellent cooling system. Great performance overall, though I wish the RGB software was a bit more intuitive. Still very satisfied with the purchase.',
                        image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                        date: '2 weeks ago',
                        verified: true,
                    },
                    {
                        user: 'Tech Reviewer',
                        rating: 5,
                        comment:
                            'Outstanding value for money. Best purchase this year! The specs are top-notch and the build quality exceeds expectations. Highly recommend for anyone looking for a premium gaming PC.',
                        image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
                        date: '3 weeks ago',
                        verified: true,
                    },
                ].map((review, index) => (
                    <div key={index} className="rounded-lg border bg-white p-4 transition-shadow hover:shadow-lg">
                        <img src={review.image} alt="Review" className="h-100% mb-4 w-full rounded object-cover" />

                        {/* Rating and Verification */}
                        <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            {review.verified && <span className="text-xs font-medium text-green-600">✓ Verified Purchase</span>}
                        </div>

                        {/* Review Content */}
                        <p className="mb-3 line-clamp-4 text-sm text-gray-600">{review.comment}</p>

                        {/* User Info */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="font-medium">{review.user}</span>
                            <span>{review.date}</span>
                        </div>

                        {/* Helpful Button */}
                        <div className="mt-3 border-t pt-3">
                            <button className="text-xs text-gray-500 hover:text-gray-700">👍 Helpful (24)</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More Reviews Button */}
            <div className="mt-8 text-center">
                <button className="rounded-lg bg-sky-900 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-orange-600">
                    Load More Reviews
                </button>
            </div>
        </div>
    );

    // Article Section
    const ArticleSection = () => (
        <div className="bg-gray-50 py-16">
            <div className="max-w-8xl mx-auto px-4">
                <div className="rounded-lg bg-white p-8 shadow-lg">
                    {/* Article Header */}
                    <div className="mb-8 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">ABS</h1>
                        <p className="text-lg text-gray-600">
                            Advanced Battle Station (ABS) is a leading brand specializing in high-performance gaming equipment, including pre-built{' '}
                            <Link href="#" className="text-blue-600 hover:underline">
                                gaming PCs
                            </Link>
                            ,{' '}
                            <Link href="#" className="text-blue-600 hover:underline">
                                gaming laptops
                            </Link>
                            , peripherals, and accessories. Explore the extensive range of ABS products available on{' '}
                            <Link href="#" className="text-blue-600 hover:underline">
                                Newegg
                            </Link>
                            , a top choice among gamers and high-performance computer users.
                        </p>
                    </div>

                    {/* Article Content */}
                    <div className="space-y-8">
                        {/* How Does ABS Perform Section */}
                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">How Does ABS Perform?</h2>
                            <p className="mb-4 text-gray-700">
                                ABS systems are designed to deliver top-tier performance, equipped with the latest processors and graphics cards. To
                                see how ABS desktops with RTX 50 Series GPUs redefine performance for gaming and AI workloads, check out this feature:{' '}
                                <Link href="#" className="text-blue-600 hover:underline">
                                    ABS Zaurion Workstations with NVIDIA RTX PRO600 Blackwell
                                </Link>
                                . Equipped with the latest processors and graphics cards, Gamers can enjoy smooth, high-quality visuals and superior
                                gaming experiences thanks to cutting-edge NVIDIA GeForce GTX series GPUs and next-generation processors from Intel or
                                AMD.
                            </p>
                        </section>

                        {/* What Sets ABS Gaming PCs Apart Section */}
                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">What Sets ABS Gaming PCs Apart?</h2>
                            <p className="mb-4 text-gray-700">
                                ABS stands out for its expertise in Linux-based systems, particularly Ubuntu. ABS offers{' '}
                                <Link href="#" className="text-blue-600 hover:underline">
                                    Ubuntu high-performance PCs
                                </Link>{' '}
                                that are optimized for developers, engineers, and researchers. These systems deliver enhanced performance for
                                computing-intensive tasks, ensuring seamless integration with Ubuntu's open-source ecosystem. Want to see how ABS
                                leverages AI acceleration for real-world research and model training? Phison's{' '}
                                <Link href="#" className="text-blue-600 hover:underline">
                                    AIDAPTIV Acceleration in ABS AI Training PCs
                                </Link>{' '}
                                The result is a powerful, flexible, and reliable solution for professionals who need high computing power for tasks
                                like:
                            </p>
                            <ul className="ml-6 list-disc space-y-2 text-gray-700">
                                <li>Scientific simulations</li>
                                <li>Data analysis</li>
                                <li>Software development</li>
                            </ul>
                        </section>

                        {/* Is ABS Cost-Effective Section */}
                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">Is ABS Cost-Effective?</h2>
                            <p className="text-gray-700">
                                Despite offering exceptional performance, ABS products are competitively priced. Pre-built ABS systems often present a
                                cost advantage over{' '}
                                <Link href="#" className="text-blue-600 hover:underline">
                                    custom-built PCs
                                </Link>
                                , with the added benefit of included warranties and technical support.
                            </p>
                        </section>

                        {/* Quality and Durability Section */}
                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">What About ABS's Quality and Durability?</h2>
                            <p className="text-gray-700">
                                ABS products are well-regarded for their build quality and durability. The brand focuses on reliable components,
                                ensuring that its gaming PCs and accessories can perform consistently under extended, intense use.
                            </p>
                        </section>

                        {/* Can I Upgrade My ABS System Section */}
                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">Can I Upgrade My ABS System?</h2>
                            <p className="text-gray-700">
                                Although ABS specializes in pre-built systems, their products are designed with upgradability in mind. Users can
                                easily upgrade components such as{' '}
                                <Link href="#" className="text-blue-600 hover:underline">
                                    memory
                                </Link>
                                ,{' '}
                                <Link href="#" className="text-blue-600 hover:underline">
                                    RAM
                                </Link>
                                , or{' '}
                                <Link href="#" className="text-blue-600 hover:underline">
                                    GPU
                                </Link>{' '}
                                to meet future performance needs.
                            </p>
                        </section>

                        {/* Conclusion Section */}
                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">Conclusion</h2>
                            <p className="text-gray-700">
                                Advanced Battle Station (ABS) focuses on delivering high-performance gaming solutions at competitive prices. With a
                                reputation for quality, durability, upgradability, and expertise in both Windows and Linux-based systems like Ubuntu,
                                ABS meets the needs of gamers, developers, engineers, and researchers alike.
                            </p>
                        </section>
                    </div>

                    {/* Article Footer */}
                    <div className="mt-8 border-t pt-6">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Published on ABS Gaming Hub</span>
                            <span>Last updated: September 2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <WebLayout>
            <Head>
                <title>ABS - High-Performance Gaming PCs & Laptops | TBZ</title>
                <meta
                    name="description"
                    content="Explore high-performance gaming PCs and laptops from ABS at TBZ. Discover powerful systems with the latest Intel and AMD processors, NVIDIA graphics, and cutting-edge features for an unparalleled gaming experience."
                />
                <meta name="keywords" content="ABS gaming PCs, ABS laptops, high-performance gaming, gaming desktops, gaming accessories" />
                <link rel="canonical" href="https://tbz.com.bd/" />
                {/* Open Graph Tags */}
                <meta property="og:title" content="ABS - High-Performance Gaming PCs & Laptops | TBZ" />
                <meta
                    property="og:description"
                    content="Explore high-performance gaming PCs and laptops from ABS at TBZ. Discover powerful systems with the latest Intel and AMD processors, NVIDIA graphics, and cutting-edge features for an unparalleled gaming experience."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tbz.com.bd/" />
                <meta property="og:image" content="https://tbz.com.bd/images/og-home.jpg" />
                <meta property="og:image:alt" content="ABS - High-Performance Gaming PCs & Laptops | TBZ" />
                <meta property="og:site_name" content="TBZ" />
                <meta property="og:locale" content="en_US" />
                {/* Twitter Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="ABS - High-Performance Gaming PCs & Laptops | TBZ" />
                <meta
                    name="twitter:description"
                    content="Explore high-performance gaming PCs and laptops from ABS at TBZ. Discover powerful systems with the latest Intel and AMD processors, NVIDIA graphics, and cutting-edge features for an unparalleled gaming experience."
                />
                <meta name="twitter:image" content="https://tbz.com.bd/images/og-home.jpg" />
                <meta name="twitter:image:alt" content="ABS - High-Performance Gaming PCs & Laptops | TBZ" />
                <meta name="twitter:site" content="@tbz" />
                <meta name="twitter:creator" content="@tbz" />
                 {/* Additional Meta Tags */}
                <meta name="robots" content="index, follow" />
                <link rel="icon" type="image/x-icon" href="https://tbz.com.bd/images/favicon.ico" />
                <link rel="apple-touch-icon" href="https://tbz.com.bd/images/apple-touch-icon.png" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="author" content="TBZ" />
           


                {/* Structured Data */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    '@context': 'https://schema.org',   
                    '@type': 'WebApplication',
                    name: 'TBZ',
                    url: 'https://tbz.com.bd/',
                    logo: 'https://tbz.com.bd/images/logo.png',
                    description: 'Explore high-performance gaming PCs and laptops from ABS at TBZ. Discover powerful systems with the latest Intel and AMD processors, NVIDIA graphics, and cutting-edge features for an unparalleled gaming experience.',
                    applicationCategory: 'BusinessApplication',
                }) }} />
            </Head>
            <div className="min-h-screen bg-white">
                <HeroSection />
                <BrandBanner />
                <ProductShowcase />
                <PromotionsSection />
                <BestSellersSection />
                <BestRatingSection />
                <ProductReviewsSection />
                <ArticleSection />
            </div>

            {/* Product Modal */}
            <ProductTypeModal isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />
        </WebLayout>
    );
};

export default Brand;
