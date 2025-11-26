import React from 'react';

export default function ComboPanel({
    brand = 'AMD',
    moreLabel = 'More options',
    savingsLabel = 'Combo up savings ৳0.00',
    items = [],
    price = '',
    original = '',
    leftControl,
    rightControl,
    onLeft,
    onRight,
    ctaLeft = 'Build with it',
    ctaRight = 'Add to cart'
}) {
    // Different background colors based on brand
    const getBackgroundClass = () => {
        switch (brand.toLowerCase()) {
            case 'intel.':
                // return 'bg-gradient-to-b from-[#0b63ce] to-[#0a5abb]';
                return 'bg-gradient-to-b from-[#0a5abb] to-white';

            case 'nas':
                return 'bg-gradient-to-b from-blue-900 to-white';
            case 'shell shocker':
                // return 'bg-gradient-to-b from-blue-800 to-blue-900';
                return 'bg-gradient-to-b from-[#0a5abb] to-white';

            default:
                return 'bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF]';
        }
    };

    return (
        <div className={`relative overflow-hidden rounded-xl ${getBackgroundClass()} p-4 text-white shadow-lg`}>
            <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 20% -20%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)' }} />
            <div className="relative">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-extrabold">
                        <span className="uppercase tracking-wider">{brand}</span>
                    </div>
                    <button className="text-xs font-semibold text-white/90 hover:text-white transition-colors">{moreLabel}
                        <span className="ml-1">›</span>
                    </button>
                </div>
                <div className="mt-1 text-sm font-semibold text-white/90">{savingsLabel}</div>

                {/* =============Items Section ============= */}

                <div className="mt-4 rounded-xl  p-3 text-slate-800 ">
                    <div className="flex items-center justify-between">
                        {/* {onLeft && (
                            <button aria-label="prev" onClick={onLeft} className="mr-2 rounded-full bg-slate-100 p-1 text-slate-700 hover:bg-slate-200 transition-colors">
                                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M12 5l-5 5 5 5" /></svg>
                            </button>
                        )} */}
                        <div className="relative flex-1">
                            {/* Top wide card */}
                            <div className="flex items-center gap-3 rounded-md bg-gray-50/40 p-2 ">
                                {items[0]?.image ? (
                                    <img src={items[0].image} alt="item" className="h-10 w-10 rounded object-contain" />
                                ) : (
                                    <div className="h-10 w-10 rounded bg-slate-100" />
                                )}
                                <div className="min-w-0 text-xs font-semibold leading-snug text-slate-800">
                                    <span className="line-clamp-1">{items[0]?.title || ''}</span>
                                </div>
                            </div>

                            {/* Plus floating between rows */}
                            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-50/40 text-slate-700 shadow">
                                    <span className="-mt-0.5 text-sm font-bold">+</span>
                                </div>
                            </div>

                            {/* Bottom two cards in a row */}
                            <div className="mt-2 grid grid-cols-2 gap-2">
                                {[items[1], items[2]].map((it, idx) => (
                                    <div key={idx} className="flex items-center gap-3 rounded-md bg-gray-50/40 p-2 ">
                                        {it?.image ? (
                                            <img src={it.image} alt="item" className="h-10 w-10 rounded object-contain" />
                                        ) : (
                                            <div className="h-10 w-10 rounded bg-slate-100" />
                                        )}
                                        <div className="min-w-0 text-xs font-semibold leading-snug text-slate-800">
                                            <span className="line-clamp-2">{it?.title || ''}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {onRight && (
                            <button aria-label="next" onClick={onRight} className="ml-2 rounded-full bg-slate-100 p-1 text-slate-700 hover:bg-slate-200 transition-colors">
                                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M8 5l5 5-5 5" /></svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* =============Price Section ============= */}
                {/* <div className="flex items-end gap-2"> */}

                <div className="flex justify-center items-center gap-2 mt-4">
                    {original && <span className="text-sm text-white/70 line-through">৳{original}</span>}
                    <span className="text-2xl text-black font-bold">৳{price}</span>
                </div>
                {/* </div> */}
                {ctaLeft && ctaRight && (
                    <div className="mt-4 flex items-center justify-between">

                        <div className="grid grid-cols-2 gap-3 w-full mx-auto justify-center items-center">

                            <button className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-white transition-colors border border-white/60 shadow-sm">
                                {ctaLeft}
                            </button>


                            <button className="rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-black hover:bg-orange-600 transition-colors  gap-1 shadow">
                                <span>
                                    {ctaRight}
                                    <span className="ml-1">›</span>
                                </span>
                            </button>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


