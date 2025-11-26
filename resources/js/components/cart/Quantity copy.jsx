import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const Quantity = ({ quantity, onIncrease, onDecrease, onQuantityChange }) => {
    return (
        <div className="flex items-center">
            <button className="w-8 h-8 bg-slate-200 dark:bg-slate-600 bg-opacity-80 dark:bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-opacity-100 flex justify-center items-center rounded-full font-bold" type="button" onClick={onDecrease} disabled={quantity <= 1}>
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <input type="number" className="bg-transparent text-center pl-3 font-bold w-12" placeholder="" value={quantity} onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)} min="1" />
            <button className="w-8 h-8 bg-slate-200 dark:bg-slate-600 bg-opacity-80 dark:bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-opacity-100 flex justify-center items-center rounded-full font-bold" type="button" onClick={onIncrease}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
};

export default Quantity;


