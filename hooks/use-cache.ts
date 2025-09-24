import { useMutation } from "@tanstack/react-query";
import { cacheApi } from "@/lib/api-client";
import { useToast } from "./use-toast";

// Custom hook for cache warming
export const useCacheWarm = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => cacheApi.warmUsers(),
    onSuccess: (data) => {
      toast({
        title: "Cache Warming Successful",
        description: data.message || "User cache has been warmed successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Cache Warming Failed",
        description: error.response?.data?.message || "Failed to warm user cache. Please try again.",
        variant: "destructive",
      });
    },
  });
};

// Custom hook for entities cache warming
export const useCacheWarmEntities = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => cacheApi.warmEntities(),
    onSuccess: (data) => {
      toast({
        title: "Cache Warming Successful",
        description: data.message || "Entities cache has been warmed successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Cache Warming Failed",
        description: error.response?.data?.message || "Failed to warm entities cache. Please try again.",
        variant: "destructive",
      });
    },
  });
};
