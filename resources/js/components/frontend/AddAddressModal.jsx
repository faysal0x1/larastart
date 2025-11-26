import { Building, Mail, MapPin, Phone, User, X } from 'lucide-react';
import { useState } from 'react';

export default function AddAddressModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        addressName: '',
        contactName: '',
        companyName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        isDefault: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        onClose();
    };

    const handleClose = () => {
        // Reset form data when closing
        setFormData({
            addressName: '',
            contactName: '',
            companyName: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            isDefault: false,
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="bg-opacity-50 fixed inset-0 bg-black transition-opacity" onClick={handleClose}></div>

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-2xl transform rounded-lg bg-white text-black shadow-xl transition-all">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center">
                            <MapPin className="mr-3 h-6 w-6 text-blue-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Add New Address</h2>
                        </div>
                        <button onClick={handleClose} className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-6 py-4">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Address Name */}
                            <div className="md:col-span-2">
                                <label htmlFor="addressName" className="mb-2 block text-sm font-medium text-gray-700">
                                    Address Name *
                                </label>
                                <input
                                    type="text"
                                    id="addressName"
                                    name="addressName"
                                    value={formData.addressName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    placeholder="e.g., Home, Office, etc."
                                />
                            </div>

                            {/* Contact Name */}
                            <div>
                                <label htmlFor="contactName" className="mb-2 block text-sm font-medium text-gray-700">
                                    <User className="mr-1 inline h-4 w-4" />
                                    Contact Name *
                                </label>
                                <input
                                    type="text"
                                    id="contactName"
                                    name="contactName"
                                    value={formData.contactName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Full name"
                                />
                            </div>

                            {/* Company Name */}
                            <div>
                                <label htmlFor="companyName" className="mb-2 block text-sm font-medium text-gray-700">
                                    <Building className="mr-1 inline h-4 w-4" />
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Company name (optional)"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                                    <Phone className="mr-1 inline h-4 w-4" />
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Phone number"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                    <Mail className="mr-1 inline h-4 w-4" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Email address (optional)"
                                />
                            </div>

                            {/* Address */}
                            <div className="md:col-span-2">
                                <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">
                                    Street Address *
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    rows={3}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Street address, apartment, suite, unit, building, floor, etc."
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-700">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    placeholder="City"
                                />
                            </div>

                            {/* State */}
                            <div>
                                <label htmlFor="state" className="mb-2 block text-sm font-medium text-gray-700">
                                    State/Province *
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    placeholder="State/Province"
                                />
                            </div>

                            {/* Zip Code */}
                            <div>
                                <label htmlFor="zipCode" className="mb-2 block text-sm font-medium text-gray-700">
                                    Zip/Postal Code *
                                </label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Zip/Postal Code"
                                />
                            </div>

                            {/* Country */}
                            <div>
                                <label htmlFor="country" className="mb-2 block text-sm font-medium text-gray-700">
                                    Country *
                                </label>
                                <select
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="">Select Country</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="BD">Bangladesh</option>
                                    <option value="IN">India</option>
                                    <option value="PK">Pakistan</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="AU">Australia</option>
                                    {/* Add more countries as needed */}
                                </select>
                            </div>

                            {/* Default Address Checkbox */}
                            <div className="md:col-span-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="isDefault"
                                        name="isDefault"
                                        checked={formData.isDefault}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                                        Set as default address
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 flex justify-end space-x-3 border-t border-gray-200 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Save Address
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
