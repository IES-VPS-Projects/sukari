"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileCheck } from "lucide-react"

const PermitsCard = () => {
  // Mock permits data
  const permitsData = {
    totalPermits: 156,
    approved: 125,
    pending: 23,
    rejected: 8,
    approvalRate: 80.1,
    monthlyGrowth: 12.5
  }

  return (
    <Card className="rounded-[20px] shadow-lg border-0 bg-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Permits</h3>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold text-gray-800">{permitsData.totalPermits}</span>
          <span className="text-xs text-green-600">+{permitsData.monthlyGrowth}%</span>
        </div>
        <Progress value={permitsData.approvalRate} className="h-1.5 mb-2" />
        <p className="text-xs text-gray-500">Approval: {permitsData.approvalRate}%</p>
      </CardContent>
    </Card>
  )
}

export default PermitsCard
