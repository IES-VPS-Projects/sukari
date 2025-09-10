"use client"

import { useState } from "react"
import { FileText, Settings, User, Receipt, Shield, CheckCircle, Clock, TrendingUp, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PortalLayout } from "@/components/portal-layout"
import { ImporterApplicationsModal } from "@/components/modals/importer-applications-modal"
import { ImporterProfileModal } from "@/components/modals/importer-profile-modal"
import { ImporterSettingsModal } from "@/components/modals/importer-settings-modal"
import { ImporterReturnsModal } from "@/components/modals/importer-returns-modal"

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

  // Modal states
  const [applicationsModalOpen, setApplicationsModalOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [returnsModalOpen, setReturnsModalOpen] = useState(false)

  return (
    <PortalLayout pageTitle="Importer Portal">
      <div className="p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Profile Header */}
        <Card className="rounded-[20px] shadow-lg border-0 bg-white p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
              <AvatarImage src="/images/importer-avatar.png" alt="Profile" />
              <AvatarFallback className="text-lg sm:text-xl bg-blue-100 text-blue-800">
                {profileData.firstName[0]}{profileData.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-gray-600 mt-1">{profileData.role}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs sm:text-sm">
                  {profileData.company}
                </Badge>
                <Badge variant="outline" className="border-gray-300 text-xs sm:text-sm">
                  {profileData.complianceLevel}
                </Badge>
              </div>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <p className="text-xs sm:text-sm text-gray-600">License Number</p>
              <p className="font-semibold text-sm sm:text-base">{profileData.licenseNumber}</p>
            </div>
          </div>
        </Card>

      {/* Cards Grid */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2">
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
            <CardDescription>License applications and renewals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pending Applications</span>
                <span className="font-semibold text-black">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Approved</span>
                <span className="font-semibold text-black">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Renewals Due</span>
                <span className="font-semibold text-black">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Applications</span>
                <span className="font-semibold text-black">5</span>
              </div>
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
              <Receipt className="h-5 w-5" />
              Returns
            </CardTitle>
            <CardDescription>Import returns and declarations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pending Returns</span>
                <span className="font-semibold text-black">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Submitted This Month</span>
                <span className="font-semibold text-black">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Compliance Score</span>
                <span className="font-semibold text-black">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Next Due Date</span>
                <span className="font-semibold text-black">15 Oct</span>
              </div>
            </div>
          </CardContent>
        </Card>

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
            <CardDescription>Personal & company information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Company</span>
                <span className="font-semibold text-black">{profileData.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">License Status</span>
                <span className="font-semibold text-green-600">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Imports</span>
                <span className="font-semibold text-black">{profileData.imports}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="font-semibold text-black">2020</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card 
          className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => setSettingsModalOpen(true)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
            <CardDescription>Account & security settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Documents</span>
                <span className="font-semibold text-black">12 files</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Security Level</span>
                <span className="font-semibold text-green-600">High</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Notifications</span>
                <span className="font-semibold text-black">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">2FA Status</span>
                <span className="font-semibold text-green-600">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
      </div>
    </PortalLayout>
  )
}
