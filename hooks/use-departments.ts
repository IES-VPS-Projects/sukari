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
  headOfDepartment: {
    id: string
    name: string
    email: string
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

  return {
    departments: departmentsResponse?.data || [],
    pagination: departmentsResponse?.pagination,
    isLoading,
    error,
    refetch,
    createDepartment: createDepartmentMutation.mutate,
    updateDepartment: updateDepartmentMutation.mutate,
    deleteDepartment: deleteDepartmentMutation.mutate,
    isCreating: createDepartmentMutation.isPending,
    isUpdating: updateDepartmentMutation.isPending,
    isDeleting: deleteDepartmentMutation.isPending,
    createError: createDepartmentMutation.error,
    updateError: updateDepartmentMutation.error,
    deleteError: deleteDepartmentMutation.error
  }
}
