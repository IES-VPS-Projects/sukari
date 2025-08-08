"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight, Search, Send, Mic, Plus, Clock, X, MapPin, Users, List, Edit, Video, MessageCircle, Maximize2, RefreshCw, ChevronDown } from "lucide-react"
import { GoFilter } from "react-icons/go"
import { HiSparkles } from "react-icons/hi2"
import { NewEventModal } from "@/components/modals/new-event-modal"
import { PortalLayout } from "@/components/portal-layout"

// Sample events data with enhanced properties for filtering
const events = [
  {
    id: 1,
    title: "Mill Inspection - Chemelil",
    time: "10:00 AM",
    date: "2025-08-08",
    type: "Inspection",
    category: "inspection",
    mode: "physical",
    recurring: false,
    aiPrioritized: true,
  },
  {
    id: 2,
    title: "Board Meeting - Q3 Strategy",
    time: "2:00 PM",
    date: "2025-08-09",
    type: "Meeting",
    category: "meeting",
    mode: "virtual",
    recurring: true,
    aiPrioritized: false,
  },
  {
    id: 3,
    title: "Compliance Deadline - License Renewal",
    time: "11:59 PM",
    date: "2025-08-10",
    type: "Compliance Deadline",
    category: "compliance",
    mode: "administrative",
    recurring: false,
    aiPrioritized: true,
  },
  {
    id: 4,
    title: "Stakeholder Appointment",
    time: "3:00 PM",
    date: "2025-08-12",
    type: "Appointment",
    category: "appointment",
    mode: "physical",
    recurring: false,
    aiPrioritized: false,
  },
]

