"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Search, Send, Mic, Plus, Clock } from "lucide-react"
import { GoFilter } from "react-icons/go"
import { HiSparkles } from "react-icons/hi2"
import { NewEventModal } from "@/components/modals/new-event-modal"

// Sample events data
const events = [
  {
    id: 1,
    title: "Mill Inspection - Chemelil",
    time: "10:00 AM",
    date: "2025-07-31",
    type: "Inspection",
    category: "inspection",
    aiPrioritized: true,
  },
  {
    id: 2,
    title: "Board Meeting - Q3 Strategy",
    time: "2:00 PM",
    date: "2025-07-30",
    type: "Meeting",
    category: "meeting",
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
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 30)) // July 30, 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 6, 31)) // July 31, 2025
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
  const [newEventOpen, setNewEventOpen] = useState(false)
  const [aiModalOpen, setAiModalOpen] = useState(false)
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
    return events.filter(event => event.date === dateStr)
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
      const currentDay = new Date(startDate)
      currentDay.setDate(startDate.getDate() + i)
      
      const isCurrentMonth = currentDay.getMonth() === month
      const isToday = currentDay.toDateString() === today.toDateString()
      const isSelected = currentDay.toDateString() === selectedDate.toDateString()
      const hasEvents = getEventsForDate(currentDay).length > 0
      
      days.push({
        date: currentDay,
        day: currentDay.getDate(),
        isCurrentMonth,
        isToday,
        isSelected,
        hasEvents
      })
    }
    
    return days
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: ChatMessage = {
      id: chatMessages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    const aiResponse: ChatMessage = {
      id: chatMessages.length + 2,
      text: generateAIResponse(inputText),
      isUser: false,
      timestamp: new Date()
    }

    setChatMessages([...chatMessages, userMessage, aiResponse])
    setInputText("")
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

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const selectedDateEvents = getEventsForDate(selectedDate)
  const selectedDateStr = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long"
  })

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              className="pl-10 w-64"
            />
          </div>
          
          {/* Filter */}
          <Button variant="outline" size="sm">
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Calendar */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <h2 className="text-xl font-semibold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigateMonth('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {(['month', 'week', 'day'] as const).map((mode) => (
                    <Button
                      key={mode}
                      variant={viewMode === mode ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode(mode)}
                      className={viewMode === mode ? "bg-white shadow-sm" : ""}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Calendar Grid */}
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
                    onClick={() => day.isCurrentMonth && setSelectedDate(day.date)}
                    className={`
                      aspect-square flex flex-col items-center justify-center text-sm cursor-pointer rounded-lg transition-all relative
                      ${!day.isCurrentMonth ? 'text-gray-300' : ''}
                      ${day.isToday ? 'bg-blue-500 text-white font-bold' : ''}
                      ${day.isSelected && !day.isToday ? 'ring-2 ring-green-500 bg-green-50' : ''}
                      ${day.isCurrentMonth && !day.isToday && !day.isSelected ? 'hover:bg-gray-50' : ''}
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
                {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? 's' : ''} scheduled
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm">{event.title}</h3>
                        {event.aiPrioritized && (
                          <HiSparkles className="h-3 w-3 text-purple-500" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs text-red-600">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No events scheduled for this day
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
                    onClick={() => {
                      // Handle quick action
                      console.log(`Quick action: ${action}`)
                    }}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
  )
}
