import React, { useState } from 'react';
import ProductCard from './ProductCard';
import PCBuildsCard from './PCBuildsCard';
import BannerCard from './BannerCard';

const MoreItemsToConsider = () => {
    const [showAll, setShowAll] = useState(false);

    // Sample data based on the HTML reference
    const products = [
        {
            id: '13-162-201',
            title: 'ASRock B850I Lightning WiFi AM5 AMD B850 Mini ITX Motherboard',
            image: 'https://c1.neweggimages.com/productimage/nb300/13-162-201-11.jpg',
            rating: 4.5,
            reviewCount: 52,
            currentPrice: '199.99',
            originalPrice: '209.99',
            badge: { type: 'wifi', text: 'WiFi 6E' },
            freeShipping: true
        },
        {
            id: '19-113-877',
            title: 'AMD Ryzen 7 9800X3D 9000 Series Zen 5 8-Core 5.2 GHz AM5 120W Processor',
            image: 'https://c1.neweggimages.com/productimage/nb300/19-113-877-01.png',
            rating: 4.8,
            reviewCount: 493,
            currentPrice: '479.00',
            originalPrice: '489.00',
            promo: '+ $10 off w/ promo code SSEWA34, limited offer',
            hasVideo: true,
            freeShipping: true
        },
        {
            id: '32-351-748',
            title: 'Microsoft Windows 11 Home USB',
            image: 'https://c1.neweggimages.com/productimage/nb300/32-351-748-V01.jpg',
            rating: 4.3,
            reviewCount: 892,
            currentPrice: '138.99',
            badge: { type: 'newegg-select', text: 'Newegg Select' },
            promo: 'Downloadable version also available',
            freeShipping: true
        },
        {
            id: '88-875-010',
            title: 'Zift Zillions – A Gift For You $50 Gift Card (Email Delivery)',
            image: 'https://c1.neweggimages.com/productimage/nb300/88-875-010-04.png',
            currentPrice: '45.00',
            originalPrice: '50.00',
            badge: { type: 'save', text: 'Save 10%' }
        }
    ];

    const pcBuild = {
        title: "Today's Ultimate PC Builds",
        linkText: 'Shop now',
        currentPrice: '1199.92',
        originalPrice: '1269.92',
        savings: '70.00',
        products: [
            { name: 'CORSAIR 3500X PC Case', image: 'https://c1.neweggimages.com/nobgproductcompressall300/11-139-213-01.png' },
            { name: 'Intel Core i5-14600K', image: 'https://c1.neweggimages.com/nobgproductcompressall300/19-118-470-07.jpg' },
            { name: 'CORSAIR RM750e PSU', image: 'https://c1.neweggimages.com/nobgproductcompressall300/17-139-339-06.png' },
            { name: 'WD_BLACK 2TB SN850X SSD', image: 'https://c1.neweggimages.com/nobgproductcompressall300/20-250-247-02.jpg' },
            { name: 'GIGABYTE RTX 5060', image: 'https://c1.neweggimages.com/nobgproductcompressall300/14-932-803-13.jpg' },
            { name: 'ASUS TUF Gaming Z790', image: 'https://c1.neweggimages.com/nobgproductcompressall300/13-119-618-V01.jpg' },
            { name: 'G.SKILL Trident Z5 32GB', image: 'https://c1.neweggimages.com/nobgproductcompressall300/20-374-357-V02.jpg' }
        ]
    };

    const banner = {
        title: 'PLAY, CREATE, GENERATE',
        image: 'https://c1.neweggimages.com/nobgproductcompressall640/14-883-006-16.png',
        linkText: 'Shop Now',
        href: '//promotions.newegg.com/intel/24-1360/index.html',
        onClick: () => {
            // Analytics tracking
            console.log('Banner clicked');
        }
    };

    const displayedProducts = showAll ? products : products.slice(0, 3);

    return (
        <div className="py-8">
            {/* Section Title */}
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-blue-900">More Items to Consider</h2>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
                {(() => {
                    const items = [];
                    // Insert first product if present
                    if (displayedProducts[0]) {
                        items.push(
                            <ProductCard key={displayedProducts[0].id || 'p-0'} product={displayedProducts[0]} />
                        );
                    }

                    // Insert PC Builds card
                    items.push(<PCBuildsCard key="pc-builds" build={pcBuild} />);

                    // Insert second product if present
                    if (displayedProducts[1]) {
                        items.push(
                            <ProductCard key={displayedProducts[1].id || 'p-1'} product={displayedProducts[1]} />
                        );
                    }

                    // Insert banner
                    items.push(<BannerCard key="banner" banner={banner} />);

                    // Insert remaining products (from index 2 onward)
                    for (let i = 2; i < displayedProducts.length; i += 1) {
                        const product = displayedProducts[i];
                        if (!product) continue;
                        items.push(
                            <ProductCard key={product.id || `p-${i}`} product={product} />
                        );
                    }

                    return items;
                })()}
            </div>

            {/* Load More Button */}
            <div className="text-center">
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    {showAll ? 'Show Less' : 'Load More'}
                </button>
            </div>
        </div>
    );
};

export default MoreItemsToConsider;
