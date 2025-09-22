import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Map, Layers, Navigation } from "lucide-react"

const GISFarmMappingCard = () => {
  const zones = [
    { name: "Zone A", farms: 342, area: "2,341 Ha", status: "mapped" },
    { name: "Zone B", farms: 289, area: "1,876 Ha", status: "mapped" },
    { name: "Zone C", farms: 156, area: "987 Ha", status: "in-progress" },
    { name: "Zone D", farms: 203, area: "1,543 Ha", status: "mapped" },
  ]

  return (
    <Card className="rounded-[20px] shadow-lg border-0 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">GIS Farm Mapping</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-gray-800">990</span>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              87% mapped
            </span>
          </div>
          <p className="text-sm text-gray-500">Total farms registered</p>
        </div>

        <div className="relative h-32 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg mb-4 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded ${
                    i === 3 ? 'bg-teal-300' : 'bg-teal-400'
                  } opacity-60`}
                />
              ))}
            </div>
          </div>
          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
            <Navigation className="h-3 w-3 text-teal-600" />
            <span className="text-xs font-medium text-teal-600">Live</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {zones.slice(0, 2).map((zone, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-2">
                <div className="flex items-center gap-1 mb-1">
                  <Layers className="h-3 w-3 text-gray-400" />
                  <span className="font-medium text-gray-700">{zone.name}</span>
                </div>
                <p className="text-gray-500">{zone.farms} farms</p>
                <p className="text-gray-400">{zone.area}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default GISFarmMappingCard
