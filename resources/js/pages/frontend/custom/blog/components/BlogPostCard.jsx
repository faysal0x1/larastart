import React from 'react';
import { Calendar, User } from 'lucide-react';

const BlogPostCard = ({ post }) => {
  const cardStyles = {
    future: 'bg-orange-100',
    tech: 'bg-blue-100',
    work: 'bg-purple-100',
    remote: 'bg-rose-100',
    sports: 'bg-green-100',
    business: 'bg-yellow-100',
    travel: 'bg-indigo-100',
    management: 'bg-teal-100',
    startups: 'bg-cyan-100',
    ai: 'bg-red-100',
  };

  // Get background color based on first tag (for variety)
  const getCardBg = (tags) => {
    if (!tags || tags.length === 0) return '';
    const tag = tags[0].toLowerCase();
    return cardStyles[tag] || 'bg-gray-100';
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition mb-8">
      <div className={`relative ${getCardBg(post.tags)}`}>
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        
        {/* Tags */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {post.tags && post.tags.map((tag) => (
            <span 
              key={tag} 
              className="bg-white/80 backdrop-blur-sm text-xs px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        {/* Post metadata */}
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <div className="flex items-center mr-4">
            <Calendar size={14} className="mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <User size={14} className="mr-1" />
            <span>{post.author}</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        
        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
        
        {/* CTA Button */}
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center bg-blue-50 px-4 py-2 rounded-full transition">
          Discover More
        </button>
      </div>
    </div>
  );
};

export default BlogPostCard;