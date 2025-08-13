"use client"

import React, { useState, useEffect } from "react"
import { Search, User, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import { useIPRSVerification, formatIPRSData } from "@/hooks/use-iprs"

export default function VerifyIdentityPage() {
  const [searchValue, setSearchValue] = useState("")
  const [shouldVerify, setShouldVerify] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [error, setError] = useState("")

  // React Query hook for IPRS verification
  const {
    data: iprsData,
    isLoading: iprsLoading,
    error: iprsError,
  } = useIPRSVerification(searchValue, shouldVerify)

  // Handle IPRS verification results
  useEffect(() => {
    if (iprsData) {
      const formattedData = formatIPRSData(iprsData)
      setVerificationResult({
        verified: formattedData.verified,
        data: formattedData
      })
      setError("")
    }
  }, [iprsData])

  // Handle IPRS errors
  useEffect(() => {
    if (iprsError) {
      setError(iprsError.message || "Verification failed. Please try again.")
      setVerificationResult(null)
    }
  }, [iprsError])

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

    // Validate National ID format (8 digits)
    const idNumberRegex = /^\d{8}$/
    if (!idNumberRegex.test(searchValue)) {
      setError("Please enter a valid 8-digit National ID number")
      return
    }

    // Trigger React Query to fetch IPRS data
    setShouldVerify(true)
  }

  const handleBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
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
          <div className="space-y-6">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                National ID Number
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Enter your National ID"
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={iprsLoading || !searchValue.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {iprsLoading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Enter your 8-digit National ID number to verify your identity through IPRS
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            {/* Loading Message for IPRS */}
            {iprsLoading && (
              <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 p-3 rounded-lg">
                <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <span>Verifying your identity through IPRS...</span>
              </div>
            )}

            {/* Verification Result */}
            {verificationResult && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="h-5 w-5" />
                  <span>Verification successful!</span>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Personal Information</h3>
                  
                                     <div className="grid grid-cols-1 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  )
}
