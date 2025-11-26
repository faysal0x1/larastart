import React from "react";

const HeaderTop = () => {
    return (
        <div className="w-full bg-[#00274d] text-white">
            <div className="mx-auto max-w-[1680px] px-3 sm:px-4">
                <div className="flex items-center gap-3 py-2">
                    {/* Logo */}
                    <a href="#" className="shrink-0">
                        <img
                            src="https://tbz.com.bd/images/website/174523155388191193.png"
                            alt="Logo"
                            className="h-12 w-auto"
                        />
                    </a>

                    {/* Search */}
                    <div className="flex-1">
                        <div className="flex items-center rounded-full bg-white/95 pl-4 pr-1 py-1 ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-blue-400">
                            <input
                                type="search"
                                placeholder="Search Newegg..."
                                className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
                            />
                            <button
                                aria-label="Search"
                                className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0a59ff] hover:bg-[#0a49cf]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-white">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </svg>
                            </button>
                        </div>
                        {/* Trending tags (static examples to match reference) */}
                        {/* <div className="mt-1 hidden gap-1 sm:flex">
                            {["amd ryzen", "ryzen 7 9800x3d", "dvd drive", "other accessories"].map((label) => (
                                <a key={label} href="#" className="rounded-md bg-white/20 px-2 py-0.5 text-xs text-white hover:bg-white/30">
                                    {label}
                                </a>
                            ))}
                        </div> */}
                    </div>

                    {/* Right actions */}
                    <div className="ml-1 flex items-center gap-1 sm:gap-2">
                        <button className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 hover:bg-white/10" aria-label="Notifications">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                        <a href="" className="hidden items-center gap-1 rounded-full px-3 py-1 text-xs hover:bg-white/10 sm:flex">
                            <span className="text-gray-200">Welcome</span>
                            <span className="font-medium">Sign In / Register</span>
                        </a>
                        <a href="#" className="hidden items-center gap-1 rounded-full px-3 py-1 text-xs hover:bg-white/10 sm:flex">
                            <span className="text-gray-200">Returns</span>
                            <span className="font-medium">&amp; Orders</span>
                        </a>
                        <a href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 hover:bg-white/10" aria-label="Cart">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                                <circle cx="9" cy="20" r="1" />
                                <circle cx="16" cy="20" r="1" />
                                <path d="M20 7H7l-1 9h13l1-9Z" />
                                <path d="M7 7l-2-3H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;


