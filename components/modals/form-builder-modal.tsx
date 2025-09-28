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
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Plus, 
  ArrowLeft, 
  Loader2, 
  Edit, 
  Trash2, 
  ArrowUp,
  ArrowDown,
  Save,
  X,
  GripVertical,
  Settings,
  Type,
  Mail,
  Phone,
  Hash,
  FileText,
  Calendar,
  Upload,
  CheckSquare,
  ToggleLeft,
  List,
  Radio,
  AlertTriangle,
  Clock
} from "lucide-react"
import { useLicenses } from "@/hooks/use-licenses"
import { 
  useBulkCreateLicenseFields
} from "@/hooks/use-license-fields"

// Define view types for the modal
type ModalView = 'main' | 'createForm' | 'editForm' | 'viewForm'

interface FormBuilderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedLicenseId?: string | null
}

// Field types with their configurations
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
    color: "bg-cyan-100 text-cyan-800"
  },
  { 
    value: "MULTI_SELECT", 
    label: "Multi Select", 
    icon: CheckSquare,
    description: "Multiple selections",
    requiresOptions: true,
    color: "bg-teal-100 text-teal-800"
  },
  { 
    value: "RADIO", 
    label: "Radio Buttons", 
    icon: Radio,
    description: "Single choice radio buttons",
    requiresOptions: true,
    color: "bg-pink-100 text-pink-800"
  },
  { 
    value: "CHECKBOX", 
    label: "Checkboxes", 
    icon: CheckSquare,
    description: "Multiple choice checkboxes",
    requiresOptions: true,
    color: "bg-rose-100 text-rose-800"
  },
  { 
    value: "DATE", 
    label: "Date", 
    icon: Calendar,
    description: "Date picker",
    requiresOptions: false,
    color: "bg-yellow-100 text-yellow-800"
  },
  { 
    value: "DATETIME", 
    label: "Date & Time", 
    icon: Calendar,
    description: "Date and time picker",
    requiresOptions: false,
    color: "bg-amber-100 text-amber-800"
  },
  { 
    value: "FILE", 
    label: "File Upload", 
    icon: Upload,
    description: "File upload field",
    requiresOptions: false,
    color: "bg-slate-100 text-slate-800"
  },
  { 
    value: "SIGNATURE", 
    label: "Signature", 
    icon: Type,
    description: "Digital signature",
    requiresOptions: false,
    color: "bg-emerald-100 text-emerald-800"
  },
  { 
    value: "BOOLEAN", 
    label: "Yes/No Toggle", 
    icon: ToggleLeft,
    description: "Boolean toggle",
    requiresOptions: false,
    color: "bg-lime-100 text-lime-800"
  }
]

interface LicenseField {
  id?: string
  licenseId: string
  name: string
  type: string
  label: string
  required: boolean
  placeholder?: string
  description?: string
  options?: Array<{
    value: string
    label: string
    disabled?: boolean
  }>
  validation?: {
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    pattern?: string
    customMessage?: string
    required?: boolean
  }
  order: number
  isActive: boolean
}

interface FormBuilderData {
  licenseId: string
  fields: LicenseField[]
}

