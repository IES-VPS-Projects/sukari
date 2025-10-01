"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  X,
  FileText,
  Download,
  Star,
  Info,
  Image as ImageIcon,
  Grid3x3,
  List
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface ReviewApplicationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBackToList?: () => void
}

// Mock data for demonstration
const mockApplicationData = {
  applicationId: "APP-2024-001",
  dateSubmitted: "January 15, 2025",
  daysRemaining: 45,
  totalDays: 60,
  companyName: "Mumias Sugar Mills Ltd",
  location: "Mumias, Kakamega County",
  applicantData: {
    companyName: "Mumias Sugar Mills Ltd",
    registrationNumber: "CPR/2018/123456",
    pinNumber: "P051234567A",
    phoneNumber: "+254-722-123456",
    emailAddress: "info@mumiassugar.co.ke",
    postalAddress: "P.O. Box 234, Mumias",
    gpsCoordinates: "0.3344° N, 34.4872° E",
    projectedCapacity: "3500 TCD",
    plantEquipment: "1500M KSh",
    landBuildings: "800M KSh",
    establishmentDate: "March 15, 2018",
    county: "Kakamega",
    subcounty: "Mumias East"
  },
  inspectionData: {
    fieldCoordinator: "Bernice Kasavuli",
    inspectionDate: "February 10, 2025",
    region: "Kwale, Coast Region",
    overallScore: 84,
    recommendation: "Approve with Conditions",
    gpsCoordinates: "0.3340° N, 34.4868° E",
    observedCapacity: "3000 TCD",
    equipmentCount: "12 processing units",
    overallNotes: "The mill facility is generally well-equipped and meets most regulatory requirements. However, some minor discrepancies were noted between the application data and physical inspection findings. The production capacity appears slightly lower than claimed, and GPS coordinates show minor variance. Recommend approval with conditions to address these items within 90 days."
  },
  discrepancies: [
    {
      field: "Production Capacity",
      applicantValue: "3500 TCD",
      inspectorValue: "3000 TCD",
      severity: "critical",
      notes: "Observed equipment configuration suggests lower capacity than claimed"
    },
    {
      field: "GPS Coordinates",
      applicantValue: "0.3344° N, 34.4872° E",
      inspectorValue: "0.3340° N, 34.4868° E",
      severity: "minor",
      notes: "Minor measurement difference, likely due to GPS device precision"
    },
    {
      field: "Equipment Specification",
      applicantValue: "15 processing units",
      inspectorValue: "12 processing units",
      severity: "critical",
      notes: "Three units mentioned in application not found during inspection"
    }
  ],
  matchingFields: [
    { field: "Company Name", value: "Mumias Sugar Mills Ltd" },
    { field: "County", value: "Kakamega" },
    { field: "Subcounty", value: "Mumias East" },
    { field: "Company Registration", value: "CPR/2018/123456" },
    { field: "PIN Number", value: "P051234567A" },
    { field: "Contact Phone", value: "+254-722-123456" }
  ]
}

const mockChecklistItems = [
  {
    id: "1",
    item: "Verify physical location and GPS coordinates",
    completed: true,
    rating: 4,
    notes: "Location verified. Minor GPS variance of 0.0004 degrees noted, within acceptable range for consumer-grade GPS devices.",
    images: ["inspection-1.jpg", "inspection-2.jpg"]
  },
  {
    id: "2",
    item: "Inspect milling equipment and production capacity",
    completed: true,
    rating: 3,
    notes: "Found 12 operational processing units instead of 15 claimed. Estimated capacity 3000 TCD based on equipment specifications.",
    images: ["equipment-1.jpg", "equipment-2.jpg", "equipment-3.jpg"]
  },
  {
    id: "3",
    item: "Verify safety equipment and compliance",
    completed: true,
    rating: 5,
    notes: "Excellent safety standards. Fire suppression systems, emergency exits, and safety equipment all meet or exceed requirements.",
    images: ["safety-1.jpg"]
  },
  {
    id: "4",
    item: "Check environmental compliance documentation",
    completed: true,
    rating: 4,
    notes: "Environmental impact assessment approved. Waste management systems in place and functioning properly.",
    images: []
  },
  {
    id: "5",
    item: "Inspect storage and warehousing facilities",
    completed: true,
    rating: 4,
    notes: "Storage facilities adequate for projected production volume. Climate control systems operational.",
    images: ["storage-1.jpg", "storage-2.jpg"]
  }
]

