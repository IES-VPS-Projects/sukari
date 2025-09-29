import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Eye, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const ReportsCard = () => {
  const recentReports = [
    {
      id: 1,
      title: "Compliance Audit Report",
      type: "Compliance",
      date: "2 days ago",
      status: "completed"
    },
    {
      id: 2,
      title: "Monthly Production Summary",
      type: "Operational",
      date: "4 days ago",
      status: "completed"
    },
    {
      id: 3,
      title: "Financial Performance Q3",
      type: "Financial",
      date: "1 week ago",
      status: "completed"
    }
  ]

  return (
    <Card className="rounded-[20px] shadow-lg border-0" style={{ backgroundColor: "#334b35" }}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">Reports</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-white">8</p>
            <p className="text-xs text-gray-400">Reports completed</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-teal-300">12</p>
            <p className="text-xs text-gray-400">Total this month</p>
          </div>
        </div>

        <div className="space-y-2">
          {recentReports.map((report) => (
              <div key={report.id} className="bg-[#3e5a40] rounded-lg p-3 border border-[#4a6a4c]">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white line-clamp-1">
                    {report.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs px-2 py-0 bg-gray-100">
                      {report.type}
                    </Badge>
                    <span className="text-xs text-gray-300 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {report.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-white hover:bg-[#4a6a4c]">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-white hover:bg-[#4a6a4c]">
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white">
          View All Reports
        </Button>
      </CardContent>
    </Card>
  )
}

export default ReportsCard
