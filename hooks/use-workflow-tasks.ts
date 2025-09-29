import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  workflowTasksApi, 
  WorkflowTask
} from '@/lib/api-client';

// Query keys for workflow tasks
export const workflowTaskKeys = {
  all: ['workflowTasks'] as const,
  lists: () => [...workflowTaskKeys.all, 'list'] as const,
  list: (filters: { 
    page?: number; 
    limit?: number; 
    status?: string; 
    priority?: string; 
    assignedTo?: string 
  }) => [...workflowTaskKeys.lists(), filters] as const,
  details: () => [...workflowTaskKeys.all, 'detail'] as const,
  detail: (id: string) => [...workflowTaskKeys.details(), id] as const,
  myDepartment: (filters?: { 
    page?: number; 
    limit?: number; 
    status?: string; 
    priority?: string; 
    assignedTo?: string 
  }) => [...workflowTaskKeys.all, 'myDepartment', filters] as const,
};

// Hook to fetch department tasks
export function useMyDepartmentTasks(
  page = 1,
  limit = 10,
  filters?: { status?: string; priority?: string; assignedTo?: string }
) {
  return useQuery({
    queryKey: workflowTaskKeys.myDepartment({ page, limit, ...filters }),
    queryFn: () => workflowTasksApi.getMyDepartmentTasks(page, limit, filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to fetch a single workflow task by ID
export function useWorkflowTask(id: string) {
  return useQuery({
    queryKey: workflowTaskKeys.detail(id),
    queryFn: () => workflowTasksApi.getById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to update task status
export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, notes }: { id: string; status: string; notes?: string }) =>
      workflowTasksApi.updateStatus(id, status, notes),
    onSuccess: (updatedTask, variables) => {
      // Update the specific task in cache
      queryClient.setQueryData(
        workflowTaskKeys.detail(variables.id),
        updatedTask
      );
      
      // Invalidate department tasks list to refetch
      queryClient.invalidateQueries({ queryKey: workflowTaskKeys.myDepartment() });
    },
    onError: (error) => {
      console.error('Error updating task status:', error);
    },
  });
}

// Hook to assign task to user
export function useAssignTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, assignedTo }: { id: string; assignedTo: string }) =>
      workflowTasksApi.assignTask(id, assignedTo),
    onSuccess: (updatedTask, variables) => {
      // Update the specific task in cache
      queryClient.setQueryData(
        workflowTaskKeys.detail(variables.id),
        updatedTask
      );
      
      // Invalidate department tasks list to refetch
      queryClient.invalidateQueries({ queryKey: workflowTaskKeys.myDepartment() });
    },
    onError: (error) => {
      console.error('Error assigning task:', error);
    },
  });
}

// Hook to complete task
export function useCompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, notes, documents }: { id: string; notes?: string; documents?: any[] }) =>
      workflowTasksApi.completeTask(id, notes, documents),
    onSuccess: (updatedTask, variables) => {
      // Update the specific task in cache
      queryClient.setQueryData(
        workflowTaskKeys.detail(variables.id),
        updatedTask
      );
      
      // Invalidate department tasks list to refetch
      queryClient.invalidateQueries({ queryKey: workflowTaskKeys.myDepartment() });
    },
    onError: (error) => {
      console.error('Error completing task:', error);
    },
  });
}

// Hook to reject task
export function useRejectTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      workflowTasksApi.rejectTask(id, reason),
    onSuccess: (updatedTask, variables) => {
      // Update the specific task in cache
      queryClient.setQueryData(
        workflowTaskKeys.detail(variables.id),
        updatedTask
      );
      
      // Invalidate department tasks list to refetch
      queryClient.invalidateQueries({ queryKey: workflowTaskKeys.myDepartment() });
    },
    onError: (error) => {
      console.error('Error rejecting task:', error);
    },
  });
}

// Hook to get tasks by status
export function useTasksByStatus(status: string) {
  return useMyDepartmentTasks(1, 100, { status });
}

// Hook to get tasks by priority
export function useTasksByPriority(priority: string) {
  return useMyDepartmentTasks(1, 100, { priority });
}

// Hook to get assigned tasks
export function useAssignedTasks(assignedTo: string) {
  return useMyDepartmentTasks(1, 100, { assignedTo });
}

// Utility hook to get task statistics
export function useTaskStats() {
  const { data: allTasks } = useMyDepartmentTasks(1, 100);
  const { data: pendingTasks } = useTasksByStatus('PENDING');
  const { data: inProgressTasks } = useTasksByStatus('IN_PROGRESS');
  const { data: completedTasks } = useTasksByStatus('COMPLETED');
  const { data: overdueTasks } = useTasksByStatus('OVERDUE');

  return {
    total: allTasks?.pagination.total || 0,
    pending: pendingTasks?.pagination.total || 0,
    inProgress: inProgressTasks?.pagination.total || 0,
    completed: completedTasks?.pagination.total || 0,
    overdue: overdueTasks?.pagination.total || 0,
  };
}
