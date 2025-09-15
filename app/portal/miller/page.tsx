"use client"

import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PortalLayout } from "@/components/portal-layout"
import { MillerApplicationsModal } from "@/components/modals/miller-applications-modal"
import { MillerProfileModal } from "@/components/modals/miller-profile-modal"
import { MillerSettingsModal } from "@/components/modals/miller-settings-modal"
import { MillerReturnsModal } from "@/components/modals/miller-returns-modal"
import { AnalyticsModal } from "@/components/modals/analytics-modal"
import { AlertsModal } from "@/components/modals/alerts-modal"
import { 
  Factory, 
  Settings, 
  TrendingUp, 
  BarChart3, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Thermometer,
  Droplets,
  Eye,
  Clock,
  Target
} from "lucide-react"

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function MillerProfilePage() {
  const [profileData] = useState({
    firstName: "James",
    lastName: "Mwangi",
    email: "james.mwangi@mumiasmills.co.ke",
    phone: "+254 700 333 456",
    location: "Mumias, Kenya",
    company: "Mumias Sugar Mills Ltd",
    role: "Sugar Miller",
    licenseNumber: "SML-2024-003",
    organization: "Licensed Sugar Miller",
    bio: "Experienced sugar miller with over 15 years in sugar production and processing. Specialized in industrial sugar processing, quality control, and regulatory compliance in the Kenyan sugar industry.",
    licenseDate: "January 2019",
    productionCapacity: "2500 MT/day",
    complianceLevel: "Fully Compliant"
  })

  // Modal states
  const [applicationsModalOpen, setApplicationsModalOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [returnsModalOpen, setReturnsModalOpen] = useState(false)
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false)
  const [alertsModalOpen, setAlertsModalOpen] = useState(false)

  // Weekly production data
  const weeklyProduction = [
    { day: 'Mon', production: 85 },
    { day: 'Tue', production: 92 },
    { day: 'Wed', production: 78 },
    { day: 'Thu', production: 88 },
    { day: 'Fri', production: 95 },
    { day: 'Sat', production: 82 },
    { day: 'Sun', production: 75 }
  ]

  const maxProduction = Math.max(...weeklyProduction.map(d => d.production))

  // Equipment status data
  const equipmentStatus = [
    { id: 'MILL-001-351', status: 'active', efficiency: 92, location: 'Zone A' },
    { id: 'MILL-002-247', status: 'maintenance', efficiency: 0, location: 'Zone B' },
    { id: 'MILL-003-189', status: 'active', efficiency: 88, location: 'Zone C' },
  ]

  // Sugar quality zones
  const qualityZones = [
    { zone: 'Zone A', healthy: 75, moderate: 20, poor: 5 },
    { zone: 'Zone B', healthy: 60, moderate: 30, poor: 10 },
    { zone: 'Zone C', healthy: 85, moderate: 12, poor: 3 },
    { zone: 'Zone D', healthy: 70, moderate: 25, poor: 5 },
    { zone: 'Zone E', healthy: 80, moderate: 15, poor: 5 },
    { zone: 'Zone F', healthy: 65, moderate: 25, poor: 10 },
  ]

  // Today's missions
  const todaysMissions = [
    { title: 'Quality Assessment', status: 'completed', description: 'Sugar quality inspection' },
    { title: 'Production Analysis', status: 'active', description: 'Daily output monitoring' },
    { title: 'Equipment Maintenance', status: 'completed', description: 'Routine maintenance check' }
  ]

  const completedMissions = todaysMissions.filter(m => m.status === 'completed').length

  // ApexCharts configuration for Sugar Yield Prediction
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  const chartOptions = {
    series: [{
      name: 'Predicted Yield',
      data: [65, 72, 68, 75, 71, 78, 82, 77, 85, 83, 88, 90]
    }, {
      name: 'Actual Yield',
      data: [62, 69, 70, 73, 73, 76, 79, 82, 81, 87, 85, 92]
    }],
    chart: {
      height: 280,
      type: 'area' as const,
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth' as const,
      width: 3
    },
    colors: ['#ec4899', '#14b8a6'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    xaxis: {
      type: 'datetime' as const,
      categories: [
        "2024-01-01T00:00:00.000Z",
        "2024-02-01T00:00:00.000Z",
        "2024-03-01T00:00:00.000Z",
        "2024-04-01T00:00:00.000Z",
        "2024-05-01T00:00:00.000Z",
        "2024-06-01T00:00:00.000Z",
        "2024-07-01T00:00:00.000Z",
        "2024-08-01T00:00:00.000Z",
        "2024-09-01T00:00:00.000Z",
        "2024-10-01T00:00:00.000Z",
        "2024-11-01T00:00:00.000Z",
        "2024-12-01T00:00:00.000Z"
      ],
      labels: {
        style: {
          colors: '#666',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#666',
          fontSize: '12px'
        },
        formatter: (value: number) => `${value} MT/ha`
      }
    },
    tooltip: {
      x: {
        format: 'MMM yyyy'
      },
      y: {
        formatter: (value: number) => `${value} MT/ha`
      }
    },
    legend: {
      show: true,
      position: 'top' as const,
      horizontalAlign: 'center' as const,
      markers: {
        size: 6,
        strokeWidth: 0,
        fillColors: ['#ec4899', '#14b8a6']
      }
    },
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 3
    }
  }

  return (
    <PortalLayout pageTitle="Miller Command Dashboard">
      {/* Modals */}
      <MillerApplicationsModal 
        open={applicationsModalOpen} 
        onOpenChange={setApplicationsModalOpen}
      />
      <MillerReturnsModal 
        open={returnsModalOpen} 
        onOpenChange={setReturnsModalOpen}
      />
      <MillerProfileModal 
        open={profileModalOpen} 
        onOpenChange={setProfileModalOpen}
        profileData={profileData}
      />
      <MillerSettingsModal 
        open={settingsModalOpen} 
        onOpenChange={setSettingsModalOpen}
      />
      <AnalyticsModal open={analyticsModalOpen} onOpenChange={setAnalyticsModalOpen} />
      <AlertsModal open={alertsModalOpen} onOpenChange={setAlertsModalOpen} />
      
      {/* Main Dashboard Layout */}
      <div className="min-h-screen" style={{ backgroundColor: '#fbf9f1' }}>
        <div className="container mx-auto px-4 py-6">
          {/* 3-Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-stretch">
            
            {/* LEFT COLUMN - Hero Section & Charts */}
            <div className="lg:col-span-5 space-y-6 flex flex-col min-h-full">
              {/* Hero Section */}
              <Card className="relative overflow-hidden shadow-lg border-0" style={{ backgroundColor: '#334b35' }}>
                {/* Background Image */}
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "url('/images/sugar_mill.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                <CardContent className="relative p-6 text-white z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h1 className="text-2xl font-bold mb-1 text-white drop-shadow-lg">Welcome,</h1>
                      <h2 className="text-xl font-semibold text-white drop-shadow-lg">{profileData.firstName}</h2>
                    </div>
                  </div>

                  {/* Left half container for glass morphism cards */}
                  <div className="w-1/2 space-y-4">
                    {/* Active Mills Counter */}
                    <Card className="bg-black/30 backdrop-blur-md border-white/30 shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-3xl font-bold text-white drop-shadow-lg">3</div>
                            <div className="text-sm text-white/95 drop-shadow">Active Mills</div>
                            <div className="flex gap-4 text-xs mt-1 text-white/90 drop-shadow">
                              <span>✓ 2 Operating</span>
                              <span>⚠ 1 Maintenance</span>
                            </div>
                          </div>
                          <Factory className="h-8 w-8 text-white/80 drop-shadow-lg" />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Daily Production */}
                    <Card className="bg-black/30 backdrop-blur-md border-white/30 shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-3xl font-bold text-white drop-shadow-lg">847.2</div>
                            <div className="text-sm text-white/95 drop-shadow">Production Hours Today</div>
                            <div className="flex gap-4 text-xs mt-1 text-white/90 drop-shadow">
                              <span>⚡ 2,500 MT</span>
                              <span>🌡 24°C</span>
                              <span>💧 65%</span>
                            </div>
                          </div>
                          <TrendingUp className="h-8 w-8 text-white/80 drop-shadow-lg" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Production Chart */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold" style={{ color: '#334b35' }}>
                    Weekly Production Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="relative">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 h-48 flex flex-col justify-between py-2 text-xs text-gray-500">
                      <span>{maxProduction}</span>
                      <span>{Math.round(maxProduction * 0.75)}</span>
                      <span>{Math.round(maxProduction * 0.5)}</span>
                      <span>{Math.round(maxProduction * 0.25)}</span>
                      <span>0</span>
                    </div>
                    
                    {/* Chart area with grid lines */}
                    <div className="ml-8 relative">
                      {/* Horizontal grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-between py-2">
                        {[0, 1, 2, 3, 4].map((index) => (
                          <div key={index} className="w-full h-px bg-gray-200"></div>
                        ))}
                      </div>
                      
                      {/* Bars */}
                      <div className="flex items-end justify-between h-48 gap-2 relative z-10">
                        {weeklyProduction.map((data, index) => (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div 
                              className="w-full rounded-t transition-all duration-300 hover:opacity-80 min-h-4"
                              style={{
                                height: `${(data.production / maxProduction) * 160}px`,
                                backgroundColor: index % 2 === 0 ? '#f7c35f' : '#d1d5db'
                              }}
                            />
                            <div className="text-xs mt-2 font-medium text-gray-600">
                              {data.day}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* X-axis label */}
                    <div className="ml-8 mt-4 text-center text-xs text-gray-500">
                      Days of the Week
                    </div>
                    
                    {/* Y-axis label */}
                    <div className="absolute left-0 top-1/2 transform -rotate-90 -translate-y-1/2 -translate-x-4 text-xs text-gray-500">
                      Production Hours
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sugar Yield Prediction Chart */}
              <Card className="shadow-lg flex-grow">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold" style={{ color: '#334b35' }}>
                      Sugar Yield Prediction vs Actual
                    </CardTitle>
                    <Badge 
                      variant="outline" 
                      className="bg-teal-500/10 text-teal-700 border-teal-300 px-3 py-1 text-sm font-medium"
                    >
                      Avg. Accuracy: 94.2%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {isClient && (
                    <div className="relative">
                      <Chart
                        options={chartOptions}
                        series={chartOptions.series}
                        type="area"
                        height={280}
                      />
                    </div>
                  )}
                  {!isClient && (
                    <div className="h-72 bg-gradient-to-r from-teal-50 to-green-50 rounded-lg flex items-center justify-center">
                      <div className="text-gray-500">Loading chart...</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* CENTER COLUMN - Operational Status */}
            <div className="lg:col-span-4 space-y-6 flex flex-col min-h-full">
              {/* Spacer to align with right column Date/Time header */}
              <div className="text-right text-sm text-gray-600" style={{ visibility: 'hidden' }}>
                <div className="font-semibold">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="text-lg font-bold" style={{ color: '#334b35' }}>
                  {new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
              </div>

              {/* Real-time Equipment Status */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold" style={{ color: '#334b35' }}>
                    Realtime Equipment Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="relative">
                    {/* Equipment Status Map */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {equipmentStatus.map((equipment, index) => (
                        <div key={index} className="text-center">
                          <div 
                            className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                              equipment.status === 'active' ? 'bg-green-100' : 
                              equipment.status === 'maintenance' ? 'bg-orange-100' : 'bg-gray-100'
                            }`}
                          >
                            <Factory 
                              className={`h-6 w-6 ${
                                equipment.status === 'active' ? 'text-green-600' : 
                                equipment.status === 'maintenance' ? 'text-orange-600' : 'text-gray-600'
                              }`} 
                            />
                          </div>
                          <div className="text-xs font-medium">{equipment.location}</div>
                        </div>
                      ))}
                    </div>

                    {/* Active Equipment Detail */}
                    <Card className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                            <Factory className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">MILL-001-351.2</div>
                            <div className="text-xs text-gray-500">5 min ago</div>
                            <div className="text-xs text-gray-500">92%</div>
                            <div className="text-xs text-gray-500">Zone A</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Sugar Quality Overview */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold" style={{ color: '#334b35' }}>
                    Sugar Quality Overview
                  </CardTitle>
                  <div className="text-sm text-gray-600">
                    Quality distribution across processing zones (percentage)
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {qualityZones.map((zone, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-12 text-xs font-medium">{zone.zone}</div>
                        <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
                          <div className="h-full flex">
                            <div 
                              className="bg-green-400" 
                              style={{ width: `${zone.healthy}%` }}
                            />
                            <div 
                              className="bg-yellow-400" 
                              style={{ width: `${zone.moderate}%` }}
                            />
                            <div 
                              className="bg-red-400" 
                              style={{ width: `${zone.poor}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-6 mt-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-400 rounded"></div>
                      <span>High Quality</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                      <span>Moderate Quality</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-400 rounded"></div>
                      <span>Poor Quality</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fleet Status */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold" style={{ color: '#334b35' }}>
                    Equipment Fleet Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="relative">
                    <div className="flex justify-center mb-3">
                      <div 
                        className="w-24 h-24 rounded-full flex items-center justify-center text-center"
                        style={{ 
                          background: `conic-gradient(#22c55e 0deg ${75 * 3.6}deg, #f59e0b ${75 * 3.6}deg ${90 * 3.6}deg, #ef4444 ${90 * 3.6}deg 360deg)` 
                        }}
                      >
                        <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs font-bold">3/4</div>
                            <div className="text-xs">Mills</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-around text-center text-xs">
                      <div>
                        <div className="w-2 h-2 bg-green-500 rounded mx-auto mb-1"></div>
                        <div className="text-xs">2 active</div>
                      </div>
                      <div>
                        <div className="w-2 h-2 bg-yellow-500 rounded mx-auto mb-1"></div>
                        <div className="text-xs">1 maintenance</div>
                      </div>
                      <div>
                        <div className="w-2 h-2 bg-red-500 rounded mx-auto mb-1"></div>
                        <div className="text-xs">0 offline</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT COLUMN - KPIs & Mission Control */}
            <div className="lg:col-span-3 space-y-6 flex flex-col min-h-full">
              {/* Date and Time Header */}
              <div className="text-right text-sm text-gray-600">
                <div className="font-semibold">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="text-lg font-bold" style={{ color: '#334b35' }}>
                  {new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Sugar Production Efficiency */}
                <Card className="shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="h-5 w-5" style={{ color: '#f7c35f' }} />
                    </div>
                    <div className="text-2xl font-bold" style={{ color: '#334b35' }}>89%</div>
                    <div className="text-sm text-gray-600 mb-1">sugar efficiency</div>
                    <div className="text-xs text-gray-500">vs target production</div>
                  </CardContent>
                </Card>

                {/* Production Rate */}
                <Card className="shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Factory className="h-5 w-5" style={{ color: '#f7c35f' }} />
                    </div>
                    <div className="text-2xl font-bold" style={{ color: '#334b35' }}>96.3%</div>
                    <div className="text-sm text-gray-600 mb-1">production rate</div>
                    <div className="text-xs text-gray-500">Mill efficiency rate</div>
                  </CardContent>
                </Card>

                {/* Tons Processed */}
                <Card className="shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <BarChart3 className="h-5 w-5" style={{ color: '#f7c35f' }} />
                    </div>
                    <div className="text-2xl font-bold" style={{ color: '#334b35' }}>2,847</div>
                    <div className="text-sm text-gray-600 mb-1">MT processed</div>
                    <div className="text-xs text-gray-500">Processed today</div>
                  </CardContent>
                </Card>

                {/* Quality Issues */}
                <Card className="shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <AlertTriangle className="h-5 w-5" style={{ color: '#f7c35f' }} />
                    </div>
                    <div className="text-2xl font-bold" style={{ color: '#334b35' }}>12</div>
                    <div className="text-sm text-gray-600 mb-1">Quality Issues</div>
                    <div className="text-xs text-gray-500">Detected & flagged</div>
                  </CardContent>
                </Card>
              </div>

              {/* Environmental Conditions */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold" style={{ color: '#334b35' }}>
                    Environmental Conditions
                  </CardTitle>
                  <div className="text-sm text-gray-600">Processing conditions - This week</div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="relative">
                    <div className="flex justify-center mb-4">
                      <div className="w-24 h-24 rounded-full border-8 border-gray-200 relative">
                        <div 
                          className="absolute inset-2 rounded-full"
                          style={{ 
                            background: `conic-gradient(#22c55e 0deg 120deg, #f59e0b 120deg 240deg, #ef4444 240deg 360deg)` 
                          }}
                        />
                        <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                          <Thermometer className="h-4 w-4" style={{ color: '#334b35' }} />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <div className="w-2 h-2 bg-green-500 rounded"></div>
                          <span>Optimal</span>
                        </div>
                        <div className="text-gray-600">20-25°C</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded"></div>
                          <span>Caution</span>
                        </div>
                        <div className="text-gray-600">25-30°C</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <div className="w-2 h-2 bg-red-500 rounded"></div>
                          <span>Alert</span>
                        </div>
                        <div className="text-gray-600">30+°C</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mission Control Panel */}
              <Card className="shadow-lg flex-grow" style={{ backgroundColor: '#334b35' }}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">
                    Today's Operations
                  </CardTitle>
                  <div className="text-white/80 text-sm">
                    {completedMissions}/{todaysMissions.length} Operations completed
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {todaysMissions.map((mission, index) => (
                    <Card key={index} className="bg-white/10 border-white/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              mission.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}>
                              {mission.status === 'completed' ? (
                                <CheckCircle className="h-4 w-4 text-white" />
                              ) : (
                                <Activity className="h-4 w-4 text-white" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-white text-sm">{mission.title}</div>
                              <div className="text-white/70 text-xs">{mission.description}</div>
                            </div>
                          </div>
                          <Badge 
                            variant={mission.status === 'completed' ? 'secondary' : 'default'}
                            className={mission.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                            style={{ backgroundColor: mission.status === 'active' ? '#f7c35f' : undefined }}
                          >
                            {mission.status.toUpperCase()}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-white/30 text-white hover:bg-white/10"
                      onClick={() => setAnalyticsModalOpen(true)}
                    >
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Log Stats
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      style={{ backgroundColor: '#f7c35f' }}
                      onClick={() => setApplicationsModalOpen(true)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Go to Operations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  )
}