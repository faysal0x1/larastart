import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function EarningsCard({ amount }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Earnings this month</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">${amount}</p>
      </CardContent>
    </Card>
  )
}