"use client"

import { Card } from "@/components/ui/card"
import { ClipboardCheck } from "lucide-react"

interface InspectionsCardProps {
  onViewClick: () => void
}

export function InspectionsCard({ onViewClick }: InspectionsCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white h-[350px]"
      onClick={onViewClick}
    >
      <div className="px-6 py-6">
        <div className="flex items-center gap-2 mb-2">
          <ClipboardCheck className="h-5 w-5 text-gray-900" />
          <span className="text-lg font-bold text-gray-900">Inspections</span>
        </div>
        <p className="text-gray-500 text-sm">Access and manage mill and importer inspection assignments</p>
      </div>
    </Card>
  )
}