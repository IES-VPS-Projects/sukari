"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  CheckCircle,
  AlertTriangle,
  Download
} from "lucide-react"
import { useState } from "react"

const kpiData = [
  {
    title: "Total Farms",
    value: "247",
    change: "+8.5%",
    trend: "up",
    color: "text-green-600",
  },
  {
    title: "Active Farmers",
    value: "189",
    change: "+12.3%",
    trend: "up",
    color: "text-blue-600",
  },
  {
    title: "Field Visits",
    value: "1,456",
    change: "+15.7%",
    trend: "up",
    color: "text-purple-600",
  },
  {
    title: "Avg Compliance",
    value: "84.7%",
    change: "+3.2%",
    trend: "up",
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
    default:
      return "text-gray-600 bg-gray-50"
  }
}

interface AnalyticsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AnalyticsModal({ open, onOpenChange }: AnalyticsModalProps) {
  const [timeRange, setTimeRange] = useState("1m")
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Analytics Dashboard
          </DialogTitle>
          <DialogDescription>
            Comprehensive insights and performance metrics
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-end mb-4">
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
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {kpiData.map((kpi, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">{kpi.title}</div>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center mt-1">
                {kpi.trend === "up" ? (
                  <TrendingUp className={`mr-1 h-3 w-3 text-green-500`} />
                ) : (
                  <TrendingDown className={`mr-1 h-3 w-3 text-red-500`} />
                )}
                <span className={`text-xs ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {kpi.change} from last month
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
            <TabsTrigger value="crops">Crops</TabsTrigger>
            <TabsTrigger value="visits">Visits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Performance Trends</h3>
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
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Impact Analysis</h3>
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
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Key Insights</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div className="flex-1">
                    <p className="font-medium">Milestone Achieved</p>
                    <p className="text-sm text-muted-foreground">Kisumu County reached 95% compliance rate</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-red-50 p-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div className="flex-1">
                    <p className="font-medium">Attention Required</p>
                    <p className="text-sm text-muted-foreground">Bungoma County compliance dropped by 5%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3">
                  <Activity className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="font-medium">Efficiency Improvement</p>
                    <p className="text-sm text-muted-foreground">Visit duration reduced by 15 minutes on average</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-orange-50 p-3">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  <div className="flex-1">
                    <p className="font-medium">Yield Prediction</p>
                    <p className="text-sm text-muted-foreground">Sugarcane yield expected to increase by 12% next quarter</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="regional" className="space-y-4">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Regional Performance</h3>
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
            </div>
          </TabsContent>
          
          <TabsContent value="crops" className="space-y-4">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Crop Performance Analysis</h3>
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
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Crop Health Distribution</h3>
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
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Yield Performance</h3>
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
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="visits" className="space-y-4">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Visit Performance Metrics</h3>
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
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Visit Completion Trends</h3>
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
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Visit Efficiency</h3>
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
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
