import { useEffect, useRef, useState } from 'react';
import { getImageUrl } from '../utils/imageUtils';

const LazyImage = ({ src, alt, className, onLoad }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef();
    const observerRef = useRef();

    // Check if src is provided and get full URL
    const fullImageUrl = src ? getImageUrl(src) : null;

    useEffect(() => {
        // If no image URL is available, set error state immediately
        if (!fullImageUrl) {
            setError(true);
            return;
        }

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loaded && !error) {
                    const img = new Image();
                    img.src = fullImageUrl;
                    img.onload = () => {
                        setLoaded(true);
                        onLoad?.();
                    };
                    img.onerror = () => {
                        setError(true);
                    };
                    observerRef.current?.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        if (imgRef.current) {
            observerRef.current.observe(imgRef.current);
        }

        return () => {
            observerRef.current?.disconnect();
        };
    }, [fullImageUrl, loaded, error, onLoad]);

    // If no image source is provided or there's an error
    if (error || !src) {
        return (
            <div className={`${className} bg-gray-50 flex items-center justify-center text-gray-400`}>
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
            </div>
        );
    }

    return (
        <div ref={imgRef} className={`${className} relative`}>
            {/* Shimmer placeholder */}
            {!loaded && (
                <div className="absolute inset-0 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 shimmer-animation"></div>
                </div>
            )}

            {/* Loaded image */}
            {loaded && (
                <img
                    src={fullImageUrl}
                    alt={alt}
                    className={`${className} w-full h-full object-contain transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                />
            )}
        </div>
    );
};

export default LazyImage;
