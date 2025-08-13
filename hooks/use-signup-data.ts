import { useState, useEffect } from 'react'

export interface SignupData {
  userType?: string
  iprsData?: {
    id: string
    id_no: string
    first_name: string
    middle_name: string | null
    last_name: string
    nationality: string
    gender: string
    county_of_birth: string | null
    date_of_birth: string
    email_address: string | null
    phone_no: string | null
    current_county: string | null
    current_sub_county: string | null
    mug_shot: string | null
    createdAt: string
    updatedAt: string
  }
  verificationData?: {
    userType: string
    designation: string
    phoneNumber: string
    iprs_id: string
    fullName: string
    formattedDateOfBirth: string
    formattedGender: string
    nationality: string
    countyOfBirth: string
  }
  entityData?: {
    userType: string
    designation: string
    phoneNumber: string
    iprs_id: string
  }
  entityResponse?: any
  authenticationData?: {
    telephone: string
    email: string
    iprs_id: string
    userType: string
  }
  userCreationData?: {
    iprsID: string
    phoneNumber: string
    email: string
    entityID: string
  }
  userCreationResponse?: any
  [key: string]: any
}

export const useSignupData = () => {
  const [signupData, setSignupData] = useState<SignupData>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('useSignupData: Loading data from localStorage...')
    // Load data from localStorage on mount
    const storedData = localStorage.getItem("signupData")
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        console.log('useSignupData: Data loaded successfully:', parsedData)
        setSignupData(parsedData)
      } catch (error) {
        console.error('Error parsing signup data:', error)
      }
    } else {
      console.log('useSignupData: No data found in localStorage')
    }
    setIsLoading(false)
    console.log('useSignupData: Loading complete')
  }, [])

  const updateSignupData = (newData: Partial<SignupData>) => {
    const updatedData = { ...signupData, ...newData }
    setSignupData(updatedData)
    localStorage.setItem("signupData", JSON.stringify(updatedData))
  }

  const clearSignupData = () => {
    setSignupData({})
    localStorage.removeItem("signupData")
  }

  const getIPRSData = () => signupData.iprsData
  const getVerificationData = () => signupData.verificationData
  const getEntityData = () => signupData.entityData
  const getEntityResponse = () => signupData.entityResponse
  const getAuthenticationData = () => signupData.authenticationData
  const getUserCreationResponse = () => signupData.userCreationResponse

  return {
    signupData,
    isLoading,
    updateSignupData,
    clearSignupData,
    getIPRSData,
    getVerificationData,
    getEntityData,
    getEntityResponse,
    getAuthenticationData,
    getUserCreationResponse
  }
}
