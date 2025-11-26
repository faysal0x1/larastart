// components/MainNav.jsx
import React, { useState } from 'react';
import { Search, X, Menu, User, Heart, ShoppingCart } from 'lucide-react';

const MainNav = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = ['DEMO', 'FEATURES', 'SHOP', 'PRODUCT', 'BLOG', 'PAGES'];

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        {/* Desktop Navbar */}
        <div className="hidden md:flex justify-between items-center">
          {/* Left Section - Brand Name */}
          <div className="text-4xl font-bold">Riotex</div>

          {/* Middle Section - Navigation Links */}
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <a key={item} href="#" className="text-gray-700 hover:text-black font-medium">
                {item}
              </a>
            ))}
          </div>

          {/* Right Section - Icons (Search, Profile, Wishlist, Cart) */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="flex items-center">
              {showSearch ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-b border-gray-300 outline-none px-2 py-1 transition-all duration-300 w-40 focus:w-60"
                    autoFocus
                  />
                  <button onClick={toggleSearch} className="ml-2 text-gray-500 hover:text-black">
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <button onClick={toggleSearch} className="text-gray-500 hover:text-black">
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Profile */}
            <a href="#" className="text-gray-500 hover:text-black">
              <User size={20} />
            </a>

            {/* Wishlist */}
            <a href="#" className="text-gray-500 hover:text-black relative">
              <Heart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </a>

            {/* Cart */}
            <a href="#" className="text-gray-500 hover:text-black relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                5
              </span>
            </a>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="text-gray-500 hover:text-black">
            <Menu size={24} />
          </button>

          {/* Brand Name */}
          <div className="text-2xl font-bold">Riotex</div>

          {/* Mobile Icons (Cart only visible by default) */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-black relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                5
              </span>
            </a>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden mt-4 flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-b border-gray-300 outline-none px-2 py-1 w-full"
              autoFocus
            />
            <button onClick={toggleSearch} className="ml-2 text-gray-500 hover:text-black">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4">
            {/* Mobile Menu Items */}
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="block py-2 text-gray-700 hover:text-black border-b border-gray-100"
              >
                {item}
              </a>
            ))}

            {/* Mobile Account Links */}
            <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
              <a href="#" className="flex items-center text-gray-700 hover:text-black">
                <User size={18} className="mr-2" /> Account
              </a>
              <a href="#" className="flex items-center text-gray-700 hover:text-black">
                <Heart size={18} className="mr-2" /> Wishlist (3)
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainNav;