"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertTriangle, ChevronDown } from "lucide-react"
import { alertsData as importedAlertsData } from "../data/alerts-data"

// KSB Alerts data customized for sugar industry operations
const alertsData = {
  alerts: [
    {
      id: '1',
      title: 'Mill Performance Alert',
      label: 'HIGH',
      description: 'Mill #3 efficiency dropped by 12% - immediate maintenance required',
      timestamp: '2 hours ago • Chemelil Factory',
      category: 'Production',
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
      category: 'Production',
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
      category: 'Production',
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
      category: 'Revenue',
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
      category: 'Compliance',
      priority: 'medium',
      labelColor: 'bg-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    ...importedAlertsData.map((alert, index) => ({
      id: `alert-${index + 7}`,
      title: alert.title,
      label: alert.label,
      description: alert.description,
      timestamp: alert.timestamp,
      category: alert.title === 'Locust Infestation' ? 'Production' :
                alert.title === 'Weather Alert' ? 'Production' :
                alert.title === 'Weather' ? 'Production' :
                alert.title === 'Disbursement Approval' ? 'Revenue' :
                alert.title === 'Equipment Maintenance' ? 'Stakeholders' :
                alert.title === 'Quality Control Notice' ? 'Stakeholders' :
                alert.title === 'System Performance Alert' ? 'Stakeholders' :
                alert.area === 'Equipment' ? 'Production' :
                alert.area === 'Quality' ? 'Production' :
                alert.area === 'Operations' ? 'Production' :
                alert.area === 'Safety' ? 'Compliance' :
                alert.area === 'Payments' ? 'Revenue' :
                alert.area === 'Performance' ? 'Reports' :
                alert.area === 'Weather' ? 'Production' :
                alert.area === 'Disaster' ? 'Compliance' :
                alert.area === 'General' ? 'Reports' : 'Reports',
      priority: alert.label === 'HIGH' || alert.label === 'Critical' ? 'high' : alert.label === 'MEDIUM' || alert.label === 'Warning' || alert.label === 'Medium' ? 'medium' : 'low',
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
  const [selectedPriority, setSelectedPriority] = useState<'All' | 'High' | 'Medium' | 'Low'>('All')
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Permits' | 'Revenue' | 'Stakeholders' | 'Compliance' | 'Strategic-plan' | 'Reports' | 'Production'>('All')
  
  // Use the external alerts data passed from parent (which already includes combined data)
  const allAlertsForCard = externalAlertsData?.alerts || alertsData.alerts || []

  const priorityCounts = {
    High: allAlertsForCard.filter((a: any) => a.priority === 'high' || a.label?.toUpperCase() === 'HIGH').length,
    Medium: allAlertsForCard.filter((a: any) => a.priority === 'medium' || a.label?.toUpperCase() === 'MEDIUM').length,
    Low: allAlertsForCard.filter((a: any) => a.priority === 'low' || a.label?.toUpperCase() === 'LOW').length,
  }

  const categoryCounts = {
    Permits: allAlertsForCard.filter((a: any) => a.category === 'Permits').length,
    Revenue: allAlertsForCard.filter((a: any) => a.category === 'Revenue').length,
    Stakeholders: allAlertsForCard.filter((a: any) => a.category === 'Stakeholders').length,
    Compliance: allAlertsForCard.filter((a: any) => a.category === 'Compliance').length,
    'Strategic-plan': allAlertsForCard.filter((a: any) => a.category === 'Strategic-plan').length,
    Reports: allAlertsForCard.filter((a: any) => a.category === 'Reports').length,
    Production: allAlertsForCard.filter((a: any) => a.category === 'Production').length,
    Equipment: allAlertsForCard.filter((a: any) => a.category === 'Equipment').length,
    Weather: allAlertsForCard.filter((a: any) => a.category === 'Weather').length,
    Performance: allAlertsForCard.filter((a: any) => a.category === 'Performance').length,
    Quality: allAlertsForCard.filter((a: any) => a.category === 'Quality').length,
    Operations: allAlertsForCard.filter((a: any) => a.category === 'Operations').length,
    Safety: allAlertsForCard.filter((a: any) => a.category === 'Safety').length,
    Payments: allAlertsForCard.filter((a: any) => a.category === 'Payments').length,
    General: allAlertsForCard.filter((a: any) => a.category === 'General').length,
    Disaster: allAlertsForCard.filter((a: any) => a.category === 'Disaster').length,
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
        
        {/* Priority Tab Bar and Category Dropdown */}
        <div className="flex items-center justify-between mt-4 border-b">
          {/* Priority Tabs */}
          <div className="flex items-center gap-4">
            {(['All', 'High', 'Medium', 'Low'] as const).map((priority) => (
              <button
                key={priority}
                className={`text-sm pb-2 -mb-px border-b-2 whitespace-nowrap flex-shrink-0 transition-colors min-w-[80px] text-center ${
                  selectedPriority === priority 
                    ? 'border-blue-600 text-blue-600 font-medium' 
                    : 'border-transparent text-muted-foreground hover:text-gray-700 hover:border-gray-300'
                } flex items-center justify-center gap-2`}
                onClick={() => setSelectedPriority(priority)}
              >
                {priority}
                <Badge className={`text-[10px] px-1.5 ${
                  priority === 'High' ? 'bg-red-100 text-red-700' :
                  priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                  priority === 'Low' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {priority === 'All' ? allAlertsForCard.length : 
                   priority === 'High' ? priorityCounts.High : 
                   priority === 'Medium' ? priorityCounts.Medium : 
                   priorityCounts.Low}
                </Badge>
              </button>
            ))}
          </div>
          
          {/* Category Dropdown - Floating Style */}
          <div className="relative -mb-px -mt-[15px]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-solid border-gray-300 text-gray-600 hover:bg-gray-50 bg-white shadow-sm"
                >
                  {selectedCategory === 'All' ? 'Category' : selectedCategory}
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setSelectedCategory('All')}>
                  All Categories
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory('Permits')}>
                  Permits ({categoryCounts.Permits})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory('Revenue')}>
                  Revenue ({categoryCounts.Revenue})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory('Stakeholders')}>
                  Stakeholders ({categoryCounts.Stakeholders})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory('Compliance')}>
                  Compliance ({categoryCounts.Compliance})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory('Strategic-plan')}>
                  Strategic Plan ({categoryCounts['Strategic-plan']})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory('Reports')}>
                  Reports ({categoryCounts.Reports})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory('Production')}>
                  Production ({categoryCounts.Production})
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div 
          className="space-y-3 overflow-y-auto overflow-x-hidden scrollbar-hover" 
          style={{ maxHeight: '200px' }}
        >
          {allAlertsForCard
            .filter((item: any) => {
              // Filter by priority
              let priorityMatch = true
              if (selectedPriority !== 'All') {
                const itemPriority = item.priority === 'high' || item.label?.toUpperCase() === 'HIGH' ? 'High' :
                                   item.priority === 'medium' || item.label?.toUpperCase() === 'MEDIUM' ? 'Medium' :
                                   item.priority === 'low' || item.label?.toUpperCase() === 'LOW' ? 'Low' : 'Low'
                priorityMatch = itemPriority === selectedPriority
              }
              
              // Filter by category
              let categoryMatch = true
              if (selectedCategory !== 'All') {
                categoryMatch = item.category === selectedCategory
              }
              
              return priorityMatch && categoryMatch
            })
            .map((item: any) => {
              return (
                <div 
                  key={item.id} 
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    item.priority === 'high' || item.label?.toUpperCase() === 'HIGH' ? 'hover:bg-red-50' :
                    item.priority === 'medium' || item.label?.toUpperCase() === 'MEDIUM' ? 'hover:bg-orange-50' :
                    item.priority === 'low' || item.label?.toUpperCase() === 'LOW' ? 'hover:bg-green-50' :
                    'hover:bg-gray-50'
                  } hover:shadow-md hover:shadow-gray-300/50 transform hover:scale-[1.02]`}
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
                            item.label?.toUpperCase() === 'HIGH' ? 'bg-red-100 text-red-700 border-red-200/30' :
                            item.label?.toUpperCase() === 'MEDIUM' ? 'bg-orange-100 text-orange-700 border-orange-200/30' :
                            item.label?.toUpperCase() === 'LOW' ? 'bg-green-100 text-green-700 border-green-200/30' :
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
