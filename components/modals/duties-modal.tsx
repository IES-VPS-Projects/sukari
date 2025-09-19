"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Users, FileText, CheckCircle, AlertTriangle, Star, Phone, ChevronRight, ChevronLeft, Menu, Plus, X, Send, Check } from "lucide-react"
import { format, addDays, isToday, isTomorrow } from "date-fns"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

interface DutiesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface AssignedDuty {
  id: string
  title: string
  assignedTo: {
    name: string
    employeeId: string
    position: string
    department: string
  }
  assignedBy: string
  dueDate: Date
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  description: string
  category: 'administrative' | 'strategic' | 'operational' | 'compliance' | 'stakeholder'
  estimatedHours: string
  dateAssigned: Date
}

interface MiddleManager {
  id: string
  name: string
  employeeId: string
  position: string
  department: string
  email: string
  phone: string
  reportingTo: string
}

interface DutyFormData {
  title: string
  description: string
  assignedTo: string
  dueDate: Date | undefined
  priority: 'high' | 'medium' | 'low'
  category: 'administrative' | 'strategic' | 'operational' | 'compliance' | 'stakeholder'
  estimatedHours: string
  specialInstructions: string
}

interface FollowUpMessage {
  id: string
  dutyId: string
  message: string
  timestamp: Date
  status: 'sent' | 'delivered' | 'read'
}

