import { Link } from '@inertiajs/react';
import React from 'react';
import { Star, Play, PhoneCall, X } from 'lucide-react';
import LazyImage from '@/components/LazyImage';

// Renaming PhoneCall for clarity in the button section
const Call = PhoneCall;

const DEFAULT_GRID_CARD_HEIGHT = 420;

// WhatsApp Icon SVG Component
const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

// Helper function to format phone number for WhatsApp (remove +, spaces, dashes)
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

// Rating stars component (retained for other variants, but not used in the new 'default' design)
const RatingStars = ({ rating, ratingCount = 0, size = 'default', showCount = true }) => {
    const starSize = size === 'small' ? 'h-4 w-4' : 'h-5 w-5';
    const textSize = size === 'small' ? 'text-xs' : 'text-sm';

    return (
        <div className={`flex items-center gap-1 text-amber-500 ${size === 'small' ? 'mt-1' : ''}`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={size === 'small' ? 14 : 20}
                    fill={i < Math.round(rating || 0) ? 'currentColor' : 'none'}
                    className={i < Math.round(rating || 0) ? 'text-amber-500' : 'text-gray-300'}
                />
            ))}
            {showCount && ratingCount > 0 && (
                <span className={`ml-1 ${textSize} text-gray-500`}>({ratingCount})</span>
            )}
        </div>
    );
};

