"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FleetStatusCard() {
  return (
    <Card className="shadow-lg flex-grow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold" style={{ color: '#334b35' }}>
          Equipment Fleet Status
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex flex-col justify-center">
        <div className="relative">
          <div className="flex justify-center mb-4">
            <div 
              className="w-28 h-28 rounded-full flex items-center justify-center text-center"
              style={{ 
                background: `conic-gradient(#22c55e 0deg ${75 * 3.6}deg, #f59e0b ${75 * 3.6}deg ${90 * 3.6}deg, #ef4444 ${90 * 3.6}deg 360deg)` 
              }}
            >
              <div className="bg-white rounded-full w-18 h-18 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm font-bold">3/4</div>
                  <div className="text-xs">Mills</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-around text-center text-sm">
            <div>
              <div className="w-3 h-3 bg-green-500 rounded mx-auto mb-1"></div>
              <div>2 active</div>
            </div>
            <div>
              <div className="w-3 h-3 bg-yellow-500 rounded mx-auto mb-1"></div>
              <div>1 maintenance</div>
            </div>
            <div>
              <div className="w-3 h-3 bg-red-500 rounded mx-auto mb-1"></div>
              <div>0 offline</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}