export function FormBuilderModal({ open, onOpenChange, selectedLicenseId }: FormBuilderModalProps) {
  // State for modal views
  const [currentView, setCurrentView] = useState<ModalView>('main')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingField, setEditingField] = useState<LicenseField | null>(null)
  const [isCreatingField, setIsCreatingField] = useState(false)
  const [selectedLicense, setSelectedLicense] = useState<string>('')
  const [isDeleting, setIsDeleting] = useState(false)
  
  // Form builder state
  const [formData, setFormData] = useState<FormBuilderData>({
    licenseId: '',
    fields: []
  })
  
  // Field creation state
  const [fieldFormData, setFieldFormData] = useState<Partial<LicenseField>>({
    name: '',
    type: 'TEXT',
    label: '',
    required: false,
    placeholder: '',
    description: '',
    options: [],
    validation: {},
    order: 1,
    isActive: true
  })
  
  // Options management for field types that require them
  const [newOption, setNewOption] = useState({ value: '', label: '' })
  
  // Fetch licenses data
  const { data: licensesData, isLoading: licensesLoading, error: licensesError } = useLicenses(1, 100)
  
  // API hooks
  const bulkCreateFieldsMutation = useBulkCreateLicenseFields()
  
  const handleFieldInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFieldFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }))
    } else {
      setFieldFormData(prev => ({ ...prev, [field]: value }))
    }
  }
  
  const generateFieldId = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/(^_|_$)/g, '')
  }
  
  const handleCreateField = () => {
    setIsCreatingField(true)
    setEditingField(null)
    setFieldFormData({
      name: '',
      type: 'TEXT',
      label: '',
      required: false,
      placeholder: '',
      description: '',
      options: [],
      validation: {},
      order: formData.fields.length + 1,
      isActive: true
    })
  }
  
  const handleEditField = (field: LicenseField) => {
    setEditingField(field)
    setIsCreatingField(true)
    setFieldFormData({
      ...field,
      options: field.options || []
    })
  }
  
  const handleSaveField = () => {
    if (!fieldFormData.name || !fieldFormData.type || !fieldFormData.label) {
      alert('Field name, type, and label are required')
      return
    }

    // Validate field name format
    if (!/^[a-zA-Z]\w*$/.test(fieldFormData.name)) {
      alert('Field name must start with a letter and contain only letters, numbers, and underscores')
      return
    }

    // Check for duplicate field names
    const existingField = formData.fields.find(field => 
      field.name === fieldFormData.name && field.id !== editingField?.id
    )
    if (existingField) {
      alert('A field with this name already exists')
      return
    }
    
    const fieldId = fieldFormData.id || generateFieldId(fieldFormData.name)
    const newField: LicenseField = {
      id: fieldId,
      licenseId: formData.licenseId,
      name: fieldFormData.name,
      type: fieldFormData.type,
      label: fieldFormData.label,
      required: fieldFormData.required || false,
      placeholder: fieldFormData.placeholder,
      description: fieldFormData.description,
      options: fieldFormData.options,
      validation: fieldFormData.validation,
      order: fieldFormData.order || formData.fields.length + 1,
      isActive: fieldFormData.isActive !== false
    }
    
    let updatedFields
    if (editingField) {
      // Update existing field
      updatedFields = formData.fields.map(field => 
        field.id === editingField.id ? newField : field
      )
    } else {
      // Add new field
      updatedFields = [...formData.fields, newField]
    }
    
    setFormData(prev => ({ ...prev, fields: updatedFields }))
    setIsCreatingField(false)
    setEditingField(null)
  }
  
  const handleDeleteField = (fieldId: string) => {
    if (!confirm('Are you sure you want to delete this field? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    try {
      const updatedFields = formData.fields.filter(field => field.id !== fieldId)
      setFormData(prev => ({ ...prev, fields: updatedFields }))
    } catch (error) {
      console.error('Error deleting field:', error)
      alert('Error deleting field')
    } finally {
      setIsDeleting(false)
    }
  }
  
  const handleMoveField = (fieldId: string, direction: 'up' | 'down') => {
    const currentIndex = formData.fields.findIndex(field => field.id === fieldId)
    if (currentIndex === -1) return
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= formData.fields.length) return
    
    const updatedFields = [...formData.fields]
    const [movedField] = updatedFields.splice(currentIndex, 1)
    updatedFields.splice(newIndex, 0, movedField)
    
    // Update order numbers
    const reorderedFields = updatedFields.map((field, index) => ({
      ...field,
      order: index + 1
    }))
    
    setFormData(prev => ({ ...prev, fields: reorderedFields }))
  }
  
  const handleAddOption = () => {
    if (newOption.value && newOption.label) {
      setFieldFormData(prev => ({
        ...prev,
        options: [...(prev.options || []), { ...newOption }]
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
  
  const handleStartCreateForm = (licenseId: string) => {
    setSelectedLicense(licenseId)
    setFormData({
      licenseId,
      fields: []
    })
    setCurrentView('createForm')
  }
  
  const handleSubmitForm = async () => {
    if (!formData.licenseId || formData.fields.length === 0) {
      alert('Please select a license and add at least one field')
      return
    }
    
    setIsSubmitting(true)
    bulkCreateFieldsMutation.mutate({
      licenseId: formData.licenseId,
      fieldsData: { 
        fields: formData.fields.map(field => ({
          name: field.name,
          type: field.type,
          label: field.label,
          required: field.required,
          placeholder: field.placeholder,
          description: field.description,
          options: field.options,
          validation: field.validation,
          order: field.order,
          isActive: field.isActive
        }))
      }
    })
  }
  
  // Handle successful form creation
  useEffect(() => {
    if (isSubmitting && !bulkCreateFieldsMutation.isPending && !bulkCreateFieldsMutation.error) {
      // Form was created successfully
      setFormData({ licenseId: '', fields: [] })
      setSelectedLicense('')
      setCurrentView('main')
      setIsSubmitting(false)
      setEditingField(null)
      setIsCreatingField(false)
    } else if (isSubmitting && !bulkCreateFieldsMutation.isPending && bulkCreateFieldsMutation.error) {
      // There was an error, reset submitting state
      setIsSubmitting(false)
    }
  }, [isSubmitting, bulkCreateFieldsMutation.isPending, bulkCreateFieldsMutation.error])

  const handleBackToMain = () => {
    setCurrentView('main')
    setFormData({ licenseId: '', fields: [] })
    setSelectedLicense('')
    setEditingField(null)
    setIsCreatingField(false)
  }
  
  const handleModalClose = (isOpen: boolean) => {
    if (!isOpen) {
      setCurrentView('main')
      setFormData({ licenseId: '', fields: [] })
      setSelectedLicense('')
      setEditingField(null)
      setIsCreatingField(false)
      setIsSubmitting(false)
      setIsDeleting(false)
    }
    onOpenChange(isOpen)
  }
  
  const getFieldTypeInfo = (type: string) => {
    return fieldTypes.find(ft => ft.value === type) || fieldTypes[0]
  }
  
  const selectedLicenseData = licensesData?.data?.find(license => license.id === selectedLicense)
  
  if (licensesLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              Form Builder
            </DialogTitle>
            <DialogDescription>
              Create dynamic forms for license applications
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Clock className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
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
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              Form Builder
            </DialogTitle>
            <DialogDescription>
              Create dynamic forms for license applications
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
            <FileText className="h-6 w-6 text-blue-600" />
            Form Builder
          </DialogTitle>
          <DialogDescription>
            Create dynamic forms for license applications
          </DialogDescription>
        </DialogHeader>
        
        {(() => {
          if (currentView === 'main') {
            return (
              <div className="space-y-6">
                {/* License Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Select License to Create Form</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      if (licensesLoading) {
                        return (
                          <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin" />
                            <span className="ml-2">Loading licenses...</span>
                          </div>
                        )
                      }
                      
                      if (licensesError) {
                        return (
                          <div className="text-center py-8">
                            <p className="text-red-600">Error loading licenses</p>
                          </div>
                        )
                      }
                      
                      return (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {licensesData?.data?.map((license) => (
                          <Card 
                            key={license.id} 
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => handleStartCreateForm(license.id)}
                          >
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{license.name}</CardTitle>
                                <Badge variant="outline">{license.type}</Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-600 mb-3">{license.description}</p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{license.category}</span>
                                <span>KES {license.cost}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      )
                    })()}
                  </CardContent>
                </Card>
              </div>
            )
          }
          
          if (currentView === 'createForm') {
            return (
          <div className="space-y-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToMain}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to License Selection
            </Button>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Create Form for {selectedLicenseData?.name}</h3>
                <p className="text-sm text-gray-600">Build a dynamic form with custom fields</p>
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
                    <CardTitle>Form Fields ({formData.fields.length})</CardTitle>
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
                    if (formData.fields.length === 0) {
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
                      {formData.fields.map((field, index) => {
                        const fieldTypeInfo = getFieldTypeInfo(field.type)
                        const IconComponent = fieldTypeInfo.icon
                        return (
                          <Card key={field.id} className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <GripVertical className="h-4 w-4 text-gray-400" />
                                <div className={`p-1 rounded ${fieldTypeInfo.color}`}>
                                  <IconComponent className="h-3 w-3" />
                                </div>
                                <div>
                                  <div className="font-medium">{field.label}</div>
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
                                  onClick={() => handleMoveField(field.id!, 'up')}
                                  disabled={index === 0}
                                >
                                  <ArrowUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMoveField(field.id!, 'down')}
                                  disabled={index === formData.fields.length - 1}
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
                                onClick={() => handleDeleteField(field.id!)}
                                disabled={isDeleting}
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
                  onClick={handleSubmitForm} 
                  disabled={isSubmitting || formData.fields.length === 0 || bulkCreateFieldsMutation.isPending}
                >
                  {isSubmitting || bulkCreateFieldsMutation.isPending ? (
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
            )
          }
          
          return null
        })()}
      </DialogContent>
    </Dialog>
  )
}
