"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Eye, CheckCircle, Clock, AlertTriangle } from "lucide-react"

const upcomingVisits = [
  {
    id: 1,
    farmName: "Green Valley Farm",
    farmer: "Mary Johnson",
    date: "2024-01-15",
    time: "09:00 AM",
    type: "Crop Assessment",
    priority: "high" as const,
    location: "Sector 7, Block A",
  },
  {
    id: 2,
    farmName: "Sunrise Agriculture",
    farmer: "David Smith",
    date: "2024-01-15",
    time: "02:00 PM",
    type: "Compliance Check",
    priority: "medium" as const,
    location: "Sector 12, Block C",
  },
  {
    id: 3,
    farmName: "Golden Harvest",
    farmer: "Sarah Wilson",
    date: "2024-01-16",
    time: "10:30 AM",
    type: "Disease Monitoring",
    priority: "high" as const,
    location: "Sector 3, Block B",
  },
]

const completedVisits = [
  {
    id: 1,
    farmName: "Blue Ridge Farm",
    farmer: "Robert Brown",
    date: "2024-01-12",
    status: "completed" as const,
    findings: "Healthy crop growth, recommended fertilizer application",
    cropStage: "Flowering",
  },
  {
    id: 2,
    farmName: "Valley View Agriculture",
    farmer: "Lisa Davis",
    date: "2024-01-11",
    status: "completed" as const,
    findings: "Minor pest issues detected, treatment recommended",
    cropStage: "Vegetative",
  },
  {
    id: 3,
    farmName: "Mountain Peak Farm",
    farmer: "James Miller",
    date: "2024-01-10",
    status: "pending" as const,
    findings: "Report pending submission",
    cropStage: "Germination",
  },
]

const overdueVisits = [
  {
    id: 1,
    farmName: "Riverside Plantation",
    farmer: "Thomas Wilson",
    date: "2023-12-28",
    daysOverdue: 14,
    priority: "high" as const,
    type: "Compliance Check",
  },
  {
    id: 2,
    farmName: "Hillside Farm",
    farmer: "Patricia Brown",
    date: "2023-12-30",
    daysOverdue: 12,
    priority: "medium" as const,
    type: "Crop Assessment",
  },
]

interface FieldVisitsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FieldVisitsModal({ open, onOpenChange }: FieldVisitsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Field Visits Management
          </DialogTitle>
          <DialogDescription>
            View and manage all your field visits
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Upcoming Visits</h3>
              <Button size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New Visit
              </Button>
            </div>
            
            <div className="space-y-3">
              {upcomingVisits.map((visit) => (
                <div key={visit.id} className="flex items-center space-x-4 rounded-lg border p-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{visit.farmName}</h4>
                      <Badge variant={visit.priority === "high" ? "destructive" : "secondary"}>
                        {visit.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{visit.farmer}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {visit.date} at {visit.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {visit.location}
                      </span>
                    </div>
                    <Badge variant="outline">{visit.type}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            <h3 className="text-lg font-medium">Completed Visits</h3>
            <div className="space-y-3">
              {completedVisits.map((visit) => (
                <div key={visit.id} className="flex items-center space-x-4 rounded-lg border p-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{visit.farmName}</h4>
                      <Badge variant={visit.status === "completed" ? "default" : "secondary"}>
                        {visit.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{visit.farmer}</p>
                    <p className="text-sm">{visit.findings}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{visit.date}</span>
                      <span>Stage: {visit.cropStage}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="overdue" className="space-y-4">
            <h3 className="text-lg font-medium">Overdue Visits</h3>
            <div className="space-y-3">
              {overdueVisits.map((visit) => (
                <div key={visit.id} className="flex items-center space-x-4 rounded-lg border p-4 bg-red-50">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{visit.farmName}</h4>
                      <Badge variant="destructive">
                        {visit.daysOverdue} days overdue
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{visit.farmer}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        Scheduled: {visit.date}
                      </span>
                      <Badge variant="outline">{visit.type}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Clock className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <AlertTriangle className="h-4 w-4" />
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
