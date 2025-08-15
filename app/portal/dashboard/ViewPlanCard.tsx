"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp, Users, CheckCircle, AlertTriangle, Clock, Award } from "lucide-react"
import { ViewPlanModal } from "@/components/modals/view-plan-modal"

interface ViewPlanCardProps {
  className?: string
}

const ViewPlanCard = ({ className }: ViewPlanCardProps) => {
  const [viewPlanOpen, setViewPlanOpen] = useState(false)

  // Sample plan overview data
  const planOverview = {
    title: "Strategic Plan 2024-2025",
    progress: 72,
    totalObjectives: 5,
    completedObjectives: 2,
    onTrackObjectives: 2,
    atRiskObjectives: 1,
    keyMetrics: [
      { label: "Overall Progress", value: "72%", status: "on_track" },
      { label: "Budget Utilization", value: "68%", status: "on_track" },
      { label: "Timeline Adherence", value: "85%", status: "ahead" },
      { label: "Risk Level", value: "Medium", status: "caution" }
    ]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on_track":
      case "ahead":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "caution":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <Clock className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <>
      <Card className={`rounded-[20px] shadow-lg border-0 bg-white cursor-pointer hover:shadow-xl transition-shadow duration-200 ${className}`} 
            onClick={() => setViewPlanOpen(true)}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-[#202020] flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                View Strategic Plan
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#202020]">Overall Progress</span>
              <span className="text-sm font-bold text-blue-600">{planOverview.progress}%</span>
            </div>
            <Progress value={planOverview.progress} className="h-2" />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-[#202020]">{planOverview.completedObjectives}</div>
              <p className="text-xs text-[#6B6B6B]">Completed</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{planOverview.onTrackObjectives}</div>
              <p className="text-xs text-[#6B6B6B]">On Track</p>
            </div>
          </div>

          {/* Key Metrics Summary */}
          <div className="space-y-2">
            {planOverview.keyMetrics.slice(0, 2).map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(metric.status)}
                  <span className="text-xs text-[#202020]">{metric.label}</span>
                </div>
                <span className="text-xs font-medium text-[#202020]">{metric.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Plan Modal */}
      <ViewPlanModal open={viewPlanOpen} onOpenChange={setViewPlanOpen} />
    </>
  )
}

export default ViewPlanCard
