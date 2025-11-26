import React from 'react';

const PCBuildsCard = ({ build }) => {
    const {
        title,
        linkText,
        currentPrice,
        originalPrice,
        savings,
        products
    } = build;

    return (
        <div className="bg-gradient-to-b from-blue-900 to-blue-700 rounded-lg overflow-hidden shadow-sm">
            {/* Header Section */}
            <div className="bg-blue-900 px-4 py-3 relative">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-white font-bold text-lg">{title}</h3>
                        <a href="/pc-builds" className="text-white text-sm hover:underline">
                            {linkText} ►
                        </a>
                    </div>
                    {/* Savings Badge */}
                    <div className="bg-red-600 text-white rounded-full w-20 h-20 flex flex-col items-center justify-center">
                        <span className="text-xs font-bold">Save</span>
                        <div className="text-lg font-bold">
                            ${savings}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-blue-100 px-4 py-4">
                {/* Price Section */}
                <div className="flex items-baseline mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                        ${currentPrice}
                    </span>
                    <span className="text-sm text-gray-600 line-through ml-2">
                        ${originalPrice}
                    </span>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-3 gap-1">
                    {products.map((product, index) => (
                        <div key={index} className="bg-white rounded p-1">
                            <img
                                src={product.image}
                                alt={product.name}
                                title={product.name}
                                className="w-full h-12 object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PCBuildsCard;
