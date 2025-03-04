import { SidebarNav } from '@/components/design-system/sidebar-nav';

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='container flex gap-10 py-10'>
      <aside className='w-64 flex-shrink-0'>
        <SidebarNav />
      </aside>
      <main className='flex-grow'>{children}</main>
    </div>
  );
}
