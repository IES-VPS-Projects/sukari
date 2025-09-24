"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useAuth } from "../auth-provider"

interface CompanyFormData {
    companyName: string
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
    onChange?: (data: CompanyFormData) => void
    onCancel?: () => void
    isSubmitting?: boolean
    errors?: Record<string, string>
}

export default function CompanyForm({
    initialData = {},
    onChange,
    onCancel,
    isSubmitting = false,
    errors = {}
}: Readonly<CompanyFormProps>) {

    const auth = useAuth()

    console.log(auth, "auth");



    const [formData, setFormData] = useState<CompanyFormData>({
        companyName: '',
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
        const newData = { ...formData, [fieldName]: value }
        setFormData(newData)
        if (onChange) {
            onChange(newData)
        }
    }

    return (
        <div>
            {/* Show company data in a card */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Company Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <Label className="text-sm font-medium text-gray-600">Company Name</Label>
                            <p className="text-sm font-semibold">
                                {(auth.user?.entityData as any).businessId?.legal_name || formData.companyName || 'Not provided'}
                            </p>
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-600">Registration Number</Label>
                            <p className="text-sm font-semibold">
                                {(auth.user?.entityData as any).businessId?.registration_number || formData.companyRegNumber || 'Not provided'}
                            </p>
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-600">Email Address</Label>
                            <p className="text-sm font-semibold">
                                {(auth.user?.entityData as any).businessId?.email || formData.emailAddress || 'Not provided'}
                            </p>
                        </div> 
                    </div>
                </CardContent>
            </Card>



        </div>
    )
}