import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';

export interface ResendOTPRequest {
  userId: string;
  type: 'EMAIL' | 'SMS';
}

const resendOTP = async (data: ResendOTPRequest) => {
  const response = await fetch('http://localhost:3001/api/otp/resend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to resend OTP');
  }
  
  return responseData;
};

export const useResendOTP = () => {
  return useMutation({
    mutationFn: resendOTP,
    onSuccess: (data) => {
      console.log('OTP resent successfully:', data);
      toast.success('OTP resent successfully!');
    },
    onError: (error) => {
      console.error('Error resending OTP:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to resend OTP';
      toast.error(errorMessage);
    },
    retry: 1,
    retryDelay: 1000,
  });
};
