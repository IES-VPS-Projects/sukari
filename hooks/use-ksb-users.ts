import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiService } from '@/lib/axios-service'

export interface KsbUser {
  id: string
  email: string
  role: string
  employeeId: string
  departmentId: string
  designation: string
  phoneNumber: string
  officeLocation: string
  isKSBUser: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
  department: {
    id: string
    name: string
    departmentCode: string
  }
}

export interface KsbUsersResponse {
  success: boolean
  data: KsbUser[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
  message: string
}

export interface CreateKsbUserData {
  email: string
  pin: string
  role: string
  employeeId: string
  departmentId: string
  designation: string
  phoneNumber: string
  officeLocation: string
  isKSBUser?: boolean
  isActive?: boolean
}

export interface UpdateKsbUserData {
  id: string
  email?: string
  role?: string
  employeeId?: string
  departmentId?: string
  designation?: string
  phoneNumber?: string
  officeLocation?: string
  isKSBUser?: boolean
  isActive?: boolean
}

export function useKsbUsers() {
  const queryClient = useQueryClient()

  // Fetch all KSB users
  const {
    data: usersResponse,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['ksb-users'],
    queryFn: async (): Promise<KsbUsersResponse> => {
      return await apiService.get<KsbUsersResponse>('/api/ksb/users')
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  // Create KSB user mutation
  const createKsbUserMutation = useMutation({
    mutationFn: async (data: CreateKsbUserData): Promise<KsbUser> => {
      const response = await apiService.post<{ success: boolean; data: KsbUser; message: string }>('/api/ksb/users', data)
      return response.data
    },
    onSuccess: () => {
      // Invalidate and refetch users
      queryClient.invalidateQueries({ queryKey: ['ksb-users'] })
    }
  })

  // Update KSB user mutation
  const updateKsbUserMutation = useMutation({
    mutationFn: async (data: UpdateKsbUserData): Promise<KsbUser> => {
      const { id, ...updateData } = data
      const response = await apiService.put<{ success: boolean; data: KsbUser; message: string }>(`/api/ksb/users/${id}`, updateData)
      return response.data
    },
    onSuccess: () => {
      // Invalidate and refetch users
      queryClient.invalidateQueries({ queryKey: ['ksb-users'] })
    }
  })

  // Delete KSB user mutation
  const deleteKsbUserMutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await apiService.delete<{ success: boolean; message: string }>(`/api/ksb/users/${id}`)
    },
    onSuccess: () => {
      // Invalidate and refetch users
      queryClient.invalidateQueries({ queryKey: ['ksb-users'] })
    }
  })

  return {
    users: usersResponse?.data || [],
    pagination: usersResponse?.pagination,
    isLoading,
    error,
    refetch,
    createKsbUser: createKsbUserMutation.mutate,
    updateKsbUser: updateKsbUserMutation.mutate,
    deleteKsbUser: deleteKsbUserMutation.mutate,
    isCreating: createKsbUserMutation.isPending,
    isUpdating: updateKsbUserMutation.isPending,
    isDeleting: deleteKsbUserMutation.isPending,
    createError: createKsbUserMutation.error,
    updateError: updateKsbUserMutation.error,
    deleteError: deleteKsbUserMutation.error
  }
}
