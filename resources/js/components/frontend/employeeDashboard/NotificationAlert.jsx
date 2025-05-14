import { X, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

export function NotificationAlert({ onDismiss }) {
  return (
    <Alert className="bg-amber-50 border-amber-200 relative">
      <CheckCircle className="h-5 w-5 text-amber-500" />
      <AlertTitle>Verify your information</AlertTitle>
      <AlertDescription>
        Stay compliant to continue working with international clients
      </AlertDescription>
      <div className="absolute right-4 top-4 flex gap-2">
        <Button
          variant="default"
          size="sm"
          className="bg-black hover:bg-gray-800"
        >
          Verify
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-gray-500 h-8 w-8"
          onClick={onDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  )
}