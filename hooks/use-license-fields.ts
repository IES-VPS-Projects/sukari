import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

// License Field Types
export interface LicenseField {
  id: string
  licenseId: string
  name: string
  type: 'TEXT' | 'EMAIL' | 'PHONE' | 'NUMBER' | 'TEXTAREA' | 'SELECT' | 'MULTI_SELECT' | 'RADIO' | 'CHECKBOX' | 'DATE' | 'DATETIME' | 'FILE' | 'SIGNATURE' | 'BOOLEAN'
  label: string
  required: boolean
  placeholder?: string
  description?: string
  options?: Array<{
    value: string
    label: string
    disabled?: boolean
  }>
  validation?: {
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    pattern?: string
    customMessage?: string
    required?: boolean
  }
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateLicenseFieldRequest {
  name: string
  type: string
  label: string
  required?: boolean
  placeholder?: string
  description?: string
  options?: Array<{
    value: string
    label: string
    disabled?: boolean
  }>
  validation?: {
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    pattern?: string
    customMessage?: string
    required?: boolean
  }
  order?: number
  isActive?: boolean
}

export interface UpdateLicenseFieldRequest {
  name?: string
  type?: string
  label?: string
  required?: boolean
  placeholder?: string
  description?: string
  options?: Array<{
    value: string
    label: string
    disabled?: boolean
  }>
  validation?: {
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    pattern?: string
    customMessage?: string
    required?: boolean
  }
  order?: number
  isActive?: boolean
}

export interface BulkCreateFieldsRequest {
  fields: CreateLicenseFieldRequest[]
}

export interface ReorderFieldsRequest {
  fieldOrders: Array<{
    id: string
    order: number
  }>
}

export interface FieldStatistics {
  totalFields: number
  activeFields: number
  fieldsByType: Record<string, number>
  fieldsByLicense: Record<string, number>
}

export interface FieldType {
  value: string
  label: string
  description: string
  requiresOptions: boolean
}

// Query Keys
const licenseFieldKeys = {
  all: ['licenseFields'] as const,
  lists: () => [...licenseFieldKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...licenseFieldKeys.lists(), { filters }] as const,
  details: () => [...licenseFieldKeys.all, 'detail'] as const,
  detail: (id: string) => [...licenseFieldKeys.details(), id] as const,
  byLicense: (licenseId: string) => [...licenseFieldKeys.all, 'byLicense', licenseId] as const,
  statistics: () => [...licenseFieldKeys.all, 'statistics'] as const,
  types: () => [...licenseFieldKeys.all, 'types'] as const,
}

// API Client instance
const licenseFieldsApi = apiClient.licenseFields

// Hooks
export function useLicenseFields(
  page = 1,
  limit = 10,
  filters?: {
    licenseId?: string
    isActive?: boolean
    type?: string
  }
) {
  return useQuery({
    queryKey: licenseFieldKeys.list({ page, limit, ...filters }),
    queryFn: () => licenseFieldsApi.getAll(page, limit, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useLicenseField(id: string) {
  return useQuery({
    queryKey: licenseFieldKeys.detail(id),
    queryFn: () => licenseFieldsApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useLicenseFieldsByLicense(licenseId: string) {
  return useQuery({
    queryKey: licenseFieldKeys.byLicense(licenseId),
    queryFn: () => licenseFieldsApi.getByLicenseId(licenseId),
    enabled: !!licenseId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useLicenseWithFields(licenseId: string) {
  return useQuery({
    queryKey: [...licenseFieldKeys.byLicense(licenseId), 'withLicense'],
    queryFn: () => licenseFieldsApi.getLicenseWithFields(licenseId),
    enabled: !!licenseId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useFieldStatistics() {
  return useQuery({
    queryKey: licenseFieldKeys.statistics(),
    queryFn: () => licenseFieldsApi.getStatistics(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  })
}

export function useFieldTypes() {
  return useQuery({
    queryKey: licenseFieldKeys.types(),
    queryFn: () => licenseFieldsApi.getFieldTypes(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  })
}

// Mutation Hooks
export function useCreateLicenseField() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ licenseId, fieldData }: { licenseId: string; fieldData: CreateLicenseFieldRequest }) =>
      licenseFieldsApi.create(licenseId, fieldData),
    onSuccess: (newField, variables) => {
      // Invalidate and refetch fields list
      queryClient.invalidateQueries({ queryKey: licenseFieldKeys.lists() })
      queryClient.invalidateQueries({ queryKey: licenseFieldKeys.byLicense(variables.licenseId) })
      
      // Add the new field to the cache
      queryClient.setQueryData(
        licenseFieldKeys.detail(newField.data.id),
        newField
      )
    },
    onError: (error) => {
      console.error('Error creating license field:', error)
    },
  })
}

export function useUpdateLicenseField() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, fieldData }: { id: string; fieldData: UpdateLicenseFieldRequest }) =>
      licenseFieldsApi.update(id, fieldData),
    onSuccess: (updatedField) => {
      // Invalidate and refetch fields list
      queryClient.invalidateQueries({ queryKey: licenseFieldKeys.lists() })
      queryClient.invalidateQueries({ queryKey: licenseFieldKeys.byLicense(updatedField.data.licenseId) })
      
      // Update the field in the cache
      queryClient.setQueryData(
        licenseFieldKeys.detail(updatedField.data.id),
        updatedField
      )
    },
    onError: (error) => {
      console.error('Error updating license field:', error)
    },
  })
}

export function useDeleteLicenseField() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => licenseFieldsApi.delete(id),
    onSuccess: (_, deletedId) => {
      // Invalidate and refetch fields list
      queryClient.invalidateQueries({ queryKey: licenseFieldKeys.lists() })
      
      // Remove the field from cache
      queryClient.removeQueries({ queryKey: licenseFieldKeys.detail(deletedId) })
    },
    onError: (error) => {
      console.error('Error deleting license field:', error)
    },
  })
}

export function useBulkCreateLicenseFields() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ licenseId, fieldsData }: { licenseId: string; fieldsData: BulkCreateFieldsRequest }) =>
      licenseFieldsApi.bulkCreate(licenseId, fieldsData),
    onSuccess: (newFields, variables) => {
      // Invalidate and refetch fields list
      queryClient.invalidateQueries({ queryKey: licenseFieldKeys.lists() })
      queryClient.invalidateQueries({ queryKey: licenseFieldKeys.byLicense(variables.licenseId) })
      
      // Add the new fields to the cache
      newFields.data.forEach(field => {
        queryClient.setQueryData(
          licenseFieldKeys.detail(field.id),
          { success: true, data: field }
        )
      })
    },
    onError: (error) => {
      console.error('Error bulk creating license fields:', error)
    },
  })
}

export function useReorderLicenseFields() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ licenseId, fieldOrders }: { licenseId: string; fieldOrders: ReorderFieldsRequest }) =>
      licenseFieldsApi.reorder(licenseId, fieldOrders),
    onSuccess: (_, variables) => {
      // Invalidate and refetch fields for the license
      queryClient.invalidateQueries({ queryKey: licenseFieldKeys.byLicense(variables.licenseId) })
    },
    onError: (error) => {
      console.error('Error reordering license fields:', error)
    },
  })
}

export function useValidateFieldData() {
  return useMutation({
    mutationFn: (fieldData: Partial<CreateLicenseFieldRequest>) =>
      licenseFieldsApi.validate(fieldData),
    onError: (error) => {
      console.error('Error validating field data:', error)
    },
  })
}
