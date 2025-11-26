import Breadcrumb from '@/components/frontend/Breadcrumb';
import AddToCartModal from '@/components/frontend/common/SlideInModal';
import SimilarProducts from '@/components/frontend/similerProduct/SimilerProducts';
import RecommendedProducts from '@/components/frontend/RecommendedProducts/RecommendedProducts';
import RenderedContent from '@/components/RenderedContent';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';
import ProductTabs from './ProductTabs';
import StickyProductHeader from './StickyProductHeader';
export default function ProductDetails() {
    const { props } = usePage();

    const { products, randomProducts } = props;

    // Map backend product into UI-friendly fields
    const brandName = products?.brand?.name || products?.brand_name || 'Brand';
    const brandSlugOrName = products?.brand?.slug || products?.brand?.name || 'brand';
    const title = products?.name || products?.title || 'Product';
    const reviewsCount = products?.product_reviews?.length ?? 0;
    const callForPrice = Boolean(products?.call_for_price);
    const callForPriceNumber = products?.call_for_price_number || '8801713991638';

    const unitPrice = products?.unit_price != null ? Number(products.unit_price) : null;
    const finalPrice = products?.final_price != null ? Number(products.final_price) : null;
    const computedPrice = finalPrice ?? unitPrice ?? Number(products?.price ?? 0);
    const computedOldPrice =
        unitPrice && finalPrice && unitPrice > finalPrice
            ? unitPrice
            : (products?.old_price != null ? Number(products.old_price) : null);

    let savingsText = products?.savings_text || products?.savingsText || null;
    if (unitPrice && finalPrice && unitPrice > finalPrice) {
        const diff = unitPrice - finalPrice;
        const percent = Math.round((diff / unitPrice) * 100);
        savingsText = `Save: $${diff.toFixed(2)} (${percent}%)`;
    }

    const quickSpecs = React.useMemo(() => {
        if (products?.spec_values?.length) {
            const obj = {};
            products.spec_values.slice(0, 8).forEach((sv) => {
                const label = sv?.attribute?.name ?? 'Spec';
                if (label && !(label in obj)) obj[label] = sv?.value ?? '';
            });
            return obj;
        }
        return null;
    }, [products]);

    const [activeTab, setActiveTab] = useState('Overview');
    const [mainIndex, setMainIndex] = useState(0);
    const [isZoom, setIsZoom] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const imgWrapRef = React.useRef(null);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [cartData, setCartData] = useState({ subtotal: 0, itemCount: 0 });

    const images = useMemo(() => {
        // Prefer product_thumbnail, then fall back to image_url
        const dbImages = [];

        const primaryImage = products?.image_url;
        if (primaryImage) dbImages.push(primaryImage);

        // Then the rest of the images from Spatie Media Library
        if (products?.multi_images?.length) {
            products.multi_images.forEach((m) => {
                // Handle both 'photo' and 'url' properties from media collection
                const imageUrl = m?.url || m?.photo;
                if (imageUrl) dbImages.push(imageUrl);
            });
        }

        // Unique and valid urls
        const uniqueDb = Array.from(new Set(dbImages.filter(Boolean)));
        if (uniqueDb.length) return uniqueDb;
        // Fallback to product thumbnail if available
        return products?.product_thumbnail ? [products.product_thumbnail] : [];
    }, [products]);

    const writeProductCache = (productId, data) => {
        try {
            const raw = localStorage.getItem('productCache');
            const cache = raw ? JSON.parse(raw) : {};
            cache[productId] = {
                title: data?.title || title,
                img: data?.img || images?.[0] || products?.image_url || '',
                seller: data?.seller || products?.brand?.name || brandName || '',
            };
            localStorage.setItem('productCache', JSON.stringify(cache));
        } catch (_) {
            // ignore cache errors
        }
    };

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

    const ensureCsrfHeaders = async () => {
        const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };
        const metaToken = typeof document !== 'undefined' ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') : null;
        if (metaToken) {
            headers['X-CSRF-TOKEN'] = metaToken;
            return headers;
        }
        try {
            await fetch('/sanctum/csrf-cookie', { credentials: 'include' });
            const xsrf = readCookie('XSRF-TOKEN');
            if (xsrf) headers['X-XSRF-TOKEN'] = xsrf;
        } catch (_) {
            /* ignore */
        }
        return headers;
    };

    const handleAddToCart = async (qty = 1) => {
        const pid = products?.id;
        if (!pid) throw new Error('Product not available');
        const headers = await ensureCsrfHeaders();
        const res = await fetch('/api/cart/add', {
            method: 'POST',
            headers,
            credentials: 'include',
            body: JSON.stringify({ product_id: pid, quantity: Math.max(1, Number(qty || 1)) }),
        });
        if (!res.ok) {
            throw new Error('Failed to add to cart');
        }

        // Fetch updated cart data
        try {
            const cartRes = await fetch('/api/cart', {
                method: 'GET',
                headers,
                credentials: 'include',
            });
            if (cartRes.ok) {
                const cartData = await cartRes.json();
                setCartData({
                    subtotal: cartData.total || 0,
                    itemCount: cartData.items?.length || 0,
                });
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }

        // cache minimal product data for CartPage rendering
        writeProductCache(pid, {
            title,
            img: images?.[0] || '',
            seller: products?.brand?.name || brandName || '',
        });
        setIsCartModalOpen(true);
        return res.json();
    };

    return (
        <>
            {/* // sticky header */}
            <Head title={title || 'Product'} />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
                <StickyProductHeader
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    product={products}
                    title={title}
                    computedPrice={computedPrice}
                    computedOldPrice={computedOldPrice}
                    images={images}
                    onAddToCart={handleAddToCart}
                />

                <Breadcrumb product={products} />

                <div className="mx-auto grid max-w-[1680px] grid-cols-1 gap-3 px-4 pb-8 lg:grid-cols-12">
                    {/* Main content area */}
                    <div className="lg:col-span-9">
                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-10">
                            {/* Image gallery section */}
                            <div className="lg:col-span-5">
                                <div className="space-y-4 md:space-y-6">
                                    <div
                                        ref={imgWrapRef}
                                        className="group relative aspect-[4/3] overflow-hidden transition-shadow duration-300 hover:shadow-lg md:aspect-[4/3]"
                                        onMouseEnter={() => setIsZoom(true)}
                                        onMouseLeave={() => setIsZoom(false)}
                                        onMouseMove={(e) => {
                                            const rect = imgWrapRef.current?.getBoundingClientRect();
                                            if (!rect) return;
                                            const x = ((e.clientX - rect.left) / rect.width) * 100;
                                            const y = ((e.clientY - rect.top) / rect.height) * 100;
                                            setZoomPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
                                        }}
                                    >
                                        {images[mainIndex] && (
                                            <img
                                                src={images[mainIndex]}
                                                alt={title}
                                                className="pointer-events-none h-full w-full object-contain transition-transform duration-300 select-none group-hover:scale-105"
                                            />
                                        )}

                                        {/* Zoom panel - shows on hover at the left side on large screens */}
                                        {isZoom && images[mainIndex] && (
                                            <div
                                                className="absolute top-1/2 -left-[380px] z-10 hidden h-[350px] w-[350px] -translate-y-1/2 rounded-2xl border-2 border-blue-200 bg-white shadow-2xl xl:block"
                                                style={{
                                                    backgroundImage: `url(${images[mainIndex]})`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: '200% 200%',
                                                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                                                }}
                                            />
                                        )}
                                    </div>
                                    {images.length > 0 && (
                                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 md:gap-3 lg:grid-cols-6">
                                            {images.map((src, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setMainIndex(idx)}
                                                    onMouseEnter={() => setMainIndex(idx)}
                                                    aria-label={`thumbnail-${idx}`}
                                                    className={`group aspect-square overflow-hidden rounded-lg border-2 bg-white transition-all duration-200 hover:scale-105 md:rounded-xl ${idx === mainIndex
                                                        ? 'border-blue-500 shadow-md ring-1 ring-blue-200 md:ring-2'
                                                        : 'border-gray-200 hover:border-blue-300'
                                                        }`}
                                                >
                                                    <img
                                                        src={src}
                                                        alt={`thumb-${idx}`}
                                                        className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-110"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Product information section */}
                            <div className="lg:col-span-5">
                                {/* Brand & Category */}
                                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                                    <Link
                                        href={route('web.slug', brandSlugOrName)}
                                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 sm:text-sm"
                                    >
                                        Shop All {brandName} Products
                                    </Link>
                                    {(products?.is_new || products?.isNew) && (
                                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">NEW</span>
                                    )}
                                </div>

                                <div>
                                    <h1 className="mb-2 text-lg leading-tight font-bold text-gray-900 sm:text-xl md:mb-3 md:text-2xl">{title}</h1>

                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="text-xs font-bold text-red-700 md:text-sm">Currently there is no gift available</span>
                                    </div>

                                    {/* Rating & Reviews */}
                                    <div className="mt-3 mb-3 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4 md:mb-4">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`h-4 w-4 sm:h-5 sm:w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                            <span className="ml-2 text-xs text-gray-600 sm:text-sm">4.2 ({reviewsCount || 0} reviews)</span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                                            <span className="hidden text-gray-400 sm:inline">|</span>
                                            <a href="#reviews" className="text-blue-600 transition-colors hover:text-blue-700">
                                                Write a Review
                                            </a>
                                            <span className="text-gray-400">|</span>
                                            <a href="#qa" className="text-blue-600 transition-colors hover:text-blue-700">
                                                6 Q&A
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {products?.variations?.length ? (
                                    <>
                                        <hr className="my-3 border-gray-300 md:my-4" />
                                        <VariationsComparison variations={products?.variations || []} />
                                    </>
                                ) : null}
                                <hr className="my-3 border-gray-300 md:my-4" />

                                {/* key fetature */}

                                {products?.key_features && (
                                    <div className="rounded-lg bg-gray-50 p-4 md:rounded-xl md:p-5">
                                        <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-900 md:mb-3 md:text-base">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                            Key Features
                                        </h3>
                                        <div>
                                            <RenderedContent
                                                html={products.key_features}
                                                className="prose-sm md:prose-base prose-headings:text-gray-900 prose-a:text-blue-600 prose-strong:text-gray-900 prose-p:text-gray-700"
                                            />

                                        </div>
                                    </div>
                                )}

                                {/* Quick Specs */}
                                {quickSpecs && (
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
                                        {Object.entries(quickSpecs).map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="hover: rounded-lg border border-gray-200 bg-white p-3 transition-shadow md:rounded-xl md:p-4"
                                            >
                                                <div className="text-xs font-medium tracking-wide text-gray-500 uppercase">{key}</div>
                                                <div className="mt-1 text-xs font-semibold text-gray-900 md:text-sm">{value}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Price and purchase options */}
                    <div className="lg:order-last lg:col-span-3">
                        <div className="lg:sticky lg:top-4">
                            {/* Main content box */}
                            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                                {callForPrice ? (
                                    // Call for Price Section
                                    <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 md:p-5">
                                        <div className="mb-4 text-center">
                                            <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">Call for Price</h3>
                                            <p className="text-sm text-gray-600">Contact us to get the best price for this product</p>
                                        </div>

                                        <div className="space-y-3">
                                            {/* WhatsApp Button */}
                                            <a
                                                href={`https://wa.me/${callForPriceNumber}?text=Hi, I'm interested in ${encodeURIComponent(title)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#25D366] px-4 py-3 font-bold text-white shadow-md transition-all duration-200 hover:bg-[#20BA5A] hover:shadow-lg"
                                            >
                                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                </svg>
                                                <span>Chat on WhatsApp</span>
                                            </a>

                                            {/* Call Button */}
                                            <a
                                                href={`tel:${callForPriceNumber}`}
                                                className="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-4 py-3 font-bold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
                                            >
                                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    />
                                                </svg>
                                                <span>Call Now</span>
                                            </a>
                                        </div>

                                        <div className="mt-4 border-t border-gray-200 pt-4 text-center">
                                            <p className="text-sm text-gray-600">📞 {callForPriceNumber}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Price Section */}
                                        <div className="bg-gradient-to-br from-gray-50 to-white p-3 sm:p-4 md:p-5">
                                            <div className="mb-3 flex flex-wrap items-end gap-2">
                                                {/* Old Price (Strikethrough) */}
                                                {computedOldPrice && (
                                                    <div className="text-sm text-gray-400 line-through sm:text-base md:text-lg">
                                                        ৳{Number(computedOldPrice).toLocaleString()}
                                                    </div>
                                                )}

                                                {/* Current Price */}
                                                <div className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-2xl lg:text-3xl">
                                                    <span className="align-baseline">৳{Math.floor(computedPrice).toLocaleString()}</span>
                                                    {/* Decimal part as superscript */}
                                                    <sup className="ml-1 align-super text-base text-gray-600 sm:text-lg md:text-base">
                                                        .{(computedPrice % 1).toFixed(2).split('.')[1]}
                                                    </sup>
                                                </div>
                                            </div>

                                            {/* Savings Text/Badge */}
                                            {savingsText && (
                                                <div className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-red-500 to-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-md sm:px-4 sm:py-2 sm:text-sm">
                                                    <span className="text-base sm:text-lg">💰</span>
                                                    {savingsText}
                                                </div>
                                            )}
                                        </div>

                                        <div className="border-t border-gray-200"></div>

                                        {/* Qty & Add to cart */}
                                        <div className="p-3 sm:p-4 md:p-5">
                                            <QtyAndAddToCart onAdd={handleAddToCart} />
                                        </div>
                                    </>
                                )}

                                <div className="border-t border-gray-200"></div>

                                {/* Shipping Information */}
                                {/* <div className="p-3 sm:p-4 md:p-5 bg-green-50">
                                    <p className='text-xs sm:text-sm leading-relaxed'>
                                        <span className="font-bold text-green-700">🚚 Shipping</span>
                                        <br className="my-1" />
                                        <span className='text-green-700'>Fastest delivery in </span>
                                        <span className='text-green-700 font-bold'>3 days</span>
                                    </p>
                                </div> */}

                                <div className="border-t border-gray-200"></div>

                                {/* Seller Information */}
                                <div className="space-y-2.5 p-3 sm:p-4 md:p-5">
                                    <div className="flex items-center justify-between text-xs sm:text-sm">
                                        <span className="text-gray-600">Shipped by</span>
                                        <Link href={route('home')} className="font-medium text-blue-600 transition-colors hover:text-blue-700">
                                            TBz
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-between text-xs sm:text-sm">
                                        <span className="text-gray-600">Estimated delivery</span>
                                        <span className="font-medium text-green-600">2-3 business days</span>
                                    </div>
                                </div>
                            </div>

                            {/* Promotional banner - Hidden on mobile, visible on large screens */}
                            <div className="mt-4 hidden lg:block">
                                <img
                                    src="https://tbz.com.bd/images/slider/1745217247.jpg"
                                    alt="Promo Banner"
                                    className="h-24 w-full rounded-lg object-cover shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                    {/* col 3 end */}
                </div>

                {/* Similar Product and Spec section  */}

                <div className="mx-auto grid max-w-[1680px] grid-cols-1 gap-3 px-4 pb-8 lg:grid-cols-12">
                    {/* Main content area */}
                    <div className="lg:col-span-9">
                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-10">
                            {/* Similar products section */}
                            <div className="bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:col-span-10 lg:px-8">
                                <div className="mx-auto max-w-7xl">
                                    {/* Header Section */}
                                    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
                                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Similar Products</h2>
                                        <Link
                                            href={route('products.index')}
                                            className="front-md text-gary-500 transform text-[15px] font-medium underline transition-all duration-200 hover:scale-105 hover:font-bold"
                                        >
                                            Shop All Products
                                        </Link>
                                    </div>

                                    <SimilarProducts products={randomProducts} productId={products?.id} />
                                </div>
                            </div>

                            {/* Recommended Products section - User tailored */}
                            <div className="bg-white px-4 py-6 sm:px-6 sm:py-8 lg:col-span-10 lg:px-8">
                                <div className="mx-auto max-w-7xl">
                                    {/* Header Section */}
                                    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
                                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                            {props?.user ? 'Recommended For You' : 'Popular Products'}
                                        </h2>
                                        <Link
                                            href={route('products.index')}
                                            className="front-md text-gary-500 transform text-[15px] font-medium underline transition-all duration-200 hover:scale-105 hover:font-bold"
                                        >
                                            View All
                                        </Link>
                                    </div>

                                    <RecommendedProducts productId={products?.id} />
                                </div>
                            </div>

                            {/* Product tabs section */}
                            <div className="lg:col-span-10" id="product-tabs">
                                <ProductTabs activeTab={activeTab} onTabChange={setActiveTab} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AddToCartModal
                isOpen={isCartModalOpen}
                onClose={() => setIsCartModalOpen(false)}
                product={{
                    name: title,
                    image: images?.[0] || products?.image_url || products?.product_thumbnail || '',
                    price: computedPrice,
                    originalPrice: computedOldPrice,
                }}
                cartSubtotal={cartData.subtotal}
                cartItemCount={cartData.itemCount}
            />
        </>
    );
}

function SimilarProductsSlider({ items }) {
    const listRef = React.useRef(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);

    const checkScrollButtons = () => {
        const el = listRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    };

    React.useEffect(() => {
        checkScrollButtons();
    }, [items]);

    const scrollByCards = (direction) => {
        const el = listRef.current;
        if (!el) return;
        const card = el.querySelector('[data-card]');
        const cardWidth = card ? card.getBoundingClientRect().width : 280;
        const gap = 20;
        const delta = (cardWidth + gap) * 3 * (direction === 'next' ? 1 : -1);
        el.scrollBy({ left: delta, behavior: 'smooth' });
        setTimeout(checkScrollButtons, 300);
    };

    return (
        <div className="relative">
            <button
                onClick={() => scrollByCards('prev')}
                disabled={!canScrollLeft}
                aria-label="Previous"
                className={`absolute top-1/2 -left-4 z-10 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-200 ${canScrollLeft
                    ? 'border-blue-200 bg-white text-blue-600 hover:scale-110 hover:border-blue-300 hover:bg-blue-50'
                    : 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                    } hidden md:inline-flex`}
            >
                <span className="text-xl">←</span>
            </button>
            <div
                ref={listRef}
                onScroll={checkScrollButtons}
                className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none]"
                style={{ scrollbarWidth: 'none' }}
            >
                {items.map((sp, idx) => (
                    <div
                        key={idx}
                        data-card
                        className="group max-w-[220px] min-w-[220px] snap-start rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl sm:max-w-[240px] sm:min-w-[240px] md:max-w-[260px] md:min-w-[260px] md:rounded-2xl md:p-5"
                    >
                        <div className="mb-3 aspect-square overflow-hidden rounded-lg border border-gray-100 bg-gray-50 md:mb-4 md:rounded-xl">
                            <img
                                src={sp.image}
                                alt={sp.title}
                                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <div className="mb-2 inline-block rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">{sp.brand}</div>
                        <div className="mb-2 line-clamp-2 min-h-[2rem] text-xs font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600 md:mb-3 md:min-h-[2.5rem] md:text-sm">
                            {sp.title}
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-red-600 md:text-xl">${sp.price}</span>
                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-gray-500">{sp.ship}</span>
                        </div>
                        <button className="mt-3 w-full rounded-lg bg-blue-600 py-1.5 text-xs font-medium text-white opacity-0 transition-colors duration-200 group-hover:opacity-100 hover:bg-blue-700 md:mt-4 md:rounded-xl md:py-2 md:text-sm">
                            View Product
                        </button>
                    </div>
                ))}
            </div>
            <button
                onClick={() => scrollByCards('next')}
                disabled={!canScrollRight}
                aria-label="Next"
                className={`absolute top-1/2 -right-4 z-10 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-200 ${canScrollRight
                    ? 'border-blue-200 bg-white text-blue-600 hover:scale-110 hover:border-blue-300 hover:bg-blue-50'
                    : 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                    } hidden md:inline-flex`}
            >
                <span className="text-xl">→</span>
            </button>
        </div>
    );
}

