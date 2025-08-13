import { useMutation } from "@tanstack/react-query"
import toast from 'react-hot-toast'

// Types for create user request
export interface CreateUserRequest {
  iprsID: string
  phoneNumber: string
  email: string
  entityID: string
}

// API function to create user with entity
const createUserWithEntity = async (data: CreateUserRequest) => {
  const response = await fetch('http://localhost:3001/api/users/create-with-entity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  const responseData = await response.json()

  if (!response.ok) {
    // Handle the specific error format from your API
    const errorMessage = responseData.error || responseData.message || 'Failed to create user'
    throw new Error(errorMessage)
  }

  return responseData
}

// Custom hook for creating user with entity
export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUserWithEntity,
    onSuccess: (data) => {
      console.log('User created successfully:', data)
      toast.success('User created successfully!')
    },
    onError: (error) => {
      console.error('Error creating user:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to create user'
      toast.error(errorMessage)
    },
    retry: 1,
    retryDelay: 1000
  })
}
