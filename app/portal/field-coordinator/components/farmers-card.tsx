"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, MapPin, ArrowRight } from "lucide-react"

const recentFarmers = [
  {
    id: 1,
    name: "Mary Johnson",
    location: "Kisumu County",
    farms: 2,
    status: "Active",
  },
  {
    id: 2,
    name: "David Smith",
    location: "Kakamega County",
    farms: 1,
    status: "Active",
  },
]

interface FarmersCardProps {
  onViewAllClick: () => void
}

export function FarmersCard({ onViewAllClick }: FarmersCardProps) {
  return (
    <Card className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all">
      <CardHeader className="bg-muted/20">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Farmers
        </CardTitle>
        <CardDescription>Registered farmers in your jurisdiction</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {recentFarmers.map((farmer) => (
          <div 
            key={farmer.id} 
            className="flex items-center justify-between rounded-lg border p-3 transform hover:scale-[1.02] hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Open farmer details modal with farmer.id
              console.log('Opening farmer details for:', farmer.id);
            }}
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {farmer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium">{farmer.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {farmer.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{farmer.farms} farms</span>
                  <span>•</span>
                  <span>Status: {farmer.status}</span>
                </div>
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
          View All Farmers
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardFooter>
    </Card>
  )
}