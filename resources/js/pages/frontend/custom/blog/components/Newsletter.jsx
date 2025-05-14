import React from 'react';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Subscribe to our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Subscribe to get the latest updates on tech trends and digital innovation, delivered straight to your inbox.
        </p>
        
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-grow relative">
            <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="email" 
              placeholder="Enter Your Email" 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition">
            Subscribe
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-3">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
