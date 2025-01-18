import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { type FoundersNote as FoundersNoteType } from '@/types/home';

type FoundersNoteProps = FoundersNoteType;

export function FoundersNote({
  message,
  founderName,
  founderTitle,
  imageUrl,
}: FoundersNoteProps) {
  return (
    <Container as='section' className='py-12 md:py-16 lg:py-20'>
      <div className='mx-auto max-w-[58rem]'>
        <blockquote className='space-y-6'>
          <p className='text-lg font-medium leading-relaxed text-muted-foreground sm:text-xl sm:leading-8'>
            {message}
          </p>
          <footer className='flex items-center gap-4'>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={founderName}
                width={48}
                height={48}
                className='rounded-full'
              />
            )}
            <div>
              <div className='font-semibold'>{founderName}</div>
              <div className='text-sm text-muted-foreground'>
                {founderTitle}
              </div>
            </div>
          </footer>
        </blockquote>
      </div>
    </Container>
  );
}
