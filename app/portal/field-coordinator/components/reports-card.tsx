"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, ArrowRight } from "lucide-react"

const recentReports = [
  {
    id: 1,
    title: "Monthly Compliance Summary",
    date: "2023-12-31",
    type: "Compliance",
  },
  {
    id: 2,
    title: "Field Visit Summary - December 2023",
    date: "2023-12-31",
    type: "Field Visits",
  },
]

interface ReportsCardProps {
  onViewAllClick: () => void
}

export function ReportsCard({ onViewAllClick }: ReportsCardProps) {
  return (
    <Card className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all">
      <CardHeader className="bg-muted/20">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Reports
        </CardTitle>
        <CardDescription>Recent and available reports</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {recentReports.map((report) => (
          <div 
            key={report.id} 
            className="flex items-center justify-between rounded-lg border p-3 transform hover:scale-[1.02] hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Open report details modal with report.id
              console.log('Opening report details for:', report.id);
            }}
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">{report.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{report.date}</span>
                <span>•</span>
                <Badge variant="outline" className="text-xs">
                  {report.type}
                </Badge>
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
          View All Reports
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardFooter>
    </Card>
  )
}