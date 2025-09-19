"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ClipboardList, FileText, ArrowRight } from "lucide-react"

interface MillerApplication {
  id: number
  type: string
  status: string
  stage: string
  progress: number
  priority: "high" | "medium" | "low"
  submittedDate: string
  expectedCompletion: string
}

interface ApplicationProgressCardProps {
  onViewAllClick: () => void
}

const millerApplications: MillerApplication[] = [
  {
    id: 1,
    type: "Miller Registration",
    status: "In Progress",
    stage: "Compliance Review",
    progress: 65,
    priority: "high",
    submittedDate: "2024-01-10",
    expectedCompletion: "2024-02-15",
  },
  {
    id: 2,
    type: "Operating License",
    status: "Pending Payment",
    stage: "Payment Required",
    progress: 80,
    priority: "high",
    submittedDate: "2023-12-15",
    expectedCompletion: "2024-01-20",
  },
  {
    id: 3,
    type: "License Renewal", 
    status: "Approved",
    stage: "Completed",
    progress: 100,
    priority: "medium",
    submittedDate: "2023-11-01",
    expectedCompletion: "2023-12-01",
  },
]

export function ApplicationProgressCard({ onViewAllClick }: ApplicationProgressCardProps) {
  return (
    <Card className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all">
      <CardHeader className="bg-muted/20">
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Application Progress Tracker
        </CardTitle>
        <CardDescription>Track the status of your applications and licenses</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {millerApplications.map((application) => (
            <div key={application.id} className="flex flex-col space-y-3 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    application.priority === "high" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">{application.type}</h3>
                    <p className="text-sm text-muted-foreground">Current Stage: {application.stage}</p>
                  </div>
                </div>
                <Badge variant={
                  application.status === "Approved" ? "default" :
                  application.status === "In Progress" ? "secondary" :
                  "destructive"
                }>
                  {application.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{application.progress}%</span>
                </div>
                <Progress value={application.progress} className="h-2" />
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Submitted: {application.submittedDate}</span>
                <span>Expected: {application.expectedCompletion}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter 
        className="bg-muted/30 py-3 hover:bg-muted/50 transition-colors group cursor-pointer"
        onClick={onViewAllClick}
      >
        <Button variant="ghost" size="sm" className="w-full flex items-center justify-center group-hover:bg-transparent">
          View All Applications
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardFooter>
    </Card>
  )
}