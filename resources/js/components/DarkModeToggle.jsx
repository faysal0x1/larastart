// resources/js/components/DarkModeToggle.jsx

import React, { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedMode = localStorage.getItem('darkMode');
            if (savedMode !== null) return savedMode === 'true';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    return (
        <button onClick={() => setDarkMode((prev) => !prev)} className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
        </button>
    );
}
