"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, CheckCircle, Save, ArrowLeft } from "lucide-react"
import CompanyForm from "./forms/company"

// License field interface based on the API response
export interface LicenseField {
  id: string
  licenseId: string
  name: string
  type: 'TEXT' | 'NUMBER' | 'EMAIL' | 'DATE' | 'SELECT' | 'TEXTAREA' | 'CHECKBOX' | 'COMPANY'
  label: string
  required: boolean
  placeholder: string
  description?: string
  options: string[]
  validation?: any
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// License interface with fields
export interface LicenseWithFields {
  id: string
  name: string
  description: string
  category: string
  type: string
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'SUSPENDED'
  requirements?: any
  validityPeriod: number
  cost: string | number
  issuingAuthority: string
  applicationSteps?: any
  prerequisites?: any
  documents?: any
  processingTime: string
  renewalRequired: boolean
  renewalPeriod: number
  isDigital: boolean
  onlineApplication: boolean
  createdAt: string
  updatedAt: string
  fields: LicenseField[]
}

interface DynamicFormRendererProps {
  readonly license: LicenseWithFields
  readonly onSubmit: (formData: Record<string, any>) => void
  readonly onCancel: () => void
  readonly onSaveDraft?: (formData: Record<string, any>) => void
  readonly initialData?: Record<string, any>
  readonly isSubmitting?: boolean
  readonly isDraftSaving?: boolean
  readonly userProfile?: {
    readonly companyName?: string
    readonly lrNumber?: string
    readonly postalAddress?: string
    readonly postalCode?: string
    readonly companyRegNumber?: string
    readonly pinNumber?: string
    readonly phoneNumber?: string
    readonly emailAddress?: string
    readonly county?: string
    readonly subcounty?: string
    readonly ward?: string
    readonly location?: string
    readonly buildingName?: string
    readonly streetName?: string
    readonly town?: string
    readonly establishmentDate?: string
    readonly legalStatus?: string
  }
}

export function DynamicFormRenderer({
  license,
  onSubmit,
  onCancel,
  onSaveDraft,
  initialData = {},
  isSubmitting = false,
  isDraftSaving = false,
  userProfile
}: DynamicFormRendererProps) {
  // Guard: If license is null or undefined, show a fallback UI
  if (!license || !license.fields) {
    return (
      <div className="p-6 text-center text-red-600">
        License data is not available.
      </div>
    )
  }

  const [formData, setFormData] = useState<Record<string, any>>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Sort fields by order
  const sortedFields = [...license.fields].sort((a, b) => a.order - b.order)

  // Helper function for status badge styling
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'EXPIRED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleInputChange = (fieldName: string, value: any) => {
    console.log(fieldName, value, "fieldName, value")
    setFormData(prev => ({ ...prev, [fieldName]: value }))

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }))
    }
  }

  const handleCompanyDataChange = (companyData: Record<string, any>) => {
    setFormData(prev => ({ ...prev, ...companyData }))
    
    // Clear company field errors when data changes
    const companyFields = [
      'companyName', 'lrNumber', 'postalAddress', 'postalCode', 'companyRegNumber', 
      'pinNumber', 'phoneNumber', 'emailAddress', 'county', 'subcounty', 
      'ward', 'location', 'buildingName', 'streetName', 'town', 
      'establishmentDate', 'legalStatus'
    ]
    
    const clearedErrors = { ...errors }
    companyFields.forEach(field => {
      if (clearedErrors[field]) {
        delete clearedErrors[field]
      }
    })
    setErrors(clearedErrors)
  }


  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    sortedFields.forEach(field => {
      // Skip validation for company fields
      if (field.type === 'COMPANY') {
        return
      }
   
      // Regular field validation
      if (field.required && (!formData[field.name] || formData[field.name] === '')) {
        newErrors[field.name] = `${field.label} is required`
      }

      // Additional validation based on field type
      if (field.type === 'EMAIL' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Please enter a valid email address'
        }
      }

      if (field.type === 'NUMBER' && formData[field.name]) {
        if (isNaN(Number(formData[field.name]))) {
          newErrors[field.name] = 'Please enter a valid number'
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Prepare the final form data using the state-based formData
      const finalFormData = {
        ...formData,
        licenseId: license.id,
        submittedAt: new Date().toISOString()
      }
      
      console.log('Submitting form data:', finalFormData)
      onSubmit(finalFormData)
    } else {
      console.log('Form validation failed:', errors)
    }
  }

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft(formData)
    }
  }

  const renderField = (field: LicenseField) => {
    const fieldValue = formData[field.name] || ''
    const hasError = !!errors[field.name]

    switch (field.type) {
      case 'TEXT':
        return (
          <div key={field.id} className="space-y-2">
            
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.name}
              type="text"
              value={fieldValue}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={hasError ? 'border-red-500' : ''}
              required={field.required}
            />
          </div>
        )
      case 'EMAIL':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.name}
              type={field.type === 'EMAIL' ? 'email' : 'text'}
              value={fieldValue}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={hasError ? 'border-red-500' : ''}
              required={field.required}
            />
            {field.description && (
              <p className="text-sm text-gray-500">{field.description}</p>
            )}
            {hasError && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        )

      case 'NUMBER':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.name}
              type="number"
              value={fieldValue}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={hasError ? 'border-red-500' : ''}
              required={field.required}
            />
            {field.description && (
              <p className="text-sm text-gray-500">{field.description}</p>
            )}
            {hasError && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        )

      case 'DATE':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.name}
              type="date"
              value={fieldValue}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className={hasError ? 'border-red-500' : ''}
              required={field.required}
            />
            {field.description && (
              <p className="text-sm text-gray-500">{field.description}</p>
            )}
            {hasError && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        )

      case 'SELECT':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select
              value={fieldValue}
              onValueChange={(value) => handleInputChange(field.name, value)}
            >
              <SelectTrigger className={hasError ? 'border-red-500' : ''}>
                <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.description && (
              <p className="text-sm text-gray-500">{field.description}</p>
            )}
            {hasError && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        )

      case 'TEXTAREA':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={field.name}
              value={fieldValue}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={`min-h-[100px] ${hasError ? 'border-red-500' : ''}`}
              required={field.required}
            />
            {field.description && (
              <p className="text-sm text-gray-500">{field.description}</p>
            )}
            {hasError && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        )

      case 'CHECKBOX':
        return (
          <div key={field.id} className="space-y-2">
            <div className="flex items-start space-x-3">
              <Checkbox
                id={field.name}
                checked={fieldValue === true || fieldValue === 'true'}
                onCheckedChange={(checked) => handleInputChange(field.name, checked)}
                required={field.required}
              />
              <Label htmlFor={field.name} className="text-sm leading-relaxed">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
            </div>
            {field.description && (
              <p className="text-sm text-gray-500 ml-6">{field.description}</p>
            )}
            {hasError && (
              <p className="text-sm text-red-500 ml-6">{errors[field.name]}</p>
            )}
          </div>
        )

      case 'COMPANY':
        // Special handling for company fields using the CompanyForm component
        return (
          <CompanyForm
            key={field.id}
            initialData={formData}
            onChange={handleCompanyDataChange}
            onCancel={() => setFormData(prev => ({ ...prev, ...userProfile }))}
            isSubmitting={isSubmitting}
            errors={errors}
          />
        )

      default:
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.name}
              type="text"
              value={fieldValue}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={hasError ? 'border-red-500' : ''}
              required={field.required}
            />
            {field.description && (
              <p className="text-sm text-gray-500">{field.description}</p>
            )}
            {hasError && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        )
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">{license.name}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{license.description}</p>
          </div>
          <Badge
            className={getStatusBadgeClass(license.status)}
          >
            {license.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* License Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <Label className="text-sm font-medium text-gray-600">Cost</Label>
              <p className="text-lg font-semibold">
                KSh {typeof license.cost === 'string' ? parseInt(license.cost).toLocaleString() : license.cost.toLocaleString()}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Processing Time</Label>
              <p className="text-lg font-semibold">{license.processingTime}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Validity Period</Label>
              <p className="text-lg font-semibold">{license.validityPeriod} months</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Issuing Authority</Label>
              <p className="text-lg font-semibold">{license.issuingAuthority}</p>
            </div>
          </div>

          {/* Dynamic Fields */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Application Form</h3>
            <div className="space-y-6">
              {sortedFields.filter(field => field.type == 'COMPANY').map((field) => {

                return (
                  renderField(field)
                )
              })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {sortedFields.filter(field => field.type !== 'COMPANY').map((field) => {

                return (
                  renderField(field)
                )
              })}
            </div>

          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Cancel
            </Button>

            {onSaveDraft && (
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                className="flex items-center gap-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                disabled={isDraftSaving}
              >
                {isDraftSaving ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Draft
                  </>
                )}
              </Button>
            )}

            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
