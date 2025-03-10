import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/design-system/atoms/card';
import { Skeleton } from '@/components/design-system/atoms/skeleton';

export default function SubscriptionLoading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='h-8 w-3/4' />
      </CardHeader>
      <CardContent className='space-y-4'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-5/6' />
        <Skeleton className='h-4 w-4/6' />
        <div className='space-y-3'>
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-4 w-2/3' />
          <Skeleton className='h-4 w-1/2' />
        </div>
      </CardContent>
      <CardFooter className='space-x-4'>
        <Skeleton className='h-10 w-32' />
        <Skeleton className='h-10 w-32' />
      </CardFooter>
    </Card>
  );
}
