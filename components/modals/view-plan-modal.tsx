"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Target, TrendingUp, Calendar, Users, CheckCircle, AlertTriangle, Clock, Award } from "lucide-react"

interface ViewPlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const strategicObjectives = [
  {
    id: 1,
    title: "Increase Sugar Production",
    description: "Boost national sugar production by 25% through mill modernization and farmer support",
    progress: 78,
    status: "on_track",
    targetDate: "Dec 2024",
    kpis: [
      { name: "Production Volume", current: "18,247 MT", target: "22,000 MT", progress: 83 },
      { name: "Mill Efficiency", current: "87%", target: "95%", progress: 92 },
      { name: "Farmer Participation", current: "2,847", target: "3,200", progress: 89 },
    ],
    initiatives: [
      { name: "Mill Equipment Upgrade", status: "completed", completion: 100 },
      { name: "Farmer Training Program", status: "in_progress", completion: 75 },
      { name: "Quality Control Enhancement", status: "in_progress", completion: 60 },
    ],
  },
  {
    id: 2,
    title: "Enhance Regulatory Compliance",
    description: "Achieve 95% compliance rate across all registered mills and stakeholders",
    progress: 65,
    status: "at_risk",
    targetDate: "Mar 2025",
    kpis: [
      { name: "Compliance Rate", current: "87%", target: "95%", progress: 92 },
      { name: "Violation Reduction", current: "23%", target: "5%", progress: 45 },
      { name: "License Renewals", current: "89%", target: "98%", progress: 91 },
    ],
    initiatives: [
      { name: "Digital Compliance System", status: "in_progress", completion: 80 },
      { name: "Stakeholder Training", status: "in_progress", completion: 45 },
      { name: "Policy Framework Update", status: "planning", completion: 20 },
    ],
  },
  {
    id: 3,
    title: "Digital Transformation",
    description: "Implement comprehensive digital platform for sector management and stakeholder engagement",
    progress: 85,
    status: "on_track",
    targetDate: "Jun 2024",
    kpis: [
      { name: "Platform Adoption", current: "78%", target: "90%", progress: 87 },
      { name: "Digital Processes", current: "12/15", target: "15/15", progress: 80 },
      { name: "User Satisfaction", current: "4.2/5", target: "4.5/5", progress: 93 },
    ],
    initiatives: [
      { name: "Executive Portal", status: "completed", completion: 100 },
      { name: "Mobile Applications", status: "in_progress", completion: 70 },
      { name: "AI Integration", status: "in_progress", completion: 85 },
    ],
  },
  {
    id: 4,
    title: "Stakeholder Engagement",
    description: "Strengthen relationships with farmers, mills, and other sector stakeholders",
    progress: 72,
    status: "on_track",
    targetDate: "Ongoing",
    kpis: [
      { name: "Satisfaction Score", current: "4.2/5", target: "4.5/5", progress: 93 },
      { name: "Engagement Rate", current: "78%", target: "85%", progress: 92 },
      { name: "Feedback Response", current: "89%", target: "95%", progress: 94 },
    ],
    initiatives: [
      { name: "Farmer Support Program", status: "in_progress", completion: 85 },
      { name: "Mill Partnership Initiative", status: "in_progress", completion: 65 },
      { name: "Community Outreach", status: "in_progress", completion: 70 },
    ],
  },
]

