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
  allAIInsightsData, 
  allAlertsData 
} from "@/lib/mockdata"
import { useAuth } from "@/components/auth-provider"
import { PortalLayout } from "@/components/portal-layout"
import BriefingCard from "./BriefingCard"
import ActionsCard from "./ActionsCard"
import MeetingsCard from "./MeetingsCard"
import ActivitiesCard from "./ActivitiesCard"
import AIInsightsCard from "./AIInsightsCard"

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
const AlertsCard = ({ selectedItemId, setSelectedItemId, setViewAllAlertsOpen, setSelectedAlertForDetails, alertsData }: {
  selectedItemId: string | null,
  setSelectedItemId: (id: string | null) => void,
  setViewAllAlertsOpen: (open: boolean) => void,
  setSelectedAlertForDetails: (id: string | null) => void,
  alertsData: any
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
          {alertsData.alerts.slice(0, 3).map((item: any) => (
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
  const [dynamicAlerts, setDynamicAlerts] = useState<any[]>([])
  const { user } = useAuth()
  
  // Tasks card state (now only for alerts)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  
  // Modal states for viewing all items
  const [viewAllAlertsOpen, setViewAllAlertsOpen] = useState(false)
  const [triggerNewActivity, setTriggerNewActivity] = useState(false)
  
  // State for detail views
  const [selectedAlertForDetails, setSelectedAlertForDetails] = useState<string | null>(null)

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

  // Load and listen for production alerts
  useEffect(() => {
    const loadProductionAlerts = () => {
      const productionAlerts = JSON.parse(localStorage.getItem('productionAlerts') || '[]')
      setDynamicAlerts(productionAlerts)
    }

    // Load initial alerts
    loadProductionAlerts()

    // Listen for production alert updates
    const handleProductionAlertUpdate = () => {
      loadProductionAlerts()
    }

    window.addEventListener('productionAlertUpdate', handleProductionAlertUpdate)

    return () => {
      window.removeEventListener('productionAlertUpdate', handleProductionAlertUpdate)
    }
  }, [])

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

  // Combine static alerts with dynamic production alerts
  const combinedAlertsData = {
    ...updatesData,
    alerts: [...dynamicAlerts, ...updatesData.alerts]
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
            <AIInsightsCard 
              triggerNewActivity={triggerNewActivity}
              setTriggerNewActivity={setTriggerNewActivity}
            />

            <AlertsCard 
              selectedItemId={selectedItemId}
              setSelectedItemId={setSelectedItemId}
              setViewAllAlertsOpen={setViewAllAlertsOpen}
              setSelectedAlertForDetails={setSelectedAlertForDetails}
              alertsData={combinedAlertsData}
            />
          </div>

          {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8" style={{ height: "10%" }}>
            {/* Meetings */}
            <MeetingsCard />

            {/* Activities */}
            <ActivitiesCard 
              triggerNewActivity={triggerNewActivity}
              setTriggerNewActivity={setTriggerNewActivity}
            />

            {/* Actions Card */}
            <ActionsCard 
              selectedItemId={selectedItemId}
              setSelectedItemId={setSelectedItemId}
            />
        </div>        </div>

      <ScheduleVisitModal
        open={scheduleVisitOpen}
        onOpenChange={setScheduleVisitOpen}
        defaultLocation={selectedLocation}
      />

      {/* Alerts Modal */}
      <Dialog open={viewAllAlertsOpen} onOpenChange={setViewAllAlertsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 [&>button]:hidden">
          <DialogTitle className="sr-only">
            {selectedAlertForDetails ? 'Alert Details' : 'Alerts'}
          </DialogTitle>
          {(() => {
            if (selectedAlertForDetails) {
              const alert = combinedAlertsData.alerts.find((a: any) => a.id === selectedAlertForDetails)
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

                    <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
                      <div className="flex gap-3">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            console.log('Forward Alert', alert.id)
                            setSelectedAlertForDetails(null)
                            setViewAllAlertsOpen(false)
                          }}
                        >
                          <LuForward className="h-4 w-4 mr-2" />
                          Forward
                        </Button>
                        <Button 
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => {
                            console.log('Delete Alert', alert.id)
                            setSelectedAlertForDetails(null)
                            setViewAllAlertsOpen(false)
                          }}
                        >
                          ✕ Delete
                        </Button>
                      </div>
                      <div className="flex gap-3">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            console.log('Mark as Unread', alert.id)
                            setSelectedAlertForDetails(null)
                            setViewAllAlertsOpen(false)
                          }}
                        >
                          Mark as Unread
                        </Button>
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => {
                            console.log('Take Action', alert.id)
                            setSelectedAlertForDetails(null)
                            setViewAllAlertsOpen(false)
                            setTriggerNewActivity(true)
                          }}
                        >
                          Take Action
                        </Button>
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
                      <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
                      <p className="text-sm text-gray-500 mt-1">{combinedAlertsData.alerts.length} alerts requiring attention</p>
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
                    {combinedAlertsData.alerts.map((alert: any) => (
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
    </PortalLayout>
  )
}
