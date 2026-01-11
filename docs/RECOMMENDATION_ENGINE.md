### Recommendation Engine — Architecture, Setup, and Usage

This document explains how to use, configure, and extend the modular, pluggable Product Recommendation Engine for this Laravel + React/Inertia project.

## Overview

The engine provides multiple recommendation algorithms behind a single API. It supports real-time and offline batch strategies, guest and authenticated users, caching, telemetry, and A/B testing hooks.

- Pluggable algorithms via a common contract
- Orchestrated by a `RecommendationService` with Redis caching
- Controller endpoint for requesting recommendations with context and optional algorithm
- Batch command recomputes offline tables (popularity, co-purchase)
- Telemetry logs impressions for analytics and experiments
- Guest support using a persistent anonymous session cookie

## Key Components (Module)

 - Contract: `App\Modules\Recommendation\Contracts\RecommendationAlgorithm`
 - Service: `App\Modules\Recommendation\Services\RecommendationService`
 - Algorithms: `App\Modules\Recommendation\Services\Algorithms\*`
 - Provider: `App\Modules\Recommendation\Providers\RecommendationModuleServiceProvider`
 - Config: `config/recommendations.php` (+ optional overlay `Modules/Recommendation/config/recommendations.php`)
 - Controller: `App\Modules\Recommendation\Http\Controllers\RecommendationController`
 - Middleware: `App\Modules\Recommendation\Http\Middleware\EnsureRecommendationSession`
 - Job/Command: `App\Modules\Recommendation\Jobs\LogRecommendationImpression`, `App\Modules\Recommendation\Console\RecomputeRecommendations`
 - Facade: `App\Modules\Recommendation\Facades\Recommendation`

## Database Schema

Migrations create the following tables:

- `product_events`: Stores behavioral events (product_view, add_to_cart, purchase) with optional `user_id` and `session_id`.
- `product_popularity`: Offline-computed view and purchase scores per product (and category) for popularity and best-seller rankings.
- `product_copurchase`: Co-purchase graph for cross-sell and FBT.
- `recommendation_cache`: Optional persisted cache of recs per `algorithm`, `context`, `user_id` or `session_id`, and `product_id`.
- `recommendation_impressions`: Telemetry for when a recommendation list is shown (with `recommendation_id`, `algorithm`, `variant`, `items`).

Indexes are added for common queries on `session_id`, `event_type`, and composite lookup keys.

Run migrations:
```bash
php artisan migrate
```

## Service Provider and Registration (Module)

The module provider registers the service and algorithms. It is enabled in `bootstrap/providers.php`:
```php
App\Modules\Recommendation\Providers\RecommendationModuleServiceProvider::class,
```

## Configuration

Edit `config/recommendations.php`:

- `default_algorithm`: global default
- `defaults_by_context`: choose a default per context (home, product_page, cart, email, checkout)
- `enabled`: list of allowed algorithm keys
- `cache_ttl`: TTLs for user-specific and popularity caches
- `weights`: optional weights for combining/scoring in multi-algo strategies

Example:
```php
return [
  'default_algorithm' => 'most_viewed_v1',
  'defaults_by_context' => [
    'home' => 'most_viewed_v1',
    'product_page' => 'upsell_v1',
    'cart' => 'fbt_v1',
    'email' => 'previously_viewed_v1',
    'checkout' => 'cross_sell_v1',
  ],
  'enabled' => ['most_viewed_v1','upsell_v1','cross_sell_v1','previously_viewed_v1','fbt_v1','most_purchased_v1'],
  'cache_ttl' => ['user_specific' => 300,'popularity' => 3600],
  'weights' => ['upsell_v1' => 1.0,'cross_sell_v1' => 1.0,'most_viewed_v1' => 1.0,'previously_viewed_v1' => 1.0,'fbt_v1' => 1.0,'most_purchased_v1' => 1.0],
];
```

## Guest Support (Module)

Middleware `EnsureRecommendationSession` issues a long-lived cookie `rec_session` for anonymous users and attaches it to recommendation requests. The controller falls back to `session_id` when `user_id` is absent.

