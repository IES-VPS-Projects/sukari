"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Users,
  DollarSign,
  Calendar,
  MessageSquare,
  FileText,
  Play,
  Pause,
  TrendingDown,
  ArrowRight,
  Plus,
  ChevronDown
} from "lucide-react"
import { BsCheckAll, BsBoxArrowUpRight } from 'react-icons/bs'
import { FiSettings, FiAlertTriangle } from 'react-icons/fi'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { FaAngleDown } from 'react-icons/fa'
import { LuForward, LuSquarePen } from 'react-icons/lu'
import { BiSend, BiPlus, BiMicrophone } from 'react-icons/bi'
import { HiSparkles } from 'react-icons/hi2'
import { ScheduleVisitModal } from "@/components/modals/schedule-visit-modal"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useAuth } from "@/components/auth-provider"
import { PortalLayout } from "@/components/portal-layout"

// Market Insights data schema
interface ProductInsight {
  productName: string
  price: number
  currency: string
  priceUnit: string
  weeklyChangePercent: number
  weeklyChangeDirection: 'up' | 'down'
  importVolume: number
  exportVolume: number
  volumeUnit: string
}

const marketData: ProductInsight[] = [
  {
    productName: "Sugarcane",
    price: 4500,
    currency: "KSh",
    priceUnit: "per tonne",
    weeklyChangePercent: 5,
    weeklyChangeDirection: 'up',
    importVolume: 1000,
    exportVolume: 200,
    volumeUnit: "tonnes"
  },
  {
    productName: "Sugar",
    price: 85,
    currency: "KSh",
    priceUnit: "per kg",
    weeklyChangePercent: 2,
    weeklyChangeDirection: 'down',
    importVolume: 2450,
    exportVolume: 890,
    volumeUnit: "tonnes"
  },
  {
    productName: "Molasses",
    price: 15000,
    currency: "KSh",
    priceUnit: "per tonne",
    weeklyChangePercent: 3,
    weeklyChangeDirection: 'up',
    importVolume: 500,
    exportVolume: 300,
    volumeUnit: "tonnes"
  },
  {
    productName: "Fertilizer",
    price: 2500,
    currency: "KSh",
    priceUnit: "per 50 kg bag",
    weeklyChangePercent: 1,
    weeklyChangeDirection: 'down',
    importVolume: 1200,
    exportVolume: 100,
    volumeUnit: "tonnes"
  }
]

// Transcript data for the audio briefing
const transcriptData = [
  { time: 0, text: "Overview: This briefing summarizes key developments in Kenya's sugar sector from July 26 to August 2, 2025, based on recent government announcements, market trends, and stakeholder reports." },
  { time: 10, text: "The sector shows signs of recovery amid ongoing reforms, with emphasis on production revival, pricing adjustments, and reduced import dependency. " },
  { time: 20, text: "No major disruptions reported this week, but focus remains on mill efficiencies and farmer payments. " },
  { time: 30, text: "Production and Milling Updates. Sugarcane deliveries and mill operations continue to improve under recent leasing agreements. Nzoia Sugar Company, leased to West Kenya Sugar Co. earlier in 2025, cleared KSh 1.5 billion in debt and disbursed Sh300M to farmers, contributing to a reported 66% production increase year-over-year." },
  { time: 40, text: "Chemelil Sugar Mill achieved timely farmer payments within one week, a shift from historical delays, supporting broader sector momentum toward self-sufficiency." },
  { time: 50, text: "Stakeholder sentiment is largely positive: 78% of farmers are optimistic, driven by a cane price hike to KSh5,750 per tonne and a KSh150 million bonus for Mumias farmers, a first for the sector. Mill operators are 85% positive, buoyed by reforms like the Sugar Act 2024. Field officers, at 92% positive, praise the new digital reporting system, with one Nyanza officer noting it “has improved efficiency significantly." },
  { time: 60, text: "Dealers remain 65% neutral, cautious about market stability due to import challenges." },
  { time: 70, text: "Two recent headlines highlight progress and challenges. In Kakamega, a new digital cane tracking system at Butali Sugar Mills has cut delivery delays by 30%, ensuring farmers are paid within seven days, a game-changer for local growers." },
  { time: 80, text: "Meanwhile, in Mumias, a 15% production drop has raised concerns, prompting a Kenya Sugar Board order to halt milling for three months from July 14, 2025, to address immature cane harvesting. " },         
  { time: 90, text: "This affects key mills like Mumias, Butali, and Nzoia, with a cane survey planned to stabilize supply." },    
  { time: 100, text: "That concludes today's briefing. Stay updated with the latest developments through your dashboard." },
  { time: 110, text: "Thank you for listening. Stay tuned for more updates on the sugar sector." }  
];

