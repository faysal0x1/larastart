import { Minus, Plus, ShoppingCart, X } from 'lucide-react';

const VariationModal = ({
    showModal,
    closeModal,
    selectedProduct,
    selectedVariation,
    setSelectedVariation,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    getUniqueColors,
    getUniqueSizes,
    getFilteredVariations,
    quantity,
    setQuantity,
    addVariationToCart,
    formatCurrency,
}) => {
    if (!showModal || !selectedProduct) return null;

    return (
        <div className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-opacity-75 absolute inset-0 bg-gray-800 backdrop-blur-sm" onClick={closeModal}></div>
            <div className="animate-scaleIn relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between border-b pb-3">
                    <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
                    <button onClick={closeModal} className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                {/* Color Selection */}
                {selectedProduct.color_images && selectedProduct.color_images.length > 0 && (
                    <div className="animate-fadeIn mb-4">
                        <h4 className="mb-2 font-medium text-gray-700">Select Color</h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedProduct.color_images.map((color) => (
                                <button
                                    key={color.id}
                                    className={`rounded border p-2 transition-all ${
                                        selectedColor === color.color_attribute_id
                                            ? 'scale-110 border-blue-500 ring-2 ring-blue-200'
                                            : 'hover:border-blue-300'
                                    }`}
                                    onClick={() => setSelectedColor(color.color_attribute_id)}
                                >
                                    <div className="relative">
                                        <img
                                            src={`https://laracomus.test/storage/${color.image}`}
                                            alt={`Color ${color.color_attribute_id}`}
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                        {selectedColor === color.color_attribute_id && (
                                            <div className="absolute inset-0 rounded border-2 border-blue-500"></div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Size Selection */}
                {getUniqueSizes().length > 0 && (
                    <div className="animate-fadeIn mb-4" style={{ animationDelay: '0.1s' }}>
                        <h4 className="mb-2 font-medium text-gray-700">Select Size</h4>
                        <div className="flex flex-wrap gap-2">
                            {getUniqueSizes().map((size) => (
                                <button
                                    key={size}
                                    className={`transform rounded border p-2 transition-all ${
                                        selectedSize === size ? 'scale-110 bg-blue-500 text-white' : 'hover:bg-blue-50'
                                    }`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Variation Selection */}
                <div className="animate-fadeIn mb-4" style={{ animationDelay: '0.2s' }}>
                    <h4 className="mb-2 font-medium text-gray-700">Available Variations</h4>
                    <div className="max-h-40 space-y-2 overflow-y-auto">
                        {getFilteredVariations().length > 0 ? (
                            getFilteredVariations().map((variation) => (
                                <div
                                    key={variation.id}
                                    className={`cursor-pointer rounded border p-3 transition-all ${
                                        selectedVariation?.id === variation.id
                                            ? 'scale-[1.02] transform border-blue-500 bg-blue-50'
                                            : 'hover:border-blue-300 hover:bg-blue-50'
                                    }`}
                                    onClick={() => setSelectedVariation(variation)}
                                >
                                    <div className="flex justify-between">
                                        <span>{variation.name}</span>
                                        <span className="font-bold">{formatCurrency(variation.price)}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">Stock: {variation.stock}</div>
                                </div>
                            ))
                        ) : (
                            <div className="rounded border p-3 text-center text-gray-500">No variations match the selected criteria</div>
                        )}
                    </div>
                </div>

                {/* Quantity Selection */}
                <div className="animate-fadeIn mb-6" style={{ animationDelay: '0.3s' }}>
                    <h4 className="mb-2 font-medium text-gray-700">Quantity</h4>
                    <div className="flex items-center">
                        <button
                            className="rounded-l border bg-gray-100 p-2 transition-colors hover:bg-gray-200"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                            <Minus size={16} />
                        </button>
                        <input
                            type="number"
                            min="1"
                            max={selectedVariation?.stock || 1}
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                            className="w-16 border-t border-b p-2 text-center outline-none"
                        />
                        <button
                            className="rounded-r border bg-gray-100 p-2 transition-colors hover:bg-gray-200"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            <Plus size={16} />
                        </button>
                        <span className="ml-2 text-gray-500">{selectedVariation ? `(Max: ${selectedVariation.stock})` : ''}</span>
                    </div>
                </div>

                <button
                    className="animate-fadeIn flex w-full transform items-center justify-center rounded bg-red-500 p-3 text-white transition-all hover:scale-[1.02] hover:bg-red-600 active:scale-[0.98] disabled:opacity-50"
                    style={{ animationDelay: '0.4s' }}
                    disabled={!selectedVariation}
                    onClick={addVariationToCart}
                >
                    <ShoppingCart size={18} />
                    <span className="ml-2">Add to Cart</span>
                </button>
            </div>
        </div>
    );
};

export default VariationModal;
