import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const Quantity = ({ quantity, onQuantityChange, itemId }) => {
    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        onQuantityChange(itemId, newQuantity);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            onQuantityChange(itemId, newQuantity);
        }
    };

    const handleInputChange = (e) => {
        const newQuantity = parseInt(e.target.value) || 1;
        if (newQuantity >= 1) {
            onQuantityChange(itemId, newQuantity);
        }
    };

    return (
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
            <button
                className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
                type="button"
                onClick={handleDecrease}
                disabled={quantity <= 1}
            >
                <FontAwesomeIcon icon={faMinus} className="text-sm" />
            </button>
            <input
                type="number"
                className="w-12 text-center bg-transparent font-medium text-gray-900 dark:text-gray-100 focus:outline-none"
                value={quantity}
                onChange={handleInputChange}
                min="1"
            />
            <button
                className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                type="button"
                onClick={handleIncrease}
            >
                <FontAwesomeIcon icon={faPlus} className="text-sm" />
            </button>
        </div>
    );
};

export default Quantity;