const mockDocuments = [
  { name: "county_recommendation.pdf", type: "PDF", size: "2.3 MB", uploadDate: "Jan 15, 2025", requirement: "County Government Recommendation" },
  { name: "feasibility_study.pdf", type: "PDF", size: "5.1 MB", uploadDate: "Jan 15, 2025", requirement: "Feasibility Study Report" },
  { name: "certificate_incorporation.pdf", type: "PDF", size: "1.2 MB", uploadDate: "Jan 15, 2025", requirement: "Certificate of Incorporation" },
  { name: "land_ownership.pdf", type: "PDF", size: "3.4 MB", uploadDate: "Jan 15, 2025", requirement: "Land Ownership Evidence" },
  { name: "environmental_compliance.pdf", type: "PDF", size: "4.7 MB", uploadDate: "Jan 15, 2025", requirement: "Environmental Compliance Certificate" },
  { name: "mill_design.pdf", type: "PDF", size: "8.9 MB", uploadDate: "Jan 15, 2025", requirement: "Mill Design and Technology" }
]

export function ReviewApplicationModal({ open, onOpenChange, onBackToList }: ReviewApplicationModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [decisionMode, setDecisionMode] = useState<"approve" | "reject" | "defer" | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [deferReason, setDeferReason] = useState("")
  const [deferInfoRequired, setDeferInfoRequired] = useState("")
  const [documentViewMode, setDocumentViewMode] = useState<"grid" | "list">("grid")
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [decisionComment, setDecisionComment] = useState("")
  const isMobile = useIsMobile()

  const handleDecision = (decision: "approve" | "reject" | "defer") => {
    if (decision === "approve") {
      console.log("Application approved")
      // Show success message
      alert("Application approved successfully!")
      onOpenChange(false)
    } else {
      setDecisionMode(decision)
    }
  }

  const submitDecision = () => {
    if (decisionMode === "reject" && rejectReason.length < 50) {
      alert("Rejection reason must be at least 50 characters")
      return
    }
    if (decisionMode === "defer" && (deferReason.length < 50 || deferInfoRequired.length < 50)) {
      alert("Both deferral fields must be at least 50 characters")
      return
    }
    console.log(`Application ${decisionMode}ed`, { rejectReason, deferReason, deferInfoRequired })
    alert(`Application ${decisionMode}ed successfully!`)
    onOpenChange(false)
  }

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const getRatingColor = (rating: number) => {
    const percentage = (rating / 5) * 100
    if (percentage <= 50) return "text-red-600"
    if (percentage <= 70) return "text-orange-600"
    if (percentage <= 79) return "text-yellow-600"
    if (percentage <= 90) return "text-green-600"
    return "text-amber-600"
  }

  const getTimelineColor = (daysRemaining: number, totalDays: number) => {
    const percentage = (daysRemaining / totalDays) * 100
    if (percentage <= 25) return "bg-red-500"
    if (percentage <= 50) return "bg-orange-500"
    return "bg-green-500"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'max-w-full h-screen max-h-screen m-0 rounded-none overflow-hidden' : 'max-w-4xl max-h-[90vh]'} flex flex-col p-0 [&>button]:hidden`}>
        <DialogTitle className="sr-only">Review Application For Registration</DialogTitle>

        {/* Header */}
        <div className="flex-shrink-0 bg-purple-50 border-b border-gray-200">
          <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
            <div className="flex items-center gap-3 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (onBackToList) {
                    onBackToList()
                  } else {
                    onOpenChange(false)
                  }
                }}
                className="shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-gray-900`}>
                  Review of Application For Registration
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {mockApplicationData.companyName} • {mockApplicationData.location}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

          </div>

          {/* Tabs */}
          <div className={`${isMobile ? 'px-4' : 'px-6'}`}>
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {["overview", "inspection", "documents", "history"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${isMobile ? 'px-3 py-2' : 'px-4 py-2'} text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? "text-purple-600 border-purple-600"
                      : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab === "overview" && "Review"}
                  {tab === "inspection" && "Inspection Report"}
                  {tab === "documents" && "Documents"}
                  {tab === "history" && "History"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {/* Tab 1: Review */}
          {activeTab === "overview" && (
            <div className={`${isMobile ? 'p-4' : 'p-6'} space-y-6`}>
              {/* Summary Section */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Application ID</div>
                      <div className="text-sm font-semibold">{mockApplicationData.applicationId}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Date Submitted</div>
                      <div className="text-sm font-semibold">{mockApplicationData.dateSubmitted}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Days Remaining</div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getTimelineColor(mockApplicationData.daysRemaining, mockApplicationData.totalDays)} text-white border-0 text-xs`}>
                          {mockApplicationData.daysRemaining} days
                        </Badge>
                        <span className="text-xs text-gray-500">of {mockApplicationData.totalDays}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</div>
                      <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">Under Review</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="text-xs text-gray-600">Discrepancies Found</div>
                        <div className="text-sm font-bold text-orange-600">3 Critical</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="text-xs text-gray-600">Overall Inspection Score</div>
                        <div className={`text-sm font-bold ${getRatingColor(mockApplicationData.inspectionData.overallScore / 20)}`}>
                          {mockApplicationData.inspectionData.overallScore}%
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="text-xs text-gray-600">Field Coordinator Recommendation</div>
                        <div className="text-xs font-semibold text-gray-900">{mockApplicationData.inspectionData.recommendation}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Company Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase">Company Name</div>
                      <div className="text-sm font-medium">{mockApplicationData.companyName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase">Location</div>
                      <div className="text-sm font-medium">{mockApplicationData.location}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase">Registration Number</div>
                      <div className="text-sm font-medium">{mockApplicationData.applicantData.registrationNumber}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase">Contact</div>
                      <div className="text-sm font-medium">{mockApplicationData.applicantData.phoneNumber}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Critical Discrepancies */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Critical Discrepancies Requiring Attention
                </h3>
                <div className="space-y-3">
                  {mockApplicationData.discrepancies.map((disc, idx) => (
                    <div
                      key={idx}
                      className={`border-l-4 rounded-lg p-4 ${
                        disc.severity === "critical"
                          ? "bg-red-50 border-red-500"
                          : "bg-orange-50 border-orange-500"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          {disc.field}
                          {disc.severity === "critical" && (
                            <Badge className="bg-red-600 text-white border-0">Critical</Badge>
                          )}
                          {disc.severity === "minor" && (
                            <Badge className="bg-orange-500 text-white border-0">Minor</Badge>
                          )}
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div className="bg-white rounded p-3 border">
                          <div className="text-xs text-gray-500 mb-1">Applicant Stated</div>
                          <div className="text-sm font-medium text-gray-900">{disc.applicantValue}</div>
                        </div>
                        <div className="bg-white rounded p-3 border">
                          <div className="text-xs text-gray-500 mb-1">Inspector Observed</div>
                          <div className="text-sm font-medium text-gray-900">{disc.inspectorValue}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{disc.notes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matching Fields */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Verified Matching Fields
                </h3>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {mockApplicationData.matchingFields.map((field, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-gray-600">{field.field}</div>
                          <div className="text-sm font-medium text-gray-900">{field.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Inspection Report */}
          {activeTab === "inspection" && (
            <div className={`${isMobile ? 'p-4' : 'p-6'} space-y-6`}>
              {/* Inspector Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Inspector Details</h3>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase">Field Coordinator</div>
                      <div className="text-sm font-medium">{mockApplicationData.inspectionData.fieldCoordinator}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase">Inspection Date</div>
                      <div className="text-sm font-medium">{mockApplicationData.inspectionData.inspectionDate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase">Region</div>
                      <div className="text-sm font-medium">{mockApplicationData.inspectionData.region}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overall Assessment */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Overall Assessment</h3>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Overall Rating</div>
                      <div className={`text-3xl font-bold ${getRatingColor(mockApplicationData.inspectionData.overallScore / 20)}`}>
                        {mockApplicationData.inspectionData.overallScore}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Recommendation</div>
                      <Badge className="bg-green-600 text-white border-0">
                        {mockApplicationData.inspectionData.recommendation}
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-white rounded p-3 border">
                    <div className="text-xs text-gray-500 uppercase mb-2">Inspector Notes</div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {mockApplicationData.inspectionData.overallNotes}
                    </p>
                  </div>
                </div>
              </div>

              {/* Checklist Items */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Inspection Checklist Items</h3>
                <div className="space-y-3">
                  {mockChecklistItems.map((item) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden">
                      <div
                        className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => toggleItemExpansion(item.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <Checkbox checked={item.completed} disabled />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{item.item}</h4>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-4 w-4 ${
                                        star <= item.rating
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-sm text-gray-600 ml-2">
                                    {item.rating}/5
                                  </span>
                                </div>
                                {item.images.length > 0 && (
                                  <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <ImageIcon className="h-4 w-4" />
                                    {item.images.length} photos
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            {expandedItems.has(item.id) ? "Hide" : "Show"} Details
                          </Button>
                        </div>
                      </div>

                      {expandedItems.has(item.id) && (
                        <div className="p-4 bg-white border-t">
                          {item.notes && (
                            <div className="mb-4">
                              <div className="text-xs text-gray-500 uppercase mb-1">Inspection Notes</div>
                              <p className="text-sm text-gray-700">{item.notes}</p>
                            </div>
                          )}
                          {item.images.length > 0 && (
                            <div>
                              <div className="text-xs text-gray-500 uppercase mb-2">Evidence Photos</div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {item.images.map((img, idx) => (
                                  <div
                                    key={idx}
                                    className="aspect-square bg-gray-200 rounded border flex items-center justify-center"
                                  >
                                    <ImageIcon className="h-8 w-8 text-gray-400" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Supporting Documents */}
          {activeTab === "documents" && (
            <div className={`${isMobile ? 'p-4' : 'p-6'} space-y-4`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Company Documents ({mockDocuments.length})</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant={documentViewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDocumentViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={documentViewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDocumentViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {documentViewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockDocuments.map((doc, idx) => (
                    <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
                          <FileText className="h-6 w-6 text-red-600" />
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <h4 className="font-medium text-sm text-gray-900 mb-1 truncate" title={doc.name}>
                        {doc.name}
                      </h4>
                      <div className="text-xs text-gray-500 mb-2">
                        {doc.type} • {doc.size}
                      </div>
                      <div className="text-xs text-gray-600 bg-gray-50 rounded p-2">
                        {doc.requirement}
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        Uploaded: {doc.uploadDate}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {mockDocuments.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                          <FileText className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-900 truncate">{doc.name}</h4>
                          <div className="text-xs text-gray-500">
                            {doc.requirement} • {doc.type} • {doc.size} • {doc.uploadDate}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 4: History */}
          {activeTab === "history" && (
            <div className={`${isMobile ? 'p-4' : 'p-6'} space-y-6`}>
              <div>
                <h3 className="text-lg font-semibold mb-4">Application Review History</h3>
                
                {/* Timeline */}
                <div className="space-y-8">
                  {/* Current Stage - Compliance Head Review */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        </div>
                        <div className="w-0.5 h-20 bg-gray-300 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">Compliance Head Review</span>
                          <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">In Progress</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Application currently under review by Compliance Head for final decision
                        </p>
                        <div className="text-xs text-gray-500">
                          Assigned: February 15, 2025 • 2 days ago
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Field Coordinator Inspection */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <div className="w-0.5 h-20 bg-gray-300 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">Field Coordinator Inspection</span>
                          <Badge className="bg-green-100 text-green-700 border-0 text-xs">Completed</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Physical inspection completed by Bernice Kasavuli in Kwale, Coast Region
                        </p>
                        
                        {/* Inspection Details Card */}
                        <div className="bg-gray-50 rounded-lg p-3 border mb-3">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-gray-500">Inspector:</span>
                              <span className="ml-2 font-medium">Bernice Kasavuli</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Score:</span>
                              <span className="ml-2 font-medium text-green-600">84%</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Checklist Items:</span>
                              <span className="ml-2 font-medium">5/5 Completed</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Recommendation:</span>
                              <span className="ml-2 font-medium">Approve with Conditions</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-xs text-gray-600">
                              "Mill facility meets most requirements. Minor discrepancies noted in production capacity claims."
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          Completed: February 10, 2025 • 7 days ago
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Compliance Officer Review */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <div className="w-0.5 h-20 bg-gray-300 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">Compliance Officer Review</span>
                          <Badge className="bg-green-100 text-green-700 border-0 text-xs">Completed</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Initial document verification and compliance check completed
                        </p>
                        
                        {/* Review Details */}
                        <div className="bg-gray-50 rounded-lg p-3 border mb-3">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span>All required documents submitted</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span>Company registration verified</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span>Environmental compliance certificates valid</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-orange-600" />
                              <span>Physical inspection required for capacity verification</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          Completed: January 20, 2025 • 28 days ago
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Application Submitted */}
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">Application Submitted</span>
                          <Badge className="bg-gray-100 text-gray-700 border-0 text-xs">Initial</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Mumias Sugar Mills Ltd submitted application for mill registration
                        </p>
                        <div className="text-xs text-gray-500">
                          Submitted: January 15, 2025 • 33 days ago
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Decision Row */}
        <div className="flex-shrink-0 border-t border-gray-200 bg-white p-4">
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leave a Comment
              </label>
              <Textarea
                value={decisionComment}
                onChange={(e) => setDecisionComment(e.target.value)}
                placeholder="Enter your decision rationale..."
                className="min-h-[80px] resize-none"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                className="border-orange-500 text-orange-600 hover:bg-orange-50"
                onClick={() => {
                  if (decisionComment.trim()) {
                    console.log("Application deferred with comment:", decisionComment)
                    alert("Application deferred successfully!")
                    onOpenChange(false)
                  } else {
                    alert("Please enter a comment before deferring")
                  }
                }}
              >
                Defer
              </Button>
              <Button
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50"
                onClick={() => {
                  if (decisionComment.trim()) {
                    console.log("Application rejected with comment:", decisionComment)
                    alert("Application rejected successfully!")
                    onOpenChange(false)
                  } else {
                    alert("Please enter a comment before rejecting")
                  }
                }}
              >
                Reject
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  console.log("Application approved with comment:", decisionComment)
                  alert("Application approved successfully!")
                  onOpenChange(false)
                }}
              >
                Approve
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
