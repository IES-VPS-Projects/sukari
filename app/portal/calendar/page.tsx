"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { NewEventModal } from "@/components/modals/new-event-modal"

const events = [
  {
    id: 1,
    title: "Board Meeting",
    time: "10:00 AM - 12:00 PM",
    location: "Conference Room A",
    type: "meeting",
    attendees: 8,
    priority: "high",
  },
  {
    id: 2,
    title: "Mill Inspection Report",
    time: "2:30 PM - 3:30 PM",
    location: "Virtual Meeting",
    type: "review",
    attendees: 4,
    priority: "medium",
  },
  {
    id: 3,
    title: "Compliance Review",
    time: "4:00 PM - 5:00 PM",
    location: "Office 201",
    type: "review",
    attendees: 3,
    priority: "high",
  },
]

const upcomingTasks = [
  {
    id: 1,
    title: "Review Q4 Production Reports",
    dueDate: "Tomorrow",
    priority: "high",
  },
  {
    id: 2,
    title: "Approve Mill Expansion Budget",
    dueDate: "Dec 28, 2024",
    priority: "medium",
  },
  {
    id: 3,
    title: "Schedule Farmer Meetings",
    dueDate: "Dec 30, 2024",
    priority: "low",
  },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [newEventOpen, setNewEventOpen] = useState(false)

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">{today}</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => setNewEventOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Widget */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                December 2024
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 6 + 1
                const isToday = day === 22
                const hasEvent = [22, 24, 26].includes(day)

                return (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center text-sm cursor-pointer rounded-lg transition-colors ${
                      day > 0 && day <= 31
                        ? isToday
                          ? "bg-green-600 text-white font-bold"
                          : hasEvent
                            ? "bg-green-50 text-green-800 font-medium"
                            : "hover:bg-gray-50"
                        : "text-gray-300"
                    }`}
                  >
                    {day > 0 && day <= 31 ? day : ""}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{task.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{task.dueDate}</p>
                    </div>
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Events */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <Badge variant={event.priority === "high" ? "destructive" : "default"} className="text-xs">
                      {event.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.attendees} attendees
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Join
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <NewEventModal open={newEventOpen} onOpenChange={setNewEventOpen} />
    </div>
  )
}
