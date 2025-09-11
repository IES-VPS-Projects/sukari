"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  MapPin, 
  User, 
  Users, 
  BarChart3,
  Edit,
  Trash,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react"
import Link from "next/link"

// Mock data for farm details
const farmData = {
  id: 1,
  name: "Green Valley Farm",
  location: "Kisumu County, Western Region",
  coordinates: "-0.1022, 34.7617",
  size: "120 acres",
  cropType: "Sugarcane",
  status: "Active",
  complianceScore: 92,
  lastVisit: "2023-12-15",
  registrationDate: "2020-05-10",
  owner: {
    name: "Mary Johnson",
    contact: "+254 712 345 678",
    email: "mary.johnson@example.com"
  },
  workers: 45,
  description: "Green Valley Farm is a large-scale sugarcane farm located in Kisumu County. The farm has been operational since 2010 and supplies sugarcane to multiple processing facilities in the region. The farm implements modern agricultural practices and has a high compliance score with KSB regulations."
}

// Mock data for visits
const visits = [
  {
    id: 1,
    date: "2023-12-15",
    type: "Compliance Check",
    status: "Completed",
    findings: "All compliance standards met. Excellent crop management practices observed.",
    inspector: "John Doe"
  },
  {
    id: 2,
    date: "2023-10-20",
    type: "Crop Assessment",
    status: "Completed",
    findings: "Healthy crop growth. Recommended minor adjustments to irrigation schedule.",
    inspector: "John Doe"
  },
  {
    id: 3,
    date: "2023-08-05",
    type: "Disease Monitoring",
    status: "Completed",
    findings: "No signs of disease or pests. Preventative measures in place.",
    inspector: "Jane Smith"
  },
]

// Mock data for compliance issues
const complianceIssues = [
  {
    id: 1,
    date: "2023-07-12",
    issue: "Incomplete documentation",
    status: "Resolved",
    resolution: "All required documents submitted on 2023-07-20"
  },
  {
    id: 2,
    date: "2023-05-18",
    issue: "Water usage exceeding allocation",
    status: "Resolved",
    resolution: "Implemented water conservation measures and reduced usage by 15%"
  }
]

export default function FarmDetailPage({ params }: { params: { id: string } }) {
  const farmId = parseInt(params.id)
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/portal/field-coordinator/farms">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Farms
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{farmData.name}</h1>
              <Badge variant={farmData.status === "Active" ? "default" : "secondary"}>
                {farmData.status}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-gray-500 mt-1">
              <MapPin className="h-4 w-4" />
              {farmData.location}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/portal/field-coordinator/visits/new?farmId=${farmId}`}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Visit
              </Link>
            </Button>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Farm
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Farm Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Farm Size</p>
                <p>{farmData.size}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Crop Type</p>
                <p>{farmData.cropType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">GPS Coordinates</p>
                <p>{farmData.coordinates}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Registration Date</p>
                <p>{farmData.registrationDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Number of Workers</p>
                <p>{farmData.workers}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Owner Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Owner Name</p>
                <p>{farmData.owner.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Contact</p>
                <p>{farmData.owner.contact}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p>{farmData.owner.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Compliance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Compliance Score</p>
                <Badge variant={
                  farmData.complianceScore >= 90 ? "default" : 
                  farmData.complianceScore >= 80 ? "secondary" : 
                  "destructive"
                }>
                  {farmData.complianceScore}%
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Last Inspection</p>
                <p>{farmData.lastVisit}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Open Issues</p>
                <p>0 issues</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved Issues</p>
                <p>{complianceIssues.length} issues</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Farm Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{farmData.description}</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="visits">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visits">Field Visits</TabsTrigger>
            <TabsTrigger value="compliance">Compliance History</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="visits" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Field Visit History
                </CardTitle>
                <CardDescription>
                  Record of all visits to {farmData.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {visits.map((visit) => (
                    <div key={visit.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{visit.type}</Badge>
                          <span className="text-sm text-gray-500">{visit.date}</span>
                        </div>
                        <Badge>{visit.status}</Badge>
                      </div>
                      <p className="text-sm mb-2">{visit.findings}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="h-3 w-3" />
                        Inspector: {visit.inspector}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="compliance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Compliance Issues
                </CardTitle>
                <CardDescription>
                  History of compliance issues and their resolutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceIssues.map((issue) => (
                    <div key={issue.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{issue.issue}</span>
                          <span className="text-sm text-gray-500">{issue.date}</span>
                        </div>
                        <Badge variant="outline">{issue.status}</Badge>
                      </div>
                      <p className="text-sm">{issue.resolution}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Farm Reports
                </CardTitle>
                <CardDescription>
                  Generated reports for {farmData.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Annual Compliance Report</p>
                      <p className="text-sm text-gray-500">Generated on 2023-12-31</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Quarterly Production Analysis</p>
                      <p className="text-sm text-gray-500">Generated on 2023-10-01</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
