"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Activity, ArrowRight } from "lucide-react"

interface PerformanceMetric {
  metric: string
  value: number
  target: number
  trend: string
}

interface PerformanceAnalyticsCardProps {
  onViewAnalyticsClick: () => void
}

const performanceMetrics: PerformanceMetric[] = [
  {
    metric: "Production Efficiency",
    value: 87,
    target: 90,
    trend: "+3%",
  },
  {
    metric: "Quality Standards",
    value: 94,
    target: 95,
    trend: "+1%",
  },
  {
    metric: "Regulatory Compliance",
    value: 96,
    target: 100,
    trend: "0%",
  },
]

export function PerformanceAnalyticsCard({ onViewAnalyticsClick }: PerformanceAnalyticsCardProps) {
  return (
    <Card className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={onViewAnalyticsClick}>
      <CardHeader className="bg-muted/20">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Performance Analytics
        </CardTitle>
        <CardDescription>Production metrics and performance insights</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{metric.metric}</span>
                <span>{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
          
          <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3 transform hover:scale-[1.02] hover:shadow-md transition-all duration-200">
            <Activity className="h-4 w-4 text-green-500" />
            <div className="flex-1">
              <p className="text-sm font-medium">Overall Performance</p>
              <p className="text-xs text-muted-foreground">Production efficiency improved by 8% this quarter</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 py-3 hover:bg-muted/50 transition-colors group cursor-pointer">
        <Button variant="ghost" size="sm" className="w-full flex items-center justify-center group-hover:bg-transparent">
          View Detailed Analytics
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardFooter>
    </Card>
  )
}