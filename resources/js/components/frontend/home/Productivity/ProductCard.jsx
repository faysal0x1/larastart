import React, { useMemo, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';

const formatPrice = (value) => {
    try {
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    } catch (_) {
        return value;
    }
};

const ProductCard = ({
    itemNumber,
    href,
    image,
    title,
    promo,
    discountPercent,
    price,
    shipping,
    rating,
    video,
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const showVideoButton = useMemo(() => Boolean(video && video.src), [video]);

    const handlePlayToggle = (e) => {
        e.preventDefault();
        if (!showVideoButton) return;
        const next = !isPlaying;
        setIsPlaying(next);
        requestAnimationFrame(() => {
            if (next && videoRef.current) {
                videoRef.current.play().catch(() => { });
            } else if (!next && videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        });
    };

    return (
        <div className="snap-start min-w-[240px] w-[240px] md:min-w-[280px] md:w-[280px] lg:min-w-[210px] lg:w-[210px] xl:min-w-[230px] xl:w-[230px]">
            <Link href={href || '#'} className="block group">
                <div className="relative aspect-[4/3] overflow-hidden">
                    {isPlaying && showVideoButton ? (
                        <video
                            ref={videoRef}
                            src={video.src}
                            poster={image?.src}
                            className="h-full w-full object-cover"
                            controls
                            playsInline
                            muted
                            autoPlay
                        />
                    ) : (
                        <img
                            src={image?.src}
                            alt={image?.alt || title}
                            title={image?.title || title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                    )}

                    {showVideoButton && (
                        <button
                            onClick={handlePlayToggle}
                            className="absolute left-2 bottom-2 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-900 hover:bg-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                {isPlaying ? (
                                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                                ) : (
                                    <path d="M8 5v14l11-7z" />
                                )}
                            </svg>
                            {isPlaying ? 'Pause' : 'Watch video'}
                        </button>
                    )}
                </div>
            </Link>

            <div className="mt-3 space-y-1">
                {rating && typeof rating.value === 'number' && (
                    <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 ৳{i < Math.round(rating.value) ? '' : 'opacity-30'}`}>
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        {rating.count ? (
                            <span className="ml-1 text-xs text-gray-500">({rating.count})</span>
                        ) : null}
                    </div>
                )}

                <Link href={href || '#'} className="block text-sm font-semibold leading-snug text-gray-900 line-clamp-2 hover:underline">
                    {title}
                </Link>

                {promo ? (
                    <p className="text-xs text-orange-600">{promo}</p>
                ) : null}

                <div className="flex items-end gap-2">
                    <div className="text-gray-900">
                        <span className="text-sm align-top">৳</span>
                        <span className="text-2xl font-bold">{formatPrice(price?.current || 0).split('.')[0]}</span>
                        <sup className="text-sm">.{formatPrice(price?.current || 0).split('.')[1]}</sup>
                    </div>
                    {price?.was ? (
                        <div className="text-xs text-gray-500 line-through">৳{formatPrice(price.was)}</div>
                    ) : null}
                </div>

                <div className="flex items-center gap-2">
                    {typeof discountPercent === 'number' ? (
                        <span className="rounded bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">Save {discountPercent}%</span>
                    ) : null}
                    {shipping ? (
                        <span className="text-xs text-blue-600">{shipping}</span>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
