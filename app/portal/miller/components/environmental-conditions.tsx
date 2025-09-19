"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer } from "lucide-react"

export function EnvironmentalConditions() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold" style={{ color: '#334b35' }}>
          Environmental Conditions
        </CardTitle>
        <div className="text-sm text-gray-600">Processing conditions - This week</div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full border-8 border-gray-200 relative">
              <div 
                className="absolute inset-2 rounded-full"
                style={{ 
                  background: `conic-gradient(#22c55e 0deg 120deg, #f59e0b 120deg 240deg, #ef4444 240deg 360deg)` 
                }}
              />
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <Thermometer className="h-4 w-4" style={{ color: '#334b35' }} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded"></div>
                <span>Optimal</span>
              </div>
              <div className="text-gray-600">20-25°C</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 bg-yellow-500 rounded"></div>
                <span>Caution</span>
              </div>
              <div className="text-gray-600">25-30°C</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 bg-red-500 rounded"></div>
                <span>Alert</span>
              </div>
              <div className="text-gray-600">30+°C</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}