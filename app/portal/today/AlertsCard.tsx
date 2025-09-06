"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import { allAlertsData } from "@/lib/mockdata"

// KSB Alerts data customized for sugar industry operations
const alertsData = {
  alerts: [
    {
      id: '1',
      title: 'Mill Performance Alert',
      label: 'HIGH',
      description: 'Mill #3 efficiency dropped by 12% - immediate maintenance required',
      timestamp: '2 hours ago • Chemelil Factory',
      category: 'Equipment',
      priority: 'high',
      labelColor: 'bg-red-500',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      id: '2',
      title: 'Environmental Compliance Warning',
      label: 'MEDIUM',
      description: 'West Zone operations require environmental standards review',
      timestamp: '4 hours ago • Environmental Dept',
      category: 'Compliance',
      priority: 'medium',
      labelColor: 'bg-orange-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      id: '3',
      title: 'Weather Advisory',
      label: 'HIGH',
      description: 'Heavy rainfall expected - potential impact on cane transportation',
      timestamp: '6 hours ago • Meteorological Dept',
      category: 'Weather',
      priority: 'high',
      labelColor: 'bg-red-500',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      id: '4',
      title: 'Quality Control Notice',
      label: 'MEDIUM',
      description: 'Sugar purity levels in Batch #247 below standard requirements',
      timestamp: '6 hours ago • Quality Lab',
      category: 'Quality',
      priority: 'medium',
      labelColor: 'bg-yellow-500',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      id: '5',
      title: 'Farmer Payment Update',
      label: 'LOW',
      description: 'Monthly payments processed for Western region farmers',
      timestamp: 'Yesterday • Finance Dept',
      category: 'Operations',
      priority: 'low',
      labelColor: 'bg-green-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: '6',
      title: 'Safety Inspection Reminder',
      label: 'MEDIUM',
      description: 'Quarterly safety inspection due for factory equipment in 3 days',
      timestamp: 'Today • Safety Dept',
      category: 'Safety',
      priority: 'medium',
      labelColor: 'bg-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    ...allAlertsData.map((alert, index) => ({
      id: `alert-${index + 7}`,
      title: alert.title,
      label: alert.label,
      description: alert.description,
      timestamp: alert.timestamp,
      category: alert.area || 'General',
      priority: alert.label === 'Critical' ? 'high' : alert.label === 'Warning' ? 'medium' : 'low',
      labelColor: alert.labelColor,
      iconBg: alert.iconBg,
      iconColor: alert.iconColor
    }))
  ]
}

interface AlertsCardProps {
  className?: string;
  selectedItemId?: string | null;
  setSelectedItemId?: (id: string | null) => void;
  setViewAllAlertsOpen?: (open: boolean) => void;
  setSelectedAlertForDetails?: (id: string | null) => void;
  alertsData?: any;
}

