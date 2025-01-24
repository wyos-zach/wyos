import { useState } from 'react';
import { z } from 'zod';
import { useAuthStore } from '@/store/Auth';

const registerSchema = z.object({
  firstname: z.string().min(2, 'First name must be at least 2 characters'),
  lastname: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export function useRegisterForm() {
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = {
      firstname: formData.get('firstname') as string,
      lastname: formData.get('lastname') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      registerSchema.parse(formValues);
      setIsLoading(true);
      setError('');

      const response = await createAccount(
        `${formValues.firstname} ${formValues.lastname}`,
        formValues.email,
        formValues.password
      );

      if (response.error) {
        setError(response.error.message);
        return;
      }

      const loginResponse = await login(formValues.email, formValues.password);
      if (loginResponse.error) {
        setError(loginResponse.error.message);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, handleSubmit };
}
