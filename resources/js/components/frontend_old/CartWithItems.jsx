import CartFooter from '@/components/frontend/cart/CartFooter.jsx';

const CartWithItems = ({
    timeLeft,
    subtotal,
    moneyForFreeship,
    CartData,
    removeItem,
    updateQuantity,
    appliedCoupon,
    setAppliedCoupon,
    discountAmount,
    shippingCost,
    total,
    onCloseCart,
    activeTab,
    setActiveTab,
    note,
    setNote,
    shippingInfo,
    handleShippingInfoChange,
    calculateShipping,
    couponCode,
    setCouponCode,
    applyCoupon,
    availableCoupons,
}) => {
    return (
        <>
            <div className="time px-6">
                <div className="flex items-center gap-3 rounded-lg bg-green-100 px-5 py-3">
                    <p className="text-3xl">🔥</p>
                    <div className="text-sm">
                        Your cart will expire in{' '}
                        <span className="font-semibold text-red-500">
                            {timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
                        </span>{' '}
                        minutes!
                        <br />
                        Please checkout now before your items sell out!
                    </div>
                </div>
            </div>

            <div className="banner mt-3 px-6">
                <div className="text">
                    {subtotal < moneyForFreeship ? (
                        <>
                            Buy <span className="font-medium text-blue-600">${(moneyForFreeship - subtotal).toFixed(2)}</span>
                            <span> more to get </span>
                            <span className="font-medium text-blue-600">free shipping</span>
                        </>
                    ) : (
                        <span className="font-medium text-green-600">You've qualified for free shipping!</span>
                    )}
                </div>
                <div className="mt-3 h-2.5 w-full rounded-full bg-gray-200">
                    <div
                        className="h-2.5 rounded-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${Math.min((subtotal / moneyForFreeship) * 100, 100)}%` }}
                    ></div>
                </div>
            </div>

            <div className="list-product max-h-64 overflow-y-auto px-6">
                {CartData.map((item) => (
                    <CartItem key={item.id} item={item} removeItem={removeItem} updateQuantity={updateQuantity} />
                ))}
            </div>

            <CartFooter
                appliedCoupon={appliedCoupon}
                setAppliedCoupon={setAppliedCoupon}
                subtotal={subtotal}
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
        </>
    );
};

const CartItem = ({ item, removeItem, updateQuantity }) => (
    <div className="item flex items-center justify-between gap-3 border-b border-gray-200 py-5">
        <div className="flex w-full items-center gap-3">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                <img src={item.product.image_url} alt={item.product.name} className="h-full w-full object-cover" />
            </div>
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <div className="font-medium">{item.product.name}</div>
                    <button className="cursor-pointer text-sm font-semibold text-red-500 underline" onClick={() => removeItem(item.id)}>
                        Remove
                    </button>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                    <div className="text-gray-500 capitalize">
                        {item.size || 'M'}/{item.color || 'default'}
                    </div>
                </div>
                <div className="mt-3 flex w-full items-center justify-between">
                    <div className="quantity-controls flex items-center overflow-hidden rounded-md border border-gray-300">
                        <button className="bg-gray-100 px-2 py-1 hover:bg-gray-200" onClick={() => updateQuantity(item.id, item.qty - 1)}>
                            -
                        </button>
                        <span className="px-4 py-1 text-center">{item.qty}</span>
                        <button className="bg-gray-100 px-2 py-1 hover:bg-gray-200" onClick={() => updateQuantity(item.id, item.qty + 1)}>
                            +
                        </button>
                    </div>
                    <div className="font-semibold">${(Math.abs(item.price) * item.qty).toFixed(2)}</div>
                </div>
            </div>
        </div>
    </div>
);

export default CartWithItems;
// Additional component definitions for TabButton, NoteTab, ShippingTab, and CouponTab would go here
// They would contain the JSX that was previously in the conditional renders