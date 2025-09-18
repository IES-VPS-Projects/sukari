"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import SignupHeader from "@/components/signup/SignupHeader"
import ProgressBar from "@/components/signup/ProgressBar"

export default function OTPSubmission() {
  const [otp, setOtp] = useState(["", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [resendTimer, setResendTimer] = useState(27)
  const [signupData, setSignupData] = useState<any>({})
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  useEffect(() => {
    // Get signup data
    const data = localStorage.getItem("signupData")
    if (!data) {
      router.push("/signup/user-type")
      return
    }
    setSignupData(JSON.parse(data))

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
  }, [router])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
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
    if (otpValue.length !== 4) {
      setError("Please enter the complete OTP")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Show success message briefly
      setShowSuccessMessage(true)
      
      setTimeout(() => {
        router.push("/signup/create-password")
      }, 1500)
    } catch (error) {
      setError("Invalid OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/signup/otp-verification")
  }

  const handleResend = () => {
    setResendTimer(27)
    setOtp(["", "", "", ""])
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
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getContactInfo = () => {
    if (signupData.otpMethod === "email") {
      return signupData.email || "your email"
    } else {
      const phone = signupData.otpPhone || signupData.userVerificationData?.phoneNumber
      if (!phone) return "your phone number"
      
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
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SignupHeader />
      <ProgressBar currentStep={4} totalSteps={5} />

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-20 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
          <CheckCircle className="h-6 w-6" />
          <span className="font-medium">OTP Verified Successfully!</span>
        </div>
      )}

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">OTP Submission</h2>
            <p className="mt-2 text-gray-600">Enter OTP sent to {getContactInfo()}</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* OTP Input */}
            <div className="flex justify-center space-x-4">
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
                  className={`w-16 h-16 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
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
                disabled={loading || otp.join("").length !== 4}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify"}
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
    </div>
  )
}
