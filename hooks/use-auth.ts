import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, LoginRequest } from "@/lib/api-client";
import { useToast } from "./use-toast";

// Custom hook for user login
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem('authToken', data.data.token);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      
      // Update user data in cache
      queryClient.setQueryData(['user'], data.data.user);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${data.data.user.firstName}!`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    },
  });
};

// Custom hook for user logout
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear tokens and user data
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      queryClient.clear();
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    },
    onError: () => {
      // Even if logout fails on server, clear local data
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      queryClient.clear();
    },
  });
};

// Custom hook to get current user
export const useCurrentUser = () => {
  const token = localStorage.getItem('authToken');
  
  return useQuery({
    queryKey: ['user'],
    queryFn: () => authApi.verifyToken(),
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook to refresh token
export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      return authApi.refreshToken(refreshToken);
    },
    onSuccess: (data) => {
      // Update tokens
      localStorage.setItem('authToken', data.data.token);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      
      // Update user data
      queryClient.setQueryData(['user'], data.data.user);
    },
    onError: () => {
      // If refresh fails, logout user
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      queryClient.clear();
      window.location.href = '/login';
    },
  });
};
