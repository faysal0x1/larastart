const ShippingTab = ({ shippingInfo, handleShippingInfoChange, calculateShipping, setActiveTab }) => (
    <div className="absolute right-0 bottom-0 left-0 z-10 border-t border-gray-200 bg-white px-6 py-4">
        <div className="flex cursor-pointer items-center gap-3">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
            <div className="text-sm">Calculate Shipping</div>
        </div>
        <div className="form space-y-4 pt-4">
            <div className="form-group">
                <label htmlFor="country" className="mb-1 block text-sm font-medium text-gray-700">
                    Country/Region
                </label>
                <select
                    id="country"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleShippingInfoChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="">Select a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="state" className="mb-1 block text-sm font-medium text-gray-700">
                    State/Province
                </label>
                <select
                    id="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleShippingInfoChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="">Select a state</option>
                    {shippingInfo.country === 'US' && (
                        <>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="FL">Florida</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                            <option value="WA">Washington</option>
                        </>
                    )}
                    {shippingInfo.country === 'CA' && (
                        <>
                            <option value="AB">Alberta</option>
                            <option value="BC">British Columbia</option>
                            <option value="ON">Ontario</option>
                            <option value="QC">Quebec</option>
                        </>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="zipCode" className="mb-1 block text-sm font-medium text-gray-700">
                    Zip/Postal Code
                </label>
                <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleShippingInfoChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter zip/postal code"
                />
            </div>
        </div>
        <div className="block-button pt-4 pb-6 text-center">
            <button
                className="w-full rounded-lg bg-black px-4 py-3 text-white transition-colors hover:bg-gray-800"
                onClick={calculateShipping}
            >
                Calculate
            </button>
            <button
                onClick={() => setActiveTab('')}
                className="relative mt-4 inline-block cursor-pointer text-center text-blue-600 uppercase transition-colors before:absolute before:right-0 before:bottom-0 before:left-0 before:h-px before:bg-blue-600 before:content-[''] hover:text-blue-800"
            >
                Cancel
            </button>
        </div>
    </div>
);

export default ShippingTab;