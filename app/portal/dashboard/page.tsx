"use client"

import { useState, useEffect } from "react"
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
import ViewPlanCard from "./ViewPlanCard"
import SucroseContentCard from "./SucroseContentCard"
import ProductionPulseCard from "./ProductionPulseCard"
import { loadChartData, SucroseDataPoint, ProductionDataPoint } from "@/lib/csv-data-service"

// Custom Gauge Meter Component
const GaugeMeter = ({ value, size = 120 }: { value: number; size?: number }) => {
  const [animatedValue, setAnimatedValue] = useState(0)
  
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

export default function DashboardPage() {
  const [selectedMetric, setSelectedMetric] = useState("Production")
  const [sucroseData, setSucroseData] = useState<SucroseDataPoint[]>([])
  const [productionData, setProductionData] = useState<ProductionDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load CSV data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const { sucroseData, productionData } = await loadChartData()
        setSucroseData(sucroseData)
        setProductionData(productionData)
      } catch (error) {
        console.error('Error loading chart data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

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
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        {/* View Strategic Plan - moved to first position */}
        <ViewPlanCard />
        
        {/* Quick Stats - moved to second position */}
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

        {/* Top Performing Mills - remained in last position */}
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
      </div>

      {/* Production Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
        {/* Sucrose Content Card */}
        {isLoading ? (
          <Card className="rounded-[20px] shadow-lg border-0 bg-white h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading sucrose content data...</p>
            </div>
          </Card>
        ) : (
          <SucroseContentCard sucroseData={sucroseData} />
        )}

        {/* Production Pulse Card */}
        {isLoading ? (
          <Card className="rounded-[20px] shadow-lg border-0 bg-white h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading production data...</p>
            </div>
          </Card>
        ) : (
          <ProductionPulseCard productionData={productionData} />
        )}
      </div>

    </div>
    </PortalLayout>
  )
}