export function DutiesModal({ open, onOpenChange }: DutiesModalProps) {
  const [viewMode, setViewMode] = useState<'assign' | 'manage'>('manage')
  const [showAssignForm, setShowAssignForm] = useState(false)
  const [selectedDuty, setSelectedDuty] = useState<string | null>(null)
  const [editingDuty, setEditingDuty] = useState<AssignedDuty | null>(null)
  const [followUpDuty, setFollowUpDuty] = useState<string | null>(null)
  const [followUpMessage, setFollowUpMessage] = useState('')
  const [followUpMessages, setFollowUpMessages] = useState<FollowUpMessage[]>([])
  
  // Mock data for middle-level managers reporting to CEO
  const middleManagers: MiddleManager[] = [
    {
      id: '1',
      name: 'John Munyaka',
      employeeId: 'KSB-2021-0034',
      position: 'Production Manager',
      department: 'Production',
      email: 'john.munyaka@ksb.go.ke',
      phone: '0701234567',
      reportingTo: 'Gerald Bosire'
    },
    {
      id: '2',
      name: 'Mary Wanjiku',
      employeeId: 'KSB-2019-0087',
      position: 'Quality Assurance Manager',
      department: 'Quality Control',
      email: 'mary.wanjiku@ksb.go.ke',
      phone: '0722345678',
      reportingTo: 'Gerald Bosire'
    },
    {
      id: '3',
      name: 'Peter Kiprotich',
      employeeId: 'KSB-2020-0156',
      position: 'Agricultural Development Manager',
      department: 'Agriculture',
      email: 'peter.kiprotich@ksb.go.ke',
      phone: '0733456789',
      reportingTo: 'Gerald Bosire'
    },
    {
      id: '4',
      name: 'Sarah Njeri',
      employeeId: 'KSB-2018-0012',
      position: 'Finance Manager',
      department: 'Finance',
      email: 'sarah.njeri@ksb.go.ke',
      phone: '0744567890',
      reportingTo: 'Gerald Bosire'
    },
    {
      id: '5',
      name: 'David Ochieng',
      employeeId: 'KSB-2022-0089',
      position: 'Compliance Manager',
      department: 'Legal & Compliance',
      email: 'david.ochieng@ksb.go.ke',
      phone: '0755678901',
      reportingTo: 'Gerald Bosire'
    }
  ]

  // Mock assigned duties data
  const assignedDuties: AssignedDuty[] = [
    {
      id: '1',
      title: 'Q3 Production Report Compilation',
      assignedTo: {
        name: 'John Munyaka',
        employeeId: 'KSB-2021-0034',
        position: 'Production Manager',
        department: 'Production'
      },
      assignedBy: 'Gerald Bosire',
      dueDate: addDays(new Date(), 7),
      priority: 'high',
      status: 'in-progress',
      description: 'Compile comprehensive production report for Q3 including efficiency metrics, quality benchmarks, and improvement recommendations',
      category: 'administrative',
      estimatedHours: '16 hours',
      dateAssigned: addDays(new Date(), -3)
    },
    {
      id: '2',
      title: 'Farmer Payment System Review',
      assignedTo: {
        name: 'Sarah Njeri',
        employeeId: 'KSB-2018-0012',
        position: 'Finance Manager',
        department: 'Finance'
      },
      assignedBy: 'Gerald Bosire',
      dueDate: addDays(new Date(), 5),
      priority: 'medium',
      status: 'pending',
      description: 'Review and optimize the farmer payment disbursement process to reduce delays and improve transparency',
      category: 'operational',
      estimatedHours: '12 hours',
      dateAssigned: addDays(new Date(), -1)
    },
    {
      id: '3',
      title: 'Regulatory Compliance Audit Preparation',
      assignedTo: {
        name: 'David Ochieng',
        employeeId: 'KSB-2022-0089',
        position: 'Compliance Manager',
        department: 'Legal & Compliance'
      },
      assignedBy: 'Gerald Bosire',
      dueDate: addDays(new Date(), 14),
      priority: 'high',
      status: 'pending',
      description: 'Prepare comprehensive documentation and processes for upcoming regulatory compliance audit',
      category: 'compliance',
      estimatedHours: '24 hours',
      dateAssigned: new Date()
    }
  ]

  // Form state for new duty assignment
  const [dutyForm, setDutyForm] = useState<DutyFormData>({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: undefined,
    priority: 'medium',
    category: 'administrative',
    estimatedHours: '',
    specialInstructions: ''
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'administrative': return 'bg-purple-100 text-purple-800'
      case 'strategic': return 'bg-indigo-100 text-indigo-800'
      case 'operational': return 'bg-blue-100 text-blue-800'
      case 'compliance': return 'bg-orange-100 text-orange-800'
      case 'stakeholder': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderMessageStatus = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />
      case 'delivered':
        return (
          <div className="flex -space-x-1">
            <Check className="h-3 w-3 text-gray-400" />
            <Check className="h-3 w-3 text-gray-400" />
          </div>
        )
      case 'read':
        return (
          <div className="flex -space-x-1">
            <Check className="h-3 w-3 text-blue-500" />
            <Check className="h-3 w-3 text-blue-500" />
          </div>
        )
      default:
        return null
    }
  }

  const handleAssignDuty = () => {
    if (editingDuty) {
      console.log('Modifying duty:', { id: editingDuty.id, ...dutyForm })
    } else {
      console.log('Assigning new duty:', dutyForm)
    }
    
    // Reset form and editing state
    setDutyForm({
      title: '',
      description: '',
      assignedTo: '',
      dueDate: undefined,
      priority: 'medium',
      category: 'administrative',
      estimatedHours: '',
      specialInstructions: ''
    })
    setEditingDuty(null)
    setViewMode('manage')
  }

  const handleDutyAction = (action: string, dutyId: string) => {
    const duty = assignedDuties.find(d => d.id === dutyId)
    
    if (action === 'modify' && duty) {
      // Find the manager ID based on the assigned name
      const manager = middleManagers.find(m => m.name === duty.assignedTo.name)
      
      // Populate form with existing duty data
      setDutyForm({
        title: duty.title,
        description: duty.description,
        assignedTo: manager?.id || '',
        dueDate: duty.dueDate,
        priority: duty.priority,
        category: duty.category,
        estimatedHours: duty.estimatedHours,
        specialInstructions: ''
      })
      setEditingDuty(duty)
      setViewMode('assign')
    } else if (action === 'followup') {
      setFollowUpDuty(dutyId)
      setFollowUpMessage('')
    } else {
      console.log(`${action} duty:`, dutyId)
    }
  }

  const handleSendFollowUp = () => {
    if (!followUpMessage.trim() || !followUpDuty) return
    
    const newMessage: FollowUpMessage = {
      id: Date.now().toString(),
      dutyId: followUpDuty,
      message: followUpMessage.trim(),
      timestamp: new Date(),
      status: 'sent'
    }
    
    setFollowUpMessages(prev => [...prev, newMessage])
    
    // Simulate message status updates
    setTimeout(() => {
      setFollowUpMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      )
    }, 1000)
    
    setTimeout(() => {
      setFollowUpMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        )
      )
    }, 3000)
    
    console.log('Sending follow-up message:', {
      dutyId: followUpDuty,
      message: followUpMessage,
      timestamp: new Date()
    })
    
    // Reset follow-up message but keep the chat open
    setFollowUpMessage('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-4xl h-[95vh] max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0" hideCloseButton>
        <DialogHeader className="p-4 sm:p-6 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Duty Management
              </DialogTitle>
              <DialogDescription>
                Assign and manage duties for middle-level management team
              </DialogDescription>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={viewMode === 'manage' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('manage')}
                className={viewMode === 'manage' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                Manage Duties
              </Button>
              <Button
                variant={viewMode === 'assign' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('assign')}
                className={viewMode === 'assign' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                <Plus className="h-4 w-4 mr-1" />
                Assign New
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {viewMode === 'manage' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Active Duty Assignments</h3>
                <Badge variant="outline" className="border-gray-300">
                  {assignedDuties.length} duties assigned
                </Badge>
              </div>

              <div className="grid gap-4">
                {assignedDuties.map((duty) => (
                  <div key={duty.id}>
                    <div className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{duty.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">{duty.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Assigned to: <strong>{duty.assignedTo.name}</strong></span>
                            <span>•</span>
                            <span>Due: <strong>{format(duty.dueDate, 'MMM dd, yyyy')}</strong></span>
                            <span>•</span>
                            <span>Duration: <strong>{duty.estimatedHours}</strong></span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(duty.priority)}>
                            {duty.priority}
                          </Badge>
                          <Badge className={getStatusColor(duty.status)}>
                            {duty.status}
                          </Badge>
                          <Badge className={getCategoryColor(duty.category)}>
                            {duty.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="text-sm text-gray-500">
                          Assigned by {duty.assignedBy} on {format(duty.dateAssigned, 'MMM dd, yyyy')}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDutyAction('modify', duty.id)}
                          >
                            Modify
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDutyAction('followup', duty.id)}
                          >
                            Follow Up
                          </Button>
                          {duty.status === 'completed' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-green-600 hover:text-green-700"
                              onClick={() => handleDutyAction('approve', duty.id)}
                            >
                              ✓ Approve
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Follow-up chat interface */}
                    {followUpDuty === duty.id && (
                      <div className="ml-8 mt-4 space-y-3">
                        {/* Display sent messages */}
                        {followUpMessages
                          .filter(msg => msg.dutyId === duty.id)
                          .map((msg) => (
                            <div key={msg.id} className="flex items-start gap-3">
                              <Avatar className="h-8 w-8 mt-1">
                                <AvatarFallback className="bg-green-600 text-white text-xs">
                                  GB
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-white border rounded-lg p-3 shadow-sm max-w-md">
                                  <p className="text-sm text-gray-800">{msg.message}</p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-gray-500">
                                      {format(msg.timestamp, 'MMM dd, HH:mm')}
                                    </span>
                                    <div className="flex items-center">
                                      {renderMessageStatus(msg.status)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        
                        {/* Message input */}
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarFallback className="bg-green-600 text-white text-xs">
                              GB
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="relative">
                              <Textarea
                                value={followUpMessage}
                                onChange={(e) => setFollowUpMessage(e.target.value)}
                                placeholder={`Write a follow-up message to ${duty.assignedTo.name}...`}
                                rows={2}
                                className="resize-none border-gray-200 focus:border-blue-400 pr-12"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    if (followUpMessage.trim()) {
                                      handleSendFollowUp()
                                    }
                                  }
                                }}
                              />
                              <div className="absolute bottom-2 right-2 flex gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setFollowUpDuty(null)}
                                  className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={handleSendFollowUp}
                                  disabled={!followUpMessage.trim()}
                                  className="h-7 w-7 p-0 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300"
                                >
                                  <Send className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4 max-w-2xl mx-auto">
                <div>
                  <Label htmlFor="duty-title">Duty Title</Label>
                  <Input
                    id="duty-title"
                    placeholder="e.g., Strategic Planning Review"
                    value={dutyForm.title}
                    onChange={(e) => setDutyForm({...dutyForm, title: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="assigned-to">Assign To</Label>
                  <Select value={dutyForm.assignedTo} onValueChange={(value) => setDutyForm({...dutyForm, assignedTo: value})}>
                    <SelectTrigger className="h-12 items-start text-left">
                      <SelectValue placeholder="Select manager to assign duty">
                        {dutyForm.assignedTo && (() => {
                          const selectedManager = middleManagers.find(m => m.id === dutyForm.assignedTo)
                          return selectedManager ? (
                            <div className="flex flex-col items-start text-left">
                              <span className="font-medium text-sm">{selectedManager.name}</span>
                              <span className="text-xs text-gray-500">{selectedManager.position} - {selectedManager.department}</span>
                            </div>
                          ) : null
                        })()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {middleManagers.map((manager) => (
                        <SelectItem key={manager.id} value={manager.id}>
                          <div className="flex flex-col items-start text-left py-1">
                            <span className="font-medium text-sm">{manager.name}</span>
                            <span className="text-xs text-gray-500">{manager.position} - {manager.department}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={dutyForm.priority} onValueChange={(value: 'high' | 'medium' | 'low') => setDutyForm({...dutyForm, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={dutyForm.category} onValueChange={(value: any) => setDutyForm({...dutyForm, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administrative">Administrative</SelectItem>
                        <SelectItem value="strategic">Strategic</SelectItem>
                        <SelectItem value="operational">Operational</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="stakeholder">Stakeholder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 8 hours, 2 days"
                    value={dutyForm.estimatedHours}
                    onChange={(e) => setDutyForm({...dutyForm, estimatedHours: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed description of the duty and expectations..."
                    rows={4}
                    value={dutyForm.description}
                    onChange={(e) => setDutyForm({...dutyForm, description: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="special-instructions">Special Instructions</Label>
                  <Textarea
                    id="special-instructions"
                    placeholder="Any special instructions, deadlines, or requirements..."
                    rows={3}
                    value={dutyForm.specialInstructions}
                    onChange={(e) => setDutyForm({...dutyForm, specialInstructions: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />
                        {dutyForm.dueDate ? format(dutyForm.dueDate, 'PPP') : 'Select due date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={dutyForm.dueDate}
                        onSelect={(date) => setDutyForm({...dutyForm, dueDate: date})}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  {/* Buttons positioned directly below due date */}
                  <div className="flex justify-end gap-3 mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setViewMode('manage')
                        setEditingDuty(null)
                        setDutyForm({
                          title: '',
                          description: '',
                          assignedTo: '',
                          dueDate: undefined,
                          priority: 'medium',
                          category: 'administrative',
                          estimatedHours: '',
                          specialInstructions: ''
                        })
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAssignDuty}
                      disabled={!dutyForm.title || !dutyForm.assignedTo || !dutyForm.description}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {editingDuty ? 'Update Duty' : 'Assign Duty'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
