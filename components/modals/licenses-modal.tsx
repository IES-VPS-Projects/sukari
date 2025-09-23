"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileCheck, Download, Eye, CheckCircle, Clock, XCircle, AlertTriangle, Plus, ArrowLeft, Loader2, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { useLicenses, useLicenseStats, useCreateLicense, useUpdateLicense, useDeleteLicense } from "@/hooks/use-licenses"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CreateLicenseRequest, License } from "@/lib/api-client"

// Define view types for the modal
type ModalView = 'main' | 'createLicense' | 'editLicense'

interface LicensesModalProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
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

export function LicensesModal({ open, onOpenChange }: LicensesModalProps) {
  // State for modal views
  const [currentView, setCurrentView] = useState<ModalView>('main')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingLicense, setEditingLicense] = useState<License | null>(null)
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
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

  const handleInputChange = (field: keyof CreateLicenseRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
