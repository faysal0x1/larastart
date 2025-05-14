import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const ReviewsCard = ({ username, hasReviews, reviews = [] }) => {
  return (
    <Card className="p-6 w-full">
      <h3 className="font-medium mb-4">Reviews from freelancers</h3>

      {!hasReviews ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="flex mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={20} className="text-orange-400 fill-orange-400" />
            ))}
          </div>
          <p className="text-gray-500 text-sm">{username} doesn't have any reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="border-b pb-4 last:border-0">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{review.name}</p>
                  <div className="flex">
                    {Array(5).fill().map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${i < review.rating ? "text-orange-400 fill-orange-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm">{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ReviewsCard;