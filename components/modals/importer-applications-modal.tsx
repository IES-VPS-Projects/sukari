"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Send, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface ImporterApplicationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImporterApplicationsModal({ open, onOpenChange }: ImporterApplicationsModalProps) {
  const [activeTab, setActiveTab] = useState<'status' | 'registration' | 'import' | 'renewal'>('status')
  const [applicationType, setApplicationType] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
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
    registration: 'Sugar Dealer Registration',
    import: 'Sugar Import Letter of Intent',
    renewal: 'Annual License Renewal'
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
      type: 'Annual License Renewal',
      status: 'Approved',
      submitDate: '2024-08-15',
      approvalDate: '2024-08-20'
    },
    {
      id: 'APP-2024-003',
      type: 'Sugar Dealer Registration',
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

  useEffect(() => {
    if (!open) {
      resetForm()
    }
  }, [open])

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

  const renderStatusTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Application Status</h3>
      <div className="space-y-3">
        {applications.map((app) => (
          <div key={app.id} className="p-4 border rounded-lg space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{app.type}</h4>
                <p className="text-sm text-gray-600">ID: {app.id}</p>
              </div>
              <Badge className={getStatusColor(app.status)}>
                {app.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Submit Date:</span>
                <p className="font-medium">{new Date(app.submitDate).toLocaleDateString()}</p>
              </div>
              {app.approvalDate && (
                <div>
                  <span className="text-gray-600">Approval Date:</span>
                  <p className="font-medium">{new Date(app.approvalDate).toLocaleDateString()}</p>
                </div>
              )}
              {app.volume && (
                <div>
                  <span className="text-gray-600">Volume:</span>
                  <p className="font-medium">{app.volume}</p>
                </div>
              )}
              {app.country && (
                <div>
                  <span className="text-gray-600">Source Country:</span>
                  <p className="font-medium">{app.country}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

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
            Application Management
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
                Application Status
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
              Sugar Dealer Registration
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
              License Renewal
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'status' ? renderStatusTab() : renderApplicationForm()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
