const CouponTab = ({ couponCode, setCouponCode, applyCoupon, availableCoupons, setActiveTab }) => (
    <div className="absolute right-0 bottom-0 left-0 z-10 border-t border-gray-200 bg-white px-6 py-4">
        <div className="flex cursor-pointer items-center gap-3">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
            </svg>
            <div className="text-sm">Apply Coupon</div>
        </div>
        <div className="form pt-4">
            <div className="mb-4">
                <label htmlFor="coupon-code" className="mb-1 block text-sm font-medium text-gray-700">
                    Enter your coupon code:
                </label>
                <div className="flex">
                    <input
                        type="text"
                        id="coupon-code"
                        className="flex-grow rounded-l-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                        className="rounded-r-md bg-black px-4 text-white transition-colors hover:bg-gray-800"
                        onClick={applyCoupon}
                    >
                        Apply
                    </button>
                </div>
            </div>

            <div className="available-coupons mt-6">
                <div className="mb-3 text-sm font-medium text-gray-700">Available coupons:</div>
                <div className="space-y-3">
                    {availableCoupons.map((coupon, index) => (
                        <div
                            key={index}
                            className="cursor-pointer rounded-md border border-gray-200 bg-gray-50 p-3 hover:bg-gray-100"
                            onClick={() => {
                                setCouponCode(coupon.code);
                                applyCoupon();
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="font-semibold text-blue-600">{coupon.code}</div>
                                <div className="text-xs text-gray-500">Click to apply</div>
                            </div>
                            <div className="mt-1 text-sm text-gray-600">{coupon.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="block-button pt-4 pb-6 text-center">
            <button
                onClick={() => setActiveTab('')}
                className="relative inline-block cursor-pointer text-center text-blue-600 uppercase transition-colors before:absolute before:right-0 before:bottom-0 before:left-0 before:h-px before:bg-blue-600 before:content-[''] hover:text-blue-800"
            >
                Cancel
            </button>
        </div>
    </div>
);

export default CouponTab;