import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiService } from '@/lib/axios-service'

export interface Department {
  id: string
  name: string
  description: string
  departmentCode: string
  isActive: boolean
  maxOfficers: number
  currentOfficerCount: number
  headOfDepartmentId: string | null
  createdAt: string
  updatedAt: string
  users: {
    id: string
    email: string
    employeeId: string
    designation: string
    phoneNumber: string
  }[]
  headOfDepartment: {
    id: string
    email: string
    employeeId: string
    designation: string
    phoneNumber: string
  } | null
}

export interface DepartmentResponse {
  success: boolean
  data: Department[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
  message: string
}

export interface CreateDepartmentRequest {
  name: string;
  description?: string;
  departmentCode: string;
  maxOfficers?: number;
  headOfDepartmentId?: string;
}

export interface CreateDepartmentData {
  name: string
  description: string
  departmentCode: string
  maxOfficers: number
  isActive?: boolean
}

export interface UpdateDepartmentData {
  id: string
  name?: string
  description?: string
  departmentCode?: string
  maxOfficers?: number
  isActive?: boolean
  headOfDepartmentId?: string | null
}

export interface AddUserToDepartmentData {
  departmentId: string
  userId: string
}

export interface RemoveUserFromDepartmentData {
  departmentId: string
  userId: string
}

export function useDepartments() {
  const queryClient = useQueryClient()

  // Fetch all departments
  const {
    data: departmentsResponse,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['departments'],
    queryFn: async (): Promise<DepartmentResponse> => {
      return await apiService.get<DepartmentResponse>('/api/ksb/departments')
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  // Create department mutation
  const createDepartmentMutation = useMutation({
    mutationFn: async (data: CreateDepartmentRequest): Promise<Department> => {
      const response = await apiService.post<{ success: boolean; data: Department; message: string }>('/api/ksb/departments', data)
      return response.data
    },
    onSuccess: () => {
      // Invalidate and refetch departments
      queryClient.invalidateQueries({ queryKey: ['departments'] })
    }
  })

  // Update department mutation
  const updateDepartmentMutation = useMutation({
    mutationFn: async (data: UpdateDepartmentData): Promise<Department> => {
      const { id, ...updateData } = data
      const response = await apiService.put<{ success: boolean; data: Department; message: string }>(`/api/ksb/departments/${id}`, updateData)
      return response.data
    },
    onSuccess: () => {
      // Invalidate and refetch departments
      queryClient.invalidateQueries({ queryKey: ['departments'] })
    }
  })

  // Delete department mutation
  const deleteDepartmentMutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await apiService.delete<{ success: boolean; message: string }>(`/api/ksb/departments/${id}`)
    },
    onSuccess: () => {
      // Invalidate and refetch departments
      queryClient.invalidateQueries({ queryKey: ['departments'] })
    }
  })

  // Add user to department mutation
  const addUserToDepartmentMutation = useMutation({
    mutationFn: async (data: AddUserToDepartmentData): Promise<void> => {
      const response = await apiService.post<{ success: boolean; message?: string; error?: string }>(`/api/ksb/departments/${data.departmentId}/users`, { userId: data.userId })
      
      if (!response.success) {
        throw new Error(response.error || response.message || 'Failed to add user to department')
      }
    },
    onSuccess: () => {
      // Invalidate and refetch departments and users
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      queryClient.invalidateQueries({ queryKey: ['ksbUsers'] })
    }
  })

  // Remove user from department mutation
  const removeUserFromDepartmentMutation = useMutation({
    mutationFn: async (data: RemoveUserFromDepartmentData): Promise<void> => {
      const response = await apiService.delete<{ success: boolean; message?: string; error?: string }>(`/api/ksb/departments/${data.departmentId}/users/${data.userId}`)
      
      if (!response.success) {
        console.log(response, "response");
        throw new Error(response.error || response.message || 'Failed to remove user from department')
      }
    },
    onSuccess: () => {
      // Invalidate and refetch departments and users
      queryClient.invalidateQueries({ queryKey: ['departments'] })
      queryClient.invalidateQueries({ queryKey: ['ksbUsers'] })
    }
  })

  return {
    departments: departmentsResponse?.data || [],
    pagination: departmentsResponse?.pagination,
    isLoading,
    error,
    refetch,
    createDepartment: createDepartmentMutation.mutate,
    updateDepartment: updateDepartmentMutation.mutate,
    deleteDepartment: deleteDepartmentMutation.mutate,
    addUserToDepartment: addUserToDepartmentMutation.mutate,
    removeUserFromDepartment: removeUserFromDepartmentMutation.mutate,
    isCreating: createDepartmentMutation.isPending,
    isUpdating: updateDepartmentMutation.isPending,
    isDeleting: deleteDepartmentMutation.isPending,
    isAddingUser: addUserToDepartmentMutation.isPending,
    isRemovingUser: removeUserFromDepartmentMutation.isPending,
    createError: createDepartmentMutation.error,
    updateError: updateDepartmentMutation.error,
    deleteError: deleteDepartmentMutation.error,
    addUserError: addUserToDepartmentMutation.error,
    removeUserError: removeUserFromDepartmentMutation.error
  }
}
