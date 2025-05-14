import { useState } from 'react';
import { FiMenu, FiX, FiSearch, FiUser, FiMessageSquare, FiBell } from 'react-icons/fi';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '#' },
    { name: 'Messages', href: '#' },
    { name: 'Orders', href: '#' },
    { name: 'Earnings', href: '#' },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left side - Logo */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-3xl font-bold text-primary">MicroJobs</h1>
            </div>

            {/* Center - Navigation */}
            <nav className="flex-1 flex justify-center">
              <div className="flex space-x-8">
                {navLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-green-500"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>

            {/* Right side - Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-1 text-gray-500 hover:text-green-500">
                <FiSearch className="h-5 w-5" />
              </button>
              <button className="p-1 text-gray-500 hover:text-green-500">
                <FiMessageSquare className="h-5 w-5" />
              </button>
              <button className="p-1 text-gray-500 hover:text-green-500">
                <FiBell className="h-5 w-5" />
              </button>
              <button className="p-1 text-gray-500 hover:text-green-500">
                <FiUser className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <div className="px-4 py-3 flex justify-between items-center">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-500 hover:text-green-500"
          >
            {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <h1 className="text-xl font-bold text-green-500">fiverr</h1>

          {/* Search icon */}
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-gray-500 hover:text-green-500"
          >
            <FiSearch className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile search bar (appears when search icon clicked) */}
        {searchOpen && (
          <div className="px-4 pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Mobile menu (appears when menu icon clicked) */}
        {mobileMenuOpen && (
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-500 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-500 hover:bg-gray-50"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-500 hover:bg-gray-50"
              >
                Settings
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}