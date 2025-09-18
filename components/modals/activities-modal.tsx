"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  FileText,
  Users,
  TrendingUp,
  ArrowLeft,
  Clock,
  MapPin,
  User,
  X,
  Shield,
  Award
} from "lucide-react"
import { LuSquarePen, LuTriangleAlert, LuCalendar } from 'react-icons/lu'
import { GoInfo } from 'react-icons/go'
import { allActivitiesData } from "@/lib/mockdata"
import { ActivityDetailsModal } from "@/components/modals/activity-details-modal"

interface ActivitiesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ActivitiesModal({ open, onOpenChange }: ActivitiesModalProps) {
  // Modal states
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [activityDetailsOpen, setActivityDetailsOpen] = useState(false)

  const handleActivityClick = (activityId: string) => {
    const activity = allActivitiesData.find(a => a.id === activityId)
    if (activity) {
      setSelectedActivity(activity)
      setActivityDetailsOpen(true)
    }
  }

  return (
    <>
      {/* Activities Modal */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 [&>button]:hidden">
          <DialogTitle className="sr-only">Activities</DialogTitle>
          
          <div className="flex flex-col h-full">
            <div className="p-6 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Activities</h2>
                  <p className="text-sm text-gray-500 mt-1">{allActivitiesData.length} activities requiring attention</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="group relative">
                    <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                    <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      Tasks and activities needing completion
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
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {allActivitiesData.map((activity) => {
                  // Get icon component and styling based on activity type
                  const getActivityIconAndStyle = (type: string) => {
                    switch (type) {
                      case 'compliance': 
                        return { 
                          icon: Shield, 
                          iconColor: 'text-orange-600', 
                          iconBg: 'bg-orange-100',
                          hoverBg: 'hover:bg-orange-50'
                        }
                      case 'visit': 
                        return { 
                          icon: MapPin, 
                          iconColor: 'text-blue-600', 
                          iconBg: 'bg-blue-100',
                          hoverBg: 'hover:bg-blue-50'
                        }
                      case 'renewal': 
                        return { 
                          icon: Award, 
                          iconColor: 'text-purple-600', 
                          iconBg: 'bg-purple-100',
                          hoverBg: 'hover:bg-purple-50'
                        }
                      case 'training': 
                        return { 
                          icon: Users, 
                          iconColor: 'text-green-600', 
                          iconBg: 'bg-green-100',
                          hoverBg: 'hover:bg-green-50'
                        }
                      case 'quality': 
                        return { 
                          icon: FileText, 
                          iconColor: 'text-indigo-600', 
                          iconBg: 'bg-indigo-100',
                          hoverBg: 'hover:bg-indigo-50'
                        }
                      case 'monitoring': 
                        return { 
                          icon: TrendingUp, 
                          iconColor: 'text-teal-600', 
                          iconBg: 'bg-teal-100',
                          hoverBg: 'hover:bg-teal-50'
                        }
                      case 'maintenance':
                        return { 
                          icon: CheckCircle, 
                          iconColor: 'text-green-600', 
                          iconBg: 'bg-green-100',
                          hoverBg: 'hover:bg-green-50'
                        }
                      default: 
                        return { 
                          icon: CheckCircle, 
                          iconColor: 'text-gray-600', 
                          iconBg: 'bg-gray-100',
                          hoverBg: 'hover:bg-gray-50'
                        }
                    }
                  }

                  const { icon: IconComponent, iconColor, iconBg, hoverBg } = getActivityIconAndStyle(activity.type)

                  return (
                    <div 
                      key={activity.id}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${hoverBg}`}
                      onClick={() => handleActivityClick(activity.id)}
                    >
                      {/* Icon */}
                      <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`h-4 w-4 ${iconColor}`} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-[#202020] truncate">{activity.title}</h4>
                            <p className="text-xs text-[#6B6B6B] mb-1">{activity.description}</p>
                            <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                              <span>{activity.dueDate}</span>
                              <span>•</span>
                              <span>{activity.location}</span>
                              <span>•</span>
                              <span>{activity.assignee || 'Unassigned'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Activity Details Modal */}
      <ActivityDetailsModal 
        open={activityDetailsOpen} 
        onOpenChange={setActivityDetailsOpen} 
        activity={selectedActivity} 
      />
    </>
  )
}
