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
  Trash2,
  ArrowRight,
  CheckCircle,
  Share,
  MessageSquare,
  Check,
  X,
  UserPlus,
  Phone
} from "lucide-react"
import { FaRegCopy } from 'react-icons/fa'
import { BiCommentDetail } from 'react-icons/bi'
import { GoNote } from 'react-icons/go'

// Activity detail types
interface ActivityDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activity: any | null
}

interface Activity {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: string
  status: string
}

export function ActivityDetailsModal({ open, onOpenChange, activity }: ActivityDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'updates' | 'documents'>('overview')
  
  if (!activity) return null
  
  // Get formatted date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  }
  
  // Helper functions to get colors based on activity type
  const getHeaderBg = (type: string) => {
    switch (type) {
      case 'visit': return 'bg-blue-50'
      case 'meeting': return 'bg-green-50'
      case 'task': return 'bg-amber-50'
      case 'event': return 'bg-purple-50'
      default: return 'bg-gray-50'
    }
  }
  
  const getIconBg = (type: string) => {
    switch (type) {
      case 'visit': return 'bg-blue-100'
      case 'meeting': return 'bg-green-100'
      case 'task': return 'bg-amber-100'
      case 'event': return 'bg-purple-100'
      default: return 'bg-gray-100'
    }
  }
  
  const getIconColor = (type: string) => {
    switch (type) {
      case 'visit': return 'text-blue-600'
      case 'meeting': return 'text-green-600'
      case 'task': return 'text-amber-600'
      case 'event': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }
  
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'in-progress':
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case 'scheduled':
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case 'pending':
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case 'cancelled':
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  }
  
  // Get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'visit':
        return <MapPin className={`h-5 w-5 ${getIconColor(type)}`} />;
      case 'meeting':
        return <Users className={`h-5 w-5 ${getIconColor(type)}`} />;
      case 'task':
        return <Check className={`h-5 w-5 ${getIconColor(type)}`} />;
      case 'event':
        return <CalendarIcon className={`h-5 w-5 ${getIconColor(type)}`} />;
      default:
        return <Clock className={`h-5 w-5 ${getIconColor(type)}`} />;
    }
  }
  
  // Mock data for participants
  const participants = [
    { name: "John Doe", role: "CEO, KSB", status: "Confirmed" },
    { name: "Jane Smith", role: "Operations Manager", status: "Tentative" },
    { name: "Michael Brown", role: "Field Coordinator", status: "Declined" },
    { name: "Sarah Wilson", role: "Compliance Officer", status: "Confirmed" }
  ]
  
  // Mock data for updates
  const updates = [
    { id: 1, time: "10:30 AM", date: "August 15, 2025", message: "Document 'Field Visit Report' uploaded", author: "Sarah Wilson", type: "document" },
    { id: 2, time: "9:45 AM", date: "August 15, 2025", message: "Location changed to Mumias Sugar Factory", author: "John Doe", type: "update" },
    { id: 3, time: "Yesterday", date: "August 14, 2025", message: "2 new participants added", author: "John Doe", type: "participant" },
    { id: 4, time: "2 days ago", date: "August 13, 2025", message: "Activity created", author: "John Doe", type: "creation" }
  ]
  
  // Mock data for documents
  const documents = [
    { id: 1, title: "Field Visit Agenda.pdf", type: "PDF", size: "245 KB", uploadedBy: "John Doe", uploadDate: "August 13, 2025" },
    { id: 2, title: "Mumias Factory Layout.png", type: "Image", size: "1.2 MB", uploadedBy: "Sarah Wilson", uploadDate: "August 14, 2025" },
    { id: 3, title: "Previous Visit Notes.docx", type: "Document", size: "78 KB", uploadedBy: "Michael Brown", uploadDate: "August 14, 2025" },
    { id: 4, title: "KSB Field Protocol.pdf", type: "PDF", size: "450 KB", uploadedBy: "System", uploadDate: "August 10, 2025" }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className={`space-y-4 p-6 -mx-6 -mt-6 mb-6 ${getHeaderBg(activity.type)}`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconBg(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <Badge className={getStatusBadgeStyle(activity.status)}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1).replace('-', ' ')}
                  </Badge>
                  <Badge variant="outline" className="ml-2 border-gray-300">
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                {activity.title}
              </DialogTitle>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Forward className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{formatDate(activity.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{activity.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{activity.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{participants.length} participants</span>
            </div>
          </div>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'overview' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'updates' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('updates')}
          >
            Updates ({updates.length})
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'documents' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('documents')}
          >
            Documents ({documents.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <GoNote className="h-5 w-5" />
                Description
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {activity.description}
                {activity.type === 'visit' && (
                  <>
                    <br/><br/>
                    This visit aims to assess current operations, meet with local management, and identify opportunities for improvement. The team will conduct a thorough evaluation of production processes, quality control measures, and compliance with regulatory standards.
                    <br/><br/>
                    Key objectives include reviewing recent performance metrics, discussing challenges with staff, and formulating recommendations for operational enhancements.
                  </>
                )}
                {activity.type === 'meeting' && (
                  <>
                    <br/><br/>
                    This meeting will bring together key stakeholders to discuss quarterly performance, review strategic initiatives, and align on upcoming priorities. Participants should come prepared with their department updates and be ready to engage in collaborative planning.
                    <br/><br/>
                    The agenda includes performance review, strategic initiative updates, and action planning for the next quarter.
                  </>
                )}
              </p>
            </div>

            <Separator />

            {/* Participants */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Participants ({participants.length})
                </h3>
                <Button variant="outline" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {participants.map((person, index) => (
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
                      variant={person.status === "Confirmed" ? "default" : person.status === "Tentative" ? "secondary" : "outline"}
                      className={
                        person.status === "Confirmed" ? "bg-green-100 text-green-800" :
                        person.status === "Tentative" ? "bg-amber-100 text-amber-800" :
                        "bg-red-100 text-red-800"
                      }
                    >
                      {person.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button className="bg-black hover:bg-gray-800">
                <CheckCircle className="mr-2 h-4 w-4" />
                {activity.status === 'completed' ? 'Completed' : 'Mark as Complete'}
              </Button>
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
              <Button variant="outline">
                <FaRegCopy className="mr-2 h-4 w-4" />
                Duplicate
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'updates' && (
          <div className="space-y-4">
            <div className="space-y-4 max-w-2xl">
              {updates.map((update) => (
                <div key={update.id} className="border-l-2 border-gray-200 pl-4 py-1 relative">
                  <div className="absolute w-2 h-2 bg-gray-300 rounded-full -left-[5px] top-2"></div>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-gray-100 text-gray-800 text-xs">
                        {update.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{update.author}</span>
                        <span className="text-gray-600"> {update.message}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{update.time} • {update.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <div className="flex gap-2 mt-4">
                <Input 
                  placeholder="Add a comment or update..."
                  className="flex-1"
                />
                <Button>
                  <BiCommentDetail className="mr-2 h-4 w-4" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Attached Documents</h3>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>

            <div className="space-y-2">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{doc.title}</p>
                      <p className="text-xs text-gray-600">
                        {doc.size} • Uploaded by {doc.uploadedBy} on {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}