import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { NotificationAlert } from './NotificationAlert'
import { TipCard } from './TipCard'



export function WelcomeCard({ showNotification, onDismissNotification, activeOrders, earnings }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Welcome, Alex Johnson</CardTitle>
        <CardDescription>
          Find important messages, tips, and links to helpful resources here:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showNotification && (
          <NotificationAlert onDismiss={onDismissNotification} />
        )}

        <div className="space-y-3">
          
          <TipCard
            title="Add your dev languages to get buyers"
            description="Search results will include dev languages soon, so make sure to add all of yours under your profile skills."
          />

          
          {/* end of create job  */}

        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Active orders - {activeOrders} (${earnings})</h3>
        <Button variant="outline">
          Active orders ({activeOrders}) <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
