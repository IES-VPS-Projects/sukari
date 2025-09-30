"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  MessageSquare,
  FileText,
  Users,
  Clock,
  MapPin,
  User
} from "lucide-react"
import { LuSquarePen } from 'react-icons/lu'
import { GoInfo } from 'react-icons/go'
import { meetingsData } from "../data/meetings-data"
import { MeetingsModal } from "../modals/meetings-modal"
import { ScheduleMeetingModal, MeetingDetailsModal } from "../modals/schedule-meeting-modal"

interface MeetingsCardProps {
  className?: string
}

// Function to convert meetingsData format to Meeting format
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
    const meeting = meetingsData.find(m => m.id === meetingId)
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
            {meetingsData.map((meeting) => {
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
      <MeetingsModal 
        open={viewAllMeetingsOpen}
        onOpenChange={setViewAllMeetingsOpen}
        onMeetingClick={handleMeetingClick}
      />
    </>
  )
}

export default MeetingsCard
