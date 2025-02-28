'use client';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { KnowledgeEntry } from '@/types/core/knowledge/entry';
import ArticleEntry from './ArticleEntry';
import VideoEntry from './VideoEntry';
import HowToEntry from './HowToEntry';
import InfographicEntry from './InfographicEntry';
import DefaultEntry from './DefaultEntry';

interface EntryModalProps {
  entry: KnowledgeEntry;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  className?: string;
}

export function EntryModal({
  entry,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
  className,
}: EntryModalProps) {
  const _router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevious, onNext, hasPrevious, hasNext]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const getEntryComponent = (type: string) => {
    switch (type.toLowerCase()) {
      case 'article':
        return ArticleEntry;
      case 'video':
        return VideoEntry;
      case 'how-to':
      case 'howto':
        return HowToEntry;
      case 'infographic':
        return InfographicEntry;
      default:
        return DefaultEntry;
    }
  };

  const EntryComponent = getEntryComponent(entry.type);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm'
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'relative mx-auto flex h-[90vh] w-[90vw] max-w-6xl flex-col overflow-hidden rounded-xl border bg-card shadow-lg',
              className
            )}
          >
            {/* Modal Header */}
            <div className='flex items-center justify-between border-b p-4'>
              <h2 className='text-xl font-semibold'>{entry.title}</h2>
              <button
                onClick={onClose}
                className='rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground'
                aria-label='Close modal'
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            {/* Modal Content */}
            <div className='flex flex-1 flex-col overflow-y-auto md:flex-row'>
              {/* Entry Content */}
              <div className='flex-1 overflow-y-auto p-6 md:p-8'>
                {entry.imageUrl && (
                  <div className='relative mb-6 aspect-video w-full overflow-hidden rounded-lg'>
                    <Image
                      src={entry.imageUrl}
                      alt={entry.title}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 100vw, 50vw'
                    />
                  </div>
                )}
                <EntryComponent entry={entry} />
              </div>

              {/* Comments Section (Placeholder) */}
              <div className='flex w-full flex-col border-t p-6 md:w-80 md:border-l md:border-t-0'>
                <h3 className='mb-4 flex items-center gap-2 text-lg font-medium'>
                  <MessageCircle className='h-5 w-5' />
                  Comments
                </h3>
                <div className='text-sm text-muted-foreground'>
                  <p className='mb-4'>
                    Share your thoughts and insights about this entry with the
                    community.
                  </p>
                  <div className='rounded-md border bg-muted/50 p-4 text-center'>
                    Comments feature coming soon
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className='absolute left-0 top-1/2 -translate-y-1/2 p-2'>
              {hasPrevious && (
                <button
                  onClick={onPrevious}
                  className='rounded-full bg-background/80 p-2 text-foreground shadow-md backdrop-blur-sm hover:bg-background'
                  aria-label='Previous entry'
                >
                  <ChevronLeft className='h-6 w-6' />
                </button>
              )}
            </div>
            <div className='absolute right-0 top-1/2 -translate-y-1/2 p-2'>
              {hasNext && (
                <button
                  onClick={onNext}
                  className='rounded-full bg-background/80 p-2 text-foreground shadow-md backdrop-blur-sm hover:bg-background'
                  aria-label='Next entry'
                >
                  <ChevronRight className='h-6 w-6' />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
