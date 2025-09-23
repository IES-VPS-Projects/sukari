"use client"

import { Badge } from "@/components/ui/badge"
import { useLicenseFieldsByLicense } from "@/hooks/use-license-fields"

interface LicenseFormStatusProps {
  licenseId: string
}

export function LicenseFormStatus({ licenseId }: LicenseFormStatusProps) {
  const { data: fieldsData, isLoading } = useLicenseFieldsByLicense(licenseId)
  
  const fieldsCount = fieldsData?.data?.length || 0
  
  if (isLoading) {
    return (
      <div className="text-center">
        <div className="font-medium">-</div>
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    )
  }
  
  return (
    <div className="text-center">
      <div className="font-medium">{fieldsCount}</div>
      <div className="text-sm text-gray-500">Fields</div>
      {fieldsCount > 0 ? (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
          Form Created
        </Badge>
      ) : (
        <div className="text-xs text-blue-600">No Form</div>
      )}
    </div>
  )
}
