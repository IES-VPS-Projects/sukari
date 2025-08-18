"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  MessageSquare,
  FileText,
  Users,
  ChevronDown,
  ArrowLeft,
  Clock,
  MapPin,
  User
} from "lucide-react"
import { LuSquarePen } from 'react-icons/lu'
import { GoInfo } from 'react-icons/go'
import { allMeetingsData } from "@/lib/mockdata"

interface MeetingsCardProps {
  className?: string
}

const MeetingsCard = ({ className }: MeetingsCardProps) => {
  // Modal states
  const [newMeetingOpen, setNewMeetingOpen] = useState(false)
  const [meetingDropdownOpen, setMeetingDropdownOpen] = useState(false)
  const [viewAllMeetingsOpen, setViewAllMeetingsOpen] = useState(false)
  const [selectedMeetingForDetails, setSelectedMeetingForDetails] = useState<string | null>(null)

  // Form state
  const [meetingForm, setMeetingForm] = useState({
    title: '',
    datetime: '',
    location: '',
    attendees: '',
    description: ''
  })

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (meetingDropdownOpen) {
        setMeetingDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [meetingDropdownOpen])

  const handleCreateMeeting = () => {
    console.log('Creating meeting:', meetingForm)
    setMeetingForm({
      title: '',
      datetime: '',
      location: '',
      attendees: '',
      description: ''
    })
    setNewMeetingOpen(false)
  }

  return (
    <>
      <Card className={`rounded-[20px] shadow-lg border-0 bg-white ${className}`}>
        <CardHeader className="pb-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#202020] cursor-pointer" onClick={() => {
              setSelectedMeetingForDetails(null)
              setViewAllMeetingsOpen(true)
            }}>Meetings</CardTitle>
            <div className="relative">
              <div className="flex">
                <Button 
                  size="sm" 
                  className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded-l-lg flex items-center gap-2 shadow-sm border-r-0"
                  onClick={() => setNewMeetingOpen(true)}
                >
                  <LuSquarePen className="h-4 w-4" />
                  New
                </Button>
                <Button 
                  size="sm" 
                  className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-2 py-1 rounded-r-lg flex items-center shadow-sm"
                  onClick={() => setMeetingDropdownOpen(!meetingDropdownOpen)}
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>
              
              {/* Dropdown Menu */}
              {meetingDropdownOpen && (
                <div className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg z-20 w-48">
                  <div className="py-1">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b">Event</div>
                    <button
                      onClick={() => {
                        setMeetingForm({...meetingForm, title: 'General Meeting'})
                        setNewMeetingOpen(true)
                        setMeetingDropdownOpen(false)
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <Calendar className="h-4 w-4" />
                      Event
                    </button>
                    <button
                      onClick={() => {
                        setMeetingForm({...meetingForm, title: 'Channel Meeting'})
                        setNewMeetingOpen(true)
                        setMeetingDropdownOpen(false)
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Channel meeting
                    </button>
                    
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-t">Organisation templates</div>
                    <button
                      onClick={() => {
                        setMeetingForm({...meetingForm, title: 'Webinar Session'})
                        setNewMeetingOpen(true)
                        setMeetingDropdownOpen(false)
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <Calendar className="h-4 w-4" />
                      Webinar
                    </button>
                    <button
                      onClick={() => {
                        setMeetingForm({...meetingForm, title: 'Town Hall Meeting'})
                        setNewMeetingOpen(true)
                        setMeetingDropdownOpen(false)
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <Users className="h-4 w-4" />
                      Town hall
                    </button>
                    
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-t">Class</div>
                    <button
                      onClick={() => {
                        setMeetingForm({...meetingForm, title: 'Lecture Session'})
                        setNewMeetingOpen(true)
                        setMeetingDropdownOpen(false)
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <FileText className="h-4 w-4" />
                      Lecture
                    </button>
                    
                    <div className="border-t">
                      <button
                        onClick={() => {
                          setNewMeetingOpen(true)
                          setMeetingDropdownOpen(false)
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                      >
                        <FileText className="h-4 w-4" />
                        View all templates
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          <div 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-yellow-50 hover:shadow-md cursor-pointer transition-all duration-200"
            onClick={() => {
              setSelectedMeetingForDetails('meeting-1')
              setViewAllMeetingsOpen(true)
            }}
          >
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-[#202020]">Board Meeting</p>
              <p className="text-xs text-[#6B6B6B]">Today, 2:00 PM</p>
            </div>
          </div>
          <div 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 hover:shadow-md cursor-pointer transition-all duration-200"
            onClick={() => {
              setSelectedMeetingForDetails('meeting-2')
              setViewAllMeetingsOpen(true)
            }}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-[#202020]">Farmer Representatives</p>
              <p className="text-xs text-[#6B6B6B]">Tomorrow, 10:00 AM</p>
            </div>
          </div>
          <div 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 hover:shadow-md cursor-pointer transition-all duration-200"
            onClick={() => {
              setSelectedMeetingForDetails('meeting-3')
              setViewAllMeetingsOpen(true)
            }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-[#202020]">Mill Operators Review</p>
              <p className="text-xs text-[#6B6B6B]">Friday, 3:00 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Meeting Modal */}
      <Dialog open={newMeetingOpen} onOpenChange={setNewMeetingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule New Meeting</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="meeting-title">Meeting Title</Label>
              <Input
                id="meeting-title"
                value={meetingForm.title}
                onChange={(e) => setMeetingForm({...meetingForm, title: e.target.value})}
                placeholder="Enter meeting title"
              />
            </div>
            <div>
              <Label htmlFor="meeting-datetime">Date & Time</Label>
              <Input
                id="meeting-datetime"
                type="datetime-local"
                value={meetingForm.datetime}
                onChange={(e) => setMeetingForm({...meetingForm, datetime: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="meeting-location">Location</Label>
              <Input
                id="meeting-location"
                value={meetingForm.location}
                onChange={(e) => setMeetingForm({...meetingForm, location: e.target.value})}
                placeholder="Enter location or meeting link"
              />
            </div>
            <div>
              <Label htmlFor="meeting-attendees">Attendees</Label>
              <Input
                id="meeting-attendees"
                value={meetingForm.attendees}
                onChange={(e) => setMeetingForm({...meetingForm, attendees: e.target.value})}
                placeholder="Enter attendee emails (comma separated)"
              />
            </div>
            <div>
              <Label htmlFor="meeting-description">Description</Label>
              <Textarea
                id="meeting-description"
                value={meetingForm.description}
                onChange={(e) => setMeetingForm({...meetingForm, description: e.target.value})}
                placeholder="Enter meeting description or agenda"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNewMeetingOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateMeeting}>
                Schedule Meeting
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Meetings Modal */}
      <Dialog open={viewAllMeetingsOpen} onOpenChange={setViewAllMeetingsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 [&>button]:hidden">
          <DialogTitle className="sr-only">
            {selectedMeetingForDetails ? 'Meeting Details' : 'Meetings'}
          </DialogTitle>
          {(() => {
            if (selectedMeetingForDetails) {
              const meeting = allMeetingsData.find(m => m.id === selectedMeetingForDetails)
              
              if (meeting) {
                return (
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b bg-white">
                      <div className="flex items-center gap-3 mb-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedMeetingForDetails(null)}
                          className="shrink-0"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-12 h-12 ${meeting.iconBg} rounded-lg flex items-center justify-center`}>
                            <Calendar className={`h-6 w-6 ${meeting.iconColor}`} />
                          </div>
                          <div className="flex-1">
                            <h1 className="text-xl font-semibold text-gray-900">{meeting.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{meeting.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{meeting.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{meeting.attendees} attendees</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button size="sm" onClick={() => {
                              setSelectedMeetingForDetails(null)
                              setViewAllMeetingsOpen(false)
                            }}>
                              Join Meeting
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Meeting Details</h3>
                          <p className="text-gray-700">{meeting.description}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Agenda</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm">Review quarterly performance metrics</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm">Discuss upcoming policy changes</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm">Budget allocation for next quarter</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            }

            // List view
            return (
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Meetings</h2>
                      <p className="text-sm text-gray-500 mt-1">{allMeetingsData.length} upcoming meetings</p>
                    </div>
                    <div className="group relative">
                      <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                      <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        Scheduled meetings and appointments
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-3">
                    {allMeetingsData.map((meeting) => (
                      <div 
                        key={meeting.id}
                        className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
                        onClick={() => setSelectedMeetingForDetails(meeting.id)}
                      >
                        {/* Icon */}
                        <div className={`w-8 h-8 ${meeting.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Calendar className={`h-4 w-4 ${meeting.iconColor}`} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-[#202020] truncate">{meeting.title}</h4>
                              <p className="text-xs text-[#6B6B6B] mb-1">{meeting.description}</p>
                              <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                                <span>{meeting.time}</span>
                                <span>•</span>
                                <span>{meeting.location}</span>
                                <span>•</span>
                                <span>{meeting.attendees} attendees</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })()}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MeetingsCard
