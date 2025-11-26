import { ChevronDown, ShoppingCart, Trash2 } from 'lucide-react';

const CartHeader = ({ customer, setCustomer, barcodeInput, setBarcodeInput, clearCart }) => {
    return (
        <div className="mb-4 flex items-center">
            <ShoppingCart size={24} className="mr-2" />
            <h2 className="text-xl font-bold">Cart</h2>

            <div className="relative ml-4 w-64">
                <select
                    className="w-full appearance-none rounded-md border bg-white p-2 transition-colors focus:ring-2 focus:ring-blue-300"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                >
                    <option>Walk In Customer</option>
                    <option>John Doe</option>
                    <option>Jane Smith</option>
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute top-3 right-2 text-gray-500" />
            </div>

            <div className="ml-4 flex flex-1">
                <input
                    type="text"
                    placeholder="Enter barcode"
                    className="flex-1 rounded-l-md border p-2 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                />
                <button className="rounded-r-md bg-red-500 p-2 text-white transition-colors hover:bg-red-600">Scan</button>
            </div>

            <button className="ml-4 flex items-center rounded-md bg-red-500 p-2 text-white transition-colors hover:bg-red-600" onClick={clearCart}>
                <Trash2 size={18} />
                <span className="ml-1">Clear Cart</span>
            </button>
        </div>
    );
};

export default CartHeader;
