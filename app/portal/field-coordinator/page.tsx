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
import { GisMappingModal } from "./modals/gis-mapping-modal"
import { InspectionsModal } from "./modals/inspections-modal"
import {
  StatsCards,
  QuickActionsCard,
  FieldVisitsCard,
  AlertsCard,
  FarmsCard,
  FarmersCard,
  ReportsCard,
  AnalyticsCard,
  GISMappingCard,
  InspectionsCard
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
  const [gisMappingModalOpen, setGisMappingModalOpen] = useState(false)
  const [inspectionsModalOpen, setInspectionsModalOpen] = useState(false)

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
      <GisMappingModal open={gisMappingModalOpen} onOpenChange={setGisMappingModalOpen} />
      <InspectionsModal open={inspectionsModalOpen} onOpenChange={setInspectionsModalOpen} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-8">
          {/* Greetings and Date/Time - no card style */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">{getGreeting()}, Bernice</h1>
            </div>
            <div className="text-right">
              <p className="text-gray-700">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} <span className="font-bold">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
              </p>
            </div>
          </div>

          {/* Stats Cards - no card style */}
          <StatsCards />

          {/* Main Cards Section - GIS Mapping and Inspections */}
          <div className="grid gap-8 md:grid-cols-2">
            <GISMappingCard onViewClick={() => setGisMappingModalOpen(true)} />
            <InspectionsCard onViewClick={() => setInspectionsModalOpen(true)} />
          </div>
        </div>
      </div>
    </>
  )
}