"use client"

import { useState, useEffect } from "react"
import { 
  Users, 
  FileCheck, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  Database,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  Settings
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useLicenses, useLicenseStats } from "@/hooks/use-licenses"

// Mock data for demonstration
const mockSystemStats = {
  totalUsers: 1247,
  activeUsers: 1156,
  totalLicenses: 89,
  pendingApplications: 23,
  systemUptime: "99.9%",
  lastBackup: "2 hours ago",
  criticalAlerts: 3,
  resolvedIssues: 156
}

const mockRecentActivity = [
  {
    id: 1,
    type: "user_created",
    description: "New user registered: John Doe (Miller)",
    timestamp: "2 minutes ago",
    severity: "info"
  },
  {
    id: 2,
    type: "license_approved",
    description: "License SML-2024-003 approved for Mumias Sugar Mills",
    timestamp: "15 minutes ago",
    severity: "success"
  },
  {
    id: 3,
    type: "system_alert",
    description: "High CPU usage detected on server-01",
    timestamp: "1 hour ago",
    severity: "warning"
  },
  {
    id: 4,
    type: "data_backup",
    description: "Daily backup completed successfully",
    timestamp: "2 hours ago",
    severity: "info"
  },
  {
    id: 5,
    type: "security_alert",
    description: "Multiple failed login attempts detected",
    timestamp: "3 hours ago",
    severity: "error"
  }
]

const mockUserGrowth = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1220 },
  { month: "Mar", users: 1235 },
  { month: "Apr", users: 1240 },
  { month: "May", users: 1245 },
  { month: "Jun", users: 1247 }
]

export default function SuperAdminDashboard() {
  const [systemStats, setSystemStats] = useState(mockSystemStats)
  const [recentActivity, setRecentActivity] = useState(mockRecentActivity)
  const [userGrowth, setUserGrowth] = useState(mockUserGrowth)
  
  // Fetch real license data
  const { data: licensesData, isLoading: licensesLoading } = useLicenses(1, 100)
  const licenseStats = useLicenseStats()

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "text-green-600 bg-green-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "error":
        return "text-red-600 bg-red-100"
      default:
        return "text-blue-600 bg-blue-100"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "error":
        return <XCircle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage the entire KSB system</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            System Healthy
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {systemStats.activeUsers} active users
            </p>
            <Progress value={(systemStats.activeUsers / systemStats.totalUsers) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Licenses</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{licenseStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {licenseStats.active} active, {licenseStats.pending} pending
            </p>
            <div className="flex space-x-2 mt-2">
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                Active: {licenseStats.active}
              </Badge>
              <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                Pending: {licenseStats.pending}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.systemUptime}</div>
            <p className="text-xs text-muted-foreground">
              Last backup: {systemStats.lastBackup}
            </p>
            <Progress value={99.9} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{systemStats.criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">
              {systemStats.resolvedIssues} issues resolved today
            </p>
            <div className="flex space-x-2 mt-2">
              <Badge variant="destructive" className="text-xs">
                Critical: {systemStats.criticalAlerts}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              User Growth
            </CardTitle>
            <CardDescription>Monthly user registration trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userGrowth.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(data.users / 1300) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{data.users}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* License Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              License Status
            </CardTitle>
            <CardDescription>Distribution of license statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Active</span>
                </div>
                <span className="text-sm font-medium">{licenseStats.active}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Pending</span>
                </div>
                <span className="text-sm font-medium">{licenseStats.pending}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Expired</span>
                </div>
                <span className="text-sm font-medium">{licenseStats.expired}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="text-sm">Suspended</span>
                </div>
                <span className="text-sm font-medium">{licenseStats.suspended}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Recent System Activity
          </CardTitle>
          <CardDescription>Latest system events and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                <div className={`p-2 rounded-full ${getSeverityColor(activity.severity)}`}>
                  {getSeverityIcon(activity.severity)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.timestamp}
                  </p>
                </div>
                <Badge variant="outline" className={getSeverityColor(activity.severity)}>
                  {activity.severity}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              View All Activity
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <FileCheck className="h-6 w-6" />
              <span className="text-sm">Review Licenses</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Database className="h-6 w-6" />
              <span className="text-sm">Backup System</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Settings className="h-6 w-6" />
              <span className="text-sm">System Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
