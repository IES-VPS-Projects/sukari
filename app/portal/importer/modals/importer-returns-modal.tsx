"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Send, CheckCircle, Clock, AlertCircle, Plus, Eye, ArrowLeft, ArrowRight } from "lucide-react"
import { AiOutlineContainer } from "react-icons/ai"
import { returnsData } from "../data/returns-data"

interface ImporterReturnsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedReturnId?: string
}

export function ImporterReturnsModal({ open, onOpenChange, selectedReturnId }: ImporterReturnsModalProps): JSX.Element {
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
  // Additional returns data for the modal - using imported data only
  const extendedReturnsData = returnsData

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
    } else if (selectedReturnId) {
      const returnData = returnsData.find(r => r.id === selectedReturnId)
      if (returnData) {
        setSelectedReturn(returnData)
        setActiveTab('submitted')
      }
    }
  }, [open, selectedReturnId])

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

  const renderSubmittedReturns = () => {
    if (selectedReturn) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => setSelectedReturn(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Returns
            </Button>
            
            <Badge className={getStatusColor(selectedReturn.status)}>
              {selectedReturn.status}
            </Badge>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{selectedReturn.type}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-blue-700">
              <span>ID: {selectedReturn.id}</span>
              <span className="hidden sm:inline">•</span>
              <span>Period: {selectedReturn.period}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Return Details</h4>
              <div className="bg-white border rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Submitted By:</span>
                  <span className="font-medium">{selectedReturn.details.submittedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Submission Date:</span>
                  <span className="font-medium">{selectedReturn.details.submissionDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Imports:</span>
                  <span className="font-medium">{selectedReturn.details.totalImports}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Import Value:</span>
                  <span className="font-medium">{selectedReturn.details.importValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes Paid:</span>
                  <span className="font-medium">{selectedReturn.details.taxesPaid}</span>
                </div>
                
                {selectedReturn.details.approvalDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Approval Date:</span>
                    <span className="font-medium">{selectedReturn.details.approvalDate}</span>
                  </div>
                )}
                
                {selectedReturn.details.approvedBy && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Approved By:</span>
                    <span className="font-medium">{selectedReturn.details.approvedBy}</span>
                  </div>
                )}
                
                {selectedReturn.details.expectedCompletionDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Completion:</span>
                    <span className="font-medium">{selectedReturn.details.expectedCompletionDate}</span>
                  </div>
                )}
                
                {selectedReturn.details.reviewedBy && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviewed By:</span>
                    <span className="font-medium">{selectedReturn.details.reviewedBy}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Additional Information</h4>
              <div className="bg-white border rounded-lg p-4">
                <h5 className="font-medium mb-2">Notes</h5>
                <p className="text-gray-700">{selectedReturn.details.notes}</p>
              </div>
              
              <div className="bg-white border rounded-lg p-4">
                <h5 className="font-medium mb-2">Documents</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span>Import Return Form {selectedReturn.period}.pdf</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span>Tax Receipt {selectedReturn.id}.pdf</span>
                  </div>
                  {selectedReturn.status === "Approved" && (
                    <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span>Approval Certificate.pdf</span>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedReturn.status === "Under Review" && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Under Review</p>
                      <p className="text-sm text-yellow-700">
                        This return is currently being reviewed by KSB officials. 
                        You will be notified once the review is complete.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
    
    return (
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
          {extendedReturnsData.map((returnItem) => (
            <div 
              key={returnItem.id} 
              className="p-4 border rounded-lg space-y-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedReturn(returnItem)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{returnItem.type}</h4>
                  <p className="text-sm text-gray-600">ID: {returnItem.id} • Period: {returnItem.period}</p>
                </div>
                <Badge className={getStatusColor(returnItem.status)}>
                  {returnItem.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Submit Date:</span>
                  <p className="font-medium">{returnItem.date}</p>
                </div>
                <div>
                  <span className="text-gray-600">Value:</span>
                  <p className="font-medium">{returnItem.value}</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderNewReturnForm = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <AiOutlineContainer className="h-5 w-5" />
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
              <Label htmlFor="customsValue">Customs Value (Ksh.)</Label>
              <Input
                id="customsValue"
                type="number"
                value={formData.customsValue}
                onChange={(e) => handleInputChange('customsValue', e.target.value)}
                placeholder="Enter customs value in Ksh."
                required
              />
            </div>
            <div>
              <Label htmlFor="taxesPaid">Taxes Paid (Ksh.)</Label>
              <Input
                id="taxesPaid"
                type="number"
                value={formData.taxesPaid}
                onChange={(e) => handleInputChange('taxesPaid', e.target.value)}
                placeholder="Enter taxes paid in Ksh."
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
            <AiOutlineContainer className="h-5 w-5" />
            Returns
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
