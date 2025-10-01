"use client"

import { useState } from "react"
import { Shield, Activity, Target, Award, FileText, Calendar, Users, Clock, CheckCircle, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PortalLayout } from "@/components/portal-layout"
import { ProfileInfoModal } from "@/components/modals/profile-info-modal"
import { ActivitiesModal } from "@/components/modals/activities-modal"
import { PerformanceModal } from "@/components/modals/performance-modal"
import { AchievementsModal } from "@/components/modals/achievements-modal"
import { ApplicationsModal } from "@/components/modals/applications-modal"
import { DutiesModal } from "@/components/modals/duties-modal"

export default function ProfilePage() {
  const [profileData] = useState({
    firstName: "Jude",
    lastName: "Chesire",
    email: "jude.chesire@judiciary.go.ke",
    phone: "+254 712 345 678",
    location: "Nairobi, Kenya",
    department: "High Court",
    role: "High Court Judge",
    rank: "Judge",
    employeeId: "JUD-2020-001",
    organization: "Judiciary of Kenya",
    bio: "Experienced judicial officer with over 15 years in legal practice and case management. Specialized in civil law, constitutional matters, and judicial leadership. Committed to delivering timely and fair justice.",
    joinDate: "January 2020",
    deployments: 18,
    clearanceLevel: "Judicial Officer"
  })

  // Modal states
  const [profileInfoModalOpen, setProfileInfoModalOpen] = useState(false)
  const [activitiesModalOpen, setActivitiesModalOpen] = useState(false)
  const [performanceModalOpen, setPerformanceModalOpen] = useState(false)
  const [achievementsModalOpen, setAchievementsModalOpen] = useState(false)
  const [applicationsModalOpen, setApplicationsModalOpen] = useState(false)
  const [dutiesModalOpen, setDutiesModalOpen] = useState(false)

  return (
    <PortalLayout pageTitle="Profile">
      <div className="p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Profile Header */}
        <Card className="rounded-[20px] shadow-lg border-0 bg-white p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback className="text-lg sm:text-xl bg-green-100 text-green-800">
                {profileData.firstName[0]}{profileData.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-gray-600 mt-1">{profileData.role}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs sm:text-sm">
                  {profileData.organization}
                </Badge>
                <Badge variant="outline" className="border-gray-300 text-xs sm:text-sm">
                  {profileData.clearanceLevel}
                </Badge>
              </div>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <p className="text-xs sm:text-sm text-gray-600">Judicial ID</p>
              <p className="font-semibold text-sm sm:text-base">{profileData.employeeId}</p>
            </div>
          </div>
        </Card>

      {/* Cards Grid */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Profile Info Card */}
        <Card 
          className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => setProfileInfoModalOpen(true)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5" />
              Profile Info
            </CardTitle>
            <CardDescription>Personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Position</span>
                <span className="font-semibold">{profileData.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Department</span>
                <span className="font-semibold">{profileData.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Cases Completed</span>
                <span className="font-semibold">{profileData.deployments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Service Years</span>
                <span className="font-semibold">5+</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activities Card */}
        <Card 
          className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => setActivitiesModalOpen(true)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5" />
              Activities
            </CardTitle>
            <CardDescription>Recent judicial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Cases Handled</span>
                <span className="font-semibold text-black">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Judgments Delivered</span>
                <span className="font-semibold text-black">215</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Cases</span>
                <span className="font-semibold text-black">32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Hearings Conducted</span>
                <span className="font-semibold text-black">412</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Card */}
        <Card 
          className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => setPerformanceModalOpen(true)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5" />
              Performance
            </CardTitle>
            <CardDescription>Judicial performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Case Clearance Rate</span>
                <span className="font-semibold text-black">87%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Avg. Resolution Time</span>
                <span className="font-semibold text-black">78 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Appeal Rate</span>
                <span className="font-semibold text-black">12%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Judgment Quality</span>
                <span className="font-semibold text-black">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Card */}
        <Card 
          className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => setAchievementsModalOpen(true)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-5 w-5" />
              Achievements
            </CardTitle>
            <CardDescription>Professional honors & awards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Awards</span>
                <span className="font-semibold text-black">6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Service Awards</span>
                <span className="font-semibold text-black">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Excellence Awards</span>
                <span className="font-semibold text-black">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Certificates</span>
                <span className="font-semibold text-black">1</span>
              </div>
            </div>
          </CardContent>
        </Card>

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
            <CardDescription>Leave, Training and Transfer requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pending Applications</span>
                <span className="font-semibold text-black">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Approved</span>
                <span className="font-semibold text-black">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Under Review</span>
                <span className="font-semibold text-black">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Requests</span>
                <span className="font-semibold text-black">4</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Duties Card */}
        <Card 
          className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => setDutiesModalOpen(true)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5" />
              Duties
            </CardTitle>
            <CardDescription>Assigned duties & schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Today's Duties</span>
                <span className="font-semibold text-black">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="font-semibold text-black">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">High Priority</span>
                <span className="font-semibold text-black">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Next Duty</span>
                <span className="font-semibold text-black">06:00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <ProfileInfoModal 
        open={profileInfoModalOpen} 
        onOpenChange={setProfileInfoModalOpen}
        profileData={profileData}
      />
      <ActivitiesModal 
        open={activitiesModalOpen} 
        onOpenChange={setActivitiesModalOpen}
      />
      <PerformanceModal 
        open={performanceModalOpen} 
        onOpenChange={setPerformanceModalOpen}
      />
      <AchievementsModal 
        open={achievementsModalOpen} 
        onOpenChange={setAchievementsModalOpen}
      />
      <ApplicationsModal 
        open={applicationsModalOpen} 
        onOpenChange={setApplicationsModalOpen}
      />
      <DutiesModal 
        open={dutiesModalOpen} 
        onOpenChange={setDutiesModalOpen}
      />
      </div>
    </PortalLayout>
  )
}
