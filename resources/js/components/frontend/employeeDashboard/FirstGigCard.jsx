import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function FirstGigCard() {
  return (
    <Card className="border-0 shadow-lg overflow-hidden relative" style={{
      backgroundImage: 'linear-gradient(to top, #30cfd0 0%, #330867 100%)'
    }}>
      {/* Content */}
      <div className="relative z-10">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-white">Ready to Launch Your First Gig?</CardTitle>
          <CardDescription className="text-purple-50 text-lg">
            Turn your skills into income with our platform
          </CardDescription>
        </CardHeader>
        
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="text-white space-y-2">
              <h3 className="text-xl font-semibold">Why start a gig?</h3>
              <p className="text-purple-50">
                Share your expertise with the world, set your own schedule, and build your business on your terms.
              </p>
            </div>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "No upfront costs",
                "Reach global clients",
                "Flexible working hours",
                "Build your portfolio",
                "Get paid securely",
                "24/7 support"
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="bg-purple-300 rounded-full p-1">
                    <ArrowRight className="h-4 w-4 text-purple-800" />
                  </div>
                  <span className="text-white">{item}</span>
                </li>
              ))}
            </ul>
            
            <Button className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg font-semibold shadow-md">
              Create Your First Gig <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="hidden lg:flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/30">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-5xl mb-4 text-white">✨</div>
                <p className="text-white text-center text-lg font-medium italic">
                  "The perfect place to start your freelance journey"
                </p>
                <div className="mt-4 flex space-x-1">
                  {['⭐', '⭐', '⭐', '⭐', '⭐'].map((star, i) => (
                    <span key={i} className="text-yellow-200 text-xl">{star}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}