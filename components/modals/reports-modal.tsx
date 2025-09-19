"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, CheckCircle, Calendar, BarChart3, Eye } from "lucide-react"

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

interface ReportsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReportsModal({ open, onOpenChange }: ReportsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Reports Management
          </DialogTitle>
          <DialogDescription>
            View and generate reports for your jurisdiction
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-end mb-4">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate New Report
          </Button>
        </div>
        
        <Tabs defaultValue="compliance" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="field-visits">Field Visits</TabsTrigger>
            <TabsTrigger value="crop-analysis">Crop Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compliance" className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Compliance Reports
            </h3>
            
            <div className="space-y-3">
              {complianceReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{report.title}</h4>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {report.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{report.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="field-visits" className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Field Visit Reports
            </h3>
            
            <div className="space-y-3">
              {fieldVisitReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{report.title}</h4>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {report.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{report.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="crop-analysis" className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-orange-500" />
              Crop Analysis Reports
            </h3>
            
            <div className="space-y-3">
              {cropAnalysisReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{report.title}</h4>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {report.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{report.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
