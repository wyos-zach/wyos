import { InputAnimation } from '@/components/ui/input-with-label-animation';

interface RegisterFieldsProps {
  isLoading: boolean;
}

export function RegisterFields({ isLoading }: RegisterFieldsProps) {
  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        <InputAnimation
          label='First Name'
          name='firstname'
          disabled={isLoading}
        />
        <InputAnimation
          label='Last Name'
          name='lastname'
          disabled={isLoading}
        />
      </div>
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
