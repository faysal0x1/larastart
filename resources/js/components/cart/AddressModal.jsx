import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faMapMarkerAlt, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AddressModal = ({
    isOpen,
    onClose,
    addresses,
    selectedAddress,
    onSelectAddress,
    onAddAddress,
    processing,
    errors,
    formData,
    setFormData
}) => {
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);

    useEffect(() => {
        if (!isOpen) return;
        const loadDivisions = async () => {
            try {
                const res = await axios.get('/locations/divisions');
                setDivisions(res?.data?.data || []);
            } catch (_) { }
        };
        loadDivisions();
    }, [isOpen]);

    useEffect(() => {
        const loadDistricts = async () => {
            try {
                if (!formData.division_id) {
                    setDistricts([]);
                    return;
                }
                const res = await axios.get('/locations/districts', {
                    params: { division_id: formData.division_id }
                });
                setDistricts(res?.data?.data || []);
            } catch (_) { }
        };
        loadDistricts();
        if (formData.division_id) {
            setFormData({ ...formData, district_id: "", upazilla_id: "" });
            setUpazillas([]);
        }
    }, [formData.division_id]);


    useEffect(() => {
        const loadUpazillas = async () => {
            try {
                if (!formData.district_id) {
                    setUpazillas([]);
                    return;
                }
                const res = await axios.get('/locations/upazillas', {
                    params: { district_id: formData.district_id }
                });
                setUpazillas(res?.data?.data || []);
            } catch (_) { }
        };
        loadUpazillas();
        if (formData.district_id) {
            setFormData({ ...formData, upazilla_id: "" });
        }
    }, [formData.district_id]);





    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.first_name && formData.phone && formData.address) {
            onAddAddress(formData);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Manage Addresses</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                </div>

                {!isAddingNew ? (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-semibold">Select Address</h4>
                            <button
                                onClick={() => setIsAddingNew(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                            >
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                Add New Address
                            </button>
                        </div>

                        <div className="space-y-3">
                            {addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${(selectedAddress && selectedAddress.id) === address.id
                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                            : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                                        }`}
                                    onClick={() => onSelectAddress(address)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600 mr-3 mt-1" />
                                            <div>
                                                <p className="font-semibold">{address.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{address.phone}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{address.address}</p>
                                                {address.city ? (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{address.city}</p>
                                                ) : null}
                                            </div>
                                        </div>
                                        {(selectedAddress && selectedAddress.id) === address.id && (
                                            <FontAwesomeIcon icon={faCheck} className="text-blue-600" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-semibold">Add New Address</h4>
                            <button
                                onClick={() => setIsAddingNew(false)}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">First Name *</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.first_name}
                                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                                        required
                                    />
                                    {errors?.first_name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.last_name}
                                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                                    />
                                    {errors?.last_name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        required
                                    />
                                    {errors?.phone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                    {errors?.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Post Code</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.post_code}
                                        onChange={(e) => handleInputChange('post_code', e.target.value)}
                                    />
                                    {errors?.post_code && (
                                        <p className="text-red-500 text-sm mt-1">{errors.post_code}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Division</label>
                                    <select
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.division_id}
                                        onChange={(e) => handleInputChange('division_id', e.target.value)}
                                    >
                                        <option value="">Select Division</option>
                                        {divisions.map(d => (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        ))}
                                    </select>
                                    {errors?.division_id && (
                                        <p className="text-red-500 text-sm mt-1">{errors.division_id}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">District</label>
                                    <select
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.district_id}
                                        onChange={(e) => handleInputChange('district_id', e.target.value)}
                                        disabled={!formData.division_id}
                                    >
                                        <option value="">Select District</option>
                                        {districts.map(d => (
                                            <option key={d.id} value={d.id}>{d.district_name}</option>
                                        ))}
                                    </select>
                                    {errors?.district_id && (
                                        <p className="text-red-500 text-sm mt-1">{errors.district_id}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Upazila</label>
                                    <select
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.upazilla_id}
                                        onChange={(e) => handleInputChange('upazilla_id', e.target.value)}
                                        disabled={!formData.district_id}
                                    >
                                        <option value="">Select Upazila</option>
                                        {upazillas.map(u => (
                                            <option key={u.id} value={u.id}>{u.upazilla_name}</option>
                                        ))}
                                    </select>
                                    {errors?.upazilla_id && (
                                        <p className="text-red-500 text-sm mt-1">{errors.upazilla_id}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Address *</label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    required
                                />
                                {errors?.address && (
                                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                )}
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Adding...' : 'Add Address'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAddingNew(false)}
                                    disabled={processing}
                                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddressModal;
