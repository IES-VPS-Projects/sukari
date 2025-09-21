"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Building2, User, CheckCircle, AlertCircle, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"
import SignupHeader from "@/components/signup/SignupHeader"
import ProgressBar from "@/components/signup/ProgressBar"
import { useIPRSVerification, formatIPRSData } from "@/hooks/use-iprs"
import { useBRSVerification, formatBRSData } from "@/hooks/use-brs"
import { useVerificationContinue } from "@/hooks/use-verification-continue"

export default function VerificationStep() {
  const [userType, setUserType] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [shouldVerify, setShouldVerify] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [error, setError] = useState("")
  const [companyFormData, setCompanyFormData] = useState<any>({})
  const [expandedDirectors, setExpandedDirectors] = useState<{ [key: number]: boolean }>({})
  const router = useRouter()

  // React Query hook for IPRS verification
  const {
    data: iprsData,
    isLoading: iprsLoading,
    error: iprsError
  } = useIPRSVerification(searchValue, shouldVerify && userType === "individual")

  // React Query hook for BRS verification
  const {
    data: brsData,
    isLoading: brsLoading,
    error: brsError
  } = useBRSVerification(searchValue, shouldVerify && userType === "company")

  // React Query hook for continue submission
  const continueMutation = useVerificationContinue()

  useEffect(() => {
    // Get user type from localStorage
    const signupData = localStorage.getItem("signupData")
    if (!signupData) {
      router.push("/signup/user-type")
      return
    }
    
    const parsedData = JSON.parse(signupData)
    setUserType(parsedData.userType)
  }, [router])

  // Handle IPRS verification results
  useEffect(() => {
    if (iprsData && userType === "individual") {
      const formattedData = formatIPRSData(iprsData)
      setVerificationResult({
        verified: formattedData.verified,
        data: formattedData
      })
      setError("")
    }
  }, [iprsData, userType])

  // Handle BRS verification results
  useEffect(() => {
    if (brsData && userType === "company") {
      const formattedData = formatBRSData(brsData)
      localStorage.setItem("brsData", JSON.stringify({
        ...formattedData,
        brsData: formattedData
      }))
      setVerificationResult({
        verified: formattedData.verified,
        data: formattedData
      })
      setCompanyFormData(formattedData)
      setError("")
    }
  }, [brsData, userType])

  // Handle IPRS errors
  useEffect(() => {
    if (iprsError && userType === "individual") {
      setError(iprsError.message || "Verification failed. Please try again.")
      setVerificationResult(null)
    }
  }, [iprsError, userType])

  // Handle BRS errors
  useEffect(() => {
    if (brsError && userType === "company") {
      setError(brsError.message || "Verification failed. Please try again.")
      setVerificationResult(null)
    }
  }, [brsError, userType])

  // Reset verification state when search value changes
  useEffect(() => {
    setShouldVerify(false)
    setVerificationResult(null)
    setError("")
  }, [searchValue])

  const handleSearch = () => {
    if (!searchValue.trim()) return

    setError("")
    setVerificationResult(null)

    if (userType === "individual") {
      // Validate National ID format (8 digits)
      const idNumberRegex = /^\d{8}$/
      if (!idNumberRegex.test(searchValue)) {
        setError("Please enter a valid 8-digit National ID number")
        return
      }

      // Trigger React Query to fetch IPRS data
      setShouldVerify(true)
    } else {
      // Validate Company Registration Number format (like SB-20241112-987)
      // const registrationRegex = /^[A-Z]{2}-\d{8}-\d{3}$/
      // if (!registrationRegex.test(searchValue)) {
      //   setError("Please enter a valid Company Registration Number (format: XX-YYYYMMDD-XXX)")
      //   return
      // }

      // Trigger React Query to fetch BRS data
      setShouldVerify(true)
    }
  }

  const handleContinue = async () => {
    if (verificationResult?.verified) {
      setError("")
      
      // Prepare the data to send
      const continueData = {
        userType: userType,
        designation: companyFormData.designation,
        phoneNumber: companyFormData.phoneNumber,
        ...(userType === "individual" 
          ? { iprs_id: verificationResult.data.id } // IPRS record ID for individuals
          : { brs_id: verificationResult.data.id }  // BRS record ID for companies
        )
      }

      console.log('Sending continue data:', continueData)

      try {
        // Use React Query mutation
        const result = await continueMutation.mutateAsync(continueData)
        console.log('Continue response:', result)

        // Store comprehensive data for next page
        const existingData = JSON.parse(localStorage.getItem("signupData") || "{}")
        
        let verificationData: any = {
          userType: userType,
          designation: companyFormData.designation,
          phoneNumber: companyFormData.phoneNumber,
        }

        if (userType === "individual") {
          // Store IPRS data for user updates
          const iprsData = {
            id: verificationResult.data.id,
            id_no: verificationResult.data.id_no,
            first_name: verificationResult.data.first_name,
            middle_name: verificationResult.data.middle_name,
            last_name: verificationResult.data.last_name,
            nationality: verificationResult.data.nationality,
            gender: verificationResult.data.gender,
            county_of_birth: verificationResult.data.county_of_birth,
            date_of_birth: verificationResult.data.date_of_birth,
            email_address: verificationResult.data.email_address,
            phone_no: verificationResult.data.phone_no,
            current_county: verificationResult.data.current_county,
            current_sub_county: verificationResult.data.current_sub_county,
            mug_shot: verificationResult.data.mug_shot,
            createdAt: verificationResult.data.createdAt,
            updatedAt: verificationResult.data.updatedAt
          }
          
          verificationData = {
            ...verificationData,
            iprs_id: verificationResult.data.id,
            // Include formatted data for display
            fullName: verificationResult.data.fullName,
            formattedDateOfBirth: verificationResult.data.dateOfBirth,
            formattedGender: verificationResult.data.gender,
            nationality: verificationResult.data.nationality,
            countyOfBirth: verificationResult.data.countyOfBirth
          }

          existingData.iprsData = iprsData
        } else {
          // Store BRS data for company updates
          const brsData = {
            id: verificationResult.data.id,
            registrationNumber: verificationResult.data.registrationNumber,
            companyName: verificationResult.data.companyName,
            establishmentDate: verificationResult.data.establishmentDate,
            status: verificationResult.data.status,
            businessType: verificationResult.data.businessType,
            taxId: verificationResult.data.taxId,
            companyEmail: verificationResult.data.companyEmail,
            industry: verificationResult.data.industry,
            numberOfEmployees: verificationResult.data.numberOfEmployees,
            postalAddress: verificationResult.data.postalAddress,
            buildingName: verificationResult.data.buildingName,
            streetName: verificationResult.data.streetName,
            plotNumber: verificationResult.data.plotNumber,
            county: verificationResult.data.county,
            subCounty: verificationResult.data.subCounty,
            location: verificationResult.data.location,
            ward: verificationResult.data.ward,
            directors: verificationResult.data.directors,
            createdAt: verificationResult.data.createdAt,
            updatedAt: verificationResult.data.updatedAt
          }
          
          verificationData = {
            ...verificationData,
            brs_id: verificationResult.data.id,
            // Include formatted data for display
            companyName: verificationResult.data.companyName,
            registrationNumber: verificationResult.data.registrationNumber,
            establishmentDate: verificationResult.data.establishmentDate,
            businessType: verificationResult.data.businessType
          }

          existingData.brsData = brsData
        }
        
        const updatedData = {
          ...existingData,
          verificationData: verificationData, // Form data and formatted display data
          entityData: continueData, // Data sent to /api/entities
          entityResponse: result // Response from /api/entities
        }
        
        localStorage.setItem("signupData", JSON.stringify(updatedData))
        console.log('Stored data for next page:', updatedData)
        
        // Show success message briefly before navigation
        setError("")
        setVerificationResult((prev: any) => ({
          ...prev,
          submitted: true
        }))
        
        // Navigate to next step based on user type
        setTimeout(() => {
          if (userType === "company") {
            router.push("/signup/user-verification")
          } else {
            router.push("/signup/authentication")
          }
        }, 1000) // Brief delay to show success state
      } catch (error) {
        console.error('Error submitting entity data:', error)
        setError('Failed to submit entity data. Please try again.')
      }
    }
  }

  const handleCompanyFormChange = (field: string, value: string, directorIndex?: number) => {
    if (directorIndex !== undefined) {
      setCompanyFormData((prev: any) => ({
        ...prev,
        directors: prev.directors.map((director: any, index: number) =>
          index === directorIndex ? { ...director, [field]: value } : director
        )
      }))
    } else {
      setCompanyFormData((prev: any) => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const toggleDirector = (index: number) => {
    setExpandedDirectors(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleBack = () => {
    router.push("/signup/user-type")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SignupHeader />
      <ProgressBar currentStep={2} totalSteps={6} />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <div className="inline-flex p-3 rounded-full bg-green-100 mb-4">
              {userType === "individual" ? (
                <User className="h-8 w-8 text-green-600" />
              ) : (
                <Building2 className="h-8 w-8 text-green-600" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {userType === "individual" ? "Verify Your Identity" : "Verify Company Registration"}
            </h2>
            <p className="mt-2 text-gray-600">
              {userType === "individual" 
                ? "Enter your National ID number to verify your identity through IPRS"
                : "Enter your Company Registration Number to verify through BRS"
              }
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Search Section */}
            <div className="space-y-6">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  {userType === "individual" ? "National ID Number" : "Company Registration Number"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={userType === "individual" ? "Enter your National ID" : "Enter Company Registration Number"}
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    disabled={(iprsLoading || brsLoading) || !searchValue.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {(iprsLoading || brsLoading) ? (
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {userType === "individual" && (
                  <p className="mt-2 text-sm text-gray-500">
                    Enter your 8-digit National ID number to verify your identity through IPRS
                  </p>
                )}
                {userType === "company" && (
                  <p className="mt-2 text-sm text-gray-500">
                    Enter your Company Registration Number (format: XX-YYYYMMDD-XXX) to verify through BRS
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Loading Message for IPRS */}
              {iprsLoading && userType === "individual" && (
                <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 p-3 rounded-lg">
                  <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  <span>Verifying your identity through IPRS...</span>
                </div>
              )}

              {/* Loading Message for BRS */}
              {brsLoading && userType === "company" && (
                <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 p-3 rounded-lg">
                  <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  <span>Verifying company registration through BRS...</span>
                </div>
              )}

              {/* Success Message */}
              {verificationResult?.submitted && (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="h-5 w-5" />
                  <span>Data submitted successfully! Redirecting to next step...</span>
                </div>
              )}

              {/* Verification Result */}
              {verificationResult && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5" />
                    <span>Verification successful!</span>
                  </div>

                  {userType === "individual" ? (
                    // Individual Form
                    <div className="bg-white border rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Personal Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            value={verificationResult.data.fullName}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                          <input
                            type="text"
                            value={verificationResult.data.idNumber}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                          <input
                            type="text"
                            value={verificationResult.data.dateOfBirth}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                          <input
                            type="text"
                            value={verificationResult.data.gender}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                          <input
                            type="text"
                            value={verificationResult.data.nationality}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">County of Birth</label>
                          <input
                            type="text"
                            value={verificationResult.data.countyOfBirth || "Not specified"}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                          <select
                            value={companyFormData.designation || ""}
                            onChange={(e) => setCompanyFormData((prev: any) => ({ ...prev, designation: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                          >
                            <option value="">Select designation</option>
                            <option value="Farmer">Farmer</option>
                            <option value="AgroVet Retailer">AgroVet Retailer</option>
                            <option value="Field Extension Officer">Field Extension Officer</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            value={companyFormData.phoneNumber || ""}
                            onChange={(e) => setCompanyFormData((prev: any) => ({ ...prev, phoneNumber: e.target.value }))}
                            placeholder="Enter your phone number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Company Form
                    <div className="bg-white border rounded-lg p-6 space-y-8">
                      {/* Company Details Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Company Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <input
                              type="text"
                              value={companyFormData.companyName || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                            <input
                              type="text"
                              value={companyFormData.registrationNumber || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Establishment Date</label>
                            <input
                              type="text"
                              value={companyFormData.establishmentDate || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Type</label>
                            <input
                              type="text"
                              value={companyFormData.businessType || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">TAX ID Number</label>
                            <input
                              type="text"
                              value={companyFormData.taxId || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
                            <input
                              type="email"
                              value={companyFormData.companyEmail || ""}
                              onChange={(e) => handleCompanyFormChange("companyEmail", e.target.value)}
                              placeholder="Enter company email"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                            <select
                              value={companyFormData.industry || ""}
                              onChange={(e) => handleCompanyFormChange("industry", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <option value="">Select Industry</option>
                              <option value="sugar-miller">Sugar Miller</option>
                              <option value="sugar-dealer">Sugar Dealer</option>
                              <option value="molasses-dealer">Molasses Dealer</option>
                              <option value="sugar-importer">Sugar Importer</option>
                              <option value="sugar-exporter">Sugar Exporter</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
                            <select
                              value={companyFormData.numberOfEmployees || ""}
                              onChange={(e) => handleCompanyFormChange("numberOfEmployees", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <option value="">Select Range</option>
                              <option value="0-100">0-100</option>
                              <option value="100-500">100-500</option>
                              <option value="500-1000">500-1000</option>
                              <option value="1000-5000">1000-5000</option>
                              <option value="5000+">5000+</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Company Location Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Company Location</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Address</label>
                            <input
                              type="text"
                              value={companyFormData.postalAddress || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Building Name</label>
                            <input
                              type="text"
                              value={companyFormData.buildingName || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street Name</label>
                            <input
                              type="text"
                              value={companyFormData.streetName || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Plot Number</label>
                            <input
                              type="text"
                              value={companyFormData.plotNumber || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                            <input
                              type="text"
                              value={companyFormData.county || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sub County</label>
                            <input
                              type="text"
                              value={companyFormData.subCounty || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                              type="text"
                              value={companyFormData.location || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ward</label>
                            <input
                              type="text"
                              value={companyFormData.ward || ""}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Company Directors Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Company Directors</h3>
                        <div className="space-y-4">
                          {companyFormData.directors?.map((director: any, index: number) => (
                            <div key={index} className="border border-gray-200 rounded-lg">
                              <button
                                type="button"
                                onClick={() => toggleDirector(index)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                              >
                                <span className="font-medium text-gray-900">Director {index + 1}: {director.name}</span>
                                {expandedDirectors[index] ? (
                                  <ChevronUp className="h-5 w-5 text-gray-500" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-500" />
                                )}
                              </button>
                              {expandedDirectors[index] && (
                                <div className="p-4 border-t border-gray-200 bg-gray-50">
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                      <input
                                        type="text"
                                        value={director.name || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">ID/Passport Number</label>
                                      <input
                                        type="text"
                                        value={director.idNumber || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                                      <input
                                        type="text"
                                        value={director.nationality || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                      <input
                                        type="text"
                                        value={director.address || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                                      <input
                                        type="text"
                                        value={director.occupation || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                      <input
                                        type="text"
                                        value={director.gender || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                      <input
                                        type="text"
                                        value={director.dateOfBirth || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
                                      <input
                                        type="text"
                                        value={director.idType || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Shareholdings</label>
                                      <input
                                        type="text"
                                        value={director.shareholdings || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                      <input
                                        type="tel"
                                        value={director.phoneNumber || ""}
                                        onChange={(e) => handleCompanyFormChange("phoneNumber", e.target.value, index)}
                                        placeholder="Enter phone number"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                      <input
                                        type="email"
                                        value={director.email || ""}
                                        onChange={(e) => handleCompanyFormChange("email", e.target.value, index)}
                                        placeholder="Enter email address"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center space-x-2 flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <button
                onClick={handleContinue}
                disabled={
                  !verificationResult?.verified || 
                  (userType === "individual" && (!companyFormData.designation || !companyFormData.phoneNumber)) ||
                  continueMutation.isPending ||
                  verificationResult?.submitted
                }
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {continueMutation.isPending ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Submitting...
                  </>
                ) : verificationResult?.submitted ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Submitted
                  </>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
