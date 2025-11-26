import WebLayout from '@/layouts/web/WebLayout';
import BestSidebar from './BestSideber';

const BestSellers = () => {
    // Sample product data - in a real app, this would come from props or API
    const products = [
        {
            id: 1,
            name: 'Gaming Desktop PC - Intel Core i7, RTX 4080',
            price: 1899.99,
            originalPrice: 2299.99,
            image: '/image/C01CS2505130JKLSW06.webp',
            rating: 4.5,
            reviews: 285,
            discount: '17% off',
            badge: 'Best Seller',
        },
        {
            id: 2,
            name: 'ASUS ROG Gaming Laptop - RTX 4070',
            price: 1599.99,
            originalPrice: 1899.99,
            image: '/image/C01CS2505130JKLSW06.webp',
            rating: 4.3,
            reviews: 142,
            discount: '16% off',
            badge: 'Hot Deal',
        },
        {
            id: 3,
            name: 'NVIDIA GeForce RTX 4090 Graphics Card',
            price: 1699.99,
            originalPrice: 1999.99,
            image: '/image/C01CS2505130JKLSW06.webp',
            rating: 4.8,
            reviews: 567,
            discount: '15% off',
            badge: 'Best Seller',
        },
        {
            id: 4,
            name: 'AMD Ryzen 9 7950X Processor',
            price: 549.99,
            originalPrice: 699.99,
            image: '/image/C01CS2505130JKLSW06.webp',
            rating: 4.6,
            reviews: 324,
            discount: '21% off',
            badge: 'Hot Deal',
        },
        {
            id: 5,
            name: 'Samsung 32" 4K Gaming Monitor',
            price: 599.99,
            originalPrice: 799.99,
            image: '/image/C01CS2505130JKLSW06.webp',
            rating: 4.4,
            reviews: 198,
            discount: '25% off',
            badge: 'Limited Time',
        },
        {
            id: 6,
            name: 'ASUS ROG Strix B650E Motherboard',
            price: 379.99,
            originalPrice: 449.99,
            image: '/image/C01CS2505130JKLSW06.webp',
            rating: 4.2,
            reviews: 89,
            discount: '16% off',
            badge: 'New',
        },
        {
            id: 7,
            name: 'Corsair 850W Gold PSU',
            price: 149.99,
            originalPrice: 199.99,
            image: '/image/C01CS2505130JKLSW06.webp',
            rating: 4.7,
            reviews: 156,
            discount: '25% off',
            badge: 'Best Seller',
        },
        {
            id: 8,
            name: 'Corsair 32GB DDR5-5600 Memory Kit',
            price: 299.99,
            originalPrice: 349.99,
            image: '/image/C01CS2505130JKLSW06.webp',
            rating: 4.3,
            reviews: 78,
            discount: '14% off',
            badge: 'Hot Deal',
        },
        {
            id: 9,
            name: 'Logitech G Pro Wireless Gaming Mouse',
            price: 149.99,
            originalPrice: 199.99,
            image: '/image/C01CS2505130JKLSW06.webp',
            rating: 4.6,
            reviews: 234,
            discount: '25% off',
            badge: 'Best Seller',
        },
        {
            id: 10,
            name: 'Razer BlackWidow V4 Mechanical Keyboard',
            price: 129.99,
            originalPrice: 159.99,
            image: '/image/C01CS2505130JKLSW06.webp',
            rating: 4.4,
            reviews: 198,
            discount: '19% off',
            badge: 'Hot Deal',
        },
        {
            id: 11,
            name: 'SteelSeries Arctis 7 Wireless Gaming Headset',
            price: 179.99,
            originalPrice: 229.99,
            image: '/image/C01CS2505130JKLSW06.webp',
            rating: 4.5,
            reviews: 145,
            discount: '22% off',
            badge: 'Limited Time',
        },
        {
            id: 12,
            name: 'Elgato Stream Deck XL',
            price: 249.99,
            originalPrice: 299.99,
            image: '/image/C01CS2505130JKLSW06.webp',
            rating: 4.7,
            reviews: 98,
            discount: '17% off',
            badge: 'New',
        },
    ];

    const ProductCard = ({ product, index }) => (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg">
     
            {/* Item Number */}
            <div className="bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">{String(index + 1).padStart(2, '0')}</div>

            {/* Product Image */}
            <div className="relative p-4">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-contain"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
                    }}
                />
            </div>

            {/* Product Info */}
            <div className="p-4 pt-0">
                {/* Star Rating */}
                <div className="mb-2 flex items-center">
                    <div className="flex text-orange-400">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                        ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                </div>

                {/* Product Title */}
                <h3 className="mb-3 line-clamp-2 text-sm leading-5 text-gray-800">{product.name}</h3>

                {/* Discount Badges */}
                <div className="mb-3 flex gap-2">
                    {product.discount && <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">Save {product.discount}</span>}
                    {product.badge === 'Promotion Deal' && (
                        <span className="rounded bg-orange-500 px-2 py-1 text-xs font-bold text-white">Promotion Deal</span>
                    )}
                </div>

                {/* Price */}
                <div className="mb-3">
                    <div className="text-2xl font-bold text-black">
                        ${product.price}
                        <span className="text-sm font-normal">.{String(Math.round((product.price % 1) * 100)).padStart(2, '0')}</span>
                    </div>
                    {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}.{String(Math.round((product.originalPrice % 1) * 100)).padStart(2, '0')}
                        </div>
                    )}
                </div>

                {/* Sale Timer */}
                {product.badge === 'Limited Time' && <div className="mb-2 text-sm font-medium text-red-600">Sale Ends in 16 Hours</div>}

                {/* Free Shipping */}
                <div className="mb-4 text-sm font-medium text-green-600">
                    <span className="font-bold">FREE SHIPPING</span> from United States
                </div>

                {/* Add to Cart Button */}
                {/* <button className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base font-semibold text-gray-800 transition-colors duration-200 hover:border-orange-500 hover:text-orange-600">
                    Add to Cart
                </button> */}
            </div>
        </div>
    );

    return (
        <WebLayout>
            <Head>
                <title>Best Sellers</title>
                <meta

                    name="description"
                    content="Discover our Best Sellers - top-rated gaming desktops, laptops, components, and accessories. Shop now for unbeatable deals on high-performance gear."
                />
                <meta name="keywords" content="best sellers, top products, gaming gear, popular items" />
                <link rel="canonical" href="https://tbz.com.bd/best-sellers" />
                {/* Open Graph Tags */}
                <meta property="og:title" content="Best Sellers" />
                <meta property="og:description" content="Discover our Best Sellers - top-rated gaming desktops, laptops, components, and accessories. Shop now for unbeatable deals on high-performance gear." />
                <meta property="og:type" content="website" />   
                <meta property="og:url" content="https://tbz.com.bd/best-sellers" />
                <meta property="og:image" content="https://tbz.com.bd/images/og-best-sellers.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="TBZ" />
                <meta property="og:locale" content="en_US" />
                {/* Twitter Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@tbz" />
                <meta name="twitter:creator" content="@tbz" />
                <meta name="twitter:title" content="Best Sellers" />
                <meta name="twitter:description" content="Discover our Best Sellers - top-rated gaming desktops, laptops, components, and accessories. Shop now for unbeatable deals on high-performance gear." />
                <meta name="twitter:image" content="https://tbz.com.bd/images/twitter-best-sellers.jpg" />
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
                        url: 'https://tbz.com.bd/best-sellers',
                        logo: 'https://tbz.com.bd/images/logo.png',
                        description: 'Discover our Best Sellers - top-rated gaming desktops, laptops, components, and accessories. Shop now for unbeatable deals on high-performance gear.',
                        applicationCategory: 'BusinessApplication',
                    })}
                </script>
            </Head>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex space-x-8">
                        <button className="border-b-2 border-orange-500 px-2 py-4 font-semibold text-orange-600">BEST SELLERS</button>
                        <button className="border-b-2 border-transparent px-2 py-4 font-semibold text-blue-600 hover:text-blue-800">
                            New Arrivals
                        </button>
                        <button className="border-b-2 border-transparent px-2 py-4 font-semibold text-blue-600 hover:text-blue-800">
                            Lowest Price In 30 Days
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Banner */}
            <div
                className="leaderboard-banner relative py-8 text-white"
                style={{
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)',
                    position: 'relative',
                }}
            >
                {/* Background Pattern Overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'url(https://c1.neweggimages.com/WebResource/Themes/Nest/bgs/pc-parts-bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                ></div>

                <div className="page-content-inner relative z-10 container mx-auto px-4">
                    <div className="leaderboard-banner-inner relative text-center">
                        {/* Left Wheat Branch */}
                        <div className="absolute top-1/2 left-8 hidden -translate-y-1/2 transform lg:block">
                            <svg className="h-20 w-20 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L9 9l-7 3 7 3 3 7 3-7 7-3-7-3-3-7z" />
                                <path d="M5 12l1.5-1.5L8 12l-1.5 1.5L5 12z" />
                                <path d="M19 12l-1.5-1.5L16 12l1.5 1.5L19 12z" />
                                <path d="M12 5l-1.5 1.5L12 8l1.5-1.5L12 5z" />
                                <path d="M12 19l1.5-1.5L12 16l-1.5 1.5L12 19z" />
                            </svg>
                        </div>

                        {/* Right Wheat Branch */}
                        <div className="absolute top-1/2 right-8 hidden -translate-y-1/2 transform lg:block">
                            <svg className="h-20 w-20 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L9 9l-7 3 7 3 3 7 3-7 7-3-7-3-3-7z" />
                                <path d="M5 12l1.5-1.5L8 12l-1.5 1.5L5 12z" />
                                <path d="M19 12l-1.5-1.5L16 12l1.5 1.5L19 12z" />
                                <path d="M12 5l-1.5 1.5L12 8l1.5-1.5L12 5z" />
                                <path d="M12 19l1.5-1.5L12 16l-1.5 1.5L12 19z" />
                            </svg>
                        </div>

                        {/* Trophy Icon */}
                        <div className="mb-6">
                            <svg className="mx-auto h-16 w-16 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 011.334.98L18 7.235v4.53a1 1 0 01-.553.894l-4.553 2.277a1 1 0 01-.894 0L8 13.659V16a1 1 0 11-2 0v-3a1 1 0 01.553-.894l4.553-2.277a1 1 0 01.894 0L16 11.341V8.765l-.113-1.15-1.599.8a1 1 0 01-.894 0L10 6.833 6.606 8.415a1 1 0 01-.894 0l-1.599-.8L4 8.765v2.576l4 2V16a1 1 0 11-2 0v-2.341l-3.447-1.723A1 1 0 012 11.042V7.235l.113-1.15a1 1 0 011.334-.98l1.599.8L9 4.323V3a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>

                        <h1 className="mb-4 text-5xl font-bold tracking-wider">BEST SELLERS</h1>
                        <p className="mx-auto max-w-2xl text-xl leading-relaxed font-light">
                            Our most popular products, based on sales and updated frequently.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Sidebar */}
                    <div className="lg:w-1/4">
                        <BestSidebar />
                    </div>

                    {/* Product Grid */}
                    <div className="lg:w-3/4">
                        {/* Filter Bar */}
                        <div className="mb-6 flex items-center justify-between rounded-lg bg-gray-100 p-4">
                            <div>
                                <span className="font-medium text-gray-700">Showing {products.length} results</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <label className="text-gray-700">Sort by:</label>
                                <select className="rounded border border-gray-300 text-black bg-white px-3 py-1">
                                    <option>Best Selling</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Customer Rating</option>
                                    <option>Newest</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Sections */}
                        {/* Section 1: Gaming Desktop PC */}
                        <div className="mb-8">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">GAMING DESKTOP PC</h2>
                                <div className="flex items-center space-x-2">
                                    <div className="flex space-x-1">
                                        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                                        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                    </div>
                                    <button className="text-sm font-medium text-blue-600 hover:text-blue-800">See More &gt;</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                                {products.slice(0, 4).map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index} />
                                ))}
                            </div>
                        </div>

                        {/* Section 2: Gaming Components */}
                        <div className="mb-8">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">GAMING COMPONENTS</h2>
                                <div className="flex items-center space-x-2">
                                    <div className="flex space-x-1">
                                        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                                        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                    </div>
                                    <button className="text-sm font-medium textsky-800 hover:text-blue-800">See More &gt;</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                                {products.slice(4, 8).map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index + 4} />
                                ))}
                            </div>
                        </div>

                        {/* Section 3: Gaming Accessories */}
                        <div className="mb-8">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">GAMING ACCESSORIES</h2>
                                <div className="flex items-center space-x-2">
                                    <div className="flex space-x-1">
                                        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                                        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                    </div>
                                    <button className="text-sm font-medium text-sky-800 hover:text-blue-800">See More &gt;</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                                {products.slice(8, 12).map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index + 8} />
                                ))}
                            </div>
                        </div>

                        {/* Load More Button */}
                        <div className="mt-8 text-center">
                            <button className="rounded-lg bg-sky-800 px-8 py-3 font-bold text-white transition-colors duration-200 hover:bg-sky-600">
                                Load More Products
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
};

export default BestSellers;
