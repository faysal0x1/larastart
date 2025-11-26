import React from 'react';
import { Link } from "@inertiajs/react";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4 overflow-hidden">
            {/* Background animated shapes */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Floating triangles */}
                <svg className="absolute top-20 left-10 w-8 h-8 text-red-400 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 20h20L12 2z" />
                </svg>

                <svg className="absolute top-40 right-20 w-6 h-6 text-rose-500 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 20h20L12 2z" />
                </svg>

                <svg className="absolute bottom-32 left-20 w-10 h-10 text-red-500 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 20h20L12 2z" />
                </svg>

                {/* Floating circles */}
                <div className="absolute top-32 right-32 w-12 h-12 bg-red-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-40 right-10 w-8 h-8 bg-rose-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-60 left-32 w-6 h-6 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>

                {/* Floating stars */}
                <svg className="absolute top-16 right-40 w-6 h-6 text-red-400 animate-spin" style={{ animationDuration: '4s' }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.09 6.26L20 10l-5.91 2.09L12 18l-2.09-5.91L4 10l5.91-2.74L12 2z" />
                </svg>

                <svg className="absolute bottom-20 left-40 w-8 h-8 text-rose-500 animate-spin" style={{ animationDuration: '6s' }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.09 6.26L20 10l-5.91 2.09L12 18l-2.09-5.91L4 10l5.91-2.74L12 2z" />
                </svg>

                {/* Floating geometric shapes */}
                <div className="absolute top-24 left-1/3 w-4 h-4 bg-red-400 rotate-45 animate-bounce" style={{ animationDelay: '3s', animationDuration: '4s' }}></div>
                <div className="absolute bottom-60 right-1/3 w-6 h-6 bg-rose-400 rotate-45 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
            </div>

            <div className="text-center relative z-10">
                {/* Main 404 with speech bubble */}
                <div className="relative mb-8">
                    {/* Large 404 Text */}
                    <div className="text-red-200 font-black text-[10rem] md:text-[16rem] lg:text-[20rem] leading-none select-none">
                        <span className="inline-block animate-pulse" style={{ animationDelay: '0s' }}>4</span>
                        <span className="inline-block relative mx-4">
                            <span className="animate-pulse" style={{ animationDelay: '0.5s' }}>0</span>
                            {/* Speech bubble */}
                            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ animationDelay: '2s' }}>
                                <div className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-lg whitespace-nowrap relative shadow-lg">
                                    Oops!
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
                                </div>
                            </div>
                        </span>
                        <span className="inline-block animate-pulse" style={{ animationDelay: '1s' }}>4</span>
                    </div>
                </div>

                {/* Page not found text */}
                <div className="mb-8 animate-fade-in" style={{ animationDelay: '1.5s' }}>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6">
                        Page <span className="text-red-500">not Found!</span>
                    </h1>
                    <p className="text-gray-700 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
                        Looks like this page decided to take a vacation! Don't worry, even the
                        best websites have pages that wander off sometimes. Let's get you
                        back on track.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style={{ animationDelay: '2s' }}>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-10 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                        ← Go Back
                    </button>
                    <Link
                        href="/"
                        className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-10 py-4 text-lg rounded-lg border-2 border-red-300 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                        🏠 Back to Home
                    </Link>
                </div>

                {/* Floating emoji */}
                <div className="absolute -top-12 -right-12 text-6xl animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '2s' }}>
                    ❤️
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
        </div>
    );
}
