import React from 'react';

export default function SingleDealPanel({
    brand = 'Shell Shocker',
    moreLabel = 'See all',
    title = '',
    price = '0.00',
    original = null,
    image = '/placeholder.svg',
    meta = '',
    logoSrc,
    onLeft,
    onRight,
}) {
    const percentOff = (() => {
        const originalNum = Number(original);
        const priceNum = Number(price);
        if (!originalNum || originalNum <= priceNum) return null;
        return Math.round(((originalNum - priceNum) / originalNum) * 100);
    })();

    return (
        <div className="rounded-t-xl  bg-gradient-to-b from-[#0a5abb] to-white p-4 pb-3">
            <div className="relative overflow-hidden rounded-xl text-white flex flex-col justify-center gap-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-extrabold">
                        {logoSrc ? (
                            <img src={logoSrc} alt="logo" className="h-6 w-auto object-contain" />
                        ) : (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
                                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M12 2c1.2 2.1 2 3.5 2 5.1 0 1.4-1 2.7-2 3.7-1-1-2-2.3-2-3.7 0-1.6.8-3 2-5.1zM6 15c0-3.3 3.1-5 6-5s6 1.7 6 5-3 5-6 5-6-1.7-6-5z" /></svg>
                            </span>
                        )}
                        <span className="uppercase tracking-wider">{brand}</span>
                    </div>
                    <button className="text-xs font-semibold text-white/90 hover:text-white transition-colors">
                        {moreLabel}
                        <span className="ml-1">›</span>
                    </button>
                </div>

                {/* Title and Body  */}
                <div>


                    <div className="mt-2 line-clamp-2 text-sm font-semibold text-white/95">
                        {title}
                    </div>


                    {/* Price and Meta */}
                    <div className="relative mt-10 grid grid-cols-2 gap-3 p-4 pt-3 bg-transparent">
                        <div>
                            <div className="flex items-start gap-2 text-slate-900">

                                <div className="flex items-baseline leading-none">
                                    <span className="text-4xl font-extrabold">৳{Number(price).toFixed(2).split('.')[0]}</span>
                                    <span className="ml-0.5 text-sm font-bold align-top">.{Number(price).toFixed(2).split('.')[1]}</span>
                                </div>
                            </div>
                            {original && (
                                <div className="ml-8 mt-1 text-xs text-slate-600 line-through">৳{original}</div>
                            )}
                            {meta && (
                                <div className="ml-8 mt-2 flex items-center gap-2 text-xs text-red-600">
                                    <span className="h-2 w-2 rounded-full bg-red-500" />
                                    <span>{meta}</span>
                                </div>
                            )}
                        </div>

                        <div className="relative flex items-center justify-end">
                            <img src={image} alt="deal" className="h-28 w-28 object-contain" />
                            {percentOff !== null && (
                                <div className="absolute -bottom-2 -right-2 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white text-xs font-extrabold shadow">
                                    <div className="text-center leading-tight">
                                        <div className="text-base">{percentOff}%</div>
                                        <div className="text-[10px]">off</div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* Slider controls: outside Price/Meta grid but inside panel */}
                {onLeft && (
                    <button aria-label="prev" onClick={onLeft} className="absolute left-1 top-1/2 -translate-y-1/2 p-2 text-blue-800">
                        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 6l-6 6 6 6" />
                        </svg>
                    </button>
                )}
                {onRight && (
                    <button aria-label="next" onClick={onRight} className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-blue-800">
                        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 6l6 6-6 6" />
                        </svg>
                    </button>
                )}

            </div >
        </div>
    );
}


