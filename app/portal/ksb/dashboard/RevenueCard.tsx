import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const RevenueCard = () => {
  return (
    <Card className="rounded-[20px] shadow-lg border-0 bg-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Revenue</h3>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold text-gray-800">2.4B</span>
          <span className="text-xs text-green-600">+18%</span>
        </div>
        <Progress value={92} className="h-1.5 mb-2" />
        <p className="text-xs text-gray-500">KSh this quarter</p>
      </CardContent>
    </Card>
  )
}

export default RevenueCard
