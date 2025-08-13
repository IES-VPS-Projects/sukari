"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Check, ArrowLeft } from "lucide-react"
import { useSignupData } from "@/hooks/use-signup-data"
import { useCreatePIN } from "@/hooks/use-pin"
import toast, { Toaster } from 'react-hot-toast'

export default function CreatePassword() {
  const [formData, setFormData] = useState({
    pin: "",
    confirmPin: "",
  })
  const [showPin, setShowPin] = useState(false)
  const [showConfirmPin, setShowConfirmPin] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  
  const { getIPRSData, getVerificationData, getAuthenticationData, getUserCreationResponse, updateSignupData, clearSignupData, isLoading } = useSignupData()
  const createPINMutation = useCreatePIN()
  
  const iprsData = getIPRSData()
  const verificationData = getVerificationData()
  const authenticationData = getAuthenticationData()
  const userCreationResponse = getUserCreationResponse()

  useEffect(() => {
    if (isLoading) {
      return
    }
    
    if (!iprsData || !verificationData || !authenticationData || !userCreationResponse) {
      console.log('Missing required data, redirecting to verification')
      router.push("/signup/verification")
      return
    }
  }, [iprsData, verificationData, authenticationData, userCreationResponse, router, isLoading])

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

    setError("")

    try {
      const userId = userCreationResponse?.data?.id || userCreationResponse?.userId;
      if (!userId) {
        setError('User ID not found. Please try again.');
        return;
      }
      
      const pinData = {
        userId: userId,
        pin: formData.pin
      };
      
      // Create PIN via API
      await createPINMutation.mutateAsync(pinData);
      
      // Update signup data with PIN
      updateSignupData({ 
        pinData: { 
          pin: formData.pin,
          confirmPin: formData.confirmPin 
        } 
      })

      // Show success message
      toast.success('Account created successfully!')

      // Complete signup and clear data
      clearSignupData()
      router.push("/login?signup=success")
    } catch (error) {
      console.error("Error completing signup:", error)
      // Error is already handled by the mutation hook
    }
  }

  const handleBack = () => {
    router.push("/signup/otp-submission")
  }

  // Show loading state while data is being loaded
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
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

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create PIN</h2>
            <p className="mt-2 text-gray-600">
              Create a 4-digit PIN to secure your account.
            </p>
          </div>

          {/* User Summary 
          {verificationData && authenticationData && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-center">
                <h3 className="text-sm font-medium text-green-800 mb-2">Account Summary</h3>
                <p className="text-sm text-green-700">
                  {verificationData.fullName} • {authenticationData.email}
                </p>
                
              </div>
            </div>
          )}*/}

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
                className="flex items-center space-x-2 flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={!allRequirementsMet() || formData.pin !== formData.confirmPin || createPINMutation.isPending}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createPINMutation.isPending ? "Creating PIN..." : "Complete Signup"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
