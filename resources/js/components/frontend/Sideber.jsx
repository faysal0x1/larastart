import { Bell, CreditCard, GraduationCap, LogOut, Package, Settings, Star, User } from 'lucide-react';

export default function Sidebar({ activePage = null }) {
    return (
        <div className="mb-6 w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:mr-6 md:mb-0 md:w-80">
            {/* User Greeting Section */}
            <div className="mb-8 border-b border-gray-100 pb-6">
                <div className="mb-3 flex items-center">
                    <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Hi, Farmer</h2>
                        <p className="text-sm text-gray-500">Welcome back!</p>
                    </div>
                </div>
                <p className="text-xs text-gray-400">Member since 1 day</p>
            </div>

            {/* Orders Section */}
            <div className="mb-6">
                <div className="mb-4">
                    <h3 className="flex items-center text-sm font-semibold tracking-wide text-gray-900 uppercase">
                        <Package className="mr-2 h-4 w-4 text-gray-600" />
                        Orders
                    </h3>
                </div>
                <ul className="space-y-3">
                    <li>
                        <a
                            href="#"
                            className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                                activePage === 'orderHistory'
                                    ? 'border-l-4 border-blue-600 bg-blue-50 font-medium text-blue-600'
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            <span className={`mr-3 h-2 w-2 rounded-full ${activePage === 'orderHistory' ? 'bg-blue-600' : 'bg-gray-400'}`}></span>
                            Order History
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                                activePage === 'returnStatus'
                                    ? 'border-l-4 border-blue-600 bg-blue-50 font-medium text-blue-600'
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            <span className={`mr-3 h-2 w-2 rounded-full ${activePage === 'returnStatus' ? 'bg-blue-600' : 'bg-gray-400'}`}></span>
                            Return Status / History
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                                activePage === 'marketplaceClaims'
                                    ? 'border-l-4 border-blue-600 bg-blue-50 font-medium text-blue-600'
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            <span
                                className={`mr-3 h-2 w-2 rounded-full ${activePage === 'marketplaceClaims' ? 'bg-blue-600' : 'bg-gray-400'}`}
                            ></span>
                            Marketplace Claims
                        </a>
                    </li>
                </ul>
            </div>

            {/* Manage Account Section */}
            <div className="mb-6">
                <div className="mb-4">
                    <h3 className="flex items-center text-sm font-semibold tracking-wide text-gray-900 uppercase">
                        <Settings className="mr-2 h-4 w-4 text-gray-600" />
                        Manage Account
                    </h3>
                </div>
                <ul className="space-y-3">
                    <li>
                        <a
                            href="/accountSettings"
                            className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                                activePage === 'accountSettings'
                                    ? 'border-l-4 border-blue-600 bg-blue-50 font-medium text-blue-600'
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            <User className={`mr-3 h-4 w-4 ${activePage === 'accountSettings' ? 'text-blue-600' : 'text-gray-400'}`} />
                            Account Settings
                        </a>
                    </li>
                    <li>
                        <a
                            href="/address"
                            className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                                activePage === 'addressBook'
                                    ? 'border-l-4 border-blue-600 bg-blue-50 font-medium text-blue-600'
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            <CreditCard className={`mr-3 h-4 w-4 ${activePage === 'addressBook' ? 'text-blue-600' : 'text-gray-400'}`} />
                            Address Book
                        </a>
                    </li>
                    <li>
                        <a
                            href="/paymentOptions"
                            className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                                activePage === 'paymentOptions'
                                    ? 'border-l-4 border-blue-600 bg-blue-50 font-medium text-blue-600'
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            <CreditCard className={`mr-3 h-4 w-4 ${activePage === 'paymentOptions' ? 'text-blue-600' : 'text-gray-400'}`} />
                            Payment Options
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                                activePage === 'academicInfo'
                                    ? 'border-l-4 border-blue-600 bg-blue-50 font-medium text-blue-600'
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            <GraduationCap className={`mr-3 h-4 w-4 ${activePage === 'academicInfo' ? 'text-blue-600' : 'text-gray-400'}`} />
                            Academic Info
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                                activePage === 'manageReviews'
                                    ? 'border-l-4 border-blue-600 bg-blue-50 font-medium text-blue-600'
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            <Star className={`mr-3 h-4 w-4 ${activePage === 'manageReviews' ? 'text-blue-600' : 'text-gray-400'}`} />
                            Manage Reviews
                        </a>
                    </li>
                </ul>
            </div>

            {/* Notifications Section */}
            <div className="mb-8">
                <div className="mb-4">
                    <h3 className="flex items-center text-sm font-semibold tracking-wide text-gray-900 uppercase">
                        <Bell className="mr-2 h-4 w-4 text-gray-600" />
                        Notifications
                    </h3>
                </div>
                <ul className="space-y-3">
                    <li>
                        <a
                            href="#"
                            className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                                activePage === 'messageCenter'
                                    ? 'border-l-4 border-blue-600 bg-blue-50 font-medium text-blue-600'
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            <span className={`mr-3 h-2 w-2 rounded-full ${activePage === 'messageCenter' ? 'bg-blue-600' : 'bg-gray-400'}`}></span>
                            Message Center
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                                activePage === 'emailNotifications'
                                    ? 'border-l-4 border-blue-600 bg-blue-50 font-medium text-blue-600'
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            <span
                                className={`mr-3 h-2 w-2 rounded-full ${activePage === 'emailNotifications' ? 'bg-blue-600' : 'bg-gray-400'}`}
                            ></span>
                            Email Notifications
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                                activePage === 'autoNotify'
                                    ? 'border-l-4 border-blue-600 bg-blue-50 font-medium text-blue-600'
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            <span className={`mr-3 h-2 w-2 rounded-full ${activePage === 'autoNotify' ? 'bg-blue-600' : 'bg-gray-400'}`}></span>
                            Auto Notify
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                                activePage === 'priceAlerts'
                                    ? 'border-l-4 border-blue-600 bg-blue-50 font-medium text-blue-600'
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            <span className={`mr-3 h-2 w-2 rounded-full ${activePage === 'priceAlerts' ? 'bg-blue-600' : 'bg-gray-400'}`}></span>
                            Price Alerts
                        </a>
                    </li>
                </ul>
            </div>

            {/* Sign Out Button */}
            <div className="border-t border-gray-100 pt-6">
                <button className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
