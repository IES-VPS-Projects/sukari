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
      <CardHeader className="pb-3">
        <CardTitle className="text-[#202020]">
          Permits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-[#202020]">{permitsData.totalPermits}</div>
            <p className="text-xs text-[#6B6B6B]">Total Permits</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">{permitsData.approved}</div>
            <p className="text-xs text-[#6B6B6B]">Approved</p>
          </div>
        </div>

        {/* Approval Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#202020]">Approval Rate</span>
            <span className="text-sm font-bold text-blue-600">{permitsData.approvalRate}%</span>
          </div>
          <Progress value={permitsData.approvalRate} className="h-2" />
        </div>

        {/* Growth Indicator */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#6B6B6B]">Monthly Growth</span>
          <span className="text-xs text-green-600">+{permitsData.monthlyGrowth}%</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default PermitsCard
