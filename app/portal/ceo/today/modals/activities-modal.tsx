"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Target, Shield, Settings } from "lucide-react"
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
        return <CheckCircle className="w-5 h-5 text-gray-600" />
      case "visit":
        return <Target className="w-5 h-5 text-gray-600" />
      case "renewal":
        return <Shield className="w-5 h-5 text-gray-600" />
      case "maintenance":
        return <Settings className="w-5 h-5 text-gray-600" />
      case "meeting":
        return <CheckCircle className="w-5 h-5 text-gray-600" />
      default:
        return <CheckCircle className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-4xl h-[95vh] max-h-[80vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>Activities</DialogTitle>
          <p className="text-sm text-muted-foreground">{activitiesData.length} activities requiring attention</p>
        </DialogHeader>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto px-6 pb-6">
          {activitiesData.map((activity, index) => {
            const getIconBgColor = (index: number) => {
              const colors = [
                "bg-orange-100", // Orange
                "bg-blue-100",   // Blue
                "bg-purple-100", // Purple
                "bg-green-100"   // Green
              ]
              return colors[index % colors.length]
            }

            return (
              <div
                key={activity.id}
                className="p-3 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all duration-200 cursor-pointer bg-white"
                onClick={() => handleActivityClick(activity.id)}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg ${getIconBgColor(index)} flex items-center justify-center flex-shrink-0`}>
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {activity.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{activity.timestamp}</span>
                      <span>•</span>
                      <span>{activity.location}</span>
                      <span>•</span>
                      <span>{activity.assignee}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}