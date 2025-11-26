export default function CompareSectioion() {
    const products = [
        {
            id: 1,
            name: 'ASUS TUF Gaming A16 - 16" GeForce RTX 5060 Laptop GPU - AMD Ryzen 7 260 -...',
            image: "/asus-tuf-gaming-laptop.png",
            price: 1439,
            rating: 5,
            reviewCount: 2,
            inCart: false,
            currentlyViewing: true,
            bestSeller: false,
            soldBy: "Newegg",
            specs: {
                graphicsCard: "NVIDIA GeForce RTX 5060 Laptop GPU",
                videoMemory: "8 GB",
                processorName: "AMD Ryzen 7 260",
                memory: "32GB",
                ssd: "1 TB PCIe",
                screenSize: '16"',
                resolution: "2560 x 1600",
                touchscreen: "Non-Touch Screen",
                opticalDriveType: "No",
                hdmi: "1 x HDMI 2.1",
            },
        },
        {
            id: 2,
            name: 'MSI SWORD 16 16" FHD+ 144Hz Gaming Laptop Intel Core i7-14650HX RTX 4060...',
            image: "/msi-sword-gaming-laptop.jpg",
            price: 999,
            rating: 5,
            reviewCount: 7,
            inCart: true,
            currentlyViewing: false,
            bestSeller: true,
            soldBy: "Newegg",
            specs: {
                graphicsCard: "",
                videoMemory: "",
                processorName: "1.6-5.2GHz",
                memory: "16GB",
                ssd: "1TB NVMe SSD Gen4x4",
                screenSize: '16"',
                resolution: "1920 x 1200",
                touchscreen: "",
                opticalDriveType: "",
                hdmi: "",
            },
        },
        {
            id: 3,
            name: 'Acer Nitro V ANV16-41-R5K2 16.0" WUXGA IPS AMD Ryzen 7 8845HS NVIDIA GeForce...',
            image: "/acer-nitro-gaming-laptop.jpg",
            price: 949,
            rating: 4,
            reviewCount: 3,
            inCart: false,
            currentlyViewing: false,
            bestSeller: false,
            soldBy: "Newegg",
            specs: {
                graphicsCard: "",
                videoMemory: "",
                processorName: "AMD Ryzen 7 8845HS",
                memory: "16GB",
                ssd: "1TB PCIe Gen 4 SSD (1 PCIe Gen 4 Slot Available)",
                screenSize: '16"',
                resolution: "1920 x 1200",
                touchscreen: "",
                opticalDriveType: "",
                hdmi: "1 x HDMI 2.1",
            },
        },
        {
            id: 4,
            name: 'ASUS TUF Gaming A16 - 16" GeForce RTX 5060 Laptop GPU - AMD Ryzen 7 260 -...',
            image: "/asus-tuf-gaming-laptop-black.jpg",
            price: 1169,
            rating: 4,
            reviewCount: 4,
            inCart: false,
            currentlyViewing: false,
            bestSeller: false,
            soldBy: "Newegg",
            specs: {
                graphicsCard: "NVIDIA GeForce RTX 5060 Laptop GPU",
                videoMemory: "8 GB GDDR7",
                processorName: "AMD Ryzen 7 260",
                memory: "16GB",
                ssd: "512 GB NVMe",
                screenSize: '16"',
                resolution: "1920 x 1200",
                touchscreen: "Non-Touch Screen",
                opticalDriveType: "No",
                hdmi: "1 x HDMI 2.1",
            },
        },
        {
            id: 5,
            name: 'MSI Cyborg - 15.6" GeForce RTX 4050 Laptop GPU - Intel i7-13620H - 16GB Memory -...',
            image: "/msi-cyborg-gaming-laptop.jpg",
            price: 839,
            rating: 4,
            reviewCount: 24,
            inCart: false,
            currentlyViewing: false,
            bestSeller: false,
            soldBy: "Newegg",
            specs: {
                graphicsCard: "NVIDIA® GeForce RTX 4050 Graphics",
                videoMemory: "6 GB",
                processorName: "Intel Core i7-13620H",
                memory: "16GB",
                ssd: "512 GB",
                screenSize: '15.6"',
                resolution: "1920 x 1028",
                touchscreen: "Non-Touch Screen",
                opticalDriveType: "",
                hdmi: "1 x HDMI",
            },
        },
    ]

    const specRows = [
        { label: "Sold By", key: "soldBy" },
        { label: "Graphics Card", key: "graphicsCard" },
        { label: "Video Memory", key: "videoMemory" },
        { label: "Processor Name", key: "processorName" },
        { label: "Memory", key: "memory" },
        { label: "SSD", key: "ssd" },
        { label: "Screen Size", key: "screenSize" },
        { label: "Resolution", key: "resolution" },
        { label: "Touchscreen", key: "touchscreen" },
        { label: "Optical Drive Type", key: "opticalDriveType" },
        { label: "HDMI", key: "hdmi" },
    ]

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                ★
            </span>
        ))
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="bg-white">
                <h2 className="text-2xl font-bold mb-6">Compare With Similar Products</h2>

                {/* Product Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                    {products.map((product) => (
                        <div key={product.id} className="border border-gray-200 p-4 relative">
                            {product.currentlyViewing && (
                                <div className="absolute top-0 left-0 right-0 bg-gray-100 text-center py-1 text-xs font-medium border-b">
                                    CURRENTLY VIEWING
                                </div>
                            )}

                            <div className={product.currentlyViewing ? "mt-6" : ""}>
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-full h-32 object-contain mb-4"
                                />

                                <h3 className="text-sm font-medium mb-2 line-clamp-3 min-h-[60px]">{product.name}</h3>

                                <div className="mb-2">
                                    {product.inCart ? (
                                        <button className="w-full bg-gray-500 text-white py-2 px-4 rounded text-sm">✓ in cart</button>
                                    ) : (
                                        <button className="w-full bg-orange-500 text-white py-2 px-4 rounded text-sm hover:bg-orange-600">
                                            Add to cart ▼
                                        </button>
                                    )}
                                </div>

                                {product.bestSeller && (
                                    <div className="mb-2">
                                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">#1 Best Seller</span>
                                        <div className="text-xs text-gray-600 mt-1">In Gaming Laptops</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Price and Rating Row */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                    {products.map((product) => (
                        <div key={product.id} className="text-center">
                            <div className="text-2xl font-bold mb-2">
                                ${product.price.toLocaleString()}
                                <span className="text-sm font-normal">99</span>
                            </div>
                            <div className="flex items-center justify-center mb-1">
                                {renderStars(product.rating)}
                                <span className="ml-1 text-sm text-gray-600">({product.reviewCount})</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Specifications Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <tbody>
                            {specRows.map((row, index) => (
                                <tr key={row.key} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                    <td className="border border-gray-200 px-4 py-3 font-medium text-sm bg-gray-100 w-48">{row.label}</td>
                                    {products.map((product) => (
                                        <td key={product.id} className="border border-gray-200 px-4 py-3 text-sm">
                                            {row.key === "soldBy" ? product.soldBy : product.specs[row.key] || "-"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}
