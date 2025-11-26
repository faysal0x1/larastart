import { ChevronDown, ShoppingCart } from 'lucide-react';

import React from 'react';


const ProductsSection = ({ products, addToCart, searchProducts, setSearchProducts, formatCurrency }) => {
    // Get unique categories from products
    const getUniqueCategories = () => {
        const categories = new Set();
        products.forEach(p => {
            if (p.category?.name) {
                categories.add(p.category.name);
            }
        });
        return Array.from(categories);
    };

    // Get unique subcategories from products
    const getUniqueSubcategories = () => {
        const subcategories = new Set();
        products.forEach(p => {
            if (p.sub_category?.name) {
                subcategories.add(p.sub_category.name);
            }
        });
        return Array.from(subcategories);
    };

    return (
        <div className="w-1/3 p-4 bg-white m-2 rounded-md shadow animate-fadeIn">
            <h2 className="text-xl font-bold mb-4">Products</h2>

            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Search Products..."
                    className="p-2 border rounded-l flex-1 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all outline-none"
                    value={searchProducts}
                    onChange={(e) => setSearchProducts(e.target.value)}
                />
                <div className="relative">
                    <select
                        className="p-2 border-t border-b border-r h-full appearance-none pr-8 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all outline-none">
                        <option>All Categories</option>
                        {getUniqueCategories().map(category => (
                            <option key={category}>{category}</option>
                        ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-2 top-3 text-gray-500 pointer-events-none" />
                </div>
            </div>

            <div className="flex mb-4">
                <div className="relative flex-1">
                    <select
                        className="p-2 border rounded-l w-full appearance-none pr-8 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all outline-none">
                        <option>Brands</option>
                        {/* Brands would come from API if available */}
                    </select>
                    <ChevronDown size={16} className="absolute right-2 top-3 text-gray-500 pointer-events-none" />
                </div>
                <div className="relative flex-1">
                    <select
                        className="p-2 border-t border-b border-r rounded-r w-full appearance-none pr-8 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all outline-none">
                        <option>Sub Categories</option>
                        {getUniqueSubcategories().map(subcategory => (
                            <option key={subcategory}>{subcategory}</option>
                        ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-2 top-3 text-gray-500 pointer-events-none" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
                {products.map(p => (
                    <div key={p.id}
                         className="border rounded-md overflow-hidden bg-white hover:shadow-lg transition-all transform hover:scale-[1.02]">
                        <div className="h-32 bg-gray-200 relative">
                            <img
                                src={`https://laracomus.test/storage/${p.product_thumbnail}`}
                                alt={p.name}
                                className="w-full h-full object-cover"
                            />
                            {p.qty <= 5 && (
                                <div
                                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    Low Stock: {p.qty}
                                </div>
                            )}
                        </div>
                        <div className="p-2">
                            <h3 className="font-medium">{p.name}</h3>
                            <div className="text-sm text-gray-500">Stock: {p.qty}</div>
                            <div className="font-bold mb-2">{formatCurrency(p.unit_price)}</div>
                            <button
                                className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded flex items-center justify-center transition-colors"
                                onClick={() => addToCart(p)}
                            >
                                <ShoppingCart size={16} />
                                <span className="ml-1">Add to Cart</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsSection;