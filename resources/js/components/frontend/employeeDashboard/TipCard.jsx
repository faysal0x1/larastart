import { X, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function TipCard({ title, description }) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4 flex justify-between items-center">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}