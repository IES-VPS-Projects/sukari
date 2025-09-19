"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"

interface AlertsCardProps {
  onViewAllClick: () => void
}

export function AlertsCard({ onViewAllClick }: AlertsCardProps) {
  return (
    <Card className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={onViewAllClick}>
      <CardHeader className="bg-muted/20">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Alerts
        </CardTitle>
        <CardDescription>Important notifications requiring attention</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-3">
        <div className="flex items-center gap-3 rounded-lg bg-orange-50 p-3 transform hover:scale-[1.02] hover:shadow-md transition-all duration-200">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <div className="flex-1">
            <p className="text-sm font-medium">Weather Alert</p>
            <p className="text-xs text-muted-foreground">Heavy rainfall expected in Sector 5</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-red-50 p-3 transform hover:scale-[1.02] hover:shadow-md transition-all duration-200">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <div className="flex-1">
            <p className="text-sm font-medium">Disease Outbreak</p>
            <p className="text-xs text-muted-foreground">Blight detected in 3 farms</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3 transform hover:scale-[1.02] hover:shadow-md transition-all duration-200">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <div className="flex-1">
            <p className="text-sm font-medium">System Update</p>
            <p className="text-xs text-muted-foreground">New features available for field management</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 py-3 hover:bg-muted/50 transition-colors group cursor-pointer">
        <Button variant="ghost" size="sm" className="w-full flex items-center justify-center group-hover:bg-transparent">
          View All Alerts
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardFooter>
    </Card>
  )
}