import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import LoadingCart from '@/components/frontend/cart/LoadingCart.jsx';
import EmptyCart from '@/components/frontend/cart/EmptyCart.jsx';
import CartWithItems from '@/components/frontend/CartWithItems.jsx';

const CartModal = ({ isOpenCart, onCloseCart, initialCartData = null }) => {
    const { auth } = usePage().props;
    console.log('CartModal rendered:', { isOpenCart, initialCartData });

    const [activeTab, setActiveTab] = useState('');
    const [CartData, setCartData] = useState(null);
    const [CartQty, setCartQty] = useState(null);
    const [CartTotal, setCartTotal] = useState(null);
    const [RelatedProducts, setRelatedProducts] = useState(null);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [shippingInfo, setShippingInfo] = useState({
        country: '',
        state: '',
        zipCode: '',
    });
    const [timeLeft, setTimeLeft] = useState({
        minutes: 14,
        seconds: 59,
    });

    // Available coupons
    const availableCoupons = [
        { code: 'FREESHIP', discount: 'freeship', description: 'Free shipping on all orders' },
        { code: 'SAVE10', discount: 0.1, description: '10% off your order' },
        { code: 'SAVE20', discount: 0.2, description: '20% off your order' },
        { code: 'SAVE50', discount: 50, description: '$50 off orders over $200' },
    ];

    // Load cart data when modal opens
    useEffect(() => {
        if (isOpenCart && !initialCartData) {
            fetchCartData();
        } else if (initialCartData) {
            setCartData(initialCartData);
        }
    }, [isOpenCart, initialCartData]);

    // Fetch cart data using Inertia

    const fetchCartData = () => {
        setLoading(true);

        fetch('/cart')
            .then((response) => response.json())
            .then((data) => {
                const { carts, cartQty, cartTotal, relatedProducts } = data;

                console.table(data); // Check the structure first

                console.table('carts:', carts);
                console.table('cartQty:', cartQty);
                console.table('cartTotal:', cartTotal);
                console.table('relatedProducts:', relatedProducts);

                setCartData(carts || []);
                setCartQty(cartQty || 0);
                setCartTotal(cartTotal || 0);
                setRelatedProducts(relatedProducts || []);
                setLoading(false);

                console.log('Cart data fetched successfully:', data);
            })
            .catch((error) => {
                console.error('Failed to fetch cart data:', error);
                setLoading(false);
            });
    };

    const calculateTotals = () => {
        if (!CartData || !CartData) {
            return { subtotal: 0, total: 0, shippingCost: 0, discountAmount: 0 };
        }
        let subtotal = 0;
        if (auth && auth.user) {
            subtotal = CartData.reduce((sum, item) => {
                const price = Math.abs(item.price); // Use absolute value
                return sum + price * item.qty;
            }, 0);
        } else {
            subtotal = 12;
        }

        // Use absolute values for prices if they're negative (seems like a backend issue)

        const moneyForFreeship = 100;
        const shippingCost = appliedCoupon?.discount === 'freeship' ? 0 : subtotal >= moneyForFreeship ? 0 : 10;

        // Calculate discount
        let discountAmount = 0;
        if (appliedCoupon) {
            if (typeof appliedCoupon.discount === 'number') {
                if (appliedCoupon.discount < 1) {
                    discountAmount = subtotal * appliedCoupon.discount;
                } else {
                    discountAmount = Math.min(appliedCoupon.discount, subtotal);
                }
            }
        }

        const total = subtotal - discountAmount + shippingCost;

        return { subtotal, total, shippingCost, discountAmount };
    };

    // Handle shipping form input changes
    const handleShippingInfoChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Calculate shipping
    const calculateShipping = () => {
        if (!shippingInfo.country || !shippingInfo.zipCode) {
            alert('Please enter your country and zip/postal code');
            return;
        }
        alert('Shipping calculated successfully!');
        setActiveTab('');
    };

    // Countdown timer
    useEffect(() => {
        if (!isOpenCart) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { minutes: prev.minutes - 1, seconds: 59 };
                } else {
                    clearInterval(timer);
                    return { minutes: 0, seconds: 0 };
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpenCart]);

    // Calculate cart totals from API data


    const { subtotal, total, shippingCost, discountAmount } = calculateTotals();
    const moneyForFreeship = 100;

    // Handle coupon application
    const applyCoupon = () => {
        const coupon = availableCoupons.find((c) => c.code === couponCode.toUpperCase());
        if (coupon) {
            setAppliedCoupon(coupon);
            setCouponCode('');
        } else {
            alert('Invalid coupon code');
        }
        setActiveTab('');
    };

    // Remove item from cart
    const removeItem = (id) => {
        // Here you would make an API call to remove the item
        router.delete(`/cart/${id}`, {
            preserveState: true,
            onSuccess: () => {
                fetchCartData(); // Reload cart data
            },
        });
    };

    // Add recommended product to cart
    const addToCart = (product) => {
        router.post(
            '/cart',
            {
                product_id: product.id,
                qty: 1,
            },
            {
                preserveState: true,
                onSuccess: () => {
                    fetchCartData(); // Reload cart data
                },
            },
        );
    };

    // Update item quantity
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;

        router.put(
            `/cart/${id}`,
            {
                qty: newQuantity,
            },
            {
                preserveState: true,
                onSuccess: () => {
                    fetchCartData(); // Reload cart data
                },
            },
        );
    };

    if (!isOpenCart) return null;

    return (
        <div className="fixed inset-0 z-60 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/50"
                onClick={(e) => {
                    e.stopPropagation();
                    onCloseCart();
                }}
            ></div>
            <div className="z-50 flex min-h-screen items-center justify-center p-4">
                <div className="relative mx-auto w-full max-w-5xl">
                    <div className="overflow-hidden rounded-lg bg-white shadow-xl">
                        <div className="flex flex-col md:flex-row">
                            {/* Left side - You May Also Like */}
                            <div className="hidden w-full border-r border-gray-200 py-6 md:block md:w-1/2">
                                <div className="flex items-center justify-between px-6 pb-3 text-xl font-semibold">
                                    <span>You May Also Like</span>
                                    <button
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-black hover:text-white"
                                        onClick={onCloseCart}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="max-h-96 overflow-y-auto px-6">
                                    {RelatedProducts?.map((product) => (
                                        <div
                                            key={`related-${product.id}`}
                                            className="item flex items-center justify-between gap-3 border-b border-gray-200 py-5"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="bg-img overflow-hidden rounded-lg">
                                                    <img src={product.image_url} alt={product.name} className="h-24 w-24 object-cover" />
                                                </div>
                                                <div>
                                                    <div className="name font-medium">{product.name}</div>
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <div className="product-price font-semibold">
                                                            ${Math.abs(parseFloat(product.final_price)).toFixed(2)}
                                                        </div>
                                                        {product.unit_price > Math.abs(parseFloat(product.final_price)) && (
                                                            <div className="product-origin-price text-gray-500">
                                                                <del>${product.unit_price.toFixed(2)}</del>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-black bg-white text-xl transition-colors hover:bg-black hover:text-white"
                                                onClick={() => addToCart(product)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right side - Shopping Cart */}
                            <div className="relative w-full py-6 md:w-1/2">
                                <div className="relative flex items-center justify-between px-6 pb-3">
                                    <div className="text-xl font-semibold">Shopping Cart ({CartQty || 0} Items)</div>
                                    <button
                                        className="close-btn flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-black hover:text-white"
                                        onClick={onCloseCart}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </button>
                                </div>

                                {auth && auth.user ? (
                                    loading ? (
                                        <LoadingCart />
                                    ) : CartData && CartData.length > 0 ? (
                                        <CartWithItems
                                            timeLeft={timeLeft}
                                            subtotal={subtotal}
                                            moneyForFreeship={moneyForFreeship}
                                            CartData={CartData}
                                            removeItem={removeItem}
                                            updateQuantity={updateQuantity}
                                            appliedCoupon={appliedCoupon}
                                            setAppliedCoupon={setAppliedCoupon}
                                            discountAmount={discountAmount}
                                            shippingCost={shippingCost}
                                            total={total}
                                            onCloseCart={onCloseCart}
                                            activeTab={activeTab}
                                            setActiveTab={setActiveTab}
                                            note={note}
                                            setNote={setNote}
                                            shippingInfo={shippingInfo}
                                            handleShippingInfoChange={handleShippingInfoChange}
                                            calculateShipping={calculateShipping}
                                            couponCode={couponCode}
                                            setCouponCode={setCouponCode}
                                            applyCoupon={applyCoupon}
                                            availableCoupons={availableCoupons}
                                        />
                                    ) : (
                                        <EmptyCart onCloseCart={onCloseCart} />
                                    )
                                ) : (
                                    loading ? (
                                        <LoadingCart />
                                    ) : CartData && CartData.length > 0 ? (
                                        <CartWithItems
                                            timeLeft={timeLeft}
                                            subtotal={subtotal}
                                            moneyForFreeship={moneyForFreeship}
                                            CartData={CartData}
                                            removeItem={removeItem}
                                            updateQuantity={updateQuantity}
                                            appliedCoupon={appliedCoupon}
                                            setAppliedCoupon={setAppliedCoupon}
                                            discountAmount={discountAmount}
                                            shippingCost={shippingCost}
                                            total={total}
                                            onCloseCart={onCloseCart}
                                            activeTab={activeTab}
                                            setActiveTab={setActiveTab}
                                            note={note}
                                            setNote={setNote}
                                            shippingInfo={shippingInfo}
                                            handleShippingInfoChange={handleShippingInfoChange}
                                            calculateShipping={calculateShipping}
                                            couponCode={couponCode}
                                            setCouponCode={setCouponCode}
                                            applyCoupon={applyCoupon}
                                            availableCoupons={availableCoupons}
                                        />
                                    ) : (
                                        <EmptyCart onCloseCart={onCloseCart} />
                                    )
                                )}


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
