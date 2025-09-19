"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Factory, FileText, Shield, Receipt } from "lucide-react"

interface StatCard {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
  icon: React.ComponentType<{ className?: string }>
  description: string
}

interface StatsCardsProps {
  onAnalyticsClick: () => void
}

const stats: StatCard[] = [
  {
    title: "Production Volume",
    value: "2,847",
    change: "+15%",
    changeType: "positive",
    icon: Factory,
    description: "MT this month",
  },
  {
    title: "Active Applications",
    value: "3",
    change: "+1",
    changeType: "positive",
    icon: FileText,
    description: "In progress",
  },
  {
    title: "Compliance Score",
    value: "94%",
    change: "+2%",
    changeType: "positive",
    icon: Shield,
    description: "Overall rating",
  },
  {
    title: "Monthly Returns",
    value: "12/12",
    change: "100%",
    changeType: "positive",
    icon: Receipt,
    description: "Submitted on time",
  },
]

export function StatsCards({ onAnalyticsClick }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card 
          key={stat.title} 
          className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all cursor-pointer" 
          onClick={onAnalyticsClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/20">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-full ${
              stat.title === "Production Volume" ? "bg-green-100" :
              stat.title === "Active Applications" ? "bg-blue-100" :
              stat.title === "Compliance Score" ? "bg-purple-100" :
              "bg-orange-100"
            }`}>
              <stat.icon className={`h-4 w-4 ${
                stat.title === "Production Volume" ? "text-green-700" :
                stat.title === "Active Applications" ? "text-blue-700" :
                stat.title === "Compliance Score" ? "text-purple-700" :
                "text-orange-700"
              }`} />
            </div>
          </CardHeader>
          <CardContent className="py-4">
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            <div className="flex items-center pt-1">
              <TrendingUp
                className={`h-3 w-3 ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
              />
              <span className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                {stat.change} from last month
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}