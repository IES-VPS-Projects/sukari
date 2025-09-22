"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Workflow, Plus, Monitor } from "lucide-react"

const mockDashboardData = {
  workflowEngine: {
    totalProcesses: 12,
    activeProcesses: 8,
    pendingProcesses: 2,
    completedProcesses: 2
  }
}

interface WorkflowModalProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
}

export function WorkflowModal({ open, onOpenChange }: WorkflowModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Workflow className="h-6 w-6 text-indigo-600" />
            Workflow Engine Setup
          </DialogTitle>
          <DialogDescription>
            Configure and manage workflow processes
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Processes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-indigo-600">{mockDashboardData.workflowEngine.totalProcesses}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Active Processes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{mockDashboardData.workflowEngine.activeProcesses}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Pending Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{mockDashboardData.workflowEngine.pendingProcesses}</div>
              </CardContent>
            </Card>
          </div>
          <div className="flex space-x-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Workflow
            </Button>
            <Button variant="outline">
              <Workflow className="h-4 w-4 mr-2" />
              Process Templates
            </Button>
            <Button variant="outline">
              <Monitor className="h-4 w-4 mr-2" />
              Monitor Processes
            </Button>
          </div>
          <div className="text-center text-gray-500 py-8">
            Workflow engine configuration interface will be implemented here
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
