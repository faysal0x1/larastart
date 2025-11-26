'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Eye,
    Filter,
    Grid3X3,
    Heart,
    List,
    Minus,
    Search,
    Share2,
    ShoppingCart,
    SortAsc,
    Star,
    Trash2,
    TrendingDown,
    TrendingUp,
} from 'lucide-react';
import { useState } from 'react';

export function Wishlist() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy, setSortBy] = useState('date_added');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: 'Wireless Noise-Cancelling Headphones',
            brand: 'AudioTech',
            price: 299.99,
            originalPrice: 349.99,
            discount: 14,
            image: 'profile/wireless-headphones.png',
            category: 'Electronics',
            rating: 4.8,
            reviews: 1247,
            inStock: true,
            dateAdded: '2024-01-15',
            priceHistory: 'decreased',
            description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
        },
        {
            id: 2,
            name: 'Eco-Friendly Yoga Mat',
            brand: 'GreenFit',
            price: 89.99,
            originalPrice: 89.99,
            discount: 0,
            image: 'profile/wireless-headphones.png',
            category: 'Sports & Fitness',
            rating: 4.6,
            reviews: 892,
            inStock: true,
            dateAdded: '2024-01-10',
            priceHistory: 'stable',
            description: 'Non-slip, biodegradable yoga mat made from natural rubber.',
        },
        {
            id: 3,
            name: 'Smart Fitness Watch',
            brand: 'TechFit',
            price: 199.99,
            originalPrice: 179.99,
            discount: -11,
            image: 'profile/fitness-watch.png',
            category: 'Electronics',
            rating: 4.5,
            reviews: 2156,
            inStock: false,
            dateAdded: '2024-01-08',
            priceHistory: 'increased',
            description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
        },
        {
            id: 4,
            name: 'Organic Cotton T-Shirt',
            brand: 'EcoWear',
            price: 34.99,
            originalPrice: 44.99,
            discount: 22,
            image: 'profile/cotton-tshirt.png',
            category: 'Clothing',
            rating: 4.7,
            reviews: 543,
            inStock: true,
            dateAdded: '2024-01-05',
            priceHistory: 'decreased',
            description: 'Soft, sustainable t-shirt made from 100% organic cotton.',
        },
        {
            id: 5,
            name: 'Stainless Steel Water Bottle',
            brand: 'HydroLife',
            price: 24.99,
            originalPrice: 29.99,
            discount: 17,
            image: 'profile/reusable-water-bottle.png',
            category: 'Home & Garden',
            rating: 4.9,
            reviews: 1876,
            inStock: true,
            dateAdded: '2024-01-03',
            priceHistory: 'decreased',
            description: 'Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
        },
        {
            id: 6,
            name: 'Bluetooth Portable Speaker',
            brand: 'SoundWave',
            price: 79.99,
            originalPrice: 79.99,
            discount: 0,
            image: 'profile/bluetooth-speaker.png',
            category: 'Electronics',
            rating: 4.4,
            reviews: 967,
            inStock: true,
            dateAdded: '2023-12-28',
            priceHistory: 'stable',
            description: 'Waterproof portable speaker with 360-degree sound and 20-hour battery.',
        },
    ]);

    const categories = ['all', 'Electronics', 'Clothing', 'Sports & Fitness', 'Home & Garden'];

    const filteredItems = wishlistItems.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
        switch (sortBy) {
            case 'price_low':
                return a.price - b.price;
            case 'price_high':
                return b.price - a.price;
            case 'name':
                return a.name.localeCompare(b.name);
            case 'rating':
                return b.rating - a.rating;
            case 'date_added':
            default:
                return new Date(b.dateAdded) - new Date(a.dateAdded);
        }
    });

    const handleRemoveFromWishlist = (itemId) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
        console.log('[v0] Removed item from wishlist:', itemId);
    };

    const handleAddToCart = (itemId) => {
        console.log('[v0] Added item to cart:', itemId);
        // Here you would typically add the item to the shopping cart
    };

    const handleShareWishlist = () => {
        console.log('[v0] Sharing wishlist');
        // Here you would typically generate a shareable link or open share dialog
    };

    const handleViewProduct = (itemId) => {
        const product = wishlistItems.find((item) => item.id === itemId);
        setSelectedProduct(product);
        setIsProductModalOpen(true);
        console.log('[v0] Viewing product details:', itemId);
    };

    const handleCloseProductModal = () => {
        setIsProductModalOpen(false);
        setSelectedProduct(null);
    };

    const getPriceHistoryIcon = (history) => {
        switch (history) {
            case 'decreased':
                return <TrendingDown className="h-4 w-4 text-green-600" />;
            case 'increased':
                return <TrendingUp className="h-4 w-4 text-red-600" />;
            default:
                return <Minus className="h-4 w-4 text-gray-600" />;
        }
    };

    const getPriceHistoryText = (history) => {
        switch (history) {
            case 'decreased':
                return 'Price dropped';
            case 'increased':
                return 'Price increased';
            default:
                return 'Price stable';
        }
    };

    return (
        <div className="space-y-8">
            {/* Header Card */}
            <Card className="border-0 bg-white shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl text-black">My Wishlist</CardTitle>
                            <CardDescription>Save items you love for later</CardDescription>
                        </div>
                        <div className="flex items-center gap-2 text-black">
                            <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                                <Heart className="mr-1 h-3 w-3" />
                                {wishlistItems.length} Items
                            </Badge>
                            <Button variant="outline" onClick={handleShareWishlist} size="sm">
                                <Share2 className="mr-2 h-4 w-4 text-black" />
                                Share Wishlist
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Search and Filters */}
            <Card className="border-0 bg-white shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-black">
                        <Search className="h-5 w-5" />
                        Search & Filter
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4 text-black lg:flex-row">
                        <div className="relative flex-1">
                            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder="Search wishlist items..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="text-muted-foreground h-4 w-4" />
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="border-input focus:ring-ring rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <SortAsc className="text-muted-foreground h-4 w-4" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border-input focus:ring-ring rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                            >
                                <option value="date_added">Date Added</option>
                                <option value="name">Name</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-1 rounded-md border">
                            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('grid')}>
                                <Grid3X3 className="h-4 w-4" />
                            </Button>
                            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('list')}>
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Wishlist Statistics */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Total Items</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">{wishlistItems.length}</p>
                                    <Badge variant="secondary" className="bg-pink-100 text-xs text-pink-700">
                                        Saved
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-pink-500 p-3">
                                <Heart className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">On Sale</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">{wishlistItems.filter((item) => item.discount > 0).length}</p>
                                    <Badge variant="secondary" className="bg-green-100 text-xs text-green-700">
                                        Discounted
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-green-500 p-3">
                                <TrendingDown className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">In Stock</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">{wishlistItems.filter((item) => item.inStock).length}</p>
                                    <Badge variant="secondary" className="bg-blue-100 text-xs text-blue-700">
                                        Available
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-blue-500 p-3">
                                <ShoppingCart className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Total Value</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">
                                        ${wishlistItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
                                    </p>
                                    <Badge variant="secondary" className="bg-orange-100 text-xs text-orange-700">
                                        Estimated
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-orange-500 p-3">
                                <Star className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Wishlist Items */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {sortedItems.map((item) => (
                        <Card key={item.id} className="overflow-hidden border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                            <div className="relative">
                                <Avatar className="h-48 w-full rounded-none">
                                    <AvatarImage src={item.image } alt={item.name} className="object-cover" />
                                    <AvatarFallback className="h-48 rounded-none">
                                        <Heart className="h-12 w-12" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute top-2 right-2 flex gap-2">
                                    {item.discount > 0 && <Badge className="bg-red-500 text-white">-{item.discount}%</Badge>}
                                    {!item.inStock && (
                                        <Badge variant="secondary" className="bg-gray-500 text-white">
                                            Out of Stock
                                        </Badge>
                                    )}
                                </div>
                                <div className="absolute top-2 left-2">{getPriceHistoryIcon(item.priceHistory)}</div>
                            </div>
                            <CardContent className="p-4">
                                <div className="space-y-2">
                                    <Badge variant="outline" className="text-xs text-black">
                                        {item.category}
                                    </Badge>
                                    <h3 className="line-clamp-2 text-sm font-semibold text-black">{item.name}</h3>
                                    <p className="text-xs text-gray-600">{item.brand}</p>
                                    <div className="flex items-center gap-1">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-3 w-3 ${
                                                        i < Math.floor(item.rating) ? 'fill-primary text-primary' : 'fill-muted text-muted'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-muted-foreground text-xs">
                                            {item.rating} ({item.reviews})
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-black">${item.price}</span>
                                        {item.originalPrice !== item.price && (
                                            <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                                        )}
                                    </div>
                                    <p className="line-clamp-2 text-xs text-gray-600">{item.description}</p>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Button
                                        size="sm"
                                        className="flex-1 bg-sky-900 text-white"
                                        onClick={() => handleAddToCart(item.id)}
                                        disabled={!item.inStock}
                                    >
                                        <ShoppingCart className="mr-1 h-4 w-4" />
                                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => handleViewProduct(item.id)}>
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleRemoveFromWishlist(item.id)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="space-y-6">
                    {sortedItems.map((item) => (
                        <Card key={item.id} className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                            <CardContent className="p-4">
                                <div className="flex gap-4 text-black">
                                    <Avatar className="h-24 w-24 rounded-md">
                                        <AvatarImage src={item.image } alt={item.name} className="object-cover" />
                                        <AvatarFallback className="rounded-md">
                                            <Heart className="h-8 w-8" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="mb-1 flex items-center gap-2">
                                                    <Badge variant="outline" className="text-xs text-black">
                                                        {item.category}
                                                    </Badge>
                                                    {item.discount > 0 && <Badge className="bg-red-500 text-xs text-white">-{item.discount}%</Badge>}
                                                    {!item.inStock && (
                                                        <Badge variant="secondary" className="bg-gray-500 text-xs text-white">
                                                            Out of Stock
                                                        </Badge>
                                                    )}
                                                </div>
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-muted-foreground text-sm">{item.brand}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <span className="text-lg font-bold">${item.price}</span>
                                                    {item.originalPrice !== item.price && (
                                                        <span className="text-muted-foreground text-sm line-through">${item.originalPrice}</span>
                                                    )}
                                                </div>
                                                <div className="text-muted-foreground flex items-center gap-1 text-xs">
                                                    {getPriceHistoryIcon(item.priceHistory)}
                                                    <span>{getPriceHistoryText(item.priceHistory)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-3 w-3 ${
                                                            i < Math.floor(item.rating) ? 'fill-primary text-primary' : 'fill-muted text-muted'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-muted-foreground text-xs">
                                                {item.rating} ({item.reviews} reviews)
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground text-sm">{item.description}</p>
                                        <div className="flex items-center gap-2 pt-2">
                                            <Button
                                                size="sm"
                                                className="bg-sky-900 text-white"
                                                onClick={() => handleAddToCart(item.id)}
                                                disabled={!item.inStock}
                                            >
                                                <ShoppingCart className="mr-1 h-4 w-4" />
                                                {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                                            </Button>
                                            <Button size="sm" variant="outline" onClick={() => handleViewProduct(item.id)}>
                                                <Eye className="mr-1 h-4 w-4" />
                                                View Details
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleRemoveFromWishlist(item.id)}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="mr-1 h-4 w-4" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {sortedItems.length === 0 && (
                <Card className="border-0 bg-white shadow-sm">
                    <CardContent className="pt-6">
                        <div className="py-8 text-center">
                            <Heart className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-black">
                                {searchTerm || filterCategory !== 'all' ? 'No items found' : 'Your wishlist is empty'}
                            </h3>
                            <p className="mb-4 text-gray-600">
                                {searchTerm || filterCategory !== 'all'
                                    ? 'Try adjusting your search or filter criteria'
                                    : 'Start adding items you love to your wishlist'}
                            </p>
                            {!searchTerm && filterCategory === 'all' && (
                                <Button className="bg-sky-900 text-white">
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Browse Products
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Product Details Modal */}
            <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
                <DialogContent className="max-h-[90vh] min-w-[800px]  overflow-y-auto bg-gradient-to-br from-white to-gray-50 p-0 sm:p-6">
                    {selectedProduct && (
                        <>
                            {/* Enhanced Header */}
                            <div className="mb-4 rounded-t-lg bg-gradient-to-r from-sky-600 to-sky-700 p-4 text-white sm:-m-6 sm:mb-6 sm:p-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex-1">
                                        <DialogTitle className="mb-2 text-xl font-bold sm:text-2xl">{selectedProduct.name}</DialogTitle>
                                        <DialogDescription className="flex flex-col gap-2 text-sky-100 sm:flex-row sm:items-center sm:gap-4">
                                            <span>{selectedProduct.brand}</span>
                                            <Badge variant="outline" className="w-fit border-sky-200 text-sky-100">
                                                {selectedProduct.category}
                                            </Badge>
                                        </DialogDescription>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <div className="mb-1 text-2xl font-bold sm:text-3xl">${selectedProduct.price}</div>
                                        {selectedProduct.originalPrice !== selectedProduct.price && (
                                            <div className="text-base text-sky-200 line-through sm:text-lg">${selectedProduct.originalPrice}</div>
                                        )}
                                        {selectedProduct.discount > 0 && (
                                            <Badge className="mt-2 bg-red-500 text-white">Save {selectedProduct.discount}%</Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 px-4 sm:gap-8 sm:px-0 lg:grid-cols-2">
                                {/* Left Column - Product Image and Gallery */}
                                <div className="space-y-4">
                                    <div className="relative overflow-hidden rounded-xl border-0 bg-white shadow-sm">
                                        <Avatar className="h-64 w-full rounded-xl sm:h-80">
                                            <AvatarImage
                                                src={selectedProduct.image }
                                                alt={selectedProduct.name}
                                                className="h-full w-full object-cover"
                                            />
                                            <AvatarFallback className="h-64 w-full rounded-xl bg-gray-100 sm:h-80">
                                                <Heart className="h-12 w-12 text-gray-300 sm:h-16 sm:w-16" />
                                            </AvatarFallback>
                                        </Avatar>

                                        {/* Overlay Badges */}
                                        <div className="absolute top-2 right-2 flex flex-col gap-1 sm:top-4 sm:right-4 sm:gap-2">
                                            {selectedProduct.discount > 0 && (
                                                <Badge className="bg-red-500 text-xs text-white sm:text-sm">-{selectedProduct.discount}%</Badge>
                                            )}
                                            {!selectedProduct.inStock && (
                                                <Badge variant="secondary" className="bg-gray-500 text-xs text-white sm:text-sm">
                                                    Out of Stock
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Price History Indicator */}
                                        <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                                            <div className="rounded-full bg-white p-1.5 shadow-sm sm:p-2">
                                                {getPriceHistoryIcon(selectedProduct.priceHistory)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stock Status */}
                                    <div className="rounded-xl border-0 bg-white p-4 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Availability:</span>
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`h-2 w-2 rounded-full ${selectedProduct.inStock ? 'bg-green-500' : 'bg-red-500'}`}
                                                ></div>
                                                <span className={`font-medium ${selectedProduct.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                                    {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="rounded-xl border-0 bg-white p-4 shadow-sm sm:p-6">
                                        <h3 className="mb-3 font-semibold text-black sm:mb-4">Actions</h3>
                                        <div className="space-y-3">
                                            <Button
                                                className="w-full bg-sky-600 text-white hover:bg-sky-700"
                                                onClick={() => handleAddToCart(selectedProduct.id)}
                                                disabled={!selectedProduct.inStock}
                                            >
                                                <ShoppingCart className="mr-2 h-4 w-4" />
                                                {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                                            </Button>
                                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => handleRemoveFromWishlist(selectedProduct.id)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Remove
                                                </Button>
                                                <Button variant="outline" onClick={handleShareWishlist}>
                                                    <Share2 className="mr-2 h-4 w-4" />
                                                    Share
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Product Details */}
                                <div className="space-y-4 sm:space-y-6">
                                    {/* Rating and Reviews */}
                                    <div className="rounded-xl border-0 bg-white p-4 shadow-sm sm:p-6">
                                        <h3 className="mb-3 font-semibold text-black sm:mb-4">Customer Reviews</h3>
                                        <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:gap-4">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                                                            i < Math.floor(selectedProduct.rating)
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'fill-gray-200 text-gray-200'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <div>
                                                <span className="text-xl font-bold text-black sm:text-2xl">{selectedProduct.rating}</span>
                                                <span className="ml-2 text-sm text-gray-600 sm:text-base">({selectedProduct.reviews} reviews)</span>
                                            </div>
                                        </div>

                                        {/* Rating Breakdown */}
                                        <div className="space-y-2">
                                            {[5, 4, 3, 2, 1].map((stars) => (
                                                <div key={stars} className="flex items-center gap-2">
                                                    <span className="w-8 text-sm text-gray-600">{stars}★</span>
                                                    <div className="h-2 flex-1 rounded-full bg-gray-200">
                                                        <div
                                                            className="h-2 rounded-full bg-yellow-400"
                                                            style={{ width: `${Math.random() * 80 + 10}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="w-8 text-sm text-gray-600">{Math.floor(Math.random() * 50)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Product Description */}
                                    <div className="rounded-xl border-0 bg-white p-4 shadow-sm sm:p-6">
                                        <h3 className="mb-3 font-semibold text-black">Description</h3>
                                        <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{selectedProduct.description}</p>
                                    </div>

                                    {/* Price History */}
                                    <div className="rounded-xl border-0 bg-white p-4 shadow-sm sm:p-6">
                                        <h3 className="mb-3 flex items-center gap-2 font-semibold text-black">
                                            {getPriceHistoryIcon(selectedProduct.priceHistory)}
                                            Price Tracking
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600 sm:text-base">Current Price:</span>
                                                <span className="text-base font-bold text-black sm:text-lg">${selectedProduct.price}</span>
                                            </div>
                                            {selectedProduct.originalPrice !== selectedProduct.price && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-600 sm:text-base">Original Price:</span>
                                                    <span className="text-sm text-gray-500 line-through sm:text-base">
                                                        ${selectedProduct.originalPrice}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600 sm:text-base">Status:</span>
                                                <span
                                                    className={`text-sm font-medium sm:text-base ${
                                                        selectedProduct.priceHistory === 'decreased'
                                                            ? 'text-green-600'
                                                            : selectedProduct.priceHistory === 'increased'
                                                              ? 'text-red-600'
                                                              : 'text-gray-600'
                                                    }`}
                                                >
                                                    {getPriceHistoryText(selectedProduct.priceHistory)}
                                                </span>
                                            </div>
                                            <div className="mt-2 text-xs text-gray-500">
                                                Added to wishlist on{' '}
                                                {new Date(selectedProduct.dateAdded).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mx-4 mt-4 flex justify-end border-t pt-4 sm:mx-0 sm:mt-6 sm:pt-6">
                                <Button variant="outline" onClick={handleCloseProductModal} className="px-4 sm:px-6">
                                    Close
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
