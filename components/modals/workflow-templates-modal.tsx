"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  Workflow, 
  Plus, 
  ArrowLeft, 
  Loader2, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Eye,
  Copy,
  ArrowUp,
  ArrowDown,
  Save,
  X
} from "lucide-react"
import { 
  useWorkflowTemplates, 
  useWorkflowTemplateStats, 
  useCreateWorkflowTemplate, 
  useUpdateWorkflowTemplate, 
  useDeleteWorkflowTemplate,
  predefinedTemplates
} from "@/hooks/use-workflow-templates"
import { useLicenses } from "@/hooks/use-licenses"
import { useDepartments } from "@/hooks/use-departments"
import { 
  WorkflowTemplate, 
  CreateWorkflowTemplateRequest
} from "@/lib/api-client"

// Define view types for the modal
type ModalView = 'main' | 'createTemplate' | 'editTemplate' | 'viewTemplate'

interface WorkflowTemplatesModalProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
  readonly selectedLicenseId?: string | null
}

const licenseTypes = [
  { value: "MILLERS", label: "Sugar Millers License" },
  { value: "BROWN_SUGAR", label: "Brown Sugar Import License" },
  { value: "WHITE_SUGAR", label: "White Sugar Import License" }, 
]

const categories = [
  { value: "PERMIT_AND_LICENSE", label: "Permit and License" },
  { value: "LETTER_OF_COMFORT", label: "Letter of Comfort" }
]

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

