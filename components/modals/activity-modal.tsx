"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Activity } from "lucide-react"

interface ActivityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ActivityModal({ open, onOpenChange }: ActivityModalProps) {
  const recentActivity = [
    { action: "Completed mill inspection", target: "Mumias Sugar Mill", time: "2 hours ago", type: "visit" },
    { action: "Generated compliance report", target: "Q4 2024 Report", time: "1 day ago", type: "report" },
    { action: "Updated stakeholder profile", target: "West Kenya Sugar Co.", time: "2 days ago", type: "update" },
    { action: "Scheduled mill visit", target: "Nzoia Sugar Mill", time: "3 days ago", type: "schedule" },
    { action: "Reviewed safety protocols", target: "Chemelil Sugar Mill", time: "5 days ago", type: "review" },
    { action: "Submitted audit report", target: "Monthly Audit - August", time: "1 week ago", type: "report" },
    { action: "Conducted stakeholder meeting", target: "Sugar Manufacturers Association", time: "1 week ago", type: "meeting" },
    { action: "Updated compliance standards", target: "Quality Control Standards", time: "2 weeks ago", type: "update" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <Activity className="h-5 w-5" />
            Recent Activity
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <p className="text-gray-600 mb-6">Your recent actions and activities in the system</p>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                <div
                  className={`h-3 w-3 rounded-full ${
                    activity.type === "visit"
                      ? "bg-green-500"
                      : activity.type === "report"
                        ? "bg-blue-500"
                        : activity.type === "update"
                          ? "bg-orange-500"
                          : activity.type === "review"
                            ? "bg-purple-500"
                            : activity.type === "meeting"
                              ? "bg-pink-500"
                              : "bg-gray-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.target}</p>
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
