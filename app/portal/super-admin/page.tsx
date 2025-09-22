"use client"

import { useState } from "react"
import { 
  FileCheck, 
  Database,
  Shield,
  UserCheck,
  Building2,
  FileText,
  Workflow
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

// Mock data for the new dashboard cards
const mockDashboardData = {
  ksbUsers: {
    total: 1247,
    active: 1156,
    pending: 23,
    suspended: 68
  },
  licenses: {
    total: 89,
    active: 67,
    pending: 12,
    expired: 10
  },
  clients: {
    total: 156,
    active: 142,
    pending: 8,
    inactive: 6
  },
  brs: {
    total: 234,
    active: 198,
    pending: 18,
    rejected: 18
  },
  iprs: {
    total: 89,
    active: 76,
    pending: 7,
    expired: 6
  },
  workflowEngine: {
    totalProcesses: 12,
    activeProcesses: 8,
    pendingProcesses: 2,
    completedProcesses: 2
  }
}

// Mock data for KSB Users
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@ksb.go.ke",
    department: "Licensing",
    role: "Manager",
    status: "Active",
    lastLogin: "2 hours ago"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@ksb.go.ke",
    department: "Compliance",
    role: "Officer",
    status: "Active",
    lastLogin: "1 day ago"
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.johnson@ksb.go.ke",
    department: "IT",
    role: "Administrator",
    status: "Active",
    lastLogin: "30 minutes ago"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@ksb.go.ke",
    department: "Finance",
    role: "Accountant",
    status: "Pending",
    lastLogin: "Never"
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@ksb.go.ke",
    department: "Legal",
    role: "Legal Officer",
    status: "Suspended",
    lastLogin: "1 week ago"
  }
]

