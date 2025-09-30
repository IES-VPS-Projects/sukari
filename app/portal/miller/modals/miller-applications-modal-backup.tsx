"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Send, CheckCircle, ArrowLeft, ChevronRight, Factory, Ship, ExternalLink, Store, Droplet, Clock, AlertCircle, ClipboardList, CheckCircle2, Circle, Eye, Upload, Plus, Trash2, ChevronDown, X } from "lucide-react"
import { CollapsibleSection } from "@/components/ui/collapsible-section"

// Application stages for tracking miller applications
const applicationStages = [
  { 
    id: "submission", 
    name: "Application Submission", 
    description: "Miller submits application with required documents" 
  },
  { 
    id: "review", 
    name: "Initial Review", 
    description: "KSB reviews application for completeness" 
  },
  { 
    id: "inspection", 
    name: "Site Inspection", 
    description: "Field inspection of miller facilities" 
  },
  { 
    id: "evaluation", 
    name: "Technical Evaluation", 
    description: "Technical committee evaluates application" 
  },
  { 
    id: "approval", 
    name: "Board Approval", 
    description: "KSB board reviews and approves application" 
  },
  { 
    id: "issuance", 
    name: "Document Issuance", 
    description: "License or permit document issued" 
  }
]

interface ApplicationField {
  name: string
  label: string
  type: string
  options?: string[]
  required: boolean
}

interface ApplicationType {
  id: string
  name: string
  description: string
  fields: ApplicationField[]
}

interface MillerApplicationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SubmittedApplication {
  id: string
  type: string
  title: string
  purpose: string
  status: string
  stage: string
  applicant: string
  company: string
  submitDate: string
  completionDate: string | null
  expectedCompletion: string
  quantity: string
  notes: string
  submittedDate: string
  approvedDate: string | null
  validUntil: string | null
}

