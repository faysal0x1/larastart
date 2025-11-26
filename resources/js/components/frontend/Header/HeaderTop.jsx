import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, CreditCard, Heart, LogOut, MapPin, Package, Search, Settings, ShoppingCart, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';

export default function Header() {
    const { auth, cart } = usePage().props;
    const [cartData, setCartData] = useState({ itemCount: 0, total: 0 });
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [isLoadingRecentlyViewed, setIsLoadingRecentlyViewed] = useState(false);
    const cleanup = useMobileNavigation();

    // alert(auth.user);
    // console.table(auth.user.name);

    useEffect(() => {
        return () => {
            cleanup();
        };
    }, [cleanup]);

    // Update cart data when cart prop changes
    useEffect(() => {
        if (cart) {
            console.log('Cart data from props:', cart);

            // Calculate total from items if total is not available
            let calculatedTotal = 0;
            if (cart.items && cart.items.length > 0) {
                calculatedTotal = cart.items.reduce((sum, item) => {
                    return sum + (parseFloat(item.total_price) || 0);
                }, 0);
            }

            setCartData({
                itemCount: cart.total_items || cart.items?.length || 0,
                total: cart.total || cart.total_amount || calculatedTotal,
            });
        }
    }, [cart]);

    // Get user initials
    const getUserInitials = (name) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Format currency in BDT
    // const formatCurrency = (amount) => {
    //     const numericAmount = parseFloat(amount) || 0

    //     try {
    //         // Try to format with BDT currency
    //         return new Intl.NumberFormat('bn-BD', {
    //             style: 'currency',
    //             currency: 'BDT',
    //             minimumFractionDigits: 0,
    //             maximumFractionDigits: 0
    //         }).format(numericAmount)
    //     } catch (error) {
    //         // Fallback to manual BDT formatting
    //         return `৳${numericAmount.toLocaleString('en-BD', {
    //             minimumFractionDigits: 0,
    //             maximumFractionDigits: 0
    //         })}`
    //     }
    // }

    const formatCurrency = (amount) => {
        const numericAmount = parseFloat(amount) || 0;

        return `৳${numericAmount.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })}`;
    };

    // Debounced search function (from HeaderTop copy.jsx)
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            // Show recently viewed when search is empty and dropdown is open
            if (showSearchDropdown && recentlyViewed.length > 0) {
                return;
            }
            return;
        }

        const timeoutId = setTimeout(async () => {
            try {
                setIsSearching(true);
                const response = await fetch(`${route('api.search')}?q=${encodeURIComponent(searchQuery)}&limit=8`);
                if (!response.ok) {
                    throw new Error('Search failed');
                }
                const data = await response.json();
                setSearchResults(data.data || []);
                setShowSearchDropdown(true);
            } catch (error) {
                console.error('Search error:', error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timeoutId);
    }, [searchQuery, showSearchDropdown, recentlyViewed.length]);

    // Close dropdown when clicking outside (from HeaderTop copy.jsx)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showSearchDropdown && !event.target.closest('.search-container')) {
                setShowSearchDropdown(false);
            }
        };

        if (showSearchDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showSearchDropdown]);

    // Handle search submission (from HeaderTop copy.jsx)
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to search results page or keep dropdown open
            setShowSearchDropdown(true);
        }
    };

    // Close modal (from HeaderTop copy.jsx)
    const closeModal = () => {
        setIsSearchModalOpen(false);
        setSearchQuery('');
        setSearchResults([]);
        setShowSearchDropdown(false);
    };

    // Handle product click - Close modal on mobile after selection (from HeaderTop copy.jsx)
    const handleProductClick = (slug) => {
        setShowSearchDropdown(false);
        // Close mobile search modal when product is clicked
        setIsSearchModalOpen(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <header className="bg-[#1e3a8a] text-white">
            <div className="flex w-full items-center justify-between px-3 py-3 sm:px-6">
                {/* Left Section - Logo and Navigation Links */}
                <div className="flex items-center space-x-4 sm:space-x-6">
                    {/* TBZ Logo - Link to Home */}
                    <Link href={route('home')} prefetch className="flex items-center transition-opacity hover:opacity-80">
                        <img
                            src="https://tbz.com.bd/images/website/174523155388191193.png"
                            alt="TBZ Logo"
                            className="h-8 w-8 object-contain sm:h-10 sm:w-10"
                        />
                    </Link>
                </div>

                {/* Center Section - Search Bar (Desktop) - From HeaderTop copy.jsx */}
                <div className="mx-4 hidden max-w-2xl flex-1 sm:block">
                    <div className="search-container relative">
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => {
                                    if (searchQuery.trim()) {
                                        setShowSearchDropdown(true);
                                    } else if (recentlyViewed.length > 0) {
                                        setShowSearchDropdown(true);
                                    }
                                }}
                                className="w-full rounded-md bg-white px-4 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded bg-orange-500 p-1.5 hover:bg-orange-600"
                            >
                                <Search className="h-4 w-4 text-white" />
                            </button>
                        </form>

                        {/* Search Results Dropdown */}
                        {showSearchDropdown && (
                            <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl">
                                {isSearching ? (
                                    <div className="p-4 text-center text-gray-500">
                                        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-orange-500"></div>
                                        <p className="mt-2 text-sm">Searching...</p>
                                    </div>
                                ) : searchQuery.trim() && searchResults.length > 0 ? (
                                    <div className="py-2">
                                        {searchResults.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={route('web.slug', product.slug)}
                                                onClick={() => handleProductClick(product.slug)}
                                                className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 transition-colors last:border-b-0 hover:bg-gray-50"
                                            >
                                                <img
                                                    src={product.image_url || '/placeholder.svg'}
                                                    alt={product.name}
                                                    className="h-12 w-12 rounded object-cover"
                                                    onError={(e) => {
                                                        e.target.src = '/placeholder.svg';
                                                    }}
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="truncate text-sm font-medium text-gray-900">{product.name}</h4>
                                                    <div className="mt-1 flex items-center gap-2">
                                                        {product.call_for_price ? (
                                                            <span className="text-sm font-semibold text-orange-600">Call for Price</span>
                                                        ) : (
                                                            <>
                                                                <span className="text-sm font-bold text-gray-900">
                                                                    {formatCurrency(product.final_price || product.unit_price)}
                                                                </span>
                                                                {product.unit_price &&
                                                                    product.final_price &&
                                                                    product.unit_price > product.final_price && (
                                                                        <span className="text-xs text-gray-400 line-through">
                                                                            {formatCurrency(product.unit_price)}
                                                                        </span>
                                                                    )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : searchQuery.trim() ? (
                                    <div className="p-4 text-center text-gray-500">
                                        <p className="text-sm">No products found</p>
                                    </div>
                                ) : recentlyViewed.length > 0 ? (
                                    <div className="py-2">
                                        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
                                            <h3 className="text-xs font-semibold tracking-wide text-gray-600 uppercase">Recently Visited</h3>
                                        </div>
                                        {recentlyViewed.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={route('web.slug', product.slug)}
                                                onClick={() => handleProductClick(product.slug)}
                                                className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 transition-colors last:border-b-0 hover:bg-gray-50"
                                            >
                                                <img
                                                    src={product.image_url || '/placeholder.svg'}
                                                    alt={product.name}
                                                    className="h-12 w-12 rounded object-cover"
                                                    onError={(e) => {
                                                        e.target.src = '/placeholder.svg';
                                                    }}
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="truncate text-sm font-medium text-gray-900">{product.name}</h4>
                                                    <div className="mt-1 flex items-center gap-2">
                                                        {product.call_for_price ? (
                                                            <span className="text-sm font-semibold text-orange-600">Call for Price</span>
                                                        ) : (
                                                            <>
                                                                <span className="text-sm font-bold text-gray-900">
                                                                    {formatCurrency(product.final_price || product.unit_price)}
                                                                </span>
                                                                {product.unit_price &&
                                                                    product.final_price &&
                                                                    product.unit_price > product.final_price && (
                                                                        <span className="text-xs text-gray-400 line-through">
                                                                            {formatCurrency(product.unit_price)}
                                                                        </span>
                                                                    )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : isLoadingRecentlyViewed ? (
                                    <div className="p-4 text-center text-gray-500">
                                        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-orange-500"></div>
                                        <p className="mt-2 text-sm">Loading...</p>
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Search Icon */}
                <button onClick={() => setIsSearchModalOpen(true)} className="p-2 transition-opacity hover:opacity-80 sm:hidden">
                    <Search className="h-5 w-5" />
                </button>

                {/* Right Section - User Account and Cart (unchanged) */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                    {/* User Account - Hidden on mobile */}
                    {auth?.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="hidden cursor-pointer items-center space-x-2 transition-opacity hover:opacity-80 sm:flex">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 sm:h-9 sm:w-9">
                                        <span className="text-sm font-medium text-white">{getUserInitials(auth.user.name)}</span>
                                    </div>
                                    <div className="hidden text-sm lg:block">
                                        <div className="text-xs opacity-90">Welcome</div>
                                        <div className="flex items-center font-medium">
                                            {auth.user.name?.split(' ')[0]}
                                            <ChevronDown className="ml-1 h-3 w-3" />
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuItem asChild>
                                    <Link href={route('dashboard')} className="flex items-center">
                                        <User className="mr-2 h-4 w-4" />
                                        My Account
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={route('profile.edit')} className="flex items-center">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Account Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/orders" className="flex items-center">
                                        <Package className="mr-2 h-4 w-4" />
                                        My Orders
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/wishlist" className="flex items-center">
                                        <Heart className="mr-2 h-4 w-4" />
                                        Wishlist
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/addresses" className="flex items-center">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        Addresses
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/payment-methods" className="flex items-center">
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Payment Methods
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                        onClick={cleanup}
                                        className="flex items-center text-red-600"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href={route('login')} className="hidden items-center space-x-2 transition-opacity hover:opacity-80 sm:flex">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 sm:h-9 sm:w-9">
                                <User className="h-4 w-4 text-white" />
                            </div>
                            <div className="hidden text-sm lg:block">
                                <div className="text-xs opacity-90">Hello, Sign in</div>
                                <div className="font-medium">Account</div>
                            </div>
                        </Link>
                    )}

                    {/* Returns & Orders - Hidden on mobile */}
                    <Link href="/orders" className="hidden text-sm transition-opacity hover:opacity-80 lg:block">
                        <div className="text-xs opacity-90">Returns</div>
                        <div className="font-medium">& Orders</div>
                    </Link>

                    {/* Shopping Cart */}
                    <Link href={route('shop.cart')} className="flex items-center space-x-2 transition-opacity hover:opacity-80">
                        <div className="relative">
                            <ShoppingCart className="h-6 w-6" />
                            {cartData.itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                                    {cartData.itemCount}
                                </span>
                            )}
                        </div>
                        <div className="hidden text-sm sm:block">
                            <div className="text-xs opacity-90">Cart</div>
                            <div className="font-medium">
                                {cartData.itemCount > 0 ? `${cartData.itemCount} Item${cartData.itemCount !== 1 ? 's' : ''}` : 'Empty'}
                            </div>
                        </div>
                    </Link>

                    {/* Mobile Menu */}
                    <MobileMenu auth={auth} />
                </div>
            </div>

            {/* Mobile Search Modal (from HeaderTop copy.jsx) */}
            {isSearchModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-3 pt-12 backdrop-blur-xl sm:px-4 sm:pt-20"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    <div className="flex max-h-[85vh] w-full max-w-md flex-col rounded-lg bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-shrink-0 items-center justify-between border-b p-3 sm:p-4">
                            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">Search Products</h3>
                            <button onClick={closeModal} className="rounded-full p-1 transition-colors hover:bg-gray-100" aria-label="Close search">
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="flex flex-1 flex-col overflow-hidden">
                            <form onSubmit={handleSearch} className="flex-shrink-0 p-3 sm:p-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => {
                                            if (searchQuery.trim()) {
                                                setShowSearchDropdown(true);
                                            } else if (recentlyViewed.length > 0) {
                                                setShowSearchDropdown(true);
                                            }
                                        }}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-12 text-sm text-gray-900 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none sm:py-3 sm:text-base"
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-lg bg-orange-500 p-1.5 transition-colors hover:bg-orange-600 sm:p-2"
                                        aria-label="Search"
                                    >
                                        <Search className="h-4 w-4 text-white" />
                                    </button>
                                </div>
                            </form>

                            {/* Mobile Search Results Dropdown */}
                            {showSearchDropdown && (
                                <div className="flex-1 overflow-y-auto px-3 pb-3 sm:px-4 sm:pb-4">
                                    <div className="rounded-lg border border-gray-200 bg-white shadow-lg">
                                        {isSearching ? (
                                            <div className="p-4 text-center text-gray-500">
                                                <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-orange-500"></div>
                                                <p className="mt-2 text-sm">Searching...</p>
                                            </div>
                                        ) : searchQuery.trim() && searchResults.length > 0 ? (
                                            <div className="py-2">
                                                {searchResults.map((product) => (
                                                    <Link
                                                        key={product.id}
                                                        href={route('web.slug', product.slug)}
                                                        onClick={() => handleProductClick(product.slug)}
                                                        className="flex items-center gap-2 border-b border-gray-100 px-3 py-2.5 transition-colors last:border-b-0 hover:bg-gray-50 active:bg-gray-100 sm:gap-3 sm:px-4 sm:py-3"
                                                    >
                                                        <img
                                                            src={product.image_url || '/placeholder.svg'}
                                                            alt={product.name}
                                                            className="h-12 w-12 flex-shrink-0 rounded object-cover sm:h-16 sm:w-16"
                                                            onError={(e) => {
                                                                e.target.src = '/placeholder.svg';
                                                            }}
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <h4 className="line-clamp-2 text-xs font-medium text-gray-900 sm:text-sm">
                                                                {product.name}
                                                            </h4>
                                                            <div className="mt-1 flex flex-wrap items-center gap-2">
                                                                {product.call_for_price ? (
                                                                    <span className="text-xs font-semibold text-orange-600 sm:text-sm">
                                                                        Call for Price
                                                                    </span>
                                                                ) : (
                                                                    <>
                                                                        <span className="text-xs font-bold text-gray-900 sm:text-sm">
                                                                            {formatCurrency(product.final_price || product.unit_price)}
                                                                        </span>
                                                                        {product.unit_price &&
                                                                            product.final_price &&
                                                                            product.unit_price > product.final_price && (
                                                                                <span className="text-xs text-gray-400 line-through">
                                                                                    {formatCurrency(product.unit_price)}
                                                                                </span>
                                                                            )}
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : searchQuery.trim() ? (
                                            <div className="p-4 text-center text-gray-500">
                                                <p className="text-sm">No products found</p>
                                            </div>
                                        ) : recentlyViewed.length > 0 ? (
                                            <div className="py-2">
                                                <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 sm:px-4">
                                                    <h3 className="text-xs font-semibold tracking-wide text-gray-600 uppercase">Recently Visited</h3>
                                                </div>
                                                {recentlyViewed.map((product) => (
                                                    <Link
                                                        key={product.id}
                                                        href={route('web.slug', product.slug)}
                                                        onClick={() => handleProductClick(product.slug)}
                                                        className="flex items-center gap-2 border-b border-gray-100 px-3 py-2.5 transition-colors last:border-b-0 hover:bg-gray-50 active:bg-gray-100 sm:gap-3 sm:px-4 sm:py-3"
                                                    >
                                                        <img
                                                            src={product.image_url || '/placeholder.svg'}
                                                            alt={product.name}
                                                            className="h-12 w-12 flex-shrink-0 rounded object-cover sm:h-16 sm:w-16"
                                                            onError={(e) => {
                                                                e.target.src = '/placeholder.svg';
                                                            }}
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <h4 className="line-clamp-2 text-xs font-medium text-gray-900 sm:text-sm">
                                                                {product.name}
                                                            </h4>
                                                            <div className="mt-1 flex flex-wrap items-center gap-2">
                                                                {product.call_for_price ? (
                                                                    <span className="text-xs font-semibold text-orange-600 sm:text-sm">
                                                                        Call for Price
                                                                    </span>
                                                                ) : (
                                                                    <>
                                                                        <span className="text-xs font-bold text-gray-900 sm:text-sm">
                                                                            {formatCurrency(product.final_price || product.unit_price)}
                                                                        </span>
                                                                        {product.unit_price &&
                                                                            product.final_price &&
                                                                            product.unit_price > product.final_price && (
                                                                                <span className="text-xs text-gray-400 line-through">
                                                                                    {formatCurrency(product.unit_price)}
                                                                                </span>
                                                                            )}
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : isLoadingRecentlyViewed ? (
                                            <div className="p-4 text-center text-gray-500">
                                                <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-orange-500"></div>
                                                <p className="mt-2 text-sm">Loading...</p>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex-shrink-0 border-t px-3 pt-3 pb-3 sm:px-4 sm:pt-4 sm:pb-4">
                            <button
                                onClick={closeModal}
                                className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200 sm:text-base"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
