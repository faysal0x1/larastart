// components/BlogHeader.jsx
import React from 'react';

 const BlogHeader = ({ title, date, author }) => {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-xs mb-4">
        <span className="bg-white text-gray-800 px-2 py-0.5 rounded-full">NEW</span>
        <span>{date}</span>
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      <p className="text-gray-600">By {author}</p>
    </div>
  );
};
export default BlogHeader;