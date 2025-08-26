"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

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
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-[#6B6B6B]">Permits</h3>
        </div>
        <div className="text-2xl font-bold text-[#202020] mb-1">{permitsData.totalPermits}</div>
        <p className="text-xs text-[#6B6B6B] mb-3">total permits processed</p>
        <p className="text-xs text-green-600 mb-2">+{permitsData.monthlyGrowth}% from last month</p>
        <Progress value={permitsData.approvalRate} className="h-2 mb-2" />
        <div className="text-xs text-[#6B6B6B]">Approval Rate: {permitsData.approvalRate}%</div>
      </CardContent>
    </Card>
  )
}

export default PermitsCard