export function WorkflowTemplatesModal({ open, onOpenChange, selectedLicenseId }: WorkflowTemplatesModalProps) {
  // State for modal views
  const [currentView, setCurrentView] = useState<ModalView>('main')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<WorkflowTemplate | null>(null)
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [viewingTemplate, setViewingTemplate] = useState<WorkflowTemplate | null>(null)
  
  // Step management state
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
  
  const [formData, setFormData] = useState<CreateWorkflowTemplateRequest>({
    name: '',
    description: '',
    licenseType: 'MILLERS',
    licenseCategory: 'PERMIT_AND_LICENSE',
    licenseid: '',
    steps: [],
    isActive: true
  })

  // Fetch workflow templates data
  const { data: templatesData, isLoading: templatesLoading, error: templatesError } = useWorkflowTemplates(1, 10)
  const templateStats = useWorkflowTemplateStats()
  const createTemplateMutation = useCreateWorkflowTemplate()
  const updateTemplateMutation = useUpdateWorkflowTemplate()
  const deleteTemplateMutation = useDeleteWorkflowTemplate()
  
  // Fetch licenses data for dropdown
  const { data: licensesData, isLoading: licensesLoading, error: licensesError } = useLicenses(1, 100)
  
  // Fetch departments data for dropdown
  const { departments, isLoading: departmentsLoading, error: departmentsError } = useDepartments()

  const handleInputChange = (field: keyof CreateWorkflowTemplateRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Step management functions
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
    return name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '')
  }

  const handleCreateStep = () => {
    setIsCreatingStep(true)
    setEditingStep(null)
    setStepFormData({
      id: '',
      name: '',
      description: '',
      type: 'REVIEW',
      assignedDepartment: departments.length > 0 ? departments[0].name : '',
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
      updatedSteps = formData.steps.map(step => 
        step.id === editingStep.id ? newStep : step
      )
    } else {
      // Add new step
      updatedSteps = [...formData.steps, newStep]
    }

    setFormData(prev => ({ ...prev, steps: updatedSteps as any }))
    setIsCreatingStep(false)
    setEditingStep(null)
  }

  const handleDeleteStep = (stepId: string) => {
    if (confirm('Are you sure you want to delete this step?')) {
      const updatedSteps = formData.steps.filter(step => step.id !== stepId)
      setFormData(prev => ({ ...prev, steps: updatedSteps }))
    }
  }

  const handleMoveStep = (stepId: string, direction: 'up' | 'down') => {
    const currentIndex = formData.steps.findIndex(step => step.id === stepId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= formData.steps.length) return

    const updatedSteps = [...formData.steps]
    const [movedStep] = updatedSteps.splice(currentIndex, 1)
    updatedSteps.splice(newIndex, 0, movedStep)

    setFormData(prev => ({ ...prev, steps: updatedSteps }))
  }

  const handleCancelStepEdit = () => {
    setIsCreatingStep(false)
    setEditingStep(null)
  }

  // Handle starting to edit a template
  const handleStartEditTemplate = (template: WorkflowTemplate) => {
    setEditingTemplate(template)
    setFormData({
      name: template.name,
      description: template.description,
      licenseType: template.licenseType,
      licenseCategory: template.licenseCategory,
      licenseid: template.licenseid || '',
      steps: template.steps,
      isActive: template.isActive
    })
    setCurrentView('editTemplate')
  }

  // Handle viewing a template
  const handleViewTemplate = (template: WorkflowTemplate) => {
    setViewingTemplate(template)
    setCurrentView('viewTemplate')
  }

  // Handle deleting a template
  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this workflow template? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteTemplateMutation.mutateAsync(templateId)
      alert('Workflow template deleted successfully')
    } catch (error) {
      console.error('Error deleting workflow template:', error)
      alert('Error deleting workflow template')
    } finally {
      setIsDeleting(false)
    }
  }

  // Handle duplicating a template
  const handleDuplicateTemplate = (template: WorkflowTemplate) => {
    setFormData({
      name: `${template.name} (Copy)`,
      description: template.description,
      licenseType: template.licenseType,
      licenseCategory: template.licenseCategory,
      licenseid: template.licenseid || '',
      steps: template.steps,
      isActive: true
    })
    setCurrentView('createTemplate')
  }

  // Handle using predefined template
  const handleUsePredefinedTemplate = (templateKey: keyof typeof predefinedTemplates) => {
    const predefined = predefinedTemplates[templateKey]
    
    // Map predefined template steps to use available departments
    const mappedSteps = predefined.steps.map(step => {
      // Find a matching department or use the first available one
      const matchingDept = departments.find(dept => 
        dept.name.toLowerCase().includes(step.assignedDepartment.toLowerCase()) ||
        step.assignedDepartment.toLowerCase().includes(dept.name.toLowerCase())
      )
      
      return {
        ...step,
        assignedDepartment: matchingDept ? matchingDept.name : (departments.length > 0 ? departments[0].name : step.assignedDepartment)
      }
    })
    
    setFormData({
      name: predefined.name,
      description: predefined.description,
      licenseType: predefined.licenseType,
      licenseCategory: predefined.licenseCategory,
      licenseid: predefined.licenseid || '',
      steps: mappedSteps,
      isActive: true
    })
    setCurrentView('createTemplate')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.description || !formData.licenseType || !formData.licenseCategory) {
      alert('Name, Description, License Type, and License Category are required')
      return
    }

    if (!formData.steps || formData.steps.length === 0) {
      alert('Template must have at least one step. Please use a predefined template or add steps manually.')
      return
    }

    setIsSubmitting(true)
    createTemplateMutation.mutate(formData)
  }

  // Handle editing a template
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editingTemplate) return
    
    if (!formData.name || !formData.description || !formData.licenseType || !formData.licenseCategory) {
      alert('Name, Description, License Type, and License Category are required')
      return
    }

    if (!formData.steps || formData.steps.length === 0) {
      alert('Template must have at least one step. Please add steps to the template.')
      return
    }

    setIsSubmittingEdit(true)
    try {
      await updateTemplateMutation.mutateAsync({
        id: editingTemplate.id,
        data: formData
      })
      alert('Workflow template updated successfully')
      setCurrentView('main')
      setEditingTemplate(null)
    } catch (error) {
      console.error('Error updating workflow template:', error)
      alert('Error updating workflow template')
    } finally {
      setIsSubmittingEdit(false)
    }
  }

  // Handle successful template creation
  useEffect(() => {
    if (isSubmitting && !createTemplateMutation.isPending && !createTemplateMutation.error) {
      // Template was created successfully
      setFormData({
        name: '',
        description: '',
        licenseType: 'MILLERS',
        licenseCategory: 'PERMIT_AND_LICENSE',
        licenseid: '',
        steps: [],
        isActive: true
      })
      setCurrentView('main')
      setIsSubmitting(false)
    } else if (isSubmitting && !createTemplateMutation.isPending && createTemplateMutation.error) {
      // There was an error, reset submitting state
      setIsSubmitting(false)
    }
  }, [isSubmitting, createTemplateMutation.isPending, createTemplateMutation.error])

  // Reset form and go back to main view
  const handleBackToMain = () => {
    setCurrentView('main')
    setEditingTemplate(null)
    setViewingTemplate(null)
    setFormData({
      name: '',
      description: '',
      licenseType: 'MILLERS',
      licenseCategory: 'PERMIT_AND_LICENSE',
      steps: [],
      isActive: true
    })
  }

  // Handle modal close
  const handleModalClose = (isOpen: boolean) => {
    if (!isOpen) {
      setCurrentView('main')
      setEditingTemplate(null)
      setViewingTemplate(null)
      setFormData({
        name: '',
        description: '',
        licenseType: 'MILLERS',
        licenseCategory: 'PERMIT_AND_LICENSE',
        licenseid: '',
        steps: [],
        isActive: true
      })
    }
    onOpenChange(isOpen)
  }

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const getStatusText = (isActive: boolean) => {
    return isActive ? "Active" : "Inactive"
  }

  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Workflow className="h-6 w-6 text-blue-600" />
            Workflow Templates Management
          </DialogTitle>
          <DialogDescription>
            Create and manage workflow templates for license applications
          </DialogDescription>
        </DialogHeader>
        
        {currentView === 'main' ? (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">{templateStats.total}</div>
                  <p className="text-xs text-gray-500">All workflow templates</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Active Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">{templateStats.active}</div>
                  <p className="text-xs text-gray-500">Currently in use</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Inactive Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">{templateStats.inactive}</div>
                  <p className="text-xs text-gray-500">Not in use</p>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setCurrentView('createTemplate')}>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
              <Button variant="outline" onClick={() => handleUsePredefinedTemplate('millers')}>
                <Copy className="h-4 w-4 mr-2" />
                Use Millers Template
              </Button>
              <Button variant="outline" onClick={() => handleUsePredefinedTemplate('whiteSugar')}>
                <Copy className="h-4 w-4 mr-2" />
                Use White Sugar Template
              </Button>
              <Button variant="outline" onClick={() => handleUsePredefinedTemplate('registration')}>
                <Copy className="h-4 w-4 mr-2" />
                Use Registration Template
              </Button>
            </div>

            {/* Templates Table */}
            <Card>
              <CardHeader>
                <CardTitle>Workflow Templates</CardTitle>
              </CardHeader>
              <CardContent>
                {templatesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-2">Loading templates...</span>
                  </div>
                ) : templatesError ? (
                  <div className="text-center py-8">
                    <p className="text-red-600">Error loading templates: {templatesError.message}</p>
                    <Button onClick={() => window.location.reload()} className="mt-4">
                      Retry
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Template Name</TableHead>
                          <TableHead>License Type</TableHead>
                          <TableHead>Steps</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {templatesData?.data?.slice(0, 10).map((template) => (
                          <TableRow key={template.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <Workflow className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium">{template.name}</div>
                                  <div className="text-sm text-gray-500">{template.description}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{template.licenseType}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="text-center">
                                <div className="font-medium">{template.steps.length}</div>
                                <div className="text-sm text-gray-500">Steps</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(template.isActive)}>
                                {getStatusText(template.isActive)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                {new Date(template.createdAt).toLocaleDateString()}
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
                                  <DropdownMenuItem onClick={() => handleViewTemplate(template)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStartEditTemplate(template)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDuplicateTemplate(template)}>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteTemplate(template.id)}
                                    className="text-red-600"
                                    disabled={isDeleting || deleteTemplateMutation.isPending}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    {deleteTemplateMutation.isPending ? 'Deleting...' : 'Delete'}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                {templatesData?.data && templatesData.data.length > 10 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline">
                      View All Templates
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : currentView === 'createTemplate' ? (
          // Create Template View
          <div className="space-y-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToMain}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Templates
            </Button>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Create New Workflow Template</h3>
                <p className="text-sm text-gray-600">Create a new workflow template for license applications</p>
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Templates must have at least one workflow step. 
                    For quick setup, use the predefined templates above, or manually add steps below.
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Template Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter template name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="licenseType">License Type</Label>
                    <Select value={formData.licenseType} onValueChange={(value) => handleInputChange('licenseType', value)}>
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
                  <Label htmlFor="licenseid">License</Label>
                  <Select 
                    value={formData.licenseid || ''} 
                    onValueChange={(value) => handleInputChange('licenseid', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a license" />
                    </SelectTrigger>
                    <SelectContent>
                      {licensesLoading ? (
                        <SelectItem value="" disabled>
                          <div className="flex items-center">
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Loading licenses...
                          </div>
                        </SelectItem>
                      ) : licensesError ? (
                        <SelectItem value="" disabled>
                          Error loading licenses
                        </SelectItem>
                      ) : (
                        licensesData?.data?.map((license) => (
                          <SelectItem key={license.id} value={license.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{license.name}</span>
                              <span className="text-xs text-gray-500">{license.type} - {license.category}</span>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter template description"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="licenseCategory">License Category</Label>
                  <Select value={formData.licenseCategory} onValueChange={(value) => handleInputChange('licenseCategory', value)}>
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
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  />
                  <Label htmlFor="isActive">Active Template</Label>
                </div>

                {/* Workflow Steps Section */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-medium">Workflow Steps</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{formData.steps.length} steps</Badge>
                      <Button
                        type="button"
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
                  
                  {formData.steps.length === 0 ? (
                    <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                      <Workflow className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-3">No workflow steps defined</p>
                      <p className="text-xs text-gray-400">
                        Use predefined templates above for quick setup, or add steps manually
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {formData.steps.map((step, index) => (
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
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMoveStep(step.id, 'up')}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMoveStep(step.id, 'down')}
                                disabled={index === formData.steps.length - 1}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditStep(step)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
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
                </div>

                {/* Step Creation/Edit Form */}
                {isCreatingStep && (
                  <div className="border-t pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">
                          {editingStep ? 'Edit Step' : 'Create New Step'}
                        </h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleCancelStepEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
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

                      <div className="mb-4">
                        <Label htmlFor="step-description">Description</Label>
                        <Textarea
                          id="step-description"
                          value={stepFormData.description}
                          onChange={(e) => handleStepInputChange('description', e.target.value)}
                          placeholder="Enter step description"
                          rows={2}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
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
                              ) : departmentsError ? (
                                <SelectItem value="" disabled>
                                  Error loading departments
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
                      <div className="mb-4">
                        <Label className="text-sm font-medium">Conditions</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div>
                            <Label htmlFor="on-complete" className="text-xs">On Complete</Label>
                            <Input
                              id="on-complete"
                              value={stepFormData.conditions.onComplete}
                              onChange={(e) => handleStepInputChange('conditions.onComplete', e.target.value)}
                              placeholder="Next step ID"
                            />
                          </div>
                          <div>
                            <Label htmlFor="on-reject" className="text-xs">On Reject</Label>
                            <Input
                              id="on-reject"
                              value={stepFormData.conditions.onReject}
                              onChange={(e) => handleStepInputChange('conditions.onReject', e.target.value)}
                              placeholder="reject"
                            />
                          </div>
                          <div>
                            <Label htmlFor="on-timeout" className="text-xs">On Timeout</Label>
                            <Input
                              id="on-timeout"
                              value={stepFormData.conditions.onTimeout}
                              onChange={(e) => handleStepInputChange('conditions.onTimeout', e.target.value)}
                              placeholder="cancel"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Payment Details (only for PAYMENT type) */}
                      {stepFormData.type === 'PAYMENT' && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-md">
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

                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCancelStepEdit}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleSaveStep}
                        >
                          <Save className="h-4 w-4 mr-1" />
                          {editingStep ? 'Update Step' : 'Add Step'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleBackToMain}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting || createTemplateMutation.isPending}>
                    {isSubmitting || createTemplateMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Template'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : currentView === 'editTemplate' ? (
          // Edit Template View
          <div className="space-y-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToMain}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Templates
            </Button>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Edit Workflow Template</h3>
                <p className="text-sm text-gray-600">Update workflow template information</p>
              </div>
              
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Template Name</Label>
                    <Input
                      id="edit-name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter template name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-licenseType">License Type</Label>
                    <Select value={formData.licenseType} onValueChange={(value) => handleInputChange('licenseType', value)}>
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
                  <Label htmlFor="edit-licenseid">License</Label>
                  <Select 
                    value={formData.licenseid || ''} 
                    onValueChange={(value) => handleInputChange('licenseid', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a license" />
                    </SelectTrigger>
                    <SelectContent>
                      {licensesLoading ? (
                        <SelectItem value="" disabled>
                          <div className="flex items-center">
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Loading licenses...
                          </div>
                        </SelectItem>
                      ) : licensesError ? (
                        <SelectItem value="" disabled>
                          Error loading licenses
                        </SelectItem>
                      ) : (
                        licensesData?.data?.map((license) => (
                          <SelectItem key={license.id} value={license.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{license.name}</span>
                              <span className="text-xs text-gray-500">{license.type} - {license.category}</span>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter template description"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-licenseCategory">License Category</Label>
                  <Select value={formData.licenseCategory} onValueChange={(value) => handleInputChange('licenseCategory', value)}>
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
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-isActive"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  />
                  <Label htmlFor="edit-isActive">Active Template</Label>
                </div>

                {/* Workflow Steps Section */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-medium">Workflow Steps</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{formData.steps.length} steps</Badge>
                      <Button
                        type="button"
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
                  
                  {formData.steps.length === 0 ? (
                    <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                      <Workflow className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-3">No workflow steps defined</p>
                      <p className="text-xs text-gray-400">
                        This template has no steps and cannot be saved
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {formData.steps.map((step, index) => (
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
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMoveStep(step.id, 'up')}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMoveStep(step.id, 'down')}
                                disabled={index === formData.steps.length - 1}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditStep(step)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
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
                </div>

                {/* Step Creation/Edit Form */}
                {isCreatingStep && (
                  <div className="border-t pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">
                          {editingStep ? 'Edit Step' : 'Create New Step'}
                        </h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleCancelStepEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="edit-step-name">Step Name *</Label>
                          <Input
                            id="edit-step-name"
                            value={stepFormData.name}
                            onChange={(e) => handleStepInputChange('name', e.target.value)}
                            placeholder="Enter step name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-step-type">Step Type *</Label>
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

                      <div className="mb-4">
                        <Label htmlFor="edit-step-description">Description</Label>
                        <Textarea
                          id="edit-step-description"
                          value={stepFormData.description}
                          onChange={(e) => handleStepInputChange('description', e.target.value)}
                          placeholder="Enter step description"
                          rows={2}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <Label htmlFor="edit-step-department">Assigned Department *</Label>
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
                              ) : departmentsError ? (
                                <SelectItem value="" disabled>
                                  Error loading departments
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
                          <Label htmlFor="edit-step-assignment">Assignment Method</Label>
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
                          <Label htmlFor="edit-step-timeout">Timeout</Label>
                          <Input
                            id="edit-step-timeout"
                            value={stepFormData.timeout}
                            onChange={(e) => handleStepInputChange('timeout', e.target.value)}
                            placeholder="e.g., 2 days"
                          />
                        </div>
                      </div>

                      {/* Conditions */}
                      <div className="mb-4">
                        <Label className="text-sm font-medium">Conditions</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div>
                            <Label htmlFor="edit-on-complete" className="text-xs">On Complete</Label>
                            <Input
                              id="edit-on-complete"
                              value={stepFormData.conditions.onComplete}
                              onChange={(e) => handleStepInputChange('conditions.onComplete', e.target.value)}
                              placeholder="Next step ID"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-on-reject" className="text-xs">On Reject</Label>
                            <Input
                              id="edit-on-reject"
                              value={stepFormData.conditions.onReject}
                              onChange={(e) => handleStepInputChange('conditions.onReject', e.target.value)}
                              placeholder="reject"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-on-timeout" className="text-xs">On Timeout</Label>
                            <Input
                              id="edit-on-timeout"
                              value={stepFormData.conditions.onTimeout}
                              onChange={(e) => handleStepInputChange('conditions.onTimeout', e.target.value)}
                              placeholder="cancel"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Payment Details (only for PAYMENT type) */}
                      {stepFormData.type === 'PAYMENT' && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-md">
                          <Label className="text-sm font-medium">Payment Details</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div>
                              <Label htmlFor="edit-payment-amount" className="text-xs">Amount</Label>
                              <Input
                                id="edit-payment-amount"
                                value={stepFormData.paymentDetails.amount}
                                onChange={(e) => handleStepInputChange('paymentDetails.amount', e.target.value)}
                                placeholder="e.g., KES 10,000"
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-payment-currency" className="text-xs">Currency</Label>
                              <Input
                                id="edit-payment-currency"
                                value={stepFormData.paymentDetails.currency}
                                onChange={(e) => handleStepInputChange('paymentDetails.currency', e.target.value)}
                                placeholder="KES"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCancelStepEdit}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleSaveStep}
                        >
                          <Save className="h-4 w-4 mr-1" />
                          {editingStep ? 'Update Step' : 'Add Step'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleBackToMain}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmittingEdit || updateTemplateMutation.isPending}>
                    {isSubmittingEdit || updateTemplateMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Template'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : currentView === 'viewTemplate' ? (
          // View Template View
          <div className="space-y-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToMain}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Templates
            </Button>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{viewingTemplate?.name}</h3>
                <p className="text-sm text-gray-600">{viewingTemplate?.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>License Type</Label>
                  <div className="mt-1">
                    <Badge variant="outline">{viewingTemplate?.licenseType}</Badge>
                  </div>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(viewingTemplate?.isActive || false)}>
                      {getStatusText(viewingTemplate?.isActive || false)}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {viewingTemplate?.licenseid && (
                <div>
                  <Label>License</Label>
                  <div className="mt-1">
                    <Badge variant="outline">
                      {licensesData?.data?.find(license => license.id === viewingTemplate.licenseid)?.name || viewingTemplate.licenseid}
                    </Badge>
                  </div>
                </div>
              )}
              
              <div>
                <Label>Workflow Steps ({viewingTemplate?.steps.length})</Label>
                <div className="mt-2 space-y-2">
                  {viewingTemplate?.steps.map((step, index) => (
                    <Card key={step.id} className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{index + 1}. {step.name}</div>
                          <div className="text-sm text-gray-500">{step.description}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{step.type}</Badge>
                            <Badge variant="outline" className="text-xs">{step.assignedDepartment}</Badge>
                            <Badge variant="outline" className="text-xs">{step.timeout}</Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
