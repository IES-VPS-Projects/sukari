"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClipboardList, ArrowRight, FileText, Package } from "lucide-react"

import { applicationsData } from "../data/applications-data"

// Add icon components to applications data
const applications = applicationsData.map(app => ({
  ...app,
  icon: app.icon === "FileText" ? FileText : 
        app.icon === "ClipboardList" ? ClipboardList : 
        app.icon === "Package" ? Package : FileText
}))

interface ApplicationsCardProps {
  onViewAllClick: () => void
  onApplicationClick: (applicationId: string) => void
}

export function ApplicationsCard({ onViewAllClick, onApplicationClick }: ApplicationsCardProps) {
  return (
    <Card 
      className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all h-[300px] flex flex-col cursor-pointer w-full"
      onClick={onViewAllClick}
    >
      <CardHeader className="bg-muted/20 pl-10">
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Applications
        </CardTitle>
        <CardDescription>Initiate and Review your permit and license applications</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 flex-grow">
      </CardContent>
      <CardFooter className="bg-muted/30 py-3 hover:bg-muted/50 transition-colors group mt-auto">
        <Button variant="ghost" size="sm" className="w-full flex items-center justify-center group-hover:bg-transparent">
          Open Applications
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardFooter>
    </Card>
  )
}