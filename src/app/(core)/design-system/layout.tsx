export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-background'>
      <div className='flex min-h-screen flex-col'>
        <main className='flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {children}
        </main>
      </div>
    </div>
  );
}
