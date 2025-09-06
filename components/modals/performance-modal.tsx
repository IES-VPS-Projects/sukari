"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Activity, TrendingUp, Users, Target, Award } from "lucide-react"

interface PerformanceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PerformanceModal({ open, onOpenChange }: PerformanceModalProps) {
  const performanceData = {
    sugarProductionSuccess: 98,
    leadershipRating: 4.9,
    farmersEngaged: 234,
    regulatoryInspections: 47,
    qualityAssessments: 89,
    complianceScore: 96,
    totalInspectionTargets: 50,
    totalQualityGoal: 100,
    totalProductionGoal: 100,
    totalFarmerGoal: 250,
    performanceBreakdown: {
      regulatoryInspections: 47,
      qualityAssessments: 89,
      farmersEngaged: 234,
      sugarProductionSuccess: 98
    },
    performanceTrends: [
      { quarter: "Q1 2024", percentage: 12, trend: "positive" },
      { quarter: "Q2 2024", percentage: 8, trend: "positive" },
      { quarter: "Q3 2024", percentage: 15, trend: "positive" },
      { quarter: "Q4 2024", percentage: 5, trend: "positive" }
    ]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Performance Metrics
          </DialogTitle>
          <DialogDescription>
            Your KSB operational performance ratings and detailed metrics
          </DialogDescription>
        </DialogHeader>
        
        <Separator className="mb-6" />
        
        <div className="space-y-6">
          {/* Service Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">KSB Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold">{performanceData.sugarProductionSuccess}%</div>
                  <div className="text-sm text-muted-foreground">Sugar Production Success</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">{performanceData.leadershipRating}</div>
                  <div className="text-sm text-muted-foreground">Leadership Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">{performanceData.farmersEngaged}</div>
                  <div className="text-sm text-muted-foreground">Farmers Engaged</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Regulatory Inspections */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Regulatory Inspections</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{performanceData.regulatoryInspections}</span>
                    <span className="text-sm text-muted-foreground">of {performanceData.totalInspectionTargets}</span>
                  </div>
                  <Progress value={(performanceData.regulatoryInspections / performanceData.totalInspectionTargets) * 100} className="h-2" />
                  <div className="text-sm text-muted-foreground">
                    {Math.round((performanceData.regulatoryInspections / performanceData.totalInspectionTargets) * 100)}% completion rate
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quality Assessments */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Quality Assessments</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{performanceData.qualityAssessments}</span>
                    <span className="text-sm text-muted-foreground">of {performanceData.totalQualityGoal}</span>
                  </div>
                  <Progress value={(performanceData.qualityAssessments / performanceData.totalQualityGoal) * 100} className="h-2" />
                  <div className="text-sm text-muted-foreground">
                    {Math.round((performanceData.qualityAssessments / performanceData.totalQualityGoal) * 100)}% completion rate
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sugar Production Success */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="font-medium">Sugar Production Success</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{performanceData.sugarProductionSuccess}</span>
                    <span className="text-sm text-muted-foreground">of {performanceData.totalProductionGoal}</span>
                  </div>
                  <Progress value={performanceData.sugarProductionSuccess} className="h-2" />
                  <div className="text-sm text-muted-foreground">
                    {performanceData.sugarProductionSuccess}% completion rate
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Farmers Engaged */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="font-medium">Farmers Engaged</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{performanceData.farmersEngaged}</span>
                    <span className="text-sm text-muted-foreground">of {performanceData.totalFarmerGoal}</span>
                  </div>
                  <Progress value={(performanceData.farmersEngaged / performanceData.totalFarmerGoal) * 100} className="h-2" />
                  <div className="text-sm text-muted-foreground">
                    {Math.round((performanceData.farmersEngaged / performanceData.totalFarmerGoal) * 100)}% completion rate
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span className="text-sm">Regulatory Inspections</span>
                  </div>
                  <span className="font-bold">{performanceData.performanceBreakdown.regulatoryInspections}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Quality Assessments</span>
                  </div>
                  <span className="font-bold">{performanceData.performanceBreakdown.qualityAssessments}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Farmers Engaged</span>
                  </div>
                  <span className="font-bold">{performanceData.performanceBreakdown.farmersEngaged}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span className="text-sm">Sugar Production Success</span>
                  </div>
                  <span className="font-bold">{performanceData.performanceBreakdown.sugarProductionSuccess}</span>
                </div>
              </CardContent>
            </Card>

            {/* Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceData.performanceTrends.map((trend) => (
                  <div key={trend.quarter} className="flex justify-between items-center">
                    <span className="text-sm">{trend.quarter}</span>
                    <span className={`font-bold ${trend.trend === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      +{trend.percentage}%
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
