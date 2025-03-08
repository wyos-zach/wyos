import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Design System | WYOS',
  description: 'A comprehensive showcase of the WYOS design system components',
};

export default function DesignSystemPage() {
  return (
    <div className='container py-10'>
      <h1 className='mb-8 mt-8 font-heading text-4xl font-bold'>
        WYOS Design System
      </h1>
      <p className='mb-10 text-lg'>
        Welcome to the WYOS Design System. This comprehensive guide showcases
        all UI components, styles, and patterns used throughout the WYOS
        application.
      </p>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <CategoryCard
          title='Atoms'
          description='Basic building blocks of the interface'
          href='/design-system/atoms'
        />
        <CategoryCard
          title='Molecules'
          description='Combinations of atoms that form simple UI components'
          href='/design-system/molecules'
        />
        <CategoryCard
          title='Organisms'
          description='Complex UI components composed of molecules and atoms'
          href='/design-system/organisms'
        />
        <CategoryCard
          title='Sections'
          description='Page-level objects that place components into a layout'
          href='/design-system/sections'
        />
        <CategoryCard
          title='Pages'
          description='Specific instances of templates with real content'
          href='/design-system/pages'
        />
        <CategoryCard
          title='Styles'
          description='Colors, typography, and other foundational styles'
          href='/design-system/styles'
        />
      </div>
    </div>
  );
}

function CategoryCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className='block rounded-lg border p-6 transition-colors hover:bg-muted'
    >
      <h2 className='mb-2 font-heading text-2xl font-semibold'>{title}</h2>
      <p className='text-muted-foreground'>{description}</p>
    </Link>
  );
}
