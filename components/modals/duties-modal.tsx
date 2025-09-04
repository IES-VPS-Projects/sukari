"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, AlertTriangle, CheckCircle, User, MapPin, Calendar as CalendarIcon } from "lucide-react"

interface DutiesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DutiesModal({ open, onOpenChange }: DutiesModalProps) {
  const dutiesData = {
    todaysDuties: 3,
    thisWeekDuties: 12,
    highPriority: 2,
    nextDutyTime: "06:00",
    duties: [
      {
        id: 1,
        title: "Sugar Production Review Meeting",
        description: "Weekly review of sugar production across all factories",
        time: "09:00 AM",
        date: "2024-09-04",
        location: "Conference Room A",
        priority: "High",
        status: "Scheduled",
        participants: ["Production Manager", "Quality Assurance", "Factory Supervisors"]
      },
      {
        id: 2,
        title: "Farmer Liaison Committee Meeting",
        description: "Monthly meeting with farmer representatives",
        time: "2:00 PM",
        date: "2024-09-04",
        location: "Board Room",
        priority: "Medium",
        status: "Scheduled",
        participants: ["Farmer Representatives", "Agricultural Officers"]
      },
      {
        id: 3,
        title: "Board of Directors Presentation",
        description: "Quarterly performance presentation to the board",
        time: "10:00 AM",
        date: "2024-09-05",
        location: "Executive Conference Hall",
        priority: "High",
        status: "Scheduled",
        participants: ["Board Members", "Senior Management"]
      },
      {
        id: 4,
        title: "Factory Safety Inspection",
        description: "Routine safety inspection at Chemelil factory",
        time: "8:00 AM",
        date: "2024-09-06",
        location: "Chemelil Sugar Factory",
        priority: "Medium",
        status: "Scheduled",
        participants: ["Safety Officer", "Factory Manager"]
      },
      {
        id: 5,
        title: "Strategic Planning Session",
        description: "Annual strategic planning for next financial year",
        time: "9:00 AM",
        date: "2024-09-03",
        location: "Retreat Center",
        priority: "High",
        status: "Completed",
        participants: ["Executive Team", "Department Heads"]
      }
    ]
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "Medium":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Duties & Responsibilities
          </DialogTitle>
          <DialogDescription>
            Assigned duties, schedules, and upcoming responsibilities
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Duties Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <CalendarIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{dutiesData.todaysDuties}</div>
                <div className="text-sm text-muted-foreground">Today's Duties</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{dutiesData.thisWeekDuties}</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">{dutiesData.highPriority}</div>
                <div className="text-sm text-muted-foreground">High Priority</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{dutiesData.nextDutyTime}</div>
                <div className="text-sm text-muted-foreground">Next Duty</div>
              </CardContent>
            </Card>
          </div>

          {/* Duties Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Scheduled Duties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dutiesData.duties.map((duty, index) => (
                  <div key={duty.id}>
                    <div className="flex items-start justify-between p-4 rounded-lg border">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {getPriorityIcon(duty.priority)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{duty.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{duty.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{new Date(duty.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{duty.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{duty.location}</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <User className="h-3 w-3" />
                                <span>Participants: {duty.participants.join(", ")}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge 
                          variant="secondary" 
                          className={getPriorityColor(duty.priority)}
                        >
                          {duty.priority} Priority
                        </Badge>
                        <div>
                          <Badge 
                            variant="secondary" 
                            className={getStatusColor(duty.status)}
                          >
                            {duty.status}
                          </Badge>
                        </div>
                        {duty.status === "Scheduled" && (
                          <div className="mt-2">
                            <Button size="sm" variant="outline" className="text-xs">
                              View Details
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    {index < dutiesData.duties.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Duty Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Administrative</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Board Meetings</span>
                  <Badge variant="secondary">4 this month</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Policy Reviews</span>
                  <Badge variant="secondary">2 pending</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Strategic Sessions</span>
                  <Badge variant="secondary">1 quarterly</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Operational</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Factory Inspections</span>
                  <Badge variant="secondary">Weekly</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Production Reviews</span>
                  <Badge variant="secondary">Daily</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Quality Audits</span>
                  <Badge variant="secondary">Monthly</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stakeholder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Farmer Meetings</span>
                  <Badge variant="secondary">Bi-weekly</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Ministry Briefings</span>
                  <Badge variant="secondary">Monthly</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Industry Forums</span>
                  <Badge variant="secondary">Quarterly</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
