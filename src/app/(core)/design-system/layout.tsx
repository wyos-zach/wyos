import { SidebarNav } from '@/components/ui/organisms/sidebar-nav';

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex gap-10 py-28'>
      <aside className='w-64 flex-shrink-0'>
        <SidebarNav />
      </aside>
      <main className='flex-grow'>{children}</main>
    </div>
  );
}
