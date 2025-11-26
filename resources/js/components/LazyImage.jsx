import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { getImageUrl } from '../utils/imageUtils';
import { getCachedImageUrl } from '../utils/imageCache';

const LazyImage = memo(({
    src,
    alt = 'Image',
    className = '',
    onLoad,
    onError,
    placeholder = null,
    fallback = null,
    rootMargin = '200px',
    threshold = 0.1,
    objectFit = 'contain',
    showShimmer = true,
    updatedAt = null, // Add updatedAt prop for cache busting
    ...props
}) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [inView, setInView] = useState(false);
    const imgRef = useRef();
    const observerRef = useRef();

    // Check if src is provided and get cached URL
    const fullImageUrl = src ? getCachedImageUrl(getImageUrl(src), updatedAt) : null;

    // Memoized error handler
    const handleError = useCallback(() => {
        setError(true);
        onError?.();
    }, [onError]);

    // Memoized load handler
    const handleLoad = useCallback(() => {
        setLoaded(true);
        onLoad?.();
    }, [onLoad]);

    useEffect(() => {
        // If no image URL is available, set error state immediately
        if (!fullImageUrl) {
            setError(true);
            return;
        }

        // If already loaded or error, don't set up observer
        if (loaded || error) return;

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loaded && !error) {
                    setInView(true);
                    const img = new Image();
                    img.src = fullImageUrl;
                    img.onload = handleLoad;
                    img.onerror = handleError;
                    observerRef.current?.disconnect();
                }
            },
            {
                rootMargin,
                threshold
            }
        );

        if (imgRef.current) {
            observerRef.current.observe(imgRef.current);
        }

        return () => {
            observerRef.current?.disconnect();
        };
    }, [fullImageUrl, loaded, error, handleLoad, handleError, rootMargin, threshold]);

    // Custom placeholder
    if (placeholder && !loaded && !error) {
        return (
            <div ref={imgRef} className={`${className} relative`}>
                {placeholder}
            </div>
        );
    }

    // Error state with custom fallback
    if (error || !src) {
        if (fallback) {
            return (
                <div className={`${className} relative`}>
                    {fallback}
                </div>
            );
        }

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
            {!loaded && !error && showShimmer && (
                <div className="absolute inset-0 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 shimmer-animation"></div>
                </div>
            )}

            {/* Loaded image */}
            {loaded && inView && (
                <img
                    src={fullImageUrl}
                    alt={alt}
                    className={`w-full h-full object-${objectFit} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    {...props}
                />
            )}
        </div>
    );
});

export default LazyImage;
