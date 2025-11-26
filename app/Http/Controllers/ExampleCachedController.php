<?php
namespace App\Http\Controllers;

use App\Services\SmartCacheService;
use Illuminate\Http\Request;

/**
 * Example controller showing various cache usage patterns
 * This file is for reference only - you can delete it
 */
class ExampleCachedController extends Controller
{
    /**
     * Example: Basic caching with automatic TTL
     */
    public function featuredProducts()
    {
        $products = SmartCacheService::remember('products', 'featured', function () {
            return \App\Models\Product::where('featured', true)
                ->with(['brand', 'category'])
                ->get();
        });

        return response()->json($products);
    }

    /**
     * Example: Custom TTL for specific use case
     */
    public function expensiveReport()
    {
        $report = SmartCacheService::rememberFor('reports', 'monthly_sales', 7200, function () {
            // Expensive calculation that takes 30 seconds
            return $this->calculateMonthlySales();
        });

        return response()->json($report);
    }

    /**
     * Example: Forever cache for static data
     */
    public function appConfig()
    {
        $config = SmartCacheService::rememberForever('static', 'app_config', function () {
            return [
                'app_name' => config('app.name'),
                'version'  => '1.0.0',
                'features' => ['cache', 'search', 'reports'],
                'settings' => config('app.settings', [])
            ];
        });

        return response()->json($config);
    }

    /**
     * Example: User-specific caching
     */
    public function userDashboard()
    {
        $userId = auth()->id();

        $userData = SmartCacheService::remember('users', "dashboard_{$userId}", function () use ($userId) {
            $user = auth()->user();
            return [
                'orders'          => $user->orders()->latest()->take(5)->get(),
                'wishlist_count'  => $user->wishlist()->count(),
                'recent_activity' => $user->activities()->latest()->take(10)->get(),
            ];
        });

        return view('user.dashboard', $userData);
    }

    /**
     * Example: Search results with query-based caching
     */
    public function search(Request $request)
    {
        $query   = $request->get('q', '');
        $filters = $request->only(['category', 'brand', 'price_min', 'price_max']);

        $cacheKey = 'search_' . md5($query . serialize($filters));

        $results = SmartCacheService::remember('search', $cacheKey, function () use ($query, $filters) {
            return $this->performSearch($query, $filters);
        });

        return response()->json($results);
    }

    /**
     * Example: Conditional caching based on user role
     */
    public function adminStats()
    {
        if (! auth()->user()->isAdmin()) {
            abort(403);
        }

        $stats = SmartCacheService::remember('admin', 'dashboard_stats', function () {
            return [
                'total_users'    => \App\Models\User::count(),
                'total_products' => \App\Models\Product::count(),
                'total_orders'   => \App\Models\Order::count(),
                'revenue'        => \App\Models\Order::sum('total'),
                'recent_orders'  => \App\Models\Order::latest()->take(10)->get(),
            ];
        });

        return view('admin.dashboard', $stats);
    }

    /**
     * Example: Cache invalidation
     */
    public function updateProduct($id)
    {
        $product = \App\Models\Product::findOrFail($id);
        $product->update(request()->all());

        // Manually clear specific caches if needed
        SmartCacheService::forget('products', "featured_{$id}");
        SmartCacheService::flush('search'); // Clear all search results

        return response()->json(['message' => 'Product updated successfully']);
    }

    /**
     * Example: Cache checking before expensive operations
     */
    public function generateReport()
    {
        $reportId = 'monthly_' . now()->format('Y_m');

        if (SmartCacheService::has('reports', $reportId)) {
            return response()->json([
                'message' => 'Report already exists',
                'data'    => SmartCacheService::get('reports', $reportId),
            ]);
        }

        $report = SmartCacheService::remember('reports', $reportId, function () {
            return $this->generateMonthlyReport();
        });

        return response()->json($report);
    }

    // Helper methods (these would be in your actual implementation)
    private function calculateMonthlySales()
    {
        // Expensive calculation
        return ['total' => 50000, 'growth' => 15.5];
    }

    private function performSearch($query, $filters)
    {
        // Search logic
        return ['results' => [], 'total' => 0];
    }

    private function generateMonthlyReport()
    {
        // Report generation logic
        return ['report' => 'data'];
    }
}