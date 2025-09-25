"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Check } from "lucide-react"
import SignupHeader from "@/components/signup/SignupHeader"
import ProgressBar from "@/components/signup/ProgressBar"

export default function CreatePassword() {
  const [formData, setFormData] = useState({
    pin: "",
    confirmPin: "",
  })
  const [showPin, setShowPin] = useState(false)
  const [showConfirmPin, setShowConfirmPin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentStep, setCurrentStep] = useState(5)
  const router = useRouter()

  useEffect(() => {
    // Check if user has completed previous steps
    const signupData = localStorage.getItem("signupData")
    if (!signupData) {
      router.push("/signup/user-type")
      return
    }
    
    const parsedData = JSON.parse(signupData)
    setCurrentStep(parsedData.currentStep || 5)
  }, [router])

  const pinRequirements = [
    { id: "length", text: "Exactly 4 digits", test: (pin: string) => pin.length === 4 },
    { id: "numbers", text: "Only numbers (0-9)", test: (pin: string) => /^\d+$/.test(pin) && pin.length > 0 },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Only allow numeric input and limit to 4 digits
    if (/^\d*$/.test(value) && value.length <= 4) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    if (error) {
      setError("")
    }
  }

  const isRequirementMet = (requirement: { test: (pin: string) => boolean }) => {
    return requirement.test(formData.pin)
  }

  const allRequirementsMet = () => {
    return pinRequirements.every((req) => isRequirementMet(req))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!allRequirementsMet()) {
      setError("Please meet all PIN requirements")
      return
    }

    if (formData.pin !== formData.confirmPin) {
      setError("PINs do not match")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Update signup data with PIN
      const existingData = JSON.parse(localStorage.getItem("signupData") || "{}")
      const updatedData = {
        ...existingData,
        pin: formData.pin,
      }
      localStorage.setItem("signupData", JSON.stringify(updatedData))

      // Simulate account creation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Complete signup and clear data
      localStorage.removeItem("signupData")
      router.push("/login?signup=success")
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/signup/otp-submission")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SignupHeader />
      <ProgressBar currentStep={currentStep} totalSteps={6} />

      <div className="flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create PIN</h2>
          </div>

          {/* PIN Requirements */}
          <div className="space-y-2">
            {pinRequirements.map((requirement) => (
              <div key={requirement.id} className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    isRequirementMet(requirement) ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  {isRequirementMet(requirement) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${isRequirementMet(requirement) ? "text-green-600" : "text-gray-600"}`}>
                  {requirement.text}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* 4-Digit PIN Field */}
            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-green-700 mb-2">
                4-Digit PIN
              </label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  id="pin"
                  name="pin"
                  value={formData.pin}
                  onChange={handleInputChange}
                  placeholder="Enter 4 digits"
                  maxLength={4}
                  className="w-full pr-12 py-3 px-4 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPin ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm PIN Field */}
            <div>
              <label htmlFor="confirmPin" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm PIN
              </label>
              <div className="relative">
                <input
                  type={showConfirmPin ? "text" : "password"}
                  id="confirmPin"
                  name="confirmPin"
                  value={formData.confirmPin}
                  onChange={handleInputChange}
                  placeholder="Confirm 4 digits"
                  maxLength={4}
                  className="w-full pr-12 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPin(!showConfirmPin)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPin ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
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
                disabled={!allRequirementsMet() || formData.pin !== formData.confirmPin || loading}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Completing Signup..." : "Complete Signup"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
