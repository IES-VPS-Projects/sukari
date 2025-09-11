"use client"

import { useState } from "react"
import {
  TrendingUp,
  TrendingDown,
  Users,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Target,
  Activity,
  Zap,
  Database,
  Wifi,
  Server,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("1m")

  const kpiData = [
    {
      title: "Total Farms",
      value: "247",
      change: "+8.5%",
      trend: "up",
      icon: MapPin,
      color: "text-green-600",
    },
    {
      title: "Active Farmers",
      value: "189",
      change: "+12.3%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Field Visits",
      value: "1,456",
      change: "+15.7%",
      trend: "up",
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      title: "Avg Compliance",
      value: "84.7%",
      change: "+3.2%",
      trend: "up",
      icon: Target,
      color: "text-orange-600",
    },
  ]

  const regionalData = [
    { region: "Kisumu County", farms: 67, compliance: 89, yield: 94, status: "excellent" },
    { region: "Kakamega County", farms: 89, compliance: 82, yield: 87, status: "good" },
    { region: "Bungoma County", farms: 45, compliance: 78, yield: 81, status: "fair" },
    { region: "Siaya County", farms: 46, compliance: 91, yield: 96, status: "excellent" },
  ]

  const cropData = [
    { crop: "Sugarcane", farms: 189, health: 92, yield: 88, trend: "up" },
    { crop: "Maize", farms: 67, health: 85, yield: 91, trend: "up" },
    { crop: "Vegetables", farms: 54, health: 79, yield: 76, trend: "down" },
    { crop: "Tea", farms: 37, health: 88, yield: 84, trend: "up" },
  ]

  const visitMetrics = [
    { metric: "Completion Rate", value: 94, target: 95, status: "warning" },
    { metric: "Avg Duration", value: 87, target: 90, status: "good" },
    { metric: "Quality Score", value: 91, target: 85, status: "excellent" },
    { metric: "On-Time Rate", value: 88, target: 90, status: "warning" },
  ]

  const insights = [
    {
      type: "critical",
      title: "Compliance Alert",
      message: "3 farms in Bungoma County require immediate attention",
      action: "Review Details",
      icon: AlertTriangle,
    },
    {
      type: "warning",
      title: "Yield Prediction",
      message: "Sugarcane yield expected to drop 12% this quarter",
      action: "View Analysis",
      icon: TrendingDown,
    },
    {
      type: "success",
      title: "Milestone Achieved",
      message: "Kisumu County reached 95% compliance rate",
      action: "View Report",
      icon: CheckCircle,
    },
    {
      type: "info",
      title: "Efficiency Improvement",
      message: "Visit duration reduced by 15 minutes on average",
      action: "See Details",
      icon: Zap,
    },
  ]

  const systemHealth = [
    { component: "API Performance", status: "healthy", value: 99.8, icon: Server },
    { component: "Database", status: "healthy", value: 99.9, icon: Database },
    { component: "Data Sync", status: "warning", value: 97.2, icon: Activity },
    { component: "Network", status: "healthy", value: 99.5, icon: Wifi },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-50"
      case "good":
        return "text-blue-600 bg-blue-50"
      case "fair":
        return "text-yellow-600 bg-yellow-50"
      case "warning":
        return "text-orange-600 bg-orange-50"
      case "critical":
        return "text-red-600 bg-red-50"
      case "healthy":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-orange-200 bg-orange-50"
      case "success":
        return "border-green-200 bg-green-50"
      case "info":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-gray-500">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export Data</Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  {kpi.change} from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Insights and Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Smart Insights & Alerts
            </CardTitle>
            <CardDescription>AI-powered insights and actionable recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {insights.map((insight, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}>
                  <div className="flex items-start gap-3">
                    <insight.icon className="h-5 w-5 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{insight.message}</p>
                      <Button variant="link" className="p-0 h-auto mt-2 text-sm">
                        {insight.action} →
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
            <TabsTrigger value="crops">Crops</TabsTrigger>
            <TabsTrigger value="visits">Visits</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Monthly performance across key metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Farm Compliance</span>
                        <span>84.7%</span>
                      </div>
                      <Progress value={84.7} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Visit Completion</span>
                        <span>94.2%</span>
                      </div>
                      <Progress value={94.2} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Farmer Satisfaction</span>
                        <span>91.8%</span>
                      </div>
                      <Progress value={91.8} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>System Uptime</span>
                        <span>99.6%</span>
                      </div>
                      <Progress value={99.6} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Impact Analysis</CardTitle>
                  <CardDescription>Measuring the impact of field operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">+23%</div>
                      <p className="text-sm text-muted-foreground">Yield Improvement</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">-18%</div>
                      <p className="text-sm text-muted-foreground">Compliance Issues</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">+31%</div>
                      <p className="text-sm text-muted-foreground">Farmer Engagement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Real-time system performance monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {systemHealth.map((system, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <system.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{system.component}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(system.status)}>{system.status}</Badge>
                        <span className="text-sm text-muted-foreground">{system.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Performance</CardTitle>
                <CardDescription>Performance comparison across different regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionalData.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{region.region}</h4>
                        <p className="text-sm text-muted-foreground">{region.farms} farms</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm font-medium">{region.compliance}%</div>
                          <div className="text-xs text-muted-foreground">Compliance</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{region.yield}%</div>
                          <div className="text-xs text-muted-foreground">Yield</div>
                        </div>
                        <Badge className={getStatusColor(region.status)}>{region.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crops" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Crop Performance Analysis</CardTitle>
                <CardDescription>Health and yield metrics by crop type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cropData.map((crop, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{crop.crop}</h4>
                        <p className="text-sm text-muted-foreground">{crop.farms} farms</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm font-medium">{crop.health}%</div>
                          <div className="text-xs text-muted-foreground">Health</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{crop.yield}%</div>
                          <div className="text-xs text-muted-foreground">Yield</div>
                        </div>
                        <div className="flex items-center gap-1">
                          {crop.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Crop Health Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cropData.map((crop, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{crop.crop}</span>
                          <span>{crop.health}%</span>
                        </div>
                        <Progress value={crop.health} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Yield Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cropData.map((crop, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{crop.crop}</span>
                          <span>{crop.yield}%</span>
                        </div>
                        <Progress value={crop.yield} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="visits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visit Performance Metrics</CardTitle>
                <CardDescription>Efficiency and quality metrics for field visits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {visitMetrics.map((metric, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{metric.metric}</span>
                        <Badge className={getStatusColor(metric.status)}>{metric.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current: {metric.value}%</span>
                          <span>Target: {metric.target}%</span>
                        </div>
                        <Progress value={metric.value} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Visit Completion Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">94.2%</div>
                      <p className="text-sm text-muted-foreground">Overall Completion Rate</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>This Month</span>
                        <span>94.2%</span>
                      </div>
                      <Progress value={94.2} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Last Month</span>
                        <span>91.8%</span>
                      </div>
                      <Progress value={91.8} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Visit Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">2.3h</div>
                      <p className="text-sm text-muted-foreground">Average Visit Duration</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold">87%</div>
                        <p className="text-xs text-muted-foreground">On-Time Visits</p>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">4.6</div>
                        <p className="text-xs text-muted-foreground">Avg Quality Score</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
