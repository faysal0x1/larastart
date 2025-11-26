import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const PromoCode = ({ promoCode, setPromoCode, onApplyPromoCode, appliedPromoCode, onRemovePromoCode }) => (
    <div className="mt-3">
        <p className="text-sm mb-1">Promo Code</p>
        <div className="flex h-10">
            <input type="text" className="bg-blue-100 dark:bg-slate-700 border-none focus:outline-none h-full flex-grow rounded-md p-3 mr-2" placeholder="Enter promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} disabled={appliedPromoCode} />
            <button className={`px-4 py-2 leading-none h-full rounded-md ${appliedPromoCode ? "text-red-600 hover:text-white border border-red-600 hover:bg-red-600" : "text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600"}`} type="button" onClick={appliedPromoCode ? onRemovePromoCode : onApplyPromoCode}>
                {appliedPromoCode ? "Remove" : "Apply"}
            </button>
        </div>
        {appliedPromoCode && (
            <p className="text-green-600 text-xs mt-1">
                <FontAwesomeIcon icon={faCheck} className="mr-1" />
                Promo code applied: {appliedPromoCode}
            </p>
        )}
    </div>
);

export default PromoCode;


