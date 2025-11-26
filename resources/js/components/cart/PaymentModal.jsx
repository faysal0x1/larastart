import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCcMastercard, faCcVisa, faCcPaypal } from "@fortawesome/free-brands-svg-icons";

const PaymentModal = ({ isOpen, onClose, paymentMethods, selectedPayment, onSelectPayment, onAddPayment }) => {
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newPayment, setNewPayment] = useState({
        type: "mastercard",
        number: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPayment.number && newPayment.expiryMonth && newPayment.expiryYear && newPayment.cvv) {
            const maskedNumber = "****" + newPayment.number.slice(-4);
            onAddPayment({
                type: newPayment.type,
                number: maskedNumber
            });
            setNewPayment({ type: "mastercard", number: "", expiryMonth: "", expiryYear: "", cvv: "" });
            setIsAddingNew(false);
        }
    };

    const getPaymentIcon = (type) => {
        switch (type) {
            case "mastercard":
                return faCcMastercard;
            case "visa":
                return faCcVisa;
            case "paypal":
                return faCcPaypal;
            default:
                return faCcMastercard;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Manage Payment Methods</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                </div>

                {!isAddingNew ? (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-semibold">Select Payment Method</h4>
                            <button onClick={() => setIsAddingNew(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                                Add New Payment
                            </button>
                        </div>

                        <div className="space-y-3">
                            {paymentMethods.map((payment) => (
                                <div key={payment.id} className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedPayment.id === payment.id
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                                    }`} onClick={() => onSelectPayment(payment)}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FontAwesomeIcon icon={getPaymentIcon(payment.type)} className="text-blue-600 mr-3 text-xl" />
                                            <div>
                                                <p className="font-semibold capitalize">{payment.type}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{payment.number}</p>
                                            </div>
                                        </div>
                                        {selectedPayment.id === payment.id && (
                                            <span className="text-blue-600 font-semibold">Selected</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-semibold">Add New Payment Method</h4>
                            <button onClick={() => setIsAddingNew(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Card Type</label>
                                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newPayment.type} onChange={(e) => setNewPayment({ ...newPayment, type: e.target.value })}>
                                    <option value="mastercard">Mastercard</option>
                                    <option value="visa">Visa</option>
                                    <option value="paypal">PayPal</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Card Number</label>
                                <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newPayment.number} onChange={(e) => setNewPayment({ ...newPayment, number: e.target.value })} placeholder="1234 5678 9012 3456" required />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Expiry Month</label>
                                    <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newPayment.expiryMonth} onChange={(e) => setNewPayment({ ...newPayment, expiryMonth: e.target.value })} required>
                                        <option value="">MM</option>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                                {String(i + 1).padStart(2, '0')}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Expiry Year</label>
                                    <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newPayment.expiryYear} onChange={(e) => setNewPayment({ ...newPayment, expiryYear: e.target.value })} required>
                                        <option value="">YYYY</option>
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <option key={i} value={new Date().getFullYear() + i}>
                                                {new Date().getFullYear() + i}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">CVV</label>
                                    <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newPayment.cvv} onChange={(e) => setNewPayment({ ...newPayment, cvv: e.target.value })} placeholder="123" maxLength="4" required />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium">Add Payment Method</button>
                                <button type="button" onClick={() => setIsAddingNew(false)} className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 font-medium">Cancel</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;


