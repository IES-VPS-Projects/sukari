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
  ChevronDown
} from "lucide-react"
import { BsCheckAll, BsBoxArrowUpRight } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { FaAngleDown } from 'react-icons/fa'
import { BiSend, BiPlus, BiMicrophone } from 'react-icons/bi'
import { HiSparkles } from 'react-icons/hi2'
import { ScheduleVisitModal } from "@/components/modals/schedule-visit-modal"
import { AlertsModal } from "@/components/modals/alerts-modal"
import { IndustryNewsModal } from "@/components/modals/industry-news-modal"
import AlertsCard from "./components/AlertsCard"
import IndustryNewsCard from "./components/IndustryNewsCard"
import MarketInsightsCard from "./components/MarketInsightsCard"
import { alertsData as importedAlertsData } from "./data/alerts-data"
import { useAuth } from "@/components/auth-provider"
import { PortalLayout } from "@/components/portal-layout"
import BriefingCard from "./components/BriefingCard"
import ActionsCard from "./components/ActionsCard"
import MeetingsCard from "./components/MeetingsCard"
import ActivitiesCard from "./components/ActivitiesCard"
import AIInsightsCard from "./components/AIInsightsCard"



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
      category: 'Compliance',
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
      category: 'Disaster',
      labelColor: 'bg-green-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: '4',
      title: 'Equipment Maintenance Required',
      label: 'MEDIUM',
      description: 'Routine maintenance scheduled for sugar mill equipment',
      timestamp: '8:15 AM • Chemelil',
      category: 'Performance',
      labelColor: 'bg-orange-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      id: '5',
      title: 'Weather Alert',
      label: 'MEDIUM',
      description: 'Heavy rainfall warning affects cane harvesting schedule',
      timestamp: '7:45 AM • Kakamega Region',
      category: 'Weather',
      labelColor: 'bg-orange-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
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



export default function TodayPage() {
  const [scheduleVisitOpen, setScheduleVisitOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("")
  const [greeting, setGreeting] = useState("")
  const [dynamicAlerts, setDynamicAlerts] = useState<any[]>([])
  const [industryNewsOpen, setIndustryNewsOpen] = useState(false)
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

  // Combine static alerts with dynamic production alerts and additional data
  const combinedAlertsData = {
    ...updatesData,
    alerts: [
      ...dynamicAlerts, 
      ...updatesData.alerts.map(alert => ({
        ...alert,
        category: alert.category || 'General'
      })),
      ...importedAlertsData.map((alert, index) => ({
        id: `additional-alert-${index}`,
        title: alert.title,
        label: alert.label,
        description: alert.description,
        timestamp: alert.timestamp,
        category: alert.title === 'Locust Infestation' ? 'Production' :
                  alert.title === 'Weather Alert' ? 'Production' :
                  alert.title === 'Weather' ? 'Production' :
                  alert.title === 'Disbursement Approval' ? 'Revenue' :
                  alert.title === 'Equipment Maintenance' ? 'Stakeholders' :
                  alert.title === 'Quality Control Notice' ? 'Stakeholders' :
                  alert.title === 'System Performance Alert' ? 'Stakeholders' :
                  alert.area === 'Equipment' ? 'Production' :
                  alert.area === 'Quality' ? 'Production' :
                  alert.area === 'Operations' ? 'Production' :
                  alert.area === 'Safety' ? 'Compliance' :
                  alert.area === 'Payments' ? 'Revenue' :
                  alert.area === 'Performance' ? 'Reports' :
                  alert.area === 'Weather' ? 'Production' :
                  alert.area === 'Disaster' ? 'Compliance' :
                  alert.area === 'General' ? 'Reports' : 'Reports',
        priority: alert.label === 'HIGH' ? 'high' : alert.label === 'MEDIUM' ? 'medium' : 'low',
        labelColor: alert.labelColor,
        iconBg: alert.iconBg,
        iconColor: alert.iconColor
      }))
    ]
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
            <IndustryNewsCard 
              onNewsClick={() => setIndustryNewsOpen(true)}
            />
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
            <ActionsCard />
        </div>        </div>

      <ScheduleVisitModal
        open={scheduleVisitOpen}
        onOpenChange={setScheduleVisitOpen}
        defaultLocation={selectedLocation}
      />

      <AlertsModal
        open={viewAllAlertsOpen}
        onOpenChange={setViewAllAlertsOpen}
        alertsData={combinedAlertsData}
        selectedAlertForDetails={selectedAlertForDetails}
        setSelectedAlertForDetails={setSelectedAlertForDetails}
        onTakeAction={() => setTriggerNewActivity(true)}
      />

      <IndustryNewsModal
        open={industryNewsOpen}
        onOpenChange={setIndustryNewsOpen}
      />
    </PortalLayout>
  )
}
