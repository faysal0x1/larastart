import React from 'react';
import { Twitter, Facebook, Linkedin, Mail } from 'lucide-react';

const AuthorProfile = ({ author }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">About</h3>
      
      <div className="flex items-center mb-4">
        <img 
          src={author.avatar} 
          alt={author.name} 
          className="w-16 h-16 rounded-full mr-4 border-2 border-white shadow"
        />
        <div>
          <h4 className="font-bold text-lg">{author.name}</h4>
          <p className="text-sm text-gray-600">{author.title}</p>
        </div>
      </div>
      
      <p className="text-gray-700 mb-6">
        {author.bio}
      </p>
      
      <div className="flex space-x-2">
        <a 
          href={author.social.twitter}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-blue-400 hover:text-white transition"
        >
          <Twitter size={16} />
        </a>
        <a 
          href={author.social.facebook}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
        >
          <Facebook size={16} />
        </a>
        <a 
          href={author.social.linkedin}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-blue-700 hover:text-white transition"
        >
          <Linkedin size={16} />
        </a>
        <a 
          href={author.social.email}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
        >
          <Mail size={16} />
        </a>
      </div>
    </div>
  );
};

export default AuthorProfile;