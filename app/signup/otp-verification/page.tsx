"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mail, Phone } from "lucide-react"
import SignupHeader from "@/components/signup/SignupHeader"
import ProgressBar from "@/components/signup/ProgressBar"

export default function OTPVerification() {
  const [selectedMethod, setSelectedMethod] = useState("")
  const [loading, setLoading] = useState(false)
  const [signupData, setSignupData] = useState<any>({})
  const router = useRouter()

  useEffect(() => {
    // Get signup data
    const data = localStorage.getItem("signupData")
    if (!data) {
      router.push("/signup/user-type")
      return
    }
    setSignupData(JSON.parse(data))
  }, [router])

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedMethod) {
      return
    }

    setLoading(true)

    try {
      // Update signup data with selected OTP method
      const updatedData = {
        ...signupData,
        otpMethod: selectedMethod,
      }
      localStorage.setItem("signupData", JSON.stringify(updatedData))

      // Simulate OTP sending
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Navigate to OTP submission
      router.push("/signup/otp-submission")
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/signup/authentication")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SignupHeader />
      <ProgressBar currentStep={4} totalSteps={5} />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">OTP Verification</h2>
            <p className="mt-2 text-gray-600">Choose how you'd like to receive your verification code</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                  <p className="text-sm text-gray-600">Send OTP to {signupData.email}</p>
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
                  <p className="text-sm text-gray-600">Send OTP to {signupData.phone}</p>
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
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!selectedMethod || loading}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
