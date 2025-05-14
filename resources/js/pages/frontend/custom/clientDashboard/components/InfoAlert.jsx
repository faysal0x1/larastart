import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const InfoAlert = ({ message, link, onDismiss }) => {
  return (
    <Alert className="bg-blue-50 border-blue-100 mb-4">
      <AlertDescription className="flex justify-between items-center">
        <div>
          <span className="font-semibold">{message}</span>
          {link && <span> For your freelancer profile <a href={link.url} className="text-blue-600 hover:underline">{link.text}</a>.</span>}
        </div>
        <Button variant="ghost" size="sm" onClick={onDismiss} className="text-gray-500">
          Dismiss
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default InfoAlert;