// AI Chat messages
interface ChatMessage {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

const quickPrompts = [
  "Schedule a meeting",
  "Set a compliance reminder", 
  "Prioritize my tasks",
  "Check upcoming deadlines"
]

const quickActions = [
  "Schedule Board Meeting",
  "Plan Mill Inspection",
  "Set Compliance Deadline",
  "Book Stakeholder Meeting"
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 8)) // August 8, 2025 (current date)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null) // No date selected by default
  const [viewMode, setViewMode] = useState<"year" | "month" | "week">("month")
  const [newEventOpen, setNewEventOpen] = useState(false)
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [editEventOpen, setEditEventOpen] = useState(false)
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [filters, setFilters] = useState({
    category: "all",
    mode: "all",
    recurring: "all"
  })
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! How can I assist you with your schedule today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState("")
  const [isVoiceMode, setIsVoiceMode] = useState(false)

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Get events for selected date
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return filteredEvents.filter(event => event.date === dateStr)
  }

  // Apply filters to events
  const applyFilters = () => {
    let filtered = events
    
    if (filters.category !== "all") {
      filtered = filtered.filter(event => event.category === filters.category)
    }
    
    if (filters.mode !== "all") {
      filtered = filtered.filter(event => event.mode === filters.mode)
    }
    
    if (filters.recurring !== "all") {
      const isRecurring = filters.recurring === "true"
      filtered = filtered.filter(event => event.recurring === isRecurring)
    }
    
    setFilteredEvents(filtered)
  }

  // Navigation functions
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const navigateYear = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setFullYear(newDate.getFullYear() - 1)
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1)
    }
    setCurrentDate(newDate)
  }

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setDate(newDate.getDate() + 7)
    }
    setCurrentDate(newDate)
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const today = new Date()
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      
      const dayEvents = getEventsForDate(date)
      
      days.push({
        date: date,
        day: date.getDate(),
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
        isSelected: selectedDate ? date.toDateString() === selectedDate.toDateString() : false,
        hasEvents: dayEvents.length > 0
      })
    }
    
    return days
  }

  // Generate year view
  const generateYearView = () => {
    const year = currentDate.getFullYear()
    const months = []
    
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(year, i, 1)
      const monthEvents = filteredEvents.filter(event => {
        const eventDate = new Date(event.date)
        return eventDate.getFullYear() === year && eventDate.getMonth() === i
      })
      
      months.push({
        name: monthNames[i],
        month: i,
        year: year,
        eventsCount: monthEvents.length,
        isSelected: i === currentDate.getMonth()
      })
    }
    
    return months
  }

  // Generate week view
  const generateWeekView = () => {
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    startOfWeek.setDate(startOfWeek.getDate() - day)
    
    const weekDays = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      
      const dayEvents = getEventsForDate(date)
      const today = new Date()
      
      weekDays.push({
        date: date,
        day: date.getDate(),
        dayName: dayNames[i],
        isToday: date.toDateString() === today.toDateString(),
        isSelected: selectedDate ? date.toDateString() === selectedDate.toDateString() : false,
        events: dayEvents
      })
    }
    
    return weekDays
  }

  // Event handlers
  const handleEditEvent = (event: any) => {
    setSelectedEvent(event)
    setEditEventOpen(true)
  }

  const handleCancelEvent = (event: any) => {
    setSelectedEvent(event)
    setCancelConfirmOpen(true)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "Schedule Board Meeting":
        setNewEventOpen(true)
        break
      case "Plan Mill Inspection":
        setNewEventOpen(true)
        break
      case "Set Compliance Deadline":
        setNewEventOpen(true)
        break
      case "Book Stakeholder Meeting":
        setNewEventOpen(true)
        break
      default:
        console.log(`Quick action: ${action}`)
    }
  }

  // AI Chat handlers
  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: chatMessages.length + 1,
        text: inputText,
        isUser: true,
        timestamp: new Date()
      }
      
      setChatMessages([...chatMessages, newMessage])
      setInputText("")
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: chatMessages.length + 2,
          text: generateAIResponse(inputText),
          isUser: false,
          timestamp: new Date()
        }
        setChatMessages(prev => [...prev, aiResponse])
      }, 1000)
    }
  }

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes("schedule") && lowerInput.includes("meeting")) {
      return "I can help you schedule a meeting. Please provide the date, time, and attendees you'd like to invite. Would you like me to check for available time slots?"
    }
    
    if (lowerInput.includes("deadline") || lowerInput.includes("reminder")) {
      return "I can set up compliance deadlines and reminders for you. What specific compliance requirement would you like to track?"
    }
    
    if (lowerInput.includes("prioritize") && lowerInput.includes("task")) {
      return "Based on your current schedule, here are your top priorities: 1. Mill Inspection - Chemelil (Tomorrow, 10:00 AM) - High Priority. 2. Review compliance reports (This week). 3. Prepare for board meeting presentations. Would you like me to reschedule any conflicting items?"
    }
    
    return "I understand you'd like assistance with your calendar. Could you please provide more specific details about what you'd like me to help you with?"
  }

  const handleQuickPrompt = (prompt: string) => {
    setInputText(prompt)
    handleSendMessage()
  }

  // Get navigation function based on view mode
  const getNavigateFunction = () => {
    switch (viewMode) {
      case 'year':
        return navigateYear
      case 'week':
        return navigateWeek
      default:
        return navigateMonth
    }
  }

  // Get display title based on view mode
  const getDisplayTitle = () => {
    switch (viewMode) {
      case 'year':
        return currentDate.getFullYear().toString()
      case 'week':
        const startOfWeek = new Date(currentDate)
        const endOfWeek = new Date(currentDate)
        endOfWeek.setDate(endOfWeek.getDate() + 6)
        return `${monthNames[startOfWeek.getMonth()]} ${startOfWeek.getDate()} - ${monthNames[endOfWeek.getMonth()]} ${endOfWeek.getDate()}, ${startOfWeek.getFullYear()}`
      default:
        return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    }
  }

  // Apply filters when filters change
  useEffect(() => {
    applyFilters()
  }, [filters])

  // Selected date information
  const selectedDateStr = selectedDate ? selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  }) : "No date selected"
  
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <PortalLayout pageTitle="Calendar">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Calendar</h1>
          
          <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search events..."
              className="pl-10 w-64"
            />
          </div>
          
          {/* Filter */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setFilterOpen(true)}
          >
            <GoFilter className="h-4 w-4" />
          </Button>
          
          {/* AI Assistant */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setAiModalOpen(true)}
          >
            <HiSparkles className="h-4 w-4 text-purple-600" />
          </Button>
          
          {/* New Event */}
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setNewEventOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => getNavigateFunction()('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <h2 className="text-xl font-semibold">
                    {getDisplayTitle()}
                  </h2>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => getNavigateFunction()('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {(['year', 'month', 'week'] as const).map((mode) => (
                    <Button
                      key={mode}
                      variant={viewMode === mode ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode(mode)}
                      className={viewMode === mode ? "bg-green-600 text-white shadow-sm hover:bg-green-700" : "hover:bg-green-100"}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Render different views based on viewMode */}
              {viewMode === 'year' && (
                <div className="grid grid-cols-3 gap-4">
                  {generateYearView().map((month) => (
                    <div
                      key={month.month}
                      onClick={() => {
                        setCurrentDate(new Date(month.year, month.month, 1))
                        setViewMode('month')
                      }}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-green-50 hover:border-green-300
                        ${month.isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200'}
                      `}
                    >
                      <h3 className="font-semibold text-center">{month.name}</h3>
                      <p className="text-sm text-gray-600 text-center mt-2">
                        {month.eventsCount} event{month.eventsCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {viewMode === 'week' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-1">
                    {generateWeekView().map((day, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          // If clicking today's date, clear selection, otherwise set the selected date
                          if (day.isToday) {
                            setSelectedDate(null)
                          } else {
                            setSelectedDate(day.date)
                          }
                        }}
                        className={`
                          border-2 rounded-lg p-4 cursor-pointer transition-all hover:bg-green-50 hover:border-green-300
                          ${day.isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200'}
                          ${day.isToday ? 'bg-blue-500' : ''}
                        `}
                      >
                        <div className="text-center">
                          <div className={`text-sm font-medium ${day.isToday ? 'text-black' : ''}`}>{day.dayName}</div>
                          <div className={`text-lg font-bold ${day.isToday ? 'text-black' : ''}`}>{day.day}</div>
                          <div className="mt-2 space-y-1">
                            {day.events.slice(0, 3).map((event) => (
                              <div key={event.id} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {event.title}
                              </div>
                            ))}
                            {day.events.length > 3 && (
                              <div className="text-xs text-gray-500">+{day.events.length - 3} more</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {viewMode === 'month' && (
                <div className="grid grid-cols-7 gap-1">
                  {/* Day Headers */}
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-gray-500 py-3"
                    >
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar Days */}
                  {generateCalendarDays().map((day, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (day.isCurrentMonth) {
                          // If clicking today's date, clear selection, otherwise set the selected date
                          if (day.isToday) {
                            setSelectedDate(null)
                          } else {
                            setSelectedDate(day.date)
                          }
                        }
                      }}
                      className={`
                        aspect-square flex flex-col items-center justify-center text-sm cursor-pointer transition-all relative
                        ${!day.isCurrentMonth ? 'text-gray-300' : 'border rounded-lg border-gray-200'}
                        ${day.isToday ? 'bg-blue-500 text-white font-bold border-blue-500' : ''}
                        ${day.isSelected && !day.isToday ? 'border-green-500 bg-green-50' : ''}
                        ${day.isCurrentMonth && !day.isToday && !day.isSelected ? 'hover:bg-green-50 hover:border-green-300' : ''}
                      `}
                    >
                      <span>{day.day}</span>
                      {day.hasEvents && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Selected Day Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{selectedDateStr}</CardTitle>
              <p className="text-sm text-gray-600">
                {selectedDate ? (
                  `${selectedDateEvents.length} event${selectedDateEvents.length !== 1 ? 's' : ''} scheduled`
                ) : (
                  "Select a date to view events"
                )}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedDate ? (
                selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                    {/* Priority Color Bar */}
                    <div className={`h-1 w-full ${event.aiPrioritized ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                    
                    {/* Event Header */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg text-gray-900">{event.title}</h3>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mb-4">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Video className="h-4 w-4" />
                          Join
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          Chat
                        </Button>
                      </div>
                      
                      {/* Event Details */}
                      <div className="space-y-3">
                        {/* Date and Time */}
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-700">{event.time}</span>
                            <span className="text-sm text-gray-700">•</span>
                            <span className="text-sm text-gray-700">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: '2-digit', day: '2-digit', year: 'numeric' })}</span>
                            {event.recurring && (
                              <span title="Recurring event">
                                <RefreshCw className="h-3 w-3 text-gray-500" />
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Location */}
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            {event.mode === 'virtual' ? 'Microsoft Teams Meeting' : 
                             event.mode === 'physical' ? 'Conference Room A' : 
                             'Administrative Office'}
                          </span>
                        </div>
                        
                        {/* Organizer */}
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-3 w-3 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-700">You're the organiser.</div>
                            <div className="text-xs text-gray-500">Accepted 1, Didn't respond 2</div>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <div className="flex items-start gap-3">
                          <List className="h-4 w-4 text-gray-500 mt-0.5" />
                          <div className="text-sm text-gray-700">
                            {event.category === 'inspection' ? 'Routine inspection of mill operations and compliance review' :
                             event.category === 'meeting' ? 'Strategic planning session for Q3 initiatives' :
                             event.category === 'compliance' ? 'Review and renewal of operational licenses' :
                             'Stakeholder consultation and project updates'}
                          </div>
                        </div>
                        
                        {/* Event Type Badge */}
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {event.type}
                          </Badge>
                          {event.aiPrioritized && (
                            <Badge variant="outline" className="text-xs border-purple-200 text-purple-600">
                              <HiSparkles className="h-3 w-3 mr-1" />
                              AI Priority
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {/* Bottom Action Buttons */}
                      <div className="flex gap-2 mt-4 pt-4 border-t">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handleEditEvent(event)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleCancelEvent(event)}
                        >
                          <X className="h-4 w-4" />
                          Cancel
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No events scheduled for this day
                </p>
              )
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Select a date to view events
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-sm"
                    onClick={() => handleQuickAction(action)}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filter Modal */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Events</DialogTitle>
            <DialogDescription>
              Filter calendar events by category, mode, or recurrence status.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="meeting">Meetings</SelectItem>
                  <SelectItem value="inspection">Inspections</SelectItem>
                  <SelectItem value="compliance">Compliance Deadlines</SelectItem>
                  <SelectItem value="appointment">Appointments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Mode</label>
              <Select value={filters.mode} onValueChange={(value) => setFilters({...filters, mode: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modes</SelectItem>
                  <SelectItem value="physical">Physical</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                  <SelectItem value="administrative">Administrative</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Recurrence</label>
              <Select value={filters.recurring} onValueChange={(value) => setFilters({...filters, recurring: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select recurrence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="true">Recurring Only</SelectItem>
                  <SelectItem value="false">One-time Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  setFilters({ category: "all", mode: "all", recurring: "all" })
                  setFilterOpen(false)
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
              <Button onClick={() => setFilterOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Event Modal */}
      <Dialog open={editEventOpen} onOpenChange={setEditEventOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Modify the details of "{selectedEvent?.title}"
            </DialogDescription>
          </DialogHeader>
          {/* This would be the same form as NewEventModal with pre-filled values */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditEventOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setEditEventOpen(false)}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Modal */}
      <Dialog open={cancelConfirmOpen} onOpenChange={setCancelConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel "{selectedEvent?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCancelConfirmOpen(false)}>
              Keep Event
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                // Handle event cancellation logic here
                setCancelConfirmOpen(false)
              }}
            >
              Cancel Event
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Assistant Modal */}
      <Dialog open={aiModalOpen} onOpenChange={setAiModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HiSparkles className="h-5 w-5 text-purple-600" />
              AI Assistant
            </DialogTitle>
          </DialogHeader>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-purple-100 text-purple-600">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          {chatMessages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-xs"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t pt-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your request here..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsVoiceMode(!isVoiceMode)}
                className={isVoiceMode ? 'bg-red-100' : ''}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <NewEventModal open={newEventOpen} onOpenChange={setNewEventOpen} />
    </div>
    </PortalLayout>
  )
}
