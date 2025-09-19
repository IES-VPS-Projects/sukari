"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Bell, CheckCircle, Clock, Eye, MapPin, Tractor, Users } from "lucide-react"

const alerts = [
  {
    id: 1,
    title: "Weather Alert",
    message: "Heavy rainfall expected in Sector 5 for the next 48 hours",
    timestamp: "2024-01-14T10:45:00Z",
    priority: "medium",
    type: "weather",
    status: "active",
    affectedFarms: ["Green Valley Farm", "Blue Ridge Farm"]
  },
  {
    id: 2,
    title: "Disease Outbreak",
    message: "Blight detected in 3 farms in Sector 12",
    timestamp: "2024-01-14T09:20:00Z",
    priority: "high",
    type: "disease",
    status: "active",
    affectedFarms: ["Sunrise Agriculture", "Valley View Agriculture", "Mountain Peak Farm"]
  },
  {
    id: 3,
    title: "Compliance Warning",
    message: "Sunrise Agriculture has fallen below 70% compliance threshold",
    timestamp: "2024-01-14T12:15:00Z",
    priority: "high",
    type: "compliance",
    status: "active",
    affectedFarms: ["Sunrise Agriculture"]
  },
  {
    id: 4,
    title: "System Maintenance",
    message: "Scheduled maintenance on January 20th from 11 PM to 2 AM",
    timestamp: "2024-01-13T14:30:00Z",
    priority: "low",
    type: "system",
    status: "active",
    affectedFarms: []
  },
]

const warnings = [
  {
    id: 5,
    title: "Overdue Visit",
    message: "Golden Harvest farm visit is 3 days overdue",
    timestamp: "2024-01-13T16:00:00Z",
    priority: "medium",
    type: "visit",
    status: "active",
    affectedFarms: ["Golden Harvest"]
  },
  {
    id: 6,
    title: "Irrigation System Warning",
    message: "Potential irrigation system failure detected at Blue Ridge Farm",
    timestamp: "2024-01-12T13:45:00Z",
    priority: "medium",
    type: "equipment",
    status: "active",
    affectedFarms: ["Blue Ridge Farm"]
  }
]

const notifications = [
  {
    id: 7,
    title: "New Farmer Registration",
    message: "James Miller has registered Mountain Peak Farm in your jurisdiction",
    timestamp: "2024-01-13T11:15:00Z",
    priority: "low",
    type: "registration",
    status: "unread",
    affectedFarms: ["Mountain Peak Farm"]
  },
  {
    id: 8,
    title: "Report Generated",
    message: "Monthly compliance report for December 2023 is ready for download",
    timestamp: "2024-01-14T09:20:00Z",
    priority: "low",
    type: "report",
    status: "unread",
    affectedFarms: []
  }
]

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours}h ago`
  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays}d ago`
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge variant="destructive">High</Badge>
    case "medium":
      return <Badge variant="secondary">Medium</Badge>
    case "low":
      return <Badge variant="outline">Low</Badge>
    default:
      return <Badge variant="outline">{priority}</Badge>
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "weather":
      return <AlertTriangle className="h-5 w-5 text-orange-500" />
    case "disease":
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    case "compliance":
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    case "system":
      return <Bell className="h-5 w-5 text-blue-500" />
    case "visit":
      return <Clock className="h-5 w-5 text-orange-500" />
    case "equipment":
      return <AlertTriangle className="h-5 w-5 text-orange-500" />
    case "registration":
      return <Users className="h-5 w-5 text-green-500" />
    case "report":
      return <CheckCircle className="h-5 w-5 text-green-500" />
    default:
      return <Bell className="h-5 w-5 text-gray-500" />
  }
}

interface AlertsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alerts
          </DialogTitle>
          <DialogDescription>
            Important notifications requiring attention
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="alerts" className="bg-red-100 data-[state=active]:bg-red-200">Critical Alerts</TabsTrigger>
            <TabsTrigger value="warnings" className="bg-orange-100 data-[state=active]:bg-orange-200">Warnings</TabsTrigger>
            <TabsTrigger value="notifications" className="bg-green-100 data-[state=active]:bg-green-200">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="alerts" className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Critical Alerts
            </h3>
            
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="rounded-lg border p-4 hover:shadow-md hover:shadow-gray-300/50 transform hover:scale-[1.01] transition-all duration-200">
                  <div className="flex items-start gap-3">
                    {getTypeIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{alert.title}</h4>
                        {getPriorityBadge(alert.priority)}
                      </div>
                      <p className="text-sm mt-1">{alert.message}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <span>{formatTimestamp(alert.timestamp)}</span>
                      </div>
                      
                      {alert.affectedFarms.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm font-medium">Affected Farms:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {alert.affectedFarms.map((farm, index) => (
                              <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-md">
                                <Tractor className="h-3 w-3 text-gray-500" />
                                {farm}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="warnings" className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Warnings
            </h3>
            
            <div className="space-y-3">
              {warnings.map((warning) => (
                <div key={warning.id} className="rounded-lg border p-4 bg-orange-50 hover:shadow-md hover:shadow-orange-200/50 transform hover:scale-[1.01] transition-all duration-200">
                  <div className="flex items-start gap-3">
                    {getTypeIcon(warning.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{warning.title}</h4>
                        {getPriorityBadge(warning.priority)}
                      </div>
                      <p className="text-sm mt-1">{warning.message}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <span>{formatTimestamp(warning.timestamp)}</span>
                      </div>
                      
                      {warning.affectedFarms.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm font-medium">Affected Farms:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {warning.affectedFarms.map((farm, index) => (
                              <div key={index} className="flex items-center gap-1 text-xs bg-orange-100 px-2 py-1 rounded-md">
                                <Tractor className="h-3 w-3 text-orange-500" />
                                {farm}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-500" />
              Notifications
            </h3>
            
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="rounded-lg border p-4 hover:shadow-md hover:shadow-green-200/50 transform hover:scale-[1.01] transition-all duration-200 bg-green-50/30">
                  <div className="flex items-start gap-3">
                    {getTypeIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        {notification.status === "unread" && (
                          <div className="h-2 w-2 rounded-full bg-blue-600" />
                        )}
                      </div>
                      <p className="text-sm mt-1">{notification.message}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <span>{formatTimestamp(notification.timestamp)}</span>
                      </div>
                      
                      {notification.affectedFarms.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm font-medium">Related Farms:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {notification.affectedFarms.map((farm, index) => (
                              <div key={index} className="flex items-center gap-1 text-xs bg-green-100 px-2 py-1 rounded-md">
                                <Tractor className="h-3 w-3 text-green-500" />
                                {farm}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <Button size="sm" variant="outline">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}