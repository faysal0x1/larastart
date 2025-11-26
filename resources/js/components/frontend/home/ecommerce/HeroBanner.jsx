import React from 'react';
import AbsGamingBanner from './AbsGamingBanner';

export default function HeroBanner() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Main TECHTEMBER Banner */}
            <div className="col-span-1 sm:col-span-2 overflow-hidden rounded-lg">
                <div className="relative h-48 lg:h-[300px] w-full">
                    <img
                        src="/image/Hero.jpg"
                        alt="Techtmber promo background"
                        className="absolute inset-0 h-full w-full object-fit contain"
                        draggable={false}
                    />
                </div>

              
            </div>

            {/* ABS Gaming PC Section (hidden on mobile) */}
            <div className="hidden sm:block">
                <AbsGamingBanner />
            </div>
        </div>
    );
}
