"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Send, CheckCircle, Clock, AlertCircle, Shield, Award, FileCheck } from "lucide-react"

interface MillerApplicationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MillerApplicationsModal({ open, onOpenChange }: MillerApplicationsModalProps) {
  const [activeTab, setActiveTab] = useState<'status' | 'comfort' | 'permit' | 'license'>('status')
  const [applicationType, setApplicationType] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    millerLicenseNumber: 'SML-2024-003',
    companyName: 'Mumias Sugar Mills Ltd',
    date: '',
    startDate: '',
    endDate: '',
    narrative: '',
    productionCapacity: '',
    facilityLocation: '',
    applicationType: '',
    letterPurpose: '',
    permitType: '',
    licenseType: ''
  })

  const applicationTypes = {
    comfort: 'Letter of Comfort',
    permit: 'Permit Application', 
    license: 'License Application & Renewal'
  }

  const letterPurposes = [
    'Bank Loan Application',
    'Equipment Purchase',
    'Infrastructure Development',
    'Export Documentation',
    'Partnership Agreement',
    'Investment Proposal'
  ]

  const permitTypes = [
    'Environmental Permit',
    'Industrial Permit',
    'Waste Discharge Permit',
    'Air Emission Permit',
    'Water Abstraction Permit',
    'Construction Permit'
  ]

  const licenseTypes = [
    'Sugar Manufacturing License',
    'Food Processing License',
    'Industrial License',
    'Export License',
    'Warehouse License',
    'Quality Assurance License'
  ]

  // Mock existing applications data
  const existingApplications = [
    {
      id: 'APP-2024-001',
      type: 'Letter of Comfort',
      purpose: 'Bank Loan Application',
      status: 'approved',
      submittedDate: '2024-08-15',
      approvedDate: '2024-08-28',
      validUntil: '2025-08-28'
    },
    {
      id: 'APP-2024-002',
      type: 'Environmental Permit',
      purpose: 'Waste Discharge Permit',
      status: 'pending',
      submittedDate: '2024-09-01',
      approvedDate: null,
      validUntil: null
    },
    {
      id: 'APP-2024-003',
      type: 'License Renewal',
      purpose: 'Sugar Manufacturing License',
      status: 'in-review',
      submittedDate: '2024-09-05',
      approvedDate: null,
      validUntil: null
    },
    {
      id: 'APP-2024-004',
      type: 'Industrial Permit',
      purpose: 'Industrial Permit',
      status: 'approved',
      submittedDate: '2024-07-10',
      approvedDate: '2024-07-25',
      validUntil: '2025-07-25'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      onOpenChange(false)
      setActiveTab('status')
    }, 2000)
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
      licenseType: ''
    }))
    setApplicationType('')
  }

  useEffect(() => {
    if (!open) {
      resetForm()
    }
  }, [open])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'in-review':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Applications</DialogTitle>
          <DialogDescription>
            Apply for Letters of Comfort, Permits, and License Applications & Renewals
          </DialogDescription>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex space-x-1 border-b border-gray-200 mb-6">
          {[
            { id: 'status', label: 'Application Status', icon: FileText },
            { id: 'comfort', label: 'Letter of Comfort', icon: Shield },
            { id: 'permit', label: 'Permit Application', icon: Award },
            { id: 'license', label: 'License Application', icon: FileCheck }
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
          <div className="h-[60vh] overflow-y-auto">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Current Applications</h3>
              <div className="grid gap-4">
              {existingApplications.map((app) => (
                <div key={app.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{app.type}</h4>
                      <p className="text-sm text-gray-600">{app.purpose}</p>
                      <p className="text-xs text-gray-500">Application ID: {app.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(app.status)}
                      <Badge className={getStatusColor(app.status)}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Submitted Date:</p>
                      <p className="font-medium">{new Date(app.submittedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        {app.status === 'approved' ? 'Approved Date:' : 'Expected Decision:'}
                      </p>
                      <p className="font-medium">
                        {app.approvedDate ? new Date(app.approvedDate).toLocaleDateString() : 'Pending'}
                      </p>
                    </div>
                  </div>
                  {app.validUntil && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="text-sm text-gray-600">Valid Until:</p>
                      <p className="text-sm font-medium">{new Date(app.validUntil).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              ))}
              </div>
            </div>
          </div>
        )}

        {/* Letter of Comfort Tab */}
        {activeTab === 'comfort' && (
          <div className="h-[60vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold">Letter of Comfort Application</h3>
            
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
                <Label htmlFor="millerLicenseNumber">Miller License Number</Label>
                <Input
                  id="millerLicenseNumber"
                  value={formData.millerLicenseNumber}
                  onChange={(e) => handleInputChange('millerLicenseNumber', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="letterPurpose">Purpose of Letter</Label>
                <Select onValueChange={(value) => handleInputChange('letterPurpose', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    {letterPurposes.map((purpose) => (
                      <SelectItem key={purpose} value={purpose}>
                        {purpose}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="productionCapacity">Production Capacity (MT/day)</Label>
                <Input
                  id="productionCapacity"
                  type="number"
                  value={formData.productionCapacity}
                  onChange={(e) => handleInputChange('productionCapacity', e.target.value)}
                  placeholder="e.g., 2500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="facilityLocation">Facility Location</Label>
              <Input
                id="facilityLocation"
                value={formData.facilityLocation}
                onChange={(e) => handleInputChange('facilityLocation', e.target.value)}
                placeholder="Complete facility address"
                required
              />
            </div>

            <div>
              <Label htmlFor="narrative">Purpose Narrative</Label>
              <Textarea
                id="narrative"
                value={formData.narrative}
                onChange={(e) => handleInputChange('narrative', e.target.value)}
                placeholder="Provide detailed explanation of why you need this letter of comfort..."
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitted}>
                {isSubmitted ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submitted!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
            </form>
          </div>
        )}

        {/* Permit Application Tab */}
        {activeTab === 'permit' && (
          <div className="h-[60vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold">Permit Application</h3>
            
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
                <Label htmlFor="millerLicenseNumber">Miller License Number</Label>
                <Input
                  id="millerLicenseNumber"
                  value={formData.millerLicenseNumber}
                  onChange={(e) => handleInputChange('millerLicenseNumber', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="permitType">Permit Type</Label>
                <Select onValueChange={(value) => handleInputChange('permitType', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select permit type" />
                  </SelectTrigger>
                  <SelectContent>
                    {permitTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="facilityLocation">Facility Location</Label>
                <Input
                  id="facilityLocation"
                  value={formData.facilityLocation}
                  onChange={(e) => handleInputChange('facilityLocation', e.target.value)}
                  placeholder="Complete facility address"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="startDate">Permit Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">Permit End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="narrative">Application Details</Label>
              <Textarea
                id="narrative"
                value={formData.narrative}
                onChange={(e) => handleInputChange('narrative', e.target.value)}
                placeholder="Provide detailed information about your permit application requirements..."
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitted}>
                {isSubmitted ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submitted!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
            </form>
          </div>
        )}

        {/* License Application Tab */}
        {activeTab === 'license' && (
          <div className="h-[60vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold">License Application & Renewal</h3>
            
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
                <Label htmlFor="millerLicenseNumber">Current License Number (if renewal)</Label>
                <Input
                  id="millerLicenseNumber"
                  value={formData.millerLicenseNumber}
                  onChange={(e) => handleInputChange('millerLicenseNumber', e.target.value)}
                  placeholder="Leave blank for new application"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="licenseType">License Type</Label>
                <Select onValueChange={(value) => handleInputChange('licenseType', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    {licenseTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="productionCapacity">Production Capacity (MT/day)</Label>
                <Input
                  id="productionCapacity"
                  type="number"
                  value={formData.productionCapacity}
                  onChange={(e) => handleInputChange('productionCapacity', e.target.value)}
                  placeholder="e.g., 2500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="facilityLocation">Facility Location</Label>
              <Input
                id="facilityLocation"
                value={formData.facilityLocation}
                onChange={(e) => handleInputChange('facilityLocation', e.target.value)}
                placeholder="Complete facility address"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="startDate">License Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">License End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="narrative">Application Details</Label>
              <Textarea
                id="narrative"
                value={formData.narrative}
                onChange={(e) => handleInputChange('narrative', e.target.value)}
                placeholder="Provide detailed information about your license application or renewal requirements..."
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitted}>
                {isSubmitted ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submitted!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}