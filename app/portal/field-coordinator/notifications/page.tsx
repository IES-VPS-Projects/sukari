"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bell,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  MapPin,
  Users,
  Tractor,
  MoreHorizontal,
  Check,
  X,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const notifications = [
  {
    id: 1,
    type: "visit_reminder",
    title: "Upcoming Field Visit",
    message: "Visit scheduled for Green Valley Farm tomorrow at 9:00 AM",
    timestamp: "2024-01-14T15:30:00Z",
    read: false,
    priority: "high",
    icon: Calendar,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    actionRequired: true,
    farmName: "Green Valley Farm",
    farmer: "Mary Johnson",
    farmId: 1,
  },
  {
    id: 2,
    type: "compliance_alert",
    title: "Compliance Issue Detected",
    message: "Sunrise Agriculture has fallen below 70% compliance threshold",
    timestamp: "2024-01-14T12:15:00Z",
    read: false,
    priority: "high",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    actionRequired: true,
    farmName: "Sunrise Agriculture",
    farmer: "David Smith",
    farmId: 2,
  },
  {
    id: 3,
    type: "weather_alert",
    title: "Weather Warning",
    message: "Heavy rainfall expected in Sector 5 for the next 48 hours",
    timestamp: "2024-01-14T10:45:00Z",
    read: true,
    priority: "medium",
    icon: AlertTriangle,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    actionRequired: false,
  },
  {
    id: 4,
    type: "report_ready",
    title: "Report Generated",
    message: "Monthly compliance report for December 2024 is ready for download",
    timestamp: "2024-01-14T09:20:00Z",
    read: true,
    priority: "low",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    actionRequired: false,
  },
  {
    id: 5,
    type: "visit_overdue",
    title: "Overdue Visit",
    message: "Golden Harvest farm visit is 3 days overdue",
    timestamp: "2024-01-13T16:00:00Z",
    read: false,
    priority: "high",
    icon: Clock,
    color: "text-red-600",
    bgColor: "bg-red-50",
    actionRequired: true,
    farmName: "Golden Harvest",
    farmer: "Sarah Wilson",
    farmId: 3,
  },
  {
    id: 6,
    type: "system_update",
    title: "System Update",
    message: "AgriTrack system will undergo maintenance tonight from 11 PM to 2 AM",
    timestamp: "2024-01-13T14:30:00Z",
    read: true,
    priority: "low",
    icon: Info,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    actionRequired: false,
  },
  {
    id: 7,
    type: "new_farmer",
    title: "New Farmer Registration",
    message: "James Miller has registered Mountain Peak Farm in your jurisdiction",
    timestamp: "2024-01-13T11:15:00Z",
    read: true,
    priority: "medium",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-50",
    actionRequired: false,
    farmName: "Mountain Peak Farm",
    farmer: "James Miller",
    farmId: 6,
  },
  {
    id: 8,
    type: "crop_disease",
    title: "Disease Alert",
    message: "Potential blight outbreak detected in 3 farms in Sector 12",
    timestamp: "2024-01-12T13:45:00Z",
    read: true,
    priority: "high",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    actionRequired: true,
  },
]

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all")
  const [notificationList, setNotificationList] = useState(notifications)

  const filteredNotifications = notificationList.filter((notification) => {
    if (filter === "unread") return !notification.read
    if (filter === "high") return notification.priority === "high"
    if (filter === "action") return notification.actionRequired
    return true
  })

  const unreadCount = notificationList.filter((n) => !n.read).length
  const actionRequiredCount = notificationList.filter((n) => n.actionRequired && !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((notification) => notification.id !== id))
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-gray-500">Stay updated with important alerts and reminders</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <Check className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notificationList.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {unreadCount}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Action Required</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{actionRequiredCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <Badge variant="destructive" className="text-xs">
                High
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notificationList.filter((n) => n.priority === "high").length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>Latest alerts, reminders, and system updates</CardDescription>
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter notifications" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Notifications</SelectItem>
                  <SelectItem value="unread">Unread Only</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="action">Action Required</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                  <p className="text-muted-foreground">
                    {filter === "all" ? "You're all caught up!" : `No ${filter} notifications found.`}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-4 rounded-lg border p-4 transition-colors ${
                      !notification.read ? "bg-muted/30" : ""
                    }`}
                  >
                    <div className={`rounded-lg p-2 ${notification.bgColor}`}>
                      <notification.icon className={`h-4 w-4 ${notification.color}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-sm font-medium ${!notification.read ? "font-semibold" : ""}`}>
                          {notification.title}
                        </h4>
                        <Badge
                          variant={
                            notification.priority === "high"
                              ? "destructive"
                              : notification.priority === "medium"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {notification.priority}
                        </Badge>
                        {notification.actionRequired && (
                          <Badge variant="outline" className="text-xs">
                            Action Required
                          </Badge>
                        )}
                        {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-600" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{formatTimestamp(notification.timestamp)}</span>
                        {notification.farmName && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Tractor className="h-3 w-3" />
                              {notification.farmName}
                            </span>
                          </>
                        )}
                        {notification.farmer && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {notification.farmer}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!notification.read && (
                          <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                            <Check className="mr-2 h-4 w-4" />
                            Mark as Read
                          </DropdownMenuItem>
                        )}
                        {notification.farmId && (
                          <DropdownMenuItem asChild>
                            <Link href={`/portal/field-coordinator/farms/${notification.farmId}`}>
                              <MapPin className="mr-2 h-4 w-4" />
                              View Farm
                            </Link>
                          </DropdownMenuItem>
                        )}
                        {notification.actionRequired && notification.type === "visit_reminder" && (
                          <DropdownMenuItem asChild>
                            <Link href="/portal/field-coordinator/visits/scheduled">
                              <Calendar className="mr-2 h-4 w-4" />
                              View Schedule
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
