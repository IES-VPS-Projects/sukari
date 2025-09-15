"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Ship, ArrowRight } from "lucide-react"

const recentImports = [
  {
    id: 1,
    origin: "Brazil",
    quantity: "250 MT",
    status: "Cleared",
    arrivalDate: "2024-01-10",
    value: "$125,000",
  },
  {
    id: 2,
    origin: "Thailand",
    quantity: "180 MT",
    status: "In Transit",
    arrivalDate: "2024-01-15",
    value: "$90,000",
  },
  {
    id: 3,
    origin: "India",
    quantity: "320 MT",
    status: "Processing",
    arrivalDate: "2024-01-12",
    value: "$160,000",
  },
]

interface RecentImportsCardProps {
  onViewAllClick: () => void
}

export function RecentImportsCard({ onViewAllClick }: RecentImportsCardProps) {
  return (
    <Card className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all">
      <CardHeader className="bg-muted/20">
        <CardTitle className="flex items-center gap-2">
          <Ship className="h-5 w-5" />
          Recent Imports
        </CardTitle>
        <CardDescription>Latest import shipments and status</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {recentImports.map((importItem) => (
          <div 
            key={importItem.id} 
            className="flex items-center justify-between rounded-lg border p-3 transform hover:scale-[1.02] hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">From {importItem.origin}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{importItem.quantity}</span>
                <span>•</span>
                <span>{importItem.value}</span>
              </div>
              <p className="text-xs text-muted-foreground">Arrival: {importItem.arrivalDate}</p>
            </div>
            <Badge variant={
              importItem.status === "Cleared" ? "default" :
              importItem.status === "In Transit" ? "secondary" :
              "destructive"
            } className="text-xs">
              {importItem.status}
            </Badge>
          </div>
        ))}
      </CardContent>
      <CardFooter 
        className="bg-muted/30 py-3 hover:bg-muted/50 transition-colors group cursor-pointer"
        onClick={onViewAllClick}
      >
        <Button variant="ghost" size="sm" className="w-full flex items-center justify-center group-hover:bg-transparent">
          View All Imports
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardFooter>
    </Card>
  )
}