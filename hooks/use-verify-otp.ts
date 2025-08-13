import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';

export interface VerifyOTPRequest {
  userId: string;
  code: string;
  type: 'EMAIL' | 'SMS';
}

const verifyOTP = async (data: VerifyOTPRequest) => {
  const response = await fetch('http://localhost:3001/api/otp/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to verify OTP');
  }
  
  return responseData;
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      console.log('OTP verified successfully:', data);
      toast.success('OTP verified successfully!');
    },
    onError: (error) => {
      console.error('Error verifying OTP:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to verify OTP';
      toast.error(errorMessage);
    },
    retry: 1,
    retryDelay: 1000,
  });
};
