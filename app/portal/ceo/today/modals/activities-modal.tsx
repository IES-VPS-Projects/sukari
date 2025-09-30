"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Target, Shield, Settings, X } from "lucide-react"
import { GoInfo } from "react-icons/go"
import { activitiesData, ActivityItem } from "../data/activities-data"

interface ActivitiesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onActivityClick?: (activityId: string) => void
}

export function ActivitiesModal({
  open,
  onOpenChange,
  onActivityClick
}: ActivitiesModalProps) {

  const handleActivityClick = (activityId: string) => {
    if (onActivityClick) {
      onActivityClick(activityId);
      onOpenChange(false);
    }
  }

  const getActivityIcon = (type: string) => {
    switch(type) {
      case "compliance":
        return <CheckCircle className="w-4 h-4 text-gray-600" />
      case "visit":
        return <Target className="w-4 h-4 text-gray-600" />
      case "renewal":
        return <Shield className="w-4 h-4 text-gray-600" />
      case "maintenance":
        return <Settings className="w-4 h-4 text-gray-600" />
      case "meeting":
        return <CheckCircle className="w-4 h-4 text-gray-600" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getIconBgColor = (index: number) => {
    const colors = [
      "bg-orange-100", // Orange
      "bg-blue-100",   // Blue
      "bg-purple-100", // Purple
      "bg-green-100"   // Green
    ]
    return colors[index % colors.length]
  }

  const getHoverBg = (index: number) => {
    const colors = [
      "hover:bg-orange-50",
      "hover:bg-blue-50",
      "hover:bg-purple-50",
      "hover:bg-green-50"
    ]
    return colors[index % colors.length]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl h-[95vh] max-h-[90vh] overflow-hidden flex flex-col p-0 [&>button]:hidden">
        <DialogTitle className="sr-only">Activities</DialogTitle>

        <div className="flex flex-col h-full min-h-0">
          <div className="p-6 bg-gray-50 relative flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Activities</h2>
                <p className="text-sm text-gray-500 mt-1">{activitiesData.length} activities requiring attention</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="group relative">
                  <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                  <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    Scheduled activities and tasks
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
            {/* Horizontal divider line at bottom edge of header */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 min-h-0">
            <div className="space-y-3">
              {activitiesData.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${getHoverBg(index)}`}
                  onClick={() => handleActivityClick(activity.id)}
                >
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-lg ${getIconBgColor(index)} flex items-center justify-center flex-shrink-0`}>
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-medium text-[#202020] truncate">{activity.title}</h4>
                          <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${
                            activity.priority === 'high' ? 'bg-red-50/80 text-red-700 border-gray-300' :
                            'bg-yellow-50/80 text-yellow-700 border-gray-300'
                          }`}>
                            {activity.priority}
                          </div>
                        </div>
                        <p className="text-xs text-[#6B6B6B] mb-1">{activity.description}</p>
                        <p className="text-xs text-[#9CA3AF]">{activity.timestamp}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}