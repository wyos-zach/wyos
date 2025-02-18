'use client';

import React from 'react';
import { Container } from '@/components/ui/container';

export function BridgeSection() {
  const coreValues = ['Real Insights', 'Real Growth', 'No BS'];

  return (
    <section className="py-[120px] px-[5%] relative">
      <Container className="max-w-[1280px] mx-auto px-5">
        <h2 className="text-[40px] font-heading font-normal tracking-wide gradient-text text-center mb-16">
          But it doesn't have to be this way.
        </h2>
        <div className="flex items-center gap-2 bg-[#131316] border border-white/10 rounded-xl p-2">
          {coreValues.map((value, index) => (
            <React.Fragment key={value}>
              <div className="flex-1 h-[112px] flex items-center justify-center">
                <h3 className="text-[32px] font-heading font-normal tracking-wide gradient-text">
                  {value}
                </h3>
              </div>
              {index < coreValues.length - 1 && (
                <div className="w-px h-[48px] bg-[#363a3f]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
