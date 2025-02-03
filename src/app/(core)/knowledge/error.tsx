'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className='rounded-lg border border-destructive bg-destructive/10 p-8 text-center'>
      <h2 className='mb-4 text-xl font-semibold text-destructive'>
        Failed to load Knowledge Hub
      </h2>
      <button
        onClick={reset}
        className='rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90'
      >
        Try Again
      </button>
    </div>
  );
}
