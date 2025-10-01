"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

// Judiciary Alerts data for judges
const alertsData = {
  alerts: [
    {
      id: '1',
      title: 'Urgent Case Scheduling',
      label: 'HIGH',
      description: 'Constitutional Case #245 requires immediate scheduling - Presidential petition',
      timestamp: '2 hours ago • Chief Justice Office',
      category: 'Scheduling',
      priority: 'high',
      labelColor: 'bg-red-500',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      id: '2',
      title: 'Case Law Update',
      label: 'MEDIUM',
      description: 'Supreme Court overturned precedent relevant to 3 cases on your docket',
      timestamp: '4 hours ago • Legal Research',
      category: 'Legal',
      priority: 'medium',
      labelColor: 'bg-orange-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      id: '3',
      title: 'Courtroom Availability',
      label: 'HIGH',
      description: 'Courtroom 3A unavailable tomorrow - all cases reassigned to 4B',
      timestamp: '6 hours ago • Court Administration',
      category: 'Facilities',
      priority: 'high',
      labelColor: 'bg-red-500',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      id: '4',
      title: 'Pending Decision Reminder',
      label: 'MEDIUM',
      description: 'Civil Case #782 judgment deadline approaching - due in 3 days',
      timestamp: '6 hours ago • Case Management',
      category: 'Deadlines',
      priority: 'medium',
      labelColor: 'bg-yellow-500',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      id: '5',
      title: 'Case File Update',
      label: 'LOW',
      description: 'New evidence submitted in Criminal Case #493 - witness statement',
      timestamp: 'Yesterday • Court Registry',
      category: 'Documents',
      priority: 'low',
      labelColor: 'bg-green-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: '6',
      title: 'Ethics Training Reminder',
      label: 'MEDIUM',
      description: 'Mandatory judicial ethics training scheduled for next Tuesday',
      timestamp: 'Today • Judicial Training Institute',
      category: 'Training',
      priority: 'medium',
      labelColor: 'bg-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }
  ]
}

interface AlertsCardProps {
  className?: string;
  setViewAllAlertsOpen?: (open: boolean) => void;
  setSelectedAlertForDetails?: (id: string | null) => void;
}

// Alerts Card Component
const AlertsCard: React.FC<AlertsCardProps> = ({ 
  className = "",
  setViewAllAlertsOpen,
  setSelectedAlertForDetails
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Scheduling' | 'Legal' | 'Facilities' | 'Deadlines' | 'Documents' | 'Training'>('All')
  
  const categoryCounts = {
    Scheduling: alertsData.alerts.filter(a => a.category === 'Scheduling').length,
    Legal: alertsData.alerts.filter(a => a.category === 'Legal').length,
    Facilities: alertsData.alerts.filter(a => a.category === 'Facilities').length,
    Deadlines: alertsData.alerts.filter(a => a.category === 'Deadlines').length,
    Documents: alertsData.alerts.filter(a => a.category === 'Documents').length,
    Training: alertsData.alerts.filter(a => a.category === 'Training').length
  }

  return (
    <Card className={`rounded-[20px] shadow-lg border-0 bg-white h-[360px] flex flex-col ${className}`}>
      <CardContent className="p-4 min-h-[340px] h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 
            className="text-lg font-semibold text-foreground cursor-pointer" 
            onClick={() => {
              if (setSelectedAlertForDetails) setSelectedAlertForDetails(null)
              if (setViewAllAlertsOpen) setViewAllAlertsOpen(true)
            }}
          >
            Alerts
          </h3>
        </div>
        
        <div className="flex items-center gap-2 mb-3 border-b overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {(['All','Scheduling','Legal','Deadlines','Documents'] as const).map((category) => (
              <button
                key={category}
                className={`text-xs pb-2 -mb-px border-b-2 whitespace-nowrap flex-shrink-0 ${selectedCategory === category ? 'border-green-600 text-green-600' : 'border-transparent text-muted-foreground'} flex items-center gap-1`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
                {category !== 'All' && (
                  <Badge className="bg-gray-100 text-gray-700 text-[10px] px-1">
                    {category === 'Scheduling' ? categoryCounts.Scheduling : 
                     category === 'Legal' ? categoryCounts.Legal : 
                     category === 'Deadlines' ? categoryCounts.Deadlines :
                     category === 'Documents' ? categoryCounts.Documents : 0}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div 
          className="space-y-2 overflow-y-auto pr-1 flex-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400" 
          style={{ 
            maxHeight: '280px', 
            minHeight: '280px'
          }}
        >
          {alertsData.alerts
            .filter((item) => {
              if (selectedCategory === 'All') return true
              return item.category === selectedCategory
            })
            .slice(0, 3) // Limit to maximum 3 options in viewport
            .map((item) => {
              // Get icon color based on priority
              const getIconColorByPriority = (priority: string) => {
                switch (priority) {
                  case 'high':
                    return 'text-red-600'
                  case 'medium':
                    return 'text-orange-600'
                  case 'low':
                    return 'text-green-600'
                  default:
                    return 'text-gray-600'
                }
              }

              return (
                <div 
                  key={item.id} 
                  className="flex items-start gap-2 p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50"
                  onClick={() => {
                    if (setSelectedAlertForDetails) setSelectedAlertForDetails(item.id)
                    if (setViewAllAlertsOpen) setViewAllAlertsOpen(true)
                  }}
                >
                  {/* Icon with priority-based color */}
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className={`h-3 w-3 ${getIconColorByPriority(item.priority)}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="text-xs font-medium text-foreground truncate">{item.title}</h4>
                          <div className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium border backdrop-blur-sm ${
                            item.label?.toUpperCase() === 'HIGH' ? 'bg-red-100 text-red-700 border-gray-300' :
                            item.label?.toUpperCase() === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700 border-gray-300' :
                            item.label?.toUpperCase() === 'LOW' ? 'bg-green-100 text-green-700 border-gray-300' :
                            item.labelColor === 'bg-red-500' ? 'bg-red-100 text-red-700 border-gray-300' :
                            item.labelColor === 'bg-yellow-500' ? 'bg-yellow-100 text-yellow-700 border-gray-300' :
                            item.labelColor === 'bg-green-500' ? 'bg-green-100 text-green-700 border-gray-300' :
                            'bg-gray-50/80 text-gray-700 border-gray-300'
                          }`}>
                          {item.label}
                        </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground mb-0.5">{item.description}</p>
                        <p className="text-[10px] text-muted-foreground">{item.timestamp}</p>
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
