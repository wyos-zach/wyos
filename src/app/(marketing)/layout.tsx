export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='flex min-h-screen flex-col'>{children}</div>;
}
