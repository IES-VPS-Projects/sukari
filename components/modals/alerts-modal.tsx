"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowLeft, X } from "lucide-react"
import { FiAlertTriangle } from 'react-icons/fi'
import { LuForward } from 'react-icons/lu'
import { GoInfo } from 'react-icons/go'

interface AlertsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  alertsData: any
  selectedAlertForDetails: string | null
  setSelectedAlertForDetails: (id: string | null) => void
  onTakeAction?: () => void
}

export function AlertsModal({ 
  open, 
  onOpenChange, 
  alertsData, 
  selectedAlertForDetails, 
  setSelectedAlertForDetails,
  onTakeAction 
}: AlertsModalProps) {
  
  const handleTakeAction = () => {
    if (onTakeAction) {
      onTakeAction()
    }
    setSelectedAlertForDetails(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] max-h-[90vh] p-0 flex flex-col [&>button]:hidden">
        <DialogTitle className="sr-only">
          {selectedAlertForDetails ? 'Alert Details' : 'Alerts'}
        </DialogTitle>
        {(() => {
          if (selectedAlertForDetails) {
            const alert = alertsData.alerts.find((a: any) => a.id === selectedAlertForDetails)
            if (alert) {
              return (
                <div className="flex flex-col h-full min-h-0">
                  <div className="p-6 border-b bg-gray-50 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedAlertForDetails(null)}
                        className="shrink-0"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${alert.iconBg} rounded-lg flex items-center justify-center`}>
                          <FiAlertTriangle className={`h-5 w-5 ${alert.iconColor}`} />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">{alert.title}</h2>
                          <p className="text-sm text-gray-500">{alert.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 min-h-0">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Alert Details</h3>
                        <p className="text-gray-700">{alert.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Priority</h3>
                        <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          alert.labelColor === 'bg-red-500' ? 'bg-red-50 text-red-700' :
                          alert.labelColor === 'bg-orange-500' ? 'bg-orange-50 text-orange-700' :
                          alert.labelColor === 'bg-yellow-500' ? 'bg-yellow-50 text-yellow-700' :
                          alert.labelColor === 'bg-blue-500' ? 'bg-blue-50 text-blue-700' :
                          alert.labelColor === 'bg-green-500' ? 'bg-green-50 text-green-700' :
                          alert.labelColor === 'bg-purple-500' ? 'bg-purple-50 text-purple-700' :
                          'bg-gray-50 text-gray-700'
                        }`}>
                          {alert.label}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Affected Area</h3>
                        <p className="text-gray-700">
                          {alert.timestamp.includes('•') 
                            ? alert.timestamp.split('•')[1].trim() 
                            : 'Field Operations'}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Recommended Actions</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          <li>Review alert conditions and assess impact</li>
                          <li>Coordinate with relevant teams for response</li>
                          <li>Monitor situation for changes</li>
                          <li>Update stakeholders on status</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t bg-gray-50 flex justify-between items-center flex-shrink-0">
                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          console.log('Forward Alert', alert.id)
                          setSelectedAlertForDetails(null)
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
                          setSelectedAlertForDetails(null)
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
                          setSelectedAlertForDetails(null)
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
            <div className="flex flex-col h-full min-h-0">
              <div className="p-6 border-b bg-gray-50 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
                    <p className="text-sm text-gray-500 mt-1">{alertsData.alerts.length} alerts requiring attention</p>
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
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 min-h-0">
                <div className="space-y-3">
                  {alertsData.alerts.map((alert: any) => (
                    <div 
                      key={alert.id}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        alert.iconColor === 'text-red-600' ? 'hover:bg-red-50' :
                        alert.iconColor === 'text-orange-600' ? 'hover:bg-orange-50' :
                        alert.iconColor === 'text-yellow-600' ? 'hover:bg-yellow-50' :
                        alert.iconColor === 'text-blue-600' ? 'hover:bg-blue-50' :
                        alert.iconColor === 'text-green-600' ? 'hover:bg-green-50' :
                        alert.iconColor === 'text-purple-600' ? 'hover:bg-purple-50' :
                        'hover:bg-gray-50'
                      } hover:shadow-md`}
                      onClick={() => setSelectedAlertForDetails(alert.id)}
                    >
                      {/* Icon */}
                      <div className={`w-8 h-8 ${alert.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <FiAlertTriangle className={`h-4 w-4 ${alert.iconColor}`} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-medium text-[#202020] truncate">{alert.title}</h4>
                              <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${
                                alert.labelColor === 'bg-red-500' ? 'bg-red-50/80 text-red-700 border-gray-300' :
                                alert.labelColor === 'bg-orange-500' ? 'bg-orange-50/80 text-orange-700 border-gray-300' :
                                alert.labelColor === 'bg-green-500' ? 'bg-green-50/80 text-green-700 border-gray-300' :
                                alert.labelColor === 'bg-yellow-500' ? 'bg-orange-50/80 text-orange-700 border-gray-300' :
                                alert.labelColor === 'bg-blue-500' ? 'bg-blue-50/80 text-blue-700 border-gray-300' :
                                alert.labelColor === 'bg-purple-500' ? 'bg-purple-50/80 text-purple-700 border-gray-300' :
                                'bg-gray-50/80 text-gray-700 border-gray-300'
                              }`}>
                                {alert.label}
                              </div>
                            </div>
                            <p className="text-xs text-[#6B6B6B] mb-1">{alert.description}</p>
                            <p className="text-xs text-[#9CA3AF]">{alert.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })()}
      </DialogContent>
    </Dialog>
  )
}
