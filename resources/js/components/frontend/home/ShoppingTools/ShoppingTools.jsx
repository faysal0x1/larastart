import { ChevronRight } from "lucide-react"
import { Link } from '@inertiajs/react'

const ShoppingTools = () => {
    const tools = [
        {
            id: "pc-builder",
            title: "PC Builder",
            href: route('pc.builder'),
            image: "https://c1.neweggimages.com/webresource/themes/Nest/banners/pc_builder-2.png",
            bgColor: "bg-gradient-to-br from-purple-400 to-purple-600",
            textColor: "text-white",
        },
        {
            id: "nas-builder",
            title: "NAS Builder",
            href: "#",
            image: "https://c1.neweggimages.com/webresource/themes/Nest/banners/nas_builder-2.png",
            bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
            textColor: "text-white",
        },
        {
            id: "pc-upgrader",
            title: "PC Upgrader",
            href: "#",
            image: "https://c1.neweggimages.com/webresource/themes/Nest/banners/PCUpgrader-2.png",
            bgColor: "bg-gradient-to-br from-indigo-500 to-purple-700",
            textColor: "text-white",
            badge: "BETA",
        },
        {
            id: "gaming-pc-finder",
            title: "Gaming PC Finder",
            href: "#",
            image: "https://c1.neweggimages.com/webresource/themes/Nest/banners/gaming_pc_finder-2.png",
            bgColor: "bg-gradient-to-br from-gray-700 to-gray-900",
            textColor: "text-white",
        },
        {
            id: "server-configurator",
            title: "Server Configurator",
            href: "#",
            image: "https://c1.neweggimages.com/webresource/themes/Nest/banners/server_configurator_0914.png",
            bgColor: "bg-gradient-to-br from-teal-500 to-teal-700",
            textColor: "text-white",
        },
        {
            id: "psu-calculator",
            title: "PSU Wattage Calculator",
            href: "#",
            image: "https://c1.neweggimages.com/webresource/themes/Nest/banners/psu_wattage_calculator-2.png",
            bgColor: "bg-gradient-to-br from-purple-500 to-indigo-600",
            textColor: "text-white",
        },
        {
            id: "asus-nuc",
            title: "ASUS NUC Configurator",
            href: "#",
            image: "https://c1.neweggimages.com/webresource/themes/Nest/banners/asus_nuc_configurator-2.png",
            bgColor: "bg-gradient-to-br from-blue-500 to-cyan-600",
            textColor: "text-white",
            subtitle: "Compact, Powerful, AI Ready*",
        },
        {
            id: "laptop-finder",
            title: "Laptop Finder",
            href: "#",
            image: "https://c1.neweggimages.com/webresource/themes/Nest/banners/laptop_finder-2.png",
            bgColor: "bg-gradient-to-br from-purple-600 to-indigo-800",
            textColor: "text-white",
        },
        {
            id: "memory-finder",
            title: "Memory Finder",
            href: "#",
            image: "https://c1.neweggimages.com/webresource/themes/Nest/banners/memory_finder-2.png",
            bgColor: "bg-gradient-to-br from-teal-400 to-green-600",
            textColor: "text-white",
        },
        {
            id: "network-builder",
            title: "Network Builder",
            href: "#",
            image: "https://c1.neweggimages.com/webresource/themes/Nest/banners/net_work_builder.png",
            bgColor: "bg-gradient-to-br from-slate-600 to-slate-800",
            textColor: "text-white",
        },
    ]

    return (
        <div className="w-full max-w-[1680px] mx-auto px-4 py-8">
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-blue-600">Shopping Tools</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {tools.map((tool) => (
                    <Link
                        key={tool.id}
                        href={tool.href}
                        className={`relative overflow-hidden rounded-lg ${tool.bgColor} ${tool.textColor} p-6 hover:scale-105 transition-transform duration-200 group min-h-[200px] flex flex-col justify-between`}
                    >
                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-bold leading-tight">{tool.title}</h3>
                                {tool.badge && (
                                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-bold">{tool.badge}</span>
                                )}
                            </div>

                            {tool.subtitle && <p className="text-sm opacity-90 mb-4">{tool.subtitle}</p>}

                            <div className="flex items-center text-sm group-hover:underline">
                                <span>Check it out</span>
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>

                        <div className="absolute bottom-4 right-4 opacity-80">
                            <img
                                src={tool.image || "/placeholder.svg"}
                                alt={`${tool.title} img`}
                                className="w-28 h-28 object-contain"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ShoppingTools
