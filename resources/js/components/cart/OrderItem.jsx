import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Quantity from "./Quantity";

const OrderItem = ({ item, onQuantityChange, onRemove }) => {
    return (
        <div className="flex items-center gap-4 py-4">
            <img
                src={item.img}
                alt={item.title}
                className="w-20 h-20 object-contain rounded-md border border-gray-200 dark:border-gray-700"
            />
            <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                    <a
                        href="#!"
                        className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                        {item.title}
                    </a>
                    <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p><span className="font-medium">Options:</span> {item.options || 'N/A'}</p>
                        <p><span className="font-medium">Cooling Device:</span> {item.coolingDevice || 'N/A'}</p>
                        <p><span className="font-medium">Category:</span> {item.category || 'N/A'}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center sm:items-end gap-3">
                    <Quantity
                        quantity={item.quantity}
                        onQuantityChange={onQuantityChange}
                        itemId={item.id}
                    />
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        ৳{item.bdPrice.toFixed(2)}
                    </div>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="inline-flex items-center text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 px-3 py-1 rounded-md transition-colors"
                    >
                        <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

OrderItem.propTypes = {
    item: PropTypes.object.isRequired,
    onQuantityChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default OrderItem;
