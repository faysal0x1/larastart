import { useState, useEffect } from "react"
import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    XCircle,
    ArrowLeft,
    Home,
    RefreshCw,
    Mail,
    Phone,
    AlertTriangle,
    CreditCard
} from "lucide-react"

export default function OrderFailurePage({ errorMessage, orderId, orderDetails }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Trigger animation on mount
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    // Common error messages
    const getErrorMessage = (error) => {
        if (error?.includes('payment')) return 'Payment processing failed'
        if (error?.includes('card')) return 'Card declined or invalid'
        if (error?.includes('network')) return 'Network connection error'
        if (error?.includes('inventory')) return 'Item out of stock'
        return error || 'An unexpected error occurred'
    }

    const error = getErrorMessage(errorMessage)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Error Animation */}
                <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6 transition-all duration-700 ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                        }`}>
                        <XCircle className="w-12 h-12 text-red-600" />
                    </div>
                    <h1 className={`text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 ease-out delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                        Order Failed
                    </h1>
                    <p className={`text-xl text-gray-600 mb-2 transition-all duration-700 ease-out delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                        We're sorry, but your order could not be completed
                    </p>
                    <p className={`text-gray-500 transition-all duration-700 ease-out delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                        {orderId && `Order ID: ${orderId}`}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Error Details */}
                    <div className="space-y-6">
                        <Card className="p-6 border-red-200 bg-red-50">
                            <h2 className="text-xl font-semibold mb-4 flex items-center text-red-800">
                                <AlertTriangle className="w-5 h-5 mr-2" />
                                Error Details
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-red-600 font-medium">Error Message:</p>
                                    <p className="text-red-800">{error}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-red-600 font-medium">What happened?</p>
                                    <p className="text-red-700 text-sm">
                                        Your order could not be processed due to the error above.
                                        No charges have been made to your account.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Common Solutions</h2>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <CreditCard className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Check Payment Method</h3>
                                        <p className="text-sm text-gray-600">
                                            Verify your card details, expiry date, and billing address
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <RefreshCw className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Try Again</h3>
                                        <p className="text-sm text-gray-600">
                                            Sometimes temporary issues can be resolved by retrying
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Contact Support</h3>
                                        <p className="text-sm text-gray-600">
                                            Our team can help resolve the issue quickly
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Support & Actions */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Get Help</h2>
                            <div className="space-y-4">
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
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        <strong>Live Chat:</strong> Available 24/7 for immediate assistance
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Order Details if available */}
                        {orderDetails && (
                            <Card className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Failed Order Details</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Order ID:</span>
                                        <span className="font-medium">{orderDetails.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Amount:</span>
                                        <span className="font-medium">৳{orderDetails.total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Order Date:</span>
                                        <span className="font-medium">{orderDetails.orderDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className="font-medium text-red-600">{orderDetails.orderStatus}</span>
                                    </div>
                                </div>
                            </Card>
                        )}

                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                            <p className="text-gray-600 mb-4">
                                Your items are still saved in your cart. You can try again or make changes.
                            </p>
                            <div className="space-y-3">
                                <Button asChild className="w-full">
                                    <Link href="/checkout">
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Try Again
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/cart">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to Cart
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/">
                                        <Home className="w-4 h-4 mr-2" />
                                        Continue Shopping
                                    </Link>
                                </Button>
                            </div>
                        </Card>

                        {/* Additional Help */}
                        <Card className="p-6 bg-gray-50">
                            <h3 className="font-semibold mb-3">Still having trouble?</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p>• Check your internet connection</p>
                                <p>• Clear your browser cache and cookies</p>
                                <p>• Try using a different payment method</p>
                                <p>• Contact your bank if the issue persists</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
