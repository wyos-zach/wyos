'use client';
import { useFeaturedKnowledge } from '@/lib/api/knowledge/hooks';
import { KnowledgeCard } from '@/components/core/knowledge/KnowledgeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Correct imports for Swiper's CSS
import 'swiper/css';
import 'swiper/css/navigation';

export const FeaturedKnowledgeSwiper = () => {
  const { data, isLoading, error } = useFeaturedKnowledge();

  if (isLoading) {
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className='h-64 w-full rounded-xl' />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className='rounded-lg border border-destructive p-4 text-center text-red-500'>
        Failed to load featured content. {error.message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className='p-4 text-center text-muted-foreground'>
        No featured entries available
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
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className='relative !pb-12'
        aria-label='Featured knowledge entries carousel'
      >
        {data.map((entry) => (
          <SwiperSlide key={entry.$id}>
            <KnowledgeCard
              entry={entry}
              className='h-full transition-shadow hover:shadow-lg'
            />
          </SwiperSlide>
        ))}

        {/* Custom navigation arrows */}
        <div className='swiper-button-next !h-8 !w-8 !text-primary after:!text-xl' />
        <div className='swiper-button-prev !h-8 !w-8 !text-primary after:!text-xl' />
      </Swiper>
    </section>
  );
};
