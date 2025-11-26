import React from 'react';

export default function DealCard({ title, price, original, cta = 'Add to cart', image, meta }) {
    return (
        <div className="flex h-full flex-col justify-between rounded-md border border-slate-200/60 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
                {image ? (
                    <img src={image} alt="deal" className="h-16 w-16 rounded object-contain" />
                ) : (
                    <div className="h-16 w-16 rounded bg-slate-100" />
                )}
                <div className="min-w-0">
                    <h4 className="line-clamp-2 text-sm font-semibold text-slate-800">{title}</h4>
                    {meta && <p className="mt-1 text-xs text-slate-500">{meta}</p>}
                </div>
            </div>
            <div className="mt-3 flex items-end justify-between">
                <div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-slate-900">৳{price}</span>
                        {original && <span className="text-xs text-slate-400 line-through">৳{original}</span>}
                    </div>
                </div>
                <button className="rounded bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600">{cta}</button>
            </div>
        </div>
    );
}


