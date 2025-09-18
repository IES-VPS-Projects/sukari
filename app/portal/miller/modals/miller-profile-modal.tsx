"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Building2, 
  Users, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react"

interface MillerProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profileData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    company: string
    role: string
    licenseNumber: string
    organization: string
    bio: string
    licenseDate: string
    productionCapacity: string
    complianceLevel: string
  }
}

export function MillerProfileModal({ open, onOpenChange, profileData }: MillerProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'company' | 'access'>('company')
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState(profileData)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('')
  const [inviteDepartment, setInviteDepartment] = useState('')

  // Mock company users data
  const [companyUsers, setCompanyUsers] = useState([
    {
      id: '1',
      name: 'James Mwangi',
      email: 'james.mwangi@mumiasmills.co.ke',
      role: 'Miller Administrator',
      department: 'Operations',
      status: 'active',
      joinDate: '2019-01-15',
      lastActive: '2024-09-12'
    },
    {
      id: '2',
      name: 'Sarah Kimani',
      email: 'sarah.kimani@mumiasmills.co.ke',
      role: 'Production Manager',
      department: 'Production',
      status: 'active',
      joinDate: '2021-03-10',
      lastActive: '2024-09-12'
    },
    {
      id: '3',
      name: 'Peter Ochieng',
      email: 'peter.ochieng@mumiasmills.co.ke',
      role: 'Quality Controller',
      department: 'Quality Assurance',
      status: 'active',
      joinDate: '2020-08-22',
      lastActive: '2024-09-11'
    },
    {
      id: '4',
      name: 'Grace Wanjiku',
      email: 'grace.wanjiku@mumiasmills.co.ke',
      role: 'Financial Analyst',
      department: 'Finance',
      status: 'inactive',
      joinDate: '2022-05-12',
      lastActive: '2024-09-08'
    },
    {
      id: '5',
      name: 'David Karanja',
      email: 'david.karanja@mumiasmills.co.ke',
      role: 'Returns Officer',
      department: 'Compliance',
      status: 'pending',
      joinDate: null,
      lastActive: null
    }
  ])

  const departments = [
    'Operations',
    'Production',
    'Quality Assurance',
    'Finance',
    'Compliance',
    'Marketing',
    'Human Resources',
    'IT & Systems'
  ]

  const roles = [
    'Miller Administrator',
    'Production Manager',
    'Quality Controller',
    'Financial Analyst',
    'Returns Officer',
    'Maintenance Engineer',
    'Marketing Manager',
    'HR Manager'
  ]

  const handleSaveProfile = () => {
    // Save logic here
    setIsEditing(false)
  }

  const handleInviteUser = () => {
    if (inviteEmail && inviteRole && inviteDepartment) {
      const newUser = {
        id: String(companyUsers.length + 1),
        name: inviteEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: inviteEmail,
        role: inviteRole,
        department: inviteDepartment,
        status: 'pending' as const,
        joinDate: null,
        lastActive: null
      }
      setCompanyUsers([...companyUsers, newUser])
      setInviteEmail('')
      setInviteRole('')
      setInviteDepartment('')
    }
  }

  const handleRemoveUser = (userId: string) => {
    setCompanyUsers(companyUsers.filter(user => user.id !== userId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'inactive':
        return <XCircle className="h-4 w-4 text-gray-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Profile</DialogTitle>
          <DialogDescription>
            Manage company information and access control for your miller organization
          </DialogDescription>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex space-x-1 border-b border-gray-200 mb-6">
          {[
            { id: 'company', label: 'Company Information', icon: Building2 },
            { id: 'access', label: 'Access Management', icon: Users }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === id
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Company Information Tab */}
        {activeTab === 'company' && (
          <div className="h-[60vh] overflow-y-auto">
            <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Company Profile</h3>
              <Button
                variant="outline"
                onClick={() => isEditing ? handleSaveProfile() : setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>

            <div className="grid gap-6">
              {/* Basic Company Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Basic Information</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={isEditing ? editedData.company : profileData.company}
                      onChange={(e) => setEditedData(prev => ({ ...prev, company: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="licenseNumber">Miller License Number</Label>
                    <Input
                      id="licenseNumber"
                      value={isEditing ? editedData.licenseNumber : profileData.licenseNumber}
                      onChange={(e) => setEditedData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="productionCapacity">Production Capacity</Label>
                    <Input
                      id="productionCapacity"
                      value={isEditing ? editedData.productionCapacity : profileData.productionCapacity}
                      onChange={(e) => setEditedData(prev => ({ ...prev, productionCapacity: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="e.g., 2500 MT/day"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Facility Location</Label>
                    <Input
                      id="location"
                      value={isEditing ? editedData.location : profileData.location}
                      onChange={(e) => setEditedData(prev => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Company Description</Label>
                  <Textarea
                    id="bio"
                    value={isEditing ? editedData.bio : profileData.bio}
                    onChange={(e) => setEditedData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Contact Information</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Primary Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editedData.email : profileData.email}
                      onChange={(e) => setEditedData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Primary Phone</Label>
                    <Input
                      id="phone"
                      value={isEditing ? editedData.phone : profileData.phone}
                      onChange={(e) => setEditedData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* License Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">License Information</h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label>License Date</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{profileData.licenseDate}</span>
                    </div>
                  </div>
                  <div>
                    <Label>Compliance Level</Label>
                    <div className="mt-1">
                      <Badge className="bg-green-100 text-green-800">
                        {profileData.complianceLevel}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label>Organization Type</Label>
                    <div className="mt-1">
                      <span className="text-sm text-gray-600">{profileData.organization}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        )}

        {/* Access Management Tab */}
        {activeTab === 'access' && (
          <div className="h-[60vh] overflow-y-auto">
            <div className="space-y-6">
            <h3 className="text-lg font-semibold">Access Management</h3>

            {/* Add New User Section */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-medium mb-4">Invite New User</h4>
              <div className="grid gap-4 sm:grid-cols-4">
                <div>
                  <Label htmlFor="inviteEmail">Email Address</Label>
                  <Input
                    id="inviteEmail"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="user@mumiasmills.co.ke"
                  />
                </div>
                <div>
                  <Label htmlFor="inviteRole">Role</Label>
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="inviteDepartment">Department</Label>
                  <Select value={inviteDepartment} onValueChange={setInviteDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleInviteUser}
                    disabled={!inviteEmail || !inviteRole || !inviteDepartment}
                    className="w-full"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite User
                  </Button>
                </div>
              </div>
            </div>

            {/* Current Users */}
            <div className="space-y-4">
              <h4 className="font-medium">Current Users ({companyUsers.length})</h4>
              <div className="grid gap-4">
                {companyUsers.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/images/user-${user.id}.png`} alt={user.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-800">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h5 className="font-medium">{user.name}</h5>
                          <p className="text-sm text-gray-600">{user.role}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {user.department}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right text-xs text-gray-500">
                          {user.status === 'pending' ? (
                            <p>Invitation sent</p>
                          ) : (
                            <>
                              <p>Joined: {user.joinDate && new Date(user.joinDate).toLocaleDateString()}</p>
                              <p>Last active: {user.lastActive && new Date(user.lastActive).toLocaleDateString()}</p>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(user.status)}
                          <Badge className={getStatusColor(user.status)}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </div>
                        {user.status !== 'active' || user.id !== '1' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveUser(user.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {departments.map((dept) => {
                const deptUsers = companyUsers.filter(user => user.department === dept)
                const activeUsers = deptUsers.filter(user => user.status === 'active').length
                
                return deptUsers.length > 0 ? (
                  <div key={dept} className="border rounded-lg p-3 bg-gray-50">
                    <h5 className="font-medium">{dept}</h5>
                    <div className="text-sm text-gray-600">
                      {activeUsers} active of {deptUsers.length} users
                    </div>
                  </div>
                ) : null
              })}
            </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}