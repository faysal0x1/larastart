import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function LevelOverviewCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Level overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">My level</span>
          <Badge variant="secondary">New seller</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Success score</span>
          <span>-</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Rating</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-gray-400 mr-1" /> <span>-</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Response rate</span>
          <span>-</span>
        </div>
        <Progress value={20} className="h-2" />
        <Button variant="outline" className="w-full">
          View progress
        </Button>
      </CardContent>
    </Card>
  )
}