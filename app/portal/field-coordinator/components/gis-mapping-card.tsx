"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface GISMappingCardProps {
  onViewClick: () => void
}

export function GISMappingCard({ onViewClick }: GISMappingCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white h-[350px] flex flex-col justify-center"
      onClick={onViewClick}
    >
      <div className="flex flex-col h-full justify-center px-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-blue-100">
            <MapPin className="h-6 w-6 text-blue-700" />
          </div>
          <span className="text-lg font-bold text-gray-900">GIS Field Mapping</span>
        </div>
        <p className="text-gray-500 text-base font-normal">View and manage your assigned farms for GIS mapping activities</p>
      </div>
    </Card>
  )
}