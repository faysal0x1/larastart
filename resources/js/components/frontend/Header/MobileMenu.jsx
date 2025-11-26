import { useState, useEffect, useRef } from 'react';
import { Link, router } from '@inertiajs/react';
import { Menu, Plus, User, Settings, LogOut, LogIn, Loader2, ChevronRight } from 'lucide-react';

// Cache categories outside component to persist across renders
let cachedCategories = [];
let categoriesCacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default function MobileMenu({ auth }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'profile'
    const [expandedCategories, setExpandedCategories] = useState({});
    const [expandedSubcategories, setExpandedSubcategories] = useState({});
    const [mobileCategories, setMobileCategories] = useState(cachedCategories);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categoryError, setCategoryError] = useState(null);
    const hasLoadedRef = useRef(false);

    // Category URL builder logic (supports 3 levels like Nav.jsx)
    const buildCategoryUrl = (category, parentCategory = null, grandParentCategory = null) => {
        if (!category || !category.slug) return '#';

        // Build nested URL: parent/sub or parent/sub/child
        if (grandParentCategory && parentCategory) {
            // Child category: parent/sub/child
            return `/${grandParentCategory.slug}/${parentCategory.slug}/${category.slug}`;
        } else if (parentCategory) {
            // Subcategory: parent/sub
            return `/${parentCategory.slug}/${category.slug}`;
        } else {
            // Root category: just the slug
            return `/${category.slug}`;
        }
    };

    // Load categories with caching - only load once or when cache expires
    useEffect(() => {
        // Check if we have valid cached data
        const now = Date.now();
        const isCacheValid = cachedCategories.length > 0 &&
            categoriesCacheTimestamp &&
            (now - categoriesCacheTimestamp) < CACHE_DURATION;

        // If cache is valid, use it immediately (no need to reload)
        if (isCacheValid && cachedCategories.length > 0) {
            if (mobileCategories.length === 0) {
                setMobileCategories(cachedCategories);
            }
            hasLoadedRef.current = true;
            return;
        }

        // If already loaded in this session and cache exists, use it
        if (hasLoadedRef.current && cachedCategories.length > 0) {
            if (mobileCategories.length === 0) {
                setMobileCategories(cachedCategories);
            }
            return;
        }

        // Only load when menu opens (if not cached)
        if (!isMobileMenuOpen) {
            return;
        }

        let isMounted = true;

        const loadCategories = async () => {
            try {
                setIsLoadingCategories(true);
                setCategoryError(null);

                const response = await fetch(typeof route !== 'undefined' ? route('api.categories') : '/api/categories');
                if (!response.ok) {
                    throw new Error('Failed to load categories');
                }

                const data = await response.json();
                const categories = Array.isArray(data.data) ? data.data : [];

                if (isMounted) {
                    // Update cache
                    cachedCategories = categories;
                    categoriesCacheTimestamp = Date.now();
                    setMobileCategories(categories);
                    hasLoadedRef.current = true;
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error loading categories:', error);
                    setCategoryError('Unable to load categories right now.');
                }
            } finally {
                if (isMounted) {
                    setIsLoadingCategories(false);
                }
            }
        };

        loadCategories();

        return () => {
            isMounted = false;
        };
    }, [isMobileMenuOpen, mobileCategories.length]);

    const toggleCategoryExpand = (categoryId) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    const toggleSubcategoryExpand = (subcategoryId) => {
        setExpandedSubcategories((prev) => ({
            ...prev,
            [subcategoryId]: !prev[subcategoryId],
        }));
    };

    const handleMobileMenuChange = (open) => {
        setIsMobileMenuOpen(open);
        if (!open) {
            // Reset state when closing
            setActiveTab('menu');
            setExpandedCategories({});
            setExpandedSubcategories({});
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Handle category name click (navigate if no subcategories, or if already expanded)
    const handleCategoryNameClick = (e, category) => {
        e.preventDefault();
        // If no subcategories, navigate directly
        if (!category.subcategories?.length) {
            handleMobileMenuChange(false);
            router.visit(buildCategoryUrl(category));
            return;
        }
        // If has subcategories and is already expanded, navigate
        if (expandedCategories[category.id]) {
            handleMobileMenuChange(false);
            router.visit(buildCategoryUrl(category));
            return;
        }
        // Otherwise, just expand (don't navigate)
        toggleCategoryExpand(category.id);
    };

    // Handle + icon click (only expand/collapse, never navigate)
    const handleExpandIconClick = (e, category) => {
        e.preventDefault();
        e.stopPropagation();
        toggleCategoryExpand(category.id);
    };

    // Handle subcategory name click
    const handleSubcategoryNameClick = (e, subcategory, category) => {
        e.preventDefault();
        // If no child categories, navigate directly
        if (!subcategory.child_categories?.length) {
            handleMobileMenuChange(false);
            router.visit(buildCategoryUrl(subcategory, category));
            return;
        }
        // If has child categories and is already expanded, navigate
        if (expandedSubcategories[subcategory.id]) {
            handleMobileMenuChange(false);
            router.visit(buildCategoryUrl(subcategory, category));
            return;
        }
        // Otherwise, just expand (don't navigate)
        toggleSubcategoryExpand(subcategory.id);
    };

    // Handle subcategory expand icon click
    const handleSubcategoryExpandIconClick = (e, subcategory) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSubcategoryExpand(subcategory.id);
    };

    return (
        <div className="md:hidden">
            {/* Hamburger Menu Button */}
            <button
                onClick={() => handleMobileMenuChange(true)}
                className="p-2 hover:opacity-80 transition-opacity"
                aria-label="Open menu"
            >
                <Menu className="w-6 h-6 text-white" />
            </button>

            {/* Mobile Menu Sidebar */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => handleMobileMenuChange(false)}
                    />

                    {/* Slide-in Panel */}
                    <div className="relative w-80 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-lg flex flex-col max-h-screen">
                        {/* Close Button Area */}
                        <div className="absolute top-4 right-4 z-10">
                            <button
                                onClick={() => handleMobileMenuChange(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                aria-label="Close menu"
                            >
                                <span className="text-2xl">×</span>
                            </button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex border-b border-white/10 mt-4">
                            <button
                                onClick={() => handleTabChange('menu')}
                                className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors ${activeTab === 'menu'
                                    ? 'bg-white/20 border-b-2 border-white text-white'
                                    : 'text-white/70 hover:text-white'
                                    }`}
                            >
                                Menu
                            </button>
                            <button
                                onClick={() => handleTabChange('profile')}
                                className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors ${activeTab === 'profile'
                                    ? 'bg-white/20 border-b-2 border-white text-white'
                                    : 'text-white/70 hover:text-white'
                                    }`}
                            >
                                Profile
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Menu Tab */}
                            {activeTab === 'menu' && (
                                <div className="p-4 space-y-2">
                                    <h3 className="text-xs uppercase tracking-wide text-white/70 font-semibold mb-4">
                                        Categories
                                    </h3>
                                    {isLoadingCategories ? (
                                        <div className="text-center py-6 text-white/70">
                                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                            <p className="text-sm">Loading Categories...</p>
                                        </div>
                                    ) : categoryError ? (
                                        <div className="text-center py-6 text-red-400">
                                            <p className="text-sm">{categoryError}</p>
                                        </div>
                                    ) : mobileCategories.length === 0 ? (
                                        <div className="text-center py-6 text-white/70">
                                            <p className="text-sm">No categories found.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            {mobileCategories.map((category) => (
                                                <div key={category.id}>
                                                    {/* Category Row */}
                                                    <div className="w-full flex items-center justify-between px-3 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white text-sm font-medium">
                                                        {/* Category Name (clickable) */}
                                                        <Link
                                                            href={buildCategoryUrl(category)}
                                                            onClick={(e) => handleCategoryNameClick(e, category)}
                                                            prefetch
                                                            className="flex-1 text-left"
                                                        >
                                                            {category.name}
                                                        </Link>
                                                        {/* Expand Icon (only for categories with subcategories) */}
                                                        {category.subcategories?.length > 0 && (
                                                            <button
                                                                onClick={(e) => handleExpandIconClick(e, category)}
                                                                className="ml-2 p-1 hover:bg-white/20 rounded transition-colors"
                                                                aria-label={expandedCategories[category.id] ? 'Collapse' : 'Expand'}
                                                            >
                                                                <Plus
                                                                    className={`w-4 h-4 transition-transform ${expandedCategories[category.id] ? 'rotate-45' : ''
                                                                        }`}
                                                                />
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* Subcategories */}
                                                    {category.subcategories?.length > 0 && expandedCategories[category.id] && (
                                                        <div className="ml-4 mt-1 space-y-1 border-l border-white/20 pl-3">
                                                            {category.subcategories.map((subcategory) => (
                                                                <div key={subcategory.id}>
                                                                    {/* Subcategory Row */}
                                                                    <div className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white text-sm">
                                                                        {/* Subcategory Name (clickable) */}
                                                                        <Link
                                                                            href={buildCategoryUrl(subcategory, category)}
                                                                            onClick={(e) => handleSubcategoryNameClick(e, subcategory, category)}
                                                                            prefetch
                                                                            className="flex-1 text-left"
                                                                        >
                                                                            {subcategory.name}
                                                                        </Link>
                                                                        {/* Expand Icon (only for subcategories with child categories) */}
                                                                        {subcategory.child_categories?.length > 0 && (
                                                                            <button
                                                                                onClick={(e) => handleSubcategoryExpandIconClick(e, subcategory)}
                                                                                className="ml-2 p-1 hover:bg-white/20 rounded transition-colors"
                                                                                aria-label={expandedSubcategories[subcategory.id] ? 'Collapse' : 'Expand'}
                                                                            >
                                                                                <ChevronRight
                                                                                    className={`w-3.5 h-3.5 transition-transform ${expandedSubcategories[subcategory.id] ? 'rotate-90' : ''
                                                                                        }`}
                                                                                />
                                                                            </button>
                                                                        )}
                                                                    </div>

                                                                    {/* Child Categories */}
                                                                    {subcategory.child_categories?.length > 0 && expandedSubcategories[subcategory.id] && (
                                                                        <div className="ml-4 mt-1 space-y-1 border-l border-white/20 pl-3">
                                                                            {subcategory.child_categories.map((childCategory) => (
                                                                                <Link
                                                                                    key={childCategory.id}
                                                                                    href={buildCategoryUrl(childCategory, subcategory, category)}
                                                                                    onClick={() => handleMobileMenuChange(false)}
                                                                                    prefetch
                                                                                    className="w-full text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white text-xs block"
                                                                                >
                                                                                    {childCategory.name}
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Profile Tab */}
                            {activeTab === 'profile' && (
                                <div className="p-4 space-y-4">
                                    {/* User Profile Card */}
                                    {auth?.user && (
                                        <div className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                                                {auth.user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white">{auth.user.name}</p>
                                                <p className="text-xs text-white/70">{auth.user.email}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Profile Options */}
                                    {auth?.user ? (
                                        <div className="space-y-2">
                                            <h3 className="text-xs uppercase tracking-wide text-white/70 font-semibold">
                                                Account
                                            </h3>
                                            <Link
                                                href={route('dashboard')}
                                                onClick={() => handleMobileMenuChange(false)}
                                                prefetch
                                                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white text-sm font-medium"
                                            >
                                                <User className="w-4 h-4" />
                                                <span>My Profile</span>
                                            </Link>
                                            <Link
                                                href={route('profile.edit')}
                                                onClick={() => handleMobileMenuChange(false)}
                                                prefetch
                                                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white text-sm font-medium"
                                            >
                                                <Settings className="w-4 h-4" />
                                                <span>Settings</span>
                                            </Link>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                onClick={() => handleMobileMenuChange(false)}
                                                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white text-sm font-medium"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Sign Out</span>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <h3 className="text-xs uppercase tracking-wide text-white/70 font-semibold">
                                                Please Login
                                            </h3>
                                            <Link
                                                href={route('login')}
                                                onClick={() => handleMobileMenuChange(false)}
                                                prefetch
                                                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white text-sm font-medium"
                                            >
                                                <LogIn className="w-4 h-4" />
                                                <span>Login</span>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

