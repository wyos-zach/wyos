import { Icon } from '@/components/design-system/atoms/icon';
import { Home, Search, Settings, User } from 'lucide-react';

export function IconSection() {
  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>Icon</h2>
      <p className='text-muted-foreground'>
        Icons are used to visually represent actions, objects, or statuses.
      </p>

      {/* Default Icons */}
      <div>
        <h3 className='text-lg font-semibold'>Default Icons</h3>
        <div className='flex flex-wrap gap-6'>
          <Icon name={Home} size='sm' />
          <Icon name={Settings} size='md' />
          <Icon name={User} size='lg' />
          <Icon name={Search} size={40} />
        </div>
      </div>

      {/* Custom Colors */}
      <div>
        <h3 className='text-lg font-semibold'>Custom Colors</h3>
        <div className='flex flex-wrap gap-6'>
          <Icon name={Home} size='md' color='#1677ff' />
          <Icon name={Settings} size='md' color='#ff4d4f' />
          <Icon name={User} size='md' color='#52c41a' />
          <Icon name={Search} size='md' color='#faad14' />
        </div>
      </div>

      {/* Documentation */}
      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>name: LucideIcon (icon type from lucide-react)</li>
          <li>size: "sm" | "md" | "lg" | number (custom dimensions)</li>
          <li>color: string (CSS-compatible color value)</li>
          <li>className: string (optional additional classes)</li>
        </ul>
      </div>
    </section>
  );
}
