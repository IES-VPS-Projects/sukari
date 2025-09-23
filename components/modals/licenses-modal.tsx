"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  FileCheck, Download, Eye, CheckCircle, Clock, XCircle, AlertTriangle, Plus, ArrowLeft, Loader2, Edit, Trash2, MoreHorizontal, FileText as Form, Workflow,
  ArrowUp, ArrowDown, X, Type, Mail, Phone, Hash, FileText, Calendar, Upload, CheckSquare, List, Radio, GripVertical, Settings, Save, RefreshCw,
  Building
} from "lucide-react"
import { useLicenses, useLicenseStats, useCreateLicense, useUpdateLicense, useDeleteLicense } from "@/hooks/use-licenses"
import { useBulkCreateLicenseFields, useLicenseFieldsByLicense } from "@/hooks/use-license-fields"
import { 
  useCreateWorkflowTemplate,
  useWorkflowTemplates,
  useUpdateWorkflowTemplate,
  useDeleteWorkflowTemplate,
  predefinedTemplates
} from "@/hooks/use-workflow-templates"
import { useDepartments } from "@/hooks/use-departments"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  CreateLicenseRequest, 
  License
} from "@/lib/api-client"
import { LicenseFormStatus } from "@/components/license-form-status"

// Define view types for the modal
type ModalView = 'main' | 'createLicense' | 'editLicense' | 'formBuilder' | 'workflowTemplates' | 'workflowManagement'

interface LicensesModalProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
  readonly selectedLicense?: License | null
}

const licenseTypes = [
  { value: "MILLERS", label: "Sugar Millers License" },
  { value: "BROWN_SUGAR", label: "Brown Sugar Import License" },
  { value: "WHITE_SUGAR", label: "White Sugar Production License" },
  { value: "JAGGERY", label: "Jaggery Production License" },
]

const categories = [
  { value: "PERMIT_AND_LICENSE", label: "Permit and License" },
  { value: "LETTER_OF_COMFORT", label: "Letter of Comfort" }
]

// Field types for form builder
const fieldTypes = [
  { 
    value: "TEXT", 
    label: "Text Input", 
    icon: Type,
    description: "Single line text input",
    requiresOptions: false,
    color: "bg-blue-100 text-blue-800"
  },
  { 
    value: "COMPANY", 
    label: "Company", 
    icon: Building,
    description: "Company details",
    requiresOptions: false,
    color: "bg-gray-100 text-gray-800"
  },

  { 
    value: "EMAIL", 
    label: "Email", 
    icon: Mail,
    description: "Email address input",
    requiresOptions: false,
    color: "bg-green-100 text-green-800"
  },
  { 
    value: "PHONE", 
    label: "Phone", 
    icon: Phone,
    description: "Phone number input",
    requiresOptions: false,
    color: "bg-purple-100 text-purple-800"
  },
  { 
    value: "NUMBER", 
    label: "Number", 
    icon: Hash,
    description: "Numeric input",
    requiresOptions: false,
    color: "bg-orange-100 text-orange-800"
  },
  { 
    value: "TEXTAREA", 
    label: "Text Area", 
    icon: FileText,
    description: "Multi-line text input",
    requiresOptions: false,
    color: "bg-indigo-100 text-indigo-800"
  },
  { 
    value: "SELECT", 
    label: "Dropdown", 
    icon: List,
    description: "Single selection dropdown",
    requiresOptions: true,
    color: "bg-pink-100 text-pink-800"
  },
  { 
    value: "RADIO", 
    label: "Radio Buttons", 
    icon: Radio,
    description: "Single selection radio buttons",
    requiresOptions: true,
    color: "bg-teal-100 text-teal-800"
  },
  { 
    value: "CHECKBOX", 
    label: "Checkboxes", 
    icon: CheckSquare,
    description: "Multiple selection checkboxes",
    requiresOptions: true,
    color: "bg-cyan-100 text-cyan-800"
  },
  { 
    value: "DATE", 
    label: "Date Picker", 
    icon: Calendar,
    description: "Date selection input",
    requiresOptions: false,
    color: "bg-yellow-100 text-yellow-800"
  },
  { 
    value: "FILE", 
    label: "File Upload", 
    icon: Upload,
    description: "File upload input",
    requiresOptions: false,
    color: "bg-red-100 text-red-800"
  }
]

// Step types for workflow templates
const stepTypes = [
  { value: "REVIEW", label: "Review" },
  { value: "APPROVAL", label: "Approval" },
  { value: "INSPECTION", label: "Inspection" },
  { value: "PAYMENT", label: "Payment" },
  { value: "NOTIFICATION", label: "Notification" },
  { value: "DECISION", label: "Decision" },
  { value: "DOCUMENT_VERIFICATION", label: "Document Verification" },
  { value: "FIELD_VISIT", label: "Field Visit" },
  { value: "COMPLIANCE_CHECK", label: "Compliance Check" }
]

const assignmentMethods = [
  { value: "HEAD_ASSIGNMENT", label: "Head Assignment" },
  { value: "OFFICER_PICKUP", label: "Officer Pickup" },
  { value: "AUTO_ASSIGN", label: "Auto Assign" }
]

