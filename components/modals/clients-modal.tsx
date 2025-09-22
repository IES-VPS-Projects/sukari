"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Plus, Download, Users } from "lucide-react"

const mockDashboardData = {
  clients: {
    total: 156,
    active: 142,
    pending: 8,
    inactive: 6
  }
}

interface ClientsModalProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
}

export function ClientsModal({ open, onOpenChange }: ClientsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-purple-600" />
            Client Management
          </DialogTitle>
          <DialogDescription>
            Manage client companies and organizations
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{mockDashboardData.clients.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Active Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{mockDashboardData.clients.active}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Pending Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{mockDashboardData.clients.pending}</div>
              </CardContent>
            </Card>
          </div>
          <div className="flex space-x-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Client Reports
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
          <div className="text-center text-gray-500 py-8">
            Client management interface will be implemented here
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
