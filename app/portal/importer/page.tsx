"use client"

import { useState } from "react"
import { PortalLayout } from "@/components/portal-layout"
import { ImporterApplicationsModal } from "@/components/modals/importer-applications-modal"
import { ImporterProfileModal } from "@/components/modals/importer-profile-modal"
import { ImporterSettingsModal } from "@/components/modals/importer-settings-modal"
import { ImporterReturnsModal } from "@/components/modals/importer-returns-modal"
import { AnalyticsModal } from "@/components/modals/analytics-modal"
import { AlertsModal } from "@/components/modals/alerts-modal"
import {
  StatsCards,
  ImportApplicationProgressCard,
  RecentImportsCard,
  AlertsCard,
  ImportReturnsCard,
  PerformanceAnalyticsCard
} from "./components"

export default function ImporterProfilePage() {
  const [profileData] = useState({
    firstName: "Bernard",
    lastName: "Kasavuli",
    email: "bernard.kasavuli@sugarimports.co.ke",
    phone: "+254 700 222 234",
    location: "Nairobi, Kenya",
    company: "Kasavuli Sugar Imports Ltd",
    role: "Sugar Importer",
    licenseNumber: "SIL-2024-001",
    organization: "Licensed Sugar Importer",
    bio: "Experienced sugar importer with over 10 years in the sugar trade industry. Specialized in international trade, sugar quality assessment, and regulatory compliance across the East African sugar market.",
    licenseDate: "March 2020",
    imports: 45,
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
    <PortalLayout pageTitle="Importer Portal">
      {/* Modals */}
      <ImporterApplicationsModal 
        open={applicationsModalOpen} 
        onOpenChange={setApplicationsModalOpen}
      />
      <ImporterReturnsModal 
        open={returnsModalOpen} 
        onOpenChange={setReturnsModalOpen}
      />
      <ImporterProfileModal 
        open={profileModalOpen} 
        onOpenChange={setProfileModalOpen}
        profileData={profileData}
      />
      <ImporterSettingsModal 
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

          {/* Import Application Progress Section */}
          <ImportApplicationProgressCard onViewAllClick={() => setApplicationsModalOpen(true)} />

          {/* Recent Imports and Alerts Section - Side by Side */}
          <div className="grid gap-6 md:grid-cols-2">
            <RecentImportsCard onViewAllClick={() => setReturnsModalOpen(true)} />
            <AlertsCard onViewAllClick={() => setAlertsModalOpen(true)} />
          </div>

          {/* Returns & Performance Analytics Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <ImportReturnsCard onViewAllClick={() => setReturnsModalOpen(true)} />
            <PerformanceAnalyticsCard onViewAnalyticsClick={() => setAnalyticsModalOpen(true)} />
          </div>
        </div>
      </div>
    </PortalLayout>
  )
}