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
import { detailedAlertsData } from "../data/alerts-data"

const formatTimestamp = (timestamp: string) => {
  // Since timestamps are now pre-formatted, just return them as-is
  return timestamp || "Unknown time"
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge variant="destructive">High</Badge>
    case "medium":
      return <Badge variant="secondary">Medium</Badge>
    case "low":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Low</Badge>
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
    alerts: detailedAlertsData
  }
  
  const currentAlertsData = alertsData || defaultAlertsData
  
  // Ensure currentAlertsData.alerts is always an array and has required properties
  const safeAlertsData = {
    alerts: Array.isArray(currentAlertsData?.alerts) ? 
      currentAlertsData.alerts.map((alert: any) => ({
        id: alert.id || Math.random().toString(36).substring(2, 9),
        title: alert.title || "Untitled Alert",
        message: alert.message || "",
        description: alert.description || "",
        timestamp: alert.timestamp || new Date().toISOString(),
        priority: alert.priority || "medium",
        type: alert.type || "system",
        status: alert.status || "active",
        affectedFarms: Array.isArray(alert.affectedFarms) ? alert.affectedFarms : [],
        label: alert.label || "MEDIUM",
        iconColor: alert.iconColor || "text-blue-600",
        iconBg: alert.iconBg || "bg-blue-100"
      })) : []
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
            const alert = safeAlertsData.alerts.find((a: any) => a.id && a.id.toString() === selectedAlertForDetails)
            if (alert) {
              return (
                <div className="flex flex-col h-full">
                  {/* Header with background matching icon color */}
                  <div className={`flex-shrink-0 ${alert.iconBg} border-b border-gray-200`}>
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedAlertForDetails && setSelectedAlertForDetails(null)}
                          className="shrink-0 h-8 w-8 sm:h-10 sm:w-10 hover:bg-white/50"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm`}>
                            <FiAlertTriangle className={`h-5 w-5 ${alert.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="text-xl font-semibold text-gray-900 truncate">{alert.title}</h2>
                              <div className={`px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${
                                alert.label === 'HIGH' ? 'bg-red-600 text-white border-red-700' :
                                alert.label === 'MEDIUM' ? 'bg-orange-600 text-white border-orange-700' :
                                alert.label === 'LOW' ? 'bg-green-600 text-white border-green-700' :
                                alert.label === 'INFO' ? 'bg-blue-600 text-white border-blue-700' :
                                'bg-gray-600 text-white border-gray-700'
                              }`}>
                                {alert.label}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{formatTimestamp(alert.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* White body content starts here */}
                  <div className="flex-1 overflow-y-auto p-6 bg-white">
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
                          alert.label === 'LOW' ? 'bg-green-50 text-green-700' :
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
              <div className="p-4 sm:p-6 pb-0 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Important notifications requiring attention</p>
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
                <div className="mt-2 -mb-[1px]">
                  <div className="flex overflow-x-auto border-b border-gray-200">
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
                      onClick={() => setActiveTab("high")}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === "high"
                          ? "text-red-600 border-red-600"
                          : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      High
                    </button>
                    <button
                      onClick={() => setActiveTab("medium")}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === "medium"
                          ? "text-orange-600 border-orange-600"
                          : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => setActiveTab("low")}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === "low"
                          ? "text-green-600 border-green-600"
                          : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Low
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-4 bg-white">
                {activeTab === "all" && (
                  <div className="space-y-3">
                    <div className="space-y-3">
                      {safeAlertsData.alerts.map((alert: any) => (
                        <div 
                          key={alert.id} 
                          className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                            alert.priority === 'high' ? 'hover:bg-red-50/50' :
                            alert.priority === 'medium' ? 'hover:bg-orange-50/50' :
                            alert.priority === 'low' ? 'hover:bg-green-50/50' : 'hover:bg-gray-50'
                          }`}
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
                                alert.label === 'LOW' ? 'bg-green-50/80 text-green-700 border-gray-300' :
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
                
                {activeTab === "high" && (
                  <div className="space-y-3">
                    <div className="space-y-3">
                      {safeAlertsData.alerts.filter((alert: any) => alert.priority === 'high').map((alert: any) => (
                        <div 
                          key={alert.id} 
                          className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-red-50/50 hover:shadow-md"
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
                
                {activeTab === "medium" && (
                  <div className="space-y-3">
                    <div className="space-y-3">
                      {safeAlertsData.alerts.filter((alert: any) => alert.priority === 'medium').map((warning: any) => (
                        <div 
                          key={warning.id} 
                          className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-orange-50/50 hover:shadow-md"
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
                                warning.label === 'LOW' ? 'bg-green-50/80 text-green-700 border-gray-300' :
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
                
                {activeTab === "low" && (
                  <div className="space-y-3">
                    <div className="space-y-3">
                      {safeAlertsData.alerts.filter((alert: any) => alert.priority === 'low').map((notification: any) => (
                        <div 
                          key={notification.id} 
                          className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-green-50/50 hover:shadow-md"
                          onClick={() => setSelectedAlertForDetails && setSelectedAlertForDetails(notification.id.toString())}
                        >
                          <div className={`w-8 h-8 ${notification.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <FiAlertTriangle className={`h-4 w-4 ${notification.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-medium text-[#202020] truncate">{notification.title}</h4>
                              <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${
                                notification.label === 'LOW' ? 'bg-green-50/80 text-green-700 border-gray-300' :
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