"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface CompanyFormData {
  lrNumber: string
  postalAddress: string
  postalCode: string
  companyRegNumber: string
  pinNumber: string
  phoneNumber: string
  emailAddress: string
  county: string
  subcounty: string
  ward: string
  location: string
  buildingName: string
  streetName: string
  town: string
  establishmentDate: string
  legalStatus: string
}

interface CompanyFormProps {
  initialData?: Partial<CompanyFormData>
  onSubmit?: (data: CompanyFormData) => void
  onCancel?: () => void
  isSubmitting?: boolean
}

export default function CompanyForm({ 
  initialData = {}, 
  onSubmit, 
  onCancel, 
  isSubmitting = false 
}: Readonly<CompanyFormProps>) {
  const [formData, setFormData] = useState<CompanyFormData>({
    lrNumber: '',
    postalAddress: '',
    postalCode: '',
    companyRegNumber: '',
    pinNumber: '',
    phoneNumber: '',
    emailAddress: '',
    county: '',
    subcounty: '',
    ward: '',
    location: '',
    buildingName: '',
    streetName: '',
    town: '',
    establishmentDate: '',
    legalStatus: '',
    ...initialData
  })

  const handleInputChange = (fieldName: keyof CompanyFormData, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Company Form</h1>
       <div>
          <h3 className="text-lg font-semibold mb-4">Company Info</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="lrNumber">L.R No/Plot No <span className="text-red-500">*</span></Label>
              <Input
                id="lrNumber"
                value={formData.lrNumber}
                onChange={(e) => handleInputChange('lrNumber', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="postalAddress">Postal Address <span className="text-red-500">*</span></Label>
              <Input
                id="postalAddress"
                value={formData.postalAddress}
                onChange={(e) => handleInputChange('postalAddress', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code <span className="text-red-500">*</span></Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="companyRegNumber">Company Registration Number <span className="text-red-500">*</span></Label>
              <Input
                id="companyRegNumber"
                value={formData.companyRegNumber}
                onChange={(e) => handleInputChange('companyRegNumber', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="pinNumber">PIN Number <span className="text-red-500">*</span></Label>
              <Input
                id="pinNumber"
                value={formData.pinNumber}
                onChange={(e) => handleInputChange('pinNumber', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number <span className="text-red-500">*</span></Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="emailAddress">Email Address <span className="text-red-500">*</span></Label>
              <Input
                id="emailAddress"
                type="email"
                value={formData.emailAddress}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="county">County <span className="text-red-500">*</span></Label>
              <Input
                id="county"
                value={formData.county}
                onChange={(e) => handleInputChange('county', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="subcounty">Sub-County <span className="text-red-500">*</span></Label>
              <Input
                id="subcounty"
                value={formData.subcounty}
                onChange={(e) => handleInputChange('subcounty', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="ward">Ward <span className="text-red-500">*</span></Label>
              <Input
                id="ward"
                value={formData.ward}
                onChange={(e) => handleInputChange('ward', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="buildingName">Building Name <span className="text-red-500">*</span></Label>
              <Input
                id="buildingName"
                value={formData.buildingName}
                onChange={(e) => handleInputChange('buildingName', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="streetName">Street Name <span className="text-red-500">*</span></Label>
              <Input
                id="streetName"
                value={formData.streetName}
                onChange={(e) => handleInputChange('streetName', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="town">Town <span className="text-red-500">*</span></Label>
              <Input
                id="town"
                value={formData.town}
                onChange={(e) => handleInputChange('town', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="establishmentDate">Establishment Date <span className="text-red-500">*</span></Label>
              <Input
                id="establishmentDate"
                type="date"
                value={formData.establishmentDate}
                onChange={(e) => handleInputChange('establishmentDate', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="legalStatus">Legal Status <span className="text-red-500">*</span></Label>
              <Input
                id="legalStatus"
                value={formData.legalStatus}
                onChange={(e) => handleInputChange('legalStatus', e.target.value)}
                required
              />
            </div>
          </div>
        </div>

         
    </div>
  )
}