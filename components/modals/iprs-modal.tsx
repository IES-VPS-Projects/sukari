"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Download, CheckCircle } from "lucide-react"

const mockDashboardData = {
  iprs: {
    total: 89,
    active: 76,
    pending: 7,
    expired: 6
  }
}

interface IprsModalProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
}

export function IprsModal({ open, onOpenChange }: IprsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-6 w-6 text-red-600" />
            Integrated Population Registration System (IPRS)
          </DialogTitle>
          <DialogDescription>
            Manage population registration and identity verification
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{mockDashboardData.iprs.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Active Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{mockDashboardData.iprs.active}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Pending Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{mockDashboardData.iprs.pending}</div>
              </CardContent>
            </Card>
          </div>
          <div className="flex space-x-2">
            <Button>
              <CheckCircle className="h-4 w-4 mr-2" />
              Verify Records
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
            IPRS management interface will be implemented here
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
