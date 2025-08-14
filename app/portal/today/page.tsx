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
  TrendingDown,
  ArrowRight,
  ArrowLeft,
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
import { GoInfo } from 'react-icons/go'
import { ScheduleVisitModal } from "@/components/modals/schedule-visit-modal"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { 
  allActionsData, 
  allMeetingsData, 
  allActivitiesData, 
  allAIInsightsData, 
  allAlertsData 
} from "@/lib/mockdata"
import { useAuth } from "@/components/auth-provider"
import { PortalLayout } from "@/components/portal-layout"
import BriefingCard from "./BriefingCard"

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
    },
    {
      id: '4',
      title: 'Equipment Maintenance Required',
      label: 'MEDIUM',
      description: 'Routine maintenance scheduled for sugar mill equipment',
      timestamp: '8:15 AM • Chemelil',
      labelColor: 'bg-orange-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      id: '5',
      title: 'Weather Alert',
      label: 'HIGH',
      description: 'Heavy rainfall warning affects cane harvesting schedule',
      timestamp: '7:45 AM • Kakamega Region',
      labelColor: 'bg-red-500',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    }
  ],
  notifications: [
    {
      id: '6',
      title: 'New Policy Update',
      label: 'INFO',
      description: 'Sugar Act 2024 implementation guidelines released',
      timestamp: '2:45 PM • Kenya Sugar Board',
      labelColor: 'bg-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: '7',
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
    setCurrentIndex((prev: number) => (prev + 1) % marketData.length)
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
const AlertsCard = ({ selectedItemId, setSelectedItemId, setViewAllAlertsOpen, setSelectedAlertForDetails }: {
  selectedItemId: string | null,
  setSelectedItemId: (id: string | null) => void,
  setViewAllAlertsOpen: (open: boolean) => void,
  setSelectedAlertForDetails: (id: string | null) => void
}) => {
  const handleItemAction = (action: string, itemId: string) => {
    console.log(`${action} action for item ${itemId}`)
    setSelectedItemId(null)
    
    if (action === 'details') {
      setSelectedAlertForDetails(itemId)
      setViewAllAlertsOpen(true)
    }
  }

  return (
    <Card className="rounded-[20px] shadow-lg border-0 bg-white">
      <CardHeader className="pb-1">
        <CardTitle className="text-[#202020] cursor-pointer" onClick={() => {
          setSelectedAlertForDetails(null)
          setViewAllAlertsOpen(true)
        }}>Alerts</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* Alert Content - No tabs, just alerts (limited to 3 most recent) */}
        <div className="space-y-3">
          {updatesData.alerts.slice(0, 3).map((item) => (
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
              onClick={(e: React.MouseEvent) => {
                // Only trigger if not clicking on the ellipsis button
                if (!(e.target as HTMLElement).closest('.ellipsis-menu')) {
                  setSelectedAlertForDetails(item.id)
                  setViewAllAlertsOpen(true)
                }
              }}
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
                      className="p-1 hover:bg-gray-100 rounded ellipsis-menu"
                    >
                      <HiEllipsisHorizontal className="h-4 w-4 text-gray-400" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {selectedItemId === item.id && (
                      <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg z-10 w-40">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              setSelectedAlertForDetails(item.id)
                              setViewAllAlertsOpen(true)
                              setSelectedItemId(null)
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-gray-50"
                          >
                            <GoInfo className="h-3 w-3" />
                            Details
                          </button>
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
const ActionsCard = ({ selectedItemId, setSelectedItemId, setViewAllActionsOpen, setSelectedActionForDetails }: {
  selectedItemId: string | null,
  setSelectedItemId: (id: string | null) => void,
  setViewAllActionsOpen: (open: boolean) => void,
  setSelectedActionForDetails: (id: string | null) => void
}) => {
  const handleItemAction = (action: string, itemId: string) => {
    console.log(`${action} action for item ${itemId}`)
    setSelectedItemId(null)
    
    if (action === 'details') {
      setSelectedActionForDetails(itemId)
      setViewAllActionsOpen(true)
    }
  }

  return (
    <Card className="rounded-[20px] shadow-lg border-0 bg-white">
      <CardHeader className="pb-1 cursor-pointer" onClick={() => {
        setSelectedActionForDetails(null)
        setViewAllActionsOpen(true)
      }}>
        <CardTitle className="text-[#202020]">Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* Actions Content - List of actions requiring approval/votes (limited to 2) */}
        <div className="space-y-3">
          {[
            {
              id: 'action-1',
              title: 'Sugar Import Allocation Approval',
              description: 'Approve allocation of 50,000 MT sugar imports to Mumias Sugar Company',
              type: 'approval',
              timestamp: '2 hours ago',
              iconColor: 'text-blue-600',
              iconBg: 'bg-blue-100',
              hoverBg: 'hover:bg-blue-50'
            },
            {
              id: 'action-2', 
              title: 'Cane Pricing Committee Vote',
              description: 'Vote on proposed cane pricing structure for 2024/25 season',
              type: 'vote',
              timestamp: '4 hours ago',
              iconColor: 'text-green-600',
              iconBg: 'bg-green-100',
              hoverBg: 'hover:bg-green-50'
            }
          ].map((item) => (
            <div 
              key={item.id} 
              className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${item.hoverBg} hover:shadow-md`}
              onClick={(e: React.MouseEvent) => {
                // Only trigger if not clicking on the ellipsis button
                if (!(e.target as HTMLElement).closest('.ellipsis-menu')) {
                  setSelectedActionForDetails(item.id)
                  setViewAllActionsOpen(true)
                }
              }}
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
                  <div className="relative ellipsis-menu">
                    <button
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation() // Prevent triggering the card click
                        setSelectedItemId(selectedItemId === item.id ? null : item.id)
                      }}
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
  
  // Tasks card state (now only for alerts)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  // Modal states for new meeting/activity
  const [newMeetingOpen, setNewMeetingOpen] = useState(false)
  const [newActivityOpen, setNewActivityOpen] = useState(false)
  
  // Dropdown states for templates
  const [meetingDropdownOpen, setMeetingDropdownOpen] = useState(false)
  const [activityDropdownOpen, setActivityDropdownOpen] = useState(false)
  
  // Modal states for viewing all items
  const [viewAllActionsOpen, setViewAllActionsOpen] = useState(false)
  const [viewAllMeetingsOpen, setViewAllMeetingsOpen] = useState(false)
  const [viewAllActivitiesOpen, setViewAllActivitiesOpen] = useState(false)
  const [viewAllAlertsOpen, setViewAllAlertsOpen] = useState(false)
  const [viewAllAIInsightsOpen, setViewAllAIInsightsOpen] = useState(false)
  
  // State for detail views
  const [selectedActionForDetails, setSelectedActionForDetails] = useState<string | null>(null)
  const [selectedMeetingForDetails, setSelectedMeetingForDetails] = useState<string | null>(null)
  const [selectedActivityForDetails, setSelectedActivityForDetails] = useState<string | null>(null)
  const [selectedAlertForDetails, setSelectedAlertForDetails] = useState<string | null>(null)
  const [selectedAIInsightForDetails, setSelectedAIInsightForDetails] = useState<string | null>(null)

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
            <BriefingCard />
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
                <CardTitle className="flex items-center gap-2 text-[#202020] cursor-pointer" onClick={() => {
                  setSelectedAIInsightForDetails(null)
                  setViewAllAIInsightsOpen(true)
                }}>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  AI Insights
                </CardTitle>
                <CardDescription className="text-[#6B6B6B]">
                  Intelligent insights based on current data patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                  onClick={(e) => {
                    if (!(e.target as HTMLElement).closest('button')) {
                      setSelectedAIInsightForDetails('insight-1')
                      setViewAllAIInsightsOpen(true)
                    }
                  }}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#202020]">Regional Visit</p>
                    <p className="text-xs text-[#6B6B6B]">
                      Consider visiting Mumias region – 15% production drop – Requires executive attention for on-site assessments.
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleScheduleVisit("Mumias Sugar Mill")}>
                    Action
                  </Button>
                </div>

                <div 
                  className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                  onClick={(e) => {
                    if (!(e.target as HTMLElement).closest('button')) {
                      setSelectedAIInsightForDetails('insight-2')
                      setViewAllAIInsightsOpen(true)
                    }
                  }}
                >
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#202020]">Policy Review Alert</p>
                    <p className="text-xs text-[#6B6B6B]">Recommended policy review – 25% increase in compliance violations this quarter – Update frameworks to align with Sugar Act 2024.</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Action
                  </Button>
                </div>

                <div 
                  className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                  onClick={(e) => {
                    if (!(e.target as HTMLElement).closest('button')) {
                      setSelectedAIInsightForDetails('insight-3')
                      setViewAllAIInsightsOpen(true)
                    }
                  }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#202020]">Weather Preparation Insight</p>
                    <p className="text-xs text-[#6B6B6B]">Weather alert preparation – Prepare drought mitigation for Western region based on upcoming forecasts.</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Action
                  </Button>
                </div>
              </CardContent>
            </Card>

            <AlertsCard 
              selectedItemId={selectedItemId}
              setSelectedItemId={setSelectedItemId}
              setViewAllAlertsOpen={setViewAllAlertsOpen}
              setSelectedAlertForDetails={setSelectedAlertForDetails}
            />
          </div>

          {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8" style={{ height: "10%" }}>
            {/*Meetings*/}
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
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

            {/*Activities */}
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader className="pb-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#202020] cursor-pointer" onClick={() => {
                    setSelectedActivityForDetails(null)
                    setViewAllActivitiesOpen(true)
                  }}>Activities</CardTitle>
                  <div className="relative">
                  <div className="flex">
                    <Button 
                      size="sm" 
                      className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded-l-lg flex items-center gap-2 shadow-sm border-r-0"
                      onClick={() => setNewActivityOpen(true)}
                    >
                      <LuSquarePen className="h-4 w-4" />
                      New
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-2 py-1 rounded-r-lg flex items-center shadow-sm"
                      onClick={() => setActivityDropdownOpen(!activityDropdownOpen)}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                    </div>
                    
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
                    setSelectedActivityForDetails('activity-1')
                    setViewAllActivitiesOpen(true)
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
                    setSelectedActivityForDetails('activity-2')
                    setViewAllActivitiesOpen(true)
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
                    setSelectedActivityForDetails('activity-3')
                    setViewAllActivitiesOpen(true)
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
              setViewAllActionsOpen={setViewAllActionsOpen}
              setSelectedActionForDetails={setSelectedActionForDetails}
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

      {/* View All Actions Modal */}
      <Dialog open={viewAllActionsOpen} onOpenChange={() => {
        setViewAllActionsOpen(false)
        setSelectedActionForDetails(null)
      }}>
        <DialogContent className="sm:max-w-[750px] max-h-[85vh] [&>button]:hidden">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <DialogTitle className="text-[#202020] text-lg font-medium">Actions</DialogTitle>
              <p className="text-sm text-gray-500 mt-1">{allActionsData.length} actions requiring attention</p>
            </div>
            <div className="group relative">
              <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
              <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                List of actions requiring approval or voting decisions
              </div>
            </div>
          </DialogHeader>
          
          {!selectedActionForDetails ? (
            <div className="space-y-3 max-h-[65vh] overflow-y-auto">
              {allActionsData.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-md border"
                  onClick={() => setSelectedActionForDetails(item.id)}
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Action Details View
            (() => {
              const selectedAction = allActionsData.find(action => action.id === selectedActionForDetails)
              if (!selectedAction) return null
              
              return (
                <div className="space-y-4 max-h-[65vh] overflow-y-auto">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedActionForDetails(null)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Back to Actions
                  </Button>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 ${selectedAction.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        {selectedAction.type === 'approval' ? (
                          <CheckCircle className={`h-6 w-6 ${selectedAction.iconColor}`} />
                        ) : (
                          <Users className={`h-6 w-6 ${selectedAction.iconColor}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#202020] mb-2">{selectedAction.title}</h3>
                        <p className="text-sm text-[#6B6B6B] mb-2">{selectedAction.description}</p>
                        <p className="text-xs text-[#9CA3AF]">{selectedAction.timestamp}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Action Type:</label>
                        <p className="text-sm text-gray-600 capitalize">{selectedAction.type}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Status:</label>
                        <p className="text-sm text-yellow-600">Pending Review</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Priority:</label>
                        <p className="text-sm text-gray-600">High</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Deadline:</label>
                        <p className="text-sm text-gray-600">
                          {selectedAction.id === 'action-1' ? 'August 15, 2025' :
                           selectedAction.id === 'action-2' ? 'August 14, 2025' :
                           selectedAction.id === 'action-3' ? 'August 16, 2025' :
                           selectedAction.id === 'action-4' ? 'August 18, 2025' :
                           'August 20, 2025'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                      {selectedAction.type === 'approval' ? (
                        <>
                          <Button 
                            className="bg-green-600 hover:bg-green-700 text-white px-6"
                            onClick={() => {
                              console.log('Approve', selectedAction.id)
                              setSelectedActionForDetails(null)
                              setViewAllActionsOpen(false)
                            }}
                          >
                            Approve
                          </Button>
                          <Button 
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 px-6"
                            onClick={() => {
                              console.log('Reject', selectedAction.id)
                              setSelectedActionForDetails(null)
                              setViewAllActionsOpen(false)
                            }}
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            className="bg-green-600 hover:bg-green-700 text-white px-6"
                            onClick={() => {
                              console.log('Vote Yes', selectedAction.id)
                              setSelectedActionForDetails(null)
                              setViewAllActionsOpen(false)
                            }}
                          >
                            Vote Yes
                          </Button>
                          <Button 
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 px-6"
                            onClick={() => {
                              console.log('Vote No', selectedAction.id)
                              setSelectedActionForDetails(null)
                              setViewAllActionsOpen(false)
                            }}
                          >
                            Vote No
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })()
          )}
        </DialogContent>
      </Dialog>

      {/* Alerts Modal */}
      <Dialog open={viewAllAlertsOpen} onOpenChange={setViewAllAlertsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 [&>button]:hidden">
          <DialogTitle className="sr-only">
            {selectedAlertForDetails ? 'Alert Details' : 'Alerts'}
          </DialogTitle>
          {(() => {
            if (selectedAlertForDetails) {
              const alert = updatesData.alerts.find(a => a.id === selectedAlertForDetails)
              if (alert) {
                return (
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedAlertForDetails(null)}
                          className="shrink-0"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${alert.iconBg} rounded-lg flex items-center justify-center`}>
                            <FiAlertTriangle className={`h-5 w-5 ${alert.iconColor}`} />
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900">{alert.title}</h2>
                            <p className="text-sm text-gray-500">{alert.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Alert Details</h3>
                          <p className="text-gray-700">{alert.description}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Priority</h3>
                          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            alert.labelColor === 'bg-red-500' ? 'bg-red-50 text-red-700' :
                            alert.labelColor === 'bg-orange-500' ? 'bg-orange-50 text-orange-700' :
                            alert.labelColor === 'bg-yellow-500' ? 'bg-yellow-50 text-yellow-700' :
                            alert.labelColor === 'bg-blue-500' ? 'bg-blue-50 text-blue-700' :
                            alert.labelColor === 'bg-green-500' ? 'bg-green-50 text-green-700' :
                            alert.labelColor === 'bg-purple-500' ? 'bg-purple-50 text-purple-700' :
                            'bg-gray-50 text-gray-700'
                          }`}>
                            {alert.label}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Affected Area</h3>
                          <p className="text-gray-700">
                            {alert.timestamp.includes('•') 
                              ? alert.timestamp.split('•')[1].trim() 
                              : 'Field Operations'}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Recommended Actions</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            <li>Review alert conditions and assess impact</li>
                            <li>Coordinate with relevant teams for response</li>
                            <li>Monitor situation for changes</li>
                            <li>Update stakeholders on status</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          console.log('Mark as Read', alert.id)
                          setSelectedAlertForDetails(null)
                          setViewAllAlertsOpen(false)
                        }}
                      >
                        Mark as Read
                      </Button>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          console.log('Take Action', alert.id)
                          setSelectedAlertForDetails(null)
                          setViewAllAlertsOpen(false)
                        }}
                      >
                        Take Action
                      </Button>
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
                      <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
                      <p className="text-sm text-gray-500 mt-1">{updatesData.alerts.length} alerts requiring attention</p>
                    </div>
                    <div className="group relative">
                      <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                      <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        System alerts and notifications requiring attention
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-3">
                    {updatesData.alerts.map((alert) => (
                      <div 
                        key={alert.id}
                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          alert.iconColor === 'text-red-600' ? 'hover:bg-red-50' :
                          alert.iconColor === 'text-orange-600' ? 'hover:bg-orange-50' :
                          alert.iconColor === 'text-yellow-600' ? 'hover:bg-yellow-50' :
                          alert.iconColor === 'text-blue-600' ? 'hover:bg-blue-50' :
                          alert.iconColor === 'text-green-600' ? 'hover:bg-green-50' :
                          alert.iconColor === 'text-purple-600' ? 'hover:bg-purple-50' :
                          'hover:bg-gray-50'
                        } hover:shadow-md`}
                        onClick={() => setSelectedAlertForDetails(alert.id)}
                      >
                        {/* Icon */}
                        <div className={`w-8 h-8 ${alert.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <FiAlertTriangle className={`h-4 w-4 ${alert.iconColor}`} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-sm font-medium text-[#202020] truncate">{alert.title}</h4>
                                <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${
                                  alert.labelColor === 'bg-red-500' ? 'bg-red-50/80 text-red-700 border-gray-300' :
                                  alert.labelColor === 'bg-orange-500' ? 'bg-orange-50/80 text-orange-700 border-gray-300' :
                                  alert.labelColor === 'bg-yellow-500' ? 'bg-yellow-50/80 text-yellow-700 border-gray-300' :
                                  alert.labelColor === 'bg-blue-500' ? 'bg-blue-50/80 text-blue-700 border-gray-300' :
                                  alert.labelColor === 'bg-green-500' ? 'bg-green-50/80 text-green-700 border-gray-300' :
                                  alert.labelColor === 'bg-purple-500' ? 'bg-purple-50/80 text-purple-700 border-gray-300' :
                                  'bg-gray-50/80 text-gray-700 border-gray-300'
                                }`}>
                                  {alert.label}
                                </div>
                              </div>
                              <p className="text-xs text-[#6B6B6B] mb-1">{alert.description}</p>
                              <p className="text-xs text-[#9CA3AF]">{alert.timestamp}</p>
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
                    <div className="p-6 border-b">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedMeetingForDetails(null)}
                          className="shrink-0"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900">{meeting.title}</h2>
                            <p className="text-sm text-gray-500">{meeting.date} • {meeting.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Meeting Details</h3>
                          <p className="text-gray-700">{meeting.description}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Location</h3>
                          <p className="text-gray-700">{meeting.location}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Type</h3>
                          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${meeting.typeColor}`}>
                            {meeting.type}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Attendees ({meeting.attendees})</h3>
                          <div className="flex -space-x-2">
                            {Array.from({ length: Math.min(meeting.attendees, 6) }).map((_, i) => (
                              <div key={i} className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-600">{String.fromCharCode(65 + i)}</span>
                              </div>
                            ))}
                            {meeting.attendees > 6 && (
                              <div className="w-8 h-8 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-500">+{meeting.attendees - 6}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Agenda</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            <li>Review previous meeting minutes</li>
                            <li>Quarterly performance review</li>
                            <li>Strategic planning discussion</li>
                            <li>Next steps and action items</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          console.log('Join Meeting', meeting.id)
                          setSelectedMeetingForDetails(null)
                          setViewAllMeetingsOpen(false)
                        }}
                      >
                        Join Meeting
                      </Button>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          console.log('View Details', meeting.id)
                          setSelectedMeetingForDetails(null)
                          setViewAllMeetingsOpen(false)
                        }}
                      >
                        View Full Details
                      </Button>
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
                    <div className="flex items-center gap-3">
                      {/* New and Dropdown buttons */}
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
                                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                              >
                                General Meeting
                              </button>
                              <button
                                onClick={() => {
                                  setMeetingForm({...meetingForm, title: 'Project Review'})
                                  setNewMeetingOpen(true)
                                  setMeetingDropdownOpen(false)
                                }}
                                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                              >
                                Project Review
                              </button>
                              <button
                                onClick={() => {
                                  setMeetingForm({...meetingForm, title: 'Strategic Planning'})
                                  setNewMeetingOpen(true)
                                  setMeetingDropdownOpen(false)
                                }}
                                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                              >
                                Strategic Planning
                              </button>
                              <button
                                onClick={() => {
                                  setMeetingForm({...meetingForm, title: 'Team Standup'})
                                  setNewMeetingOpen(true)
                                  setMeetingDropdownOpen(false)
                                }}
                                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                              >
                                Team Standup
                              </button>
                              <button
                                onClick={() => {
                                  setMeetingForm({...meetingForm, title: 'Client Presentation'})
                                  setNewMeetingOpen(true)
                                  setMeetingDropdownOpen(false)
                                }}
                                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                              >
                                Client Presentation
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="group relative">
                        <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                        <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                          Scheduled meetings and appointments
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-3">
                    {allMeetingsData.map((meeting) => (
                      <div 
                        key={meeting.id}
                        className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:shadow-md"
                        onClick={() => setSelectedMeetingForDetails(meeting.id)}
                      >
                        {/* Icon */}
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-sm font-medium text-[#202020] truncate">{meeting.title}</h4>
                                <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${meeting.typeColor} border-gray-300`}>
                                  {meeting.type}
                                </div>
                              </div>
                              <p className="text-xs text-[#6B6B6B] mb-1">{meeting.description}</p>
                              <div className="flex items-center gap-4">
                                <p className="text-xs text-[#9CA3AF]">{meeting.date} • {meeting.time}</p>
                                <p className="text-xs text-[#9CA3AF]">{meeting.attendees} attendees</p>
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

      {/* Activities Modal */}
      <Dialog open={viewAllActivitiesOpen} onOpenChange={setViewAllActivitiesOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 [&>button]:hidden">
          <DialogTitle className="sr-only">
            {selectedActivityForDetails ? 'Activity Details' : 'Activities'}
          </DialogTitle>
          {(() => {
            if (selectedActivityForDetails) {
              const activity = allActivitiesData.find(a => a.id === selectedActivityForDetails)
              if (activity) {
                return (
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedActivityForDetails(null)}
                          className="shrink-0"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${activity.iconBg} rounded-lg flex items-center justify-center`}>
                            <div className={`h-5 w-5 ${activity.iconColor}`}>
                              {activity.type === 'compliance' && <AlertTriangle className="h-5 w-5" />}
                              {activity.type === 'visit' && <Calendar className="h-5 w-5" />}
                              {activity.type === 'renewal' && <CheckCircle className="h-5 w-5" />}
                              {activity.type === 'maintenance' && <TrendingUp className="h-5 w-5" />}
                            </div>
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900">{activity.title}</h2>
                            <p className="text-sm text-gray-500">{activity.dueDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Activity Details</h3>
                          <p className="text-gray-700">{activity.description}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Location</h3>
                          <p className="text-gray-700">{activity.location}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Status</h3>
                          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${activity.statusColor}`}>
                            {activity.status}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Priority</h3>
                          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${activity.priorityColor}`}>
                            {activity.priority}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Assigned To</h3>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600">{activity.assignee?.charAt(0) || 'A'}</span>
                            </div>
                            <span className="text-gray-700">{activity.assignee || 'Unassigned'}</span>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Next Steps</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            <li>Review activity requirements</li>
                            <li>Coordinate with field teams</li>
                            <li>Schedule necessary resources</li>
                            <li>Update progress status</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          console.log('Mark Complete', activity.id)
                          setSelectedActivityForDetails(null)
                          setViewAllActivitiesOpen(false)
                        }}
                      >
                        Mark Complete
                      </Button>
                      <Button 
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                        onClick={() => {
                          console.log('Update Activity', activity.id)
                          setSelectedActivityForDetails(null)
                          setViewAllActivitiesOpen(false)
                        }}
                      >
                        Update Activity
                      </Button>
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
                      <h2 className="text-xl font-semibold text-gray-900">Activities</h2>
                      <p className="text-sm text-gray-500 mt-1">{allActivitiesData.length} activities requiring attention</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* New and Dropdown buttons */}
                      <div className="relative">
                        <div className="flex">
                          <Button 
                            size="sm" 
                            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded-l-lg flex items-center gap-2 shadow-sm border-r-0"
                            onClick={() => setNewActivityOpen(true)}
                          >
                            <LuSquarePen className="h-4 w-4" />
                            New
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-2 py-1 rounded-r-lg flex items-center shadow-sm"
                            onClick={() => setActivityDropdownOpen(!activityDropdownOpen)}
                          >
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {/* Dropdown Menu */}
                        {activityDropdownOpen && (
                          <div className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg z-20 w-48">
                            <div className="py-1">
                              <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b">Activity Types</div>
                              <button
                                onClick={() => {
                                  setActivityForm({...activityForm, title: 'Compliance Check'})
                                  setNewActivityOpen(true)
                                  setActivityDropdownOpen(false)
                                }}
                                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                              >
                                Compliance Check
                              </button>
                              <button
                                onClick={() => {
                                  setActivityForm({...activityForm, title: 'Site Visit'})
                                  setNewActivityOpen(true)
                                  setActivityDropdownOpen(false)
                                }}
                                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                              >
                                Site Visit
                              </button>
                              <button
                                onClick={() => {
                                  setActivityForm({...activityForm, title: 'Policy Renewal'})
                                  setNewActivityOpen(true)
                                  setActivityDropdownOpen(false)
                                }}
                                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                              >
                                Policy Renewal
                              </button>
                              <button
                                onClick={() => {
                                  setActivityForm({...activityForm, title: 'Equipment Maintenance'})
                                  setNewActivityOpen(true)
                                  setActivityDropdownOpen(false)
                                }}
                                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                              >
                                Equipment Maintenance
                              </button>
                              <button
                                onClick={() => {
                                  setActivityForm({...activityForm, title: 'Training Session'})
                                  setNewActivityOpen(true)
                                  setActivityDropdownOpen(false)
                                }}
                                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                              >
                                Training Session
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="group relative">
                        <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                        <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                          Tasks and activities needing completion
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-3">
                    {allActivitiesData.map((activity) => (
                      <div 
                        key={activity.id}
                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          activity.type === 'compliance' ? 'hover:bg-orange-50' :
                          activity.type === 'visit' ? 'hover:bg-blue-50' :
                          activity.type === 'renewal' ? 'hover:bg-purple-50' :
                          activity.type === 'maintenance' ? 'hover:bg-green-50' :
                          'hover:bg-gray-50'
                        } hover:shadow-md`}
                        onClick={() => setSelectedActivityForDetails(activity.id)}
                      >
                        {/* Icon */}
                        <div className={`w-8 h-8 ${activity.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <div className={`h-4 w-4 ${activity.iconColor}`}>
                            {activity.type === 'compliance' && <AlertTriangle className="h-4 w-4" />}
                            {activity.type === 'visit' && <Calendar className="h-4 w-4" />}
                            {activity.type === 'renewal' && <CheckCircle className="h-4 w-4" />}
                            {activity.type === 'maintenance' && <TrendingUp className="h-4 w-4" />}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-sm font-medium text-[#202020] truncate">{activity.title}</h4>
                                <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${activity.statusColor} border-gray-300`}>
                                  {activity.status}
                                </div>
                              </div>
                              <p className="text-xs text-[#6B6B6B] mb-1">{activity.description}</p>
                              <div className="flex items-center gap-4">
                                <p className="text-xs text-[#9CA3AF]">{activity.dueDate}</p>
                                <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${activity.priorityColor} border-gray-300`}>
                                  {activity.priority}
                                </div>
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

      {/* AI Insights Modal */}
      <Dialog open={viewAllAIInsightsOpen} onOpenChange={setViewAllAIInsightsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 [&>button]:hidden">
          <DialogTitle className="sr-only">
            {selectedAIInsightForDetails ? 'AI Insight Details' : 'AI Insights'}
          </DialogTitle>
          {(() => {
            if (selectedAIInsightForDetails) {
              const insight = allAIInsightsData.find(i => i.id === selectedAIInsightForDetails)
              if (insight) {
                return (
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedAIInsightForDetails(null)}
                          className="shrink-0"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900">{insight.title}</h2>
                            <p className="text-sm text-gray-500">{insight.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">AI Analysis</h3>
                          <p className="text-gray-700">{insight.description}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
                          <div className="capitalize text-gray-700">{insight.category}</div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Confidence Level</h3>
                          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            insight.confidence === 'high' ? 'bg-green-50 text-green-700' :
                            insight.confidence === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                            'bg-red-50 text-red-700'
                          }`}>
                            {insight.confidence} confidence
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Impact Assessment</h3>
                          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            insight.impact === 'high' ? 'bg-red-50 text-red-700' :
                            insight.impact === 'medium' ? 'bg-orange-50 text-orange-700' :
                            'bg-green-50 text-green-700'
                          }`}>
                            {insight.impact} impact
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Recommended Actions</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            <li>Review detailed analytics and data patterns</li>
                            <li>Validate AI recommendations with domain experts</li>
                            <li>Implement suggested improvements where applicable</li>
                            <li>Monitor outcomes and update models accordingly</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Data Sources</h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Production Data</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Environmental Sensors</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Historical Patterns</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Market Analysis</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          console.log('Dismiss Insight', insight.id)
                          setSelectedAIInsightForDetails(null)
                          setViewAllAIInsightsOpen(false)
                        }}
                      >
                        Dismiss
                      </Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => {
                          console.log('Implement Suggestion', insight.id)
                          setSelectedAIInsightForDetails(null)
                          setViewAllAIInsightsOpen(false)
                        }}
                      >
                        Implement Suggestion
                      </Button>
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
                      <h2 className="text-xl font-semibold text-gray-900">AI Insights</h2>
                      <p className="text-sm text-gray-500 mt-1">{allAIInsightsData.length} insights available</p>
                    </div>
                    <div className="group relative">
                      <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                      <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        AI-generated insights and recommendations
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-3">
                    {allAIInsightsData.map((insight) => (
                      <div 
                        key={insight.id}
                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${insight.hoverBg} hover:shadow-md`}
                        onClick={(e) => {
                          if (!(e.target as HTMLElement).closest('button')) {
                            setSelectedAIInsightForDetails(insight.id)
                          }
                        }}
                      >
                        {/* Icon */}
                        <div className={`w-8 h-8 ${insight.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <CheckCircle className={`h-4 w-4 ${insight.iconColor}`} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-sm font-medium text-[#202020] truncate">{insight.title}</h4>
                                <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${
                                  insight.confidence === 'high' ? 'bg-green-50/80 text-green-700 border-gray-300' :
                                  insight.confidence === 'medium' ? 'bg-yellow-50/80 text-yellow-700 border-gray-300' :
                                  'bg-red-50/80 text-red-700 border-gray-300'
                                }`}>
                                  {insight.confidence}
                                </div>
                              </div>
                              <p className="text-xs text-[#6B6B6B] mb-1">{insight.description}</p>
                              <div className="flex items-center gap-4">
                                <p className="text-xs text-[#9CA3AF]">{insight.timestamp}</p>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="ml-3 shrink-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                // Handle action scheduling logic here
                                console.log('Schedule action for insight:', insight.id)
                              }}
                            >
                              Action
                            </Button>
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
    </PortalLayout>
  )
}
