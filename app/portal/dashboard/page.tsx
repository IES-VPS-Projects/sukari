"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PortalLayout } from "@/components/portal-layout"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Factory, Users, DollarSign, AlertTriangle, Award, Filter, FileText, Search, Plus, Download, Eye, Calendar, BookOpen } from "lucide-react"
import ViewPlanCard from "./ViewPlanCard"
import ResourceCenterCard from "./ResourceCenterCard"
import SucroseContentCard from "./SucroseContentCard"
import ProductionPulseCard from "./ProductionPulseCard"
import PermitsCard from "./PermitsCard"
import VesselTrackingCard from "./VesselTrackingCard"
import { sucroseContentData, productionData as mockProductionData } from "@/lib/mockdata"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js'
import { Line as ChartLine } from 'react-chartjs-2'
import { useState as useStateReact, useEffect } from "react"

// Custom Gauge Meter Component
const GaugeMeter = ({ value, size = 120 }: { value: number; size?: number }) => {
  const [animatedValue, setAnimatedValue] = useStateReact(0)
  
  // Animation effect
  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60 // 60fps
    const stepValue = value / steps
    const stepDelay = duration / steps
    
    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const newValue = Math.min(stepValue * currentStep, value)
      setAnimatedValue(newValue)
      
      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedValue(value) // Ensure final value is exact
      }
    }, stepDelay)
    
    return () => clearInterval(timer)
  }, [value])
  
  const arcRadius = size * 0.28
  const tickRadius = size * 0.38
  const labelRadius = size * 0.45
  const bezelRadius = size * 0.58
  const startAngle = 180
  const endAngle = 0
  const angleRange = startAngle - endAngle
  
  // SVG dimensions to accommodate the full bezel
  const svgWidth = (bezelRadius + 10) * 2
  const svgHeight = size * 0.8
  const centerX = svgWidth / 2
  const centerY = size * 0.6
  
  // Calculate needle angle based on animated value (0-100%)
  const needleAngle = startAngle - (animatedValue / 100) * angleRange
  const needleLength = arcRadius * 0.9
  const needleX = centerX + needleLength * Math.cos((needleAngle * Math.PI) / 180)
  const needleY = centerY - needleLength * Math.sin((needleAngle * Math.PI) / 180)
  
  // Create multiple segments for smooth gradient transition
  const segments = 50 // Number of segments for smooth transition
  const segmentAngle = angleRange / segments
  
  return (
    <div className="flex flex-col items-center">
      <svg width={svgWidth} height={svgHeight} className="drop-shadow-sm">
        <defs>
          {/* Bezel gradient */}
          <radialGradient id="bezelGradient">
            <stop offset="0%" stopColor="#f0f0f0" />
            <stop offset="60%" stopColor="#d0d0d0" />
            <stop offset="85%" stopColor="#b0b0b0" />
            <stop offset="100%" stopColor="#909090" />
          </radialGradient>
          
          {/* Arc gradient for smooth color transition */}
          <linearGradient id="arcGradient" gradientUnits="userSpaceOnUse" 
            x1={centerX - arcRadius} y1={centerY} 
            x2={centerX + arcRadius} y2={centerY}>
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="22.5%" stopColor="#f97316" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="62.5%" stopColor="#eab308" />
            <stop offset="75%" stopColor="#84cc16" />
            <stop offset="87.5%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        
        {/* Inner white face */}
        <circle
          cx={centerX}
          cy={centerY}
          r={arcRadius - 5}
          fill="white"
          stroke="#e5e5e5"
          strokeWidth="1"
        />
        
        {/* Single arc with gradient for smooth color transition */}
        <path
          d={`M ${centerX - arcRadius} ${centerY} A ${arcRadius} ${arcRadius} 0 0 1 ${centerX + arcRadius} ${centerY}`}
          fill="none"
          stroke="url(#arcGradient)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        
        {/* Scale tick marks and labels (outside the arcs) */}
        {[0, 20, 40, 60, 80, 100].map((tick) => {
          const tickAngle = startAngle - (tick / 100) * angleRange
          const tickX1 = centerX + tickRadius * Math.cos((tickAngle * Math.PI) / 180)
          const tickY1 = centerY - tickRadius * Math.sin((tickAngle * Math.PI) / 180)
          const tickX2 = centerX + (tickRadius - 15) * Math.cos((tickAngle * Math.PI) / 180)
          const tickY2 = centerY - (tickRadius - 15) * Math.sin((tickAngle * Math.PI) / 180)
          const labelX = centerX + labelRadius * Math.cos((tickAngle * Math.PI) / 180)
          const labelY = centerY - labelRadius * Math.sin((tickAngle * Math.PI) / 180)
          
          return (
            <g key={tick}>
              <line
                x1={tickX1}
                y1={tickY1}
                x2={tickX2}
                y2={tickY2}
                stroke="#333"
                strokeWidth="2"
              />
              <text
                x={labelX}
                y={labelY + 3}
                textAnchor="middle"
                fontSize="9"
                fill="#333"
                fontFamily="sans-serif"
                fontWeight="500"
              >
                {tick}%
              </text>
            </g>
          )
        })}
        
        {/* Needle */}
        <line
          x1={centerX}
          y1={centerY}
          x2={needleX}
          y2={needleY}
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Center dot */}
        <circle
          cx={centerX}
          cy={centerY}
          r="4"
          fill="#333"
        />
        
        {/* Outer bezel (drawn last to appear on top) */}
        <circle
          cx={centerX}
          cy={centerY}
          r={bezelRadius}
          fill="none"
          stroke="url(#bezelGradient)"
          strokeWidth="6"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={bezelRadius - 3}
          fill="none"
          stroke="#a0a0a0"
          strokeWidth="1"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={bezelRadius + 3}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="1"
        />
      </svg>
      
      {/* Digital display panel */}
      <div className="mt-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-1 shadow-inner">
        <span className="text-lg font-bold text-black">{Math.round(animatedValue)}%</span>
      </div>
    </div>
  )
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement,
  Filler
)