// Price display component (modified to only handle list/compact variants as default is now custom)
const PriceDisplay = ({ price, was, call_for_price, call_for_price_number, variant = 'default' }) => {
    const formatPriceDisplay = (priceValue) => {
        // Use the original formatPrice for standard number formatting
        return formatPrice(priceValue || 0);
    };

    const discountPercent = was && price
        ? Math.round(((was - price) / was) * 100)
        : null;

    if (call_for_price) {
        // Retaining the original call for price logic for list/compact variants
        if (variant === 'list') {
            return (
                <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-blue-600">Contact for Price</span>
                    <a
                        href={`tel:${call_for_price_number}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-gray-600 hover:text-blue-600 transition-colors mt-1"
                    >
                        📞 {call_for_price_number}
                    </a>
                </div>
            );
        }
        // Retaining original logic for 'compact' if call_for_price is true.
        return (
            <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-600">Contact for Price</span>
                <a
                    href={`tel:${call_for_price_number}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                    📞 {call_for_price_number}
                </a>
            </div >
        );
    }

    if (variant === 'list') {
        return (
            <>
                <div className="text-lg font-bold text-gray-900">৳{formatPriceDisplay(price).split('.')[0]}</div>
                {was && (
                    <div className="text-xs text-gray-400 line-through">৳{formatPriceDisplay(was)}</div>
                )}
                {discountPercent && discountPercent > 0 && (
                    <span className="inline-block mt-1 rounded bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">
                        Save {discountPercent}%
                    </span>
                )}
            </>
        );
    }

    if (variant === 'compact') {
        return (
            <div className="flex flex-col">
                {was && (
                    <span className="text-sm text-gray-400 line-through">৳{formatPriceDisplay(was)}</span>
                )}
                <span className="text-xl font-bold text-gray-900">৳{formatPriceDisplay(price).split('.')[0]}</span>
            </div>
        );
    }

    // Default variant (grid/primary) - Should not be reached, as logic is moved to BaseProductCard
    return null;
};

// Custom Price Display logic for the new 'default' design
const NewPriceDisplay = ({ price, originalPrice, call_for_price_number, productTitle }) => {
    const internalFormatPrice = (p) => {
        if (!p) return null;

        // Clean up potential non-digit characters (like commas) before splitting
        const cleanedPrice = String(p).replace(/,/g, '');
        const parts = cleanedPrice.split('.');
        const main = parts[0];
        const decimal = parts.length > 1 ? parts[1] : null;

        return (
            <div className="flex items-baseline gap-1">
                <span className='text-2xl font-bold text-gray-900'>৳</span><span className="text-xl font-semibold text-gray-800">{main}</span>
                {decimal && <span className="text-lg text-gray-900">.{decimal}</span>}
            </div>
        );
    };

    const handleCallForPrice = (e) => {
        e.preventDefault(); // Stop link behavior for button click
        // Redirect to WhatsApp
        const formattedPhone = formatPhoneForWhatsApp(call_for_price_number);
        const whatsappMessage = encodeURIComponent(`Hi, I'm interested in ${productTitle || 'this product'}`);
        const whatsappUrl = `https://wa.me/${formattedPhone}?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="mt-auto  border-gray-200">
            {/* Price Display (Only if price exists) */}
            {price && price > 0 && (
                <div className="mb-2">
                    {internalFormatPrice(price)}
                    {originalPrice && originalPrice > 0 && (
                        <div className=" text-gray-500 line-through">
                            ৳<span className='text-xs'>{formatPrice(originalPrice)}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Call for Price Button and Phone Number (Always Visible) */}
            {(!price || Number(price) === 0) && (
                <div className="mt-2">
                    <button
                        onClick={handleCallForPrice}
                        className="w-full cursor-pointer text-center text-white bg-[#25D366] border border-[#25D366] hover:bg-[#20BA5A] font-semibold text-sm py-1.5 px-3 rounded-lg transition duration-150 ease-in-out flex items-center justify-center gap-2 shadow-sm -skew-x-12"
                        disabled={!call_for_price_number}
                    >
                        <WhatsAppIcon className="w-4 h-4" />
                        WhatsApp for Price
                    </button>

                    {/* Phone Number Display */}
                    {call_for_price_number && (
                        <p className="text-xs text-gray-500 text-center mt-1.5">
                            Or call: <a href={`tel:${call_for_price_number}`} className="font-bold text-gray-700 hover:text-blue-600 transition duration-150">{call_for_price_number}</a>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};


/**
 * BaseProductCard - Centralized product card component
 *
 * @param {Object} product - Product data object
 * @param {string} variant - Layout variant: 'grid' | 'list' | 'compact'
 * @param {Object} options - Additional options
 * @param {Function} onAddToCart - Optional callback for add to cart (for compact variant)
 * @param {boolean} useLazyImage - Whether to use LazyImage component (default: false)
 * @param {boolean} hasVideo - Whether the product has a video (for the new design)
 * @param {string} videoUrl - The URL of the product video (for the new design)
 * @param {string} freeGift - Custom free gift text (for the new design)
 */
const BaseProductCard = ({
    product,
    variant = 'grid',
    onAddToCart = null,
    useLazyImage = false,
    className = '',
    imageClassName = '',
    showBadge = false,
    badge = null,
    promotionalText = null,
    hasVideo = false,
    videoUrl = null,
    freeGift = null, // Using explicit prop to match user's sample
    gridCardHeight = DEFAULT_GRID_CARD_HEIGHT,
}) => {

    // NEW: State to manage the visibility of the video modal
    const [showVideoModal, setShowVideoModal] = React.useState(false);

    // Normalize product data - handle different product data structures
    const title = product?.title || product?.name || 'Product';
    // Use Number() to ensure price/was are treated as numbers for comparison/math
    const price = Number(product?.price || product?.final_price || 0);
    const was = Number(product?.was || product?.unit_price || 0);
    const img = product?.img || product?.image_url || '';
    const brandName = product?.brandName || product?.brand?.name || '';
    const rating = product?.rating || product?.average_rating || 0;
    const ratingCount = product?.ratingCount || (Array.isArray(product?.product_reviews) ? product.product_reviews.length : 0);
    const slug = product?.slug || '';
    const call_for_price = product?.call_for_price || false;
    // Note: Updated default phone number to match the format in the user's sample for the default variant
    const call_for_price_number = product?.call_for_price_number || '+880-17XX-XXXXXX';
    const finalVideoUrl = videoUrl || product?.video_url || null;
    const finalHasVideo = hasVideo || product?.has_video || (finalVideoUrl ? true : false);


    // Calculate discount percentage for save badge/discount text
    const discountPercent = (was > 0 && price < was)
        ? Math.round(((was - price) / was) * 100)
        : null;
    const discountText = discountPercent > 0 ? `Save ${discountPercent}%` : null;

    // Handler for opening the video modal
    const handlePlayVideo = (e) => {
        e.stopPropagation(); // Prevent card click events
        e.preventDefault(); // Prevent navigating to product page
        if (finalVideoUrl) {
            setShowVideoModal(true);
        } else {
            console.log('No video URL provided for this product.');
        }
    };

    // Handler for closing the video modal
    const handleCloseModal = () => {
        setShowVideoModal(false);
    };

    // Image component
    const ImageComponent = useLazyImage ? (
        <LazyImage
            src={img}
            alt={title}
            className={imageClassName || "max-h-full max-w-full object-contain"}
            objectFit="contain"
            updatedAt={product?.updated_at}
            fallback={
                <div className="max-h-full max-w-full flex items-center justify-center bg-gray-100">
                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                </div>
            }
        />
    ) : (
        <img
            src={img}
            alt={title}
            title={title}
            loading="lazy"
            decoding="async"
            className={imageClassName || "max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/CCCCCC/333333?text=Image+Missing"; }} // Added error handler
        />
    );

    // List variant (horizontal layout) - KEPT ORIGINAL DESIGN
    if (variant === 'list') {
        const ListImageComponent = useLazyImage ? (
            <LazyImage
                src={img}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                objectFit="cover"
                updatedAt={product?.updated_at}
                fallback={
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                    </div>
                }
            />
        ) : (
            <img
                src={img}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
        );

        return (
            <div className={`bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow hover:shadow-md transition-shadow duration-200 p-4 ${className}`}>
                <div className="flex gap-4">
                    <Link href={route('web.slug', slug)} className="flex-shrink-0 w-24 h-20 sm:w-32 sm:h-24 overflow-hidden rounded-lg border border-gray-100 relative group">
                        {ListImageComponent}
                    </Link>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <Link
                                    href={route('web.slug', slug)}
                                    className="text-base font-semibold text-gray-900 line-clamp-2 hover:underline"
                                >
                                    {title}
                                </Link>
                                {brandName && (
                                    <p className="text-sm text-gray-500 mt-0.5">{brandName}</p>
                                )}
                                <RatingStars rating={rating} ratingCount={ratingCount} size="small" />
                            </div>
                            <div className="text-right flex-shrink-0">
                                <PriceDisplay
                                    price={price}
                                    was={was}
                                    call_for_price={call_for_price}
                                    call_for_price_number={call_for_price_number}
                                    variant="list"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Compact variant (for ProductShowSlider) - KEPT ORIGINAL DESIGN
    if (variant === 'compact') {
        return (
            <div className={`relative ${className}`}>
                {showBadge && badge && (
                    <div className="mb-3 inline-block rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                        {badge}
                    </div>
                )}

                <Link prefetch href={route('web.slug', slug)} className="block group relative mb-4 h-40">
                    <div className="flex h-full justify-center items-center relative">
                        {ImageComponent}
                    </div>
                </Link>

                <div className="mb-2 flex items-center gap-1">
                    <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                            <span key={i} className={i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}>
                                ★
                            </span>
                        ))}
                    </div>
                    <span className="text-sm text-gray-500">({ratingCount})</span>
                </div>

                <Link prefetch href={route('web.slug', slug)} className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-medium text-gray-900 cursor-pointer">
                    {title}
                </Link>

                {promotionalText && (
                    <p className="mb-2 text-sm font-medium text-red-600">{promotionalText}</p>
                )}

                {discountPercent > 0 && (
                    <div className="mb-2 inline-block rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                        Save {discountPercent}%
                    </div>
                )}

                <PriceDisplay
                    price={price}
                    was={was}
                    call_for_price={call_for_price}
                    call_for_price_number={call_for_price_number}
                    variant="compact"
                />
            </div>
        );
    }

    // Default grid variant (PrimaryProductCard) - IMPLEMENTED NEW DESIGN
    const resolvedGridCardHeight = (variant === 'grid' && gridCardHeight)
        ? (typeof gridCardHeight === 'number' ? `${gridCardHeight}px` : gridCardHeight)
        : null;

    return (
        <>
            <div className={`snap-start h-full w-full min-w-0 sm:min-w-[220px] sm:w-[220px] md:min-w-[260px] md:w-[260px] lg:min-w-[240px] lg:w-[240px] xl:min-w-[260px] xl:w-[260px] 2xl:min-w-[280px] 2xl:w-[280px] ${className}`}>

                <div className="h-full w-full p-1 sm:p-1.5">

                    {/* Main Product Card Container - NEW STYLING */}
                    <div
                        className="bg-sky-50/50 p-4 relative flex flex-col h-full rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                        style={resolvedGridCardHeight ? { minHeight: resolvedGridCardHeight, height: resolvedGridCardHeight } : undefined}
                    >

                        {/* Badge (Top-Left) */}
                        {(showBadge && badge) && (
                            <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded z-10 -skew-x-6">
                                {badge}
                            </div>
                        )}

                        {/* <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded z-10 -skew-x-6">
                        Need To Add Badge
                    </div> */}

                        {/* Image Container */}
                        <Link href={route('web.slug', slug)} className="relative mb-4 flex items-center justify-center h-48 bg-white/50 rounded-lg p-2 group">
                            <div className="flex h-full justify-center items-center relative">
                                {ImageComponent}
                            </div>
                            {finalHasVideo && (
                                <button
                                    onClick={handlePlayVideo}
                                    className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-blue-50 transition duration-150"
                                    aria-label="Play product video"
                                >
                                    <Play className="w-5 h-5 text-blue-600" fill="currentColor" />
                                </button>
                            )}
                        </Link>

                        {/* Rating - Updated to match ProductCard structure */}
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                        ★
                                    </span>
                                ))}
                            </div>
                            <span className="text-gray-600 text-sm">({ratingCount})</span>
                        </div>

                        {/* Title */}
                        <Link
                            href={route('web.slug', slug)}
                            className="text-sm text-gray-800 mb-3 line-clamp-2 flex-grow font-medium hover:underline"
                        >
                            {title}
                        </Link>

                        {/* Promotion */}
                        {promotionalText && (
                            <p className="text-xs text-red-600 mb-2 line-clamp-2 italic">
                                {promotionalText}
                            </p>
                        )}

                        {/* Badges for discount and free gift */}

                        {
                            (discountText || freeGift) && (
                                <div className="flex gap-2 mb-3">
                                    {discountText && (
                                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded -skew-x-6 shadow-sm">
                                            {discountText}
                                        </span>
                                    )}
                                    {freeGift && (
                                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded -skew-x-6 shadow-sm">
                                            {freeGift}
                                        </span>
                                    )}
                                </div>)}

                        {/* Discount and Free Gift Badges */}
                        <div className="flex gap-2 mb-3">

                            {/* <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded -skew-x-6 shadow-sm">
                            Save:10%
                        </span>

                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded -skew-x-6 shadow-sm">
                            Free Gift
                        </span> */}

                        </div>

                        {/* Price and Call for Price Block */}
                        <NewPriceDisplay
                            price={price > 0 ? price : null} // Only show price if > 0
                            originalPrice={was > price ? was : null} // Only show original price if greater than price
                            call_for_price_number={call_for_price_number}
                            productTitle={title}
                        />
                    </div>
                </div>
            </div>

            {/* Video Modal Overlay (The new functionality) */}
            {showVideoModal && finalVideoUrl && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4 transition-opacity duration-300"
                    // Close modal when clicking on the overlay background
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white rounded-xl shadow-2xl p-4 w-full max-w-4xl relative"
                        // Prevent closing when clicking inside the content box
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute -top-3 -right-3 text-white bg-red-600 rounded-full p-2 hover:bg-red-700 z-10 shadow-lg transition duration-150"
                            aria-label="Close video player"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h4 className="text-lg font-bold mb-3 text-gray-800 line-clamp-1">Product Video: {title}</h4>

                        {/* Responsive container for 16:9 video aspect ratio */}
                        <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' }}>
                            <iframe
                                title={`Video for ${title}`}
                                // Using '?autoplay=1&rel=0' to auto-play (when allowed) and remove related videos
                                src={finalVideoUrl.includes('?') ? finalVideoUrl : `${finalVideoUrl}?autoplay=1&rel=0`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BaseProductCard;
