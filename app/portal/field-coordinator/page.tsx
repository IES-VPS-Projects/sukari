"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Users, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  Eye, 
  BarChart3,
  ClipboardList,
  Tractor,
  Bell,
  Settings,
  Activity
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { FieldVisitsModal } from "@/components/modals/field-visits-modal"
import { FarmsModal } from "@/components/modals/farms-modal"
import { FarmersModal } from "@/components/modals/farmers-modal"
import { ReportsModal } from "@/components/modals/reports-modal"
import { AnalyticsModal } from "@/components/modals/analytics-modal"
import { AlertsModal } from "@/components/modals/alerts-modal"
import { ActionsModal } from "@/components/modals/actions-modal"

// Sample data
const stats = [
  {
    title: "Total Farms",
    value: "247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Tractor,
    description: "Registered farms",
  },
  {
    title: "Active Farmers",
    value: "189",
    change: "+8%",
    changeType: "positive" as const,
    icon: Users,
    description: "Farmers in system",
  },
  {
    title: "Field Visits",
    value: "156",
    change: "+23%",
    changeType: "positive" as const,
    icon: Calendar,
    description: "This month",
  },
  {
    title: "Compliance Rate",
    value: "87%",
    change: "-3%",
    changeType: "negative" as const,
    icon: CheckCircle,
    description: "Overall compliance",
  },
]

const upcomingVisits = [
  {
    id: 1,
    farmName: "Green Valley Farm",
    farmer: "Mary Johnson",
    date: "2024-01-15",
    time: "09:00 AM",
    type: "Crop Assessment",
    priority: "high" as const,
    location: "Sector 7, Block A",
  },
  {
    id: 2,
    farmName: "Sunrise Agriculture",
    farmer: "David Smith",
    date: "2024-01-15",
    time: "02:00 PM",
    type: "Compliance Check",
    priority: "medium" as const,
    location: "Sector 12, Block C",
  },
]

const recentFarms = [
  {
    id: 1,
    name: "Green Valley Farm",
    location: "Kisumu County",
    size: "120 acres",
    status: "Active",
    compliance: 92,
  },
  {
    id: 2,
    name: "Sunrise Agriculture",
    location: "Kakamega County",
    size: "85 acres",
    status: "Active",
    compliance: 87,
  },
]

const recentFarmers = [
  {
    id: 1,
    name: "Mary Johnson",
    location: "Kisumu County",
    farms: 2,
    status: "Active",
  },
  {
    id: 2,
    name: "David Smith",
    location: "Kakamega County",
    farms: 1,
    status: "Active",
  },
]

const recentReports = [
  {
    id: 1,
    title: "Monthly Compliance Summary",
    date: "2023-12-31",
    type: "Compliance",
  },
  {
    id: 2,
    title: "Field Visit Summary - December 2023",
    date: "2023-12-31",
    type: "Field Visits",
  },
]

const analyticsData = [
  {
    metric: "Completion Rate",
    value: 94,
    target: 95,
  },
  {
    metric: "Avg Duration",
    value: 87,
    target: 90,
  },
]

const actions = [
  {
    title: "Schedule Visit",
    description: "Plan and schedule a new field visit",
    icon: Calendar,
    href: "#",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Register Farm",
    description: "Add a new farm to the system",
    icon: Tractor,
    href: "#",
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Register Farmer",
    description: "Add a new farmer to the system",
    icon: Users,
    href: "#",
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Generate Report",
    description: "Create a new report",
    icon: FileText,
    href: "#",
    color: "bg-orange-100 text-orange-700",
  },
]

