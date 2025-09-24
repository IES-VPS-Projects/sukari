"use client"

import { useState } from "react"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InspectionAssignment, inspectionAssignments } from "../data/inspections-data"
import { MapPin, Calendar, User, Phone, ClipboardCheck, ArrowRight } from "lucide-react"

interface InspectionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InspectionsModal({ open, onOpenChange }: InspectionsModalProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<InspectionAssignment | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")
  
  const filteredAssignments = activeTab === "all" 
    ? inspectionAssignments 
    : inspectionAssignments.filter(assignment => assignment.type === activeTab)

  const handleAssignmentClick = (assignment: InspectionAssignment) => {
    setSelectedAssignment(assignment)
  }
  
  const handleBackClick = () => {
    setSelectedAssignment(null)
  }

  // Helper function to render status badge with appropriate color
  const renderStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Inspections</DialogTitle>
          <DialogDescription>
            View and manage your mill and importer inspection assignments.
          </DialogDescription>
        </DialogHeader>

        {selectedAssignment ? (
          // Assignment details view
          <div className="mt-4">
            <Button variant="ghost" size="sm" onClick={handleBackClick} className="mb-4">
              ← Back to all inspections
            </Button>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{selectedAssignment.title}</h3>
                  <p className="text-gray-500">{selectedAssignment.businessName} (ID: {selectedAssignment.businessId})</p>
                </div>
                <div>
                  {renderStatusBadge(selectedAssignment.status)}
                </div>
              </div>
              
              <p className="mt-4 text-gray-700">{selectedAssignment.description}</p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{selectedAssignment.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Contact Person</p>
                    <p className="text-gray-600">{selectedAssignment.contactPerson}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Contact Number</p>
                    <p className="text-gray-600">{selectedAssignment.contactPhone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Timeline</p>
                    <p className="text-gray-600">Assigned: {new Date(selectedAssignment.assignedDate).toLocaleDateString()}</p>
                    <p className="text-gray-600">Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {selectedAssignment.checklist && selectedAssignment.checklist.length > 0 && (
                  <div className="flex items-start gap-3">
                    <ClipboardCheck className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Inspection Checklist</p>
                      <ul className="mt-2 space-y-2">
                        {selectedAssignment.checklist.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-600">
                            <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                              {index + 1}
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between">
                  <Button variant="default">
                    Start Inspection
                  </Button>
                  {selectedAssignment.type === "letterOfComfort" && (
                    <Button variant="outline">
                      Download Letter of Comfort
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // List of inspections with tabs
          <div className="mt-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="letterOfComfort">Letter of Comfort</TabsTrigger>
                <TabsTrigger value="mill">Mill</TabsTrigger>
                <TabsTrigger value="import">Import</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0 space-y-4">
                {filteredAssignments.map((assignment) => (
                  <div 
                    key={assignment.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleAssignmentClick(assignment)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{assignment.title}</h3>
                        <p className="text-sm text-gray-500">{assignment.businessName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {renderStatusBadge(assignment.status)}
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center text-sm text-gray-500 gap-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{assignment.location.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredAssignments.length === 0 && (
                  <div className="py-8 text-center text-gray-500">
                    No inspection assignments found for this category.
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}