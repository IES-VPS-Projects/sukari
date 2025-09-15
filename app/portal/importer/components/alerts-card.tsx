"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Ship, ArrowRight } from "lucide-react"

const alerts = [
  {
    id: 1,
    title: "Permit Expiry Warning",
    message: "Sugar import permit SIP-2023-045 expires on January 20, 2024",
    type: "warning",
    icon: AlertTriangle,
    color: "bg-orange-50 text-orange-700",
  },
  {
    id: 2,
    title: "Payment Due",
    message: "Import license renewal fee of $2,500 is due",
    type: "error",
    icon: AlertTriangle,
    color: "bg-red-50 text-red-700",
  },
  {
    id: 3,
    title: "Shipment Delayed",
    message: "Shipment from Thailand delayed by 2 days due to weather",
    type: "info",
    icon: Ship,
    color: "bg-blue-50 text-blue-700",
  },
]

interface AlertsCardProps {
  onViewAllClick: () => void
}

export function AlertsCard({ onViewAllClick }: AlertsCardProps) {
  return (
    <Card className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={onViewAllClick}>
      <CardHeader className="bg-muted/20">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Alerts & Notifications
        </CardTitle>
        <CardDescription>Important notifications requiring attention</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className={`flex items-center gap-3 rounded-lg p-3 transform hover:scale-[1.02] hover:shadow-md transition-all duration-200 ${alert.color}`}>
            <alert.icon className="h-4 w-4" />
            <div className="flex-1">
              <p className="text-sm font-medium">{alert.title}</p>
              <p className="text-xs text-muted-foreground">{alert.message}</p>
            </div>
          </div>
        ))}
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