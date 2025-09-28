"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mail, Phone, ArrowLeft, CheckCircle } from "lucide-react"
import { useSignupData } from "@/hooks/use-signup-data"
import { useSendOTP } from "@/hooks/use-send-otp"
import toast, { Toaster } from 'react-hot-toast'

export default function OTPVerification() {
  const [selectedMethod, setSelectedMethod] = useState("")
  const router = useRouter()
  
  const { 
    getIPRSData, 
    getVerificationData, 
    getAuthenticationData, 
    getUserCreationResponse,
    isLoading 
  } = useSignupData()
  
  const sendOTPMutation = useSendOTP()
  
  const iprsData = getIPRSData()
  const verificationData = getVerificationData()
  const authenticationData = getAuthenticationData()
  const userCreationResponse = getUserCreationResponse()

  useEffect(() => {
    // Wait for data to load before checking
    if (isLoading) {
      return
    }

    // Check if we have the required data from previous steps
    if (!iprsData || !verificationData || !authenticationData || !userCreationResponse) {
      console.log('Missing required data, redirecting to authentication')
      router.push("/signup/authentication")
      return
    }

    console.log('OTP Verification - Data available:', {
      iprsData: !!iprsData,
      verificationData: !!verificationData,
      authenticationData: !!authenticationData,
      userCreationResponse: !!userCreationResponse
    })
  }, [iprsData, verificationData, authenticationData, userCreationResponse, router, isLoading])

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedMethod) {
      toast.error('Please select a verification method')
      return
    }

    try {
      const userId = userCreationResponse.data?.id || userCreationResponse?.userId;
      if (!userId) {
        toast.error('User ID not found. Please try again.');
        return;
      }
      
      const otpData = {
        userId: userId,
        type: selectedMethod.toUpperCase() as 'EMAIL' | 'SMS'
      };
      
      console.log('Sending OTP via:', selectedMethod)
      console.log('OTP data:', otpData)

      await sendOTPMutation.mutateAsync(otpData)

      // Navigate to OTP submission
      router.push("/signup/otp-submission")
    } catch (error) {
      console.error("Error sending OTP:", error)
      // Error is already handled by the mutation hook
    }
  }

  const handleBack = () => {
    router.push("/signup/authentication")
  }

  // Show loading state while data is being loaded
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  // Show loading state if data is missing (will redirect after loading)
  if (!iprsData || !verificationData || !authenticationData || !userCreationResponse) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">OTP Verification</h2>
          <p className="mt-2 text-gray-600">Choose how you'd like to receive your verification code</p>
        </div>

        {/* Display User Info Summary */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">    {verificationData.fullName} 
            </span>
          </div>
           
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Option */}
            <div
              onClick={() => handleMethodSelect("email")}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedMethod === "email" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${selectedMethod === "email" ? "bg-green-600" : "bg-gray-400"}`}>
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-sm text-gray-600">Send OTP to {authenticationData.email}</p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    selectedMethod === "email" ? "border-green-500 bg-green-500" : "border-gray-300"
                  }`}
                >
                  {selectedMethod === "email" && <div className="w-full h-full rounded-full bg-white scale-50"></div>}
                </div>
              </div>
            </div>

            {/* SMS Option */}
            <div
              onClick={() => handleMethodSelect("sms")}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedMethod === "sms" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${selectedMethod === "sms" ? "bg-green-600" : "bg-gray-400"}`}>
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">SMS</h3>
                  <p className="text-sm text-gray-600">Send OTP to {authenticationData.telephone}</p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    selectedMethod === "sms" ? "border-green-500 bg-green-500" : "border-gray-300"
                  }`}
                >
                  {selectedMethod === "sms" && <div className="w-full h-full rounded-full bg-white scale-50"></div>}
                </div>
              </div>
            </div>
             

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center space-x-2 flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={!selectedMethod || sendOTPMutation.isPending}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sendOTPMutation.isPending ? "Sending OTP..." : "Send OTP s"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
