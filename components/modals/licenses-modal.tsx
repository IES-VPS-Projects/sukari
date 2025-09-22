"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileCheck, Download, Eye } from "lucide-react"

const mockDashboardData = {
  licenses: {
    total: 89,
    active: 67,
    pending: 12,
    expired: 10
  }
}

interface LicensesModalProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
}

export function LicensesModal({ open, onOpenChange }: LicensesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-green-600" />
            License Management
          </DialogTitle>
          <DialogDescription>
            Manage and approve license applications
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Licenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{mockDashboardData.licenses.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Active Licenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{mockDashboardData.licenses.active}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Pending Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{mockDashboardData.licenses.pending}</div>
              </CardContent>
            </Card>
          </div>
          <div className="flex space-x-2">
            <Button>
              <Eye className="h-4 w-4 mr-2" />
              Review Applications
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Generate Reports
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
          <div className="text-center text-gray-500 py-8">
            License management interface will be implemented here
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
