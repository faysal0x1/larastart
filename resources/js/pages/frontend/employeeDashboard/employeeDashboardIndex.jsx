import { useState } from 'react'

import EmployeeDashboardLayout from '@/Layouts/employeeDashboardLayout/EmployeeDashboardLayout';
// import EmployeeDashboardLayout from '@../../../layouts/employeeDashboard-Layout/EmployeeDashboardLayout';
import { Head } from '@inertiajs/react'

import { UserProfileCard } from '@/components/frontend/employeeDashboard/UserProfileCard'
import { LevelOverviewCard } from '@/components/frontend/employeeDashboard/LevelOverviewCard'
import { AvailabilityCard } from '@/components/frontend/employeeDashboard/AvailabilityCard'
import { EarningsCard } from '@/components/frontend/employeeDashboard/EarningsCard'
import { InboxCard } from '@/components/frontend/employeeDashboard/InboxCard'
import { WelcomeCard } from '@/components/frontend/employeeDashboard/WelcomeCard'
import { FirstGigCard } from '@/components/frontend/employeeDashboard/FirstGigCard'
import { EarningsOpportunitiesCard } from '@/components/frontend/employeeDashboard/EarningsOpportunitiesCard'

const dp = "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


const pp = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrZqTCInyg6RfYC7Ape20o-EWP1EN_A8fOA&s"

export default function employeeDashboard() {
  const [showNotification, setShowNotification] = useState(true)

  const dismissNotification = () => {
    setShowNotification(false)
  }

  return (
   
    <EmployeeDashboardLayout dp={dp}>
      <Head title="Dashboard" />
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <UserProfileCard dp={dp} name="Alex Johnson" username="alexj123" />
            <LevelOverviewCard />
            <AvailabilityCard />
            <EarningsCard amount={0} />
            <InboxCard />
          </div>

          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            <WelcomeCard 
              showNotification={showNotification} 
              onDismissNotification={dismissNotification} 
              activeOrders={0} 
              earnings={0}
            />
            
            <FirstGigCard image={pp} />
            
            <EarningsOpportunitiesCard />
          </div>
        </div>
      </div>
    </EmployeeDashboardLayout>
    
  )
}