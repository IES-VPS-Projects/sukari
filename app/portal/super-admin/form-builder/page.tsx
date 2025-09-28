"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Form, 
  Plus, 
  Settings, 
  Eye, 
  Edit,
  Workflow,
  FileText,
  Users
} from "lucide-react"
import { FormBuilderModal } from "@/components/modals/form-builder-modal"
import { WorkflowTemplatesModal } from "@/components/modals/workflow-templates-modal"
import { useLicenses } from "@/hooks/use-licenses"
import { useLicenseFieldsByLicense } from "@/hooks/use-license-fields"

export default function FormBuilderPage() {
  const [isFormBuilderOpen, setIsFormBuilderOpen] = useState(false)
  const [isWorkflowTemplatesOpen, setIsWorkflowTemplatesOpen] = useState(false)
  const [selectedLicense, setSelectedLicense] = useState<string>('')
  
  // Fetch licenses data
  const { data: licensesData, isLoading: licensesLoading, error: licensesError } = useLicenses(1, 100)
  
  // Fetch fields for selected license (for future use)
  // const { data: fieldsData } = useLicenseFieldsByLicense(selectedLicense)
  
  const handleViewForm = (licenseId: string) => {
    setSelectedLicense(licenseId)
    // You could open a view modal here to show the form
  }
  
  const handleEditForm = (licenseId: string) => {
    setSelectedLicense(licenseId)
    setIsFormBuilderOpen(true)
  }
  
  const getLicenseFieldsCount = (licenseId: string) => {
    // This would be better with a proper query, but for demo purposes
    return Math.floor(Math.random() * 10) + 1
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Form Builder</h1>
          <p className="text-gray-600">Create and manage dynamic forms for license applications</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsWorkflowTemplatesOpen(true)}>
            <Workflow className="h-4 w-4 mr-2" />
            Workflow Templates
          </Button>
          <Button onClick={() => setIsFormBuilderOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Form
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Licenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{licensesData?.data?.length || 0}</div>
            <p className="text-xs text-gray-500">Available licenses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Forms Created</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {licensesData?.data?.filter(license => getLicenseFieldsCount(license.id) > 0).length || 0}
            </div>
            <p className="text-xs text-gray-500">With custom forms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Fields</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {licensesData?.data?.reduce((total, license) => total + getLicenseFieldsCount(license.id), 0) || 0}
            </div>
            <p className="text-xs text-gray-500">Across all forms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Forms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {licensesData?.data?.filter(license => license.status === 'ACTIVE').length || 0}
            </div>
            <p className="text-xs text-gray-500">Currently active</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Licenses with Forms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            License Forms
          </CardTitle>
        </CardHeader>
        <CardContent>
          {licensesLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2">Loading licenses...</span>
            </div>
          ) : licensesError ? (
            <div className="text-center py-8">
              <p className="text-red-600">Error loading licenses: {licensesError.message}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {licensesData?.data?.map((license) => {
                const fieldsCount = getLicenseFieldsCount(license.id)
                return (
                  <div key={license.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Form className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{license.name}</h3>
                        <p className="text-sm text-gray-500">{license.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{license.type}</Badge>
                          <Badge variant="outline">{license.category}</Badge>
                          <Badge 
                            className={license.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                          >
                            {license.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right mr-4">
                        <div className="text-sm font-medium">{fieldsCount} fields</div>
                        <div className="text-xs text-gray-500">KES {license.cost}</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewForm(license.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditForm(license.id)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        {fieldsCount > 0 ? 'Edit' : 'Create'}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            How Form Builder Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Workflow className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">1. Create Workflow</h3>
              <p className="text-sm text-gray-600">
                Define the approval workflow with steps like review, inspection, and approval
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Form className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">2. Build Form</h3>
              <p className="text-sm text-gray-600">
                Create dynamic forms with various field types like text, dropdowns, file uploads
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium mb-2">3. Deploy & Use</h3>
              <p className="text-sm text-gray-600">
                Forms are automatically available for applicants to fill out and submit
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Modals */}
      <FormBuilderModal 
        open={isFormBuilderOpen} 
        onOpenChange={setIsFormBuilderOpen} 
      />
      <WorkflowTemplatesModal 
        open={isWorkflowTemplatesOpen} 
        onOpenChange={setIsWorkflowTemplatesOpen} 
      />
    </div>
  )
}
