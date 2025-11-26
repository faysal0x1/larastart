import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const formatPhoneForWhatsApp = (phone) => {
    if (!phone) return '';
    return phone.replace(/[\s+\-()]/g, '');
};

// Shared price formatting function (retained for other variants and general use)
export const formatPrice = (value) => {
    try {
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    } catch (_) {
        return value;
    }
};

const StickyProductHeader = ({ activeTab, onTabChange, product, title, computedPrice, computedOldPrice, images, onAddToCart }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            // Show header after scrolling 200px
            setIsVisible(scrollPosition > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionName) => {
        let targetElement;

        if (sectionName === 'Compare Products') {
            targetElement = document.getElementById('compare-section');
        } else {
            // For tabs, we need to scroll to the ProductTabs and switch to the specific tab
            targetElement = document.getElementById('product-tabs');
            if (targetElement && onTabChange) {
                // Map the section names to match ProductTabs naming
                const tabMapping = {
                    Overview: 'Overview',
                    Specs: 'Product Specification',
                    Reviews: 'Reviews',
                    'Q & A': 'Q&A',
                };
                const mappedTab = tabMapping[sectionName] || sectionName;
                onTabChange(mappedTab);
            }
        }

        if (targetElement) {
            const headerHeight = 80; // Adjust based on your header height
            const elementPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth',
            });
        }
    };

    const handleCallForPrice = (e) => {
        e.preventDefault(); // Stop link behavior for button click
        // Redirect to WhatsApp
        const formattedPhone = formatPhoneForWhatsApp(call_for_price_number);
        const whatsappMessage = encodeURIComponent(`Hi, I'm interested in ${productTitle || 'this product'}`);
        const whatsappUrl = `https://wa.me/${formattedPhone}?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };
    const handleAddToCart = async () => {
        if (!onAddToCart) return;

        try {
            setIsLoading(true);
            await onAddToCart(1); // Add 1 quantity by default
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Get product data with fallbacks
    const productTitle = title || product?.name || 'Product';
    const productPrice = (computedPrice ?? product?.final_price ?? product?.unit_price ?? product?.price) || 0;
    const productOldPrice = computedOldPrice || product?.unit_price || product?.old_price;
    const productImage = images?.[0] || product?.image_url || product?.product_thumbnail || '';
    const call_for_price_number = product.call_for_price_number;
    const call_for_price = product.call_for_price;

    const tabs = [
        { name: 'Overview', count: null },
        { name: 'Specs', count: null },
        { name: 'Reviews', count: 89 },
        { name: 'Q & A', count: 19 },
        // { name: "Compare Products", count: null },
        // { name: "More From This Seller", count: null },
        // { name: "Warranty & Returns", count: null },
        // { name: "More Buying Options", count: null },
    ];

    return (
        <div
            className={`bg-background border-border fixed top-0 right-0 left-0 z-50 border-b shadow-lg transition-transform duration-300 ease-in-out ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <div className="mx-auto max-w-[1680px] px-2 py-2 sm:px-4 sm:py-3">
                <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
                    {/* Navigation Tabs */}
                    <div className="flex w-full items-center space-x-1 overflow-x-auto pb-1 sm:w-auto sm:pb-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => scrollToSection(tab.name)}
                                className={`rounded-lg px-2 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                                    activeTab === tab.name || (tab.name === 'Q & A' && activeTab === 'Q&A')
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                            >
                                {tab.name}
                                {tab.count && <span className="ml-1 text-xs">({tab.count})</span>}
                            </button>
                        ))}
                    </div>

                    {/* Product Summary */}
                    <div className="flex w-full items-center space-x-2 sm:w-auto sm:space-x-4">
                        {/* Product Image */}
                        <div className="bg-muted h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg sm:h-12 sm:w-12">
                            {productImage ? (
                                <img src={productImage} alt={productTitle} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                                    <span className="text-xs text-gray-500">No Image</span>
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="flex min-w-0 flex-1 flex-col">
                            <h3 className="text-foreground max-w-[150px] truncate text-xs font-semibold sm:max-w-[200px] sm:text-sm md:max-w-xs">
                                {productTitle}
                            </h3>
                            <div className="mt-1 flex items-center space-x-2 sm:space-x-3">
                                {productOldPrice && productOldPrice > productPrice && (
                                    <span className="text-muted-foreground text-xs line-through sm:text-sm">
                                        ৳{Number(productOldPrice).toLocaleString()}
                                    </span>
                                )}
                                <span className="text-primary text-sm font-bold sm:text-lg">
                                    ৳{Math.floor(productPrice).toLocaleString()}
                                    {productPrice % 1 !== 0 && <sup className="text-xs">.{(productPrice % 1).toFixed(2).split('.')[1]}</sup>}
                                </span>
                                <span className="text-secondary bg-secondary/10 hidden rounded px-1.5 py-0.5 text-xs font-medium sm:inline-block">
                                    FREE SHIPPING
                                </span>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        {productPrice > 0 ? (
                            <Button
                                onClick={handleAddToCart}
                                disabled={isLoading}
                                className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-200 sm:px-6 sm:text-sm ${
                                    isAdded
                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                        : isLoading
                                          ? 'cursor-not-allowed bg-orange-400 text-black'
                                          : 'bg-orange-500 text-black hover:bg-orange-600'
                                }`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-1">
                                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                        <span className="hidden sm:inline">Adding...</span>
                                    </div>
                                ) : isAdded ? (
                                    <div className="flex items-center gap-1">
                                        <span>✓</span>
                                        <span className="hidden sm:inline">Added</span>
                                    </div>
                                ) : (
                                    <span>Add to Cart</span>
                                )}
                            </Button>
                        ) : (
                            <div className="mt-2">
                                <button
                                    onClick={handleCallForPrice}
                                    className="flex w-full -skew-x-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#25D366] bg-[#25D366] px-3 py-1.5 text-center text-sm font-semibold text-white shadow-sm transition duration-150 ease-in-out hover:bg-[#20BA5A]"
                                    disabled={!call_for_price_number}
                                >
                                    <WhatsAppIcon className="h-4 w-4" />
                                    WhatsApp for Price
                                </button>

                                {/* Phone Number Display */}
                                {call_for_price_number && (
                                    <p className="mt-1.5 text-center text-xs text-gray-500">
                                        Or call:{' '}
                                        <a
                                            href={`tel:${call_for_price_number}`}
                                            className="font-bold text-gray-700 transition duration-150 hover:text-blue-600"
                                        >
                                            {call_for_price_number}
                                        </a>
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StickyProductHeader;
