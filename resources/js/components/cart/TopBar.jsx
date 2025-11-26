import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCcMastercard } from "@fortawesome/free-brands-svg-icons";

const TopBar = ({
    addresses,
    selectedAddress,
    setSelectedAddress,
    showAddressModal,
    setShowAddressModal,
    paymentMethods,
    selectedPayment,
    setSelectedPayment,
    showPaymentModal,
    setShowPaymentModal
}) => {
    return (
        <>
            <div className=" dark:bg-slate-800 border p-4 md:p-6 mb-4">
                <h6 className="font-bold mb-4">Shipping Information</h6>
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div>
                        <p className="text-sm font-bold">
                            <b>{selectedAddress?.name || 'No address selected'}{selectedAddress?.phone ? `, ${selectedAddress.phone}` : ''}</b> <br />
                            <span className="font-normal opacity-75">
                                {selectedAddress?.address || ''}
                            </span>
                            <br />
                            <span className="font-normal opacity-75">
                                {selectedAddress?.city || ''}
                            </span>
                        </p>
                    </div>
                    <div className="sm:text-end font-medium opacity-100 text-blue-600 text-sm">
                        <button onClick={() => setShowAddressModal(true)} className="inline-block mb-1 hover:underline">
                            <FontAwesomeIcon icon={faPlus} className="mr-1" />
                            Add New Address
                        </button>
                        <br />
                        <button onClick={() => setShowAddressModal(true)} className="hover:underline">
                            Select Other Addresses
                        </button>
                    </div>
                </div>
            </div>
            <div className=" dark:bg-slate-800  p-4 md:p-6 mb-4">
                <h6 className="font-bold mb-4">Payment Methods</h6>
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <p className="text-sm">
                        <FontAwesomeIcon icon={faCcMastercard} className="mr-3" />
                        <span>{selectedPayment?.number || ''}</span>
                    </p>
                    <div className="sm:text-end text-sm">
                        <button onClick={() => setShowPaymentModal(true)} className="text-blue-600 hover:underline font-medium">
                            Change
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopBar;


