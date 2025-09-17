"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Calendar, 
  Edit, 
  Save, 
  X,
  Settings,
  Bell,
  Shield,
  Upload,
  Download,
  Eye,
  Trash2,
  Lock,
  Smartphone,
  CheckCircle
} from "lucide-react"

interface ImporterProfileModalProps {
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
    imports: number
    complianceLevel: string
  }
}

export function ImporterProfileModal({ open, onOpenChange, profileData }: ImporterProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState(profileData)
  const [activeTab, setActiveTab] = useState<'profile' | 'documents' | 'security'>('profile')
  const [isSaved, setIsSaved] = useState(false)
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      applications: true,
      returns: true,
      renewals: true,
      system: false
    },
    security: {
      twoFactorEnabled: false,
      loginAlerts: true,
      passwordLastChanged: '2024-08-15',
      sessionsCount: 3
    }
  })

  // Mock documents data
  const documents = [
    {
      id: 'DOC-001',
      name: 'Business License',
      type: 'License',
      status: 'Verified',
      uploadDate: '2024-01-15',
      size: '2.4 MB',
      downloadUrl: '#'
    },
    {
      id: 'DOC-002', 
      name: 'Tax Certificate',
      type: 'Certificate',
      status: 'Verified',
      uploadDate: '2024-01-20',
      size: '1.8 MB',
      downloadUrl: '#'
    },
    {
      id: 'DOC-003',
      name: 'Import Permit 2024',
      type: 'Permit',
      status: 'Pending Review',
      uploadDate: '2024-09-10',
      size: '3.1 MB',
      downloadUrl: '#'
    }
  ]

  const handleEdit = () => {
    setIsEditing(true)
    setEditedData(profileData)
  }

  const handleSave = () => {
    console.log('Saving profile data:', editedData)
    setIsEditing(false)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const handleCancel = () => {
    setEditedData(profileData)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }))
  }

  const handleSecurityChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value
      }
    }))
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-100 text-green-800'
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile & Settings
          </DialogTitle>
          <DialogDescription>
            Manage your profile, documents, and security settings
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'profile'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </div>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'documents'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </div>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'security'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </div>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <Avatar className="h-20 w-20">
                <AvatarImage src="/images/importer-avatar.png" alt="Profile" />
                <AvatarFallback className="text-xl bg-blue-100 text-blue-800">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-bold">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <p className="text-gray-600">{profileData.role}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {profileData.company}
                  </Badge>
                  <Badge variant="outline" className="border-gray-300">
                    {profileData.complianceLevel}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">License Number</p>
                <p className="font-semibold">{profileData.licenseNumber}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              {!isEditing ? (
                <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button onClick={handleCancel} variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              )}
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        value={editedData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded border">
                        {profileData.firstName}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={editedData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded border">
                        {profileData.lastName}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      {profileData.email}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editedData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      {profileData.phone}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={editedData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      {profileData.location}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={editedData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border min-h-[80px]">
                      {profileData.bio || 'No bio added yet.'}
                    </div>
                  )}
                </div>
              </div>

              {/* Company Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Information
                </h4>

                <div>
                  <Label htmlFor="company">Company Name</Label>
                  {isEditing ? (
                    <Input
                      id="company"
                      value={editedData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      {profileData.company}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  {isEditing ? (
                    <Input
                      id="role"
                      value={editedData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border">
                      {profileData.role}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <div className="p-2 bg-gray-50 rounded border flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    {profileData.licenseNumber}
                  </div>
                </div>

                <div>
                  <Label htmlFor="licenseDate">License Issue Date</Label>
                  <div className="p-2 bg-gray-50 rounded border flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    {profileData.licenseDate}
                  </div>
                </div>

                {/* Statistics */}
                <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-blue-800">Import Statistics</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Imports:</span>
                      <p className="font-semibold">{profileData.imports}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Compliance Level:</span>
                      <p className="font-semibold text-green-600">{profileData.complianceLevel}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Active Since:</span>
                      <p className="font-semibold">{profileData.licenseDate}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <p className="font-semibold text-green-600">Active License</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Management
                </h3>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>

              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 mt-1 text-gray-500" />
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-sm text-gray-600">{doc.type} • {doc.size} • Uploaded {doc.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getDocumentStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </h3>

              <div className="space-y-6">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-yellow-800">Two-Factor Authentication</h4>
                      <p className="text-sm text-yellow-700">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={settings.security.twoFactorEnabled}
                      onCheckedChange={(value) => handleSecurityChange('twoFactorEnabled', value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Login & Session Management</h4>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Login Alerts</p>
                        <p className="text-sm text-gray-600">Get notified of new login attempts</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.security.loginAlerts}
                      onCheckedChange={(value) => handleSecurityChange('loginAlerts', value)}
                    />
                  </div>

                  <div className="p-3 bg-gray-50 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">Password</p>
                      <Button variant="outline" size="sm">
                        <Lock className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">
                      Last changed: {settings.security.passwordLastChanged}
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Active Sessions</p>
                        <p className="text-sm text-gray-600">{settings.security.sessionsCount} active sessions</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage Sessions
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {isSaved && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Changes saved successfully!
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}