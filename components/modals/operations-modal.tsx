"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Activity, TrendingUp, CheckCircle, Clock, Users, BarChart3 } from "lucide-react"

interface OperationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OperationsModal({ open, onOpenChange }: OperationsModalProps) {
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
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Activity className="h-6 w-6" />
            Operations Overview
          </DialogTitle>
          <DialogDescription>
            Recent operational activities and performance metrics
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Operations Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{operationsData.totalOperations}</div>
                <div className="text-sm text-muted-foreground">Total Operations</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{operationsData.successfulOperations}</div>
                <div className="text-sm text-muted-foreground">Successful</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{operationsData.activeOperations}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{operationsData.personnelInvolved.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Personnel</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Operations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Recent Operations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {operationsData.recentOperations.map((operation) => (
                  <div key={operation.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{operation.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Date: {new Date(operation.date).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{operation.personnel} personnel</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={operation.status === "Completed" ? "default" : "secondary"}
                          className={operation.status === "Completed" ? "bg-green-600" : ""}
                        >
                          {operation.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{operation.outcome}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">95.7%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">2.3</div>
                  <div className="text-sm text-muted-foreground">Avg Days</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">15</div>
                  <div className="text-sm text-muted-foreground">Avg Team Size</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
