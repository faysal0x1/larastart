import Sidebar from '@/components/frontend/Sideber';
import WebLayout from '@/layouts/web/WebLayout';
import { Calendar, CreditCard, Plus, Shield } from 'lucide-react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const PaymentOptions = () => {
    const [cards, setCards] = useState([
        {
            id: 1,
            type: 'Mastercard',
            number: '5*** **** **** 1383',
            fullNumber: '5421 1234 5678 1383',
            expiryDate: '03 / 32',
            cardholderName: 'JOHN DOE',
            isDefault: true,
        },
        {
            id: 2,
            type: 'Visa',
            number: '4*** **** **** 7890',
            fullNumber: '4532 1234 5678 7890',
            expiryDate: '12 / 28',
            cardholderName: 'JOHN DOE',
            isDefault: false,
        },
    ]);

    const [showAddCardModal, setShowAddCardModal] = useState(false);
    const [editingCard, setEditingCard] = useState(null);

    const handleSetDefault = (cardId) => {
        setCards(
            cards.map((card) => ({
                ...card,
                isDefault: card.id === cardId,
            })),
        );
    };

    const handleRemoveCard = (cardId) => {
        if (cards.length > 1 || window.confirm('Are you sure you want to remove this payment method?')) {
            setCards(cards.filter((card) => card.id !== cardId));
        }
    };

    const handleEditCard = (card) => {
        setEditingCard(card);
        setShowAddCardModal(true);
    };

    const AddCardModal = () => {
        const [formData, setFormData] = useState({
            cardNumber: editingCard ? editingCard.fullNumber : '',
            expiryMonth: editingCard ? editingCard.expiryDate.split(' / ')[0] : '',
            expiryYear: editingCard ? editingCard.expiryDate.split(' / ')[1] : '',
            cvv: '',
            nameOnCard: editingCard ? editingCard.cardholderName : '',
            isDefault: editingCard ? editingCard.isDefault : false,
        });

        const handleInputChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            // Determine card type from card number
            const cardType = formData.cardNumber.startsWith('4') ? 'Visa' : formData.cardNumber.startsWith('5') ? 'Mastercard' : 'Unknown';

            const newCard = {
                id: editingCard ? editingCard.id : cards.length + 1,
                type: cardType,
                number: `${formData.cardNumber.slice(0, 1)}*** **** **** ${formData.cardNumber.slice(-4)}`,
                fullNumber: formData.cardNumber,
                expiryDate: `${formData.expiryMonth} / ${formData.expiryYear}`,
                cardholderName: formData.nameOnCard.toUpperCase(),
                isDefault: formData.isDefault,
            };

            if (editingCard) {
                setCards(cards.map((card) => (card.id === editingCard.id ? newCard : card)));
            } else {
                setCards([...cards, newCard]);
            }

            setShowAddCardModal(false);
            setEditingCard(null);
        };

        const handleClose = () => {
            setShowAddCardModal(false);
            setEditingCard(null);
        };

        if (!showAddCardModal) return null;

        return (
            <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center overflow-y-auto duration-300">
                {/* Backdrop */}
                <div className="bg-opacity-60 fixed inset-0 bg-black backdrop-blur-sm transition-opacity duration-300" onClick={handleClose}></div>

                {/* Modal */}
                <div className="animate-in zoom-in-95 relative z-10 mx-4 my-8 w-full max-w-md duration-300">
                    <div className="relative transform rounded-lg bg-white shadow-2xl transition-all duration-300">
                        {/* Header */}
                        <div className="flex items-center justify-between rounded-t-lg border-b border-gray-200 bg-gray-50 px-6 py-4">
                            <div className="flex items-center">
                                <CreditCard className="mr-3 h-6 w-6 text-blue-600" />
                                <h2 className="text-xl font-semibold text-gray-900">{editingCard ? 'Edit Credit Card' : 'Add New Credit Card'}</h2>
                            </div>
                            <button
                                onClick={handleClose}
                                className="rounded-full p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-600"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-4">
                            {/* Card Number */}
                            <div>
                                <label htmlFor="cardNumber" className="mb-2 block text-sm font-medium text-gray-700">
                                    Card Number *
                                </label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    required
                                    maxLength="19"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    placeholder="1234 5678 9012 3456"
                                />
                            </div>

                            {/* Name on Card */}
                            <div>
                                <label htmlFor="nameOnCard" className="mb-2 block text-sm font-medium text-gray-700">
                                    Name on Card *
                                </label>
                                <input
                                    type="text"
                                    id="nameOnCard"
                                    name="nameOnCard"
                                    value={formData.nameOnCard}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Expiry and CVV */}
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label htmlFor="expiryMonth" className="mb-2 block text-sm font-medium text-gray-700">
                                        Month *
                                    </label>
                                    <select
                                        id="expiryMonth"
                                        name="expiryMonth"
                                        value={formData.expiryMonth}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="">MM</option>
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                            <option key={month} value={month.toString().padStart(2, '0')}>
                                                {month.toString().padStart(2, '0')}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="expiryYear" className="mb-2 block text-sm font-medium text-gray-700">
                                        Year *
                                    </label>
                                    <select
                                        id="expiryYear"
                                        name="expiryYear"
                                        value={formData.expiryYear}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="">YY</option>
                                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                                            <option key={year} value={year.toString().slice(-2)}>
                                                {year.toString().slice(-2)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="cvv" className="mb-2 block text-sm font-medium text-gray-700">
                                        CVV *
                                    </label>
                                    <input
                                        type="text"
                                        id="cvv"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        required
                                        maxLength="4"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        placeholder="123"
                                    />
                                </div>
                            </div>

                            {/* Default Card Checkbox */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isDefault"
                                    name="isDefault"
                                    checked={formData.isDefault}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                                    Set as default payment method
                                </label>
                            </div>

                            {/* Footer */}
                            <div className="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-4">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md border border-transparent bg-sky-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700"
                                >
                                    {editingCard ? 'Update Card' : 'Add Card'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <WebLayout>
            <Head>
                <title>Payment Options - User Dashboard</title>
                <meta name="description" content="Add a new credit card or edit/remove an existing one." />
                <meta name="keywords" content="payment options, credit cards, manage payment methods" />
                <link rel="canonical" href="https://tbz.com.bd/" />
                {/* Open Graph Tags */}
                <meta property="og:title" content="Payment Options - User Dashboard" />
                <meta property="og:description" content="Add a new credit card or edit/remove an existing one." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tbz.com.bd/" />
                <meta property="og:image" content="https://tbz.com.bd/images/og-home.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="TBZ" />
                <meta property="og:locale" content="en_US" />
                {/* Twitter Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@tbz" />
                <meta name="twitter:creator" content="@tbz" />
                <meta name="twitter:title" content="Payment Options - User Dashboard" />
                <meta name="twitter:description" content="Add a new credit card or edit/remove an existing one." />
                <meta name="twitter:image" content="https://tbz.com.bd/images/twitter-home.jpg" />
                {/* Additional Meta Tags */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="TBZ" />
                <meta name="theme-color" content="#2563eb" />
                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'TBZ',
                        url: 'https://tbz.com.bd/',
                        logo: 'https://tbz.com.bd/images/logo.png',
                        description: 'Add a new credit card or edit/remove an existing one.',
                        applicationCategory: 'BusinessApplication',
                    })}
                </script>
                

            </Head>
            <div className="min-h-screen bg-gray-50 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row">
                        {/* Sidebar Navigation */}
                        <Sidebar activePage="paymentOptions" />

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Header Section */}
                            <div className="mb-8">
                                <h1 className="mb-2 text-3xl font-bold text-gray-900">PAYMENT OPTIONS</h1>
                                <p className="text-gray-600">Add a new credit card or edit/remove an existing one.</p>
                            </div>
                            {/* Add New Card Button */}
                            <div className="mb-6">
                                <button
                                    onClick={() => setShowAddCardModal(true)}
                                    className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                                >
                                    <Plus className="h-4 w-4" />
                                    ADD NEW CREDIT CARD
                                </button>
                            </div>
                            {/* Payment Cards List */}
                            <div className="mb-6 space-y-6">
                                {cards.map((card) => (
                                    <div key={card.id} className="flex flex-col gap-6 lg:flex-row lg:items-center">
                                        {/* Credit Card Visual */}
                                        <div className="relative h-56 w-full max-w-sm transform overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg transition-transform hover:scale-105">
                                            {/* Card Background Pattern */}
                                            <div className="absolute inset-0 opacity-10">
                                                <div className="absolute top-4 right-4 h-32 w-32 rounded-full border border-white/20"></div>
                                                <div className="absolute bottom-4 left-4 h-24 w-24 rounded-full border border-white/10"></div>
                                            </div>

                                            {/* Card Content */}
                                            <div className="relative flex h-full flex-col justify-between p-6 text-white">
                                                {/* Top Section */}
                                                <div className="flex items-start justify-between">
                                                    {/* Bank/Company Name */}
                                                    <div className="text-xs font-medium tracking-wider opacity-80">NEWEGG BANK</div>

                                                    {/* Card Type Logo */}
                                                    <div className="flex items-center">
                                                        {card.type === 'Mastercard' && (
                                                            <div className="flex items-center gap-0.5">
                                                                <div className="h-8 w-8 rounded-full bg-red-500 opacity-90"></div>
                                                                <div className="-ml-4 h-8 w-8 rounded-full bg-yellow-500 opacity-90"></div>
                                                            </div>
                                                        )}
                                                        {card.type === 'Visa' && <div className="text-2xl font-bold tracking-wider">VISA</div>}
                                                    </div>
                                                </div>

                                                {/* Middle Section - Card Number */}
                                                <div className="flex flex-1 items-center">
                                                    <div className="font-mono text-xl tracking-widest">
                                                        {card.number.replace(/(.{4})/g, '$1 ').trim()}
                                                    </div>
                                                </div>

                                                {/* Bottom Section */}
                                                <div className="flex items-end justify-between">
                                                    <div>
                                                        <div className="mb-1 text-xs opacity-70">VALID THRU</div>
                                                        <div className="font-mono text-sm tracking-wider">{card.expiryDate}</div>
                                                    </div>
                                                    <div>
                                                        <div className="mb-1 text-xs opacity-70">CARDHOLDER</div>
                                                        <div className="text-sm font-medium tracking-wide">{card.cardholderName}</div>
                                                    </div>
                                                </div>

                                                {/* Chip */}
                                                <div className="absolute top-16 left-6 h-9 w-12 rounded bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-sm">
                                                    <div className="flex h-full w-full items-center justify-center rounded bg-gradient-to-br from-yellow-300 to-yellow-500">
                                                        <div className="grid grid-cols-3 gap-0.5">
                                                            {[...Array(9)].map((_, i) => (
                                                                <div key={i} className="h-1 w-1 rounded-full bg-yellow-700"></div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Information and Actions */}
                                        <div className="flex-1 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="mb-3 flex items-center gap-3">
                                                        <h3 className="text-lg font-semibold text-gray-900">{card.type}</h3>
                                                        {card.isDefault && (
                                                            <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
                                                                DEFAULT
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <span className="mr-2 font-medium">Card Number:</span>
                                                            <span className="font-mono">{card.number}</span>
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <Calendar className="mr-2 h-4 w-4" />
                                                            <span className="mr-2 font-medium">Expires:</span>
                                                            <span>{card.expiryDate}</span>
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <span className="mr-2 font-medium">Status:</span>
                                                            <span className="font-medium text-green-600">Active</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex flex-col gap-2">
                                                    {!card.isDefault && (
                                                        <button
                                                            onClick={() => handleSetDefault(card.id)}
                                                            className="rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm transition-colors hover:bg-blue-100"
                                                        >
                                                            SET DEFAULT
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleEditCard(card)}
                                                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                                                    >
                                                        EDIT
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemoveCard(card.id)}
                                                        className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 shadow-sm transition-colors hover:bg-red-100"
                                                    >
                                                        REMOVE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>{' '}
                            {/* Privacy Notice */}
                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                                <div className="flex items-start gap-3">
                                    <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-600" />
                                    <div className="text-sm leading-relaxed text-gray-600">
                                        <p>
                                            <strong className="text-gray-900">Newegg</strong> is the sole owner of the information collected on this
                                            site. We will not sell, share, or rent this information to any outside parties, except as outlined in the{' '}
                                            <a href="#" className="text-blue-600 hover:underline">
                                                privacy policy
                                            </a>
                                            .
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div id="sentinel" className="h-10"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Card Modal */}
            <AddCardModal />
        </WebLayout>
    );
};

export default PaymentOptions;
