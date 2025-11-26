import React from 'react';
import ProductCard from '@/components/frontend/productCard/PrimaryProductCard';

const filters = {
    category: [
        'Desktop Memory',
        'Laptop Memory',
        'Server Memory',
        'System Specific Memory',
        'Memory Cards',
        'USB Flash Drives',
    ],
    speed: ['DDR5', 'DDR4', 'DDR3', 'DDR2', 'DDR', 'PC'],
    capacity: [
        '64GB per Module',
        '48GB per Module',
        '32GB per Module',
        '24GB per Module',
        '16GB per Module',
        '8GB per Module',
    ],
    type: [
        '288-Pin DDR5 SDRAM',
        '288-Pin DDR4 SDRAM',
        '240-Pin DDR3 SDRAM',
        '240-Pin DDR2 SDRAM',
        '184-Pin DDR SDRAM',
    ],
};

const brands = ['G.SKILL', 'Corsair', 'Kingston', 'Team Group', 'Crucial', 'Patriot'];

const featured = [
    {
        id: 1,
        title: 'V-Color DDR5 Manta XFinity 48GB (24GBx2) 8400MHz CL40-54-54 1.4V SK Hynix IC RGB...',
        price: 227.2,
        was: null,
        img: 'https://c1.neweggimages.com/productimage/nb300/AMCMS24122706LJSM79.jpg',
        tag: 'Free Shipping',
        brandName: 'v-color',
        brandImg: 'https://c1.neweggimages.com/brandimage/Brand97908.gif',
        rating: 5,
        ratingCount: 5,
    },
    {
        id: 2,
        title: 'CORSAIR Vengeance RGB 32GB (2 x 16GB) DDR5-6400',
        price: 124.99,
        was: 159.99,
        img: 'https://c1.neweggimages.com/productimage/nb300/20-236-879-03.jpg',
        tag: 'Combo Offer',
        brandName: 'Corsair',
        brandImg: 'https://c1.neweggimages.com/brandimage/Brand1459.gif',
        rating: 4,
        ratingCount: 128,
    },
    {
        id: 3,
        title: 'Kingston FURY Beast 32GB (2 x 16GB) DDR5-6000',
        price: 99.99,
        was: 129.99,
        img: 'https://c1.neweggimages.com/productimage/nb300/20-278-164-03.jpg',
        tag: 'New Lower Price',
        brandName: 'Kingston',
        brandImg: 'https://c1.neweggimages.com/brandimage/Brand1561.gif',
        rating: 4,
        ratingCount: 62,
    },
    {
        id: 4,
        title: 'TEAMGROUP T-Force Delta RGB 32GB (2 x 16GB) DDR5-7200',
        price: 229.99,
        was: 259.99,
        img: 'https://c1.neweggimages.com/productimage/nb300/20-313-676-07.jpg',
        tag: 'Savings',
        brandName: 'Team Group',
        brandImg: 'https://c1.neweggimages.com/brandimage/Brand11857.gif',
        rating: 4,
        ratingCount: 44,
    },
];

function SectionTitle({ children }) {
    return (
        <h2 className="text-lg font-semibold text-gray-900 mb-3">{children}</h2>
    );
}

function Checkbox({ label }) {
    return (
        <label className="flex items-center gap-2 py-1 text-sm text-gray-700">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span>{label}</span>
        </label>
    );
}

function FilterGroup({ title, items }) {
    return (
        <div className="border-b border-gray-200 pb-4 mb-4">
            <SectionTitle>{title}</SectionTitle>
            <div className="space-y-1">
                {items.map((i) => (
                    <Checkbox key={i} label={i} />
                ))}
            </div>
        </div>
    );
}

function BrandCard({ brand }) {
  return (
    <div className="bg-white border-r border-b border-gray-200 
    p-6 flex items-center justify-center min-h-[200px] hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col items-center gap-3">
        <img
          src="https://c1.neweggimages.com/brandimage/Brand8476.gif"
          alt={brand}
          className="h-8 w-auto max-w-[120px] object-contain"
        />
        <span className="text-sm font-medium text-gray-700 text-center">{brand}</span>
      </div>
    </div>
  )
}
// ProductCard moved to components/category/ProductCard.jsx

export default function Category() {
    return (
        <div className="min-h-screen bg-white">
            {/* Top breadcrumb and nav */}
            <div className="border-b border-gray-200 bg-white/80 backdrop-blur">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 py-3 text-sm text-blue-700 font-semibold">
                        <a href="#" className="hover:underline">Components &amp; Storage</a>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-bold">Memory</span>
                    </nav>
                    <div className="flex items-center justify-between py-3">
                        <h1 className="text-2xl font-bold text-gray-900">Memory</h1>
                        <div className="hidden md:flex gap-4 text-blue-700 font-semibold">
                            <a href="#" className="hover:underline">Desktop PC RAM (DDR4)</a>
                            <a href="#" className="hover:underline">Desktop PC RAM (DDR5)</a>
                            <a href="#" className="hover:underline">DDR5 6000+</a>
                            <a href="#" className="hover:underline">PC Builder</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-12 gap-6">
                {/* Left sidebar filters */}
                <aside className="col-span-12 lg:col-span-3">
                    <div className="rounded-md border border-gray-200 bg-white p-4">
                        <FilterGroup title="Shop Category" items={filters.category} />
                        <FilterGroup title="Speed" items={filters.speed} />
                        <FilterGroup title="Capacity" items={filters.capacity} />
                        <FilterGroup title="Type" items={filters.type} />
                        <FilterGroup title="Brands" items={brands} />
                    </div>
                </aside>

                {/* Right content */}
                <section className="col-span-12 lg:col-span-9 space-y-6">
                    {/* Hero banner */}
                    <div className="relative overflow-hidden rounded-md">
                        <img
                            src="https://promotions.newegg.com/gskill/25-0120/1920x360.jpg"
                            alt="Hero"
                            className="h-48 w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                    </div>

                    {/* Featured items header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Shop PC Ram Items</h2>
                        <a href="#" className="text-sm font-semibold text-blue-700 hover:underline">Shop All Products</a>
                    </div>

                    {/* Brand Card */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 ">
                        {brands.map((brands) => (
                            <BrandCard key={brands.id} brands={brands} />
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Memory Items</h2>                    
                    </div>

                    {/* Product grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 ">
                        {featured.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="flex justify-center pt-2">
                        <button className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50">Shop All Products</button>
                    </div>
                </section>
            </div>
        </div>
    );
}


