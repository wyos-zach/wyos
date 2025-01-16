import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <main className='min-h-screen bg-background'>{children}</main>
    </ProtectedRoute>
  );
}
