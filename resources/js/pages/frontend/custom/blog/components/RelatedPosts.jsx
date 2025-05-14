// components/RelatedPosts.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

 const RelatedPosts = ({ posts }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Read Next</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <span className="text-sm text-gray-500">{post.category}</span>
            <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <a href={post.url} className="text-indigo-600 hover:text-indigo-800 flex items-center">
              Read more <ArrowRight className="ml-1" size={16} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RelatedPosts;