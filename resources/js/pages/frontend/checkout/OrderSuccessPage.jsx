import { useState, useEffect } from "react"
import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    CheckCircle,
    ArrowRight,
    Home,
    Package,
    Clock,
    Mail,
    Phone,
    Download,
    Share2
} from "lucide-react"

export default function OrderSuccessPage({ orderId, orderDetails }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Debug: Log the props
        console.log('OrderSuccessPage props:', { orderId, orderDetails })

        // Trigger animation on mount
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    // Add error boundary
    if (!orderDetails) {
        console.error('OrderSuccessPage: orderDetails is missing')
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Order Details</h1>
                    <p className="text-gray-600 mb-4">Unable to load order information.</p>
                    <a href="/" className="text-blue-600 underline">Return to Home</a>
                </div>
            </div>
        )
    }

    // Mock order details if not provided
    const order = orderDetails || {
        id: orderId || "ORD-2024-001",
        total: 479.00,
        items: [
            {
                name: "AMD Ryzen 7 9800X3D - Ryzen 7 9000 Series Zen 5 8-Core 5.2 GHz",
                quantity: 1,
                price: 479.00,
                image: "/amd-ryzen-7-processor-box.jpg"
            },
            {
                name: "MONTECH NX400 - CPU Air Cooler",
                quantity: 1,
                price: 0,
                image: "/cpu-air-cooler-black.jpg",
                isFreeGift: true
            }
        ],
        shippingAddress: {
            name: "John Doe",
            address: "123 Main Street, Apt 4B",
            city: "New York, NY 10001",
            country: "United States"
        },
        estimatedDelivery: "Dec 28, 2024 - Jan 2, 2025",
        trackingNumber: "TRK123456789"
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Success Animation */}
                <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6 transition-all duration-700 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                        }`}>
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className={`text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 ease-out delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                        Order Placed Successfully!
                    </h1>
                    <p className={`text-xl text-gray-600 mb-2 transition-all duration-700 ease-out delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                        Thank you for your purchase
                    </p>
                    <p className={`text-gray-500 transition-all duration-700 ease-out delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                        Order ID: {order.id}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Details */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <Package className="w-5 h-5 mr-2" />
                                Order Details
                            </h2>
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                                        <img
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.name}
                                            className="w-16 h-16 object-contain"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium text-sm">{item.name}</h3>
                                            <div className="text-sm text-gray-600">
                                                Quantity: {item.quantity}
                                                {item.isFreeGift && (
                                                    <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                                        FREE GIFT
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold">
                                                {item.price === 0 ? 'FREE' : `৳${item.price.toFixed(2)}`}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total:</span>
                                    <span>৳{order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <Clock className="w-5 h-5 mr-2" />
                                Delivery Information
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                                    <p className="font-medium">{order.estimatedDelivery}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Tracking Number</p>
                                    <p className="font-medium font-mono">{order.trackingNumber}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Shipping Address</p>
                                    <p className="font-medium">
                                        {order.shippingAddress.name}<br />
                                        {order.shippingAddress.address}<br />
                                        {order.shippingAddress.city}<br />
                                        {order.shippingAddress.country}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Next Steps */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-semibold text-sm">1</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Order Confirmation</h3>
                                        <p className="text-sm text-gray-600">You'll receive an email confirmation shortly</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-semibold text-sm">2</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Order Processing</h3>
                                        <p className="text-sm text-gray-600">We'll prepare your order for shipment</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-semibold text-sm">3</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Shipping Updates</h3>
                                        <p className="text-sm text-gray-600">Track your package with real-time updates</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="font-medium">Email Support</p>
                                        <p className="text-sm text-gray-600">support@example.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="font-medium">Phone Support</p>
                                        <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button asChild className="w-full">
                                <Link href="/orders">
                                    <Package className="w-4 h-4 mr-2" />
                                    View Order Details
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/">
                                    <Home className="w-4 h-4 mr-2" />
                                    Continue Shopping
                                </Link>
                            </Button>
                            <div className="flex space-x-2">
                                <Button variant="outline" className="flex-1">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Receipt
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
