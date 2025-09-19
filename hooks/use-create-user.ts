import { useMutation } from "@tanstack/react-query"
import toast from 'react-hot-toast'
import { apiService } from '@/lib/axios-service'

// Types for create user request
export interface CreateUserRequest {
  iprsID: string
  phoneNumber: string
  email: string
  entityID: string
}

// API function to create user with entity
const createUserWithEntity = async (data: CreateUserRequest) => {
  try {
    const responseData = await apiService.post('/api/users/create-with-entity', data)
    return responseData
  } catch (error: any) {
    // Handle the specific error format from your API
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        error.message || 
                        'Failed to create user'
    throw new Error(errorMessage)
  }
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
