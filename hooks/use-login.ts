import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { apiService } from '@/lib/axios-service';

export interface LoginRequest {
  email: string;
  pin: string;
}

const login = async (data: LoginRequest) => {
  try {
    const responseData = await apiService.post('/api/auth/login', data);
    console.log(responseData, "response");
    return responseData;
  } catch (error: any) {
    console.log(error, "error");
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        error.message || 
                        'Login failed';
    throw new Error(errorMessage);
  }
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('Login successful:', data);
      toast.success('Login successful!');
    },
    onError: (error) => {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      toast.error(errorMessage);
    },
    retry: 1,
    retryDelay: 1000,
  });
};
