import React, { useEffect, useMemo, useState } from 'react';

export default function AbsGamingBanner() {
    const images = useMemo(() => [
        {
            src: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=1200&auto=format&fit=crop',
            alt: 'Gaming PC 1'
        },
        {
            src: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
            alt: 'Gaming Setup 2'
        },
        {
            src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
            alt: 'Gaming Accessories 3'
        }
    ], []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const slideIntervalMs = 4000;

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        if (isHovered) return; // pause on hover
        const id = setInterval(goToNext, slideIntervalMs);
        return () => clearInterval(id);
    }, [isHovered, images.length]);

    return (
        <div
            className="relative overflow-hidden rounded-lg bg-gradient-to-b from-[#0769e0] via-[#77a0d3] to-white p-6 min-h-[280px] hidden sm:block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative z-10 flex h-full flex-col">
                <div className="text-white">
                    <div className="text-3xl font-bold leading-tight drop-shadow-lg">ABS Gaming PC</div>
                    <a href="#" className="mt-2 inline-flex items-center text-sm font-semibold text-white hover:underline">
                        Shop now ▸
                    </a>
                </div>

                <div className="mt-auto pt-6">
                    <div className="relative h-40">
                        {images.map((image, index) => (
                            <img
                                key={image.src}
                                src={image.src}
                                alt={image.alt}
                                className={`absolute left-1/2 -translate-x-1/2 h-40 w-auto object-contain drop-shadow-2xl transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                                draggable={false}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Navigation arrows */}
            <button
                type="button"
                aria-label="Previous slide"
                onClick={goToPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded  p-2 text-white  transition-colors z-20"
            >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
                type="button"
                aria-label="Next slide"
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded  p-2 text-white  transition-colors z-20"
            >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6" /></svg>
            </button>
        </div>
    );
}


