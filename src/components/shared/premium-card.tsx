'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type PremiumCardVariant = 'feature' | 'pricing' | 'list-item';

interface PremiumCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: PremiumCardVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  logos?: React.ReactNode[];
  price?: string;
  features?: string[];
  ctaText?: string;
  ctaAction?: () => void;
  overlineText?: string;
  period?: string;
}

const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
  (
    {
      className,
      variant = 'feature',
      title,
      description,
      icon,
      logos,
      price,
      features,
      ctaText,
      ctaAction,
      overlineText,
      period = '/monthly',
      ...rest
    },
    ref
  ) => {
    const renderFeatureCard = () => {
      return (
        <div className="feature-card">
          <div className="feature-card-content">
            <div className="feature-heading">
              <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
              <p className="p-regular text-gray-400">{description}</p>
            </div>
            
            {logos && logos.length > 0 ? (
              <div className="logo-loop">
                <div className="logo-row">
                  {logos.map((logo, index) => (
                    <div key={index} className="feature-logo">
                      <div className="feature-icon">{logo}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : icon && (
              <div className="logo-loop">
                <div className="logo-row">
                  <div className="feature-logo">
                    <div className="feature-icon">{icon}</div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="feature-overlay"></div>
            <div className="light-effect"></div>
          </div>
          <div className="linear-border"></div>
        </div>
      );
    };

    const renderPricingCard = () => {
      return (
        <div className="pricing-card">
          <div className="pricing-content">
            {overlineText && (
              <div className="overline mb-16">{overlineText}</div>
            )}
            
            <div className="pricing-block">
              <div className="monthly-price">
                <h3 className="text-3xl font-medium text-white gradient-text">{price}</h3>
                <span className="text-gray-400">{period}</span>
              </div>
              
              <p className="text-gray-400 mt-2">{description}</p>
            </div>
            
            {ctaText && (
              <div className="pricing-button-wrapper">
                <button 
                  className="button-secondary w-full"
                  onClick={ctaAction}
                >
                  {ctaText}
                </button>
              </div>
            )}
            
            {features && features.length > 0 && (
              <>
                <div className="pricing-divider"></div>
                <div className="pricing-features">
                  {features.map((feature, index) => (
                    <div key={index} className="pricing-checklist-item">
                      <Check className="check-icon text-blue-400" />
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            <div className="light-effect pricing-light-effect"></div>
          </div>
          <div className="linear-border"></div>
        </div>
      );
    };

    const renderListItemCard = () => {
      return (
        <div className="list-item-card">
          <div className="list-card-content">
            {icon && (
              <div className="list-card-icon">
                <div className="feature-icon">{icon}</div>
              </div>
            )}
            <h3 className="list-card-title">{title}</h3>
            <p className="p-small text-gray-400">{description}</p>
            
            <div className="light-effect list-light-effect"></div>
          </div>
          <div className="linear-border"></div>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn('premium-card animate-card-entrance', className)}
        {...rest}
      >
        {variant === 'feature' && renderFeatureCard()}
        {variant === 'pricing' && renderPricingCard()}
        {variant === 'list-item' && renderListItemCard()}
      </div>
    );
  }
);

PremiumCard.displayName = 'PremiumCard';

export { PremiumCard, type PremiumCardProps };
