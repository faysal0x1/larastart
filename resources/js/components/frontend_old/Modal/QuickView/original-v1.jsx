import React, { useState } from 'react';
import { X, Heart, Minus, Plus, Timer, Eye, ShoppingBag, Share2, BarChart2, HelpCircle } from 'lucide-react';

import CartModal from '../CartModal/CartModal'; 
// Color to hex mapping for visual representation
const colorMap = {
  red: '#f44336',
  blue: '#2196f3',
  green: '#4caf50'
};

const ModalQuickview = ({ isOpen, onClose, product }) => {
  // Early return if modal is closed or no product
  if (!isOpen || !product) return null;

  // State for the selected color, size, quantity and wishlist
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]); // Default to 'M'
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get current image set based on selected color
  const currentImages = product.images[selectedColor] || product.defaultImages;
  
  // Format the color name
  const formatColorName = (color) => {
    return color.charAt(0).toUpperCase() + color.slice(1);
  };

  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    // Check inventory before increasing
    const availableStock = product.inventory[selectedColor][selectedSize];
    if (quantity < availableStock) {
      setQuantity(quantity + 1);
    }
  };

  // Toggle wishlist status
  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  // Calculate if on sale and discount percentage
  const isOnSale = product.price > product.discountedPrice;
  const discountPercentage = isOnSale 
    ? Math.round((1 - product.discountedPrice / product.price) * 100) 
    : 0;

  // Check if the current size/color combo is in stock
  const currentStock = product.inventory[selectedColor][selectedSize];
  const isInStock = currentStock > 0;

  // Add to cart handler
  const handleAddToCart = () => {
    // Here you would handle adding to cart with the selected options
    console.log('Adding to cart:', {
      product: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity
    });
    // You could also close the modal or show a confirmation
  };

  // Buy now handler
  const handleBuyNow = () => {
    // Here you would handle the buy now process
    console.log('Buying now:', {
      product: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity
    });
    // You could redirect to checkout or show a confirmation
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - Images */}
          <div className="w-full md:w-1/2 px-4">
            <div className="mb-6">
              <div className="aspect-square w-full rounded-2xl overflow-hidden">
                <img 
                  src="/api/placeholder/800/800"
                  alt={`${product.title} in ${selectedColor}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {currentImages && currentImages.map((_, index) => (
                <div 
                  key={index}
                  className={`aspect-square w-20 rounded-lg overflow-hidden cursor-pointer ${currentImageIndex === index ? 'ring-2 ring-black' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img 
                    src="/api/placeholder/80/80"
                    alt={`${product.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="w-full md:w-1/2 px-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Quick View</h3>
              <button 
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-black hover:text-white transition-colors"
                onClick={onClose}
              >
                <X size={18} />
              </button>
            </div>

            {/* Product Title and Wishlist */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs uppercase text-gray-500">{product.category}</p>
                <h4 className="text-xl font-bold">{product.title}</h4>
                {product.isNew && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full mr-2">NEW</span>
                )}
                {product.isBestSeller && (
                  <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">BEST SELLER</span>
                )}
              </div>
              <button 
                className={`w-10 h-10 border rounded-lg flex items-center justify-center transition-colors ${isInWishlist ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`}
                onClick={toggleWishlist}
              >
                <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Rating and Price */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span className="text-amber-400">★★★★☆</span>
                <span>(1,234 reviews)</span>
              </div>
              <div className="flex items-center gap-3">
                {isOnSale ? (
                  <>
                    <span className="text-lg font-bold">${product.discountedPrice.toFixed(2)}</span>
                    <del className="text-gray-400">${product.price.toFixed(2)}</del>
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">-{discountPercentage}%</span>
                  </>
                ) : (
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                )}
              </div>
              <p className="text-gray-600 mt-2 text-sm">{product.description.short}</p>
            </div>

            {/* Color Options */}
            <div className="mb-4">
              <p className="font-medium mb-2">
                Colors: <span className="text-gray-600">{formatColorName(selectedColor)}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: colorMap[color] }}
                    title={formatColorName(color)}
                  />
                ))}
              </div>
            </div>

            {/* Size Options */}
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <p className="font-medium">Size: <span className="text-gray-600">{selectedSize}</span></p>
                <span className="text-sm underline text-blue-600 cursor-pointer">Size Guide</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.sizes.map((size, i) => {
                  const stockForSize = product.inventory[selectedColor][size];
                  const isOutOfStock = stockForSize === 0;
                  
                  return (
                    <button 
                      key={i} 
                      className={`w-12 h-12 flex items-center justify-center border rounded-full text-sm 
                        ${selectedSize === size ? 'bg-black text-white' : ''} 
                        ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-black hover:text-white'} 
                        transition-colors`}
                      onClick={() => !isOutOfStock && setSelectedSize(size)}
                      disabled={isOutOfStock}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              <p className="text-sm mt-2 text-gray-600">
                {isInStock ? 
                  `${currentStock} items available` : 
                  'Out of stock in this size/color'
                }
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mb-4">
              <p className="font-medium mb-2">Quantity:</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-between border rounded-lg w-32 p-2">
                  <button
                    className={`${quantity <= 1 ? 'text-gray-300' : 'cursor-pointer'}`}
                    disabled={quantity <= 1}
                    onClick={decreaseQuantity}
                  >
                    <Minus size={16} />
                  </button>
                  <span>{quantity}</span>
                  <button
                    className={`${quantity >= currentStock ? 'text-gray-300' : 'cursor-pointer'}`}
                    disabled={quantity >= currentStock}
                    onClick={increaseQuantity}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button 
                  className="border border-black w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors"
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                >
                  <ShoppingBag size={16} />
                  Add To Cart
                </button>
              </div>
            </div>

            {/* Buy Now */}
            <button 
              className="w-full py-2 bg-black text-white rounded-lg mb-4 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              onClick={handleBuyNow}
              disabled={!isInStock}
            >
              Buy It Now
            </button>

            {/* Compare & Share */}
            <div className="flex gap-10 mb-4">
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-600">
                <BarChart2 size={16} />
                <span>Compare</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-600">
                <Share2 size={16} />
                <span>Share Product</span>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="font-medium">Material:</span> {product.description.material}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Care:</span> {product.description.care}
              </div>
              <div className="flex items-center gap-2">
                <Timer size={16} /> <span>Estimated Delivery: 3-5 business days</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={16} /> <span>{Math.floor(Math.random() * 50) + 10} people viewing this product right now!</span>
              </div>
              <div className="pt-2 border-t">
                <div><span className="font-medium">SKU:</span> {product.sku}</div>
                <div><span className="font-medium">Category:</span> {product.category}</div>
                <div><span className="font-medium">Type:</span> {product.type}</div>
              </div>
            </div>
            
            {/* Help section */}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline">
                <HelpCircle size={16} />
                <span>Need Help? Contact Us</span>
              </div>
            </div>

            {/* Payment Icons */}
            <div className="border border-gray-300 rounded-xl mt-6 p-4">
              <p className="text-center text-sm font-medium mb-4">Guaranteed safe checkout</p>
              <div className="grid grid-cols-6 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalQuickview;