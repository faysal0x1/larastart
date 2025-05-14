// AuthorInfoCard.jsx
import { Calendar, User } from "lucide-react";

const AuthorInfoCard = ({ author, date }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
      <div className="w-14 h-14 rounded-full overflow-hidden">
        <img 
          src={author.avatar || "/api/placeholder/100/100"} 
          alt={author.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <User size={16} className="text-gray-500" />
          <p className="font-medium">{author.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-500" />
          <p className="text-sm text-gray-600">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfoCard;