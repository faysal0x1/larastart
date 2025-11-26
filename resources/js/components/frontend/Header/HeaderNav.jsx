import React, { useEffect, useRef, useState } from "react";
import { Link } from '@inertiajs/react';

const defaultLinks = [
    { label: "Shell Shocker", href: route('deal.page') },
    { label: "PC Builder", href: route('pc.builder') },
    { label: "Trending Deals", href: route('trending.deals') },
    { label: "Clearance", href: route('clearance.page') },
   
    { label: "Intel Gamer Days", href: route('intel.gamer.days') },
    { label: "Free Gift w/ AMD", href: route('free.gift.amd') },
    
    { label: "Gamer Community 🔥", href: route('gamer.community') }
];

const menuColumnsOne = [
    {
        title: "Deals & Promotions",
        items: [
            { label: "Today's Best Deals", href: route('deal.page') },
            { label: "Email Deals", href: route('deal.page') },
            { label: "Clearance Deals", href: route('clearance.deals') },
            { label: "Refreshed - Like New", href: route('refreshed.like.new') },
            { label: "Store Credit Card", href: route('store.credit.card') }
        ]
    },

    {
        title: "Deals & Promotions",
        items: [
            { label: "Today's Best Deals", href: route('deal.page') },
            { label: "Email Deals", href: route('deal.page') },
            { label: "Clearance Deals", href: route('clearance.deals') },
            { label: "Refreshed - Like New", href: route('refreshed.like.new') },
            { label: "Store Credit Card", href: route('store.credit.card') }
        ]
    },
    {
        title: "Deals & Promotions",
        items: [
            { label: "Today's Best Deals", href: route('deal.page') },
            { label: "Email Deals", href: route('deal.page') },
            { label: "Clearance Deals", href: route('clearance.deals') },
            { label: "Refreshed - Like New", href: route('refreshed.like.new') },
            { label: "Store Credit Card", href: route('store.credit.card') }
        ]
    },

    {
        title: "Deals & Promotions",
        items: [
            { label: "Today's Best Deals", href: route('deal.page') },
            { label: "Email Deals", href: route('deal.page') },
            { label: "Clearance Deals", href: route('clearance.deals') },
            { label: "Refreshed - Like New", href: route('refreshed.like.new') },
            { label: "Store Credit Card", href: route('store.credit.card') }
        ]
    },

];

const menuColumnsTwo = [

    {
        title: "Shopping Tools",
        items: [
            { label: "Custom PC Builder", href: route('pc.builder') },
            { label: "PC Upgrader", href: route('pc.upgrader') },
            { label: "Gaming PC Finder", href: route('gaming.pc.finder') },
            { label: "Network Builder", href: route('network.builder') }
        ]
    },

    {
        title: "Shopping Tools",
        items: [
            { label: "Custom PC Builder", href: route('pc.builder') },
            { label: "PC Upgrader", href: route('pc.upgrader') },
            { label: "Gaming PC Finder", href: route('gaming.pc.finder') },
            { label: "Network Builder", href: route('network.builder') }
        ]
    }
];

const HeaderNav = ({ links = defaultLinks }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const onClick = (e) => {
            if (open && menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [open]);

    return (
        <div className="hidden sm:block w-full bg-[#EEF5FF] shadow-sm">
            <div className="mx-auto max-w-full px-3 sm:px-4">
                <div className="flex items-center gap-3 py-2 text-sm">
                    {/* Hamburger + Dropdown */}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-gray-700 hover:bg-gray-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <span className="hidden sm:inline">Menu</span>
                        </button>




                        {open && (
                            <>
                                {/* Backdrop */}
                                <div className="fixed inset-0 backdrop-brightness-50 z-[60]" onClick={() => setOpen(false)} />

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 left-0 top-9 z-[70] w-lg mx-auto rounded-lg border border-gray-200 shadow-2xl bg-white overflow-hidden max-h-screen overflow-y-auto">

                                    <div className="grid grid-cols-1 md:grid-cols-2 ">
                                        {/* Left Column */}
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 space-y-6 ">
                                            {menuColumnsOne.map((col, index) => (
                                                <div key={`${col.title}-${index}`} className="group">
                                                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-blue-800 border-b border-blue-200 pb-1">
                                                        {col.title}
                                                    </h3>
                                                    <ul className="space-y-2">
                                                        {col.items.map((item, itemIndex) => (
                                                            <li key={`${item.label}-${itemIndex}`}>
                                                                <Link
                                                                    href={item.href}
                                                                    className="block px-3 py-2 text-gray-700 rounded-md hover:bg-white hover:text-blue-700 hover:shadow-sm transition-all duration-200 text-sm"
                                                                >
                                                                    {item.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Right Column */}
                                        <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-6 space-y-6">
                                            {menuColumnsTwo.map((col, index) => (
                                                <div key={`${col.title}-${index}`} className="group">
                                                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-800 border-b border-slate-200 pb-1">
                                                        {col.title}
                                                    </h3>
                                                    <ul className="space-y-2">
                                                        {col.items.map((item, itemIndex) => (
                                                            <li key={`${item.label}-${itemIndex}`}>
                                                                <Link
                                                                    href={item.href}
                                                                    className="block px-3 py-2 text-gray-700 rounded-md hover:bg-white hover:text-slate-700 hover:shadow-sm transition-all duration-200 text-sm"
                                                                >
                                                                    {item.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Close button */}
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="sticky bottom-0 left-full m-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors bg-white shadow-md"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="hidden h-5 w-px bg-gray-200 sm:block" />

                    {/* Quick links */}
                    <nav className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-1">
                        {links.map((item) => (
                            <Link key={item.label} href={item.href} className="text-gray-700 hover:text-blue-700">
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default HeaderNav;
