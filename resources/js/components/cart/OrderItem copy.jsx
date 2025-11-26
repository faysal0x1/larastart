import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Quantity from "./Quantity";

const OrderItem = ({ item, onQuantityChange, onRemove }) => {
    return (
        <div className="mt-4">
            <div className="flex flex-col sm:flex-row">
                {/* <div className="flex-grow w-56 sm:mr-4 mx-auto">
                    <img src={item.img} alt={item.title} className="w-full h-44 object-cover" />
                </div> */}

                <div className="flex flex-col md:flex-row justify-between gap-4 mt-4 sm:mt-0">
                    <div className="flex-grow">
                        <div className="mb-2">
                            <a href="#!" className="text-md font-semibold hover:text-blue-600 hover:underline">
                                {item.title}
                            </a>
                        </div>

                        <div className="space-y-1 mb-3 text-sm text-gray-600 dark:text-gray-400">
                            <p><span className="font-medium">Options:</span> {item.options}</p>
                            <p><span className="font-medium">Cooling Device:</span> {item.coolingDevice}</p>
                            <p><span className="font-medium">Category:</span> {item.category}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <Quantity
                            quantity={item.quantity}
                            onIncrease={() => onQuantityChange(item.id, item.quantity + 1)}
                            onDecrease={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                            onQuantityChange={(newQuantity) => onQuantityChange(item.id, newQuantity)}
                        />

                        <div className="my-3">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                ৳{item.bdPrice.toFixed(2)}
                            </span>
                        </div>

                        <button onClick={() => onRemove(item.id)} className="px-4 py-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 inline-flex items-center transition-colors">
                            <FontAwesomeIcon icon={faTrashAlt} className="mr-1.5" />
                            Remove
                        </button>
                    </div>
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


