"use client"

import { useState } from "react"
import { Camera, Mail, Phone, MapPin, Calendar, Shield, Activity, Save, X, Edit3, FileText, GraduationCap, ArrowRightLeft, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { PortalLayout } from "@/components/portal-layout"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "Jude",
    lastName: "Chesire",
    email: "jude.chesire@ksb.go.ke",
    phone: "+254 712 345 678",
    location: "Nairobi, Kenya",
    department: "Executive Management",
    role: "Chief Executive Officer",
    bio: "Experienced executive leader with over 15 years in agricultural management and sugar industry development. Specialized in strategic leadership, policy development, and stakeholder relationship management across the sugar value chain.",
    joinDate: "January 2020",
    employeeId: "KSB-2020-001",
  })

  const [formData, setFormData] = useState(profileData)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setProfileData(formData)
    setIsEditing(false)
    // Here you would typically make an API call to save the data
  }

  const handleCancel = () => {
    setFormData(profileData)
    setIsEditing(false)
  }

  const activityStats = [
    { label: "Mills Monitored", value: 47, total: 50, color: "bg-green-500" },
    { label: "Inspections Completed", value: 234, total: 250, color: "bg-blue-500" },
    { label: "Compliance Rate", value: 94, total: 100, color: "bg-purple-500" },
    { label: "Reports Generated", value: 156, total: 200, color: "bg-orange-500" },
  ]

  const recentActivity = [
    { action: "Completed mill inspection", target: "Mumias Sugar Mill", time: "2 hours ago", type: "visit" },
    { action: "Generated compliance report", target: "Q4 2024 Report", time: "1 day ago", type: "report" },
    { action: "Updated stakeholder profile", target: "West Kenya Sugar Co.", time: "2 days ago", type: "update" },
    { action: "Scheduled mill visit", target: "Nzoia Sugar Mill", time: "3 days ago", type: "schedule" },
  ]

  return (
    <PortalLayout pageTitle="Profile">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600">Manage your personal information and view your activity</p>
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-green-600 hover:bg-green-700 text-white">
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Profile Picture and Basic Info */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>Update your profile picture and basic information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src="/placeholder.svg?height=128&width=128" />
                        <AvatarFallback className="text-2xl">
                          {formData.firstName[0]}
                          {formData.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                          variant="secondary"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">
                        {formData.firstName} {formData.lastName}
                      </h3>
                      <p className="text-sm text-muted-foreground">{formData.role}</p>
                      <Badge variant="secondary" className="mt-2">
                        {formData.department}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined {formData.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span>ID: {formData.employeeId}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information Form */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) => handleInputChange("department", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => handleInputChange("role", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your recent actions and activities in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          activity.type === "visit"
                            ? "bg-green-500"
                            : activity.type === "report"
                              ? "bg-blue-500"
                              : activity.type === "update"
                                ? "bg-orange-500"
                                : "bg-purple-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.target}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {activityStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{stat.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{stat.value}</span>
                        <span className="text-sm text-muted-foreground">of {stat.total}</span>
                      </div>
                      <Progress value={(stat.value / stat.total) * 100} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        {Math.round((stat.value / stat.total) * 100)}% completion rate
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Your performance metrics for the current quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">94%</div>
                    <p className="text-sm text-muted-foreground">Compliance Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">4.8</div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">156</div>
                    <p className="text-sm text-muted-foreground">Reports Generated</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Leave Application */}
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-green-600" />
                    Leave Application
                  </CardTitle>
                  <CardDescription>
                    Apply for annual, sick, or personal leave
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <p>• Annual leave: 21 days remaining</p>
                      <p>• Sick leave: 14 days remaining</p>
                      <p>• Personal leave: 7 days remaining</p>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <FileText className="mr-2 h-4 w-4" />
                      Apply for Leave
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Training Application */}
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <GraduationCap className="h-5 w-5 text-green-600" />
                    Training Application
                  </CardTitle>
                  <CardDescription>
                    Apply for proffesional and training programs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <p>• Leadership development</p>
                      <p>• Technical skills training</p>
                      <p>• External certifications</p>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Apply for Training
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Transfer Application */}
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ArrowRightLeft className="h-5 w-5 text-green-600" />
                    Transfer Application
                  </CardTitle>
                  <CardDescription>
                    Apply for department or location transfer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <p>• Internal department transfer</p>
                      <p>• Regional office transfer</p>
                      <p>• Temporary assignments</p>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <ArrowRightLeft className="mr-2 h-4 w-4" />
                      Apply for Transfer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Applications
                </CardTitle>
                <CardDescription>Track the status of your submitted applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="font-medium">Annual Leave - December 2024</p>
                        <p className="text-sm text-gray-600">Applied on: Aug 15, 2025</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="font-medium">Leadership Training Program</p>
                        <p className="text-sm text-gray-600">Applied on: Aug 10, 2025</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <ArrowRightLeft className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="font-medium">Transfer to Mombasa Office</p>
                        <p className="text-sm text-gray-600">Applied on: Jul 28, 2025</p>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Declined</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  )
}
