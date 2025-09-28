"use client"

import { useEffect, useState } from "react"
import { Shield, Activity, Target, Award, FileText, Calendar, Users, Clock, CheckCircle, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PortalLayout } from "@/components/portal-layout"
import { ProfileInfoModal } from "@/components/modals/profile-info-modal"
import { ProfileActivitiesModal } from "@/components/modals/profile-activities-modal"
import { PerformanceModal } from "@/components/modals/performance-modal"
import { AchievementsModal } from "@/components/modals/achievements-modal"
import { ApplicationsModal } from "@/components/modals/applications-modal"
import { DutiesModal } from "@/components/modals/duties-modal"
import { useAuth } from "@/components/auth-provider"

export default function OperationsPage() {
  const [profileData] = useState({
    firstName: "Gerald",
    lastName: "Bosire",
    email: "gerald.bosire@ksb.go.ke",
    phone: "+254 712 345 678",
    location: "Nairobi, Kenya",
    department: "Executive Management",
    role: "Chief Executive Officer",
    rank: "Executive",
    employeeId: "KSB-2020-001",
    organization: "Kenya Sugar Board",
    bio: "Experienced executive leader with over 15 years in agricultural management and sugar industry development. Specialized in strategic leadership, policy development, and stakeholder relationship management across the sugar value chain.",
    joinDate: "January 2020",
    deployments: 18,
    clearanceLevel: "Executive Level"
  })
  const { user } = useAuth()
  useEffect(() => {
    console.log('user', user)
  }, [user])

  // Modal states
  const [profileInfoModalOpen, setProfileInfoModalOpen] = useState(false)
  const [activitiesModalOpen, setActivitiesModalOpen] = useState(false)
  const [performanceModalOpen, setPerformanceModalOpen] = useState(false)
  const [achievementsModalOpen, setAchievementsModalOpen] = useState(false)
  const [applicationsModalOpen, setApplicationsModalOpen] = useState(false)
  const [dutiesModalOpen, setDutiesModalOpen] = useState(false)

  return (
    <PortalLayout pageTitle="Operations">
      <div className="p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Profile Header */}
        <Card className="rounded-[20px] shadow-lg border-0 bg-white p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
              <AvatarImage src="/images/KSB_CEO.png" alt="Profile" />
              <AvatarFallback className="text-lg sm:text-xl bg-green-100 text-green-800">
                {profileData.firstName[0]}{profileData.lastName[0]}
                {user?.iprsData?.first_name[0]}{user?.iprsData?.last_name[0]}
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
              <p className="text-xs sm:text-sm text-gray-600">Employee ID</p>
              <p className="font-semibold text-sm sm:text-base">{profileData.employeeId}</p>
            </div>
          </div>
        </Card>

      {/* Cards Grid */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Applications Card - First position */}
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

        {/* Duties Card - Second position */}
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

        {/* Performance Card - Third position */}
        <Card 
          className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => setPerformanceModalOpen(true)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5" />
              Performance
            </CardTitle>
            <CardDescription>Service performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Project Success Rate</span>
                <span className="font-semibold text-black">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Leadership Rating</span>
                <span className="font-semibold text-black">4.9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Personnel Trained</span>
                <span className="font-semibold text-black">234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Training Sessions</span>
                <span className="font-semibold text-black">89</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Info Card - Fourth position (second row, first position) */}
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
                <span className="text-sm text-muted-foreground">Projects</span>
                <span className="font-semibold">{profileData.deployments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Service Years</span>
                <span className="font-semibold">5+</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activities Card - Fifth position (second row, second position) */}
        <Card 
          className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => setActivitiesModalOpen(true)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5" />
              Activities
            </CardTitle>
            <CardDescription>Recent operational activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Operations</span>
                <span className="font-semibold text-black">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Successful Projects</span>
                <span className="font-semibold text-black">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Operations</span>
                <span className="font-semibold text-black">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Personnel Involved</span>
                <span className="font-semibold text-black">1,234</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Card - Sixth position (second row, third position) */}
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
      </div>

      {/* Modals */}
      <ProfileInfoModal 
        open={profileInfoModalOpen} 
        onOpenChange={setProfileInfoModalOpen}
        profileData={profileData}
      />
      <ProfileActivitiesModal 
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
