import React from 'react';
import { Link } from '@inertiajs/react';

function RatingDots({ value = 0, max = 5 }) {
    return (
        <div className="flex items-center gap-1" aria-label={`rated ${value} out of ${max}`}>
            {Array.from({ length: max }).map((_, i) => (
                <span
                    key={i}
                    className={`h-2.5 w-2.5 rounded-full ${i < value ? 'bg-orange-400' : 'bg-gray-200'}`}
                />
            ))}
        </div>
    );
}

export default function SeconderyProductCard({ product }) {
    const productUrl = route('web.slug', product.slug || product.id);

    return (
        <div className="group hover:shadow-none transition-none ">
            <Link href={productUrl} className="block">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-transparent flex items-center justify-center">
                    <img src={product.img} alt={product.title} className="h-full object-contain group-hover:scale-105 transition-transform" />

                    {/* youtube video play button  */}
                    <button className="absolute right-2 bottom-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow border border-gray-200">
                        <span className="sr-only">Play</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="h-4 w-4 text-blue-600">
                            <path d="M6.79 5.093A.5.5 0 0 1 7.5 5.5v5a.5.5 0 0 1-.79.407l-3.5-2.5a.5.5 0 0 1 0-.814l3.5-2.5zM8 4a4 4 0 1 1 0 8A4 4 0 0 1 8 4" />
                        </svg>
                    </button>
                </div>
            </Link>
            <div className="mt-3 px-3 pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <RatingDots value={product.rating || 0} />
                        {product.ratingCount ? (
                            <span className="text-xs text-gray-500">({product.ratingCount})</span>
                        ) : null}
                    </div>
                </div>
                <div className="mt-1 flex items-center gap-2">
                    {product.brandImg ? (
                        <img src={product.brandImg} alt={product.brandName} className="h-4" />
                    ) : null}
                    {product.brandName ? (
                        <span className="text-sm font-semibold uppercase tracking-wide text-sky-600">{product.brandName}</span>
                    ) : null}
                </div>
                <Link href={productUrl} className="mt-1 line-clamp-2 text-sm font-medium text-gray-900 hover:underline">{product.title}</Link>
                <div className="mt-2">
                    <div className="flex items-end gap-1 text-gray-900">
                        <span className="text-base">$</span>
                        <span className="text-2xl font-bold leading-none">{Math.floor(product.price).toString()}</span>
                        <sup className="ml-0.5 -translate-y-1 text-sm">{(product.price % 1).toFixed(2).slice(2)}</sup>
                    </div>
                    {product.was ? (
                        <div className="text-sm line-through text-gray-400">${product.was.toFixed(2)}</div>
                    ) : null}
                    <p className="mt-1 text-xs text-gray-600">More options available</p>
                    <p className="text-xs text-gray-600">{product.tag}</p>
                </div>
                <div className="mt-3">
                    <button className=" rounded bg-orange-400 px-1 py-1  text-black text-[14px] font-semibold hover:bg-orange-600">
                        ADD TO CART
                        <span className="ml-1">›</span>
                    </button>
                    <label className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span>Compare</span>
                    </label>
                </div>
            </div>
        </div>
    );
}


