"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Phone, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { useSignupData } from "@/hooks/use-signup-data"
import { useCreateUser } from "@/hooks/use-create-user"
import toast, { Toaster } from 'react-hot-toast'

export default function AuthenticationPage() {
  const [telephone, setTelephone] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  
  const { getIPRSData, getVerificationData, getEntityResponse, updateSignupData, isLoading } = useSignupData()
  
  const iprsData = getIPRSData()
  const verificationData = getVerificationData()
  const entityResponse = getEntityResponse()

  // React Query hook for creating user
  const createUserMutation = useCreateUser()

  useEffect(() => {
    console.log('Authentication page useEffect - isLoading:', isLoading, 'iprsData:', !!iprsData, 'verificationData:', !!verificationData)
    
    // Wait for data to load before checking
    if (isLoading) {
      console.log('Still loading data from localStorage...')
      return
    }

    // Check if we have the required data from previous step
    if (!iprsData || !verificationData) {
      console.log('Missing required data, redirecting to verification')
      router.push("/signup/verification")
      return
    }

    // Pre-fill telephone if available from IPRS
    if (iprsData.phone_no) {
      setTelephone(iprsData.phone_no)
    } else if (verificationData.phoneNumber) {
      setTelephone(verificationData.phoneNumber)
    }

    // Pre-fill email if available from IPRS
    if (iprsData.email_address) {
      setEmail(iprsData.email_address)
    }

    console.log('IPRS Data available:', iprsData)
    console.log('Verification Data available:', verificationData)
  }, [iprsData, verificationData, router, isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      // Prepare data for user creation
      const createUserData = {
        iprsID: iprsData?.id || "",
        phoneNumber: telephone,
        email: email,
        entityID: entityResponse?.data?.id || ""   // Get entity ID from previous API response
      }

      console.log('Creating user with data:', createUserData)

      // Validate required fields
      if (!createUserData.iprsID) {
        throw new Error('IPRS ID is required')
      }
      if (!createUserData.phoneNumber) {
        throw new Error('Phone number is required')
      }
      if (!createUserData.email) {
        throw new Error('Valid email is required')
      }
      if (!createUserData.entityID) {
        throw new Error('Entity ID is required')
      }

      // Call the API to create user
      const result = await createUserMutation.mutateAsync(createUserData)
      console.log('User creation response:', result)

      // Update signup data with authentication info and user creation result
      updateSignupData({
        authenticationData: {
          telephone,
          email,
          iprs_id: iprsData?.id || "",
          userType: verificationData?.userType || ""
        },
        userCreationData: createUserData,
        userCreationResponse: result
      })

      // Navigate to next step
      router.push("/signup/otp-verification")
    } catch (error) {
      console.error('Error creating user:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to create user. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
    }
  }

  const handleBack = () => {
    router.push("/signup/verification")
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
  if (!iprsData || !verificationData) {
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
          <h2 className="text-3xl font-bold text-gray-900">Authentication</h2>
          <p className="mt-2 text-gray-600">
            Enter your contact information for verification
          </p>
        </div>

        {/* Display IPRS Data Summary */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Verified Identity</span>
          </div>
          <p className="text-sm text-green-700">
            {verificationData.fullName} • ID: {iprsData.id_no}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                Telephone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-600" />
                <input
                  type="tel"
                  id="telephone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="Enter your telephone no..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-600" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

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
                disabled={createUserMutation.isPending || !telephone || !email}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createUserMutation.isPending ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Creating User...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
