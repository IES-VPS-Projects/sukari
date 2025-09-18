"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Phone, Mail, ArrowLeft } from "lucide-react"
import SignupHeader from "@/components/signup/SignupHeader"
import ProgressBar from "@/components/signup/ProgressBar"

export default function SignupAuthentication() {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has completed verification step
    const signupData = localStorage.getItem("signupData")
    if (!signupData) {
      router.push("/signup/user-type")
      return
    }
    
    const parsedData = JSON.parse(signupData)
    if (!parsedData.userType || !parsedData.verificationData) {
      router.push("/signup/user-type")
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else {
      const cleanedPhone = formData.phone.replace(/[^\d+]/g, "")
      const isValid =
        /^0[17]\d{8}$/.test(cleanedPhone) ||
        /^254[17]\d{8}$/.test(cleanedPhone) ||
        /^\+254[17]\d{8}$/.test(cleanedPhone)
      const isValidLength = cleanedPhone.length >= 10 && cleanedPhone.length <= 13

      if (!isValid || !isValidLength) {
        newErrors.phone = "Please enter a valid Kenyan phone number (e.g. 0712345678, 254712345678 or +254712345678)"
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Update signup data with phone and email
      const existingData = JSON.parse(localStorage.getItem("signupData") || "{}")
      const updatedData = {
        ...existingData,
        phone: formData.phone,
        email: formData.email
      }
      localStorage.setItem("signupData", JSON.stringify(updatedData))

      // Navigate to OTP verification
      router.push("/signup/otp-verification")
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/signup/verification")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SignupHeader />
      <ProgressBar currentStep={3} totalSteps={5} />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Authentication</h2>
            <p className="mt-2 text-gray-600">Enter your contact information for verification</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-green-700 mb-2">
                Telephone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-600" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your telephone no..."
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-600" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
