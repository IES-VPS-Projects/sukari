"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Bell, CheckCircle, Clock, Eye, MapPin, Tractor, Users, ArrowLeft, X } from "lucide-react"
import { FiAlertTriangle } from 'react-icons/fi'
import { LuForward } from 'react-icons/lu'
import { GoInfo } from 'react-icons/go'
import { useState } from "react"

const alerts = [
  {
    id: 1,
    title: "Weather Alert",
    message: "Heavy rainfall expected in Sector 5 for the next 48 hours",
    description: "Heavy rainfall expected in Sector 5 for the next 48 hours. This could impact field operations and sugar cane harvesting schedules. Advisory issued to all field coordinators to secure equipment and postpone planned activities.",
    timestamp: "2024-01-14T10:45:00Z",
    priority: "medium",
    type: "weather",
    status: "active",
    affectedFarms: ["Green Valley Farm", "Blue Ridge Farm"],
    label: "MEDIUM",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100"
  },
  {
    id: 2,
    title: "Disease Outbreak",
    message: "Blight detected in 3 farms in Sector 12",
    description: "Sugar cane blight has been detected in multiple farms within Sector 12. Immediate containment measures are required to prevent spread to adjacent plantations. Field teams have been dispatched for assessment.",
    timestamp: "2024-01-14T09:20:00Z",
    priority: "high",
    type: "disease",
    status: "active",
    affectedFarms: ["Sunrise Agriculture", "Valley View Agriculture", "Mountain Peak Farm"],
    label: "HIGH",
    iconColor: "text-red-600",
    iconBg: "bg-red-100"
  },
  {
    id: 3,
    title: "Compliance Warning",
    message: "Sunrise Agriculture has fallen below 70% compliance threshold",
    description: "Sunrise Agriculture compliance levels have dropped below the required 70% threshold for sugar quality standards. Immediate review and corrective action required to maintain KSB certification.",
    timestamp: "2024-01-14T12:15:00Z",
    priority: "high",
    type: "compliance",
    status: "active",
    affectedFarms: ["Sunrise Agriculture"],
    label: "HIGH",
    iconColor: "text-red-600",
    iconBg: "bg-red-100"
  },
  {
    id: 4,
    title: "System Maintenance",
    message: "Scheduled maintenance on January 20th from 11 PM to 2 AM",
    description: "Planned system maintenance for KSB portal will occur on January 20th from 11 PM to 2 AM. All portal services will be temporarily unavailable during this period.",
    timestamp: "2024-01-13T14:30:00Z",
    priority: "low",
    type: "system",
    status: "active",
    affectedFarms: [],
    label: "LOW",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100"
  },
]

const warnings = [
  {
    id: 5,
    title: "Overdue Visit",
    message: "Golden Harvest farm visit is 3 days overdue",
    description: "Scheduled inspection at Golden Harvest farm is now 3 days overdue. Compliance team needs to reschedule immediately to maintain regulatory requirements.",
    timestamp: "2024-01-13T16:00:00Z",
    priority: "medium",
    type: "visit",
    status: "active",
    affectedFarms: ["Golden Harvest"],
    label: "MEDIUM",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100"
  },
  {
    id: 6,
    title: "Irrigation System Warning",
    message: "Potential irrigation system failure detected at Blue Ridge Farm",
    description: "Monitoring systems have detected potential irrigation system failure at Blue Ridge Farm. Technical team should investigate to prevent crop damage.",
    timestamp: "2024-01-12T13:45:00Z",
    priority: "medium",
    type: "equipment",
    status: "active",
    affectedFarms: ["Blue Ridge Farm"],
    label: "MEDIUM",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100"
  }
]

const notifications = [
  {
    id: 7,
    title: "New Farmer Registration",
    message: "James Miller has registered Mountain Peak Farm in your jurisdiction",
    description: "New farmer James Miller has successfully completed registration for Mountain Peak Farm. Initial compliance assessment and orientation visit needs to be scheduled.",
    timestamp: "2024-01-13T11:15:00Z",
    priority: "low",
    type: "registration",
    status: "unread",
    affectedFarms: ["Mountain Peak Farm"],
    label: "INFO",
    iconColor: "text-green-600",
    iconBg: "bg-green-100"
  },
  {
    id: 8,
    title: "Report Generated",
    message: "Monthly compliance report for December 2023 is ready for download",
    description: "Monthly compliance report for December 2023 has been generated and is available for download in the reports section. Report includes farm compliance scores and recommendations.",
    timestamp: "2024-01-14T09:20:00Z",
    priority: "low",
    type: "report",
    status: "unread",
    affectedFarms: [],
    label: "INFO",
    iconColor: "text-green-600",
    iconBg: "bg-green-100"
  }
]

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours}h ago`
  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays}d ago`
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge variant="destructive">High</Badge>
    case "medium":
      return <Badge variant="secondary">Medium</Badge>
    case "low":
      return <Badge variant="outline">Low</Badge>
    default:
      return <Badge variant="outline">{priority}</Badge>
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "weather":
      return <AlertTriangle className="h-5 w-5 text-orange-500" />
    case "disease":
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    case "compliance":
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    case "system":
      return <Bell className="h-5 w-5 text-blue-500" />
    case "visit":
      return <Clock className="h-5 w-5 text-orange-500" />
    case "equipment":
      return <AlertTriangle className="h-5 w-5 text-orange-500" />
    case "registration":
      return <Users className="h-5 w-5 text-green-500" />
    case "report":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    default:
      return <Bell className="h-5 w-5 text-gray-500" />
  }
}

