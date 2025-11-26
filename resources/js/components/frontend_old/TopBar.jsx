// components/TopBar.jsx
import React, { useState } from 'react';
import { ChevronDown, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const TopBar = () => {
    const [currencyOpen, setCurrencyOpen] = useState(false);
    const [languageOpen, setLanguageOpen] = useState(false);

    const currencies = ['USD', 'EUR', 'GBP'];
    const languages = ['English', 'French', 'Spanish'];

    return (
        <div className="bg-black text-white text-xs py-2 px-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Left Section - Currency & Language Dropdowns */}
                <div className="flex items-center space-x-4 mb-2 md:mb-0">
                    {/* Currency Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center hover:text-gray-300"
                            onClick={() => setCurrencyOpen(!currencyOpen)}
                        >
                            USD <ChevronDown size={14} className="ml-1" />
                        </button>
                        {currencyOpen && (
                            <div className="absolute left-0 mt-2 w-24 bg-white text-black rounded shadow-lg z-10">
                                {currencies.map((currency) => (
                                    <a
                                        key={currency}
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrencyOpen(false);
                                        }}
                                    >
                                        {currency}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Language Dropdown */}
                    {/* <div className="relative">
            <button
              className="flex items-center hover:text-gray-300"
              onClick={() => setLanguageOpen(!languageOpen)}
            >
              English <ChevronDown size={14} className="ml-1" />
            </button>
            {languageOpen && (
              <div className="absolute left-0 mt-2 w-24 bg-white text-black rounded shadow-lg z-10">
                {languages.map((language) => (
                  <a
                    key={language}
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      setLanguageOpen(false);
                    }}
                  >
                    {language}
                  </a>
                ))}
              </div>
            )}
          </div> */}
                </div>

                {/* Middle Section - Promo Text */}
                <div className="mb-2 md:mb-0">
                    NEW CUSTOMERS SAVE 20% WITH THE CODE <span className="font-bold">GET20</span>
                </div>

                {/* Right Section - Social Icons */}
                <div className="flex items-center space-x-4">
                    <a href="#" className="hover:text-gray-300"><Facebook size={16} /></a>
                    <a href="#" className="hover:text-gray-300"><Twitter size={16} /></a>
                    <a href="#" className="hover:text-gray-300"><Instagram size={16} /></a>
                    <a href="#" className="hover:text-gray-300"><Youtube size={16} /></a>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
