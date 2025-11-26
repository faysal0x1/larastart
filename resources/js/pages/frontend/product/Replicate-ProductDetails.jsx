import { Head, usePage, Link } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';
import { Check, Bell, Flag, Heart } from "lucide-react"
import ProductTabs from './ProductTabs';
import SimilarProducts from '@/components/frontend/similerProduct/SimilerProducts';
import StickyProductHeader from './StickyProductHeader';
import CompareSectioion from './CompareSectioion';
import AddToCartModal from '@/components/frontend/common/SlideInModal';


const processors = [
    { id: "ryzen-7-9800x3d", name: "Ryzen 7 9800X3D", hasDeal: true },
    { id: "ryzen-9-9950x3d", name: "Ryzen 9 9950X3D", hasDeal: true },
    { id: "ryzen-9-9900x3d", name: "Ryzen 9 9900X3D", hasDeal: true },
    { id: "ryzen-7-7800x3d", name: "Ryzen 7 7800X3D", hasDeal: true },
    { id: "ryzen-9-7950x3d", name: "Ryzen 9 7950X3D", hasDeal: false },
    { id: "ryzen-9-7900x3d", name: "Ryzen 9 7900X3D", hasDeal: false },
]

const customSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    arrows: true,
    prevArrow: <button className="slick-prev">Previous</button>,
    nextArrow: <button className="slick-next">Next</button>,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
                arrows: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                arrows: true
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true
            }
        }
    ]
};

