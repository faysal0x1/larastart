import CouponTab from '@/components/frontend/cart/CouponTab.jsx';
import ShippingTab from '@/components/frontend/cart/ShippingTab.jsx';
import TabButton from '@/components/frontend/cart/TabButton.jsx';
import NoteTab from '@/components/frontend/cart/NoteTab.jsx';

const CartFooter = ({
    appliedCoupon,
    setAppliedCoupon,
    subtotal,
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
        <div className="footer-modal bg-white">
            <div className="flex items-center justify-center gap-8 border-b border-gray-200 px-6 py-4">
                <TabButton icon="user" label="Note" activeTab={activeTab} setActiveTab={setActiveTab} tabName="note" />
                <TabButton icon="shipping" label="Shipping" activeTab={activeTab} setActiveTab={setActiveTab} tabName="shipping" />
                <TabButton icon="coupon" label="Coupon" activeTab={activeTab} setActiveTab={setActiveTab} tabName="coupon" />
            </div>

            {appliedCoupon && (
                <div className="flex items-center justify-between bg-green-100 px-6 py-3 text-sm text-green-800">
                    <div>
                        Coupon applied: <span className="font-semibold">{appliedCoupon.code}</span> - {appliedCoupon.description}
                    </div>
                    <button className="text-red-600 hover:text-red-800" onClick={() => setAppliedCoupon(null)}>
                        Remove
                    </button>
                </div>
            )}

            <div className="space-y-3 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-gray-600">Subtotal</div>
                    <div className="font-medium">${subtotal.toFixed(2)}</div>
                </div>

                {discountAmount > 0 && (
                    <div className="flex items-center justify-between">
                        <div className="text-gray-600">Discount</div>
                        <div className="font-medium text-green-600">-${discountAmount.toFixed(2)}</div>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div className="text-gray-600">Shipping</div>
                    <div className="font-medium">
                        {shippingCost === 0 ? <span className="text-green-600">Free</span> : `$${shippingCost.toFixed(2)}`}
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                    <div className="text-lg font-semibold">Total</div>
                    <div className="text-lg font-semibold">${total.toFixed(2)}</div>
                </div>
            </div>

            <div className="block-button p-6 text-center">
                <div className="flex items-center gap-4">
                    <button
                        className="button-main basis-1/2 rounded-lg border border-black bg-white px-4 py-3 text-center text-black uppercase transition-colors hover:bg-gray-100"
                        onClick={onCloseCart}
                    >
                        View cart
                    </button>
                    <button className="button-main basis-1/2 rounded-lg bg-black px-4 py-3 text-center text-white uppercase transition-colors hover:bg-gray-800">
                        Check Out
                    </button>
                </div>
                <button
                    onClick={onCloseCart}
                    className="relative mt-4 inline-block cursor-pointer text-center text-blue-600 uppercase transition-colors before:absolute before:right-0 before:bottom-0 before:left-0 before:h-px before:bg-blue-600 before:content-[''] hover:text-blue-800"
                >
                    Or continue shopping
                </button>
            </div>

            {activeTab === 'note' && <NoteTab note={note} setNote={setNote} setActiveTab={setActiveTab} />}

            {activeTab === 'shipping' && (
                <ShippingTab
                    shippingInfo={shippingInfo}
                    handleShippingInfoChange={handleShippingInfoChange}
                    calculateShipping={calculateShipping}
                    setActiveTab={setActiveTab}
                />
            )}

            {activeTab === 'coupon' && (
                <CouponTab
                    couponCode={couponCode}
                    setCouponCode={setCouponCode}
                    applyCoupon={applyCoupon}
                    availableCoupons={availableCoupons}
                    setActiveTab={setActiveTab}
                />
            )}
        </div>
    );
};

export default CartFooter;
