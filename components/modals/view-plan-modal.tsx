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

const kraData = {
  id: 1,
  title: "Production & Productivity",
  description: "Enhance sugarcane production efficiency and productivity through improved practices, cost reduction, variety adoption, and quality control systems",
  progress: 58,
  status: "on_track",
  targetDate: "End of plan (Y5 - 2029)",
  objectives: [
    {
      id: 1,
      title: "Improve average sugarcane yield from 61 TCH to 80 TCH",
      description: "Enhance sugarcane productivity through modern agronomic practices, farmer training, and improved inputs",
      progress: 68,
      status: "on_track",
      targetDate: "Y5 (2029)",
      activities: [
        {
          id: 1,
          name: "Promote modern agronomic practices",
          description: "Implementation of best practices for sugarcane cultivation",
          status: "in_progress",
          completion: 70,
          kpi: {
            name: "Average cane yield (TCH)",
            baseline: "61 TCH",
            target: "80 TCH",
            current: "69 TCH",
            progress: 42,
            yearlyTargets: { Y1: "65", Y2: "69", Y3: "73", Y4: "77", Y5: "80" }
          }
        },
        {
          id: 2,
          name: "Train farmers on soil health & fertility",
          description: "Comprehensive training programs on soil management and fertility improvement",
          status: "in_progress",
          completion: 50,
          kpi: {
            name: "% farmers trained",
            baseline: "0%",
            target: "80%",
            current: "40%",
            progress: 50,
            yearlyTargets: { Y1: "20%", Y2: "40%", Y3: "60%", Y4: "70%", Y5: "80%" }
          }
        },
        {
          id: 3,
          name: "Distribute improved farm inputs",
          description: "Provision of quality inputs and soil testing services to farmers",
          status: "in_progress",
          completion: 43,
          kpi: {
            name: "% farms with soil test reports",
            baseline: "0%",
            target: "70%",
            current: "30%",
            progress: 43,
            yearlyTargets: { Y1: "10%", Y2: "30%", Y3: "50%", Y4: "60%", Y5: "70%" }
          }
        }
      ]
    },
    {
      id: 2,
      title: "Reduce Cost of Production per Hectare by 20%",
      description: "Optimize production costs through bulk procurement, mechanization, and irrigation improvements",
      progress: 50,
      status: "on_track",
      targetDate: "Y5 (2029)",
      activities: [
        {
          id: 4,
          name: "Bulk procurement of inputs",
          description: "Collective purchasing strategies to reduce input costs for farmers",
          status: "in_progress",
          completion: 50,
          kpi: {
            name: "Average cost per hectare (% reduction)",
            baseline: "0%",
            target: "20% reduction",
            current: "10%",
            progress: 50,
            yearlyTargets: { Y1: "5%", Y2: "10%", Y3: "15%", Y4: "18%", Y5: "20%" }
          }
        },
        {
          id: 5,
          name: "Introduce mechanized planting & harvesting",
          description: "Modernization of farming equipment and mechanized practices",
          status: "in_progress",
          completion: 40,
          kpi: {
            name: "% farms mechanized",
            baseline: "TBD",
            target: "+25pp",
            current: "+10pp",
            progress: 40,
            yearlyTargets: { Y1: "+5pp", Y2: "+10pp", Y3: "+15pp", Y4: "+20pp", Y5: "+25pp" }
          }
        },
        {
          id: 6,
          name: "Optimize irrigation systems",
          description: "Efficient water management and irrigation infrastructure development",
          status: "in_progress",
          completion: 33,
          kpi: {
            name: "% irrigated farms",
            baseline: "TBD",
            target: "30%",
            current: "10%",
            progress: 33,
            yearlyTargets: { Y1: "5%", Y2: "10%", Y3: "15%", Y4: "20%", Y5: "30%" }
          }
        }
      ]
    },
    {
      id: 3,
      title: "Increase adoption of improved sugarcane varieties from 10% to 25%",
      description: "Promote adoption of high-yielding and disease-resistant sugarcane varieties",
      progress: 33,
      status: "on_track",
      targetDate: "Y5 (2029)",
      activities: [
        {
          id: 7,
          name: "Distribute certified improved seed cane",
          description: "Provision of quality planting materials to farmers",
          status: "in_progress",
          completion: 33,
          kpi: {
            name: "% area under improved varieties",
            baseline: "10%",
            target: "25%",
            current: "15%",
            progress: 33,
            yearlyTargets: { Y1: "12%", Y2: "15%", Y3: "18%", Y4: "21%", Y5: "25%" }
          }
        },
        {
          id: 8,
          name: "Partner with research institutions",
          description: "Collaboration for variety development and testing",
          status: "in_progress",
          completion: 67,
          kpi: {
            name: "No. of new varieties introduced",
            baseline: "0",
            target: "3",
            current: "2",
            progress: 67,
            yearlyTargets: { Y1: "1", Y2: "1", Y3: "1", Y4: "0", Y5: "0" }
          }
        },
        {
          id: 9,
          name: "Conduct field demonstrations",
          description: "Demonstration plots to showcase improved varieties",
          status: "in_progress",
          completion: 40,
          kpi: {
            name: "No. of demo plots",
            baseline: "0",
            target: "20",
            current: "8",
            progress: 40,
            yearlyTargets: { Y1: "4", Y2: "4", Y3: "4", Y4: "4", Y5: "4" }
          }
        }
      ]
    },
    {
      id: 4,
      title: "Operationalize Cane Testing Units (CTUs) by Dec 2027",
      description: "Establish and operationalize cane testing facilities for improved quality control",
      progress: 60,
      status: "on_track",
      targetDate: "Dec 2027 (Y3)",
      activities: [
        {
          id: 10,
          name: "Procure and install CTU equipment",
          description: "Acquisition and installation of specialized testing equipment",
          status: "in_progress",
          completion: 60,
          kpi: {
            name: "% CTUs operational",
            baseline: "0%",
            target: "100%",
            current: "60%",
            progress: 60,
            yearlyTargets: { Y1: "20%", Y2: "60%", Y3: "100%", Y4: "100%", Y5: "100%" }
          }
        },
        {
          id: 11,
          name: "Train CTU staff",
          description: "Capacity building for testing unit personnel",
          status: "in_progress",
          completion: 70,
          kpi: {
            name: "No. staff trained",
            baseline: "0",
            target: "50",
            current: "35",
            progress: 70,
            yearlyTargets: { Y1: "15", Y2: "20", Y3: "15", Y4: "0", Y5: "0" }
          }
        },
        {
          id: 12,
          name: "Develop CTU SOPs",
          description: "Standard operating procedures for quality testing operations",
          status: "completed",
          completion: 100,
          kpi: {
            name: "Approved SOPs (Yes/No)",
            baseline: "No",
            target: "Yes",
            current: "Yes",
            progress: 100,
            yearlyTargets: { Y1: "No", Y2: "Yes", Y3: "Yes", Y4: "Yes", Y5: "Yes" }
          }
        }
      ]
    }
  ]
}

