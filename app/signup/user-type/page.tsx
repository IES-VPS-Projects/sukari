"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Building2 } from "lucide-react"
import SignupHeader from "@/components/signup/SignupHeader"
import ProgressBar from "@/components/signup/ProgressBar"

const userTypes = [
  {
    id: "individual",
    name: "Individual",
    icon: User,
    description: "Personal account for individual farmers, traders, or professionals"
  },
  {
    id: "company",
    name: "Company",
    icon: Building2,
    description: "Business account for companies, organizations, or enterprises"
  }
]

export default function SelectUserType() {
  const [selectedType, setSelectedType] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedType) return

    setLoading(true)

    try {
      // Store selected user type in localStorage
      localStorage.setItem("signupData", JSON.stringify({ userType: selectedType }))

      // Navigate to verification step
      router.push("/signup/verification")
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SignupHeader />
      <ProgressBar currentStep={1} totalSteps={6} />

      <div className="flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Account Type</h2>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* User Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userTypes.map((type) => {
                const IconComponent = type.icon
                return (
                  <div
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className={`p-8 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                      selectedType === type.id
                        ? "border-green-500 bg-green-50 shadow-md"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="text-center space-y-4">
                      <div className={`inline-flex p-4 rounded-full ${
                        selectedType === type.id ? "bg-green-600" : "bg-gray-400"
                      }`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{type.name}</h3>
                        <p className="text-sm text-gray-600 mt-2">{type.description}</p>
                      </div>
                      <div className="flex justify-center">
                        <div
                          className={`w-6 h-6 rounded-full border-2 ${
                            selectedType === type.id ? "border-green-500 bg-green-500" : "border-gray-300"
                          }`}
                        >
                          {selectedType === type.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Back to Login
              </button>
              <button
                type="submit"
                disabled={!selectedType || loading}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
