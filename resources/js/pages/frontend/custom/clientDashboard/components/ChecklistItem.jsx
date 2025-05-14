import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ChecklistItem = ({ icon, title, description, percentage, actionText, completed }) => {
  return (
    <div className="border rounded-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-full">
            {icon}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        {actionText && !completed && (
          <Button variant="ghost" className="text-gray-600">
            {actionText}
          </Button>
        )}
        {completed && (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Complete
          </Badge>
        )}
      </div>
      {percentage !== undefined && (
        <Progress value={percentage} className="h-1" />
      )}
    </div>
  );
};

export default ChecklistItem;