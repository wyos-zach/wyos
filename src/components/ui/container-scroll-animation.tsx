'use client';
import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div
      className='relative flex h-[60rem] items-center justify-center p-2 md:h-[80rem] md:p-20'
      ref={containerRef}
    >
      <div
        className='relative w-full py-10 md:py-40'
        style={{
          perspective: '1000px',
        }}
      >
        <Header containerRef={containerRef} titleComponent={titleComponent} />
        <Card containerRef={containerRef} isMobile={isMobile}>
          {children}
        </Card>
      </div>
    </div>
  );
};

interface HeaderProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  titleComponent: string | React.ReactNode;
}

export const Header = ({ containerRef, titleComponent }: HeaderProps) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className='div mx-auto max-w-5xl text-center'
    >
      {titleComponent}
    </motion.div>
  );
};

interface CardProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  isMobile: boolean;
  children: React.ReactNode;
}

export const Card = ({ containerRef, isMobile, children }: CardProps) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.7, 0.9] : [1.05, 1]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        translateY: translate,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className='mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl md:h-[40rem] md:p-6'
    >
      <div className='h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4'>
        {children}
      </div>
    </motion.div>
  );
};
