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
import { MappingAssignment, mappingAssignments } from "../data/gis-mapping-data"
import { MapPin, Calendar, Clock, CheckCircle, AlertCircle, MapIcon } from "lucide-react"

interface GisMappingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GisMappingModal({ open, onOpenChange }: GisMappingModalProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<MappingAssignment | null>(null)

  const handleAssignmentClick = (assignment: MappingAssignment) => {
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
          <DialogTitle>GIS Field Mapping Assignments</DialogTitle>
          <DialogDescription>
            View and manage your field mapping assignments.
          </DialogDescription>
        </DialogHeader>

        {selectedAssignment ? (
          // Assignment details view
          <div className="mt-4">
            <Button variant="ghost" size="sm" onClick={handleBackClick} className="mb-4">
              ← Back to all assignments
            </Button>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{selectedAssignment.farmerName}</h3>
                  <p className="text-gray-500">Farmer ID: {selectedAssignment.farmerId}</p>
                </div>
                <div>
                  {renderStatusBadge(selectedAssignment.status)}
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{selectedAssignment.location}</p>
                    <p className="text-gray-600">
                      Lat: {selectedAssignment.coordinates.latitude}, 
                      Long: {selectedAssignment.coordinates.longitude}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapIcon className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Farm Size</p>
                    <p className="text-gray-600">{selectedAssignment.size}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Assignment Timeline</p>
                    <p className="text-gray-600">Assigned: {new Date(selectedAssignment.assignedDate).toLocaleDateString()}</p>
                    <p className="text-gray-600">Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between">
                  <Button variant="default">
                    Start Mapping
                  </Button>
                  {selectedAssignment.status !== 'completed' && (
                    <Button variant="outline">
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // List of assignments view
          <div className="mt-4 space-y-4">
            {mappingAssignments.map((assignment) => (
              <div 
                key={assignment.id} 
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleAssignmentClick(assignment)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{assignment.farmerName}</h3>
                    <p className="text-sm text-gray-500">{assignment.location}</p>
                  </div>
                  <div>
                    {renderStatusBadge(assignment.status)}
                  </div>
                </div>
                
                <div className="mt-3 flex items-center text-sm text-gray-500 gap-4">
                  <div className="flex items-center gap-1">
                    <MapIcon className="h-4 w-4" />
                    <span>{assignment.size}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}