import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/design-system/atoms/card';

export function CardSection() {
  return (
    <section className='space-y-6 px-6'>
      <div>
        <h2 className='font-heading text-3xl font-bold tracking-tight text-white'>
          Card
        </h2>
        <p className='mt-2 text-muted-foreground'>
          Cards group related content and actions in a sleek, minimal container.
        </p>
      </div>

      {/* Default Variant */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-white'>Default Variant</h3>
        <Card className='max-w-md'>
          <CardHeader>
            <CardTitle>Premium Feature</CardTitle>
            <CardDescription>A sleek and modern card design.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Display key information with clarity and elegance.</p>
          </CardContent>
          <CardFooter>
            <button className='rounded-md bg-neutral-600 px-4 py-2 text-sm font-medium text-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.1)] transition-shadow hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.05)]'>
              Learn More
            </button>
          </CardFooter>
        </Card>
      </div>

      {/* Glass Variant */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-white'>Glass Variant</h3>
        <div className='rounded-lg bg-neutral-900 p-4'>
          {' '}
          {/* Subtle background only for glass context */}
          <Card variant='glass' className='max-w-md'>
            <CardHeader>
              <CardTitle>Glass Effect</CardTitle>
              <CardDescription>
                Subtle blur for a premium touch.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Perfect for modern interfaces with a luxurious feel.</p>
            </CardContent>
            <CardFooter>
              <button className='rounded-md bg-neutral-600/20 px-4 py-2 text-sm font-medium text-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] transition-shadow hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.02)]'>
                Explore
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Hover State */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold text-white'>Interactive Hover</h3>
        <p className='text-muted-foreground'>
          Subtle scaling enhances interactivity.
        </p>
        <div className='grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2'>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Hover Me</CardTitle>
              <CardDescription>
                Experience the smooth animation.
              </CardDescription>
            </CardHeader>
            <CardContent>Designed for a premium user experience.</CardContent>
          </Card>

          <Card variant='glass' className='w-full'>
            <CardHeader>
              <CardTitle>Glass Hover</CardTitle>
              <CardDescription>A refined interactive effect.</CardDescription>
            </CardHeader>
            <CardContent>Elevate your UI with this style.</CardContent>
          </Card>
        </div>
      </div>

      {/* Documentation */}
      <div className='text-sm text-gray-500'>
        <p>Props:</p>
        <ul className='list-inside list-disc'>
          <li>variant: "default" | "glass"</li>
          <li>children: ReactNode</li>
          <li>onClick?: () =&gt; void</li>
        </ul>
      </div>
    </section>
  );
}
