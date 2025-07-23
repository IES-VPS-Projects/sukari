"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { TrendingUp, TrendingDown, Factory, Users, DollarSign, AlertTriangle, MapPin, Award } from "lucide-react"
import { ViewPlanModal } from "@/components/modals/view-plan-modal"

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
  const [viewPlanOpen, setViewPlanOpen] = useState(false)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="text-gray-600">Comprehensive overview of sugar sector performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">Live Data</Badge>
          <Button variant="outline" size="sm">
            Export Dashboard
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
            <div className="text-xs text-[#6B6B6B] mb-1">Levy Collection: 92%</div>
            <Progress value={92} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Stakeholders</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,038</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500" /> +5.2% new registrations
            </p>
            <Progress value={78} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">78% engagement rate</p>
          </CardContent>
        </Card>

        <Card className="rounded-[20px] shadow-lg border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-[#6B6B6B]">Compliance Radar</h3>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-[#202020] mb-1">94%</div>
            <p className="text-xs text-[#6B6B6B] mb-3">overall compliance rate</p>
            <p className="text-xs text-yellow-600 mb-2">3 pending violations</p>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#6B6B6B]">Active Licenses</span>
              <span className="font-medium">247</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#6B6B6B]">Renewals Due</span>
              <span className="font-medium">12</span>
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

      <ViewPlanModal open={viewPlanOpen} onOpenChange={setViewPlanOpen} />
    </div>
  )
}
