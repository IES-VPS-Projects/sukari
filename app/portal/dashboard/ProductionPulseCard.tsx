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
  ksbReturns: number // in millions KSh
  kraReturns: number // in millions KSh
  target: number
}

interface ProductionPulseCardProps {
  className?: string
}

const ProductionPulseCard = ({ className }: ProductionPulseCardProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState("ksbReturns")
  const [selectedYear, setSelectedYear] = useState("2024")
  const [productionData, setProductionData] = useState<ProductionData[]>([])
  const [monthlyTarget, setMonthlyTarget] = useState(50) // in millions KSh
  const [alertThreshold, setAlertThreshold] = useState(80) // percentage
  const [currentMonthData, setCurrentMonthData] = useState({
    current: 0,
    target: 50,
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
          // Generate realistic returns data
          // KSB Returns vary seasonally - higher values similar to original sugarcane supply
          const seasonalFactor = Math.sin((index / 12) * 2 * Math.PI) * 0.3 + 1
          const baseKsbReturns = 40 + Math.random() * 20 // 40-60 million KSh base
          const ksbReturns = Math.round(baseKsbReturns * seasonalFactor * 100) / 100
          
          // KRA Returns are lower and derived from KSB returns with different patterns
          const kraBaseFactor = 0.3 + Math.random() * 0.2 // 30-50% of KSB returns
          const kraReturns = Math.round(ksbReturns * kraBaseFactor * 100) / 100
          
          const target = monthlyTarget

          data.push({
            month,
            year,
            ksbReturns,
            kraReturns,
            target
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
    
    const dataKey = selectedMetric as keyof Pick<ProductionData, 'ksbReturns' | 'kraReturns'>
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
      target: monthlyTarget,
      yearlyAverage: Math.round(yearlyAverage * 100) / 100,
      highest,
      lowest
    })
  }, [productionData, selectedMetric, selectedYear, monthlyTarget])

  const chartData = productionData.filter(d => d.year === parseInt(selectedYear))

  const getDataValue = (item: ProductionData) => {
    return selectedMetric === "ksbReturns" ? item.ksbReturns : 
           selectedMetric === "kraReturns" ? item.kraReturns :
           item.ksbReturns // default fallback
  }

  const handleSaveSettings = () => {
    // In a real app, this would trigger alerts and update targets
    console.log("Alert threshold set to:", alertThreshold, "%")
    console.log("Monthly target set to:", monthlyTarget, "million KSh")
    
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
              Production
            </CardTitle>
            <div className="flex gap-2">
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ksbReturns">KSB Returns</SelectItem>
                  <SelectItem value="kraReturns">KRA Returns</SelectItem>
                  <SelectItem value="combined">Combined</SelectItem>
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
              <div className="text-lg font-bold text-blue-600">{currentMonthData.current}M</div>
              <p className="text-xs text-[#6B6B6B]">Current Month</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-green-600">{currentMonthData.target}M</div>
              <p className="text-xs text-[#6B6B6B]">Monthly Target</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-orange-600">{currentMonthData.yearlyAverage}M</div>
              <p className="text-xs text-[#6B6B6B]">Yearly Average</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-red-600">{currentMonthData.highest.value}M</div>
              <p className="text-xs text-[#6B6B6B]">Peak Month ({currentMonthData.highest.month})</p>
            </div>
          </div>

          {/* Enhanced Chart */}
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {selectedMetric === "combined" ? (
                // Stacked Area Chart for Combined view
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="ksbGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="kraGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
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
                    formatter={(value: number, name: string) => [
                      `${value}M KSh`, 
                      name === "ksbReturns" ? "KSB Returns" : "KRA Returns"
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
                    dataKey="ksbReturns"
                    stackId="1"
                    stroke="#10b981" 
                    strokeWidth={2}
                    fill="url(#ksbGradient)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="kraReturns"
                    stackId="1"
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fill="url(#kraGradient)"
                  />
                </AreaChart>
              ) : (
                // Regular Area Chart for individual metrics
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="singleMetricGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={selectedMetric === "ksbReturns" ? "#10b981" : "#3b82f6"} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={selectedMetric === "ksbReturns" ? "#10b981" : "#3b82f6"} stopOpacity={0.05}/>
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
                      `${value}M KSh`, 
                      selectedMetric === "ksbReturns" ? "KSB Returns" : "KRA Returns"
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
                    stroke={selectedMetric === "ksbReturns" ? "#10b981" : "#3b82f6"} 
                    strokeWidth={2}
                    fill="url(#singleMetricGradient)"
                    dot={{ fill: selectedMetric === "ksbReturns" ? "#10b981" : "#3b82f6", strokeWidth: 2, r: 2 }}
                    activeDot={{ r: 4, stroke: selectedMetric === "ksbReturns" ? "#10b981" : "#3b82f6", strokeWidth: 2, fill: "white" }}
                  />
                </AreaChart>
              )}
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
                Production Returns
              </DialogTitle>
              <div className="flex gap-2">
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ksbReturns">KSB Returns</SelectItem>
                    <SelectItem value="kraReturns">KRA Returns</SelectItem>
                    <SelectItem value="combined">Combined</SelectItem>
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
                <div className="text-2xl font-bold text-blue-600">{currentMonthData.current}M</div>
                <p className="text-sm text-[#6B6B6B]">Current Month</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-green-600">{currentMonthData.yearlyAverage}M</div>
                <p className="text-sm text-[#6B6B6B]">Yearly Average</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-orange-600">{currentMonthData.highest.value}M</div>
                <p className="text-sm text-[#6B6B6B]">Highest ({currentMonthData.highest.month})</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-red-600">{currentMonthData.lowest.value}M</div>
                <p className="text-sm text-[#6B6B6B]">Lowest ({currentMonthData.lowest.month})</p>
              </div>
            </div>

            {/* Main Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {selectedMetric === "combined" ? (
                  // Stacked Area Chart for Combined view
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="ksbModalGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="kraModalGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
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
                        value: "Returns (Million KSh)", 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle' }
                      }}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#64748b' }}
                    />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        `${value}M KSh`, 
                        name === "ksbReturns" ? "KSB Returns" : "KRA Returns"
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
                      dataKey="ksbReturns"
                      stackId="1"
                      stroke="#10b981" 
                      strokeWidth={3}
                      fill="url(#ksbModalGradient)"
                      name="ksbReturns"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="kraReturns"
                      stackId="1"
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fill="url(#kraModalGradient)"
                      name="kraReturns"
                    />
                  </AreaChart>
                ) : (
                  // Regular Area Chart for individual metrics
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="singleModalGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={selectedMetric === "ksbReturns" ? "#10b981" : "#3b82f6"} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={selectedMetric === "ksbReturns" ? "#10b981" : "#3b82f6"} stopOpacity={0.05}/>
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
                        value: selectedMetric === "ksbReturns" ? "KSB Returns (Million KSh)" : "KRA Returns (Million KSh)", 
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
                        `${value}M KSh`, 
                        selectedMetric === "ksbReturns" ? "KSB Returns" : "KRA Returns"
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
                      stroke={selectedMetric === "ksbReturns" ? "#10b981" : "#3b82f6"} 
                      strokeWidth={3}
                      fill="url(#singleModalGradient)"
                      dot={{ fill: selectedMetric === "ksbReturns" ? "#10b981" : "#3b82f6", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: selectedMetric === "ksbReturns" ? "#10b981" : "#3b82f6", strokeWidth: 2, fill: "white" }}
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>

            <Separator />

            {/* Settings Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold">Returns Settings & Alerts</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Targets */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    Returns Targets
                  </h4>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyTarget">Monthly Target (Million KSh)</Label>
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
                    <Label htmlFor="alertThreshold">Alert when returns fall below (% of target)</Label>
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
