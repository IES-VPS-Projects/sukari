"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Eye, Download, FileCheck } from "lucide-react"

const mockDashboardData = {
  brs: {
    total: 234,
    active: 198,
    pending: 18,
    rejected: 18
  }
}

interface BrsModalProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
}

export function BrsModal({ open, onOpenChange }: BrsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-orange-600" />
            Business Registration System (BRS)
          </DialogTitle>
          <DialogDescription>
            Manage business registrations and related processes
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{mockDashboardData.brs.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Active Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{mockDashboardData.brs.active}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Pending Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{mockDashboardData.brs.pending}</div>
              </CardContent>
            </Card>
          </div>
          <div className="flex space-x-2">
            <Button>
              <Eye className="h-4 w-4 mr-2" />
              Review Applications
            </Button>
            <Button variant="outline">
              <FileCheck className="h-4 w-4 mr-2" />
              Generate Certificates
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
          <div className="text-center text-gray-500 py-8">
            BRS management interface will be implemented here
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
