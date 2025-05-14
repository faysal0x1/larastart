import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

export function EarningsOpportunitiesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ways to earn more</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <OpportunityCard
            title="Referral Program"
            description="Invite friends and earn up to $100 when they complete their first gig"
            actionText="Learn more"
          />
          <OpportunityCard
            title="Micro-tasks"
            description="Complete quick tasks to earn points that can be converted to cash"
            actionText="Browse tasks"
          />
          <OpportunityCard
            title="Skill Certification"
            description="Get certified in your skills to appear higher in search results"
            actionText="Get certified"
          />
        </div>
      </CardContent>
    </Card>
  )
}

function OpportunityCard({ title, description, actionText }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="text-blue-600 p-0 h-auto">
          {actionText} <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}