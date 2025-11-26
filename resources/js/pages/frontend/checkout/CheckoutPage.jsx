

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Link, router } from "@inertiajs/react"
import {
    CreditCard,
    MapPin,
    Plus,
    Edit,
    Trash2,
    Check,
    ArrowLeft,
    Shield,
    Lock,
    User,
    Building,
    Phone,
    Mail
} from "lucide-react"

export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = useState(1) // 1: Shipping, 2: Payment, 3: Review
    const [selectedShippingId, setSelectedShippingId] = useState(null)
    const [selectedPaymentId, setSelectedPaymentId] = useState(null)
    const [showNewAddressForm, setShowNewAddressForm] = useState(false)
    const [showNewPaymentForm, setShowNewPaymentForm] = useState(false)
    const [agreeToTerms, setAgreeToTerms] = useState(false)

    // Mock data for saved addresses
    const [savedAddresses, setSavedAddresses] = useState([
        {
            id: 1,
            name: "John Doe",
            company: "Tech Solutions Inc.",
            address: "123 Main Street",
            apartment: "Apt 4B",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "United States",
            phone: "+1 (555) 123-4567",
            isDefault: true
        },
        {
            id: 2,
            name: "Jane Smith",
            company: "",
            address: "456 Oak Avenue",
            apartment: "",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90210",
            country: "United States",
            phone: "+1 (555) 987-6543",
            isDefault: false
        }
    ])

    // Mock data for saved payment methods
    const [savedPayments, setSavedPayments] = useState([
        {
            id: 1,
            type: "visa",
            last4: "4242",
            expiryMonth: "12",
            expiryYear: "2025",
            name: "John Doe",
            isDefault: true
        },
        {
            id: 2,
            type: "mastercard",
            last4: "5555",
            expiryMonth: "08",
            expiryYear: "2026",
            name: "John Doe",
            isDefault: false
        }
    ])

    // Cart items (mock data)
    const cartItems = [
        {
            id: 1,
            name: "AMD Ryzen 7 9800X3D - Ryzen 7 9000 Series Zen 5 8-Core 5.2 GHz",
            price: 479.00,
            quantity: 1,
            image: "/amd-ryzen-7-processor-box.jpg"
        },
        {
            id: 2,
            name: "MONTECH NX400 - CPU Air Cooler",
            price: 0, // Free gift
            quantity: 1,
            image: "/cpu-air-cooler-black.jpg",
            isFreeGift: true
        }
    ]

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = 0 // Free shipping
    const tax = subtotal * 0.08 // 8% tax
    const total = subtotal + shipping + tax

    const handleNextStep = () => {
        if (currentStep === 1 && selectedShippingId) {
            setCurrentStep(2)
        } else if (currentStep === 2 && selectedPaymentId) {
            setCurrentStep(3)
        }
    }

    const handlePlaceOrder = () => {
        if (agreeToTerms) {
            // Simulate order processing
            const isSuccess = Math.random() > 0.3; // 70% success rate for demo

            if (isSuccess) {
                // Generate order details
                const orderDetails = {
                    id: `ORD-${Date.now()}`,
                    total: total,
                    items: cartItems,
                    shippingAddress: savedAddresses.find(addr => addr.id === selectedShippingId),
                    estimatedDelivery: "Dec 28, 2024 - Jan 2, 2025",
                    trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`
                };

                // Redirect to success page with order details in URL params
                const params = new URLSearchParams({
                    order_id: orderDetails.id,
                    total: orderDetails.total.toString(),
                    estimated_delivery: orderDetails.estimatedDelivery,
                    tracking_number: orderDetails.trackingNumber
                });

                router.visit(`/order/success?${params.toString()}`);
            } else {
                // Redirect to failure page
                const errorMessages = [
                    'Payment processing failed',
                    'Card declined or invalid',
                    'Network connection error',
                    'Item out of stock'
                ];
                const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];

                const params = new URLSearchParams({
                    error: randomError,
                    order_id: `ORD-${Date.now()}`
                });

                router.visit(`/order/failure?${params.toString()}`);
                // router.visit(`/order/success?${params.toString()}`);
            }
        }
    }

    const getCardIcon = (type) => {
        switch (type) {
            case 'visa': return '💳'
            case 'mastercard': return '💳'
            case 'amex': return '💳'
            default: return '💳'
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/cartt">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Cart
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-center space-x-8">
                        <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                                {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
                            </div>
                            <span className="ml-2 font-medium">Shipping</span>
                        </div>
                        <div className={`w-16 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                        <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                                {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
                            </div>
                            <span className="ml-2 font-medium">Payment</span>
                        </div>
                        <div className={`w-16 h-0.5 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                        <div className={`flex items-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                                3
                            </div>
                            <span className="ml-2 font-medium">Review</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Step 1: Shipping Address */}
                        {currentStep === 1 && (
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold flex items-center">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        Shipping Address
                                    </h2>
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add New Address
                                    </Button>
                                </div>

                                {/* Saved Addresses */}
                                <RadioGroup value={selectedShippingId} onValueChange={setSelectedShippingId}>
                                    <div className="space-y-4">
                                        {savedAddresses.map((address) => (
                                            <div key={address.id} className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
                                                <div className="flex items-start space-x-3">
                                                    <RadioGroupItem value={address.id} id={`address-${address.id}`} />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <Label htmlFor={`address-${address.id}`} className="cursor-pointer">
                                                                <div className="font-medium">{address.name}</div>
                                                                {address.isDefault && (
                                                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded ml-2">
                                                                        Default
                                                                    </span>
                                                                )}
                                                            </Label>
                                                            <div className="flex space-x-2">
                                                                <Button variant="ghost" size="sm">
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="sm">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-gray-600 mt-1">
                                                            {address.company && <div>{address.company}</div>}
                                                            <div>{address.address}{address.apartment && `, ${address.apartment}`}</div>
                                                            <div>{address.city}, {address.state} {address.zipCode}</div>
                                                            <div>{address.country}</div>
                                                            <div>{address.phone}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </RadioGroup>

                                {/* New Address Form */}
                                {showNewAddressForm && (
                                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                                        <h3 className="text-lg font-medium mb-4">Add New Address</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="name" className="flex items-center gap-2">
                                                    <User className="w-4 h-4" />
                                                    Full Name *
                                                </Label>
                                                <Input id="name" placeholder="Enter full name" />
                                            </div>
                                            <div>
                                                <Label htmlFor="company" className="flex items-center gap-2">
                                                    <Building className="w-4 h-4" />
                                                    Company (Optional)
                                                </Label>
                                                <Input id="company" placeholder="Enter company name" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <Label htmlFor="address" className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    Street Address *
                                                </Label>
                                                <Input id="address" placeholder="Enter street address" />
                                            </div>
                                            <div>
                                                <Label htmlFor="apartment">Apartment, suite, etc. (Optional)</Label>
                                                <Input id="apartment" placeholder="Apt, suite, etc." />
                                            </div>
                                            <div>
                                                <Label htmlFor="phone" className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4" />
                                                    Phone Number *
                                                </Label>
                                                <Input id="phone" placeholder="Enter phone number" />
                                            </div>
                                            <div>
                                                <Label htmlFor="city">City *</Label>
                                                <Input id="city" placeholder="Enter city" />
                                            </div>
                                            <div>
                                                <Label htmlFor="state">State *</Label>
                                                <Input id="state" placeholder="Enter state" />
                                            </div>
                                            <div>
                                                <Label htmlFor="zipCode">ZIP Code *</Label>
                                                <Input id="zipCode" placeholder="Enter ZIP code" />
                                            </div>
                                            <div>
                                                <Label htmlFor="country">Country *</Label>
                                                <Input id="country" placeholder="Enter country" />
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-4">
                                            <Checkbox id="setDefault" />
                                            <Label htmlFor="setDefault">Set as default address</Label>
                                        </div>
                                        <div className="flex space-x-2 mt-4">
                                            <Button onClick={() => setShowNewAddressForm(false)}>
                                                Save Address
                                            </Button>
                                            <Button variant="outline" onClick={() => setShowNewAddressForm(false)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {selectedShippingId && (
                                    <div className="mt-6">
                                        <Button onClick={handleNextStep} className="w-full">
                                            Continue to Payment
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        )}

                        {/* Step 2: Payment Method */}
                        {currentStep === 2 && (
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold flex items-center">
                                        <CreditCard className="w-5 h-5 mr-2" />
                                        Payment Method
                                    </h2>
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowNewPaymentForm(!showNewPaymentForm)}
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add New Payment Method
                                    </Button>
                                </div>

                                {/* Saved Payment Methods */}
                                <RadioGroup value={selectedPaymentId} onValueChange={setSelectedPaymentId}>
                                    <div className="space-y-4">
                                        {savedPayments.map((payment) => (
                                            <div key={payment.id} className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
                                                <div className="flex items-center space-x-3">
                                                    <RadioGroupItem value={payment.id} id={`payment-${payment.id}`} />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <Label htmlFor={`payment-${payment.id}`} className="cursor-pointer">
                                                                <div className="flex items-center">
                                                                    <span className="text-2xl mr-3">{getCardIcon(payment.type)}</span>
                                                                    <div>
                                                                        <div className="font-medium">
                                                                            {payment.type.toUpperCase()} •••• {payment.last4}
                                                                        </div>
                                                                        <div className="text-sm text-gray-600">
                                                                            Expires {payment.expiryMonth}/{payment.expiryYear} • {payment.name}
                                                                        </div>
                                                                    </div>
                                                                    {payment.isDefault && (
                                                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded ml-2">
                                                                            Default
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </Label>
                                                            <div className="flex space-x-2">
                                                                <Button variant="ghost" size="sm">
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="sm">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </RadioGroup>

                                {/* New Payment Method Form */}
                                {showNewPaymentForm && (
                                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                                        <h3 className="text-lg font-medium mb-4">Add New Payment Method</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="cardNumber" className="flex items-center gap-2">
                                                    <CreditCard className="w-4 h-4" />
                                                    Card Number *
                                                </Label>
                                                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="expiryDate">Expiry Date *</Label>
                                                    <Input id="expiryDate" placeholder="MM/YY" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="cvv">CVV *</Label>
                                                    <Input id="cvv" placeholder="123" />
                                                </div>
                                            </div>
                                            <div>
                                                <Label htmlFor="cardName" className="flex items-center gap-2">
                                                    <User className="w-4 h-4" />
                                                    Name on Card *
                                                </Label>
                                                <Input id="cardName" placeholder="Enter name as it appears on card" />
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="setDefaultPayment" />
                                                <Label htmlFor="setDefaultPayment">Set as default payment method</Label>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 mt-4">
                                            <Button onClick={() => setShowNewPaymentForm(false)}>
                                                Save Payment Method
                                            </Button>
                                            <Button variant="outline" onClick={() => setShowNewPaymentForm(false)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {selectedPaymentId && (
                                    <div className="mt-6">
                                        <Button onClick={handleNextStep} className="w-full">
                                            Continue to Review
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        )}

                        {/* Step 3: Review Order */}
                        {currentStep === 3 && (
                            <Card className="p-6">
                                <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>

                                {/* Order Items */}
                                <div className="space-y-4 mb-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                            <img
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                className="w-16 h-16 object-contain"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium">{item.name}</h3>
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
                                                    {item.price === 0 ? 'FREE' : `$${item.price.toFixed(2)}`}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Terms and Conditions */}
                                <div className="border-t pt-6">
                                    <div className="flex items-start space-x-2">
                                        <Checkbox
                                            id="terms"
                                            checked={agreeToTerms}
                                            onCheckedChange={setAgreeToTerms}
                                        />
                                        <Label htmlFor="terms" className="text-sm">
                                            I agree to the <a href="#" className="text-blue-600 underline">Terms of Service</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>
                                        </Label>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Button
                                        onClick={handlePlaceOrder}
                                        disabled={!agreeToTerms}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                                    >
                                        <Lock className="w-5 h-5 mr-2" />
                                        Place Order Securely
                                    </Button>
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-4">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping:</span>
                                    <span className="text-green-600 font-semibold">FREE</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax:</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Security Badges */}
                            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center">
                                    <Shield className="w-4 h-4 mr-1" />
                                    Secure
                                </div>
                                <div className="flex items-center">
                                    <Lock className="w-4 h-4 mr-1" />
                                    Encrypted
                                </div>
                            </div>

                            {/* Current Step Info */}
                            {currentStep === 1 && (
                                <div className="text-sm text-gray-600">
                                    <p className="mb-2">Next: Select your payment method</p>
                                    <p>We'll save your address for future orders</p>
                                </div>
                            )}
                            {currentStep === 2 && (
                                <div className="text-sm text-gray-600">
                                    <p className="mb-2">Next: Review your order</p>
                                    <p>Your payment information is secure</p>
                                </div>
                            )}
                            {currentStep === 3 && (
                                <div className="text-sm text-gray-600">
                                    <p className="mb-2">Ready to place your order</p>
                                    <p>Click "Place Order" to complete your purchase</p>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
