const BestSellerCard = ({ product }) => {
    const {
        type,
        style,
        productLink,
        images,
        actions,
        sizes,
        sale,
        countdown,
        productInfo
    } = product;

    return (
        <div className={`group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${style}`}>
            {/* Product Images */}
            <div className="relative overflow-hidden">
                <a href={productLink} className="block">
                    <img
                        className="w-full h-64 object-cover transition-opacity duration-500 group-hover:opacity-0"
                        src={images.main.src}
                        alt={images.main.alt}
                        loading="lazy"
                    />
                    <img
                        className="w-full h-64 object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        src={images.hover.src}
                        alt={images.hover.alt}
                        loading="lazy"
                    />
                </a>

                {/* Wishlist and Compare Buttons */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    <button
                        className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-900 rounded-full shadow-md hover:bg-primary-500 dark:hover:bg-primary-600 transition-colors"
                        aria-label={actions.wishlist.tooltip}
                    >
                        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    <button
                        className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-900 rounded-full shadow-md hover:bg-primary-500 dark:hover:bg-primary-600 transition-colors"
                        aria-label={actions.compare.tooltip}
                    >
                        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </button>
                </div>

                {/* Quick Actions */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
                    <button className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-full text-sm font-medium hover:bg-primary-500 dark:hover:bg-primary-600 hover:text-white transition-colors">
                        {actions.quickAdd.text}
                    </button>
                    <button className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-full text-sm font-medium hover:bg-primary-500 dark:hover:bg-primary-600 hover:text-white transition-colors">
                        {actions.quickView.text}
                    </button>
                </div>

                {/* Size List */}
                {sizes && (
                    <div className="absolute top-3 right-3 flex flex-wrap justify-end gap-1">
                        {sizes.map((size, index) => (
                            <span key={index} className="px-2 py-1 bg-white dark:bg-gray-900 text-xs text-gray-700 dark:text-gray-300 rounded">
                                {size}
                            </span>
                        ))}
                    </div>
                )}

                {/* Sale Badge */}
                {sale && (
                    <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                            {sale.percentage}
                        </span>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                <a href={productLink} className="block">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                        {productInfo.title}
                    </h3>
                    <p className="text-lg font-bold text-primary-500 dark:text-primary-400">
                        {productInfo.price}
                    </p>
                </a>

                {/* Color Swatches */}
                {productInfo.colors && (
                    <div className="mt-3 flex space-x-2">
                        {productInfo.colors.map((color, index) => (
                            <div
                                key={index}
                                className={`relative w-6 h-6 rounded-full ${color.active ? 'ring-2 ring-primary-500' : ''}`}
                                title={color.name}
                            >
                                <span
                                    className={`absolute inset-0 rounded-full ${color.value} ${color.active ? 'border-2 border-white dark:border-gray-800' : ''}`}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Countdown Timer */}
            {countdown && (
                <div className="px-4 pb-4">
                    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-center">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                            {countdown.labels}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BestSellerCard;