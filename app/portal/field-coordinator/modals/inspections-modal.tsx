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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InspectionAssignment, inspectionAssignments } from "../data/inspections-data"
import { MapPin, Calendar, User, Phone, ClipboardCheck, ArrowRight } from "lucide-react"
import { InspectionChecklistModal } from "./inspection-checklist-modal"

interface InspectionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InspectionsModal({ open, onOpenChange }: InspectionsModalProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<InspectionAssignment | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showInspectionChecklist, setShowInspectionChecklist] = useState(false)
  
  const baseAssignments = activeTab === "all" 
    ? inspectionAssignments 
    : inspectionAssignments.filter(assignment => assignment.type === activeTab)
  const filteredAssignments = statusFilter === "all" 
    ? baseAssignments 
    : baseAssignments.filter(assignment => assignment.status === statusFilter)

  // Map statuses to header background colors
  const getStatusHeaderBg = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50"
      case "in-progress":
        return "bg-blue-50"
      case "completed":
        return "bg-green-50"
      default:
        return "bg-gray-50"
    }
  }

  // In details view always gray; in list view we may theme by selected status option if present
  const headerBgClass = selectedAssignment ? "bg-gray-50" : getStatusHeaderBg(statusFilter)

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

  const getUnderlineClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'data-[state=active]:border-yellow-500'
      case 'in-progress':
        return 'data-[state=active]:border-blue-500'
      case 'completed':
        return 'data-[state=active]:border-green-500'
      default:
        return 'data-[state=active]:border-gray-900'
    }
  }

  const getStatusHoverBg = (status: string) => {
    switch (status) {
      case 'pending':
        return 'hover:bg-yellow-50'
      case 'in-progress':
        return 'hover:bg-blue-50'
      case 'completed':
        return 'hover:bg-green-50'
      default:
        return 'hover:bg-gray-50'
    }
  }


  const handleInspectionReportSubmit = (report: any) => {
    console.log('Inspection Report Submitted:', report)
    // Here you would normally send the report to the backend
    // For now, we'll just log it and close the modals
    setShowInspectionChecklist(false)
    setSelectedAssignment(null)
    // Show success message or update the assignment status
    alert('Inspection report submitted successfully!')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className={`${headerBgClass} -mx-6 -mt-6 px-6 py-4 border-y border-gray-200`}>
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

                {selectedAssignment.companyInfo && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-3">Company Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedAssignment.companyInfo.registrationNo && (
                        <div>
                          <span className="font-medium text-blue-800">Registration No:</span>
                          <p className="text-blue-700">{selectedAssignment.companyInfo.registrationNo}</p>
                        </div>
                      )}
                      {selectedAssignment.companyInfo.pinNumber && (
                        <div>
                          <span className="font-medium text-blue-800">PIN Number:</span>
                          <p className="text-blue-700">{selectedAssignment.companyInfo.pinNumber}</p>
                        </div>
                      )}
                      {selectedAssignment.companyInfo.postalAddress && (
                        <div>
                          <span className="font-medium text-blue-800">Postal Address:</span>
                          <p className="text-blue-700">{selectedAssignment.companyInfo.postalAddress}</p>
                        </div>
                      )}
                      {selectedAssignment.companyInfo.county && (
                        <div>
                          <span className="font-medium text-blue-800">County:</span>
                          <p className="text-blue-700">{selectedAssignment.companyInfo.county}, {selectedAssignment.companyInfo.subcounty}</p>
                        </div>
                      )}
                      {selectedAssignment.companyInfo.email && (
                        <div>
                          <span className="font-medium text-blue-800">Email:</span>
                          <p className="text-blue-700">{selectedAssignment.companyInfo.email}</p>
                        </div>
                      )}
                      {selectedAssignment.companyInfo.establishmentDate && (
                        <div>
                          <span className="font-medium text-blue-800">Established:</span>
                          <p className="text-blue-700">{selectedAssignment.companyInfo.establishmentDate}</p>
                        </div>
                      )}
                      {selectedAssignment.companyInfo.productionCapacity && (
                        <div>
                          <span className="font-medium text-blue-800">Production Capacity:</span>
                          <p className="text-blue-700">{selectedAssignment.companyInfo.productionCapacity}</p>
                        </div>
                      )}
                      {selectedAssignment.companyInfo.facilitySize && (
                        <div>
                          <span className="font-medium text-blue-800">Facility Size:</span>
                          <p className="text-blue-700">{selectedAssignment.companyInfo.facilitySize}</p>
                        </div>
                      )}
                      {selectedAssignment.companyInfo.employeeCount && (
                        <div>
                          <span className="font-medium text-blue-800">Employee Count:</span>
                          <p className="text-blue-700">{selectedAssignment.companyInfo.employeeCount}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Spacer to maintain card height where checklist was */}
                <div className="h-24"></div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-start">
                  <Button
                    variant="default"
                    onClick={() => setShowInspectionChecklist(true)}
                  >
                    Start Inspection
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // List of inspections with tabs
          <div className="mt-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-4 gap-2">
                <TabsList className="w-auto justify-start border-b border-gray-200">
                  <TabsTrigger value="all" className={`rounded-none border-b-2 border-transparent data-[state=active]:text-gray-900 text-gray-600 ${getUnderlineClass(statusFilter)}`}>All</TabsTrigger>
                  <TabsTrigger value="letterOfComfort" className={`rounded-none border-b-2 border-transparent data-[state=active]:text-gray-900 text-gray-600 ${getUnderlineClass(statusFilter)}`}>Letter of Comfort</TabsTrigger>
                  <TabsTrigger value="mill" className={`rounded-none border-b-2 border-transparent data-[state=active]:text-gray-900 text-gray-600 ${getUnderlineClass(statusFilter)}`}>Mill</TabsTrigger>
                  <TabsTrigger value="import" className={`rounded-none border-b-2 border-transparent data-[state=active]:text-gray-900 text-gray-600 ${getUnderlineClass(statusFilter)}`}>Import</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Status:</span>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-8 w-[160px]">
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <TabsContent value={activeTab} className="mt-0 space-y-4 min-h-[420px]">
                {filteredAssignments.map((assignment) => (
                  <div 
                    key={assignment.id} 
                    className={`rounded-xl p-4 bg-white cursor-pointer transition-all hover:shadow-sm hover:-translate-y-0.5 ${getStatusHoverBg(assignment.status)}`}
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

      {/* Inspection Checklist Modal */}
      <InspectionChecklistModal
        open={showInspectionChecklist}
        onOpenChange={setShowInspectionChecklist}
        assignment={selectedAssignment}
        onSubmitReport={handleInspectionReportSubmit}
        onBackToDetails={() => setShowInspectionChecklist(false)}
      />
    </Dialog>
  )
}