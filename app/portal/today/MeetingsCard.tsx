"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Calendar,
  MessageSquare,
  FileText,
  Users,
  ArrowLeft,
  Clock,
  MapPin,
  User,
  X
} from "lucide-react"
import { LuSquarePen } from 'react-icons/lu'
import { GoInfo } from 'react-icons/go'
import { allMeetingsData } from "@/lib/mockdata"
import { ScheduleMeetingModal, MeetingDetailsModal } from "@/components/modals/schedule-meeting-modal"

interface MeetingsCardProps {
  className?: string
}

// Function to convert allMeetingsData format to Meeting format
const convertToMeeting = (meetingData: any) => {
  const typeMapping: Record<string, "tactical-briefing" | "strategic-planning" | "mission-debrief" | "training-exercise" | "intelligence-briefing"> = {
    "Board Meeting": "strategic-planning",
    "Stakeholder Meeting": "tactical-briefing", 
    "Operations Review": "mission-debrief",
    "Training Session": "training-exercise",
    "Intelligence Briefing": "intelligence-briefing"
  }

  return {
    id: parseInt(meetingData.id.replace('meeting-', '')),
    title: meetingData.title,
    description: meetingData.description,
    time: meetingData.time,
    location: meetingData.location,
    attendees: meetingData.attendees,
    type: typeMapping[meetingData.type] || "tactical-briefing",
    priority: "Medium" as "Critical" | "High" | "Medium" | "Low"
  }
}

const MeetingsCard = ({ className }: MeetingsCardProps) => {
  // Modal states
  const [newMeetingOpen, setNewMeetingOpen] = useState(false)
  const [viewAllMeetingsOpen, setViewAllMeetingsOpen] = useState(false)
  const [selectedMeetingForDetails, setSelectedMeetingForDetails] = useState<string | null>(null)
  const [meetingDetailsOpen, setMeetingDetailsOpen] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null)

  const handleMeetingClick = (meetingId: string) => {
    const meeting = allMeetingsData.find(m => m.id === meetingId)
    if (meeting) {
      setSelectedMeeting(convertToMeeting(meeting))
      setMeetingDetailsOpen(true)
    }
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
            <Button 
              size="sm" 
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded-lg flex items-center gap-2 shadow-sm"
              onClick={() => setNewMeetingOpen(true)}
            >
              <LuSquarePen className="h-4 w-4" />
              New
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-3 py-2">
          {/* Scrollable meetings list - showing 3 meetings */}
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hover">
            {allMeetingsData.map((meeting) => {
              // Get color based on meeting type or status
              const getIndicatorColor = (type: string) => {
                switch (type) {
                  case 'Board Meeting': return 'bg-yellow-500'
                  case 'Stakeholder Meeting': return 'bg-blue-500'
                  case 'Operations Review': return 'bg-green-500'
                  case 'Training Session': return 'bg-purple-500'
                  case 'Intelligence Briefing': return 'bg-red-500'
                  default: return 'bg-gray-500'
                }
              }

              const getHoverBg = (type: string) => {
                switch (type) {
                  case 'Board Meeting': return 'hover:bg-yellow-50'
                  case 'Stakeholder Meeting': return 'hover:bg-blue-50'
                  case 'Operations Review': return 'hover:bg-green-50'
                  case 'Training Session': return 'hover:bg-purple-50'
                  case 'Intelligence Briefing': return 'hover:bg-red-50'
                  default: return 'hover:bg-gray-50'
                }
              }

              return (
                <div 
                  key={meeting.id}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 hover-shadow-border ${getHoverBg(meeting.type)}`}
                  onClick={() => handleMeetingClick(meeting.id)}
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getIndicatorColor(meeting.type)}`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#202020] truncate">{meeting.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-[#9CA3AF]">{meeting.timestamp}</p>
                      <span className="text-xs text-[#9CA3AF]">•</span>
                      <p className="text-xs text-[#6B6B6B]">{meeting.location}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* New Meeting Modal */}
      <ScheduleMeetingModal open={newMeetingOpen} onOpenChange={setNewMeetingOpen} />
      
      {/* Meeting Details Modal */}
      <MeetingDetailsModal 
        open={meetingDetailsOpen} 
        onOpenChange={setMeetingDetailsOpen} 
        meeting={selectedMeeting} 
      />

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
                    <div className="flex items-center gap-2">
                      <div className="group relative">
                        <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                        <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                          Scheduled meetings and appointments
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedMeetingForDetails(null)
                          setViewAllMeetingsOpen(false)
                        }}
                        className="shrink-0 h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-3">
                    {allMeetingsData.map((meeting) => (
                      <div 
                        key={meeting.id}
                        className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
                        onClick={() => handleMeetingClick(meeting.id)}
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
