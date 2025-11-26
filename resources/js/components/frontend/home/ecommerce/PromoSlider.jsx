import React, { useMemo, useState } from 'react';
import { promoSlides } from './demoData';

export default function PromoSlider({ className = '' }) {
    const [i, setI] = useState(0);
    const slide = useMemo(() => promoSlides[i % promoSlides.length], [i]);
    return (
        <div className={`relative overflow-hidden rounded-md shadow bg-slate-200 ${className}`} style={{ height: 220 }}>
            <img src={slide.image} alt={slide.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" width={1600} height={220} />
            <button aria-label="prev" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 text-slate-700 hover:bg-white" onClick={() => setI((v) => (v - 1 + promoSlides.length) % promoSlides.length)}>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M12 5l-5 5 5 5" /></svg>
            </button>
            <button aria-label="next" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 text-slate-700 hover:bg-white" onClick={() => setI((v) => (v + 1) % promoSlides.length)}>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8 5l5 5-5 5" /></svg>
            </button>
        </div>
    );
}


