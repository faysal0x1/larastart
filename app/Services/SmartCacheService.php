<?php
namespace App\Services;

use Closure;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SmartCacheService
{
    private static array $ttl = [
        'home'       => 300,   // 5 min
        'products'   => 1800,  // 30 min
        'categories' => 3600,  // 1 hour
        'brands'     => 3600,  // 1 hour
        'deals'      => 300,   // 5 min
        'users'      => 600,   // 10 min
        'orders'     => 300,   // 5 min
        'cart'       => 1800,  // 30 min
        'search'     => 600,   // 10 min
        'static'     => 86400, // 24 hours
    ];

    /**
     * Cache data with automatic TTL based on type
     */
    public static function remember(string $type, string $key, Closure $callback): mixed
    {
        $cacheKey = "{$type}:{$key}";
        $ttl      = self::$ttl[$type] ?? 1800;

        try {
            return Cache::remember($cacheKey, $ttl, $callback);
        } catch (\Throwable $e) {
            Log::warning("Cache failed for {$cacheKey}, executing callback: " . $e->getMessage());
            return $callback();
        }
    }

    /**
     * Cache data with custom TTL
     */
    public static function rememberFor(string $type, string $key, int $ttlSeconds, Closure $callback): mixed
    {
        $cacheKey = "{$type}:{$key}";

        try {
            return Cache::remember($cacheKey, $ttlSeconds, $callback);
        } catch (\Throwable $e) {
            Log::warning("Cache failed for {$cacheKey}, executing callback: " . $e->getMessage());
            return $callback();
        }
    }

    /**
     * Cache data forever (until manually cleared)
     */
    public static function rememberForever(string $type, string $key, Closure $callback): mixed
    {
        $cacheKey = "{$type}:{$key}";

        try {
            return Cache::rememberForever($cacheKey, $callback);
        } catch (\Throwable $e) {
            Log::warning("Cache failed for {$cacheKey}, executing callback: " . $e->getMessage());
            return $callback();
        }
    }

    /**
     * Get cached data without callback
     */
    public static function get(string $type, string $key, $default = null): mixed
    {
        $cacheKey = "{$type}:{$key}";

        try {
            return Cache::get($cacheKey, $default);
        } catch (\Throwable $e) {
            Log::warning("Cache get failed for {$cacheKey}: " . $e->getMessage());
            return $default;
        }
    }

    /**
     * Store data in cache
     */
    public static function put(string $type, string $key, $value, ?int $ttlSeconds = null): void
    {
        $cacheKey = "{$type}:{$key}";
        $ttl      = $ttlSeconds ?? self::$ttl[$type] ?? 1800;

        try {
            Cache::put($cacheKey, $value, $ttl);
        } catch (\Throwable $e) {
            Log::warning("Cache put failed for {$cacheKey}: " . $e->getMessage());
        }
    }

    /**
     * Check if cache exists
     */
    public static function has(string $type, string $key): bool
    {
        $cacheKey = "{$type}:{$key}";

        try {
            return Cache::has($cacheKey);
        } catch (\Throwable $e) {
            Log::warning("Cache has failed for {$cacheKey}: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Remove specific cache entry
     */
    public static function forget(string $type, string $key): void
    {
        $cacheKey = "{$type}:{$key}";

        try {
            Cache::forget($cacheKey);
        } catch (\Throwable $e) {
            Log::warning("Cache forget failed for {$cacheKey}: " . $e->getMessage());
        }
    }

    /**
     * Flush all caches of a specific type
     */
    public static function flush(string $type): void
    {
        try {
            // For stores that support tags, we could use tags
            // For now, we'll use a simple pattern-based approach
            Cache::forget("{$type}:*");
        } catch (\Throwable $e) {
            Log::warning("Cache flush failed for {$type}: " . $e->getMessage());
        }
    }

    /**
     * Flush all caches
     */
    public static function flushAll(): void
    {
        try {
            Cache::flush();
        } catch (\Throwable $e) {
            Log::warning("Cache flush all failed: " . $e->getMessage());
        }
    }

    /**
     * Get cache statistics
     */
    public static function getStats(): array
    {
        return [
            'driver'          => config('cache.default', 'unknown'),
            'ttl_config'      => self::$ttl,
            'available_types' => array_keys(self::$ttl),
        ];
    }

    /**
     * Add new cache type with TTL
     */
    public static function addType(string $type, int $ttlSeconds): void
    {
        self::$ttl[$type] = $ttlSeconds;
    }

    /**
     * Get TTL for a specific type
     */
    public static function getTtl(string $type): int
    {
        return self::$ttl[$type] ?? 1800;
    }
}
