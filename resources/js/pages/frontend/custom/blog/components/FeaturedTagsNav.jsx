import React from 'react';
import { Laptop, Plane, Briefcase, BarChart2, Activity, Hash, Zap } from 'lucide-react';

const FeaturedTagsNav = () => {
  const categories = [
    { name: 'Technology', icon: <Laptop size={20} className="text-blue-500" />, active: true },
    { name: 'Travel', icon: <Plane size={20} className="text-red-500" /> },
    { name: 'Business', icon: <Briefcase size={20} className="text-purple-500" /> },
    { name: 'Management', icon: <BarChart2 size={20} className="text-orange-500" /> },
    { name: 'Trends', icon: <Activity size={20} className="text-green-500" /> },
    { name: 'Startups', icon: <Zap size={20} className="text-yellow-500" /> },
    { name: 'News', icon: <Hash size={20} className="text-gray-500" /> },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <div
          key={category.name}
          className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition ${
            category.active
              ? 'bg-blue-500 text-white shadow-md'
              : 'border border-gray-200 hover:bg-gray-100'
          }`}
        >
          {category.icon}
          <span className="text-sm font-medium">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default FeaturedTagsNav;