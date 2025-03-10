'use client';
import { Input } from '@/components/design-system/atoms/input'; // Your Input atom
import { InputGroup } from '@/components/design-system/molecules/InputGroup';
import { Search, User } from 'lucide-react'; // Assuming lucide-react is in use

export function InputGroupSection() {
  return (
    <section className='space-y-4'>
      <h2 className='text-2xl font-semibold text-foreground'>InputGroup</h2>
      <p className='text-muted-foreground'>
        A sleek input group combining an input with an icon, styled with
        glassmorphism for a premium look.
      </p>
      <div className='space-y-4 rounded-lg border border-zinc-700/20 bg-background p-4'>
        {/* Icon on Left */}
        <InputGroup icon={<Search className='h-4 w-4' />}>
          <Input placeholder='Search...' />
        </InputGroup>
        {/* Icon on Right */}
        <InputGroup icon={<User className='h-4 w-4' />} position='right'>
          <Input placeholder='Username' />
        </InputGroup>
      </div>
      <div className='text-sm text-muted-foreground'>
        <p>
          <strong>Props:</strong>
        </p>
        <ul className='list-disc pl-5'>
          <li>
            <code>children</code>: Input component (e.g., TextInput)
          </li>
          <li>
            <code>icon</code>: Icon element (e.g., Lucide icon)
          </li>
          <li>
            <code>position</code>: Icon placement ("left" or "right")
          </li>
        </ul>
        <p>
          <strong>States:</strong> Normal (glassmorphic with hover/focus
          effects)
        </p>
      </div>
    </section>
  );
}
