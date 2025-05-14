import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@inertiajs/react';


export function UserProfileCard({ dp, name, username }) {
  return (
    
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={dp} />
              <AvatarFallback>{name.charAt(0)}{name.split(' ')[1]?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-gray-500 text-sm">@{username}</p>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href={route('e-profile')}>
                View profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    
  )
}