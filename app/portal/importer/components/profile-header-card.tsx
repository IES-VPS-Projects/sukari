"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileHeaderCardProps {
  firstName: string
  lastName: string
  role: string
  company: string
  licenseNumber: string
  complianceLevel: string
}

export function ProfileHeaderCard({
  firstName,
  lastName,
  role,
  company,
  licenseNumber,
  complianceLevel
}: ProfileHeaderCardProps) {
  return (
    <div className="flex justify-end">
      <Card className="rounded-[20px] shadow-lg border-0 bg-white p-4 sm:p-6 w-[824px]">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
              <AvatarImage src="/images/sunshine_sugar.png" alt="Company Logo" />
              <AvatarFallback className="text-lg sm:text-xl bg-blue-100 text-blue-800">
                SS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold">
                Sunshine Sugar Imports Ltd
              </h2>
              <p className="text-gray-600 mt-1">{firstName} {lastName}</p>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <p className="text-xs sm:text-sm text-gray-600">License Number</p>
              <p className="font-semibold text-sm sm:text-base">{licenseNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
