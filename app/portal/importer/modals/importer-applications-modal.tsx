"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Send, CheckCircle, Clock, AlertCircle, ArrowLeft, ClipboardList, Package, Eye, CheckCircle2, Circle } from "lucide-react"
import { applicationsData } from "../data/applications-data"

// Application stages for tracking
const applicationStages = [
  { 
    id: "registration", 
    name: "Registration Form", 
    description: "Fills registration form for importer and exporter" 
  },
  { 
    id: "compliance", 
    name: "Compliance Review", 
    description: "Compliance team reviews application form" 
  },
  { 
    id: "committee", 
    name: "Committee Review", 
    description: "AFA Licensing Committee reviews" 
  },
  { 
    id: "dg", 
    name: "DG Approval", 
    description: "AFA DG reviews and approves" 
  },
  { 
    id: "payment", 
    name: "Payment", 
    description: "Payment request and invoice preparation" 
  },
  { 
    id: "registration_letter", 
    name: "Registration Letter", 
    description: "Letter of registration prepared" 
  }
]

interface ImporterApplicationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedApplicationId?: string
}

export function ImporterApplicationsModal({ open, onOpenChange, selectedApplicationId }: ImporterApplicationsModalProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<'status' | 'registration' | 'import' | 'renewal'>('status')
  const [applicationType, setApplicationType] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [formData, setFormData] = useState({
    licenseNumber: 'SIL-2024-001',
    companyName: 'Kasavuli Sugar Imports Ltd',
    date: '',
    startDate: '',
    endDate: '',
    narrative: '',
    importVolume: '',
    sourceCountry: '',
    sugarType: ''
  })

  const applicationTypes = {
    registration: 'Dealer Registration',
    import: 'Sugar Import Letter of Intent',
    renewal: 'License'
  }

  const sugarTypes = [
    'White Sugar',
    'Brown Sugar',
    'Raw Sugar',
    'Refined Sugar',
    'Specialty Sugar',
    'Organic Sugar'
  ]

  const sourceCountries = [
    'Brazil',
    'Thailand',
    'India',
    'Australia',
    'South Africa',
    'Mauritius',
    'Egypt',
    'Other'
  ]

  // Mock application data
  const applications = [
    {
      id: 'APP-2024-001',
      type: 'Sugar Import Letter of Intent',
      status: 'Under Review',
      submitDate: '2024-09-08',
      volume: '500 MT',
      country: 'Brazil'
    },
    {
      id: 'APP-2024-002',
      type: 'License',
      status: 'Approved',
      submitDate: '2024-08-15',
      approvalDate: '2024-08-20'
    },
    {
      id: 'APP-2024-003',
      type: 'Dealer Registration',
      status: 'Approved',
      submitDate: '2024-03-10',
      approvalDate: '2024-03-15'
    }
  ]

  const resetForm = () => {
    setFormData({
      licenseNumber: 'SIL-2024-001',
      companyName: 'Kasavuli Sugar Imports Ltd',
      date: '',
      startDate: '',
      endDate: '',
      narrative: '',
      importVolume: '',
      sourceCountry: '',
      sugarType: ''
    })
    setApplicationType('')
    setIsSubmitted(false)
  }

  // Add icon components to applications data
  const appData = applicationsData.map(app => ({
    ...app,
    icon: app.icon === "FileText" ? FileText : 
          app.icon === "ClipboardList" ? ClipboardList : 
          app.icon === "Package" ? Package : FileText
  }))
  
  useEffect(() => {
    if (!open) {
      resetForm()
      setSelectedApplication(null)
    } else if (selectedApplicationId) {
      const application = appData.find(app => app.id === selectedApplicationId)
      if (application) {
        setSelectedApplication(application)
        setActiveTab('status')
      }
    }
  }, [open, selectedApplicationId])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setActiveTab('status')
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800'
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800'
      case 'Pending':
        return 'bg-blue-100 text-blue-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStatusTab = () => {
    if (selectedApplication) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => setSelectedApplication(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Applications
            </Button>
            
            <Badge className={getStatusColor(selectedApplication.status)}>
              {selectedApplication.status}
            </Badge>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{selectedApplication.title}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-blue-700">
              <span>ID: {selectedApplication.id}</span>
              <span className="hidden sm:inline">•</span>
              <span>Type: {selectedApplication.type}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Application Details</h4>
              <div className="bg-white border rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Applicant:</span>
                  <span className="font-medium">{selectedApplication.applicant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Company:</span>
                  <span className="font-medium">{selectedApplication.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Submission Date:</span>
                  <span className="font-medium">{selectedApplication.submitDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Stage:</span>
                  <span className="font-medium">{selectedApplication.stage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{selectedApplication.quantity}</span>
                </div>
                
                {selectedApplication.completionDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completion Date:</span>
                    <span className="font-medium">{selectedApplication.completionDate}</span>
                  </div>
                )}
                
                {selectedApplication.expectedCompletion && !selectedApplication.completionDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Completion:</span>
                    <span className="font-medium">{selectedApplication.expectedCompletion}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Additional Information</h4>
              <div className="bg-white border rounded-lg p-4">
                <h5 className="font-medium mb-2">Notes</h5>
                <p className="text-gray-700">{selectedApplication.notes}</p>
              </div>
              
              <div className="bg-white border rounded-lg p-4">
                <h5 className="font-medium mb-2">Documents</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span>Application Form {selectedApplication.id}.pdf</span>
                  </div>
                  {selectedApplication.status === "Under Review" && (
                    <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span>Supporting Documents.pdf</span>
                    </div>
                  )}
                  {selectedApplication.status === "Payment Required" && (
                    <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span>Payment Invoice.pdf</span>
                    </div>
                  )}
                  {selectedApplication.status === "Approved" && (
                    <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span>Approval Certificate.pdf</span>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedApplication.status === "Payment Required" && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Payment Required</p>
                      <p className="text-sm text-yellow-700">
                        Please complete the payment to finalize your application process.
                      </p>
                    </div>
                  </div>
                  <Button className="mt-3 bg-yellow-600 hover:bg-yellow-700">
                    Make Payment
                  </Button>
                </div>
              )}
              
              {selectedApplication.status === "Under Review" && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">Under Review</p>
                      <p className="text-sm text-blue-700">
                        Your application is being reviewed. You will be notified once the review is complete.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Application Progress Tracking */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Application Progress Tracker
            </h4>
            
            {/* Progress Timeline */}
            <div className="relative bg-white border rounded-lg p-6">
              {/* Progress Line */}
              <div className="absolute top-12 left-8 right-8 h-0.5 bg-gray-200"></div>
              
              {/* Stages */}
              <div className="relative flex justify-between">
                {applicationStages.map((stage, index) => {
                  // Mock stage status based on application status
                  const getStageStatus = (stageId: string) => {
                    const stageOrder = ["registration", "compliance", "committee", "dg", "payment", "registration_letter"]
                    const currentStage = selectedApplication.stage?.toLowerCase() || "registration"
                    const currentIndex = stageOrder.indexOf(currentStage)
                    const stageIndex = stageOrder.indexOf(stageId)
                    
                    if (selectedApplication.status === "Approved") {
                      return "completed"
                    } else if (stageIndex < currentIndex) {
                      return "completed"
                    } else if (stageIndex === currentIndex) {
                      return "current"
                    } else {
                      return "pending"
                    }
                  }
                  
                  const status = getStageStatus(stage.id)
                  
                  return (
                    <div key={stage.id} className="flex flex-col items-center text-center w-1/6">
                      <div className={`z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        status === "completed" ? "bg-green-500 border-green-500" :
                        status === "current" ? "bg-blue-500 border-blue-500" :
                        "bg-white border-gray-300"
                      }`}>
                        {status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        ) : status === "current" ? (
                          <Circle className="h-5 w-5 text-white fill-current" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-300" />
                        )}
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className={`text-xs font-medium ${
                          status === "completed" ? "text-green-700" :
                          status === "current" ? "text-blue-700" :
                          "text-gray-500"
                        }`}>
                          {stage.name}
                        </p>
                        <p className="text-xs text-gray-500 hidden md:block">{stage.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Status</h3>
      <div className="space-y-3">
        {appData.map((app) => (
          <div key={app.id} className="p-4 border rounded-lg space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{app.type}</h4>
                <p className="text-sm text-gray-600">ID: {app.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(app.status)}>
                  {app.status}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedApplication(app)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Submit Date:</span>
                <p className="font-medium">{new Date(app.submitDate).toLocaleDateString()}</p>
              </div>
              {app.completionDate && (
                <div>
                  <span className="text-gray-600">Completion Date:</span>
                  <p className="font-medium">{new Date(app.completionDate).toLocaleDateString()}</p>
                </div>
              )}
              {app.quantity && (
                <div>
                  <span className="text-gray-600">Quantity:</span>
                  <p className="font-medium">{app.quantity}</p>
                </div>
              )}
              {app.company && (
                <div>
                  <span className="text-gray-600">Company:</span>
                  <p className="font-medium">{app.company}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  }

  const renderApplicationForm = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5" />
        <h3 className="text-lg font-semibold">
          New {applicationTypes[activeTab as keyof typeof applicationTypes]}
        </h3>
      </div>

      {isSubmitted ? (
        <div className="text-center py-8 space-y-4">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
          <h4 className="text-lg font-semibold">Application Submitted!</h4>
          <p className="text-gray-600">Your application has been submitted successfully. You will receive updates on its status.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                disabled
              />
            </div>
          </div>

          {activeTab === 'import' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="importVolume">Import Volume (MT)</Label>
                  <Input
                    id="importVolume"
                    type="number"
                    value={formData.importVolume}
                    onChange={(e) => handleInputChange('importVolume', e.target.value)}
                    placeholder="Enter volume in metric tons"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sugarType">Sugar Type</Label>
                  <Select value={formData.sugarType} onValueChange={(value) => handleInputChange('sugarType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sugar type" />
                    </SelectTrigger>
                    <SelectContent>
                      {sugarTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sourceCountry">Source Country</Label>
                  <Select value={formData.sourceCountry} onValueChange={(value) => handleInputChange('sourceCountry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source country" />
                    </SelectTrigger>
                    <SelectContent>
                      {sourceCountries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="startDate">Expected Import Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'renewal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Renewal Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">Renewal End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="narrative">Application Details</Label>
            <Textarea
              id="narrative"
              value={formData.narrative}
              onChange={(e) => handleInputChange('narrative', e.target.value)}
              placeholder="Provide additional details for your application..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4 mr-2" />
              Submit Application
            </Button>
          </div>
        </form>
      )}
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Applications
          </DialogTitle>
          <DialogDescription>
            Submit new applications and track their status
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 border-b">
            <button
              onClick={() => setActiveTab('status')}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'status'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Status
              </div>
            </button>
            <button
              onClick={() => setActiveTab('registration')}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'registration'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Dealer Registration
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'import'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Import Letter of Intent
            </button>
            <button
              onClick={() => setActiveTab('renewal')}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'renewal'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              License
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'status' ? renderStatusTab() : renderApplicationForm()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
