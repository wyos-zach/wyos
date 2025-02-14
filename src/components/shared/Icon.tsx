import Link from 'next/link';
import Image from 'next/image';

export function Icon() {
  return (
    <Link href='/' className='flex items-center'>
      <Image
        src='/images/icon60.svg'
        alt='WYOS Logo'
        width={60}
        height={60}
        className='h-10 w-10 object-contain transition-transform duration-200 hover:scale-105'
      />
    </Link>
  );
}
