import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

export function InboxCard() {
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle className="text-lg">Inbox</CardTitle>
        <Button variant="link" className="text-blue-600 p-0 h-auto">
          View All
        </Button>
      </CardHeader>
    </Card>
  )
}