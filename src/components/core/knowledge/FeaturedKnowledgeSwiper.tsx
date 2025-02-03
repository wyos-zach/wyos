'use client';
import { useFeaturedKnowledge } from '@/lib/api/knowledge/hooks';
import { KnowledgeCard } from '@/components/core/knowledge/KnowledgeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import dynamic from 'next/dynamic';

const SwiperNavigation = dynamic(() =>
  import('swiper').then((mod) => mod.Navigation)
);

export const FeaturedKnowledgeSwiper = () => {
  const { data, isLoading } = useFeaturedKnowledge();

  if (isLoading) {
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className='h-64 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  return (
    <section className='space-y-8'>
      <h2 className='text-2xl font-bold'>Featured Content</h2>
      <Swiper
        spaceBetween={24}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
        }}
        modules={[SwiperNavigation]}
        navigation
        className='!pb-12'
      >
        {data?.map((entry) => (
          <SwiperSlide key={entry.$id}>
            <KnowledgeCard entry={entry} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
import { Navigation } from 'lucide-react';
