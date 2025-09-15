"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tractor, MapPin, ArrowRight } from "lucide-react"

const recentFarms = [
  {
    id: 1,
    name: "Green Valley Farm",
    location: "Kisumu County",
    size: "120 acres",
    status: "Active",
    compliance: 92,
  },
  {
    id: 2,
    name: "Sunrise Agriculture",
    location: "Kakamega County",
    size: "85 acres",
    status: "Active",
    compliance: 87,
  },
]

interface FarmsCardProps {
  onViewAllClick: () => void
}

export function FarmsCard({ onViewAllClick }: FarmsCardProps) {
  return (
    <Card className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all">
      <CardHeader className="bg-muted/20">
        <CardTitle className="flex items-center gap-2">
          <Tractor className="h-5 w-5" />
          Farms
        </CardTitle>
        <CardDescription>Registered farms in your jurisdiction</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {recentFarms.map((farm) => (
          <div 
            key={farm.id} 
            className="flex items-center justify-between rounded-lg border p-3 transform hover:scale-[1.02] hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Open farm details modal with farm.id
              console.log('Opening farm details for:', farm.id);
            }}
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">{farm.name}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {farm.location}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{farm.size}</span>
                <span>•</span>
                <span>Compliance: {farm.compliance}%</span>
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
          View All Farms
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardFooter>
    </Card>
  )
}