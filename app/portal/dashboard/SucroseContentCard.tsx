"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay, DialogPortal } from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, Activity, Calendar, Target } from "lucide-react"

interface SucroseData {
  month: string
  year: number
  butali: number
  chemelil: number
  muhoroni: number
  kibos: number
  westKenya: number
  nzoia: number
  kwale: number
  combined: number
}

interface SucroseContentCardProps {
  className?: string
  sucroseData: SucroseData[]
}

const SucroseContentCard = ({ className, sucroseData }: SucroseContentCardProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMiller, setSelectedMiller] = useState("combined")
  const [selectedYear, setSelectedYear] = useState("2024")
  const [currentMonthData, setCurrentMonthData] = useState({
    average: 0,
    yearlyAverage: 0,
    highest: { value: 0, month: "" },
    lowest: { value: 0, month: "" }
  })

  // Calculate current month stats
  useEffect(() => {
    if (sucroseData.length === 0) return

    const filteredData = sucroseData.filter(d => d.year === parseInt(selectedYear))
    const currentMonth = "Aug" // Current month
    const currentMonthItem = filteredData.find(d => d.month === currentMonth)
    
    if (selectedMiller === "combined") {
      // For combined view, use the combined field
      const combinedValues = filteredData.map(d => d.combined)
      const yearlyAverage = combinedValues.reduce((a, b) => a + b, 0) / combinedValues.length
      
      // Find highest and lowest from combined values
      let highest = { value: 0, month: "" }
      let lowest = { value: 100, month: "" }
      
      filteredData.forEach(d => {
        if (d.combined > highest.value) {
          highest = { value: Math.round(d.combined * 100) / 100, month: d.month }
        }
        if (d.combined < lowest.value) {
          lowest = { value: Math.round(d.combined * 100) / 100, month: d.month }
        }
      })

      setCurrentMonthData({
        average: currentMonthItem ? Math.round(currentMonthItem.combined * 100) / 100 : 0,
        yearlyAverage: Math.round(yearlyAverage * 100) / 100,
        highest,
        lowest
      })
    } else {
      // For individual factory view
      const dataKey = selectedMiller as keyof Pick<SucroseData, 'butali' | 'chemelil' | 'muhoroni' | 'kibos' | 'westKenya' | 'nzoia' | 'kwale'>
      const yearlyValues = filteredData.map(d => d[dataKey])
      const yearlyAverage = yearlyValues.reduce((a, b) => a + b, 0) / yearlyValues.length

      // Find highest and lowest
      let highest = { value: 0, month: "" }
      let lowest = { value: 100, month: "" }
      
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
        average: currentMonthItem ? currentMonthItem[dataKey] : 0,
        yearlyAverage: Math.round(yearlyAverage * 100) / 100,
        highest,
        lowest
      })
    }
  }, [sucroseData, selectedMiller, selectedYear])

  const chartData = sucroseData.filter(d => d.year === parseInt(selectedYear))

  const getDataValue = (item: SucroseData) => {
    switch (selectedMiller) {
      case "butali": return item.butali
      case "chemelil": return item.chemelil
      case "muhoroni": return item.muhoroni
      case "kibos": return item.kibos
      case "westKenya": return item.westKenya
      case "nzoia": return item.nzoia
      case "kwale": return item.kwale
      default: return item.combined
    }
  }

  return (
    <>
      <Card 
        className={`rounded-[20px] shadow-lg border-0 bg-white cursor-pointer hover:shadow-xl transition-shadow duration-200 h-[400px] ${className}`}
        onClick={() => setModalOpen(true)}
      >
        <CardHeader className="pb-2 px-4 pt-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-[#202020]">
              CTU Sucrose Content
            </CardTitle>
            <div className="flex gap-2">
              <Select value={selectedMiller} onValueChange={setSelectedMiller}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="combined">Combined</SelectItem>
                  <SelectItem value="butali">Butali</SelectItem>
                  <SelectItem value="chemelil">Chemelil</SelectItem>
                  <SelectItem value="muhoroni">Muhoroni</SelectItem>
                  <SelectItem value="kibos">Kibos</SelectItem>
                  <SelectItem value="westKenya">West Kenya</SelectItem>
                  <SelectItem value="nzoia">Nzoia</SelectItem>
                  <SelectItem value="kwale">Kwale</SelectItem>
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
              <div className="text-lg font-bold text-blue-600">{(Math.round(currentMonthData.average * 100) / 100)}%</div>
              <p className="text-xs text-[#6B6B6B]">Current Month</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-green-600">{(Math.round(currentMonthData.yearlyAverage * 100) / 100)}%</div>
              <p className="text-xs text-[#6B6B6B]">Yearly Average</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-orange-600">{(Math.round(currentMonthData.highest.value * 100) / 100)}%</div>
              <p className="text-xs text-[#6B6B6B]">Highest ({currentMonthData.highest.month})</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-red-600">{(Math.round(currentMonthData.lowest.value * 100) / 100)}%</div>
              <p className="text-xs text-[#6B6B6B]">Lowest ({currentMonthData.lowest.month})</p>
            </div>
          </div>

          {/* Enhanced Chart */}
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {selectedMiller === "combined" ? (
                // Stacked Area Chart for Combined view
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="butaliGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="chemelilGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
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
                      `${value}%`, 
                      name === "butali" ? "Butali" : "Chemelil"
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
                    dataKey="butali"
                    stackId="1"
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fill="url(#butaliGradient)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="chemelil"
                    stackId="1"
                    stroke="#10b981" 
                    strokeWidth={2}
                    fill="url(#chemelilGradient)"
                  />
                </AreaChart>
              ) : (
                // Regular Area Chart for individual millers
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="singleSucroseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={selectedMiller === "butali" ? "#3b82f6" : "#10b981"} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={selectedMiller === "butali" ? "#3b82f6" : "#10b981"} stopOpacity={0.05}/>
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
                    formatter={(value: number) => [`${value}%`, selectedMiller === "butali" ? "Butali" : "Chemelil"]}
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
                    dataKey={selectedMiller === "butali" ? "butali" : "chemelil"}
                    stroke={selectedMiller === "butali" ? "#3b82f6" : "#10b981"} 
                    strokeWidth={2}
                    fill="url(#singleSucroseGradient)"
                    dot={{ fill: selectedMiller === "butali" ? "#3b82f6" : "#10b981", strokeWidth: 2, r: 2 }}
                    activeDot={{ r: 4, stroke: selectedMiller === "butali" ? "#3b82f6" : "#10b981", strokeWidth: 2, fill: "white" }}
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
          <DialogContent className="max-w-4xl z-[60] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                Sucrose Content
              </DialogTitle>
              <div className="flex gap-2">
                <Select value={selectedMiller} onValueChange={setSelectedMiller}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="combined">Combined</SelectItem>
                    <SelectItem value="butali">Butali</SelectItem>
                    <SelectItem value="chemelil">Chemelil</SelectItem>
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
                <div className="text-2xl font-bold text-blue-600">{(Math.round(currentMonthData.average * 100) / 100)}%</div>
                <p className="text-sm text-[#6B6B6B]">Current Month</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-green-600">{(Math.round(currentMonthData.yearlyAverage * 100) / 100)}%</div>
                <p className="text-sm text-[#6B6B6B]">Yearly Average</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-orange-600">{(Math.round(currentMonthData.highest.value * 100) / 100)}%</div>
                <p className="text-sm text-[#6B6B6B]">Highest ({currentMonthData.highest.month})</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-red-600">{(Math.round(currentMonthData.lowest.value * 100) / 100)}%</div>
                <p className="text-sm text-[#6B6B6B]">Lowest ({currentMonthData.lowest.month})</p>
              </div>
            </div>

            {/* Main Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {selectedMiller === "combined" ? (
                  // Stacked Area Chart for Combined view
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="butaliModalGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="chemelilModalGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
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
                        value: "Sucrose Content (%)", 
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
                        `${value}%`, 
                        name === "butali" ? "Butali" : "Chemelil"
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
                      dataKey="butali"
                      stackId="1"
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fill="url(#butaliModalGradient)"
                      name="butali"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="chemelil"
                      stackId="1"
                      stroke="#10b981" 
                      strokeWidth={3}
                      fill="url(#chemelilModalGradient)"
                      name="chemelil"
                    />
                  </AreaChart>
                ) : (
                  // Regular Area Chart for individual millers
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="singleSucroseModalGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={selectedMiller === "butali" ? "#3b82f6" : "#10b981"} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={selectedMiller === "butali" ? "#3b82f6" : "#10b981"} stopOpacity={0.05}/>
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
                        value: 'Sucrose Content (%)', 
                        angle: -90, 
                        position: 'insideLeft', 
                        style: { textAnchor: 'middle' } 
                      }}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#64748b' }}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, selectedMiller === "butali" ? "Butali" : "Chemelil"]}
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
                      dataKey={selectedMiller === "butali" ? "butali" : "chemelil"}
                      stroke={selectedMiller === "butali" ? "#3b82f6" : "#10b981"} 
                      strokeWidth={3}
                      fill="url(#singleSucroseModalGradient)"
                      dot={{ fill: selectedMiller === "butali" ? "#3b82f6" : "#10b981", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: selectedMiller === "butali" ? "#3b82f6" : "#10b981", strokeWidth: 2, fill: "white" }}
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}

export default SucroseContentCard
