import { Shield, Users, Sparkles } from 'lucide-react';
import { type Mission, type Story, type Value } from '@/types/marketing/about';

export const mission: Mission = {
  statement:
    'To equip people with the tools, resources, and support they need to take control of their lives, redefine success, and create their own path forward',
  vision:
    'A world where everyone has access to the wisdom, tools, and guidance they need to write their own story and achieve the success they deserve—on their own terms',
  description:
    'WYOS stands apart by cutting through the noise and offering unfiltered, actionable insights, tools, and a trustworthy community for those who are ready to put in the work',
};

export const story: Story = {
  title: 'Why WYOS Exists',
  content:
    "WYOS was born out of real struggle and a desire to help others navigate the challenges of life without the bullshit. After hitting rock bottom, I went on a journey to rebuild myself from scratch. Along the way, I discovered life-changing insights and resources—but I had to dig through a mountain of noise and misinformation to find them. I realized there was no single place where people could access this kind of practical wisdom, and that's when WYOS was born.",
  author: {
    name: 'Zach',
    role: 'Founder, WYOS',
  },
};

export const values: Value[] = [
  {
    title: 'Integrity',
    description:
      'WYOS is honest, transparent, and free of manipulation or hype',
    icon: <Shield className='h-6 w-6' />,
  },
  {
    title: 'Empowerment',
    description:
      'We give people the tools to take control of their lives and decisions',
    icon: <Users className='h-6 w-6' />,
  },
  {
    title: 'Resilience',
    description:
      'Success comes from showing up, pushing through challenges, and doing the hard work',
    icon: <Sparkles className='h-6 w-6' />,
  },
];
