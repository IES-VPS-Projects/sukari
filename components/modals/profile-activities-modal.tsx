"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Activity } from "lucide-react"

interface ProfileActivitiesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileActivitiesModal({ open, onOpenChange }: ProfileActivitiesModalProps) {
  const recentActivity = [
    { action: "Completed Sugar Quality Assessment", target: "Mumias Sugar Factory", time: "2 hours ago", type: "assessment" },
    { action: "Filed Compliance Report", target: "Factory Audit Q3 2024", time: "1 day ago", type: "report" },
    { action: "Updated Production Records", target: "Chemelil Sugar Company", time: "2 days ago", type: "update" },
    { action: "Scheduled Factory Inspection", target: "Nzoia Sugar Company", time: "3 days ago", type: "schedule" },
    { action: "Conducted Cane Quality Review", target: "Busia Region", time: "1 week ago", type: "review" },
    { action: "Coordinated Farmer Training", target: "Western Kenya Growers", time: "2 weeks ago", type: "coordination" },
  ]

  const operationsData = {
    totalOperations: 47,
    successfulOperations: 45,
    activeOperations: 3,
    personnelInvolved: 1234,
    recentOperations: [
      {
        id: 1,
        name: "Sugar Quality Assessment - Mumias",
        status: "Completed",
        date: "2024-08-28",
        outcome: "Successful",
        personnel: 8
      },
      {
        id: 2,
        name: "Factory Compliance Audit - Chemelil",
        status: "In Progress",
        date: "2024-09-01",
        outcome: "Ongoing",
        personnel: 12
      },
      {
        id: 3,
        name: "Farmer Training Program - Busia",
        status: "Completed",
        date: "2024-08-25",
        outcome: "Successful",
        personnel: 25
      }
    ]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-4xl h-[95vh] max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 sm:p-6 border-b bg-gray-50">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Activity className="h-5 w-5" />
            Activity Overview
          </DialogTitle>
          <DialogDescription className="text-sm">Manage your operational activities and project assignments</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Recent Operations Activity */}
            <div className="space-y-3 sm:space-y-4">
              {recentActivity.map((activity, index) => {
                const getHoverBg = (type: string) => {
                  switch (type) {
                    case "assessment": return "hover:bg-green-50"
                    case "report": return "hover:bg-blue-50"
                    case "update": return "hover:bg-orange-50"
                    case "schedule": return "hover:bg-purple-50"
                    case "review": return "hover:bg-yellow-50"
                    default: return "hover:bg-indigo-50"
                  }
                }

                return (
                <div key={index} className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border cursor-pointer transition-all duration-200 ${getHoverBg(activity.type)} hover:shadow-md transform hover:scale-[1.02]`}>
                  <div
                    className={`h-2 w-2 rounded-full flex-shrink-0 ${
                      activity.type === "assessment"
                        ? "bg-green-500"
                        : activity.type === "report"
                        ? "bg-blue-500"
                        : activity.type === "update"
                          ? "bg-orange-500"
                          : activity.type === "schedule"
                            ? "bg-purple-500"
                            : activity.type === "review"
                              ? "bg-yellow-500"
                              : "bg-indigo-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.target}</p>
                </div>
                <div className="text-sm text-muted-foreground">{activity.time}</div>
              </div>
              )
              })}
          </div>

          {/* Operations Statistics and Recent Projects */}
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-4">Operations Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Operations</span>
                  <span className="font-semibold">47</span>
                </div>
                <div className="flex justify-between">
                  <span>Successful Projects</span>
                  <span className="font-semibold text-green-600">45</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Operations</span>
                  <span className="font-semibold text-blue-600">3</span>
                </div>
                <div className="flex justify-between">
                  <span>Personnel Involved</span>
                  <span className="font-semibold">1,234</span>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-4">Recent Projects</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Sugar Quality Initiative</span>
                  <span className="text-sm text-muted-foreground">2 weeks ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Factory Modernization</span>
                  <span className="text-sm text-muted-foreground">1 month ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Farmer Capacity Building</span>
                  <span className="text-sm text-muted-foreground">2 months ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm sm:text-base">Technology Upgrade</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">3 months ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