The module route group applies the middleware in `Modules/Recommendation/routes/api.php`:
```php
Route::prefix('/api')->middleware([\App\Modules\Recommendation\Http\Middleware\EnsureRecommendationSession::class])->group(function () {
    Route::get('/recommendations', [\App\Modules\Recommendation\Http\Controllers\RecommendationController::class, 'index']);
});
```

## API Endpoint

`GET /api/recommendations`

Query parameters:
- `context` (required): one of `home, product_page, cart, email, checkout`
- `user_id` (optional): authenticated user
- `session_id` (optional): anonymous session id (auto-handled via cookie)
- `product_id` (optional): seed product for product page/cross-sell/upsell
- `product_ids[]` (optional): multiple seeds for cart/FBT
- `algorithm` (optional): force a specific algorithm key
- `limit` (optional): max results (1..50)
- `variant` (optional): A/B testing variant id

Response headers:
- `X-Recommendation-Id`, `X-Recommendation-Algorithm`, `X-Recommendation-Variant`

Response (JSON array):
```json
[
  {"product_id":123,"score":0.92,"reason":"Upsell — similar item, higher price","algorithm":"upsell_v1","metadata":{}}
]
``;

## Caching

- Redis cache is used in `RecommendationService` with keys composed of `algorithm`, `context`, `user_id/session_id`, `product_id`, and `limit`.
- TTLs controlled via `config/recommendations.php`.

## Batch Offline Recompute

Command: recomputes popularity and co-purchase tables from recent events.
```bash
php artisan recs:recompute --days=30
```

Ensure your queue and scheduler are set up for periodic recomputation as needed.

## Telemetry

When the endpoint returns recommendations, an impression is queued:
- Job: `LogRecommendationImpression`
- Table: `recommendation_impressions`

This can be joined later with click/add_to_cart/purchase events for CTR and conversion metrics.

## Frontend Usage (React + Inertia)

Example component `resources/js/components/Recommendations.jsx`:
```jsx
<Recommendations context="product_page" productId={product.id} />
```

Props:
- `context`, `productId`, `userId`, `sessionId`, `limit`, `algorithm`

For cart page with FBT:
```jsx
<Recommendations context="cart" algorithm="fbt_v1" />
```

## Adding a New Algorithm

1) Create a class implementing `RecommendationAlgorithm` under `Modules/Recommendation/Services/Algorithms/`:
```php
class MyNewAlgo implements RecommendationAlgorithm {
  public function key(): string { return 'my_algo_v1'; }
  public function recommend(array $params, int $limit = 10): Collection { /* ... */ }
}
```
2) Register it in `RecommendationModuleServiceProvider`:
```php
$service->registerAlgorithm(new MyNewAlgo());
```
3) Enable it in `config/recommendations.php` and optionally set it as a default for a context.
4) Add unit tests for the algorithm.

## Business Rules and Filters

`RecommendationService` filters out-of-stock or excluded items (extend to integrate inventory, visibility rules). You can add more filters prior to returning the list.

## A/B Testing and Variants

- Pass `variant` query param to tag responses and telemetry.
- Extend the service to choose between algorithms (e.g., weighted random based on config) and include `variant_id` in metadata.

## Privacy & Compliance

- Telemetry tables avoid PII; they store numeric IDs and algorithm metadata only.
- Use `user_id` only when available; otherwise rely on the anonymous `rec_session` cookie.

## Testing

Feature tests:
- `tests/Feature/RecommendationControllerTest.php`

Unit tests:
- `tests/Unit/FrequentlyBoughtTogetherAlgorithmTest.php`

Run tests:
```bash
php artisan test
```

## Operations Checklist

1) Configure Redis cache and queue worker.
2) Migrate database: `php artisan migrate`.
3) Run recompute as needed: `php artisan recs:recompute --days=30`.
4) Verify `/api/recommendations` returns results for your contexts.
5) Wire frontend component on product and cart pages.


