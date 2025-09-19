"use client"

import { useState } from "react"
import { FileText, Truck, User, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PortalLayout } from "@/components/portal-layout"
import { ImporterApplicationsModal } from "./modals/importer-applications-modal"
import { ImporterProfileModal } from "./modals/importer-profile-modal"
import { ImporterReturnsModal } from "./modals/importer-returns-modal"
import { ImporterImportsModal } from "./modals/importer-imports-modal"

export default function ImporterPage() {
  const [profileData] = useState({
    firstName: "Bernard",
    lastName: "Kasavuli",
    email: "bernard.kasavuli@sunshinesugar.co.ke",
    phone: "+254 722 456 789",
    location: "Nairobi, Kenya",
    company: "Sunshine Sugar Imports Ltd",
    role: "Import Manager",
    licenseNumber: "SIL-2024-001",
    organization: "Licensed Sugar Importer",
    bio: "Experienced sugar import manager with over 10 years in sugar import and distribution. Specialized in import operations, quality control, and supply chain management.",
    licenseDate: "January 2020",
    imports: 256,
    importCapacity: "500 MT/Month",
    productionCapacity: "500 MT/Month",
    complianceLevel: "Fully Compliant"
  })

  // Modal states
  const [applicationsModalOpen, setApplicationsModalOpen] = useState(false)
  const [importsModalOpen, setImportsModalOpen] = useState(false)
  const [returnsModalOpen, setReturnsModalOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)

  return (
    <PortalLayout pageTitle="Importer Portal">
      <div className="p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Profile Header */}
        <Card className="rounded-[20px] shadow-lg border-0 bg-white p-4 sm:p-6 h-32">
          <div className="flex items-center gap-4 sm:gap-6 h-full">
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full overflow-hidden">
              <img 
                src="/images/sunshine_sugar.png" 
                alt="Sunshine Sugar Logo" 
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {profileData.company}
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                {profileData.firstName} {profileData.lastName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs sm:text-sm text-gray-500">License Number</p>
              <p className="font-semibold text-sm sm:text-base text-gray-900">{profileData.licenseNumber}</p>
            </div>
          </div>
        </Card>

        {/* Cards Grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Applications Card - First position */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer h-[240px]"
            onClick={() => setApplicationsModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                Applications
              </CardTitle>
              <CardDescription>License and permit requests</CardDescription>
            </CardHeader>
          </Card>

          {/* Imports Card - Second position */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer h-[240px]"
            onClick={() => setImportsModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Truck className="h-5 w-5" />
                Imports
              </CardTitle>
              <CardDescription>Import tracking and management</CardDescription>
            </CardHeader>
          </Card>

          {/* Returns Card - Third position */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer h-[240px]"
            onClick={() => setReturnsModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                Returns
              </CardTitle>
              <CardDescription>Financial and compliance reports</CardDescription>
            </CardHeader>
          </Card>

          {/* Profile Info Card - Fourth position */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer h-[240px]"
            onClick={() => setProfileModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
              <CardDescription>Company details & settings</CardDescription>
            </CardHeader>
          </Card>

        </div>

        {/* Modals */}
        <ImporterApplicationsModal 
          open={applicationsModalOpen} 
          onOpenChange={setApplicationsModalOpen}
        />
        <ImporterImportsModal 
          open={importsModalOpen} 
          onOpenChange={setImportsModalOpen}
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
      </div>
    </PortalLayout>
  )
}