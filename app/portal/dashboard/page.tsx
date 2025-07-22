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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Production</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18,247 MT</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500" /> +12.5% from last quarter
            </p>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">85% of annual target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 287M</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500" /> +18.3% from last quarter
            </p>
            <Progress value={92} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">92% of annual target</p>
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 text-red-500" /> -3% from last month
            </p>
            <Progress value={87} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">3 mills need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Production vs Target</CardTitle>
            <CardDescription>Monthly production performance (MT)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                <Bar dataKey="production" fill="#10b981" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue in millions (KSh)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Compliance and Stakeholder Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Overview</CardTitle>
            <CardDescription>Current compliance status across all mills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={complianceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Compliant (87%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Non-Compliant (13%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stakeholder Distribution</CardTitle>
            <CardDescription>Active stakeholders across the sector</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stakeholders.map((stakeholder) => (
                <div key={stakeholder.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{stakeholder.type}</p>
                      <p className="text-xs text-gray-600">{stakeholder.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{stakeholder.count.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">of {stakeholder.total.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Performance Achievements
          </CardTitle>
          <CardDescription>Key milestones and achievements this quarter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h3 className="font-medium">Production Excellence</h3>
              </div>
              <p className="text-sm text-gray-600">Exceeded quarterly production target by 12.5%</p>
              <Badge className="mt-2 bg-green-100 text-green-800">Achieved</Badge>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium">Revenue Growth</h3>
              </div>
              <p className="text-sm text-gray-600">18.3% increase in revenue generation</p>
              <Badge className="mt-2 bg-blue-100 text-blue-800">Outstanding</Badge>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-yellow-600" />
                <h3 className="font-medium">Stakeholder Engagement</h3>
              </div>
              <p className="text-sm text-gray-600">5.2% increase in active stakeholder participation</p>
              <Badge className="mt-2 bg-yellow-100 text-yellow-800">Good</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <ViewPlanModal open={viewPlanOpen} onOpenChange={setViewPlanOpen} />
    </div>
  )
}
