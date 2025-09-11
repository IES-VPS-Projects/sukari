"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  Edit,
  Eye,
  User
} from "lucide-react"
import Link from "next/link"

// Mock data for farmer details
const farmerData = {
  id: 1,
  name: "Mary Johnson",
  location: "Kisumu County, Western Region",
  address: "P.O. Box 123, Kisumu",
  contact: "+254 712 345 678",
  email: "mary.johnson@example.com",
  status: "Active",
  registrationDate: "2020-05-10",
  nationalId: "12345678",
  gender: "Female",
  dateOfBirth: "1985-06-15",
  bio: "Mary Johnson is an experienced farmer with over 15 years in sugarcane cultivation. She manages multiple farms in Kisumu County and has been recognized for implementing sustainable farming practices."
}

// Mock data for farms
const farms = [
  {
    id: 1,
    name: "Green Valley Farm",
    location: "Kisumu County, Western Region",
    size: "120 acres",
    cropType: "Sugarcane",
    status: "Active",
    complianceScore: 92,
    lastVisit: "2023-12-15",
  },
  {
    id: 2,
    name: "Riverside Plantation",
    location: "Kisumu County, Western Region",
    size: "85 acres",
    cropType: "Sugarcane",
    status: "Active",
    complianceScore: 87,
    lastVisit: "2023-12-10",
  },
]

// Mock data for recent activities
const activities = [
  {
    id: 1,
    date: "2023-12-15",
    type: "Farm Visit",
    description: "Compliance check conducted at Green Valley Farm",
    status: "Completed"
  },
  {
    id: 2,
    date: "2023-11-20",
    type: "Documentation",
    description: "Updated farm registration documents",
    status: "Completed"
  },
  {
    id: 3,
    date: "2023-10-05",
    type: "Training",
    description: "Attended sustainable farming practices workshop",
    status: "Completed"
  },
]

export default function FarmerDetailPage({ params }: { params: { id: string } }) {
  const farmerId = parseInt(params.id)
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/portal/field-coordinator/farmers">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Farmers
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {farmerData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{farmerData.name}</h1>
                <Badge variant={farmerData.status === "Active" ? "default" : "secondary"}>
                  {farmerData.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin className="h-4 w-4" />
                  {farmerData.location}
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar className="h-4 w-4" />
                  Registered: {farmerData.registrationDate}
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p>{farmerData.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Gender</p>
                <p>{farmerData.gender}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                <p>{farmerData.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">National ID</p>
                <p>{farmerData.nationalId}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Phone Number</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p>{farmerData.contact}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email Address</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <p>{farmerData.email}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Physical Address</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <p>{farmerData.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Farm Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Farms</p>
                <p>{farms.length} farms</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Area</p>
                <p>205 acres</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Primary Crop</p>
                <p>Sugarcane</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Average Compliance</p>
                <p>89.5%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Farmer Biography</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{farmerData.bio}</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="farms">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="farms">Managed Farms</TabsTrigger>
            <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          </TabsList>
          <TabsContent value="farms" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Farms Managed by {farmerData.name}
                </CardTitle>
                <CardDescription>
                  Total of {farms.length} farms registered under this farmer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farms.map((farm) => (
                    <div key={farm.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{farm.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <MapPin className="h-3 w-3" />
                            {farm.location}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline">{farm.size}</Badge>
                            <Badge variant="outline">{farm.cropType}</Badge>
                            <Badge variant={farm.status === "Active" ? "default" : "secondary"}>
                              {farm.status}
                            </Badge>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="text-gray-500">Last Visit: </span>
                            {farm.lastVisit}
                          </div>
                          <div className="mt-1 text-sm">
                            <span className="text-gray-500">Compliance Score: </span>
                            <span className={
                              farm.complianceScore >= 90 ? "text-green-600" :
                              farm.complianceScore >= 80 ? "text-yellow-600" :
                              "text-red-600"
                            }>
                              {farm.complianceScore}%
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/portal/field-coordinator/farms/${farm.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="ml-1">View</span>
                          </Link>
                        </Button>
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
                  <Calendar className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
                <CardDescription>
                  Recent activities and interactions with {farmerData.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{activity.type}</Badge>
                          <span className="text-sm text-gray-500">{activity.date}</span>
                        </div>
                        <Badge>{activity.status}</Badge>
                      </div>
                      <p className="text-sm">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
