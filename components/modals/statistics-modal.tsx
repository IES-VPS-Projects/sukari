"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3 } from "lucide-react"

interface StatisticsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StatisticsModal({ open, onOpenChange }: StatisticsModalProps) {
  const activityStats = [
    { label: "Mills Monitored", value: 47, total: 50, color: "bg-green-500" },
    { label: "Inspections Completed", value: 234, total: 250, color: "bg-blue-500" },
    { label: "Compliance Rate", value: 94, total: 100, color: "bg-purple-500" },
    { label: "Reports Generated", value: 156, total: 200, color: "bg-orange-500" },
    { label: "Stakeholder Meetings", value: 28, total: 30, color: "bg-pink-500" },
    { label: "Training Sessions", value: 12, total: 15, color: "bg-cyan-500" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <BarChart3 className="h-5 w-5" />
            Performance Statistics
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6 space-y-6">
          <p className="text-gray-600">Your performance metrics and activity statistics</p>
          
          <div className="grid gap-6 md:grid-cols-2">
            {activityStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{stat.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <span className="text-sm text-muted-foreground">of {stat.total}</span>
                    </div>
                    <Progress value={(stat.value / stat.total) * 100} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {Math.round((stat.value / stat.total) * 100)}% completion rate
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">94%</div>
                  <p className="text-sm text-muted-foreground">Compliance Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">4.8</div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">156</div>
                  <p className="text-sm text-muted-foreground">Reports Generated</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">98%</div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">August 2025</span>
                  <span className="text-sm text-gray-600">47 activities completed</span>
                </div>
                <Progress value={89} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">July 2025</span>
                  <span className="text-sm text-gray-600">52 activities completed</span>
                </div>
                <Progress value={95} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">June 2025</span>
                  <span className="text-sm text-gray-600">38 activities completed</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
