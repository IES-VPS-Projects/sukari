"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Tractor, Users, Calendar, CheckCircle } from "lucide-react"

// Sample data for stats cards
const stats = [
  {
    title: "Total Farms",
    value: "247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Tractor,
    description: "Registered farms",
  },
  {
    title: "Active Farmers",
    value: "189",
    change: "+8%",
    changeType: "positive" as const,
    icon: Users,
    description: "Farmers in system",
  },
  {
    title: "Field Visits",
    value: "156",
    change: "+23%",
    changeType: "positive" as const,
    icon: Calendar,
    description: "This month",
  },
  {
    title: "Compliance Rate",
    value: "87%",
    change: "-3%",
    changeType: "negative" as const,
    icon: CheckCircle,
    description: "Overall compliance",
  },
]

interface StatsCardsProps {}

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden border border-muted rounded-[24px] shadow-sm transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/20">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-full ${
              stat.title === "Total Farms" ? "bg-green-100" :
              stat.title === "Active Farmers" ? "bg-blue-100" :
              stat.title === "Field Visits" ? "bg-purple-100" :
              "bg-orange-100"
            }`}>
              <stat.icon className={`h-4 w-4 ${
                stat.title === "Total Farms" ? "text-green-700" :
                stat.title === "Active Farmers" ? "text-blue-700" :
                stat.title === "Field Visits" ? "text-purple-700" :
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