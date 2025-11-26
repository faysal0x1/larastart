
import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"

const BrandFilterSidebar = ({ onFiltersChange, activeFilters = {}, onClearFilters }) => {
    const initialFilters = {
        inStock: false,
        onSale: false,
        freeShipping: false,
        isNew: false,
        comboDeal: false,
        subcategory: [],
        priceRange: [],
        priceMin: '',
        priceMax: '',
        rating: [],
        condition: [],
        availability: [],
    }

    const [filters, setFilters] = useState(initialFilters)

    const [expandedSections, setExpandedSections] = useState({})

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    const handleToggleChange = (filterKey) => {
        const newFilters = {
            ...filters,
            [filterKey]: !filters[filterKey],
        }
        setFilters(newFilters)
        onFiltersChange?.(newFilters)
    }

    const handleCheckboxChange = (filterKey, value) => {
        const currentValues = filters[filterKey] || []
        const newValues = currentValues.includes(value)
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value]

        const newFilters = {
            ...filters,
            [filterKey]: newValues,
        }
        setFilters(newFilters)
        onFiltersChange?.(newFilters)
    }

    const handlePriceInputChange = (key, value) => {
        const sanitized = value === '' ? '' : Number(value)
        const newFilters = { ...filters, [key]: sanitized }
        setFilters(newFilters)
        onFiltersChange?.(newFilters)
    }

    const handleClearAll = () => {
        setFilters(initialFilters)
        onFiltersChange?.(initialFilters)
        onClearFilters?.()
    }

    const ToggleSwitch = ({ checked, onChange, label }) => (
        <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
                <div className={`w-11 h-6 rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-gray-300"}`}>
                    <div
                        className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${checked ? "translate-x-5" : "translate-x-0"
                            } mt-0.5 ml-0.5`}
                    />
                </div>
            </label>
        </div>
    )

    const FilterSection = ({ title, children, sectionKey }) => (
        <div className="border-b border-gray-200">
            <button
                onClick={() => toggleSection(sectionKey)}
                className="w-full flex items-center justify-between py-2.5 px-3 text-left hover:bg-gray-50 transition-colors"
            >
                <span className="font-medium text-gray-900 text-sm">{title}</span>
                {expandedSections[sectionKey] ? (
                    <ChevronUp className="w-4 h-4 text-gray-500 transition-transform duration-300" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-300" />
                )}
            </button>
            <div
                className="px-3 pb-3 overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: expandedSections[sectionKey] ? "16rem" : "0px", opacity: expandedSections[sectionKey] ? 1 : 0 }}
            >
                <div className="pr-1 max-h-64 overflow-y-auto">{children}</div>
            </div>
        </div>
    )

    const CheckboxItem = ({ label, value, filterKey, count }) => (
        <label className="flex items-center py-1 cursor-pointer hover:bg-gray-50 rounded px-2">
            <input
                type="checkbox"
                checked={filters[filterKey]?.includes(value) || false}
                onChange={() => handleCheckboxChange(filterKey, value)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-xs text-gray-700 flex-1">{label}</span>
            {count && <span className="text-xs text-gray-500">({count})</span>}
        </label>
    )

    const PriceRangeInput = () => (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <input
                    type="number"
                    placeholder="Min"
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-xs"
                    value={filters.priceMin}
                    onChange={(e) => handlePriceInputChange('priceMin', e.target.value)}
                />
                <span className="text-gray-500">to</span>
                <input
                    type="number"
                    placeholder="Max"
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-xs"
                    value={filters.priceMax}
                    onChange={(e) => handlePriceInputChange('priceMax', e.target.value)}
                />
            </div>
            <div className="space-y-1">
                {[
                    { label: "$0 - $10", value: "0-10", count: 45 },
                    { label: "$10 - $25", value: "10-25", count: 123 },
                    { label: "$25 - $50", value: "25-50", count: 234 },
                    { label: "$50 - $75", value: "50-75", count: 156 },
                    { label: "$75 - $100", value: "75-100", count: 89 },
                    { label: "$100 - $200", value: "100-200", count: 167 },
                    { label: "$200 - $300", value: "200-300", count: 78 },
                    { label: "$300+", value: "300+", count: 45 },
                ].map((range) => (
                    <CheckboxItem
                        key={range.value}
                        label={range.label}
                        value={range.value}
                        filterKey="priceRange"
                        count={range.count}
                    />
                ))}
            </div>
        </div>
    )

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-gray-900">Filters</h2>
                    {onClearFilters && Object.keys(activeFilters).length > 0 && (
                        <button
                            onClick={handleClearAll}
                            className="flex items-center gap-1 text-xs text-red-600 hover:text-red-800 font-medium transition-colors duration-200 px-2 py-1 rounded hover:bg-red-50"
                            title="Clear all filters"
                        >
                            <X size={12} />
                            Clear All
                        </button>
                    )}
                </div>
            </div>

            {/* Quick Toggles */}
            <div className="p-3 border-b border-gray-200 space-y-2">
                <ToggleSwitch checked={filters.inStock} onChange={() => handleToggleChange("inStock")} label="In Stock" />
                <ToggleSwitch
                    checked={filters.onSale}
                    onChange={() => handleToggleChange("onSale")}
                    label="On Sale"
                />
                <ToggleSwitch
                    checked={filters.freeShipping}
                    onChange={() => handleToggleChange("freeShipping")}
                    label="Free Shipping"
                />
                <ToggleSwitch checked={filters.isNew} onChange={() => handleToggleChange("isNew")} label="New" />
                <ToggleSwitch
                    checked={filters.comboDeal}
                    onChange={() => handleToggleChange("comboDeal")}
                    label="Combo Deals"
                />
            </div>

            {/* SubCategory */}
            <FilterSection title="SubCategory" sectionKey="subcategory">
                <div className="space-y-1">
                    {[
                        { label: "Electronics", value: "electronics" },
                        { label: "Fashion", value: "fashion" },
                        { label: "Home & Garden", value: "home-garden" },
                        { label: "Sports", value: "sports" },
                        { label: "Books", value: "books" },
                        { label: "Toys", value: "toys" },
                    ].map((item) => (
                        <CheckboxItem key={item.value} label={item.label} value={item.value} filterKey="subcategory" />
                    ))}
                </div>
            </FilterSection>

            {/* Price */}
            <FilterSection title="Price" sectionKey="price">
                <PriceRangeInput />
            </FilterSection>

            {/* Rating */}
            <FilterSection title="Rating" sectionKey="rating">
                <div className="space-y-1">
                    {[
                        { label: "4.5 & Up", value: "4.5" },
                        { label: "4.0 & Up", value: "4.0" },
                        { label: "3.5 & Up", value: "3.5" },
                        { label: "3.0 & Up", value: "3.0" },
                        { label: "2.5 & Up", value: "2.5" },
                        { label: "2.0 & Up", value: "2.0" },
                    ].map((rating) => (
                        <CheckboxItem key={rating.value} label={rating.label} value={rating.value} filterKey="rating" />
                    ))}
                </div>
            </FilterSection>

            {/* Size */}
            <FilterSection title="Size" sectionKey="size">
                <div className="space-y-1">
                    {[
                        { label: "XS", value: "xs" },
                        { label: "S", value: "s" },
                        { label: "M", value: "m" },
                        { label: "L", value: "l" },
                        { label: "XL", value: "xl" },
                        { label: "XXL", value: "xxl" },
                        { label: "XXXL", value: "xxxl" },
                    ].map((size) => (
                        <CheckboxItem key={size.value} label={size.label} value={size.value} filterKey="size" />
                    ))}
                </div>
            </FilterSection>

            {/* Material */}
            <FilterSection title="Material" sectionKey="material">
                <div className="space-y-1">
                    {[
                        { label: "Cotton", value: "cotton" },
                        { label: "Polyester", value: "polyester" },
                        { label: "Leather", value: "leather" },
                        { label: "Metal", value: "metal" },
                        { label: "Plastic", value: "plastic" },
                        { label: "Wood", value: "wood" },
                        { label: "Glass", value: "glass" },
                        { label: "Ceramic", value: "ceramic" },
                    ].map((material) => (
                        <CheckboxItem key={material.value} label={material.label} value={material.value} filterKey="material" />
                    ))}
                </div>
            </FilterSection>

            {/* Color */}
            <FilterSection title="Color" sectionKey="color">
                <div className="space-y-1">
                    {[
                        { label: "Black", value: "black" },
                        { label: "White", value: "white" },
                        { label: "Red", value: "red" },
                        { label: "Blue", value: "blue" },
                        { label: "Silver", value: "silver" },
                        { label: "Gray", value: "gray" },
                        { label: "Green", value: "green" },
                        { label: "Gold", value: "gold" },
                        { label: "RGB", value: "rgb" },
                    ].map((color) => (
                        <CheckboxItem key={color.value} label={color.label} value={color.value} filterKey="color" />
                    ))}
                </div>
            </FilterSection>

            {/* Condition */}
            <FilterSection title="Condition" sectionKey="condition">
                <div className="space-y-1">
                    {[
                        { label: "New", value: "new" },
                        { label: "Refurbished", value: "refurbished" },
                        { label: "Like New", value: "like-new" },
                        { label: "Very Good", value: "very-good" },
                        { label: "Good", value: "good" },
                        { label: "Acceptable", value: "acceptable" },
                        { label: "Open Box", value: "open-box" },
                    ].map((condition) => (
                        <CheckboxItem key={condition.value} label={condition.label} value={condition.value} filterKey="condition" />
                    ))}
                </div>
            </FilterSection>
        </div>
    )
}

export default BrandFilterSidebar;

