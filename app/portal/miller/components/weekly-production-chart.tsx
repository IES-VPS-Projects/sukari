"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WeeklyProductionData {
  day: string
  production: number
}

interface WeeklyProductionChartProps {
  weeklyProduction: WeeklyProductionData[]
}

export function WeeklyProductionChart({ weeklyProduction }: WeeklyProductionChartProps) {
  const maxProduction = Math.max(...weeklyProduction.map(d => d.production))

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold" style={{ color: '#334b35' }}>
          Weekly Production Hours
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-48 flex flex-col justify-between py-2 text-xs text-gray-500">
            <span>{maxProduction}</span>
            <span>{Math.round(maxProduction * 0.75)}</span>
            <span>{Math.round(maxProduction * 0.5)}</span>
            <span>{Math.round(maxProduction * 0.25)}</span>
            <span>0</span>
          </div>
          
          {/* Chart area with grid lines */}
          <div className="ml-8 relative">
            {/* Horizontal grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="w-full h-px bg-gray-200"></div>
              ))}
            </div>
            
            {/* Bars */}
            <div className="flex items-end justify-between h-48 gap-2 relative z-10">
              {weeklyProduction.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full rounded-t transition-all duration-300 hover:opacity-80 min-h-4"
                    style={{
                      height: `${(data.production / maxProduction) * 160}px`,
                      backgroundColor: index % 2 === 0 ? '#f7c35f' : '#d1d5db'
                    }}
                  />
                  <div className="text-xs mt-2 font-medium text-gray-600">
                    {data.day}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* X-axis label */}
          <div className="ml-8 mt-4 text-center text-xs text-gray-500">
            Days of the Week
          </div>
          
          {/* Y-axis label */}
          <div className="absolute left-0 top-1/2 transform -rotate-90 -translate-y-1/2 -translate-x-4 text-xs text-gray-500">
            Production Hours
          </div>
        </div>
      </CardContent>
    </Card>
  )
}