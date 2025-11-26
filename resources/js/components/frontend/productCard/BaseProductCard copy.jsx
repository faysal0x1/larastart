import { Link } from '@inertiajs/react';
import React from 'react';
import { Star } from 'lucide-react';
import LazyImage from '@/components/LazyImage';

// Shared price formatting function
export const formatPrice = (value) => {
    try {
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    } catch (_) {
        return value;
    }
};

// Rating stars component
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

// Price display component
const PriceDisplay = ({ price, was, call_for_price, call_for_price_number, variant = 'default' }) => {
    const formatPriceDisplay = (priceValue) => {
        return formatPrice(priceValue || 0);
    };

    const discountPercent = was && price
        ? Math.round(((was - price) / was) * 100)
        : null;

    if (call_for_price) {
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

    // Default variant (grid/primary)
    return (
        <>
            <div className="flex items-end gap-2">
                <div className="text-gray-900">
                    <span className="text-sm align-top">৳</span>
                    <span className="text-2xl font-bold">{formatPriceDisplay(price).split('.')[0]}</span>
                    <sup className="text-sm">.{formatPriceDisplay(price).split('.')[1]}</sup>
                </div>
                {was && (
                    <div className="text-xs text-gray-500 line-through">৳{formatPriceDisplay(was)}</div>
                )}
            </div>
            {discountPercent && discountPercent > 0 && (
                <div className="flex items-center gap-2">
                    <span className="rounded bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">Save {discountPercent}%</span>
                </div>
            )}
        </>
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
}) => {
    // Normalize product data - handle different product data structures
    const title = product?.title || product?.name || 'Product';
    const price = product?.price || product?.final_price || 0;
    const was = product?.was || product?.unit_price || null;
    const img = product?.img || product?.image_url || '';
    const brandName = product?.brandName || product?.brand?.name || '';
    const rating = product?.rating || product?.average_rating || 0;
    const ratingCount = product?.ratingCount || (Array.isArray(product?.product_reviews) ? product.product_reviews.length : 0);
    const slug = product?.slug || '';
    const call_for_price = product?.call_for_price || false;
    const call_for_price_number = product?.call_for_price_number || '8801713991638';

    // Calculate discount percentage for save badge
    const discountPercent = was && price
        ? Math.round(((was - price) / was) * 100)
        : null;

    // Image component
    const ImageComponent = useLazyImage ? (
        <LazyImage
            src={img}
            alt={title}
            className={imageClassName || "max-h-full max-w-full"}
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
            className={imageClassName || "h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"}
        />
    );

    // List variant (horizontal layout)
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

    // Compact variant (for ProductShowSlider)
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

                {product?.discount_type === 'percent' && product?.discount_price && (
                    <div className="mb-2 inline-block rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                        Save {product.discount_price}%
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

    // Default grid variant (PrimaryProductCard)
    return (
        <div className={`snap-start w-full min-w-0 sm:min-w-[200px] sm:w-[200px] md:min-w-[240px] md:w-[240px] lg:min-w-[220px] lg:w-[220px] xl:min-w-[240px] xl:w-[240px] 2xl:min-w-[260px] 2xl:w-[260px] ${className}`}>
            <div className="relative group">
                <Link href={route('web.slug', slug)} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                        {ImageComponent}
                    </div>
                </Link>
            </div>

            <div className="mt-3 space-y-1">
                {rating > 0 && ratingCount > 0 && (
                    <RatingStars rating={rating} ratingCount={ratingCount} size="default" />
                )}

                <Link href={route('web.slug', slug)} className="block text-sm font-semibold leading-snug text-gray-900 line-clamp-2 hover:underline">
                    {title}
                </Link>

                {brandName && (
                    <p className="text-xs text-gray-600">{brandName}</p>
                )}

                <PriceDisplay
                    price={price}
                    was={was}
                    call_for_price={call_for_price}
                    call_for_price_number={call_for_price_number}
                    variant="default"
                />
            </div>
        </div>
    );
};

export default BaseProductCard;

