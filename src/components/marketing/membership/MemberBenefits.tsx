'use client';

import { motion } from 'motion/react';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';

export function MemberBenefits() {
  const benefits = [
    {
      title: 'The Knowledge Section',
      description:
        'Curated insights and practical wisdom that actually works—no fluff, no generic advice',
      icon: '📚',
    },
    {
      title: 'The Resource Library',
      description:
        'Over 1,000 vetted tools across books, apps, courses, podcasts, software, and YouTube channels',
      icon: '🧰',
    },
    {
      title: 'The Community',
      description:
        'Connect with others who are serious about growth and success',
      icon: '👥',
    },
    {
      title: 'Direct Input',
      description:
        "Help shape what WYOS becomes—this isn't just my platform, it's ours",
      icon: '🎯',
    },
    {
      title: 'Comment & Rate',
      description:
        'Share your experiences with resources to help other members',
      icon: '💬',
    },
    {
      title: 'Support Real Change',
      description:
        'Help build an alternative to the manipulation-driven internet we have today',
      icon: '🔄',
    },
  ];

  return (
    <Section 
      className="relative"
      container={false}
      spacing="lg"
    >
      {/* Blended gradient background to create seamless transition */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.07),transparent_70%)]" />
        <div 
          className="absolute h-full w-full bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]"
          style={{ opacity: 0.05 }}
        />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-8 h-px w-16 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          />
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-5xl mb-6"
          >
            What You Get as a Member
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-lg text-zinc-300 max-w-2xl mb-16"
          >
            Real value that helps you grow, not just more content to consume
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-6xl"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                className="relative overflow-hidden rounded-xl border border-zinc-800/50 bg-black/20 backdrop-blur-sm p-6 group hover:border-zinc-700/80 transition-all duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {/* Animated gradient accent */}
                <div className="absolute -left-10 -top-10 h-20 w-20 rounded-full bg-primary/10 blur-xl transition-all duration-500 group-hover:bg-primary/20" />
                
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/70 text-xl">
                    {benefit.icon}
                  </div>
                  
                  <h3 className="mb-3 font-heading text-xl font-semibold text-white">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-zinc-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
