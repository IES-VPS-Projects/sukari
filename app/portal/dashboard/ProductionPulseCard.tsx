"use client"

import { useState, useEffect, useCallback } from "react"
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
  factory: string // Factory name
  ksbReturns: number // in millions KSh
  kraReturns: number // in millions KSh
  target: number
}

interface ProductionPulseCardProps {
  className?: string
  productionData: ProductionData[]
}

const ProductionPulseCard = ({ className, productionData }: ProductionPulseCardProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState("ksbReturns")
  const [selectedFactory, setSelectedFactory] = useState("all")
  const [selectedYear, setSelectedYear] = useState("2024")
  const [monthlyTarget, setMonthlyTarget] = useState(50) // in millions KSh
  const [alertThreshold, setAlertThreshold] = useState(80) // percentage
  const [currentMonthData, setCurrentMonthData] = useState({
    totalSupply: 0,        // Total Supply (Tonnes)
    totalProduction: 0,    // Total Production (Tonnes)
    conversionRate: 0,     // Conversion Rate (%)
    peakMonth: { value: 0, month: "" } // Peak Month
  })

  // Single data processing function for both stats and chart
  const getProcessedData = useCallback(() => {
    if (!productionData || productionData.length === 0) return []
    
    let filteredData = productionData.filter(d => d.year === parseInt(selectedYear))
    
    if (selectedFactory !== "all") {
      return filteredData.filter(d => d.factory.toLowerCase() === selectedFactory.toLowerCase())
    } else {
      // For "all", aggregate all factories by month
      const monthlyAggregated: { [key: string]: ProductionData } = {}
      
      filteredData.forEach(item => {
        const key = item.month
        if (!monthlyAggregated[key]) {
          monthlyAggregated[key] = {
            month: item.month,
            year: item.year,
            factory: "all",
            ksbReturns: 0,
            kraReturns: 0,
            target: item.target
          }
        }
        monthlyAggregated[key].ksbReturns += item.ksbReturns
        monthlyAggregated[key].kraReturns += item.kraReturns
      })
      
      return Object.values(monthlyAggregated).sort((a, b) => {
        const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
      })
    }
  }, [productionData, selectedYear, selectedFactory])

  // Calculate stats using the same processed data
  useEffect(() => {
    const processedData = getProcessedData()
    if (processedData.length === 0) return
    
    // Calculate the new stats based on the entire year's processed data
    const totalSupply = processedData.reduce((sum: number, d: ProductionData) => sum + d.ksbReturns + d.kraReturns, 0) * 1000 / 12 // Convert to tonnes, approximate
    const totalProduction = processedData.reduce((sum: number, d: ProductionData) => sum + d.ksbReturns, 0) * 1000 / 12 // Convert to tonnes, approximate
    const conversionRate = totalSupply > 0 ? (totalProduction / totalSupply) * 100 : 0
    
    // Find peak month
    const dataKey = selectedMetric as keyof Pick<ProductionData, 'ksbReturns' | 'kraReturns'>
    let peakMonth = { value: 0, month: "" }
    
    processedData.forEach((d: ProductionData) => {
      const value = d[dataKey]
      if (value > peakMonth.value) {
        peakMonth = { 
          value: Math.round(value * 100) / 100, 
          month: d.month 
        }
      }
    })

    setCurrentMonthData({
      totalSupply: Math.round(totalSupply),
      totalProduction: Math.round(totalProduction),
      conversionRate: Math.round(conversionRate * 100) / 100,
      peakMonth
    })
  }, [getProcessedData, selectedMetric])

  const chartData = getProcessedData()

  const handleSaveSettings = () => {
    console.log("Settings saved:", { monthlyTarget, alertThreshold })
    // Here you would typically:
    // 1. Save to localStorage or API
    // 2. Update alerts system
    // 3. Refresh data
  }

  return (
    <>
      <Card 
        className={`rounded-[20px] shadow-lg border-0 bg-white cursor-pointer hover:shadow-xl transition-shadow duration-200 h-[400px] ${className}`}
      >
        <CardHeader className="pb-2 px-4 pt-4" onClick={() => setModalOpen(true)}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-[#202020]">
              Production
            </CardTitle>
            <div 
              className="flex gap-2" 
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <Select value={selectedFactory} onValueChange={setSelectedFactory}>
                <SelectTrigger 
                  className="w-32 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Factories</SelectItem>
                  <SelectItem value="butali">Butali</SelectItem>
                  <SelectItem value="chemelil">Chemelil</SelectItem>
                  <SelectItem value="muhoroni">Muhoroni</SelectItem>
                  <SelectItem value="kibos">Kibos</SelectItem>
                  <SelectItem value="westKenya">West Kenya</SelectItem>
                  <SelectItem value="nzoia">Nzoia</SelectItem>
                  <SelectItem value="kwale">Kwale</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger 
                  className="w-40 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ksbReturns">KSB Returns</SelectItem>
                  <SelectItem value="kraReturns">KRA Returns</SelectItem>
                  <SelectItem value="combined">Combined</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger 
                  className="w-20 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                >
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
        <CardContent className="space-y-3 p-4 cursor-pointer" onClick={() => setModalOpen(true)}>
          {/* Stats moved above chart */}
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-gray-900">{currentMonthData.totalSupply.toLocaleString()}</div>
              <p className="text-xs text-[#6B6B6B]">Total Supply</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-green-600">{currentMonthData.totalProduction.toLocaleString()}</div>
              <p className="text-xs text-[#6B6B6B]">Total Production</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-blue-600">{currentMonthData.conversionRate}%</div>
              <p className="text-xs text-[#6B6B6B]">Conversion Rate</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-orange-600">{currentMonthData.peakMonth.value}M</div>
              <p className="text-xs text-[#6B6B6B]">Peak Month ({currentMonthData.peakMonth.month})</p>
            </div>
          </div>

          {/* Main Chart */}
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              {selectedMetric === "combined" ? (
                // Stacked Area Chart for Combined view
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="ksbGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="kraGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
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
                    name="ksbReturns"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="kraReturns"
                    stackId="1"
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fill="url(#kraGradient)"
                    name="kraReturns"
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
                    formatter={(value: number) => [`${value}M KSh`, selectedMetric === "ksbReturns" ? "KSB Returns" : "KRA Returns"]}
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
          <DialogContent className="max-w-5xl z-[60] max-h-[90vh] overflow-y-auto [&>button]:hidden">
          <DialogHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <DialogTitle className="text-xl font-bold">
                Production
              </DialogTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={selectedFactory} onValueChange={setSelectedFactory}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Select Factory" />
                  </SelectTrigger>
                  <SelectContent className="z-[70]">
                    <SelectItem value="all">All Factories</SelectItem>
                    <SelectItem value="butali">Butali</SelectItem>
                    <SelectItem value="chemelil">Chemelil</SelectItem>
                    <SelectItem value="kibos">Kibos</SelectItem>
                    <SelectItem value="kwale">Kwale</SelectItem>
                    <SelectItem value="muhoroni">Muhoroni</SelectItem>
                    <SelectItem value="nzoia">Nzoia</SelectItem>
                    <SelectItem value="west kenya">West Kenya</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-[70]">
                    <SelectItem value="ksbReturns">KSB Returns</SelectItem>
                    <SelectItem value="kraReturns">KRA Returns</SelectItem>
                    <SelectItem value="combined">Combined</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full sm:w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-[70]">
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
                <div className="text-2xl font-bold text-gray-900">{currentMonthData.totalSupply.toLocaleString()}</div>
                <p className="text-sm text-[#6B6B6B]">Total Supply</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-green-600">{currentMonthData.totalProduction.toLocaleString()}</div>
                <p className="text-sm text-[#6B6B6B]">Total Production</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-blue-600">{currentMonthData.conversionRate}%</div>
                <p className="text-sm text-[#6B6B6B]">Conversion Rate</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-orange-600">{currentMonthData.peakMonth.value}M</div>
                <p className="text-sm text-[#6B6B6B]">Peak Month ({currentMonthData.peakMonth.month})</p>
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
                        value: "Returns (M KSh)", 
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
                      <linearGradient id="singleMetricModalGradient" x1="0" y1="0" x2="0" y2="1">
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
                        value: 'Returns (M KSh)', 
                        angle: -90, 
                        position: 'insideLeft', 
                        style: { textAnchor: 'middle' } 
                      }}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#64748b' }}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`${value}M KSh`, selectedMetric === "ksbReturns" ? "KSB Returns" : "KRA Returns"]}
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
                      fill="url(#singleMetricModalGradient)"
                      dot={{ fill: selectedMetric === "ksbReturns" ? "#10b981" : "#3b82f6", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: selectedMetric === "ksbReturns" ? "#10b981" : "#3b82f6", strokeWidth: 2, fill: "white" }}
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Settings Section */}
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold">Production Settings</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="monthly-target">Monthly Target (M KSh)</Label>
                  <Input
                    id="monthly-target"
                    type="number"
                    value={monthlyTarget}
                    onChange={(e) => setMonthlyTarget(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="alert-threshold">Alert Threshold (%)</Label>
                  <Input
                    id="alert-threshold"
                    type="number"
                    value={alertThreshold}
                    onChange={(e) => setAlertThreshold(Number(e.target.value))}
                    className="w-full"
                  />
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
