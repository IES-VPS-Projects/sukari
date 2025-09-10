"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Building2, Mail, Phone, MapPin, FileText, Calendar, Edit, Save, X } from "lucide-react"

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

  const handleEdit = () => {
    setIsEditing(true)
    setEditedData(profileData)
  }

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving profile data:', editedData)
    setIsEditing(false)
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </DialogTitle>
          <DialogDescription>
            View and manage your personal and company information
          </DialogDescription>
        </DialogHeader>

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
                    className="min-h-[100px]"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded border min-h-[100px]">
                    {profileData.bio}
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
                  <div className="p-2 bg-gray-50 rounded border">
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

              <div>
                <Label htmlFor="organization">Organization Type</Label>
                <div className="p-2 bg-gray-50 rounded border">
                  {profileData.organization}
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
      </DialogContent>
    </Dialog>
  )
}
