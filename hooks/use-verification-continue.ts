import { useMutation } from "@tanstack/react-query"

// Types for continue data
export interface ContinueData {
  userType: string
  designation: string
  phoneNumber: string
  iprs_id: string
}

// API function to submit continue data
const submitContinueData = async (data: ContinueData) => {
  const response = await fetch('http://localhost:3001/api/entities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error('Failed to submit entity data')
  }

  return response.json()
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
