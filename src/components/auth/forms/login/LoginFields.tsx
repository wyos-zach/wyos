import { InputAnimation } from '@/components/ui/input-with-label-animation';

interface LoginFieldsProps {
  isLoading: boolean;
}

export function LoginFields({ isLoading }: LoginFieldsProps) {
  return (
    <>
      <InputAnimation
        label='Email'
        name='email'
        type='email'
        disabled={isLoading}
      />
      <InputAnimation
        label='Password'
        name='password'
        type='password'
        disabled={isLoading}
      />
    </>
  );
}
