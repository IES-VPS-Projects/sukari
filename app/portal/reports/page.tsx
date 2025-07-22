"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Search, TrendingUp, AlertTriangle, CheckCircle, DollarSign } from "lucide-react"
import { ReviewPolicyModal } from "@/components/modals/review-policy-modal"
import { CustomReportModal } from "@/components/modals/custom-report-modal"

const reportCategories = [
  {
    title: "Operational Reports",
    icon: TrendingUp,
    reports: [
      { name: "Production Efficiency by Mill", lastUpdated: "2 hours ago", status: "ready" },
      { name: "Supply Chain Performance Metrics", lastUpdated: "1 day ago", status: "ready" },
      { name: "Quality Control Summary", lastUpdated: "3 hours ago", status: "ready" },
      { name: "Resource Utilization Analysis", lastUpdated: "5 hours ago", status: "processing" },
    ],
  },
  {
    title: "Financial Reports",
    icon: DollarSign,
    reports: [
      { name: "Revenue Performance vs Budget", lastUpdated: "1 hour ago", status: "ready" },
      { name: "Levy Collection Efficiency", lastUpdated: "4 hours ago", status: "ready" },
      { name: "Cost-Benefit Analysis of Programs", lastUpdated: "1 day ago", status: "ready" },
      { name: "ROI on Infrastructure Investments", lastUpdated: "2 days ago", status: "ready" },
    ],
  },
  {
    title: "Compliance/Regulatory Reports",
    icon: AlertTriangle,
    reports: [
      { name: "License Renewal Status", lastUpdated: "30 min ago", status: "ready" },
      { name: "Violation Trending Analysis", lastUpdated: "2 hours ago", status: "ready" },
      { name: "Policy Compliance Rates", lastUpdated: "6 hours ago", status: "ready" },
      { name: "International Standard Adherence", lastUpdated: "1 day ago", status: "processing" },
    ],
  },
  {
    title: "KPI Reports",
    icon: CheckCircle,
    reports: [
      { name: "Strategic Objective Achievement", lastUpdated: "1 hour ago", status: "ready" },
      { name: "Sectoral Performance Benchmarking", lastUpdated: "3 hours ago", status: "ready" },
      { name: "Stakeholder Satisfaction Metrics", lastUpdated: "5 hours ago", status: "ready" },
      { name: "Digital Transformation Progress", lastUpdated: "1 day ago", status: "ready" },
    ],
  },
]

export default function ReportsPage() {
  const [reviewPolicyOpen, setReviewPolicyOpen] = useState(false)
  const [customReportOpen, setCustomReportOpen] = useState(false)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Access and generate comprehensive sector reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setReviewPolicyOpen(true)}>
            Review Policy
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => setCustomReportOpen(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Generate Custom Report
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search reports..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="kpi">KPI Reports</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Report Categories */}
      <div className="space-y-6">
        {reportCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-5 w-5 text-green-600" />
                {category.title}
              </CardTitle>
              <CardDescription>{category.reports.length} reports available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.reports.map((report) => (
                  <div key={report.name} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm">{report.name}</h3>
                      <Badge
                        variant={report.status === "ready" ? "default" : "secondary"}
                        className={report.status === "ready" ? "bg-green-100 text-green-800" : ""}
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">Last updated: {report.lastUpdated}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={report.status !== "ready"}
                        className="flex-1 bg-transparent"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" disabled={report.status !== "ready"}>
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recently Accessed */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Accessed Reports</CardTitle>
          <CardDescription>Your most frequently viewed reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Production Efficiency by Mill", accessed: "2 hours ago", views: 15 },
              { name: "Revenue Performance vs Budget", accessed: "1 day ago", views: 8 },
              { name: "License Renewal Status", accessed: "2 days ago", views: 12 },
            ].map((report) => (
              <div key={report.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{report.name}</p>
                  <p className="text-xs text-gray-600">Last accessed: {report.accessed}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs">
                    {report.views} views
                  </Badge>
                  <Button size="sm" variant="outline">
                    <FileText className="h-3 w-3 mr-1" />
                    Open
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ReviewPolicyModal open={reviewPolicyOpen} onOpenChange={setReviewPolicyOpen} />
      <CustomReportModal open={customReportOpen} onOpenChange={setCustomReportOpen} />
    </div>
  )
}
