const Discovery = () => {
    return (
        <div className="w-full px-2">
            <div className="relative h-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-lg">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        Discover all new items
                    </h5>
                    <a
                        href="shop-collection-list.html"
                        className="inline-flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-900 rounded-full shadow-md group-hover:bg-primary-500 dark:group-hover:bg-primary-600 transition-colors duration-300"
                        aria-label="Discover new items"
                    >
                        <svg
                            className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Discovery;