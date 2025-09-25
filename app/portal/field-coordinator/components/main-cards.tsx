"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// This file is kept for reference but components have been moved to individual files:
// - GIS Mapping Card is now in gis-mapping-card.tsx
// - Inspections Card is now in inspections-card.tsx

interface MainCardProps {
  title: string
  icon: React.ReactNode
  description: string
  onClick: () => void
}

export function MainCard({ title, icon, description, onClick }: MainCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-primary font-medium">
            Click to view details
          </div>
        </div>
      </CardContent>
    </Card>
  )
}