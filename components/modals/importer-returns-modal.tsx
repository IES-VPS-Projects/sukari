"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Receipt, FileText, Send, CheckCircle, Clock, AlertCircle, Plus, Eye } from "lucide-react"

interface ImporterReturnsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImporterReturnsModal({ open, onOpenChange }: ImporterReturnsModalProps) {
  const [activeTab, setActiveTab] = useState<'submitted' | 'new'>('submitted')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedReturn, setSelectedReturn] = useState<any>(null)
  const [formData, setFormData] = useState({
    licenseNumber: 'SIL-2024-001',
    companyName: 'Kasavuli Sugar Imports Ltd',
    returnPeriod: '',
    importVolume: '',
    sugarType: '',
    sourceCountry: '',
    customsValue: '',
    taxesPaid: '',
    distributionDetails: '',
    complianceNotes: ''
  })

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

  // Mock returns data
  const submittedReturns = [
    {
      id: 'RET-2024-001',
      period: 'August 2024',
      submitDate: '2024-09-05',
      status: 'Approved',
      volume: '250 MT',
      sugarType: 'White Sugar',
      country: 'Brazil',
      value: '$125,000',
      taxesPaid: '$12,500'
    },
    {
      id: 'RET-2024-002',
      period: 'July 2024',
      submitDate: '2024-08-05',
      status: 'Under Review',
      volume: '300 MT',
      sugarType: 'Raw Sugar',
      country: 'Thailand',
      value: '$140,000',
      taxesPaid: '$14,000'
    },
    {
      id: 'RET-2024-003',
      period: 'June 2024',
      submitDate: '2024-07-05',
      status: 'Approved',
      volume: '200 MT',
      sugarType: 'Brown Sugar',
      country: 'Mauritius',
      value: '$95,000',
      taxesPaid: '$9,500'
    }
  ]

  const resetForm = () => {
    setFormData({
      licenseNumber: 'SIL-2024-001',
      companyName: 'Kasavuli Sugar Imports Ltd',
      returnPeriod: '',
      importVolume: '',
      sugarType: '',
      sourceCountry: '',
      customsValue: '',
      taxesPaid: '',
      distributionDetails: '',
      complianceNotes: ''
    })
    setIsSubmitted(false)
    setSelectedReturn(null)
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
      setActiveTab('submitted')
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

  const renderSubmittedReturns = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Submitted Returns</h3>
        <Button
          onClick={() => setActiveTab('new')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Return
        </Button>
      </div>
      
      <div className="space-y-3">
        {submittedReturns.map((returnItem) => (
          <div key={returnItem.id} className="p-4 border rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{returnItem.period} Returns</h4>
                <p className="text-sm text-gray-600">ID: {returnItem.id}</p>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(returnItem.status)}>
                  {returnItem.status}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedReturn(returnItem)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Submit Date:</span>
                <p className="font-medium">{new Date(returnItem.submitDate).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-gray-600">Volume:</span>
                <p className="font-medium">{returnItem.volume}</p>
              </div>
              <div>
                <span className="text-gray-600">Sugar Type:</span>
                <p className="font-medium">{returnItem.sugarType}</p>
              </div>
              <div>
                <span className="text-gray-600">Value:</span>
                <p className="font-medium">{returnItem.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Return Details Modal */}
      {selectedReturn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Return Details - {selectedReturn.period}</h4>
              <Button variant="outline" onClick={() => setSelectedReturn(null)}>
                Close
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Return ID:</span>
                  <p className="font-medium">{selectedReturn.id}</p>
                </div>
                <div>
                  <span className="text-gray-600">Period:</span>
                  <p className="font-medium">{selectedReturn.period}</p>
                </div>
                <div>
                  <span className="text-gray-600">Import Volume:</span>
                  <p className="font-medium">{selectedReturn.volume}</p>
                </div>
                <div>
                  <span className="text-gray-600">Sugar Type:</span>
                  <p className="font-medium">{selectedReturn.sugarType}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Source Country:</span>
                  <p className="font-medium">{selectedReturn.country}</p>
                </div>
                <div>
                  <span className="text-gray-600">Customs Value:</span>
                  <p className="font-medium">{selectedReturn.value}</p>
                </div>
                <div>
                  <span className="text-gray-600">Taxes Paid:</span>
                  <p className="font-medium">{selectedReturn.taxesPaid}</p>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <Badge className={getStatusColor(selectedReturn.status)}>
                    {selectedReturn.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderNewReturnForm = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Receipt className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Submit New Return</h3>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="font-medium text-yellow-800">Important Notice</p>
            <p className="text-sm text-yellow-700">
              Returns must be submitted before applying for Sugar Import Letter of Intent. 
              Ensure all information is accurate as submitted returns cannot be modified.
            </p>
          </div>
        </div>
      </div>

      {isSubmitted ? (
        <div className="text-center py-8 space-y-4">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
          <h4 className="text-lg font-semibold">Return Submitted Successfully!</h4>
          <p className="text-gray-600">Your return has been submitted and is now under review by KSB officials.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="returnPeriod">Return Period</Label>
              <Input
                id="returnPeriod"
                type="month"
                value={formData.returnPeriod}
                onChange={(e) => handleInputChange('returnPeriod', e.target.value)}
                required
              />
            </div>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customsValue">Customs Value (USD)</Label>
              <Input
                id="customsValue"
                type="number"
                value={formData.customsValue}
                onChange={(e) => handleInputChange('customsValue', e.target.value)}
                placeholder="Enter customs value"
                required
              />
            </div>
            <div>
              <Label htmlFor="taxesPaid">Taxes Paid (USD)</Label>
              <Input
                id="taxesPaid"
                type="number"
                value={formData.taxesPaid}
                onChange={(e) => handleInputChange('taxesPaid', e.target.value)}
                placeholder="Enter taxes paid"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="distributionDetails">Distribution Details</Label>
            <Textarea
              id="distributionDetails"
              value={formData.distributionDetails}
              onChange={(e) => handleInputChange('distributionDetails', e.target.value)}
              placeholder="Provide details about sugar distribution and sales..."
              className="min-h-[100px]"
              required
            />
          </div>

          <div>
            <Label htmlFor="complianceNotes">Compliance Notes</Label>
            <Textarea
              id="complianceNotes"
              value={formData.complianceNotes}
              onChange={(e) => handleInputChange('complianceNotes', e.target.value)}
              placeholder="Any additional compliance information or notes..."
              className="min-h-[80px]"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setActiveTab('submitted')}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4 mr-2" />
              Submit Return
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
            <Receipt className="h-5 w-5" />
            Import Returns Management
          </DialogTitle>
          <DialogDescription>
            Submit monthly import returns and track their status
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 border-b">
            <button
              onClick={() => setActiveTab('submitted')}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'submitted'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Submitted Returns
              </div>
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'new'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Return
              </div>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'submitted' ? renderSubmittedReturns() : renderNewReturnForm()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
