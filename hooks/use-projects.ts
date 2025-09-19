import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "@/lib/api-client";
import { useToast } from "./use-toast";

// Custom hook to get all projects
export const useProjects = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['projects', page, limit],
    queryFn: () => projectsApi.getAll(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook to get a single project
export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook to create a new project
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (projectData: any) => projectsApi.create(projectData),
    onSuccess: () => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      
      toast({
        title: "Project Created",
        description: "Your project has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: error.response?.data?.message || "Failed to create project. Please try again.",
        variant: "destructive",
      });
    },
  });
};

// Custom hook to update a project
export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      projectsApi.update(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate specific project and projects list
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      
      toast({
        title: "Project Updated",
        description: "Your project has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Failed to update project. Please try again.",
        variant: "destructive",
      });
    },
  });
};

// Custom hook to delete a project
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => projectsApi.delete(id),
    onSuccess: () => {
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      
      toast({
        title: "Project Deleted",
        description: "Your project has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Deletion Failed",
        description: error.response?.data?.message || "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    },
  });
};
