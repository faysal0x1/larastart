import React from 'react';
import LazyImage from '@/components/LazyImage';

export default function PromoCard({ image, title, subtitle, ctaText = 'Shop now', className = '' }) {
    return (
        <div className={`relative overflow-hidden rounded-lg shadow-lg ${className}`} style={{ height: 220 }}>
            <LazyImage
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full"
                objectFit="cover"
                showShimmer={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/20" />
            <div className="relative h-full w-full p-6 text-white flex flex-col justify-center">
                <div className="text-3xl font-extrabold tracking-tight drop-shadow-lg">{title}</div>
                <p className="mt-2 max-w-lg text-sm text-white/90 drop-shadow">{subtitle}</p>
                <a href="#" className="mt-4 inline-flex items-center rounded-full bg-white px-6 py-2 text-sm font-semibold text-blue-700 hover:bg-white/90 transition-colors w-fit">
                    {ctaText}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </div>
    );
}


