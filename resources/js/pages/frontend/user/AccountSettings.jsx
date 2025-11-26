import Sidebar from '@/components/frontend/Sideber';
import WebLayout from '@/layouts/web/WebLayout';
import { Eye, EyeOff, HelpCircle, Phone } from 'lucide-react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const AccountSettings = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [accountData, setAccountData] = useState({
        name: 'Farmer',
        email: 'puqakehi@diu.edu.bd',
        companyName: '',
        mobileNumber: 'PH +63 1229885076',
        password: '********',
        displayAsAnonymous: true,
    });

    const [isEditing, setIsEditing] = useState({
        name: false,
        mobile: false,
        password: false,
    });

    const handleEdit = (field) => {
        setIsEditing((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleInputChange = (field, value) => {
        setAccountData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDisplayModeChange = (isAnonymous) => {
        setAccountData((prev) => ({
            ...prev,
            displayAsAnonymous: isAnonymous,
        }));
    };

    return (
        <WebLayout>
                    <Head>
                            <title>Account Settings</title>
                            <meta
                                name="description"
                                content="Manage your account settings, privacy preferences, and personal information securely on TBZ. Update your name, email, company details, mobile number, and password with ease. Choose to display your real name or remain anonymous for added privacy. Our platform ensures your data is protected and never shared with third parties except as outlined in our privacy policy. Take control of your account, safeguard your credentials, and enjoy a seamless user experience. Whether you are updating your contact information or changing your password, TBZ provides a user-friendly dashboard for all your account management needs. Stay informed about your privacy rights and make changes anytime. Your security and convenience are our top priorities."
                            />
                            <meta name="keywords" content="account settings, user profile, manage account" />
                            <link rel="canonical" href="https://tbz.com.bd/" />
                            {/* Open Graph Tags */}
                            <meta property="og:title" content="Account Settings - User Dashboard" />
                            <meta property="og:description" content="Manage your account settings." />
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
                            <meta name="twitter:title" content="Address Book - User Dashboard" />
                            <meta name="twitter:description" content="Manage your addresses in the Address Book." />
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
                                    description: 'Manage your account settings.',
                                    applicationCategory: 'BusinessApplication',
                                })}
                            </script>
                        </Head>
            <div className="min-h-screen bg-gray-50 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row">
                        {/* Sidebar Navigation */}
                        <Sidebar activePage="accountSettings" />

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Header Section */}
                            <div className="mb-8">
                                <h1 className="mb-2 text-3xl font-bold text-gray-900">ACCOUNT SETTINGS</h1>
                                <p className="text-gray-600">Control, protect, and secure your account.</p>
                            </div>

                            {/* Account Information Section */}
                            <div className="mb-6 rounded-lg border border-gray-200 text-black bg-white p-6 shadow-sm">
                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                    <div className="space-y-6">
                                        {/* Account Information */}
                                        <div>
                                            <label className="mb-3 block text-sm font-medium text-gray-700">Account Information</label>
                                            <div className="flex items-center justify-between">
                                                {isEditing.name ? (
                                                    <input
                                                        type="text"
                                                        value={accountData.name}
                                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                        onBlur={() => handleEdit('name')}
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <div className="flex-1">
                                                        <div className="font-medium text-gray-900">{accountData.name}</div>
                                                        <div className="text-sm text-gray-500">{accountData.email}</div>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => handleEdit('name')}
                                                    className="ml-4 rounded-md border border-gray-300 px-4 py-1 text-sm transition-colors hover:bg-gray-50"
                                                >
                                                    EDIT
                                                </button>
                                            </div>
                                        </div>

                                        {/* Display Mode */}
                                        <div>
                                            <div className="flex items-center space-x-4">
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="displayMode"
                                                        checked={!accountData.displayAsAnonymous}
                                                        onChange={() => handleDisplayModeChange(false)}
                                                        className="mr-2 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm text-gray-700">Display Real Name</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="displayMode"
                                                        checked={accountData.displayAsAnonymous}
                                                        onChange={() => handleDisplayModeChange(true)}
                                                        className="mr-2 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm text-gray-700">Display as Anonymous</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Company Name */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Company Name (optional)</label>
                                            <input
                                                type="text"
                                                value={accountData.companyName}
                                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                placeholder="Enter company name"
                                            />
                                        </div>

                                        {/* Mobile Number */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                <div className="flex items-center">
                                                    <Phone className="mr-1 h-4 w-4" />
                                                    Mobile Number
                                                    <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
                                                </div>
                                            </label>
                                            <div className="flex items-center justify-between">
                                                {isEditing.mobile ? (
                                                    <input
                                                        type="text"
                                                        value={accountData.mobileNumber}
                                                        onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                                                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                        onBlur={() => handleEdit('mobile')}
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <div className="flex-1 font-medium text-gray-900">{accountData.mobileNumber}</div>
                                                )}
                                                <button
                                                    onClick={() => handleEdit('mobile')}
                                                    className="ml-4 rounded-md border border-gray-300 px-4 py-1 text-sm transition-colors hover:bg-gray-50"
                                                >
                                                    EDIT
                                                </button>
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-1 items-center">
                                                    {isEditing.password ? (
                                                        <div className="flex flex-1 items-center">
                                                            <input
                                                                type={showPassword ? 'text' : 'password'}
                                                                value={accountData.password}
                                                                onChange={(e) => handleInputChange('password', e.target.value)}
                                                                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                                onBlur={() => handleEdit('password')}
                                                                autoFocus
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                                                            >
                                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex-1 font-medium text-gray-900">••••••••</div>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => handleEdit('password')}
                                                    className="ml-4 rounded-md border border-gray-300 px-4 py-1 text-sm transition-colors hover:bg-gray-50"
                                                >
                                                    EDIT
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Privacy Notice */}
                                    <div className="rounded-lg bg-gray-50 p-6">
                                        <div className="text-sm leading-relaxed text-gray-600">
                                            <p>
                                                <strong className="text-gray-900">Newegg</strong> is the sole owner of the information collected on
                                                this site. We will not sell, share, or rent this information to any outside parties, except as
                                                outlined in the{' '}
                                                <a href="#" className="text-blue-600 hover:underline">
                                                    privacy policy
                                                </a>
                                                .
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Save Changes Button */}
                            <div className="flex justify-end">
                                <button className="rounded-md bg-sky-800 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-sky-700">
                                    Save Changes
                                </button>
                            </div>

                            <div id="sentinel" className="h-10"></div>
                        </div>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
};

export default AccountSettings;
