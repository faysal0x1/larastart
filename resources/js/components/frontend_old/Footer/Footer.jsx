import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-12 pb-8 px-4">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between border-b border-gray-300 pb-8 mb-8">
          {/* Brand Info */}
          <div className="mb-8 md:mb-0">
            <h1 className="text-2xl font-bold mb-4">Riotex</h1>
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="font-semibold mr-2">Mail:</span> hi.anveo@gmail.com
              </p>
              <p className="flex items-center">
                <span className="font-semibold mr-2">Phone:</span> 1-333-345-6868
              </p>
              <p className="flex items-center">
                <span className="font-semibold mr-2">Address:</span> 549 Oak St. Crystal Lake, IL 60014
              </p>
            </div>
          </div>

          {/* Footer Links - Desktop */}
          <div className="hidden md:flex gap-12">
            {/* Information */}
            <div>
              <h3 className="font-bold text-lg mb-4">INFORMATION</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-black">Contact us</a></li>
                <li><a href="#" className="hover:text-black">Career</a></li>
                <li><a href="#" className="hover:text-black">My Account</a></li>
                <li><a href="#" className="hover:text-black">Order & Returns</a></li>
                <li><a href="#" className="hover:text-black">FAQs</a></li>
              </ul>
            </div>

            {/* Quick Shop */}
            <div>
              <h3 className="font-bold text-lg mb-4">QUICK SHOP</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-black">Women</a></li>
                <li><a href="#" className="hover:text-black">Men</a></li>
                <li><a href="#" className="hover:text-black">Clothes</a></li>
                <li><a href="#" className="hover:text-black">Accessories</a></li>
                <li><a href="#" className="hover:text-black">Blog</a></li>
              </ul>
            </div>

            {/* Customer Services */}
            <div>
              <h3 className="font-bold text-lg mb-4">CUSTOMER SERVICES</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-black">Orders FAQs</a></li>
                <li><a href="#" className="hover:text-black">Shipping</a></li>
                <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-black">Return & Retired</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:w-1/4">
            <h3 className="font-bold text-lg mb-4">NEWSLETTER</h3>
            <p className="mb-4">Sign up for our newsletter and get 10% off your first purchase</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your e-mail" 
                className="flex-grow px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              />
              <button className="bg-black text-white px-4 py-2 hover:bg-gray-800">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Accordion Links */}
        <div className="md:hidden mb-8">
          <details className="border-b border-gray-300 py-4">
            <summary className="font-bold text-lg cursor-pointer">INFORMATION</summary>
            <ul className="mt-4 space-y-2 pl-4">
              <li><a href="#" className="hover:text-black">Contact us</a></li>
              <li><a href="#" className="hover:text-black">Career</a></li>
              <li><a href="#" className="hover:text-black">My Account</a></li>
              <li><a href="#" className="hover:text-black">Order & Returns</a></li>
              <li><a href="#" className="hover:text-black">FAQs</a></li>
            </ul>
          </details>

          <details className="border-b border-gray-300 py-4">
            <summary className="font-bold text-lg cursor-pointer">QUICK SHOP</summary>
            <ul className="mt-4 space-y-2 pl-4">
              <li><a href="#" className="hover:text-black">Women</a></li>
              <li><a href="#" className="hover:text-black">Men</a></li>
              <li><a href="#" className="hover:text-black">Clothes</a></li>
              <li><a href="#" className="hover:text-black">Accessories</a></li>
              <li><a href="#" className="hover:text-black">Blog</a></li>
            </ul>
          </details>

          <details className="border-b border-gray-300 py-4">
            <summary className="font-bold text-lg cursor-pointer">CUSTOMER SERVICES</summary>
            <ul className="mt-4 space-y-2 pl-4">
              <li><a href="#" className="hover:text-black">Orders FAQs</a></li>
              <li><a href="#" className="hover:text-black">Shipping</a></li>
              <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black">Return & Retired</a></li>
            </ul>
          </details>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">©2023 Riotex, All Rights Reserved.</p>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <span className="mr-2">English</span>
              <span className="text-xs">▼</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">USD</span>
              <span className="text-xs">▼</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;