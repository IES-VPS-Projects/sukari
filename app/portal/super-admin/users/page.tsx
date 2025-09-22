"use client"

import { useState, useEffect } from "react"
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Shield,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  Building,
  MapPin
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@mumiasmills.co.ke",
    phone: "+254 700 123 456",
    role: "miller",
    userType: "miller",
    status: "active",
    company: "Mumias Sugar Mills Ltd",
    location: "Mumias, Kakamega",
    lastLogin: "2024-09-21T10:30:00Z",
    createdAt: "2024-01-15T00:00:00Z",
    permissions: ["view_dashboard", "manage_applications", "view_reports"]
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@ksb.go.ke",
    phone: "+254 700 234 567",
    role: "ceo",
    userType: "ceo",
    status: "active",
    company: "Kenya Sugar Board",
    location: "Nairobi",
    lastLogin: "2024-09-21T09:15:00Z",
    createdAt: "2023-12-01T00:00:00Z",
    permissions: ["view_dashboard", "manage_all", "view_analytics", "manage_users"]
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@importsugar.co.ke",
    phone: "+254 700 345 678",
    role: "importer",
    userType: "importer",
    status: "pending",
    company: "Import Sugar Ltd",
    location: "Mombasa",
    lastLogin: null,
    createdAt: "2024-09-20T00:00:00Z",
    permissions: ["view_dashboard", "manage_imports"]
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@fieldcoord.co.ke",
    phone: "+254 700 456 789",
    role: "field-coordinator",
    userType: "field-coordinator",
    status: "active",
    company: "Field Coordination Services",
    location: "Kisumu",
    lastLogin: "2024-09-21T08:45:00Z",
    createdAt: "2024-03-10T00:00:00Z",
    permissions: ["view_dashboard", "manage_farmers", "view_reports"]
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@ksb.go.ke",
    phone: "+254 700 567 890",
    role: "super-admin",
    userType: "SUPER-ADMIN",
    status: "active",
    company: "Kenya Sugar Board",
    location: "Nairobi",
    lastLogin: "2024-09-21T11:00:00Z",
    createdAt: "2023-01-01T00:00:00Z",
    permissions: ["manage_all", "system_admin", "user_management", "audit_logs"]
  }
]

const userTypes = [
  { value: "miller", label: "Miller" },
  { value: "importer", label: "Importer" },
  { value: "field-coordinator", label: "Field Coordinator" },
  { value: "ceo", label: "CEO" },
  { value: "SUPER-ADMIN", label: "Super Admin" }
]

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "suspended", label: "Suspended" },
  { value: "inactive", label: "Inactive" }
]

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [filteredUsers, setFilteredUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter(user => user.role === roleFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(user => user.status === statusFilter)
    }

    setFilteredUsers(filtered)
  }, [users, searchQuery, roleFilter, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "super-admin":
        return "bg-red-100 text-red-800"
      case "ceo":
        return "bg-purple-100 text-purple-800"
      case "miller":
        return "bg-blue-100 text-blue-800"
      case "importer":
        return "bg-green-100 text-green-800"
      case "field-coordinator":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleUserAction = (action: string, userId: string) => {
    const user = users.find(u => u.id === userId)
    if (!user) return

    switch (action) {
      case "edit":
        setSelectedUser(user)
        setIsEditDialogOpen(true)
        break
      case "suspend":
        setUsers(prev => prev.map(u => 
          u.id === userId ? { ...u, status: "suspended" } : u
        ))
        break
      case "activate":
        setUsers(prev => prev.map(u => 
          u.id === userId ? { ...u, status: "active" } : u
        ))
        break
      case "delete":
        if (confirm("Are you sure you want to delete this user?")) {
          setUsers(prev => prev.filter(u => u.id !== userId))
        }
        break
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatLastLogin = (dateString: string | null) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage all system users and their permissions</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new user to the system with appropriate permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {userTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Enter company name" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Create User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {users.filter(u => u.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {users.filter(u => u.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((users.filter(u => u.status === 'active').length / users.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Users</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {users.filter(u => u.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {users.filter(u => u.status === 'suspended').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Access restricted
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>User Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {userTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statusOptions.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Manage user accounts, permissions, and access levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {user.phone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>
                        {userTypes.find(t => t.value === user.role)?.label || user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.company}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {user.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatLastLogin(user.lastLogin)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(user.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUserAction("edit", user.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem onClick={() => handleUserAction("suspend", user.id)}>
                              <UserX className="h-4 w-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleUserAction("activate", user.id)}>
                              <UserCheck className="h-4 w-4 mr-2" />
                              Activate User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleUserAction("delete", user.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
