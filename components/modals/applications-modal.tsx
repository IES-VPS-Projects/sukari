"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  GraduationCap, 
  ArrowRightLeft, 
  Clock, 
  FileText,
  Send 
} from "lucide-react"

interface ApplicationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ApplicationsModal({ open, onOpenChange }: ApplicationsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <Send className="h-5 w-5" />
            Applications & Requests
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6 space-y-6">
          <p className="text-gray-600">Submit new applications and track existing requests</p>
          
          {/* Application Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Leave Application */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Leave Application
                </CardTitle>
                <CardDescription>
                  Apply for annual, sick, or personal leave
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <p>• Annual leave: 21 days remaining</p>
                    <p>• Sick leave: 14 days remaining</p>
                    <p>• Personal leave: 7 days remaining</p>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <FileText className="mr-2 h-4 w-4" />
                    Apply for Leave
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Training Application */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                  Training Application
                </CardTitle>
                <CardDescription>
                  Apply for professional and training programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <p>• Leadership development</p>
                    <p>• Technical skills training</p>
                    <p>• External certifications</p>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Apply for Training
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transfer Application */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ArrowRightLeft className="h-5 w-5 text-green-600" />
                  Transfer Application
                </CardTitle>
                <CardDescription>
                  Apply for department or location transfer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <p>• Internal department transfer</p>
                    <p>• Regional office transfer</p>
                    <p>• Temporary assignments</p>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    Apply for Transfer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Applications
              </CardTitle>
              <CardDescription>Track the status of your submitted applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="font-medium">Annual Leave - December 2024</p>
                      <p className="text-sm text-gray-600">Applied on: Aug 15, 2025</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="font-medium">Leadership Training Program</p>
                      <p className="text-sm text-gray-600">Applied on: Aug 10, 2025</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Approved</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <ArrowRightLeft className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="font-medium">Transfer to Mombasa Office</p>
                      <p className="text-sm text-gray-600">Applied on: Jul 28, 2025</p>
                    </div>
                  </div>
                  <Badge className="bg-red-100 text-red-800">Declined</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="font-medium">Technical Skills Workshop</p>
                      <p className="text-sm text-gray-600">Applied on: Jul 20, 2025</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
