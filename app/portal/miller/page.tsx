"use client"

import { useState } from "react"
import { PortalLayout } from "@/components/portal-layout"
import { MillerApplicationsModal } from "@/components/modals/miller-applications-modal"
import { MillerProfileModal } from "@/components/modals/miller-profile-modal"
import { MillerSettingsModal } from "@/components/modals/miller-settings-modal"
import { MillerReturnsModal } from "@/components/modals/miller-returns-modal"
import { AnalyticsModal } from "@/components/modals/analytics-modal"
import { AlertsModal } from "@/components/modals/alerts-modal"
import {
  StatsCards,
  ApplicationProgressCard,
  RecentReturnsCard,
  AlertsCard,
  CompanyProfileCard,
  PerformanceAnalyticsCard
} from "./components"

export default function MillerProfilePage() {
  const [profileData] = useState({
    firstName: "James",
    lastName: "Mwangi",
    email: "james.mwangi@mumiasmills.co.ke",
    phone: "+254 700 333 456",
    location: "Mumias, Kenya",
    company: "Mumias Sugar Mills Ltd",
    role: "Sugar Miller",
    licenseNumber: "SML-2024-003",
    organization: "Licensed Sugar Miller",
    bio: "Experienced sugar miller with over 15 years in sugar production and processing. Specialized in industrial sugar processing, quality control, and regulatory compliance in the Kenyan sugar industry.",
    licenseDate: "January 2019",
    productionCapacity: "2500 MT/day",
    complianceLevel: "Fully Compliant"
  })

  // Helper function to get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }
  
  // Helper function to format date and time
  const getCurrentDateTime = () => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    }
    const date = now.toLocaleDateString('en-US', options)
    const time = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
    return `${date} at ${time}`
  }

  // Modal states
  const [applicationsModalOpen, setApplicationsModalOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [returnsModalOpen, setReturnsModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [alertsModalOpen, setAlertsModalOpen] = useState(false)

  return (
    <PortalLayout pageTitle="Miller Portal">
      {/* Modals */}
      <MillerApplicationsModal 
        open={applicationsModalOpen} 
        onOpenChange={setApplicationsModalOpen}
      />
      <MillerReturnsModal 
        open={returnsModalOpen} 
        onOpenChange={setReturnsModalOpen}
      />
      <MillerProfileModal 
        open={profileModalOpen} 
        onOpenChange={setProfileModalOpen}
        profileData={profileData}
      />
      <MillerSettingsModal 
        open={settingsModalOpen} 
        onOpenChange={setSettingsModalOpen}
      />
      <AnalyticsModal open={analyticsModalOpen} onOpenChange={setAnalyticsModalOpen} />
      <AlertsModal open={alertsModalOpen} onOpenChange={setAlertsModalOpen} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6 p-4 bg-gray-50/50 rounded-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">{getGreeting()}, {profileData.firstName}</h1>
              <p className="text-gray-500">{getCurrentDateTime()}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards onAnalyticsClick={() => setAnalyticsModalOpen(true)} />

          {/* Application Progress Section */}
          <ApplicationProgressCard onViewAllClick={() => setApplicationsModalOpen(true)} />

          {/* Returns and Alerts Section - Side by Side */}
          <div className="grid gap-6 md:grid-cols-2">
            <RecentReturnsCard onViewAllClick={() => setReturnsModalOpen(true)} />
            <AlertsCard onViewAllClick={() => setAlertsModalOpen(true)} />
          </div>

          {/* Profile & Analytics Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <CompanyProfileCard 
              profileData={profileData} 
              onViewProfileClick={() => setProfileModalOpen(true)} 
            />
            <PerformanceAnalyticsCard onViewAnalyticsClick={() => setAnalyticsModalOpen(true)} />
          </div>
        </div>
      </div>
    </PortalLayout>
  )
}