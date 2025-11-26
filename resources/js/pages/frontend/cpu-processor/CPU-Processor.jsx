import WebLayout from '@/layouts/web/WebLayout';
import { Link } from '@inertiajs/react';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';
import { useState } from 'react';

import { Head } from '@inertiajs/react';

const CPUProcessor = () => {
    const [expandedSections, setExpandedSections] = useState({
        shopCategory: true,
        accessories: true,
        shoppingTools: true,
        socketType: true,
        series: true,
        operatingSystem: true,
        coreName: true,
        numberOfCores: true,
        operatingFrequency: true,
        l3Cache: true,
        l2Cache: true,
        instructionSet: true,
        integratedGraphics: true,
        coolingDevice: true,
        hyperThreading: true,
        manufacturingTech: true,
        virtualization: true,
        thermalDesignPower: true,
        fsb: true,
    });

    const [viewMode, setViewMode] = useState('grid');

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const cpuProducts = [
        {
            id: 1,
            name: 'AMD Ryzen 9 9950X3D - Ryzen 9 9000 Series Granite Ridge (Zen 5) 16-Core 4.3 GHz',
            brand: 'AMD',
            price: 699.0,
            originalPrice: 1479.44,
            discount: null,
            rating: 4.5,
            reviews: 90,
            image: 'https://c1.neweggimages.com/productimage/nb300/19-113-884-01.png',
            badges: ['Newegg Select'],
            shipping: 'Free Shipping',
            cores: '16-Core',
            threads: '32-Thread',
            baseClock: '4.3 GHz',
            socket: 'AM5',
            series: 'Ryzen 9 9000',
            saleEndTime: 'Sale Ends in 1 Hour',
            moreOptions: 'More options from $695.99 - $1,479.44',
        },
        {
            id: 2,
            name: 'Intel Core i7-14700K - Core i7 14th Gen 20-Core (8P+12E) LGA 1700 125W Intel UHD...',
            brand: 'Intel',
            price: 319.99,
            originalPrice: 419.99,
            discount: null,
            rating: 4.3,
            reviews: 169,
            image: 'https://c1.neweggimages.com/productimage/nb300/19-113-884-01.png',
            badges: ['Newegg Select'],
            shipping: 'Free Shipping',
            cores: '20-Core',
            threads: '28-Thread',
            baseClock: '3.4 GHz',
            socket: 'LGA 1700',
            series: 'Core i7',
            saleEndTime: 'Sale Ends in 1 Hour',
            moreOptions: 'More options from $319.99 - $731.44',
        },
        {
            id: 3,
            name: 'AMD Ryzen 9 9900X3D - Ryzen 9 9000 Series Granite Ridge (Zen 5) 12-Core 4.4...',
            brand: 'AMD',
            price: 599.0,
            originalPrice: 1271.44,
            discount: null,
            rating: 4.7,
            reviews: 19,
            image: 'https://c1.neweggimages.com/productimage/nb300/19-113-884-01.png',
            badges: ['Newegg Select'],
            shipping: 'Free Shipping',
            cores: '12-Core',
            threads: '24-Thread',
            baseClock: '4.4 GHz',
            socket: 'AM5',
            series: 'Ryzen 9 9000',
            saleEndTime: 'Sale Ends in 1 Hour',
            moreOptions: 'More options from $599.00 - $1,271.44',
        },
        {
            id: 4,
            name: 'Intel Core i7-14700KF - Core i7 14th Gen 20-Core (8P+12E) LGA 1700 125W None...',
            brand: 'Intel',
            price: 314.99,
            originalPrice: 697.44,
            discount: null,
            rating: 4.6,
            reviews: 74,
            image: 'https://c1.neweggimages.com/productimage/nb300/19-113-884-01.png',
            badges: ['Newegg Select'],
            shipping: 'Free Shipping',
            cores: '16-Core',
            threads: '24-Thread',
            baseClock: '3.4 GHz',
            socket: 'LGA 1700',
            series: 'Core i7',
            saleEndTime: 'Sale Ends in 1 Hour',
            moreOptions: 'More options from $314.99 - $697.44',
        },
    ];

    const Sidebar = () => (
        <div className="w-72 space-y-1 border-r border-gray-200 bg-white p-6 shadow-sm">
            {/* Shop Category Section */}
            <div className="border-b border-gray-100 pb-6">
                <button
                    onClick={() => toggleSection('shopCategory')}
                    className="group mb-4 flex w-full items-center justify-between rounded-lg p-2 text-left font-bold text-gray-800 transition-colors hover:bg-gray-50"
                >
                    <span className="text-sm font-semibold">Shop Category</span>
                    {expandedSections.shopCategory ? (
                        <ChevronUp className="h-4 w-4 text-gray-500 transition-transform group-hover:text-gray-700" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-hover:text-gray-700" />
                    )}
                </button>
                {expandedSections.shopCategory && (
                    <div className="space-y-1 pl-2">
                        <div className="group cursor-pointer rounded-md p-2 font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700">
                            Desktop CPU / Processor
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            Server CPU Processor
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            Mobile CPU Processor
                        </div>
                    </div>
                )}
            </div>

            {/* Accessories Section */}
            <div className="border-b border-gray-100 pb-6">
                <button
                    onClick={() => toggleSection('accessories')}
                    className="group mb-4 flex w-full items-center justify-between rounded-lg p-2 text-left font-bold text-gray-800 transition-colors hover:bg-gray-50"
                >
                    <span className="text-sm font-semibold">Accessories</span>
                    {expandedSections.accessories ? (
                        <ChevronUp className="h-4 w-4 text-gray-500 transition-transform group-hover:text-gray-700" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-hover:text-gray-700" />
                    )}
                </button>
                {expandedSections.accessories && (
                    <div className="space-y-1 pl-2">
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            CPU Fans & Heatsinks
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            Thermal Compound / Grease
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            Water / Liquid Cooling
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            DIY Cooling
                        </div>
                    </div>
                )}
            </div>

            {/* Shopping Tools Section */}
            <div className="border-b border-gray-100 pb-6">
                <button
                    onClick={() => toggleSection('shoppingTools')}
                    className="group mb-4 flex w-full items-center justify-between rounded-lg p-2 text-left font-bold text-gray-800 transition-colors hover:bg-gray-50"
                >
                    <span className="text-sm font-semibold">Shopping Tools</span>
                    {expandedSections.shoppingTools ? (
                        <ChevronUp className="h-4 w-4 text-gray-500 transition-transform group-hover:text-gray-700" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-hover:text-gray-700" />
                    )}
                </button>
                {expandedSections.shoppingTools && (
                    <div className="space-y-1 pl-2">
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            CPU Trade-In
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            CPU Buying Guide
                        </div>
                    </div>
                )}
            </div>

            {/* CPU Socket Type Section */}
            <div className="border-b border-gray-100 pb-6">
                <button
                    onClick={() => toggleSection('socketType')}
                    className="group mb-4 flex w-full items-center justify-between rounded-lg p-2 text-left font-bold text-gray-800 transition-colors hover:bg-gray-50"
                >
                    <span className="text-sm font-semibold">CPU Socket Type</span>
                    {expandedSections.socketType ? (
                        <ChevronUp className="h-4 w-4 text-gray-500 transition-transform group-hover:text-gray-700" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-hover:text-gray-700" />
                    )}
                </button>
                {expandedSections.socketType && (
                    <div className="space-y-1 pl-2">
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            Intel Socket
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            AMD Socket
                        </div>
                    </div>
                )}
            </div>

            {/* Series Section */}
            <div className="border-b border-gray-100 pb-6">
                <button
                    onClick={() => toggleSection('series')}
                    className="group mb-4 flex w-full items-center justify-between rounded-lg p-2 text-left font-bold text-gray-800 transition-colors hover:bg-gray-50"
                >
                    <span className="text-sm font-semibold">Series</span>
                    {expandedSections.series ? (
                        <ChevronUp className="h-4 w-4 text-gray-500 transition-transform group-hover:text-gray-700" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-hover:text-gray-700" />
                    )}
                </button>
                {expandedSections.series && (
                    <div className="space-y-1 pl-2">
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            AMD Threadripper
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            AMD Ryzen 9
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            AMD Ryzen 7 / 5
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            Intel Core Ultra
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            Intel Core i9
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            Intel Core i7
                        </div>
                        <div className="cursor-pointer rounded-md p-2 text-xs text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700">
                            ☐ Show More
                        </div>
                    </div>
                )}
            </div>

            {/* # of Cores Section */}
            <div className="border-b border-gray-100 pb-6">
                <button
                    onClick={() => toggleSection('numberOfCores')}
                    className="group mb-4 flex w-full items-center justify-between rounded-lg p-2 text-left font-bold text-gray-800 transition-colors hover:bg-gray-50"
                >
                    <span className="text-sm font-semibold"># of Cores</span>
                    {expandedSections.numberOfCores ? (
                        <ChevronUp className="h-4 w-4 text-gray-500 transition-transform group-hover:text-gray-700" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-hover:text-gray-700" />
                    )}
                </button>
                {expandedSections.numberOfCores && (
                    <div className="space-y-1 pl-2">
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            24-Core
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            20-Core
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            16-Core
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            12-Core
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            8-Core
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            6-Core
                        </div>
                        <div className="cursor-pointer rounded-md p-2 text-xs text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700">
                            ☐ Show More
                        </div>
                    </div>
                )}
            </div>

            {/* Operating Frequency Section */}
            <div className="border-b border-gray-100 pb-6">
                <button
                    onClick={() => toggleSection('operatingFrequency')}
                    className="group mb-4 flex w-full items-center justify-between rounded-lg p-2 text-left font-bold text-gray-800 transition-colors hover:bg-gray-50"
                >
                    <span className="text-sm font-semibold">Operating Frequency</span>
                    {expandedSections.operatingFrequency ? (
                        <ChevronUp className="h-4 w-4 text-gray-500 transition-transform group-hover:text-gray-700" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-hover:text-gray-700" />
                    )}
                </button>
                {expandedSections.operatingFrequency && (
                    <div className="space-y-1 pl-2">
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            5.0 GHz & Above
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            4.5 - 4.9 GHz
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            4.0 - 4.4 GHz
                        </div>
                        <div className="group cursor-pointer rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600">
                            3.5 - 3.9 GHz
                        </div>
                        <div className="cursor-pointer rounded-md p-2 text-xs text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700">
                            ☐ Show More
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const RightSidebar = () => (
        <div className="w-72 space-y-6 border-l border-gray-200 bg-white p-6 shadow-sm">
            {/* Promotional Banner Section */}
            <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Special Offers</h3>

                {/* Battlefield 6 Promotion */}
                <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                    <img
                        src="https://promotions.newegg.com/intel/25-0786/160x360.jpg"
                        alt="Get Battlefield 6 promotion"
                        className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute right-3 bottom-3 left-3 text-white">
                        <div className="mb-1 text-sm font-bold">Get Battlefield 6</div>
                        <div className="mb-1 text-xs">and more with qualifying Intel products</div>
                        <div className="text-xs text-orange-300">Valid from 12/25/24 - 3/31/25</div>
                    </div>
                    <div className="absolute top-3 right-3">
                        <div className="rounded-full bg-orange-500 px-2 py-1 text-xs font-bold text-white">NEW</div>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                    <img
                        src="https://promotions.newegg.com/intel/25-0786/160x360.jpg"
                        alt="Get Battlefield 6 promotion"
                        className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute right-3 bottom-3 left-3 text-white">
                        <div className="mb-1 text-sm font-bold">AMD Bundle Deals</div>
                        <div className="mb-1 text-xs">Save up to $200 on CPU + Motherboard combos</div>
                        <div className="text-xs text-red-300">Limited time offer</div>
                    </div>
                    <div className="absolute top-3 right-3">
                        <div className="rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">HOT</div>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                    <img
                        src="https://promotions.newegg.com/intel/25-0786/160x360.jpg"
                        alt="Get Battlefield 6 promotion"
                        className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute right-3 bottom-3 left-3 text-white">
                        <div className="mb-1 text-sm font-bold">Free Cooling</div>
                        <div className="mb-1 text-xs">Get a free CPU cooler with select processors</div>
                        <div className="text-xs text-blue-300">While supplies last</div>
                    </div>
                    <div className="absolute top-3 right-3">
                        <div className="rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white">FREE</div>
                    </div>
                </div>
            </div>

            {/* Newsletter Signup */}
            {/* <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
                <h4 className="mb-3 text-lg font-bold text-gray-900">Stay Updated</h4>
                <p className="mb-4 text-sm text-gray-700">Get the latest CPU deals and tech news delivered to your inbox.</p>
                <div className="space-y-3">
                    <input 
                        type="email" 
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                        Subscribe
                    </button>
                </div>
            </div> */}
        </div>
    );

    const PromoBanners = () => (
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Intel Combo Banner */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-sky-800 via-blue-700 to-blue-800 p-6 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

                <div className="relative flex h-full min-h-[140px] items-center">
                    {/* Left Section - CPU Product */}
                    <div className="flex-shrink-0">
                        <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                            <img
                                src="https://c1.neweggimages.com/productimage/nb1280/19-118-505-01.jpg"
                                alt="Intel CPU"
                                className="h-16 w-16 object-contain"
                            />
                        </div>
                    </div>

                    {/* Middle Section - Product Details */}
                    <div className="flex-1 px-5">
                        <div className="mb-2 inline-block rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-blue-900">
                            intel COMBO UP SAVINGS $94.00
                        </div>
                        <div className="mb-3 text-sm leading-tight font-bold">
                            Intel Core Ultra 7 265K - Core Ultra 7 (Series 2)
                            <br />
                            <span className="text-blue-200">Arrow Lake 20-Core (8P+12E), LGA 1851, 125W</span>
                            <br />
                            <span className="text-blue-200">Desktop Processor - BX80768265K</span>
                        </div>
                        <div className="mb-3 flex items-center text-sm">
                            <span className="mr-3 text-blue-200 line-through">$675.97</span>
                            <div className="flex items-baseline">
                                <span className="text-xl font-bold text-yellow-300">= $581</span>
                                <span className="text-sm text-yellow-300">.97</span>
                            </div>
                        </div>

                        {/* Product Row */}
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center rounded-lg bg-white/10 p-2">
                                <img
                                    src="https://c1.neweggimages.com/productimage/nb1280/19-118-505-01.jpg"
                                    alt="GIGABYTE Z890"
                                    className="h-6 w-6 object-contain"
                                />
                                <div className="ml-2 text-xs">
                                    <div className="font-semibold">GIGABYTE Z890</div>
                                    <div className="text-blue-200">AORUS ELITE</div>
                                </div>
                            </div>

                            <div className="text-lg font-bold text-yellow-300">+</div>

                            <div className="flex items-center rounded-lg bg-white/10 p-2">
                                <img
                                    src="https://c1.neweggimages.com/productimage/nb1280/19-118-505-01.jpg"
                                    alt="CORSAIR Vengeance"
                                    className="h-6 w-6 object-contain"
                                />
                                <div className="ml-2 text-xs">
                                    <div className="font-semibold">CORSAIR</div>
                                    <div className="text-blue-200">Vengeance RGB</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex h-full flex-col items-end justify-between">
                        <button className="mb-3 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium backdrop-blur-sm transition-all hover:bg-white/20">
                            View Combo Builder ▶
                        </button>
                        <button className="group/btn rounded-full bg-orange-500 p-2 shadow-lg transition-all duration-300 hover:bg-orange-600 hover:shadow-xl">
                            <svg
                                className="h-4 w-4 text-white transition-transform group-hover/btn:scale-110"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* AMD Combo Banner */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-purple-800 p-6 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

                <div className="relative flex h-full min-h-[140px] items-center">
                    {/* Left Section - CPU Product */}
                    <div className="flex-shrink-0">
                        <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                            <img
                                src="https://c1.neweggimages.com/productimage/nb1280/19-118-505-01.jpg"
                                alt="AMD CPU"
                                className="h-16 w-16 object-contain"
                            />
                        </div>
                    </div>

                    {/* Middle Section - Product Details */}
                    <div className="flex-1 px-5">
                        <div className="mb-2 inline-block rounded-full bg-orange-400 px-3 py-1 text-xs font-bold text-red-900">
                            AMD COMBO UP SAVINGS $22.00
                        </div>
                        <div className="mb-3 text-sm leading-tight font-bold">
                            AMD Ryzen 7 9800X3D - Ryzen 7 9000 Series Zen
                            <br />
                            <span className="text-red-200">5 8-Core 5.2 GHz - Socket AM5 120W - AMD</span>
                            <br />
                            <span className="text-red-200">Radeon Graphics Desktop Processor - 100-...</span>
                        </div>
                        <div className="mb-3 flex items-center text-sm">
                            <span className="mr-3 text-red-200 line-through">$898.98</span>
                            <div className="flex items-baseline">
                                <span className="text-xl font-bold text-orange-300">= $876</span>
                                <span className="text-sm text-orange-300">.98</span>
                            </div>
                        </div>

                        {/* Product Row */}
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center rounded-lg bg-white/10 p-2">
                                <img
                                    src="https://c1.neweggimages.com/productimage/nb1280/19-118-505-01.jpg"
                                    alt="MSI MAG X870"
                                    className="h-6 w-6 object-contain"
                                />
                                <div className="ml-2 text-xs">
                                    <div className="font-semibold">MSI MAG X870</div>
                                    <div className="text-red-200">TOMAHAWK</div>
                                </div>
                            </div>

                            <div className="text-lg font-bold text-orange-300">+</div>

                            <div className="flex items-center rounded-lg bg-white/10 p-2">
                                <img
                                    src="https://c1.neweggimages.com/productimage/nb1280/19-118-505-01.jpg"
                                    alt="CORSAIR Vengeance"
                                    className="h-6 w-6 object-contain"
                                />
                                <div className="ml-2 text-xs">
                                    <div className="font-semibold">CORSAIR</div>
                                    <div className="text-red-200">Vengeance RGB</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex h-full flex-col items-end justify-between">
                        <button className="mb-3 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium backdrop-blur-sm transition-all hover:bg-white/20">
                            View Combo Builder ▶
                        </button>
                        <button className="group/btn rounded-full bg-orange-500 p-2 shadow-lg transition-all duration-300 hover:bg-orange-600 hover:shadow-xl">
                            <svg
                                className="h-4 w-4 text-white transition-transform group-hover/btn:scale-110"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const ProductCategories = () => (
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">SHOP CPUS / PROCESSORS</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Intel CPUs */}
                <div className="group rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-lg">
                    <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 transition-all duration-300 group-hover:from-blue-100 group-hover:to-blue-200">
                                <img
                                    src="https://c1.neweggimages.com/productimage/nb1280/19-118-505-01.jpg"
                                    alt="Intel CPU"
                                    className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="mb-4 text-xl font-bold text-gray-800 group-hover:text-blue-600">Intel CPUs / Processors</h3>
                            <div className="space-y-2">
                                <div className="group/item cursor-pointer rounded-lg px-3 py-2 text-blue-600 transition-all hover:bg-blue-50 hover:text-blue-700">
                                    <span className="font-medium">Intel Core Ultra 9 / Core i9</span>
                                </div>
                                <div className="group/item cursor-pointer rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-50 hover:text-blue-600">
                                    Intel Core Ultra 7 / Core i7
                                </div>
                                <div className="group/item cursor-pointer rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-50 hover:text-blue-600">
                                    Intel Core Ultra 5 / Core i5
                                </div>
                                <div className="group/item cursor-pointer rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-50 hover:text-blue-600">
                                    Intel Core i3
                                </div>
                                <div className="group/item cursor-pointer rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-50 hover:text-blue-600">
                                    Intel Celeron & Pentium
                                </div>
                                <div className="group/item cursor-pointer rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-50 hover:text-blue-600">
                                    Intel Xeon
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AMD CPUs */}
                <div className="group rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:border-red-300 hover:shadow-lg">
                    <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                            <div className="rounded-xl bg-gradient-to-br from-red-50 to-red-100 p-6 transition-all duration-300 group-hover:from-red-100 group-hover:to-red-200">
                                <img
                                    src="https://c1.neweggimages.com/productimage/nb1280/19-118-505-01.jpg"
                                    alt="AMD CPU"
                                    className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="mb-4 text-xl font-bold text-gray-800 group-hover:text-red-600">AMD CPUs / Processors</h3>
                            <div className="space-y-2">
                                <div className="group/item cursor-pointer rounded-lg px-3 py-2 text-red-600 transition-all hover:bg-red-50 hover:text-red-700">
                                    <span className="font-medium">AMD Ryzen Threadripper</span>
                                </div>
                                <div className="group/item cursor-pointer rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-50 hover:text-red-600">
                                    AMD Ryzen 9
                                </div>
                                <div className="group/item cursor-pointer rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-50 hover:text-red-600">
                                    AMD Ryzen 7
                                </div>
                                <div className="group/item cursor-pointer rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-50 hover:text-red-600">
                                    AMD Ryzen 5
                                </div>
                                <div className="group/item cursor-pointer rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-50 hover:text-red-600">
                                    AMD Ryzen 3
                                </div>
                                <div className="group/item cursor-pointer rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-50 hover:text-red-600">
                                    AMD EPYC / Opteron
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const ProductCard = ({ product }) => (
        <div className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg">
            {/* Product Badges */}
            <div className="mb-3 flex flex-wrap gap-2">
                {product.badges.map((badge, index) => (
                    <div key={index} className="inline-block rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white">
                        {badge}
                    </div>
                ))}
            </div>

            {/* Product Image */}
            <div className="mb-4 text-center">
                <img src={product.image} alt={product.name} className="mx-auto h-32 w-auto object-contain" />
            </div>

            {/* Rating with AMD/Intel logo */}
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="ml-1 text-xs text-gray-600">({product.reviews})</span>
                </div>
                <div className="text-right">
                    {product.brand === 'AMD' ? (
                        <span className="text-sm font-bold text-red-600">AMD ≫</span>
                    ) : (
                        <span className="text-sm font-bold text-blue-600">intel ≫</span>
                    )}
                </div>
            </div>

            {/* Product Name */}
            <h3 className="mb-3 line-clamp-3 cursor-pointer text-sm leading-tight font-medium text-gray-900 hover:text-blue-600">{product.name}</h3>

            {/* Promotional Text */}
            <div className="mb-3 text-xs font-medium text-orange-600">
                {product.brand === 'AMD'
                    ? 'Free Corsair Vengeance RGB 32GB (2x16GB) DDR5 RAM w/...'
                    : product.brand === 'Intel' && product.series === 'Core i7'
                      ? 'Get Battlefield 6 and more with purchase of qualifying Intel...'
                      : 'Free Montech NX400 CPU Air Cooler w/ Purchase, limited...'}
            </div>

            {/* Price Section */}
            <div className="mb-2">
                {product.originalPrice && <div className="text-xs text-gray-500 line-through">${product.originalPrice}</div>}
                <div className="flex items-baseline">
                    <span className="text-xl font-bold text-gray-900">${Math.floor(product.price)}</span>
                    <span className="text-sm text-gray-900">.{(product.price % 1).toFixed(2).split('.')[1]}</span>
                </div>
            </div>

            {/* Sale Timer */}
            {product.saleEndTime && <div className="mb-2 text-xs font-medium text-red-600">{product.saleEndTime}</div>}

            {/* Save Percentage */}
            {product.originalPrice && (
                <div className="mb-2 inline-block rounded bg-orange-500 px-2 py-1 text-xs font-bold text-white">
                    Save: {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
            )}

            {/* More Options */}
            <div className="mb-3 text-xs text-gray-600">{product.moreOptions}</div>

            {/* Shipping */}
            <div className="mb-3 text-xs font-medium text-green-600">{product.shipping}</div>

            {/* Action Buttons */}
            <div className="space-y-2">
                <button className="w-full rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-orange-600">
                    ADD TO CART ›
                </button>
                <button className="w-full text-xs text-gray-600 transition-colors hover:text-blue-600">Compare</button>
            </div>
        </div>
    );

    return (
        <WebLayout>
          <Head>
            <title>CPU / Processor - TBZ.com</title>
            <meta name="description" content="Discover top-tier CPUs and processors at TBZ.com. Shop the latest Intel and AMD models for unbeatable performance." />
            <link rel="canonical" href="https://tbz.com.bd/" />
                {/* Open Graph Tags */}
                <meta property="og:title" content="CPU Processor" />
                <meta property="og:description" content="Explore the latest CPU processors available." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tbz.com.bd/" />
                <meta property="og:image" content="https://tbz.com.bd/images/og-home.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="TBZ" />
                <meta property="og:locale" content="en_US" />
                {/* Twitter Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@tbz" />
                <meta name="twitter:creator" content="@tbz" />
                <meta name="twitter:title" content="Address Book - User Dashboard" />
                <meta name="twitter:description" content="Manage your addresses in the Address Book." />
                <meta name="twitter:image" content="https://tbz.com.bd/images/twitter-home.jpg" />
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
                        description: 'CPU / Processor - Tbz.com',
                        applicationCategory: 'BusinessApplication',
                    })}
                </script>

          </Head>
            <div className="min-h-screen bg-gray-50">
                {/* Breadcrumb */}
                <div className="border-b border-gray-200 bg-white py-3">
                    <div className="max-w-8xl mx-auto px-4">
                        <nav className="text-sm text-gray-600">
                            <Link href="/" className="hover:text-blue-600">
                                Home
                            </Link>
                            <span className="mx-2">›</span>
                            <Link href="/" className="hover:text-blue-600">
                                Components & Storage
                            </Link>
                            <span className="mx-2">›</span>
                            <span className="text-gray-900">CPU / Processor</span>
                        </nav>
                    </div>
                </div>

                {/* Page Header */}
                <div className="border-b border-gray-200 bg-white py-4">
                    <div className="max-w-8xl mx-auto px-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">CPU / PROCESSOR</h1>
                                <div className="mt-2 flex space-x-4 text-sm">
                                    <Link href="#" className="font-bold text-blue-600 hover:underline">
                                        AMD Ryzen 9000 Series
                                    </Link>
                                    <Link href="#" className="font-bold text-blue-600 hover:underline">
                                        Intel 14th Gen
                                    </Link>
                                    <Link href="#" className="font-bold text-blue-600 hover:underline">
                                        Intel 14th Gen
                                    </Link>
                                    <Link href="#" className="font-bold text-blue-600 hover:underline">
                                        Best Sellers in CPU / Processor
                                    </Link>
                                    <Link href="#" className="font-bold text-blue-600 hover:underline">
                                        Lowest Price in CPU / Processor
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Banner - Below page header */}
                <div className="relative overflow-hidden">
                    {/* Background with gradient overlay */}
                    <div
                        className="h-100% relative bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('https://promotions.newegg.com/amd/25-0369/1920x360@2x.jpg')`,
                        }}
                    >
                        {/* Navigation arrows */}
                        <button className="absolute top-1/2 left-6 z-10 -translate-y-1/2 transform rounded-full bg-black/50 p-4 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/70">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="absolute top-1/2 right-6 z-10 -translate-y-1/2 transform rounded-full bg-black/50 p-4 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/70">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Content Container */}
                        <div className="relative flex h-full items-center">
                            <div className="mx-auto w-full max-w-7xl px-8">
                                <div className="flex h-full items-center justify-between">
                                    {/* Left Content */}
                                    <div className="max-w-2xl text-white">
                                        <div className="mb-6 inline-flex items-center rounded-full bg-orange-500/20 px-4 py-2 text-sm font-medium text-orange-400 backdrop-blur-sm">
                                            <span className="mr-2">🔥</span>
                                            LIMITED TIME OFFER
                                        </div>
                                        <h2 className="mb-3 text-6xl leading-tight font-bold tracking-tight">THIS IS WHY</h2>
                                        <h3 className="mb-3 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-6xl leading-tight font-bold tracking-tight text-transparent">
                                            WE GAME
                                        </h3>
                                        <p className="mb-2 text-2xl font-light text-gray-300">Experience everything</p>
                                        <p className="mb-8 text-2xl font-light text-gray-300">Compromise nothing</p>
                                        <button className="group inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:from-orange-600 hover:to-red-600">
                                            Shop now
                                            <svg
                                                className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Right Content - Featured Products */}
                                    <div className="hidden lg:block">
                                        <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-lg">
                                            <h4 className="mb-4 text-xl font-bold text-white">Featured Today</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-3 rounded-lg bg-white/10 p-3">
                                                    <img
                                                        src="https://c1.neweggimages.com/productimage/nb300/19-113-884-01.png"
                                                        alt="AMD CPU"
                                                        className="h-12 w-12 object-contain"
                                                    />
                                                    <div>
                                                        <div className="text-sm font-semibold text-white">AMD Ryzen 9 9950X</div>
                                                        <div className="text-xs text-orange-400">Starting at $699</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-3 rounded-lg bg-white/10 p-3">
                                                    <img
                                                        src="https://c1.neweggimages.com/productimage/nb300/19-113-884-01.png"
                                                        alt="Intel CPU"
                                                        className="h-12 w-12 object-contain"
                                                    />
                                                    <div>
                                                        <div className="text-sm font-semibold text-white">Intel Core i7-14700K</div>
                                                        <div className="text-xs text-blue-400">Starting at $319</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Carousel indicators */}
                        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-2">
                            <div className="h-2 w-8 rounded-full bg-white"></div>
                            <div className="h-2 w-2 rounded-full bg-white/50"></div>
                            <div className="h-2 w-2 rounded-full bg-white/50"></div>
                            <div className="h-2 w-2 rounded-full bg-white/50"></div>
                        </div>
                    </div>
                </div>

                {/* Sidebar and Main Content Container */}
                <div className="max-w-8xl mx-auto flex">
                    {/* Sidebar - Moved up, now starts right after header */}
                    <Sidebar />

                    {/* Main Content */}
                    <div className="flex-1 bg-gray-50 p-8">
                        {/* Promo Banners */}
                        <PromoBanners />

                        {/* Product Categories */}
                        <ProductCategories />

                        {/* Featured Items Header */}
                        <div className="mb-8 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">CPU / PROCESSOR FEATURED ITEMS</h2>
                                <div className="mt-2 flex items-center space-x-4">
                                    <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
                                        See All Featured →
                                    </Link>
                                    <span className="text-sm text-gray-500">•</span>
                                    <span className="text-sm text-gray-600">Showing 4 of 247 products</span>
                                </div>
                            </div>
                            {/* <div className="flex items-center space-x-4">
                                <Link 
                                    href="#" 
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    SHOP ALL PRODUCTS
                                </Link>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-gray-700">View:</span>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`rounded-md p-2 transition-colors ${
                                            viewMode === 'grid' 
                                                ? 'bg-blue-600 text-white shadow-md' 
                                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                        }`}
                                    >
                                        <Grid className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`rounded-md p-2 transition-colors ${
                                            viewMode === 'list' 
                                                ? 'bg-blue-600 text-white shadow-md' 
                                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                        }`}
                                    >
                                        <List className="h-4 w-4" />
                                    </button>
                                </div>
                            </div> */}
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {cpuProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Related Searches Section */}
                        <div className="mt-12 rounded-lg bg-white p-6 shadow-sm">
                            <h2 className="mb-6 text-xl font-bold text-gray-900">Related searches</h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                                    <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    <span className="text-gray-700">cpu</span>
                                </div>
                                <div className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                                    <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    <span className="text-gray-700">intel cpu</span>
                                </div>
                                <div className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                                    <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    <span className="text-gray-700">motherboard cpu combo</span>
                                </div>
                            </div>
                        </div>

                        {/* Customers Also Browsed Section */}
                        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">CUSTOMERS ALSO BROWSED</h2>
                                    <p className="text-sm text-gray-600">BASED ON ITEMS YOU VIEWED</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200">
                                        <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200">
                                        <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                                {/* Product 1 */}
                                <div className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg">
                                    <div className="mb-3 text-center">
                                        <img
                                            src="https://c1.neweggimages.com/productimage/nb300/19-113-884-01.png"
                                            alt="AMD Ryzen Threadripper PRO 5975WX"
                                            className="mx-auto h-24 w-auto object-contain"
                                        />
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-3 w-3 ${i < 4 ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <span className="ml-1 text-xs text-gray-600">(4)</span>
                                    </div>
                                    <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900">
                                        AMD Ryzen Threadripper PRO 5975WX - Ryzen...
                                    </h3>
                                    <div className="mb-2">
                                        <div className="text-xs text-gray-500 line-through">$1,862.89</div>
                                        <div className="flex items-baseline">
                                            <span className="text-lg font-bold text-gray-900">$1,799</span>
                                            <span className="text-sm text-gray-900">.99</span>
                                        </div>
                                    </div>
                                    <div className="mb-2 text-xs font-medium text-green-600">Free Shipping</div>
                                </div>

                                {/* Product 2 */}
                                <div className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg">
                                    <div className="mb-3 text-center">
                                        <img
                                            src="https://c1.neweggimages.com/productimage/nb300/19-113-884-01.png"
                                            alt="AMD Ryzen Threadripper PRO 5965WX"
                                            className="mx-auto h-24 w-auto object-contain"
                                        />
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-3 w-3 ${i < 4 ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <span className="ml-1 text-xs text-gray-600">(4)</span>
                                    </div>
                                    <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900">
                                        AMD Ryzen Threadripper PRO 5965WX Chagall Zen 3...
                                    </h3>
                                    <div className="mb-2">
                                        <div className="text-xs text-gray-500 line-through">$2,399.00</div>
                                        <div className="flex items-baseline">
                                            <span className="text-lg font-bold text-gray-900">$1,199</span>
                                            <span className="text-sm text-gray-900">.00</span>
                                        </div>
                                    </div>
                                    <div className="mb-2 inline-block rounded bg-orange-500 px-2 py-1 text-xs font-bold text-white">Save: 50%</div>
                                    <div className="mb-2 text-xs font-medium text-green-600">Free Shipping</div>
                                </div>

                                {/* Product 3 */}
                                <div className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg">
                                    <div className="mb-3 text-center">
                                        <img
                                            src="https://c1.neweggimages.com/productimage/nb300/19-113-884-01.png"
                                            alt="AMD Ryzen Threadripper PRO 5975WX"
                                            className="mx-auto h-24 w-auto object-contain"
                                        />
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-3 w-3 ${i < 4 ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <span className="ml-1 text-xs text-gray-600">(4)</span>
                                    </div>
                                    <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900">
                                        AMD Ryzen Threadripper PRO 5975WX - Ryzen...
                                    </h3>
                                    <div className="mb-2">
                                        <div className="flex items-baseline">
                                            <span className="text-lg font-bold text-gray-900">$1,799</span>
                                            <span className="text-sm text-gray-900">.98</span>
                                        </div>
                                    </div>
                                    <div className="mb-2 text-xs font-medium text-green-600">Free Shipping</div>
                                </div>

                                {/* Product 4 */}
                                <div className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg">
                                    <div className="mb-3 text-center">
                                        <img
                                            src="https://c1.neweggimages.com/productimage/nb300/19-113-884-01.png"
                                            alt="AMD Ryzen Threadripper PRO 5965WX"
                                            className="mx-auto h-24 w-auto object-contain"
                                        />
                                    </div>
                                    <div className="mb-2 flex items-center">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-3 w-3 ${i < 4 ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <span className="ml-1 text-xs text-gray-600">(4)</span>
                                    </div>
                                    <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900">
                                        AMD Ryzen Threadripper PRO 5965WX - Ryzen...
                                    </h3>
                                    <div className="mb-2">
                                        <div className="text-xs text-gray-500 line-through">$2,234.95</div>
                                        <div className="flex items-baseline">
                                            <span className="text-lg font-bold text-gray-900">$1,698</span>
                                            <span className="text-sm text-gray-900">.00</span>
                                        </div>
                                    </div>
                                    <div className="mb-2 inline-block rounded bg-orange-500 px-2 py-1 text-xs font-bold text-white">Save: 24%</div>
                                    <div className="mb-2 text-xs font-medium text-green-600">Free Shipping</div>
                                </div>
                            </div>

                            {/* Shop All Products Button */}
                            <div className="mt-8 text-center">
                                <button className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                    SHOP ALL PRODUCTS
                                </button>
                            </div>
                        </div>

                        {/* Article Section */}
                        <div className="mt-8 rounded-lg bg-white p-8 shadow-sm">
                            {/* What is a CPU Section */}
                            <div className="mb-12">
                                <h2 className="mb-6 text-2xl font-bold text-gray-900">What is a CPU?</h2>
                                <div className="prose max-w-none text-gray-700">
                                    <p className="mb-4 leading-relaxed">
                                        A CPU, or central processing unit, acts as the operations center of a computer, directing and coordinating
                                        other system components to execute user commands. You will find processors in computers, phones, TVs, and
                                        other electronic devices that run programs. CPU processors function as the fundamental brainpower behind these
                                        programs operations. The CPU sits at the heart of the system of a computer connected to the motherboard and
                                        has several key features that help increase the usability of a computer. Newegg offers an extensive range of
                                        high-quality CPU processors to meet your various device needs.
                                    </p>
                                </div>
                            </div>

                            {/* CPU Processors Allow Computers to Multitask */}
                            <div className="mb-12">
                                <h3 className="mb-4 text-xl font-semibold text-gray-900">CPU Processors Allow Computers to Multitask</h3>
                                <div className="prose max-w-none text-gray-700">
                                    <p className="mb-4 leading-relaxed">
                                        A single CPU machine lacks and from between various tasks in numerous multitasking. This increases the
                                        processor speed and makes a computer perform optimally. The processor then works with the operating system to
                                        ensure no data loss. In contrast, a multi-core processor contains more than one component. Only the bus
                                        interface and secondary memories allow the tasks to occur without switching CPU chips. The processor can run
                                        core on full capacity on tasks without slowing down other tasks or chopping other cores. Desktop CPUs handle
                                        the needs of desktop computers. The desktop processors provide a high thermal tolerance and are compatible
                                        with everything, including laptop devices. Most desktop processors, regardless of their Intel or higher-end
                                        power and execution, significantly improve computer response times using modern CPU interfaces. Generally,
                                        computer desktops use multi-core processor architecture, graphics, integrated technologies. Intel processors
                                        are known for their strong single-core performance, while AMD offers competitive multi-core performance at
                                        various price levels. Often including massive air-cooling to similar heat points. Choose Newegg as your
                                        destination to buy CPUs with its extensive desktop CPU options.
                                    </p>
                                </div>
                            </div>

                            {/* The Battle for CPU Supremacy */}
                            <div className="mb-12">
                                <h3 className="mb-4 text-xl font-semibold text-gray-900">The Battle for CPU Supremacy: AMD Ryzen vs. Intel Core</h3>
                                <div className="prose max-w-none text-gray-700">
                                    <p className="mb-4 leading-relaxed">
                                        The CPU market is heating up, with AMD and Intel unveiling their latest processor lines. Let's dive into the
                                        details of these cutting-edge technologies.
                                    </p>
                                </div>
                            </div>

                            {/* AMD Ryzen Series */}
                            <div className="mb-12">
                                <h4 className="mb-4 text-lg font-semibold text-gray-900">AMD Ryzen Series: Powering Performance</h4>
                                <div className="prose max-w-none text-gray-700">
                                    <p className="mb-4 leading-relaxed">
                                        AMD's Ryzen processors offer compelling performance across various price points and use cases.{' '}
                                        <span className="font-medium text-blue-600">Ryzen 9000 series</span> boasts improved performance and
                                        efficiency with Zen 5 architecture. Notable recent releases include the{' '}
                                        <span className="font-medium text-blue-600">Ryzen 9 9950X</span>, offering significant improvements with Zen 5
                                        architecture, integrated RDNA 3 graphics, and an NPU for AI tasks. Meanwhile, the{' '}
                                        <span className="font-medium text-blue-600">Ryzen 5000 series</span> delivers enhanced IPC and single-core
                                        performance with Zen 3 architecture, up to 16 cores/32 threads, and PCIe 4.0 support.
                                    </p>
                                </div>
                            </div>

                            {/* Intel Core Series */}
                            <div className="mb-12">
                                <h4 className="mb-4 text-lg font-semibold text-gray-900">Intel Core Series: Revolutionizing Efficiency</h4>
                                <div className="prose max-w-none text-gray-700">
                                    <p className="mb-4 leading-relaxed">
                                        Intel has announced its new <span className="font-medium text-blue-600">Arrow Lake Core Ultra</span> desktop
                                        processors in Oct 2024, branded as the Core Ultra 200 Series, mark a significant shift in focus towards power
                                        efficiency and capabilities. The new design utilizes foundry node utilizes Lion Cove P-cores + 16 Skymont
                                        E-cores, with key features including an integrated NPU, DDR5 memory support, PCIe 5.0, and LGA 1851 socket.
                                        Notably, power efficiency is improved by up to 58% in productivity tasks and 73% average power reduction in
                                        gaming.
                                    </p>
                                </div>
                            </div>

                            {/* Intel Core Processors */}
                            <div className="mb-12">
                                <h4 className="mb-4 text-lg font-semibold text-gray-900">Intel Core Processors: 12th, 13th, and 14th Gen</h4>
                                <div className="prose max-w-none text-gray-700">
                                    <p className="mb-4 leading-relaxed">
                                        Intel's <span className="font-medium text-blue-600">12th, 13th, and 14th Gen CPUs</span> offer hybrid
                                        architecture, featuring P-cores and E-cores for balanced performance. These previous generations support DDR4
                                        and DDR5 memory (platform dependent) and are compatible with the LGA 1700 socket across various
                                        configurations.
                                    </p>
                                </div>
                            </div>

                            {/* Available Configurations */}
                            <div className="mb-12">
                                <h4 className="mb-4 text-lg font-semibold text-gray-900">Available Configurations</h4>
                                <div className="prose max-w-none text-gray-700">
                                    <ul className="mb-4 list-disc space-y-2 pl-6">
                                        <li>
                                            <strong>Core i9:</strong> Up to 24 cores (8 Performance cores + 16 Efficiency cores) for maximum
                                            performance
                                        </li>
                                        <li>
                                            <strong>Core i7:</strong> Balanced high-end performance
                                        </li>
                                        <li>
                                            <strong>Core i5:</strong> Ideal for mainstream computing and gaming
                                        </li>
                                        <li>
                                            <strong>Core i3:</strong> Entry-level computing solutions
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Key Features */}
                            <div className="mb-12">
                                <h4 className="mb-4 text-lg font-semibold text-gray-900">Key Features</h4>
                                <div className="prose max-w-none text-gray-700">
                                    <ul className="mb-4 list-disc space-y-2 pl-6">
                                        <li>Hybrid architecture with P-cores and E-cores</li>
                                        <li>Support for DDR4 and DDR5 memory (platform dependent)</li>
                                        <li>Compatibility with LGA 1700 socket</li>
                                        <li>Balanced performance for various applications</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Server CPUs */}
                            <div className="mb-12">
                                <h4 className="mb-4 text-lg font-semibold text-gray-900">Server CPUs Are the Heart of a Server</h4>
                                <div className="prose max-w-none text-gray-700">
                                    <p className="mb-4 leading-relaxed">
                                        A server system responds to requests in a computer network to help provide a network service.{' '}
                                        <span className="font-medium text-blue-600">Server processors</span> provide incredible scalability and
                                        performance for handling demanding tasks with the efficiency that enterprises require. At Newegg, explore an
                                        array of server CPUs for sale, optimized to sustain extended periods of heavy loads from different users.
                                        Servers can support multiple processors, depending on the applications they undertake. These CPUs, often
                                        supporting multiple processors, operate at high frequencies to process more data.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Customer Reviews Section */}
                        <div className="mt-8 rounded-lg bg-white p-8 shadow-sm">
                            <h2 className="mb-8 text-2xl font-bold text-gray-900">Bestselling CPU / Processor Reviews:</h2>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                                {/* Review 1 */}
                                <div className="rounded-lg border border-gray-200 p-6">
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900">Jaime R.</h4>
                                        <p className="text-sm text-gray-600">10/8/2024 3:25:47 PM</p>
                                    </div>
                                    <h5 className="mb-3 text-lg font-bold text-gray-900">Faaaaassttt!!</h5>
                                    <p className="mb-4 text-sm text-gray-700">"Super nice upgrade."</p>
                                    <div className="text-xs text-blue-600">
                                        <a href="#" className="hover:underline">
                                            AMD Ryzen 7 7700X - Zen 4 8-Core 4.5 GHz - Socket AM5 - 105W Desktop Processor - 100-100000591WOF
                                        </a>
                                    </div>
                                </div>

                                {/* Review 2 */}
                                <div className="rounded-lg border border-gray-200 p-6">
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900">William M.</h4>
                                        <p className="text-sm text-gray-600">10/2/2024 7:10:22 AM</p>
                                    </div>
                                    <h5 className="mb-3 text-lg font-bold text-gray-900">good processor</h5>
                                    <p className="mb-4 text-sm text-gray-700">"Always been using intel."</p>
                                    <div className="text-xs text-blue-600">
                                        <a href="#" className="hover:underline">
                                            AMD Ryzen 9 7950X3D - Ryzen 9 7000 Series Zen 4 16-Core 4.2 GHz - Socket AM5 120W - AMD Radeon Graphics
                                            Desktop Processor - 100-100000908WOF
                                        </a>
                                    </div>
                                </div>

                                {/* Review 3 */}
                                <div className="rounded-lg border border-gray-200 p-6">
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900">Russell K.</h4>
                                        <p className="text-sm text-gray-600">9/20/2024 9:13:42 AM</p>
                                    </div>
                                    <h5 className="mb-3 text-lg font-bold text-gray-900">Great Processor</h5>
                                    <p className="mb-4 text-sm text-gray-700">"I am happy with my purchase."</p>
                                    <div className="text-xs text-blue-600">
                                        <a href="#" className="hover:underline">
                                            Intel Core i5-13600KF - Core i5 13th Gen Raptor Lake 14-Core (6P+8E) 3.5 GHz LGA 1700 125W None Integrated
                                            Graphics Desktop Processor - BX8071513600KF
                                        </a>
                                    </div>
                                </div>

                                {/* Review 4 */}
                                <div className="rounded-lg border border-gray-200 p-6">
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900">Anonymous</h4>
                                        <p className="text-sm text-gray-600">8/28/2024 11:57:57 AM</p>
                                    </div>
                                    <h5 className="mb-3 text-lg font-bold text-gray-900">Promises and delivers</h5>
                                    <p className="mb-4 text-sm text-gray-700">
                                        "Used to be an Intel guy but made the switch to team red and not going back."
                                    </p>
                                    <div className="text-xs text-blue-600">
                                        <a href="#" className="hover:underline">
                                            AMD Ryzen 7 7800X3D - Ryzen 7 7000 Series Zen 4 8-Core 4.2 GHz - Socket AM5 120W - AMD Radeon Graphics
                                            Desktop Processor - 100-100000910WOF
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Second Row of Reviews */}
                            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                                {/* Review 5 */}
                                <div className="rounded-lg border border-gray-200 p-6">
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900">Kohirak</h4>
                                        <p className="text-sm text-gray-600">10/5/2024 10:33:19 PM</p>
                                    </div>
                                    <h5 className="mb-3 text-lg font-bold text-gray-900">Great little CPU.</h5>
                                    <p className="mb-4 text-sm text-gray-700">
                                        "Not much to say other than it's the 'mild elder' of the original -X3D line of AMD CPUs."
                                    </p>
                                    <div className="text-xs text-blue-600">
                                        <a href="#" className="hover:underline">
                                            AMD Ryzen 9 7900X3D - Ryzen 9 7000 Series Zen 4 12-Core 4.4 GHz - Socket AM5 120W - AMD Radeon Graphics
                                            Desktop Processor - 100-100000909WOF
                                        </a>
                                    </div>
                                </div>

                                {/* Review 6 */}
                                <div className="rounded-lg border border-gray-200 p-6">
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900">Kevin R.</h4>
                                        <p className="text-sm text-gray-600">9/21/2024 1:21:57 PM</p>
                                    </div>
                                    <h5 className="mb-3 text-lg font-bold text-gray-900">Handled everything so far</h5>
                                    <p className="mb-4 text-sm text-gray-700">
                                        "The bigger issue was the single and multi-core processing of the two gave a significant advantage to Intel,
                                        and since my main priority is work related functions, I sacrificed a few FPS for rendering times."
                                    </p>
                                    <div className="text-xs text-blue-600">
                                        <a href="#" className="hover:underline">
                                            Intel Core i7-14700K - Core i7 14th Gen 20-Core (8P+12E) LGA 1700 125W Intel UHD Graphics 770 Processor -
                                            Boxed - BX8071514700K
                                        </a>
                                    </div>
                                </div>

                                {/* Review 7 */}
                                <div className="rounded-lg border border-gray-200 p-6">
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900">Ryan G.</h4>
                                        <p className="text-sm text-gray-600">9/14/2024 5:43:44 PM</p>
                                    </div>
                                    <h5 className="mb-3 text-lg font-bold text-gray-900">Don't give into the HYPE of the bigger chips</h5>
                                    <p className="mb-4 text-sm text-gray-700">
                                        "FACTS: If your looking to OC don't get it. You WANT constant stable power that will remain cool and last for
                                        years in a build. Yes, its 2 years of a chip but man is refined and Im an AMD lover."
                                    </p>
                                    <div className="text-xs text-blue-600">
                                        <a href="#" className="hover:underline">
                                            Intel Core i9-13900 Desktop Processor - 24 cores (8 P-cores + 16 E-cores) - 36MB Cache, up to 5.6 GHz -
                                            Box
                                        </a>
                                    </div>
                                </div>

                                {/* Review 8 */}
                                <div className="rounded-lg border border-gray-200 p-6">
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900">Robert F.</h4>
                                        <p className="text-sm text-gray-600">8/22/2024 12:32:46 PM</p>
                                    </div>
                                    <h5 className="mb-3 text-lg font-bold text-gray-900">Converted from Intel</h5>
                                    <p className="mb-4 text-sm text-gray-700">"I switched over from Intel for the first time in my life."</p>
                                    <div className="text-xs text-blue-600">
                                        <a href="#" className="hover:underline">
                                            AMD Ryzen 5 5600 - Ryzen 5 5000 Series Vermeer (Zen 3) 6-Core 3.5 GHz Socket AM4 65W None Integrated
                                            Graphics Desktop Processor - 100-100009927BOX
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar with Promotional Banners */}
                    <RightSidebar />
                </div>
            </div>
        </WebLayout>
    );
};

export default CPUProcessor;
