"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Factory, Gauge, Calendar, Target, Award, AlertCircle } from "lucide-react"

interface MillerProductionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MillerProductionModal({ open, onOpenChange }: MillerProductionModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'daily' | 'monthly' | 'targets'>('overview')

  // Production data based on mockdata
  const currentProduction = {
    dailyOutput: 2100,
    targetDaily: 2500,
    efficiency: 94,
    qualityGrade: "A+",
    capacityUsed: 84,
    operatingHours: 22,
    downtimeHours: 2,
    wastagePercentage: 2.1
  }

  const monthlyData = [
    { month: "Jan", production: 65400, target: 77500, efficiency: 84 },
    { month: "Feb", production: 68200, target: 77500, efficiency: 88 },
    { month: "Mar", production: 72100, target: 77500, efficiency: 93 },
    { month: "Apr", production: 69800, target: 77500, efficiency: 90 },
    { month: "May", production: 74500, target: 77500, efficiency: 96 },
    { month: "Jun", production: 71200, target: 77500, efficiency: 92 },
    { month: "Jul", production: 68900, target: 77500, efficiency: 89 },
    { month: "Aug", production: 73600, target: 77500, efficiency: 95 },
    { month: "Sep", production: 63000, target: 77500, efficiency: 81 }
  ]

  const qualityMetrics = [
    { parameter: "Sucrose Content", value: "99.7%", status: "excellent", target: "≥99.5%" },
    { parameter: "Moisture Content", value: "0.03%", status: "good", target: "≤0.04%" },
    { parameter: "Color Rating", value: "45 ICUMSA", status: "excellent", target: "≤50 ICUMSA" },
    { parameter: "Ash Content", value: "0.02%", status: "excellent", target: "≤0.04%" },
    { parameter: "Polarization", value: "99.8°Z", status: "excellent", target: "≥99.5°Z" }
  ]

  const equipmentStatus = [
    { name: "Mill Stand 1", status: "operational", efficiency: 96, lastMaintenance: "2024-09-10" },
    { name: "Mill Stand 2", status: "operational", efficiency: 94, lastMaintenance: "2024-09-08" },
    { name: "Mill Stand 3", status: "maintenance", efficiency: 0, lastMaintenance: "2024-09-15" },
    { name: "Boiler 1", status: "operational", efficiency: 92, lastMaintenance: "2024-09-12" },
    { name: "Boiler 2", status: "operational", efficiency: 88, lastMaintenance: "2024-09-05" },
    { name: "Centrifugal 1", status: "operational", efficiency: 97, lastMaintenance: "2024-09-14" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800'
      case 'good':
        return 'bg-blue-100 text-blue-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'critical':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEquipmentStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800'
      case 'offline':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Production</DialogTitle>
          <DialogDescription>
            Comprehensive production metrics and operational insights for Mumias Sugar Mills
          </DialogDescription>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex space-x-1 border-b border-gray-200 mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'daily', label: 'Daily Metrics', icon: Gauge },
            { id: 'monthly', label: 'Monthly Trends', icon: TrendingUp },
            { id: 'targets', label: 'Targets & Quality', icon: Target }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="h-[60vh] overflow-y-auto">
            <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Daily Output</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentProduction.dailyOutput.toLocaleString()} MT</div>
                  <p className="text-xs text-muted-foreground">
                    Target: {currentProduction.targetDaily.toLocaleString()} MT
                  </p>
                  <Progress 
                    value={(currentProduction.dailyOutput / currentProduction.targetDaily) * 100} 
                    className="mt-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Efficiency Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentProduction.efficiency}%</div>
                  <p className="text-xs text-muted-foreground">
                    Operational efficiency
                  </p>
                  <Progress value={currentProduction.efficiency} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Quality Grade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentProduction.qualityGrade}</div>
                  <Badge className="bg-green-100 text-green-800 mt-2">Premium Quality</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Capacity Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentProduction.capacityUsed}%</div>
                  <p className="text-xs text-muted-foreground">
                    Of total capacity
                  </p>
                  <Progress value={currentProduction.capacityUsed} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Factory className="h-5 w-5" />
                    Equipment Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {equipmentStatus.slice(0, 4).map((equipment) => (
                      <div key={equipment.name} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{equipment.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Efficiency: {equipment.efficiency}%
                          </p>
                        </div>
                        <Badge className={getEquipmentStatusColor(equipment.status)}>
                          {equipment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Today's Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Operating Hours</span>
                      <span className="font-semibold">{currentProduction.operatingHours}/24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Downtime Hours</span>
                      <span className="font-semibold">{currentProduction.downtimeHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Wastage Rate</span>
                      <span className="font-semibold">{currentProduction.wastagePercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Quality Grade</span>
                      <Badge className="bg-green-100 text-green-800">{currentProduction.qualityGrade}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            </div>
          </div>
        )}

        {/* Daily Metrics Tab */}
        {activeTab === 'daily' && (
          <div className="h-[60vh] overflow-y-auto">
            <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Production Metrics</CardTitle>
                <CardDescription>Real-time operational data for {new Date().toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Production Output</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Current Output</span>
                        <span className="font-semibold">{currentProduction.dailyOutput.toLocaleString()} MT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Target Output</span>
                        <span className="font-semibold">{currentProduction.targetDaily.toLocaleString()} MT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Achievement Rate</span>
                        <span className="font-semibold">
                          {((currentProduction.dailyOutput / currentProduction.targetDaily) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Operational Efficiency</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Overall Efficiency</span>
                        <span className="font-semibold">{currentProduction.efficiency}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Capacity Utilization</span>
                        <span className="font-semibold">{currentProduction.capacityUsed}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Uptime</span>
                        <span className="font-semibold">
                          {((currentProduction.operatingHours / 24) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Equipment Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {equipmentStatus.map((equipment) => (
                    <div key={equipment.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{equipment.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Last maintenance: {new Date(equipment.lastMaintenance).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{equipment.efficiency}%</p>
                        <Badge className={getEquipmentStatusColor(equipment.status)}>
                          {equipment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            </div>
          </div>
        )}

        {/* Monthly Trends Tab */}
        {activeTab === 'monthly' && (
          <div className="h-[60vh] overflow-y-auto">
            <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Production Trends</CardTitle>
                <CardDescription>Production performance over the past 9 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((month) => (
                    <div key={month.month} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{month.month} 2024</p>
                        <p className="text-sm text-muted-foreground">
                          Target: {month.target.toLocaleString()} MT
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{month.production.toLocaleString()} MT</p>
                        <p className="text-sm text-muted-foreground">
                          {month.efficiency}% efficiency
                        </p>
                      </div>
                      <div className="w-32">
                        <Progress value={(month.production / month.target) * 100} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            </div>
          </div>
        )}

        {/* Targets & Quality Tab */}
        {activeTab === 'targets' && (
          <div className="h-[60vh] overflow-y-auto">
            <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Quality Metrics
                </CardTitle>
                <CardDescription>Current quality parameters and compliance status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {qualityMetrics.map((metric) => (
                    <div key={metric.parameter} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{metric.parameter}</p>
                        <p className="text-sm text-muted-foreground">Target: {metric.target}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{metric.value}</p>
                        <Badge className={getStatusColor(metric.status)}>
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Production Targets 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Annual Target</p>
                      <p className="text-sm text-muted-foreground">Total production goal for 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">930,000 MT</p>
                      <p className="text-sm text-muted-foreground">Current: 636,700 MT (68.5%)</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Monthly Average Target</p>
                      <p className="text-sm text-muted-foreground">Required monthly output</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">77,500 MT</p>
                      <p className="text-sm text-muted-foreground">Last month: 63,000 MT</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Daily Target</p>
                      <p className="text-sm text-muted-foreground">Average daily production goal</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">2,500 MT</p>
                      <p className="text-sm text-muted-foreground">Today: 2,100 MT</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
