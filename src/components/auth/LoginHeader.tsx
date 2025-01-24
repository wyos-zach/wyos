import Link from 'next/link';

interface LoginHeaderProps {
  error?: string;
}

export function LoginHeader({ error }: LoginHeaderProps) {
  return (
    <>
      <h2 className='text-xl font-bold text-neutral-800 dark:text-neutral-200'>
        Welcome back to WYOS
      </h2>
      <p className='mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300'>
        Login to access your account.{' '}
        <Link href='/register' className='text-orange-500 hover:underline'>
          Register
        </Link>{' '}
        if you don't have an account yet.
      </p>
      {error && (
        <p className='mt-4 text-center text-sm text-red-500 dark:text-red-400'>
          {error}
        </p>
      )}
    </>
  );
}
