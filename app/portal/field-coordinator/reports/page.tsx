"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  FileText, 
  Download, 
  Filter, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight
} from "lucide-react"
import Link from "next/link"

const complianceReports = [
  {
    id: 1,
    title: "Monthly Compliance Summary",
    description: "Overview of compliance status across all farms",
    date: "2023-12-31",
    type: "Compliance",
  },
  {
    id: 2,
    title: "Quarterly Compliance Trends",
    description: "Analysis of compliance trends over Q4 2023",
    date: "2023-12-15",
    type: "Compliance",
  },
  {
    id: 3,
    title: "Annual Compliance Report",
    description: "Comprehensive annual compliance analysis for 2023",
    date: "2023-12-31",
    type: "Compliance",
  },
]

const fieldVisitReports = [
  {
    id: 4,
    title: "Field Visit Summary - December 2023",
    description: "Summary of all field visits conducted in December",
    date: "2023-12-31",
    type: "Field Visits",
  },
  {
    id: 5,
    title: "Field Visit Effectiveness Analysis",
    description: "Analysis of field visit impact on farm performance",
    date: "2023-12-20",
    type: "Field Visits",
  },
  {
    id: 6,
    title: "Quarterly Field Visit Report",
    description: "Comprehensive report of Q4 2023 field visits",
    date: "2023-12-31",
    type: "Field Visits",
  },
]

const cropAnalysisReports = [
  {
    id: 7,
    title: "Sugarcane Yield Analysis",
    description: "Analysis of sugarcane yield across all farms",
    date: "2023-12-25",
    type: "Crop Analysis",
  },
  {
    id: 8,
    title: "Crop Disease Monitoring Report",
    description: "Status of crop diseases and mitigation measures",
    date: "2023-12-18",
    type: "Crop Analysis",
  },
  {
    id: 9,
    title: "Seasonal Crop Performance",
    description: "Performance analysis for the current growing season",
    date: "2023-12-30",
    type: "Crop Analysis",
  },
]

export default function ReportsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-gray-500">View and generate reports for your jurisdiction</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter Reports
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate New Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Compliance Reports
              </CardTitle>
              <CardDescription>
                {complianceReports.length} reports available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/portal/field-coordinator/reports/compliance">
                  View All Compliance Reports
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Field Visit Reports
              </CardTitle>
              <CardDescription>
                {fieldVisitReports.length} reports available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/portal/field-coordinator/reports/field-visits">
                  View All Field Visit Reports
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-500" />
                Crop Analysis Reports
              </CardTitle>
              <CardDescription>
                {cropAnalysisReports.length} reports available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/portal/field-coordinator/reports/crop-analysis">
                  View All Crop Analysis Reports
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="compliance">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
            <TabsTrigger value="field-visits">Field Visit Reports</TabsTrigger>
            <TabsTrigger value="crop-analysis">Crop Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="compliance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Recent Compliance Reports
                </CardTitle>
                <CardDescription>
                  View and download compliance reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-gray-500">{report.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {report.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{report.date}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="field-visits" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Field Visit Reports
                </CardTitle>
                <CardDescription>
                  View and download field visit reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fieldVisitReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-gray-500">{report.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {report.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{report.date}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="crop-analysis" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Recent Crop Analysis Reports
                </CardTitle>
                <CardDescription>
                  View and download crop analysis reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cropAnalysisReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-gray-500">{report.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {report.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{report.date}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
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
