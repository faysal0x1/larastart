
import { ChevronDown, LogOut } from "lucide-react"
import { Link } from '@inertiajs/react'

export default function Sidebar() {
    return (
        <div className="w-80 bg-white border-r border-gray-200 p-6">
            {/* User Greeting Section */}
            <div className="mb-8">
                <div className="mb-2">
                    <Link href={route('login')} className="text-lg font-semibold text-blue-600 hover:text-blue-800">
                        Hi, Farmer
                    </Link>
                </div>
                <p className="text-sm text-gray-600">Thanks for being a Newegg customer for 1 day</p>
            </div>

            {/* Orders Section */}
            <div className="mb-6">
                <div className="mb-3">
                    <h3 className="text-base font-semibold text-gray-900 flex items-center justify-between">
                        Orders
                        <ChevronDown className="w-4 h-4" />
                    </h3>
                </div>
                <ul className="space-y-2 ml-4">
                    <li>
                        <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Order History
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Return Status / History
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Marketplace Claim History
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Manage Account Section */}
            <div className="mb-6">
                <div className="mb-3">
                    <h3 className="text-base font-semibold text-gray-900 flex items-center justify-between">
                        Manage Account
                        <ChevronDown className="w-4 h-4" />
                    </h3>
                </div>
                <ul className="space-y-2 ml-4">
                    <li>
                        <Link href={route('user.account.settings')} className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Account Settings
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route('user.addresses.index')}
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-semibold bg-blue-50 px-2 py-1 rounded"
                        >
                            Address Book
                        </Link>
                    </li>
                    <li>
                        <Link href={route('user.payment.options')} className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Payment Options
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Academic Info
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Manage Reviews
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Notifications Section */}
            <div className="mb-8">
                <div className="mb-3">
                    <h3 className="text-base font-semibold text-gray-900 flex items-center justify-between">
                        Notifications
                        <ChevronDown className="w-4 h-4" />
                    </h3>
                </div>
                <ul className="space-y-2 ml-4">
                    <li>
                        <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Message Center
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Email Notifications
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Auto Notify
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                            Price Alerts
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Sign Out Button */}
            <div className="mt-auto">
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}