function QtyAndAddToCart({ onAdd }) {
    const [qty, setQty] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isAdded, setIsAdded] = React.useState(false);

    const dec = () => setQty((q) => Math.max(1, q - 1));
    const inc = () => setQty((q) => Math.min(99, q + 1));

    const handleAddToCart = async () => {
        try {
            setIsLoading(true);
            await onAdd?.(qty);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        } catch (_) {
            // optional: surface error UI
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-3">
            {/* Quantity Label - Mobile friendly */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 sm:text-base">Quantity:</span>
                <span className="text-xs font-medium text-green-600 sm:text-sm">✓ In stock</span>
            </div>

            {/* Quantity Selector - Redesigned for mobile */}
            <div className="flex items-stretch gap-2 sm:gap-3">
                {/* Quantity Counter */}
                <div className="flex items-center rounded-lg border-2 border-gray-300 bg-white shadow-sm transition-all hover:border-blue-400 hover:shadow-md">
                    <button
                        onClick={dec}
                        disabled={qty <= 1}
                        className="flex h-full items-center justify-center px-3 py-2.5 text-lg font-bold text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:text-gray-300 sm:px-4 sm:py-3 sm:text-xl"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>
                    <input
                        aria-label="Quantity"
                        className="w-10 bg-transparent text-center text-base font-bold text-gray-900 outline-none sm:w-14 sm:text-lg"
                        value={qty}
                        onChange={(e) => {
                            const v = Number(e.target.value.replace(/\D/g, ''));
                            setQty(Number.isFinite(v) ? Math.max(1, Math.min(99, v)) : 1);
                        }}
                    />
                    <button
                        onClick={inc}
                        disabled={qty >= 99}
                        className="flex h-full items-center justify-center px-3 py-2.5 text-lg font-bold text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:text-gray-300 sm:px-4 sm:py-3 sm:text-xl"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>

                {/* Add to Cart Button - Mobile optimized */}
                <button
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-bold shadow-md transition-all duration-200 hover:shadow-lg active:scale-98 sm:px-6 sm:py-3 sm:text-base ${isAdded
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : isLoading
                            ? 'cursor-not-allowed bg-orange-400 text-white opacity-80'
                            : 'bg-[#FF8500] text-white hover:bg-[#fd7c04] hover:shadow-xl'
                        }`}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            <span className="hidden sm:inline">Adding...</span>
                        </div>
                    ) : isAdded ? (
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-lg">✓</span>
                            <span>Added</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span>Add to Cart</span>
                        </div>
                    )}
                </button>
            </div>

            {/* Additional Info - Mobile friendly */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 sm:text-sm">
                <span className="flex items-center gap-1">
                    <span className="text-blue-600">🚚</span>
                    Free shipping
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1">
                    <span className="text-green-600">↩️</span>
                    Easy returns
                </span>
            </div>
        </div>
    );
}

function VariationsComparison({ variations = [] }) {
    // Generate processors from backend variations data
    const processors = variations.map((variation, index) => ({
        id: `variation-${variation.id}`,
        name: variation.name,
        hasDeal: parseFloat(variation.price) < 150, // Consider it a deal if price is less than 150
        price: parseFloat(variation.price),
        stock: variation.stock,
        attributes: variation.attributes,
    }));

    const [selectedProcessor, setSelectedProcessor] = useState(processors[0]?.id || '');

    const selectVariationsName = processors.find((p) => p.id === selectedProcessor)?.name || processors[0]?.name || 'No variations available';

    // Don't render if no variations
    if (!variations || variations.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-foreground font-medium">Option:</span>
                    <span className="text-foreground font-semibold">{selectVariationsName}</span>
                </div>
                <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                    </svg>
                    Compare Options
                </button>
            </div>

            {/* Variation Options */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
                {processors.map((processor) => (
                    <button
                        key={processor.id}
                        onClick={() => setSelectedProcessor(processor.id)}
                        className={`relative my-1 -skew-x-12 px-3 py-2 text-xs font-medium transition-colors sm:my-2 sm:text-sm ${selectedProcessor === processor.id ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {processor.hasDeal && (
                            <span className="right- absolute -top-4 -skew-x-12 bg-orange-500 px-1.5 py-0.5 text-xs font-bold text-white">DEAL</span>
                        )}
                        {processor.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
