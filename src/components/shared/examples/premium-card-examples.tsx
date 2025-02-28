'use client';

import React from 'react';
import { PremiumCard } from '@/components/shared/premium-card';
import { Code, Shield, Database, FileText } from 'lucide-react';

export default function PremiumCardExamples() {
  return (
    <div className="space-y-16 p-8 bg-black">
      {/* Feature Cards Section */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-white">Feature Cards</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Feature Card with Logos */}
          <PremiumCard 
            variant="feature"
            title="List Your Applications"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            logos={[
              <div key="1" className="w-5 h-5 bg-gray-500 rounded"></div>,
              <div key="2" className="w-5 h-5 bg-gray-500 rounded"></div>,
              <div key="3" className="w-5 h-5 bg-gray-500 rounded"></div>,
              <div key="4" className="w-5 h-5 bg-gray-500 rounded"></div>,
              <div key="5" className="w-5 h-5 bg-gray-500 rounded"></div>,
              <div key="6" className="w-5 h-5 bg-gray-500 rounded"></div>,
              <div key="7" className="w-5 h-5 bg-gray-500 rounded"></div>,
              <div key="8" className="w-5 h-5 bg-gray-500 rounded"></div>,
              <div key="9" className="w-5 h-5 bg-gray-500 rounded"></div>,
              <div key="10" className="w-5 h-5 bg-gray-500 rounded"></div>,
              <div key="11" className="w-5 h-5 bg-gray-500 rounded"></div>,
              <div key="12" className="w-5 h-5 bg-gray-500 rounded"></div>,
              <div key="13" className="w-5 h-5 bg-gray-500 rounded"></div>,
              <div key="14" className="w-5 h-5 bg-gray-500 rounded"></div>,
              <div key="15" className="w-5 h-5 bg-gray-500 rounded"></div>,
              <div key="16" className="w-5 h-5 bg-gray-500 rounded"></div>
            ]}
          />

          {/* Feature Card with Image */}
          <PremiumCard 
            variant="feature"
            title="List Your Features"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          />

          {/* Feature Card with Location Data */}
          <PremiumCard 
            variant="feature"
            title="Display Your Locations"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          />
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-white">Pricing Cards</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Free Tier */}
          <PremiumCard 
            variant="pricing"
            overlineText="FREE"
            price="$0"
            period="/Monthly"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            features={[
              'Pricing feature here',
              'Pricing feature here',
              'Pricing feature here',
              'Pricing feature here'
            ]}
            ctaText="Get Started"
          />

          {/* Pro Tier */}
          <PremiumCard 
            variant="pricing"
            overlineText="PRO"
            price="$29"
            period="/monthly"
            description="Great for growing teams"
            features={[
              '50GB Storage',
              'Unlimited Users',
              'Priority Support',
              'Advanced Features',
              'Custom Integrations'
            ]}
            ctaText="Get Started"
          />

          {/* Enterprise Tier */}
          <PremiumCard 
            variant="pricing"
            overlineText="ENTERPRISE"
            price="$99"
            period="/monthly"
            description="For large organizations"
            features={[
              'Unlimited Storage',
              'Unlimited Users',
              '24/7 Support',
              'All Features',
              'Custom Development',
              'SLA Guarantee',
              'Dedicated Account Manager'
            ]}
            ctaText="Contact Sales"
          />
        </div>
      </section>

      {/* List Item Cards Section */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-white">List Item Cards</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <PremiumCard 
            variant="list-item"
            title="Document Management"
            description="Organize and access your files securely"
            icon={<FileText className="h-6 w-6 text-blue-400" />}
          />

          <PremiumCard 
            variant="list-item"
            title="Team Collaboration"
            description="Work together seamlessly with your team"
            icon={<Code className="h-6 w-6 text-emerald-400" />}
          />

          <PremiumCard 
            variant="list-item"
            title="Advanced Security"
            description="Keep your data safe with enterprise-grade security"
            icon={<Shield className="h-6 w-6 text-purple-400" />}
          />

          <PremiumCard 
            variant="list-item"
            title="Analytics Dashboard"
            description="Track your performance with detailed analytics"
            icon={<Database className="h-6 w-6 text-blue-400" />}
          />
        </div>
      </section>
    </div>
  );
}
