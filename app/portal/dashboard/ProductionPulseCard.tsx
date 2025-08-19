"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay, DialogPortal } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts"
import { Factory, TrendingUp, AlertTriangle, Target, Settings } from "lucide-react"

interface ProductionData {
  month: string
  year: number
  sugarcaneSupply: number // in tonnes
  sugarProduction: number // in tonnes
  target: number
}

interface ProductionPulseCardProps {
  className?: string
}

const ProductionPulseCard = ({ className }: ProductionPulseCardProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState("sugarProduction")
  const [selectedYear, setSelectedYear] = useState("2024")
  const [productionData, setProductionData] = useState<ProductionData[]>([])
  const [monthlyTarget, setMonthlyTarget] = useState(5000)
  const [alertThreshold, setAlertThreshold] = useState(80) // percentage
  const [currentMonthData, setCurrentMonthData] = useState({
    current: 0,
    target: 5000,
    yearlyAverage: 0,
    highest: { value: 0, month: "" },
    lowest: { value: 0, month: "" }
  })

  // Mock data generation based on CSV structure
  useEffect(() => {
    const generateMockData = () => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
      const data: ProductionData[] = []

      years.forEach(year => {
        months.forEach((month, index) => {
          // Generate realistic production data
          // Sugarcane supply varies seasonally
          const seasonalFactor = Math.sin((index / 12) * 2 * Math.PI) * 0.3 + 1
          const baseSupply = 8000 + Math.random() * 4000 // 8-12k tonnes base
          const sugarcaneSupply = Math.round(baseSupply * seasonalFactor)
          
          // Sugar production is derived from sugarcane supply
          // Typical recovery rate is 10-12% with 88% factory efficiency
          const recoveryRate = 0.10 + Math.random() * 0.02 // 10-12%
          const factoryEfficiency = 0.88
          const sugarProduction = Math.round(sugarcaneSupply * recoveryRate * factoryEfficiency)
          
          const target = monthlyTarget

          data.push({
            month,
            year,
            sugarcaneSupply: Math.round(sugarcaneSupply / 1000 * 100) / 100, // Convert to tonnes with decimals
            sugarProduction: Math.round(sugarProduction / 1000 * 100) / 100, // Convert to tonnes with decimals
            target: target / 1000 // Convert to tonnes
          })
        })
      })

      setProductionData(data)
    }

    generateMockData()
  }, [monthlyTarget])

  // Calculate current month stats
  useEffect(() => {
    if (productionData.length === 0) return

    const filteredData = productionData.filter(d => d.year === parseInt(selectedYear))
    const currentMonth = "Aug" // Current month
    const currentMonthItem = filteredData.find(d => d.month === currentMonth)
    
    const dataKey = selectedMetric as keyof Pick<ProductionData, 'sugarcaneSupply' | 'sugarProduction'>
    const yearlyValues = filteredData.map(d => d[dataKey])
    const yearlyAverage = yearlyValues.reduce((a, b) => a + b, 0) / yearlyValues.length

    // Find highest and lowest
    let highest = { value: 0, month: "" }
    let lowest = { value: 100000, month: "" }
    
    filteredData.forEach(d => {
      const value = d[dataKey]
      if (value > highest.value) {
        highest = { value, month: d.month }
      }
      if (value < lowest.value) {
        lowest = { value, month: d.month }
      }
    })

    setCurrentMonthData({
      current: currentMonthItem ? currentMonthItem[dataKey] : 0,
      target: monthlyTarget / 1000,
      yearlyAverage: Math.round(yearlyAverage * 100) / 100,
      highest,
      lowest
    })
  }, [productionData, selectedMetric, selectedYear, monthlyTarget])

  const chartData = productionData.filter(d => d.year === parseInt(selectedYear))

  const getDataValue = (item: ProductionData) => {
    return selectedMetric === "sugarcaneSupply" ? item.sugarcaneSupply : item.sugarProduction
  }

  const handleSaveSettings = () => {
    // In a real app, this would trigger alerts and update targets
    console.log("Alert threshold set to:", alertThreshold, "%")
    console.log("Monthly target set to:", monthlyTarget, "tonnes")
    
    // Here you would typically:
    // 1. Save to backend
    // 2. Update alerts system
    // 3. Refresh data
  }

  return (
    <>
      <Card 
        className={`rounded-[20px] shadow-lg border-0 bg-white cursor-pointer hover:shadow-xl transition-shadow duration-200 h-[400px] ${className}`}
        onClick={() => setModalOpen(true)}
      >
        <CardHeader className="pb-2 px-4 pt-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-[#202020]">
              Production Pulse
            </CardTitle>
            <div className="flex gap-2">
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sugarProduction">Sugar Production</SelectItem>
                  <SelectItem value="sugarcaneSupply">Sugarcane Supply</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2017">2017</SelectItem>
                  <SelectItem value="2018">2018</SelectItem>
                  <SelectItem value="2019">2019</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 p-4">
          {/* Stats moved above chart */}
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-blue-600">{currentMonthData.current}t</div>
              <p className="text-xs text-[#6B6B6B]">Current Month</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-green-600">{currentMonthData.target}t</div>
              <p className="text-xs text-[#6B6B6B]">Monthly Target</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-orange-600">{currentMonthData.yearlyAverage}t</div>
              <p className="text-xs text-[#6B6B6B]">Yearly Average</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-red-600">{currentMonthData.highest.value}t</div>
              <p className="text-xs text-[#6B6B6B]">Peak Month ({currentMonthData.highest.month})</p>
            </div>
          </div>

          {/* Enhanced Chart */}
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 9, fill: '#64748b' }}
                  height={20}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 9, fill: '#64748b' }}
                  width={25}
                />
                <Tooltip 
                  formatter={(value: number) => [
                    `${value}t`, 
                    selectedMetric === "sugarProduction" ? "Sugar Production" : "Sugarcane Supply"
                  ]}
                  labelFormatter={(label) => `Month: ${label}`}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey={selectedMetric}
                  stroke="#10b981" 
                  strokeWidth={2}
                  fill="url(#productionGradient)"
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 2 }}
                  activeDot={{ r: 4, stroke: "#10b981", strokeWidth: 2, fill: "white" }}
                />
                {selectedMetric === "sugarProduction" && (
                  <Line 
                    type="monotone" 
                    dataKey="target"
                    stroke="#ef4444" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogPortal>
          <DialogOverlay className="z-[55]" />
          <DialogContent className="max-w-5xl z-[60] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                Production Pulse
              </DialogTitle>
              <div className="flex gap-2">
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sugarProduction">Sugar Production</SelectItem>
                    <SelectItem value="sugarcaneSupply">Sugarcane Supply</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2017">2017</SelectItem>
                    <SelectItem value="2018">2018</SelectItem>
                    <SelectItem value="2019">2019</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Stats moved above chart */}
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-blue-600">{currentMonthData.current}t</div>
                <p className="text-sm text-[#6B6B6B]">Current Month</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-green-600">{currentMonthData.yearlyAverage}t</div>
                <p className="text-sm text-[#6B6B6B]">Yearly Average</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-orange-600">{currentMonthData.highest.value}t</div>
                <p className="text-sm text-[#6B6B6B]">Highest ({currentMonthData.highest.month})</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-red-600">{currentMonthData.lowest.value}t</div>
                <p className="text-sm text-[#6B6B6B]">Lowest ({currentMonthData.lowest.month})</p>
              </div>
            </div>

            {/* Main Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="productionModalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis 
                    label={{ 
                      value: selectedMetric === "sugarProduction" ? "Sugar Production (Tonnes)" : "Sugarcane Supply (Tonnes)", 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' }
                    }}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [
                      `${value}t`, 
                      selectedMetric === "sugarProduction" ? "Sugar Production" : "Sugarcane Supply"
                    ]}
                    labelFormatter={(label) => `Month: ${label}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={getDataValue}
                    stroke="#10b981" 
                    strokeWidth={3}
                    fill="url(#productionModalGradient)"
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2, fill: "white" }}
                  />
                  {selectedMetric === "sugarProduction" && (
                    <Line 
                      type="monotone" 
                      dataKey="target"
                      stroke="#ef4444" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <Separator />

            {/* Settings Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold">Production Settings & Alerts</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Targets */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    Production Targets
                  </h4>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyTarget">Monthly Target (Tonnes)</Label>
                    <Input
                      id="monthlyTarget"
                      type="number"
                      value={monthlyTarget}
                      onChange={(e) => setMonthlyTarget(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Alerts */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    Alert Thresholds
                  </h4>
                  <div className="space-y-2">
                    <Label htmlFor="alertThreshold">Alert when production falls below (% of target)</Label>
                    <Input
                      id="alertThreshold"
                      type="number"
                      value={alertThreshold}
                      onChange={(e) => setAlertThreshold(Number(e.target.value))}
                      min="0"
                      max="100"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}

export default ProductionPulseCard
