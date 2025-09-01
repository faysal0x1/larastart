import React from 'react';
import { Head } from '@inertiajs/react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function LanguageTest({ languages, currentLocale }) {
    return (
        <>
            <Head title="Language Test" />
            <div className="min-h-screen bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-6">Multilingual System Test</h1>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">Current Language</h2>
                                <p>Current Locale: <strong>{currentLocale}</strong></p>
                                <p>Available Languages: {languages?.map(l => l.code).join(', ')}</p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">Language Switcher</h2>
                                <LanguageSwitcher languages={languages} currentLocale={currentLocale} />
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">Translation Examples</h2>
                                <div className="space-y-2">
                                    <p><strong>Product Name:</strong> Sample Product</p>
                                    <p><strong>Brand Name:</strong> Sample Brand</p>
                                    <p><strong>Category Name:</strong> Sample Category</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">How to Use</h2>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2">For Products:</h3>
                                    <pre className="text-sm bg-gray-100 p-2 rounded">
                                        {`// Get translated name
$product->getTranslatedName('bn'); // Bengali name
$product->getTranslatedName('en'); // English name

// Get translated description
$product->getTranslatedDescription('bn');

// Set translated attribute
$product->setTranslatedAttribute('name', 'বাংলা নাম', 'bn');`}
                                    </pre>

                                    <h3 className="font-semibold mb-2 mt-4">For Brands:</h3>
                                    <pre className="text-sm bg-gray-100 p-2 rounded">
                                        {`// Get translated name
$brand->getTranslatedName('bn');

// Set translated attribute
$brand->setTranslatedAttribute('name', 'বাংলা ব্র্যান্ড', 'bn');`}
                                    </pre>

                                    <h3 className="font-semibold mb-2 mt-4">For Categories:</h3>
                                    <pre className="text-sm bg-gray-100 p-2 rounded">
                                        {`// Get translated name
$category->getTranslatedName('bn');

// Set translated attribute
$category->setTranslatedAttribute('name', 'বাংলা ক্যাটাগরি', 'bn');`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