interface AlertsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTakeAction?: () => void
  setScheduleNewActivityOpen?: (open: boolean) => void
  alertsData?: any
  selectedAlertForDetails?: string | null
  setSelectedAlertForDetails?: (id: string | null) => void
}

export function AlertsModal({ 
  open,  
  onOpenChange, 
  alertsData, 
  selectedAlertForDetails, 
  setSelectedAlertForDetails,
  onTakeAction 
}: AlertsModalProps) {
  const [activeTab, setActiveTab] = useState("all")
  
  // Default alerts data if not provided
  const defaultAlertsData = {
    alerts: [...alerts, ...warnings, ...notifications]
  }
  
  const currentAlertsData = alertsData || defaultAlertsData
  
  // Ensure currentAlertsData.alerts is always an array
  const safeAlertsData = {
    alerts: Array.isArray(currentAlertsData?.alerts) ? currentAlertsData.alerts : []
  }
  
  const handleTakeAction = () => {
    if (onTakeAction) {
      onTakeAction()
    }
    if (setSelectedAlertForDetails) {
      setSelectedAlertForDetails(null)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-4xl h-[95vh] max-h-[90vh] p-0 [&>button]:hidden flex flex-col">
        <DialogTitle className="sr-only">
          {selectedAlertForDetails ? 'Alert Details' : 'Alerts'}
        </DialogTitle>
        {(() => {
          if (selectedAlertForDetails) {
            const alert = safeAlertsData.alerts.find((a: any) => a.id.toString() === selectedAlertForDetails)
            if (alert) {
              return (
                <div className="flex flex-col h-full">
                  <div className="p-4 sm:p-6 flex-shrink-0 bg-gray-50">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedAlertForDetails && setSelectedAlertForDetails(null)}
                        className="shrink-0 h-8 w-8 sm:h-10 sm:w-10"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${alert.iconBg} rounded-lg flex items-center justify-center`}>
                          <FiAlertTriangle className={`h-5 w-5 ${alert.iconColor}`} />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">{alert.title}</h2>
                          <p className="text-sm text-gray-500">{formatTimestamp(alert.timestamp)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Alert Details</h3>
                        <p className="text-gray-700">{alert.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Priority</h3>
                        <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          alert.label === 'HIGH' ? 'bg-red-50 text-red-700' :
                          alert.label === 'MEDIUM' ? 'bg-orange-50 text-orange-700' :
                          alert.label === 'LOW' ? 'bg-yellow-50 text-yellow-700' :
                          alert.label === 'INFO' ? 'bg-blue-50 text-blue-700' :
                          'bg-gray-50 text-gray-700'
                        }`}>
                          {alert.label}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Affected Area</h3>
                        <p className="text-gray-700">
                          {alert.affectedFarms.length > 0 
                            ? alert.affectedFarms.join(', ')
                            : 'System-wide notification'}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Recommended Actions</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          <li>Review alert conditions and assess impact on sugar operations</li>
                          <li>Coordinate with relevant field teams and millers for response</li>
                          <li>Monitor situation for changes and update status</li>
                          <li>Notify KSB stakeholders and update compliance records</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          console.log('Forward Alert', alert.id)
                          if (setSelectedAlertForDetails) setSelectedAlertForDetails(null)
                          onOpenChange(false)
                        }}
                      >
                        <LuForward className="h-4 w-4 mr-2" />
                        Forward
                      </Button>
                      <Button 
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          console.log('Delete Alert', alert.id)
                          if (setSelectedAlertForDetails) setSelectedAlertForDetails(null)
                          onOpenChange(false)
                        }}
                      >
                        ✕ Delete
                      </Button>
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          console.log('Mark as Unread', alert.id)
                          if (setSelectedAlertForDetails) setSelectedAlertForDetails(null)
                          onOpenChange(false)
                        }}
                      >
                        Mark as Unread
                      </Button>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleTakeAction}
                      >
                        Take Action
                      </Button>
                    </div>
                  </div>
                </div>
              )
            }
          }

          // List view
          return (
            <div className="flex flex-col h-full">
              <div className="p-4 sm:p-6 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
                    <p className="text-sm text-gray-500 mt-1">Important notifications requiring attention</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="group relative">
                      <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                      <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        System alerts and notifications requiring attention
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onOpenChange(false)}
                      className="shrink-0 h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Tabs with underline style and left alignment */}
                <div className="mt-6">
                  <div className="flex border-b border-gray-200 overflow-x-auto">
                    <button
                      onClick={() => setActiveTab("all")}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === "all"
                          ? "text-blue-600 border-blue-600"
                          : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveTab("critical")}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === "critical"
                          ? "text-red-600 border-red-600"
                          : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Critical
                    </button>
                    <button
                      onClick={() => setActiveTab("warnings")}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === "warnings"
                          ? "text-orange-600 border-orange-600"
                          : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Warnings
                    </button>
                    <button
                      onClick={() => setActiveTab("notifications")}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === "notifications"
                          ? "text-green-600 border-green-600"
                          : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Notifications
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {activeTab === "all" && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-blue-500" />
                      All Alerts
                    </h3>
                    
                    <div className="space-y-3">
                      {safeAlertsData.alerts.map((alert: any) => (
                        <div 
                          key={alert.id} 
                          className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
                          onClick={() => setSelectedAlertForDetails && setSelectedAlertForDetails(alert.id.toString())}
                        >
                          <div className={`w-8 h-8 ${alert.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <FiAlertTriangle className={`h-4 w-4 ${alert.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-medium text-[#202020] truncate">{alert.title}</h4>
                              <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${
                                alert.label === 'HIGH' ? 'bg-red-50/80 text-red-700 border-gray-300' :
                                alert.label === 'MEDIUM' ? 'bg-orange-50/80 text-orange-700 border-gray-300' :
                                alert.label === 'LOW' ? 'bg-yellow-50/80 text-yellow-700 border-gray-300' :
                                alert.label === 'INFO' ? 'bg-blue-50/80 text-blue-700 border-gray-300' :
                                'bg-gray-50/80 text-gray-700 border-gray-300'
                              }`}>
                                {alert.label}
                              </div>
                            </div>
                            <p className="text-xs text-[#6B6B6B] mb-1">{alert.message}</p>
                            <p className="text-xs text-[#9CA3AF]">{formatTimestamp(alert.timestamp)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === "critical" && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      Critical Alerts
                    </h3>
                    
                    <div className="space-y-3">
                      {safeAlertsData.alerts.filter((alert: any) => alert.priority === 'high').map((alert: any) => (
                        <div 
                          key={alert.id} 
                          className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
                          onClick={() => setSelectedAlertForDetails && setSelectedAlertForDetails(alert.id.toString())}
                        >
                          <div className={`w-8 h-8 ${alert.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <FiAlertTriangle className={`h-4 w-4 ${alert.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-medium text-[#202020] truncate">{alert.title}</h4>
                              <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${
                                alert.label === 'HIGH' ? 'bg-red-50/80 text-red-700 border-gray-300' :
                                'bg-gray-50/80 text-gray-700 border-gray-300'
                              }`}>
                                {alert.label}
                              </div>
                            </div>
                            <p className="text-xs text-[#6B6B6B] mb-1">{alert.message}</p>
                            <p className="text-xs text-[#9CA3AF]">{formatTimestamp(alert.timestamp)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === "warnings" && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Warnings
                    </h3>
                    
                    <div className="space-y-3">
                      {safeAlertsData.alerts.filter((alert: any) => alert.type === 'warning' || (alert.priority === 'medium' && alert.category === 'warning')).map((warning: any) => (
                        <div 
                          key={warning.id} 
                          className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
                          onClick={() => setSelectedAlertForDetails && setSelectedAlertForDetails(warning.id.toString())}
                        >
                          <div className={`w-8 h-8 ${warning.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <FiAlertTriangle className={`h-4 w-4 ${warning.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-medium text-[#202020] truncate">{warning.title}</h4>
                              <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${
                                warning.label === 'HIGH' ? 'bg-red-50/80 text-red-700 border-gray-300' :
                                warning.label === 'MEDIUM' ? 'bg-orange-50/80 text-orange-700 border-gray-300' :
                                warning.label === 'LOW' ? 'bg-yellow-50/80 text-yellow-700 border-gray-300' :
                                'bg-gray-50/80 text-gray-700 border-gray-300'
                              }`}>
                                {warning.label}
                              </div>
                            </div>
                            <p className="text-xs text-[#6B6B6B] mb-1">{warning.message}</p>
                            <p className="text-xs text-[#9CA3AF]">{formatTimestamp(warning.timestamp)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === "notifications" && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Bell className="h-5 w-5 text-blue-500" />
                      Notifications
                    </h3>
                    
                    <div className="space-y-3">
                      {safeAlertsData.alerts.filter((alert: any) => alert.type === 'notification' || alert.priority === 'low').map((notification: any) => (
                        <div 
                          key={notification.id} 
                          className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
                          onClick={() => setSelectedAlertForDetails && setSelectedAlertForDetails(notification.id.toString())}
                        >
                          <div className={`w-8 h-8 ${notification.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <FiAlertTriangle className={`h-4 w-4 ${notification.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-medium text-[#202020] truncate">{notification.title}</h4>
                              <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${
                                notification.label === 'INFO' ? 'bg-blue-50/80 text-blue-700 border-gray-300' :
                                'bg-gray-50/80 text-gray-700 border-gray-300'
                              }`}>
                                {notification.label}
                              </div>
                            </div>
                            <p className="text-xs text-[#6B6B6B] mb-1">{notification.message}</p>
                            <p className="text-xs text-[#9CA3AF]">{formatTimestamp(notification.timestamp)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })()}
      </DialogContent>
    </Dialog>
  )
}