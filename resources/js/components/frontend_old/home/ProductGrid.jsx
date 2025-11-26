import CartModal from '@/components/frontend/CartModal.jsx';
import ModalQuickview from '@/components/frontend/ModalQuickview.jsx';
import { router } from '@inertiajs/react';
import { Eye, Heart, RefreshCw, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';

const ProductGrid = ({ products, categories }) => {
    const [activeFilter, setActiveFilter] = useState('TOP');

    // Modal states - centralized
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Product interaction states
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [selectedColors, setSelectedColors] = useState({});

    // Initialize default colors for products
    React.useEffect(() => {
        const initialColors = {};
        products.forEach((product) => {
            initialColors[product.id] = product.color_images[0];
        });
        setSelectedColors(initialColors);
    }, []);

    // Filter products based on active filter
    const filteredProducts =
        activeFilter === 'TOP'
            ? products
            : products.filter((product) => (activeFilter === 'NEW' ? product.isNew : product.category.slug === activeFilter));

    // Open quick view modal with selected product
    const openQuickView = (product) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
        setIsCartOpen(false); // Ensure cart modal is closed when opening quick view
    };

    // Open cart modal with selected product
    const openCartModal = (product, options = {}) => {
        const { keepQuickViewOpen = false } = options;
        setSelectedProduct(product);
        setIsCartOpen(true);
        if (!keepQuickViewOpen) {
            setIsQuickViewOpen(false);
        }
    };

    function handleAddToCart(product) {
        console.log("handle add to cart");
        console.log('Adding to cart:', product);

        const selectedColor = selectedColors[product.id];
        router.post(
            route('cart.store'),
            {
                product_id: product.id,
                quantity: product.quantity || 1,
                color: selectedColor?.color_attribute?.name ,
                product_name: product.name,
                size: product.selectedSize ,
                type: product.type,
                material: product.material,
                style: product.style,
                variations:(product.selectedVariation),

            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    console.log('Cart add success:', page);
                    openCartModal(product, { keepQuickViewOpen: true });
                },
                onError: (errors) => {
                    console.error('Error adding to cart:', errors);
                },
            },
        );
    }

    // Close quick view modal
    const closeQuickView = () => {
        setIsQuickViewOpen(false);
    };

    // Close cart modal
    const closeCartModal = () => {
        setIsCartOpen(false);
    };

    // Toggle wishlist status
    const toggleWishlist = (productId) => {
        setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
    };

    // Select color for product
    const selectColor = (productId, color) => {
        setSelectedColors((prev) => ({
            ...prev,
            [productId]: color,
        }));
    };

    return (
        <section className="container mx-auto px-4 py-12">
            <h2 className="mb-8 text-center text-3xl font-bold">What's New</h2>

            {/* Filter buttons */}
            <div className="mb-10 flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                    <button
                        key={category.slug}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeFilter === category.slug ? 'bg-black text-white' : 'bg-gray-100 text-gray-800' + ' hover:bg-gray-200'
                            }`}
                        onClick={() => setActiveFilter(category.slug)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.map((product) => {
                    const selectedColor = selectedColors[product.id] || product.color_images[0];
                    const isOnSale = product.final_price < product.unit_price;
                    const isInWishlist = wishlist.includes(product.id);

                    return (
                        <div
                            key={product.id}
                            className="group relative overflow-hidden"
                            onMouseEnter={() => setHoveredProduct(product.id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            {/* Product image */}
                            <div className="relative aspect-square overflow-hidden bg-gray-100">
                                <img
                                    src={product.product_thumbnail}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* Tag (NEW/SALE) */}
                                {product.isNew && (
                                    <div className="absolute top-3 left-3 rounded bg-[#e53e29] px-2 py-1 text-xs font-bold text-white">NEW</div>
                                )}
                                {isOnSale && !product.isNew && (
                                    <div className="absolute top-3 left-3 rounded bg-black px-2 py-1 text-xs font-bold text-white">SALE</div>
                                )}

                                {/* Quick View & Add to Cart (shown at bottom on hover) */}
                                {hoveredProduct === product.id && (
                                    <div className="absolute right-0 bottom-0 left-0 flex justify-center gap-4 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <button
                                            onClick={() => openQuickView(product)}
                                            className="flex items-center gap-1 rounded-full bg-white px-2 py-2 text-sm font-medium text-black hover:bg-gray-100"
                                        >
                                            <Eye size={16} /> QUICK VIEW
                                        </button>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="flex items-center gap-1 rounded-full bg-white px-2 py-2 text-sm font-medium text-black hover:bg-gray-100 disabled:opacity-50"
                                        >
                                            <ShoppingCart size={16} />
                                            ADD TO CART
                                        </button>
                                    </div>
                                )}

                                {/* Wishlist & Compare icons (shown on hover) */}
                                {hoveredProduct === product.id && (
                                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                                        <button
                                            className="group/icon relative rounded-full bg-white p-2"
                                            onClick={() => toggleWishlist(product.id)}
                                            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                                        >
                                            <Heart
                                                size={18}
                                                fill={isInWishlist ? '#e53e29' : 'none'}
                                                className={isInWishlist ? 'text-[#e53e29]' : 'text-gray-700'}
                                            />
                                            <span className="absolute right-full mr-2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover/icon:opacity-100">
                                                {isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                                            </span>
                                        </button>
                                        <button className="group/icon relative rounded-full bg-white p-2" title="Compare">
                                            <RefreshCw size={18} className="text-gray-700" />
                                            <span className="absolute right-full mr-2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover/icon:opacity-100">
                                                Compare
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Product info */}
                            <div className="mt-4">
                                {/* Title (hidden on hover) */}
                                <h3
                                    className={`font-medium text-gray-900 transition-opacity ${hoveredProduct === product.id ? 'opacity-0' : 'opacity-100'}`}
                                >
                                    {product.name}
                                </h3>

                                {/* Color options (shown on hover) */}
                                <div
                                    className={`mt-2 flex justify-start gap-2 transition-opacity ${hoveredProduct === product.id ? 'opacity-100' : 'absolute opacity-0'}`}
                                >
                                    {product.color_images.map((color) => (
                                        <button
                                            key={color.id}
                                            className={`h-5 w-5 cursor-pointer rounded-full border border-2 border-black ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
                                            style={{ backgroundColor: color.color_attribute.code }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                selectColor(product.id, color);
                                            }}
                                            title={color.color_attribute.name}
                                        />
                                    ))}
                                </div>

                                {/* Price */}
                                <div className="mt-2">
                                    {isOnSale ? (
                                        <>
                                            <span className="font-bold text-[#e53e29]">${product.unit_price}</span>
                                            <span className="ml-2 text-gray-500 line-through">${product.final_price}</span>
                                            <span className="ml-2 text-xs text-[#e53e29]">
                                                -{Math.round((1 - product.unit_price / product.final_price) * 100)}%
                                            </span>
                                        </>
                                    ) : (
                                        <span className="font-bold">${product.final_price}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Centralized modals - only rendered once */}
            {selectedProduct && (
                <>
                    <ModalQuickview
                        isOpenQuickView={isQuickViewOpen}
                        onCloseQuickView={closeQuickView}
                        product={selectedProduct}
                        onAddToCart={(productData) => {
                            handleAddToCart(productData);
                            // openCartModal(productData);
                        }}
                    />

                    {isCartOpen && <CartModal isOpenCart={isCartOpen} onCloseCart={closeCartModal} />}
                </>
            )}
        </section>
    );
};

export default ProductGrid;