export default function ProductDetails() {
    const { props } = usePage();

    //here product = demo products and Products = original products
    const { product, products } = props;

    // Map backend product (products) into UI-friendly fields, falling back to demo (product)
    const brandName = products?.brand?.name || product?.brand;
    const brandSlugOrName = products?.brand?.slug || brandName || 'brand';
    const title = products?.name || product?.title || 'Product';
    const reviewsCount = (products?.product_reviews?.length ?? product?.reviewsCount ?? 0);

    const unitPrice = products?.unit_price != null ? Number(products.unit_price) : null;
    const finalPrice = products?.final_price != null ? Number(products.final_price) : null;
    const computedPrice = finalPrice ?? unitPrice ?? product?.price ?? 0;
    const computedOldPrice = (unitPrice && finalPrice && unitPrice > finalPrice)
        ? unitPrice
        : (product?.oldPrice ?? null);

    let savingsText = product?.savingsText;
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
        return product?.quickSpecs || null;
    }, [products, product]);

    const [activeTab, setActiveTab] = useState('Overview');
    const [mainIndex, setMainIndex] = useState(0);
    const [isZoom, setIsZoom] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const imgWrapRef = React.useRef(null);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    const images = useMemo(() => {
        // Prefer DB images
        const dbImages = [];
        if (products?.multi_images?.length) {
            products.multi_images.forEach((m) => m?.photo && dbImages.push(m.photo));
        }
        if (products?.image_url) dbImages.unshift(products.image_url);
        if (products?.product_thumbnail) dbImages.unshift(products.product_thumbnail);
        if (products?.media?.length) {
            products.media.forEach((m) => m?.original_url && dbImages.push(m.original_url));
        }
        // Unique and valid urls
        const uniqueDb = Array.from(new Set(dbImages.filter(Boolean)));
        if (uniqueDb.length) return uniqueDb;
        // Fallback to demo images
        return product?.images || [];
    }, [products, product]);

    const writeProductCache = (productId, data) => {
        try {
            const raw = localStorage.getItem('productCache');
            const cache = raw ? JSON.parse(raw) : {};
            cache[productId] = {
                title: data?.title || title,
                img: data?.img || images?.[0] || products?.image_url || products?.product_thumbnail || '',
                seller: data?.seller || (products?.brand?.name || product?.brand || ''),
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
    };

    const handleAddToCart = async (qty = 1) => {
        const pid = products?.id;
        if (!pid) throw new Error('Product not available');
        const headers = await ensureCsrfHeaders();
        const res = await fetch('/api/cart/add', {
            method: 'POST',
            headers,
            credentials: 'include',
            body: JSON.stringify({ product_id: pid, quantity: Math.max(1, Number(qty || 1)) })
        });
        if (!res.ok) {
            throw new Error('Failed to add to cart');
        }
        // cache minimal product data for CartPage rendering
        writeProductCache(pid, {
            title,
            img: images?.[0] || '',
            seller: products?.brand?.name || product?.brand || ''
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
                />

                {/* Breadcrumb */}
                <div className="mx-auto max-w-[1680px] px-4 py-3">
                    <nav className="flex items-center space-x-2 text-sm text-gray-600">
                        <Link href={route('home')} className="transition-colors hover:text-blue-600">
                            Home
                        </Link>
                        <span>›</span>
                        <Link href={route('products.index')} className="transition-colors hover:text-blue-600">
                            Products
                        </Link>
                        <span>›</span>
                        <span className="font-medium text-gray-900">{products?.category?.name || 'Electronics'}</span>
                    </nav>
                </div>

                <div className="mx-auto max-w-[1680px] px-4 pb-8 grid grid-cols-13 gap-3">
                    {/* col 1 and 2 spacer */}
                    <div className='col-span-10'>
                        <div className='grid grid-cols-10 gap-3'>

                            {/* col 1 start  */}
                            <div className='col-span-5'>
                                <div className="space-y-4 md:space-y-6">
                                    <div
                                        ref={imgWrapRef}
                                        className="group relative aspect-[4/3] overflow-hidden  transition-shadow duration-300 hover:shadow-lg md:aspect-[4/3] "
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
                                                alt={product.title}
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
                                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 md:gap-3">
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

                            {/* col 2 Name and Specification */}
                            <div className='col-span-5'>

                                {/* Brand & Category */}
                                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                                    <Link
                                        href={route('web.slug', brandSlugOrName)}
                                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 sm:text-sm"
                                    >
                                        Shop All {brandName} Products
                                    </Link>
                                    {product.isNew && <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">NEW</span>}
                                </div>

                                <div>
                                    <h1 className="mb-2 text-lg leading-tight font-bold text-gray-900 md:mb-3 ">
                                        {title}
                                    </h1>

                                    {/* Promo Banner */}
                                    {product.promo && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-red-700 md:text-sm">{product.promo}</span>
                                        </div>
                                    )}

                                    {/* Rating & Reviews */}
                                    <div className="mb-3 mt-3 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4 md:mb-4">
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
                                <hr className="my-3 border-gray-300 md:my-4" />
                                {/* Product option */}
                                <ProcessorComparison />
                                <hr className="my-3 border-gray-300 md:my-4" />

                                {/* Key Features */}
                                <div className="rounded-lg bg-gray-50 p-4 md:rounded-xl md:p-5">
                                    <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-900 md:mb-3 md:text-base">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                        Key Features
                                    </h3>
                                    <ul className="space-y-2 md:space-y-3">
                                        {product.bullets?.slice(0, showFullDescription ? undefined : 3).map((b, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-gray-700 md:gap-3 md:text-sm">
                                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500 md:h-2 md:w-2"></span>
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {product.bullets?.length > 3 && (
                                        <button
                                            onClick={() => setShowFullDescription(!showFullDescription)}
                                            className="mt-2 text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 md:mt-3 md:text-sm"
                                        >
                                            {showFullDescription ? 'Show Less' : 'Show More Features'}
                                        </button>
                                    )}
                                </div>



                                {/* Quick Specs */}
                                {quickSpecs && (
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
                                        {Object.entries(quickSpecs).map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover: md:rounded-xl md:p-4"
                                            >
                                                <div className="text-xs font-medium tracking-wide text-gray-500 uppercase">{key}</div>
                                                <div className="mt-1 text-xs font-semibold text-gray-900 md:text-sm">{value}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                            {/* cal 2 end */}


                            {/* Col 4 Semiler product  */}

                            <div className="col-span-10 bg-gray-50  py-8 sm:px-6 lg:px-8">
                                <div className="max-w-7xl mx-auto">
                                    {/* Header Section */}
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                                        <h2 className="text-3xl font-bold text-gray-900">Similar Products</h2>
                                        <Link
                                            href={route('products.index')}
                                            className="underline front-md text-[15px] text-gary-500 font-medium hover:font-bold transform hover:scale-105 transition-all duration-200"
                                        >
                                            Shop All Products
                                        </Link>
                                    </div>

                                    <SimilarProducts settings={customSettings} />



                                </div>
                            </div>



                            {/* col 5 overview and spec start */}
                            <div className='col-span-10' id="product-tabs">

                                <ProductTabs activeTab={activeTab} onTabChange={setActiveTab} />

                            </div>

                            <div className='col-span-10' id="compare-section">
                                <CompareSectioion />
                            </div>
                        </div>
                    </div>

                    {/* col 3 start  */}
                    <div className='col-span-3'>

                        <div className="border border-gray-200 pb-4 md:pb-5 p-4">
                            {/* Price Section */}
                            <div >
                                <div className="mb-2 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:gap-3 md:mb-3">
                                    {computedOldPrice && (
                                        <div className="text-base text-gray-500 line-through sm:text-lg">${Number(computedOldPrice).toLocaleString()}</div>
                                    )}
                                    <div className="text-2xl font-medium text-gray-900 sm:text-2xl lg:text-3xl">
                                        <span className="align-baseline">${Math.floor(computedPrice).toLocaleString()}</span>
                                        <sup className="ml-1 align-super text-base text-gray-600 sm:text-lg">
                                            .{(computedPrice % 1).toFixed(2).split('.')[1]}
                                        </sup>
                                    </div>

                                </div>
                                <hr className="my-2 border border-red-500 sm:hidden" />
                                {savingsText && (
                                    <>
                                        <div className="my-2 inline-flex items-center gap-2 bg-gradient-to-r from-red-200 to-red-400 px-3 py-2 text-xs font-bold text-white shadow-md md:px-4 md:text-sm ">
                                            <span>💰</span>
                                            {savingsText}
                                        </div>

                                        <hr className="my-2  border-gray-300" />

                                    </>
                                )}
                            </div>

                            {/* Financing Options */}
                            <div className="space-y-3  bg-gradient-to-br mt-3 md:space-y-4 ">
                                <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 md:text-base">
                                    <span className="text-blue-600">💳</span>
                                    Financing Options
                                </h4>
                                <div className="space-y-2 text-xs bg-gray-200 text-gray-800  md:text-sm">
                                    <div className="flex items-start  md:gap-3 md:p-3">
                                        <img
                                            src="https://pdpone.syfpos.com/cs/groups/public/documents/et_imagetype/etimg062497.png"
                                            alt="Store Credit Card"
                                            className="mt-1 h-4 w-6 object-contain md:h-6 md:w-8"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <div className="font-medium">$84/mo for 12 months</div>
                                            <div className="text-xs text-gray-600">Special financing available</div>
                                            <button className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700">
                                                Learn how
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2 p-2  md:gap-3 md:p-3">
                                        <span className="mt-1 text-xs font-bold text-purple-600">affirm</span>
                                        <div className="min-w-0 flex-1">
                                            <div className="font-medium">As low as $91/month</div>
                                            <div className="text-xs text-gray-600">15% APR available</div>
                                            <button className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700">
                                                Prequalify Now
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2  p-2  md:gap-3 md:p-3">
                                        <img
                                            src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                                            alt="PayPal"
                                            className="mt-1 h-3 w-3 md:h-4 md:w-4"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <div className="font-medium">4 payments of $250.00</div>
                                            <div className="text-xs text-gray-600">Interest-free with PayPal</div>
                                            <button className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700">
                                                Learn more
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-3 border-gray-300 md:my-4" />

                            {/* Qty & Add to cart */}
                            <QtyAndAddToCart onAdd={handleAddToCart} />

                            {/* Shipping */}
                            <div className="mt-2">
                                <p className='text-sm '>
                                    <span className="font-bold text-green-600">Free Shipping</span> to <Link className='underline' href={route('user.addresses.index')}>Select delivery location</Link> <br /> <span className='text-green-600'>Fastest delivery in </span> <span className='text-green-600 font-bold'>3 days</span>
                                </p>
                            </div>


                            <div className="mt-2 space-y-3">
                                {/* Top row with three actions */}
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Check className="w-4 h-4" />
                                        <span>Compare</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Bell className="w-4 h-4" />
                                        <span>Price alert</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Flag className="w-4 h-4" />
                                        <span>Report a listing</span>
                                    </div>
                                </div>

                                {/* Bottom row with wishlist */}
                                <div className="flex items-center gap-2 text-sm text-gray-700 pt-1">
                                    <Heart className="w-4 h-4" />
                                    <span>Add to wish list</span>
                                </div>
                            </div>
                            <hr className="my-3 border-gray-300 " />

                            {/* Seller Information */}
                            <div className="space-y-2  pt-3 md:pt-4">

                                <div className="flex items-center justify-between text-xs md:text-sm">
                                    <span className="text-gray-600">Shipped by</span>
                                    <Link href={route('home')} className="font-medium text-blue-600 transition-colors hover:text-blue-700">
                                        TBz
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between text-xs md:text-sm">
                                    <span className="text-gray-600">Estimated delivery</span>
                                    <span className="font-medium text-green-600">2-3 business days</span>
                                </div>
                            </div>
                        </div>

                        {/* small promotional banner image  with small height width*/}
                        <div className="mt-4">
                            <img
                                src="https://c1.neweggimages.com/webresource/themes/Nest/DotComProductPageBanner.png"
                                alt="Promo Banner"
                                className="h-20 w-full object-fit shadow-md md:h-24"
                            />
                        </div>
                    </div>
                    {/* col 3 end  */}


                </div>
            </div>
            <AddToCartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} />
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
                        className="group max-w-[220px] min-w-[220px] snap-start rounded-xl border border-gray-200 bg-white p-3  transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl sm:max-w-[240px] sm:min-w-[240px] md:max-w-[260px] md:min-w-[260px] md:rounded-2xl md:p-5"
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
        <div className="space-y-3 md:space-y-4">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <div className="inline-flex items-center rounded-lg border-2 border-gray-300 bg-white transition-colors duration-200 hover:border-blue-300 md:rounded-full">
                    <button
                        onClick={dec}
                        className="rounded-l-lg px-3 py-2 text-sm font-extrabold text-gray-800  hover:text-blue-600 md:rounded-l-xl md:px-4 md:py-3 md:text-base"
                        disabled={qty <= 1}
                    >
                        −
                    </button>
                    <input
                        aria-label="Qty"
                        className="w-12 bg-transparent text-center text-sm font-bold text-gray-900 outline-none md:w-16 md:text-base"
                        value={qty}
                        onChange={(e) => {
                            const v = Number(e.target.value.replace(/\D/g, ''));
                            setQty(Number.isFinite(v) ? Math.max(1, Math.min(99, v)) : 1);
                        }}
                    />
                    <button
                        onClick={inc}
                        className="rounded-r-lg px-3 py-2 text-sm font-extrabold text-gray-800  hover:text-blue-600 md:rounded-r-xl md:px-4 md:py-3 md:text-base"
                        disabled={qty >= 99}
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    className={`flex-1  rounded-full px-4 py-2.5 text-xs font-bold shadow-lg hover:bg-[#fd7c04] hover:shadow-xl  md:px-6 md:py-3 md:text-sm ${isAdded
                        ? 'bg-green-600 text-white'
                        : isLoading
                            ? 'cursor-not-allowed bg-[#FF8500] text-black'
                            : 'bg-[#FF8500] text-black hover:bg-[#FF8510]'
                        }`}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent md:h-4 md:w-4"></div>
                            Adding...
                        </div>
                    ) : isAdded ? (
                        <div className="flex items-center justify-center gap-2">
                            <span>✓</span>
                            Added to Cart
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">

                            Add to Cart
                        </div>
                    )}
                </button>
            </div>


            <div className="flex flex-wrap items-center gap-2 text-xs">

                <span className="font-bold text-green-600">✓ In stock</span>
            </div>


        </div>
    );
}


function ProcessorComparison() {


    const [selectedProcessor, setSelectedProcessor] = useState("ryzen-9-9950x3d")

    const selectedProcessorName = processors.find((p) => p.id === selectedProcessor)?.name || "Ryzen 9 9950X3D"

    return (
        <div className="space-y-4">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-foreground font-medium">Option:</span>
                    <span className="text-foreground font-semibold">{selectedProcessorName}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            {/* Processor Options */}
            <div className="flex flex-wrap gap-3">


                {processors.map((processor) => (
                    <button
                        key={processor.id}
                        onClick={() => setSelectedProcessor(processor.id)}
                        className={`relative px-4 py-2 text-sm font-medium transition-colors -skew-x-12 my-2 ${selectedProcessor === processor.id
                            ? "bg-gray-800 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {processor.hasDeal && (
                            <span className="absolute -top-4 right- bg-orange-500 text-white text-xs px-1.5 py-0.5 font-bold -skew-x-12">
                                DEAL
                            </span>
                        )}
                        {processor.name}
                    </button>
                ))}

            </div>
        </div>
    )
}

