"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Building, Calendar, Award, MapPin, Phone, Mail } from "lucide-react"

interface ServiceInfoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profileData: any
}

export function ServiceInfoModal({ open, onOpenChange, profileData }: ServiceInfoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Service Information</DialogTitle>
          <DialogDescription>
            Comprehensive service record and personal details
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Header */}
          <Card className="bg-gradient-to-r from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-green-600 text-white text-lg">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{profileData.firstName} {profileData.lastName}</h3>
                  <p className="text-green-700 font-medium">{profileData.role}</p>
                  <Badge className="mt-1 bg-green-600">{profileData.department}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span className="font-medium">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <span className="font-medium">{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Location:</span>
                  <span className="font-medium">{profileData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Employee ID:</span>
                  <span className="font-medium">{profileData.employeeId}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Service Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Position</span>
                  <p className="font-medium">{profileData.role}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Department</span>
                  <p className="font-medium">{profileData.department}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Join Date</span>
                  <p className="font-medium">{profileData.joinDate}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Years of Service</span>
                  <p className="font-medium">5+ years</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <span className="text-sm text-muted-foreground">Professional Bio</span>
                <p className="mt-1 text-sm leading-relaxed">{profileData.bio}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
