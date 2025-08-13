import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';

export interface LoginRequest {
  email: string;
  pin: string;
}

const login = async (data: LoginRequest) => {
  const response = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  console.log(response.ok, "response");
  
  if (!response.ok) {
    console.log(response, "response");
    throw new Error(responseData.error || responseData.message || 'Login failed');
  }
  
  return responseData;
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
