import { useState, useMemo, useEffect } from "react"
import { ChevronRight, LayoutGrid, Tag, Layers3, Monitor, Zap, Smartphone, HardHat, Loader2 } from "lucide-react"
import { Link, usePage } from "@inertiajs/react"
// import { route } from "ziggy-js" // Uncomment if using Ziggy

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

// -------------------------------------------------------------------
// --- Component for the Nested Flyout Menu Content ---
// -------------------------------------------------------------------
const NestedFlyout = ({ currentCategory, currentSubCategory, activeSubCategory, handleSubCategoryEnter, setActiveCategory }) => {

    // Determine if the child category panel should be shown.
    // This is true only if a subcategory is active AND it has child categories.
    const showChildPanel = currentSubCategory && currentSubCategory.child_categories && currentSubCategory.child_categories.length > 0;

    return (
        <div className="flex">
            {/* Left Panel: Subcategory List (always shown when category is active) */}
            <div className="min-w-60 w-60 bg-gray-50 border-r border-gray-200 p-3 overflow-y-auto" style={{ maxHeight: '350px' }}>
                <div className="mb-3 pb-2 border-b border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 truncate max-w-full">
                        {currentCategory.name}
                    </h3>
                </div>

                <div className="space-y-0.5">
                    {currentCategory.subcategories.map((sub) => (
                        <Link
                            key={sub.id}
                            href={buildCategoryUrl(sub, currentCategory)}
                            className={`flex items-center justify-between px-2 py-1.5 rounded text-xs transition-all duration-100 cursor-pointer group ${activeSubCategory === sub.id
                                ? "bg-white text-blue-600 font-semibold shadow-sm"
                                : "text-gray-700 hover:bg-white hover:text-gray-900"
                                }`}
                            onMouseEnter={() => handleSubCategoryEnter(sub.id)}
                            onClick={() => setActiveCategory(null)} // Close all menus on click
                        >
                            <span className="truncate max-w-[180px]">{sub.name}</span>
                            {sub.child_categories && sub.child_categories.length > 0 && (
                                <ChevronRight
                                    size={12}
                                    className={`transition-colors ${activeSubCategory === sub.id ? 'text-blue-600' : 'text-gray-400'}`}
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Right Panel: Child Category Flyout (Only shown if showChildPanel is true) */}
            {showChildPanel && (
                <div className="min-w-60 w-60 bg-white p-3 shadow-md overflow-y-auto border-l border-gray-200" style={{ maxHeight: '350px' }}>
                    <div className="mb-3 pb-2 border-b border-gray-200">
                        <h3 className="text-sm font-bold text-gray-800 truncate max-w-full">
                            {currentSubCategory.name}
                        </h3>
                    </div>
                    <div className="space-y-0.5">
                        {currentSubCategory.child_categories.map((child) => (
                            <Link
                                key={child.id}
                                href={buildCategoryUrl(child, currentSubCategory, currentCategory)}
                                className="flex items-center justify-between px-2 py-1.5 bg-gray-50 hover:bg-blue-50 rounded border border-gray-200 hover:border-blue-300 transition-all duration-100 group"
                                onClick={() => setActiveCategory(null)} // Close all menus on click
                            >
                                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 truncate">
                                    {child.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
// -------------------------------------------------------------------

// -------------------------------------------------------------------
// --- Main Nav Component ---
// -------------------------------------------------------------------
export default function Nav() {
    const { props } = usePage();
    const cacheConfig = props.frontendCategoryCache || { enabled: true, ttlMinutes: 5 };
    const cacheEnabled = cacheConfig.enabled !== false;
    const cacheTTL = Math.min(5, Math.max(1, cacheConfig.ttlMinutes || 5)) * 60 * 1000; // Convert to milliseconds, max 5 min

    const CACHE_KEY = "nav_categories";

    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activeCategory, setActiveCategory] = useState(null);
    const [activeSubCategory, setActiveSubCategory] = useState(null);
    const [hoverTimeout, setHoverTimeout] = useState(null);

    // Fetch categories data
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Check cache first if enabled
                if (cacheEnabled) {
                    const cachedData = localStorage.getItem(CACHE_KEY);
                    if (cachedData) {
                        const { data, timestamp } = JSON.parse(cachedData);
                        const now = Date.now();

                        // Use cached data if it's still valid
                        if (now - timestamp < cacheTTL) {
                            setCategoriesData(data || []);
                            setLoading(false);
                            return;
                        } else {
                            // Cache expired, remove it
                            localStorage.removeItem(CACHE_KEY);
                        }
                    }
                }

                setLoading(true);
                // Note: If using Inertia/Laravel, ensure the 'route' function is defined/imported.
                const url = typeof route !== 'undefined' ? route('api.categories') : '/web/categories';
                const response = await fetch(url);
                const data = await response.json();
                const categories = data.data || [];

                // Cache the response if enabled
                if (cacheEnabled) {
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        data: categories,
                        timestamp: Date.now()
                    }));
                }

                setCategoriesData(categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
                // Try to use cached data as fallback even if expired
                if (cacheEnabled) {
                    const cachedData = localStorage.getItem(CACHE_KEY);
                    if (cachedData) {
                        try {
                            const { data } = JSON.parse(cachedData);
                            setCategoriesData(data || []);
                        } catch (e) {
                            setCategoriesData([]);
                        }
                    } else {
                        setCategoriesData([]);
                    }
                } else {
                    setCategoriesData([]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [cacheEnabled, cacheTTL]);

    const currentCategory = useMemo(() =>
        categoriesData.find(c => c.id === activeCategory),
        [activeCategory, categoriesData]
    );

    const currentSubCategory = useMemo(() =>
        currentCategory?.subcategories?.find(sc => sc.id === activeSubCategory),
        [currentCategory, activeSubCategory]
    );

    const handleCategoryEnter = (categoryId) => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
        setActiveCategory(categoryId);
        setActiveSubCategory(null);
    };

    const handleCategoryLeave = () => {
        // Add a delay before closing the menu
        const timeout = setTimeout(() => {
            setActiveCategory(null);
            setActiveSubCategory(null);
        }, 150);
        setHoverTimeout(timeout);
    };

    // Handler passed to NestedFlyout to highlight the active subcategory
    const handleSubCategoryEnter = (subCategoryId) => {
        setActiveSubCategory(subCategoryId);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
        };
    }, [hoverTimeout]);

    // --- Render Logic ---

    if (loading) {
        return (
            <div className="font-['Inter',_sans-serif] antialiased bg-gray-50">
                <nav className="border-b bg-white hidden md:block shadow-sm">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-center gap-8 py-4">
                            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                            <span className="text-gray-600">Loading categories...</span>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }

    return (
        <div className="font-['Inter',_sans-serif] antialiased bg-gray-50">
            <nav
                className="border-b bg-white hidden md:block shadow-sm"
                onMouseLeave={handleCategoryLeave}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-0 text-xs">
                        {categoriesData.map((category) => {
                            const isActive = activeCategory === category.id;
                            const hasSubcategories = category.subcategories && category.subcategories.length > 0;
                            const showFlyout = hasSubcategories && isActive;

                            // Check if the current active subcategory has children to determine panel width
                            const showChildPanel = currentSubCategory && currentSubCategory.child_categories && currentSubCategory.child_categories.length > 0;

                            // Dynamic width: 240px for single panel, 480px for nested panels
                            const dynamicWidth = showChildPanel ? '480px' : '240px';

                            return (
                                <div
                                    key={category.id}
                                    className="relative"
                                    onMouseEnter={() => handleCategoryEnter(category.id)}
                                >
                                    <Link
                                        href={buildCategoryUrl(category, null, null)}
                                        className={`group flex items-center gap-1 font-medium text-xs py-2 px-2 transition-all duration-200 border-b-2 whitespace-nowrap ${isActive
                                            ? "text-blue-600 border-blue-600 bg-blue-50"
                                            : "text-gray-700 border-transparent hover:text-blue-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        <span className="truncate max-w-[120px]">{category.name}</span>
                                    </Link>

                                    {/* Main Dropdown Container */}
                                    {showFlyout && (
                                        <div
                                            className="absolute left-0 top-full z-50 mt-0 transition-all duration-100 ease-in-out"
                                            style={{ width: dynamicWidth }}
                                            onMouseEnter={() => {
                                                // Clear timeout immediately on re-entering the menu area
                                                if (hoverTimeout) {
                                                    clearTimeout(hoverTimeout);
                                                    setHoverTimeout(null);
                                                }
                                            }}
                                            onMouseLeave={handleCategoryLeave} // Use the delayed close handler
                                        >
                                            <div className="bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden mt-1">
                                                <NestedFlyout
                                                    currentCategory={currentCategory}
                                                    currentSubCategory={currentSubCategory}
                                                    activeSubCategory={activeSubCategory}
                                                    handleSubCategoryEnter={handleSubCategoryEnter}
                                                    setActiveCategory={setActiveCategory} // Passed to close the menu on click
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </div>
    );
}
