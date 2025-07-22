"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Sparkles, BarChart3, FileText, TrendingUp } from "lucide-react"
import { format } from "date-fns"

interface CustomReportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const reportTypes = [
  {
    id: "production",
    name: "Production Analysis",
    icon: BarChart3,
    description: "Analyze production metrics and trends",
  },
  {
    id: "financial",
    name: "Financial Performance",
    icon: TrendingUp,
    description: "Revenue, costs, and profitability analysis",
  },
  { id: "compliance", name: "Compliance Report", icon: FileText, description: "Regulatory compliance and violations" },
  {
    id: "stakeholder",
    name: "Stakeholder Analysis",
    icon: FileText,
    description: "Stakeholder engagement and satisfaction",
  },
]

const dataPoints = [
  { id: "production_volume", name: "Production Volume", category: "production" },
  { id: "quality_metrics", name: "Quality Metrics", category: "production" },
  { id: "revenue", name: "Revenue", category: "financial" },
  { id: "costs", name: "Operating Costs", category: "financial" },
  { id: "compliance_rate", name: "Compliance Rate", category: "compliance" },
  { id: "violations", name: "Violations", category: "compliance" },
  { id: "farmer_satisfaction", name: "Farmer Satisfaction", category: "stakeholder" },
  { id: "mill_performance", name: "Mill Performance", category: "stakeholder" },
]

export function CustomReportModal({ open, onOpenChange }: CustomReportModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    reportName: "",
    reportType: "",
    description: "",
    dateRange: "last_month",
    customStartDate: undefined as Date | undefined,
    customEndDate: undefined as Date | undefined,
    selectedDataPoints: [] as string[],
    filters: {
      regions: [] as string[],
      mills: [] as string[],
      categories: [] as string[],
    },
    outputFormat: "pdf",
    aiInsights: true,
  })

  const handleDataPointToggle = (dataPointId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedDataPoints: prev.selectedDataPoints.includes(dataPointId)
        ? prev.selectedDataPoints.filter((id) => id !== dataPointId)
        : [...prev.selectedDataPoints, dataPointId],
    }))
  }

  const handleSubmit = () => {
    // Handle report generation with AI
    console.log("Generating custom report:", formData)
    onOpenChange(false)
    // Reset form
    setStep(1)
    setFormData({
      reportName: "",
      reportType: "",
      description: "",
      dateRange: "last_month",
      customStartDate: undefined,
      customEndDate: undefined,
      selectedDataPoints: [],
      filters: { regions: [], mills: [], categories: [] },
      outputFormat: "pdf",
      aiInsights: true,
    })
  }

  const filteredDataPoints = formData.reportType
    ? dataPoints.filter((dp) => dp.category === formData.reportType)
    : dataPoints

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Generate Custom Report
          </DialogTitle>
          <DialogDescription>Create a personalized report using AI-powered analytics</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && <div className={`w-16 h-1 ${step > stepNumber ? "bg-green-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportName">Report Name</Label>
                  <Input
                    id="reportName"
                    placeholder="e.g., Q4 Production Analysis"
                    value={formData.reportName}
                    onChange={(e) => setFormData({ ...formData, reportName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select
                    value={formData.reportType}
                    onValueChange={(value) => setFormData({ ...formData, reportType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you want to analyze..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              {formData.reportType && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {reportTypes.find((t) => t.id === formData.reportType)?.name}
                    </CardTitle>
                    <CardDescription>
                      {reportTypes.find((t) => t.id === formData.reportType)?.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}
            </div>
          )}

          {/* Step 2: Data Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Date Range</Label>
                  <Select
                    value={formData.dateRange}
                    onValueChange={(value) => setFormData({ ...formData, dateRange: value })}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last_week">Last Week</SelectItem>
                      <SelectItem value="last_month">Last Month</SelectItem>
                      <SelectItem value="last_quarter">Last Quarter</SelectItem>
                      <SelectItem value="last_year">Last Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.dateRange === "custom" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.customStartDate ? format(formData.customStartDate, "PPP") : "Pick start date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.customStartDate}
                            onSelect={(date) => setFormData({ ...formData, customStartDate: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.customEndDate ? format(formData.customEndDate, "PPP") : "Pick end date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.customEndDate}
                            onSelect={(date) => setFormData({ ...formData, customEndDate: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label>Data Points to Include</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredDataPoints.map((dataPoint) => (
                    <div key={dataPoint.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={dataPoint.id}
                        checked={formData.selectedDataPoints.includes(dataPoint.id)}
                        onCheckedChange={() => handleDataPointToggle(dataPoint.id)}
                      />
                      <Label htmlFor={dataPoint.id} className="text-sm font-normal">
                        {dataPoint.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Configuration */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Output Format</Label>
                    <Select
                      value={formData.outputFormat}
                      onValueChange={(value) => setFormData({ ...formData, outputFormat: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Report</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="powerpoint">PowerPoint Presentation</SelectItem>
                        <SelectItem value="dashboard">Interactive Dashboard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="aiInsights"
                      checked={formData.aiInsights}
                      onCheckedChange={(checked) => setFormData({ ...formData, aiInsights: checked as boolean })}
                    />
                    <Label htmlFor="aiInsights" className="text-sm">
                      Include AI-generated insights and recommendations
                    </Label>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Report Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-medium">Name:</span> {formData.reportName || "Untitled Report"}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span>{" "}
                      {reportTypes.find((t) => t.id === formData.reportType)?.name || "Not selected"}
                    </div>
                    <div>
                      <span className="font-medium">Data Points:</span> {formData.selectedDataPoints.length} selected
                    </div>
                    <div>
                      <span className="font-medium">Format:</span> {formData.outputFormat.toUpperCase()}
                    </div>
                    {formData.aiInsights && (
                      <Badge className="bg-purple-100 text-purple-800">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI Insights Enabled
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={() => (step > 1 ? setStep(step - 1) : onOpenChange(false))}>
              {step > 1 ? "Previous" : "Cancel"}
            </Button>
            <Button
              onClick={() => (step < 3 ? setStep(step + 1) : handleSubmit())}
              className="bg-green-600 hover:bg-green-700"
              disabled={step === 1 && (!formData.reportName || !formData.reportType)}
            >
              {step < 3 ? "Next" : "Generate Report"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
