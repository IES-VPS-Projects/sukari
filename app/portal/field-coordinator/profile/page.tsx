"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  CheckCircle, 
  Edit, 
  Clock, 
  Award
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"

// Mock profile data
const profileData = {
  name: "John Doe",
  role: "Field Coordinator",
  department: "Western Region",
  employeeId: "FC-2023-045",
  joinDate: "2020-03-15",
  location: "Kisumu County Office",
  phone: "+254 733 444 555",
  email: "fieldcoord@ksb.go.ke",
  bio: "Experienced field coordinator with over 5 years of experience in agricultural monitoring and compliance. Specialized in sugarcane farming practices and regulatory compliance in the Western Region of Kenya.",
  expertise: ["Sugarcane Farming", "Compliance Monitoring", "Farm Inspections", "Regulatory Affairs"],
  education: "Bachelor of Science in Agricultural Economics, University of Nairobi",
  languages: ["English", "Kiswahili", "Luo"]
}

// Mock recent activities
const recentActivities = [
  {
    id: 1,
    type: "Farm Visit",
    description: "Conducted compliance inspection at Green Valley Farm",
    date: "2023-12-20",
    time: "10:30 AM",
  },
  {
    id: 2,
    type: "Report Submission",
    description: "Submitted monthly compliance report for Western Region",
    date: "2023-12-15",
    time: "02:45 PM",
  },
  {
    id: 3,
    type: "Training",
    description: "Completed advanced compliance monitoring certification",
    date: "2023-12-10",
    time: "09:00 AM",
  },
]

// Mock performance metrics
const performanceMetrics = [
  {
    metric: "Farms Monitored",
    value: "247",
    target: "250",
    performance: "98.8%",
  },
  {
    metric: "Compliance Reports",
    value: "156",
    target: "150",
    performance: "104%",
  },
  {
    metric: "Issue Resolution Rate",
    value: "92%",
    target: "90%",
    performance: "102.2%",
  },
  {
    metric: "Average Response Time",
    value: "1.2 days",
    target: "2 days",
    performance: "140%",
  },
]

// Mock achievements
const achievements = [
  {
    id: 1,
    title: "Top Performer - Q4 2023",
    description: "Recognized for exceptional performance in compliance monitoring",
    date: "2023-12-15",
  },
  {
    id: 2,
    title: "Perfect Attendance",
    description: "Maintained 100% field visit attendance for 12 consecutive months",
    date: "2023-11-30",
  },
  {
    id: 3,
    title: "Innovation Award",
    description: "Developed improved farm inspection methodology",
    date: "2023-10-15",
  },
]

export default function ProfilePage() {
  const { user } = useAuth()
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Summary Card */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="text-2xl">
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "JD"}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user?.name || profileData.name}</h2>
                  <p className="text-gray-500">{profileData.role}</p>
                  <Badge className="mt-2">{profileData.department}</Badge>
                  
                  <div className="w-full border-t mt-6 pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{user?.email || profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Joined {profileData.joinDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{profileData.bio}</p>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Areas of Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.expertise.map((item, index) => (
                      <Badge key={index} variant="secondary">{item}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Education</h3>
                  <p>{profileData.education}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Languages</h3>
                  <p>{profileData.languages.join(", ")}</p>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="performance">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="activities">Recent Activities</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="performance" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Performance Metrics
                    </CardTitle>
                    <CardDescription>
                      Your performance metrics for the current quarter
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {performanceMetrics.map((metric, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">{metric.metric}</h3>
                            <Badge variant={
                              parseFloat(metric.performance) >= 100 ? "default" : 
                              parseFloat(metric.performance) >= 90 ? "secondary" : 
                              "destructive"
                            }>
                              {metric.performance}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Current: {metric.value}</span>
                            <span>Target: {metric.target}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activities" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Activities
                    </CardTitle>
                    <CardDescription>
                      Your most recent activities and actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <Badge variant="outline">{activity.type}</Badge>
                            <div className="text-sm text-gray-500">
                              {activity.date} at {activity.time}
                            </div>
                          </div>
                          <p>{activity.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Achievements & Recognition
                    </CardTitle>
                    <CardDescription>
                      Your achievements and recognitions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="h-4 w-4 text-yellow-500" />
                            <h3 className="font-medium">{achievement.title}</h3>
                          </div>
                          <p className="text-sm mb-2">{achievement.description}</p>
                          <div className="text-xs text-gray-500">
                            Awarded on {achievement.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
