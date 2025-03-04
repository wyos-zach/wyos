import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AvatarSection() {
  return (
    <section className='space-y-6 px-6'>
      <h2 className='font-heading text-3xl font-bold'>Avatar</h2>
      <p className='text-muted-foreground'>
        Avatars are used to represent users or entities in the interface.
      </p>

      <div className='flex space-x-4'>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>

      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>src: string (for AvatarImage)</li>
          <li>alt: string (for AvatarImage)</li>
          <li>children: ReactNode (for Avatar and AvatarFallback)</li>
        </ul>
      </div>
    </section>
  );
}
