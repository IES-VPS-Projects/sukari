"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { useSignupData } from "@/hooks/use-signup-data"
import { useVerifyOTP } from "@/hooks/use-verify-otp"
import { useResendOTP } from "@/hooks/use-resend-otp"
import toast, { Toaster } from 'react-hot-toast'

export default function OTPSubmission() {
  const [otp, setOtp] = useState(["", "", "", "","",""])
  const [error, setError] = useState("")
  const [resendTimer, setResendTimer] = useState(27)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  
  const { getIPRSData, getVerificationData, getAuthenticationData, getUserCreationResponse, isLoading, getUserCreationData } = useSignupData()
  const verifyOTPMutation = useVerifyOTP()
  const resendOTPMutation = useResendOTP()
  
  const iprsData = getIPRSData()
  const verificationData = getVerificationData()
  const authenticationData = getAuthenticationData()
  const userCreationResponse = getUserCreationResponse()
  const userCreationData = getUserCreationData()

  useEffect(() => {
    if (isLoading) {
      return
    }
    
    if (!iprsData || !verificationData || !authenticationData || !userCreationResponse) {
      console.log('Missing required data, redirecting to verification')
      // router.push("/signup/verification")
      return
    }

    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [iprsData, verificationData, authenticationData, userCreationResponse, router, isLoading])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Clear error when user starts typing
    if (error) {
      setError("")
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
      setError("Please enter the complete OTP")
      return
    }

    setError("")

    try {
      const userId = (userCreationData as any)?.data?.id || userCreationResponse?.userId;
      if (!userId) {
        setError('User ID not found. Please try again.');
        return;
      }
      
      const verifyData = {
        userId: userId,
        code: otpValue,
        type: 'EMAIL' as 'EMAIL' | 'SMS' // Default to EMAIL for now
      };
      
      await verifyOTPMutation.mutateAsync(verifyData)
      
      // Show success message briefly
      setShowSuccessMessage(true)
      
      setTimeout(() => {
        router.push("/signup/otp-submission-company/create-password-company")
      }, 1500)
    } catch (error) {
      console.error("Error verifying OTP:", error)
      // Error is already handled by the mutation hook
    }
  }

  const handleBack = () => {
    router.push("/signup/otp-verification")
  }

  const handleResend = async () => {
    try {
      const userId = userCreationResponse?.data?.id || userCreationResponse?.userId;
      if (!userId) {
        toast.error('User ID not found. Please try again.');
        return;
      }
      
      const resendData = {
        userId: userId,
        type: 'EMAIL' as 'EMAIL' | 'SMS' // Default to EMAIL for now
      };
      
      await resendOTPMutation.mutateAsync(resendData);
      
      // Reset OTP input and timer
      setResendTimer(27)
      setOtp(["", "", "", "", "", ""])
      setError("")

      // Restart timer
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error) {
      console.error("Error resending OTP:", error)
      // Error is already handled by the mutation hook
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getContactInfo = () => {
    if (!authenticationData) return "your contact"
    
    // For now, we'll use email as default since we don't have otpMethod stored
    const email = authenticationData.email;
    const phone = authenticationData.telephone;
    
    if (email) {
      return email;
    } else if (phone) {
      // Format phone number to mask middle digits
      if (phone.startsWith("+254")) {
        return phone.replace(/(\+254)(\d{3})(\d{3})(\d{3})/, "$1$2***$4")
      } else if (phone.startsWith("254")) {
        return phone.replace(/(254)(\d{3})(\d{3})(\d{3})/, "$1$2***$4")
      } else if (phone.startsWith("07") || phone.startsWith("01")) {
        return phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1***$3")
      }
      return phone
    }
    
    return "your contact"
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-20 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
          <CheckCircle className="h-6 w-6" />
          <span className="font-medium">OTP Verified Successfully!</span>
        </div>
      )}

      {/* Show loading state while data is being loaded */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">OTP Submission</h2>
            <p className="mt-2 text-gray-600">Enter OTP sent to {getContactInfo()}</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* OTP Input */}
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    digit ? "border-green-500 bg-green-50" : "border-gray-300"
                  } ${error ? "border-red-500" : ""}`}
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
              ))}
            </div>

            {error && (
              <div className="text-center">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={verifyOTPMutation.isPending || otp.join("").length !== 6}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {verifyOTPMutation.isPending ? "Verifying..." : "Verify"}
              </button>
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              {resendTimer > 0 ? (
                <p className="text-sm text-gray-600">{"Didn't receive OTP? Resend in " + formatTime(resendTimer)}</p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  {"Didn't receive OTP? Resend"}
                </button>
              )}
            </div>
          </form>
        </div>
        </div>
      )}
    </div>
  )
}
