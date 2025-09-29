"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, X } from "lucide-react"
import { GoInfo } from 'react-icons/go'
import { allMeetingsData } from "@/lib/mockdata"

interface MeetingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onMeetingClick: (meetingId: string) => void
}

export function MeetingsModal({ 
  open, 
  onOpenChange, 
  onMeetingClick 
}: MeetingsModalProps) {

  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 [&>button]:hidden">
        <DialogTitle className="sr-only">Meetings</DialogTitle>
        
        <div className="flex flex-col h-full min-h-0">
          <div className="p-6 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Meetings</h2>
                <p className="text-sm text-gray-500 mt-1">{allMeetingsData.length} upcoming meetings</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="group relative">
                  <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                  <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    Scheduled meetings and events
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="shrink-0 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 bg-white min-h-0">
            <div className="space-y-3">
              {allMeetingsData.map((meeting) => {
                const getHoverBg = (iconColor: string) => {
                  if (iconColor.includes('blue')) return 'hover:bg-blue-50'
                  if (iconColor.includes('green')) return 'hover:bg-green-50'
                  if (iconColor.includes('red')) return 'hover:bg-red-50'
                  if (iconColor.includes('orange')) return 'hover:bg-orange-50'
                  if (iconColor.includes('purple')) return 'hover:bg-purple-50'
                  if (iconColor.includes('yellow')) return 'hover:bg-yellow-50'
                  return 'hover:bg-gray-50'
                }

                return (
                <div 
                  key={meeting.id}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${getHoverBg(meeting.iconColor)} hover:shadow-md transform hover:scale-[1.02]`}
                  onClick={() => onMeetingClick(meeting.id)}
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
                )
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}