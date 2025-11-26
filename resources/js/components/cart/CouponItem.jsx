import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar, faCheck } from "@fortawesome/free-solid-svg-icons";

const CouponItem = ({ coupon, isApplied, onApply, onRemove }) => (
    <div className="flex justify-between items-center mb-2">
        <span>
            <FontAwesomeIcon icon={faFileInvoiceDollar} className="mr-2 text-blue-600" />
            {coupon.value}
            {isApplied && (
                <span className="ml-2 text-green-600 text-xs">
                    <FontAwesomeIcon icon={faCheck} className="mr-1" />
                    Applied
                </span>
            )}
        </span>
        <span>
            {isApplied ? (
                <button onClick={() => onRemove(coupon.id)} className="text-red-600 hover:underline font-medium">
                    Remove
                </button>
            ) : (
                <button onClick={() => onApply(coupon.id)} className="text-blue-600 hover:underline font-medium">
                    Apply
                </button>
            )}
        </span>
    </div>
);

CouponItem.propTypes = {
    coupon: PropTypes.object.isRequired,
    isApplied: PropTypes.bool.isRequired,
    onApply: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default CouponItem;