const productionData = [
  { month: "Jul", production: 2400, target: 2800 },
  { month: "Aug", production: 2600, target: 2800 },
  { month: "Sep", production: 2800, target: 2800 },
  { month: "Oct", production: 3200, target: 2800 },
  { month: "Nov", production: 2900, target: 2800 },
  { month: "Dec", production: 3100, target: 2800 },
]

const revenueData = [
  { month: "Jul", revenue: 42 },
  { month: "Aug", revenue: 45 },
  { month: "Sep", revenue: 48 },
  { month: "Oct", revenue: 52 },
  { month: "Nov", revenue: 49 },
  { month: "Dec", revenue: 55 },
]

const complianceData = [
  { name: "Compliant", value: 87, color: "#10b981" },
  { name: "Non-Compliant", value: 13, color: "#ef4444" },
]

const stakeholders = [
  { type: "Sugar Millers", count: 12, total: 15, location: "Western Region", status: "operational" },
  { type: "Registered Farmers", count: 2847, total: 3200, location: "Nationwide", status: "active" },
  { type: "Sugar Dealers", count: 156, total: 180, location: "Major Cities", status: "licensed" },
  { type: "Molasses Dealers", count: 23, total: 30, location: "Industrial Areas", status: "compliant" },
  { type: "Field Extension Officers", count: 84, total: 120, location: "Rural Areas", status: "active" },
  { type: "Agrovets", count: 178, total: 200, location: "Regional Centers", status: "licensed" },
  { type: "Sugar Importers", count: 45, total: 60, location: "Port Cities", status: "registered" },
  { type: "Sugar Exporters", count: 18, total: 25, location: "Export Hubs", status: "certified" },
]

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      stacked: true,
      grid: {
        color: '#f3f4f6',
      },
    },
    x: {
      stacked: true,
      grid: {
        color: '#f3f4f6',
      },
    },
  },
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const isMobile = useIsMobile()

  // Tab definitions
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "cases", label: "Case Management" },
    { id: "hearings", label: "Hearings" },
    { id: "judgments", label: "Judgments" },
    { id: "performance", label: "Performance" },
    { id: "strategic-plan", label: "Strategic Plan" },
    { id: "reports", label: "Reports" },
    { id: "statistics", label: "Case Statistics" },
    { id: "resource-center", label: "Resource Center" }
  ]

  // Reports data for the reports tab
  const reportsData = [
    {
      id: 1,
      title: "Case Management Performance Report",
      category: "Performance",
      date: "28/07/2025",
      size: "3.2 MB",
      status: "Draft",
      lastModified: "2 days ago"
    },
    {
      id: 2,
      title: "Monthly Judgments Summary - August 2025",
      category: "Judicial",
      date: "26/07/2025",
      size: "2.4 MB",
      status: "Published",
      lastModified: "4 days ago"
    },
    {
      id: 3,
      title: "Court Performance Statistics Q3 2025",
      category: "Statistical",
      date: "21/07/2025",
      size: "1.8 MB",
      status: "Published",
      lastModified: "1 week ago"
    }
  ]

  const categories = [
    { id: "all", label: "All Reports" },
    { id: "judicial", label: "Judicial" },
    { id: "performance", label: "Performance" },
    { id: "statistical", label: "Statistical" }
  ]

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Function to render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="rounded-[20px] shadow-lg border-0 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-[#6B6B6B]">Pending Cases</h3>
                    <FileText className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-[#202020] mb-1">42</div>
                  <p className="text-xs text-[#6B6B6B] mb-3">cases awaiting hearing</p>
                  <p className="text-xs text-green-600 mb-2">-8% from last month</p>
                  <Progress value={65} className="h-2 mb-2" />
                  <div className="text-xs text-[#6B6B6B]">Case clearance rate: 65%</div>
                </CardContent>
              </Card>
              <Card className="rounded-[20px] shadow-lg border-0 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-[#6B6B6B]">Upcoming Hearings</h3>
                    <Calendar className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-[#202020] mb-1">12</div>
                  <p className="text-xs text-[#6B6B6B] mb-3">hearings this week</p>
                  <p className="text-xs text-orange-600 mb-2">3 priority cases</p>
                  <Progress value={83} className="h-2 mb-2" />
                  <div className="text-xs text-[#6B6B6B]">Scheduling efficiency: 83%</div>
                </CardContent>
              </Card>
              <Card className="rounded-[20px] shadow-lg border-0 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-[#6B6B6B]">Case Resolution</h3>
                    <Award className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-[#202020] mb-1">87%</div>
                  <p className="text-xs text-[#6B6B6B] mb-3">judgment delivery rate</p>
                  <p className="text-xs text-green-600 mb-2">+5.2% from last quarter</p>
                  <Progress value={87} className="h-2 mb-2" />
                  <p className="text-xs text-[#6B6B6B]">Target: 90%</p>
                </CardContent>
              </Card>
              <Card className="rounded-[20px] shadow-lg border-0 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-[#6B6B6B]">Case Timeline</h3>
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div className="flex justify-center">
                    <GaugeMeter value={78} />
                  </div>
                  <p className="text-xs text-center text-[#6B6B6B] mt-1">Average resolution: 78 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Dashboard Metrics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ViewPlanCard />
              <div></div>
              <Card className="rounded-[20px] shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-[#202020]">Case Type Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#202020]">Civil Cases</span>
                      <span className="text-sm font-medium text-blue-600">48%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '48%'}}></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#202020]">Criminal Cases</span>
                      <span className="text-sm font-medium text-purple-600">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '35%'}}></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#202020]">Constitutional Cases</span>
                      <span className="text-sm font-medium text-green-600">17%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '17%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Case Resolution Time and Caseload Trends Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-[20px] shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-[#202020]">Case Resolution Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">Average time to resolve cases by type (days)</p>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={[
                      { name: "Civil", time: 82 },
                      { name: "Criminal", time: 94 },
                      { name: "Constitutional", time: 105 },
                      { name: "Family", time: 65 },
                      { name: "Land", time: 110 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="time" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="rounded-[20px] shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-[#202020]">Caseload Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">Monthly caseload vs resolved cases</p>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={[
                      { month: "Jan", filed: 42, resolved: 38 },
                      { month: "Feb", filed: 48, resolved: 40 },
                      { month: "Mar", filed: 53, resolved: 45 },
                      { month: "Apr", filed: 49, resolved: 50 },
                      { month: "May", filed: 52, resolved: 53 },
                      { month: "Jun", filed: 47, resolved: 49 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="filed" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Filed Cases" />
                      <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Resolved Cases" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Fourth Row - Resource Center */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ResourceCenterCard />
            </div>
          </>
        )

      case "cases":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-[#202020]">Case Status Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending Hearing</span>
                    <span className="font-semibold text-blue-600">42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">In Progress</span>
                    <span className="font-semibold text-amber-600">28</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Judgment Pending</span>
                    <span className="font-semibold text-purple-600">15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Resolved</span>
                    <span className="font-semibold text-green-600">67</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-[#202020]">Case Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Civil", value: 48 },
                        { name: "Criminal", value: 35 },
                        { name: "Constitutional", value: 17 }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#3b82f6" />
                      <Cell fill="#8b5cf6" />
                      <Cell fill="#10b981" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div> Civil</div>
                  <div className="flex items-center"><div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div> Criminal</div>
                  <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div> Constitutional</div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-[#202020]">Case Processing Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Average Resolution Time</span>
                      <span className="text-sm font-semibold">78 days</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Priority Cases</span>
                      <span className="text-sm font-semibold">42 days</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Target Resolution Time</span>
                      <span className="text-sm font-semibold">60 days</span>
                    </div>
                    <Progress value={100} className="h-2 bg-gray-200" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "hearings":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-[#202020]">Upcoming Hearings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-3 py-1">
                  <p className="font-semibold text-[#202020]">Civil Case #2458</p>
                  <p className="text-sm text-gray-500">Today, 10:30 AM</p>
                  <p className="text-xs text-blue-600 mt-1">Court Room 3A</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3 py-1">
                  <p className="font-semibold text-[#202020]">Criminal Case #1872</p>
                  <p className="text-sm text-gray-500">Today, 2:15 PM</p>
                  <p className="text-xs text-blue-600 mt-1">Court Room 5B</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-3 py-1">
                  <p className="font-semibold text-[#202020]">Civil Case #2461</p>
                  <p className="text-sm text-gray-500">Tomorrow, 9:00 AM</p>
                  <p className="text-xs text-blue-600 mt-1">Court Room 3A</p>
                </div>
                <Button className="w-full mt-2" variant="outline">View Full Schedule</Button>
              </CardContent>
            </Card>
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-[#202020]">Hearing Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Scheduled This Week</span>
                    <span className="font-semibold">28</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completed</span>
                    <span className="font-semibold">15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Rescheduled</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending</span>
                    <span className="font-semibold">10</span>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Completion Rate</span>
                      <span className="text-sm font-semibold">83%</span>
                    </div>
                    <Progress value={83} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-[#202020]">Average Hearing Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <GaugeMeter value={65} />
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-center text-sm text-gray-600">65 minutes per hearing</p>
                  <p className="text-xs text-gray-500">Target: 45-75 minutes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "judgments":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="rounded-[20px] shadow-lg border-0 bg-white lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-[#202020]">Recent Judgments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "J-2458",
                      title: "Smith vs. State of Kenya",
                      date: "September 15, 2025",
                      type: "Criminal",
                      status: "Delivered"
                    },
                    {
                      id: "J-2457",
                      title: "ABC Holdings vs. XYZ Corporation",
                      date: "September 12, 2025",
                      type: "Civil",
                      status: "Delivered"
                    },
                    {
                      id: "J-2456",
                      title: "Nairobi County vs. Resident Association",
                      date: "September 10, 2025",
                      type: "Constitutional",
                      status: "Pending"
                    },
                    {
                      id: "J-2455",
                      title: "Family Estate Matter",
                      date: "September 8, 2025",
                      type: "Family",
                      status: "Delivered"
                    }
                  ].map((judgment) => (
                    <div key={judgment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-[#202020]">{judgment.title}</h3>
                        <Badge className={judgment.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                          {judgment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mt-2">
                        <span className="mr-3">Case ID: {judgment.id}</span>
                        <span className="mr-3">•</span>
                        <span className="mr-3">{judgment.type}</span>
                        <span className="mr-3">•</span>
                        <span>{judgment.date}</span>
                      </div>
                      <div className="flex mt-3">
                        <Button variant="outline" size="sm" className="mr-2">
                          <FileText className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm">
                          <BookOpen className="h-4 w-4 mr-1" />
                          Read Judgment
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-[#202020]">Judgment Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Judgments by Type - This Month</p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Civil</span>
                        <span>8</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Criminal</span>
                        <span>6</span>
                      </div>
                      <Progress value={32} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Constitutional</span>
                        <span>3</span>
                      </div>
                      <Progress value={16} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Family</span>
                        <span>2</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-2">Judgment Delivery Performance</p>
                  <div className="flex justify-center">
                    <GaugeMeter value={87} />
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">87% on-time delivery</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "compliance":
        return (
          <div className="space-y-6">
            {/* First row - existing compliance cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="rounded-[20px] shadow-lg border-0 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-[#6B6B6B]">Compliance Radar</h3>
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div className="flex justify-center">
                    <GaugeMeter value={94} />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-[20px] shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-[#202020]">Compliance Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Fully Compliant Mills</span>
                      <span className="font-semibold text-green-600">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Partially Compliant</span>
                      <span className="font-semibold text-yellow-600">2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Non-Compliant</span>
                      <span className="font-semibold text-red-600">1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-[20px] shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-[#202020]">Audit Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">Upcoming Audits: 3</p>
                      <p className="text-gray-600">Next: Mumias Sugar (Sept 2)</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Completed: 8/15</p>
                      <Progress value={53} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Second row - Vessel Tracking */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <VesselTrackingCard />
            </div>
          </div>
        )

      case "strategic-plan":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ViewPlanCard />
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-[#202020]">Key Objectives Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Sugar Production Enhancement</span>
                    <span className="text-sm font-semibold">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Regulatory Framework</span>
                    <span className="text-sm font-semibold">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Market Development</span>
                    <span className="text-sm font-semibold">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Technology Integration</span>
                    <span className="text-sm font-semibold">52%</span>
                  </div>
                  <Progress value={52} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "reports":
        return (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      placeholder="Search reports..."
                      className="pl-10 w-full p-2 border rounded-md"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Categories Sidebar */}
              <Card className="rounded-[20px] shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-[#202020]">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          selectedCategory === category.id 
                            ? 'bg-green-100 text-green-700 font-medium' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <FileText className="h-4 w-4" />
                        {category.label}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reports List */}
              <div className="lg:col-span-3">
                <Card className="rounded-[20px] shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#202020]">Reports ({reportsData.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reportsData.map((report) => (
                        <div key={report.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 mb-1">{report.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Badge variant="outline" className="text-xs">
                                    {report.category}
                                  </Badge>
                                  <span>•</span>
                                  <span>{report.date}</span>
                                  <span>•</span>
                                  <span>{report.size}</span>
                                </div>
                              </div>
                            </div>
                            <Badge 
                              variant={report.status === "Published" ? "default" : "secondary"}
                              className={report.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                            >
                              {report.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Eye className="h-4 w-4 mr-2" />
                              View Report
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Custom Report Generator */}
                <Card className="rounded-[20px] shadow-lg border-0 bg-white mt-6">
                  <CardHeader>
                    <CardTitle className="text-[#202020]">Custom Report Generator</CardTitle>
                    <p className="text-gray-600">Create custom reports with specific metrics and date ranges</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline">Production Report</Button>
                      <Button variant="outline">Financial Summary</Button>
                      <Button variant="outline">Compliance Audit</Button>
                      <Button className="bg-green-600 hover:bg-green-700">Custom Builder</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      case "production":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProductionPulseCard productionData={mockProductionData} />
            <SucroseContentCard sucroseData={sucroseContentData} />
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-[#202020]">Production Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Monthly Production</span>
                      <span className="text-sm font-semibold">3,100 tons</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Capacity Utilization</span>
                      <span className="text-sm font-semibold">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Top Producer:</strong> Mumias Sugar</p>
                    <p><strong>Growth Rate:</strong> +12% YoY</p>
                    <p><strong>Target for Q4:</strong> 3,500 tons/month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-[#202020]">Sucrose Content Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Average Sucrose Content</span>
                      <span className="text-sm font-semibold">13.7%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Target Achievement</span>
                      <span className="text-sm font-semibold">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Highest:</strong> Muhoroni - 15.0%</p>
                    <p><strong>Lowest:</strong> Kwale - 13.5%</p>
                    <p><strong>Industry Standard:</strong> 14.0%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "resource-center":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResourceCenterCard />
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-[#202020]">Resource Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Documents</span>
                    <span className="font-semibold">248</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Recently Updated</span>
                    <span className="font-semibold">15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Most Downloaded</span>
                    <span className="font-semibold">Sugar Act 2023</span>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Storage Usage</span>
                      <span className="text-sm font-semibold">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <PortalLayout pageTitle="Dashboard">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Navigation Card - Tab Bar Only */}
        <Card className="rounded-[20px] shadow-lg border-0 bg-white">
          <CardContent className="p-4">
            {isMobile ? (
              // Mobile: Dropdown in Card
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full rounded-xl border-gray-200">
                  <SelectValue placeholder="Select a section">
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {tabs.map((tab) => (
                    <SelectItem key={tab.id} value={tab.id}>
                      {tab.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              // Desktop: Pill Navigation in Card
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dynamic Content Based on Active Tab */}
        <div className="space-y-6">
          {renderTabContent()}
        </div>

      </div>
    </PortalLayout>
  )
}
