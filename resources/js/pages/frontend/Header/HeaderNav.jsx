import React, { useEffect, useRef, useState } from "react";

const defaultLinks = [
    { label: "Shell Shocker" },
    { label: "PC Builder" },
    { label: "Trending Deals" },
    { label: "Clearance" },
    { label: "Best Sellers" },
    { label: "Intel Gamer Days" },
    { label: "Free Gift w/ AMD" },
    { label: "Newegg Card" },
    { label: "Gamer Community 🔥" }
];

const menuColumns = [
    {
        title: "Deals & Promotions",
        items: [
            "Today's Best Deals",
            "Email Deals",
            "Clearance Deals",
            "Refreshed - Like New",
            "Newegg Store Credit Card"
        ]
    },
    {
        title: "Featured",
        items: ["Level Up Your Rig", "Back to School", "Seller Summit"]
    },
    {
        title: "Shopping Tools",
        items: [
            "Custom PC Builder",
            "PC Upgrader",
            "Gaming PC Finder",
            "Network Builder"
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
        <div className="w-full bg-white shadow-sm">
            <div className="mx-auto max-w-[1680px] px-3 sm:px-4">
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
                            <div className="absolute left-0 top-9 z-50 w-[680px] max-w-[90vw] rounded-md border border-gray-200 bg-white p-4 shadow-xl">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    {menuColumns.map((col) => (
                                        <div key={col.title}>
                                            <div className="mb-2 text-xs font-semibold uppercase text-gray-500">{col.title}</div>
                                            <ul className="space-y-1">
                                                {col.items.map((it) => (
                                                    <li key={it}>
                                                        <a href="#" className="block rounded px-2 py-1 text-gray-700 hover:bg-gray-50 hover:text-blue-700">
                                                            {it}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="hidden h-5 w-px bg-gray-200 sm:block" />

                    {/* Quick links */}
                    <nav className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-1">
                        {links.map((item) => (
                            <a key={item.label} href={item.href ?? "#"} className="text-gray-700 hover:text-blue-700">
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default HeaderNav;


