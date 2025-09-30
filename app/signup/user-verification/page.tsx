"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, User, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import SignupHeader from "@/app/signup/components/SignupHeader"
import ProgressBar from "@/app/signup/components/ProgressBar"

export default function UserVerificationStep() {
  const [searchValue, setSearchValue] = useState("")
  const [searchLoading, setSearchLoading] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [error, setError] = useState("")
  const [userFormData, setUserFormData] = useState<any>({})
  const [otpSent, setOtpSent] = useState(false)
  const router = useRouter()

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

  const handleSearch = async () => {
    if (!searchValue.trim()) return

    setSearchLoading(true)
    setError("")
    setVerificationResult(null)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate IPRS verification
      if (searchValue.length >= 8) {
        const userData = {
          idNumber: searchValue,
          fullName: "Jonah Kariuki",
          gender: "Male",
          dateOfBirth: "1985-03-15",
          designation: "",
          phoneNumber: ""
        }
        setVerificationResult({
          verified: true,
          data: userData
        })
        setUserFormData(userData)
      } else {
        setError("Please enter a valid National ID number")
      }
    } catch (err) {
      setError("Verification failed. Please try again.")
    } finally {
      setSearchLoading(false)
    }
  }

  const handleFormChange = (field: string, value: string) => {
    setUserFormData((prev: any) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSendOtp = async () => {
    if (!isFormValid) return

    setOtpLoading(true)
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1500))
      setOtpSent(true)
      
      // Update signup data with user verification results
      const existingData = JSON.parse(localStorage.getItem("signupData") || "{}")
      const updatedData = {
        ...existingData,
        userVerificationData: userFormData,
        otpPhone: userFormData.phoneNumber
      }
      localStorage.setItem("signupData", JSON.stringify(updatedData))
      
      // Navigate to OTP verification (skip OTP submission for company flow)
      setTimeout(() => {
        router.push("/signup/otp-verification")
      }, 1000)
    } catch (error) {
      setError("Failed to send OTP. Please try again.")
    } finally {
      setOtpLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/signup/verification")
  }

  const isFormValid = verificationResult?.verified && userFormData.designation && userFormData.phoneNumber

  return (
    <div className="min-h-screen bg-gray-50">
      <SignupHeader />
      <ProgressBar currentStep={3} />

      <div className="flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Verify Your Identity</h2>
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
              {verificationResult && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5" />
                    <span>Identity verification successful!</span>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={userFormData.fullName || ""}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                        <input
                          type="text"
                          value={userFormData.idNumber || ""}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <input
                          type="text"
                          value={userFormData.gender || ""}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input
                          type="text"
                          value={userFormData.dateOfBirth || ""}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                        <select
                          value={userFormData.designation || ""}
                          onChange={(e) => handleFormChange("designation", e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            !userFormData.designation?.trim() 
                              ? 'border-red-500' 
                              : 'border-gray-300'
                          }`}
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={userFormData.phoneNumber || ""}
                          onChange={(e) => handleFormChange("phoneNumber", e.target.value)}
                          placeholder="Enter your phone number"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            !userFormData.phoneNumber?.trim() 
                              ? 'border-red-500' 
                              : 'border-gray-300'
                          }`}
                          required
                        />
                      </div>
                    </div>
                  </div>
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
                onClick={handleSendOtp}
                disabled={!isFormValid || otpLoading || otpSent}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {otpLoading ? "Sending OTP..." : otpSent ? "OTP Sent!" : "Send OTP"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
