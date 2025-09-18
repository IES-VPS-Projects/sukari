"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Ship, ArrowRight } from "lucide-react"

import { importsData } from "../data/imports-data"

// Use imports data
const recentImports = importsData

interface RecentImportsCardProps {
  onViewAllClick: () => void
  onImportClick: (importId: string) => void
}

export function RecentImportsCard({ onViewAllClick, onImportClick }: RecentImportsCardProps) {
  return (
    <Card 
      className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all h-[300px] flex flex-col cursor-pointer w-full"
      onClick={onViewAllClick}
    >
      <CardHeader className="bg-muted/20 pl-10">
        <CardTitle className="flex items-center gap-2">
          <Ship className="h-5 w-5" />
          Imports
        </CardTitle>
        <CardDescription>View latest imports and cargo tracking</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 flex-grow">
      </CardContent>
      <CardFooter 
        className="bg-muted/30 py-3 hover:bg-muted/50 transition-colors group mt-auto"
      >
        <Button variant="ghost" size="sm" className="w-full flex items-center justify-center group-hover:bg-transparent">
          Open Imports
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardFooter>
    </Card>
  )
}