// Updates data for the Tasks card
const updatesData = {
  alerts: [
    {
      id: '1',
      title: 'Production Below Threshold',
      label: 'HIGH',
      description: 'Muhoroni sugar company production fell 25% below',
      timestamp: '11:32 PM • Muhoroni',
      labelColor: 'bg-red-500',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      id: '2',
      title: 'Compliance Issue Detected',
      label: 'MEDIUM',
      description: 'Nzoia Sugar Mill compliance violations reported',
      timestamp: '10:15 AM • Nzoia',
      labelColor: 'bg-orange-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      id: '3',
      title: 'Locust Infestation',
      label: 'LOW',
      description: 'Minor pest activity detected in western region',
      timestamp: '9:30 AM • Butali',
      labelColor: 'bg-yellow-500',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ],
  notifications: [
    {
      id: '4',
      title: 'New Policy Update',
      label: 'INFO',
      description: 'Sugar Act 2024 implementation guidelines released',
      timestamp: '2:45 PM • Kenya Sugar Board',
      labelColor: 'bg-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: '5',
      title: 'Payment Processed',
      label: 'SUCCESS',
      description: 'Farmer payments disbursed successfully',
      timestamp: '1:20 PM • Chemelil',
      labelColor: 'bg-green-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    }
  ]
};

// Scheduler suggestions data
const schedulerSuggestions = [
  'Quarterly board meeting',
  'Reminder to read Farmer Daily Article'
];

// Market Insights Component
const MarketInsightsCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % marketData.length)
  }

  const currentProduct = marketData[currentIndex]

  return (
    <Card 
      className="rounded-[24px] shadow-lg border-0 bg-white relative overflow-hidden cursor-pointer"
      onClick={handleNext}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[#202020]">Market Insights</CardTitle>
        <Badge className="bg-gray-100 text-green-600 flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-[#6B6B6B]">{currentProduct.productName}</h3>
          {currentProduct.weeklyChangeDirection === 'up' ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </div>
        <div className="text-2xl font-bold text-[#202020] mb-1">{currentProduct.currency} {currentProduct.price}</div>
        <p className="text-xs text-[#6B6B6B] mb-3">{currentProduct.priceUnit}</p>
        <p className="text-xs text-green-600 mb-2">{currentProduct.weeklyChangeDirection === 'up' ? '+' : '-'}{currentProduct.weeklyChangePercent}% from last week</p>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#6B6B6B]">Import Volume</span>
          <span className="font-medium">{currentProduct.importVolume} {currentProduct.volumeUnit}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-[#6B6B6B]">Export Volume</span>
          <span className="font-medium">{currentProduct.exportVolume} {currentProduct.volumeUnit}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Alerts Card Component (formerly Tasks Card)
const AlertsCard = ({ selectedItemId, setSelectedItemId }: {
  selectedItemId: string | null,
  setSelectedItemId: (id: string | null) => void
}) => {
  const handleItemAction = (action: string, itemId: string) => {
    console.log(`${action} action for item ${itemId}`)
    setSelectedItemId(null)
  }

  return (
    <Card className="rounded-[20px] shadow-lg border-0 bg-white">
      <CardHeader className="pb-1">
        <CardTitle className="text-[#202020]">Alerts</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* Alert Content - No tabs, just alerts */}
        <div className="space-y-3">
          {updatesData.alerts.map((item) => (
            <div 
              key={item.id} 
              className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                item.iconColor === 'text-red-600' ? 'hover:bg-red-50' :
                item.iconColor === 'text-orange-600' ? 'hover:bg-orange-50' :
                item.iconColor === 'text-yellow-600' ? 'hover:bg-yellow-50' :
                item.iconColor === 'text-blue-600' ? 'hover:bg-blue-50' :
                item.iconColor === 'text-green-600' ? 'hover:bg-green-50' :
                item.iconColor === 'text-purple-600' ? 'hover:bg-purple-50' :
                'hover:bg-gray-50'
              } hover:shadow-md`}
            >
              {/* Icon */}
              <div className={`w-8 h-8 ${item.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <FiAlertTriangle className={`h-4 w-4 ${item.iconColor}`} />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-[#202020] truncate">{item.title}</h4>
                      <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${
                        item.labelColor === 'bg-red-500' ? 'bg-red-50/80 text-red-700 border-gray-300' :
                        item.labelColor === 'bg-orange-500' ? 'bg-orange-50/80 text-orange-700 border-gray-300' :
                        item.labelColor === 'bg-yellow-500' ? 'bg-yellow-50/80 text-yellow-700 border-gray-300' :
                        item.labelColor === 'bg-blue-500' ? 'bg-blue-50/80 text-blue-700 border-gray-300' :
                        item.labelColor === 'bg-green-500' ? 'bg-green-50/80 text-green-700 border-gray-300' :
                        item.labelColor === 'bg-purple-500' ? 'bg-purple-50/80 text-purple-700 border-gray-300' :
                        'bg-gray-50/80 text-gray-700 border-gray-300'
                      }`}>
                        {item.label}
                      </div>
                    </div>
                    <p className="text-xs text-[#6B6B6B] mb-1">{item.description}</p>
                    <p className="text-xs text-[#9CA3AF]">{item.timestamp}</p>
                  </div>
                  
                  {/* Options Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setSelectedItemId(selectedItemId === item.id ? null : item.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <HiEllipsisHorizontal className="h-4 w-4 text-gray-400" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {selectedItemId === item.id && (
                      <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg z-10 w-40">
                        <div className="py-1">
                          <button
                            onClick={() => handleItemAction('mark-read', item.id)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-gray-50"
                          >
                            <CheckCircle className="h-3 w-3" />
                            Mark as read
                          </button>
                          <button
                            onClick={() => handleItemAction('forward', item.id)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-gray-50"
                          >
                            <LuForward className="h-3 w-3" />
                            Forward
                          </button>
                          <button
                            onClick={() => handleItemAction('take-action', item.id)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-gray-50"
                          >
                            <Calendar className="h-3 w-3" />
                            Take Action
                          </button>
                          <button
                            onClick={() => handleItemAction('delete', item.id)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-gray-50 text-red-600"
                          >
                            ✕ Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Actions Card Component (formerly Scheduler)
const ActionsCard = ({ selectedItemId, setSelectedItemId }: {
  selectedItemId: string | null,
  setSelectedItemId: (id: string | null) => void
}) => {
  const handleItemAction = (action: string, itemId: string) => {
    console.log(`${action} action for item ${itemId}`)
    setSelectedItemId(null)
  }

  return (
    <Card className="rounded-[20px] shadow-lg border-0 bg-white">
      <CardHeader className="pb-1">
        <CardTitle className="text-[#202020]">Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* Actions Content - List of actions requiring approval/votes */}
        <div className="space-y-3">
          {[
            {
              id: 'action-1',
              title: 'Sugar Import Allocation Approval',
              description: 'Approve allocation of 50,000 MT sugar imports to Mumias Sugar Company',
              type: 'approval',
              timestamp: '2 hours ago',
              iconColor: 'text-blue-600',
              iconBg: 'bg-blue-100'
            },
            {
              id: 'action-2', 
              title: 'Cane Pricing Committee Vote',
              description: 'Vote on proposed cane pricing structure for 2024/25 season',
              type: 'vote',
              timestamp: '4 hours ago',
              iconColor: 'text-green-600',
              iconBg: 'bg-green-100'
            },
            {
              id: 'action-3',
              title: 'Mill Operations License Approval',
              description: 'Approve renewal of operational license for Nzoia Sugar Factory',
              type: 'approval', 
              timestamp: '1 day ago',
              iconColor: 'text-orange-600',
              iconBg: 'bg-orange-100'
            }
          ].map((item) => (
            <div 
              key={item.id} 
              className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
            >
              {/* Icon */}
              <div className={`w-8 h-8 ${item.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                {item.type === 'approval' ? (
                  <CheckCircle className={`h-4 w-4 ${item.iconColor}`} />
                ) : (
                  <Users className={`h-4 w-4 ${item.iconColor}`} />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-[#202020] mb-1">{item.title}</h4>
                    <p className="text-xs text-[#6B6B6B] mb-1">{item.description}</p>
                    <p className="text-xs text-[#9CA3AF]">{item.timestamp}</p>
                  </div>
                  
                  {/* Options Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setSelectedItemId(selectedItemId === item.id ? null : item.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <HiEllipsisHorizontal className="h-4 w-4 text-gray-400" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {selectedItemId === item.id && (
                      <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg z-10 w-40">
                        <div className="py-1">
                          {item.type === 'approval' ? (
                            <>
                              <button
                                onClick={() => handleItemAction('approve', item.id)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-green-50 text-green-700"
                              >
                                <CheckCircle className="h-3 w-3" />
                                Approve
                              </button>
                              <button
                                onClick={() => handleItemAction('reject', item.id)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-red-50 text-red-700"
                              >
                                <AlertTriangle className="h-3 w-3" />
                                Reject
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleItemAction('vote-yes', item.id)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-green-50 text-green-700"
                              >
                                <CheckCircle className="h-3 w-3" />
                                Vote Yes
                              </button>
                              <button
                                onClick={() => handleItemAction('vote-no', item.id)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-red-50 text-red-700"
                              >
                                <AlertTriangle className="h-3 w-3" />
                                Vote No
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleItemAction('details', item.id)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-gray-50"
                          >
                            <FileText className="h-3 w-3" />
                            View Details
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function TodayPage() {
  const [scheduleVisitOpen, setScheduleVisitOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("")
  const [greeting, setGreeting] = useState("")
  const { user } = useAuth()
  
  // Audio state and logic
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio] = useState(typeof window !== 'undefined' ? new Audio('/sukari2.mp3') : null)
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0)
  const [audioTime, setAudioTime] = useState(0)

  // Tasks card state (now only for alerts)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  // Modal states for new meeting/activity
  const [newMeetingOpen, setNewMeetingOpen] = useState(false)
  const [newActivityOpen, setNewActivityOpen] = useState(false)
  
  // Dropdown states for templates
  const [meetingDropdownOpen, setMeetingDropdownOpen] = useState(false)
  const [activityDropdownOpen, setActivityDropdownOpen] = useState(false)

  // Form states for new items
  const [meetingForm, setMeetingForm] = useState({
    title: '',
    datetime: '',
    location: '',
    attendees: '',
    description: ''
  })
  const [activityForm, setActivityForm] = useState({
    title: '',
    type: '',
    datetime: '',
    location: '',
    assignedTo: '',
    description: ''
  })

  const handleAudioPlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        audio.play()
        setIsPlaying(true)
      }
    }
  }

  useEffect(() => {
    if (audio) {
      audio.addEventListener('ended', () => setIsPlaying(false))
      return () => {
        audio.removeEventListener('ended', () => setIsPlaying(false))
      }
    }
  }, [audio])

  useEffect(() => {
    if (audio && isPlaying) {
      const updateTranscript = () => {
        const currentTime = audio.currentTime
        setAudioTime(currentTime)

        let currentSegment = -1
        for (let i = 0; i < transcriptData.length; i++) {
          const segment = transcriptData[i]
          const nextSegment = transcriptData[i + 1]
          if (currentTime >= segment.time && (!nextSegment || currentTime < nextSegment.time)) {
            currentSegment = i
            break
          }
        }
        if (currentSegment !== -1 && currentSegment !== currentTranscriptIndex) {
          setCurrentTranscriptIndex(currentSegment)
        }
      }

      const interval = setInterval(updateTranscript, 100)
      return () => clearInterval(interval)
    }
  }, [audio, isPlaying, currentTranscriptIndex])

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (meetingDropdownOpen || activityDropdownOpen) {
        setMeetingDropdownOpen(false)
        setActivityDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [meetingDropdownOpen, activityDropdownOpen])

  const getCurrentTranscriptLines = () => {
    if (currentTranscriptIndex < transcriptData.length) {
      const segment = transcriptData[currentTranscriptIndex]
      const progress = Math.min((audioTime - segment.time) / 8, 1) // 8 seconds per segment
      const textLength = Math.floor(segment.text.length * progress)

      return [{
        text: segment.text.substring(0, textLength),
        isActive: true,
        isComplete: progress >= 1
      }]
    }
    return [{ text: "...", isActive: false, isComplete: false }]
  }

  // Auto-scroll effect for transcript
  useEffect(() => {
    const transcriptContainer = document.getElementById('transcript-container')
    if (transcriptContainer && isPlaying) {
      transcriptContainer.scrollTop = transcriptContainer.scrollHeight
    }
  }, [currentTranscriptIndex, audioTime, isPlaying])
  
  // Get the first name from the user's full name
  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0]
  }
  
  // Generate time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    const firstName = user ? getFirstName(user.name) : "there"
    
    if (hour < 12) {
      return `Good Morning, ${firstName}`
    } else if (hour < 17) {
      return `Good Afternoon, ${firstName}`
    } else {
      return `Good Evening, ${firstName}`
    }
  }
  
  // Set time-based greeting when component mounts or user changes
  useEffect(() => {
    setGreeting(getTimeBasedGreeting())
  }, [user])

  const currentTime = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const handleScheduleVisit = (location?: string) => {
    setSelectedLocation(location || "")
    setScheduleVisitOpen(true)
  }

  return (
    <PortalLayout pageTitle="Today">
      {/* Centered Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Header with User Info */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#202020]">{greeting}</h1>
              <p className="text-[#6B6B6B]">{currentTime}</p>
            </div>
          </div>

          {/* AI Morning Briefing */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8" style={{ height: "50%" }}>
            <div>
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden rounded-[24px] shadow-lg border-0" style={{ height: "100%" }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <h3 className="font-semibold text-xl">Briefing</h3>
                      <p className="text-sm text-gray-300">August 5th • 3 min</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mb-4 h-15">
                    <div className="flex items-end gap-1">
                      {Array.from({ length: 50 }, (_, i) => (
                        <div
                          key={i}
                          className={`rounded-full ${isPlaying ? 'animate-pulse' : ''}`}
                          style={{
                            width: "3px",
                            height: `${Math.random() * 10 + 10}px`,
                            backgroundColor: isPlaying ? '#10B981' : '#6B7280',
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Audio Progress */}
                  {audio && (
                    <div className="mb-4">
                      <Progress 
                        value={audio.duration ? (audio.currentTime / audio.duration) * 100 : 0} 
                        className="h-1 bg-gray-700"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{Math.floor(audio.currentTime || 0)}s</span>
                        <span>{Math.floor(audio.duration || 0)}s</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Transcript Display */}
                  <div id="transcript-container" className="mb-6 h-6 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide">
                    <div className="transition-all duration-300">
                      {getCurrentTranscriptLines().map((line, index) => (
                        <p 
                          key={index} 
                          className={`text-xs leading-relaxed transition-all duration-300 ${
                            line.isActive 
                              ? 'text-green-400' 
                              : line.isComplete 
                                ? 'text-gray-400' 
                                : 'text-gray-300'
                          }`}
                        >
                          {line.text}
                          {line.isActive && <span className="animate-pulse">|</span>}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAudioPlay}
                    className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-full py-3"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Play now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
            <MarketInsightsCard />
            
            {/* Industry News Card */}
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader className="pb-1">
                <CardTitle className="text-[#202020]">Industry News</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Carousel className="w-full" opts={{ loop: true }} plugins={[Autoplay({ delay: 4000 })]}>
                  <CarouselContent>
                    <CarouselItem className="bg-[url('/images/sugar_surge.jpeg')] bg-cover bg-center h-48 flex items-center justify-center text-white font-bold text-lg rounded-l-lg">
                      Sugar Prices Surge
                    </CarouselItem>
                    <CarouselItem className="bg-[url('/images/cane_tech.jpeg')] bg-cover bg-center h-48 flex items-center justify-center text-white font-bold text-lg rounded-l-lg">
                      New Tech Boosts Yields
                    </CarouselItem>
                    <CarouselItem className="bg-[url('/images/govt_subsidies.png')] bg-cover bg-center h-48 flex items-center justify-center text-white font-bold text-lg rounded-l-lg">
                      Government Subsidies
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </CardContent>
            </Card>
          </div>

          {/* AI Recommendations and Updates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#202020]">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  AI Insights
                </CardTitle>
                <CardDescription className="text-[#6B6B6B]">
                  Intelligent insights based on current data patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#202020]">Consider visiting Mumias region</p>
                    <p className="text-xs text-[#6B6B6B]">
                      15% production drop detected - requires executive attention
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleScheduleVisit("Mumias Sugar Mill")}>
                    Schedule
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#202020]">Recommend policy review</p>
                    <p className="text-xs text-[#6B6B6B]">23% increase in compliance violations this quarter</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#202020]">Weather alert preparation</p>
                    <p className="text-xs text-[#6B6B6B]">Prepare drought mitigation for Western region</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Prepare
                  </Button>
                </div>
              </CardContent>
            </Card>

            <AlertsCard 
              selectedItemId={selectedItemId}
              setSelectedItemId={setSelectedItemId}
            />
          </div>

          {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8" style={{ height: "10%" }}>
            {/*Meetings*/}
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader className="pb-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#202020]">Meetings</CardTitle>
                  <div className="relative">
                    <Button 
                      size="sm" 
                      className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded-lg flex items-center gap-2 shadow-sm"
                      onClick={() => setMeetingDropdownOpen(!meetingDropdownOpen)}
                    >
                      <LuSquarePen className="h-4 w-4" />
                      New
                      <div className="w-px h-4 bg-gray-300 mx-1"></div>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                    
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
                            <Play className="h-4 w-4" />
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
                    // TODO: Navigate to meeting details page
                    console.log('Navigate to Board Meeting details')
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
                    // TODO: Navigate to meeting details page
                    console.log('Navigate to Farmer Representatives meeting details')
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
                    // TODO: Navigate to meeting details page
                    console.log('Navigate to Mill Operators Review meeting details')
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

            {/*Activities */}
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader className="pb-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#202020]">Activities</CardTitle>
                  <div className="relative">
                    <Button 
                      size="sm" 
                      className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded-lg flex items-center gap-2 shadow-sm"
                      onClick={() => setActivityDropdownOpen(!activityDropdownOpen)}
                    >
                      <LuSquarePen className="h-4 w-4" />
                      New
                      <div className="w-px h-4 bg-gray-300 mx-1"></div>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                    
                    {/* Dropdown Menu */}
                    {activityDropdownOpen && (
                      <div className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg z-20 w-48">
                        <div className="py-1">
                          <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b">Activity Types</div>
                          <button
                            onClick={() => {
                              setActivityForm({...activityForm, title: 'Field Inspection', type: 'inspection'})
                              setNewActivityOpen(true)
                              setActivityDropdownOpen(false)
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Field Inspection
                          </button>
                          <button
                            onClick={() => {
                              setActivityForm({...activityForm, title: 'Compliance Review', type: 'compliance'})
                              setNewActivityOpen(true)
                              setActivityDropdownOpen(false)
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                          >
                            <AlertTriangle className="h-4 w-4" />
                            Compliance Review
                          </button>
                          <button
                            onClick={() => {
                              setActivityForm({...activityForm, title: 'Training Session', type: 'training'})
                              setNewActivityOpen(true)
                              setActivityDropdownOpen(false)
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                          >
                            <Users className="h-4 w-4" />
                            Training Session
                          </button>
                          <button
                            onClick={() => {
                              setActivityForm({...activityForm, title: 'Quality Audit', type: 'audit'})
                              setNewActivityOpen(true)
                              setActivityDropdownOpen(false)
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                          >
                            <FileText className="h-4 w-4" />
                            Quality Audit
                          </button>
                          <button
                            onClick={() => {
                              setActivityForm({...activityForm, title: 'Equipment Maintenance', type: 'maintenance'})
                              setNewActivityOpen(true)
                              setActivityDropdownOpen(false)
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                          >
                            <TrendingUp className="h-4 w-4" />
                            Equipment Maintenance
                          </button>
                          
                          <div className="border-t">
                            <button
                              onClick={() => {
                                setNewActivityOpen(true)
                                setActivityDropdownOpen(false)
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
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 hover:shadow-md cursor-pointer transition-all duration-200"
                  onClick={() => {
                    // TODO: Navigate to compliance review details page
                    console.log('Navigate to Compliance Review details')
                  }}
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Compliance Review Due</p>
                    <p className="text-xs text-[#6B6B6B]">Mumias Mill - Tomorrow</p>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 hover:shadow-md cursor-pointer transition-all duration-200"
                  onClick={() => {
                    // TODO: Navigate to site visit details page
                    console.log('Navigate to Site Visit details')
                  }}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Site Visit Scheduled</p>
                    <p className="text-xs text-[#6B6B6B]">Chemelil Sugar Mill - Friday</p>
                  </div>
                </div>
                <div 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 hover:shadow-md cursor-pointer transition-all duration-200"
                  onClick={() => {
                    // TODO: Navigate to license renewal details page
                    console.log('Navigate to License Renewal details')
                  }}
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#202020]">License Renewal Reminder</p>
                    <p className="text-xs text-[#6B6B6B]">Nzoia Sugar Co. - Next Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions Card */}
            <ActionsCard 
              selectedItemId={selectedItemId}
              setSelectedItemId={setSelectedItemId}
            />
          </div>

        </div>

      <ScheduleVisitModal
        open={scheduleVisitOpen}
        onOpenChange={setScheduleVisitOpen}
        defaultLocation={selectedLocation}
      />

      {/* New Meeting Modal */}
      <Dialog open={newMeetingOpen} onOpenChange={setNewMeetingOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule New Meeting</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="meeting-title">Meeting Title</Label>
              <Input
                id="meeting-title"
                value={meetingForm.title}
                onChange={(e) => setMeetingForm({ ...meetingForm, title: e.target.value })}
                placeholder="Enter meeting title"
              />
            </div>
            <div>
              <Label htmlFor="meeting-date">Date & Time</Label>
              <Input
                id="meeting-date"
                type="datetime-local"
                value={meetingForm.datetime}
                onChange={(e) => setMeetingForm({ ...meetingForm, datetime: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="meeting-location">Location</Label>
              <Select 
                value={meetingForm.location} 
                onValueChange={(value) => setMeetingForm({ ...meetingForm, location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="headquarters">KSB Headquarters</SelectItem>
                  <SelectItem value="mumias">Mumias Mill</SelectItem>
                  <SelectItem value="nzoia">Nzoia Mill</SelectItem>
                  <SelectItem value="online">Online Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="meeting-attendees">Attendees</Label>
              <Input
                id="meeting-attendees"
                value={meetingForm.attendees}
                onChange={(e) => setMeetingForm({ ...meetingForm, attendees: e.target.value })}
                placeholder="Enter attendee emails (comma separated)"
              />
            </div>
            <div>
              <Label htmlFor="meeting-description">Description</Label>
              <Textarea
                id="meeting-description"
                value={meetingForm.description}
                onChange={(e) => setMeetingForm({ ...meetingForm, description: e.target.value })}
                placeholder="Meeting agenda and details"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setNewMeetingOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  console.log('Schedule meeting:', meetingForm)
                  setNewMeetingOpen(false)
                  // Reset form
                  setMeetingForm({ title: '', datetime: '', location: '', attendees: '', description: '' })
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Schedule Meeting
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Activity Modal */}
      <Dialog open={newActivityOpen} onOpenChange={setNewActivityOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule New Activity</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="activity-title">Activity Title</Label>
              <Input
                id="activity-title"
                value={activityForm.title}
                onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                placeholder="Enter activity title"
              />
            </div>
            <div>
              <Label htmlFor="activity-type">Activity Type</Label>
              <Select 
                value={activityForm.type} 
                onValueChange={(value) => setActivityForm({ ...activityForm, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inspection">Field Inspection</SelectItem>
                  <SelectItem value="compliance">Compliance Review</SelectItem>
                  <SelectItem value="training">Training Session</SelectItem>
                  <SelectItem value="audit">Quality Audit</SelectItem>
                  <SelectItem value="maintenance">Equipment Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="activity-date">Date & Time</Label>
              <Input
                id="activity-date"
                type="datetime-local"
                value={activityForm.datetime}
                onChange={(e) => setActivityForm({ ...activityForm, datetime: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="activity-location">Location</Label>
              <Select 
                value={activityForm.location} 
                onValueChange={(value) => setActivityForm({ ...activityForm, location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumias">Mumias Mill</SelectItem>
                  <SelectItem value="nzoia">Nzoia Mill</SelectItem>
                  <SelectItem value="chemelil">Chemelil Mill</SelectItem>
                  <SelectItem value="sony">Sony Mill</SelectItem>
                  <SelectItem value="field">Field Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="activity-assigned">Assigned To</Label>
              <Input
                id="activity-assigned"
                value={activityForm.assignedTo}
                onChange={(e) => setActivityForm({ ...activityForm, assignedTo: e.target.value })}
                placeholder="Enter assignee email"
              />
            </div>
            <div>
              <Label htmlFor="activity-description">Description</Label>
              <Textarea
                id="activity-description"
                value={activityForm.description}
                onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                placeholder="Activity details and requirements"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setNewActivityOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  console.log('Schedule activity:', activityForm)
                  setNewActivityOpen(false)
                  // Reset form
                  setActivityForm({ title: '', type: '', datetime: '', location: '', assignedTo: '', description: '' })
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                Schedule Activity
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  )
}