export function LicensesModal({ open, onOpenChange, selectedLicense }: LicensesModalProps) {
  // State for modal views
  const [currentView, setCurrentView] = useState<ModalView>('main')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingLicense, setEditingLicense] = useState<License | null>(null)
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedLicenseForForm, setSelectedLicenseForForm] = useState<string | null>(null)
  const [selectedLicenseForWorkflow, setSelectedLicenseForWorkflow] = useState<License | null>(null)
  const [editingWorkflow, setEditingWorkflow] = useState<any>(null)
  
  // Form builder state
  const [formFields, setFormFields] = useState<any[]>([])
  const [isCreatingField, setIsCreatingField] = useState(false)
  const [editingField, setEditingField] = useState<any>(null)
  const [fieldFormData, setFieldFormData] = useState({
    name: '',
    label: '',
    type: 'TEXT',
    required: false,
    placeholder: '',
    description: '',
    options: [] as Array<{ value: string; label: string }>
  })
  const [newOption, setNewOption] = useState({ value: '', label: '' })
  
  // Workflow templates state
  const [workflowSteps, setWorkflowSteps] = useState<any[]>([])
  const [workflowFormData, setWorkflowFormData] = useState({
    name: '',
    description: '',
    licenseType: 'MILLERS',
    licenseCategory: 'PERMIT_AND_LICENSE',
    licenseid: '',
    isActive: true
  })
  const [isCreatingStep, setIsCreatingStep] = useState(false)
  const [editingStep, setEditingStep] = useState<any>(null)
  const [stepFormData, setStepFormData] = useState({
    id: '',
    name: '',
    description: '',
    type: 'REVIEW',
    assignedDepartment: 'Committee',
    assignmentMethod: 'HEAD_ASSIGNMENT',
    timeout: '1 day',
    nextSteps: [] as string[],
    conditions: {
      onComplete: '',
      onReject: 'reject',
      onTimeout: 'cancel'
    },
    requiredDocuments: [] as string[],
    inspectionChecklist: [] as string[],
    paymentDetails: {
      amount: '',
      currency: 'KES',
      paymentMethods: [] as string[]
    }
  })
  const [formData, setFormData] = useState<CreateLicenseRequest>({
    name: '',
    description: '',
    category: 'PERMIT_AND_LICENSE',
    type: 'MILLERS',
    issuingAuthority: '',
    cost: 0,
    validityPeriod: 12,
    renewalPeriod: 12,
    processingTime: '',
    renewalRequired: true,
    isDigital: true,
    onlineApplication: true
  })

  // Fetch licenses data
  const { data: licensesData, isLoading: licensesLoading, error: licensesError } = useLicenses(1, 10)
  const licenseStats = useLicenseStats()
  const createLicenseMutation = useCreateLicense()
  const updateLicenseMutation = useUpdateLicense()
  const deleteLicenseMutation = useDeleteLicense()
  
  // Form builder hooks
  const bulkCreateLicenseFieldsMutation = useBulkCreateLicenseFields()
  const { data: existingFields, isLoading: fieldsLoading, refetch: refetchFields } = useLicenseFieldsByLicense(selectedLicenseForForm || '')
  
  // Workflow templates hooks
  const createWorkflowTemplateMutation = useCreateWorkflowTemplate()
  const updateWorkflowTemplateMutation = useUpdateWorkflowTemplate()
  const deleteWorkflowTemplateMutation = useDeleteWorkflowTemplate()
  const { data: templatesData, isLoading: templatesLoading } = useWorkflowTemplates(1, 100)
  const { departments, isLoading: departmentsLoading } = useDepartments()

  const handleInputChange = (field: keyof CreateLicenseRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Workflow form handling
  const handleWorkflowInputChange = (field: string, value: any) => {
    setWorkflowFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleStepInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setStepFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }))
    } else {
      setStepFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const generateStepId = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '')
  }

  const handleCreateStep = () => {
    setIsCreatingStep(true)
    setEditingStep(null)
    setStepFormData({
      id: '',
      name: '',
      description: '',
      type: 'REVIEW',
      assignedDepartment: departments.length > 0 ? departments[0].name : 'Committee',
      assignmentMethod: 'HEAD_ASSIGNMENT',
      timeout: '1 day',
      nextSteps: [],
      conditions: {
        onComplete: '',
        onReject: 'reject',
        onTimeout: 'cancel'
      },
      requiredDocuments: [],
      inspectionChecklist: [],
      paymentDetails: {
        amount: '',
        currency: 'KES',
        paymentMethods: []
      }
    })
  }

  const handleEditStep = (step: any) => {
    setEditingStep(step)
    setIsCreatingStep(true)
    setStepFormData({
      id: step.id,
      name: step.name,
      description: step.description || '',
      type: step.type,
      assignedDepartment: step.assignedDepartment,
      assignmentMethod: step.assignmentMethod,
      timeout: step.timeout,
      nextSteps: step.nextSteps || [],
      conditions: step.conditions || {
        onComplete: '',
        onReject: 'reject',
        onTimeout: 'cancel'
      },
      requiredDocuments: step.requiredDocuments || [],
      inspectionChecklist: step.inspectionChecklist || [],
      paymentDetails: step.paymentDetails || {
        amount: '',
        currency: 'KES',
        paymentMethods: []
      }
    })
  }

  const handleSaveStep = () => {
    if (!stepFormData.name || !stepFormData.type || !stepFormData.assignedDepartment) {
      alert('Step name, type, and assigned department are required')
      return
    }

    const stepId = stepFormData.id || generateStepId(stepFormData.name)
    const newStep: any = {
      id: stepId,
      name: stepFormData.name,
      description: stepFormData.description,
      type: stepFormData.type as any,
      assignedDepartment: stepFormData.assignedDepartment,
      assignmentMethod: stepFormData.assignmentMethod,
      timeout: stepFormData.timeout,
      nextSteps: stepFormData.nextSteps,
      conditions: stepFormData.conditions,
      ...(stepFormData.requiredDocuments.length > 0 && { requiredDocuments: stepFormData.requiredDocuments }),
      ...(stepFormData.inspectionChecklist.length > 0 && { inspectionChecklist: stepFormData.inspectionChecklist }),
      ...(stepFormData.type === 'PAYMENT' && { paymentDetails: stepFormData.paymentDetails })
    }

    let updatedSteps
    if (editingStep) {
      // Update existing step
      updatedSteps = workflowSteps.map(step => 
        step.id === editingStep.id ? newStep : step
      )
    } else {
      // Add new step
      updatedSteps = [...workflowSteps, newStep]
    }

    setWorkflowSteps(updatedSteps)
    setIsCreatingStep(false)
    setEditingStep(null)
  }

  const handleDeleteStep = (stepId: string) => {
    if (confirm('Are you sure you want to delete this step?')) {
      setWorkflowSteps(prev => prev.filter(step => step.id !== stepId))
    }
  }

  const handleMoveStep = (stepId: string, direction: 'up' | 'down') => {
    const currentIndex = workflowSteps.findIndex(step => step.id === stepId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= workflowSteps.length) return

    const updatedSteps = [...workflowSteps]
    const [movedStep] = updatedSteps.splice(currentIndex, 1)
    updatedSteps.splice(newIndex, 0, movedStep)

    setWorkflowSteps(updatedSteps)
  }

  const handleCancelStepEdit = () => {
    setIsCreatingStep(false)
    setEditingStep(null)
  }

  const handleUsePredefinedTemplate = (templateKey: keyof typeof predefinedTemplates) => {
    const predefined = predefinedTemplates[templateKey]
    
    // Map predefined template steps to use available departments
    const mappedSteps = predefined.steps.map(step => {
      // Find a matching department or use the first available one
      const matchingDept = departments.find(dept => 
        dept.name.toLowerCase().includes(step.assignedDepartment.toLowerCase()) ||
        step.assignedDepartment.toLowerCase().includes(dept.name.toLowerCase())
      )
      
      const assignedDepartment = matchingDept 
        ? matchingDept.name 
        : (departments.length > 0 ? departments[0].name : step.assignedDepartment)
      
      return {
        ...step,
        assignedDepartment
      }
    })
    
    setWorkflowFormData({
      name: predefined.name,
      description: predefined.description,
      licenseType: predefined.licenseType,
      licenseCategory: predefined.licenseCategory,
      licenseid: predefined.licenseid || '',
      isActive: true
    })
    setWorkflowSteps(mappedSteps)
  }

  // Handle starting to edit a license
  const handleStartEditLicense = (license: License) => {
    setEditingLicense(license)
    setFormData({
      name: license.name,
      description: license.description,
      category: license.category,
      type: license.type,
      issuingAuthority: license.issuingAuthority,
      cost: typeof license.cost === 'string' ? parseFloat(license.cost) : license.cost,
      validityPeriod: license.validityPeriod,
      renewalPeriod: license.renewalPeriod,
      processingTime: license.processingTime,
      renewalRequired: license.renewalRequired,
      isDigital: license.isDigital,
      onlineApplication: license.onlineApplication
    })
    setCurrentView('editLicense')
  }

  // Handle deleting a license
  const handleDeleteLicense = async (licenseId: string) => {
    if (!confirm('Are you sure you want to delete this license? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteLicenseMutation.mutateAsync(licenseId)
      alert('License deleted successfully')
    } catch (error) {
      console.error('Error deleting license:', error)
      alert('Error deleting license')
    } finally {
      setIsDeleting(false)
    }
  }

  // Handle form builder actions
  const handleCreateForm = (licenseId: string) => {
    setSelectedLicenseForForm(licenseId)
    setCurrentView('formBuilder')
  }

  const handleCreateWorkflow = (licenseId: string) => {
    setSelectedLicenseForForm(licenseId)
    setCurrentView('workflowTemplates')
  }

  // Form field management functions
  const handleFieldInputChange = (field: string, value: any) => {
    setFieldFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreateField = () => {
    setFieldFormData({
      name: '',
      label: '',
      type: 'TEXT',
      required: false,
      placeholder: '',
      description: '',
      options: []
    })
    setEditingField(null)
    setIsCreatingField(true)
  }

  const handleEditField = (field: any) => {
    setFieldFormData({
      name: field.name,
      label: field.label,
      type: field.type,
      required: field.required,
      placeholder: field.placeholder || '',
      description: field.description || '',
      options: field.options || []
    })
    setEditingField(field)
    setIsCreatingField(true)
  }

  const handleSaveField = () => {
    if (!fieldFormData.name || !fieldFormData.label || !fieldFormData.type) {
      alert('Field name, label, and type are required')
      return
    }

    const fieldData = {
      id: editingField?.id || `field-${Date.now()}`,
      name: fieldFormData.name,
      label: fieldFormData.label,
      type: fieldFormData.type,
      required: fieldFormData.required,
      placeholder: fieldFormData.placeholder,
      description: fieldFormData.description,
      options: fieldFormData.options,
      order: editingField ? editingField.order : formFields.length
    }

    if (editingField) {
      setFormFields(prev => prev.map(f => f.id === editingField.id ? fieldData : f))
    } else {
      setFormFields(prev => [...prev, fieldData])
    }

    setIsCreatingField(false)
    setEditingField(null)
  }

  const handleDeleteField = (fieldId: string) => {
    setFormFields(prev => prev.filter(f => f.id !== fieldId))
  }

  const handleMoveField = (fieldId: string, direction: 'up' | 'down') => {
    const currentIndex = formFields.findIndex(f => f.id === fieldId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= formFields.length) return

    const newFields = [...formFields]
    const temp = newFields[currentIndex]
    newFields[currentIndex] = newFields[newIndex]
    newFields[newIndex] = temp
    setFormFields(newFields)
  }

  const handleAddOption = () => {
    if (newOption.value && newOption.label) {
      setFieldFormData(prev => ({
        ...prev,
        options: [...(prev.options || []), { value: newOption.value, label: newOption.label }]
      }))
      setNewOption({ value: '', label: '' })
    }
  }

  const handleRemoveOption = (index: number) => {
    setFieldFormData(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index) || []
    }))
  }

  const getFieldTypeInfo = (type: string) => {
    return fieldTypes.find(ft => ft.value === type) || fieldTypes[0]
  }

  // Load existing fields when form builder is opened
  useEffect(() => {
    if (currentView === 'formBuilder' && selectedLicenseForForm && existingFields?.data) {
      setFormFields(existingFields.data)
    }
  }, [currentView, selectedLicenseForForm, existingFields])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.description || !formData.issuingAuthority || !formData.processingTime) {
      alert('Name, Description, Issuing Authority, and Processing Time are required')
      return
    }

    setIsSubmitting(true)
    createLicenseMutation.mutate(formData)
  }

  // Handle editing a license
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editingLicense) return
    
    if (!formData.name || !formData.description || !formData.issuingAuthority || !formData.processingTime) {
      alert('Name, Description, Issuing Authority, and Processing Time are required')
      return
    }

    setIsSubmittingEdit(true)
    try {
      await updateLicenseMutation.mutateAsync({
        id: editingLicense.id,
        data: formData
      })
      alert('License updated successfully')
      setCurrentView('main')
      setEditingLicense(null)
    } catch (error) {
      console.error('Error updating license:', error)
      alert('Error updating license')
    } finally {
      setIsSubmittingEdit(false)
    }
  }

  // Handle when a license is selected for editing
  useEffect(() => {
    if (selectedLicense && open) {
      setEditingLicense(selectedLicense)
      setFormData({
        name: selectedLicense.name,
        description: selectedLicense.description,
        category: selectedLicense.category,
        type: selectedLicense.type,
        issuingAuthority: selectedLicense.issuingAuthority,
        cost: typeof selectedLicense.cost === 'string' ? parseFloat(selectedLicense.cost) : selectedLicense.cost,
        validityPeriod: selectedLicense.validityPeriod,
        renewalPeriod: selectedLicense.renewalPeriod,
        processingTime: selectedLicense.processingTime,
        renewalRequired: selectedLicense.renewalRequired,
        isDigital: selectedLicense.isDigital,
        onlineApplication: selectedLicense.onlineApplication
      })
      setCurrentView('editLicense')
    } else if (!selectedLicense && open) {
      // Reset to main view when no license is selected
      setCurrentView('main')
      setEditingLicense(null)
    }
  }, [selectedLicense, open])

  // Handle successful license creation
  useEffect(() => {
    if (isSubmitting && !createLicenseMutation.isPending && !createLicenseMutation.error) {
      // License was created successfully
      setFormData({
        name: '',
        description: '',
        category: 'PERMIT_AND_LICENSE',
        type: 'MILLERS',
        issuingAuthority: '',
        cost: 0,
        validityPeriod: 12,
        renewalPeriod: 12,
        processingTime: '',
        renewalRequired: true,
        isDigital: true,
        onlineApplication: true
      })
      setCurrentView('main')
      setIsSubmitting(false)
    } else if (isSubmitting && !createLicenseMutation.isPending && createLicenseMutation.error) {
      // There was an error, reset submitting state
      setIsSubmitting(false)
    }
  }, [isSubmitting, createLicenseMutation.isPending, createLicenseMutation.error])

  // Reset form and go back to main view
  const handleBackToMain = () => {
    setCurrentView('main')
    setEditingLicense(null)
    setSelectedLicenseForForm(null)
    setFormFields([])
    setWorkflowSteps([])
    setIsCreatingField(false)
    setEditingField(null)
    setFieldFormData({
      name: '',
      label: '',
      type: 'TEXT',
      required: false,
      placeholder: '',
      description: '',
      options: []
    })
    setNewOption({ value: '', label: '' })
    setFormData({
      name: '',
      description: '',
      category: 'PERMIT_AND_LICENSE',
      type: 'MILLERS',
      issuingAuthority: '',
      cost: 0,
      validityPeriod: 12,
      renewalPeriod: 12,
      processingTime: '',
      renewalRequired: true,
      isDigital: true,
      onlineApplication: true
    })
  }

  // Handle modal close
  const handleModalClose = (isOpen: boolean) => {
    if (!isOpen) {
      setCurrentView('main')
      setEditingLicense(null)
      setSelectedLicenseForForm(null)
      setFormFields([])
      setWorkflowSteps([])
      setIsCreatingField(false)
      setEditingField(null)
      setFieldFormData({
        name: '',
        label: '',
        type: 'TEXT',
        required: false,
        placeholder: '',
        description: '',
        options: []
      })
      setNewOption({ value: '', label: '' })
      setFormData({
        name: '',
        description: '',
        category: 'PERMIT_AND_LICENSE',
        type: 'MILLERS',
        issuingAuthority: '',
        cost: 0,
        validityPeriod: 12,
        renewalPeriod: 12,
        processingTime: '',
        renewalRequired: true,
        isDigital: true,
        onlineApplication: true
      })
    }
    onOpenChange(isOpen)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "EXPIRED":
        return "bg-red-100 text-red-800"
      case "SUSPENDED":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "PENDING":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "EXPIRED":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "SUSPENDED":
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
      default:
        return <FileCheck className="h-4 w-4 text-gray-600" />
    }
  }

  if (licensesLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileCheck className="h-6 w-6 text-green-600" />
              License Management
            </DialogTitle>
            <DialogDescription>
              Manage and approve license applications
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Clock className="h-8 w-8 animate-spin mx-auto mb-2 text-green-600" />
              <p className="text-gray-600">Loading licenses...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (licensesError) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileCheck className="h-6 w-6 text-green-600" />
              License Management
            </DialogTitle>
            <DialogDescription>
              Manage and approve license applications
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
              <p className="text-red-600">Error loading licenses</p>
              <p className="text-sm text-gray-500 mt-1">Please try again later</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-green-600" />
            License Management
          </DialogTitle>
          <DialogDescription>
            Manage and approve license applications
          </DialogDescription>
        </DialogHeader>
        
        {currentView === 'main' ? (
          <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Licenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">{licenseStats.total}</div>
                <p className="text-xs text-gray-500">All license types</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Active Licenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">{licenseStats.active}</div>
                <p className="text-xs text-gray-500">Currently valid</p>
              </CardContent>
            </Card>
           
           
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button onClick={() => setCurrentView('createLicense')}>
              <Plus className="h-4 w-4 mr-2" />
              Create License
            </Button>
            <Button variant="outline" onClick={() => setCurrentView('workflowTemplates')}>
              <Workflow className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Review Applications
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

          {/* Licenses Table */}
          <Card>
            <CardHeader>
              <CardTitle> Licenses, Permits & Letters</CardTitle>
             </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>License</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Forms</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {licensesData?.data?.slice(0, 5).map((license) => (
                      <TableRow key={license.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              {getStatusIcon(license.status)}
                            </div>
                            <div>
                              <div className="font-medium">{license.name}</div>
                              <div className="text-sm text-gray-500">{license.issuingAuthority}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{license.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(license.status)}>
                            {license.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">KSh {typeof license.cost === 'string' ? parseInt(license.cost).toLocaleString() : license.cost.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">{license.processingTime}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-medium">{license._count?.applications || 0}</div>
                            <div className="text-sm text-gray-500">Applications</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <LicenseFormStatus licenseId={license.id} />
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(license.createdAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleStartEditLicense(license)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCreateForm(license.id)}>
                                <Form className="h-4 w-4 mr-2" />
                                Create Form
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCreateWorkflow(license.id)}>
                                <Workflow className="h-4 w-4 mr-2" />
                                Create Workflow
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteLicense(license.id)}
                                className="text-red-600"
                                disabled={isDeleting || deleteLicenseMutation.isPending}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                {deleteLicenseMutation.isPending ? 'Deleting...' : 'Delete'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {licensesData?.data && licensesData.data.length > 5 && (
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    View All Licenses
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          </div>
        ) : currentView === 'createLicense' ? (
          // Create License View
          <div className="space-y-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToMain}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Licenses
            </Button>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Create New License</h3>
                <p className="text-sm text-gray-600">Create a new license or permit for stakeholders</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">License Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter license name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">License Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    {licenseTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter license description"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cost">Cost (KSh)</Label>
                <Input
                  id="cost"
                  type="number"
                  value={formData.cost}
                  onChange={(e) => handleInputChange('cost', parseFloat(e.target.value) || 0)}
                  placeholder="Enter cost"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="validityPeriod">Validity Period (months)</Label>
                <Input
                  id="validityPeriod"
                  type="number"
                  value={formData.validityPeriod}
                  onChange={(e) => handleInputChange('validityPeriod', parseInt(e.target.value) || 12)}
                  placeholder="Enter validity period"
                  required
                />
              </div>
              <div>
                <Label htmlFor="renewalPeriod">Renewal Period (months)</Label>
                <Input
                  id="renewalPeriod"
                  type="number"
                  value={formData.renewalPeriod}
                  onChange={(e) => handleInputChange('renewalPeriod', parseInt(e.target.value) || 12)}
                  placeholder="Enter renewal period"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="issuingAuthority">Issuing Authority</Label>
              <Input
                id="issuingAuthority"
                value={formData.issuingAuthority}
                onChange={(e) => handleInputChange('issuingAuthority', e.target.value)}
                placeholder="Enter issuing authority"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="processingTime">Processing Time</Label>
              <Input
                id="processingTime"
                value={formData.processingTime}
                onChange={(e) => handleInputChange('processingTime', e.target.value)}
                placeholder="e.g., 5-10 business days"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="renewalRequired"
                  checked={formData.renewalRequired}
                  onChange={(e) => handleInputChange('renewalRequired', e.target.checked)}
                />
                <Label htmlFor="renewalRequired">Renewal Required</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDigital"
                  checked={formData.isDigital}
                  onChange={(e) => handleInputChange('isDigital', e.target.checked)}
                />
                <Label htmlFor="isDigital">Digital License</Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="onlineApplication"
                checked={formData.onlineApplication}
                onChange={(e) => handleInputChange('onlineApplication', e.target.checked)}
              />
              <Label htmlFor="onlineApplication">Online Application Available</Label>
            </div>
            
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleBackToMain}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting || createLicenseMutation.isPending}>
                    {isSubmitting || createLicenseMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create License'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : currentView === 'editLicense' ? (
          // Edit License View
          <div className="space-y-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToMain}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Licenses
            </Button>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Edit License</h3>
                <p className="text-sm text-gray-600">Update license information</p>
              </div>
              
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">License Name</Label>
                    <Input
                      id="edit-name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter license name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-type">License Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select license type" />
                      </SelectTrigger>
                      <SelectContent>
                        {licenseTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter license description"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-cost">Cost (KSh)</Label>
                    <Input
                      id="edit-cost"
                      type="number"
                      value={formData.cost}
                      onChange={(e) => handleInputChange('cost', parseFloat(e.target.value) || 0)}
                      placeholder="Enter cost"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-validityPeriod">Validity Period (months)</Label>
                    <Input
                      id="edit-validityPeriod"
                      type="number"
                      value={formData.validityPeriod}
                      onChange={(e) => handleInputChange('validityPeriod', parseInt(e.target.value) || 12)}
                      placeholder="Enter validity period"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-renewalPeriod">Renewal Period (months)</Label>
                    <Input
                      id="edit-renewalPeriod"
                      type="number"
                      value={formData.renewalPeriod}
                      onChange={(e) => handleInputChange('renewalPeriod', parseInt(e.target.value) || 12)}
                      placeholder="Enter renewal period"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="edit-issuingAuthority">Issuing Authority</Label>
                  <Input
                    id="edit-issuingAuthority"
                    value={formData.issuingAuthority}
                    onChange={(e) => handleInputChange('issuingAuthority', e.target.value)}
                    placeholder="Enter issuing authority"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-processingTime">Processing Time</Label>
                  <Input
                    id="edit-processingTime"
                    value={formData.processingTime}
                    onChange={(e) => handleInputChange('processingTime', e.target.value)}
                    placeholder="e.g., 5-10 business days"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="edit-renewalRequired"
                      checked={formData.renewalRequired}
                      onChange={(e) => handleInputChange('renewalRequired', e.target.checked)}
                    />
                    <Label htmlFor="edit-renewalRequired">Renewal Required</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="edit-isDigital"
                      checked={formData.isDigital}
                      onChange={(e) => handleInputChange('isDigital', e.target.checked)}
                    />
                    <Label htmlFor="edit-isDigital">Digital License</Label>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-onlineApplication"
                    checked={formData.onlineApplication}
                    onChange={(e) => handleInputChange('onlineApplication', e.target.checked)}
                  />
                  <Label htmlFor="edit-onlineApplication">Online Application Available</Label>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleBackToMain}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmittingEdit || updateLicenseMutation.isPending}>
                    {isSubmittingEdit || updateLicenseMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update License'
                    )}
                  </Button>
                </div>
              </form>
          </div>
        </div>
        ) : currentView === 'formBuilder' ? (
          // Form Builder View
          <div className="space-y-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToMain}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Licenses
            </Button>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    Create Form for {licensesData?.data?.find(l => l.id === selectedLicenseForForm)?.name || 'License'}
                  </h3>
                  <p className="text-sm text-gray-600">Build a dynamic form with custom fields</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetchFields()}
                  disabled={fieldsLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${fieldsLoading ? 'animate-spin' : ''}`} />
                  Refresh Fields
                </Button>
              </div>
              
              {/* Field Types Palette */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Field Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {fieldTypes.map((fieldType) => {
                      const IconComponent = fieldType.icon
                      return (
                        <button
                          key={fieldType.value}
                          type="button"
                          className="p-3 border rounded-lg cursor-pointer hover:shadow-md transition-shadow w-full text-left"
                          onClick={() => {
                            setFieldFormData(prev => ({ ...prev, type: fieldType.value }))
                            handleCreateField()
                          }}
                          aria-label={`Add ${fieldType.label} field`}
                        >
                          <div className="flex flex-col items-center text-center space-y-2">
                            <div className={`p-2 rounded-full ${fieldType.color}`}>
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{fieldType.label}</div>
                              <div className="text-xs text-gray-500">{fieldType.description}</div>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
              
              {/* Form Fields List */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      Form Fields ({formFields.length})
                      {existingFields?.data && existingFields.data.length > 0 && (
                        <span className="text-sm font-normal text-gray-500 ml-2">
                          ({existingFields.data.length} existing)
                        </span>
                      )}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCreateField}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Field
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {(() => {
                    if (fieldsLoading) {
                      return (
                        <div className="text-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-gray-600" />
                          <p className="text-sm text-gray-500">Loading existing fields...</p>
                        </div>
                      )
                    }
                    
                    if (formFields.length === 0) {
                      return (
                        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                          <p className="text-sm text-gray-500 mb-3">No fields added yet</p>
                          <p className="text-xs text-gray-400">
                            Click on a field type above or "Add Field" to get started
                          </p>
                        </div>
                      )
                    }
                    
                    return (
                    <div className="space-y-2">
                      {formFields.map((field, index) => {
                        const fieldTypeInfo = getFieldTypeInfo(field.type)
                        const IconComponent = fieldTypeInfo.icon
                        const isExistingField = existingFields?.data?.some((ef: any) => ef.id === field.id)
                        return (
                          <Card key={field.id} className={`p-3 ${isExistingField ? 'bg-blue-50 border-blue-200' : ''}`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <GripVertical className="h-4 w-4 text-gray-400" />
                                <div className={`p-1 rounded ${fieldTypeInfo.color}`}>
                                  <IconComponent className="h-3 w-3" />
                                </div>
                                <div>
                                  <div className="font-medium flex items-center gap-2">
                                    {field.label}
                                    {isExistingField && (
                                      <Badge variant="secondary" className="text-xs">
                                        Existing
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {field.name} • {fieldTypeInfo.label}
                                    {field.required && <span className="text-red-500 ml-1">*</span>}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMoveField(field.id, 'up')}
                                  disabled={index === 0}
                                >
                                  <ArrowUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMoveField(field.id, 'down')}
                                  disabled={index === formFields.length - 1}
                                >
                                  <ArrowDown className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditField(field)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteField(field.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              </div>
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                    )
                  })()}
                </CardContent>
              </Card>
              
              {/* Field Creation/Edit Form */}
              {isCreatingField && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        {editingField ? 'Edit Field' : 'Create New Field'}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCreatingField(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="field-name">Field Name *</Label>
                        <Input
                          id="field-name"
                          value={fieldFormData.name || ''}
                          onChange={(e) => handleFieldInputChange('name', e.target.value)}
                          placeholder="e.g., company_name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="field-type">Field Type *</Label>
                        <Select 
                          value={fieldFormData.type} 
                          onValueChange={(value) => handleFieldInputChange('type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select field type" />
                          </SelectTrigger>
                          <SelectContent>
                            {fieldTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center gap-2">
                                  <type.icon className="h-4 w-4" />
                                  {type.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="field-label">Display Label *</Label>
                      <Input
                        id="field-label"
                        value={fieldFormData.label || ''}
                        onChange={(e) => handleFieldInputChange('label', e.target.value)}
                        placeholder="e.g., Company Name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="field-description">Description</Label>
                      <Textarea
                        id="field-description"
                        value={fieldFormData.description || ''}
                        onChange={(e) => handleFieldInputChange('description', e.target.value)}
                        placeholder="Field description (optional)"
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="field-placeholder">Placeholder</Label>
                      <Input
                        id="field-placeholder"
                        value={fieldFormData.placeholder || ''}
                        onChange={(e) => handleFieldInputChange('placeholder', e.target.value)}
                        placeholder="Placeholder text"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="field-required"
                        checked={fieldFormData.required || false}
                        onCheckedChange={(checked) => handleFieldInputChange('required', checked)}
                      />
                      <Label htmlFor="field-required">Required Field</Label>
                    </div>
                    
                    {/* Options for field types that require them */}
                    {fieldTypes.find(ft => ft.value === fieldFormData.type)?.requiresOptions && (
                      <div className="space-y-3">
                        <Label>Options</Label>
                        <div className="space-y-2">
                          {fieldFormData.options?.map((option, index) => (
                            <div key={`${option.value}-${index}`} className="flex items-center gap-2">
                              <Input
                                value={option.value}
                                onChange={(e) => {
                                  const newOptions = [...(fieldFormData.options || [])]
                                  newOptions[index].value = e.target.value
                                  handleFieldInputChange('options', newOptions)
                                }}
                                placeholder="Value"
                                className="flex-1"
                              />
                              <Input
                                value={option.label}
                                onChange={(e) => {
                                  const newOptions = [...(fieldFormData.options || [])]
                                  newOptions[index].label = e.target.value
                                  handleFieldInputChange('options', newOptions)
                                }}
                                placeholder="Label"
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveOption(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <div className="flex items-center gap-2">
                            <Input
                              value={newOption.value}
                              onChange={(e) => setNewOption(prev => ({ ...prev, value: e.target.value }))}
                              placeholder="Value"
                              className="flex-1"
                            />
                            <Input
                              value={newOption.label}
                              onChange={(e) => setNewOption(prev => ({ ...prev, label: e.target.value }))}
                              placeholder="Label"
                              className="flex-1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleAddOption}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsCreatingField(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveField}>
                        <Save className="h-4 w-4 mr-1" />
                        {editingField ? 'Update Field' : 'Add Field'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={handleBackToMain}>
                  Cancel
                </Button>
                <Button 
                  onClick={async () => {
                    if (formFields.length === 0) {
                      alert('Please add at least one field to the form')
                      return
                    }
                    
                    try {
                      await bulkCreateLicenseFieldsMutation.mutateAsync({
                        licenseId: selectedLicenseForForm!,
                        fieldsData: {
                          fields: formFields.map(field => ({
                            name: field.name,
                            label: field.label,
                            type: field.type,
                            required: field.required,
                            placeholder: field.placeholder,
                            options: field.options,
                            order: field.order
                          }))
                        }
                      })
                      alert('Form created successfully')
                      refetchFields() // Refresh the fields list
                      handleBackToMain()
                    } catch (error) {
                      console.error('Error creating form:', error)
                      alert('Error creating form')
                    }
                  }}
                  disabled={bulkCreateLicenseFieldsMutation.isPending}
                >
                  {bulkCreateLicenseFieldsMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating Form...
                    </>
                  ) : (
                    'Create Form'
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : currentView === 'workflowTemplates' ? (
          // Workflow Templates View
          <div className="space-y-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToMain}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Licenses
            </Button>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Create Workflow Template</h3>
                <p className="text-sm text-gray-600">Create approval workflows for license applications</p>
              </div>
              
              {/* Predefined Templates */}
                <Card>
                  <CardHeader>
                  <CardTitle className="text-sm">Quick Start Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Button
                          variant="outline"
                      onClick={() => handleUsePredefinedTemplate('millers')}
                      className="h-auto p-4 flex flex-col items-start"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Workflow className="h-4 w-4" />
                        <span className="font-medium">Millers License</span>
                      </div>
                      <span className="text-xs text-gray-500 text-left">
                        Complete workflow for millers license applications
                      </span>
                        </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleUsePredefinedTemplate('whiteSugar')}
                      className="h-auto p-4 flex flex-col items-start"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Workflow className="h-4 w-4" />
                        <span className="font-medium">White Sugar License</span>
                      </div>
                      <span className="text-xs text-gray-500 text-left">
                        Workflow for white sugar license applications
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleUsePredefinedTemplate('registration')}
                      className="h-auto p-4 flex flex-col items-start"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Workflow className="h-4 w-4" />
                        <span className="font-medium">Registration</span>
                      </div>
                      <span className="text-xs text-gray-500 text-left">
                        Simple registration workflow
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Workflow Template Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Workflow Template Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="workflow-name">Template Name</Label>
                      <Input
                        id="workflow-name"
                        value={workflowFormData.name}
                        onChange={(e) => handleWorkflowInputChange('name', e.target.value)}
                        placeholder="Enter template name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="workflow-licenseType">License Type</Label>
                      <Select 
                        value={workflowFormData.licenseType} 
                        onValueChange={(value) => handleWorkflowInputChange('licenseType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select license type" />
                        </SelectTrigger>
                        <SelectContent>
                          {licenseTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="workflow-description">Description</Label>
                    <Textarea
                      id="workflow-description"
                      value={workflowFormData.description}
                      onChange={(e) => handleWorkflowInputChange('description', e.target.value)}
                      placeholder="Enter template description"
                      rows={2}
                    />
                    </div>
                  </CardContent>
                </Card>

              {/* Workflow Steps Management */}
                <Card>
                  <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Workflow Steps</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{workflowSteps.length} steps</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCreateStep}
                        disabled={isCreatingStep}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Step
                      </Button>
                    </div>
                  </div>
                  </CardHeader>
                  <CardContent>
                      {workflowSteps.length === 0 ? (
                    <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                      <Workflow className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-3">No workflow steps defined</p>
                      <p className="text-xs text-gray-400">
                        Use predefined templates above for quick setup, or add steps manually
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {workflowSteps.map((step, index) => (
                        <Card key={step.id} className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-medium">{index + 1}. {step.name}</div>
                              <div className="text-sm text-gray-500">{step.description}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">{step.type}</Badge>
                                <Badge variant="outline" className="text-xs">{step.assignedDepartment}</Badge>
                                <Badge variant="outline" className="text-xs">{step.timeout}</Badge>
                              </div>
                              {step.conditions && (
                                <div className="mt-2 text-xs text-gray-400">
                                  <span className="font-medium">Conditions:</span>
                                  {step.conditions.onComplete && (
                                    <span className="ml-1">Complete→{step.conditions.onComplete}</span>
                                  )}
                                  {step.conditions.onReject && (
                                    <span className="ml-1">Reject→{step.conditions.onReject}</span>
                                  )}
                                  {step.conditions.onTimeout && (
                                    <span className="ml-1">Timeout→{step.conditions.onTimeout}</span>
                                  )}
                                </div>
                              )}
                              {step.requiredDocuments && step.requiredDocuments.length > 0 && (
                                <div className="mt-1 text-xs text-gray-400">
                                  <span className="font-medium">Documents:</span>
                                  <span className="ml-1">{step.requiredDocuments.length} required</span>
                                </div>
                              )}
                              {step.inspectionChecklist && step.inspectionChecklist.length > 0 && (
                                <div className="mt-1 text-xs text-gray-400">
                                  <span className="font-medium">Checklist:</span>
                                  <span className="ml-1">{step.inspectionChecklist.length} items</span>
                                </div>
                              )}
                              {step.paymentDetails?.amount && (
                                <div className="mt-1 text-xs text-gray-400">
                                  <span className="font-medium">Payment:</span>
                                  <span className="ml-1">{step.paymentDetails.amount} {step.paymentDetails.currency}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                onClick={() => handleMoveStep(step.id, 'up')}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                onClick={() => handleMoveStep(step.id, 'down')}
                                disabled={index === workflowSteps.length - 1}
                              >
                                <ArrowDown className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                onClick={() => handleEditStep(step)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteStep(step.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                        </Card>
                      ))}
                            </div>
                  )}
                </CardContent>
              </Card>

              {/* Step Creation/Edit Form */}
              {isCreatingStep && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">
                        {editingStep ? 'Edit Step' : 'Create New Step'}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancelStepEdit}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                          </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="step-name">Step Name *</Label>
                          <Input
                            id="step-name"
                            value={stepFormData.name}
                            onChange={(e) => handleStepInputChange('name', e.target.value)}
                            placeholder="Enter step name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="step-type">Step Type *</Label>
                          <Select 
                            value={stepFormData.type} 
                            onValueChange={(value) => handleStepInputChange('type', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select step type" />
                            </SelectTrigger>
                            <SelectContent>
                              {stepTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="step-description">Description</Label>
                        <Textarea
                          id="step-description"
                          value={stepFormData.description}
                          onChange={(e) => handleStepInputChange('description', e.target.value)}
                          placeholder="Enter step description"
                          rows={2}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="step-department">Assigned Department *</Label>
                          <Select 
                            value={stepFormData.assignedDepartment} 
                            onValueChange={(value) => handleStepInputChange('assignedDepartment', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departmentsLoading ? (
                                <SelectItem value="" disabled>
                                  <div className="flex items-center">
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Loading departments...
                                  </div>
                                </SelectItem>
                              ) : (
                                departments.map(dept => (
                                  <SelectItem key={dept.id} value={dept.name}>
                                    <div className="flex flex-col">
                                      <span className="font-medium">{dept.name}</span>
                                      <span className="text-xs text-gray-500">{dept.departmentCode}</span>
                                    </div>
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="step-assignment">Assignment Method</Label>
                          <Select 
                            value={stepFormData.assignmentMethod} 
                            onValueChange={(value) => handleStepInputChange('assignmentMethod', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                              {assignmentMethods.map(method => (
                                <SelectItem key={method.value} value={method.value}>
                                  {method.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="step-timeout">Timeout</Label>
                          <Input
                            id="step-timeout"
                            value={stepFormData.timeout}
                            onChange={(e) => handleStepInputChange('timeout', e.target.value)}
                            placeholder="e.g., 2 days"
                          />
                        </div>
                      </div>

                      {/* Conditions */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Step Conditions</Label>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <Label htmlFor="on-complete" className="text-xs">On Complete</Label>
                            <Input
                              id="on-complete"
                              value={stepFormData.conditions.onComplete}
                              onChange={(e) => handleStepInputChange('conditions.onComplete', e.target.value)}
                              placeholder="Next step ID or 'complete'"
                            />
                          </div>
                          <div>
                            <Label htmlFor="on-reject" className="text-xs">On Reject</Label>
                            <Input
                              id="on-reject"
                              value={stepFormData.conditions.onReject}
                              onChange={(e) => handleStepInputChange('conditions.onReject', e.target.value)}
                              placeholder="'reject' or step ID"
                            />
                          </div>
                          <div>
                            <Label htmlFor="on-timeout" className="text-xs">On Timeout</Label>
                            <Input
                              id="on-timeout"
                              value={stepFormData.conditions.onTimeout}
                              onChange={(e) => handleStepInputChange('conditions.onTimeout', e.target.value)}
                              placeholder="'cancel' or step ID"
                            />
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          <p><strong>On Complete:</strong> What happens when this step is successfully completed</p>
                          <p><strong>On Reject:</strong> What happens when this step is rejected</p>
                          <p><strong>On Timeout:</strong> What happens when this step times out</p>
                        </div>
                      </div>

                      {/* Payment Details (only for PAYMENT type) */}
                      {stepFormData.type === 'PAYMENT' && (
                        <div className="p-3 bg-blue-50 rounded-md">
                          <Label className="text-sm font-medium">Payment Details</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div>
                              <Label htmlFor="payment-amount" className="text-xs">Amount</Label>
                              <Input
                                id="payment-amount"
                                value={stepFormData.paymentDetails.amount}
                                onChange={(e) => handleStepInputChange('paymentDetails.amount', e.target.value)}
                                placeholder="e.g., KES 10,000"
                              />
                            </div>
                            <div>
                              <Label htmlFor="payment-currency" className="text-xs">Currency</Label>
                              <Input
                                id="payment-currency"
                                value={stepFormData.paymentDetails.currency}
                                onChange={(e) => handleStepInputChange('paymentDetails.currency', e.target.value)}
                                placeholder="KES"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Required Documents (for REVIEW and DOCUMENT_VERIFICATION types) */}
                      {(stepFormData.type === 'REVIEW' || stepFormData.type === 'DOCUMENT_VERIFICATION') && (
                        <div className="p-3 bg-green-50 rounded-md">
                          <Label className="text-sm font-medium">Required Documents</Label>
                          <div className="mt-2 space-y-2">
                            {stepFormData.requiredDocuments.map((doc, index) => (
                              <div key={`doc-${index}-${doc}`} className="flex items-center gap-2">
                                <Input
                                  value={doc}
                                  onChange={(e) => {
                                    const newDocs = [...stepFormData.requiredDocuments]
                                    newDocs[index] = e.target.value
                                    handleStepInputChange('requiredDocuments', newDocs)
                                  }}
                                  placeholder="Document name"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newDocs = stepFormData.requiredDocuments.filter((_, i) => i !== index)
                                    handleStepInputChange('requiredDocuments', newDocs)
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                handleStepInputChange('requiredDocuments', [...stepFormData.requiredDocuments, ''])
                              }}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add Document
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Inspection Checklist (for INSPECTION and FIELD_VISIT types) */}
                      {(stepFormData.type === 'INSPECTION' || stepFormData.type === 'FIELD_VISIT') && (
                        <div className="p-3 bg-yellow-50 rounded-md">
                          <Label className="text-sm font-medium">Inspection Checklist</Label>
                          <div className="mt-2 space-y-2">
                            {stepFormData.inspectionChecklist.map((item, index) => (
                              <div key={`checklist-${index}-${item}`} className="flex items-center gap-2">
                                <Input
                                  value={item}
                                  onChange={(e) => {
                                    const newChecklist = [...stepFormData.inspectionChecklist]
                                    newChecklist[index] = e.target.value
                                    handleStepInputChange('inspectionChecklist', newChecklist)
                                  }}
                                  placeholder="Checklist item"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newChecklist = stepFormData.inspectionChecklist.filter((_, i) => i !== index)
                                    handleStepInputChange('inspectionChecklist', newChecklist)
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                handleStepInputChange('inspectionChecklist', [...stepFormData.inspectionChecklist, ''])
                              }}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add Checklist Item
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={handleCancelStepEdit}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveStep}
                        >
                          <Save className="h-4 w-4 mr-1" />
                          {editingStep ? 'Update Step' : 'Add Step'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={handleBackToMain}>
                  Cancel
                </Button>
                <Button 
                  onClick={async () => {
                    if (!workflowFormData.name || !workflowFormData.description) {
                      alert('Template name and description are required')
                      return
                    }
                    
                    if (workflowSteps.length === 0) {
                      alert('Please add at least one step to the workflow')
                      return
                    }
                    
                    try {
                      await createWorkflowTemplateMutation.mutateAsync({
                        name: workflowFormData.name,
                        description: workflowFormData.description,
                        licenseType: workflowFormData.licenseType,
                        licenseCategory: workflowFormData.licenseCategory,
                        licenseid: workflowFormData.licenseid,
                        steps: workflowSteps,
                        isActive: workflowFormData.isActive
                      })
                      alert('Workflow template created successfully')
                      handleBackToMain()
                    } catch (error) {
                      console.error('Error creating workflow template:', error)
                      alert('Error creating workflow template')
                    }
                  }}
                  disabled={createWorkflowTemplateMutation.isPending}
                >
                  {createWorkflowTemplateMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Workflow Template'
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
      
    </Dialog>
  )
}
