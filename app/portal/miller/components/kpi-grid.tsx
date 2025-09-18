"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  TrendingUp, 
  Factory, 
  BarChart3, 
  AlertTriangle 
} from "lucide-react"

export function KpiGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Sugar Production Efficiency */}
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-5 w-5" style={{ color: '#f7c35f' }} />
          </div>
          <div className="text-2xl font-bold" style={{ color: '#334b35' }}>89%</div>
          <div className="text-sm text-gray-600 mb-1">sugar efficiency</div>
          <div className="text-xs text-gray-500">vs target production</div>
        </CardContent>
      </Card>

      {/* Production Rate */}
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Factory className="h-5 w-5" style={{ color: '#f7c35f' }} />
          </div>
          <div className="text-2xl font-bold" style={{ color: '#334b35' }}>96.3%</div>
          <div className="text-sm text-gray-600 mb-1">production rate</div>
          <div className="text-xs text-gray-500">Mill efficiency rate</div>
        </CardContent>
      </Card>

      {/* Tons Processed */}
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="h-5 w-5" style={{ color: '#f7c35f' }} />
          </div>
          <div className="text-2xl font-bold" style={{ color: '#334b35' }}>2,847</div>
          <div className="text-sm text-gray-600 mb-1">MT processed</div>
          <div className="text-xs text-gray-500">Processed today</div>
        </CardContent>
      </Card>

      {/* Quality Issues */}
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="h-5 w-5" style={{ color: '#f7c35f' }} />
          </div>
          <div className="text-2xl font-bold" style={{ color: '#334b35' }}>12</div>
          <div className="text-sm text-gray-600 mb-1">Quality Issues</div>
          <div className="text-xs text-gray-500">Detected & flagged</div>
        </CardContent>
      </Card>
    </div>
  )
}