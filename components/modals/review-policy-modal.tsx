"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Download, Edit, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface ReviewPolicyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const policies = [
  {
    id: 1,
    title: "Sugar Production Standards",
    version: "v2.1",
    lastUpdated: "2024-11-15",
    status: "active",
    category: "production",
    description: "Guidelines for sugar production quality and safety standards",
    content: `
# Sugar Production Standards Policy

## 1. Quality Control Requirements
- All sugar production must meet ISO 9001:2015 standards
- Regular quality testing at minimum intervals of 2 hours
- Moisture content must not exceed 0.04%
- Color specification: ICUMSA 45 or better

## 2. Safety Protocols
- All personnel must wear appropriate PPE
- Emergency procedures must be clearly posted
- Regular safety drills every quarter
- Incident reporting within 24 hours

## 3. Environmental Compliance
- Waste water treatment standards
- Air emission controls
- Solid waste management protocols
- Environmental impact assessments
    `,
  },
  {
    id: 2,
    title: "Compliance Monitoring Framework",
    version: "v1.8",
    lastUpdated: "2024-10-22",
    status: "under_review",
    category: "compliance",
    description: "Framework for monitoring and ensuring regulatory compliance",
    content: `
# Compliance Monitoring Framework

## 1. Monitoring Schedule
- Monthly compliance audits for all active mills
- Quarterly comprehensive reviews
- Annual third-party assessments
- Real-time monitoring systems

## 2. Violation Response
- Immediate notification protocols
- Corrective action timelines
- Escalation procedures
- Penalty structures

## 3. Reporting Requirements
- Weekly compliance reports
- Monthly trend analysis
- Quarterly board presentations
- Annual compliance summary
    `,
  },
  {
    id: 3,
    title: "Stakeholder Engagement Policy",
    version: "v3.0",
    lastUpdated: "2024-12-01",
    status: "draft",
    category: "stakeholder",
    description: "Guidelines for engaging with farmers, mills, and other stakeholders",
    content: `
# Stakeholder Engagement Policy

## 1. Farmer Relations
- Regular field visits and consultations
- Training and capacity building programs
- Fair pricing mechanisms
- Grievance handling procedures

## 2. Mill Partnerships
- Collaborative improvement programs
- Technical assistance provision
- Performance incentive structures
- Knowledge sharing platforms

## 3. Community Engagement
- Public consultation processes
- Community development initiatives
- Environmental stewardship programs
- Transparency and accountability measures
    `,
  },
]

export function ReviewPolicyModal({ open, onOpenChange }: ReviewPolicyModalProps) {
  const [selectedPolicy, setSelectedPolicy] = useState(policies[0])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "under_review":
        return <Clock className="h-4 w-4" />
      case "draft":
        return <Edit className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Policy Review Center</DialogTitle>
          <DialogDescription>Review and manage organizational policies and procedures</DialogDescription>
        </DialogHeader>

        <div className="flex h-[70vh] gap-4">
          {/* Policy List */}
          <div className="w-1/3 border-r pr-4">
            <h3 className="font-medium mb-4">Available Policies</h3>
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {policies.map((policy) => (
                  <Card
                    key={policy.id}
                    className={`cursor-pointer transition-colors ${
                      selectedPolicy.id === policy.id ? "border-green-200 bg-green-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedPolicy(policy)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm">{policy.title}</CardTitle>
                        <Badge className={`text-xs ${getStatusColor(policy.status)}`}>
                          {getStatusIcon(policy.status)}
                          <span className="ml-1">{policy.status.replace("_", " ")}</span>
                        </Badge>
                      </div>
                      <CardDescription className="text-xs">{policy.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{policy.version}</span>
                        <span>{policy.lastUpdated}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Policy Content */}
          <div className="flex-1">
            <Tabs defaultValue="content" className="h-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="content">Policy Content</TabsTrigger>
                  <TabsTrigger value="history">Version History</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance Status</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>

              <TabsContent value="content" className="h-[calc(100%-4rem)]">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{selectedPolicy.title}</CardTitle>
                        <CardDescription>
                          Version {selectedPolicy.version} • Last updated: {selectedPolicy.lastUpdated}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(selectedPolicy.status)}>
                        {getStatusIcon(selectedPolicy.status)}
                        <span className="ml-1">{selectedPolicy.status.replace("_", " ")}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                          {selectedPolicy.content}
                        </pre>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="h-[calc(100%-4rem)]">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Version History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          version: "v2.1",
                          date: "2024-11-15",
                          author: "Dr. Sarah Wanjiku",
                          changes: "Updated quality control requirements",
                        },
                        {
                          version: "v2.0",
                          date: "2024-09-10",
                          author: "John Kamau",
                          changes: "Major revision - added environmental compliance section",
                        },
                        {
                          version: "v1.9",
                          date: "2024-07-22",
                          author: "Mary Ochieng",
                          changes: "Minor updates to safety protocols",
                        },
                      ].map((version, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{version.version}</span>
                              <span className="text-sm text-gray-500">{version.date}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{version.changes}</p>
                            <p className="text-xs text-gray-500">by {version.author}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compliance" className="h-[calc(100%-4rem)]">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Compliance Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="font-medium">Compliant Mills</span>
                          </div>
                          <p className="text-2xl font-bold text-green-600">11</p>
                          <p className="text-sm text-gray-600">out of 15 active mills</p>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                            <span className="font-medium">Under Review</span>
                          </div>
                          <p className="text-2xl font-bold text-yellow-600">3</p>
                          <p className="text-sm text-gray-600">mills need attention</p>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            <span className="font-medium">Non-Compliant</span>
                          </div>
                          <p className="text-2xl font-bold text-red-600">1</p>
                          <p className="text-sm text-gray-600">immediate action required</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
