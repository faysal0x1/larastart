"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Edit,
    Trash2,
    Plus,
    Cpu,
    HardDrive,
    Monitor,
    Zap,
    MemoryStick,
    Clapperboard as Motherboard,
    PcCase,
    Gamepad2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"

const PCBuilderSidebar = ({
    isOpen = true,
    isCollapsed = false,
    onToggleCollapse,
    onChooseCategory,
    selections = {},
}) => {
    const [wattageEstimate, setWattageEstimate] = useState(0)

    const components = [
        { id: "cpu", name: "CPU", icon: Cpu, selected: false },
        { id: "motherboard", name: "Motherboard", icon: Motherboard, selected: false },
        { id: "memory", name: "Memory", icon: MemoryStick, selected: false },
        { id: "graphics", name: "Graphics Cards", icon: Gamepad2, selected: false },
        { id: "case", name: "Case", icon: PcCase, selected: false },
        { id: "power", name: "Power Supply", icon: Zap, selected: false },
        { id: "storage", name: "Storage", icon: HardDrive, selected: false },
        { id: "monitor", name: "Monitor", icon: Monitor, selected: false },
    ]

    const handleSelect = (componentId) => {
        onChooseCategory && onChooseCategory(componentId)
        if (!isCollapsed && onToggleCollapse) {
            onToggleCollapse()
        }
    }

    const selectedParts = Object.keys(selections).length
    const totalCost = Object.values(selections).reduce((sum, item) => sum + (item?.price || 0), 0)

    const handleReset = () => {
        // Let parent clear selections by choosing a neutral category
        onChooseCategory && onChooseCategory(null, { reset: true })
        setWattageEstimate(0)
    }

    const handleSaveList = () => {
        console.log("[v0] Saving PC build list")
        // Add save logic here
    }

    const handleAddToCart = () => {
        console.log("[v0] Adding all items to cart")
        // Add cart logic here
    }

    if (isCollapsed) {
        return (
            <div className="fixed top-0 right-0 h-full w-24 bg-white border-l border-gray-200 z-50 flex flex-col">
                {/* Collapsed Header */}
                <div className="bg-blue-600 text-white p-2 flex flex-col items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onToggleCollapse}
                        className="text-white hover:bg-blue-700 p-1 mb-2"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-xs font-semibold text-center leading-tight">PC Builder</div>
                </div>

                {/* Collapsed Summary */}
                <div className="flex-1 overflow-y-auto">
                    {components.map((component) => {
                        const IconComponent = component.icon
                        return (
                            <div
                                key={component.id}
                                className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center group relative"
                                onClick={() => handleSelect(component.id)}
                            >
                                <IconComponent className="h-5 w-5 text-gray-800 mb-1" />
                                <span className="text-xs text-center leading-tight text-gray-800">{component.name}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onToggleCollapse()
                                    }}
                                >
                                    <ChevronLeft className="h-3 w-3" />
                                </Button>
                            </div>
                        )
                    })}
                </div>

                {/* Collapsed Footer */}
                <div className="p-2 border-t border-gray-200 bg-white">
                    <div className="text-xs text-gray-500 text-center mb-1">Parts: {selectedParts}</div>
                    <div className="text-xs text-gray-500 text-center mb-1">{wattageEstimate}W</div>
                    <div className="text-xs font-bold text-blue-600 text-center">${totalCost.toFixed(2)}</div>
                </div>
            </div>
        )
    }

    return (
        <div className={`h-full ${isCollapsed ? "relative w-24" : "fixed top-0 right-0 w-[56rem] z-50"} bg-white border-l border-gray-200 flex flex-col`}>
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onToggleCollapse}
                        className="text-white hover:bg-blue-700"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold">My New List</span>
                </div>
                <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
                    ADD NEW LIST
                </Button>
            </div>

            {/* List Info */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="font-bold text-gray-900">My New List</h2>
                        <Button variant="ghost" size="sm" className="p-1">
                            <Edit className="h-3 w-3" />
                        </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="p-1 text-red-600">
                        <Trash2 className="h-3 w-3" />
                    </Button>
                </div>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 text-gray-600 text-sm font-medium border-b border-gray-200">
                <div>Component</div>
                <div>Selected Product</div>
            </div>

            {/* Components List */}
            <div className="flex-1 overflow-y-auto">
                {components.map((component) => {
                    const IconComponent = component.icon
                    return (
                        <div
                            key={component.id}
                            className="grid grid-cols-2 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <IconComponent className="h-5 w-5 text-gray-800 cursor-pointer" onClick={() => handleSelect(component.id)} />
                                <span className="text-sm font-medium text-gray-800">{component.name}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6 ml-auto"
                                    onClick={onToggleCollapse}
                                >
                                    <ChevronRight className="h-3 w-3" />
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                {selections[component.id] ? (
                                    <div className="flex items-center min-w-0">
                                        {selections[component.id].image ? (
                                            <img src={selections[component.id].image} alt={selections[component.id].name} className="w-10 h-10 rounded border mr-2" />
                                        ) : null}
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm text-gray-800 truncate">{selections[component.id].name}</span>
                                            <span className="text-xs text-gray-500">${selections[component.id].price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-xs text-gray-500">No item selected</span>
                                )}
                                <Button variant="outline" size="sm" onClick={() => handleSelect(component.id)} className="text-xs ml-2">
                                    <Plus className="h-3 w-3 mr-1" />
                                    {selections[component.id] ? "CHANGE" : "SELECT"}
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Footer Summary */}
            <div className="border-t border-gray-200 bg-white p-4 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Part(s) Selected:</span>
                    <span className="font-medium">{selectedParts}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Min. Wattage Estimate:</span>
                    <span className="font-medium">{wattageEstimate} Watts</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                    <span>Total Cost:</span>
                    <span className="text-blue-600">${totalCost.toFixed(2)}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" onClick={handleReset} className="flex-1 bg-transparent">
                        Reset
                    </Button>
                    <Button variant="default" size="sm" onClick={handleSaveList} className="flex-1 bg-blue-600 hover:bg-blue-700">
                        SAVE LIST
                    </Button>
                </div>
                <Button variant="secondary" size="sm" onClick={handleAddToCart} className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200">
                    ADD ALL TO CART
                </Button>
            </div>
        </div>
    )
}

export default PCBuilderSidebar
