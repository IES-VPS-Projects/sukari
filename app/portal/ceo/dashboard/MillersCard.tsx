import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Activity } from "lucide-react"

const MillersCard = () => {
  return (
    <Card className="rounded-[20px] shadow-lg border-0 h-[380px] relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/sugar_mill.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* No dark overlay anymore */}
      </div>
      
      <CardContent className="relative z-10 p-6 h-full flex flex-col text-white">
        {/* Removed factory icon and active badge */}
        
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">Welcome,</h2>
          <h2 className="text-3xl font-bold mb-2">Gerald</h2>
          {/* Removed "Kenya Sugar Board Dashboard" subtitle */}
        </div>
        
        {/* Stack cards vertically with reduced width */}
        <div className="space-y-3 mt-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 w-1/2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-white/90">Active Mills</span>
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-white/80">of 15 operational</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 w-1/2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-white/90">Efficiency</span>
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-bold">85%</p>
              <p className="text-xs text-white/80">average capacity</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MillersCard
