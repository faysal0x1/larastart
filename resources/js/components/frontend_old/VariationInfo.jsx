const VariationInfo = ({ variation }) => {
    if (!variation) return null;

    return (
        <div className="rounded-lg bg-gray-50 p-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="font-medium text-gray-700">Price</h4>
                    <p className="text-lg font-bold">${parseFloat(variation.price).toFixed(2)}</p>
                </div>
                <div>
                    <h4 className="font-medium text-gray-700">Stock</h4>
                    <p className={variation.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                        {variation.stock > 0 ? `${variation.stock} available` : 'Out of stock'}
                    </p>
                </div>
            </div>

            {variation.parsedAttributes && (
                <div className="mt-4">
                    <h4 className="font-medium text-gray-700">Attributes</h4>
                    <ul className="mt-1 space-y-1">
                        {Object.entries(variation.parsedAttributes).map(([key, value]) => (
                            <li key={key} className="flex">
                                <span className="w-24 capitalize text-gray-600">{key}:</span>
                                <span className="font-medium">{value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-4">
                <h4 className="font-medium text-gray-700">SKU</h4>
                <p className="font-mono">{variation.sku}</p>
            </div>
        </div>
    );
};

export default VariationInfo;