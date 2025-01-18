import { type ReactNode } from 'react';

export interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface FoundersNote {
  message: string;
  founderName: string;
  founderTitle: string;
  imageUrl?: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface StartingStep {
  number: number;
  title: string;
  description: string;
  icon?: ReactNode;
}
