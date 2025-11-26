### Cart Module — Setup and Usage

This module provides a fully independent cart system (DB, routes, middleware, service, facade).

## Enable
- Provider is registered in `bootstrap/providers.php`:
```php
App\Modules\Cart\Providers\CartModuleServiceProvider::class,
```
- Toggle via `.env`:
```env
MODULE_CART_ENABLED=true
```

## Database
- Migrations auto-loaded from `app/Modules/Cart/database/migrations`
- Tables: `carts`, `cart_items`

## Middleware
- `App\Modules\Cart\Http\Middleware\EnsureCartSession` sets `cart_session` cookie for guests.

## Routes
- Defined in `app/Modules/Cart/routes/api.php`
- Endpoints (prefixed with `/api/cart`):
  - GET `/` — show cart
  - POST `/add` — add item (product_id, quantity)
  - POST `/item/{itemId}/update` — update quantity
  - DELETE `/item/{itemId}` — remove item
  - POST `/clear` — clear cart

## Facade
- `App\Modules\Cart\Facades\Cart`
- Container key: `modules.cart.service`

Example:
```php
use App\Modules\Cart\Facades\Cart;

$cart = Cart::getOrCreateCart($sessionId, $userId);
$cart = Cart::addItem(123, 2, [], $sessionId, $userId);
```

## Notes
- For guests, pass the `cart_session` cookie with requests.
- Extend pricing (tax/shipping/discounts) inside `CartService` as needed.
