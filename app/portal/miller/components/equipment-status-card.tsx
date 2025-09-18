"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Factory } from "lucide-react"

interface EquipmentStatusData {
  id: string
  status: 'active' | 'maintenance' | 'offline'
  efficiency: number
  location: string
}

interface EquipmentStatusCardProps {
  equipmentStatus: EquipmentStatusData[]
}

export function EquipmentStatusCard({ equipmentStatus }: EquipmentStatusCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold" style={{ color: '#334b35' }}>
          Realtime Equipment Status
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative">
          {/* Equipment Status Map */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {equipmentStatus.map((equipment, index) => (
              <div key={index} className="text-center">
                <div 
                  className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                    equipment.status === 'active' ? 'bg-green-100' : 
                    equipment.status === 'maintenance' ? 'bg-orange-100' : 'bg-gray-100'
                  }`}
                >
                  <Factory 
                    className={`h-6 w-6 ${
                      equipment.status === 'active' ? 'text-green-600' : 
                      equipment.status === 'maintenance' ? 'text-orange-600' : 'text-gray-600'
                    }`} 
                  />
                </div>
                <div className="text-sm font-medium">{equipment.location}</div>
              </div>
            ))}
          </div>

          {/* Active Equipment Detail */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                  <Factory className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-base">MILL-001-351.2</div>
                  <div className="text-sm text-gray-500 mt-1">5 min ago</div>
                  <div className="text-sm text-gray-500">92% efficiency</div>
                  <div className="text-sm text-gray-500">Zone A operations</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional status indicators */}
          <div className="mt-3 grid grid-cols-3 gap-3 text-center text-sm">
            <div>
              <div className="text-green-600 font-semibold">92%</div>
              <div className="text-gray-500">Efficiency</div>
            </div>
            <div>
              <div className="text-blue-600 font-semibold">24°C</div>
              <div className="text-gray-500">Temperature</div>
            </div>
            <div>
              <div className="text-purple-600 font-semibold">Active</div>
              <div className="text-gray-500">Status</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}