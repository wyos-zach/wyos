import type { ReactNode } from 'react';
import type { AnimationConfig } from '@/types/shared/animations';

export interface Value {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface Mission {
  statement: string;
  vision: string;
  description: string;
}

export interface Story {
  title: string;
  content: string;
  author: {
    name: string;
    role: string;
    image?: string;
  };
}

export interface ContentSectionProps extends AnimationConfig {
  title: string;
  content: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export interface MissionSectionProps extends AnimationConfig {
  mission: Mission;
  className?: string;
  showVision?: boolean;
}

export interface ValuesGridProps extends AnimationConfig {
  values: Value[];
  className?: string;
  columns?: 2 | 3 | 4;
  showIcons?: boolean;
}

export interface OurStoryProps extends AnimationConfig {
  story: Story;
  className?: string;
  imagePosition?: 'left' | 'right';
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface TeamSectionProps extends AnimationConfig {
  title: string;
  description?: string;
  members: TeamMember[];
  className?: string;
  layout?: 'grid' | 'list';
}

export interface AboutPageContent {
  story: Story;
  mission: Mission;
  values: Value[];
  team?: TeamMember[];
}

export interface SectionWrapperProps extends AnimationConfig {
  children: ReactNode;
  className?: string;
  as?: 'section' | 'div' | 'article';
}
