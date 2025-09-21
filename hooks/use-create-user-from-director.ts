import { useMutation } from "@tanstack/react-query"
import toast from 'react-hot-toast'
import { apiService } from '@/lib/axios-service'

// Types for create user from director request
export interface CreateUserFromDirectorRequest {
  brsId: string
  directorId: string
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  role?: string
  companyName?: string
}

export interface CreateUserFromDirectorResponse {
  id: string
  brsId: string
  directorId: string
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  role: string
  companyName: string
  createdAt: string
  updatedAt: string
}

// API function to create user from director
const createUserFromDirector = async (data: CreateUserFromDirectorRequest): Promise<CreateUserFromDirectorResponse> => {
  try {
    const response = await apiService.post<CreateUserFromDirectorResponse>('/api/users/create-from-director', data)
    return response
  } catch (error: any) {
    // Handle the specific error format from your API
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        error.message || 
                        'Failed to create user from director'
    throw new Error(errorMessage)
  }
}

// Custom hook for creating user from director
export const useCreateUserFromDirector = () => {
  return useMutation({
    mutationFn: createUserFromDirector,
    onSuccess: (data) => {
      console.log('User created successfully from director:', data)
      toast.success(`User ${data.firstName} ${data.lastName} created successfully!`)
    },
    onError: (error) => {
      console.error('Error creating user from director:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to create user from director'
      toast.error(errorMessage)
    },
    retry: 1,
    retryDelay: 1000
  })
}
