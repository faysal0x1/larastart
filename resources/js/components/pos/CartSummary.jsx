import { CreditCard, DollarSign, FileText, List, ShoppingCart } from 'lucide-react';

const CartSummary = ({ calculateSubtotal, formatCurrency, shippingCost, setShippingCost }) => {
    return (
        <div className="mt-4 border-t pt-4">
            <div className="mb-4">
                <div className="mb-2 flex justify-between">
                    <span>Invoice No:</span>
                    <span>INV-20250521-1897</span>
                </div>

                <div className="mb-2 flex">
                    <div className="w-1/2 pr-2">
                        <label className="mb-1 block">Shipping Address</label>
                        <textarea
                            className="w-full resize-none rounded border p-2 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="w-1/2 pl-2">
                        <label className="mb-1 block">Notes</label>
                        <textarea
                            className="w-full resize-none rounded border p-2 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
                            rows="3"
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="rounded bg-gray-50 p-4 shadow-inner">
                <div className="mb-2 flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                </div>

                <div className="mb-2 flex justify-between">
                    <span>Service Charge</span>
                    <div className="w-64">
                        <select className="w-full rounded border p-1 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300">
                            <option>No Service Charge</option>
                            <option>5%</option>
                            <option>10%</option>
                        </select>
                    </div>
                </div>

                <div className="mb-2 flex justify-between">
                    <span>Discount</span>
                    <div className="w-64">
                        <select className="w-full rounded border p-1 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300">
                            <option>No Discount</option>
                            <option>5%</option>
                            <option>10%</option>
                            <option>15%</option>
                        </select>
                    </div>
                </div>

                <div className="mb-2 flex justify-between">
                    <span>Shipping Cost</span>
                    <div className="w-64">
                        <input
                            type="text"
                            className="w-full rounded border p-1 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
                            value={shippingCost}
                            onChange={(e) => setShippingCost(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-4 flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                </div>

                <div className="mb-4 grid grid-cols-4 gap-2">
                    <button className="flex items-center justify-center rounded bg-green-600 p-2 text-white transition-colors hover:bg-green-700">
                        <DollarSign size={18} />
                        <span className="ml-1">Cash</span>
                    </button>
                    <button className="flex items-center justify-center rounded bg-blue-400 p-2 text-white transition-colors hover:bg-blue-500">
                        <CreditCard size={18} />
                        <span className="ml-1">Card</span>
                    </button>
                    <button className="flex items-center justify-center rounded bg-yellow-500 p-2 text-white transition-colors hover:bg-yellow-600">
                        <FileText size={18} />
                        <span className="ml-1">Multiple</span>
                    </button>
                    <button className="flex items-center justify-center rounded bg-gray-500 p-2 text-white transition-colors hover:bg-gray-600">
                        <List size={18} />
                        <span className="ml-1">Hold</span>
                    </button>
                </div>

                <button className="flex w-full transform items-center justify-center rounded bg-red-500 p-3 text-white transition-colors transition-transform hover:scale-[1.02] hover:bg-red-600 active:scale-[0.98]">
                    <ShoppingCart size={18} />
                    <span className="ml-2">Process Cash Payment</span>
                </button>
            </div>
        </div>
    );
};

export default CartSummary;
