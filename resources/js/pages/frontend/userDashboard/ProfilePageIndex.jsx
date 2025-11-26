'use client';

import { useEffect, useState } from 'react';
import { AccountDetails } from './account-details';
import { AddressManagement } from './address-management';

import { OrderHistory } from './order-history';
import { PaymentMethods } from './payment-methods';
import { ProfileHeader } from './profile-header';
import { ProfileSidebar } from './profile-sidebar';
import { Wishlist } from './wishlist';

export default function ProfilePage({ user }) {
    const [activeSection, setActiveSection] = useState('account');
    const [currentUser, setCurrentUser] = useState(user || null);

    useEffect(() => {
        if (user) setCurrentUser(user);
    }, [user]);

    const handleUserChange = (updated) => {
        if (updated && typeof updated === 'object') {
            setCurrentUser(updated);
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'account':
                return <AccountDetails user={currentUser} onUserChange={handleUserChange} />;
            case 'orders':
                return <OrderHistory />;
            case 'addresses':
                return <AddressManagement />;
            case 'payments':
                return <PaymentMethods />;
            case 'wishlist':
                return <Wishlist />;
            // case 'reviews':
            //     return <div className="p-6 text-black">Reviews Component (Coming Soon)</div>;
            // case 'preferences':
            //     return <div className="p-6 text-black">Preferences Component (Coming Soon)</div>;
            default:
                return <AccountDetails user={currentUser} onUserChange={handleUserChange} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ProfileHeader user={currentUser} />
            <div className="flex ">
                <ProfileSidebar user={currentUser} activeSection={activeSection} onSectionChange={setActiveSection} />
                <main className="ml-0 flex-1 bg-white p-8">
                    <div className="mx-auto max-w-7xl">
                        {activeSection !== 'account' && (
                            <div className="mb-8">
                                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                                    {activeSection === 'account' && 'Account Details'}
                                    {activeSection === 'orders' && 'Order History'}
                                    {activeSection === 'addresses' && 'Address Management'}
                                    {activeSection === 'payments' && 'Payment Methods'}
                                    {activeSection === 'wishlist' && 'My Wishlist'}
                                    {activeSection === 'reviews' && 'Reviews & Ratings'}
                                    {activeSection === 'preferences' && 'Preferences'}
                                </h1>
                                <p className="text-gray-600">
                                    {activeSection === 'account' && 'Manage your personal information and account settings'}
                                    {activeSection === 'orders' && 'View and track your orders'}
                                    {activeSection === 'addresses' && 'Manage your shipping and billing addresses'}
                                    {activeSection === 'payments' && 'Manage your payment methods and billing information'}
                                    {activeSection === 'wishlist' && 'Items you have saved for later'}
                                    {activeSection === 'reviews' && 'Your product reviews and ratings'}
                                    {activeSection === 'preferences' && 'Customize your shopping experience'}
                                </p>
                            </div>
                        )}
                        <div
                            className={`${activeSection === 'account' ? '' : 'overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'}`}
                        >
                            {renderContent()}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
