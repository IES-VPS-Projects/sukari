import { useMutation } from "@tanstack/react-query"
import { entitiesApi, ApiResponse } from "@/lib/api-client"

// Types for continue data
export interface ContinueData {
  userType: string
  designation: string
  phoneNumber: string
  iprs_id?: string  // For individual verification
  brs_id?: string   // For company verification
}

// API function to submit continue data using axios service
const submitContinueData = async (data: ContinueData): Promise<ApiResponse> => {
  try {
    const response = await entitiesApi.create(data)
    return response
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to submit entity data')
  }
}

// Custom hook for verification continue
export const useVerificationContinue = () => {
  return useMutation({
    mutationFn: submitContinueData,
    onSuccess: (data) => {
      console.log('Entity data submitted successfully:', data)
      // You can add toast notification here if needed
    },
    onError: (error) => {
      console.error('Error submitting entity data:', error)
      // You can add toast notification here if needed
    },
    retry: 1, // Only retry once on failure
    retryDelay: 1000 // Wait 1 second before retrying
  })
}
