"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, FileText, CheckCircle, AlertTriangle, Star, Phone, ChevronRight, ChevronLeft, Menu } from "lucide-react"
import { format, addDays, isToday, isTomorrow } from "date-fns"
import { Separator } from "@/components/ui/separator"

interface DutiesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Participant {
  name: string
  employeeId: string
  position: string
  phone: string
}

interface Duty {
  id: string
  title: string
  dutyRole: string
  shiftType: string
  specialInstructions?: string
  startDate: Date
  endDate: Date
  startTime: string
  endTime: string
  duration: string
  totalWorkedHours?: string
  location: string
  type: 'meeting' | 'inspection' | 'administrative' | 'review' | 'stakeholder' | 'planning' | 'operational'
  priority: 'high' | 'medium' | 'low'
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled'
  participants: Participant[]
  inCharge: boolean
}

export function DutiesModal({ open, onOpenChange }: DutiesModalProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDuty, setSelectedDuty] = useState<string | null>(null)
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  
  // KSB duties data - adapted from the current duties modal content
  const duties: Duty[] = [
    {
      id: '1',
      title: 'Sugar Production Review Meeting',
      dutyRole: 'Meeting Chairperson',
      shiftType: 'day',
      specialInstructions: 'Weekly review of sugar production across all factories - focus on efficiency improvements',
      startDate: new Date(),
      endDate: new Date(),
      startTime: '09:00',
      endTime: '11:00',
      duration: '2 hours',
      location: 'Conference Room A',
      type: 'meeting',
      priority: 'high',
      status: 'upcoming',
      participants: [
        { name: 'John Munyaka', employeeId: 'KSB-2021-0034', position: 'Production Manager', phone: '0701234567' },
        { name: 'Mary Wanjiku', employeeId: 'KSB-2019-0087', position: 'Quality Assurance Lead', phone: '0722345678' }
      ],
      inCharge: true
    },
    {
      id: '2',
      title: 'Farmer Liaison Committee Meeting',
      dutyRole: 'Agricultural Officer',
      shiftType: 'day',
      startDate: new Date(),
      endDate: new Date(),
      startTime: '14:00',
      endTime: '16:00',
      duration: '2 hours',
      location: 'Board Room',
      type: 'stakeholder',
      priority: 'medium',
      status: 'upcoming',
      participants: [
        { name: 'Peter Kiprotich', employeeId: 'KSB-2020-0156', position: 'Agricultural Extension Officer', phone: '0733456789' }
      ],
      inCharge: false
    },
    {
      id: '3',
      title: 'Board of Directors Presentation',
      dutyRole: 'Presenter',
      shiftType: 'day',
      startDate: addDays(new Date(), 1),
      endDate: addDays(new Date(), 1),
      startTime: '10:00',
      endTime: '12:00',
      duration: '2 hours',
      location: 'Executive Conference Hall',
      type: 'administrative',
      priority: 'high',
      status: 'upcoming',
      participants: [
        { name: 'Sarah Njeri', employeeId: 'KSB-2018-0012', position: 'Senior Manager', phone: '0744567890' }
      ],
      inCharge: true
    },
    {
      id: '4',
      title: 'Factory Safety Inspection',
      dutyRole: 'Lead Inspector',
      shiftType: 'day',
      startDate: addDays(new Date(), 2),
      endDate: addDays(new Date(), 2),
      startTime: '08:00',
      endTime: '12:00',
      duration: '4 hours',
      location: 'Chemelil Sugar Factory',
      type: 'inspection',
      priority: 'medium',
      status: 'upcoming',
      participants: [
        { name: 'David Ochieng', employeeId: 'KSB-2022-0089', position: 'Safety Officer', phone: '0755678901' },
        { name: 'Grace Wanjala', employeeId: 'KSB-2021-0234', position: 'Factory Manager', phone: '0766789012' }
      ],
      inCharge: true
    },
    {
      id: '5',
      title: 'Strategic Planning Session',
      dutyRole: 'Strategic Planning Coordinator',
      shiftType: 'day',
      startDate: addDays(new Date(), 0),
      endDate: addDays(new Date(), 3),
      startTime: '09:00',
      endTime: '17:00',
      duration: '8 hours',
      totalWorkedHours: '16 hours (2 of 4 days completed)',
      location: 'Retreat Center',
      type: 'planning',
      priority: 'high',
      status: 'in-progress',
      participants: [
        { name: 'Michael Kimani', employeeId: 'KSB-2017-0045', position: 'Executive Team Lead', phone: '0777890123' },
        { name: 'Janet Akinyi', employeeId: 'KSB-2019-0156', position: 'Department Head', phone: '0788901234' }
      ],
      inCharge: true
    }
  ]

  const getDateRange = () => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(new Date(), i))
    }
    return dates
  }

  const getDutiesForDate = (date: Date) => {
    return duties.filter(duty => 
      duty.startDate.toDateString() === date.toDateString()
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users className="h-4 w-4" />
      case 'inspection': return <CheckCircle className="h-4 w-4" />
      case 'administrative': return <FileText className="h-4 w-4" />
      case 'review': return <Clock className="h-4 w-4" />
      case 'stakeholder': return <Users className="h-4 w-4" />
      case 'planning': return <Star className="h-4 w-4" />
      case 'operational': return <MapPin className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800'
      case 'inspection': return 'bg-yellow-100 text-yellow-800'
      case 'administrative': return 'bg-purple-100 text-purple-800'
      case 'review': return 'bg-green-100 text-green-800'
      case 'stakeholder': return 'bg-orange-100 text-orange-800'
      case 'planning': return 'bg-red-100 text-red-800'
      case 'operational': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'MMM dd')
  }

  const selectedDateDuties = getDutiesForDate(selectedDate)
  const activeDuty = selectedDuty ? duties.find(d => d.id === selectedDuty) : selectedDateDuties[0]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-6xl h-[95vh] max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 sm:p-6 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Assigned Duties
          </DialogTitle>
          <DialogDescription>
            View and manage your assigned duties and responsibilities
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-6">
            {/* Date Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Date</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {getDateRange().map((date) => (
                  <Button
                    key={date.toISOString()}
                    variant={selectedDate.toDateString() === date.toDateString() ? "default" : "outline"}
                    className={`min-w-[100px] flex-shrink-0 ${
                      selectedDate.toDateString() === date.toDateString() 
                        ? "bg-green-600 hover:bg-green-700" 
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedDate(date)
                      setSelectedDuty(null)
                    }}
                  >
                    <div className="text-center">
                      <div className="text-sm font-medium">{formatDateLabel(date)}</div>
                      <div className="text-xs opacity-75">{format(date, 'EEE')}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Selected Date Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Duties for {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
                </h3>
                <Badge variant="outline" className="border-gray-300">
                  {selectedDateDuties.length} {selectedDateDuties.length === 1 ? 'Duty' : 'Duties'}
                </Badge>
              </div>
            </div>

            {/* Duties List */}
            {selectedDateDuties.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No duties scheduled</h3>
                <p className="text-gray-600">You have no assigned duties for this date.</p>
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-3 sm:gap-6 relative">
                {/* Duty List Sidebar - Collapsible */}
                <div className={`${sidebarExpanded ? 'col-span-4' : 'col-span-2 sm:col-span-1'} space-y-3 transition-all duration-300`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium text-gray-700 mb-2 ${!sidebarExpanded && 'sr-only'}`}>Duties List</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 p-0 rounded-full"
                      onClick={() => setSidebarExpanded(!sidebarExpanded)}
                    >
                      {sidebarExpanded ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                {selectedDateDuties.map((duty) => (
                      <div 
                        key={duty.id} 
                        className={`rounded-lg border cursor-pointer transition-all ${
                          selectedDuty === duty.id ? 'bg-green-600 text-white border-green-600' : 'bg-white hover:bg-gray-50'
                        } ${sidebarExpanded ? 'p-3' : 'p-2'}`}
                        onClick={() => setSelectedDuty(duty.id)}
                      >
                        {sidebarExpanded ? (
                          <>
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                            {getTypeIcon(duty.type)}
                                <span className="font-medium">{duty.title}</span>
                              </div>
                              <Badge className={`${selectedDuty === duty.id ? 'bg-white text-green-600' : getTypeColor(duty.type)}`}>
                                {duty.type}
                            </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className={selectedDuty === duty.id ? 'text-gray-200' : 'text-gray-500'}>
                                {duty.startTime} - {duty.endTime}
                              </span>
                              <span className={selectedDuty === duty.id ? 'text-gray-200' : 'text-gray-500'}>
                                {duty.location}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-1 text-center">
                            <div className={`rounded-full p-1.5 ${selectedDuty === duty.id ? 'bg-white' : 'bg-gray-100'} mb-1`}>
                              {getTypeIcon(duty.type)}
                            </div>
                            <span className="text-xs font-medium truncate w-full">
                              {duty.startTime}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duty Details */}
                <div className={`${sidebarExpanded ? 'col-span-8' : 'col-span-10 sm:col-span-11'} transition-all duration-300`}>
                  {activeDuty && (
                    <div className="border rounded-lg overflow-hidden bg-gray-50 transition-all duration-300">
                      {/* Officer in charge banner */}
                      {activeDuty.inCharge && (
                        <div className="bg-orange-500 text-white px-4 py-3 flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          <span>You are in charge of this duty</span>
                        </div>
                      )}
                      
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Assignment Details</h3>
                        
                        <div className="grid grid-cols-2 gap-y-3 gap-x-6 mb-6">
                          <div className="flex gap-8">
                            <span className="text-gray-600 min-w-[120px]">Duty Role:</span>
                            <span className="font-medium">{activeDuty.dutyRole}</span>
                          </div>
                          <div className="flex gap-8">
                            <span className="text-gray-600 min-w-[120px]">Shift Type:</span>
                            <span className="font-medium">{activeDuty.shiftType}</span>
                          </div>
                          <div className="flex gap-8 col-span-2">
                            <span className="text-gray-600 min-w-[120px]">Special Instructions:</span>
                            <span className="font-medium">{activeDuty.specialInstructions || '-'}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-4">Schedule</h3>
                        
                        <div className="grid grid-cols-2 gap-y-3 gap-x-6 mb-6">
                          <div className="flex gap-8">
                            <span className="text-gray-600 min-w-[120px]">Start Date:</span>
                            <span className="font-medium">{format(activeDuty.startDate, 'MMMM do yyyy')}</span>
                          </div>
                          <div className="flex gap-8">
                            <span className="text-gray-600 min-w-[120px]">End Date:</span>
                            <span className="font-medium">{format(activeDuty.endDate, 'MMMM do yyyy')}</span>
                          </div>
                          <div className="flex gap-8">
                            <span className="text-gray-600 min-w-[120px]">Start Time:</span>
                            <span className="font-medium">{activeDuty.startTime}</span>
                          </div>
                          <div className="flex gap-8">
                            <span className="text-gray-600 min-w-[120px]">End Time:</span>
                            <span className="font-medium">{activeDuty.endTime}</span>
                      </div>
                          <div className="flex gap-8">
                            <span className="text-gray-600 min-w-[120px]">Duration:</span>
                            <span className="font-medium">{activeDuty.duration}</span>
                              </div>
                          <div className="flex gap-8">
                            <span className="text-gray-600 min-w-[120px]">Total Worked Hours:</span>
                            <span className="font-medium">{activeDuty.totalWorkedHours || 'Not started'}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold mb-4">Team Information</h3>
                        
                        <div className="space-y-3 mb-6">
                          {activeDuty.participants.map((participant, index) => (
                            <div key={index} className="bg-white rounded border p-3 flex flex-col gap-1">
                              <div className="font-medium">{participant.name}</div>
                              <div className="grid grid-cols-3 text-sm">
                                <div className="flex gap-2">
                                  <span className="text-gray-500">Employee ID:</span>
                                  <span>{participant.employeeId}</span>
                                </div>
                                <div className="flex gap-2">
                                  <span className="text-gray-500">Position:</span>
                                  <span>{participant.position}</span>
                                </div>
                                <div className="flex gap-2">
                                  <span className="text-gray-500">Phone:</span>
                                  <span>{participant.phone}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                          </div>
                        
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                          Submit Report
                        </Button>
                      </div>
                        </div>
                      )}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
