import { Container } from '@/components/ui/container';
import { OurStory } from '@/components/marketing/about/OurStory';
import { MissionSection } from '@/components/marketing/about/MissionSection';
import { ValuesGrid } from '@/components/marketing/about/ValuesGrid';
import { PageHeader } from '@/components/shared/layout/PageHeader';
import { mission, story, values } from '@/lib/config/about';

export const metadata = {
  title: 'About - WYOS',
  description:
    'Learn about WYOS, our mission, and our commitment to helping you write your own story',
};

export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        title='About WYOS'
        description='A platform built for those ready to write their own story'
        pattern='dots'
      />

      <OurStory story={story} />

      <MissionSection mission={mission} />

      <ValuesGrid values={values} />
    </Container>
  );
}
