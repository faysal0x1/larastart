import { Star, Clock } from 'lucide-react';


const JobCard = ({ job }) => (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg">{job.title}</h3>
        {job.rating && (
          <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
            <Star size={14} className="fill-current" />
            <span>{job.rating}</span>
            <span>({job.reviews})</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className="font-medium text-gray-900">{job.seller}</span>
      </div>
      <p className="text-gray-600 mb-4">{job.description}</p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-gray-900">{job.price}</span>
        {job.deliveryTime && (
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Clock size={14} />
            <span>{job.deliveryTime}</span>
          </div>
        )}
      </div>
    </div>
  );

  export default JobCard;