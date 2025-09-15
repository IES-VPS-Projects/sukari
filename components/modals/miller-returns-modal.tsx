"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Send, CheckCircle, Clock, AlertCircle, BarChart3, TrendingUp, FileBarChart } from "lucide-react"

interface MillerReturnsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MillerReturnsModal({ open, onOpenChange }: MillerReturnsModalProps) {
  const [activeTab, setActiveTab] = useState<'status' | 'daily' | 'monthly' | 'annual'>('status')
  const [returnType, setReturnType] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    millerLicenseNumber: 'SML-2024-003',
    companyName: 'Mumias Sugar Mills Ltd',
    reportingPeriod: '',
    returnType: '',
    productionVolume: '',
    salesVolume: '',
    exportVolume: '',
    stockLevel: '',
    wastagePercentage: '',
    energyConsumption: '',
    waterUsage: '',
    employeeCount: '',
    rawMaterialConsumption: '',
    qualityGrade: '',
    complianceNotes: '',
    attachments: null
  })

  const qualityGrades = [
    'Grade A - Premium',
    'Grade B - Standard',
    'Grade C - Commercial',
    'Grade D - Industrial'
  ]

  // Mock existing returns data
  const existingReturns = [
    {
      id: 'RET-2024-09-001',
      type: 'Daily Return',
      period: '2024-09-11',
      status: 'submitted',
      submittedDate: '2024-09-12',
      dueDate: '2024-09-12',
      productionVolume: '2,450 MT'
    },
    {
      id: 'RET-2024-09-002',
      type: 'Daily Return',
      period: '2024-09-10',
      status: 'approved',
      submittedDate: '2024-09-11',
      dueDate: '2024-09-11',
      productionVolume: '2,380 MT'
    },
    {
      id: 'RET-2024-08-001',
      type: 'Monthly Return',
      period: 'August 2024',
      status: 'approved',
      submittedDate: '2024-09-05',
      dueDate: '2024-09-05',
      productionVolume: '68,500 MT'
    },
    {
      id: 'RET-2024-001',
      type: 'Annual Return',
      period: '2023',
      status: 'approved',
      submittedDate: '2024-03-15',
      dueDate: '2024-03-31',
      productionVolume: '820,000 MT'
    },
    {
      id: 'RET-2024-09-003',
      type: 'Daily Return',
      period: '2024-09-12',
      status: 'overdue',
      submittedDate: null,
      dueDate: '2024-09-13',
      productionVolume: 'Pending'
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
      reportingPeriod: '',
      returnType: '',
      productionVolume: '',
      salesVolume: '',
      exportVolume: '',
      stockLevel: '',
      wastagePercentage: '',
      energyConsumption: '',
      waterUsage: '',
      employeeCount: '',
      rawMaterialConsumption: '',
      qualityGrade: '',
      complianceNotes: '',
      attachments: null
    }))
    setReturnType('')
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
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'submitted':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const commonFields = (
    <>
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

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="productionVolume">Production Volume (MT)</Label>
          <Input
            id="productionVolume"
            type="number"
            value={formData.productionVolume}
            onChange={(e) => handleInputChange('productionVolume', e.target.value)}
            placeholder="e.g., 2450"
            required
          />
        </div>
        <div>
          <Label htmlFor="salesVolume">Sales Volume (MT)</Label>
          <Input
            id="salesVolume"
            type="number"
            value={formData.salesVolume}
            onChange={(e) => handleInputChange('salesVolume', e.target.value)}
            placeholder="e.g., 2200"
            required
          />
        </div>
        <div>
          <Label htmlFor="stockLevel">Current Stock Level (MT)</Label>
          <Input
            id="stockLevel"
            type="number"
            value={formData.stockLevel}
            onChange={(e) => handleInputChange('stockLevel', e.target.value)}
            placeholder="e.g., 250"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="qualityGrade">Quality Grade</Label>
          <Select onValueChange={(value) => handleInputChange('qualityGrade', value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select quality grade" />
            </SelectTrigger>
            <SelectContent>
              {qualityGrades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="wastagePercentage">Wastage Percentage (%)</Label>
          <Input
            id="wastagePercentage"
            type="number"
            step="0.01"
            value={formData.wastagePercentage}
            onChange={(e) => handleInputChange('wastagePercentage', e.target.value)}
            placeholder="e.g., 2.5"
            required
          />
        </div>
      </div>
    </>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Miller Returns</DialogTitle>
          <DialogDescription>
            File Daily, Monthly, and Annual returns for your sugar milling operations
          </DialogDescription>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex space-x-1 border-b border-gray-200 mb-6">
          {[
            { id: 'status', label: 'Returns Status', icon: FileText },
            { id: 'daily', label: 'Daily Return', icon: BarChart3 },
            { id: 'monthly', label: 'Monthly Return', icon: TrendingUp },
            { id: 'annual', label: 'Annual Return', icon: FileBarChart }
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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Returns History</h3>
            <div className="grid gap-4">
              {existingReturns.map((returnItem) => (
                <div key={returnItem.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{returnItem.type}</h4>
                      <p className="text-sm text-gray-600">Period: {returnItem.period}</p>
                      <p className="text-xs text-gray-500">Return ID: {returnItem.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(returnItem.status)}
                      <Badge className={getStatusColor(returnItem.status)}>
                        {returnItem.status.charAt(0).toUpperCase() + returnItem.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Production Volume:</p>
                      <p className="font-medium">{returnItem.productionVolume}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Due Date:</p>
                      <p className="font-medium">{new Date(returnItem.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Submitted:</p>
                      <p className="font-medium">
                        {returnItem.submittedDate ? new Date(returnItem.submittedDate).toLocaleDateString() : 'Not submitted'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Return Tab */}
        {activeTab === 'daily' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold">Daily Production Return</h3>
            
            <div>
              <Label htmlFor="reportingPeriod">Reporting Date</Label>
              <Input
                id="reportingPeriod"
                type="date"
                value={formData.reportingPeriod}
                onChange={(e) => handleInputChange('reportingPeriod', e.target.value)}
                required
              />
            </div>

            {commonFields}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="energyConsumption">Energy Consumption (kWh)</Label>
                <Input
                  id="energyConsumption"
                  type="number"
                  value={formData.energyConsumption}
                  onChange={(e) => handleInputChange('energyConsumption', e.target.value)}
                  placeholder="e.g., 25000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="waterUsage">Water Usage (m³)</Label>
                <Input
                  id="waterUsage"
                  type="number"
                  value={formData.waterUsage}
                  onChange={(e) => handleInputChange('waterUsage', e.target.value)}
                  placeholder="e.g., 1200"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="complianceNotes">Daily Notes & Compliance Issues</Label>
              <Textarea
                id="complianceNotes"
                value={formData.complianceNotes}
                onChange={(e) => handleInputChange('complianceNotes', e.target.value)}
                placeholder="Any issues, maintenance activities, or compliance notes for today..."
                rows={3}
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
                    Submit Daily Return
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        {/* Monthly Return Tab */}
        {activeTab === 'monthly' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold">Monthly Production Return</h3>
            
            <div>
              <Label htmlFor="reportingPeriod">Reporting Month</Label>
              <Input
                id="reportingPeriod"
                type="month"
                value={formData.reportingPeriod}
                onChange={(e) => handleInputChange('reportingPeriod', e.target.value)}
                required
              />
            </div>

            {commonFields}

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="exportVolume">Export Volume (MT)</Label>
                <Input
                  id="exportVolume"
                  type="number"
                  value={formData.exportVolume}
                  onChange={(e) => handleInputChange('exportVolume', e.target.value)}
                  placeholder="e.g., 5000"
                />
              </div>
              <div>
                <Label htmlFor="employeeCount">Employee Count</Label>
                <Input
                  id="employeeCount"
                  type="number"
                  value={formData.employeeCount}
                  onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                  placeholder="e.g., 450"
                  required
                />
              </div>
              <div>
                <Label htmlFor="rawMaterialConsumption">Raw Material Consumed (MT)</Label>
                <Input
                  id="rawMaterialConsumption"
                  type="number"
                  value={formData.rawMaterialConsumption}
                  onChange={(e) => handleInputChange('rawMaterialConsumption', e.target.value)}
                  placeholder="e.g., 75000"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="complianceNotes">Monthly Summary & Compliance Report</Label>
              <Textarea
                id="complianceNotes"
                value={formData.complianceNotes}
                onChange={(e) => handleInputChange('complianceNotes', e.target.value)}
                placeholder="Monthly performance summary, major issues, compliance status, and achievements..."
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
                    Submit Monthly Return
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        {/* Annual Return Tab */}
        {activeTab === 'annual' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold">Annual Production Return</h3>
            
            <div>
              <Label htmlFor="reportingPeriod">Reporting Year</Label>
              <Input
                id="reportingPeriod"
                type="number"
                min="2020"
                max="2025"
                value={formData.reportingPeriod}
                onChange={(e) => handleInputChange('reportingPeriod', e.target.value)}
                placeholder="e.g., 2024"
                required
              />
            </div>

            {commonFields}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="exportVolume">Total Export Volume (MT)</Label>
                <Input
                  id="exportVolume"
                  type="number"
                  value={formData.exportVolume}
                  onChange={(e) => handleInputChange('exportVolume', e.target.value)}
                  placeholder="e.g., 60000"
                />
              </div>
              <div>
                <Label htmlFor="employeeCount">Average Employee Count</Label>
                <Input
                  id="employeeCount"
                  type="number"
                  value={formData.employeeCount}
                  onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                  placeholder="e.g., 465"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="rawMaterialConsumption">Total Raw Material Consumed (MT)</Label>
              <Input
                id="rawMaterialConsumption"
                type="number"
                value={formData.rawMaterialConsumption}
                onChange={(e) => handleInputChange('rawMaterialConsumption', e.target.value)}
                placeholder="e.g., 900000"
                required
              />
            </div>

            <div>
              <Label htmlFor="complianceNotes">Annual Report & Strategic Overview</Label>
              <Textarea
                id="complianceNotes"
                value={formData.complianceNotes}
                onChange={(e) => handleInputChange('complianceNotes', e.target.value)}
                placeholder="Annual performance review, strategic achievements, compliance record, future plans, and industry contributions..."
                rows={5}
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
                    Submit Annual Return
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}