export function MillerApplicationsModal({ open, onOpenChange }: MillerApplicationsModalProps) {
  const [activeTab, setActiveTab] = useState<'status' | 'miller' | 'importer' | 'exporter' | 'sugarDealer' | 'molassesDealer'>('status')
  const [selectedStakeholder, setSelectedStakeholder] = useState<string>('')
  const [expandedApplication, setExpandedApplication] = useState<string>('')
  const [applicationType, setApplicationType] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedTab, setSelectedTab] = useState<string>('companyDocs')
  const [isDraftSaved, setIsDraftSaved] = useState(false)
  const [submittedApplications, setSubmittedApplications] = useState<any[]>([])
  const [financingCurrency, setFinancingCurrency] = useState<string>('USD')
  const [investmentCurrency, setInvestmentCurrency] = useState<string>('USD')
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({})
  const [directors, setDirectors] = useState<Array<{id: number, expanded: boolean}>>([{id: 1, expanded: false}])
  const [formData, setFormData] = useState({
    // Basic fields
    millerLicenseNumber: 'SML-2024-003',
    companyName: 'Mumias Sugar Mills Ltd',
    date: '',
    startDate: '',
    endDate: '',
    narrative: '',
    productionCapacity: '',
    facilityLocation: '',
    equipmentDetails: '',
    applicationType: '',
    letterPurpose: '',
    permitType: '',
    licenseType: '',
    bankName: '',
    loanAmount: '',
    importVolume: '',
    sourceCountry: '',
    sugarType: '',
    importDate: '',
    businessLocation: '',
    storageCapacity: '',
    importPeriod: '',
    marketingPlan: '',
    exportVolume: '',
    destinationCountry: '',
    exportDate: '',
    exportCapacity: '',
    dealingCapacity: '',
    
    // Letter of Comfort specific fields
    category: '',
    documentNo: '',
    documentDate: '',
    licenseExpiryDate: '',
    
    // Company Info fields (auto-populated)
    lrNumber: 'LR/12345/2020',
    postalAddress: 'P.O. Box 12345',
    postalCode: '50100',
    companyRegNumber: 'C.123456',
    pinNumber: 'P051234567A',
    phoneNumber: '+254 700 333 456',
    emailAddress: 'info@mumiasmills.co.ke',
    county: 'Kakamega',
    subcounty: 'Mumias East',
    ward: 'Mumias Central',
    location: 'Mumias Township',
    buildingName: 'Mumias Sugar Complex',
    streetName: 'Factory Road',
    town: 'Mumias',
    establishmentDate: '1973-01-15',
    legalStatus: 'Public Limited Company',
    
    // Projected Capacity
    capacityTCD: '',

    // Investment Financing Plan
    foreignEquity: '',
    localEquity: '',
    foreignLoan: '',
    localLoan: '',

    // Project Objectives
    projectObjectives: '',

    // Investment Breakdown
    preExpenses: '',
    landBuildings: '',
    plantEquipment: '',
    vehicles: '',
    furnitureFittings: '',
    workingCapital: '',
    others: '',
    total: '',
    
    // Declaration checkboxes
    declarationA: 'false',
    declarationB: 'false',
    declarationC: 'false',
    agreeTerms: 'false'
  })

  const letterPurposes = [
    'Bank Loan Application',
    'Equipment Financing',
    'Working Capital',
    'Infrastructure Development',
    'Export Documentation',
    'Partnership Agreement',
    'Investment Proposal'
  ]

  const permitTypes = [
    'Air Emission Permit',
    'Water Abstraction Permit'
  ]

  const licenseTypes = [
    'Sugar Manufacturing License',
    'Food Processing License',
    'Industrial License',
    'Export License',
    'Warehouse License',
    'Quality Assurance License'
  ]

  // Stakeholder applications structure based on Kenya Sugar Board processes
  const stakeholderApplications: Record<string, ApplicationType[]> = {
    'Sugar Miller': [
      {
        id: 'letter-of-comfort',
        name: 'Application for Registration',
        description: 'Apply to register a Mill or Jaggery operation',
        fields: [] // Will be handled with custom form
      },
      {
        id: 'license',
        name: 'License Application',
        description: 'Apply for or renew sugar manufacturing and related licenses',
        fields: [
          { name: 'licenseType', label: 'License Type', type: 'select', options: licenseTypes, required: true },
          { name: 'facilityLocation', label: 'Facility Location', type: 'text', required: true },
          { name: 'productionCapacity', label: 'Production Capacity (MT/Year)', type: 'number', required: true },
          { name: 'startDate', label: 'Requested Start Date', type: 'date', required: true },
          { name: 'endDate', label: 'Requested End Date', type: 'date', required: true },
          { name: 'narrative', label: 'Additional Information', type: 'textarea', required: true }
        ]
      }
    ],
    'Sugar Importer': [
      {
        id: 'permit',
        name: 'Import Permit',
        description: 'Apply for permit to import sugar into Kenya',
        fields: [
          { name: 'importVolume', label: 'Import Volume (MT)', type: 'number', required: true },
          { name: 'sourceCountry', label: 'Source Country', type: 'text', required: true },
          { name: 'sugarType', label: 'Sugar Type', type: 'text', required: true },
          { name: 'importDate', label: 'Expected Import Date', type: 'date', required: true },
          { name: 'narrative', label: 'Purpose and Details', type: 'textarea', required: true }
        ]
      },
      {
        id: 'license',
        name: 'Import License',
        description: 'Apply for or renew sugar import license',
        fields: [
          { name: 'businessLocation', label: 'Business Location', type: 'text', required: true },
          { name: 'storageCapacity', label: 'Storage Capacity (MT)', type: 'number', required: true },
          { name: 'startDate', label: 'License Start Date', type: 'date', required: true },
          { name: 'endDate', label: 'License End Date', type: 'date', required: true },
          { name: 'narrative', label: 'Business Plan and Details', type: 'textarea', required: true }
        ]
      },
      {
        id: 'letter-of-intent',
        name: 'Letter of Intent',
        description: 'Submit letter of intent for sugar import',
        fields: [
          { name: 'importVolume', label: 'Intended Import Volume (MT)', type: 'number', required: true },
          { name: 'importPeriod', label: 'Import Period', type: 'text', required: true },
          { name: 'marketingPlan', label: 'Marketing Plan', type: 'textarea', required: true },
          { name: 'narrative', label: 'Additional Information', type: 'textarea', required: true }
        ]
      }
    ],
    'Sugar Exporter': [
      {
        id: 'permit',
        name: 'Export Permit',
        description: 'Apply for permit to export sugar from Kenya',
        fields: [
          { name: 'exportVolume', label: 'Export Volume (MT)', type: 'number', required: true },
          { name: 'destinationCountry', label: 'Destination Country', type: 'text', required: true },
          { name: 'sugarType', label: 'Sugar Type', type: 'text', required: true },
          { name: 'exportDate', label: 'Expected Export Date', type: 'date', required: true },
          { name: 'narrative', label: 'Export Details', type: 'textarea', required: true }
        ]
      },
      {
        id: 'license',
        name: 'Export License',
        description: 'Apply for or renew sugar export license',
        fields: [
          { name: 'businessLocation', label: 'Business Location', type: 'text', required: true },
          { name: 'exportCapacity', label: 'Export Capacity (MT/Year)', type: 'number', required: true },
          { name: 'startDate', label: 'License Start Date', type: 'date', required: true },
          { name: 'endDate', label: 'License End Date', type: 'date', required: true },
          { name: 'narrative', label: 'Business Plan and Details', type: 'textarea', required: true }
        ]
      }
    ],
    'Sugar Dealer': [
      {
        id: 'license',
        name: 'Dealer License',
        description: 'Apply for or renew sugar dealer license',
        fields: [
          { name: 'businessLocation', label: 'Business Location', type: 'text', required: true },
          { name: 'dealingCapacity', label: 'Dealing Capacity (MT/Month)', type: 'number', required: true },
          { name: 'storageCapacity', label: 'Storage Capacity (MT)', type: 'number', required: true },
          { name: 'startDate', label: 'License Start Date', type: 'date', required: true },
          { name: 'endDate', label: 'License End Date', type: 'date', required: true },
          { name: 'narrative', label: 'Business Details', type: 'textarea', required: true }
        ]
      }
    ],
    'Molasses Dealer': [
      {
        id: 'license',
        name: 'Molasses Dealer License',
        description: 'Apply for or renew molasses dealer license',
        fields: [
          { name: 'businessLocation', label: 'Business Location', type: 'text', required: true },
          { name: 'dealingCapacity', label: 'Dealing Capacity (MT/Month)', type: 'number', required: true },
          { name: 'storageCapacity', label: 'Storage Capacity (MT)', type: 'number', required: true },
          { name: 'startDate', label: 'License Start Date', type: 'date', required: true },
          { name: 'endDate', label: 'License End Date', type: 'date', required: true },
          { name: 'narrative', label: 'Business Details and Molasses Handling Plan', type: 'textarea', required: true }
        ]
      }
    ]
  }

  // Mock existing applications data
  const existingApplications = [
    {
      id: 'APP-2024-001',
      type: 'Application for Registration',
      title: 'Application for Registration',
      purpose: 'Bank Loan Application',
      status: 'Approved',
      stage: 'Issuance',
      applicant: 'James Mwangi',
      company: 'Mumias Sugar Mills Ltd',
      submitDate: '2024-08-15',
      completionDate: '2024-08-28',
      expectedCompletion: null,
      quantity: 'N/A',
      notes: 'Registration application approved. All requirements met and documentation complete.',
      submittedDate: '2024-08-15',
      approvedDate: '2024-08-28',
      validUntil: '2025-08-28'
    },
    {
      id: 'APP-2024-003',
      type: 'License Renewal',
      title: 'Sugar Manufacturing License Renewal',
      purpose: 'Sugar Manufacturing License',
      status: 'Under Review',
      stage: 'Evaluation',
      applicant: 'James Mwangi',
      company: 'Mumias Sugar Mills Ltd',
      submitDate: '2024-09-05',
      completionDate: null,
      expectedCompletion: '2024-09-30',
      quantity: '50,000 MT/Year',
      notes: 'Technical evaluation in progress. Production capacity assessment being conducted.',
      submittedDate: '2024-09-05',
      approvedDate: null,
      validUntil: null
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setUploadedFiles(prev => ({ ...prev, [field]: file }))
  }

  const handleFileDelete = (field: string) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev }
      delete newFiles[field]
      return newFiles
    })
  }

  const addDirector = () => {
    const newDirectorId = Math.max(...directors.map(d => d.id)) + 1
    setDirectors(prev => [...prev, {id: newDirectorId, expanded: false}])
  }

  const removeDirector = (directorId: number) => {
    if (directors.length > 1) {
      setDirectors(prev => prev.filter(d => d.id !== directorId))
      // Remove uploaded files for this director
      const fieldsToRemove = [`director${directorId}Id`, `director${directorId}Pin`, `director${directorId}Conduct`]
      setUploadedFiles(prev => {
        const newFiles = { ...prev }
        fieldsToRemove.forEach(field => delete newFiles[field])
        return newFiles
      })
    }
  }

  const toggleDirectorExpansion = (directorId: number) => {
    setDirectors(prev => prev.map(d =>
      d.id === directorId ? {...d, expanded: !d.expanded} : d
    ))
  }

  const resetForm = () => {
    setFormData(prev => ({
      ...prev,
      date: '',
      startDate: '',
      endDate: '',
      narrative: '',
      productionCapacity: '',
      facilityLocation: '',
      applicationType: '',
      letterPurpose: '',
      permitType: '',
      licenseType: '',
      category: '',
      documentNo: '',
      documentDate: '',
      licenseExpiryDate: '',
      capacityTCD: '',

      // Investment Financing Plan
      foreignEquity: '',
      localEquity: '',
      foreignLoan: '',
      localLoan: '',

      // Project Objectives
      projectObjectives: '',

      // Investment Breakdown
      preExpenses: '',
      landBuildings: '',
      plantEquipment: '',
      vehicles: '',
      furnitureFittings: '',
      workingCapital: '',
      others: '',
      total: '',

      declarationA: 'false',
      declarationB: 'false',
      declarationC: 'false',
      agreeTerms: 'false'
    }))
    setApplicationType('')
    setSelectedApplication(null)
    setSelectedStakeholder('')
    setExpandedApplication('')
    setSelectedCategory('')
    setIsDraftSaved(false)
    setFinancingCurrency('USD')
    setInvestmentCurrency('USD')
    setUploadedFiles({})
    setDirectors([{id: 1, expanded: false}])
  }

  // Auto-generate document details when category is selected
  const generateDocumentDetails = (category: string) => {
    const today = new Date()
    const documentNo = `LOC/${category.toUpperCase()}/${today.getFullYear()}/${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
    const documentDate = today.toISOString().split('T')[0]
    const licenseExpiryDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()).toISOString().split('T')[0]
    
    setFormData(prev => ({
      ...prev,
      category,
      documentNo,
      documentDate,
      licenseExpiryDate
    }))
  }

  useEffect(() => {
    if (!open) {
      resetForm()
    }
  }, [open])

  // Auto-calculate total for Investment Breakdown
  useEffect(() => {
    const preExpenses = parseFloat(formData.preExpenses) || 0
    const landBuildings = parseFloat(formData.landBuildings) || 0
    const plantEquipment = parseFloat(formData.plantEquipment) || 0
    const vehicles = parseFloat(formData.vehicles) || 0
    const furnitureFittings = parseFloat(formData.furnitureFittings) || 0
    const workingCapital = parseFloat(formData.workingCapital) || 0
    const others = parseFloat(formData.others) || 0

    const total = preExpenses + landBuildings + plantEquipment + vehicles + furnitureFittings + workingCapital + others

    setFormData(prev => ({ ...prev, total: total.toString() }))
  }, [formData.preExpenses, formData.landBuildings, formData.plantEquipment, formData.vehicles, formData.furnitureFittings, formData.workingCapital, formData.others])

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
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'in-review':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'in-review':
        return <AlertCircle className="h-4 w-4 text-blue-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create new application entry
    const newApplication = {
      id: `APP-2024-${String(Date.now()).slice(-3).padStart(3, '0')}`,
      type: expandedApplication === 'letter-of-comfort' ? 'Application for Registration' : 'General Application',
      title: expandedApplication === 'letter-of-comfort' ? `Application for Registration - ${formData.category}` : 'Application',
      purpose: expandedApplication === 'letter-of-comfort' ? 'Application for Registration' : 'General Purpose',
      status: 'Under Review',
      stage: 'submission',
      applicant: formData.companyName,
      company: formData.companyName,
      submitDate: new Date().toISOString().split('T')[0],
      completionDate: null,
      expectedCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      quantity: expandedApplication === 'letter-of-comfort' ? formData.capacityTCD + ' TCD' : 'N/A',
      notes: expandedApplication === 'letter-of-comfort' ? `Registration application for ${formData.category} submitted. All required documentation provided.` : 'Application submitted for review.',
      submittedDate: new Date().toISOString().split('T')[0],
      approvedDate: null,
      validUntil: null
    }
    
    // Add to submitted applications
    setSubmittedApplications(prev => [newApplication, ...prev])
    
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      resetForm()
      setExpandedApplication('')
    }, 2000)
  }

  const handleSaveDraft = () => {
    // Save current form data as draft (in a real app, this would save to localStorage or backend)
    setIsDraftSaved(true)
    setTimeout(() => {
      setIsDraftSaved(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh]">
        <DialogHeader className="bg-gray-50 -m-6 mb-0 p-6 rounded-t-lg">
          <DialogTitle className="text-2xl font-bold">Applications</DialogTitle>
          <DialogDescription>
            Apply for Registration and License Applications & Renewals
          </DialogDescription>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex space-x-1 border-b border-gray-200 mb-6">
          {[
            { id: 'status', label: 'Status', icon: FileText },
            { id: 'miller', label: 'Miller', icon: Factory },
            { id: 'importer', label: 'Importer', icon: Ship },
            { id: 'exporter', label: 'Exporter', icon: ExternalLink },
            { id: 'sugarDealer', label: 'Sugar Dealer', icon: Store },
            { id: 'molassesDealer', label: 'Molasses Dealer', icon: Droplet }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === id
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Status Tab */}
        {activeTab === 'status' && (
          <div className="min-h-[575px] max-h-[575px] overflow-y-auto">
            {selectedApplication ? (
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
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">{selectedApplication.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-green-700">
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
                        {selectedApplication.status === "Approved" && (
                          <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                            <FileText className="h-4 w-4 text-green-600" />
                            <span>Approval Certificate.pdf</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
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
                          const stageOrder = ["submission", "review", "inspection", "evaluation", "approval", "issuance"]
                          const currentStage = selectedApplication.stage?.toLowerCase() || "submission"
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
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Status</h3>
                <div className="space-y-3">
                  {[...submittedApplications, ...existingApplications].map((app) => (
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
                          <p className="font-medium">{app.submitDate ? new Date(app.submitDate).toLocaleDateString() : 'N/A'}</p>
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
            )}
          </div>
        )}

        {/* Miller Tab */}
        {activeTab === 'miller' && (
          <div className="min-h-[575px] max-h-[575px] overflow-y-auto">
            <div className="space-y-4">
              {stakeholderApplications['Sugar Miller']?.map((application) => (
                <div key={application.id} className="border rounded-lg">
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedApplication(expandedApplication === application.id ? '' : application.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{application.name}</h4>
                        <p className="text-sm text-gray-600">{application.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            expandedApplication === application.id ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {expandedApplication === application.id && (
                    <div className="border-t p-4 bg-gray-50">
                      {application.id === 'letter-of-comfort' ? (
                        // Custom Form for Application for Registration
                        <form onSubmit={handleSubmit} className="space-y-6">
                          {/* Application Type */}
                          <div>
                            <Label htmlFor="category" className="text-lg font-semibold">Choose Category <span className="text-red-500">*</span></Label>
                            <Select 
                              value={formData.category} 
                              onValueChange={(value) => generateDocumentDetails(value)}
                            >
                              <SelectTrigger className="mt-3">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Mill">Mill</SelectItem>
                                <SelectItem value="Jaggery">Jaggery</SelectItem>
                              </SelectContent>
                            </Select>
                            </div>
                          {formData.category ? (
                            <>
                              {application.id === 'letter-of-comfort' && (<>
                              {/* Document Details - Auto-generated */}
                              <CollapsibleSection title="Document Details">
                                <div className="grid gap-4 sm:grid-cols-2">
                                  <div>
                                    <Label htmlFor="documentNo">Document No</Label>
                                    <Input
                                      value={formData.licenseExpiryDate}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                </div>
                              </CollapsibleSection>

                              {/* Company Info */}
                              <CollapsibleSection title="Company Info">
                                <div className="grid gap-4 sm:grid-cols-2">
                                  <div>
{/* Company info fields will go here */}
                                    <Label htmlFor="lrNumber">L.R No/Plot No</Label>
                                    <Input
                                      id="lrNumber"
                                      value={formData.lrNumber}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="postalAddress">Postal Address</Label>
                                    <Input
                                      id="postalAddress"
                                      value={formData.postalAddress}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="postalCode">Postal Code</Label>
                                    <Input
                                      id="postalCode"
                                      value={formData.postalCode}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="companyRegNumber">Company Registration Number</Label>
                                    <Input
                                      id="companyRegNumber"
                                      value={formData.companyRegNumber}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="pinNumber">Pin Number</Label>
                                    <Input
                                      id="pinNumber"
                                      value={formData.pinNumber}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input
                                      id="phoneNumber"
                                      value={formData.phoneNumber}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="emailAddress">Email Address</Label>
                                    <Input
                                      id="emailAddress"
                                      value={formData.emailAddress}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="county">County</Label>
                                    <Input
                                      id="county"
                                      value={formData.county}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="subcounty">Subcounty</Label>
                                    <Input
                                      id="subcounty"
                                      value={formData.subcounty}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="ward">Ward</Label>
                                    <Input
                                      id="ward"
                                      value={formData.ward}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                      id="location"
                                      value={formData.location}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="buildingName">Building Name</Label>
                                    <Input
                                      id="buildingName"
                                      value={formData.buildingName}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="streetName">Street Name</Label>
                                    <Input
                                      id="streetName"
                                      value={formData.streetName}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="town">Town</Label>
                                    <Input
                                      id="town"
                                      value={formData.town}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="establishmentDate">Establishment Date</Label>
                                    <Input
                                      id="establishmentDate"
                                      value={formData.establishmentDate}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="legalStatus">Legal Status</Label>
                                    <Input
                                      id="legalStatus"
                                      value={formData.legalStatus}
                                      disabled
                                      className="bg-gray-100"
                                    />
                                  </div>
                                </div>
                              </CollapsibleSection>

                              {/* Investment Financing Plan */}
                              <CollapsibleSection title="Investment Financing Plan">
                                <div className="mb-4">
                                  <Label htmlFor="financingCurrency">Currency</Label>
                                  <Select value={financingCurrency} onValueChange={setFinancingCurrency}>
                                    <SelectTrigger className="mt-2">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="USD">US$ (USD)</SelectItem>
                                      <SelectItem value="KES">Kshs (KES)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                  <div>
                                    <Label htmlFor="foreignEquity">Foreign Equity</Label>
                                    <Input
                                      id="foreignEquity"
                                      type="number"
                                      value={formData.foreignEquity}
                                      onChange={(e) => handleInputChange('foreignEquity', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="localEquity">Local Equity</Label>
                                    <Input
                                      id="localEquity"
                                      type="number"
                                      value={formData.localEquity}
                                      onChange={(e) => handleInputChange('localEquity', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="foreignLoan">Foreign Loan</Label>
                                    <Input
                                      id="foreignLoan"
                                      type="number"
                                      value={formData.foreignLoan}
                                      onChange={(e) => handleInputChange('foreignLoan', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="localLoan">Local Loan</Label>
                                    <Input
                                      id="localLoan"
                                      type="number"
                                      value={formData.localLoan}
                                      onChange={(e) => handleInputChange('localLoan', e.target.value)}
                                    />
                                  </div>
                                </div>
                              </CollapsibleSection>

                              {/* Project Objectives */}
                              <CollapsibleSection title="Project Objectives">
                                <Textarea
                                  id="projectObjectives"
                                  value={formData.projectObjectives}
                                  onChange={(e) => handleInputChange('projectObjectives', e.target.value)}
                                  placeholder="Describe the objectives of the project..."
                                />
                              </CollapsibleSection>

                              {/* Projected Capacity */}
                                <CollapsibleSection title="Projected Capacity (TCD)">
                                  <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                      <Input
                                        id="capacityTCD"
                                        type="number"
                                        placeholder="Enter capacity in Tonnes Crushed per Day"
                                        value={formData.capacityTCD}
                                        onChange={(e) => handleInputChange('capacityTCD', e.target.value)}
                                        required
                                      />
                                    </div>
                                  </div>
                                </CollapsibleSection>

                              {/* Investment Breakdown */}
                              <CollapsibleSection title="Investment Breakdown">
                                <div className="mb-4">
                                  <Label htmlFor="investmentCurrency">Currency</Label>
                                  <Select value={investmentCurrency} onValueChange={setInvestmentCurrency}>
                                    <SelectTrigger className="mt-2">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="USD">US$ (USD)</SelectItem>
                                      <SelectItem value="KES">Kshs (KES)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                  <div>
                                    <Label htmlFor="preExpenses">Pre-expenses</Label>
                                    <Input
                                      id="preExpenses"
                                      type="number"
                                      value={formData.preExpenses}
                                      onChange={(e) => handleInputChange('preExpenses', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="landBuildings">Land/Buildings</Label>
                                    <Input
                                      id="landBuildings"
                                      type="number"
                                      value={formData.landBuildings}
                                      onChange={(e) => handleInputChange('landBuildings', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="plantEquipment">Plant and equipment</Label>
                                    <Input
                                      id="plantEquipment"
                                      type="number"
                                      value={formData.plantEquipment}
                                      onChange={(e) => handleInputChange('plantEquipment', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="vehicles">Vehicles</Label>
                                    <Input
                                      id="vehicles"
                                      type="number"
                                      value={formData.vehicles}
                                      onChange={(e) => handleInputChange('vehicles', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="furnitureFittings">Furniture & Fittings</Label>
                                    <Input
                                      id="furnitureFittings"
                                      type="number"
                                      value={formData.furnitureFittings}
                                      onChange={(e) => handleInputChange('furnitureFittings', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="workingCapital">Working Capital</Label>
                                    <Input
                                      id="workingCapital"
                                      type="number"
                                      value={formData.workingCapital}
                                      onChange={(e) => handleInputChange('workingCapital', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="others">Others</Label>
                                    <Input
                                      id="others"
                                      type="number"
                                      value={formData.others}
                                      onChange={(e) => handleInputChange('others', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="total">TOTAL</Label>
                                    <Input
                                      id="total"
                                      type="number"
                                      value={formData.total}
                                      readOnly
                                      className="bg-gray-100 font-semibold"
                                    />
                                  </div>
                                </div>
                              </CollapsibleSection>

                              {/* Documents Uploads */}
                              <div>
                                <h3 className="text-lg font-semibold mb-4">Documents Uploads</h3>
                                <div className="flex space-x-2 border-b border-gray-200 mb-4">
                                  {[
                                    { id: 'companyDocs', label: 'Company' },
                                    { id: 'directorDocs', label: 'Board of Directors' },
                                  ].map((tab) => (
                                    <button
                                      key={tab.id}
                                      type="button"
                                      onClick={() => setSelectedTab(tab.id)}
                                      className={`px-3 py-2 text-sm font-medium ${selectedTab === tab.id ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                      {tab.label}
                                    </button>
                                  ))}
                                </div>

                                {selectedTab === 'companyDocs' && (
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Recommendation from the respective County Government</Label>
                                      {uploadedFiles['countyRecommendation'] ? (
                                        <div className="flex items-center justify-between gap-2 p-2 border rounded bg-gray-50">
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm">{uploadedFiles['countyRecommendation']?.name}</span>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleFileDelete('countyRecommendation')}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-2">
                                          <label htmlFor="countyRecommendation" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                            <Upload className="h-3 w-3" />
                                            Upload
                                          </label>
                                          <input
                                            id="countyRecommendation"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileUpload('countyRecommendation', e.target.files?.[0] || null)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <Label>Sugar Crop Development Plan</Label>
                                      {uploadedFiles['cropDevelopmentPlan'] ? (
                                        <div className="flex items-center justify-between gap-2 p-2 border rounded bg-gray-50">
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm">{uploadedFiles['cropDevelopmentPlan']?.name}</span>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleFileDelete('cropDevelopmentPlan')}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-2">
                                          <label htmlFor="cropDevelopmentPlan" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                            <Upload className="h-3 w-3" />
                                            Upload
                                          </label>
                                          <input
                                            id="cropDevelopmentPlan"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileUpload('cropDevelopmentPlan', e.target.files?.[0] || null)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <Label>Feasibility Study Report</Label>
                                      {uploadedFiles['feasibilityStudy'] ? (
                                        <div className="flex items-center justify-between gap-2 p-2 border rounded bg-gray-50">
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm">{uploadedFiles['feasibilityStudy']?.name}</span>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleFileDelete('feasibilityStudy')}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-2">
                                          <label htmlFor="feasibilityStudy" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                            <Upload className="h-3 w-3" />
                                            Upload
                                          </label>
                                          <input
                                            id="feasibilityStudy"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileUpload('feasibilityStudy', e.target.files?.[0] || null)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <Label>Financial Reports</Label>
                                      {uploadedFiles['financialReports'] ? (
                                        <div className="flex items-center justify-between gap-2 p-2 border rounded bg-gray-50">
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm">{uploadedFiles['financialReports']?.name}</span>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleFileDelete('financialReports')}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-2">
                                          <label htmlFor="financialReports" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                            <Upload className="h-3 w-3" />
                                            Upload
                                          </label>
                                          <input
                                            id="financialReports"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileUpload('financialReports', e.target.files?.[0] || null)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <Label>Mill Design and Technology</Label>
                                      {uploadedFiles['millDesign'] ? (
                                        <div className="flex items-center justify-between gap-2 p-2 border rounded bg-gray-50">
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm">{uploadedFiles['millDesign']?.name}</span>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleFileDelete('millDesign')}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-2">
                                          <label htmlFor="millDesign" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                            <Upload className="h-3 w-3" />
                                            Upload
                                          </label>
                                          <input
                                            id="millDesign"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileUpload('millDesign', e.target.files?.[0] || null)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <Label>Milling Capacity</Label>
                                      {uploadedFiles['millingCapacity'] ? (
                                        <div className="flex items-center justify-between gap-2 p-2 border rounded bg-gray-50">
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm">{uploadedFiles['millingCapacity']?.name}</span>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleFileDelete('millingCapacity')}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-2">
                                          <label htmlFor="millingCapacity" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                            <Upload className="h-3 w-3" />
                                            Upload
                                          </label>
                                          <input
                                            id="millingCapacity"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileUpload('millingCapacity', e.target.files?.[0] || null)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <Label>Certificate of Incorporation/Registration</Label>
                                      {uploadedFiles['incorporationCertificate'] ? (
                                        <div className="flex items-center justify-between gap-2 p-2 border rounded bg-gray-50">
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm">{uploadedFiles['incorporationCertificate']?.name}</span>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleFileDelete('incorporationCertificate')}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-2">
                                          <label htmlFor="incorporationCertificate" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                            <Upload className="h-3 w-3" />
                                            Upload
                                          </label>
                                          <input
                                            id="incorporationCertificate"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileUpload('incorporationCertificate', e.target.files?.[0] || null)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <Label>Details of ownership including title deed, lease agreement etc</Label>
                                      {uploadedFiles['ownershipDetails'] ? (
                                        <div className="flex items-center justify-between gap-2 p-2 border rounded bg-gray-50">
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm">{uploadedFiles['ownershipDetails']?.name}</span>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleFileDelete('ownershipDetails')}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-2">
                                          <label htmlFor="ownershipDetails" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                            <Upload className="h-3 w-3" />
                                            Upload
                                          </label>
                                          <input
                                            id="ownershipDetails"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileUpload('ownershipDetails', e.target.files?.[0] || null)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <Label>Long term progressive plan on value addition</Label>
                                      {uploadedFiles['valueAdditionPlan'] ? (
                                        <div className="flex items-center justify-between gap-2 p-2 border rounded bg-gray-50">
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm">{uploadedFiles['valueAdditionPlan']?.name}</span>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleFileDelete('valueAdditionPlan')}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-2">
                                          <label htmlFor="valueAdditionPlan" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                            <Upload className="h-3 w-3" />
                                            Upload
                                          </label>
                                          <input
                                            id="valueAdditionPlan"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileUpload('valueAdditionPlan', e.target.files?.[0] || null)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <Label>Profiles of the investor(s), directors and principal officers</Label>
                                      {uploadedFiles['investorProfiles'] ? (
                                        <div className="flex items-center justify-between gap-2 p-2 border rounded bg-gray-50">
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm">{uploadedFiles['investorProfiles']?.name}</span>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleFileDelete('investorProfiles')}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-2">
                                          <label htmlFor="investorProfiles" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                            <Upload className="h-3 w-3" />
                                            Upload
                                          </label>
                                          <input
                                            id="investorProfiles"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileUpload('investorProfiles', e.target.files?.[0] || null)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <Label>Memorandum and Articles of Association</Label>
                                      {uploadedFiles['memorandumArticles'] ? (
                                        <div className="flex items-center justify-between gap-2 p-2 border rounded bg-gray-50">
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm">{uploadedFiles['memorandumArticles']?.name}</span>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleFileDelete('memorandumArticles')}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-2">
                                          <label htmlFor="memorandumArticles" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                            <Upload className="h-3 w-3" />
                                            Upload
                                          </label>
                                          <input
                                            id="memorandumArticles"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileUpload('memorandumArticles', e.target.files?.[0] || null)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <Label>Evidence of land ownership for the project</Label>
                                      {uploadedFiles['landOwnership'] ? (
                                        <div className="flex items-center justify-between gap-2 p-2 border rounded bg-gray-50">
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm">{uploadedFiles['landOwnership']?.name}</span>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleFileDelete('landOwnership')}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-2">
                                          <label htmlFor="landOwnership" className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                            <Upload className="h-3 w-3" />
                                            Upload
                                          </label>
                                          <input
                                            id="landOwnership"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleFileUpload('landOwnership', e.target.files?.[0] || null)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {selectedTab === 'directorDocs' && (
                                  <div className="space-y-4">
                                    {directors.map((director) => (
                                      <div key={director.id} className="border rounded-lg">
                                        <div
                                          className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                          onClick={() => toggleDirectorExpansion(director.id)}
                                        >
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium">Director {director.id}</span>
                                            <span className="text-sm text-gray-500">(3 documents)</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            {directors.length > 1 && (
                                              <button
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  removeDirector(director.id)
                                                }}
                                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                              >
                                                <Trash2 className="h-4 w-4" />
                                              </button>
                                            )}
                                            <ChevronDown
                                              className={`h-4 w-4 transition-transform ${
                                                director.expanded ? 'rotate-180' : ''
                                              }`}
                                            />
                                          </div>
                                        </div>

                                        {director.expanded && (
                                          <div className="border-t p-3 space-y-4 bg-gray-50">
                                            <div>
                                              <Label>ID/Passport</Label>
                                              {uploadedFiles[`director${director.id}Id`] ? (
                                                <div className="flex items-center justify-between gap-2 p-2 border rounded bg-white">
                                                  <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-blue-600" />
                                                    <span className="text-sm">{uploadedFiles[`director${director.id}Id`]?.name}</span>
                                                  </div>
                                                  <button
                                                    type="button"
                                                    onClick={() => handleFileDelete(`director${director.id}Id`)}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                  >
                                                    <X className="h-3 w-3" />
                                                  </button>
                                                </div>
                                              ) : (
                                                <div className="mt-2">
                                                  <label htmlFor={`director${director.id}Id`} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                                    <Upload className="h-3 w-3" />
                                                    Upload
                                                  </label>
                                                  <input
                                                    id={`director${director.id}Id`}
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => handleFileUpload(`director${director.id}Id`, e.target.files?.[0] || null)}
                                                  />
                                                </div>
                                              )}
                                            </div>
                                            <div>
                                              <Label>KRA PIN Certificate</Label>
                                              {uploadedFiles[`director${director.id}Pin`] ? (
                                                <div className="flex items-center justify-between gap-2 p-2 border rounded bg-white">
                                                  <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-blue-600" />
                                                    <span className="text-sm">{uploadedFiles[`director${director.id}Pin`]?.name}</span>
                                                  </div>
                                                  <button
                                                    type="button"
                                                    onClick={() => handleFileDelete(`director${director.id}Pin`)}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                  >
                                                    <X className="h-3 w-3" />
                                                  </button>
                                                </div>
                                              ) : (
                                                <div className="mt-2">
                                                  <label htmlFor={`director${director.id}Pin`} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                                    <Upload className="h-3 w-3" />
                                                    Upload
                                                  </label>
                                                  <input
                                                    id={`director${director.id}Pin`}
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => handleFileUpload(`director${director.id}Pin`, e.target.files?.[0] || null)}
                                                  />
                                                </div>
                                              )}
                                            </div>
                                            <div>
                                              <Label>Certificate of Good Conduct</Label>
                                              {uploadedFiles[`director${director.id}Conduct`] ? (
                                                <div className="flex items-center justify-between gap-2 p-2 border rounded bg-white">
                                                  <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-blue-600" />
                                                    <span className="text-sm">{uploadedFiles[`director${director.id}Conduct`]?.name}</span>
                                                  </div>
                                                  <button
                                                    type="button"
                                                    onClick={() => handleFileDelete(`director${director.id}Conduct`)}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                  >
                                                    <X className="h-3 w-3" />
                                                  </button>
                                                </div>
                                              ) : (
                                                <div className="mt-2">
                                                  <label htmlFor={`director${director.id}Conduct`} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer transition-colors">
                                                    <Upload className="h-3 w-3" />
                                                    Upload
                                                  </label>
                                                  <input
                                                    id={`director${director.id}Conduct`}
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => handleFileUpload(`director${director.id}Conduct`, e.target.files?.[0] || null)}
                                                  />
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    ))}

                                    <button
                                      type="button"
                                      onClick={addDirector}
                                      className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 border border-green-300 rounded-md hover:bg-green-50 transition-colors"
                                    >
                                      <Plus className="h-4 w-4" />
                                      Add Director
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Applicant Declaration */}
                              <div>
                                <h3 className="text-lg font-semibold mb-4">Applicant Declaration</h3>
                                <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
                                  <p className="text-gray-700">I hereby declare that:</p>
                                  <div className="flex items-start space-x-2">
                                    <Checkbox 
                                      id="declarationA" 
                                      checked={formData.declarationA === 'true'}
                                      onCheckedChange={(checked) => handleInputChange('declarationA', checked ? 'true' : 'false')}
                                    />
                                    <Label htmlFor="declarationA" className="text-sm">
                                      (a) All the statements and supporting Documents are complete and true
                                    </Label>
                                  </div>
                                  <div className="flex items-start space-x-2">
                                    <Checkbox 
                                      id="declarationB" 
                                      checked={formData.declarationB === 'true'}
                                      onCheckedChange={(checked) => handleInputChange('declarationB', checked ? 'true' : 'false')}
                                    />
                                    <Label htmlFor="declarationB" className="text-sm">
                                      (b) I have authorized the Authority to make further inquiries and receive information in connection with this application to the extent permitted by the law
                                    </Label>
                                  </div>
                                  <div className="flex items-start space-x-2">
                                    <Checkbox 
                                      id="declarationC" 
                                      checked={formData.declarationC === 'true'}
                                      onCheckedChange={(checked) => handleInputChange('declarationC', checked ? 'true' : 'false')}
                                    />
                                    <Label htmlFor="declarationC" className="text-sm">
                                      (c) We have complied with the requirements of the Environmental Management and Co-ordination Act 1999
                                    </Label>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-4">
                                    NOTE: All information regarding this application shall be treated as confidential but the Authority reserves the right to share the information with other approving agencies of the Kenya Government to the extent required by law or by the policy of the Government.
                                  </p>
                                </div>
                              </div>
                              </>)}
                              {String(application.id) === 'permit' && (
                              <>
                                {/* Mill/Jaggery Info - Auto-populated from letter of comfort */}
                                <div>
                                  <h3 className="text-lg font-semibold mb-4">Mill/Jaggery Info</h3>
                                  <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                      <Label htmlFor="documentNo">Document Number</Label>
                                      <Input
                                        id="documentNo"
                                        value={`KSB/SD/MJREG/${formData.category === 'Mill' ? 'M' : 'J'}${new Date().getFullYear()}`}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="documentDate">Document Date</Label>
                                      <Input
                                        id="documentDate"
                                        type="date"
                                        value={formData.documentDate}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="companyName">Name of Applicant</Label>
                                      <Input
                                        id="companyName"
                                        value={formData.companyName}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="year">Year</Label>
                                      <Input
                                        id="year"
                                        value={new Date().getFullYear().toString()}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="refLetterOfComfort">Ref Letter of Comfort</Label>
                                      <Input
                                        id="refLetterOfComfort"
                                        value={formData.documentNo}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Company Location Information - Auto-populated */}
                                <div>
                                  <h3 className="text-lg font-semibold mb-4">Company Location Information</h3>
                                  <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                      <Label htmlFor="lrNumber">L.R No/Plot No</Label>
                                      <Input
                                        id="lrNumber"
                                        value={formData.lrNumber}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="postalAddress">Postal Address</Label>
                                      <Input
                                        id="postalAddress"
                                        value={formData.postalAddress}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="postalCode">Postal Code</Label>
                                      <Input
                                        id="postalCode"
                                        value={formData.postalCode}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="companyRegNumber">Company Reg No</Label>
                                      <Input
                                        id="companyRegNumber"
                                        value={formData.companyRegNumber}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="pinNumber">PIN/VAT</Label>
                                      <Input
                                        id="pinNumber"
                                        value={formData.pinNumber}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="phoneNumber">Phone</Label>
                                      <Input
                                        id="phoneNumber"
                                        value={formData.phoneNumber}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="emailAddress">Email Address</Label>
                                      <Input
                                        id="emailAddress"
                                        value={formData.emailAddress}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="county">County</Label>
                                      <Input
                                        id="county"
                                        value={formData.county}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="subcounty">Sub-County</Label>
                                      <Input
                                        id="subcounty"
                                        value={formData.subcounty}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="ward">Ward</Label>
                                      <Input
                                        id="ward"
                                        value={formData.ward}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="location">Location</Label>
                                      <Input
                                        id="location"
                                        value={formData.location}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="buildingName">Building Name</Label>
                                      <Input
                                        id="buildingName"
                                        value={formData.buildingName}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="streetName">Street Name</Label>
                                      <Input
                                        id="streetName"
                                        value={formData.streetName}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="town">Town</Label>
                                      <Input
                                        id="town"
                                        value={formData.town}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="establishmentDate">Establishment Date</Label>
                                      <Input
                                        id="establishmentDate"
                                        value={formData.establishmentDate}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="legalStatus">Legal Status</Label>
                                      <Input
                                        id="legalStatus"
                                        value={formData.legalStatus}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="capacityTCD">Capacity (TCD)</Label>
                                      <Input
                                        id="capacityTCD"
                                        value={formData.capacityTCD}
                                        disabled
                                        className="bg-gray-100"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Company Tabs */}
                                <div>
                                  <h3 className="text-lg font-semibold mb-4">Company Tabs</h3>
                                  <div className="flex space-x-2 border-b border-gray-200 mb-4">
                                    {[
                                      { id: 'details', label: 'Company Details' },
                                      { id: 'location', label: 'Location Information' },
                                      { id: 'attachments', label: 'Attachments' },
                                      { id: 'directors', label: 'Directors Information' },
                                      { id: 'approval', label: 'Approval Remarks' },
                                    ].map((tab) => (
                                      <button
                                        key={tab.id}
                                        onClick={() => setSelectedTab(tab.id)}
                                        className={`px-3 py-2 text-sm font-medium ${selectedTab === tab.id ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                                      >
                                        {tab.label}
                                      </button>
                                    ))}
                                  </div>
                                  <div className="p-4 border rounded-lg bg-white">
                                    {/* Tab content would go here */}
                                    <p className="text-gray-500 text-center py-4">Tab content for {selectedTab} would be displayed here</p>
                                  </div>
                                </div>

                                {/* Applicant Declaration */}
                                <div>
                                  <h3 className="text-lg font-semibold mb-4">Applicant Declaration</h3>
                                  <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
                                    <p className="text-gray-700">I hereby declare that:</p>
                                    <div className="flex items-start space-x-2">
                                      <Checkbox 
                                        id="declarationA" 
                                        checked={formData.declarationA === 'true'}
                                        onCheckedChange={(checked) => handleInputChange('declarationA', checked ? 'true' : 'false')}
                                      />
                                      <Label htmlFor="declarationA" className="text-sm">
                                        (a) All the statements and supporting Documents are complete and true
                                      </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                      <Checkbox 
                                        id="declarationB" 
                                        checked={formData.declarationB === 'true'}
                                        onCheckedChange={(checked) => handleInputChange('declarationB', checked ? 'true' : 'false')}
                                      />
                                      <Label htmlFor="declarationB" className="text-sm">
                                        (b) I have authorized the Authority to make further inquiries and receive information in connection with this application to the extent permitted by the law
                                      </Label>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                      <Checkbox 
                                        id="declarationC" 
                                        checked={formData.declarationC === 'true'}
                                        onCheckedChange={(checked) => handleInputChange('declarationC', checked ? 'true' : 'false')}
                                      />
                                      <Label htmlFor="declarationC" className="text-sm">
                                        (c) We have complied with the requirements of the Environmental Management and Co-ordination Act 1999
                                      </Label>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-4">
                                      NOTE: All information regarding this application shall be treated as confidential but the Authority reserves the right to share the information with other approving agencies of the Kenya Government to the extent required by law or by the policy of the Government.
                                    </p>
                                    <div className="flex items-start space-x-2 mt-4">
                                      <Checkbox 
                                        id="agreeTerms" 
                                        checked={formData.agreeTerms === 'true'}
                                        onCheckedChange={(checked) => handleInputChange('agreeTerms', checked ? 'true' : 'false')}
                                      />
                                      <Label htmlFor="agreeTerms" className="text-sm font-medium">
                                        I Agree to the Terms & Conditions
                                      </Label>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            </>
                          ) : null}
                          
                          <div className="flex justify-end gap-3 pt-4">
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={handleSaveDraft}
                              disabled={!formData.category}
                              className="border-blue-500 text-blue-600 hover:bg-blue-50"
                            >
                              {isDraftSaved ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Draft Saved
                                </>
                              ) : (
                                <>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Save Draft
                                </>
                              )}
                            </Button>
                            <Button 
                              type="submit" 
                              className="bg-green-600 hover:bg-green-700"
                              disabled={!formData.category || formData.declarationA !== 'true' || formData.declarationB !== 'true' || formData.declarationC !== 'true' || (String(application.id) === 'permit' && formData.agreeTerms !== 'true')}
                            >
                              {isSubmitted ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Submitted
                                </>
                              ) : (
                                <>
                                  <Send className="h-4 w-4 mr-2" />
                                  Submit Application
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      ) : (
                        // Default form for other applications
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <Label htmlFor="companyName">Company Name</Label>
                              <Input
                                id="companyName"
                                value={formData.companyName}
                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="millerLicenseNumber">License Number</Label>
                              <Input
                                id="millerLicenseNumber"
                                value={formData.millerLicenseNumber}
                                onChange={(e) => handleInputChange('millerLicenseNumber', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          
                          {application.fields.map((field) => (
                            <div key={field.name}>
                              <Label htmlFor={field.name}>
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                              </Label>
                              {field.type === 'select' ? (
                                <Select 
                                  value={formData[field.name as keyof typeof formData] || ''} 
                                  onValueChange={(value) => handleInputChange(field.name, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {field.options?.map((option: string) => (
                                      <SelectItem key={option} value={option}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : field.type === 'textarea' ? (
                                <Textarea
                                  id={field.name}
                                  value={formData[field.name as keyof typeof formData] || ''}
                                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                                  placeholder={`Enter ${field.label.toLowerCase()}`}
                                  className="min-h-[100px]"
                                  required={field.required}
                                />
                              ) : (
                                <Input
                                  id={field.name}
                                  type={field.type}
                                  value={formData[field.name as keyof typeof formData] || ''}
                                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                                  placeholder={`Enter ${field.label.toLowerCase()}`}
                                  required={field.required}
                                />
                              )}
                            </div>
                          ))}
                          
                          <div className="flex justify-end gap-3 pt-4">
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={handleSaveDraft}
                              className="border-blue-500 text-blue-600 hover:bg-blue-50"
                            >
                              {isDraftSaved ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Draft Saved
                                </>
                              ) : (
                                <>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Save Draft
                                </>
                              )}
                            </Button>
                            <Button type="submit" className="bg-green-600 hover:bg-green-700">
                              {isSubmitted ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Submitted
                                </>
                              ) : (
                                <>
                                  <Send className="h-4 w-4 mr-2" />
                                  Submit Application
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
              
        {/* Importer Tab */}
        {activeTab === 'importer' && (
          <div className="min-h-[575px] max-h-[575px] overflow-y-auto">
            <div className="space-y-4">
              {stakeholderApplications['Sugar Importer']?.map((application) => (
                <div key={application.id} className="border rounded-lg">
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedApplication(expandedApplication === application.id ? '' : application.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{application.name}</h4>
                        <p className="text-sm text-gray-600">{application.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            expandedApplication === application.id ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {expandedApplication === application.id && (
                    <div className="border-t p-4 bg-gray-50">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input
                              id="companyName"
                              value={formData.companyName}
                              onChange={(e) => handleInputChange('companyName', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        {application.fields.map((field) => (
                          <div key={field.name}>
                            <Label htmlFor={field.name}>
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                            {field.type === 'select' ? (
                              <Select 
                                value={formData[field.name as keyof typeof formData] || ''} 
                                onValueChange={(value) => handleInputChange(field.name, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  {field.options?.map((option: string) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : field.type === 'textarea' ? (
                              <Textarea
                                id={field.name}
                                value={formData[field.name as keyof typeof formData] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                className="min-h-[100px]"
                                required={field.required}
                              />
                            ) : (
                              <Input
                                id={field.name}
                                type={field.type}
                                value={formData[field.name as keyof typeof formData] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                required={field.required}
                              />
                            )}
                          </div>
                        ))}
                        
                        <div className="flex justify-end gap-3 pt-4">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={handleSaveDraft}
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                          >
                            {isDraftSaved ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Draft Saved
                              </>
                            ) : (
                              <>
                                <FileText className="h-4 w-4 mr-2" />
                                Save Draft
                              </>
                            )}
                          </Button>
                          <Button type="submit" className="bg-green-600 hover:bg-green-700">
                            {isSubmitted ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Submitted
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4 mr-2" />
                                Submit Application
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
              
        {/* Exporter Tab */}
        {activeTab === 'exporter' && (
          <div className="min-h-[575px] max-h-[575px] overflow-y-auto">
            <div className="space-y-4">
              {stakeholderApplications['Sugar Exporter']?.map((application) => (
                <div key={application.id} className="border rounded-lg">
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedApplication(expandedApplication === application.id ? '' : application.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{application.name}</h4>
                        <p className="text-sm text-gray-600">{application.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            expandedApplication === application.id ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {expandedApplication === application.id && (
                    <div className="border-t p-4 bg-gray-50">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {application.fields.map((field) => (
                          <div key={field.name}>
                            <Label htmlFor={field.name}>
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                            {field.type === 'select' ? (
                              <Select 
                                value={formData[field.name as keyof typeof formData] || ''} 
                                onValueChange={(value) => handleInputChange(field.name, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  {field.options?.map((option: string) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : field.type === 'textarea' ? (
                              <Textarea
                                id={field.name}
                                value={formData[field.name as keyof typeof formData] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                className="min-h-[100px]"
                                required={field.required}
                              />
                            ) : (
                              <Input
                                id={field.name}
                                type={field.type}
                                value={formData[field.name as keyof typeof formData] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                required={field.required}
                              />
                            )}
                          </div>
                        ))}
                        
                        <div className="flex justify-end gap-3 pt-4">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={handleSaveDraft}
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                          >
                            {isDraftSaved ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Draft Saved
                              </>
                            ) : (
                              <>
                                <FileText className="h-4 w-4 mr-2" />
                                Save Draft
                              </>
                            )}
                          </Button>
                          <Button type="submit" className="bg-green-600 hover:bg-green-700">
                            {isSubmitted ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Submitted
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4 mr-2" />
                                Submit Application
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
              
        {/* Sugar Dealer Tab */}
        {activeTab === 'sugarDealer' && (
          <div className="min-h-[575px] max-h-[575px] overflow-y-auto">
            <div className="space-y-4">
              {stakeholderApplications['Sugar Dealer']?.map((application) => (
                <div key={application.id} className="border rounded-lg">
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedApplication(expandedApplication === application.id ? '' : application.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{application.name}</h4>
                        <p className="text-sm text-gray-600">{application.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            expandedApplication === application.id ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {expandedApplication === application.id && (
                    <div className="border-t p-4 bg-gray-50">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {application.fields.map((field) => (
                          <div key={field.name}>
                            <Label htmlFor={field.name}>
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                            {field.type === 'select' ? (
                              <Select 
                                value={formData[field.name as keyof typeof formData] || ''} 
                                onValueChange={(value) => handleInputChange(field.name, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  {field.options?.map((option: string) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : field.type === 'textarea' ? (
                              <Textarea
                                id={field.name}
                                value={formData[field.name as keyof typeof formData] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                className="min-h-[100px]"
                                required={field.required}
                              />
                            ) : (
                              <Input
                                id={field.name}
                                type={field.type}
                                value={formData[field.name as keyof typeof formData] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                required={field.required}
                              />
                            )}
                          </div>
                        ))}
                        
                        <div className="flex justify-end gap-3 pt-4">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={handleSaveDraft}
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                          >
                            {isDraftSaved ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Draft Saved
                              </>
                            ) : (
                              <>
                                <FileText className="h-4 w-4 mr-2" />
                                Save Draft
                              </>
                            )}
                          </Button>
                          <Button type="submit" className="bg-green-600 hover:bg-green-700">
                            {isSubmitted ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Submitted
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4 mr-2" />
                                Submit Application
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
              
        {/* Molasses Dealer Tab */}
        {activeTab === 'molassesDealer' && (
          <div className="min-h-[575px] max-h-[575px] overflow-y-auto">
            <div className="space-y-4">
              {stakeholderApplications['Molasses Dealer']?.map((application) => (
                <div key={application.id} className="border rounded-lg">
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedApplication(expandedApplication === application.id ? '' : application.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{application.name}</h4>
                        <p className="text-sm text-gray-600">{application.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            expandedApplication === application.id ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {expandedApplication === application.id && (
                    <div className="border-t p-4 bg-gray-50">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {application.fields.map((field) => (
                          <div key={field.name}>
                            <Label htmlFor={field.name}>
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                            {field.type === 'select' ? (
                              <Select 
                                value={formData[field.name as keyof typeof formData] || ''} 
                                onValueChange={(value) => handleInputChange(field.name, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  {field.options?.map((option: string) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : field.type === 'textarea' ? (
                              <Textarea
                                id={field.name}
                                value={formData[field.name as keyof typeof formData] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                className="min-h-[100px]"
                                required={field.required}
                              />
                            ) : (
                              <Input
                                id={field.name}
                                type={field.type}
                                value={formData[field.name as keyof typeof formData] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                required={field.required}
                              />
                            )}
                          </div>
                        ))}
                        
                        <div className="flex justify-end gap-3 pt-4">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={handleSaveDraft}
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                          >
                            {isDraftSaved ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Draft Saved
                              </>
                            ) : (
                              <>
                                <FileText className="h-4 w-4 mr-2" />
                                Save Draft
                              </>
                            )}
                          </Button>
                          <Button type="submit" className="bg-green-600 hover:bg-green-700">
                            {isSubmitted ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Submitted
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4 mr-2" />
                                Submit Application
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}



      </DialogContent>
    </Dialog>
  )
}