const mockDepartments = [
  {
    id: 1,
    name: "Licensing",
    description: "Handles all licensing applications and approvals",
    userCount: 45,
    manager: "John Doe",
    status: "Active"
  },
  {
    id: 2,
    name: "Compliance",
    description: "Monitors compliance with sugar industry regulations",
    userCount: 32,
    manager: "Jane Smith",
    status: "Active"
  },
  {
    id: 3,
    name: "IT",
    description: "Information Technology and system administration",
    userCount: 15,
    manager: "Michael Johnson",
    status: "Active"
  },
  {
    id: 4,
    name: "Finance",
    description: "Financial management and accounting",
    userCount: 28,
    manager: "Sarah Wilson",
    status: "Active"
  },
  {
    id: 5,
    name: "Legal",
    description: "Legal affairs and regulatory compliance",
    userCount: 12,
    manager: "David Brown",
    status: "Active"
  },
  {
    id: 6,
    name: "Human Resources",
    description: "HR management and employee relations",
    userCount: 8,
    manager: "Lisa Davis",
    status: "Active"
  }
]

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
  // Modal states
  const [ksbUsersModalOpen, setKsbUsersModalOpen] = useState(false)
  const [licensesModalOpen, setLicensesModalOpen] = useState(false)
  const [clientsModalOpen, setClientsModalOpen] = useState(false)
  const [brsModalOpen, setBrsModalOpen] = useState(false)
  const [iprsModalOpen, setIprsModalOpen] = useState(false)
  const [workflowModalOpen, setWorkflowModalOpen] = useState(false)

  // Helper functions
  const getUserStatusVariant = (status: string) => {
    if (status === 'Active') return 'default'
    if (status === 'Pending') return 'secondary'
    return 'destructive'
  }

  const getUserStatusClassName = (status: string) => {
    if (status === 'Active') return 'bg-green-100 text-green-800'
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Admin Header */}
        <Card className="rounded-[20px] shadow-lg border-0 bg-white p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
                <Shield className="h-10 w-10 text-red-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-black">Super Admin Portal</h2>
              <p className="text-gray-600 mt-1">System Administration & Management</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">System Status</p>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                System Healthy
              </Badge>
            </div>
          </div>
        </Card>

        {/* Management Cards Grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* KSB Users Card */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setKsbUsersModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <UserCheck className="h-5 w-5" />
                KSB Users
              </CardTitle>
              <CardDescription>Manage KSB system users and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>

          {/* Licenses Card */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setLicensesModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileCheck className="h-5 w-5" />
                Licenses
              </CardTitle>
              <CardDescription>Manage and approve license applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>

          {/* Clients Card */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setClientsModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5" />
                Clients
              </CardTitle>
              <CardDescription>Manage client companies and organizations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>

          {/* BRS Card */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setBrsModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                BRS
              </CardTitle>
              <CardDescription>Business Registration System management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>

          {/* IPRS Card */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setIprsModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Database className="h-5 w-5" />
                IPRS
              </CardTitle>
              <CardDescription>Integrated Population Registration System</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>

          {/* Workflow Engine Card */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setWorkflowModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Workflow className="h-5 w-5" />
                Workflow Engine
              </CardTitle>
              <CardDescription>Configure and manage workflow processes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {/* KSB Users Modal */}
      <Dialog open={ksbUsersModalOpen} onOpenChange={setKsbUsersModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center"> 
              KSB Users Management
            </DialogTitle>
            <DialogDescription>
              Manage KSB system users, roles, and permissions
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="users">All Users</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-4">
              {/* Users Tab Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{mockDashboardData.ksbUsers.total}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{mockDashboardData.ksbUsers.active}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Pending Approval</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{mockDashboardData.ksbUsers.pending}</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex space-x-2">
                <Button>Add New User</Button>
                <Button variant="outline">Export Users</Button>
                <Button variant="outline">Bulk Actions</Button>
              </div>
              
              {/* Users Table */}
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>Complete list of KSB system users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <UserCheck className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-xs text-gray-400">{user.department} • {user.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge 
                            variant={getUserStatusVariant(user.status)}
                            className={getUserStatusClassName(user.status)}
                          >
                            {user.status}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Last login</p>
                            <p className="text-xs text-gray-400">{user.lastLogin}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="departments" className="space-y-4">
              {/* Departments Tab Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Departments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{mockDepartments.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Active Departments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{mockDepartments.filter(d => d.status === 'Active').length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Department Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{mockDepartments.reduce((sum, d) => sum + d.userCount, 0)}</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex space-x-2">
                <Button>Add New Department</Button>
                <Button variant="outline">Department Reports</Button>
                <Button variant="outline">Export Data</Button>
              </div>
              
              {/* Departments Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockDepartments.map((dept) => (
                  <Card key={dept.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{dept.name}</CardTitle>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          {dept.status}
                        </Badge>
                      </div>
                      <CardDescription>{dept.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Users:</span>
                          <span className="font-medium">{dept.userCount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Manager:</span>
                          <span className="font-medium">{dept.manager}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">View Users</Button>
                        <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Licenses Modal */}
      <Dialog open={licensesModalOpen} onOpenChange={setLicensesModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileCheck className="h-6 w-6 text-green-600 mr-2" />
              License Management
            </DialogTitle>
            <DialogDescription>
              Manage and approve license applications
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Licenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{mockDashboardData.licenses.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Active Licenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{mockDashboardData.licenses.active}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Pending Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{mockDashboardData.licenses.pending}</div>
                </CardContent>
              </Card>
            </div>
            <div className="flex space-x-2">
              <Button>Review Applications</Button>
              <Button variant="outline">Generate Reports</Button>
              <Button variant="outline">Export Data</Button>
            </div>
            <div className="text-center text-gray-500 py-8">
              License management interface will be implemented here
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Clients Modal */}
      <Dialog open={clientsModalOpen} onOpenChange={setClientsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Building2 className="h-6 w-6 text-purple-600 mr-2" />
              Client Management
            </DialogTitle>
            <DialogDescription>
              Manage client companies and organizations
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{mockDashboardData.clients.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Active Clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{mockDashboardData.clients.active}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Pending Approval</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{mockDashboardData.clients.pending}</div>
                </CardContent>
              </Card>
            </div>
            <div className="flex space-x-2">
              <Button>Add New Client</Button>
              <Button variant="outline">Client Reports</Button>
              <Button variant="outline">Export Data</Button>
            </div>
            <div className="text-center text-gray-500 py-8">
              Client management interface will be implemented here
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* BRS Modal */}
      <Dialog open={brsModalOpen} onOpenChange={setBrsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="h-6 w-6 text-orange-600 mr-2" />
              Business Registration System (BRS)
            </DialogTitle>
            <DialogDescription>
              Manage business registrations and related processes
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{mockDashboardData.brs.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Active Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{mockDashboardData.brs.active}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Pending Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{mockDashboardData.brs.pending}</div>
                </CardContent>
              </Card>
            </div>
            <div className="flex space-x-2">
              <Button>Review Applications</Button>
              <Button variant="outline">Generate Certificates</Button>
              <Button variant="outline">Export Data</Button>
            </div>
            <div className="text-center text-gray-500 py-8">
              BRS management interface will be implemented here
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* IPRS Modal */}
      <Dialog open={iprsModalOpen} onOpenChange={setIprsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Database className="h-6 w-6 text-red-600 mr-2" />
              Integrated Population Registration System (IPRS)
            </DialogTitle>
            <DialogDescription>
              Manage population registration and identity verification
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{mockDashboardData.iprs.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Active Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{mockDashboardData.iprs.active}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Pending Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{mockDashboardData.iprs.pending}</div>
                </CardContent>
              </Card>
            </div>
            <div className="flex space-x-2">
              <Button>Verify Records</Button>
              <Button variant="outline">Generate Reports</Button>
              <Button variant="outline">Export Data</Button>
            </div>
            <div className="text-center text-gray-500 py-8">
              IPRS management interface will be implemented here
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Workflow Engine Modal */}
      <Dialog open={workflowModalOpen} onOpenChange={setWorkflowModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Workflow className="h-6 w-6 text-indigo-600 mr-2" />
              Workflow Engine Setup
            </DialogTitle>
            <DialogDescription>
              Configure and manage workflow processes
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Processes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-indigo-600">{mockDashboardData.workflowEngine.totalProcesses}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Active Processes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{mockDashboardData.workflowEngine.activeProcesses}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Pending Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{mockDashboardData.workflowEngine.pendingProcesses}</div>
                </CardContent>
              </Card>
            </div>
            <div className="flex space-x-2">
              <Button>Create New Workflow</Button>
              <Button variant="outline">Process Templates</Button>
              <Button variant="outline">Monitor Processes</Button>
            </div>
            <div className="text-center text-gray-500 py-8">
              Workflow engine configuration interface will be implemented here
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
