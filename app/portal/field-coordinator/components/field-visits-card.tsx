"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"

const upcomingVisits = [
  {
    id: 1,
    farmName: "Green Valley Farm",
    farmer: "Mary Johnson",
    date: "2024-01-15",
    time: "09:00 AM",
    type: "Crop Assessment",
    priority: "high" as const,
    location: "Sector 7, Block A",
  },
  {
    id: 2,
    farmName: "Sunrise Agriculture",
    farmer: "David Smith",
    date: "2024-01-15",
    time: "02:00 PM",
    type: "Compliance Check",
    priority: "medium" as const,
    location: "Sector 12, Block C",
  },
]

interface FieldVisitsCardProps {
  onViewAllClick: () => void
}

export function FieldVisitsCard({ onViewAllClick }: FieldVisitsCardProps) {
  return (
    <Card className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all">
      <CardHeader className="bg-muted/20">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Field Visits
        </CardTitle>
        <CardDescription>Upcoming field visits</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {upcomingVisits.map((visit) => (
          <div 
            key={visit.id} 
            className="flex items-center space-x-4 rounded-lg border p-3 transform hover:scale-[1.02] hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Open visit details modal with visit.id
              console.log('Opening visit details for:', visit.id);
            }}
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium leading-none">{visit.farmName}</p>
                <Badge variant={visit.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                  {visit.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{visit.farmer}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {visit.date} at {visit.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter 
        className="bg-muted/30 py-3 hover:bg-muted/50 transition-colors group cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onViewAllClick();
        }}
      >
        <Button variant="ghost" size="sm" className="w-full flex items-center justify-center group-hover:bg-transparent">
          View All Visits
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardFooter>
    </Card>
  )
}