'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Calendar, Target, TrendingUp, CheckCircle, Clock, AlertCircle, Factory, Shield, Leaf } from "lucide-react"

interface ViewPlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface KPI {
  name: string
  baseline: string
  target: string
  current: string
  progress: number
  yearlyTargets: {
    Y1: string
    Y2: string
    Y3: string
    Y4: string
    Y5: string
  }
}

interface Activity {
  id: number
  name: string
  description: string
  status: "completed" | "in_progress" | "planning" | "delayed"
  completion: number
  kpi: KPI
}

interface Objective {
  id: number
  title: string
  description: string
  progress: number
  status: "on_track" | "behind_schedule" | "at_risk"
  targetDate: string
  activities: Activity[]
}

interface KRA {
  id: number
  title: string
  description: string
  icon: any
  color: string
  progress: number
  status: "on_track" | "behind_schedule" | "at_risk"
  targetDate: string
  objectives: Objective[]
}

const kraData: KRA[] = [
  {
    id: 1,
    title: "Sugar production and productivity",
    description: "Facilitate increased national average sugarcane yield to 80 TCH by 2030 and promote growth and efficiency in national sugar production",
    icon: Factory,
    color: "green",
    progress: 65,
    status: "on_track",
    targetDate: "End of plan (Y5 - 2029)",
    objectives: [
      {
        id: 1,
        title: "To facilitate an increase in national average sugarcane yield to 80 TCH by 2030",
        description: "Enhance sugarcane productivity through improved practices, infrastructure, and farmer training",
        progress: 70,
        status: "on_track",
        targetDate: "Y5 (2029)",
        activities: [
          {
            id: 1,
            name: "Identify, establish and equip regional bulking centres each catchment zone",
            description: "Establish bulking centres to improve sugarcane collection and processing efficiency",
            status: "in_progress",
            completion: 60,
            kpi: {
              name: "No. of bulking centres",
              baseline: "0",
              target: "15",
              current: "5",
              progress: 33,
              yearlyTargets: { Y1: "5", Y2: "3", Y3: "2", Y4: "3", Y5: "2" }
            }
          },
          {
            id: 2,
            name: "Create formal linkages between millers and KESRETI for access to clean",
            description: "Establish formal agreements between millers and research institutions",
            status: "completed",
            completion: 100,
            kpi: {
              name: "No. of linkage agreements signed",
              baseline: "0",
              target: "16",
              current: "16",
              progress: 100,
              yearlyTargets: { Y1: "_", Y2: "16", Y3: "_", Y4: "_", Y5: "_" }
            }
          },
          {
            id: 3,
            name: "Establish demonstration centres and learning hubs",
            description: "Create practical learning sites for farmers to adopt improved practices",
            status: "in_progress",
            completion: 80,
            kpi: {
              name: "No. of demo sites",
              baseline: "0",
              target: "10",
              current: "8",
              progress: 80,
              yearlyTargets: { Y1: "4", Y2: "4", Y3: "2", Y4: "_", Y5: "_" }
            }
          },
          {
            id: 4,
            name: "Develop and deploy digital weather and climate advisory services",
            description: "Provide farmers with timely weather information for better decision making",
            status: "in_progress",
            completion: 95,
            kpi: {
              name: "% of farmers receiving timely weather advisories",
              baseline: "0%",
              target: "95%",
              current: "95%",
              progress: 100,
              yearlyTargets: { Y1: "_", Y2: "95", Y3: "95", Y4: "95", Y5: "95" }
            }
          },
          {
            id: 5,
            name: "Deploy e-extension services via mobile phones, SMS, WhatsApp, Miwa Bora and SugarVISTA",
            description: "Reach farmers through digital platforms for extension services",
            status: "in_progress",
            completion: 95,
            kpi: {
              name: "% of farmers reached through digital extension",
              baseline: "0%",
              target: "95%",
              current: "95%",
              progress: 100,
              yearlyTargets: { Y1: "_", Y2: "95", Y3: "95", Y4: "95", Y5: "95" }
            }
          }
        ]
      },
      {
        id: 2,
        title: "To promote growth and efficiency in national sugar production",
        description: "Implement quality-based cane payment systems and enhance production efficiency",
        progress: 60,
        status: "on_track",
        targetDate: "Y5 (2029)",
        activities: [
          {
            id: 6,
            name: "Develop and gazette the regulatory framework for QBCPS",
            description: "Create regulatory framework for Quality-Based Cane Payment System",
            status: "completed",
            completion: 100,
            kpi: {
              name: "No. of frameworks",
              baseline: "0",
              target: "1",
              current: "1",
              progress: 100,
              yearlyTargets: { Y1: "1", Y2: "_", Y3: "_", Y4: "_", Y5: "_" }
            }
          },
          {
            id: 7,
            name: "Conduct industry-wide sensitization forums for growers and millers",
            description: "Educate stakeholders on new systems and regulations",
            status: "in_progress",
            completion: 40,
            kpi: {
              name: "No. of stakeholders sensitized ('000)",
              baseline: "0",
              target: "100",
              current: "40",
              progress: 40,
              yearlyTargets: { Y1: "20", Y2: "20", Y3: "20", Y4: "20", Y5: "20" }
            }
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Effective industry regulation",
    description: "Create enabling legal and regulatory framework and establish robust compliance and enforcement system",
    icon: Shield,
    color: "blue",
    progress: 55,
    status: "on_track",
    targetDate: "End of plan (Y5 - 2029)",
    objectives: [
      {
        id: 1,
        title: "To create an enabling legal and regulatory framework for the sugar industry",
        description: "Develop and harmonize regulations and policies for industry growth",
        progress: 60,
        status: "on_track",
        targetDate: "Y3 (2027)",
        activities: [
          {
            id: 1,
            name: "Develop sugar regulations and policies",
            description: "Create comprehensive regulatory framework for industry operations",
            status: "in_progress",
            completion: 50,
            kpi: {
              name: "No. of regulations and policies developed",
              baseline: "0",
              target: "2",
              current: "1",
              progress: 50,
              yearlyTargets: { Y1: "1", Y2: "1", Y3: "_", Y4: "_", Y5: "_" }
            }
          },
          {
            id: 2,
            name: "Review existing sugar regulations and policies",
            description: "Update and improve existing regulatory framework",
            status: "in_progress",
            completion: 40,
            kpi: {
              name: "No. of regulations and policies reviewed",
              baseline: "0",
              target: "5",
              current: "2",
              progress: 40,
              yearlyTargets: { Y1: "1", Y2: "1", Y3: "1", Y4: "1", Y5: "1" }
            }
          },
          {
            id: 3,
            name: "Harmonize sugar regulations and policies with regional and international regulations",
            description: "Align local regulations with regional and international standards",
            status: "planning",
            completion: 25,
            kpi: {
              name: "No. of sugar regulation and policies harmonized",
              baseline: "0",
              target: "4",
              current: "1",
              progress: 25,
              yearlyTargets: { Y1: "_", Y2: "1", Y3: "1", Y4: "1", Y5: "1" }
            }
          }
        ]
      },
      {
        id: 2,
        title: "To establish a robust compliance and enforcement system",
        description: "Develop standards, conduct audits, and ensure industry compliance",
        progress: 50,
        status: "on_track",
        targetDate: "Y5 (2029)",
        activities: [
          {
            id: 4,
            name: "Develop industry standards and codes of practice",
            description: "Create customized standards and codes for sugar industry",
            status: "in_progress",
            completion: 40,
            kpi: {
              name: "No. of standards and codes of practice developed",
              baseline: "0",
              target: "5",
              current: "2",
              progress: 40,
              yearlyTargets: { Y1: "1", Y2: "1", Y3: "1", Y4: "1", Y5: "1" }
            }
          },
          {
            id: 5,
            name: "Carry out regular compliance audits and assessments",
            description: "Monitor compliance with standards across the value chain",
            status: "in_progress",
            completion: 40,
            kpi: {
              name: "No. of compliance audits",
              baseline: "0",
              target: "60",
              current: "24",
              progress: 40,
              yearlyTargets: { Y1: "12", Y2: "12", Y3: "12", Y4: "12", Y5: "12" }
            }
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Research, partnerships and industry diversification",
    description: "Enhance data management, promote industry diversification, and strengthen research partnerships",
    icon: TrendingUp,
    color: "purple",
    progress: 45,
    status: "on_track",
    targetDate: "End of plan (Y5 - 2029)",
    objectives: [
      {
        id: 1,
        title: "To enhance data management and industry intelligence",
        description: "Develop predictive models and improve data systems for industry intelligence",
        progress: 50,
        status: "on_track",
        targetDate: "Y4 (2028)",
        activities: [
          {
            id: 1,
            name: "Develop and implement policy-relevant data systems",
            description: "Create predictive and simulation models for industry planning",
            status: "in_progress",
            completion: 50,
            kpi: {
              name: "No. of predictive and simulation models developed",
              baseline: "0",
              target: "4",
              current: "2",
              progress: 50,
              yearlyTargets: { Y1: "1", Y2: "1", Y3: "1", Y4: "1", Y5: "_" }
            }
          },
          {
            id: 2,
            name: "Publish and circulate Sugar Industry Yearbook of Statistics",
            description: "Regular publication of comprehensive industry statistics",
            status: "in_progress",
            completion: 40,
            kpi: {
              name: "No. of publications",
              baseline: "0",
              target: "5",
              current: "2",
              progress: 40,
              yearlyTargets: { Y1: "1", Y2: "1", Y3: "1", Y4: "1", Y5: "1" }
            }
          }
        ]
      },
      {
        id: 2,
        title: "To promote industry diversification and value addition",
        description: "Develop strategies for cogeneration, sugar beet, ethanol, and export markets",
        progress: 40,
        status: "on_track",
        targetDate: "Y5 (2029)",
        activities: [
          {
            id: 3,
            name: "Develop and implement strategy for promoting cogeneration activities",
            description: "Create framework for sugar industry energy cogeneration",
            status: "planning",
            completion: 20,
            kpi: {
              name: "Approved cogeneration strategy",
              baseline: "0",
              target: "1",
              current: "0",
              progress: 0,
              yearlyTargets: { Y1: "_", Y2: "1", Y3: "_", Y4: "_", Y5: "_" }
            }
          },
          {
            id: 4,
            name: "Develop and implement a strategy for promoting the sugar beet value chain",
            description: "Establish sugar beet as alternative sugar source",
            status: "planning",
            completion: 20,
            kpi: {
              name: "Approved sugar beet value chain development strategy",
              baseline: "0",
              target: "1",
              current: "0",
              progress: 0,
              yearlyTargets: { Y1: "_", Y2: "1", Y3: "_", Y4: "_", Y5: "_" }
            }
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Industry sustainability",
    description: "Promote environmentally responsible, socially inclusive and well-governed sugar industry value chain",
    icon: Leaf,
    color: "emerald",
    progress: 40,
    status: "on_track",
    targetDate: "End of plan (Y5 - 2029)",
    objectives: [
      {
        id: 1,
        title: "To promote an environmentally responsible, socially inclusive and well-governed sugar industry value chain",
        description: "Implement ESG standards and build capacity for inclusive participation",
        progress: 45,
        status: "on_track",
        targetDate: "Y5 (2029)",
        activities: [
          {
            id: 1,
            name: "Develop ESG scorecards for industry players",
            description: "Create Environmental, Social, and Governance assessment tools",
            status: "completed",
            completion: 100,
            kpi: {
              name: "No. of ESG scorecard",
              baseline: "0",
              target: "1",
              current: "1",
              progress: 100,
              yearlyTargets: { Y1: "1", Y2: "_", Y3: "_", Y4: "_", Y5: "_" }
            }
          },
          {
            id: 2,
            name: "Sensitize industry players on the ESG scorecard",
            description: "Train stakeholders on ESG standards implementation",
            status: "in_progress",
            completion: 55,
            kpi: {
              name: "No. of sensitization forums",
              baseline: "0",
              target: "36",
              current: "20",
              progress: 55,
              yearlyTargets: { Y1: "20", Y2: "4", Y3: "4", Y4: "4", Y5: "4" }
            }
          },
          {
            id: 3,
            name: "Build capacity of women and youth to participate in sugar crop farming",
            description: "Enhance participation of women and youth in sugar value chain",
            status: "in_progress",
            completion: 40,
            kpi: {
              name: "No. of capacity-building programs undertaken",
              baseline: "0",
              target: "25",
              current: "10",
              progress: 40,
              yearlyTargets: { Y1: "5", Y2: "5", Y3: "5", Y4: "5", Y5: "5" }
            }
          },
          {
            id: 4,
            name: "Implement a traceability system for the sugar industry",
            description: "Establish comprehensive traceability across the value chain",
            status: "planning",
            completion: 15,
            kpi: {
              name: "% of farms/processors/packers onboarded into the system",
              baseline: "0%",
              target: "50%",
              current: "5%",
              progress: 10,
              yearlyTargets: { Y1: "_", Y2: "5", Y3: "10", Y4: "15", Y5: "20" }
            }
          }
        ]
      }
    ]
  }
]

export function ViewPlanModal({ open, onOpenChange }: ViewPlanModalProps) {
  const [selectedKra, setSelectedKra] = useState(() => {
    if (kraData && kraData.length > 0) {
      return kraData[0]
    }
    return null
  })

  const [selectedObjective, setSelectedObjective] = useState(() => {
    if (selectedKra && selectedKra.objectives.length > 0) {
      return selectedKra.objectives[0]
    }
    return null
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "planning":
        return <Target className="h-4 w-4 text-orange-500" />
      case "delayed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      "on_track": "default",
      "behind_schedule": "secondary",
      "at_risk": "destructive",
      "completed": "outline"
    }

    return (
      <Badge variant={variants[status] || "default"}>
        {status.replace("_", " ")}
      </Badge>
    )
  }

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      green: "border-green-500 bg-green-50",
      blue: "border-blue-500 bg-blue-50",
      purple: "border-purple-500 bg-purple-50",
      emerald: "border-emerald-500 bg-emerald-50"
    }
    return colorMap[color] || "border-gray-500 bg-gray-50"
  }

  if (!selectedKra) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Strategic Implementation Plan (2025-2029)
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-6">
          {/* KRA Sidebar */}
          <div className="w-80 space-y-3">
            <h3 className="font-semibold text-lg">Key Result Areas</h3>
            {kraData.map((kra) => {
              const IconComponent = kra.icon
              return (
                <Card 
                  key={kra.id} 
                  className={`cursor-pointer transition-all ${
                    selectedKra.id === kra.id 
                      ? `${getColorClasses(kra.color)} border-2` 
                      : "hover:shadow-md"
                  }`}
                  onClick={() => {
                    setSelectedKra(kra)
                    setSelectedObjective(kra.objectives[0])
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <IconComponent className={`h-5 w-5 mt-1 text-${kra.color}-600`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{kra.title}</h4>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{kra.description}</p>
                        <div className="space-y-2">
                          <Progress value={kra.progress} className="h-2" />
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium">{kra.progress}%</span>
                            {getStatusBadge(kra.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="objectives">Objectives</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <selectedKra.icon className={`h-6 w-6 text-${selectedKra.color}-600`} />
                      {selectedKra.title}
                    </CardTitle>
                    <CardDescription>{selectedKra.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{selectedKra.progress}%</div>
                        <div className="text-sm text-gray-600">Overall Progress</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{selectedKra.objectives.length}</div>
                        <div className="text-sm text-gray-600">Strategic Objectives</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">
                          {selectedKra.objectives.reduce((total, obj) => total + obj.activities.length, 0)}
                        </div>
                        <div className="text-sm text-gray-600">Key Activities</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Target Date: {selectedKra.targetDate}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{selectedKra.progress}%</span>
                      </div>
                      <Progress value={selectedKra.progress} className="h-3" />
                    </div>

                    {getStatusBadge(selectedKra.status)}
                  </CardContent>
                </Card>

                {/* Objectives Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Strategic Objectives Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedKra.objectives.map((objective) => (
                      <div key={objective.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{objective.title}</h4>
                          <p className="text-sm text-gray-600">{objective.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{objective.progress}%</span>
                          <Progress value={objective.progress} className="w-20 h-2" />
                          {getStatusBadge(objective.status)}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Objectives Tab */}
              <TabsContent value="objectives" className="space-y-6">
                <div className="grid gap-6">
                  {selectedKra.objectives.map((objective) => (
                    <Card key={objective.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{objective.title}</span>
                          {getStatusBadge(objective.status)}
                        </CardTitle>
                        <CardDescription>{objective.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">Target: {objective.targetDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-sm">Progress: {objective.progress}%</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Progress value={objective.progress} className="h-3" />
                        </div>

                        <div className="text-sm text-gray-600">
                          {objective.activities.length} key activities
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Activities Tab */}
              <TabsContent value="activities" className="space-y-6">
                {selectedKra.objectives.map((objective) => (
                  <Card key={objective.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{objective.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {objective.activities.map((activity) => (
                        <div key={activity.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getStatusIcon(activity.status)}
                                <h4 className="font-medium">{activity.name}</h4>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Completion</span>
                                  <span>{activity.completion}%</span>
                                </div>
                                <Progress value={activity.completion} className="h-2" />
                              </div>
                            </div>
                          </div>

                          {/* KPI Section */}
                          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                            <h5 className="font-medium text-sm">Key Performance Indicator</h5>
                            <div className="grid grid-cols-4 gap-2 text-xs">
                              <div>
                                <span className="text-gray-600">Baseline:</span>
                                <div className="font-medium">{activity.kpi.baseline}</div>
                              </div>
                              <div>
                                <span className="text-gray-600">Target:</span>
                                <div className="font-medium">{activity.kpi.target}</div>
                              </div>
                              <div>
                                <span className="text-gray-600">Current:</span>
                                <div className="font-medium">{activity.kpi.current}</div>
                              </div>
                              <div>
                                <span className="text-gray-600">Progress:</span>
                                <div className="font-medium">{activity.kpi.progress}%</div>
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <h6 className="font-medium text-xs mb-2">Yearly Targets</h6>
                              <div className="grid grid-cols-5 gap-1 text-xs">
                                {Object.entries(activity.kpi.yearlyTargets).map(([year, target]) => (
                                  <div key={year} className="text-center p-1 bg-white rounded">
                                    <div className="text-gray-600">{year}</div>
                                    <div className="font-medium">{target}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Progress Tab */}
              <TabsContent value="progress" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Progress Summary</CardTitle>
                    <CardDescription>Track progress across all objectives and activities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedKra.objectives.map((objective) => (
                      <div key={objective.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{objective.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{objective.progress}%</span>
                            {getStatusBadge(objective.status)}
                          </div>
                        </div>
                        
                        <Progress value={objective.progress} className="h-3" />
                        
                        <div className="grid gap-2 ml-4">
                          {objective.activities.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(activity.status)}
                                <span className="truncate">{activity.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{activity.completion}%</span>
                                <Progress value={activity.completion} className="w-16 h-2" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
