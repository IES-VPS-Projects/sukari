"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Plus, X, Clock, Mail, MessageSquare, Users, FileText, Type, Calendar as CalendarDays, Tag, MapPin, Link2, AlertTriangle, Smartphone } from "lucide-react"
import { format } from "date-fns"

interface ScheduleMeetingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SuggestedTime {
  time: string
  isSelected: boolean
}

export function ScheduleMeetingModal({ open, onOpenChange }: ScheduleMeetingModalProps) {
  const [date, setDate] = useState<Date>()
  const [attendees, setAttendees] = useState<string[]>([])
  const [newAttendee, setNewAttendee] = useState("")
  const [suggestedTimes, setSuggestedTimes] = useState<SuggestedTime[]>([
    { time: "11:30 - 12:00", isSelected: true },
    { time: "12:10 - 12:40", isSelected: false }
  ])
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    meetingLink: "",
    type: "",
    isVirtual: false,
    priority: "medium",
    getNotifiedOn: "slack", // slack or email
    reminderTime: "1hour", // 1hour, 15min, 30min, etc.
  })

  const handleAddAttendee = () => {
    if (newAttendee.trim() && !attendees.includes(newAttendee.trim())) {
      setAttendees([...attendees, newAttendee.trim()])
      setNewAttendee("")
    }
  }

  const handleRemoveAttendee = (email: string) => {
    setAttendees(attendees.filter((a) => a !== email))
  }

  const handleSuggestedTimeSelect = (index: number) => {
    setSuggestedTimes(prev => prev.map((time, i) => ({
      ...time,
      isSelected: i === index
    })))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedTime = suggestedTimes.find(t => t.isSelected)
    console.log("Creating meeting:", { 
      ...formData, 
      date, 
      attendees, 
      selectedTime: selectedTime?.time 
    })
    onOpenChange(false)
    // Reset form
    setFormData({
      title: "",
      description: "",
      location: "",
      meetingLink: "",
      type: "",
      isVirtual: false,
      priority: "medium",
      getNotifiedOn: "slack",
      reminderTime: "1hour",
    })
    setDate(undefined)
    setAttendees([])
    setSuggestedTimes([
      { time: "11:30 - 12:00", isSelected: true },
      { time: "12:10 - 12:40", isSelected: false }
    ])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New meeting</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Meeting Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4 text-black" />
              <Input
                placeholder="Meeting Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-green-500"
                required
              />
            </div>
          </div>

          {/* Attendees */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-black" />
              <div className="flex-1">
                <Input
                  placeholder="Add attendees"
                  value={newAttendee}
                  onChange={(e) => setNewAttendee(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddAttendee())}
                  className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-green-500"
                />
              </div>
            </div>
            {attendees.length > 0 && (
              <div className="ml-6 flex flex-wrap gap-2">
                {attendees.map((email) => (
                  <Badge key={email} variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                    {email}
                    <button
                      type="button"
                      onClick={() => handleRemoveAttendee(email)}
                      className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Date and Time Section */}
          <div className="grid grid-cols-2 gap-4">
            {/* Meeting Type */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-black" />
                <Label className="text-sm font-medium">Meeting Type</Label>
              </div>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="webinar">Webinar</SelectItem>
                  <SelectItem value="townhall">Town Hall</SelectItem>
                  <SelectItem value="lecture">Lecture</SelectItem>
                  <SelectItem value="class">Class</SelectItem>
                  <SelectItem value="liveevent">Live Event</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-black" />
                <Label className="text-sm font-medium">Priority</Label>
              </div>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Medium" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-black" />
                <Label className="text-sm font-medium">Date</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Start Time */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-black" />
                <Label className="text-sm font-medium">Start Time</Label>
              </div>
              <Input
                type="time"
                placeholder="--:--"
                className="w-full"
              />
            </div>

            {/* End Time */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-black" />
                <Label className="text-sm font-medium">End Time</Label>
              </div>
              <Input
                type="time"
                placeholder="--:--"
                className="w-full"
              />
            </div>
          </div>

          {/* Suggested Times */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Suggested times</Label>
            <div className="flex items-center gap-2">
              {suggestedTimes.map((timeSlot, index) => (
                <Button
                  key={index}
                  type="button"
                  variant={timeSlot.isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSuggestedTimeSelect(index)}
                  className={`h-8 px-3 ${timeSlot.isSelected 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {timeSlot.time}
                </Button>
              ))}
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Virtual Meeting Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isVirtual"
                checked={formData.isVirtual}
                onCheckedChange={(checked) => setFormData({ ...formData, isVirtual: checked as boolean })}
              />
              <Label htmlFor="isVirtual" className="text-sm font-medium">Online Meeting</Label>
            </div>

            {formData.isVirtual ? (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Meeting Link</Label>
                <Input
                  placeholder="https://ise-agri-ksb-nextcloud.1j5d7td.io"
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                  className="w-full"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Location</Label>
                <Input
                  placeholder="Nairobi, Kenya"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Meeting Details */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-black mt-1" />
              <Textarea
                placeholder="Meeting details (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border-0 border-b border-gray-200 rounded-none px-0 resize-none focus-visible:ring-0 focus-visible:border-green-500 min-h-[24px]"
                rows={1}
                style={{ height: 'auto' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Get notified on */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Get notified on</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={formData.getNotifiedOn === "slack" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, getNotifiedOn: "slack" })}
                  className={`flex items-center gap-2 ${formData.getNotifiedOn === "slack"
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'border-gray-300'
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                  Agri
                </Button>
                <Button
                  type="button"
                  variant={formData.getNotifiedOn === "email" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, getNotifiedOn: "email" })}
                  className={`flex items-center gap-2 ${formData.getNotifiedOn === "email"
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'border-gray-300'
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
              </div>
            </div>

            {/* Set reminder */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Set reminder</Label>
              <Select
                value={formData.reminderTime}
                onValueChange={(value) => setFormData({ ...formData, reminderTime: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5min">5 minutes before event</SelectItem>
                  <SelectItem value="15min">15 minutes before event</SelectItem>
                  <SelectItem value="30min">30 minutes before event</SelectItem>
                  <SelectItem value="1hour">1 hour before event</SelectItem>
                  <SelectItem value="1day">1 day before event</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Send
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
