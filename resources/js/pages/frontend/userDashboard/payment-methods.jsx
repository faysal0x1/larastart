'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Check, CreditCard, DollarSign, Edit2, Plus, Shield, Smartphone, Star, Trash2, Wallet } from 'lucide-react';
import { useState } from 'react';

export function PaymentMethods() {
    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: 1,
            type: 'credit_card',
            brand: 'visa',
            isDefault: true,
            nickname: 'Personal Visa',
            last4: '4242',
            expiryMonth: '12',
            expiryYear: '2027',
            holderName: 'Sarah Johnson',
            billingAddress: {
                street: '123 Oak Street',
                city: 'San Francisco',
                state: 'CA',
                zipCode: '94102',
                country: 'US',
            },
            addedDate: '2023-06-15',
        },
        {
            id: 2,
            type: 'credit_card',
            brand: 'mastercard',
            isDefault: false,
            nickname: 'Work Card',
            last4: '8888',
            expiryMonth: '08',
            expiryYear: '2026',
            holderName: 'Sarah Johnson',
            billingAddress: {
                street: '456 Market Street',
                city: 'San Francisco',
                state: 'CA',
                zipCode: '94105',
                country: 'US',
            },
            addedDate: '2023-09-22',
        },
        {
            id: 3,
            type: 'paypal',
            isDefault: false,
            nickname: 'PayPal Account',
            email: 'sarah.johnson@email.com',
            addedDate: '2023-11-10',
        },
        {
            id: 4,
            type: 'apple_pay',
            isDefault: false,
            nickname: 'Apple Pay',
            deviceName: 'iPhone 15 Pro',
            addedDate: '2024-01-05',
        },
    ]);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingMethod, setEditingMethod] = useState(null);
    const [formData, setFormData] = useState({
        type: 'credit_card',
        nickname: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        holderName: '',
        billingAddress: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'US',
        },
    });

    const resetForm = () => {
        setFormData({
            type: 'credit_card',
            nickname: '',
            cardNumber: '',
            expiryMonth: '',
            expiryYear: '',
            cvv: '',
            holderName: '',
            billingAddress: {
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: 'US',
            },
        });
    };

    const handleInputChange = (field, value) => {
        if (field.startsWith('billingAddress.')) {
            const addressField = field.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                billingAddress: {
                    ...prev.billingAddress,
                    [addressField]: value,
                },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [field]: value }));
        }
    };

    const getCardBrand = (cardNumber) => {
        const number = cardNumber.replace(/\s/g, '');
        if (number.startsWith('4')) return 'visa';
        if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
        if (number.startsWith('3')) return 'amex';
        return 'unknown';
    };

    const formatCardNumber = (value) => {
        const number = value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        const matches = number.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return number;
        }
    };

    const handleAddPaymentMethod = () => {
        const newMethod = {
            id: Date.now(),
            type: formData.type,
            brand: formData.type === 'credit_card' ? getCardBrand(formData.cardNumber) : null,
            isDefault: paymentMethods.length === 0,
            nickname: formData.nickname,
            last4: formData.type === 'credit_card' ? formData.cardNumber.slice(-4) : null,
            expiryMonth: formData.expiryMonth,
            expiryYear: formData.expiryYear,
            holderName: formData.holderName,
            billingAddress: formData.billingAddress,
            addedDate: new Date().toISOString().split('T')[0],
        };
        setPaymentMethods((prev) => [...prev, newMethod]);
        setIsAddDialogOpen(false);
        resetForm();
        console.log('[v0] Added new payment method:', newMethod);
    };

    const handleEditPaymentMethod = (method) => {
        setEditingMethod(method.id);
        setFormData({
            type: method.type,
            nickname: method.nickname,
            cardNumber: method.last4 ? `**** **** **** ${method.last4}` : '',
            expiryMonth: method.expiryMonth || '',
            expiryYear: method.expiryYear || '',
            cvv: '',
            holderName: method.holderName || '',
            billingAddress: method.billingAddress || {
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: 'US',
            },
        });
        setIsAddDialogOpen(true);
    };

    const handleUpdatePaymentMethod = () => {
        setPaymentMethods((prev) =>
            prev.map((method) =>
                method.id === editingMethod
                    ? {
                          ...method,
                          nickname: formData.nickname,
                          holderName: formData.holderName,
                          billingAddress: formData.billingAddress,
                      }
                    : method,
            ),
        );
        setIsAddDialogOpen(false);
        setEditingMethod(null);
        resetForm();
        console.log('[v0] Updated payment method:', editingMethod);
    };

    const handleDeletePaymentMethod = (methodId) => {
        const methodToDelete = paymentMethods.find((method) => method.id === methodId);
        if (methodToDelete?.isDefault && paymentMethods.length > 1) {
            setPaymentMethods((prev) => {
                const filtered = prev.filter((method) => method.id !== methodId);
                if (filtered.length > 0) {
                    filtered[0].isDefault = true;
                }
                return filtered;
            });
        } else {
            setPaymentMethods((prev) => prev.filter((method) => method.id !== methodId));
        }
        console.log('[v0] Deleted payment method:', methodId);
    };

    const handleSetDefault = (methodId) => {
        setPaymentMethods((prev) =>
            prev.map((method) => ({
                ...method,
                isDefault: method.id === methodId,
            })),
        );
        console.log('[v0] Set default payment method:', methodId);
    };

    const getPaymentIcon = (type, brand) => {
        switch (type) {
            case 'credit_card':
                return <CreditCard className="h-5 w-5" />;
            case 'paypal':
                return <Wallet className="h-5 w-5" />;
            case 'apple_pay':
                return <Smartphone className="h-5 w-5" />;
            default:
                return <CreditCard className="h-5 w-5" />;
        }
    };

    const getPaymentTypeColor = (type) => {
        switch (type) {
            case 'credit_card':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'paypal':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'apple_pay':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getBrandColor = (brand) => {
        switch (brand) {
            case 'visa':
                return 'bg-blue-600 text-white-600';
            case 'mastercard':
                return 'bg-red-600 text-white';
            case 'amex':
                return 'bg-green-600 text-white';
            default:
                return 'bg-gray-600 text-white';
        }
    };

    return (
        <div className="space-y-8">
            {/* Header Card */}
            <Card className="border-0 bg-white text-black shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl text-black">Payment Methods</CardTitle>
                            <CardDescription>Manage your payment options and billing information</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                <Shield className="mr-1 h-3 w-3" />
                                {paymentMethods.length} Methods
                            </Badge>
                            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button onClick={resetForm} size="sm">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Payment Method
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>{editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}</DialogTitle>
                                        <DialogDescription>
                                            {editingMethod
                                                ? 'Update your payment method information'
                                                : 'Add a new payment method for faster checkout'}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="type">Payment Type</Label>
                                            <select
                                                id="type"
                                                value={formData.type}
                                                onChange={(e) => handleInputChange('type', e.target.value)}
                                                className="border-input bg-background focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                                disabled={editingMethod}
                                            >
                                                <option value="credit_card">Credit/Debit Card</option>
                                                <option value="paypal">PayPal</option>
                                                <option value="apple_pay">Apple Pay</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="nickname">Nickname</Label>
                                            <Input
                                                id="nickname"
                                                value={formData.nickname}
                                                onChange={(e) => handleInputChange('nickname', e.target.value)}
                                                placeholder="e.g., Personal Card, Work Card"
                                            />
                                        </div>

                                        {formData.type === 'credit_card' && (
                                            <>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cardNumber">Card Number</Label>
                                                    <Input
                                                        id="cardNumber"
                                                        value={formData.cardNumber}
                                                        onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                                                        placeholder="1234 5678 9012 3456"
                                                        maxLength={19}
                                                        disabled={editingMethod}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="expiryMonth">Month</Label>
                                                        <select
                                                            id="expiryMonth"
                                                            value={formData.expiryMonth}
                                                            onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                                                            className="border-input bg-background focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                                            disabled={editingMethod}
                                                        >
                                                            <option value="">MM</option>
                                                            {Array.from({ length: 12 }, (_, i) => (
                                                                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                                                    {String(i + 1).padStart(2, '0')}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="expiryYear">Year</Label>
                                                        <select
                                                            id="expiryYear"
                                                            value={formData.expiryYear}
                                                            onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                                                            className="border-input bg-background focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                                            disabled={editingMethod}
                                                        >
                                                            <option value="">YYYY</option>
                                                            {Array.from({ length: 10 }, (_, i) => (
                                                                <option key={i} value={new Date().getFullYear() + i}>
                                                                    {new Date().getFullYear() + i}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cvv">CVV</Label>
                                                        <Input
                                                            id="cvv"
                                                            value={formData.cvv}
                                                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                                                            placeholder="123"
                                                            maxLength={4}
                                                            disabled={editingMethod}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="holderName">Cardholder Name</Label>
                                                    <Input
                                                        id="holderName"
                                                        value={formData.holderName}
                                                        onChange={(e) => handleInputChange('holderName', e.target.value)}
                                                        placeholder="Name on card"
                                                    />
                                                </div>
                                                <div className="space-y-4">
                                                    <Label>Billing Address</Label>
                                                    <Input
                                                        value={formData.billingAddress.street}
                                                        onChange={(e) => handleInputChange('billingAddress.street', e.target.value)}
                                                        placeholder="Street address"
                                                    />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input
                                                            value={formData.billingAddress.city}
                                                            onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
                                                            placeholder="City"
                                                        />
                                                        <Input
                                                            value={formData.billingAddress.state}
                                                            onChange={(e) => handleInputChange('billingAddress.state', e.target.value)}
                                                            placeholder="State"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input
                                                            value={formData.billingAddress.zipCode}
                                                            onChange={(e) => handleInputChange('billingAddress.zipCode', e.target.value)}
                                                            placeholder="ZIP Code"
                                                        />
                                                        <select
                                                            value={formData.billingAddress.country}
                                                            onChange={(e) => handleInputChange('billingAddress.country', e.target.value)}
                                                            className="border-input bg-background focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                                                        >
                                                            <option value="US">United States</option>
                                                            <option value="CA">Canada</option>
                                                            <option value="GB">United Kingdom</option>
                                                            <option value="AU">Australia</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setIsAddDialogOpen(false);
                                                setEditingMethod(null);
                                                resetForm();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button onClick={editingMethod ? handleUpdatePaymentMethod : handleAddPaymentMethod}>
                                            {editingMethod ? 'Update Method' : 'Add Method'}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Payment Statistics */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Total Methods</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">{paymentMethods.length}</p>
                                    <Badge variant="secondary" className="bg-green-100 text-xs text-green-700">
                                        Active
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-blue-500 p-3">
                                <CreditCard className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Credit Cards</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">
                                        {paymentMethods.filter((method) => method.type === 'credit_card').length}
                                    </p>
                                    <Badge variant="secondary" className="bg-blue-100 text-xs text-blue-700">
                                        Primary
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-indigo-500 p-3">
                                <CreditCard className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Digital Wallets</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">
                                        {paymentMethods.filter((method) => method.type === 'paypal' || method.type === 'apple_pay').length}
                                    </p>
                                    <Badge variant="secondary" className="bg-yellow-100 text-xs text-yellow-700">
                                        Linked
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-yellow-500 p-3">
                                <Wallet className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-black">Total Spent</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-black">$2,847</p>
                                    <Badge variant="secondary" className="bg-green-100 text-xs text-green-700">
                                        +8%
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg bg-green-500 p-3">
                                <DollarSign className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Payment Methods List */}
            <div className="space-y-6">
                {paymentMethods.map((method) => (
                    <Card key={method.id} className={`border-0 bg-white shadow-sm ${method.isDefault ? 'ring-2 ring-blue-200' : ''}`}>
                        <CardHeader>
                            <div className="flex items-center justify-between text-black">
                                <div className="flex items-center gap-3">
                                    <Badge className={getPaymentTypeColor(method.type)}>
                                        {getPaymentIcon(method.type, method.brand)}
                                        <span className="ml-1 capitalize">{method.type.replace('_', ' ')}</span>
                                    </Badge>
                                    <CardTitle className="text-lg">{method.nickname}</CardTitle>
                                    {method.isDefault && (
                                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                            <Star className="mr-1 h-3 w-3" />
                                            Default
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" onClick={() => handleEditPaymentMethod(method)}>
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDeletePaymentMethod(method.id)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 text-black">
                                {method.type === 'credit_card' && (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Badge className={getBrandColor(method.brand)}>{method.brand?.toUpperCase()}</Badge>
                                            <span className="font-mono text-lg">•••• •••• •••• {method.last4}</span>
                                        </div>
                                        <div className="text-muted-foreground text-sm">
                                            <Calendar className="mr-1 inline h-4 w-4" />
                                            {method.expiryMonth}/{method.expiryYear}
                                        </div>
                                    </div>
                                )}

                                {method.type === 'paypal' && (
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm">{method.email}</span>
                                    </div>
                                )}

                                {method.type === 'apple_pay' && (
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm">{method.deviceName}</span>
                                    </div>
                                )}

                                {method.holderName && <p className="text-muted-foreground text-sm">Cardholder: {method.holderName}</p>}

                                {method.billingAddress && (
                                    <div className="text-muted-foreground text-sm">
                                        <p>
                                            Billing: {method.billingAddress.street}, {method.billingAddress.city}, {method.billingAddress.state}{' '}
                                            {method.billingAddress.zipCode}
                                        </p>
                                    </div>
                                )}

                                <p className="text-muted-foreground text-xs">Added on {new Date(method.addedDate).toLocaleDateString()}</p>
                            </div>

                            <div className="mt-4 flex items-center gap-2 border-t pt-4">
                                {!method.isDefault && (
                                    <Button size="sm" variant="outline" onClick={() => handleSetDefault(method.id)}>
                                        <Check className="mr-1 h-4 w-4" />
                                        Set as Default
                                    </Button>
                                )}
                                <Button size="sm" variant="outline" onClick={() => console.log('[v0] Using payment method for purchase:', method.id)}>
                                    <DollarSign className="mr-1 h-4 w-4" />
                                    Use for Payment
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => console.log('[v0] Verifying payment method:', method.id)}>
                                    <Shield className="mr-1 h-4 w-4" />
                                    Verify
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {paymentMethods.length === 0 && (
                <Card className="border-0 bg-white shadow-sm">
                    <CardContent className="pt-6">
                        <div className="py-8 text-center">
                            <CreditCard className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-black">No payment methods saved</h3>
                            <p className="mb-4 text-gray-600">Add a payment method to make checkout faster and more secure</p>
                            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-sky-900 text-white">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Your First Payment Method
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Payment Security */}
            <Card className="border-0 bg-white shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-black">
                        <Shield className="h-5 w-5" />
                        Payment Security
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-black">
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                        <div>
                            <h4 className="font-medium text-black">Secure Payment Processing</h4>
                            <p className="text-sm text-black">Industry-standard encryption protects your payment details</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <Shield className="mr-1 h-3 w-3" />
                            SSL Secured
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                        <div>
                            <h4 className="font-medium text-black">PCI Compliance</h4>
                            <p className="text-sm text-black">We meet all security standards for payment processing</p>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            <Check className="mr-1 h-3 w-3" />
                            Certified
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