export default function FieldCoordinatorDashboard() {
  const { user } = useAuth()
  
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
              <h1 className="text-2xl font-bold">Field Coordinator Dashboard</h1>
              <p className="text-gray-500">Welcome back, Bernice Kasavuli. Here's what's happening in your jurisdiction.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setAlertsModalOpen(true)}>
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="overflow-hidden border border-muted rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={() => setAnalyticsModalOpen(true)}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/20">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-full ${
                    stat.title === "Total Farms" ? "bg-green-100" :
                    stat.title === "Active Farmers" ? "bg-blue-100" :
                    stat.title === "Field Visits" ? "bg-purple-100" :
                    "bg-orange-100"
                  }`}>
                    <stat.icon className={`h-4 w-4 ${
                      stat.title === "Total Farms" ? "text-green-700" :
                      stat.title === "Active Farmers" ? "text-blue-700" :
                      stat.title === "Field Visits" ? "text-purple-700" :
                      "text-orange-700"
                    }`} />
                  </div>
                </CardHeader>
                <CardContent className="py-4">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  <div className="flex items-center pt-1">
                    <TrendingUp
                      className={`h-3 w-3 ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
                    />
                    <span className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change} from last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Actions Section */}
          <Card className="overflow-hidden border border-muted rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={() => setActionsModalOpen(true)}>
            <CardHeader className="bg-muted/20">
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks and actions</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {actions.map((action, index) => (
                  <div key={index} className="flex flex-col items-center text-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`p-3 rounded-full ${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">{action.title}</h3>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Field Visits and Alerts Section - Side by Side */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Field Visits */}
            <Card className="overflow-hidden border border-muted rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={() => setVisitsModalOpen(true)}>
              <CardHeader className="bg-muted/20">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Field Visits
                </CardTitle>
                <CardDescription>Upcoming field visits</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {upcomingVisits.map((visit) => (
                  <div key={visit.id} className="flex items-center space-x-4 rounded-lg border p-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium leading-none">{visit.farmName}</p>
                        <Badge variant={visit.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                          {visit.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{visit.farmer}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {visit.date} at {visit.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="bg-muted/30 py-3">
                <Button variant="ghost" size="sm" className="w-full flex items-center justify-center">
                  View All Visits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Alerts & Warnings */}
            <Card className="overflow-hidden border border-muted rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={() => setAlertsModalOpen(true)}>
              <CardHeader className="bg-muted/20">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Alerts & Warnings
                </CardTitle>
                <CardDescription>Important notifications requiring attention</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-orange-50 p-3">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Weather Alert</p>
                    <p className="text-xs text-muted-foreground">Heavy rainfall expected in Sector 5</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-red-50 p-3">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Disease Outbreak</p>
                    <p className="text-xs text-muted-foreground">Blight detected in 3 farms</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 py-3">
                <Button variant="ghost" size="sm" className="w-full flex items-center justify-center">
                  View All Alerts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Farms & Farmers Section */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Farms */}
            <Card className="overflow-hidden border border-muted rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={() => setFarmsModalOpen(true)}>
              <CardHeader className="bg-muted/20">
                <CardTitle className="flex items-center gap-2">
                  <Tractor className="h-5 w-5" />
                  Farms
                </CardTitle>
                <CardDescription>Registered farms in your jurisdiction</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {recentFarms.map((farm) => (
                  <div key={farm.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{farm.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {farm.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{farm.size}</span>
                        <span>•</span>
                        <span>Compliance: {farm.compliance}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="bg-muted/30 py-3">
                <Button variant="ghost" size="sm" className="w-full flex items-center justify-center">
                  View All Farms
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Farmers */}
            <Card className="overflow-hidden border border-muted rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={() => setFarmersModalOpen(true)}>
              <CardHeader className="bg-muted/20">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Farmers
                </CardTitle>
                <CardDescription>Registered farmers in your jurisdiction</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {recentFarmers.map((farmer) => (
                  <div key={farmer.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {farmer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{farmer.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {farmer.location}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{farmer.farms} farms</span>
                          <span>•</span>
                          <span>Status: {farmer.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="bg-muted/30 py-3">
                <Button variant="ghost" size="sm" className="w-full flex items-center justify-center">
                  View All Farmers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Reports & Analytics Section */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Reports */}
            <Card className="overflow-hidden border border-muted rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={() => setReportsModalOpen(true)}>
              <CardHeader className="bg-muted/20">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Reports
                </CardTitle>
                <CardDescription>Recent and available reports</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{report.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{report.date}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="bg-muted/30 py-3">
                <Button variant="ghost" size="sm" className="w-full flex items-center justify-center">
                  View All Reports
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Analytics */}
            <Card className="overflow-hidden border border-muted rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={() => setAnalyticsModalOpen(true)}>
              <CardHeader className="bg-muted/20">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics
                </CardTitle>
                <CardDescription>Performance metrics and insights</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Farm Compliance</span>
                      <span>84.7%</span>
                    </div>
                    <Progress value={84.7} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Visit Completion</span>
                      <span>94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3">
                    <Activity className="h-4 w-4 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Performance Trend</p>
                      <p className="text-xs text-muted-foreground">Overall metrics improved by 12% this month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 py-3">
                <Button variant="ghost" size="sm" className="w-full flex items-center justify-center">
                  View Detailed Analytics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}