const VariationSelector = ({ variations, selectedVariation, onSelectVariation }) => {
    // Group variations by size first
    const sizeGroups = variations.reduce((acc, variation) => {
        const size = variation.parsedAttributes.size;
        if (!acc[size]) {
            acc[size] = [];
        }
        acc[size].push(variation);
        return acc;
    }, {});

    // Get all unique sizes
    const sizes = Object.keys(sizeGroups).sort();

    // Get available types for selected size
    const availableTypes = selectedVariation?.size
        ? [...new Set(sizeGroups[selectedVariation.size].map(v => v.parsedAttributes.type))]
        : [];

    // Get available materials for selected size and type
    const availableMaterials = selectedVariation?.size && selectedVariation?.parsedAttributes?.type
        ? [...new Set(
            sizeGroups[selectedVariation.size]
                .filter(v => v.parsedAttributes.type === selectedVariation.parsedAttributes.type)
                .map(v => v.parsedAttributes.material)
        )]
        : [];

    const handleSizeSelect = (size) => {
        // Find the first variation with this size
        const newVariation = sizeGroups[size][0];
        onSelectVariation(newVariation);
    };

    const handleTypeSelect = (type) => {
        // Find variation with current size and new type
        const newVariation = sizeGroups[selectedVariation.size]
            .find(v => v.parsedAttributes.type === type);
        onSelectVariation(newVariation);
    };

    const handleMaterialSelect = (material) => {
        // Find variation with current size, type and new material
        const newVariation = sizeGroups[selectedVariation.size]
            .find(v =>
                v.parsedAttributes.type === selectedVariation.parsedAttributes.type &&
                v.parsedAttributes.material === material
            );
        onSelectVariation(newVariation);
    };

    return (
        <div className="space-y-4">
            {/* Size Selection */}
            <div>
                <h4 className="mb-2 font-medium">Size</h4>
                <div className="flex flex-wrap gap-2">
                    {sizes.map(size => {
                        const isAvailable = sizeGroups[size].some(v => v.stock > 0);
                        const isSelected = selectedVariation?.parsedAttributes?.size === size;

                        return (
                            <button
                                key={size}
                                className={`px-4 py-2 rounded border ${
                                    isSelected
                                        ? 'bg-black text-white border-black'
                                        : isAvailable
                                            ? 'border-gray-300 hover:border-black'
                                            : 'border-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                                onClick={() => isAvailable && handleSizeSelect(size)}
                                disabled={!isAvailable}
                            >
                                {size}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Type Selection (only shown after size is selected) */}
            {selectedVariation && availableTypes.length > 1 && (
                <div>
                    <h4 className="mb-2 font-medium">Type</h4>
                    <div className="flex flex-wrap gap-2">
                        {availableTypes.map(type => {
                            const isSelected = selectedVariation.parsedAttributes.type === type;

                            return (
                                <button
                                    key={type}
                                    className={`px-4 py-2 rounded border ${
                                        isSelected
                                            ? 'bg-black text-white border-black'
                                            : 'border-gray-300 hover:border-black'
                                    }`}
                                    onClick={() => handleTypeSelect(type)}
                                >
                                    {type}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Material Selection (only shown after type is selected) */}
            {selectedVariation && availableMaterials.length > 1 && (
                <div>
                    <h4 className="mb-2 font-medium">Material</h4>
                    <div className="flex flex-wrap gap-2">
                        {availableMaterials.map(material => {
                            const isSelected = selectedVariation.parsedAttributes.material === material;

                            return (
                                <button
                                    key={material}
                                    className={`px-4 py-2 rounded border ${
                                        isSelected
                                            ? 'bg-black text-white border-black'
                                            : 'border-gray-300 hover:border-black'
                                    }`}
                                    onClick={() => handleMaterialSelect(material)}
                                >
                                    {material}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VariationSelector;