export function ViewPlanModal({ open, onOpenChange }: ViewPlanModalProps) {
  const [selectedObjective, setSelectedObjective] = useState(strategicObjectives[0])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on_track":
        return "bg-green-100 text-green-800"
      case "at_risk":
        return "bg-yellow-100 text-yellow-800"
      case "behind":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on_track":
        return <CheckCircle className="h-4 w-4" />
      case "at_risk":
        return <AlertTriangle className="h-4 w-4" />
      case "behind":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <Award className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getInitiativeStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "planning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Strategic Plan 2024-2025
          </DialogTitle>
          <DialogDescription>Kenya Sugar Board Strategic Objectives and Performance Indicators</DialogDescription>
        </DialogHeader>

        <div className="flex h-[70vh] gap-4">
          {/* Objectives List */}
          <div className="w-1/3 border-r pr-4">
            <h3 className="font-medium mb-4">Strategic Objectives</h3>
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {strategicObjectives.map((objective) => (
                  <Card
                    key={objective.id}
                    className={`cursor-pointer transition-colors ${
                      selectedObjective.id === objective.id ? "border-green-200 bg-green-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedObjective(objective)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm">{objective.title}</CardTitle>
                        <Badge className={`text-xs ${getStatusColor(objective.status)}`}>
                          {getStatusIcon(objective.status)}
                          <span className="ml-1">{objective.status.replace("_", " ")}</span>
                        </Badge>
                      </div>
                      <CardDescription className="text-xs">{objective.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{objective.progress}%</span>
                        </div>
                        <Progress value={objective.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Target: {objective.targetDate}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Objective Details */}
          <div className="flex-1">
            <Tabs defaultValue="overview" className="h-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="kpis">KPIs</TabsTrigger>
                  <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="h-[calc(100%-4rem)]">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{selectedObjective.title}</CardTitle>
                        <CardDescription className="mt-2">{selectedObjective.description}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(selectedObjective.status)}>
                        {getStatusIcon(selectedObjective.status)}
                        <span className="ml-1">{selectedObjective.status.replace("_", " ")}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="h-5 w-5 text-green-600" />
                              <span className="font-medium">Overall Progress</span>
                            </div>
                            <p className="text-2xl font-bold text-green-600">{selectedObjective.progress}%</p>
                            <Progress value={selectedObjective.progress} className="mt-2" />
                          </div>
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="h-5 w-5 text-blue-600" />
                              <span className="font-medium">Target Date</span>
                            </div>
                            <p className="text-lg font-bold text-blue-600">{selectedObjective.targetDate}</p>
                          </div>
                          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-5 w-5 text-purple-600" />
                              <span className="font-medium">Initiatives</span>
                            </div>
                            <p className="text-lg font-bold text-purple-600">{selectedObjective.initiatives.length}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Key Performance Indicators</h4>
                          <div className="space-y-3">
                            {selectedObjective.kpis.map((kpi, index) => (
                              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium text-sm">{kpi.name}</span>
                                  <Badge variant="outline">{kpi.progress}%</Badge>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                  <span>Current: {kpi.current}</span>
                                  <span>Target: {kpi.target}</span>
                                </div>
                                <Progress value={kpi.progress} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Recent Updates</h4>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Milestone Achieved</p>
                                <p className="text-xs text-gray-600">
                                  Production targets exceeded by 8.2% this quarter
                                </p>
                                <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Progress Update</p>
                                <p className="text-xs text-gray-600">
                                  Digital transformation initiative reached 85% completion
                                </p>
                                <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kpis" className="h-[calc(100%-4rem)]">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Key Performance Indicators</CardTitle>
                    <CardDescription>Detailed KPI tracking for {selectedObjective.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-6">
                        {selectedObjective.kpis.map((kpi, index) => (
                          <Card key={index}>
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-lg">{kpi.name}</CardTitle>
                                <Badge
                                  className={
                                    kpi.progress >= 90
                                      ? "bg-green-100 text-green-800"
                                      : kpi.progress >= 70
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                  }
                                >
                                  {kpi.progress}%
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-600">Current Value</p>
                                    <p className="text-xl font-bold">{kpi.current}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Target Value</p>
                                    <p className="text-xl font-bold">{kpi.target}</p>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Progress to Target</span>
                                    <span>{kpi.progress}%</span>
                                  </div>
                                  <Progress value={kpi.progress} className="h-3" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="initiatives" className="h-[calc(100%-4rem)]">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Strategic Initiatives</CardTitle>
                    <CardDescription>Active initiatives supporting {selectedObjective.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {selectedObjective.initiatives.map((initiative, index) => (
                          <Card key={index}>
                            <CardContent className="pt-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-medium">{initiative.name}</h4>
                                  <Badge className={`mt-1 ${getInitiativeStatusColor(initiative.status)}`}>
                                    {initiative.status.replace("_", " ")}
                                  </Badge>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-gray-600">Completion</p>
                                  <p className="text-lg font-bold">{initiative.completion}%</p>
                                </div>
                              </div>
                              <Progress value={initiative.completion} className="mb-3" />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Status: {initiative.status.replace("_", " ")}</span>
                                <span>{initiative.completion}% complete</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="h-[calc(100%-4rem)]">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Project Timeline</CardTitle>
                    <CardDescription>Key milestones and deadlines for {selectedObjective.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {[
                          {
                            date: "Jan 2024",
                            milestone: "Project Initiation",
                            status: "completed",
                            description: "Strategic planning and resource allocation",
                          },
                          {
                            date: "Mar 2024",
                            milestone: "Phase 1 Completion",
                            status: "completed",
                            description: "Initial infrastructure setup and team formation",
                          },
                          {
                            date: "Jun 2024",
                            milestone: "Mid-term Review",
                            status: "completed",
                            description: "Progress assessment and strategy adjustment",
                          },
                          {
                            date: "Sep 2024",
                            milestone: "Phase 2 Completion",
                            status: "in_progress",
                            description: "Core implementation and system deployment",
                          },
                          {
                            date: "Dec 2024",
                            milestone: "Final Delivery",
                            status: "upcoming",
                            description: "Project completion and performance evaluation",
                          },
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div
                              className={`w-4 h-4 rounded-full mt-1 ${
                                item.status === "completed"
                                  ? "bg-green-500"
                                  : item.status === "in_progress"
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                              }`}
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-medium">{item.milestone}</h4>
                                <span className="text-sm text-gray-500">{item.date}</span>
                              </div>
                              <p className="text-sm text-gray-600">{item.description}</p>
                              <Badge className={`mt-2 ${getInitiativeStatusColor(item.status)}`}>
                                {item.status.replace("_", " ")}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
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
          <Button className="bg-green-600 hover:bg-green-700">Export Plan</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
