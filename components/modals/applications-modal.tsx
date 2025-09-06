"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, GraduationCap, ArrowRightLeft, Clock, FileText, Send, CheckCircle } from "lucide-react"

interface ApplicationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ApplicationsModal({ open, onOpenChange }: ApplicationsModalProps) {
  const [activeTab, setActiveTab] = useState<'status' | 'leave' | 'training' | 'transfer'>('status')
  const [applicationType, setApplicationType] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    employeeId: 'KSB-2024-0001',
    transferTo: '',
    date: '',
    startDate: '',
    endDate: '',
    narrative: '',
    leaveType: '',
    trainingType: ''
  })

  const leaveTypes = [
    'Annual Leave',
    'Sick Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Study Leave',
    'Compassionate Leave',
    'Emergency Leave',
    'Sabbatical Leave',
    'Medical Leave',
    'Special Leave',
    'Bereavement Leave',
    'Personal Leave'
  ]

  const trainingTypes = [
    'Sugar Processing Technology',
    'Agricultural Extension Training',
    'Quality Management Systems',
    'Leadership Development Program',
    'Safety and Compliance Training',
    'Equipment Operation Training',
    'Data Analysis and Reporting',
    'Project Management Certification',
    'Environmental Sustainability',
    'Customer Service Excellence',
    'Financial Management Training',
    'Digital Skills Development'
  ]

  const transferTypes = [
    'Factory Operations',
    'Agricultural Extension',
    'Quality Control Department',
    'Finance and Administration',
    'Human Resources',
    'Technical Services',
    'Research and Development',
    'Outgrower Relations'
  ]

  const recentApplications = [
    {
      type: 'leave',
      title: 'Annual Leave - December 2024',
      appliedOn: 'Aug 15, 2025',
      status: 'Under Review',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      type: 'training',
      title: 'Sugar Processing Technology Course',
      appliedOn: 'Aug 10, 2025',
      status: 'Approved',
      statusColor: 'bg-gray-100 text-black'
    },
    {
      type: 'transfer',
      title: 'Transfer to Quality Control Department',
      appliedOn: 'Jul 28, 2025',
      status: 'Pending Management Review',
      statusColor: 'bg-red-100 text-red-800'
    }
  ]

  // Timeout effect for success messages
  useEffect(() => {
    if (isSubmitted) {
      const timeout = setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          employeeId: 'KSB-2024-0001',
          transferTo: '',
          date: '',
          startDate: '',
          endDate: '',
          narrative: '',
          leaveType: '',
          trainingType: ''
        })
        setApplicationType('')
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [isSubmitted])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to submit the application
    console.log('Submitting application:', { type: activeTab, ...formData })
    setIsSubmitted(true)
  }

  const renderForm = () => {
    if (isSubmitted) {
      return (
        <div className="flex items-center gap-3 p-6 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <div>
            <p className="font-medium text-green-800">
              {activeTab === 'leave' && 'Leave application submitted for approval'}
              {activeTab === 'training' && 'Training application submitted for approval'}
              {activeTab === 'transfer' && 'Transfer application submitted for approval'}
            </p>
            <p className="text-sm text-green-600">Your request has been received and is under review</p>
          </div>
        </div>
      )
    }

    switch (activeTab) {
      case 'leave':
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  placeholder="Enter Employee ID"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leaveType">Leave Type</Label>
                <Select value={formData.leaveType} onValueChange={(value) => setFormData({ ...formData, leaveType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Leave Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {leaveTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="narrative">Reason for Leave</Label>
              <Textarea
                id="narrative"
                value={formData.narrative}
                onChange={(e) => setFormData({ ...formData, narrative: e.target.value })}
                placeholder="Provide reason for leave request..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              <Send className="mr-2 h-4 w-4" />
              Submit Leave Application
            </Button>
          </form>
        )

      case 'training':
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  placeholder="Enter Employee ID"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trainingType">Training Type</Label>
                <Select value={formData.trainingType} onValueChange={(value) => setFormData({ ...formData, trainingType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Training Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {trainingTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="narrative">Training Justification</Label>
              <Textarea
                id="narrative"
                value={formData.narrative}
                onChange={(e) => setFormData({ ...formData, narrative: e.target.value })}
                placeholder="Provide justification for training request and how it will benefit your role..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              <Send className="mr-2 h-4 w-4" />
              Submit Training Application
            </Button>
          </form>
        )

      case 'transfer':
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  placeholder="Enter Employee ID"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transferTo">Transfer to Department</Label>
                <Select value={formData.transferTo} onValueChange={(value) => setFormData({ ...formData, transferTo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {transferTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Preferred Start Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="narrative">Transfer Justification</Label>
              <Textarea
                id="narrative"
                value={formData.narrative}
                onChange={(e) => setFormData({ ...formData, narrative: e.target.value })}
                placeholder="Provide justification for transfer request and how it aligns with your career goals..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              <Send className="mr-2 h-4 w-4" />
              Submit Transfer Application
            </Button>
          </form>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-4xl h-[95vh] max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 sm:p-6 border-b">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Applications
          </DialogTitle>
          <DialogDescription>Manage your applications and leave requests</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <Button
              variant={activeTab === 'status' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('status')}
              className="flex-1"
            >
              <Clock className="mr-2 h-4 w-4" />
              Status
            </Button>
            <Button
              variant={activeTab === 'leave' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('leave')}
              className="flex-1"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Leave
            </Button>
            <Button
              variant={activeTab === 'training' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('training')}
              className="flex-1"
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              Training
            </Button>
            <Button
              variant={activeTab === 'transfer' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('transfer')}
              className="flex-1"
            >
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Transfer
            </Button>
          </div>

          {/* Content */}
          {activeTab === 'status' ? (
            <div className="space-y-4">
              <h3 className="font-semibold">Application Status</h3>
              <div className="space-y-4">
                {recentApplications.map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {app.type === 'leave' && <Calendar className="h-4 w-4 text-green-600" />}
                      {app.type === 'training' && <GraduationCap className="h-4 w-4 text-green-600" />}
                      {app.type === 'transfer' && <ArrowRightLeft className="h-4 w-4 text-green-600" />}
                      <div>
                        <p className="font-medium">{app.title}</p>
                        <p className="text-sm text-gray-600">Applied on: {app.appliedOn}</p>
                      </div>
                    </div>
                    <Badge className={app.statusColor}>{app.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-4">
                  {activeTab === 'leave' && 'Leave Application'}
                  {activeTab === 'training' && 'Training Application'}
                  {activeTab === 'transfer' && 'Transfer Application'}
                </h3>
                {renderForm()}
              </div>
            </div>
          )}
        </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
