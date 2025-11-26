import VariationInfo from '@/components/frontend/VariationInfo.jsx';
import VariationSelector from '@/components/frontend/VariationSelector.jsx';
import { BarChart2, Eye, Heart, HelpCircle, Minus, Plus, Share2, ShoppingBag, Timer, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const ModalQuickview = ({ isOpenQuickView, onCloseQuickView, product, onAddToCart }) => {
    // Early return if modal is closed or no product
    if (!isOpenQuickView || !product) return null;

    // State for the selected color, size, quantity and wishlist
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Process variations to extract unique sizes and create size-color mapping
    const processedData = useMemo(() => {
        if (!product.variations || !Array.isArray(product.variations)) {
            return { sizes: [], variations: [] };
        }

        const sizes = [];
        const types = [];
        const variations = product.variations.map((variation) => {
            const attributes = typeof variation.attributes === 'string' ? JSON.parse(variation.attributes) : variation.attributes;

            // Extract size from attributes
            if (attributes.size && !sizes.includes(attributes.size)) {
                console.log(`Adding size: ${attributes.size}`);
                sizes.push(attributes.size);
            }
            if (attributes.type && !types.includes(attributes.type)) {
                types.push(attributes.type);
            }

            console.log(
                `Processing variation: ${variation.id}, size: ${attributes.size}, type: ${attributes.type}, material: ${attributes.material}, style: ${attributes.style}`,
            );

            return {
                ...variation,
                parsedAttributes: attributes,
                size: attributes.size,
                type: attributes.type,
                material: attributes.material,
                style: attributes.style,
            };
        });

        return { sizes: sizes.sort(), variations };
    }, [product.variations]);

    // Reset state when product changes
    useEffect(() => {
        if (product) {
            // Set default color to first available color
            const defaultColor = product.color_images?.[0]?.color_attribute || null;
            setSelectedColor(defaultColor);

            // Set default size to first available size
            const defaultSize = processedData.sizes[0] || null;
            setSelectedSize(defaultSize);

            // Find default variation
            const defaultVariation = processedData.variations.find((v) => v.size === defaultSize) || processedData.variations[0] || null;
            setSelectedVariation(defaultVariation);

            setQuantity(1);
            setCurrentImageIndex(0);
        }
    }, [product, processedData]);

    // Update selected variation when size changes
    useEffect(() => {
        if (selectedSize && processedData.variations.length > 0) {
            const variation = processedData.variations.find((v) => v.size === selectedSize);
            setSelectedVariation(variation || null);
            setQuantity(1); // Reset quantity when variation changes
        }
    }, [selectedSize, processedData.variations]);

    const handleAddToCart = () => {
        if (!selectedColor) {
            alert('Please select a color');
            return;
        }
        if (!selectedSize || !selectedVariation) {
            alert('Please select a size');
            return;
        }

        const currentStock = selectedVariation?.stock || 0;
        if (currentStock <= 0) {
            alert('Selected item is out of stock');
            return;
        }

        if (quantity > currentStock) {
            alert(`Only ${currentStock} items available in stock`);
            return;
        }

        const productData = {
            id: product.id,
            title: product.name,
            price: parseFloat(selectedVariation.price),
            originalPrice: parseFloat(product.unit_price),
            defaultImages: currentImages,
            selectedColor: selectedColor,
            selectedSize: selectedSize,
            selectedVariation: selectedVariation,
            quantity: quantity,
            category: product.category?.name,
            sku: selectedVariation.sku,
            stock: selectedVariation.stock,
            variations: processedData.variations,
        };

        // Call the onAddToCart prop with the product data
        onAddToCart(productData);

        // Close the QuickView modal after adding to cart
        onCloseQuickView();
    };

    // Get current image set - using multi_images or color_images
    const currentImages = useMemo(() => {
        // If a specific color is selected, try to get its image
        if (selectedColor) {
            const colorImage = product.color_images?.find((ci) => ci.color_attribute.id === selectedColor.id);
            if (colorImage?.image) {
                return [`https://laracomus.test/storage/${colorImage.image}`];
            }
        }

        // Fallback to multi_images or thumbnail
        const images = [];
        if (product.multi_images && product.multi_images.length > 0) {
            images.push(...product.multi_images.map((img) => `https://laracomus.test/storage/${img.photo}`));
        }
        if (product.product_thumbnail) {
            images.push(`https://laracomus.test/storage/${product.product_thumbnail}`);
        }

        return images.length > 0 ? images : ['/placeholder-image.jpg'];
    }, [selectedColor, product]);

    // Handle quantity change
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        const availableStock = selectedVariation?.stock || 0;
        if (quantity < availableStock) {
            setQuantity(quantity + 1);
        }
    };

    // Toggle wishlist status
    const toggleWishlist = () => {
        setIsInWishlist(!isInWishlist);
    };

    // Calculate if on sale and discount percentage
    const basePrice = parseFloat(product.unit_price) || 0;
    const discountPrice = parseFloat(product.discount_price) || 0;
    const variationPrice = selectedVariation ? parseFloat(selectedVariation.price) : basePrice;

    const isOnSale = product.discount_type && discountPrice > 0;
    const finalPrice = isOnSale ? Math.max(0, variationPrice - discountPrice) : variationPrice;
    const discountPercentage = isOnSale ? Math.round((discountPrice / variationPrice) * 100) : 0;

    // Check if the current variation is in stock
    const currentStock = selectedVariation?.stock || 0;
    const isInStock = currentStock > 0;

    // Buy now handler
    const handleBuyNow = () => {
        // Validate selections first
        if (!selectedColor) {
            alert('Please select a color');
            return;
        }

        if (!selectedSize || !selectedVariation) {
            alert('Please select a size');
            return;
        }

        if (!isInStock) {
            alert('Selected item is out of stock');
            return;
        }

        // Here you would handle the buy now process
        console.log('Buying now:', {
            product: product.id,
            color: selectedColor,
            size: selectedSize,
            variation: selectedVariation,
            quantity: quantity,
        });
    };
    const processedVariations = useMemo(() => {
        if (!product.variations) return [];

        return product.variations.map((v) => ({
            ...v,
            parsedAttributes: typeof v.attributes === 'string' ? JSON.parse(v.attributes) : v.attributes,
        }));
    }, [product.variations]);

    // Handle variation selection
    const handleVariationSelect = (variation) => {
        setSelectedVariation(variation);
        // You might also want to update the selected size
        setSelectedSize(variation.parsedAttributes.size);
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onCloseQuickView}>
                <div
                    className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col gap-6 md:flex-row">
                        {/* Left Side - Images */}
                        <div className="w-full px-4 md:w-1/2">
                            <div className="mb-6">
                                <div className="aspect-square w-full overflow-hidden rounded-2xl">
                                    <img
                                        src={currentImages[currentImageIndex] || '/placeholder-image.jpg'}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.target.src = '/placeholder-image.jpg';
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {/* Show current images */}
                                {currentImages.map((image, index) => (
                                    <div
                                        key={`current-image-${index}`}
                                        className={`aspect-square w-20 cursor-pointer overflow-hidden rounded-lg ${currentImageIndex === index ? 'ring-2 ring-black' : ''}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} view ${index + 1}`}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.target.src = '/placeholder-image.jpg';
                                            }}
                                        />
                                    </div>
                                ))}

                                {/* Show other color options */}
                                {product.color_images?.map((colorImg, index) => {
                                    if (selectedColor && colorImg.color_attribute.id === selectedColor.id) return null;

                                    return (
                                        <div
                                            key={`color-option-${colorImg.color_attribute.id}-${index}`}
                                            className="aspect-square w-20 cursor-pointer overflow-hidden rounded-lg opacity-70 hover:opacity-100"
                                            onClick={() => {
                                                setSelectedColor(colorImg.color_attribute);
                                                setCurrentImageIndex(0);
                                                setQuantity(1);
                                            }}
                                            title={`View in ${colorImg.color_attribute.name}`}
                                        >
                                            <img
                                                src={`https://laracomus.test/storage/${colorImg.image}`}
                                                alt={`${product.name} in ${colorImg.color_attribute.name}`}
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-image.jpg';
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Side - Details */}
                        <div className="w-full px-4 md:w-1/2">
                            {/* Header */}
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Quick View</h3>
                                <button
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-black hover:text-white"
                                    onClick={onCloseQuickView}
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Product Title and Wishlist */}
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">{product.category?.name || 'Uncategorized'}</p>
                                    <h4 className="text-xl font-bold">{product.name}</h4>
                                    {product.featured === 1 && (
                                        <span className="mr-2 rounded-full bg-blue-500 px-2 py-1 text-xs text-white">FEATURED</span>
                                    )}
                                    {product.hot_deals === 1 && (
                                        <span className="rounded-full bg-amber-500 px-2 py-1 text-xs text-white">HOT DEAL</span>
                                    )}
                                </div>
                                <button
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${isInWishlist ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`}
                                    onClick={toggleWishlist}
                                >
                                    <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
                                </button>
                            </div>

                            {/* Rating and Price */}
                            <div className="mb-4">
                                <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                                    <span className="text-amber-400">★★★★☆</span>
                                    <span>(Reviews coming soon)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    {isOnSale ? (
                                        <>
                                            <span className="text-lg font-bold">${finalPrice.toFixed(2)}</span>
                                            <del className="text-gray-400">${variationPrice.toFixed(2)}</del>
                                            <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">-{discountPercentage}%</span>
                                        </>
                                    ) : (
                                        <span className="text-lg font-bold">${variationPrice.toFixed(2)}</span>
                                    )}
                                </div>
                                <p className="mt-2 text-sm text-gray-600">{product.short_descp || 'No description available'}</p>
                            </div>

                            {/* Selection Status */}

                            {/* Color Options */}
                            <div className="mb-4">
                                <p className="mb-2 font-medium">
                                    Colors: <span className="text-gray-600">{selectedColor?.name || 'Please select'}</span>
                                </p>
                                <div className="flex gap-2">
                                    {product.color_images?.map((colorImg, index) => (
                                        <button
                                            key={`color-button-${colorImg.color_attribute.id}-${index}`}
                                            className={`h-12 w-12 overflow-hidden rounded-xl border-2 transition-all ${selectedColor?.id === colorImg.color_attribute.id ? 'border-black ring-2 ring-black ring-offset-2' : 'border-gray-300 hover:border-gray-400'}`}
                                            onClick={() => {
                                                setSelectedColor(colorImg.color_attribute);
                                                setCurrentImageIndex(0);
                                                setQuantity(1);
                                            }}
                                            style={{ backgroundColor: colorImg.color_attribute.code }}
                                            title={colorImg.color_attribute.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            <VariationSelector
                                variations={processedVariations}
                                selectedVariation={selectedVariation}
                                onSelectVariation={handleVariationSelect}
                            />

                            <div className="mt-4">
                                <VariationInfo variation={selectedVariation} />
                            </div>

                            {/* Quantity & Add to Cart */}
                            <div className="mb-4">
                                <p className="mb-2 font-medium">Quantity:</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex w-32 items-center justify-between rounded-lg border p-2">
                                        <button
                                            className={`${quantity <= 1 ? 'text-gray-300' : 'cursor-pointer hover:text-black'}`}
                                            disabled={quantity <= 1}
                                            onClick={decreaseQuantity}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span>{quantity}</span>
                                        <button
                                            className={`${quantity >= currentStock ? 'text-gray-300' : 'cursor-pointer hover:text-black'}`}
                                            disabled={quantity >= currentStock}
                                            onClick={increaseQuantity}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button
                                        className={`flex w-full items-center justify-center gap-2 border border-black px-4 py-2 transition-colors ${
                                            !selectedColor || !selectedSize || !isInStock || !selectedVariation
                                                ? 'cursor-not-allowed bg-gray-100 opacity-50'
                                                : 'hover:bg-black hover:text-white'
                                        }`}
                                        onClick={handleAddToCart}
                                        disabled={!selectedColor || !selectedSize || !isInStock || !selectedVariation}
                                    >
                                        <ShoppingBag size={16} />
                                        {!selectedColor || !selectedSize ? 'Select Options' : !isInStock ? 'Out of Stock' : 'Add To Cart'}
                                    </button>
                                </div>
                            </div>

                            {/* Buy Now */}
                            <button
                                className={`mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-black py-2 text-white transition-colors ${
                                    !selectedColor || !selectedSize || !isInStock || !selectedVariation
                                        ? 'cursor-not-allowed opacity-50'
                                        : 'hover:bg-gray-800'
                                }`}
                                onClick={handleBuyNow}
                                disabled={!selectedColor || !selectedSize || !isInStock || !selectedVariation}
                            >
                                {!selectedColor || !selectedSize ? 'Select Options First' : !isInStock ? 'Out of Stock' : 'Buy It Now'}
                            </button>

                            {/* Compare & Share */}
                            <div className="mb-4 flex gap-10">
                                <div className="flex cursor-pointer items-center gap-2 hover:text-gray-600">
                                    <BarChart2 size={16} />
                                    <span>Compare</span>
                                </div>
                                <div className="flex cursor-pointer items-center gap-2 hover:text-gray-600">
                                    <Share2 size={16} />
                                    <span>Share Product</span>
                                </div>
                            </div>

                            {/* Variation Details */}
                            {selectedVariation && (
                                <div className="mb-4 rounded-lg bg-blue-50 p-3">
                                    <p className="mb-2 font-medium text-blue-800">Selected Variation Details:</p>
                                    <div className="text-sm text-blue-700">
                                        {selectedVariation.parsedAttributes?.type && (
                                            <div>
                                                Type: <span className="font-medium">{selectedVariation.parsedAttributes.type}</span>
                                            </div>
                                        )}
                                        {selectedVariation.parsedAttributes?.material && (
                                            <div>
                                                Material: <span className="font-medium">{selectedVariation.parsedAttributes.material}</span>
                                            </div>
                                        )}
                                        {selectedVariation.parsedAttributes?.style && (
                                            <div>
                                                Style: <span className="font-medium">{selectedVariation.parsedAttributes.style}</span>
                                            </div>
                                        )}
                                        <div>
                                            SKU: <span className="font-medium">{selectedVariation.sku}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Info */}
                            <div className="space-y-3 text-sm text-gray-700">
                                <div className="flex items-center gap-2">
                                    <Timer size={16} /> <span>Estimated Delivery: 3-5 business days</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye size={16} /> <span>{Math.floor(Math.random() * 50) + 10} people viewing this product right now!</span>
                                </div>
                                <div className="border-t pt-2">
                                    <div>
                                        <span className="font-medium">SKU:</span> {product.sku || 'Not available'}
                                    </div>
                                    <div>
                                        <span className="font-medium">Category:</span> {product.category?.name || 'Not specified'}
                                    </div>
                                    <div>
                                        <span className="font-medium">Sub Category:</span> {product.sub_category?.name || 'Not specified'}
                                    </div>
                                </div>
                            </div>

                            {/* Help section */}
                            <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                                <div className="flex cursor-pointer items-center gap-2 text-blue-600 hover:underline">
                                    <HelpCircle size={16} />
                                    <span>Need Help? Contact Us</span>
                                </div>
                            </div>

                            {/* Payment Icons */}
                            <div className="mt-6 rounded-xl border border-gray-300 p-4">
                                <p className="mb-4 text-center text-sm font-medium">Guaranteed safe checkout</p>
                                <div className="grid grid-cols-6 gap-2">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="h-8 rounded bg-gray-200"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalQuickview;
