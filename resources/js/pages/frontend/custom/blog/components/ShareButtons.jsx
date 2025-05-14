// ShareButtons.jsx
import { 
    Twitter, 
    Facebook, 
    Linkedin, 
    Link as LinkIcon 
  } from "lucide-react";
  
  const ShareButtons = () => {
    const handleShare = (platform) => {
      // Implement sharing functionality here
      console.log(`Sharing to ${platform}`);
    };
  
    return (
      <div className="py-8">
        <h3 className="text-lg font-semibold mb-4">Share this article</h3>
        <div className="flex gap-3">
          <button
            onClick={() => handleShare('twitter')}
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Twitter size={20} />
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Facebook size={20} />
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Linkedin size={20} />
          </button>
          <button
            onClick={() => handleShare('link')}
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <LinkIcon size={20} />
          </button>
        </div>
      </div>
    );
  };
  export default ShareButtons;