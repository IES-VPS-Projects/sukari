import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';

export interface SendOTPRequest {
  userId: string;
  type: 'EMAIL' | 'SMS';
}

const sendOTP = async (data: SendOTPRequest) => {
  const response = await fetch('http://localhost:3001/api/otp/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to send OTP');
  }
  
  return responseData;
};

export const useSendOTP = () => {
  return useMutation({
    mutationFn: sendOTP,
    onSuccess: (data) => {
      console.log('OTP sent successfully:', data);
      toast.success('OTP sent successfully!');
    },
    onError: (error) => {
      console.error('Error sending OTP:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP';
      toast.error(errorMessage);
    },
    retry: 1,
    retryDelay: 1000,
  });
};
