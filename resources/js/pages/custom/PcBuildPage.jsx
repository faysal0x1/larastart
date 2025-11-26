

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import PCBuilderSidebar from "./PcBuildComponents/Sidebar"
import { ChevronDown, Star, Heart } from "lucide-react"

export default function Home() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("cpu")
    const [selections, setSelections] = useState({})

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed)
    }

    const cpuProducts = [
        {
            id: 1,
            image: "/amd-ryzen-processor.jpg",
            name: "AMD Ryzen 7 9800X3D Desktop Processor",
            subtitle:
                "8-Core 16-Thread Gaming CPU with 3D V-Cache Technology, Unlocked, AM5 Socket, 4.2GHz Base, 5.2GHz Max Boost - 100-100001084WOF",
            badge: "CUSTOMER'S CHOICE",
            cores: "8 Core",
            clockSpeed: "4.7 GHz",
            memory: "DDR5-5600",
            tdp: "120W",
            integratedGraphics: "AMD Radeon Graphics",
            rating: 5,
            reviews: 203,
            price: "$479.00",
            comparePrice: "",
            category: "cpu",
        },
        {
            id: 2,
            image: "/intel-core-processor.jpg",
            name: "Intel Core Ultra 5 245K - Core Ultra 5 (Series 2) Arrow Lake 14-Core (8P+6E), LGA 1851, 125W Desktop Processor - BX80768245K",
            subtitle:
                "14-Core processor with Intel's latest architecture for high-performance computing and gaming applications",
            badge: "",
            cores: "14-Core (8P+6E)",
            clockSpeed: "3.7 GHz",
            memory: "DDR5-6400",
            tdp: "125W",
            integratedGraphics: "Intel Graphics",
            rating: 4,
            reviews: 177,
            price: "$329.99",
            comparePrice: "",
            category: "cpu",
        },
        {
            id: 3,
            image: "/amd-ryzen-9-processor.jpg",
            name: "AMD Ryzen 9 9950X Desktop CPU Processor",
            subtitle: "16-Core 32-Thread processor for extreme performance, content creation, and multitasking workloads",
            badge: "CUSTOMER'S CHOICE",
            cores: "16-Core",
            clockSpeed: "4.3 GHz",
            memory: "DDR5-5600",
            tdp: "170W",
            integratedGraphics: "AMD Radeon Graphics",
            rating: 5,
            reviews: 89,
            price: "$539.99",
            comparePrice: "",
            category: "cpu",
        },
        {
            id: 4,
            image: "/amd-ryzen-9-processor-black.jpg",
            name: "AMD Ryzen 9 9900X Desktop CPU Processor",
            subtitle: "12-Core 24-Thread high-performance processor for gaming and productivity applications",
            badge: "",
            cores: "12-Core",
            clockSpeed: "4.4 GHz",
            memory: "DDR5-5600",
            tdp: "120W",
            integratedGraphics: "Intel Graphics",
            rating: 4,
            reviews: 156,
            price: "$374.99",
            comparePrice: "",
            category: "cpu",
        },
        {
            id: 5,
            image: "/amd-ryzen-7-processor.jpg",
            name: "AMD Ryzen 7 9700X Processor",
            subtitle: "8-Core 16-Thread processor delivering excellent gaming and multitasking performance",
            badge: "CUSTOMER'S CHOICE",
            cores: "8 Core",
            clockSpeed: "3.8 GHz",
            memory: "DDR5-5600",
            tdp: "65W",
            integratedGraphics: "AMD Radeon Graphics",
            rating: 5,
            reviews: 223,
            price: "$329.00",
            comparePrice: "",
            category: "cpu",
        },
        {
            id: 6,
            image: "/intel-core-ultra-processor.jpg",
            name: "Intel Core Ultra 5 245K - Core Ultra 5 (Series 2) Arrow Lake 14-Core (8P+6E), LGA 1851, 125W Desktop Processor - BX80768245K",
            subtitle: "Latest generation Intel processor with hybrid architecture for optimal performance and efficiency",
            badge: "",
            cores: "14-Core (8P+6E)",
            clockSpeed: "4.2 GHz",
            memory: "DDR5-6400",
            tdp: "125W",
            integratedGraphics: "Intel Integrated Graphics",
            rating: 4,
            reviews: 177,
            price: "$279.99",
            comparePrice: "",
            category: "cpu",
        },
        {
            id: 7,
            image: "/amd-ryzen-7-processor-box.jpg",
            name: "AMD Ryzen 7 9700X Desktop CPU Processor",
            subtitle: "High-performance 8-core processor optimized for gaming and content creation workflows",
            badge: "CUSTOMER'S CHOICE",
            cores: "8 Core",
            clockSpeed: "3.7 GHz",
            memory: "DDR5-5600",
            tdp: "175W",
            integratedGraphics: "None Integrated Graphics",
            rating: 4,
            reviews: 174,
            price: "$264.99",
            comparePrice: "",
            category: "cpu",
        },
        {
            id: 8,
            image: "/amd-ryzen-9-processor.jpg",
            name: "AMD Ryzen 9 9900X Desktop CPU Processor",
            subtitle: "Premium 12-core processor delivering exceptional performance for demanding applications",
            badge: "",
            cores: "12-Core",
            clockSpeed: "4.4 GHz",
            memory: "DDR5-5600",
            tdp: "120W",
            integratedGraphics: "AMD Radeon Graphics",
            rating: 5,
            reviews: 156,
            price: "$399.00",
            comparePrice: "",
            category: "cpu",
        },
        {
            id: 9,
            image: "/intel-core-i7-processor.jpg",
            name: "Intel Core i7-12700KF Desktop CPU Processor",
            subtitle: "12th Gen Intel Core processor with 12 cores and 20 threads for high-performance computing",
            badge: "",
            cores: "12-Core (8P+4E)",
            clockSpeed: "3.6 GHz",
            memory: "DDR4-3200",
            tdp: "125W",
            integratedGraphics: "None Integrated Graphics",
            rating: 4,
            reviews: 187,
            price: "$199.99",
            comparePrice: "",
            category: "cpu",
        },
    ]

    const motherboardProducts = [
        {
            id: 101,
            image: "/motherboard-am5.jpg",
            name: "ASUS ROG STRIX X670E-E Gaming WiFi",
            subtitle: "AMD AM5, PCIe 5.0, DDR5, WiFi 6E, ATX Motherboard",
            badge: "CUSTOMER'S CHOICE",
            chipset: "X670E",
            socket: "AM5",
            memory: "DDR5",
            formFactor: "ATX",
            rating: 5,
            reviews: 412,
            price: "$469.99",
            comparePrice: "",
            category: "motherboard",
        },
        {
            id: 102,
            image: "/motherboard-lga1700.jpg",
            name: "MSI MPG Z790 EDGE WIFI",
            subtitle: "Intel LGA 1700, PCIe 5.0, DDR5, WiFi 6E, ATX Motherboard",
            badge: "",
            chipset: "Z790",
            socket: "LGA1700",
            memory: "DDR5",
            formFactor: "ATX",
            rating: 4,
            reviews: 289,
            price: "$289.99",
            comparePrice: "",
            category: "motherboard",
        },
        {
            id: 103,
            image: "/motherboard-b650.jpg",
            name: "Gigabyte B650 AORUS ELITE AX",
            subtitle: "AMD AM5, PCIe 4.0, DDR5, WiFi 6E, ATX Motherboard",
            badge: "",
            chipset: "B650",
            socket: "AM5",
            memory: "DDR5",
            formFactor: "ATX",
            rating: 4,
            reviews: 198,
            price: "$199.99",
            comparePrice: "",
            category: "motherboard",
        },
    ]

    const categoryToLabel = {
        cpu: "CPU",
        motherboard: "Motherboard",
        memory: "Memory",
        graphics: "Graphics Cards",
        case: "Case",
        power: "Power Supply",
        storage: "Storage",
        monitor: "Monitor",
    }

    const allProducts = useMemo(() => {
        return {
            cpu: cpuProducts,
            motherboard: motherboardProducts,
        }
    }, [])

    const visibleProducts = allProducts[selectedCategory] || []

    const parsePrice = (priceStr) => {
        if (!priceStr) return 0
        const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""))
        return Number.isFinite(num) ? num : 0
    }

    const handleChooseCategory = (categoryId, options = {}) => {
        if (options.reset) {
            setSelections({})
            return
        }
        if (categoryId) {
            setSelectedCategory(categoryId)
        }
    }

    const handleSelectProduct = (product) => {
        const category = product.category || selectedCategory
        const price = parsePrice(product.price)
        setSelections((prev) => ({
            ...prev,
            [category]: { id: product.id, name: product.name, price, image: product.image },
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            <header className="bg-white border-b border-gray-200">
                <div className="flex items-center justify-between px-4 py-2 text-sm">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-1">
                            <span>Menu</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <span>Shell Shocker</span>
                        <span className="text-orange-600 font-medium">PC Builder</span>
                        <span>Trending Deals</span>
                        <span>Clearance</span>
                        <span>Best Sellers</span>
                        <span>72hr Sale</span>
                        <span>Free Gift w/ AMD</span>
                        <span>Newegg Card</span>
                        <span>Gamer Community 🔥</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span>NEWEGG BUSINESS</span>
                        <span>FEEDBACK</span>
                        <span>HELP CENTER</span>
                        <span className="text-orange-600">🔧 PC Builder</span>
                    </div>
                </div>
            </header>
            <div className="max-w-[1680px] mx-auto">
                <div className="bg-white px-4 py-2 text-sm text-gray-600 border-b">
                    <span>Home</span> &gt; <span>Custom PC Builder</span> &gt; <span className="text-black font-medium">{categoryToLabel[selectedCategory] || "CPU"}</span>
                </div>

                <div className="bg-white px-4 py-4 border-b">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{categoryToLabel[selectedCategory] || "CPU"}</h1>
                    <p className="text-sm text-gray-600">How to build a PC &gt; Choosing a {categoryToLabel[selectedCategory] || "CPU"} Guide</p>
                </div>

                <div style={{ backgroundColor: "#2563eb" }} className="text-white px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <span className="bg-white text-blue-600 px-2 py-1 rounded text-sm font-medium">
                            🎯 GPU & Storage PC Builder Plans Now Available | How to Install
                        </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                        <div
                            style={{
                                backgroundColor: "#2563eb",
                                color: "#ffffff",
                                border: "1px solid #1d4ed8",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                            className="hover:bg-blue-700"
                        >
                            📋 VIEW LISTS
                        </div>
                        <div
                            style={{
                                backgroundColor: "#2563eb",
                                color: "#ffffff",
                                border: "1px solid #1d4ed8",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                            className="hover:bg-blue-700"
                        >
                            📤 SHARE
                        </div>
                        <div
                            style={{
                                backgroundColor: "#2563eb",
                                color: "#ffffff",
                                border: "1px solid #1d4ed8",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                            className="hover:bg-blue-700"
                        >
                            ➕ ADD NEW LIST
                        </div>
                        <div
                            style={{
                                backgroundColor: "#2563eb",
                                color: "#ffffff",
                                border: "1px solid #1d4ed8",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                            className="hover:bg-blue-700"
                        >
                            🔗 LINK CPU OR MOTHERBOARD
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
                        <div className="p-4 space-y-6">


                            {/* Compatibility Checker */}
                            <div>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded" />
                                    <span className="text-sm">Compatibility Checker</span>
                                    <span className="bg-green-100 text-green-800 px-1 py-0.5 rounded text-xs">ON</span>
                                </label>
                            </div>

                            {/* Stock Filter */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">In Stock</h4>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="rounded" />
                                    <span className="text-sm">Sort by Newest</span>
                                </label>
                            </div>

                            {/* Brands */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">Brands</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className="rounded" />
                                        <span className="text-sm">AMD</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="checkbox" className="rounded" />
                                        <span className="text-sm">Intel</span>
                                    </label>
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">Price</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span>$</span>
                                        <span>to</span>
                                        <span>$</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div>$0 - $50</div>
                                        <div>$50 - $100</div>
                                        <div>$100 - $200</div>
                                        <div>$200 - $300</div>
                                        <div>$300 - $500</div>
                                    </div>
                                </div>
                            </div>

                            {/* More filters */}
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">CPU Socket Type</h4>
                                    <select className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                                        <option>Intel Socket</option>
                                    </select>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Series</h4>
                                    <select className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                                        <option>AMD ThreadRipper</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="p-4">
                            {/* Sort and Filter Bar */}
                            <div className="flex items-center justify-between mb-4 bg-white p-3 rounded border">
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-medium">FILTER</span>
                                    <span className="text-sm">Sort By:</span>
                                    <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                                        <option>Best Match</option>
                                    </select>
                                </div>
                                <div className="text-sm text-gray-600">278 Categories Frequency | Page 1/14</div>
                            </div>

                            {/* Product Grid Header */}
                            <div className="bg-white border rounded-t">
                                <div className="grid grid-cols-12 gap-4 p-3 border-b bg-gray-50 text-sm font-medium text-gray-700">
                                    <div className="col-span-4">Product</div>
                                    <div className="col-span-1 text-center"># of Cores</div>
                                    <div className="col-span-1 text-center">Core Clock</div>
                                    <div className="col-span-1 text-center">Memory</div>
                                    <div className="col-span-1 text-center">TDP</div>
                                    <div className="col-span-2 text-center">Integrated Graphics</div>
                                    <div className="col-span-1 text-center">Rating</div>
                                    <div className="col-span-1 text-center">Price</div>
                                </div>

                                {/* Product Cards */}
                                <div className="divide-y divide-gray-200">
                                    {visibleProducts.map((product) => {
                                        const isSelected = selections[product.category]?.id === product.id
                                        return (
                                            <div key={product.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors">
                                                {/* Product Info */}
                                                <div className="col-span-4 flex space-x-3">
                                                    <img
                                                        src={product.image || "/placeholder.svg"}
                                                        alt={product.name}
                                                        className="w-20 h-20 object-cover rounded border cursor-pointer"
                                                        onClick={() => handleChooseCategory(product.category)}
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between mb-1">
                                                            <h3 className="font-medium text-gray-900 text-sm leading-tight">{product.name}</h3>
                                                            <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" />
                                                        </div>
                                                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.subtitle}</p>
                                                        {product.badge && (
                                                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                                                                {product.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Specifications */}
                                                <div className="col-span-1 text-center text-sm">{product.cores}</div>
                                                <div className="col-span-1 text-center text-sm">{product.clockSpeed}</div>
                                                <div className="col-span-1 text-center text-sm">{product.memory}</div>
                                                <div className="col-span-1 text-center text-sm">{product.tdp}</div>
                                                <div className="col-span-2 text-center text-sm">{product.integratedGraphics}</div>

                                                {/* Rating */}
                                                <div className="col-span-1 text-center">
                                                    <div className="flex items-center justify-center space-x-1">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-3 h-3 ${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-xs text-gray-600">({product.reviews})</span>
                                                    </div>
                                                </div>

                                                {/* Price and Actions */}
                                                <div className="col-span-1 text-center">
                                                    <div className="text-lg font-bold text-gray-900 mb-2">{product.price}</div>
                                                    <div
                                                        style={{
                                                            backgroundColor: isSelected ? "#16a34a" : "#f97316",
                                                            color: "#ffffff",
                                                            border: `1px solid ${isSelected ? "#15803d" : "#ea580c"}`,
                                                            fontSize: "12px",
                                                            padding: "4px 12px",
                                                            borderRadius: "4px",
                                                            marginBottom: "4px",
                                                            cursor: "pointer",
                                                            display: "inline-block",
                                                        }}
                                                        className={isSelected ? "hover:bg-green-700" : "hover:bg-orange-600"}
                                                        onClick={() => handleSelectProduct(product)}
                                                    >
                                                        {isSelected ? "✓ SELECTED" : "🛒 SELECT"}
                                                    </div>
                                                    <div>
                                                        <Button
                                                            variant="outline"
                                                            className="text-xs px-2 py-1 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                                        >
                                                            Compare
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-center space-x-2 mt-6">
                                <span className="text-sm text-gray-600">Page 1/14</span>
                                <div className="flex space-x-1">
                                    <Button variant="outline" size="sm" className="bg-gray-800 text-white">
                                        1
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        2
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        3
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        4
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        5
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        6
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        7
                                    </Button>
                                    <span className="px-2">...</span>
                                    <Button variant="outline" size="sm">
                                        14
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        &gt;
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PCBuilderSidebar
                isOpen={true}
                isCollapsed={isCollapsed}
                onToggleCollapse={toggleCollapse}
                onChooseCategory={handleChooseCategory}
                selections={selections}
            />
        </div>
    )
}
