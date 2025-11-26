import { useEffect, useMemo, useState, memo, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, usePage } from "@inertiajs/react"
import { ChevronRight, LayoutGrid, Loader2, Menu, X } from "lucide-react"

const CACHE_KEY = "mega_menu_categories"
const MotionLink = motion(Link)

const buildCategoryUrl = (category, parentCategory = null, grandParentCategory = null) => {
    if (!category || !category.slug) return "#"

    if (grandParentCategory && parentCategory) {
        return `/${grandParentCategory.slug}/${parentCategory.slug}/${category.slug}`
    } else if (parentCategory) {
        return `/${parentCategory.slug}/${category.slug}`
    }

    return `/${category.slug}`
}

const DesktopNestedPanel = memo(({
    currentCategory,
    currentSubCategory,
    activeSubCategory,
    handleSubCategoryEnter,
    setActiveCategory,
    minHeight = 0,
    maxHeight = 0,
}) => {
    const subcategories = currentCategory?.subcategories || []
    const gridVariants = {
        hidden: { opacity: 0, y: 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.05,
                delayChildren: 0.08,
            },
        },
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
        },
    }

    const chipVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
        },
    }

    if (!currentCategory || subcategories.length === 0) {
        return (
            <div className="p-8">
                <p className="text-base text-slate-400">No subcategories available.</p>
            </div>
        )
    }

    const computedMinHeight = Math.max(minHeight || 0, 320)

    return (
        <div
            className="min-w-lg w-full min-h-80 bg-linear-to-br from-slate-800 to-slate-850 p-8"
            style={{
                minHeight: computedMinHeight ? `${computedMinHeight}px` : undefined,
                maxHeight: maxHeight ? `${maxHeight}px` : undefined,
                overflowY: maxHeight ? "auto" : undefined,
            }}
        >
            <div className="mb-6 pb-4 border-b border-slate-700/50 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">{currentCategory.name}</h3>
                    <p className="text-sm text-slate-400 mt-1">Browse curated picks inside this category.</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">
                    {subcategories.length} Collections
                </span>
            </div>

            <motion.div
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 rounded-2xl border border-slate-700/60 bg-linear-to-br from-slate-900/70 via-slate-900/40 to-slate-800/40 p-5 shadow-inner"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
            >
                {subcategories.map((sub) => {
                    const hasChildren = sub.child_categories && sub.child_categories.length > 0
                    const isActive = activeSubCategory === sub.id

                    return (
                        <motion.div
                            key={sub.id}
                            className="space-y-3 group"
                            variants={cardVariants}
                            onMouseEnter={() => handleSubCategoryEnter(sub.id)}
                        >
                            <MotionLink
                                href={buildCategoryUrl(sub, currentCategory)}
                                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-semibold transition-all duration-200 cursor-pointer ring-1 ring-transparent ${isActive
                                    ? "bg-linear-to-r from-blue-600/95 via-indigo-500/95 to-blue-500/90 text-white shadow-lg ring-blue-300/40"
                                    : "bg-slate-900/60 text-slate-100 hover:bg-slate-800/80 hover:text-white hover:ring-blue-400/30"
                                    }`}
                                whileHover={{ y: -2, scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.18 }}
                                onClick={() => setActiveCategory(null)}
                            >
                                <span className="truncate">{sub.name}</span>
                                {hasChildren && (
                                    <ChevronRight
                                        size={16}
                                        className={`transition-all duration-300 shrink-0 ml-2 ${isActive ? "text-white translate-x-0.5" : "text-slate-400"
                                            }`}
                                    />
                                )}
                            </MotionLink>

                            {hasChildren && (
                                <motion.div className="grid grid-cols-2 gap-2 mt-1.5" variants={gridVariants} initial="hidden" animate="visible">
                                    {sub.child_categories.map((child) => (
                                        <motion.div key={child.id} variants={chipVariants}>
                                            <MotionLink
                                                href={buildCategoryUrl(child, sub, currentCategory)}
                                                className={`flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold tracking-wide uppercase rounded-full border transition-all duration-150 ${isActive
                                                    ? "bg-blue-500/10 text-blue-100 border-blue-400/60"
                                                    : "bg-slate-900/50 text-slate-200 border-slate-700/80 hover:border-blue-400/40 hover:text-white"
                                                    }`}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => setActiveCategory(null)}
                                            >
                                                <span className="truncate">{child.name}</span>
                                                <ChevronRight size={12} className="text-slate-400" />
                                            </MotionLink>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    )
})

DesktopNestedPanel.displayName = "DesktopNestedPanel"

function MegaMenu() {
    const { props } = usePage()
    const cacheConfig = props.frontendCategoryCache || { enabled: true, ttlMinutes: 5 }
    const cacheEnabled = cacheConfig.enabled !== false
    const cacheTTL = Math.min(5, Math.max(1, cacheConfig.ttlMinutes || 5)) * 60 * 1000

    const [categoriesData, setCategoriesData] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState(null)
    const [activeSubCategory, setActiveSubCategory] = useState(null)
    const [hoverTimeout, setHoverTimeout] = useState(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [openMobileCategories, setOpenMobileCategories] = useState([])
    const parentListRef = useRef(null)
    const [parentListHeight, setParentListHeight] = useState(0)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                if (cacheEnabled) {
                    const cachedData = localStorage.getItem(CACHE_KEY)
                    if (cachedData) {
                        const { data, timestamp } = JSON.parse(cachedData)
                        const now = Date.now()

                        if (now - timestamp < cacheTTL) {
                            setCategoriesData(data || [])
                            setLoading(false)
                            return
                        } else {
                            localStorage.removeItem(CACHE_KEY)
                        }
                    }
                }

                setLoading(true)
                const url = typeof route !== "undefined" ? route("api.categories") : "/web/categories"
                const response = await fetch(url)
                const data = await response.json()
                const categories = data.data || []

                if (cacheEnabled) {
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        data: categories,
                        timestamp: Date.now()
                    }))
                }

                setCategoriesData(categories)
            } catch (error) {
                console.error("Error fetching categories:", error)
                if (cacheEnabled) {
                    const cachedData = localStorage.getItem(CACHE_KEY)
                    if (cachedData) {
                        try {
                            const { data } = JSON.parse(cachedData)
                            setCategoriesData(data || [])
                        } catch (e) {
                            setCategoriesData([])
                        }
                    } else {
                        setCategoriesData([])
                    }
                } else {
                    setCategoriesData([])
                }
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [cacheEnabled, cacheTTL])

    useEffect(() => {
        const updateParentHeight = () => {
            if (parentListRef.current) {
                setParentListHeight(parentListRef.current.offsetHeight)
            }
        }

        updateParentHeight()
        window.addEventListener("resize", updateParentHeight)

        return () => {
            window.removeEventListener("resize", updateParentHeight)
        }
    }, [categoriesData, loading, activeCategory])

    const currentCategory = useMemo(
        () => categoriesData.find((category) => category.id === activeCategory),
        [categoriesData, activeCategory]
    )

    const currentSubCategory = useMemo(
        () => currentCategory?.subcategories?.find((sub) => sub.id === activeSubCategory),
        [currentCategory, activeSubCategory]
    )

    const handleCategoryEnter = useCallback((categoryId) => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout)
            setHoverTimeout(null)
        }

        setActiveCategory(categoryId)
        setActiveSubCategory(null)
    }, [hoverTimeout])

    const handleMenuLeave = useCallback(() => {
        const timeout = setTimeout(() => {
            setActiveCategory(null)
            setActiveSubCategory(null)
        }, 150)

        setHoverTimeout(timeout)
    }, [])

    const handleSubCategoryEnter = useCallback((subCategoryId) => {
        setActiveSubCategory(subCategoryId)
    }, [])

    useEffect(() => {
        return () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout)
            }
        }
    }, [hoverTimeout])

    const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), [])

    const toggleMobileCategory = useCallback((categoryId) => {
        setOpenMobileCategories((prev) =>
            prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
        )
    }, [])

    return (
        <div className="relative w-full z-40">
            {/* Desktop Menu */}
            <div className="hidden md:block">
                <div
                    className="flex w-full bg-linear-to-r from-slate-800 via-slate-850 to-slate-800 border-y border-slate-700/50 shadow-xl relative z-40"
                    onMouseLeave={handleMenuLeave}
                >
                    <div className="w-56 border-r border-slate-700 bg-slate-800">
                        <div ref={parentListRef} className="h-full">
                            {loading ? (
                                <div className="flex items-center justify-center gap-2 py-6 text-slate-300">
                                    <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                                    <span className="text-sm font-medium">Loading...</span>
                                </div>
                            ) : (
                                <ul className="py-1">
                                    {categoriesData.map((category) => {
                                        const isActive = activeCategory === category.id
                                        return (
                                            <li key={category.id}>
                                                <Link
                                                    href={buildCategoryUrl(category)}
                                                    onMouseEnter={() => handleCategoryEnter(category.id)}
                                                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-left transition-all duration-300 border-l-4 ${isActive
                                                        ? "bg-slate-700 text-white border-blue-500 shadow-md"
                                                        : "hover:bg-slate-700 text-slate-200 border-transparent hover:border-slate-600"
                                                        }`}
                                                    onClick={() => setActiveCategory(null)}
                                                >
                                                    <LayoutGrid className={`h-4 w-4 transition-colors shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                                                    <span className="text-sm font-medium flex-1 truncate">{category.name}</span>
                                                    <ChevronRight className={`h-3.5 w-3.5 transition-all shrink-0 ${isActive ? 'text-blue-400 translate-x-1' : 'text-slate-500'}`} />
                                                </Link>
                                            </li>
                                        )
                                    })}
                                    {!loading && categoriesData.length === 0 && (
                                        <li className="px-3 py-2.5 text-sm text-slate-400">No categories available.</li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="relative flex-1 overflow-visible">
                        <AnimatePresence>
                            {currentCategory && currentCategory.subcategories && currentCategory.subcategories.length > 0 && (
                                <motion.div
                                    layout
                                    key={currentCategory.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute left-0 top-0 min-w-[850px] w-full max-w-5xl min-h-80 bg-linear-to-br from-slate-800 to-slate-850 border border-slate-700/50 shadow-2xl z-50 rounded-r-lg overflow-hidden"
                                    style={{
                                        minHeight: parentListHeight ? `${parentListHeight}px` : undefined,
                                        maxHeight: parentListHeight ? `${parentListHeight}px` : undefined,
                                    }}
                                    onMouseEnter={() => handleCategoryEnter(currentCategory.id)}
                                >
                                    <DesktopNestedPanel
                                        currentCategory={currentCategory}
                                        currentSubCategory={currentSubCategory}
                                        activeSubCategory={activeSubCategory}
                                        handleSubCategoryEnter={handleSubCategoryEnter}
                                        setActiveCategory={setActiveCategory}
                                        minHeight={parentListHeight}
                                        maxHeight={parentListHeight}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
                <button
                    onClick={toggleMobileMenu}
                    className="w-full flex items-center justify-between p-5 bg-linear-to-r from-slate-800 to-slate-850 border-y border-slate-700/50 shadow-lg"
                >
                    <div className="flex items-center gap-3">
                        <Menu className="h-5 w-5 text-blue-400" />
                        <span className="text-base font-semibold text-white">Browse Categories</span>
                    </div>
                    <motion.div
                        animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-1 bg-slate-800 border border-slate-700/50 shadow-xl overflow-hidden rounded-lg"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-3 py-8 text-slate-300">
                                    <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
                                    <span className="text-base font-medium">Loading categories...</span>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-700/50">
                                    {categoriesData.map((category) => {
                                        const isOpen = openMobileCategories.includes(category.id)
                                        const hasSubcategories = category.subcategories && category.subcategories.length > 0

                                        return (
                                            <div key={category.id} className="bg-slate-800">
                                                <div className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-700 transition-all duration-150">
                                                    <Link
                                                        href={buildCategoryUrl(category)}
                                                        className="flex items-center gap-3 flex-1"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        <LayoutGrid className="h-5 w-5 text-blue-400" />
                                                        <span className="text-base font-medium text-white truncate">
                                                            {category.name}
                                                        </span>
                                                    </Link>
                                                    {hasSubcategories && (
                                                        <motion.button
                                                            onClick={() => toggleMobileCategory(category.id)}
                                                            animate={{ rotate: isOpen ? 90 : 0 }}
                                                            transition={{ duration: 0.22 }}
                                                            className={`p-1.5 rounded-lg transition-colors ${isOpen ? "bg-blue-600 text-blue-100" : "text-slate-400 hover:bg-slate-700"
                                                                }`}
                                                            aria-label="Toggle subcategories"
                                                        >
                                                            <ChevronRight className="h-5 w-5" />
                                                        </motion.button>
                                                    )}
                                                </div>

                                                <AnimatePresence>
                                                    {hasSubcategories && isOpen && (
                                                        <motion.div
                                                            layout
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="bg-slate-700/85 border-t border-slate-600 px-5 py-4 space-y-3 rounded-2xl mb-3"
                                                        >
                                                            {category.subcategories.map((sub) => {
                                                                const hasChildren = sub.child_categories && sub.child_categories.length > 0
                                                                return (
                                                                    <div key={sub.id} className="space-y-2">
                                                                        <Link
                                                                            href={buildCategoryUrl(sub, category)}
                                                                            className="flex items-center justify-between text-base font-medium text-white hover:text-blue-300 py-2.5 px-4 bg-slate-600 hover:bg-slate-500 rounded-lg transition-all duration-150 shadow-sm"
                                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                                        >
                                                                            <span>{sub.name}</span>
                                                                            {hasChildren && (
                                                                                <ChevronRight className="h-4 w-4 text-slate-400" />
                                                                            )}
                                                                        </Link>

                                                                        {hasChildren && (
                                                                            <div className="grid grid-cols-2 gap-1.5 pl-3">
                                                                                {sub.child_categories.map((child) => (
                                                                                    <MotionLink
                                                                                        key={child.id}
                                                                                        href={buildCategoryUrl(child, sub, category)}
                                                                                        className="flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase text-slate-100 hover:text-white py-1.5 px-3 rounded-full border border-slate-500/70 bg-slate-700/50 hover:bg-slate-600/70 transition-all duration-150"
                                                                                        whileHover={{ scale: 1.03 }}
                                                                                        whileTap={{ scale: 0.97 }}
                                                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                                                    >
                                                                                        <span className="truncate">{child.name}</span>
                                                                                        <ChevronRight size={12} />
                                                                                    </MotionLink>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )
                                                            })}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )
                                    })}

                                    {!loading && categoriesData.length === 0 && (
                                        <div className="p-5 text-base text-slate-400">No categories available.</div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default memo(MegaMenu)
