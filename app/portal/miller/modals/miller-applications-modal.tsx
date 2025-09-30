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
import { FileText, Send, CheckCircle, Clock, AlertCircle, FileCheck, ArrowLeft, ClipboardList, Eye, CheckCircle2, Circle, ChevronRight, Factory, Ship, ExternalLink, Store, Droplet } from "lucide-react"
import { useLicenses, useLicenseStats } from '@/hooks/use-licenses'
import { useSubmitApplication, useUserApplications, Application } from '@/hooks/use-applications'
import { License } from '@/lib/api-client'
import { DynamicFormRenderer, LicenseWithFields } from '@/components/dynamic-form-renderer'
import { useAuth } from '@/components/auth-provider'

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
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [selectedTab, setSelectedTab] = useState<string>('details')
  const [isDraftSaved, setIsDraftSaved] = useState(false)
  const [submittedApplications, setSubmittedApplications] = useState<any[]>([])
  const [selectedLicense, setSelectedLicense] = useState<LicenseWithFields | null>(null)
  const [isSubmittingForm, setIsSubmittingForm] = useState(false)
  const [isDraftSaving, setIsDraftSaving] = useState(false)

  // Fetch licenses data using the custom hook
  const { data: licensesData, isLoading: licensesLoading, error: licensesError } = useLicenses(1, 100)
  const licenseStats = useLicenseStats()
  const { user } = useAuth()

  // Fetch user applications using the new API endpoint
  const { data: userApplicationsData, isLoading: userApplicationsLoading, error: userApplicationsError } = useUserApplications(
    user?.id || '',
    1,
    100
  )

  // Create user profile data for company field population
  const userProfile = {
    companyName: 'Mumias Sugar Mills Ltd', // This could come from user.entityData or a separate company profile
    lrNumber: 'LR/12345/2020',
    postalAddress: 'P.O. Box 12345',
    postalCode: '50100',
    companyRegNumber: 'C.123456',
    pinNumber: 'P051234567A',
    phoneNumber: user?.entityData?.phoneNumber || '+254 700 333 456',
    emailAddress: user?.email || 'info@mumiasmills.co.ke',
    county: 'Kakamega',
    subcounty: 'Mumias East',
    ward: 'Mumias Central',
    location: 'Mumias Township',
    buildingName: 'Mumias Sugar Complex',
    streetName: 'Mumias Road',
    town: 'Mumias',
    establishmentDate: '1980-01-15',
    legalStatus: 'Limited Company'
  }

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
    permitDuration: '',
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

    // Declaration checkboxes
    declarationA: 'false',
    declarationB: 'false',
    declarationC: 'false',
    agreeTerms: 'false'
  })


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
        name: 'Letter of Comfort',
        description: 'Apply for letter of comfort required to begin your sugar miller journey',
        fields: [] // Will be handled with custom form
      },
      {
        id: 'permit',
        name: 'Permit Application',
        description: 'Apply for permit required for sugar milling operations',
        fields: [] // Will be handled with custom form like letter of comfort
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

  // Use user applications data from the API
  // Handle the new nested structure: data.applications
  const existingApplications = userApplicationsData?.data?.applications || []

  // Calculate license stats from user applications
  const applicationStats = {
    active: existingApplications.filter((app: Application) => app.status === 'APPROVED').length,
    pending: existingApplications.filter((app: Application) => app.status === 'PENDING').length,
    rejected: existingApplications.filter((app: Application) => app.status === 'REJECTED').length
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
      declarationA: 'false',
      declarationB: 'false',
      declarationC: 'false',
      agreeTerms: 'false'
    }))
    setSelectedApplication(null)
    setSelectedStakeholder('')
    setExpandedApplication('')
    setIsDraftSaved(false)
    setSelectedLicense(null)
    setIsSubmittingForm(false)
    setIsDraftSaving(false)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
      case 'Approved':
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
      case 'Under Review':
      case 'Pending':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'REJECTED':
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-800'
      case 'UNDER_REVIEW':
      case 'in-review':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create new application entry
    const newApplication = {
      id: `APP-2024-${String(Date.now()).slice(-3).padStart(3, '0')}`,
      type: expandedApplication === 'letter-of-comfort' ? 'Letter of Comfort' : 'General Application',
      title: expandedApplication === 'letter-of-comfort' ? `Letter of Comfort - ${formData.category}` : 'Application',
      purpose: expandedApplication === 'letter-of-comfort' ? 'Letter of Comfort' : 'General Purpose',
      status: 'Under Review',
      stage: 'submission',
      applicant: formData.companyName,
      company: formData.companyName,
      submitDate: new Date().toISOString().split('T')[0],
      completionDate: null,
      expectedCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      quantity: expandedApplication === 'letter-of-comfort' ? formData.capacityTCD + ' TCD' : 'N/A',
      notes: expandedApplication === 'letter-of-comfort' ? `Letter of comfort application for ${formData.category} submitted. All required documentation provided.` : 'Application submitted for review.',
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

  const auth = useAuth()
  const submitApplicationMutation = useSubmitApplication()

  // Handle license form submission
  const handleLicenseFormSubmit = async (formData: Record<string, any>) => {
    if (!selectedLicense?.id || !auth.user?.entityData?.id || !auth.user?.id) {
      console.error('Missing required data for application submission')
      return
    }

    console.log('Submitting license application:', {
      licenseId: selectedLicense?.id,
      entityId: auth.user?.entityData?.id,
      userId: auth.user?.id,
      licenseName: selectedLicense?.name,

      formData
    })

    try {
      const response = await submitApplicationMutation.mutateAsync({
        licenseId: selectedLicense.id,
        entityId: auth.user.entityData.id,
        userId: auth.user.id,
        licenseName: selectedLicense?.name,
        formData: formData
      })

      console.log('Application submitted successfully:', response)

      // Create new application entry for local state
      const newApplication = {
        id: response.data.id,
        entityId: auth.user.entityData.id,
        licenseId: selectedLicense.id,
        formData: formData,
        status: response.data.status,
        submittedAt: response.data.submittedAt
      }

      // Add to submitted applications
      setSubmittedApplications(prev => [newApplication, ...prev])

      // Reset form and close
      setSelectedLicense(null)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
      }, 2000)

    } catch (error) {
      console.error('Error submitting license application:', error)
    }
  }

  // Handle license form draft save
  const handleLicenseFormDraftSave = async (formData: Record<string, any>) => {
    setIsDraftSaving(true)

    try {
      // In a real app, this would save to localStorage or backend
      console.log('Saving license application draft:', {
        licenseId: selectedLicense?.id,
        formData
      })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

    } catch (error) {
      console.error('Error saving draft:', error)
    } finally {
      setIsDraftSaving(false)
    }
  }

  // Handle license click - show form if it has fields
  const handleLicenseClick = (license: License) => {
    // Convert License to LicenseWithFields format
    const licenseWithFields: LicenseWithFields = {
      ...license,
      fields: license.fields || [] // Add fields from the API response
    }

    // If license has fields, show the form
    if (licenseWithFields.fields && licenseWithFields.fields.length > 0) {
      setSelectedLicense(licenseWithFields)
    } else {
      // If no fields, show application details as before
      setSelectedApplication({
        id: license.id,
        licenseId: license.id,
        entityId: user?.entityData?.id || '',
        userId: user?.id || '',
        status: license.status === 'ACTIVE' ? 'APPROVED' :
          license.status === 'PENDING' ? 'PENDING' :
            license.status === 'EXPIRED' ? 'REJECTED' : 'PENDING',
        applicationData: {
          'License Type': license.type,
          'License Name': license.name,
          'Cost': license.cost,
          'Issuing Authority': license.issuingAuthority
        },
        submittedAt: license.createdAt,
        reviewedAt: null,
        approvedAt: license.status === 'ACTIVE' ? license.createdAt : null,
        rejectedAt: license.status === 'EXPIRED' ? license.createdAt : null,
        rejectionReason: null,
        assignedTo: null,
        notes: `${license.type} - ${license.status} - ${license.issuingAuthority}`,
        documents: null,
        paymentStatus: 'PENDING',
        paymentReference: null,
        createdAt: license.createdAt,
        updatedAt: license.updatedAt,
        license: {
          id: license.id,
          name: license.name,
          description: license.description,
          category: license.category,
          type: license.type,
          status: license.status,
          requirements: {},
          validityPeriod: license.validityPeriod,
          cost: String(license.cost),
          issuingAuthority: license.issuingAuthority,
          applicationSteps: null,
          prerequisites: null,
          documents: null,
          processingTime: license.processingTime || '5-10 business days',
          renewalRequired: license.renewalRequired || false,
          renewalPeriod: license.renewalPeriod || 12,
          isDigital: license.isDigital || true,
          onlineApplication: license.onlineApplication || true,
          createdAt: license.createdAt,
          updatedAt: license.updatedAt
        }
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh]">
        <DialogHeader className="bg-gray-50 -m-6 mb-0 p-6 rounded-t-lg">
          <DialogTitle className="text-2xl font-bold">Applications</DialogTitle>
          <DialogDescription>
            Apply for Letters of Comfort, Permits, and License Applications & Renewals
          </DialogDescription>
        </DialogHeader>
        {/* Tab Navigation */}
        <div className="flex space-x-1 border-b border-gray-200 mb-6">
          {[
            { id: 'status', label: 'Status', icon: FileText },
            { id: 'miller', label: 'Miller', icon: Factory, keys: "MILLERS" },
            { id: 'importer', label: 'Importer', icon: Ship, keys: "WHITE_SUGAR" },
            { id: 'exporter', label: 'Exporter', icon: ExternalLink },
            { id: 'sugarDealer', label: 'Sugar Dealer', icon: Store },
            { id: 'molassesDealer', label: 'Molasses Dealer', icon: Droplet }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === id
                ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {String(activeTab) === 'status' && (
          <div className="min-h-[575px] max-h-[575px] overflow-y-auto">
            {licensesLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Clock className="h-8 w-8 animate-spin mx-auto mb-2 text-green-600" />
                  <p className="text-gray-600">Loading licenses...</p>
                </div>
              </div>
            ) : licensesError ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2 text-red-600" />
                  <p className="text-red-600">Error loading licenses</p>
                  <p className="text-sm text-gray-500 mt-1">Please try again later</p>
                </div>
              </div>
            ) : selectedApplication ? (
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
                    {selectedApplication.status === 'PENDING' ? 'Under Review' :
                      selectedApplication.status === 'APPROVED' ? 'Approved' :
                        selectedApplication.status === 'REJECTED' ? 'Rejected' :
                          selectedApplication.status}
                  </Badge>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    {selectedApplication.license?.name || 'Application'}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-green-700">
                    <span>ID: {selectedApplication.id}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Type: {selectedApplication.license?.name || 'Application'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700">Application Details</h4>
                    <div className="bg-white border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Applicant:</span>
                        <span className="font-medium">
                          {userApplicationsData?.data?.user?.iprs ?
                            `${userApplicationsData.data.user.iprs.first_name} ${userApplicationsData.data.user.iprs.last_name}` :
                            userApplicationsData?.data?.user?.email || 'N/A'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Company:</span>
                        <span className="font-medium">
                          {userApplicationsData?.data?.user?.entity?.businessId?.legal_name ||
                            userApplicationsData?.data?.entity?.companyName ||
                            'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Submission Date:</span>
                        <span className="font-medium">
                          {selectedApplication?.submittedAt ?
                            new Date(selectedApplication.submittedAt).toLocaleDateString() :
                            'N/A'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Stage:</span>
                        <span className="font-medium">
                          {selectedApplication?.status === 'PENDING' ? 'Under Review' :
                            selectedApplication?.status === 'APPROVED' ? 'Approved' :
                              selectedApplication?.status === 'REJECTED' ? 'Rejected' :
                                selectedApplication?.status || 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-medium">
                          {selectedApplication?.applicationData?.['Capacity (TCD)'] ?
                            `${selectedApplication.applicationData['Capacity (TCD)']} TCD` :
                            selectedApplication?.applicationData?.['Plot Number'] ?
                              `Plot: ${selectedApplication.applicationData['Plot Number']}` :
                              'N/A'
                          }
                        </span>
                      </div>

                      {selectedApplication?.approvedAt && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Approval Date:</span>
                          <span className="font-medium">
                            {new Date(selectedApplication.approvedAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      {selectedApplication?.rejectedAt && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rejection Date:</span>
                          <span className="font-medium">
                            {new Date(selectedApplication.rejectedAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      {selectedApplication?.paymentStatus && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Status:</span>
                          <span className="font-medium">
                            {selectedApplication.paymentStatus}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700">Additional Information</h4>
                    <div className="bg-white border rounded-lg p-4">
                      <h5 className="font-medium mb-2">Notes</h5>
                      <p className="text-gray-700">
                        {selectedApplication?.notes ||
                          selectedApplication?.rejectionReason ||
                          'No additional notes available.'}
                      </p>
                    </div>

                    <div className="bg-white border rounded-lg p-4">
                      <h5 className="font-medium mb-2">Application Data</h5>
                      <div className="space-y-2">
                        {selectedApplication?.applicationData && Object.entries(selectedApplication.applicationData).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-gray-600">{key}:</span>
                            <span className="font-medium">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border rounded-lg p-4">
                      <h5 className="font-medium mb-2">Documents</h5>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span>Application Form {selectedApplication?.id || 'N/A'}.pdf</span>
                        </div>
                        {selectedApplication?.status === "PENDING" && (
                          <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span>Supporting Documents.pdf</span>
                          </div>
                        )}
                        {selectedApplication?.status === "APPROVED" && (
                          <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                            <FileText className="h-4 w-4 text-green-600" />
                            <span>Approval Certificate.pdf</span>
                          </div>
                        )}
                        {selectedApplication?.documents && selectedApplication.documents.length > 0 && (
                          selectedApplication.documents.map((doc: any, index: number) => (
                            <div key={index} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                              <FileText className="h-4 w-4 text-blue-600" />
                              <span>{doc.name || `Document ${index + 1}.pdf`}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {selectedApplication?.status === "PENDING" && (
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
                          const currentStage = "submission" // Default stage since Application doesn't have stage property
                          const currentIndex = stageOrder.indexOf(currentStage)
                          const stageIndex = stageOrder.indexOf(stageId)

                          if (selectedApplication.status === "APPROVED") {
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
                            <div className={`z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 ${status === "completed" ? "bg-green-500 border-green-500" :
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
                              <p className={`text-xs font-medium ${status === "completed" ? "text-green-700" :
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
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">License Status</h3>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active: {applicationStats.active}
                    </Badge>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Pending: {applicationStats.pending}
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Rejected: {applicationStats.rejected}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  {userApplicationsLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <div className="text-gray-500">Loading applications...</div>
                    </div>
                  ) : (
                    [...submittedApplications, ...existingApplications].map((app) => (
                      <div key={app.id} className="p-4 border rounded-lg space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{app.license?.name || app.type || 'Unknown License'}</h4>
                            <p className="text-sm text-gray-600">ID: {app.id}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(app.status)}>
                              {app.status === 'PENDING' ? 'Under Review' :
                                app.status === 'APPROVED' ? 'Approved' :
                                  app.status === 'REJECTED' ? 'Rejected' :
                                    app.status}
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
                            <p className="font-medium">{app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'N/A'}</p>
                          </div>
                          {app.completionDate && (
                            <div>
                              <span className="text-gray-600">Completion Date:</span>
                              <p className="font-medium">{new Date(app.completionDate).toLocaleDateString()}</p>
                            </div>
                          )}
                          {app.quantity && app.quantity !== 'N/A' && (
                            <div>
                              <span className="text-gray-600">Capacity:</span>
                              <p className="font-medium">{app.quantity} TCD</p>
                            </div>
                          )}
                          {app.paymentStatus && (
                            <div>
                              <span className="text-gray-600">Payment:</span>
                              <p className="font-medium">{app.paymentStatus}</p>
                            </div>
                          )}
                          {app.assignedTo && (
                            <div>
                              <span className="text-gray-600">Assigned To:</span>
                              <p className="font-medium">{app.assignedTo}</p>
                            </div>
                          )}
                          {app.notes && (
                            <div className="col-span-2">
                              <span className="text-gray-600">Notes:</span>
                              <p className="font-medium">{app.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}



        {String(activeTab) === 'miller' && (
          <div className="min-h-[575px] max-h-[575px] overflow-y-auto">
            {(() => {
              const millerLicense = licensesData?.data.find(e => e.type?.toLowerCase().includes("miller"));
              if (!millerLicense) return null;
              return (
                <DynamicFormRenderer license={{ ...millerLicense, fields: millerLicense.fields ?? [] }}

                  onSubmit={handleLicenseFormSubmit}
                  onCancel={() => setSelectedLicense(null)}
                  onSaveDraft={handleLicenseFormDraftSave}
                  isSubmitting={submitApplicationMutation.isPending}
                  isDraftSaving={isDraftSaving}
                  userProfile={userProfile}
                // You may want to add onCancel, isSubmitting, isDraftSaving, userProfile as needed
                />
              );
            })()}
          </div>
        )}


   
      </DialogContent>

    </Dialog>
  )
}