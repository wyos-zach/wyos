import { useAuthStore } from '@/store/AuthStore';
import { useState } from 'react';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export function useForgotPasswordForm() {
  const { requestPasswordReset } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    try {
      forgotPasswordSchema.parse({ email });
      setIsLoading(true);
      setError('');

      const response = await requestPasswordReset(email);
      if (response.error) {
        setError(response.error.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, success, handleSubmit };
}
