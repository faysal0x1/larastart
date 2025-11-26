import React from "react";
import CouponItem from "./CouponItem";
import PromoCode from "./PromoCode";

const SideBar = ({
    coupons,
    appliedCoupons,
    onApplyCoupon,
    onRemoveCoupon,
    promoCode,
    setPromoCode,
    onApplyPromoCode,
    appliedPromoCode,
    onRemovePromoCode,
    orderSummary,
    onPlaceOrder,
    placeOrderLoading,
    paymentStatus
}) => {
    return (
        <div className=" dark:bg-slate-800  p-4 md:p-6">
            <h6 className="text-2xl font-bold mb-6">Order Summary</h6>

            {/* {coupons.map((coupon) => (
                <CouponItem coupon={coupon} key={coupon.id} isApplied={appliedCoupons.includes(coupon.id)} onApply={onApplyCoupon} onRemove={onRemoveCoupon} />
            ))} */}

            <PromoCode promoCode={promoCode} setPromoCode={setPromoCode} onApplyPromoCode={onApplyPromoCode} appliedPromoCode={appliedPromoCode} onRemovePromoCode={onRemovePromoCode} />

            <hr className="dark:border-slate-700 my-6" />

            <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center text-sm">
                    <span>Subtotal</span>
                    <span>৳{orderSummary.subtotal.toFixed(2)}</span>
                </div>
                {orderSummary.couponDiscount > 0 && (
                    <div className="flex justify-between items-center text-sm text-green-600">
                        <span>Coupon Discount</span>
                        <span>-৳{orderSummary.couponDiscount.toFixed(2)}</span>
                    </div>
                )}
                {orderSummary.promoDiscount > 0 && (
                    <div className="flex justify-between items-center text-sm text-green-600">
                        <span>Promo Discount</span>
                        <span>-৳{orderSummary.promoDiscount.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between items-center text-sm">
                    <span>Shipping</span>
                    <span>৳{orderSummary.shipping.toFixed(2)}</span>
                </div>
            </div>

            <hr className="dark:border-slate-700 my-4" />
            <div className="flex justify-between items-center">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold">৳{orderSummary.total.toFixed(2)}</span>
            </div>

            <button onClick={onPlaceOrder} disabled={placeOrderLoading} className={`bg-blue-600 text-white w-full rounded-md py-3 px-4 mt-6 ${placeOrderLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'}`}>
                {placeOrderLoading ? 'Processing…' : 'Pay with SSLCommerz'}
            </button>
            {paymentStatus && (
                <div className={`mt-2 text-sm ${paymentStatus.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                    {paymentStatus.message}
                </div>
            )}
        </div>
    );
};

export default SideBar;


