"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  User, 
  FileText, 
  Calendar,
  ArrowRight,
  MoreHorizontal
} from "lucide-react"
import { format } from "date-fns"

interface TaskHistoryEvent {
  id: string
  type: 'created' | 'assigned' | 'started' | 'completed' | 'rejected' | 'commented' | 'updated'
  timestamp: string
  userId: string
  userName: string
  description: string
  metadata?: {
    fromStatus?: string
    toStatus?: string
    comment?: string
    reason?: string
  }
}

interface TaskHistoryProps {
  taskId: string
  events?: TaskHistoryEvent[]
  className?: string
}

// Mock data for demonstration
const mockTaskHistory: TaskHistoryEvent[] = [
  {
    id: "1",
    type: "created",
    timestamp: "2025-09-24T22:12:33.075Z",
    userId: "user1",
    userName: "System",
    description: "Task created and assigned to department",
    metadata: {
      toStatus: "PENDING"
    }
  },
  {
    id: "2",
    type: "assigned",
    timestamp: "2025-09-24T22:15:00.000Z",
    userId: "user2",
    userName: "John Manager",
    description: "Task assigned to department head",
    metadata: {
      fromStatus: "PENDING",
      toStatus: "ASSIGNED"
    }
  },
  {
    id: "3",
    type: "commented",
    timestamp: "2025-09-24T22:30:00.000Z",
    userId: "user3",
    userName: "Sarah Analyst",
    description: "Added initial review notes",
    metadata: {
      comment: "Initial review completed. All documents are in order."
    }
  },
  {
    id: "4",
    type: "started",
    timestamp: "2025-09-25T09:00:00.000Z",
    userId: "user2",
    userName: "John Manager",
    description: "Task started",
    metadata: {
      fromStatus: "PENDING",
      toStatus: "IN_PROGRESS"
    }
  },
  {
    id: "5",
    type: "commented",
    timestamp: "2025-09-25T14:30:00.000Z",
    userId: "user4",
    userName: "Mike Reviewer",
    description: "Added detailed analysis",
    metadata: {
      comment: "Detailed analysis shows compliance with all requirements. Ready for final approval."
    }
  }
]

export function TaskHistory({ taskId, events = mockTaskHistory, className }: TaskHistoryProps) {
  const [showAll, setShowAll] = useState(false)
  
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'created':
        return <FileText className="h-4 w-4 text-blue-600" />
      case 'assigned':
        return <User className="h-4 w-4 text-purple-600" />
      case 'started':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'commented':
        return <FileText className="h-4 w-4 text-gray-600" />
      case 'updated':
        return <ArrowRight className="h-4 w-4 text-blue-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }
  
  const getEventColor = (type: string) => {
    switch (type) {
      case 'created':
        return 'bg-blue-100 text-blue-700'
      case 'assigned':
        return 'bg-purple-100 text-purple-700'
      case 'started':
        return 'bg-yellow-100 text-yellow-700'
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      case 'commented':
        return 'bg-gray-100 text-gray-700'
      case 'updated':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }
  
  const displayedEvents = showAll ? events : events.slice(0, 3)
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Task History</CardTitle>
          {events.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="text-blue-600 hover:text-blue-700"
            >
              {showAll ? 'Show Less' : `Show All (${events.length})`}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 max-h-96 overflow-y-auto scrollbar-thin modal-scroll">
        <div className="space-y-4">
          {displayedEvents.map((event, index) => (
            <div key={event.id} className="flex items-start gap-3">
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-full ${getEventColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>
                {index < displayedEvents.length - 1 && (
                  <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                )}
              </div>
              
              {/* Event content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={`text-xs ${getEventColor(event.type)}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {format(new Date(event.timestamp), 'MMM dd, yyyy HH:mm')}
                  </span>
                </div>
                
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {event.userName}
                </p>
                
                <p className="text-sm text-gray-600 mb-2">
                  {event.description}
                </p>
                
                {/* Status change indicator */}
                {event.metadata?.fromStatus && event.metadata?.toStatus && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Badge variant="outline" className="text-xs">
                      {event.metadata.fromStatus}
                    </Badge>
                    <ArrowRight className="h-3 w-3" />
                    <Badge variant="outline" className="text-xs">
                      {event.metadata.toStatus}
                    </Badge>
                  </div>
                )}
                
                {/* Comment display */}
                {event.metadata?.comment && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
                    "{event.metadata.comment}"
                  </div>
                )}
                
                {/* Reason display */}
                {event.metadata?.reason && (
                  <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-600">
                    Reason: {event.metadata.reason}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {events.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">No history available for this task</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
