"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface CompanyProfile {
  companyName?: string
  lrNumber?: string
  postalAddress?: string
  postalCode?: string
  companyRegNumber?: string
  pinNumber?: string
  phoneNumber?: string
  emailAddress?: string
  county?: string
  subcounty?: string
  ward?: string
  location?: string
  buildingName?: string
  streetName?: string
  town?: string
  establishmentDate?: string
  legalStatus?: string
}

interface CompanyFieldPopulatorProps {
  fieldName: string
  label: string
  required?: boolean
  description?: string
  value?: string
  userProfile?: CompanyProfile
  onPopulate: (companyData: Record<string, any>) => void
}

export function CompanyFieldPopulator({
  fieldName,
  label,
  required = false,
  description,
  value,
  userProfile,
  onPopulate
}: CompanyFieldPopulatorProps) {
  const handlePopulateFields = () => {
    if (!userProfile) return
    
    const companyData = {
      companyName: userProfile.companyName || '',
      lrNumber: userProfile.lrNumber || '',
      postalAddress: userProfile.postalAddress || '',
      postalCode: userProfile.postalCode || '',
      companyRegNumber: userProfile.companyRegNumber || '',
      pinNumber: userProfile.pinNumber || '',
      phoneNumber: userProfile.phoneNumber || '',
      emailAddress: userProfile.emailAddress || '',
      county: userProfile.county || '',
      subcounty: userProfile.subcounty || '',
      ward: userProfile.ward || '',
      location: userProfile.location || '',
      buildingName: userProfile.buildingName || '',
      streetName: userProfile.streetName || '',
      town: userProfile.town || '',
      establishmentDate: userProfile.establishmentDate || '',
      legalStatus: userProfile.legalStatus || ''
    }
    
    onPopulate(companyData)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={fieldName}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-sm text-gray-600 mb-2">Company information will be auto-populated from your profile</p>
        <div className="flex gap-2">
          <Input
            id={fieldName}
            value={value || userProfile?.companyName || 'Your Company Name'}
            disabled
            className="bg-gray-100 flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePopulateFields}
            disabled={!userProfile}
            className="whitespace-nowrap"
          >
            Populate Fields
          </Button>
        </div>
      </div>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  )
}
