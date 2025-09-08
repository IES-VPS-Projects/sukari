"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useState } from "react"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  AlertTriangle, 
  FileText, 
  Video, 
  MessageCircle,
  ChevronDown,
  Download,
  Forward,
  Edit,
  Trash2
} from "lucide-react"

interface Meeting {
  id: number
  title: string
  description: string
  time: string
  location: string
  attendees: number
  type: "tactical-briefing" | "strategic-planning" | "mission-debrief" | "training-exercise" | "intelligence-briefing"
  priority: "Critical" | "High" | "Medium" | "Low"
}

interface MeetingDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  meeting: Meeting | null
}

interface ScheduleMeetingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MeetingDetailsModal({ open, onOpenChange, meeting }: MeetingDetailsModalProps) {
  if (!meeting) return null

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800"
      case "High": return "bg-orange-100 text-orange-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Low": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "tactical-briefing": return "Tactical Briefing"
      case "strategic-planning": return "Strategic Planning"
      case "mission-debrief": return "Mission Debrief"
      case "training-exercise": return "Training Exercise"
      case "intelligence-briefing": return "Intelligence Briefing"
      default: return type
    }
  }

  // KSB personnel data based on meeting type
  const getPersonnelForMeeting = (meetingTitle: string) => {
    if (meetingTitle.includes("Board Meeting")) {
      return [
        { name: "Gerald Bosire", role: "Chief Executive Officer", status: "Confirmed", required: true },
        { name: "Sarah Mwangi", role: "Finance Director", status: "Confirmed", required: true },
        { name: "James Kiprotich", role: "Operations Manager", status: "Pending", required: true },
        { name: "Mary Otieno", role: "Legal Advisor", status: "Confirmed", required: false },
        { name: "Peter Achieng", role: "Board Secretary", status: "Optional", required: false }
      ]
    } else if (meetingTitle.includes("Farmer")) {
      return [
        { name: "Grace Wanjiku", role: "Farmer Relations Manager", status: "Confirmed", required: true },
        { name: "John Kimani", role: "Field Extension Officer", status: "Confirmed", required: true },
        { name: "Ann Muthoni", role: "Community Liaison", status: "Pending", required: true },
        { name: "David Ochieng", role: "Agricultural Advisor", status: "Confirmed", required: false },
        { name: "Susan Akinyi", role: "Development Coordinator", status: "Optional", required: false }
      ]
    } else if (meetingTitle.includes("Mill Operators")) {
      return [
        { name: "Robert Kipchoge", role: "Mill Operations Manager", status: "Confirmed", required: true },
        { name: "Catherine Njeri", role: "Quality Control Supervisor", status: "Confirmed", required: true },
        { name: "Michael Wafula", role: "Production Coordinator", status: "Pending", required: true },
        { name: "Alice Chebet", role: "Safety Officer", status: "Confirmed", required: false },
        { name: "Daniel Mutua", role: "Technical Specialist", status: "Optional", required: false }
      ]
    }
    return [
      { name: "KSB Staff Member", role: "Team Lead", status: "Confirmed", required: true },
      { name: "KSB Coordinator", role: "Project Manager", status: "Confirmed", required: true },
      { name: "KSB Advisor", role: "Technical Expert", status: "Pending", required: true },
      { name: "KSB Officer", role: "Support Staff", status: "Confirmed", required: false },
      { name: "KSB Representative", role: "Liaison Officer", status: "Optional", required: false }
    ]
  }

  const personnel = getPersonnelForMeeting(meeting.title)

  // KSB files based on meeting type
  const getFilesForMeeting = (meetingTitle: string) => {
    if (meetingTitle.includes("Board Meeting")) {
      return [
        { name: "Board Meeting Agenda August 2025.pdf", type: "PDF", modified: "15/08/2025" },
        { name: "Financial Report Q2 2025.docx", type: "Document", modified: "14/08/2025" }
      ]
    } else if (meetingTitle.includes("Farmer")) {
      return [
        { name: "Farmer Engagement Report.pdf", type: "PDF", modified: "15/08/2025" },
        { name: "Community Feedback Summary.docx", type: "Document", modified: "14/08/2025" }
      ]
    } else if (meetingTitle.includes("Mill Operators")) {
      return [
        { name: "Mill Operations Review.pdf", type: "PDF", modified: "15/08/2025" },
        { name: "Production Efficiency Report.docx", type: "Document", modified: "14/08/2025" }
      ]
    }
    return [
      { name: "Meeting Documents.pdf", type: "PDF", modified: "15/08/2025" },
      { name: "KSB Guidelines.docx", type: "Document", modified: "14/08/2025" }
    ]
  }

  const files = getFilesForMeeting(meeting.title)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                {meeting.title}
              </DialogTitle>
              <div className="flex gap-2">
                <Badge className={getPriorityColor(meeting.priority)}>
                  {meeting.priority}
                </Badge>
                <Badge variant="outline" className="border-gray-300">
                  {getTypeLabel(meeting.type)}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Forward className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button className="bg-black hover:bg-gray-800">
              <Video className="mr-2 h-4 w-4" />
              Join Conference
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
            <Button variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" />
              Communications
            </Button>
          </div>
        </DialogHeader>

        {/* Horizontal Separator */}
        <div className="border-b border-gray-200"></div>

        <div className="space-y-6">
          {/* Meeting Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Thu 14/08/2025 {meeting.time} - 7:00 PM</p>
                  <p className="text-sm text-gray-600">KSB Conference Room</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">{meeting.location}</p>
                  <p className="text-sm text-gray-600">Kenya Sugar Board Facility</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">You're the meeting organizer.</p>
                  <p className="text-sm text-gray-600">Confirmed {meeting.attendees}, Pending 3</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium mb-2">Meeting Overview</p>
                  <p className="text-sm text-gray-700">
                    {meeting.description || "Comprehensive meeting covering strategic discussions, operational updates, and key decisions for Kenya Sugar Board stakeholders and staff."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Attendees Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Attendees ({personnel.length})
            </h3>
            <div className="space-y-3">
              {personnel.map((person, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-100 text-gray-800 text-sm">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{person.name}</p>
                      <p className="text-xs text-gray-600">{person.role}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={person.status === "Confirmed" ? "default" : person.status === "Pending" ? "secondary" : "outline"}
                    className={
                      person.status === "Confirmed" ? "bg-gray-100 text-black" :
                      person.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-600"
                    }
                  >
                    {person.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Files Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Meeting Files
            </h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                      <CalendarIcon className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-gray-600">Modified on: {file.modified}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              The organiser hasn't added any notes yet
            </p>
          </div>

          <Separator />

          {/* Meeting Insights */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Meeting Insights
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Here's information you might find relevant to this meeting. Other attendees will only see content they have access to.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-100 text-gray-800 text-xs">
                      {index === 0 ? "CK" : "MW"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-600">Modified at {file.modified}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Schedule Meeting Modal for creating new meetings
export function ScheduleMeetingModal({ open, onOpenChange }: ScheduleMeetingModalProps) {
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    title: "",
    attendees: "",
    meetingType: "",
    priority: "Medium",
    startTime: "",
    endTime: "",
    location: "Nairobi, Kenya",
    meetingDetails: "",
    onlineMeeting: false,
    notificationMethod: "agri", // "agri" or "email"
    reminderTime: "1 hour before event"
  })

  const [selectedSuggestedTime, setSelectedSuggestedTime] = useState("11:30 - 12:00")
  const suggestedTimes = ["11:30 - 12:00", "12:10 - 12:40"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating meeting:", { ...formData, date, selectedSuggestedTime })
    // Reset form
    setFormData({
      title: "",
      attendees: "",
      meetingType: "",
      priority: "Medium",
      startTime: "",
      endTime: "",
      location: "Nairobi, Kenya",
      meetingDetails: "",
      onlineMeeting: false,
      notificationMethod: "agri",
      reminderTime: "1 hour before event"
    })
    setDate(undefined)
    setSelectedSuggestedTime("11:30 - 12:00")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-6">
        {/* Header */}
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold">New meeting</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Meeting Information */}
          <div className="space-y-4">
            {/* Meeting Title */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FileText className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                placeholder="Meeting Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="pl-10 border-gray-200"
                required
              />
            </div>

            {/* Attendees */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Users className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                placeholder="Add attendees"
                value={formData.attendees}
                onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                className="pl-10 border-gray-200"
              />
            </div>

            {/* Meeting Type and Priority */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Meeting Type</Label>
                <Select
                  value={formData.meetingType}
                  onValueChange={(value) => setFormData({ ...formData, meetingType: value })}
                >
                  <SelectTrigger className="border-gray-200">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="board-meeting">Board Meeting</SelectItem>
                    <SelectItem value="stakeholder-meeting">Stakeholder Meeting</SelectItem>
                    <SelectItem value="operational-review">Operational Review</SelectItem>
                    <SelectItem value="farmer-engagement">Farmer Engagement</SelectItem>
                    <SelectItem value="mill-operations">Mill Operations</SelectItem>
                    <SelectItem value="compliance-review">Compliance Review</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger className="border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-gray-200"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP").split(",")[0] : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Start Time</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Clock className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    placeholder="--:--"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="pl-10 border-gray-200"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">End Time</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Clock className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    placeholder="--:--"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="pl-10 border-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Suggested Times */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Suggested times</Label>
            <div className="flex gap-2">
              {suggestedTimes.map((time, index) => (
                <div key={time} className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant={selectedSuggestedTime === time ? "default" : "outline"}
                    className={`px-4 py-2 text-sm ${
                      selectedSuggestedTime === time 
                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedSuggestedTime(time)}
                  >
                    {time}
                  </Button>
                  {index === 1 && (
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Location and Details */}
          <div className="space-y-4">
            {/* Online Meeting Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="onlineMeeting"
                checked={formData.onlineMeeting}
                onChange={(e) => setFormData({ ...formData, onlineMeeting: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="onlineMeeting" className="text-sm font-medium text-gray-700">
                Online Meeting
              </Label>
            </div>

            {/* Location */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <MapPin className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="pl-10 border-gray-200"
              />
            </div>

            {/* Meeting Details */}
            <div className="relative">
              <div className="absolute left-3 top-3">
                <FileText className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                placeholder="Meeting details (optional)"
                value={formData.meetingDetails}
                onChange={(e) => setFormData({ ...formData, meetingDetails: e.target.value })}
                className="pl-10 border-gray-200"
              />
            </div>
          </div>

          {/* Notifications and Reminders */}
          <div className="space-y-4">
            {/* Get notified on */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Get notified on</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={formData.notificationMethod === "agri" ? "default" : "outline"}
                  className={`px-4 py-2 text-sm ${
                    formData.notificationMethod === "agri" 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setFormData({ ...formData, notificationMethod: "agri" })}
                >
                  Agri
                </Button>
                <Button
                  type="button"
                  variant={formData.notificationMethod === "email" ? "default" : "outline"}
                  className={`px-4 py-2 text-sm ${
                    formData.notificationMethod === "email" 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setFormData({ ...formData, notificationMethod: "email" })}
                >
                  Email
                </Button>
              </div>
            </div>

            {/* Set reminder */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Set reminder</Label>
              <Select
                value={formData.reminderTime}
                onValueChange={(value) => setFormData({ ...formData, reminderTime: value })}
              >
                <SelectTrigger className="border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15 minutes before event">15 minutes before event</SelectItem>
                  <SelectItem value="30 minutes before event">30 minutes before event</SelectItem>
                  <SelectItem value="1 hour before event">1 hour before event</SelectItem>
                  <SelectItem value="1 day before event">1 day before event</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer */}
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