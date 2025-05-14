import { Star, Clock } from 'lucide-react';

const JobCard = ({ job }) => (
  <div className="border bg-light border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
    {/* Thumbnail Image */}
    <div className="h-40 bg-gray-100 overflow-hidden">
      {job.thumbnails ? (
        <img
          src={job.thumbnails}
          alt={job.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
          <span className="text-gray-400">No preview available</span>
        </div>
      )}
    </div>

    {/* Card Content */}
    <div className="p-5">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg line-clamp-2">{job.title}</h3>
        {job.rating && (
          <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex-shrink-0">
            <Star size={14} className="fill-current" />
            <span>{job.rating}</span>
            <span>({job.reviews})</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="font-medium text-gray-900">{job.seller}</span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex justify-between items-center">
        <div>
          {job.originalPrice && (
            <span className="line-through text-gray-400 text-sm mr-2">
              {job.originalPrice}
            </span>
          )}
          <span className="font-bold text-gray-900">{job.price}</span>
        </div>
        {job.deliveryTime && (
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Clock size={14} />
            <span>{job.deliveryTime}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default JobCard;