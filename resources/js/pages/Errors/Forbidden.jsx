// 404
import { Link } from "@inertiajs/react";


export default function Forbidden() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center p-4">
            <div className="max-w-lg w-full text-center">
                {/* Custom 403 SVG Illustration */}
                <div className="mb-8">
                    <svg className="w-80 h-64 mx-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Background Security Elements */}
                        <circle cx="80" cy="60" r="2" fill="#fbbf24" className="animate-ping" />
                        <circle cx="320" cy="80" r="3" fill="#f59e0b" className="animate-pulse" />

                        {/* Security Guard Character */}
                        <g className="animate-pulse">
                            {/* Body */}
                            <rect x="180" y="140" width="40" height="60" rx="5" fill="#1f2937" />

                            {/* Head */}
                            <circle cx="200" cy="120" r="18" fill="#fbbf24" />

                            {/* Security Hat */}
                            <ellipse cx="200" cy="110" rx="20" ry="8" fill="#1f2937" />
                            <rect x="195" y="105" width="10" height="3" fill="#fbbf24" />

                            {/* Eyes */}
                            <circle cx="195" cy="118" r="1.5" fill="#1f2937" />
                            <circle cx="205" cy="118" r="1.5" fill="#1f2937" />

                            {/* Serious mouth */}
                            <line x1="195" y1="125" x2="205" y2="125" stroke="#1f2937" strokeWidth="1" />

                            {/* Arms (crossed) */}
                            <line x1="170" y1="155" x2="190" y2="165" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
                            <line x1="230" y1="155" x2="210" y2="165" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />

                            {/* Badge */}
                            <circle cx="190" cy="155" r="4" fill="#fbbf24" />
                            <text x="190" y="158" fontSize="6" fill="#1f2937" textAnchor="middle">
                                ★
                            </text>

                            {/* Legs */}
                            <rect x="185" y="200" width="8" height="25" fill="#1f2937" />
                            <rect x="207" y="200" width="8" height="25" fill="#1f2937" />
                        </g>

                        {/* Large Lock */}
                        <g className="animate-bounce">
                            <rect x="120" y="180" width="50" height="40" rx="5" fill="#dc2626" />
                            <rect x="135" y="160" width="20" height="25" rx="10" fill="none" stroke="#dc2626" strokeWidth="4" />
                            <circle cx="145" cy="200" r="3" fill="#fbbf24" />
                        </g>

                        {/* Barrier/Fence */}
                        <g className="animate-pulse">
                            <line x1="50" y1="240" x2="350" y2="240" stroke="#ef4444" strokeWidth="4" />
                            <line x1="70" y1="230" x2="70" y2="250" stroke="#ef4444" strokeWidth="3" />
                            <line x1="120" y1="230" x2="120" y2="250" stroke="#ef4444" strokeWidth="3" />
                            <line x1="170" y1="230" x2="170" y2="250" stroke="#ef4444" strokeWidth="3" />
                            <line x1="220" y1="230" x2="220" y2="250" stroke="#ef4444" strokeWidth="3" />
                            <line x1="270" y1="230" x2="270" y2="250" stroke="#ef4444" strokeWidth="3" />
                            <line x1="320" y1="230" x2="320" y2="250" stroke="#ef4444" strokeWidth="3" />
                        </g>

                        {/* Warning Signs */}
                        <g className="animate-bounce delay-100">
                            <polygon points="300,120 315,145 285,145" fill="#fbbf24" stroke="#dc2626" strokeWidth="2" />
                            <text x="300" y="140" fontSize="16" fill="#dc2626" textAnchor="middle" fontWeight="bold">
                                !
                            </text>
                        </g>

                        {/* Access Denied Text Effect */}
                        <g className="animate-pulse">
                            <text x="200" y="50" fontSize="14" fill="#dc2626" textAnchor="middle" fontWeight="bold">
                                ACCESS
                            </text>
                            <text x="200" y="70" fontSize="14" fill="#dc2626" textAnchor="middle" fontWeight="bold">
                                DENIED
                            </text>
                        </g>

                        {/* 403 Numbers */}
                        <text x="60" y="120" fontSize="36" fill="#dc2626" fontWeight="bold" className="animate-pulse">
                            4
                        </text>
                        <text x="250" y="180" fontSize="36" fill="#dc2626" fontWeight="bold" className="animate-pulse delay-75">
                            0
                        </text>
                        <text x="320" y="200" fontSize="36" fill="#dc2626" fontWeight="bold" className="animate-pulse delay-150">
                            3
                        </text>
                    </svg>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-lg shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Access Forbidden</h2>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                        You don't have permission to access this resource. It's like trying to enter a VIP area without the right
                        credentials. Please check your access rights or contact an administrator.
                    </p>

                    {/* Animated Shield Icons */}
                    <div className="flex justify-center space-x-4 mb-6">
                        <div className="animate-pulse delay-75">
                            <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="animate-pulse delay-150">
                            <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-.257-.257A6 6 0 0118 8zM2 8a6 6 0 1010.257 5.743L12 14l-.257-.257A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="animate-pulse delay-300">
                            <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Back to Home Button */}
                    <Link
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
