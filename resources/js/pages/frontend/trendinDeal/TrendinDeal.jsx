import WebLayout from '@/layouts/web/WebLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronDown, ChevronUp, Search, Star } from 'lucide-react';
import { useState } from 'react';

const TrendingDeal = () => {
    const [expandedSections, setExpandedSections] = useState({
        components: true,
        computerSystems: true,
        manufacturer: true,
        price: true,
    });

    const [selectedFilters, setSelectedFilters] = useState({
        manufacturer: [],
        priceRange: [0, 1000],
    });

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const products = [
        {
            id: 1,
            name: 'AMD Ryzen 7 9800X3D - Ryzen 7 9000 Series - 8-Core, 16 Thread - Socket AM5',
            brand: 'AMD',
            price: 479.0,
            originalPrice: null,
            discount: null,
            rating: 4.5,
            reviews: 2054,
            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
            badges: ['Newegg Select'],
            shipping: 'FREE SHIPPING',
            stockStatus: 'In Stock',
            saleEndTime: '13 Hours',
        },
        {
            id: 2,
            name: 'ASUS PRIME GeForce RTX 5070 12GB GDDR7 PCI Express 5.0 DLSS 3.5',
            brand: 'ASUS',
            price: 549.99,
            originalPrice: null,
            discount: null,
            rating: 4.3,
            reviews: 1809,
            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
            badges: ['Newegg Select'],
            shipping: 'FREE SHIPPING',
            stockStatus: 'In Stock',
            saleEndTime: '5 Hours',
        },
        {
            id: 3,
            name: 'AMD Ryzen 5 9500X3D - Ryzen 5 9000 Series - 6-Core, 12 Thread - Socket AM5',
            brand: 'AMD',
            price: 699.0,
            originalPrice: null,
            discount: null,
            rating: 4.7,
            reviews: 892,
            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
            badges: ['Newegg Select'],
            shipping: 'FREE SHIPPING',
            stockStatus: 'In Stock',
            saleEndTime: '8 Hours',
        },
        {
            id: 4,
            name: 'Intel Core Ultra 7 265K Arrow Lake 20-Core 4P+12E LGA 1851, 125W',
            brand: 'Intel',
            price: 309.99,
            originalPrice: 342.49,
            discount: 'Save $32.50',
            rating: 4.1,
            reviews: 1196,
            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
            badges: [],
            shipping: 'FREE SHIPPING',
            stockStatus: 'In Stock',
            saleEndTime: '12 Hours',
        },
        {
            id: 5,
            name: 'ZOTAC SOLID 5FF OC GeForce RTX 5070 Ti 16GB 256-bit GDDR7 DLSS 4',
            brand: 'ZOTAC',
            price: 749.99,
            originalPrice: 899.99,
            discount: 'Save $150',
            rating: 4.6,
            reviews: 456,
            image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/14-500-543-V01.jpg',
            badges: ['Lowest price in 30 Days'],
            shipping: 'FREE SHIPPING',
            stockStatus: 'In Stock',
            saleEndTime: '6 Hours',
        },
        {
            id: 6,
            name: 'Samsung 980 PRO 2TB NVMe M.2 SSD Internal Solid State Drive',
            brand: 'Samsung',
            price: 149.99,
            originalPrice: 229.99,
            discount: 'Save $80',
            rating: 4.8,
            reviews: 3247,
            image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/20-147-789-V01.jpg',
            badges: ['AI Ready'],
            shipping: 'FREE SHIPPING',
            stockStatus: 'In Stock',
            saleEndTime: '18 Hours',
        },
        {
            id: 7,
            name: 'Acer Nitro V 16" Gaming Laptop Intel Core i5-13420H RTX 4050',
            brand: 'Acer',
            price: 949.99,
            originalPrice: 1099.99,
            discount: 'Save $150',
            rating: 4.2,
            reviews: 234,
            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
            badges: ['Lowest price in 30 Days'],
            shipping: 'FREE SHIPPING',
            stockStatus: 'In Stock',
            saleEndTime: '24 Hours',
        },
        {
            id: 8,
            name: 'Corsair Vengeance RGB 32GB (2 x 16GB) 288-Pin PC RAM DDR5 6000',
            brand: 'Corsair',
            price: 109.99,
            originalPrice: 144.99,
            discount: 'Save $35',
            rating: 4.7,
            reviews: 1578,
            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
            badges: [],
            shipping: 'FREE SHIPPING',
            stockStatus: 'In Stock',
            saleEndTime: '15 Hours',
        },
        {
            id: 9,
            name: 'Corsair Vengeance RGB 32GB (2 x 16GB) 288-Pin PC RAM DDR5 6000',
            brand: 'Corsair',
            price: 109.99,
            originalPrice: 144.99,
            discount: 'Save $35',
            rating: 4.7,
            reviews: 1578,
            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
            badges: [],
            shipping: 'FREE SHIPPING',
            stockStatus: 'In Stock',
            saleEndTime: '15 Hours',
        },
        {
            id: 10,
            name: 'Corsair Vengeance RGB 32GB (2 x 16GB) 288-Pin PC RAM DDR5 6000',
            brand: 'Corsair',
            price: 109.99,
            originalPrice: 144.99,
            discount: 'Save $35',
            rating: 4.7,
            reviews: 1578,
            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
            badges: [],
            shipping: 'FREE SHIPPING',
            stockStatus: 'In Stock',
            saleEndTime: '15 Hours',
        },
        {
            id: 11,
            name: 'Corsair Vengeance RGB 32GB (2 x 16GB) 288-Pin PC RAM DDR5 6000',
            brand: 'Corsair',
            price: 109.99,
            originalPrice: 144.99,
            discount: 'Save $35',
            rating: 4.7,
            reviews: 1578,
            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
            badges: [],
            shipping: 'FREE SHIPPING',
            stockStatus: 'In Stock',
            saleEndTime: '15 Hours',
        },

        {
            id: 12,
            name: 'Corsair Vengeance RGB 32GB (2 x 16GB) 288-Pin PC RAM DDR5 6000',
            brand: 'Corsair',
            price: 109.99,
            originalPrice: 144.99,
            discount: 'Save $35',
            rating: 4.7,
            reviews: 1578,
            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
            badges: [],
            shipping: 'FREE SHIPPING',
            stockStatus: 'In Stock',
            saleEndTime: '15 Hours',
        },
        {
            id: 13,
            name: 'Corsair Vengeance RGB 32GB (2 x 16GB) 288-Pin PC RAM DDR5 6000',
            brand: 'Corsair',
            price: 109.99,
            originalPrice: 144.99,
            discount: 'Save $35',
            rating: 4.7,
            reviews: 1578,
            image: 'https://promotions.newegg.com/FlagShip/ABS/images/ABS_83-360-671.jpg',
            badges: [],
            shipping: 'FREE SHIPPING',
            stockStatus: 'In Stock',
            saleEndTime: '15 Hours',
        },
    ];

    const Sidebar = () => (
        <div className="w-72 space-y-6 border-r border-gray-200 bg-white p-6 shadow-sm">
            {/* Components & Storage Section */}
            <div className="border-b border-gray-100 pb-6">
                <button
                    onClick={() => toggleSection('components')}
                    className="mb-4 flex w-full items-center justify-between text-left font-bold text-gray-800 transition-colors hover:text-blue-600"
                >
                    Components & Storage
                    {expandedSections.components ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {expandedSections.components && (
                    <div className="space-y-3 text-sm">
                        <div className="cursor-pointer font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline">
                            CPU / Processor
                        </div>
                        <div className="cursor-pointer text-gray-700 transition-colors hover:text-blue-600">Memory</div>
                        <div className="cursor-pointer text-gray-700 transition-colors hover:text-blue-600">Motherboard</div>
                        <div className="cursor-pointer text-gray-700 transition-colors hover:text-blue-600">GPU & Video Graphics Device</div>
                        <div className="cursor-pointer text-gray-700 transition-colors hover:text-blue-600">Computer Case</div>
                        <div className="cursor-pointer text-gray-700 transition-colors hover:text-blue-600">Power Supply</div>
                        <div className="cursor-pointer font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline">
                            Show More
                        </div>
                    </div>
                )}
            </div>

            {/* Computer Systems Section */}
            <div className="border-b border-gray-100 pb-6">
                <button
                    onClick={() => toggleSection('computerSystems')}
                    className="mb-4 flex w-full items-center justify-between text-left font-bold text-gray-800 transition-colors hover:text-blue-600"
                >
                    Computer Systems
                    {expandedSections.computerSystems ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {expandedSections.computerSystems && (
                    <div className="space-y-3 text-sm">
                        <div className="cursor-pointer font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline">
                            Gaming Desktop PC
                        </div>
                        <div className="cursor-pointer text-gray-700 transition-colors hover:text-blue-600">Gaming Laptop</div>
                        <div className="cursor-pointer text-gray-700 transition-colors hover:text-blue-600">Desktop PC</div>
                        <div className="cursor-pointer text-gray-700 transition-colors hover:text-blue-600">Laptop / Notebook</div>
                        <div className="cursor-pointer text-gray-700 transition-colors hover:text-blue-600">2-in-1 Laptop</div>
                        <div className="cursor-pointer text-gray-700 transition-colors hover:text-blue-600">Business Laptop</div>
                    </div>
                )}
            </div>

            {/* Manufacturer Section */}
            <div className="border-b border-gray-100 pb-6">
                <button
                    onClick={() => toggleSection('manufacturer')}
                    className="mb-4 flex w-full items-center justify-between text-left font-bold text-gray-800 transition-colors hover:text-blue-600"
                >
                    Manufacturer
                    {expandedSections.manufacturer ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {expandedSections.manufacturer && (
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        {['MSI', 'ASUS', 'GIGABYTE', 'AMD', 'ASRock', 'Intel'].map((brand) => (
                            <div
                                key={brand}
                                className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-center font-medium text-gray-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                            >
                                {brand}
                            </div>
                        ))}
                        <div className="col-span-2 mt-3 cursor-pointer text-center font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline">
                            Show More
                        </div>
                    </div>
                )}
            </div>

            {/* Price Section */}
            <div>
                <button
                    onClick={() => toggleSection('price')}
                    className="mb-4 flex w-full items-center justify-between text-left font-bold text-gray-800 transition-colors hover:text-blue-600"
                >
                    Price
                    {expandedSections.price ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {expandedSections.price && (
                    <div className="space-y-4 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center font-medium text-gray-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
                                $0 - $10
                            </div>
                            <div className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center font-medium text-gray-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
                                $10 - $25
                            </div>
                            <div className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center font-medium text-gray-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
                                $25 - $50
                            </div>
                            <div className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center font-medium text-gray-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
                                $50 - $75
                            </div>
                            <div className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center font-medium text-gray-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
                                $75 - $100
                            </div>
                            <div className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center font-medium text-gray-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
                                $100 - $200
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                placeholder="Min"
                                className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-center text-gray-700 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                            <span className="self-center text-gray-500">-</span>
                            <input
                                type="number"
                                placeholder="Max"
                                className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-center text-gray-700 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                            <button className="rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-orange-600">
                                RESET
                            </button>
                        </div>
                        <button className="w-full rounded-lg bg-sky-900 py-3 font-bold text-white shadow-md transition-colors hover:bg-sky-700 hover:shadow-lg">
                            APPLY
                        </button>
                        <div className="cursor-pointer font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline">
                            Show More
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const ProductCard = ({ product }) => (
        <div className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
            {/* Product Badges */}
            <div className="mb-3 flex flex-wrap gap-2">
                {product.badges.map((badge, index) => (
                    <div
                        key={index}
                        className={`inline-block rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                            badge === 'Newegg Select'
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                : badge === 'AI Ready'
                                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                        }`}
                    >
                        {badge}
                    </div>
                ))}
            </div>

            {/* Product Image */}
            <div className="mb-4 overflow-hidden rounded-lg bg-gray-50 p-4">
                <img
                    src={product.image}
                    alt={product.name}
                    className="mx-auto h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Rating */}
            <div className="mb-3 flex items-center">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">({product.reviews})</span>
            </div>

            {/* Product Name */}
            <h3 className="mb-3 line-clamp-3 cursor-pointer text-sm leading-relaxed font-semibold text-gray-900 transition-colors hover:text-blue-600">
                {product.name}
            </h3>

            {/* Discount Info */}
            {product.discount && (
                <div className="mb-3 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">{product.discount}</div>
            )}

            {/* Price */}
            <div className="mb-3">
                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && <span className="ml-2 text-base text-gray-500 line-through">${product.originalPrice}</span>}
            </div>

            {/* Sale Timer */}
            <div className="mb-3 flex items-center text-sm font-medium text-red-600">
                <span className="mr-1 animate-pulse">🔥</span>
                Sale Ends in {product.saleEndTime}
            </div>

            {/* Shipping */}
            <div className="mb-4 text-sm font-bold text-green-600">{product.shipping}</div>

            {/* Add to Cart Button */}
            <button className="w-full transform rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg active:scale-95">
                ADD TO CART
            </button>
        </div>
    );

    return (
        <WebLayout>
            <Head>
                <title>Trending Deals - TBZ.com</title>
                <meta
                    name="description"
                    content="Discover the hottest trending deals on tech products at TBZ.com. Shop now for exclusive discounts on laptops, desktops, components, and more!"
                />
                <link rel="canonical" href="https://tbz.com.bd/" />
                {/* Open Graph Tags */}
                <meta property="og:title" content="Trending Deals - TBZ.com" />
                <meta
                    property="og:description"
                    content="Discover the hottest trending deals on tech products at TBZ.com. Shop now for exclusive discounts on laptops, desktops, components, and more!"
                />
                <meta property="og:url" content="https://tbz.com.bd/trending-deals" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://tbz.com.bd/images/logo.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="TBZ" />
                <meta property="og:locale" content="en_US" />
                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Trending Deals - TBZ.com" />
                <meta
                    name="twitter:description"
                    content="Discover the hottest trending deals on tech products at TBZ.com. Shop now for exclusive discounts on laptops, desktops, components, and more!"
                />
                <meta name="twitter:image" content="https://tbz.com.bd/images/logo.png" />
                {/* Addtional Meta Tags */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="TBZ" />
                <meta name="theme-color" content="#2563eb" />

                {/* JSON-LD Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'TBZ',
                        url: 'https://tbz.com.bd/',
                        logo: 'https://tbz.com.bd/images/logo.png',
                        description: 'Trending Deals on Tech Products at tbz.com',
                        applicationCategory: 'BusinessApplication',
                    })}
                </script>
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Breadcrumb */}
                <div className="border-b border-gray-200 bg-white py-4 shadow-sm">
                    <div className="max-w-8xl mx-auto px-6">
                        <nav className="text-sm text-gray-600">
                            <Link href="/" className="font-medium transition-colors hover:text-blue-600">
                                Home
                            </Link>
                            <span className="mx-3 text-gray-400">›</span>
                            <span className="font-semibold text-gray-900">Trending Deals</span>
                        </nav>
                    </div>
                </div>

                {/* Page Header */}
                <div className="border-b border-gray-200 bg-white py-8 shadow-sm">
                    <div className="max-w-8xl mx-auto px-6">
                        <div className="flex justify-between text-gray-900">
                            <div>
                                <h1 className="mb-2 text-4xl font-bold text-gray-900">TRENDING DEALS</h1>
                                <p className="text-gray-600">Discover the hottest deals on tech products</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="rounded-full bg-gradient-to-r from-orange-400 to-red-500 px-4 py-2 font-bold text-white shadow-lg">
                                    🔥 Hot Deals
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-8xl m-6 mx-auto flex rounded-lg bg-white shadow-sm">
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Main Content */}
                    <div className="flex-1 p-6">
                        {/* Search and Sort Bar */}
                        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <div className="relative">
                                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search Within Products..."
                                            className="w-80 rounded-xl border border-gray-300 py-3 pr-4 pl-12 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <span className="text-sm font-medium text-gray-600">Sort By</span>
                                    <select className="rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                                        <option>Best Deals</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Customer Reviews</option>
                                        <option>Most Popular</option>
                                    </select>
                                    <span className="rounded-full bg-blue-50 px-3 py-2 text-sm font-bold text-sky-900">14 Items</span>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {/* <div className="mt-12 flex items-center justify-center space-x-3">
                            <button className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
                                ← Previous
                            </button>
                            <button className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-blue-700">
                                1
                            </button>
                            <button className="rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                2
                            </button>
                            <button className="rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                3
                            </button>
                            <span className="px-2 text-gray-500">...</span>
                            <button className="rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                10
                            </button>
                            <button className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
                                Next →
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </WebLayout>
    );
};

export default TrendingDeal;
