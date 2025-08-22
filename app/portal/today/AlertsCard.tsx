"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FiAlertTriangle } from 'react-icons/fi'

interface AlertsCardProps {
  className?: string
  selectedItemId?: string | null
  setSelectedItemId?: (id: string | null) => void
  setViewAllAlertsOpen: (open: boolean) => void
  setSelectedAlertForDetails: (id: string | null) => void
  alertsData: any
}

const AlertsCard = ({ 
  className,
  selectedItemId, 
  setSelectedItemId, 
  setViewAllAlertsOpen, 
  setSelectedAlertForDetails, 
  alertsData 
}: AlertsCardProps) => {
  const handleItemAction = (action: string, itemId: string) => {
    console.log(`${action} action for item ${itemId}`)
    if (setSelectedItemId) {
      setSelectedItemId(null)
    }
    
    if (action === 'details') {
      setSelectedAlertForDetails(itemId)
      setViewAllAlertsOpen(true)
    }
  }

  return (
    <Card className={`rounded-[20px] shadow-lg border-0 bg-white ${className || ''}`}>
      <CardHeader className="pb-1">
        <CardTitle className="text-[#202020] cursor-pointer" onClick={() => {
          setSelectedAlertForDetails(null)
          setViewAllAlertsOpen(true)
        }}>Alerts</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* Alert Content - No tabs, just alerts (limited to 3 most recent) */}
        <div className="space-y-3">
          {alertsData.alerts.slice(0, 3).map((item: any) => (
            <div 
              key={item.id} 
              className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                item.iconColor === 'text-red-600' ? 'hover:bg-red-50' :
                item.iconColor === 'text-orange-600' ? 'hover:bg-orange-50' :
                item.iconColor === 'text-yellow-600' ? 'hover:bg-yellow-50' :
                item.iconColor === 'text-blue-600' ? 'hover:bg-blue-50' :
                item.iconColor === 'text-green-600' ? 'hover:bg-green-50' :
                item.iconColor === 'text-purple-600' ? 'hover:bg-purple-50' :
                'hover:bg-gray-50'
              } hover:shadow-md`}
              onClick={(e: React.MouseEvent) => {
                // Only trigger if not clicking on the ellipsis button
                if (!(e.target as HTMLElement).closest('.ellipsis-menu')) {
                  setSelectedAlertForDetails(item.id)
                  setViewAllAlertsOpen(true)
                }
              }}
            >
              {/* Icon */}
              <div className={`w-8 h-8 ${item.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <FiAlertTriangle className={`h-4 w-4 ${item.iconColor}`} />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-[#202020] truncate">{item.title}</h4>
                      <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${
                        item.labelColor === 'bg-red-500' ? 'bg-red-50/80 text-red-700 border-gray-300' :
                        item.labelColor === 'bg-orange-500' ? 'bg-orange-50/80 text-orange-700 border-gray-300' :
                        item.labelColor === 'bg-yellow-500' ? 'bg-yellow-50/80 text-yellow-700 border-gray-300' :
                        item.labelColor === 'bg-blue-500' ? 'bg-blue-50/80 text-blue-700 border-gray-300' :
                        item.labelColor === 'bg-green-500' ? 'bg-green-50/80 text-green-700 border-gray-300' :
                        item.labelColor === 'bg-purple-500' ? 'bg-purple-50/80 text-purple-700 border-gray-300' :
                        'bg-gray-50/80 text-gray-700 border-gray-300'
                      }`}>
                        {item.label}
                      </div>
                    </div>
                    <p className="text-xs text-[#6B6B6B] mb-1">{item.description}</p>
                    <p className="text-xs text-[#9CA3AF]">{item.timestamp}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default AlertsCard
