"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PortalLayout } from "@/components/portal-layout"
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
import { TrendingUp, TrendingDown, Factory, Users, DollarSign, AlertTriangle, MapPin, Award, Filter } from "lucide-react"
import { ViewPlanModal } from "@/components/modals/view-plan-modal"
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
import { Line as ChartLine, Doughnut } from 'react-chartjs-2'
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
  { type: "Active Mills", count: 12, total: 15, location: "Western Region", status: "operational" },
  { type: "Registered Farmers", count: 2847, total: 3200, location: "Nationwide", status: "active" },
  { type: "Sugar Dealers", count: 156, total: 180, location: "Major Cities", status: "licensed" },
  { type: "Molasses Dealers", count: 23, total: 30, location: "Industrial Areas", status: "compliant" },
]

// Production Trends Chart Data
const productionTrendsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: '2023',
      data: [193000, 194500, 195000, 195500, 196000, 196500, 197000, 197500, 198000, 198500, 199000, 199500],
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245, 158, 11, 0.3)',
      fill: true,
      tension: 0.1,
      stack: 'stack0',
    },
    {
      label: '2024',
      data: [258000, 258500, 259000, 260000, 261000, 262000, 263000, 264000, 265000, 266000, 267000, 268000],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.3)',
      fill: true,
      tension: 0.1,
      stack: 'stack0',
    },
  ],
}

// Regional Distribution Chart Data
const regionalDistributionData = {
  labels: ['Western', 'Nyanza', 'Rift Valley', 'Coast'],
  datasets: [
    {
      data: [35, 26, 22, 17],
      backgroundColor: ['#065f46', '#16a34a', '#fde047', '#a16207'],
      borderWidth: 0,
    },
  ],
}

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

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return `${context.label}: ${context.parsed}%`
        }
      }
    },
  },
  cutout: '70%',
}

export default function DashboardPage() {
  const [viewPlanOpen, setViewPlanOpen] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState("Production")

  return (
    <PortalLayout pageTitle="Dashboard">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">Live Data</Badge>
          <Button variant="outline" size="sm">
            Export Data
          </Button>
          <Button variant="outline" size="sm" onClick={() => setViewPlanOpen(true)}>
            View Plan
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-[20px] shadow-lg border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-[#6B6B6B]">Production Pulse</h3>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-[#202020] mb-1">24,580</div>
            <p className="text-xs text-[#6B6B6B] mb-3">tonnes this month</p>
            <p className="text-xs text-green-600 mb-2">+12% from last month</p>
            <Progress value={78} className="h-2 mb-2" />
            <p className="text-xs text-[#6B6B6B]">78% of monthly target</p>
          </CardContent>
        </Card>

        <Card className="rounded-[20px] shadow-lg border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-[#6B6B6B]">Financial Health</h3>
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-[#202020] mb-1">KSh 2.4B</div>
            <p className="text-xs text-[#6B6B6B] mb-3">revenue this quarter</p>
            <p className="text-xs text-green-600 mb-2">+18% from last quarter</p>
            <Progress value={92} className="h-2 mb-2" />
            <div className="text-xs text-[#6B6B6B]">Levy Collection: 92%</div>
          </CardContent>
        </Card>

        <Card className="rounded-[20px] shadow-lg border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-[#6B6B6B]">Active Stakeholders</h3>
              <Users className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-[#202020] mb-1">3,038</div>
            <p className="text-xs text-[#6B6B6B] mb-3">total registered entities</p>
            <p className="text-xs text-green-600 mb-2">+5.2% new registrations</p>
            <Progress value={78} className="h-2 mb-2" />
            <p className="text-xs text-[#6B6B6B]">78% engagement rate</p>
          </CardContent>
        </Card>

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
      </div>

      {/* Dashboard Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Mills */}
        <Card className="rounded-[20px] shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-[#202020]">Top Performing Mills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#202020]">Mumias Sugar Mill</span>
                <span className="text-sm font-medium text-green-600">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#202020]">Nzoia Sugar Mill</span>
                <span className="text-sm font-medium text-green-600">80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '80%'}}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#202020]">West Kenya Sugar</span>
                <span className="text-sm font-medium text-green-600">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Overview */}
        <Card className="rounded-[20px] shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-[#202020]">Compliance Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#202020]">License Renewals</span>
              <span className="text-sm font-medium text-green-600">98% Complete</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#202020]">Quality Standards</span>
              <span className="text-sm font-medium text-orange-600">92% Compliant</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#202020]">Environmental Regulations</span>
              <span className="text-sm font-medium text-green-600">96% Compliant</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#202020]">Safety Standards</span>
              <span className="text-sm font-medium text-red-600">88% Compliant</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="rounded-[20px] shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-[#202020]">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#202020]">156</div>
                <p className="text-xs text-[#6B6B6B]">New Farmers This Month</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">23</div>
                <p className="text-xs text-[#6B6B6B]">Pending Licenses</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">7</div>
                <p className="text-xs text-[#6B6B6B]">Mills Under Review</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">KES 2.4M</div>
                <p className="text-xs text-[#6B6B6B]">Daily Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Production Trends & Regional Distribution Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Trends Card */}
        <Card className="rounded-[20px] shadow-lg border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-[#202020]">Production Trends</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Filter className="h-4 w-4 text-gray-600" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartLine data={productionTrendsData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Regional Distribution Card */}
        <Card className="rounded-[20px] shadow-lg border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-[#202020]">Regional Distribution</CardTitle>
            </div>
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue placeholder="All Metrics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Production">Production</SelectItem>
                <SelectItem value="Farmers">Farmers</SelectItem>
                <SelectItem value="Mills">Mills</SelectItem>
                <SelectItem value="Compliance">Compliance</SelectItem>
                <SelectItem value="Revenue">Revenue</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between h-80">
              <div className="w-64 h-64 mx-auto">
                <Doughnut data={regionalDistributionData} options={doughnutOptions} />
              </div>
              <div className="flex flex-col justify-center space-y-4 ml-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-green-800"></div>
                  <span className="text-sm text-[#202020]">Western</span>
                  <span className="text-sm font-medium text-[#202020]">35%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-sm text-[#202020]">Nyanza</span>
                  <span className="text-sm font-medium text-[#202020]">26%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-yellow-300"></div>
                  <span className="text-sm text-[#202020]">Rift Valley</span>
                  <span className="text-sm font-medium text-[#202020]">22%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-yellow-700"></div>
                  <span className="text-sm text-[#202020]">Coast</span>
                  <span className="text-sm font-medium text-[#202020]">17%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ViewPlanModal open={viewPlanOpen} onOpenChange={setViewPlanOpen} />
    </div>
    </PortalLayout>
  )
}
