"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Activity, ArrowRight } from "lucide-react"

interface AnalyticsCardProps {
  onViewAnalyticsClick: () => void
}

export function AnalyticsCard({ onViewAnalyticsClick }: AnalyticsCardProps) {
  return (
    <Card className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={onViewAnalyticsClick}>
      <CardHeader className="bg-muted/20">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Analytics
        </CardTitle>
        <CardDescription>Performance metrics and insights</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
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
          <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3 transform hover:scale-[1.02] hover:shadow-md transition-all duration-200">
            <Activity className="h-4 w-4 text-green-500" />
            <div className="flex-1">
              <p className="text-sm font-medium">Performance Trend</p>
              <p className="text-xs text-muted-foreground">Overall metrics improved by 12% this month</p>
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