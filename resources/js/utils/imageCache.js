/**
 * Image Cache Utility
 * Handles browser image caching with cache invalidation
 */

import serviceWorkerManager from './serviceWorker';

class ImageCache {
    constructor() {
        this.cache = new Map();
        this.maxCacheSize = 100; // Maximum number of images to cache
        this.cachePrefix = 'tbz_img_';
    }

    /**
     * Generate cache key for image
     */
    generateCacheKey(src, updatedAt = null) {
        const timestamp = updatedAt ? new Date(updatedAt).getTime() : Date.now();
        return `${this.cachePrefix}${btoa(src)}_${timestamp}`;
    }

    /**
     * Get cached image URL
     */
    getCachedImageUrl(src, updatedAt = null) {
        if (!src) return '/placeholder.svg';

        // If it's already a full URL with cache buster, return as is
        if (src.includes('?v=') || src.includes('&v=')) {
            return src;
        }

        // Generate cache key
        const cacheKey = this.generateCacheKey(src, updatedAt);

        // Check if image is in cache
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        // Generate cache-busted URL
        const cacheBuster = updatedAt ? new Date(updatedAt).getTime() : Date.now();
        const separator = src.includes('?') ? '&' : '?';
        const cachedUrl = `${src}${separator}v=${cacheBuster}`;

        // Store in cache
        this.cache.set(cacheKey, cachedUrl);

        // Clean up old cache entries if needed
        this.cleanupCache();

        return cachedUrl;
    }

    /**
     * Preload image for better performance
     */
    preloadImage(src, updatedAt = null) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const cachedUrl = this.getCachedImageUrl(src, updatedAt);

            img.onload = () => {
                resolve(cachedUrl);
            };

            img.onerror = () => {
                reject(new Error(`Failed to load image: ${src}`));
            };

            img.src = cachedUrl;
        });
    }

    /**
     * Batch preload multiple images
     */
    async preloadImages(imageList) {
        const promises = imageList.map(({ src, updatedAt }) =>
            this.preloadImage(src, updatedAt).catch(error => {
                console.warn('Failed to preload image:', src, error);
                return null;
            })
        );

        return Promise.all(promises);
    }

    /**
     * Clear specific image from cache
     */
    clearImageCache(src) {
        const keysToDelete = [];
        for (const [key, value] of this.cache.entries()) {
            if (value.includes(src)) {
                keysToDelete.push(key);
            }
        }

        keysToDelete.forEach(key => this.cache.delete(key));
    }

    /**
     * Clear all image cache
     */
    async clearAllCache() {
        this.cache.clear();

        // Also clear service worker cache
        if (serviceWorkerManager.isSupported) {
            await serviceWorkerManager.clearImageCache();
        }
    }

    /**
     * Clean up old cache entries
     */
    cleanupCache() {
        if (this.cache.size <= this.maxCacheSize) return;

        const entries = Array.from(this.cache.entries());
        const toDelete = entries.slice(0, entries.length - this.maxCacheSize);

        toDelete.forEach(([key]) => this.cache.delete(key));
    }

    /**
     * Get cache statistics
     */
    async getCacheStats() {
        const memoryStats = {
            size: this.cache.size,
            maxSize: this.maxCacheSize,
            keys: Array.from(this.cache.keys())
        };

        // Get service worker cache stats
        if (serviceWorkerManager.isSupported) {
            const swStats = await serviceWorkerManager.getCacheStats();
            return {
                ...memoryStats,
                serviceWorker: swStats
            };
        }

        return memoryStats;
    }

    /**
     * Check if image is cached
     */
    isCached(src, updatedAt = null) {
        const cacheKey = this.generateCacheKey(src, updatedAt);
        return this.cache.has(cacheKey);
    }

    /**
     * Generate cache-busted URL for external images
     */
    getCacheBustedUrl(src, updatedAt = null) {
        if (!src) return '/placeholder.svg';

        // If it's already a full URL, add cache buster
        if (src.startsWith('http')) {
            const cacheBuster = updatedAt ? new Date(updatedAt).getTime() : Date.now();
            const separator = src.includes('?') ? '&' : '?';
            return `${src}${separator}v=${cacheBuster}`;
        }

        return src;
    }
}

// Create singleton instance
const imageCache = new ImageCache();

export default imageCache;

// Export utility functions
export const getCachedImageUrl = (src, updatedAt = null) =>
    imageCache.getCachedImageUrl(src, updatedAt);

export const preloadImage = (src, updatedAt = null) =>
    imageCache.preloadImage(src, updatedAt);

export const preloadImages = (imageList) =>
    imageCache.preloadImages(imageList);

export const clearImageCache = (src) =>
    imageCache.clearImageCache(src);

export const clearAllImageCache = () =>
    imageCache.clearAllCache();

export const getCacheStats = () =>
    imageCache.getCacheStats();
