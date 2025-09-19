"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, ArrowRight } from "lucide-react"

interface ProfileData {
  firstName: string
  lastName: string
  company: string
  location: string
  licenseNumber: string
  productionCapacity: string
}

interface CompanyProfileCardProps {
  profileData: ProfileData
  onViewProfileClick: () => void
}

export function CompanyProfileCard({ profileData, onViewProfileClick }: CompanyProfileCardProps) {
  return (
    <Card className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all">
      <CardHeader className="bg-muted/20">
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Company Profile
        </CardTitle>
        <CardDescription>Miller registration and company details</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-green-100 text-green-800">
              {profileData.firstName[0]}{profileData.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium">{profileData.company}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {profileData.location}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>License: {profileData.licenseNumber}</span>
              <span>•</span>
              <span>Capacity: {profileData.productionCapacity}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter 
        className="bg-muted/30 py-3 hover:bg-muted/50 transition-colors group cursor-pointer"
        onClick={onViewProfileClick}
      >
        <Button variant="ghost" size="sm" className="w-full flex items-center justify-center group-hover:bg-transparent">
          View Profile Details
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardFooter>
    </Card>
  )
}