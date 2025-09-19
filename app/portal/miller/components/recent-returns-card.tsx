"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Receipt, ArrowRight } from "lucide-react"

interface ReturnItem {
  id: number
  type: string
  date: string
  status: string
  volume: string
}

interface RecentReturnsCardProps {
  onViewAllClick: () => void
}

const recentReturns: ReturnItem[] = [
  {
    id: 1,
    type: "Daily Production Returns",
    date: "2024-01-12",
    status: "Submitted",
    volume: "145 MT",
  },
  {
    id: 2,
    type: "Monthly Import/Export Returns",
    date: "2023-12-31", 
    status: "Approved",
    volume: "2,340 MT",
  },
  {
    id: 3,
    type: "Agriculture Performance Returns",
    date: "2023-12-31",
    status: "Under Review",
    volume: "1,890 MT",
  },
]

export function RecentReturnsCard({ onViewAllClick }: RecentReturnsCardProps) {
  return (
    <Card className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all">
      <CardHeader className="bg-muted/20">
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Recent Returns
        </CardTitle>
        <CardDescription>Latest submitted returns and reports</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {recentReturns.map((returnItem) => (
          <div 
            key={returnItem.id} 
            className="flex items-center justify-between rounded-lg border p-3 transform hover:scale-[1.02] hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">{returnItem.type}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{returnItem.date}</span>
                <span>•</span>
                <span>{returnItem.volume}</span>
              </div>
            </div>
            <Badge variant={
              returnItem.status === "Approved" ? "default" :
              returnItem.status === "Submitted" ? "secondary" :
              "destructive"
            } className="text-xs">
              {returnItem.status}
            </Badge>
          </div>
        ))}
      </CardContent>
      <CardFooter 
        className="bg-muted/30 py-3 hover:bg-muted/50 transition-colors group cursor-pointer"
        onClick={onViewAllClick}
      >
        <Button variant="ghost" size="sm" className="w-full flex items-center justify-center group-hover:bg-transparent">
          View All Returns
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardFooter>
    </Card>
  )
}