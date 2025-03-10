import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/design-system/atoms/Breadcrumb';
import { Home } from 'lucide-react';

export function BreadcrumbSection() {
  return (
    <section className='space-y-6 border-t border-zinc-700/30 px-6 py-8'>
      <h2 className='font-heading text-3xl font-bold text-zinc-100'>
        Breadcrumb
      </h2>
      <p className='text-zinc-400'>
        Breadcrumbs provide navigation context, showing the user’s location
        within the app. Used for hierarchical page navigation.
      </p>

      {/* Demo 1: No Background */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-zinc-200'>No Background</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/components'>Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Demo 2: With Background and Border */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-zinc-200'>
          With Background and Border
        </h3>
        <Breadcrumb hasBackground>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/components'>Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Demo 3: Slash Separator */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-zinc-200'>Slash Separator</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href='/components'>Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Demo 4: With Icon */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-zinc-200'>With Icon</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/' isIcon>
                <Home className='h-4 w-4' />
                <span className='sr-only'>Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/components'>Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className='text-sm text-zinc-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>
            separator: ReactNode (custom separator, defaults to ChevronRight)
          </li>
          <li>href: string (for BreadcrumbLink)</li>
          <li>asChild: boolean (for BreadcrumbLink, optional)</li>
          <li>
            isIcon: boolean (for BreadcrumbLink, optional for icon-only links)
          </li>
          <li>
            hasBackground: boolean (for Breadcrumb, optional for glassmorphism
            styling)
          </li>
          <li>children: ReactNode (for all components)</li>
        </ul>
      </div>
    </section>
  );
}
