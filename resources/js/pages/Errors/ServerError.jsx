import { Link } from "@inertiajs/react";

export default function ServerError() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-lg w-full text-center">
                {/* Glitchy 500 Animation */}
                <div className="mb-8 relative">
                    <h1 className="text-9xl font-bold text-purple-600 animate-pulse">
                        5<span className="inline-block animate-bounce">0</span>0
                    </h1>

                    {/* Glitch Effect Lines */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/4 left-0 w-full h-1 bg-red-400 animate-ping opacity-30"></div>
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-400 animate-ping opacity-30 delay-75"></div>
                        <div className="absolute top-3/4 left-0 w-full h-1 bg-green-400 animate-ping opacity-30 delay-150"></div>
                    </div>
                </div>

                {/* Spinning Gear Icons */}
                <div className="flex justify-center space-x-4 mb-8">
                    <div className="animate-spin">
                        <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="animate-spin delay-75" style={{ animationDirection: "reverse" }}>
                        <svg className="w-10 h-10 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="animate-spin delay-150">
                        <svg className="w-6 h-6 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-lg shadow-xl p-8 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 animate-pulse"></div>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Internal Server Error</h2>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Something went wrong on our end. Our servers are having a moment - like a computer having an existential
                            crisis. We're working to fix it!
                        </p>

                        {/* Animated Error Icons */}
                        <div className="flex justify-center space-x-2 mb-6">
                            <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce delay-150"></div>
                        </div>

                        {/* Back to Home Button */}
                        <Link
                            href="/"
                            className="inline-flex items-center px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Take Me Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
