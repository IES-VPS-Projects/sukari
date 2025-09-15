"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Calendar, Tractor, Users, FileText } from "lucide-react"

const actions = [
  {
    title: "Schedule Visit",
    description: "Plan and schedule a new field visit",
    icon: Calendar,
    href: "#",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Register Farm",
    description: "Add a new farm to the system",
    icon: Tractor,
    href: "#",
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Register Farmer",
    description: "Add a new farmer to the system",
    icon: Users,
    href: "#",
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Generate Report",
    description: "Create a new report",
    icon: FileText,
    href: "#",
    color: "bg-orange-100 text-orange-700",
  },
]

interface QuickActionsCardProps {
  onActionsClick: () => void
}

export function QuickActionsCard({ onActionsClick }: QuickActionsCardProps) {
  const getHoverColor = (color: string) => {
    if (color.includes('blue-100')) return 'hover:bg-blue-50'
    if (color.includes('green-100')) return 'hover:bg-green-50'
    if (color.includes('purple-100')) return 'hover:bg-purple-50'
    if (color.includes('orange-100')) return 'hover:bg-orange-50'
    return 'hover:bg-gray-100'
  }

  return (
    <Card className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={onActionsClick}>
      <CardHeader className="bg-muted/20">
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Quick Actions
        </CardTitle>
        <CardDescription>Common tasks and actions</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {actions.map((action, index) => (
            <div key={index} className={`flex flex-col items-center text-center gap-2 p-4 rounded-lg ${getHoverColor(action.color)} transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md cursor-pointer`}>
              <div className={`p-3 rounded-full ${action.color}`}>
                <action.icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium">{action.title}</h3>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}