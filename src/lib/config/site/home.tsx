import {
  type Feature,
  type Step,
  type FoundersNote,
} from '@/types/marketing/home';
import {
  PenLine,
  BookOpen,
  Share2,
  Layout,
  Users,
  Lock,
  Shield,
  Zap,
  Target,
  Clock,
  Heart,
  Star,
} from 'lucide-react';
import { type Benefit, type StartingStep } from '@/types/marketing/home';

export const features: Feature[] = [
  {
    title: 'Intuitive Writing Tools',
    description:
      'Powerful yet simple tools that help you focus on what matters - your story.',
    icon: <PenLine className='h-6 w-6' />,
  },
  {
    title: 'Organized Chapters',
    description:
      'Keep your story organized with our intelligent chapter management system.',
    icon: <BookOpen className='h-6 w-6' />,
  },
  {
    title: 'Easy Sharing',
    description:
      "Share your story with others when you're ready, with full control over privacy.",
    icon: <Share2 className='h-6 w-6' />,
  },
  {
    title: 'Beautiful Templates',
    description:
      'Choose from professionally designed templates to showcase your work.',
    icon: <Layout className='h-6 w-6' />,
  },
  {
    title: 'Community Support',
    description: 'Connect with other writers and get feedback on your work.',
    icon: <Users className='h-6 w-6' />,
  },
  {
    title: 'Privacy First',
    description:
      'Your story belongs to you. Full control over your content and who sees it.',
    icon: <Lock className='h-6 w-6' />,
  },
];

export const steps: Step[] = [
  {
    number: 1,
    title: 'Create Your Account',
    description: 'Sign up in seconds and get access to all our features.',
  },
  {
    number: 2,
    title: 'Start Writing',
    description: 'Use our intuitive editor to bring your story to life.',
  },
  {
    number: 3,
    title: 'Share Your Story',
    description:
      "Publish and share your story with the world when you're ready.",
  },
];

export const foundersNote: FoundersNote = {
  message:
    'I created WYOS because I believe everyone has a story worth telling. Our platform gives you the tools and support you need to share yours with the world.',
  founderName: 'John Smith',
  founderTitle: 'Founder & CEO',
  imageUrl: '/images/founder.jpg',
};

export const benefits: Benefit[] = [
  {
    title: 'Your Story, Your Way',
    description: 'Complete control over your content and how you share it',
    icon: <Shield className='h-6 w-6' />,
  },
  {
    title: 'Powerful Tools',
    description: 'Everything you need to craft your narrative effectively',
    icon: <Zap className='h-6 w-6' />,
  },
  {
    title: 'Focused Experience',
    description: 'Clean, distraction-free environment for writing',
    icon: <Target className='h-6 w-6' />,
  },
  {
    title: 'Work at Your Pace',
    description: "No pressure, write and publish when you're ready",
    icon: <Clock className='h-6 w-6' />,
  },
  {
    title: 'Supportive Community',
    description: 'Connect with like-minded writers and creators',
    icon: <Heart className='h-6 w-6' />,
  },
  {
    title: 'Quality First',
    description: 'Tools and guidance for creating your best work',
    icon: <Star className='h-6 w-6' />,
  },
];

export const startingSteps: StartingStep[] = [
  {
    number: 1,
    title: 'Sign Up',
    description: 'Create your free account in seconds',
  },
  {
    number: 2,
    title: 'Set Up Your Space',
    description: 'Customize your writing environment',
  },
  {
    number: 3,
    title: 'Start Creating',
    description: 'Begin writing your story immediately',
  },
];
