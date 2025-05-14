import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export function AvailabilityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Availability</CardTitle>
        <CardDescription>
          While unavailable, your Gigs are hidden and you will not receive new orders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full">
          Set your availability
        </Button>
      </CardContent>
    </Card>
  )
}