"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Search, TrendingUp, AlertTriangle, CheckCircle, DollarSign, Plus, Filter, MoreHorizontal, Share, Grid, List, Calendar, Eye, FileSpreadsheet, ChevronDown } from "lucide-react"
import { ReviewPolicyModal } from "@/components/modals/review-policy-modal"
import { CustomReportModal } from "@/components/modals/custom-report-modal"

// Sample reports data
const reportsData = [
  {
    id: 1,
    title: "Compliance Audit Report",
    category: "Compliance",
    date: "28/07/2025",
    size: "3.2 MB",
    status: "Draft",
    lastModified: "2 days ago",
    icon: FileText
  },
  {
    id: 2,
    title: "Monthly Production Summary - November 2024",
    category: "Operational",
    date: "26/07/2025",
    size: "2.4 MB",
    status: "Published",
    lastModified: "4 days ago",
    icon: FileText
  },
  {
    id: 3,
    title: "Financial Performance Q3 2024",
    category: "Financial",
    date: "21/07/2025",
    size: "1.8 MB",
    status: "Published",
    lastModified: "1 week ago",
    icon: FileText
  }
]

// Recently viewed reports
const recentlyViewedReports = [
  {
    title: "Monthly Production Summary - November 2024",
    date: "26/07/2025"
  },
  {
    title: "Financial Performance Q3 2024",
    date: "21/07/2025"
  },
  {
    title: "Compliance Audit Report",
    date: "28/07/2025"
  }
]

// Categories for navigation
const categories = [
  { id: "all", label: "All Reports", icon: FileText, active: true },
  { id: "operational", label: "Operational", icon: TrendingUp, active: false },
  { id: "financial", label: "Financial", icon: DollarSign, active: false },
  { id: "compliance", label: "Compliance", icon: AlertTriangle, active: false },
  { id: "kpi", label: "KPI Reports", icon: CheckCircle, active: false }
]

export default function ReportsPage() {
  const [reviewPolicyOpen, setReviewPolicyOpen] = useState(false)
  const [customReportOpen, setCustomReportOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [searchQuery, setSearchQuery] = useState("")

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Reports Center</h1>
          <p className="text-gray-600 mt-1">Access and manage all KSB reports</p>
        </div>

        {/* Search and Filter Bar - Extended across full width */}
        <div className="bg-white border-b px-6 py-4 mx-6 rounded-lg shadow-sm mb-6">
          <div className="flex items-center gap-4">
            {/* Search Bar - Expanded to take remaining space */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Right Controls Group */}
            <div className="flex items-center gap-2">
              {/* Sort by Date */}
              <Select defaultValue="date">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="size">Sort by Size</SelectItem>
                  <SelectItem value="category">Sort by Category</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Filters Button */}
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              {/* Generate Report Button */}
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setCustomReportOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex gap-6 px-6">
          {/* Left Sidebar - Categories */}
          <div className="w-80 bg-white border rounded-lg p-6 h-fit">
            {/* Categories Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                        ${selectedCategory === category.id 
                          ? 'bg-green-100 text-green-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-100'
                        }
                      `}
                    >
                      <Icon className="h-4 w-4" />
                      {category.label}
                    </button>
                  )
                })}
              </div>
            </div>
            
            {/* Recently Viewed Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recently Viewed</h2>
              <div className="space-y-3">
                {recentlyViewedReports.map((report, index) => (
                  <div key={index} className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{report.title}</h3>
                    <p className="text-xs text-gray-500">{report.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {/* Reports Section */}
            <Card>
              <CardContent className="p-6">
                {/* Content Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-900">3 Reports</h2>
                  </div>
                  
                  {/* View Toggle */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Horizontal Border */}
                <hr className="border-gray-200 mb-6" />

                {/* Reports List */}
                <div className={`space-y-4 ${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 space-y-0" : ""}`}>
                  {reportsData.map((report) => {
                    const Icon = report.icon
                    return (
                      <div key={report.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Icon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">{report.title}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Badge variant="outline" className="text-xs">
                                  {report.category}
                                </Badge>
                                <span>•</span>
                                <span>{report.date}</span>
                                <span>•</span>
                                <span>{report.size}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={report.status === "Published" ? "default" : "secondary"}
                              className={report.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                            >
                              {report.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 mb-4">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Eye className="h-4 w-4 mr-2" />
                            View Report
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileSpreadsheet className="h-4 w-4 mr-2" />
                            Export Excel
                          </Button>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Last modified {report.lastModified}</span>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Share className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Custom Report Generator Section */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Plus className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Custom Report Generator</h3>
                    <p className="text-gray-600">Create custom reports with specific metrics and date ranges</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => setCustomReportOpen(true)}
                  >
                    Production Report
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setCustomReportOpen(true)}
                  >
                    Financial Summary
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setCustomReportOpen(true)}
                  >
                    Compliance Audit
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setCustomReportOpen(true)}
                  >
                    Custom Builder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ReviewPolicyModal open={reviewPolicyOpen} onOpenChange={setReviewPolicyOpen} />
      <CustomReportModal open={customReportOpen} onOpenChange={setCustomReportOpen} />
    </div>
  )
}
