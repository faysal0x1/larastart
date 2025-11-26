import { Minus, Plus, Trash2 } from 'lucide-react';

const CartItemsTable = ({ cart, updateQuantity, removeFromCart, formatCurrency }) => {
    return (
        <div className="flex-1 overflow-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="p-2 text-left">Product</th>
                        <th className="p-2 text-center">Quantity</th>
                        <th className="p-2 text-right">Unit Price</th>
                        <th className="p-2 text-right">Subtotal</th>
                        <th className="p-2 text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="py-4 text-center">
                                No items in cart
                            </td>
                        </tr>
                    ) : (
                        cart.map((item) => (
                            <tr
                                key={item.variationId ? `${item.id}-${item.variationId}` : item.id}
                                className="border-b transition-colors hover:bg-gray-50"
                            >
                                <td className="p-2">
                                    {item.name}
                                    {item.variationName && <div className="text-sm text-gray-500">{item.variationName}</div>}
                                    {item.variationAttributes && (
                                        <div className="text-xs text-gray-400">
                                            {Object.entries(item.variationAttributes).map(([key, value]) => (
                                                <span key={key} className="mr-2">
                                                    {key}: {value}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {item.selectedColors && (
                                        <div className="text-xs text-gray-400">
                                            {Object.entries(item.selectedColors).map(([key, value]) => (
                                                <span key={key} className="mr-2">
                                                    {key}: {value}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                </td>
                                <td className="p-2 text-center">
                                    <div className="flex items-center justify-center">
                                        <button
                                            className="rounded-l border bg-gray-100 p-1 transition-colors hover:bg-gray-200"
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.variationId)}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10), item.variationId)}
                                            className="w-12 border-t border-b p-1 text-center outline-none"
                                        />
                                        <button
                                            className="rounded-r border bg-gray-100 p-1 transition-colors hover:bg-gray-200"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.variationId)}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </td>
                                <td className="p-2 text-right">{formatCurrency(item.variationPrice || item.unit_price)}</td>
                                <td className="p-2 text-right">{formatCurrency((item.variationPrice || item.unit_price) * item.quantity)}</td>
                                <td className="p-2 text-right">
                                    <button
                                        className="rounded-full p-1 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
                                        onClick={() => removeFromCart(item.id, item.variationId)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CartItemsTable;
