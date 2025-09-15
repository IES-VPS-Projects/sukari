"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { FieldVisitsModal } from "@/components/modals/field-visits-modal"
import { FarmsModal } from "@/components/modals/farms-modal"
import { FarmersModal } from "@/components/modals/farmers-modal"
import { ReportsModal } from "@/components/modals/reports-modal"
import { AnalyticsModal } from "@/components/modals/analytics-modal"
import { AlertsModal } from "@/components/modals/alerts-modal"
import { ActionsModal } from "@/components/modals/actions-modal"
import {
  StatsCards,
  QuickActionsCard,
  FieldVisitsCard,
  AlertsCard,
  FarmsCard,
  FarmersCard,
  ReportsCard,
  AnalyticsCard
} from "./components"

export default function FieldCoordinatorDashboard() {
  const { user } = useAuth()
  
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
  const [visitsModalOpen, setVisitsModalOpen] = useState(false)
  const [farmsModalOpen, setFarmsModalOpen] = useState(false)
  const [farmersModalOpen, setFarmersModalOpen] = useState(false)
  const [reportsModalOpen, setReportsModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [alertsModalOpen, setAlertsModalOpen] = useState(false)
  const [actionsModalOpen, setActionsModalOpen] = useState(false)

  return (
    <>
      {/* Modals */}
      <FieldVisitsModal open={visitsModalOpen} onOpenChange={setVisitsModalOpen} />
      <FarmsModal open={farmsModalOpen} onOpenChange={setFarmsModalOpen} />
      <FarmersModal open={farmersModalOpen} onOpenChange={setFarmersModalOpen} />
      <ReportsModal open={reportsModalOpen} onOpenChange={setReportsModalOpen} />
      <AnalyticsModal open={analyticsModalOpen} onOpenChange={setAnalyticsModalOpen} />
      <AlertsModal open={alertsModalOpen} onOpenChange={setAlertsModalOpen} />
      <ActionsModal open={actionsModalOpen} onOpenChange={setActionsModalOpen} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6 p-4 bg-gray-50/50 rounded-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">{getGreeting()}, Bernice</h1>
              <p className="text-gray-500">{getCurrentDateTime()}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards onAnalyticsClick={() => setAnalyticsModalOpen(true)} />

          {/* Actions Section */}
          <QuickActionsCard onActionsClick={() => setActionsModalOpen(true)} />

          {/* Field Visits and Alerts Section - Side by Side */}
          <div className="grid gap-6 md:grid-cols-2">
            <FieldVisitsCard onViewAllClick={() => setVisitsModalOpen(true)} />
            <AlertsCard onViewAllClick={() => setAlertsModalOpen(true)} />
          </div>

          {/* Farms & Farmers Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <FarmsCard onViewAllClick={() => setFarmsModalOpen(true)} />
            <FarmersCard onViewAllClick={() => setFarmersModalOpen(true)} />
          </div>

          {/* Reports & Analytics Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <ReportsCard onViewAllClick={() => setReportsModalOpen(true)} />
            <AnalyticsCard onViewAnalyticsClick={() => setAnalyticsModalOpen(true)} />
          </div>
        </div>
      </div>
    </>
  )
}