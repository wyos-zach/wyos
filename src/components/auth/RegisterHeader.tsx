import Link from 'next/link';

interface RegisterHeaderProps {
  error?: string;
}

export function RegisterHeader({ error }: RegisterHeaderProps) {
  return (
    <>
      <h2 className='text-xl font-bold text-neutral-800 dark:text-neutral-200'>
        Welcome to WYOS
      </h2>
      <p className='mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300'>
        Sign up with WYOS if you don't have an account.{' '}
        <Link href='/login' className='text-orange-500 hover:underline'>
          Login
        </Link>{' '}
        if you already have one.
      </p>
      {error && (
        <p className='mt-4 text-center text-sm text-red-500 dark:text-red-400'>
          {error}
        </p>
      )}
    </>
  );
}
