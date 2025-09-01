import React from 'react';
import { Link } from '@inertiajs/react';

export function LanguageSwitcher({ languages, currentLocale }) {
    if (!languages || languages.length === 0) {
        return <div>No languages available</div>;
    }

    return (
        <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
                <Link
                    key={language.code}
                    href={route('language.switch', language.code)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentLocale === language.code
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    <span className="mr-2">{language.flag}</span>
                    {language.native_name}
                </Link>
            ))}
        </div>
    );
}
