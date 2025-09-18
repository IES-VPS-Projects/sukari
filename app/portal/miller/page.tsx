"use client"

import { useState } from "react"
import { FileText, TrendingUp, User, Calendar, Target, Activity, Award } from "lucide-react"
import { AiOutlineContainer } from 'react-icons/ai'
import { PiFactory } from 'react-icons/pi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PortalLayout } from "@/components/portal-layout"
import { MillerApplicationsModal } from "./modals/miller-applications-modal"
import { MillerProfileModal } from "./modals/miller-profile-modal"
import { MillerReturnsModal } from "./modals/miller-returns-modal"
import { MillerProductionModal } from "./modals/miller-production-modal"

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

  // Modal states
  const [applicationsModalOpen, setApplicationsModalOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [returnsModalOpen, setReturnsModalOpen] = useState(false)
  const [productionModalOpen, setProductionModalOpen] = useState(false)

  return (
    <PortalLayout pageTitle="Miller Dashboard">
      <div className="min-h-screen bg-gray-100">
        <div className="p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Profile Header */}
        <Card className="rounded-[20px] shadow-lg border-0 bg-white p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/mumias_sugar_mills.jpg" 
                  alt="Mumias Sugar Mills" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-black">
                Mumias Sugar Mills Ltd
              </h2>
              <p className="text-gray-600 mt-1">{profileData.firstName} {profileData.lastName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">License Number</p>
              <p className="font-semibold text-base">{profileData.licenseNumber}</p>
            </div>
          </div>
        </Card>

        {/* Cards Grid - 2 rows of 3 cards each */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* First Row */}
          
          {/* Applications Card */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setApplicationsModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                Applications
              </CardTitle>
              <CardDescription>License renewals and permit requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Empty content to match CEO operations card height + 80px */}
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>

          {/* Returns Card */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setReturnsModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AiOutlineContainer className="h-5 w-5" />
                Returns
              </CardTitle>
              <CardDescription>Sugar production returns & reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Empty content to match CEO operations card height + 80px */}
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>

          {/* Production Card */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setProductionModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <PiFactory className="h-5 w-5" />
                Production
              </CardTitle>
              <CardDescription>Daily production metrics & efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Empty content to match CEO operations card height + 80px */}
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>

          {/* Second Row */}

          {/* Profile Card */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setProfileModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
              <CardDescription>Personal & business details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Empty content to match CEO operations card height + 80px */}
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>

          {/* Empty cards to maintain layout */}
          <div className="h-32"></div>
          <div className="h-32"></div>
        </div>

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
        <MillerProductionModal 
          open={productionModalOpen} 
          onOpenChange={setProductionModalOpen}
        />
        </div>
      </div>
    </PortalLayout>
  )
}