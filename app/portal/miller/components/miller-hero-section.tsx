"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Factory, TrendingUp } from "lucide-react"

interface MillerHeroSectionProps {
  profileData: {
    firstName: string
  }
}

export function MillerHeroSection({ profileData }: MillerHeroSectionProps) {
  return (
    <Card className="relative overflow-hidden shadow-lg border-0" style={{ backgroundColor: '#334b35' }}>
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/sugar_mill.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <CardContent className="relative p-6 text-white z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1 text-white drop-shadow-lg">Welcome,</h1>
            <h2 className="text-xl font-semibold text-white drop-shadow-lg">{profileData.firstName}</h2>
          </div>
        </div>

        {/* Left half container for glass morphism cards */}
        <div className="w-1/2 space-y-4">
          {/* Active Mills Counter */}
          <Card className="bg-black/30 backdrop-blur-md border-white/30 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white drop-shadow-lg">3</div>
                  <div className="text-sm text-white/95 drop-shadow">Active Mills</div>
                  <div className="flex gap-4 text-xs mt-1 text-white/90 drop-shadow">
                    <span>✓ 2 Operating</span>
                    <span>⚠ 1 Maintenance</span>
                  </div>
                </div>
                <Factory className="h-8 w-8 text-white/80 drop-shadow-lg" />
              </div>
            </CardContent>
          </Card>

          {/* Daily Production */}
          <Card className="bg-black/30 backdrop-blur-md border-white/30 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white drop-shadow-lg">847.2</div>
                  <div className="text-sm text-white/95 drop-shadow">Production Hours Today</div>
                  <div className="flex gap-4 text-xs mt-1 text-white/90 drop-shadow">
                    <span>⚡ 2,500 MT</span>
                    <span>🌡 24°C</span>
                    <span>💧 65%</span>
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-white/80 drop-shadow-lg" />
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}