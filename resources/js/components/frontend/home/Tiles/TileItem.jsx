import React from 'react';
import LazyImage from '@/components/LazyImage';

const TileItem = ({ href, title, bgImage, imgSrc, label, containerClass = '', aspectClass = 'aspect-[16/9]' }) => {
    return (
        <a href={href} className={`home-tile-item block group ${containerClass}`} title={title}>
            <div
                className={`goods-img relative overflow-hidden rounded-lg shadow-sm ${aspectClass}`}
                style={{ background: `url(${bgImage}) no-repeat`, backgroundSize: 'cover' }}
            >
                <LazyImage
                    src={imgSrc}
                    alt={title}
                    className="w-full h-full transition-transform duration-300 group-hover:scale-[1.02]"
                    objectFit="cover"
                    showShimmer={false}
                    fallback={
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                        </div>
                    }
                />
            </div>
            <span className="mt-1 block text-xs font-medium text-gray-900">{label}</span>
        </a>
    );
};

export default TileItem;


