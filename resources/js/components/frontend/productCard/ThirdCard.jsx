import React, { useMemo, useRef, useState, useCallback } from 'react';
import { Link } from '@inertiajs/react';

const formatPrice = (value) => {
    try {
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    } catch (_) {
        return value;
    }
};
// this is the samw card like the primaru card but with a different design
const ThirdCard = ({ product, onAddToCart }) => {
    const {
        id: itemNumber,
        img: imageSrc,
        title,
        brandName,
        rating: ratingValue,
        ratingCount,
        price: currentPrice,
        was: originalPrice,
        tag: promo,
        video,
        brandImg
    } = product;

    const href = route('web.slug', product.slug || itemNumber);
    const image = { src: imageSrc, alt: title, title: title };
    const price = { current: currentPrice, was: originalPrice };
    const rating = { value: ratingValue, count: ratingCount };
    const discountPercent = originalPrice && currentPrice
        ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
        : null;

    const shipping = "Free shipping";
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const videoRef = useRef(null);
    const showVideoButton = useMemo(() => Boolean(video && video.src), [video]);

    const handlePlayToggle = (e) => {
        e.preventDefault();
        if (!showVideoButton) return;
        const next = !isPlaying;
        setIsPlaying(next);
        requestAnimationFrame(() => {
            if (next && videoRef.current) videoRef.current.play().catch(() => { });
            else if (!next && videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        });
    };

    // CSRF and API helper functions
    const readCookie = (name) => {
        if (typeof document === 'undefined') return null;
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    };

    const ensureCsrfHeaders = useCallback(async () => {
        const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
        const metaToken = typeof document !== 'undefined' ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') : null;
        if (metaToken) {
            headers['X-CSRF-TOKEN'] = metaToken;
            return headers;
        }
        try {
            await fetch('/sanctum/csrf-cookie', { credentials: 'include' });
            const xsrf = readCookie('XSRF-TOKEN');
            if (xsrf) headers['X-XSRF-TOKEN'] = xsrf;
        } catch (_) { /* ignore */ }
        return headers;
    }, []);

    const writeProductCache = (productId, data) => {
        try {
            const raw = localStorage.getItem('productCache');
            const cache = raw ? JSON.parse(raw) : {};
            cache[productId] = {
                title: data?.title || product?.title || 'Product',
                img: data?.img || product?.img || '',
                seller: data?.seller || (product?.brandName || ''),
            };
            localStorage.setItem('productCache', JSON.stringify(cache));
        } catch (_) {
            // ignore cache errors
        }
    };

    // Add to Cart handler
    const handleAddToCartClick = useCallback(async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!product?.id) {
            console.error('Product not available');
            return;
        }

        try {
            setIsLoading(true);

            const headers = await ensureCsrfHeaders();
            const res = await fetch('/api/cart/add', {
                method: 'POST',
                headers,
                credentials: 'include',
                body: JSON.stringify({
                    product_id: product.id,
                    quantity: 1
                })
            });

            if (!res.ok) {
                throw new Error('Failed to add to cart');
            }

            // Cache minimal product data for CartPage rendering
            writeProductCache(product.id, {
                title: product.title,
                img: product.img || '',
                seller: product.brandName || ''
            });

            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);

            // Call parent handler to open modal
            if (onAddToCart) {
                onAddToCart(product);
            }

        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setIsLoading(false);
        }
    }, [product?.id, product?.title, product?.img, product?.brandName, ensureCsrfHeaders, onAddToCart]);

    return (
        <div className="snap-start flex-shrink-0 w-auto max-w-[280px] md:max-w-[300px] lg:max-w-[250px] xl:max-w-[260px] mx-1">
            <Link href={href} className="block group">
                <div className="relative w-full pb-[75%] overflow-hidden  shadow-md">
                    {isPlaying && showVideoButton ? (
                        <video
                            ref={videoRef}
                            src={video.src}
                            poster={image?.src}
                            className="absolute top-0 left-0 h-full w-full object-cover"
                            controls
                            playsInline
                            muted
                            autoPlay
                        />
                    ) : (
                        <img
                            src={image?.src}
                            alt={image?.alt || title}
                            title={image?.title || title}
                            loading="lazy"
                            decoding="async"
                            className="absolute top-0 left-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                    )}

                    {showVideoButton && (
                        <button
                            onClick={handlePlayToggle}
                            className="absolute left-2 bottom-2 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-900 hover:bg-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                {isPlaying ? (
                                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                                ) : (
                                    <path d="M8 5v14l11-7z" />
                                )}
                            </svg>
                            {isPlaying ? 'Pause' : 'Watch video'}
                        </button>
                    )}

                    {/* Add to Cart Button */}
                    <button
                        type="button"
                        aria-label="Add to cart"
                        onClick={handleAddToCartClick}
                        disabled={isLoading}
                        className={`absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20 ${isLoading ? 'cursor-not-allowed' : ''}`}
                    >
                        <span className={`rounded-full p-2 text-white shadow-lg transition-opacity group-hover:opacity-100 ${isAdded
                            ? 'bg-green-600 opacity-100'
                            : isLoading
                                ? 'bg-orange-500 opacity-100'
                                : 'bg-blue-600 opacity-0'
                            }`}>
                            {isLoading ? (
                                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            ) : isAdded ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                    <path fillRule="evenodd" d="M10.5 14.561l6.22-6.22a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l2.47 2.47z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                    <path d="M2.25 3a.75.75 0 000 1.5h1.258c.175 0 .332.114.384.281l.327 1.071 1.51 4.995A2.25 2.25 0 007.89 12h7.757a2.25 2.25 0 002.162-1.653l1.148-4.295A.75.75 0 0018.25 5.5H6.36l-.22-.72A1.875 1.875 0 003.509 3H2.25z" />
                                    <path d="M8.25 20.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                </svg>
                            )}
                        </span>
                    </button>
                </div>
            </Link>

            <div className="mt-3 space-y-1">
                {rating && typeof rating.value === 'number' && (
                    <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 ${i < Math.round(rating.value) ? '' : 'opacity-30'}`}>
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        {rating.count ? (
                            <span className="ml-1 text-xs text-gray-500">({rating.count})</span>
                        ) : null}
                    </div>
                )}

                <Link href={href} className="block text-sm font-semibold leading-snug text-gray-900 line-clamp-2 hover:underline">
                    {title}
                </Link>

                {promo ? <p className="text-xs text-orange-600">{promo}</p> : null}

                <div className="flex items-end gap-2">
                    <div className="text-gray-900">
                        <span className="text-sm align-top">৳</span>
                        <span className="text-2xl font-bold">{formatPrice(price?.current || 0).split('.')[0]}</span>
                        <sup className="text-sm">.{formatPrice(price?.current || 0).split('.')[1]}</sup>
                    </div>
                    {price?.was ? (
                        <div className="text-xs text-gray-500 line-through">৳{formatPrice(price.was)}</div>
                    ) : null}
                </div>

                <div className="flex items-center gap-2">
                    {typeof discountPercent === 'number' ? (
                        <span className="rounded bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">Save {discountPercent}%</span>
                    ) : null}
                    {shipping ? (
                        <span className="text-xs text-blue-600">{shipping}</span>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ThirdCard;
