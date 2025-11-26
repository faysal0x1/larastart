<?php
namespace App\Http\Controllers;

// use App\Http\Middleware\HandleInertiaRequests;
use App\Models\Brand;
use App\Models\DealOfTheDay;
use App\Models\District;
use App\Models\Division;
use App\Models\Newsletter;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductReview;
use App\Models\Upazilla;
use App\Models\UserAddress;
use App\Modules\Cart\Services\CartService;
use App\Modules\Cache\Services\SmartCacheService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class JayeadController extends Controller
{

    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }



    public function pcBuilder()
    {
        return Inertia::render('custom/PcBuildPage');
    }



    public function cart(Request $request)
    {
        $sessionId = $request->cookies->get('cart_session');
        $userId    = Auth::id();

        $cart = $this->cartService->getOrCreateCart($sessionId, $userId);

        $cart->load(['items.product', 'items.product.media']);

        // Build addresses list for authenticated users
        $addresses = [];
        if ($userId) {
            $addresses = \App\Models\UserAddress::where('user_id', $userId)
                ->orderByDesc('is_default')
                ->orderByDesc('id')
                ->get()
                ->map(function (\App\Models\UserAddress $addr) {
                    $fullName    = trim(trim((string) $addr->first_name) . ' ' . trim((string) $addr->last_name));
                    $displayName = $fullName ?: (trim((string) $addr->address) ?: ('Address #' . $addr->id));
                    return [
                        'id'          => $addr->id,
                        'name'        => $displayName,
                        'first_name'  => $addr->first_name,
                        'last_name'   => $addr->last_name,
                        'phone'       => $addr->phone,
                        'email'       => $addr->email,
                        'address'     => $addr->address,
                        'post_code'   => $addr->post_code,
                        'division_id' => $addr->division_id,
                        'district_id' => $addr->district_id,
                        'upazilla_id' => $addr->upazilla_id,
                        'city'        => '',
                        'isDefault'   => $addr->is_default,
                    ];
                });
        }

        // return response()->json($cart);
        return Inertia::render('frontend/cart/CartPageIndex', [
            'cart'      => $cart,
            'addresses' => $addresses,
            'auth'      => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function checkout()
    {
        return Inertia::render('frontend/checkout/CheckoutPage');
    }

    public function orderSuccess(Request $request)
    {
        $orderId     = $request->get('order_id');
        $orderNumber = $request->get('order_number');

        // Validate that we have at least one identifier
        if (! $orderId && ! $orderNumber) {
            return redirect('/')->with('error', 'Invalid order access. Please try again.');
        }

        // Try to fetch real order data
        $order = null;
        if ($orderId) {
            $order = \App\Models\Order::with(['orderItems', 'user'])->find($orderId);
        } elseif ($orderNumber) {
            $order = \App\Models\Order::with(['orderItems', 'user'])->where('order_number', $orderNumber)->first();
        }
        // If order not found, redirect with error
        if (! $order) {
            return redirect('/')->with('error', 'Order not found. Please check your order details.');
        }

        // Verify the order belongs to the current user (if authenticated)
        if (Auth::check() && $order->user_id !== Auth::id()) {
            return redirect('/')->with('error', 'You are not authorized to view this order.');
        }

        // Build order details from database
        $orderDetails = [
            'id'                => $order->order_number,
            'total'             => (float) $order->amount,
            'estimatedDelivery' => now()->addDays(3)->format('M d, Y') . ' - ' . now()->addDays(7)->format('M d, Y'),
            'trackingNumber'    => 'TRK' . strtoupper(substr(md5($order->id), 0, 9)),
            'items'             => $order->orderItems->map(function ($item) {
                return [
                    'name'     => $item->product_name,
                    'quantity' => $item->quantity,
                    'price'    => (float) $item->unit_price,
                    'image'    => $item->product->media->first()->getUrl(),
                ];
            })->toArray(),
            'shippingAddress'   => [
                'name'    => $order->name,
                'address' => $order->address,
                'city'    => $order->post_code,
                'country' => "Bangladesh",
            ],
            'paymentStatus'     => $order->payment_status,
            'orderStatus'       => $order->status,
            'orderDate'         => $order->created_at->format('M d, Y'),
            'paymentMethod'     => $order->payment_method,
            'invoiceNo'         => $order->invoice_no,
        ];

        return Inertia::render('frontend/checkout/OrderSuccessPage', [
            'orderId'      => $orderDetails['id'],
            'orderDetails' => $orderDetails,
        ]);
    }

    public function orderFailure(Request $request)
    {
        $errorMessage = $request->get('error');
        $orderId      = $request->get('order_id');
        $orderNumber  = $request->get('order_number');

        // Try to fetch order data if available
        $order = null;
        if ($orderId) {
            $order = \App\Models\Order::with(['orderItems', 'user'])->find($orderId);
        } elseif ($orderNumber) {
            $order = \App\Models\Order::with(['orderItems', 'user'])->where('order_number', $orderNumber)->first();
        }

        // If order exists, verify it belongs to the current user (if authenticated)
        if ($order && Auth::check() && $order->user_id !== Auth::id()) {
            return redirect('/')->with('error', 'You are not authorized to view this order.');
        }

        // Build order details for failure page
        $orderDetails = null;
        if ($order) {
            $orderDetails = [
                'id'              => $order->order_number,
                'total'           => (float) $order->amount,
                'items'           => $order->orderItems->map(function ($item) {
                    return [
                        'name'     => $item->product_name,
                        'quantity' => $item->quantity,
                        'price'    => (float) $item->unit_price,
                    ];
                })->toArray(),
                'shippingAddress' => [
                    'name'    => $order->name,
                    'address' => $order->address,
                    'city'    => $order->post_code,
                    'country' => "Bangladesh",
                ],
                'paymentStatus'   => $order->payment_status,
                'orderStatus'     => $order->status,
                'orderDate'       => $order->created_at->format('M d, Y'),
            ];
        }

        return Inertia::render('frontend/checkout/OrderFailurePage', [
            'errorMessage' => $errorMessage,
            'orderId'      => $orderNumber ?: $orderId,
            'orderDetails' => $orderDetails,
        ]);
    }

    public function testOrderSuccess()
    {
        return Inertia::render('frontend/checkout/TestOrderSuccessPage');
    }

    public function DealPage()
    {
        $product = DealOfTheDay::with(['dealOfTheDayProduct', 'dealOfTheDayProduct.product'])->get();

        // return $product;
        return Inertia::render('frontend/dealPage/DealPageIndex', ['products' => $product]);
    }

    public function BrandsPage()
    {
        return Inertia::render('frontend/brands/BrandsPage');
    }

    // ------------------ New Navigation Pages ------------------
    public function TrendingDealsPage()
    {
        return Inertia::render('frontend/coming-soon/ComingSoonPage', ['title' => 'Trending Deals']);
    }

    public function BestSellersPage()
    {
        return Inertia::render('frontend/coming-soon/ComingSoonPage', ['title' => 'Best Sellers']);
    }

    public function ClearancePage()
    {
        return Inertia::render('frontend/coming-soon/ComingSoonPage', ['title' => 'Clearance']);
    }

    public function IntelGamerDaysPage()
    {
        return Inertia::render('frontend/coming-soon/ComingSoonPage', ['title' => 'Intel Gamer Days']);
    }

    public function FreeGiftAmdPage()
    {
        return Inertia::render('frontend/coming-soon/ComingSoonPage', ['title' => 'Free Gift w/ AMD']);
    }

    public function SomethingComing()
    {
        return Inertia::render('frontend/coming-soon/ComingSoonPage', ['title' => 'Something Coming Card']);
    }

    public function GamerCommunityPage()
    {
        return Inertia::render('frontend/coming-soon/ComingSoonPage', ['title' => 'Gamer Community']);
    }

    public function ClearanceDealsPage()
    {
        return Inertia::render('frontend/coming-soon/ComingSoonPage', ['title' => 'Clearance Deals']);
    }

    public function RefreshedLikeNewPage()
    {
        return Inertia::render('frontend/coming-soon/ComingSoonPage', ['title' => 'Refreshed - Like New']);
    }

    public function StoreCreditCardPage()
    {
        return Inertia::render('frontend/coming-soon/ComingSoonPage', ['title' => 'Store Credit Card']);
    }

    public function PcUpgraderPage()
    {
        return Inertia::render('frontend/coming-soon/ComingSoonPage', ['title' => 'PC Upgrader']);
    }

    public function GamingPcFinderPage()
    {
        return Inertia::render('frontend/coming-soon/ComingSoonPage', ['title' => 'Gaming PC Finder']);
    }

    public function NetworkBuilderPage()
    {
        return Inertia::render('frontend/coming-soon/ComingSoonPage', ['title' => 'Network Builder']);
    }

    // ------------------ User Addresses (Cart/Checkout) ------------------
    public function listUserAddresses(Request $request)
    {
        $userId = Auth::id();
        if (! $userId) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $addresses = UserAddress::where('user_id', $userId)
            ->orderByDesc('is_default')
            ->orderByDesc('id')
            ->get()
            ->map(function (UserAddress $addr) {
                $name = trim(trim((string) $addr->first_name) . ' ' . trim((string) $addr->last_name));
                return [
                    'id'        => $addr->id,
                    'name'      => $name ?: 'Unnamed',
                    'phone'     => $addr->phone,
                    'email'     => $addr->email,
                    'address'   => $addr->address,
                    'post_code' => $addr->post_code,
                    'city'      => '',
                    'isDefault' => $addr->is_default,
                ];
            });

        return response()->json(['data' => $addresses]);
    }

    public function storeUserAddress(Request $request)
    {
//        dd($request->all());
        $userId = Auth::id();
        if (! $userId) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $created = UserAddress::create([
            'user_id'     => $userId,
            'first_name'  => $request->get('first_name'),
            'last_name'   => $request->get('last_name'),
            'phone'       => $request->get('phone'),
            'email'       => $request->get('email'),
            'post_code'   => $request->get('post_code'),
            'division_id' => $request->get('division_id'),
            'district_id' => $request->get('district_id'),
            'upazilla_id' => 1,
            'address'     => $request->get('address'),
            'is_default'  => false,
        ]);

        $name     = trim(trim((string) $created->first_name) . ' ' . trim((string) $created->last_name));
        $response = [
            'id'        => $created->id,
            'name'      => $name ?: 'Unnamed',
            'phone'     => $created->phone,
            'email'     => $created->email,
            'address'   => $created->address,
            'post_code' => $created->post_code,
            'city'      => '',
            'isDefault' => $created->is_default,
        ];

        return response()->json(['data' => $response], 201);
    }

    public function updateUserAddress(Request $request, $id)
    {
        $userId = Auth::id();
        if (! $userId) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Find the address and ensure it belongs to the current user
        $address = UserAddress::where('id', $id)->where('user_id', $userId)->first();
        if (! $address) {
            return response()->json(['message' => 'Address not found'], 404);
        }

        $validated = $request->validate([
            'first_name'  => ['required', 'string', 'max:255'],
            'last_name'   => ['nullable', 'string', 'max:255'],
            'phone'       => ['required', 'string', 'max:100'],
            'email'       => ['nullable', 'email', 'max:255'],
            'post_code'   => ['nullable', 'numeric'],
            'division_id' => ['nullable', 'integer'],
            'district_id' => ['nullable', 'integer'],
            'upazilla_id' => ['nullable', 'integer'],
            'address'     => ['required', 'string', 'max:2000'],
        ]);

        // Convert empty strings to null for numeric fields
        $validated['post_code']   = $validated['post_code'] ?: null;
        $validated['division_id'] = $validated['division_id'] ?: null;
        $validated['district_id'] = $validated['district_id'] ?: null;
        $validated['upazilla_id'] = $validated['upazilla_id'] ?: null;

        $address->update([
            'first_name'  => $validated['first_name'],
            'last_name'   => $validated['last_name'],
            'phone'       => $validated['phone'],
            'email'       => $validated['email'],
            'post_code'   => $validated['post_code'],
            'division_id' => $validated['division_id'],
            'district_id' => $validated['district_id'],
            'upazilla_id' => $validated['upazilla_id'],
            'address'     => $validated['address'],
        ]);

        $name     = trim(trim((string) $address->first_name) . ' ' . trim((string) $address->last_name));
        $response = [
            'id'        => $address->id,
            'name'      => $name ?: 'Unnamed',
            'phone'     => $address->phone,
            'email'     => $address->email,
            'address'   => $address->address,
            'post_code' => $address->post_code,
            'city'      => '',
            'isDefault' => $address->is_default,
        ];

        return response()->json(['data' => $response]);
    }

    public function deleteUserAddress($id)
    {
        $userId = Auth::id();
        if (! $userId) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Find the address and ensure it belongs to the current user
        $address = UserAddress::where('id', $id)->where('user_id', $userId)->first();
        if (! $address) {
            return response()->json(['message' => 'Address not found'], 404);
        }

        $address->delete();

        return response()->json(['message' => 'Address deleted successfully']);
    }

    public function setDefaultUserAddress($id)
    {
        $userId = Auth::id();
        if (! $userId) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Find the address and ensure it belongs to the current user
        $address = UserAddress::where('id', $id)->where('user_id', $userId)->first();
        if (! $address) {
            return response()->json(['message' => 'Address not found'], 404);
        }

        // Remove default from all other addresses for this user
        UserAddress::where('user_id', $userId)->update(['is_default' => false]);

        // Set this address as default
        $address->update(['is_default' => true]);

        return response()->json(['message' => 'Address set as default successfully']);
    }

    // ------------------ Location lookups ------------------
    public function listDivisions()
    {
        $divisions = Division::orderBy('name')->get(['id', 'name']);
        return response()->json(['data' => $divisions]);
    }

    public function listDistricts(Request $request)
    {
        $validated = $request->validate([
            'division_id' => ['required', 'numeric'],
        ]);
        $districts = District::where('division_id', $validated['division_id'])
            ->orderBy('district_name')
            ->get(['id', 'district_name']);
        return response()->json(['data' => $districts]);
    }

    public function listUpazillas(Request $request)
    {
        $validated = $request->validate([
            'district_id' => ['required', 'numeric'],
        ]);
        // upazillas table uses ship_district_id referencing districts
        $upazillas = Upazilla::where('ship_district_id', $validated['district_id'])
            ->orderBy('upazilla_name')
            ->get(['id', 'upazilla_name']);
        return response()->json(['data' => $upazillas]);
    }

    // ------------------ Brands ------------------
    public function getFeaturedBrands()
    {
        // try {
        $brands = Brand::
            orderBy('id', 'asc')
            ->orderBy('name', 'asc')
            ->get(['id', 'name', 'slug', 'image'])
            ->map(function ($brand) {
                return [
                    'id'    => $brand->id,
                    'name'  => $brand->name,
                    'image' => $brand->image_url,
                    'url'   => "/brands/{$brand->slug}",
                ];
            });

        return response()->json(['data' => $brands]);
    }

    public function getAllBrands(Request $request)
    {
        try {
            $search  = $request->get('search', '');
            $page    = $request->get('page', 1);
            $perPage = $request->get('per_page', 20);
            $sort    = $request->get('sort', 'name'); // name, id, created_at

            $cacheKey = sprintf(
                'all:%s',
                md5(json_encode([
                    'search'  => $search,
                    'page'    => $page,
                    'perPage' => $perPage,
                    'sort'    => $sort,
                ]))
            );

            $payload = SmartCacheService::remember('brands', $cacheKey, function () use ($search, $page, $perPage, $sort) {
                $query = Brand::where('status', 1);

                if (! empty($search)) {
                    $query->where('name', 'LIKE', "%{$search}%");
                }

                $query->orderBy($sort, 'asc');

                $brands = $query->paginate($perPage, ['id', 'name', 'slug', 'image'], 'page', $page);

                $transformedBrands = $brands->getCollection()->map(function ($brand) {
                    return [
                        'id'    => $brand->id,
                        'name'  => $brand->name,
                        'slug'  => $brand->slug,
                        'image' => $brand->image_url,
                        'url'   => "/brands/{$brand->slug}",
                    ];
                });

                return [
                    'data'       => $transformedBrands,
                    'pagination' => [
                        'current_page' => $brands->currentPage(),
                        'last_page'    => $brands->lastPage(),
                        'per_page'     => $brands->perPage(),
                        'total'        => $brands->total(),
                        'has_more'     => $brands->hasMorePages(),
                    ],
                    'search'     => $search,
                ];
            });

            return response()->json($payload);
        } catch (\Exception $e) {
            Log::error('Error fetching all brands: ' . $e->getMessage());
            return response()->json(['data' => [], 'error' => 'Failed to fetch brands'], 500);
        }
    }

    public function getBrandsByLetter(Request $request)
    {
        try {
            $letter = $request->get('letter', 'A');
            $search = $request->get('search', '');

            $query = Brand::where('status', 1)
                ->where('name', 'LIKE', "{$letter}%");

            if (! empty($search)) {
                $query->where('name', 'LIKE', "%{$search}%");
            }

            $brands = $query->orderBy('name', 'asc')
                ->get(['id', 'name', 'slug', 'image'])
                ->map(function ($brand) {
                    return [
                        'id'    => $brand->id,
                        'name'  => $brand->name,
                        'slug'  => $brand->slug,
                        'image' => $brand->image_url,
                        'url'   => "/brands/{$brand->slug}",
                    ];
                });

            return response()->json([
                'data'   => $brands,
                'letter' => $letter,
                'search' => $search,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching brands by letter: ' . $e->getMessage());
            return response()->json(['data' => [], 'error' => 'Failed to fetch brands'], 500);
        }
    }

    public function getBrandProducts($slug)
    {
        try {
            $brand = Brand::where('slug', $slug)->where('status', 1)->first();

            if (! $brand) {
                Log::warning('Brand not found with slug: ' . $slug);
                return Inertia::render('frontend/errors/404');
            }

            Log::info('Found brand: ' . $brand->name . ' (ID: ' . $brand->id . ')');

            // First, let's check if there are any products for this brand at all
            $totalProducts = Product::where('brand_id', $brand->id)->count();
            Log::info('Total products for brand ' . $brand->name . ': ' . $totalProducts);

            $activeProducts = Product::where('brand_id', $brand->id)->where('status', 1)->count();
            Log::info('Active products for brand ' . $brand->name . ': ' . $activeProducts);

            $products = Product::with([
                'brand',
                'productReviews',
                'category',
                'tag',
                'subCategory',
                'multiImages',
                'wishlists',
                'colorImages',
                'seo',
                'variations',
                'specValues',
                'specValues.attribute',
            ])
                ->where('brand_id', $brand->id)
                ->where('status', 1)
                ->orderBy('created_at', 'desc')
                ->get();

            return Inertia::render('frontend/brands/BrandProductsPage', [
                'brand'    => [
                    'id'          => $brand->id,
                    'name'        => $brand->name,
                    'slug'        => $brand->slug,
                    'image'       => $brand->image ? asset($brand->image) : null,
                    'description' => $brand->description,
                ],
                'products' => $products,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching brand products: ' . $e->getMessage());
            return Inertia::render('frontend/errors/500');
        }
    }

    // ------------------ Newsletter ------------------
    public function subscribeNewsletter(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => ['required', 'email', 'max:255'],
            ]);

            // Check if email already exists
            $existingNewsletter = Newsletter::where('email', $validated['email'])->first();

            if ($existingNewsletter) {
                return response()->json([
                    'success' => false,
                    'message' => 'This email is already subscribed to our newsletter.',
                ], 409);
            }

            // Create new newsletter subscription
            $newsletter = Newsletter::create([
                'email' => $validated['email'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Thank you for subscribing to our newsletter!',
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Please provide a valid email address.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Newsletter subscription error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again later.',
            ], 500);
        }
    }

    // ------------------ Product Reviews ------------------
    public function storeProductReview(Request $request, $id)
    {
        try {
            $userId = Auth::id();
            if (! $userId) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // Validate the product exists
            $product = Product::find($id);
            if (! $product) {
                return response()->json(['message' => 'Product not found'], 404);
            }

            // Check if user already reviewed this product
            $existingReview = ProductReview::where('product_id', $id)
                ->where('user_id', $userId)
                ->first();

            if ($existingReview) {
                return response()->json([
                    'success' => false,
                    'message' => 'You have already reviewed this product.',
                ], 409);
            }

            $validated = $request->validate([
                'comment' => ['required', 'string', 'max:2000'],
                'rating'  => ['required', 'integer', 'min:1', 'max:5'],
                'images'  => ['nullable', 'string'], // For now, we'll store as JSON string
            ]);

            // Create the review
            $review = ProductReview::create([
                'product_id' => $id,
                'user_id'    => $userId,
                'comment'    => $validated['comment'],
                'rating'     => $validated['rating'],
                'images'     => $validated['images'] ?? null,
                'status'     => 1, // Active by default
            ]);

            // Load relationships for response
            $review->load(['user', 'product']);

            // Redirect back to the product details page with success message
            return redirect()->back()->with('success', 'Review submitted successfully!');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (\Exception $e) {
            Log::error('Product review submission error: ' . $e->getMessage());
            return redirect()->back()
                ->with('error', 'Something went wrong. Please try again later.');
        }
    }

    // ------------------ Cart API Methods ------------------
    public function updateCartItemQuantity(Request $request, $id)
    {
        try {
            $userId = Auth::id();
            if (! $userId) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            $validated = $request->validate([
                'quantity' => ['required', 'integer', 'min:1', 'max:999'],
            ]);

            // Get the cart for the current user
            $cart = $this->cartService->getOrCreateCart(null, $userId);

            // Find the cart item
            $cartItem = $cart->items()->where('id', $id)->first();

            if (! $cartItem) {
                // For Inertia requests, redirect back with error
                if ($request->header('X-Inertia')) {
                    return back()->with('error', 'Item not found in cart');
                }
                return response()->json(['message' => 'Item not found in cart'], 404);
            }

            // Update the quantity
            $cartItem->update(['quantity' => $validated['quantity']]);

            // Reload the cart with updated data
            $cart->load(['items.product', 'items.product.media']);

            // For Inertia requests, return back with cart data
            if ($request->header('X-Inertia')) {
                return back()->with([
                    'cart'    => $cart,
                    'success' => 'Quantity updated successfully',
                ]);
            }

            // For regular AJAX requests, return JSON
            return response()->json([
                'success' => true,
                'message' => 'Quantity updated successfully',
                'cart'    => $cart,
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // For Inertia requests
            if ($request->header('X-Inertia')) {
                return back()->withErrors($e->errors())->with('error', 'Validation failed');
            }

            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Cart item quantity update error: ' . $e->getMessage());

            // For Inertia requests
            if ($request->header('X-Inertia')) {
                return back()->with('error', 'Failed to update quantity');
            }

            return response()->json([
                'success' => false,
                'message' => 'Failed to update quantity',
            ], 500);
        }
    }

    public function removeCartItem(Request $request, $id)
    {
        try {
            $userId = Auth::id();
            if (! $userId) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // Get the cart for the current user
            $cart = $this->cartService->getOrCreateCart(null, $userId);

            // Find the cart item
            $cartItem = $cart->items()->where('id', $id)->first();

            if (! $cartItem) {
                // For Inertia requests, redirect back with error
                if ($request->header('X-Inertia')) {
                    return back()->with('error', 'Item not found in cart');
                }
                return response()->json(['message' => 'Item not found in cart'], 404);
            }

            // Remove the item
            $cartItem->delete();

            // Reload the cart with updated data
            $cart->load(['items.product', 'items.product.media']);

            // For Inertia requests, return back with cart data
            if ($request->header('X-Inertia')) {
                return back()->with([
                    'cart'    => $cart,
                    'success' => 'Item removed successfully',
                ]);
            }

            // For regular AJAX requests, return JSON
            return response()->json([
                'success' => true,
                'message' => 'Item removed successfully',
                'cart'    => $cart,
            ]);

        } catch (\Exception $e) {
            Log::error('Cart item removal error: ' . $e->getMessage());

            // For Inertia requests
            if ($request->header('X-Inertia')) {
                return back()->with('error', 'Failed to remove item');
            }

            return response()->json([
                'success' => false,
                'message' => 'Failed to remove item',
            ], 500);
        }
    }



    // responce all categories with just id name and slug
    public function getCategories()
    {
        $categories = \App\Models\Category::select('id', 'name', 'slug')->get();
        return response()->json($categories);
    }

    // =====User Dashboard Page====

    // =====User API Endpoints====
    // Get current user data
    public function getUserData()
    {
        try {
            $user = Auth::user();

            if (! $user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            return response()->json([
                'success' => true,
                'data'    => [
                    'id'            => $user->id,
                    'name'          => $user->name,
                    'email'         => $user->email,
                    'phone'         => $user->phone,
                    'role'          => $user->role,
                    'photo'         => $user->photo,
                    'photo_url'     => $user->photo ? asset('storage/' . $user->photo) : null,
                    'gender'        => $user->gender,
                    'date_of_birth' => $user->date_of_birth,
                    'is_verified'   => $user->is_verified,
                    'created_at'    => $user->created_at,
                    'updated_at'    => $user->updated_at,
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching user data: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch user data',
            ], 500);
        }
    }

    // Update user data
    public function updateUserData(Request $request)
    {
        try {
            $user = Auth::user();

            if (! $user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Validate the request
            $request->validate([
                'name'        => 'required|string|max:255',
                'email'       => 'required|string|email|max:255|unique:users,email,' . $user->id,
                'phone'       => 'nullable|string|max:20|unique:users,phone,' . $user->id,
                'gender'      => 'nullable|string|max:20',
                'dateOfBirth' => 'nullable|date',
            ]);

            // Update user data
            $user->update([
                'name'          => $request->name,
                'email'         => $request->email,
                'phone'         => $request->phone,
                'gender'        => $request->gender,
                'date_of_birth' => $request->dateOfBirth,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'User data updated successfully',
                'data'    => [
                    'id'            => $user->id,
                    'name'          => $user->name,
                    'email'         => $user->email,
                    'phone'         => $user->phone,
                    'gender'        => $user->gender,
                    'date_of_birth' => $user->date_of_birth,
                    'updated_at'    => $user->updated_at,
                ],
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error updating user data: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update user data',
            ], 500);
        }
    }

    // Upload profile picture
    public function uploadProfilePicture(Request $request)
    {
        try {
            $user = Auth::user();

            if (! $user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Validate the request
            $request->validate([
                'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // 2MB max
            ]);

            // Handle file upload
            if ($request->hasFile('avatar')) {
                $file = $request->file('avatar');

                // Generate unique filename
                $filename = 'avatar_' . $user->id . '_' . time() . '.' . $file->getClientOriginalExtension();

                // Store file in public/avatars directory
                $path = $file->storeAs('avatars', $filename, 'public');

                // Update user's photo field
                $user->update([
                    'photo' => $path,
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Profile picture uploaded successfully',
                    'data'    => [
                        'photo'     => $path,
                        'photo_url' => asset('storage/' . $path),
                    ],
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'No file uploaded',
            ], 400);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error uploading profile picture: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload profile picture',
            ], 500);
        }
    }

    // Change user password
    public function changePassword(Request $request)
    {
        try {
            $user = Auth::user();

            if (! $user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Validate the request
            $request->validate([
                'current_password'          => 'required|string',
                'new_password'              => 'required|string|min:8|confirmed',
                'new_password_confirmation' => 'required|string|min:8',
            ]);

            // Check if current password is correct
            if (! Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Current password is incorrect',
                ], 400);
            }

            // Update password
            $user->update([
                'password' => Hash::make($request->new_password),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Password changed successfully',
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error changing password: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to change password',
            ], 500);
        }
    }

    // =====Order API Endpoints====
    // Get user orders with pagination and filtering
    public function getUserOrders(Request $request)
    {
        try {
            $user = Auth::user();
            if (! $user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            $query = Order::with(['orderItems.product', 'orderItems.product.media', 'division', 'district', 'upazilla'])
                ->where('user_id', $user->id)
                ->orderBy('created_at', 'desc');

            // Apply status filter
            if ($request->has('status') && $request->status !== 'all') {
                $query->where('status', $request->status);
            }

            // Apply search filter
            if ($request->has('search') && $request->search) {
                $searchTerm = $request->search;
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('order_number', 'like', "%{$searchTerm}%")
                        ->orWhere('invoice_no', 'like', "%{$searchTerm}%")
                        ->orWhereHas('orderItems', function ($itemQuery) use ($searchTerm) {
                            $itemQuery->where('product_name', 'like', "%{$searchTerm}%");
                        });
                });
            }

            $orders = $query->paginate(15);

            // Transform orders data
            $transformedOrders = $orders->map(function ($order) {
                return [
                    'id'                 => $order->id,
                    'order_number'       => $order->order_number ?: 'ORD-' . str_pad($order->id, 6, '0', STR_PAD_LEFT),
                    'date'               => $order->order_date ? $order->order_date->format('Y-m-d') : $order->created_at->format('Y-m-d'),
                    'status'             => $order->status,
                    'total'              => (float) $order->amount,
                    'currency'           => $order->currency,
                    'items'              => $order->orderItems->count(),
                    'tracking_number'    => $this->generateTrackingNumber($order),
                    'estimated_delivery' => $this->getEstimatedDelivery($order),
                    'actual_delivery'    => $order->delivered_date ? $order->delivered_date->format('Y-m-d') : null,
                    'products'           => $order->orderItems->map(function ($item) {
                        return [
                            'id'          => $item->id,
                            'product_id'  => $item->product_id,
                            'name'        => $item->product_name,
                            'image'       => $this->getProductImage($item),
                            'price'       => (float) $item->unit_price,
                            'quantity'    => (int) $item->quantity,
                            'total_price' => (float) $item->total_price,
                            'color'       => $item->color,
                            'size'        => $item->size,
                            'sku'         => $item->product_sku,
                            'options'     => $item->options,
                            'rating'      => 0,     // TODO: Implement product rating
                            'reviewed'    => false, // TODO: Implement review status
                        ];
                    }),
                    'shipping_address'   => [
                        'name'      => $order->name,
                        'email'     => $order->email,
                        'phone'     => $order->phone,
                        'address'   => $order->address,
                        'post_code' => $order->post_code,
                        'division'  => $order->division ? $order->division->name : null,
                        'district'  => $order->district ? $order->district->name : null,
                        'upazilla'  => $order->upazilla ? $order->upazilla->name : null,
                    ],
                    'payment_info'       => [
                        'method'         => $order->payment_method,
                        'type'           => $order->payment_type,
                        'status'         => $order->payment_status,
                        'transaction_id' => $order->transaction_id,
                    ],
                    'timeline'           => [
                        'order_date'      => $order->order_date ? $order->order_date->format('Y-m-d H:i:s') : null,
                        'confirmed_date'  => $order->confirmed_date,
                        'processing_date' => $order->processing_date,
                        'shipped_date'    => $order->shipped_date,
                        'delivered_date'  => $order->delivered_date ? $order->delivered_date->format('Y-m-d H:i:s') : null,
                        'cancel_date'     => $order->cancel_date,
                    ],
                ];
            });

            return response()->json([
                'success' => true,
                'data'    => [
                    'orders'     => $transformedOrders,
                    'pagination' => [
                        'current_page' => $orders->currentPage(),
                        'last_page'    => $orders->lastPage(),
                        'per_page'     => $orders->perPage(),
                        'total'        => $orders->total(),
                    ],
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching user orders: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch orders',
            ], 500);
        }
    }

    // Get order statistics
    public function getOrderStatistics()
    {
        try {
            $user = Auth::user();
            if (! $user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            $userId = $user->id;

            $stats = [
                'total_orders' => Order::where('user_id', $userId)->count(),
                'delivered'    => Order::where('user_id', $userId)->where('status', 'delivered')->count(),
                'shipped'      => Order::where('user_id', $userId)->where('status', 'shipped')->count(),
                'processing'   => Order::where('user_id', $userId)->where('status', 'processing')->count(),
                'cancelled'    => Order::where('user_id', $userId)->where('status', 'canceled')->count(),
                'pending'      => Order::where('user_id', $userId)->where('status', 'pending')->count(),
            ];

            return response()->json([
                'success' => true,
                'data'    => $stats,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching order statistics: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch order statistics',
            ], 500);
        }
    }

    // Get single order details
    public function getOrderDetails($orderId)
    {
        try {
            $user = Auth::user();
            if (! $user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            $order = Order::with(['orderItems.product', 'orderItems.product.media', 'division', 'district', 'upazilla'])
                ->where('id', $orderId)
                ->where('user_id', $user->id)
                ->first();

            if (! $order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Order not found',
                ], 404);
            }

            $orderData = [
                'id'                 => $order->id,
                'order_number'       => $order->order_number ?: 'ORD-' . str_pad($order->id, 6, '0', STR_PAD_LEFT),
                'date'               => $order->order_date ? $order->order_date->format('Y-m-d') : $order->created_at->format('Y-m-d'),
                'status'             => $order->status,
                'total'              => (float) $order->amount,
                'currency'           => $order->currency,
                'items'              => $order->orderItems->count(),
                'tracking_number'    => $this->generateTrackingNumber($order),
                'estimated_delivery' => $this->getEstimatedDelivery($order),
                'actual_delivery'    => $order->delivered_date ? $order->delivered_date->format('Y-m-d') : null,
                'products'           => $order->orderItems->map(function ($item) {
                    return [
                        'id'          => $item->id,
                        'product_id'  => $item->product_id,
                        'name'        => $item->product_name,
                        'image'       => $this->getProductImage($item),
                        'price'       => (float) $item->unit_price,
                        'quantity'    => (int) $item->quantity,
                        'total_price' => (float) $item->total_price,
                        'color'       => $item->color,
                        'size'        => $item->size,
                        'sku'         => $item->product_sku,
                        'options'     => $item->options,
                        'rating'      => 0,     // TODO: Implement product rating
                        'reviewed'    => false, // TODO: Implement review status
                    ];
                }),
                'shipping_address'   => [
                    'name'      => $order->name,
                    'email'     => $order->email,
                    'phone'     => $order->phone,
                    'address'   => $order->address,
                    'post_code' => $order->post_code,
                    'division'  => $order->division ? $order->division->name : null,
                    'district'  => $order->district ? $order->district->name : null,
                    'upazilla'  => $order->upazilla ? $order->upazilla->name : null,
                ],
                'payment_info'       => [
                    'method'         => $order->payment_method,
                    'type'           => $order->payment_type,
                    'status'         => $order->payment_status,
                    'transaction_id' => $order->transaction_id,
                ],
                'timeline'           => [
                    'order_date'      => $order->order_date ? $order->order_date->format('Y-m-d H:i:s') : null,
                    'confirmed_date'  => $order->confirmed_date,
                    'processing_date' => $order->processing_date,
                    'shipped_date'    => $order->shipped_date,
                    'delivered_date'  => $order->delivered_date ? $order->delivered_date->format('Y-m-d H:i:s') : null,
                    'cancel_date'     => $order->cancel_date,
                ],
            ];

            return response()->json([
                'success' => true,
                'data'    => $orderData,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching order details: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch order details',
            ], 500);
        }
    }

    // Cancel order
    public function cancelOrder($orderId)
    {
        try {
            $user = Auth::user();
            if (! $user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            $order = Order::where('id', $orderId)
                ->where('user_id', $user->id)
                ->first();

            if (! $order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Order not found',
                ], 404);
            }

            if (! in_array($order->status, ['pending', 'processing'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Order cannot be cancelled at this stage',
                ], 400);
            }

            $order->update([
                'status'      => 'canceled',
                'cancel_date' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Order cancelled successfully',
            ]);
        } catch (\Exception $e) {
            Log::error('Error cancelling order: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to cancel order',
            ], 500);
        }
    }

    // Helper methods
    private function generateTrackingNumber($order)
    {
        if ($order->status === 'shipped' || $order->status === 'delivered') {
            return 'TRK' . strtoupper(substr(md5($order->id . $order->created_at), 0, 9));
        }
        return null;
    }

    private function getEstimatedDelivery($order)
    {
        if ($order->status === 'delivered') {
            return $order->delivered_date ? $order->delivered_date->format('Y-m-d') : null;
        }

        // Add 3-7 days to order date for estimated delivery
        $orderDate = $order->order_date ?: $order->created_at;
        return $orderDate->addDays(rand(3, 7))->format('Y-m-d');
    }

    private function getProductImage($orderItem)
    {
        if ($orderItem->product && $orderItem->product->media && $orderItem->product->media->count() > 0) {
            $firstImage = $orderItem->product->media->first();
            return asset('storage/' . $firstImage->file_path);
        }
        return '/placeholder.svg';
    }

    // ===== Cart modal Product ===

    public function getRandomProducts(Request $request)
    {
        $limit     = $request->input('limit', 10);
        $excludeId = $request->input('exclude_id', null);

        $query = Product::with(['brand', 'productReviews', 'category', 'multiImages'])
            ->where('status', 1); // Only active products

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        $products = $query->inRandomOrder()
            ->limit($limit)
            ->get()
            ->map(function ($product) {
                // Calculate average rating
                $avgRating    = $product->productReviews->avg('rating') ?? 0;
                $reviewsCount = $product->productReviews->count();

                // Calculate final price with discount
                $finalPrice    = $product->final_price ?? $product->unit_price;
                $originalPrice = $product->unit_price;

                return [
                    'id'            => $product->id,
                    'name'          => $product->name,
                    'price'         => $finalPrice,
                    'originalPrice' => $originalPrice > $finalPrice ? $originalPrice : null,
                    'rating'        => round($avgRating, 1),
                    'reviews'       => $reviewsCount,
                    'image'         => $product->image_url ?? '/placeholder.svg',
                    'slug'          => $product->slug,
                ];
            });

        return response()->json($products);
    }

}
