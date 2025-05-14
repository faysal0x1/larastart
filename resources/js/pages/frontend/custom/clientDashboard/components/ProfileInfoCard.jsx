import { MapPin, Calendar, Languages, Clock, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfileInfoCard = ({ user }) => {
  return (
    <Card className="p-6 w-full">
      <div className="flex flex-col items-center mb-4">
        <Avatar className="w-24 h-24 mb-3">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500">@{user.username}</p>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-500" />
          <span>Located in {user.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-500" />
          <span>Joined in {user.joinedDate}</span>
        </div>

        <div className="flex items-start gap-2">
          <Languages size={16} className="text-gray-500 mt-1" />
          <div className="flex flex-col">
            {user.languages.map((lang, index) => (
              <span key={index}>{lang}</span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-500" />
          <span>Preferred working hours</span>
        </div>
      </div>

      <Button variant="outline" className="w-full mt-6 flex items-center justify-center gap-2">
        <Eye size={16} />
        Preview public profile
      </Button>

      <Button variant="outline" className="w-full mt-3 flex items-center justify-center gap-2">
        <ExternalLink size={16} />
        Explore Fiverr
      </Button>

      <div className="mt-6 text-xs text-gray-500">
        <p>You're currently on your buyer profile. To access your freelancer profile, switch to <span className="text-gray-700 font-medium">seller mode</span></p>
      </div>
    </Card>
  );
};

export default ProfileInfoCard;