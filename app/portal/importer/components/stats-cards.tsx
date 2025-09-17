"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Ship, FileText, DollarSign, Shield } from "lucide-react"
import { LiaMoneyBillSolid } from 'react-icons/lia'

// Sample data for stats cards
const stats = [
  {
    title: "Total Imports",
    value: "847",
    change: "+12%",
    changeType: "positive" as const,
    icon: Ship,
    description: "MT this year",
  },
  {
    title: "Active Permits",
    value: "5",
    change: "+2",
    changeType: "positive" as const,
    icon: FileText,
    description: "Valid permits",
  },
  {
    title: "Import Value",
    value: "Ksh. 2.4M",
    change: "+18%",
    changeType: "positive" as const,
    icon: LiaMoneyBillSolid,
    description: "This quarter",
  },
  {
    title: "Compliance Rate",
    value: "98%",
    change: "+1%",
    changeType: "positive" as const,
    icon: Shield,
    description: "Overall rating",
  },
]

interface StatsCardsProps {
  onAnalyticsClick: () => void
}

export function StatsCards({ onAnalyticsClick }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/20">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-full ${
              stat.title === "Total Imports" ? "bg-blue-100" :
              stat.title === "Active Permits" ? "bg-green-100" :
              stat.title === "Import Value" ? "bg-purple-100" :
              "bg-orange-100"
            }`}>
              <stat.icon className={`h-4 w-4 ${
                stat.title === "Total Imports" ? "text-blue-700" :
                stat.title === "Active Permits" ? "text-green-700" :
                stat.title === "Import Value" ? "text-purple-700" :
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