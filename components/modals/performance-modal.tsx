"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Award, Users, BarChart3, Star } from "lucide-react"

interface PerformanceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PerformanceModal({ open, onOpenChange }: PerformanceModalProps) {
  const performanceData = {
    operationalSuccessRate: 98,
    leadershipRating: 4.9,
    personnelTrained: 234,
    trainingExercises: 89,
    complianceScore: 96,
    stakeholderSatisfaction: 94,
    monthlyMetrics: [
      { month: "Jan", score: 95 },
      { month: "Feb", score: 97 },
      { month: "Mar", score: 94 },
      { month: "Apr", score: 98 },
      { month: "May", score: 96 },
      { month: "Jun", score: 99 }
    ]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6" />
            Performance Metrics
          </DialogTitle>
          <DialogDescription>
            Service performance analytics and key performance indicators
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Key Performance Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{performanceData.operationalSuccessRate}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">{performanceData.leadershipRating}</div>
                <div className="text-sm text-muted-foreground">Leadership</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{performanceData.personnelTrained}</div>
                <div className="text-sm text-muted-foreground">Personnel Trained</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{performanceData.trainingExercises}</div>
                <div className="text-sm text-muted-foreground">Training Sessions</div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Operational Success Rate</span>
                    <span className="text-sm text-muted-foreground">{performanceData.operationalSuccessRate}%</span>
                  </div>
                  <Progress value={performanceData.operationalSuccessRate} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Compliance Score</span>
                    <span className="text-sm text-muted-foreground">{performanceData.complianceScore}%</span>
                  </div>
                  <Progress value={performanceData.complianceScore} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Stakeholder Satisfaction</span>
                    <span className="text-sm text-muted-foreground">{performanceData.stakeholderSatisfaction}%</span>
                  </div>
                  <Progress value={performanceData.stakeholderSatisfaction} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Performance Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Monthly Performance Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {performanceData.monthlyMetrics.map((metric) => (
                  <div key={metric.month} className="text-center">
                    <div className="text-lg font-bold">{metric.score}%</div>
                    <div className="text-sm text-muted-foreground">{metric.month}</div>
                    <div className="mt-1">
                      <div 
                        className="h-2 bg-green-200 rounded"
                        style={{ 
                          background: `linear-gradient(to right, #22c55e ${metric.score}%, #e5e7eb ${metric.score}%)` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Leadership Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Team Management</span>
                  <Badge variant="secondary">Excellent</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Decision Making</span>
                  <Badge variant="secondary">Outstanding</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Strategic Planning</span>
                  <Badge variant="secondary">Excellent</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Operational Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Project Delivery</span>
                  <Badge variant="secondary">On Time</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Quality Standards</span>
                  <Badge variant="secondary">Exceeded</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Innovation</span>
                  <Badge variant="secondary">High</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
