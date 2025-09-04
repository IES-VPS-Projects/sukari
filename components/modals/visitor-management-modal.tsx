"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Users, Clock, CheckCircle, XCircle, Calendar, Eye, UserCheck } from "lucide-react"

interface VisitorManagementModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VisitorManagementModal({ open, onOpenChange }: VisitorManagementModalProps) {
  const visitorData = {
    totalRequests: 24,
    approved: 18,
    pending: 4,
    todaysVisitors: 3,
    visitors: [
      {
        id: 1,
        name: "Dr. Sarah Wanjiku",
        organization: "KALRO",
        purpose: "Research Collaboration Meeting",
        date: "2024-09-04",
        time: "10:00 AM",
        status: "Approved",
        approvedBy: "Security Office"
      },
      {
        id: 2,
        name: "John Mwangi",
        organization: "Mumias Sugar Company",
        purpose: "Factory Equipment Inspection",
        date: "2024-09-04",
        time: "2:00 PM",
        status: "Pending",
        approvedBy: "-"
      },
      {
        id: 3,
        name: "Mary Achieng",
        organization: "Ministry of Agriculture",
        purpose: "Policy Discussion",
        date: "2024-09-05",
        time: "9:00 AM",
        status: "Approved",
        approvedBy: "Executive Office"
      },
      {
        id: 4,
        name: "Peter Kiprotich",
        organization: "Chemelil Sugar",
        purpose: "Quality Standards Review",
        date: "2024-09-05",
        time: "11:30 AM",
        status: "Pending",
        approvedBy: "-"
      },
      {
        id: 5,
        name: "Grace Muthoni",
        organization: "Sugar Research Foundation",
        purpose: "Research Data Sharing",
        date: "2024-09-03",
        time: "3:00 PM",
        status: "Completed",
        approvedBy: "Research Department"
      }
    ]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Pending":
        return <Clock className="h-4 w-4 text-orange-600" />
      case "Completed":
        return <UserCheck className="h-4 w-4 text-blue-600" />
      default:
        return <XCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-orange-100 text-orange-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            Visitor Management
          </DialogTitle>
          <DialogDescription>
            Visitor requests, access control, and meeting coordination
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Visitor Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{visitorData.totalRequests}</div>
                <div className="text-sm text-muted-foreground">Total Requests</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{visitorData.approved}</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">{visitorData.pending}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{visitorData.todaysVisitors}</div>
                <div className="text-sm text-muted-foreground">Today's Visitors</div>
              </CardContent>
            </Card>
          </div>

          {/* Visitor Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Recent Visitor Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visitorData.visitors.map((visitor, index) => (
                  <div key={visitor.id}>
                    <div className="flex items-start justify-between p-4 rounded-lg border">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {getStatusIcon(visitor.status)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{visitor.name}</h4>
                            <p className="text-sm text-muted-foreground">{visitor.organization}</p>
                            <p className="text-sm mt-1">{visitor.purpose}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(visitor.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{visitor.time}</span>
                              </div>
                            </div>
                            {visitor.approvedBy !== "-" && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Approved by: {visitor.approvedBy}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant="secondary" 
                          className={getStatusColor(visitor.status)}
                        >
                          {visitor.status}
                        </Badge>
                        {visitor.status === "Pending" && (
                          <div className="mt-2 space-x-2">
                            <Button size="sm" variant="outline" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs text-red-600">
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    {index < visitorData.visitors.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Access Control Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Access Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Security Clearance Required</span>
                  <Badge variant="secondary">Level 2</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Average Processing Time</span>
                  <Badge variant="secondary">2.5 hours</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Approval Rate</span>
                  <Badge variant="secondary">75%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Meeting Coordination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Scheduled Meetings</span>
                  <Badge variant="secondary">8 this week</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Conference Room Bookings</span>
                  <Badge variant="secondary">12 active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">VIP Visits</span>
                  <Badge variant="secondary">2 this month</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
