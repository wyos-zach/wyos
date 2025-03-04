import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900'>
      <h2 className='mb-4 text-4xl font-bold text-gray-800 dark:text-gray-200'>
        Page Not Found
      </h2>
      <p className='mb-8 text-xl text-gray-600 dark:text-gray-400'>
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        href='/'
        className='rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
      >
        Return Home
      </Link>
    </div>
  );
}
