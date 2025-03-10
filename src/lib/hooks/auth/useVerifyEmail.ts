import { useAuthStore } from '@/store/AuthStore';
import { useEffect, useState } from 'react';

export function useVerifyEmailForm(userId: string, secret: string) {
  const { verifyEmail } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        const response = await verifyEmail(userId, secret);
        if (response.error) {
          setError(response.error.message);
        } else {
          setSuccess(true);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to verify email. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (userId && secret) {
      void verifyEmailToken();
    } else {
      setError('Invalid verification link');
      setIsLoading(false);
    }
  }, [userId, secret, verifyEmail]);

  return { isLoading, error, success };
}
