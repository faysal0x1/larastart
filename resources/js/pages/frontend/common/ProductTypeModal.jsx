import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ExternalLink, Heart, Minus, Plus, Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const ProductTypeModal = ({
    isOpen,
    onClose,
    product = {
        id: 1,
        name: 'Smart Light Switch with Thread',
        brand: 'Apple',
        price: 49.99,
        rating: 4,
        reviewCount: 1,
        inStock: true,
        images: ['/placeholder-product-1.jpg', '/placeholder-product-2.jpg', '/placeholder-product-3.jpg'],
        description: 'A smart light switch that works seamlessly with Thread technology for reliable smart home connectivity.',
    },
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isFavorited, setIsFavorited] = useState(false);

    // Reset currentImageIndex when product changes (must be before early return)
    useEffect(() => {
        setCurrentImageIndex(0);
        setQuantity(1);
        setIsFavorited(false);
    }, [product?.id]);

    // Early return if product is null or doesn't have required properties
    if (!product || !product.images || !Array.isArray(product.images) || product.images.length === 0) {
        return null;
    }

    // Ensure currentImageIndex is within bounds
    const safeImageIndex = Math.min(currentImageIndex, (product.images?.length || 1) - 1);

    const handlePreviousImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleAddToCart = () => {
        // Add to cart logic
        console.log(`Adding ${quantity} of product ${product.id || 'unknown'} to cart`);
    };

    const handleBuyNow = () => {
        // Buy now logic
        console.log(`Buying ${quantity} of product ${product.id || 'unknown'} now`);
    };

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    const renderStars = (rating) => {
        const safeRating = Math.max(0, Math.min(5, rating || 0));
        return Array.from({ length: 5 }, (_, index) => (
            <Star key={index} className={cn('h-4 w-4', index < safeRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300')} />
        ));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] w-[85%] max-w-[1200px] min-w-[800px] gap-0 overflow-hidden overflow-y-auto rounded-2xl border-0 bg-white p-0 shadow-xl">
                {/* Close button */}
                <DialogClose className="absolute top-3 right-3 z-50 rounded-full bg-white/95 p-2 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-gray-100 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                    <X className="h-4 w-4 text-gray-600" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <div className="flex min-h-[600px] flex-col lg:flex-row">
                    {/* Left side - Product Images */}
                    <div className="relative order-1 flex items-center justify-center lg:order-none lg:w-2/5">
                        <div className="relative mx-auto w-full max-w-4xl p-6 lg:p-8">
                            <div className="relative flex items-center justify-center rounded-2xl">
                                <img
                                    src={product.images[safeImageIndex]}
                                    alt={product.name}
                                    className="h-[400px] w-[400px] cursor-zoom-in object-contain transition-all duration-500 ease-out hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = '/api/placeholder/400/400';
                                    }}
                                />
                            </div>

                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePreviousImage}
                                        className="absolute top-1/2 -left-1 -translate-y-1/2 rounded-full border border-gray-200 bg-white/95 p-2 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none lg:-left-3 lg:p-2.5"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="h-4 w-4 text-gray-700" />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute top-1/2 -right-1 -translate-y-1/2 rounded-full border border-gray-200 bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none lg:-right-3 lg:p-2.5"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="h-4 w-4 text-gray-700" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Image indicators */}
                        {product.images.length > 1 && (
                            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm lg:bottom-4 lg:gap-2 lg:px-3 lg:py-2">
                                {product.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={cn(
                                            'h-2 w-2 rounded-full transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none lg:h-2.5 lg:w-2.5',
                                            index === safeImageIndex ? 'scale-125 bg-blue-600 shadow-sm' : 'bg-gray-300 hover:bg-gray-400',
                                        )}
                                        aria-label={`View image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right side - Product Details */}
                    <div className="order-2 flex flex-col bg-white p-6 lg:order-none lg:w-3/5 lg:p-8">
                        {/* Brand */}
                        <div className="mb-4">
                            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 text-sm font-semibold text-green-700 ring-1 ring-green-200">
                                <span className="mr-1">🏷️</span>
                                {product.brand || 'Unknown Brand'}
                            </span>
                        </div>

                        {/* Rating */}
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex items-center gap-1 rounded-lg bg-yellow-50 px-3 py-1">{renderStars(product.rating)}</div>
                            <span className="text-sm font-medium text-gray-600">
                                ({product.reviewCount || 0} review{(product.reviewCount || 0) !== 1 ? 's' : ''})
                            </span>
                        </div>

                        {/* Product Title */}
                        <h2 className="mb-4 text-xl leading-tight font-bold tracking-tight text-gray-900 lg:text-2xl xl:text-3xl">
                            {product.name || 'Product Name'}
                        </h2>

                        {/* Stock Status */}
                        <div className="mb-4">
                            <Badge
                                variant={product.inStock ? 'default' : 'destructive'}
                                className={cn(
                                    'rounded-lg px-3 py-2 text-sm font-semibold shadow-sm ring-1',
                                    product.inStock
                                        ? 'border-green-200 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 ring-green-200'
                                        : 'border-red-200 bg-gradient-to-r from-red-100 to-pink-100 text-red-800 ring-red-200',
                                )}
                            >
                                {product.inStock ? (
                                    <span className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                        In Stock
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                                        Out of Stock
                                    </span>
                                )}
                            </Badge>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <div className="flex items-baseline gap-3">
                                <span className="text-2xl font-bold tracking-tight text-gray-900 lg:text-3xl">
                                    ${(product.price || 0).toFixed(2)}
                                </span>
                                <span className="text-base font-medium text-gray-500">USD</span>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">Price includes all applicable taxes</p>
                        </div>

                        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                            <div className="flex items-center">
                                <button
                                    onClick={decreaseQuantity}
                                    disabled={quantity <= 1}
                                    className="h-10 w-10 rounded-l-lg border border-r-0 border-gray-300 bg-white text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-800 focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="mx-auto h-4 w-4" />
                                </button>
                                <div className="flex h-10 w-14 items-center justify-center border border-gray-300 bg-white">
                                    <span className="text-base font-semibold text-gray-900">{quantity}</span>
                                </div>
                                <button
                                    onClick={increaseQuantity}
                                    className="h-10 w-10 rounded-r-lg border border-l-0 border-gray-300 bg-white text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-800 focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="mx-auto h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="mb-6 space-y-3">
                            <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
                                <Button
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                    className="h-12 flex-1 bg-gradient-to-r from-gray-900 to-gray-800 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-black hover:to-gray-900 hover:shadow-xl focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none active:scale-[0.98] disabled:hover:translate-y-0"
                                >
                                    <span className="flex items-center gap-2">Add to cart • ${((product.price || 0) * quantity).toFixed(2)}</span>
                                </Button>
                                <div className="flex gap-2 sm:gap-3">
                                    <Button
                                        onClick={toggleFavorite}
                                        variant="outline"
                                        size="icon"
                                        className="h-12 w-12 border-2 transition-all duration-300 hover:scale-105 hover:border-red-300 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none active:scale-95"
                                        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                                    >
                                        <Heart
                                            className={cn(
                                                'h-5 w-5 transition-all duration-200',
                                                isFavorited ? 'scale-110 fill-red-500 text-red-500' : 'text-gray-500',
                                            )}
                                        />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-12 w-12 border-2 transition-all duration-300 hover:scale-105 hover:border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none active:scale-95"
                                        aria-label="Share product"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                            />
                                        </svg>
                                    </Button>
                                </div>
                            </div>

                            <Button
                                onClick={handleBuyNow}
                                disabled={!product.inStock}
                                className="h-12 w-full bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 hover:shadow-xl focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none active:scale-[0.98] disabled:hover:translate-y-0"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span className="font-bold">BUY IT NOW</span>
                                    <ExternalLink className="h-4 w-4" />
                                </span>
                            </Button>
                        </div>

                        {/* View Full Details Link */}
                        <div className="mt-auto border-t border-gray-200 pt-4">
                            <button
                                className="group flex items-center gap-3 border-b-2 border-transparent pb-1 font-semibold text-gray-700 transition-all duration-300 hover:border-blue-600 hover:text-blue-600 focus:border-blue-600 focus:text-blue-600 focus:outline-none"
                                aria-label="View full product details"
                            >
                                <span>View full details</span>
                                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Example usage component with trigger
export const ProductModalTrigger = ({ children, product }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsOpen(true)} className="cursor-pointer">
                {children}
            </div>
            <ProductTypeModal isOpen={isOpen} onClose={() => setIsOpen(false)} product={product} />
        </>
    );
};

export default ProductTypeModal;