export function ViewPlanModal({ open, onOpenChange }: ViewPlanModalProps) {
  const [selectedObjective, setSelectedObjective] = useState(() => {
    if (kraData?.objectives && kraData.objectives.length > 0) {
      return kraData.objectives[0]
    }
    return null
  })
  const [selectedActivity, setSelectedActivity] = useState<any>(null)

  // Early return if no objective is selected
  if (!selectedObjective) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Strategic Plan Not Available</DialogTitle>
            <DialogDescription>
              Unable to load strategic plan data. Please try again later.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

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
            KRA 1: {kraData.title}
          </DialogTitle>
          <DialogDescription>Strategic Objectives and Activities for {kraData.description}</DialogDescription>
        </DialogHeader>

        <div className="flex h-[70vh] gap-4">
          {/* Objectives List */}
          <div className="w-1/3 border-r pr-4">
            <h3 className="font-medium mb-4">Strategic Objectives</h3>
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {kraData.objectives.map((objective) => (
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
                          <span>{objective.activities.length} activities</span>
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
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                  <TabsTrigger value="kpis">KPIs</TabsTrigger>
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
                    
                    {/* Year-on-Year and 5-Year Progress Summary */}
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 rounded-lg border">
                      <h4 className="font-medium text-gray-800 mb-3">Strategic Progress Overview</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-blue-100 rounded-lg">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">Year 2 (Current)</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-600">
                            {selectedObjective?.activities ? 
                              Math.round(selectedObjective.activities.reduce((acc, activity) => {
                                const currentVal = parseFloat(activity.kpi.current.replace(/[^\d.]/g, ''));
                                const yearTargetVal = parseFloat(activity.kpi.yearlyTargets.Y2.replace(/[^\d.]/g, ''));
                                return acc + Math.min(100, (currentVal / yearTargetVal) * 100);
                              }, 0) / selectedObjective.activities.length) : 0}%
                          </p>
                          <p className="text-xs text-blue-700">Average Y2 Target Achievement</p>
                        </div>
                        
                        <div className="text-center p-3 bg-green-100 rounded-lg">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">5-Year Plan</span>
                          </div>
                          <p className="text-2xl font-bold text-green-600">
                            {selectedObjective?.activities ? 
                              Math.round(selectedObjective.activities.reduce((acc, activity) => {
                                const currentVal = parseFloat(activity.kpi.current.replace(/[^\d.]/g, ''));
                                const baselineVal = parseFloat(activity.kpi.baseline.replace(/[^\d.]/g, ''));
                                const finalTargetVal = parseFloat(activity.kpi.target.replace(/[^\d.]/g, ''));
                                return acc + ((currentVal - baselineVal) / (finalTargetVal - baselineVal)) * 100;
                              }, 0) / selectedObjective.activities.length) : 0}%
                          </p>
                          <p className="text-xs text-green-700">5-Year Plan Progress</p>
                        </div>
                        
                        <div className="text-center p-3 bg-purple-100 rounded-lg">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Target className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-800">Completion Rate</span>
                          </div>
                          <p className="text-2xl font-bold text-purple-600">
                            {selectedObjective?.activities ? 
                              `${selectedObjective.activities.filter(activity => {
                                const currentVal = parseFloat(activity.kpi.current.replace(/[^\d.]/g, ''));
                                const baselineVal = parseFloat(activity.kpi.baseline.replace(/[^\d.]/g, ''));
                                const finalTargetVal = parseFloat(activity.kpi.target.replace(/[^\d.]/g, ''));
                                const fiveYearProgress = ((currentVal - baselineVal) / (finalTargetVal - baselineVal)) * 100;
                                return fiveYearProgress >= 90;
                              }).length}/${selectedObjective.activities.length}` : '0/0'}
                          </p>
                          <p className="text-xs text-purple-700">KPIs On Track</p>
                        </div>
                      </div>
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
                              <span className="font-medium">Activities</span>
                            </div>
                            <p className="text-lg font-bold text-purple-600">{selectedObjective?.activities?.length || 0}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Key Performance Indicators Overview</h4>
                          <div className="space-y-3">
                            {selectedObjective?.activities?.map((activity, index) => {
                              const kpi = activity.kpi;
                              
                              // Calculate Year 2 specific progress vs Y2 target
                              const calculateCurrentYearProgress = (current: string, yearTarget: string) => {
                                const currentVal = parseFloat(current.replace(/[^\d.]/g, ''));
                                const yearTargetVal = parseFloat(yearTarget.replace(/[^\d.]/g, ''));
                                return Math.min(100, Math.round((currentVal / yearTargetVal) * 100));
                              };

                              // Calculate 5-year overall progress
                              const calculateFiveYearProgress = (current: string, baseline: string, finalTarget: string) => {
                                const currentVal = parseFloat(current.replace(/[^\d.]/g, ''));
                                const baselineVal = parseFloat(baseline.replace(/[^\d.]/g, ''));
                                const finalTargetVal = parseFloat(finalTarget.replace(/[^\d.]/g, ''));
                                return Math.round(((currentVal - baselineVal) / (finalTargetVal - baselineVal)) * 100);
                              };

                              const currentYearProgress = calculateCurrentYearProgress(kpi.current, kpi.yearlyTargets.Y2);
                              const fiveYearProgress = calculateFiveYearProgress(kpi.current, kpi.baseline, kpi.target);

                              return (
                                <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border">
                                  <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                      <span className="font-medium text-sm">{kpi?.name || 'N/A'}</span>
                                      <div className="text-xs text-gray-500 mt-1">Activity: {activity.name}</div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Badge variant="outline" className="bg-blue-100 text-blue-700">
                                        Y2: {currentYearProgress}%
                                      </Badge>
                                      <Badge variant="outline" className={
                                        fiveYearProgress >= 90 ? "bg-green-100 text-green-700" :
                                        fiveYearProgress >= 70 ? "bg-yellow-100 text-yellow-700" :
                                        "bg-red-100 text-red-700"
                                      }>
                                        5Y: {fiveYearProgress}%
                                      </Badge>
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div className="text-center p-2 bg-blue-100 rounded">
                                      <p className="text-xs text-gray-600">Year 2 Progress</p>
                                      <p className="text-lg font-bold text-blue-600">{currentYearProgress}%</p>
                                      <div className="mt-1">
                                        <Progress value={currentYearProgress} className="h-1" />
                                      </div>
                                    </div>
                                    <div className="text-center p-2 bg-green-100 rounded">
                                      <p className="text-xs text-gray-600">5-Year Progress</p>
                                      <p className="text-lg font-bold text-green-600">{fiveYearProgress}%</p>
                                      <div className="mt-1">
                                        <Progress value={fiveYearProgress} className="h-1" />
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-between text-sm text-gray-600">
                                    <span>Current: {kpi?.current || 'N/A'}</span>
                                    <span>Target: {kpi?.target || 'N/A'}</span>
                                  </div>
                                </div>
                              );
                            }) || <div className="text-sm text-gray-500">No activities available</div>}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Recent Updates</h4>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">CTU SOPs Approved</p>
                                <p className="text-xs text-gray-600">
                                  Standard Operating Procedures for Cane Testing Units have been developed and approved
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Year 2 (2025)</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Yield Improvement Progress</p>
                                <p className="text-xs text-gray-600">
                                  Sugarcane yield improved to 69 TCH in Year 2, showing steady progress toward 80 TCH target
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Year 2 (2025)</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Farmer Training Expansion</p>
                                <p className="text-xs text-gray-600">
                                  40% of farmers have been trained on soil health & fertility management as of Year 2
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Ongoing</p>
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
                        {selectedObjective?.activities?.map((activity, index) => {
                          const kpi = activity.kpi;
                          
                          // Calculate Year 2 specific progress (how much of Y2 target achieved)
                          const calculateCurrentYearProgress = (current: string, yearTarget: string) => {
                            const currentVal = parseFloat(current.replace(/[^\d.]/g, ''));
                            const yearTargetVal = parseFloat(yearTarget.replace(/[^\d.]/g, ''));
                            // Assuming we're at mid-year, so 50% through the year
                            return Math.min(100, Math.round((currentVal / yearTargetVal) * 100));
                          };

                          // Calculate 5-year overall progress (baseline to final target)
                          const calculateFiveYearProgress = (current: string, baseline: string, finalTarget: string) => {
                            const currentVal = parseFloat(current.replace(/[^\d.]/g, ''));
                            const baselineVal = parseFloat(baseline.replace(/[^\d.]/g, ''));
                            const finalTargetVal = parseFloat(finalTarget.replace(/[^\d.]/g, ''));
                            return Math.round(((currentVal - baselineVal) / (finalTargetVal - baselineVal)) * 100);
                          };

                          // Calculate yearly milestone progress (for timeline visualization)
                          const calculateMilestoneProgress = (yearTarget: string, baseline: string, finalTarget: string) => {
                            const yearTargetVal = parseFloat(yearTarget.replace(/[^\d.]/g, ''));
                            const baselineVal = parseFloat(baseline.replace(/[^\d.]/g, ''));
                            const finalTargetVal = parseFloat(finalTarget.replace(/[^\d.]/g, ''));
                            return Math.round(((yearTargetVal - baselineVal) / (finalTargetVal - baselineVal)) * 100);
                          };

                          // Calculate yearly completion percentages for timeline
                          const yearlyMilestones = {
                            Y1: calculateMilestoneProgress(kpi.yearlyTargets.Y1, kpi.baseline, kpi.target),
                            Y2: calculateMilestoneProgress(kpi.yearlyTargets.Y2, kpi.baseline, kpi.target),
                            Y3: calculateMilestoneProgress(kpi.yearlyTargets.Y3, kpi.baseline, kpi.target),
                            Y4: calculateMilestoneProgress(kpi.yearlyTargets.Y4, kpi.baseline, kpi.target),
                            Y5: calculateMilestoneProgress(kpi.yearlyTargets.Y5, kpi.baseline, kpi.target)
                          };

                          // Current year is Y2 (2025)
                          const currentYearProgress = calculateCurrentYearProgress(kpi.current, kpi.yearlyTargets.Y2);
                          const fiveYearProgress = calculateFiveYearProgress(kpi.current, kpi.baseline, kpi.target);

                          return (
                            <Card key={index} className="border-l-4 border-l-green-500">
                              <CardHeader className="pb-3">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <CardTitle className="text-lg">{kpi.name}</CardTitle>
                                    <p className="text-sm text-gray-500">Activity: {activity.name}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                      Y2: {currentYearProgress}%
                                    </Badge>
                                    <Badge
                                      className={
                                        fiveYearProgress >= 90
                                          ? "bg-green-100 text-green-800"
                                          : fiveYearProgress >= 70
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                      }
                                    >
                                      5Y: {fiveYearProgress}%
                                    </Badge>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {/* Year on Year and 5-Year Progress Summary */}
                                  <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                                    <div className="text-center">
                                      <p className="text-sm text-gray-600 mb-1">Year 2 (Current) Progress</p>
                                      <p className="text-3xl font-bold text-blue-600">{currentYearProgress}%</p>
                                      <p className="text-xs text-gray-500">Target: {kpi.yearlyTargets.Y2}</p>
                                      <div className="mt-2">
                                        <Progress value={currentYearProgress} className="h-2" />
                                      </div>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-sm text-gray-600 mb-1">5-Year Plan Progress</p>
                                      <p className="text-3xl font-bold text-green-600">{fiveYearProgress}%</p>
                                      <p className="text-xs text-gray-500">Final Target: {kpi.target}</p>
                                      <div className="mt-2">
                                        <Progress value={fiveYearProgress} className="h-2" />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Current Performance Metrics */}
                                  <div className="grid grid-cols-3 gap-4">
                                    <div>
                                      <p className="text-sm text-gray-600">Baseline</p>
                                      <p className="text-lg font-bold">{kpi.baseline}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-600">Current Value</p>
                                      <p className="text-lg font-bold">{kpi.current}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-600">Target Value</p>
                                      <p className="text-lg font-bold">{kpi.target}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Progress to Target</span>
                                      <span>{kpi.progress}%</span>
                                    </div>
                                    <Progress value={kpi.progress} className="h-3" />
                                  </div>
                                  {kpi.yearlyTargets && (
                                    <div>
                                      <p className="text-sm font-medium text-gray-700 mb-3">Year-on-Year Targets & Completion</p>
                                      <div className="grid grid-cols-5 gap-3">
                                        {(['Y1', 'Y2', 'Y3', 'Y4', 'Y5'] as const).map((year, yearIndex) => {
                                          const isCurrentYear = year === 'Y2';
                                          const isCompleted = year === 'Y1';
                                          const isFutureYear = ['Y3', 'Y4', 'Y5'].includes(year);
                                          const milestoneProgress = yearlyMilestones[year];
                                          
                                          // For current year, show actual progress vs target
                                          const displayProgress = isCurrentYear ? currentYearProgress : 
                                                                 isCompleted ? 100 : 
                                                                 milestoneProgress;
                                          
                                          return (
                                            <div key={year} className={`p-3 rounded-lg border-2 text-center ${
                                              isCompleted ? 'bg-green-100 border-green-300' :
                                              isCurrentYear ? 'bg-blue-100 border-blue-300' : 
                                              isFutureYear ? 'bg-gray-50 border-gray-200' :
                                              'bg-gray-50 border-gray-200'
                                            }`}>
                                              <p className="font-medium text-sm">{year}</p>
                                              <p className="text-lg font-bold mt-1">{kpi.yearlyTargets[year]}</p>
                                              
                                              {/* Progress percentage for each year */}
                                              <div className="mt-2">
                                                <p className={`text-xs font-medium ${
                                                  isCompleted ? 'text-green-700' :
                                                  isCurrentYear ? 'text-blue-700' :
                                                  'text-gray-600'
                                                }`}>
                                                  {isCompleted ? '✓ Achieved' : 
                                                   isCurrentYear ? `${displayProgress}% of Y2 Target` : 
                                                   isFutureYear ? 'Planned' : 'Milestone'}
                                                </p>
                                                
                                                {/* Progress bar for completed and current years */}
                                                {(isCompleted || isCurrentYear) && (
                                                  <div className="w-full bg-white rounded-full h-2 mt-1">
                                                    <div 
                                                      className={`h-2 rounded-full ${
                                                        isCompleted ? 'bg-green-500' : 'bg-blue-500'
                                                      }`}
                                                      style={{ 
                                                        width: `${displayProgress}%` 
                                                      }}
                                                    />
                                                  </div>
                                                )}
                                              </div>
                                              
                                              {/* Status indicator */}
                                              <div className={`w-2 h-2 rounded-full mx-auto mt-2 ${
                                                isCompleted ? 'bg-green-500' :
                                                isCurrentYear ? 'bg-blue-500' :
                                                'bg-gray-400'
                                              }`} />
                                            </div>
                                          );
                                        })}
                                      </div>
                                      
                                      {/* Year-on-Year Performance Summary */}
                                      <div className="mt-4 p-3 bg-white rounded-lg border">
                                        <h6 className="font-medium text-gray-700 mb-3">Performance Tracking Summary</h6>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                          <div>
                                            <div className="flex justify-between mb-1">
                                              <span className="text-gray-600">Y1 Achievement:</span>
                                              <span className="font-medium text-green-600">✓ 100%</span>
                                            </div>
                                            <div className="flex justify-between mb-1">
                                              <span className="text-gray-600">Y2 Progress vs Target:</span>
                                              <span className="font-medium text-blue-600">{currentYearProgress}%</span>
                                            </div>
                                          </div>
                                          <div>
                                            <div className="flex justify-between mb-1">
                                              <span className="text-gray-600">5-Year Progress:</span>
                                              <span className="font-medium text-purple-600">{fiveYearProgress}%</span>
                                            </div>
                                            <div className="flex justify-between mb-1">
                                              <span className="text-gray-600">Remaining to Final:</span>
                                              <span className="font-medium text-gray-600">{100 - fiveYearProgress}%</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activities" className="h-[calc(100%-4rem)]">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Activities & KPIs</CardTitle>
                    <CardDescription>Activities and their corresponding KPIs for {selectedObjective.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {selectedObjective?.activities?.map((activity, index) => (
                          <Card key={index} className="border-l-4 border-l-blue-500">
                            <CardContent className="pt-4">
                              <div className="space-y-4">
                                {/* Activity Header */}
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-lg">{activity.name}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                      <Badge className={`${getInitiativeStatusColor(activity.status)}`}>
                                        {activity.status.replace("_", " ")}
                                      </Badge>
                                      <span className="text-sm text-gray-500">{activity.completion}% complete</span>
                                    </div>
                                  </div>
                                  <div className="text-right ml-4">
                                    <p className="text-sm text-gray-600">Completion</p>
                                    <p className="text-2xl font-bold text-blue-600">{activity.completion}%</p>
                                  </div>
                                </div>
                                
                                {/* Progress Bar */}
                                <Progress value={activity.completion} className="h-2" />
                                
                                {/* Associated KPI */}
                                <div className="bg-gray-50 p-4 rounded-lg border">
                                  <div className="flex items-center justify-between mb-3">
                                    <h5 className="font-medium text-green-700">Key Performance Indicator</h5>
                                    <Badge className={
                                      activity.kpi.progress >= 90 ? "bg-green-100 text-green-800" :
                                      activity.kpi.progress >= 70 ? "bg-yellow-100 text-yellow-800" :
                                      "bg-red-100 text-red-800"
                                    }>
                                      {activity.kpi.progress}%
                                    </Badge>
                                  </div>
                                  
                                  <h6 className="font-medium mb-2">{activity.kpi.name}</h6>
                                  
                                  <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                                    <div>
                                      <p className="text-gray-600">Baseline</p>
                                      <p className="font-bold">{activity.kpi.baseline}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Current</p>
                                      <p className="font-bold text-blue-600">{activity.kpi.current}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">Target</p>
                                      <p className="font-bold text-green-600">{activity.kpi.target}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="mb-3">
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Progress to Target</span>
                                      <span>{activity.kpi.progress}%</span>
                                    </div>
                                    <Progress value={activity.kpi.progress} className="h-2" />
                                  </div>
                                  
                                  {/* Yearly Targets */}
                                  <div>
                                    <p className="text-sm font-medium text-gray-700 mb-2">Yearly Targets</p>
                                    <div className="grid grid-cols-5 gap-1 text-xs">
                                      <div className="text-center p-2 bg-white rounded border">
                                        <p className="font-medium">Y1</p>
                                        <p>{activity.kpi.yearlyTargets.Y1}</p>
                                      </div>
                                      <div className="text-center p-2 bg-blue-50 rounded border border-blue-200">
                                        <p className="font-medium">Y2</p>
                                        <p>{activity.kpi.yearlyTargets.Y2}</p>
                                      </div>
                                      <div className="text-center p-2 bg-white rounded border">
                                        <p className="font-medium">Y3</p>
                                        <p>{activity.kpi.yearlyTargets.Y3}</p>
                                      </div>
                                      <div className="text-center p-2 bg-white rounded border">
                                        <p className="font-medium">Y4</p>
                                        <p>{activity.kpi.yearlyTargets.Y4}</p>
                                      </div>
                                      <div className="text-center p-2 bg-green-50 rounded border border-green-200">
                                        <p className="font-medium">Y5</p>
                                        <p>{activity.kpi.yearlyTargets.Y5}</p>
                                      </div>
                                    </div>
                                  </div>
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

              <TabsContent value="timeline" className="h-[calc(100%-4rem)]">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Implementation Timeline</CardTitle>
                    <CardDescription>Activity milestones and KPI targets for {selectedObjective.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-6">
                        {selectedObjective?.activities?.map((activity, activityIndex) => (
                          <div key={activityIndex} className="relative">
                            {/* Activity Timeline Header */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-l-blue-500">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-lg text-blue-800">{activity.name}</h4>
                                <Badge className={`${getInitiativeStatusColor(activity.status)}`}>
                                  {activity.status.replace("_", " ")}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                              
                              {/* Activity Progress */}
                              <div className="flex items-center gap-4 mb-3">
                                <div className="flex-1">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Activity Progress</span>
                                    <span>{activity.completion}%</span>
                                  </div>
                                  <Progress value={activity.completion} className="h-2" />
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-blue-600">{activity.completion}%</p>
                                  <p className="text-xs text-gray-500">Complete</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* KPI Timeline */}
                            <div className="ml-6 mt-4 space-y-3">
                              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <h5 className="font-medium text-green-800 mb-3">
                                  KPI: {activity.kpi.name}
                                </h5>
                                
                                {/* KPI 5-Year Timeline */}
                                <div className="grid grid-cols-5 gap-3">
                                  {(['Y1', 'Y2', 'Y3', 'Y4', 'Y5'] as const).map((year, yearIndex) => {
                                    const isCurrentYear = year === 'Y2';
                                    const isFinalYear = year === 'Y5';
                                    const isCompleted = yearIndex === 0; // Y1 is completed
                                    const target = activity.kpi.yearlyTargets[year];
                                    
                                    return (
                                      <div key={year} className="relative">
                                        {/* Timeline connector */}
                                        {yearIndex < 4 && (
                                          <div className="absolute top-6 left-1/2 w-full h-0.5 bg-gray-300 z-0" />
                                        )}
                                        
                                        <div className={`relative z-10 p-3 rounded-lg border-2 text-center ${
                                          isCompleted ? 'bg-green-100 border-green-400' :
                                          isCurrentYear ? 'bg-blue-100 border-blue-400' : 
                                          isFinalYear ? 'bg-amber-100 border-amber-400' :
                                          'bg-gray-50 border-gray-300'
                                        }`}>
                                          {/* Timeline dot */}
                                          <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                                            isCompleted ? 'bg-green-500' :
                                            isCurrentYear ? 'bg-blue-500' :
                                            isFinalYear ? 'bg-amber-500' :
                                            'bg-gray-400'
                                          }`} />
                                          
                                          <p className="font-medium text-sm">{year}</p>
                                          <p className="text-lg font-bold mt-1">{target}</p>
                                          <p className="text-xs text-gray-600 mt-1">
                                            {isCompleted ? 'Achieved' : 
                                             isCurrentYear ? 'Current Target' : 
                                             isFinalYear ? 'Final Goal' : 'Milestone'}
                                          </p>
                                          
                                          {isCurrentYear && (
                                            <div className="mt-2">
                                              <div className="text-xs text-blue-700">
                                                Progress: {activity.kpi.progress}%
                                              </div>
                                              <div className="w-full bg-white rounded-full h-1.5 mt-1">
                                                <div 
                                                  className="bg-blue-500 h-1.5 rounded-full" 
                                                  style={{ width: `${activity.kpi.progress}%` }}
                                                />
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                
                                {/* KPI Current Status */}
                                <div className="mt-4 p-3 bg-white rounded border">
                                  <div className="grid grid-cols-3 gap-3 text-sm">
                                    <div className="text-center">
                                      <p className="text-gray-600">Baseline</p>
                                      <p className="font-bold text-gray-800">{activity.kpi.baseline}</p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-gray-600">Current</p>
                                      <p className="font-bold text-blue-600">{activity.kpi.current}</p>
                                    </div>
                                    <div className="text-center">
                                      <p className="text-gray-600">Final Target</p>
                                      <p className="font-bold text-green-600">{activity.kpi.target}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
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
