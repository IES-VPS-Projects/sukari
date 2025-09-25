"use client"

import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface GISMappingCardProps {
  onViewClick: () => void
}

export function GISMappingCard({ onViewClick }: GISMappingCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white h-[350px]"
      onClick={onViewClick}
    >
      <div className="px-6 py-6">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-5 w-5 text-gray-900" />
          <span className="text-lg font-bold text-gray-900">GIS Field Mapping</span>
        </div>
        <p className="text-gray-500 text-sm">View and manage your assigned farms for GIS mapping activities</p>
      </div>
    </Card>
  )
}