// Alerts Card Component
const AlertsCard: React.FC<AlertsCardProps> = ({ 
  className = "",
  selectedItemId,
  setSelectedItemId,
  setViewAllAlertsOpen,
  setSelectedAlertForDetails,
  alertsData: externalAlertsData
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Equipment' | 'Compliance' | 'Weather' | 'Performance' | 'Payments' | 'Quality' | 'Operations' | 'Safety' | 'General'>('All')
  
  // Use the external alerts data passed from parent (which already includes combined data)
  const allAlertsForCard = externalAlertsData?.alerts || alertsData.alerts

  const categoryCounts = {
    Equipment: allAlertsForCard.filter((a: any) => a.category === 'Equipment').length,
    Compliance: allAlertsForCard.filter((a: any) => a.category === 'Compliance').length,
    Weather: allAlertsForCard.filter((a: any) => a.category === 'Weather').length,
    Performance: allAlertsForCard.filter((a: any) => a.category === 'Equipment' || a.category === 'Quality').length,
    Quality: allAlertsForCard.filter((a: any) => a.category === 'Quality').length,
    Operations: allAlertsForCard.filter((a: any) => a.category === 'Operations').length,
    Safety: allAlertsForCard.filter((a: any) => a.category === 'Safety').length,
    Payments: allAlertsForCard.filter((a: any) => a.category === 'Operations' && a.title.toLowerCase().includes('payment')).length,
    General: allAlertsForCard.filter((a: any) => a.category === 'General').length,
  }

  // Get background color based on priority for hover effect
  const getHoverBgByPriority = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'hover:bg-red-50'
      case 'medium':
        return 'hover:bg-orange-50'
      case 'low':
        return 'hover:bg-green-50'
      default:
        return 'hover:bg-gray-50'
    }
  }

  return (
    <Card className={`rounded-[20px] shadow-lg border-0 bg-white ${className}`}>
      <CardHeader className="pb-1">
        <CardTitle 
          className="text-[#202020] cursor-pointer" 
          onClick={() => {
            if (setSelectedAlertForDetails) setSelectedAlertForDetails(null)
            if (setViewAllAlertsOpen) setViewAllAlertsOpen(true)
          }}
        >
          Alerts
        </CardTitle>
        
        {/* Category Tab Bar */}
        <div className="flex items-center gap-2 mt-4 border-b">
          <div className="flex items-center gap-2 flex-wrap">
            {(['All','Compliance','Weather','Performance','Payments'] as const).map((category) => (
              <button
                key={category}
                className={`text-xs pb-2 -mb-px border-b-2 whitespace-nowrap flex-shrink-0 transition-colors ${
                  selectedCategory === category 
                    ? 'border-blue-600 text-blue-600 font-medium' 
                    : 'border-transparent text-muted-foreground hover:text-gray-700 hover:border-gray-300'
                } flex items-center gap-1`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
                {category !== 'All' && (
                  <Badge className="bg-gray-100 text-gray-700 text-[10px] px-1">
                    {category === 'Compliance' ? categoryCounts.Compliance : 
                     category === 'Weather' ? categoryCounts.Weather : 
                     category === 'Performance' ? categoryCounts.Performance :
                     category === 'Payments' ? categoryCounts.Payments : 0}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div 
          className="space-y-3 overflow-y-auto overflow-x-hidden scrollbar-none hover:scrollbar-thin hover:scrollbar-track-transparent hover:scrollbar-thumb-gray-300" 
          style={{ maxHeight: '240px' }}
        >
          {allAlertsForCard
            .filter((item: any) => {
              if (selectedCategory === 'All') return true
              if (selectedCategory === 'Performance') return item.category === 'Equipment' || item.category === 'Quality'
              if (selectedCategory === 'Payments') return item.category === 'Operations' && item.title.toLowerCase().includes('payment')
              return item.category === selectedCategory
            })
            .map((item: any) => {
              return (
                <div 
                  key={item.id} 
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${getHoverBgByPriority(item.priority)} hover:shadow-md transform hover:scale-[1.02]`}
                  onClick={() => {
                    if (setSelectedAlertForDetails) setSelectedAlertForDetails(item.id)
                    if (setViewAllAlertsOpen) setViewAllAlertsOpen(true)
                  }}
                >
                  {/* Icon with priority-based color */}
                  <div className={`w-8 h-8 ${item.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <AlertTriangle className={`h-4 w-4 ${item.iconColor}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-medium text-[#202020] truncate">{item.title}</h4>
                          <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${
                            item.label?.toUpperCase() === 'HIGH' || item.label === 'Critical' ? 'bg-red-100 text-red-700 border-red-200/30' :
                            item.label?.toUpperCase() === 'MEDIUM' || item.label === 'Warning' ? 'bg-orange-100 text-orange-700 border-orange-200/30' :
                            item.label?.toUpperCase() === 'LOW' || item.label === 'Info' ? 'bg-green-100 text-green-700 border-green-200/30' :
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
              )
            })}
        </div>
      </CardContent>
    </Card>
  )
}

export default AlertsCard
