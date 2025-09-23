import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Package, CheckCircle, AlertCircle, MapPin } from "lucide-react"

const TraceabilityCard = () => {
  const traceabilityData = [
    { stage: "Field to Mill", completion: 92, status: "active" },
    { stage: "Mill to Warehouse", completion: 88, status: "active" },
    { stage: "Warehouse to Market", completion: 76, status: "warning" },
  ]

  return (
    <Card className="rounded-[20px] shadow-lg border-0 bg-white" style={{ height: "360px" }}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">Traceability</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-gray-800">85.3%</span>
          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
            +3.2% this month
          </span>
        </div>
        
        <div className="space-y-3">
          {traceabilityData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{item.stage}</span>
                <span className="font-medium text-gray-800">{item.completion}%</span>
              </div>
              <Progress 
                value={item.completion} 
                className="h-2"
                style={{
                  background: '#e5e7eb',
                }}
              />
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-2 pt-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-500">Full supply chain visibility</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default TraceabilityCard
