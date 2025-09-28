"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, User, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import SignupHeader from "@/components/signup/SignupHeader"
import ProgressBar from "@/components/signup/ProgressBar"
import { useIPRSVerification, formatIPRSData } from "@/hooks/use-iprs"
import { useCreateUserFromDirector } from "@/hooks/use-create-user-from-director"

export default function UserVerificationStep() {
  const [searchValue, setSearchValue] = useState("")
  const [otpLoading, setOtpLoading] = useState(false)
  const [error, setError] = useState("")
  const [userFormData, setUserFormData] = useState<any>({})
  const [otpSent, setOtpSent] = useState(false)
  const [shouldVerify, setShouldVerify] = useState(false)
  const router = useRouter()

  // Use IPRS verification hook
  const { 
    data: iprsResponse, 
    isLoading: searchLoading, 
    error: iprsError,
    refetch 
  } = useIPRSVerification(searchValue, shouldVerify)

  // Use create user from director hook
  const createUserMutation = useCreateUserFromDirector()

  useEffect(() => {
    // Check if user has completed company verification
    const signupData = localStorage.getItem("signupData")
    if (!signupData) {
      router.push("/signup/user-type")
      return
    }
    
    const parsedData = JSON.parse(signupData)
    if (!parsedData.userType || parsedData.userType !== "company" || !parsedData.verificationData) {
      router.push("/signup/user-type")
    }
  }, [router])

  // Handle IPRS verification response
  useEffect(() => {
    if (iprsResponse?.success) {
      const formattedData = formatIPRSData(iprsResponse)
      setUserFormData({
        idNumber: formattedData.idNumber,
        fullName: formattedData.fullName,
        gender: formattedData.gender,
        dateOfBirth: formattedData.dateOfBirth,
        designation: "",
        phoneNumber: ""
      })
      setError("")
    } else if (iprsError) {
      setError(iprsError.message || "Verification failed. Please try again.")
    }
  }, [iprsResponse, iprsError])

  const handleSearch = async () => {
    if (!searchValue.trim()) return

    // Validate ID number format
    if (searchValue.length !== 8) {
      setError("Please enter a valid 8-digit National ID number")
      return
    }

    setError("")
    setShouldVerify(true)
    
    // Trigger the IPRS verification
    refetch()
  }

  const handleFormChange = (field: string, value: string) => {
    setUserFormData((prev: any) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSendOtp = async () => {
    if (!isFormValid) return
    
    let brsData = localStorage.getItem("brsData")
    if (!brsData) {
      router.push("/signup/verification")
      return
    }

    try {
      setOtpLoading(true)
      setError("")

      // Parse BRS data
      const parsedBrsData = JSON.parse(brsData)
      const brsId = parsedBrsData.id
      
      console.log('Creating user from director with data:', {
        brsId,
        userFormData,
        parsedBrsData
      })

      // Extract director information from BRS data
      // Assuming the director data is in the BRS response
      const directorId = parsedBrsData.dir1_id_number || parsedBrsData.dir2_id_number || userFormData.idNumber
      const companyName = parsedBrsData.legal_name || 'Unknown Company'
console.log('userFormData', userFormData,iprsResponse);

      // Prepare user data for creation
      const userData = {
        brsId: brsId,
        directorId: directorId,
        email: userFormData.email,
        phoneNumber: userFormData.phoneNumber,
        firstName: userFormData.fullName?.split(' ')[0] || '',
        lastName: userFormData.fullName?.split(' ').slice(1).join(' ') || '',
        role: userFormData.designation || 'director',
        companyName: companyName,
        iprsID: iprsResponse.data.id || ""
      }

      // Create user from director using the hook
      const result = await createUserMutation.mutateAsync(userData)
      
      console.log('User created successfully:', result)
      setOtpSent(true)
      
      // Update signup data with user verification results
      const existingData = JSON.parse(localStorage.getItem("signupData") || "{}")
      const updatedData = {
        ...existingData,
        userVerificationData: userFormData,
        userCreationData: result,
        otpPhone: userFormData.phoneNumber,
        brsId: brsId
      }
      localStorage.setItem("signupData", JSON.stringify(updatedData))
      
      // Navigate to OTP submission
      setTimeout(() => {
        router.push("/signup/otp-submission-company")
      }, 1000)
      
    } catch (error) {
      console.error("Failed to create user from director:", error)
      setError(`${error}`)
    } finally {
      setOtpLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/signup/verification")
  }

  const isFormValid = iprsResponse?.success && userFormData.designation && userFormData.phoneNumber

  return (
    <div className="min-h-screen bg-gray-50">
      <SignupHeader />
      <ProgressBar currentStep={3} totalSteps={5} />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <div className="inline-flex p-3 rounded-full bg-green-100 mb-4">
              <User className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Verify Your Identity</h2>
            <p className="mt-2 text-gray-600">
              Enter your National ID number to verify your identity through IPRS
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Search Section */}
            <div className="space-y-6">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  National ID Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Enter your National ID"
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    disabled={searchLoading || !searchValue.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {searchLoading ? (
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Verification Result and Form */}
              {iprsResponse?.success && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5" />
                    <span>Identity verification successful!</span>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          id="fullName"
                          type="text"
                          value={userFormData.fullName || ""}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                        <input
                          id="idNumber"
                          type="text"
                          value={userFormData.idNumber || ""}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <input
                          id="gender"
                          type="text"
                          value={userFormData.gender || ""}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input
                          id="dateOfBirth"
                          type="text"
                          value={userFormData.dateOfBirth || ""}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                          Designation <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="designation"
                          value={userFormData.designation || ""}
                          onChange={(e) => handleFormChange("designation", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        >
                          <option value="">Select Designation</option>
                          <option value="director">Director</option>
                          <option value="ceo">CEO</option>
                          <option value="senior-manager">Senior Manager</option>
                          <option value="manager">Manager</option>
                          <option value="head-of-security">Head of Security</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="phoneNumber"
                          type="tel"
                          value={userFormData.phoneNumber || ""}
                          onChange={(e) => handleFormChange("phoneNumber", e.target.value)}
                          placeholder="Enter your phone number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div> 
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 my-4">
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={userFormData.email || ""}
                          onChange={(e) => handleFormChange("email", e.target.value)}
                          placeholder="Enter your email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Error Display */}
            {(error || createUserMutation.isError) && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <p className="text-sm text-red-600">
                      {error || createUserMutation.error?.message || 'An error occurred'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Success Display */}
            {createUserMutation.isSuccess && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div className="ml-3">
                    <p className="text-sm text-green-600">
                      User account created successfully! Redirecting...
                    </p>
                  </div>
                </div>
              </div>
            )}

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
                onClick={handleSendOtp}
                disabled={!isFormValid || otpLoading || createUserMutation.isPending || otpSent}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {(() => {
                  if (otpLoading || createUserMutation.isPending) return "Creating Account..." 
                  if (otpSent) return "Account Created!"
                  return "Next"
                })()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
